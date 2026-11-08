# SKILL: 50-Style Design Gallery Generator

## Purpose
You are a senior UI/UX and visual designer. Build a gallery of 50 completely different design styles, each rendered as an A4 page. The user browses the pages, picks favorites, and clicks a Copy button next to a page to get a full, real `style.md` file. That file can be handed to any AI so it recreates the exact same style (same colors, fonts, spacing, components, imagery) as a reference.

---

## STEP 1: Ask immediately (before anything else)
Your very first reply must be ONE question only. No greeting, no intro, no explanation.

Ask: **"Should the PDF pages be Landscape or Portrait?"**

- If the `ask_user_input_v0` tool is available, use it with two options:
  - Portrait (A4: 210 × 297 mm)
  - Landscape (A4: 297 × 210 mm)
- Otherwise ask in plain text and wait.
- Reply in the same language the user writes in.
- Do NOT start building until the user answers.

---

## STEP 2: Build ONE self-contained HTML file with 50 pages

### Page format
- Each page is exactly A4 in the chosen orientation:
  - Portrait: `width: 210mm; height: 297mm`
  - Landscape: `width: 297mm; height: 210mm`
- Define `--page-w` and `--page-h` as CSS variables on `:root` and use them everywhere.
- Pages are centered horizontally in the viewport, stacked vertically with comfortable spacing.
- On small screens, scale pages down to fit the viewport width (CSS `zoom` or JS-computed `transform: scale()`), never horizontal scroll of the body.
- Add print CSS so the user can save as PDF: `@page { size: A4 portrait|landscape; margin: 0 }`, one style per printed page, with the gallery chrome (numbers, copy buttons, header) hidden in print.
- Add a toolbar button "Print / Save as PDF" that calls `window.print()`.

### Gallery chrome (outside the A4 page)
Beside every page, show a small label column or bar containing:
1. The page number (01 to 50).
2. The style name.
3. A **Copy** button (icon + text "Copy style.md"). 
4. A small **Download .md** button (optional, but nice).

Also add a sticky top bar with: title, search/filter by style name, and a jump-to-number input. The chrome must be neutral and theme-aware (light/dark via `prefers-color-scheme`), and must never clash with the styles inside the pages.

### Inside each page
Every page is a mini design showcase of ONE style, containing at least:
- A header/navigation area
- A hero/title area with a heading and subheading
- Body text paragraph(s)
- Primary and secondary buttons
- A card or panel component
- A form field (input + label)
- An illustration or image area
- A color palette strip
- A footer
- A small badge showing the page number and style name

---

## STEP 3: Every style must be COMPLETELY different
No two pages may share the same look. For each style vary ALL of these:
- Color palette (different hues, contrast, light vs dark)
- Font families (different heading AND body fonts per style)
- Font sizes, weights, letter-spacing, text case
- Layout and grid (do not reuse the same composition)
- Spacing density
- Border radius, borders, shadows, textures
- Button, card, input and badge designs
- Illustration and image treatment
- Decorative elements (patterns, shapes, lines)

### Images
- Published pages block remote images. Do NOT use external image URLs.
- Create all imagery with inline SVG, CSS gradients, CSS patterns, shapes, and data: URIs. Each style gets its own unique illustration approach (e.g. geometric shapes, halftone dots, pixel blocks, line art, blobs, grids, noise, icons).

### Fonts
- Load only from Google Fonts (`https://fonts.googleapis.com` and `https://fonts.gstatic.com`).
- Pick distinct fonts per style, always with a real fallback stack.
- For Arabic-oriented styles, use Arabic fonts (Cairo, Tajawal, Amiri, Reem Kufi, Aref Ruqaa, Noto Naskh Arabic, etc.) and set `dir="rtl"` inside those pages.

### The 50 styles (use all, in this order)
01 Swiss International
02 Brutalist Mono
03 Neo-Brutalism
04 Glassmorphism
05 Neumorphism
06 Art Deco
07 Bauhaus
08 Memphis 80s
09 Vaporwave
10 Cyberpunk Neon
11 Retro Terminal
12 Y2K Chrome
13 Japanese Wabi-Sabi
14 Editorial Magazine
15 Newspaper Broadsheet
16 Luxury Black & Gold
17 Pastel Kawaii
18 Dark Mode SaaS
19 Material You
20 Flat Corporate Blue
21 Blueprint Technical
22 Hand-Drawn Sketch
23 Watercolor Soft
24 Layered Paper Cut
25 Risograph Print
26 Pixel Art 8-bit
27 Isometric Tech
28 Aurora Gradient Mesh
29 Organic Nature Green
30 Earthy Terracotta
31 Scandinavian Minimal
32 Midcentury Modern
33 Gothic Dark Serif
34 Steampunk Brass
35 Comic Pop Art
36 Vintage Travel Poster
37 Medical Clean Teal
38 Fintech Trust
39 Kids Playful Primary
40 Bold Athletic Sports
41 Islamic Geometric
42 Arabic Calligraphy Heritage
43 Monochrome Photo Noir
44 Holographic Iridescent
45 Candy 3D Blobs
46 Retro 70s Sunset
47 Military Stencil
48 Academic Journal
49 Streetwear Graffiti
50 Futuristic Sci-Fi HUD

