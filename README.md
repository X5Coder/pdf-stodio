# PDF Studio

A project-based PDF editor and organizer built to work with any AI coding agent.
Each project is fully independent and defines its own visual rules in `style.md`.
Pages are React components, previewed live in the browser, and exported as a valid PDF.

> The canonical agent instructions live in [`AGENTS.md`](./AGENTS.md). Read that file first if you are an AI agent working in this repository.

---

## Table of contents

1. [What you get](#1-what-you-get)
2. [Requirements](#2-requirements)
3. [Step 1 — Install and run](#step-1--install-and-run)
4. [Step 2 — Create your first project](#step-2--create-your-first-project)
5. [Step 3 — Build pages](#step-3--build-pages)
6. [Step 4 — Preview and export](#step-4--preview-and-export)
7. [Step 5 — Audit before delivering](#step-5--audit-before-delivering)
8. [Step 6 — Back up your work](#step-6--back-up-your-work)
9. [Repository map](#repository-map)
10. [Project anatomy](#project-anatomy)
11. [Design system (engine)](#design-system-engine)
12. [Engine HTTP API](#engine-http-api)
13. [Troubleshooting](#troubleshooting)

---

## 1. What you get

| Piece | What it does |
|---|---|
| `engine/` | Vite + React preview app: project picker, page navigation, live preview, PDF export |
| `projects/` | One folder per project (`style.md` + `project.json` + `page-N/`) |
| `fonts/` | Optional shared fonts (only if explicitly requested) |
| `tools/` | Helper scripts (image search, font search) |
| `tests/` | Audit suite: image inspection, screen checks, layout/content checks |
| `backup/` | One-click ZIP backup of any folder |
| `AGENTS.md` | The agent protocol (boot → project overview → build pages) |

Export is fully client-side (`html-to-image` renders each page, `jsPDF` assembles the PDF).
**LibreOffice is not required** and is not used anywhere in this project.

---

## 2. Requirements

- **Windows 10/11** for the `backup/` scripts (`.bat` + PowerShell 5.1, already installed)
- **Node.js 18+** and **npm** (the engine itself is cross-platform)
- A modern browser (Chrome/Edge)
- No database, no server setup, no global installation

---

## Step 1 — Install and run

1. Open a terminal in the repository root:

   ```bash
   cd pdf-stodio
   ```

2. Install the engine dependencies (first time only):

   ```bash
   cd engine
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the URL the terminal prints (default **http://localhost:5173**).

You can also double-click **`engine/start-dev.bat`** instead of steps 2–3 (it installs nothing, it just starts the server).

Keep the server running for the whole session. Every time you edit a page, the browser reloads automatically.

---

## Step 2 — Create your first project

You have two options.

### Option A — From the interface

1. On the start screen, click the big **`+`** button.
2. Enter a project name, a short description, page format (A4 portrait or slide), and language/direction.
3. The engine creates this automatically:

   ```
   projects/<your-project>/
   ├── style.md
   ├── project.json
   ├── font/
   └── page-1/
       ├── page.jsx
       └── images/
   ```

4. The new project appears on the start screen (the dev server restarts automatically).

### Option B — Ask the agent

Tell the agent the project name and the visual style you want. It will ask for the style details, then create `style.md`, `project.json`, `font/`, and `page-1/page.jsx`.

> **`style.md` is mandatory.** No project can be built without it. It defines page size/orientation, language and direction, palette, typography, layout and print constraints.

---

## Step 3 — Build pages

1. Open the project from the start screen.
2. Each page lives in its own folder and is a normal React component:

   ```
   projects/<project>/page-2/page.jsx
   ```

   ```jsx
   import { Page } from '@ds/index.js';

   export default function Page02({ pageNo = 2, total = 10 }) {
     return (
       <Page pageNo={pageNo} total={total} footer>
         <h1 style={{ fontSize: 21.5, margin: 0 }}>Page title</h1>
         <p style={{ fontSize: 15, lineHeight: 1.6 }}>
           Your content here.
         </p>
       </Page>
     );
   }
   ```

3. Put images in the page's own `images/` folder and reference them with relative paths:

   ```jsx
   <img src={new URL('./images/chart.png', import.meta.url).href} alt="Chart" />
   ```

4. After adding a page, update `totalPages` in `project.json`.
5. The engine discovers pages automatically: `projects/*/page-N/page.jsx` (or `content.jsx`).

**Golden rule:** every page must respect that project's `style.md`. Never reuse styles, fonts, or assets from another project.

---

## Step 4 — Preview and export

- **Preview:** `/projectId/p/1`, `/projectId/p/2`, … or `/projectId/all` for all pages.
- **Export:** use the download / convert-to-PDF button in the top bar.
- The export converts each `.pdf-page` element to a high-resolution image (2×) and assembles a pixel-accurate PDF with no extra margins.

Because export rasterizes pages:

- Links inside pages are **not** clickable in the final PDF.
- Animations and transitions are captured in a single frame.
- `position: fixed` / `sticky` may land in the wrong place.

The audit suite (next step) checks all of these.

---

## Step 5 — Audit before delivering

`tests/` contains an audit suite that catches problems invisible to the eye: content overflowing the page, overlapping text, blurry images, weak contrast, wrong page size.

```bash
cd tests
npm install          # first time only
node audit.mjs --self-test        # verifies the tool itself
```

Then:

```bash
# whole project
node audit.mjs --project <id>

# one page
node audit.mjs --project <id> --page 2

# everything, fail on warnings too
node audit.mjs --all --strict

# images only (no browser)
node audit.mjs --image ../projects/<id>/page-1/images
```

Reports are written to `tests/out/<timestamp>/`:

```
report.html   ← open in a browser
report.md     ← compact, agent-friendly
report.json   ← raw data
shots/        ← page screenshots + per-screen-width shots
```

Exit codes: `0` clean · `1` errors (or warnings with `--strict`) · `2` bad setup · `3` unexpected failure.

See [`tests/README.md`](./tests/README.md) for every check and option.

---

## Step 6 — Back up your work

`backup/backup.bat` zips any folder you choose and stores the archive in `backup/`.

1. Double-click `backup/backup.bat`.
2. Pick the folder in the dialog.
3. The ZIP appears next to the script, named `<folder>_YYYY-MM-DD_HH-mm-ss.zip`.

Terminal usage:

```bat
backup\backup.bat -Path "..\projects" -Open
```

By default it skips `node_modules`, `.git`, `dist`, `out`, `.vite`, `.cache`. Add `-All` to include everything.
See [`backup/README.md`](./backup/README.md) for details.

---

## Repository map

```text
pdf-stodio/
├── AGENTS.md          ← mandatory agent protocol (auto-loaded)
├── README.md          ← this file
├── SKILL.md           ← pointer to AGENTS.md
├── engine/            ← preview app (Vite + React)
│   ├── src/           ← app shell, design system, PDF export
│   ├── public/        ← fonts and static assets
│   ├── start-dev.bat  ← one-click dev server
│   └── vite.config.js ← dev API for projects/pages/style
├── projects/          ← one folder per project (git-ignored)
├── fonts/             ← optional shared fonts
├── tools/             ← image-search / font-search helpers
├── tests/             ← audit suite + fixtures
└── backup/            ← ZIP backup script and archives
```

---

## Project anatomy

```text
projects/<project>/
├── style.md      ← MANDATORY: visual spec for every page of this project
├── project.json  ← name, description, preset, orientation, dir, lang, totalPages
├── font/         ← optional project-specific fonts
└── page-1/
    ├── page.jsx  ← the page component
    └── images/   ← page assets
```

### `project.json`

```json
{
  "name": "Annual Report",
  "description": "2026 annual report",
  "preset": "a4",
  "orientation": "portrait",
  "dir": "rtl",
  "lang": "ar",
  "totalPages": 8
}
```

| Field | Values |
|---|---|
| `preset` | `a4` · `a4l` · `slide` · `letter` · `letterl` |
| `orientation` | `portrait` · `landscape` |
| `dir` | `rtl` · `ltr` |
| `lang` | `ar`, `en`, … |

### `style.md`

Must define, at minimum:

- purpose and visual direction
- page size and orientation
- language and direction (RTL/LTR)
- color palette / theme
- fonts
- layout, components and patterns
- PDF/print constraints

---

## Design system (engine)

Import from `@ds/index.js`:

```jsx
import { Page, useDS } from '@ds/index.js';
```

| Preset | Size (px) | Margins |
|---|---|---|
| `a4` | 794 × 1123 | 84 / 76 |
| `a4l` | 1123 × 794 | 72 / 60 |
| `slide` | 1280 × 720 | 72 / 56 |
| `letter` | 816 × 1056 | 84 / 76 |
| `letterl` | 1056 × 816 | 72 / 60 |

Themes: `calm`, `warm`, `forest`.
Fonts: `IBM Plex Sans Arabic` is bundled in `engine/public/fonts`.

`useDS()` exposes the scale: `dims`, `c` (colors), `fs` (font sizes), `sp(n)` (spacing), `font`, `lhBody`, `dir`, `title`.
Use tokens instead of hard-coded hex values, font sizes, or pixel spacing.

---

## Engine HTTP API

Available only while the dev server runs (implemented in `vite.config.js`):

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/__pdfstudio/projects` | list projects on disk |
| `GET` | `/__pdfstudio/pages?project=<id>` | discovered page numbers + file URLs |
| `GET` | `/__pdfstudio/config?project=<id>` | read `project.json` |
| `GET` / `POST` | `/__pdfstudio/style?project=<id>` | read / write `style.md` |
| `POST` | `/__pdfstudio/project` | create a project (body: name, description, preset, orientation, dir, lang) |
| `DELETE` | `/__pdfstudio/project?project=<id>` | delete a project |
| `GET` | `/__pdfstudio/ping` | health check |

Project ids must match `^[a-zA-Z0-9][a-zA-Z0-9_-]*$` (no leading underscore or dot).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Start screen is empty | There are no `projects/` yet — create one with the `+` button |
| `EADDRINUSE` on port 5173 | Another Vite instance is running: close it, or `npm run dev -- --port 5174` |
| Blank page after adding a project | Check the terminal for a React/import error; make sure the file is `page-N/page.jsx` |
| Images do not appear | Path is wrong; assets must live in that page's `images/` folder |
| Fonts look different | Wait for `document.fonts.ready`; verify the font is declared in `engine/public/fonts` or the project `font/` folder |
| PDF pages look blurry | Images are below their displayed resolution — run the audit suite and check `DPI` |
| Export hangs | Check the browser console; the audit suite surfaces console errors too |
| Backup script blocked | Windows may block `.ps1`: run `backup.bat` (it already passes `-ExecutionPolicy Bypass`) |

---

## Notes

- `projects/` is git-ignored — user projects are local by default.
- `backup/*.zip` is git-ignored.
- The preview shell scales pages with a CSS transform; exports always use the real preset size.
- Everything runs locally. No data leaves your machine.
