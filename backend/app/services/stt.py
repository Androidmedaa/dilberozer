"""Speech-to-text via faster-whisper (Phase 2)."""

from __future__ import annotations

import logging
import tempfile
from pathlib import Path

from app.config import settings

logger = logging.getLogger(__name__)

_whisper_model = None
_whisper_load_error: str | None = None


def _get_whisper_model():
    global _whisper_model, _whisper_load_error
    if _whisper_model is not None:
        return _whisper_model
    if _whisper_load_error is not None:
        raise RuntimeError(_whisper_load_error)

    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        _whisper_load_error = (
            "faster-whisper not installed. Run: pip install faster-whisper"
        )
        raise RuntimeError(_whisper_load_error) from exc

    try:
        _whisper_model = WhisperModel(
            settings.whisper_model,
            device=settings.whisper_device,
            compute_type=settings.whisper_compute_type,
        )
        return _whisper_model
    except Exception as exc:
        _whisper_load_error = f"Whisper model load failed: {exc}"
        logger.exception("Whisper init failed")
        raise RuntimeError(_whisper_load_error) from exc


def stt_available() -> bool:
    """True when STT can be attempted (does not eagerly load the model)."""
    if not settings.voice_enabled:
        return False
    try:
        from faster_whisper import WhisperModel  # noqa: F401
    except ImportError:
        return False
    return _whisper_load_error is None


def stt_status_message() -> str | None:
    if not settings.voice_enabled:
        return "Voice disabled (VOICE_ENABLED=false)"
    try:
        from faster_whisper import WhisperModel  # noqa: F401
    except ImportError:
        return "faster-whisper not installed"
    try:
        _get_whisper_model()
        return None
    except RuntimeError as exc:
        return str(exc)


def transcribe_audio(
    audio_bytes: bytes,
    filename: str | None = None,
    locale: str = "tr",
) -> tuple[str, str, float]:
    """
    Returns (text, detected_language, duration_seconds).
    """
    suffix = _suffix_for_filename(filename)
    lang = "tr" if locale == "tr" else None

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = Path(tmp.name)

    try:
        model = _get_whisper_model()
        segments, info = model.transcribe(
            str(tmp_path),
            language=lang,
            vad_filter=True,
        )
        parts = [segment.text.strip() for segment in segments if segment.text.strip()]
        text = " ".join(parts).strip()
        detected = info.language or locale
        duration = float(info.duration or 0.0)
        return text, detected, duration
    finally:
        tmp_path.unlink(missing_ok=True)


def _suffix_for_filename(filename: str | None) -> str:
    if not filename:
        return ".webm"
    lower = filename.lower()
    for ext in (".webm", ".wav", ".mp3", ".m4a", ".ogg", ".flac"):
        if lower.endswith(ext):
            return ext
    return ".webm"
