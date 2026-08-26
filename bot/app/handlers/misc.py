from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from sqlalchemy import func, select

from app.config import ADMIN_IDS
from app.db import async_session
from app.models import Category, User, UserAccess, UserProgress

router = Router()

HELP_TEXT = (
    "/start — начать заново и выбрать раздел практик\n"
    "/practices — архив практик из купленных разделов\n"
    "/help — это сообщение"
)


@router.message(Command("help"))
async def cmd_help(message: Message) -> None:
    await message.answer(HELP_TEXT)


@router.message(Command("stats"))
async def cmd_stats(message: Message) -> None:
    """Simple 'analytics for you' view: how many people actually practice,
    where they drop off -- per the spec's MVP note that this can just be a
    SQL/admin-command view before a full dashboard is built."""
    if message.from_user.id not in ADMIN_IDS:
        return

    async with async_session() as session:
        total_users = (await session.execute(select(func.count(User.id)))).scalar_one()

        lines = [f"Всего пользователей: {total_users}", ""]

        categories = (await session.execute(select(Category))).scalars().all()
        for category in categories:
            purchases = (
                await session.execute(
                    select(func.count(UserAccess.id)).where(
                        UserAccess.category_id == category.id, UserAccess.status == "active"
                    )
                )
            ).scalar_one()

            done = (
                await session.execute(
                    select(func.count(UserProgress.id)).where(
                        UserProgress.category_id == category.id, UserProgress.status == "done"
                    )
                )
            ).scalar_one()

            skipped = (
                await session.execute(
                    select(func.count(UserProgress.id)).where(
                        UserProgress.category_id == category.id, UserProgress.status == "skipped"
                    )
                )
            ).scalar_one()

            users_with_done = (
                await session.execute(
                    select(func.count(func.distinct(UserProgress.user_id))).where(
                        UserProgress.category_id == category.id, UserProgress.status == "done"
                    )
                )
            ).scalar_one()

            lines.append(
                f"«{category.name}»: покупок {purchases}, занимались хоть раз "
                f"{users_with_done}, выполнено {done}, пропущено {skipped}"
            )

    await message.answer("\n".join(lines))
