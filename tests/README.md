# Audit Suite

One command to inspect any project, page, or image and produce a readable report
(console + Markdown + HTML + JSON).

It is built for AI agents and humans alike: it catches the problems you cannot see
by eye — content overflowing the page, overlapping text, blurry images, weak
contrast, wrong page size — **before** you export the PDF.

---

## Table of contents

1. [Requirements](#requirements)
2. [Install](#install)
3. [Quick start](#quick-start)
4. [All commands](#all-commands)
5. [Options](#options)
6. [What it checks](#what-it-checks)
7. [Image-only mode](#image-only-mode)
8. [Reports](#reports)
9. [How an agent should use it](#how-an-agent-should-use-it)
10. [Self-test](#self-test)

---

## Requirements

- Node.js 18+
- The engine running (`engine/` → `npm run dev`) for page mode
- Chromium for Playwright (`npx playwright install chromium` — already cached on most setups)

Image-only mode needs **no browser and no engine**.

---

## Install

```bash
cd tests
npm install          # once
```

---

## Quick start

```bash
node audit.mjs --self-test          # proves the tool works
node audit.mjs --project <id>       # audit every page of a project
```

If the engine is not running, page mode exits with a clear message instead of a stack trace.

---

## All commands

```bash
# Whole project (all pages)
node audit.mjs --project demo

# Single page
node audit.mjs --project demo --page 2

# Every project
node audit.mjs --all

# Direct URL
node audit.mjs --url http://localhost:5173/demo/p/1

# Images only (folder or files, no browser)
node audit.mjs --image ../projects/demo/page-1/images
node audit.mjs --image ../projects/demo/page-1/images/cover.png

# Verify expected content is present
node audit.mjs --project demo --expect expected.txt

# Machine-readable output
node audit.mjs --project demo --json
```

`expected.txt` is one required string per line; the run fails if any line is missing from the pages.

---

## Options

| Option | Meaning |
|---|---|
| `--project <id>` | Project folder name or display name |
| `--page <n>` | Audit only that page |
| `--all` | Audit every project |
| `--url <url>` | Audit a direct URL instead of a project |
| `--image <path>` | Image or folder (repeatable) |
| `--widths 1440,1024,768,390` | Screen widths to test |
| `--out <dir>` | Output directory (default `tests/out/<timestamp>`) |
| `--expect <file>` | Text file with required content lines |
| `--tolerance 1` | Overflow tolerance in pixels |
| `--json` | Print raw JSON to stdout |
| `--no-shots` | Skip screenshots |
| `--strict` | Warnings also fail the run |
| `--headed` | Show the browser |
| `--quiet` | No console output |

Exit codes: `0` clean · `1` errors (or warnings with `--strict`) · `2` bad setup · `3` unexpected exception.

---

## What it checks

### Layout and content

| ID | Severity | Detects |
|---|---|---|
| `PAGE_SIZE` | error / warn | Page size does not match the preset (A4 = 794×1123 px, slide = 1280×720 px) |
| `OVERFLOW` | error | Element extends outside the page (will be clipped in the PDF), with exact sides and pixel amounts |
| `PAGE_CLIPPED` | error | Page content is taller/wider than the page itself (`overflow: hidden`) |
| `INNER_CLIP` | warn | Inner container clips its own content |
| `TEXT_OVERLAP` | error | Two different text runs physically overlap |
| `PAGE_EMPTY` | error | Fewer than 20 characters and no images |
| `DUP_ID` | warn | Duplicate `id` |
| `DIR` | warn | Page direction differs from `project.json` |
| `MISSING_TEXT` | error | A line from `--expect` is missing |
| `PAGE_LOAD_ERROR` | error | Page failed to load |
| `CONSOLE_ERRORS` | warn | Browser console errors (React, fonts, failed resources) |

### Images

| ID | Severity | Detects |
|---|---|---|
| `IMG_BROKEN` | error | Broken image / wrong path (`naturalWidth = 0`) |
| `IMG_ALT` | warn | Missing `alt` |
| `IMG_EXTERNAL` | warn | Image loaded from an external URL (breaks offline) |
| Image quality | error / warn | Format, natural size, file size, **effective print DPI**, distorted aspect ratio, upscaling, animated images |

### Text and accessibility

| ID | Severity | Detects |
|---|---|---|
| `CONTRAST` | error / warn | Text/background contrast below WCAG (4.5:1, or 3:1 for large text) |
| `FONT_TINY` | warn | Font smaller than 8 px (unreadable in print) |
| `LINKS_IN_PAGE` | warn | Links inside pages — export rasterizes pages, so links become dead |

### Export safety

| ID | Severity | Detects |
|---|---|---|
| `CSS_FIXED` | warn | `position: fixed` / `sticky` — position may shift on export |
| `CSS_ANIM` | warn | Animations — export captures a single frame |
| `CSS_FILTER` | info | `filter` / `backdrop-filter` |
| `CSS_BLEND` | info | `mix-blend-mode` |
| `CSS_SHADOW` | info | Large shadow on a huge element (slow/large export) |

### Screens

For every width in `--widths`, the suite reports:

- pages clipped horizontally (the real problem)
- pages needing vertical scrolling (normal for tall pages)
- horizontal document scroll
- a screenshot per width: `shots/view-<width>.png`

Each audited page is also captured at its real design size: `shots/page-XX.png`.

> The preview shell scales pages with a CSS transform. The suite measures with layout
> pixels (not screen pixels), so `PAGE_SIZE`, DPI and overflow values stay correct.

---

## Image-only mode

`--image` inspects files directly from their headers — no browser, no engine:

- real format (PNG, APNG, JPEG, GIF, WebP, BMP, AVIF/HEIC, SVG)
- dimensions, megapixels, aspect ratio
- file size
- DPI stored in the file
- transparency, animation frames, ICC profile
- practical advice: too small, too large, wrong format, animated, needs compression

---

## Reports

```
tests/out/<timestamp>/
├── report.html    ← colored dashboard (open in a browser)
├── report.md      ← compact version for agents
├── report.json    ← raw data
└── shots/
    ├── page-01.png …
    └── view-1440.png · view-1024.png · view-768.png · view-390.png
```

`tests/out/` is git-ignored.

---

## How an agent should use it

1. **After building any page**
   `node audit.mjs --project <id> --page <n>`
   Fix `OVERFLOW` / `PAGE_CLIPPED` / `TEXT_OVERLAP` immediately, before delivery.

2. **Before delivering a project**
   `node audit.mjs --project <id> --strict`
   Requirement: 0 errors and 0 warnings.

3. **When choosing images**
   `node audit.mjs --image <folder>`
   Reject images whose effective DPI is too low for print.

4. **Guaranteeing content completeness**
   `--expect expected.txt` ensures every requested line still exists (nothing silently removed).

5. **Programmatic decisions**
   `--json` returns structured findings so the agent can decide to rebuild a page.

---

## Self-test

`fixtures/selftest.html` is a page that intentionally contains every defect the suite can detect.

```bash
node audit.mjs --self-test
```

Expected result contains `SELF-TEST PASSED` (all 11 checks fired).

If any check fails to fire, the tool is broken (or a check regressed) — do not trust its reports until it passes again.

---

## Notes

- `tests/references/` holds legacy design notes, not part of the audit.
- The suite runs a real Chromium, so its measurements match what `html-to-image` will export.
