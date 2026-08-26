from aiogram.types import Message
from sqlalchemy import select

from app import keyboards, texts
from app.db import async_session
from app.media import resolve_audio
from app.models import Category, Practice


async def send_practice_content(message: Message, category_name: str, practice: Practice) -> None:
    caption = texts.REMINDER_CAPTION.format(
        category=category_name,
        title=practice.title,
        duration=practice.duration_min,
        text=practice.instruction_text,
    )
    if practice.audio_url:
        await message.answer_audio(resolve_audio(practice.audio_url), caption=caption)
    else:
        await message.answer(caption)


async def send_free_practices(message: Message, code: str) -> None:
    async with async_session() as session:
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()
        if category is None:
            await message.answer("Такого раздела не нашлось, попробуйте /start")
            return

        practices = (
            await session.execute(
                select(Practice)
                .where(Practice.category_id == category.id)
                .where(Practice.is_free.is_(True))
                .order_by(Practice.order_index)
            )
        ).scalars().all()

    await message.answer(texts.FREE_INTRO.format(name=category.name))
    for practice in practices[:2]:
        await send_practice_content(message, category.name, practice)

    await message.answer(
        texts.UPSELL.format(name=category.name, price=category.price_rub),
        reply_markup=keyboards.upsell_kb(category.code, category.price_rub),
    )
