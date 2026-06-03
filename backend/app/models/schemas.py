from typing import Literal

from pydantic import BaseModel, Field


ChatMode = Literal["default", "interview", "skills"]


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    mode: ChatMode = "default"
    locale: Literal["tr", "en"] = "tr"


class ChatResponse(BaseModel):
    reply: str
    mode: ChatMode
    sources_used: list[str]
    model: str | None = None
    fallback: bool = False


class HealthResponse(BaseModel):
    status: str
    ollama: bool
    knowledge_chunks: int
    voice_enabled: bool = False
    stt_ready: bool = False
    tts_ready: bool = False
    stt_message: str | None = None
    tts_message: str | None = None
    whisper_device: str | None = None
    piper_cuda: bool = False


class SttResponse(BaseModel):
    text: str
    language: str
    duration_seconds: float = 0.0


class SttErrorResponse(BaseModel):
    status: str
    message: str


class TtsRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000)
    locale: Literal["tr", "en"] = "tr"


class TtsErrorResponse(BaseModel):
    status: str
    message: str
