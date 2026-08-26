"""Seed content for the 6 practice categories from the spec.

Real audio files/instruction texts should replace the placeholders here once
they're produced -- this seed only exists so the bot is runnable end-to-end.
"""

from pathlib import Path

AUDIO_DIR = Path(__file__).resolve().parent.parent / "assets" / "audio"

CATEGORIES = [
    {
        "code": "anxiety",
        "name": "Тревожность",
        "description": "Практики для снижения тревоги и работы с нервной системой в моменте.",
        "price_rub": 990,
        "practices": [
            {
                "title": "Дыхание 4-7-8",
                "instruction_text": (
                    "Сядьте удобно, закройте глаза. Вдох на 4 счёта — задержка на 7 — "
                    "выдох на 8. Повторите 4 цикла, наблюдая, как тело успокаивается."
                ),
                "duration_min": 5,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Сканирование тела",
                "instruction_text": (
                    "Медленно проведите вниманием от макушки до стоп, отмечая напряжение "
                    "и позволяя каждой части тела расслабиться на выдохе."
                ),
                "duration_min": 10,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Заземление 5-4-3-2-1",
                "instruction_text": (
                    "Назовите про себя 5 вещей, которые видите, 4 — которые слышите, "
                    "3 — которые чувствуете кожей, 2 запаха, 1 вкус."
                ),
                "duration_min": 8,
                "is_free": False,
                "intensity": "easy",
            },
            {
                "title": "Длинная практика стабилизации",
                "instruction_text": (
                    "Расширенная версия дыхательной практики с элементами визуализации "
                    "безопасного места."
                ),
                "duration_min": 20,
                "is_free": False,
                "intensity": "hard",
            },
        ],
    },
    {
        "code": "sleep",
        "name": "Сон и восстановление",
        "description": "Практики для качественного засыпания и восстановления нервной системы.",
        "price_rub": 990,
        "practices": [
            {
                "title": "Расслабление перед сном",
                "instruction_text": (
                    "Лягте, погасите свет. Дышите медленно, представляя, как с каждым "
                    "выдохом тело становится тяжелее и расслабленнее."
                ),
                "duration_min": 10,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Йога-нидра (короткая)",
                "instruction_text": (
                    "Практика осознанного расслабления лёжа — внимание последовательно "
                    "проходит по телу, отпуская напряжение."
                ),
                "duration_min": 15,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Полная йога-нидра",
                "instruction_text": "Расширенная практика глубокого восстановления, 30 минут.",
                "duration_min": 30,
                "is_free": False,
                "intensity": "hard",
            },
        ],
    },
    {
        "code": "focus",
        "name": "Внимание и осознанность",
        "description": "Тренировка способности направлять и удерживать фокус.",
        "price_rub": 990,
        "practices": [
            {
                "title": "Дыхание как якорь",
                "instruction_text": (
                    "Наблюдайте за дыханием, не меняя его. Как только заметили, что "
                    "мысли увели внимание — мягко возвращайтесь к дыханию."
                ),
                "duration_min": 7,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Однозадачность 10 минут",
                "instruction_text": (
                    "Выберите одно простое действие (чай, ходьба) и выполните его, "
                    "полностью удерживая внимание на процессе."
                ),
                "duration_min": 10,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Продвинутая практика концентрации",
                "instruction_text": "Удержание внимания на точке без опоры на дыхание, 20 минут.",
                "duration_min": 20,
                "is_free": False,
                "intensity": "hard",
            },
        ],
    },
    {
        "code": "subconscious",
        "name": "Подсознательные программы",
        "description": "Работа со страхами и убеждениями через трансовые техники и медитации.",
        "price_rub": 1490,
        "practices": [
            {
                "title": "Знакомство с внутренним наблюдателем",
                "instruction_text": (
                    "Мягкая медитация на разделение себя и своих мыслей — первый шаг "
                    "к работе с убеждениями."
                ),
                "duration_min": 12,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Работа с ограничивающим убеждением",
                "instruction_text": "Трансовая практика для мягкой проработки одного выбранного убеждения.",
                "duration_min": 25,
                "is_free": False,
                "intensity": "medium",
            },
        ],
    },
    {
        "code": "affirmations",
        "name": "Аффирмации",
        "description": "Практики для поддержки и укрепления внутреннего состояния.",
        "price_rub": 790,
        "practices": [
            {
                "title": "Утренние аффирмации",
                "instruction_text": (
                    "Произнесите вслух или про себя: 'Я справляюсь', 'У меня есть силы "
                    "на этот день', 'Я имею право на поддержку'."
                ),
                "duration_min": 5,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Аффирмации для трудного дня",
                "instruction_text": "Расширенный набор фраз поддержки с паузами для проживания.",
                "duration_min": 10,
                "is_free": False,
                "intensity": "easy",
            },
        ],
    },
    {
        "code": "prayer",
        "name": "Обращение к духовным наставникам",
        "description": "Практики молитвы и обращения за поддержкой — светский формат, без привязки к конфессии.",
        "price_rub": 790,
        "practices": [
            {
                "title": "Простая молитва-благодарность",
                "instruction_text": (
                    "В тишине произнесите то, за что благодарны сегодня, и попросите "
                    "поддержки на предстоящий день."
                ),
                "duration_min": 5,
                "is_free": True,
                "intensity": "any",
            },
            {
                "title": "Вечернее обращение",
                "instruction_text": "Практика подведения итогов дня с обращением за поддержкой.",
                "duration_min": 10,
                "is_free": False,
                "intensity": "easy",
            },
        ],
    },
]

# All practices within a category share one 10-second placeholder audio file
# (assets/audio/<code>.mp3) until real recordings are produced per practice.
for _category in CATEGORIES:
    _audio_path = str(AUDIO_DIR / f"{_category['code']}.mp3")
    for _practice in _category["practices"]:
        _practice["audio_url"] = _audio_path
