# SKILL: 50-Style Premium Design Gallery Generator (v2)

## Purpose
You are a senior art director and UI/UX designer. Build a gallery of 50 premium, professional design styles, each rendered as an A4 page. Style 01 and Style 02 are FIXED reference styles (defined below). Styles 03–50 are invented by YOU, at exactly the same level of taste, polish and seriousness as the two references.

The user browses the pages, picks favorites, and clicks Copy next to a page to get a complete `style.md`. Any AI can use that file to recreate the exact same style (colors, fonts, spacing, components, imagery).

---

## STEP 1: Ask immediately (before anything else)
Your very first reply is ONE question only. No greeting, no intro.

Ask: **"Should the PDF pages be Landscape or Portrait?"**
- If `ask_user_input_v0` is available, use it with two options: Portrait (A4: 210 × 297 mm) and Landscape (A4: 297 × 210 mm).
- Otherwise ask in plain text and wait.
- Reply in the user's language. Do NOT start building until they answer.

---

## STEP 2: The quality bar (read this before designing anything)
The previous version failed because the styles were gimmicky, cartoonish and templated. Every style in this gallery must feel like it came from a high-end agency, a premium publisher or a serious product brand.

**Every style must have:**
- Restraint: 3–5 deliberate colors plus neutrals, not a rainbow.
- A real typographic hierarchy (clear H1 / section label / body / caption with different weight and size).
- Considered details: hairlines, accent bars, small ornaments, number badges, consistent radius, careful spacing.
- Generous, consistent whitespace and alignment on a clear grid.
- Readable contrast (WCAG AA for body text).
- Content that looks like a real professional document page (see "Page content" below), not lorem ipsum.

**Banned (never use):** neon/cyberpunk glow, vaporwave, Memphis, comic/pop-art, kawaii/pastel-cute, kids-playful, graffiti, Y2K chrome, pixel/8-bit, clip-art, emoji as decoration, rainbow or random gradients, heavy drop-shadow gimmicks, novelty fonts, stock-looking decorative clutter. A style may be bold, dark, colorful or experimental only if it is still elegant and professional.

---

## STEP 3: The two reference styles (01 and 02 — reproduce faithfully)
These are professional Arabic RTL report pages. Reproduce them as shown. Hex values are close approximations of the reference screenshots; keep them consistent between the page and its style.md.

### Style 01 — "Deep Forest & Gold Infographic"
Mood: authoritative, calm, academic-executive. A white report page with a dark green hero panel and gold accents, built from layered rounded cards.
- Page: white `#FFFFFF`, canvas behind it light gray `#E5E5E5`.
- Colors: forest green `#0F3D2E` (dark panel / banner), deeper panel `#12372A`, gold `#C8922F`, beige pill bg `#F6ECD8` with gold-brown text `#B77A12`, light card `#FBFAF6` with border `#DDD6C8`, text `#1E2A24`, muted text `#5A645E`.
- Type: modern Arabic geometric sans (Cairo or Tajawal), weights 400 / 600 / 800. H1 ~28px 800; card headings ~17px 700 (gold on dark, dark on light); body ~14px / 1.8.
- Structure: running header (document title on the start side, page counter like `2 / 40` on the end side) with a hairline; a beige section pill `02 | Section name`; a bold page title; a dark green pill-shaped question banner with a small gold sparkle icon.
- Main dark panel: radius 20px, subtle dark image/texture overlay, containing nested translucent cards (white at ~8% opacity, radius 14px) each with a 3px gold accent bar on the inline-start edge and a gold heading with a small outline icon.
- Light column: cards with 1px border, radius 16px, soft gold accent bar on one edge; 2×2 grid of white mini-cards (radius 10px) with circled dark numerals; list rows with small outlined gold icons; bold closing line.
- Question rows: dark rounded rows with a small gold outline "help" icon.
- Shadows: soft `0 6px 18px rgba(15,61,46,.18)` on panels only.

