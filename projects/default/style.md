# Style — Default (auto-created)

> Mandatory style spec for this project. All pages must follow this file.
> This is a neutral default created automatically when no projects exist. Update it to match your real project before building content.

## Identity & settings
- **Name:** Default
- **Language / direction:** Arabic, RTL (`dir="rtl"`, `lang="ar"`). LTR content allowed when needed.
- **Page size / orientation:** Slide, landscape (1280×720 via engine preset). Can be changed to A4 portrait/landscape in `project.json` + here if required.
- **Theme:** `forest` (engine tokens) — light/clean presentation, dark text, clear accent. No heavy global decoration imposed on page content.

## Fonts
- **Default:** Engine/system stack (e.g., IBM Plex Sans Arabic / Cairo / system sans) as configured by the engine.
- **Project fonts:** place custom fonts in `font/` if needed and reference them explicitly.

## Layout & components
- Use the engine's page container (`Page` / DS components) and keep content within safe margins.
- Clear heading hierarchy, readable body text, consistent spacing.
- Avoid overflow; content must remain visible and printable.

## PDF / export rules
- Pages must preview correctly in the engine and export as a **valid PDF**.
- Keep backgrounds/colors print-friendly; test export after major layout changes.

## Change control
- Any visual/style change must be reflected here. If a user request conflicts with this file, confirm which wins and update `style.md` explicitly.
