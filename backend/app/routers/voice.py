from fastapi import APIRouter, File, HTTPException, Query, UploadFile
from fastapi.responses import Response

from app.config import settings
from app.models.schemas import (
    SttErrorResponse,
    SttResponse,
    TtsErrorResponse,
    TtsRequest,
)
from app.services import stt as stt_service
from app.services import tts as tts_service

router = APIRouter(prefix="/voice", tags=["voice"])

MAX_AUDIO_BYTES = 15 * 1024 * 1024


@router.post(
    "/stt",
    response_model=SttResponse,
    responses={503: {"model": SttErrorResponse}},
)
async def speech_to_text(
    audio: UploadFile = File(...),
    locale: str = Query("tr"),
) -> SttResponse:
    if not settings.voice_enabled:
        raise HTTPException(
            status_code=503,
            detail={"status": "disabled", "message": "Voice features are disabled."},
        )

    if not stt_service.stt_available():
        msg = stt_service.stt_status_message() or "STT not ready"
        raise HTTPException(
            status_code=503,
            detail={"status": "not_ready", "message": msg},
        )

    raw = await audio.read()
    if not raw:
        raise HTTPException(status_code=400, detail="Empty audio file.")
    if len(raw) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=400, detail="Audio file too large (max 15 MB).")

    loc = "tr" if locale.lower().startswith("tr") else "en"

    try:
        text, language, duration = stt_service.transcribe_audio(
            raw,
            filename=audio.filename,
            locale=loc,
        )
    except RuntimeError as exc:
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "message": str(exc)},
        ) from exc

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail="Could not transcribe audio. Speak clearly and try again.",
        )

    return SttResponse(text=text, language=language, duration_seconds=duration)


@router.post("/tts")
async def text_to_speech(body: TtsRequest) -> Response:
    if not settings.voice_enabled:
        raise HTTPException(
            status_code=503,
            detail={"status": "disabled", "message": "Voice features are disabled."},
        )

    if not tts_service.tts_available():
        msg = tts_service.tts_status_message() or "TTS not ready"
        raise HTTPException(
            status_code=503,
            detail={"status": "not_ready", "message": msg},
        )

    try:
        wav_bytes = tts_service.synthesize_wav(body.text)
    except (RuntimeError, ValueError, FileNotFoundError) as exc:
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "message": str(exc)},
        ) from exc

    return Response(
        content=wav_bytes,
        media_type="audio/wav",
        headers={"Content-Disposition": 'inline; filename="twin-reply.wav"'},
    )
