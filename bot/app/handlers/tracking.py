from aiogram import F, Router
from aiogram.types import CallbackQuery

from app import texts
from app.db import async_session
from app.models import Category, Reminder, User, UserProgress
from app.services import register_done, register_miss, user_local_now

router = Router()


@router.callback_query(F.data.startswith("rem:"))
async def handle_reminder_action(callback: CallbackQuery) -> None:
    _, reminder_id_str, action = callback.data.split(":")
    reminder_id = int(reminder_id_str)

    async with async_session() as session:
        reminder = await session.get(Reminder, reminder_id)
        if reminder is None or reminder.status != "sent":
            await callback.answer("Уже обработано")
            return

        user = await session.get(User, reminder.user_id)
        category = await session.get(Category, reminder.category_id)
        local_date = user_local_now(user.utc_offset_minutes).strftime("%Y-%m-%d")

        if action == "done":
            reminder.status = "done"
            session.add(
                UserProgress(
                    user_id=reminder.user_id,
                    practice_id=reminder.practice_id,
                    category_id=reminder.category_id,
                    date=local_date,
                    status="done",
                )
            )
            streak = await register_done(session, reminder.user_id, reminder.category_id)
            reply_text = texts.DONE_REPLY.format(category=category.name, streak=streak.current_streak)
        elif action == "skip":
            reminder.status = "skipped"
            session.add(
                UserProgress(
                    user_id=reminder.user_id,
                    practice_id=reminder.practice_id,
                    category_id=reminder.category_id,
                    date=local_date,
                    status="skipped",
                )
            )
            await register_miss(session, reminder.user_id, reminder.category_id)
            reply_text = texts.SKIP_REPLY
        elif action == "postpone":
            reminder.status = "postponed"
            session.add(
                UserProgress(
                    user_id=reminder.user_id,
                    practice_id=reminder.practice_id,
                    category_id=reminder.category_id,
                    date=local_date,
                    status="postponed",
                )
            )
            reply_text = texts.POSTPONE_REPLY
        else:
            await callback.answer()
            return

        await session.commit()

        resend_args = (reminder.user_id, reminder.category_id, reminder.practice_id, reminder.chat_id)

    try:
        await callback.message.edit_reply_markup(reply_markup=None)
    except Exception:
        pass
    await callback.message.answer(reply_text)
    await callback.answer()

    if action == "postpone":
        from app.scheduler import schedule_postponed_resend

        schedule_postponed_resend(*resend_args)
