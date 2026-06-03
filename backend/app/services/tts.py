"""Text-to-speech via Piper (Turkish, Phase 2)."""

from __future__ import annotations

import io
import logging
import shutil
import subprocess
import tempfile
from pathlib import Path

from app.config import settings

logger = logging.getLogger(__name__)

_piper_voice = None
_piper_load_error: str | None = None


def _resolve_piper_paths() -> tuple[Path, Path | None]:
    model = settings.piper_model_path_resolved
    if not model.exists():
        raise FileNotFoundError(
            f"Piper model not found: {model}. "
            "Run: bash scripts/download-piper-tr.sh from repo root."
        )
    config = Path(f"{model}.json")
    if not config.exists():
        config = None
    return model, config


def _load_piper_voice():
    global _piper_voice, _piper_load_error
    if _piper_voice is not None:
        return _piper_voice
    if _piper_load_error is not None:
        raise RuntimeError(_piper_load_error)

    model_path, config_path = _resolve_piper_paths()

    try:
        from piper import PiperVoice
    except ImportError as exc:
        _piper_load_error = "piper-tts not installed. Run: pip install piper-tts"
        raise RuntimeError(_piper_load_error) from exc

    try:
        use_cuda = settings.piper_use_cuda
        if config_path:
            _piper_voice = PiperVoice.load(
                str(model_path),
                config_path=str(config_path),
                use_cuda=use_cuda,
            )
        else:
            _piper_voice = PiperVoice.load(str(model_path), use_cuda=use_cuda)
        return _piper_voice
    except Exception as exc:
        _piper_load_error = f"Piper load failed: {exc}"
        logger.exception("Piper init failed")
        raise RuntimeError(_piper_load_error) from exc


def tts_available() -> bool:
    """True when model files exist and piper-tts is importable (lazy load)."""
    if not settings.voice_enabled:
        return False
    if not settings.piper_model_path_resolved.exists():
        return False
    if _piper_load_error is not None:
        return False
    try:
        from piper import PiperVoice  # noqa: F401
    except ImportError:
        return False
    return True


def tts_status_message() -> str | None:
    if not settings.voice_enabled:
        return "Voice disabled (VOICE_ENABLED=false)"
    if not settings.piper_model_path_resolved.exists():
        return f"Piper model missing: {settings.piper_model_path_resolved}"
    try:
        _load_piper_voice()
        return None
    except (RuntimeError, FileNotFoundError) as exc:
        return str(exc)


def synthesize_wav(text: str) -> bytes:
    """Return WAV audio bytes for the given text."""
    cleaned = text.strip()
    if not cleaned:
        raise ValueError("Empty text for TTS")

    # Prefer Python piper-tts
    try:
        return _synthesize_piper_python(cleaned)
    except RuntimeError:
        pass

    if settings.piper_binary:
        return _synthesize_piper_cli(cleaned)

    raise RuntimeError(
        "TTS unavailable: install piper-tts (pip install piper-tts) "
        "or set PIPER_BINARY to the piper executable."
    )


def _synthesize_piper_python(text: str) -> bytes:
    import wave

    voice = _load_piper_voice()
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wav_file:
        voice.synthesize_wav(text, wav_file)
    return buffer.getvalue()


def _synthesize_piper_cli(text: str) -> bytes:
    model_path, _ = _resolve_piper_paths()
    piper_bin = settings.piper_binary
    if not piper_bin or not shutil.which(piper_bin):
        raise RuntimeError(f"Piper binary not found: {piper_bin}")

    with tempfile.TemporaryDirectory() as tmp:
        out_path = Path(tmp) / "out.wav"
        proc = subprocess.run(
            [
                piper_bin,
                "--model",
                str(model_path),
                "--output_file",
                str(out_path),
            ],
            input=text.encode("utf-8"),
            capture_output=True,
            timeout=120,
            check=False,
        )
        if proc.returncode != 0 or not out_path.exists():
            stderr = proc.stderr.decode("utf-8", errors="replace")
            raise RuntimeError(f"Piper CLI failed: {stderr or proc.returncode}")
        return out_path.read_bytes()
