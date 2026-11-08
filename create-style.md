# SKILL: 50-Style Premium Design Gallery Generator (v3)

## 0. EXECUTION CONTRACT (read first, non-negotiable)
1. **The deliverable is EXACTLY 50 styles. Not 4, not 10, not 49.** A gallery with fewer than 50 complete pages is a FAILED delivery.
2. **Never stop early.** Do not end your turn, summarize, or ask "should I continue?" while fewer than 50 styles exist. Keep calling tools until the verification script (section 7) prints `OK 50/50`.
3. **Do not send a final message until verification passes.** Progress notes between tool calls are fine; a "done" message is not.
4. **If you are cut off or the user says "continue"**, resume from the ledger (`/home/claude/ledger.txt`) and build only the missing styles. Never restart, never rebuild finished styles.
5. **Never reduce scope to save effort.** No placeholder pages, no "same as above", no empty md files, no skipped components. Each of the 50 pages is complete and individually designed.

---

## 1. Purpose
You are a senior art director and UI/UX designer. Build a gallery of 50 premium, professional, genuinely creative design styles, each rendered as an A4 page. The user browses the pages, picks favorites, and clicks Copy to get a complete `style.md`. Any AI can use that file to recreate the exact same style.

Styles 01 and 02 are fixed reference styles (section 4). Styles 03–50 are invented by YOU at the same level of taste. Do not use any preset name list.

---

## 2. STEP 1: Ask immediately (before anything else)
Your very first reply is ONE question only: **"Should the PDF pages be Landscape or Portrait?"**
- If `ask_user_input_v0` is available, use two options: Portrait (A4: 210 × 297 mm) and Landscape (A4: 297 × 210 mm). Otherwise ask in plain text and wait.
- Reply in the user's language. Do not start building until they answer.

---

## 3. FIXED CONTENT (identical in all 50 pages)
Every page shows exactly the same content so the user can compare designs fairly. Only the DESIGN changes: layout, hierarchy, typography, color, component treatment. Use this text verbatim (Arabic RTL when the user writes Arabic; if the user writes another language, translate it faithfully and keep the same structure).

| # | Element | Content |
|---|---------|---------|
| 1 | Running header | `دليل إطلاق المنتج الرقمي` + page counter `07 / 50` (use the real number: `NN / 50`) |
| 2 | Section pill/label | `02 | الأساس المنهجي` |
| 3 | Title (H1) | `كيف نبني منتجًا رقميًا ناجحًا؟` |
| 4 | Subtitle | `خمس خطوات عملية من الفكرة حتى الإطلاق` |
| 5 | Body text | `يبدأ أي منتج ناجح بفهم دقيق للمشكلة قبل التفكير في الحل. نجمع البيانات، نختبر الفرضيات مع مستخدمين حقيقيين، ثم نبني أصغر نسخة قابلة للتجربة ونطورها بناءً على ما نتعلمه.` |
| 6 | Image | An inline-SVG illustration (unique per style) + caption `شكل 1: رحلة المنتج من الفكرة إلى الإطلاق` |
| 7 | Table (4 cols × 4 rows + header) | Header: `المرحلة / المدة / المسؤول / الحالة`. Rows: `الاكتشاف / أسبوعان / فريق البحث / مكتمل` · `التصميم / ٣ أسابيع / فريق التجربة / قيد التنفيذ` · `التطوير / ٦ أسابيع / فريق الهندسة / قادم` · `الإطلاق / أسبوع / فريق النمو / مجدول` |
| 8 | Callout box | Title `نصيحة عملية` — `ابدأ بسؤال واحد واضح: ما المشكلة التي يستحق المستخدم أن يدفع لحلها؟` |
| 9 | Template card | Title `قالب: وثيقة المتطلبات` with three labeled fields: `الهدف`, `المستخدم المستهدف`, `مقياس النجاح` |
| 10 | Numbered steps (4) | `1 حدّد المشكلة` · `2 اختبر الفرضية` · `3 ابنِ النسخة الأولى` · `4 قِس وحسّن` |
| 11 | Code block (LTR even inside RTL) | `const product = {` / `  name: "Nova",` / `  stage: "beta",` / `  metrics: ["retention", "NPS"]` / `};` / `launch(product);` |
| 12 | Quote | `«ابنِ ما يحتاجه المستخدم، لا ما تحبّه أنت.»` |
| 13 | Form | Label `البريد الإلكتروني`, input placeholder `name@example.com` |
| 14 | Buttons + badge | Primary `ابدأ الآن`, secondary `تعرّف أكثر`, badge `جديد` |
| 15 | Palette strip | The style's real palette swatches with hex labels |
| 16 | Footer | `© 2026 جميع الحقوق محفوظة` + page counter |
| 17 | Style tag | Small badge `NN · Style Name` |