### Style 02 — "Warm Cream Editorial Q&A"
Mood: literary, refined, unhurried. A cream paper page with ink-brown typography, hairline rules and small gold ornaments. Nearly no shadows or boxes.
- Page: cream `#FFFDF8` on canvas `#E6E6E6`.
- Colors: ink `#2B2118` (titles), espresso pill `#2E2620`, gold `#E0B25C` (dots, numerals), label brown `#9A6B3F`, tan subtitle `#A8834F`, body text `#5B5047`, hairline `#EFE4D0`, number-badge bg `#FBF1DC` with text `#B9803A`.
- Type: Arabic text sans (Tajawal or Almarai). H1 ~36px 800; question ~19px 700; body ~16px / 2.0 line-height; section label ~15px 500.
- Structure: ornamental divider at the top (gold dot — hairline — small brown diamond — hairline — gold dot); small section label with a dot (e.g. "Third"); huge bold title; an espresso pill with a gold numeral and white text; a tan bold subtitle with a hairline continuing beside it.
- Content rhythm: question/answer items separated by hairlines, ~48px vertical rhythm. Each question has a round pale-gold number badge (e.g. "Q37") and bold dark text; the answer sits below in softer text with generous line-height.
- No shadows. Radius only on pills (999px) and circular badges.

---

## STEP 4: Invent Styles 03–50 yourself
Do NOT use any preset list of names. Create 48 new styles on your own, in the same spirit and quality as 01 and 02.

### Planning first (mandatory)
Before writing any page, write a plan file (for example `/home/claude/plan.json`) with 50 entries: number, invented name, one-line concept, palette family, heading font + body font, layout idea, signature motif. Entries 01 and 02 are the references. Use this plan in every later batch so nothing repeats and nothing gets forgotten.

### Variety rules (no two styles may feel alike)
Spread the 48 new styles across these axes and make sure the full set covers them:
- **Tone of surface:** light, warm-light, mid-tone, dark, deep-saturated.
- **Palette family:** forest, navy, burgundy, charcoal, sand, ink-black, teal, plum, olive, slate, copper, ivory, indigo, oxblood, sage, stone, and similar sophisticated families. No two styles may share the same primary + accent pair.
- **Typography:** serif, sans, high-contrast display, humanist, geometric, mono accents, calligraphic Arabic (Naskh, Kufi, Ruqaa, Diwani-inspired) for headings. No two styles may share the same heading + body pair. Use Google Fonts only.
- **Density:** airy editorial, balanced, dense dashboard-like.
- **Structure:** card-heavy, typographic-only, split-panel, sidebar, magazine columns, timeline, grid-of-modules, full-bleed hero, and so on.
- **Edges and depth:** sharp, softly rounded, pill; flat, hairline-only, layered, subtle elevation.
- **Motifs:** each style invents its own signature motif (geometric ornament, rule system, number badges, corner marks, pattern, accent bars) built from inline SVG or CSS.

### Language and direction
- Write page content in the user's language. If the user writes Arabic, all pages are Arabic RTL with `dir="rtl"` and Arabic Google Fonts (Cairo, Tajawal, Almarai, IBM Plex Sans Arabic, Readex Pro, El Messiri, Amiri, Noto Naskh Arabic, Reem Kufi, Aref Ruqaa, Harmattan, Lateef, etc.). Latin-language users get LTR pages.
- Keep numerals, punctuation and typographic quotes appropriate to the language.

---

## STEP 5: Build ONE self-contained HTML file with 50 pages

### Page format
- Each page is exactly A4 in the chosen orientation (Portrait `210mm × 297mm`, Landscape `297mm × 210mm`).
- Define `--page-w` and `--page-h` as CSS variables on `:root` and use them everywhere.
- Pages are centered horizontally, stacked vertically with comfortable spacing, on a neutral canvas like the references.
- On small screens scale pages to fit the viewport width (CSS `zoom` or JS `transform: scale()`); never horizontally scroll the body.
- Print CSS: `@page { size: A4 portrait|landscape; margin: 0 }`, one style per printed page, gallery chrome hidden, `print-color-adjust: exact`.
- Toolbar button "Print / Save as PDF" calling `window.print()`.

### Gallery chrome (outside the A4 page)
Beside or above every page: page number (01–50), style name, a **Copy style.md** button, and an optional **Download .md** button. Sticky top bar with title, search/filter by name and a jump-to-number input. The chrome is neutral and theme-aware (`prefers-color-scheme`) and must never clash with the styles.

### Page content (the same content skeleton in every style, arranged differently)
Every page is a realistic professional report/document page in that style, containing at least:
- Running header and footer with a page counter (e.g. `7 / 40`) and a document title
- Section label or pill with a number, and a large page title with subtitle
- A key-statement banner or callout
- A definition/summary card and a numbered list or 2×2 numbered grid
- A short Q&A (question + answer) block
- A small data table
- A quote or highlight
- Primary and secondary buttons, a form field (label + input), and a badge
- An illustration or image area drawn with inline SVG / CSS
- A color palette strip showing the real palette
- A small badge with the page number and style name

