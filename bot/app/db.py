from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.config import DATABASE_URL
from app.models import Base, Category, Practice
from app.seed_data import CATEGORIES

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, expire_on_commit=False)


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        await _seed_if_empty(session)


async def _seed_if_empty(session: AsyncSession) -> None:
    existing = (await session.execute(select(Category.id))).first()
    if existing:
        return

    for cat_data in CATEGORIES:
        category = Category(
            code=cat_data["code"],
            name=cat_data["name"],
            description=cat_data["description"],
            price_rub=cat_data["price_rub"],
        )
        session.add(category)
        await session.flush()  # get category.id

        for index, practice_data in enumerate(cat_data["practices"]):
            session.add(
                Practice(
                    category_id=category.id,
                    title=practice_data["title"],
                    instruction_text=practice_data["instruction_text"],
                    audio_url=practice_data.get("audio_url"),
                    duration_min=practice_data["duration_min"],
                    is_free=practice_data["is_free"],
                    intensity=practice_data["intensity"],
                    order_index=index,
                )
            )

    await session.commit()
