from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery
from sqlalchemy import select

from app import keyboards, texts
from app.db import async_session
from app.models import Category, Schedule, UserIntensity
from app.services import days_of_week_for_intensity, format_days, get_or_create_user
from app.states import PurchaseFlow

router = Router()


@router.callback_query(PurchaseFlow.waiting_intensity, F.data.startswith("intensity:"))
async def handle_intensity(callback: CallbackQuery, state: FSMContext) -> None:
    level = callback.data.split(":", 1)[1]
    data = await state.get_data()
    code = data["pending_category_code"]

    async with async_session() as session:
        user = await get_or_create_user(session, callback.from_user)
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()

        intensity = (
            await session.execute(
                select(UserIntensity).where(
                    UserIntensity.user_id == user.id, UserIntensity.category_id == category.id
                )
            )
        ).scalar_one_or_none()

        if intensity is None:
            session.add(UserIntensity(user_id=user.id, category_id=category.id, level=level))
        else:
            intensity.level = level

        await session.commit()

    if level == "free":
        await state.clear()
        await callback.message.answer(texts.SCHEDULE_DONE_FREE.format(name=category.name))
        await callback.answer()
        return

    await state.update_data(pending_intensity=level)
    await state.set_state(PurchaseFlow.waiting_timezone)
    await callback.message.answer(texts.ASK_TIMEZONE, reply_markup=keyboards.timezone_kb())
    await callback.answer()


@router.callback_query(PurchaseFlow.waiting_timezone, F.data.startswith("tz:"))
async def handle_timezone(callback: CallbackQuery, state: FSMContext) -> None:
    offset = int(callback.data.split(":", 1)[1])

    async with async_session() as session:
        user = await get_or_create_user(session, callback.from_user)
        user.utc_offset_minutes = offset
        await session.commit()

    await state.set_state(PurchaseFlow.waiting_time)
    await callback.message.answer(texts.ASK_TIME, reply_markup=keyboards.time_slot_kb())
    await callback.answer()


@router.callback_query(PurchaseFlow.waiting_time, F.data.startswith("time:"))
async def handle_time(callback: CallbackQuery, state: FSMContext) -> None:
    time_value = callback.data.split(":", 1)[1]
    data = await state.get_data()
    code = data["pending_category_code"]
    level = data["pending_intensity"]
    days = days_of_week_for_intensity(level)
    days_str = ",".join(str(d) for d in days)

    async with async_session() as session:
        user = await get_or_create_user(session, callback.from_user)
        category = (
            await session.execute(select(Category).where(Category.code == code))
        ).scalar_one_or_none()

        schedule = (
            await session.execute(
                select(Schedule).where(
                    Schedule.user_id == user.id, Schedule.category_id == category.id
                )
            )
        ).scalar_one_or_none()

        if schedule is None:
            session.add(
                Schedule(
                    user_id=user.id,
                    category_id=category.id,
                    time_of_day=time_value,
                    days_of_week=days_str,
                    active=True,
                )
            )
        else:
            schedule.time_of_day = time_value
            schedule.days_of_week = days_str
            schedule.active = True
            schedule.last_sent_date = None

        await session.commit()

    await state.clear()
    await callback.message.answer(
        texts.SCHEDULE_DONE.format(name=category.name, time=time_value, days=format_days(days))
    )
    await callback.answer()
