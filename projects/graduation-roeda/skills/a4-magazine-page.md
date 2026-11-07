---
name: a4-magazine-page
description: Builds a single A4-portrait HTML+CSS page in an elegant light-beige magazine style with rounded corners, an arch hero image, a two-column article, a dark stats pill, a table with progress bars, SVG illustrations, a bar chart and a checklist. Use when the user asks for an A4 report, magazine page, catalog page or printable dashboard-style document, especially in Arabic (RTL).
---

# A4 Magazine Page

One self-contained `.html` file (CSS inside `<style>`, images as inline SVG, no external images). Prints and exports to PDF at exactly A4 portrait. Arabic RTL by default; switching `dir="rtl"` to `dir="ltr"` must still work because only logical properties are used.

## Design intent
Calm, light, editorial. Almost-white warm beige paper, soft rounded white cards, ONE dark element (the stats pill) as the visual anchor, and warm caramel illustrations. Nothing heavy at the page edges. Spend boldness in one place only: the big masthead title and the dark stats pill.

## Hard rules (learned the hard way)
1. NO thick or dark lines at the top or bottom edge of the page. Only thin 1px rules in the soft `--line` color.
2. NEVER give the table section or any text-driven section a fixed height or `overflow: hidden`. Fonts differ between machines and content gets clipped. Let the table define its row height; the sibling image stack stretches to match.
3. SVG illustrations must have a viewBox with the SAME aspect ratio as their container, otherwise `slice` crops the shapes. Keep key shapes away from the edges.
4. Inside flex/grid cards, give charts and images an explicit size or absolute positioning (`position:absolute; inset:0`) so they never inflate the card.
5. Use logical CSS properties (`inset-inline`, `padding-inline`, `border-inline-start`, `margin-inline`, `text-align: start/end`) so RTL/LTR both work.
6. Everything is measured in `mm` and `pt` so print is exact.
7. After building, render with a headless browser, LOOK at the screenshot, and run an overflow check. Do not deliver unverified.

## Tokens
```css
:root {
  --paper: #FEFCF8;   /* بيج فاتح جدا للصفحة */
  --tint:  #F8F1E5;   /* بيج للكروت الملونة والاقتباس */
  --line:  #EDE3D1;   /* الخطوط الرفيعة والحدود */
  --ink:   #2A211B;   /* بني غامق للنص والعناصر الغامقة */
  --muted: #85786B;   /* نص ثانوي */
  --accent:#A8734A;   /* كراميل للتفاصيل */
  --r: 7mm;           /* نصف قطر الحواف الموحد */
  --display: "El Messiri", "Cairo", "Segoe UI", serif;
  --body: "Cairo", "Segoe UI", Tahoma, sans-serif;
}
```
Fonts: Google Fonts `Cairo` 400/600 and `El Messiri` 500/700, always with the fallback stacks above. Illustration caramel is `#B4824F`.

## Page shell
```css
@page { size: A4 portrait; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { background: #EAE4D8; }
body { font-family: var(--body); color: var(--ink);
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page {
  width: 210mm; height: 297mm; margin: 12mm auto;
  background: var(--paper);
  padding: 11mm 12mm 8mm;
  display: flex; flex-direction: column; gap: 5mm;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(42,33,27,.2);
}
@media print { html { background: none; } .page { margin: 0; box-shadow: none; } }
@media (max-width: 220mm) { .page { zoom: .6; margin: 4mm auto; } }
```

## Vertical structure (top to bottom, gap 5mm)
1. Masthead (`19mm`)
2. Feature (`84mm`)
3. Stats strip (`15mm`)
4. Mid: table + image stack (height from content, about 75mm)
5. Low: three cards (`flex: 1; min-height: 0`, absorbs the remaining space, about 50mm)
6. Footer (thin rule, 8pt)

## Sections

### 1. Masthead
Top meta row (8.5pt, muted, three items spread with `justify-content: space-between`: issue number with bold number, date, report type). Below it the title `h1` centered, `--display` 700, `36pt`, `line-height: 1`. Then a 1px `--line` rule. Container: flex column, `justify-content: space-between`.

### 2. Feature (grid)
`grid-template-columns: 70mm 1fr; gap: 8mm; height: 84mm`.
- Right (first column in RTL): the ARCH image. `border-radius: 35mm 35mm var(--r) var(--r)`, overflow hidden, SVG `viewBox="0 0 100 118"` (sky `#F2E4C9`, sun `#E8B873` r19 at 50,44, three layered hills `#D8B88B`, `#B4824F`, `#7A5636`). A centered pill caption at the bottom: `--paper` background, radius 10mm, padding `1.3mm 5mm`, 8.5pt, weight 600.
- Left: story column (flex column): kicker (9pt, `--accent`, 600), headline `h2` (`--display` 700, 20pt, line-height 1.3, `text-wrap: balance`), lead (10pt, muted, line-height 1.8), byline row (round 7mm accent avatar, "by NAME" with bold name, reading time; 8.5pt muted), body text in TWO columns (`column-count: 2; column-gap: 6mm; font-size: 8.6pt; line-height: 1.8; text-align: justify; flex: 1; min-height: 0; overflow: hidden`), and at the bottom a pull-quote box (`--tint` background, radius `--r`, padding `2.8mm 5mm`, `--display` 500, 11pt, margin-top 3mm). Keep body text short enough to fit; do not overflow.

