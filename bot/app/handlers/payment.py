from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery
from sqlalchemy import select

from app import keyboards, texts
from app.db import async_session
from app.models import Category, UserAccess
from app.services import get_or_create_user
from app.states import PurchaseFlow

router = Router()


@router.callback_query(F.data.startswith("buy:"))
async def handle_buy(callback: CallbackQuery) -> None:
    code = callback.data.split(":", 1)[1]

    async with async_session() as session:
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()

    if category is None:
        await callback.answer()
        return

    await callback.message.answer(texts.PAYMENT_MOCK_NOTE)
    await callback.message.answer(
        f"Раздел «{category.name}» — {category.price_rub} ₽",
        reply_markup=keyboards.mock_payment_kb(code, category.price_rub),
    )
    await callback.answer()


@router.callback_query(F.data.startswith("pay:"))
async def handle_pay(callback: CallbackQuery, state: FSMContext) -> None:
    """Simulates a payment-gateway webhook granting access -- in production
    this branch would instead be triggered by an incoming webhook route that
    verifies the payment and looks the user up by an order/payment id."""
    code = callback.data.split(":", 1)[1]

    async with async_session() as session:
        user = await get_or_create_user(session, callback.from_user)
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()
        if category is None:
            await callback.answer()
            return

        access = (
            await session.execute(
                select(UserAccess).where(
                    UserAccess.user_id == user.id, UserAccess.category_id == category.id
                )
            )
        ).scalar_one_or_none()

        if access is None:
            session.add(UserAccess(user_id=user.id, category_id=category.id, status="active"))
        else:
            access.status = "active"

        await session.commit()

    await state.update_data(pending_category_code=code)
    await state.set_state(PurchaseFlow.waiting_intensity)
    await callback.message.answer(texts.PAYMENT_SUCCESS.format(name=category.name))
    await callback.message.answer(texts.ASK_INTENSITY, reply_markup=keyboards.intensity_kb())
    await callback.answer()
