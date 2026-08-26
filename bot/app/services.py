from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import STREAK_GRACE_MISSES
from app.models import Practice, User, UserProgress, UserStreak


async def get_or_create_user(session: AsyncSession, tg_user) -> User:
    result = await session.execute(
        select(User).where(User.telegram_id == tg_user.id)
    )
    user = result.scalar_one_or_none()
    if user is None:
        user = User(telegram_id=tg_user.id, full_name=tg_user.full_name or "")
        session.add(user)
        await session.flush()
    return user

# Weekday sets (Mon=0 .. Sun=6) per intensity level, matching the spec:
# easy = 2x/week, medium = every other day, hard = daily, free = no auto schedule.
INTENSITY_DAYS: dict[str, list[int]] = {
    "easy": [0, 3],
    "medium": [0, 2, 4, 6],
    "hard": [0, 1, 2, 3, 4, 5, 6],
}


def days_of_week_for_intensity(level: str) -> list[int]:
    return INTENSITY_DAYS.get(level, [])


def format_days(days: list[int]) -> str:
    names = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
    return ", ".join(names[d] for d in sorted(days))


def user_local_now(utc_offset_minutes: int) -> datetime:
    return datetime.utcnow() + timedelta(minutes=utc_offset_minutes)


async def pick_next_practice(
    session: AsyncSession, user_id: int, category_id: int, intensity: str
) -> Practice | None:
    """Picks the next practice for a scheduled reminder: prefers practices
    matching the user's intensity tier (or "any"), rotating through ones not
    yet marked done, then falling back to repeating from the top."""
    result = await session.execute(
        select(Practice)
        .where(Practice.category_id == category_id)
        .where(Practice.intensity.in_([intensity, "any"]))
        .order_by(Practice.order_index)
    )
    practices = result.scalars().all()
    if not practices:
        return None

    done_ids_result = await session.execute(
        select(UserProgress.practice_id)
        .where(UserProgress.user_id == user_id)
        .where(UserProgress.category_id == category_id)
        .where(UserProgress.status == "done")
    )
    done_ids = {row[0] for row in done_ids_result.all()}

    for practice in practices:
        if practice.id not in done_ids:
            return practice

    # Everyone's been done at least once -- start the rotation over.
    return practices[0]


async def get_or_create_streak(
    session: AsyncSession, user_id: int, category_id: int
) -> UserStreak:
    result = await session.execute(
        select(UserStreak)
        .where(UserStreak.user_id == user_id)
        .where(UserStreak.category_id == category_id)
    )
    streak = result.scalar_one_or_none()
    if streak is None:
        streak = UserStreak(user_id=user_id, category_id=category_id)
        session.add(streak)
        await session.flush()
    return streak


async def register_done(session: AsyncSession, user_id: int, category_id: int) -> UserStreak:
    streak = await get_or_create_streak(session, user_id, category_id)
    streak.current_streak += 1
    streak.misses_in_a_row = 0
    streak.longest_streak = max(streak.longest_streak, streak.current_streak)
    return streak


async def register_miss(session: AsyncSession, user_id: int, category_id: int) -> UserStreak:
    """Soft streak: a single missed/skipped day doesn't reset progress --
    only STREAK_GRACE_MISSES in a row does."""
    streak = await get_or_create_streak(session, user_id, category_id)
    streak.misses_in_a_row += 1
    if streak.misses_in_a_row >= STREAK_GRACE_MISSES:
        streak.current_streak = 0
    return streak
