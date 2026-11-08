# PDF Studio — Mandatory Agent Instructions (AGENTS.md)

> **This is the single, canonical instruction file for this repository.**  
> Read and follow it **at the start of every session**, before taking any action.  
> Do not proceed on any project task until the mandatory workflow below is completed.

## What this project is
**PDF Studio** is a project-based PDF editor/organizer designed to work with AI coding agents.

- The user selects a project (or creates one), provides requirements/design intent, and the agent builds or completes pages for that project.
- There is **no global style imposed by the system**. **Every project's visual/style rules come only from that project's `style.md`.**
- Output is previewable pages that can be exported as a **valid PDF** through the preview/engine UI.

## Repository map (authoritative paths)
```text
<workspace-root>/
├── AGENTS.md                 ← THIS FILE (canonical, mandatory, auto-load target)
├── CLAUDE.md                 ← Compatibility pointer for Claude Code (@AGENTS.md)
├── pdf-stodio/
│   ├── SKILL.md              ← Pointer to this canonical AGENTS.md
│   ├── engine/               ← Preview engine (Vite/React) + PDF export UI
│   │   ├── src/              ← App shell (project picker, page nav, PDF export)
│   │   └── public/, index.html, vite.config.js, package.json, ...
│   ├── projects/             ← ALL projects live here (one folder per project)
│   │   └── <project-name>/
│   │       ├── style.md      ← MANDATORY: the project's style/spec (applies to all its pages)
│   │       ├── project.json  ← Settings: name, description, preset, orientation, dir, lang, totalPages...
│   │       ├── font/         ← Optional project-specific fonts
│   │       └── page-N/
│   │           ├── page.jsx  ← Page implementation (or content.jsx, per engine conventions)
│   │           └── images/   ← Page/project assets
│   ├── fonts/                ← Optional shared fonts (use only if explicitly intended; prefer project fonts)
│   └── tools/                ← Helper tools (e.g., image/font search)
└── tests/ (if present)       ← Non-production experiments/scripts only
```

## Mandatory workflow (do this every session, in order)

### Step 1 — Read context
1. Read this `AGENTS.md`.
2. Inspect `pdf-stodio/projects/` to discover current projects.
3. For each project, note: folder name, `project.json` summary (name/description/preset/orientation/dir/lang/totalPages) if present, and whether `style.md` exists.

### Step 2 — Ask the user (required, no exceptions)
**Present all current projects** and ask the user to choose exactly one of:
- **Work on an existing project** (they must specify which one), OR
- **Create a new project**.

**Do not build, edit, or generate project content until the user explicitly confirms their choice.** If the request is ambiguous, ask a clarifying question.

### Step 3 — Enter the chosen project and enforce `style.md`
After the user confirms the target project, work **only inside** `pdf-stodio/projects/<project-name>/` (and engine/tooling changes only when explicitly requested and necessary).

#### If working on an existing project
1. **Automatically check for `pdf-stodio/projects/<project>/style.md`.**
2. **If `style.md` exists (mandatory review):** read it, summarize the key style rules (page size/orientation, RTL/LTR & language, colors/theme, typography/fonts, layout/components, PDF/print constraints), and confirm understanding before making changes. Follow `style.md` strictly for all work.
3. **If `style.md` is missing (blocking):** you **must** ask the user to provide the project style **before any work**. Collect at minimum: purpose/visual direction, page size & orientation (A4/slide, portrait/landscape), language & direction (RTL/LTR), color palette/theme, fonts, layout/components/patterns, and any PDF/print/export constraints. **Create `style.md` with the agreed content and get confirmation. Do not work without `style.md`.**

#### If creating a new project
1. **Ask the user for the style first (mandatory).** Do not create a project without a style.
2. Create the structure:
   ```text
   pdf-stodio/projects/<project-name>/
   ├── style.md        (MANDATORY — create now from agreed style)
   ├── project.json    (name, description, preset, orientation, dir, lang, totalPages)
   ├── font/           (optional)
   └── page-1/
       ├── page.jsx
       └── images/
   ```
