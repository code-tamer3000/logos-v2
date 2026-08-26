from aiogram import F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select

from app import keyboards, texts
from app.db import async_session
from app.handlers.free_practices import send_practice_content
from app.models import Category, Practice, UserAccess
from app.services import get_or_create_user

router = Router()


async def _show_archive_menu(target: Message, tg_user) -> None:
    async with async_session() as session:
        user = await get_or_create_user(session, tg_user)
        await session.commit()

        access_ids = {
            row[0]
            for row in (
                await session.execute(
                    select(UserAccess.category_id).where(
                        UserAccess.user_id == user.id, UserAccess.status == "active"
                    )
                )
            ).all()
        }

        if not access_ids:
            await target.answer(texts.PRACTICES_EMPTY)
            return

        categories = (
            await session.execute(select(Category).where(Category.id.in_(access_ids)))
        ).scalars().all()

    await target.answer(texts.PRACTICES_ARCHIVE_INTRO, reply_markup=keyboards.archive_categories_kb(categories))


@router.message(Command("practices"))
async def cmd_practices(message: Message) -> None:
    await _show_archive_menu(message, message.from_user)


@router.callback_query(F.data.startswith("arch_cat:"))
async def handle_archive_category(callback: CallbackQuery) -> None:
    code = callback.data.split(":", 1)[1]

    async with async_session() as session:
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()
        if category is None:
            await callback.answer()
            return

        practices = (
            await session.execute(
                select(Practice).where(Practice.category_id == category.id).order_by(Practice.order_index)
            )
        ).scalars().all()

    await callback.message.answer(
        f"Практики раздела «{category.name}»:", reply_markup=keyboards.archive_practices_kb(code, practices)
    )
    await callback.answer()


@router.callback_query(F.data.startswith("arch_pr:"))
async def handle_archive_practice(callback: CallbackQuery) -> None:
    practice_id = int(callback.data.split(":", 1)[1])

    async with async_session() as session:
        practice = await session.get(Practice, practice_id)
        if practice is None:
            await callback.answer()
            return
        category = await session.get(Category, practice.category_id)

    await send_practice_content(callback.message, category.name, practice)
    await callback.answer()


@router.callback_query(F.data == "arch_back")
async def handle_archive_back(callback: CallbackQuery) -> None:
    await _show_archive_menu(callback.message, callback.from_user)
    await callback.answer()
