# AI Digital Twin — Backend

Open-source stack: **Ollama (LLM)** + JSON RAG + **faster-whisper (STT)** + **Piper TR (TTS)**.

## Quick start

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

### Ollama (LLM)

```bash
ollama pull qwen2.5:7b-instruct
ollama serve
```

### Phase 2 — Voice models

From **repo root**:

```bash
bash scripts/download-piper-tr.sh
```

First STT run downloads the Whisper weights automatically (`WHISPER_MODEL=base` by default).

**GPU (STT + TTS):** `backend/.env` defaults to CUDA, or run from repo root:

```bash
bash scripts/setup-gpu.sh
pip install -r requirements-gpu.txt   # inside backend venv
```

```env
WHISPER_MODEL=large-v3
WHISPER_DEVICE=cuda
WHISPER_COMPUTE_TYPE=float16
PIPER_USE_CUDA=true
```

### Run API

From `backend/`:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health — check `stt_ready`, `tts_ready`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Ollama + knowledge + voice status |
| POST | `/api/v1/chat` | `{ message, mode, locale }` |
| POST | `/api/v1/voice/stt` | `multipart/form-data` field `audio` |
| POST | `/api/v1/voice/tts` | `{ text, locale }` → `audio/wav` |

## Test voice

```bash
# STT (replace sample.webm with a recording)
curl -X POST "http://localhost:8000/api/v1/voice/stt?locale=tr" \
  -F "audio=@sample.webm"

# TTS
curl -X POST http://localhost:8000/api/v1/voice/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Merhaba, ben Dilber Özer.","locale":"tr"}' \
  --output reply.wav
```

## Next.js

Root `.env.local`:

```env
TWIN_BACKEND_URL=http://localhost:8000
```

Open http://localhost:3000/twin — microphone + spoken replies.