3. Write `project.json` and `style.md`, then start the first page in strict adherence to `style.md`.
4. When page count changes, update `project.json` (`totalPages`). Follow the engine's page discovery/registration conventions (e.g., `page-N/page.jsx` as used by the project).

### Step 4 — Execute
- Understand the user's request in the context of the confirmed project and its `style.md`.
- Implement changes **strictly according to `style.md`**. If the user asks for something that conflicts with `style.md`, call out the conflict and ask which should win; update `style.md` only with explicit user confirmation.
- Keep work scoped to the chosen project. **Do not share or reuse page code, page assets, project fonts, or project styles across projects** unless the user explicitly requests it.

## Non-negotiable rules
- **`style.md` is mandatory for every project.** No `style.md` = no work on that project until it is created.
- **Always ask the user to choose/create a project at session start** (or when project context is not already explicitly confirmed for the current task). Never assume the target project.
- **Read and follow the project's `style.md` before modifying or generating pages.**
- **Isolation:** projects are independent (styles, fonts, page assets, page code). Shared fonts in `pdf-stodio/fonts/` are only for intentional global use.
- **PDF validity:** pages must remain previewable and exportable as valid PDF through the engine/UI.
- **Experiments:** put non-production tests/scripts under `tests/` (if used), not inside project page folders.

## Auto-load / session-start behavior by agent (how this file is picked up)
This repository uses **`AGENTS.md` at the workspace root** as the canonical instruction file because it is widely supported. Agents should load it at session start:

| Agent / Tool | How it auto-loads this file | Notes / compatibility |
|---|---|---|
| **OpenCode** | Reads `AGENTS.md` (global and project). It loads the global file, then `AGENTS.md` files from the current workspace directory toward the home/project boundary. | Keep `AGENTS.md` at the workspace root. Subdirectory `AGENTS.md` files can add scoped guidance; the root file remains the mandatory baseline. |
| **Cursor** | Natively reads `AGENTS.md` in the project root (and subdirectories) as a simple alternative to `.cursor/rules`. | No legacy `.cursorrules` required. Project Rules (`.cursor/rules`) may coexist for Cursor-specific scoped rules, but must not contradict this file. |
| **OpenAI Codex (CLI/app)** | Discovers instruction files per run/session: global (`~/.codex/AGENTS.override.md` or `AGENTS.md`), then project files from the project root down to the current working directory (one per directory, override preferred). Files are concatenated root→cwd; later (closer) files take precedence on conflicts. | Run Codex from the workspace/repo root (or ensure root is on the path to cwd) so root `AGENTS.md` is included. Respect the combined size budget (`project_doc_max_bytes`, default ~32 KiB); keep critical rules near the top. |
| **Claude Code** | Can read `AGENTS.md` as project instructions (v2.1.277+). By default (`claude-md-or-agents-md`), if no `CLAUDE.md`/`.claude/CLAUDE.md`/`CLAUDE.local.md` exists in the working directory or above, Claude reads `AGENTS.md` at session start (and from subdirectories as files are accessed). A `CLAUDE.md` in scope takes precedence unless configured to read both. | For robust compatibility, this repo also includes root `CLAUDE.md` with an `@AGENTS.md` import so Claude Code always gets this content. You can also set Project instructions to `claude-md-and-agents-md` in `/config`. If `AGENTS.md` support is unavailable in a session, the `CLAUDE.md` import covers it. |
| **Google Antigravity (IDE/CLI/extensions)** | Discovers rules from the workspace folder and parent folders up to the repository root. It reads `AGENTS.md` or `GEMINI.md` (and `.agents/rules/*.md`, etc.) from workspace/global locations. `AGENTS.md`/`GEMINI.md` are treated as always-active plain Markdown (no frontmatter required). | Keep `AGENTS.md` at the workspace/repo root. Rules from parent scopes and global config are cumulative; root `AGENTS.md` provides the mandatory baseline. |

**If an agent does not auto-load `AGENTS.md` in your environment:** manually instruct it to read `AGENTS.md` at the workspace root before doing any work. The rules in this file are mandatory regardless of auto-load mechanism.
