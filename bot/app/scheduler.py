from datetime import datetime, timedelta

from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy import select

from app import keyboards, texts
from app.config import NUDGE_DELAY_MINUTES, POSTPONE_DELAY_HOURS
from app.db import async_session
from app.media import resolve_audio
from app.models import Category, Practice, Reminder, Schedule, User, UserIntensity, UserProgress
from app.services import get_or_create_streak, pick_next_practice, user_local_now

scheduler = AsyncIOScheduler()
_bot: Bot | None = None


def setup_scheduler(bot: Bot) -> None:
    global _bot
    _bot = bot
    scheduler.add_job(
        dispatch_due_reminders, "interval", minutes=1, id="dispatch", replace_existing=True
    )
    scheduler.add_job(
        weekly_summary_job,
        CronTrigger(day_of_week="mon", hour=9, minute=0),
        id="weekly_summary",
        replace_existing=True,
    )
    scheduler.start()


async def send_practice_message(chat_id: int, user_id: int, category: Category, practice: Practice) -> Reminder:
    async with async_session() as session:
        reminder = Reminder(
            user_id=user_id,
            category_id=category.id,
            practice_id=practice.id,
            chat_id=chat_id,
            status="sent",
        )
        session.add(reminder)
        await session.commit()
        await session.refresh(reminder)
        reminder_id = reminder.id

    caption = texts.REMINDER_CAPTION.format(
        category=category.name,
        title=practice.title,
        duration=practice.duration_min,
        text=practice.instruction_text,
    )
    kb = keyboards.reminder_kb(reminder_id)

    if practice.audio_url:
        msg = await _bot.send_audio(chat_id, resolve_audio(practice.audio_url), caption=caption, reply_markup=kb)
    else:
        msg = await _bot.send_message(chat_id, caption, reply_markup=kb)

    async with async_session() as session:
        db_reminder = await session.get(Reminder, reminder_id)
        db_reminder.message_id = msg.message_id
        await session.commit()

    scheduler.add_job(
        nudge_check,
        "date",
        run_date=datetime.now() + timedelta(minutes=NUDGE_DELAY_MINUTES),
        args=[reminder_id],
        id=f"nudge:{reminder_id}",
        replace_existing=True,
    )

    return db_reminder


async def nudge_check(reminder_id: int) -> None:
    async with async_session() as session:
        reminder = await session.get(Reminder, reminder_id)
        if reminder is None or reminder.status != "sent":
            return
        practice = await session.get(Practice, reminder.practice_id)
        chat_id = reminder.chat_id
        title = practice.title

    await _bot.send_message(chat_id, texts.NUDGE_TEXT.format(title=title))


def schedule_postponed_resend(user_id: int, category_id: int, practice_id: int, chat_id: int) -> None:
    run_date = datetime.now() + timedelta(hours=POSTPONE_DELAY_HOURS)
    job_id = f"postpone:{user_id}:{category_id}:{run_date.timestamp()}"
    scheduler.add_job(
        resend_postponed,
        "date",
        run_date=run_date,
        args=[user_id, category_id, practice_id, chat_id],
        id=job_id,
        replace_existing=False,
    )


async def resend_postponed(user_id: int, category_id: int, practice_id: int, chat_id: int) -> None:
    async with async_session() as session:
        category = await session.get(Category, category_id)
        practice = await session.get(Practice, practice_id)

    if category is None or practice is None:
        return

    await send_practice_message(chat_id, user_id, category, practice)


async def dispatch_due_reminders() -> None:
    async with async_session() as session:
        schedules = (
            await session.execute(select(Schedule).where(Schedule.active.is_(True)))
        ).scalars().all()

        due: list[tuple[int, int, Category, Practice]] = []

        for sched in schedules:
            user = await session.get(User, sched.user_id)
            if user is None:
                continue

            local_now = user_local_now(user.utc_offset_minutes)
            local_date = local_now.strftime("%Y-%m-%d")

            if local_now.strftime("%H:%M") != sched.time_of_day:
                continue
            if str(local_now.weekday()) not in sched.days_of_week.split(","):
                continue
            if sched.last_sent_date == local_date:
                continue

            category = await session.get(Category, sched.category_id)

            intensity_row = (
                await session.execute(
                    select(UserIntensity).where(
                        UserIntensity.user_id == user.id, UserIntensity.category_id == sched.category_id
                    )
                )
            ).scalar_one_or_none()
            intensity = intensity_row.level if intensity_row else "medium"

            practice = await pick_next_practice(session, user.id, sched.category_id, intensity)
            if practice is None:
                continue

            sched.last_sent_date = local_date
            due.append((user.telegram_id, user.id, category, practice))

        await session.commit()

    for chat_id, user_id, category, practice in due:
        await send_practice_message(chat_id, user_id, category, practice)


async def weekly_summary_job() -> None:
    async with async_session() as session:
        schedules = (
            await session.execute(select(Schedule).where(Schedule.active.is_(True)))
        ).scalars().all()
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d")

        summaries: list[tuple[int, str]] = []

        for sched in schedules:
            user = await session.get(User, sched.user_id)
            category = await session.get(Category, sched.category_id)
            if user is None or category is None:
                continue

            entries = (
                await session.execute(
                    select(UserProgress).where(
                        UserProgress.user_id == user.id,
                        UserProgress.category_id == sched.category_id,
                        UserProgress.date >= week_ago,
                    )
                )
            ).scalars().all()

            if not entries:
                continue

            done_count = sum(1 for e in entries if e.status == "done")
            streak = await get_or_create_streak(session, user.id, sched.category_id)

            text = texts.WEEKLY_SUMMARY.format(
                category=category.name,
                done=done_count,
                total=len(entries),
                streak=streak.current_streak,
            )
            summaries.append((user.telegram_id, text))

    for chat_id, text in summaries:
        await _bot.send_message(chat_id, text)
