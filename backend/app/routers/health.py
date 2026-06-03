from fastapi import APIRouter

from app.config import settings
from app.models.schemas import HealthResponse
from app.services import stt as stt_service
from app.services import tts as tts_service
from app.services.knowledge import load_knowledge_chunks
from app.services.llm import check_ollama

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    chunks = load_knowledge_chunks()
    ollama_ok = await check_ollama()
    stt_ready = settings.voice_enabled and stt_service.stt_available()
    tts_ready = settings.voice_enabled and tts_service.tts_available()

    status = "ok"
    if not ollama_ok or (settings.voice_enabled and not (stt_ready and tts_ready)):
        status = "degraded"

    return HealthResponse(
        status=status,
        ollama=ollama_ok,
        knowledge_chunks=len(chunks),
        voice_enabled=settings.voice_enabled,
        stt_ready=stt_ready,
        tts_ready=tts_ready,
        stt_message=stt_service.stt_status_message(),
        tts_message=tts_service.tts_status_message(),
        whisper_device=settings.whisper_device,
        piper_cuda=settings.piper_use_cuda,
    )
