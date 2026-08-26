from aiogram import Router

from app.handlers.archive import router as archive_router
from app.handlers.misc import router as misc_router
from app.handlers.onboarding_schedule import router as onboarding_router
from app.handlers.payment import router as payment_router
from app.handlers.start import router as start_router
from app.handlers.tracking import router as tracking_router

__all__ = ["get_root_router"]


def get_root_router() -> Router:
    root = Router()
    root.include_router(start_router)
    root.include_router(payment_router)
    root.include_router(onboarding_router)
    root.include_router(tracking_router)
    root.include_router(archive_router)
    root.include_router(misc_router)
    return root
