import os

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.environ["BOT_TOKEN"]
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./bot.db")
ADMIN_IDS = {
    int(x) for x in os.getenv("ADMIN_IDS", "").split(",") if x.strip().isdigit()
}

# Minutes after a practice is sent before we send a gentle nudge if the user
# hasn't pressed any button yet ("напоминание приходит через полчаса").
NUDGE_DELAY_MINUTES = 30

# Hours to wait before re-sending a postponed practice ("Позже -> через 2-3 часа").
POSTPONE_DELAY_HOURS = 2

# Consecutive missed scheduled practices before a streak is reset. Keeping
# this above 1 gives the "soft streak" behaviour the spec asks for: a single
# bad day doesn't wipe out the user's progress.
STREAK_GRACE_MISSES = 2
