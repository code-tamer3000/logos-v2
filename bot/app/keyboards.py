from aiogram.types import InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from app.models import Category

TIMEZONES = [
    ("Калининград (МСК-1)", 120),
    ("Москва (МСК)", 180),
    ("Самара (МСК+1)", 240),
    ("Екатеринбург (МСК+2)", 300),
    ("Омск (МСК+3)", 360),
    ("Красноярск (МСК+4)", 420),
    ("Иркутск (МСК+5)", 480),
    ("Владивосток (МСК+7)", 600),
]

TIME_SLOTS = [
    ("Утро, 08:00", "08:00"),
    ("День, 13:00", "13:00"),
    ("Вечер, 20:00", "20:00"),
]

INTENSITY_LABELS = {
    "easy": "Легкий (2 раза в неделю)",
    "medium": "Средний (через день)",
    "hard": "Интенсивный (каждый день)",
    "free": "Свободный (без напоминаний)",
}


def categories_kb(categories: list[Category]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for category in categories:
        builder.button(text=category.name, callback_data=f"cat:{category.code}")
    builder.adjust(1)
    return builder.as_markup()


def confirm_category_kb(code: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="Да, то самое", callback_data=f"cat:{code}")
    builder.button(text="Нет, выбрать вручную", callback_data="cat:manual")
    builder.adjust(1)
    return builder.as_markup()


def upsell_kb(code: str, price: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text=f"Купить доступ — {price} ₽", callback_data=f"buy:{code}")
    builder.button(text="Попробовать другой раздел", callback_data="cat:manual")
    builder.adjust(1)
    return builder.as_markup()


def mock_payment_kb(code: str, price: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text=f"Оплатить {price} ₽ (mock)", callback_data=f"pay:{code}")
    builder.adjust(1)
    return builder.as_markup()


def intensity_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for level, label in INTENSITY_LABELS.items():
        builder.button(text=label, callback_data=f"intensity:{level}")
    builder.adjust(1)
    return builder.as_markup()


def timezone_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for label, offset in TIMEZONES:
        builder.button(text=label, callback_data=f"tz:{offset}")
    builder.adjust(2)
    return builder.as_markup()


def time_slot_kb() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for label, value in TIME_SLOTS:
        builder.button(text=label, callback_data=f"time:{value}")
    builder.adjust(1)
    return builder.as_markup()


def reminder_kb(reminder_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.button(text="Сделал ✅", callback_data=f"rem:{reminder_id}:done")
    builder.button(text="Позже ⏰", callback_data=f"rem:{reminder_id}:postpone")
    builder.button(text="Пропустить", callback_data=f"rem:{reminder_id}:skip")
    builder.adjust(3)
    return builder.as_markup()


def archive_categories_kb(categories: list[Category]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for category in categories:
        builder.button(text=category.name, callback_data=f"arch_cat:{category.code}")
    builder.adjust(1)
    return builder.as_markup()


def archive_practices_kb(code: str, practices) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for practice in practices:
        builder.button(text=practice.title, callback_data=f"arch_pr:{practice.id}")
    builder.button(text="« Назад к разделам", callback_data="arch_back")
    builder.adjust(1)
    return builder.as_markup()
