#!/usr/bin/env bash
set -euo pipefail

# Serve the KRC folder over HTTP to test locally.
# Usage: PORT=8000 bash KRC/scripts/serve.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KRC_DIR="${SCRIPT_DIR%/scripts}"
ROOT_DIR="$(dirname "${KRC_DIR}")"

PORT="${PORT:-8000}"

cd "$ROOT_DIR"
echo "Serving repo root at http://localhost:${PORT} (Ctrl+C to stop)"
echo "Open: http://localhost:${PORT}/ (redirects to /KRC/index.html)"
echo "If accessing from another machine: http://<SERVER_IP>:${PORT}/"
python3 -m http.server "${PORT}" --bind 0.0.0.0
