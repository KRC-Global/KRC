KRC Global Map — Developer Guide

Overview

- Static web app (no build). Mapping via Leaflet + OSM tiles.
- Data source: JSON files `data/global_oda.json`, `data/global_consulting.json`.
- Edit Mode: In-browser editing, draggable markers, JSON export/import.
- Address search: Nominatim-based geocoding (online).
- UI panels:
  - Left-top Control Panel: address search + edit controls.
  - Right-bottom Country Hub: continent-quadrant flag buttons + country stats.

Run Locally

- npm: `npm start` (custom port: `PORT=8080 npm start`)
- Python: `PORT=8000 bash scripts/serve.sh`
- Open: `http://localhost:8000/` (redirects to `/KRC/index.html`)

Data Workflow

- Convert Excel → JSON: `python3 scripts/convert_xlsx_to_json.py`
  - Writes: `data/global_oda.json`, `data/global_consulting.json`
- In-browser edits: toggle “✏️ 편집 모드”
  - Edit a project in popup → modal → Save
  - Drag selected marker to adjust coords (updates modal lat/lng)
  - “➕ 새 지점” to add new project at current map center
  - Export: “💾 JSON 내보내기” (download both JSONs)
  - Import: “📥 JSON 불러오기” (preview locally)

Troubleshooting

- Port in use: change port (`PORT=8080 ...`).
- Python missing: `python -m http.server 8000` in `KRC`.
- External access: open chosen port in firewall/security group.
- Loading stuck: check browser console. Filters/search are optional; app runs without them.
- One-liner: `cd KRC && python3 -m http.server 8000 --bind 0.0.0.0`

Notes

- Archived pages under `archive/versions/` are historical snapshots (contain old Firebase code). The live app is `KRC/index.html`.
- No backend/DB used; “admin” is a client-local concept only.
