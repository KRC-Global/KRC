KRC Global Map — Developer Guide

Overview

- Static web app (no build). Mapping via Leaflet + OSM tiles.
- Data source: JSON files `data/global_oda.json`, `data/global_consulting.json`.
- Edit Mode: Disabled in production build (toggle/button hidden). Keep `editMode=false`.
- Address search: Nominatim-based geocoding (online).
- UI panels:
  - Country Hub (right on desktop, bottom on mobile): continent quadrants + flag grid + stats
  - Compact wine timeline in country modal with Gantt-style lanes

Run Locally

- npm: `npm start` (custom port: `PORT=8080 npm start`)
- Python: `PORT=8000 bash scripts/serve.sh`
- Open: `http://localhost:8000/`

Data Workflow

- Convert Excel → JSON: `python3 scripts/convert_xlsx_to_json.py`
  - Writes: `data/global_oda.json`, `data/global_consulting.json`
- In-browser edits: currently disabled in UI. To re-enable for development, restore the edit toggle button visibility and original `toggleEditMode()` body in `index.html`.

Troubleshooting

- Port in use: change port (`PORT=8080 ...`).
- Python missing: `python -m http.server 8000` in `KRC`.
- External access: open chosen port in firewall/security group.
- Loading stuck:
  - Ensure you run via server (not `file://`). JSON fetch fails on `file://`.
  - Check console for CDN failures (Leaflet). If blocked, consider local fallback.
  - A watchdog hides the loader after ~8s and shows a warning toast.

Timeline Specific

- Year parsing: supports `'72-10`, `‘20-’25`, `2005-06`, `2018-2022`, `1998`.
- 2-digit rule: `00–29 → 2000–2029`, `30–99 → 1930–1999`.
- Exact range: min start → max end, no padding years.
- Gantt lanes: non-overlapping badges; height adapts to lane count.
- One-liner: `cd KRC && python3 -m http.server 8000 --bind 0.0.0.0`

2025-09-17 Updates

- Client filter bar (Consulting-only): when only Consulting is selected, a client (발주처) filter bar appears under the summary.
  - Default: All clients selected. The ‘전체’ button toggles all on/off. If all off, consulting projects are hidden.
  - WB/IDA unify: WB, World Bank, WB(IDA), IDA map to 'WB'.
  - Governments unify: names with ‘정부’, Government/Ministry, or ‘브루나이’ map to ‘각국정부’.
 - Country grid reflects active filters: only countries with visible projects are shown.
- Flags: left/right numeric badges show Consulting/ODA counts (respect current filters). Badge size tuned for mobile (14px, font 9px).
- Flag click: map focuses (fitBounds) to make country border area visible.
- Timeline improvements:
  - Compressed axis skipping empty years; future projects appear to the right of the current marker.
  - Future year markers (dot/label) move with their event position.
  - Current marker: dotted wine vertical line with [현재] chip + YYYY.MM label near the axis.
  - ODA ongoing uses deep orange (#E65100) with white text/badges.
- Mobile pinch zoom: pinch gesture controls zoom (0.5x–3x); layout reflows and auto-scrolls to current marker.

Data hygiene

- Excel normalization (ad-hoc via openpyxl and during load):
  - Normalize WB/IDA to 'WB', and ‘정부’/Government/Ministry/브루나이 to ‘각국정부’.
  - Regenerate `data/global_consulting.json` after edits: `python3 scripts/convert_xlsx_to_json.py`.

Notes

- Archived pages under `archive/versions/` are historical snapshots (may contain old clustering/ Firebase code). The live app is `KRC/index.html`.
- No backend/DB used; “admin” is a client-local concept only.
