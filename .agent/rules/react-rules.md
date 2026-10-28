# React Design Rules — auto-loaded (Antigravity + OpenCode)

> This file is auto-loaded from `.agent/rules/`.
> The old project rules (RULES.md / SVG-RULES.md / check-rules.mjs) are deleted — do not use them.
> Single source of truth: `rules/01` → `rules/07`.

## Mandatory: read before any task

Read all seven files in full and follow them literally — React only (Vite + React + TypeScript), no Next.js:

- `rules/01-design-tokens.md`
- `rules/02-spacing-typography-colors.md`
- `rules/03-components-ui-libs.md`
- `rules/04-a11y-responsive-rtl-motion-perf.md`
- `rules/05-images-react.md`
- `rules/06-image-apis-licenses.md`
- `rules/07-resources-stack-checklist.md`

Rules:

- Any item marked **(بحث)** comes from external research — verify official docs before production use.
- Do not invent stack/libraries outside `rules/07-resources-stack-checklist.md`.
- Image API keys always behind a proxy with cache — never expose `VITE_*` in the browser.
- Before delivery, apply the checklist in `rules/07-resources-stack-checklist.md` item by item.
