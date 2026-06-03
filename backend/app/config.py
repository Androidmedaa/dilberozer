from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "qwen2.5:7b-instruct"
    ollama_num_predict: int = 512
    knowledge_dir: str = "../knowledge"
    cors_origins: str = "http://localhost:3000"
    max_context_chars: int = 24_000

    voice_enabled: bool = True
    whisper_model: str = "large-v3"
    whisper_device: str = "cuda"
    whisper_compute_type: str = "float16"
    piper_model_path: str = "../models/piper/tr_TR-dfki-medium.onnx"
    piper_use_cuda: bool = True
    piper_binary: str = ""

    @property
    def knowledge_path(self) -> Path:
        raw = Path(self.knowledge_dir)
        if raw.is_absolute():
            return raw
        # backend/app/config.py -> backend -> repo root
        backend_root = Path(__file__).resolve().parents[1]
        return (backend_root / raw).resolve()

    @property
    def piper_model_path_resolved(self) -> Path:
        raw = Path(self.piper_model_path)
        if raw.is_absolute():
            return raw
        backend_root = Path(__file__).resolve().parents[1]
        return (backend_root / raw).resolve()

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
