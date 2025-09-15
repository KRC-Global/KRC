#!/usr/bin/env bash
set -euo pipefail

# Serve the KRC Global Map application over HTTP to test locally.
# Usage: PORT=8000 bash scripts/serve.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR%/scripts}"

PORT="${PORT:-8000}"

cd "$ROOT_DIR"
echo "Serving KRC Global Map at http://localhost:${PORT} (Ctrl+C to stop)"
echo "Open: http://localhost:${PORT}/ (serves index.html directly)"
echo "If accessing from another machine: http://<SERVER_IP>:${PORT}/"
python3 -m http.server "${PORT}" --bind 0.0.0.0
