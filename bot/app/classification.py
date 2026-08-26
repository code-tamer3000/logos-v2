"""Rule-based (keyword) classification of free-text state descriptions into
one of the 6 categories. The spec's recommended MVP approach: fast, zero
external dependency, with a confirm-button fallback to manual selection so a
wrong guess costs nothing (variant "Б с фолбэком на А")."""

CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "anxiety": [
        "тревог",
        "паник",
        "боюсь",
        "страш",
        "стресс",
        "нервнича",
        "волну",
        "паническ",
        "не могу успокоиться",
    ],
    "sleep": [
        "сон",
        "спать",
        "уснуть",
        "бессонниц",
        "устал",
        "вымотан",
        "восстанов",
        "выспа",
    ],
    "focus": [
        "сосредоточ",
        "фокус",
        "отвлека",
        "концентрац",
        "осознанн",
        "внимани",
        "залипаю",
        "прокрастин",
    ],
    "subconscious": [
        "убежден",
        "программ",
        "подсознан",
        "детск",
        "паттерн",
        "гипноз",
        "транс",
    ],
    "affirmations": [
        "уныни",
        "апат",
        "вера в себя",
        "поддержк",
        "вдохновени",
        "депресс",
        "опустились руки",
        "нет сил",
    ],
    "prayer": [
        "бог",
        "молитв",
        "дух",
        "вера",
        "наставник",
        "душ",
    ],
}

CRISIS_KEYWORDS = [
    "суицид",
    "не хочу жить",
    "покончить с собой",
    "убить себя",
    "нет смысла жить",
    "самоповрежд",
    "причинить себе вред",
]


def is_crisis(text: str) -> bool:
    lowered = text.lower()
    return any(keyword in lowered for keyword in CRISIS_KEYWORDS)


def classify(text: str) -> str | None:
    """Returns the best-matching category code, or None if nothing matched
    clearly enough (caller should fall back to showing all 6 buttons)."""
    lowered = text.lower()
    scores: dict[str, int] = {}

    for code, keywords in CATEGORY_KEYWORDS.items():
        hits = sum(1 for kw in keywords if kw in lowered)
        if hits:
            scores[code] = hits

    if not scores:
        return None

    return max(scores, key=scores.get)