All 17 elements must be present, visible and fully styled on every page. No element may be dropped, shrunk to unreadable size, or hidden to make the layout easier.

---

## 4. The two reference styles (01 and 02, reproduce faithfully, adapted to the fixed content)
Hex values are close approximations of the reference screenshots. Keep them consistent between page and style.md.

### Style 01 — "Deep Forest & Gold Infographic"
Authoritative, calm, academic-executive. White page with a dark green hero panel and gold accents, built from layered rounded cards.
- Page `#FFFFFF` on canvas `#E5E5E5`. Forest green `#0F3D2E`, deep panel `#12372A`, gold `#C8922F`, beige pill `#F6ECD8` with text `#B77A12`, light card `#FBFAF6` with border `#DDD6C8`, text `#1E2A24`, muted `#5A645E`.
- Cairo or Tajawal, weights 400/600/800; H1 ~28px 800; card headings ~17px 700; body ~14px / 1.8.
- Running header with hairline; beige section pill; dark pill-shaped banner with a small gold sparkle icon; dark rounded panel (radius 20px) with nested translucent cards (white at ~8%, radius 14px, 3px gold accent bar on the inline-start edge); light cards (radius 16px, 1px border); white mini-cards with circled numerals; soft shadow `0 6px 18px rgba(15,61,46,.18)` on panels only.

### Style 02 — "Warm Cream Editorial"
Literary, refined, unhurried. Cream paper, ink-brown type, hairline rules, small gold ornaments, almost no boxes or shadows.
- Page `#FFFDF8` on canvas `#E6E6E6`. Ink `#2B2118`, espresso pill `#2E2620`, gold `#E0B25C`, label brown `#9A6B3F`, tan `#A8834F`, body `#5B5047`, hairline `#EFE4D0`, badge bg `#FBF1DC` with text `#B9803A`.
- Tajawal or Almarai; H1 ~36px 800; body ~16px / 2.0.
- Ornamental top divider (gold dot, hairline, brown diamond, hairline, gold dot); label with a dot; espresso pill with gold numeral; tan subtitle with hairline; hairline-separated blocks; round pale-gold number badges; no shadows; radius only on pills and circles.

---

## 5. Inventing Styles 03–50 (be genuinely creative)
### Quality bar
Premium, professional, bold in design thinking, never cheap. Restrained palette (3–5 colors plus neutrals), real typographic hierarchy, consistent radius, considered details (rules, accent bars, ornaments, number treatments), generous spacing, AA contrast.
**Banned:** neon/cyberpunk glow, vaporwave, Memphis, comic/pop-art, kawaii, kids-playful, graffiti, Y2K chrome, pixel/8-bit, clip-art, emoji decoration, random rainbow gradients, novelty fonts. A style may be dark, colorful, experimental or dramatic only if it stays elegant.

