from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    telegram_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(255), default="")
    # Minutes offset from UTC, e.g. Moscow = 180.
    utc_offset_minutes: Mapped[int] = mapped_column(Integer, default=180)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(32), unique=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(1024), default="")
    price_rub: Mapped[int] = mapped_column(Integer, default=990)

    practices: Mapped[list["Practice"]] = relationship(back_populates="category")


class Practice(Base):
    __tablename__ = "practices"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    title: Mapped[str] = mapped_column(String(255))
    instruction_text: Mapped[str] = mapped_column(String(4096))
    audio_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    duration_min: Mapped[int] = mapped_column(Integer, default=10)
    is_free: Mapped[bool] = mapped_column(Boolean, default=False)
    # "easy" | "medium" | "hard" | "any" -- which intensity tiers include this practice.
    intensity: Mapped[str] = mapped_column(String(16), default="any")
    order_index: Mapped[int] = mapped_column(Integer, default=0)

    category: Mapped[Category] = relationship(back_populates="practices")


class UserAccess(Base):
    __tablename__ = "user_access"
    __table_args__ = (UniqueConstraint("user_id", "category_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    purchased_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(String(16), default="active")


class UserIntensity(Base):
    __tablename__ = "user_intensity"
    __table_args__ = (UniqueConstraint("user_id", "category_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    level: Mapped[str] = mapped_column(String(16))  # easy | medium | hard | free


class Schedule(Base):
    __tablename__ = "schedule"
    __table_args__ = (UniqueConstraint("user_id", "category_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    time_of_day: Mapped[str] = mapped_column(String(5))  # "HH:MM", user-local
    # Comma-separated Python weekday numbers (Mon=0 .. Sun=6).
    days_of_week: Mapped[str] = mapped_column(String(32))
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    last_sent_date: Mapped[str | None] = mapped_column(String(10), nullable=True)


class UserProgress(Base):
    __tablename__ = "user_progress"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    practice_id: Mapped[int] = mapped_column(ForeignKey("practices.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    date: Mapped[str] = mapped_column(String(10))  # "YYYY-MM-DD", user-local
    status: Mapped[str] = mapped_column(String(16))  # done | skipped | postponed
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class UserStreak(Base):
    __tablename__ = "user_streak"
    __table_args__ = (UniqueConstraint("user_id", "category_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    current_streak: Mapped[int] = mapped_column(Integer, default=0)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0)
    misses_in_a_row: Mapped[int] = mapped_column(Integer, default=0)


class Reminder(Base):
    """One scheduled/sent practice card, tracked so buttons and the 30-min
    nudge / 2h postpone follow-ups know what they're acting on."""

    __tablename__ = "reminders"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    practice_id: Mapped[int] = mapped_column(ForeignKey("practices.id"))
    chat_id: Mapped[int] = mapped_column(BigInteger)
    message_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(
        String(16), default="sent"
    )  # sent | done | postponed | skipped | expired
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