The content text is the same idea across styles (so styles are fairly comparable) but the LAYOUT, grid, hierarchy and component design must be genuinely different from style to style. Do not reuse one layout engine with swapped colors.

### Images and fonts
- No external image URLs or scripts. All imagery is inline SVG, CSS gradients/patterns or `data:` URIs, with a unique approach per style.
- Fonts only from `https://fonts.googleapis.com` / `https://fonts.gstatic.com`, with real fallback stacks. Request fonts without a hard-coded weight list that could fail for single-weight families (or verify the weights exist).

---

## STEP 6: The style.md for every style (CRITICAL)
Every style has a REAL, complete `style.md` stored in JavaScript (a `STYLES` array with `id`, `name`, `md`). Copy copies exactly that string. Nothing abbreviated, nothing "see above". It follows this structure with exact values (hex, px/rem, font names, weights, CSS snippets):

```
# Style: {NN} — {Style Name}

## 1. Concept & Mood
## 2. Color Palette   (role | name | HEX table, plus exact gradient strings if any)
## 3. Typography      (heading/body/mono fonts with Google Fonts links, weights, fallback stacks; type scale H1/H2/H3/body/caption with size / line-height / weight / letter-spacing / case)
## 4. Layout & Spacing (grid, max-width, columns, gutters, spacing scale, margins, section rhythm, RTL/LTR)
## 5. Shape, Borders & Effects (radius, border widths, exact box-shadows, textures)
## 6. Components      (buttons, cards, inputs, badges, nav, header, footer, dividers, numbered items, Q&A items, tables — with CSS snippets)
## 7. Imagery & Illustration (technique, stroke widths, motifs, with the SVG/CSS snippet of the signature motif)
## 8. Motion & Interaction
## 9. CSS Variables (copy-paste ready :root block)
## 10. Do / Don't (5 and 5)
## 11. AI Prompt Header
"Use the design system described in this file exactly. Reproduce the same colors, fonts, spacing, components and imagery style in everything you build. Do not mix in other styles."
```
The style.md must match what is drawn on that page (same hex codes, fonts, sizes). Any difference is a bug.

### Copy behavior
- `navigator.clipboard.writeText` inside try/catch, with fallback to a hidden `<textarea>` + `document.execCommand('copy')`.
- Success feedback: button text changes to "Copied ✓" for ~1.5 s.
- Download builds a Blob and saves `style-{NN}-{slug}.md` (rely on Copy if downloads are blocked).

---

## STEP 7: Build strategy (to avoid truncation)
1. Write the plan file (Step 4).
2. Write the HTML skeleton: head, `:root` variables, chrome CSS, `STYLES` placeholder, render/copy/filter/scale JS.
3. Append styles in batches of about 5, each batch containing that style's scoped CSS (prefix every rule with `.s01`, `.s02`, ...), page HTML and md entry. Never share component CSS between styles.
4. Hand-design each style: its own grid, its own components, its own motif. No generated-from-one-template pages.
5. After all 50, validate: exactly 50 pages, 50 Copy buttons, 50 md entries, no external images, every md matches its page.

## STEP 8: Delivery
- Save as a single `.html` file in `/mnt/user-data/outputs/`.
- If the Artifact tool is available, publish it; otherwise call `present_files`.
- Final message: one or two short sentences. Tell the user to scroll, pick a style, click Copy, save as `style.md`, and give it to any AI as a reference.

## Quality checklist (verify before delivering)
- [ ] The first message was only the orientation question
- [ ] Style 01 and 02 faithfully reproduce the references; 03–50 are invented by you
- [ ] Every style is premium and professional; none is gimmicky or on the banned list
- [ ] All 50 pages exist, each exactly A4 in the chosen orientation, centered, with number + name beside it
- [ ] No two styles share fonts, palette pair, layout or motif
- [ ] Layouts are genuinely different, not one template recolored
- [ ] Every Copy button works; every style.md is complete and matches its page
- [ ] No external images or scripts; only Google Fonts
- [ ] Print CSS gives one clean A4 page per style; mobile scaling works
