from aiogram import F, Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message
from sqlalchemy import select

from app import keyboards, texts
from app.classification import classify, is_crisis
from app.db import async_session
from app.handlers.free_practices import send_free_practices
from app.models import Category
from app.services import get_or_create_user
from app.states import Onboarding

router = Router()


def _is_not_command(message: Message) -> bool:
    return not (message.text and message.text.startswith("/"))


async def _all_categories() -> list[Category]:
    async with async_session() as session:
        return list((await session.execute(select(Category))).scalars().all())


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    async with async_session() as session:
        await get_or_create_user(session, message.from_user)
        await session.commit()

    categories = await _all_categories()
    await state.set_state(Onboarding.waiting_for_state_text)
    await message.answer(texts.WELCOME)
    await message.answer(texts.ASK_STATE, reply_markup=keyboards.categories_kb(categories))


@router.message(Onboarding.waiting_for_state_text, F.text, _is_not_command)
async def handle_state_text(message: Message) -> None:
    text = message.text or ""

    if is_crisis(text):
        await message.answer(texts.CRISIS_MESSAGE)

    code = classify(text)
    categories = await _all_categories()

    if code:
        category = next(c for c in categories if c.code == code)
        await message.answer(
            texts.CLASSIFICATION_CONFIRM.format(name=category.name),
            reply_markup=keyboards.confirm_category_kb(code),
        )
    else:
        await message.answer(texts.ASK_STATE_AGAIN, reply_markup=keyboards.categories_kb(categories))


@router.callback_query(F.data.startswith("cat:"))
async def handle_category_selected(callback: CallbackQuery, state: FSMContext) -> None:
    code = callback.data.split(":", 1)[1]

    if code == "manual":
        categories = await _all_categories()
        await state.set_state(Onboarding.waiting_for_state_text)
        await callback.message.answer(
            texts.ASK_STATE_AGAIN, reply_markup=keyboards.categories_kb(categories)
        )
        await callback.answer()
        return

    await state.clear()
    await send_free_practices(callback.message, code)
    await callback.answer()