### Creativity requirements (the content is fixed, so the DESIGN must carry the difference)
Every style must have its own answer to ALL of these. Two styles must never solve them the same way:
- **Page composition:** its own grid (split panel, sidebar, asymmetric columns, magazine columns, stacked bands, modular tiles, centered column, offset hero, full-bleed header, etc.).
- **Heading treatment:** unique scale, weight, alignment, underline/ornament/number-system.
- **Table design:** unique (zebra, hairline-only, boxed, banded header, pill status cells, ruled ledger, etc.).
- **Numbered steps:** unique (circles, big outlined numerals, timeline line, tabs, stamps, stacked tiles, etc.).
- **Callout and template card:** unique shape, border, corner, accent treatment.
- **Code block:** unique (dark terminal, paper-inset, bordered label, line numbers, tinted panel, etc.).
- **Image treatment:** unique SVG illustration technique and framing.
- **Signature motif:** one memorable repeated detail (pattern, corner marks, rule system, badge shape, ornament) drawn in SVG/CSS.

### Variety rules
Across the 48 invented styles, cover a wide spread of:
- Surface: light, warm-light, mid-tone, dark, deep-saturated.
- Palette family: forest, navy, burgundy, charcoal, sand, ink-black, teal, plum, olive, slate, copper, ivory, indigo, oxblood, sage, stone and similar. No two styles share the same primary + accent pair.
- Typography: serif, sans, high-contrast display, humanist, geometric, mono accents, calligraphic Arabic headings (Naskh, Kufi, Ruqaa). No two styles share the same heading + body pair. Google Fonts only.
- Density: airy, balanced, dense.
- Edges: sharp, softly rounded, pill; flat, hairline-only, layered, subtle elevation.

### Plan file (mandatory, write BEFORE any page)
Create `/home/claude/plan.json` with 50 entries: number, invented name, one-line concept, palette (hex), heading + body fonts, composition idea, table / steps / code / callout treatments, signature motif. Entries 01 and 02 are the references. Check that no two entries repeat a palette pair, font pair, composition or motif. Every later batch reads this file.

### Language and direction
Page content follows the user's language. For Arabic: pages are `dir="rtl"` with Arabic Google Fonts (Cairo, Tajawal, Almarai, IBM Plex Sans Arabic, Readex Pro, El Messiri, Amiri, Noto Naskh Arabic, Reem Kufi, Aref Ruqaa, Harmattan, Lateef, etc.). The code block stays LTR.

---

## 6. BUILD METHOD (file-based, so nothing gets lost and nothing stops at 4)
Do NOT write one giant HTML file in a single tool call. Build from small fragment files and assemble them with a script.

1. **Plan:** write `plan.json` (section 5).
2. **Shell:** write `shell.html` (head, `:root` with `--page-w` / `--page-h`, gallery chrome CSS, toolbar, `<!--PAGES-->` marker, shared JS for render / copy / download / search / jump / scale) and `build.py`.
3. **Per-style fragments** in `/home/claude/styles/`: for each style `NN` create three files:
   - `sNN.css`: scoped CSS, every selector prefixed `.sNN` (no leaks, no shared component CSS between styles)
   - `sNN.html`: the full page markup containing all 17 fixed elements
   - `sNN.md`: the complete style.md (section 8)
4. **Batches:** write 2–3 styles per tool call (never more), then append `NN done` to `/home/claude/ledger.txt` after each style.
5. **Loop:** after each batch run the verification script. If it reports missing styles, immediately write the next missing ones. Repeat until `OK 50/50`.
6. **Assemble:** `build.py` reads the fragments, inlines CSS, pages and an escaped `STYLES` array (id, name, md) into one self-contained HTML file `/mnt/user-data/outputs/style-gallery.html`.

### Verification script (run after every batch and before delivery)
```bash
cd /home/claude/styles
ok=0; for i in $(seq -w 1 50); do
  [ -s s$i.css ] && [ -s s$i.html ] && [ -s s$i.md ] && ok=$((ok+1)) || echo "MISSING s$i"
done
echo "styles complete: $ok/50"
[ "$ok" = 50 ] && echo "OK 50/50"
```
After assembling, also check on the final HTML: exactly 50 `class="pg s` pages, 50 Copy buttons, 50 md entries, every page contains the 17 fixed elements (e.g. grep for the title text 50 times), and no external image URLs. Fix anything that fails before delivering.

