# Open-source AI stack — Digital Twin

Phase 1 (current): **Ollama + JSON RAG + FastAPI + Next.js text chat**

## Components

| Layer | Phase 1 | Phase 2+ |
|-------|---------|----------|
| LLM | Ollama (`qwen2.5:7b-instruct`) | vLLM on GPU |
| RAG | Keyword retrieval over `knowledge/*.json` | PostgreSQL + pgvector + bge-m3 |
| STT | faster-whisper (`/api/v1/voice/stt`) | GPU `large-v3` |
| TTS | Piper TR (`/api/v1/voice/tts`) | — |
| Avatar | Static image on `/twin` | Wav2Lip / SadTalker |

## Run locally

```bash
# Terminal 1 — Ollama
ollama pull qwen2.5:7b-instruct
ollama serve

# Terminal 2 — Backend
cd backend
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Terminal 3 — Frontend
# .env.local: TWIN_BACKEND_URL=http://localhost:8000
npm run dev
```

Visit: http://localhost:3000/twin

## API

- `GET /api/v1/health` — Ollama + knowledge status
- `POST /api/v1/chat` — `{ message, mode, locale }`
- `POST /api/v1/voice/stt` — multipart audio
- `POST /api/v1/voice/tts` — JSON `{ text, locale }` → WAV

## Modes

- `default` — general questions about Dilber
- `interview` — recruiter-style technical Q&A
- `skills` — skills and projects focus

## Deployment note

- **Vercel**: Next.js only
- **GPU VPS / home server**: FastAPI + Ollama + (later) Whisper + Piper
- Set `TWIN_BACKEND_URL` on Vercel to your public API URL
