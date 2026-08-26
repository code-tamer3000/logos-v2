from aiogram.types import FSInputFile


def resolve_audio(audio_url: str):
    """`audio_url` is either a remote URL (production, e.g. S3/R2) or a local
    filesystem path (current placeholder assets) -- aiogram needs different
    wrappers for each when passed to send_audio/answer_audio."""
    if audio_url.startswith("http://") or audio_url.startswith("https://"):
        return audio_url
    return FSInputFile(audio_url)