### 3. Stats strip
Dark pill: height 15mm, background `--ink`, text `--paper`, `border-radius: 10mm`, `display:flex; justify-content: space-between; align-items:center; padding-inline: 10mm`. Each stat = big number (`--display` 700, 21pt) + inline label (9pt, `--line` color, `white-space: nowrap`), `align-items: baseline; gap: 3mm`. Exactly three stats.

### 4. Mid: table + image stack
`display:grid; grid-template-columns: 1fr 52mm; gap: 6mm` (NO fixed height, NO overflow hidden).
- Card (`.box`): white, `1px solid var(--line)`, radius `--r`, padding `3.5mm 5mm`. Title `h3` (`--display` 700, 12pt, margin-bottom 2mm).
- Table: `width:100%; table-layout: fixed; border-collapse: collapse; font-size: 9.2pt`. Columns 30% item / 24% progress / 24% status / 22% total. `th`: 8.5pt, muted, 600, `padding 1.6mm 0`, bottom border `1px solid var(--ink)`. `td`: `padding: 2.2mm 0`, bottom border `1px solid var(--line)`, first cell weight 600. Total row: no borders, weight 700, label spans 3 columns, number right-aligned via `text-align: end` with `font-variant-numeric: tabular-nums`.
- Status pill: `border-radius: 10mm; padding: .2mm 2.8mm; font-size: 8pt; 600`; done = `--tint` background; in-progress = `--accent` background with white text.
- Progress bar: height `2.2mm`, radius `2mm`, track `--line`, width 85%, fill `--accent`, fill starts from the reading-start side.
- Image stack (right of table in RTL): `display:grid; grid-template-rows: 1fr 1fr; gap: 4mm; min-height: 62mm`. Each tile: radius `--r`, overflow hidden, `position: relative; min-height: 0`; its SVG is `position:absolute; inset:0; width:100%; height:100%`, `viewBox="0 0 100 70"`, `preserveAspectRatio="xMidYMid slice"`. Small caption pill at the inline-start bottom (`--paper`, radius 10mm, 8pt, 600).
  - Tile A (landscape): bg `#E6ECDD`, sun `#F6EBC8`, hills `#7B9972` and `#46613F`.
  - Tile B (shapes): bg `#F6E7D8`, circles `#B4824F` and `#E6CDA3`, rounded square `#2A211B` rx 7.

### 5. Low row (three cards)
`flex:1; min-height:0; display:grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 6mm`. Each card is a `.box` with `display:flex; flex-direction:column; min-height:0; overflow:hidden`.
- Bar chart card: title plus inline SVG `viewBox="0 0 200 86"` (`display:block; width:100%; flex:1; min-height:0`). Six bars, width 22, gap 9, radius `rx=6`, baseline y=70, height = value / max * 58. Tallest bar `#2A211B`, others `#B4824F`. Value labels above bars (6.5pt, weight 600, ink), month labels at y=83 (8pt, muted). Bar values MUST sum to the same total shown in the table and stats strip.
- Round image card: centered perfect circle (`aspect-ratio:1; border-radius:50%; overflow:hidden`), SVG viewBox `0 0 100 100`: bg `#F1E3C8`, sun `#E8B873`, hills `#B4824F` and `#7A5636`.
- Checklist card: `--tint` background, no border. Title in `--display` 12pt, then three rows (9pt) with a 4.2mm circle marker (`1.4px solid var(--ink)`; completed = filled `--ink`).

### 6. Footer
`display:flex; justify-content: space-between; font-size: 8pt; color: var(--muted); border-block-start: 1px solid var(--line); padding-top: 2.5mm`. Left: brand name. Right: page number.

## Content consistency
Totals must agree everywhere: table total = stats strip total = sum of chart bars; counts in the strip match the statuses in the table; progress-bar values match status (done = 100%).

## Typography rules
Display font only for the masthead, headlines, stat numbers, card titles and pull-quote. Everything else uses Cairo. Sentence case, short plain labels, no all-caps eyebrows, no decorative gradients, no heavy shadows inside the page.

## Verification (always do this)
Render and measure with Playwright:
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 900, 'height': 1200}, device_scale_factor=1.3)
    pg.goto('file:///path/to/page.html'); pg.wait_for_timeout(400)
    pg.locator('.page').screenshot(path='check.png')
    print(pg.evaluate("""()=>{const o=[];
      for (const s of ['.cols','.story','.mid .box','.low .box','.stack','.page'])
        document.querySelectorAll(s).forEach(e=>{
          if (e.scrollHeight > e.clientHeight + 1) o.push(s+' '+e.scrollHeight+'>'+e.clientHeight)});
      return o}"""))
    b.close()
```
View `check.png`. The overflow list must be empty, no shape may be cropped, and nothing may touch or leave the page edge. If the footer is not fully inside the page, shorten text or reduce the low row, never add fixed heights to the table section.

## Customizing
Replace placeholder copy, numbers, month names and SVG scenes with the user's real content. To use real photos, swap each `<svg>` for `<img>` with `width:100%; height:100%; object-fit: cover`. To change the mood, edit only the tokens and the SVG hex values.
