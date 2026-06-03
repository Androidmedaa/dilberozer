#!/usr/bin/env bash
# Apply GPU settings for Digital Twin backend (run on GPU server).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND="$ROOT/backend"

echo "==> Piper model"
bash "$ROOT/scripts/download-piper-tr.sh"

echo "==> Python deps (GPU)"
cd "$BACKEND"
python3 -m venv .venv 2>/dev/null || true
source .venv/bin/activate
pip install -r requirements.txt -r requirements-gpu.txt
pip uninstall -y onnxruntime 2>/dev/null || true

if [ ! -f .env ]; then
  cp .env.example .env
fi

echo "==> GPU .env (Whisper cuda + Piper CUDA)"
grep -q WHISPER_DEVICE=cuda .env || {
  cat >> .env <<'EOF'

WHISPER_MODEL=large-v3
WHISPER_DEVICE=cuda
WHISPER_COMPUTE_TYPE=float16
PIPER_USE_CUDA=true
EOF
}

echo "==> Ollama model (GPU)"
ollama pull qwen2.5:7b-instruct

echo "Done. Start:"
echo "  ollama serve"
echo "  cd backend && source .venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000"
echo "Check: curl -s http://localhost:8000/api/v1/health"
