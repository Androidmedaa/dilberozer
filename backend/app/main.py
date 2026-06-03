from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import chat, health, voice

app = FastAPI(
    title="Dilber Özer — AI Digital Twin API",
    description="Open-source LLM + RAG + voice (Phase 2: STT/TTS)",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
app.include_router(voice.router, prefix="/api/v1")


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "service": "dilber-ai-twin",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
