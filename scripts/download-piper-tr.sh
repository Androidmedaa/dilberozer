#!/usr/bin/env bash
# Download Turkish Piper voice for Digital Twin TTS (Phase 2).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/models/piper"
mkdir -p "$DEST"

BASE="https://huggingface.co/rhasspy/piper-voices/resolve/main/tr/tr_TR/dfki/medium"
ONNX="tr_TR-dfki-medium.onnx"
JSON="tr_TR-dfki-medium.onnx.json"

echo "Downloading Piper TR model to $DEST ..."

if command -v curl >/dev/null 2>&1; then
  curl -L --fail -o "$DEST/$ONNX" "$BASE/$ONNX"
  curl -L --fail -o "$DEST/$JSON" "$BASE/$JSON"
elif command -v wget >/dev/null 2>&1; then
  wget -O "$DEST/$ONNX" "$BASE/$ONNX"
  wget -O "$DEST/$JSON" "$BASE/$JSON"
else
  echo "Install curl or wget to download models."
  exit 1
fi

echo "Done. Set in backend/.env:"
echo "PIPER_MODEL_PATH=../models/piper/$ONNX"
