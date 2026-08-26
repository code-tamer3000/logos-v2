from aiogram.fsm.state import State, StatesGroup


class Onboarding(StatesGroup):
    waiting_for_state_text = State()


class PurchaseFlow(StatesGroup):
    waiting_intensity = State()
    waiting_timezone = State()
    waiting_time = State()