---

## 7. Page and gallery format
- Each page is exactly A4 in the chosen orientation (Portrait `210mm × 297mm`, Landscape `297mm × 210mm`); define `--page-w` and `--page-h` on `:root` and use them everywhere. If all 17 elements do not fit comfortably, redesign the layout (denser grid, smaller type, columns). Do not remove elements.
- Pages are centered on a neutral canvas, stacked with comfortable spacing. On small screens scale pages to the viewport width (CSS `zoom` or JS `transform: scale()`); no horizontal body scroll.
- Print CSS: `@page { size: A4 portrait|landscape; margin: 0 }`, one style per printed page, gallery chrome hidden, `print-color-adjust: exact`. Toolbar button "Print / Save as PDF" calls `window.print()`.
- Gallery chrome (outside the page): number 01–50, style name, **Copy style.md** button, **Download .md** button; sticky top bar with title, search by name, jump-to-number. Chrome is neutral and theme-aware (`prefers-color-scheme`).
- No external images or scripts. All imagery is inline SVG, CSS gradients/patterns or `data:` URIs. Fonts only from `https://fonts.googleapis.com` / `https://fonts.gstatic.com`, with real fallback stacks. Request fonts without a hard-coded weight list that could fail for single-weight families.
- Use proper typographic punctuation in visible text.

---

## 8. style.md for every style (complete, never abbreviated)
Each of the 50 has a real, complete md with exact values (hex, px/rem, fonts, weights, CSS snippets). Keep it dense but complete (roughly 1.5–3 KB). Structure:

```
# Style: {NN} — {Style Name}
## 1. Concept & Mood
## 2. Color Palette (role | name | HEX table; exact gradient strings if any)
## 3. Typography (heading/body/mono fonts with Google Fonts links, weights, fallbacks; type scale H1/H2/H3/body/caption with size / line-height / weight / letter-spacing / case)
## 4. Layout & Spacing (grid, columns, gutters, spacing scale, margins, section rhythm, RTL/LTR)
## 5. Shape, Borders & Effects (radius, borders, exact box-shadows, textures)
## 6. Components (buttons, cards/callout, inputs, badges, header/footer, dividers, table, numbered steps, code block: each with CSS)
## 7. Imagery & Illustration (technique, motifs, the signature SVG/CSS snippet)
## 8. Motion & Interaction
## 9. CSS Variables (copy-paste :root block)
## 10. Do / Don't (5 and 5)
## 11. AI Prompt Header
"Use the design system described in this file exactly. Reproduce the same colors, fonts, spacing, components and imagery style in everything you build. Do not mix in other styles."
```
The md must match the page exactly (same hex, fonts, sizes). Any difference is a bug.

### Copy behavior
`navigator.clipboard.writeText` in try/catch with fallback to a hidden `<textarea>` + `document.execCommand('copy')`. On success the button shows "Copied ✓" for ~1.5 s. Download saves a Blob as `style-{NN}-{slug}.md` (rely on Copy if downloads are blocked).

---

## 9. Delivery
- Save the single self-contained file to `/mnt/user-data/outputs/style-gallery.html`.
- If the Artifact tool is available, publish it; otherwise call `present_files`.
- Final message: one or two short sentences. Tell the user to scroll, pick a style, click Copy, save as `style.md`, and give it to any AI as a reference. Mention the count only if it is 50.

## 10. Final checklist (all must be true before the final message)
- [ ] First message was only the orientation question
- [ ] `OK 50/50` printed; exactly 50 pages, 50 Copy buttons, 50 md entries
- [ ] All 17 fixed elements are present and styled on every page, with identical text
- [ ] 01 and 02 reproduce the references; 03–50 are invented and distinct
- [ ] Table, steps, callout, template card, code block and image are designed differently in every style
- [ ] No two styles share a palette pair, font pair, composition or motif; none is on the banned list
- [ ] Every md is complete and matches its page
- [ ] No external images or scripts; print and mobile scaling work