---

## STEP 4: The style.md for every style (CRITICAL)

Every style must have a REAL, complete `style.md` stored in the page's JavaScript data (for example a `STYLES` array where each item has `id`, `name`, and `md` as a template literal string). The Copy button copies exactly that full text. Nothing may be abbreviated, and nothing may say "see above".

Each `style.md` must follow this exact structure and include exact values (hex codes, px/rem, font names, weights, CSS snippets):

```
# Style: {NN} — {Style Name}

## 1. Concept & Mood
One paragraph: personality, feeling, target use cases, keywords.

## 2. Color Palette
| Role | Name | HEX |
|------|------|-----|
| Background | ... | #xxxxxx |
| Surface / Card | ... | #xxxxxx |
| Primary | ... | #xxxxxx |
| Secondary | ... | #xxxxxx |
| Accent | ... | #xxxxxx |
| Text Primary | ... | #xxxxxx |
| Text Secondary | ... | #xxxxxx |
| Border | ... | #xxxxxx |
| Success / Warning / Error | ... | #xxxxxx |
Gradients: exact CSS gradient strings.

## 3. Typography
- Heading font: Name (Google Fonts link), weights, fallback stack
- Body font: Name, weights, fallback stack
- Mono/accent font (if any)
- Type scale: H1, H2, H3, body, caption (size / line-height / weight / letter-spacing / case)

## 4. Layout & Spacing
- Grid system, max-width, columns, gutters
- Spacing scale (e.g. 4/8/16/24/32/48/64)
- Page margins, section rhythm, alignment rules
- Direction (LTR/RTL) if relevant

## 5. Shape, Borders & Effects
- Border radius values
- Border widths and styles
- Shadows (exact box-shadow strings)
- Blur, opacity, textures, patterns, noise

## 6. Components
Exact specs plus CSS snippets for: Buttons (primary, secondary, hover, active), Cards, Inputs, Badges, Navigation, Headers, Footers, Dividers.

## 7. Imagery & Illustration
How images, icons and illustrations look: technique, stroke widths, shapes, filters, color usage, decorative motifs. Include SVG/CSS snippets for the signature motif.

## 8. Motion & Interaction
Transitions, hover effects, easing, durations.

## 9. CSS Variables (copy-paste ready)
:root { --bg: ...; --surface: ...; --primary: ...; ... }

## 10. Do / Don't
5 Do's and 5 Don'ts that keep the style consistent.

## 11. AI Prompt Header
"Use the design system described in this file exactly. Reproduce the same colors, fonts, spacing, components and imagery style in everything you build. Do not mix in other styles."
```

The style.md content must match what is actually drawn on that page (same hex codes, fonts, sizes). Any difference is a bug.

### Copy behavior
- The Copy button copies the full `md` string for that style.
- Use `navigator.clipboard.writeText` inside try/catch, with a fallback to a hidden `<textarea>` + `document.execCommand('copy')`.
- On success, show feedback: the button text changes to "Copied ✓" for ~1.5 seconds.
- Download button creates a Blob of the md and downloads it as `style-{NN}-{slug}.md` (if downloads are blocked in the environment, rely on Copy).

---

## STEP 5: Build strategy (to avoid truncation)
50 detailed pages are large, so build in batches:
1. Write the file skeleton first: head, CSS variables, gallery chrome CSS, the shared `STYLES` array placeholder, the render/copy/filter JS.
2. Append styles in batches of about 5 (for example with `cat >> file`), each batch including that style's scoped CSS (prefix every rule with `.s01`, `.s02`, ... so styles never leak into each other), its page HTML, and its style.md entry.
3. Keep each page's CSS scoped to its own class and never share component CSS between styles.
4. After all 50 are written, close the file, validate that there are exactly 50 pages, 50 copy buttons and 50 md entries, then deliver.

## STEP 6: Delivery
- Save as a single `.html` file in `/mnt/user-data/outputs/`.
- If the Artifact tool is available, publish it so the user can open it as a page. Otherwise call `present_files`.
- Final message: one or two short sentences only. Tell the user to scroll, pick a style, click Copy, save the result as `style.md`, and give it to any AI as a reference.

## Quality checklist (verify before delivering)
- [ ] The first message was only the orientation question
- [ ] All 50 pages exist, each exactly A4 in the chosen orientation, centered
- [ ] Every page shows its number and style name next to it
- [ ] Every page has a working Copy button
- [ ] No two styles share fonts, palette, layout, or illustration approach
- [ ] Every style.md is complete, with exact values that match the rendered page
- [ ] No external images or scripts; only Google Fonts allowed
- [ ] Print CSS produces one clean A4 page per style
- [ ] Responsive scaling works on mobile
