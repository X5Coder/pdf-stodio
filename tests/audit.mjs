#!/usr/bin/env node
// PDF Studio — Image & Layout Audit
// فحص الصور + فحص الشاشات + فحص المحتوى داخل الصفحة + تقارير جاهزة للأيجنت.
//
// أمثلة:
//   node audit.mjs --project demo              # كل صفحات مشروع
//   node audit.mjs --project demo --page 2     # صفحة واحدة
//   node audit.mjs --url http://localhost:5173/demo/p/1
//   node audit.mjs --image ../projects/demo/page-1/images
//   node audit.mjs --all                       # كل المشاريع
//   node audit.mjs --self-test                 # فحص أداة الفحص نفسها
//
// الخيارات: --widths 1440,1024,768,390 · --out <dir> · --json · --no-shots
//           --strict · --tolerance 1 · --expect expected.txt · --headed

import { chromium } from 'playwright';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PAGE_AUDIT } from './lib/checks.mjs';
import { parseImageBuffer, readImageInfo, listImages, isImagePath, imageAdvice } from './lib/image-info.mjs';
import { summarize, printConsole, writeReports } from './lib/report.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VERSION = '1.0.0';
const DEFAULT_BASE = process.env.PDF_STUDIO_URL || 'http://localhost:5173';

// ---------- CLI ----------
function parseArgs(argv) {
  const o = { _: [], widths: [1440, 1024, 768, 390], tolerance: 1, shots: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { o._.push(a); continue; }
    const key = a.slice(2);
    const next = argv[i + 1];
    const takeValue = () => (next != null && !String(next).startsWith('--') ? (i++, next) : true);
    switch (key) {
      case 'project': o.project = String(takeValue()); break;
      case 'page': o.page = String(takeValue()); break;
      case 'url': o.url = String(takeValue()); break;
      case 'base': o.base = String(takeValue()); break;
      case 'image': o.image = [].concat(o.image || [], takeValue()); break;
      case 'images': o.imagesMode = true; break;
      case 'all': o.all = true; break;
      case 'widths': o.widths = String(takeValue()).split(',').map((n) => parseInt(n, 10)).filter((n) => n > 100); break;
      case 'out': o.out = String(takeValue()); break;
      case 'tolerance': o.tolerance = parseFloat(takeValue()) || 1; break;
      case 'expect': o.expect = String(takeValue()); break;
      case 'json': o.json = true; break;
      case 'quiet': o.quiet = true; break;
      case 'strict': o.strict = true; break;
      case 'no-shots': o.shots = false; break;
      case 'headed': o.headed = true; break;
      case 'self-test': case 'selftest': o.selftest = true; break;
      default: break;
    }
  }
  return o;
}

const args = parseArgs(process.argv.slice(2));
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const OUT_DIR = path.resolve(args.out || path.join(HERE, 'out', stamp));
mkdirSync(OUT_DIR, { recursive: true });

const PRESET_PX = { slide: [1280, 720], a4: [794, 1123], a4l: [1123, 794], letter: [816, 1056], letterl: [1056, 816] };
const PRESET_MM = { slide: 338.7, a4: 210, a4l: 297, letter: 215.9, letterl: 279.4 };

function presetKey(config) {
  if (!config) return null;
  let p = String(config.preset || '').trim().toLowerCase();
  if (!p) p = config.orientation === 'portrait' ? 'a4' : 'slide';
  if (config.orientation === 'landscape' && (p === 'a4' || p === 'letter')) p += 'l';
  if (config.orientation === 'portrait' && (p === 'a4l' || p === 'letterl')) p = p.slice(0, -1);
  return PRESET_PX[p] ? p : null;
}

// ---------- browser ----------
async function launchBrowser() {
  const attempts = [{ headless: !args.headed }];
  try {
    return await chromium.launch(attempts[0]);
  } catch (e) {
    for (const channel of ['msedge', 'chrome']) {
      try { return await chromium.launch({ ...attempts[0], channel }); } catch {}
    }
    throw new Error(`تعذّر تشغيل المتصفح. شغّل: npx playwright install chromium\n(${e.message})`);
  }
}

const SCREEN_FIT = () => {
  const de = document.documentElement;
  const out = {
    innerWidth, innerHeight, dpr: devicePixelRatio,
    docScrollW: de.scrollWidth, docClientW: de.clientWidth,
    hScroll: de.scrollWidth > de.clientWidth + 1,
    pages: [],
  };
  document.querySelectorAll('.pdf-page').forEach((p, i) => {
    const r = p.getBoundingClientRect();
    const visW = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
    const visH = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
    out.pages.push({
      index: i + 1,
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      visibleRatio: +((visW * visH) / Math.max(1, r.width * r.height)).toFixed(3),
      fullyVisible: r.left >= -1 && r.top >= -1 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1,
      clippedHoriz: r.left < -1 || r.right > innerWidth + 1,
      needsScrollV: r.bottom > innerHeight + 1,
    });
  });
  return out;
};

async function fetchImageBytes(page, src) {
  if (!src) return null;
  if (src.startsWith('data:')) {
    const m = /^data:[^;]*;base64,(.*)$/s.exec(src);
    return m ? Buffer.from(m[1], 'base64') : null;
  }
  try {
    const b64 = await page.evaluate(async (u) => {
      try {
        const r = await fetch(u);
        if (!r.ok) return null;
        const ab = await r.arrayBuffer();
        if (ab.byteLength > 12e6) return null;
        const bytes = new Uint8Array(ab);
        let s = '';
        const CH = 0x8000;
        for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
        return btoa(s);
      } catch { return null; }
    }, src);
    return b64 ? Buffer.from(b64, 'base64') : null;
  } catch {
    if (src.startsWith('file:')) {
      try { return readFileSync(fileURLToPath(src)); } catch { return null; }
    }
    return null;
  }
}

// ---------- image-only mode ----------
function runImageMode(files) {
  const rows = files.map((f) => {
    const info = readImageInfo(f);
    const advice = imageAdvice(info, {});
    const sev = advice.some((n) => n.severity === 'error') ? 'error' : advice.some((n) => n.severity === 'warn') ? 'warn' : 'pass';
    return { src: f, info, advice, severity: sev };
  });
  const result = {
    meta: {
      tool: 'PDF Studio Audit', version: VERSION, mode: 'images',
      generatedAt: new Date().toLocaleString('en-GB'), target: files.length === 1 ? files[0] : `${files.length} صورة`, project: null,
      pages: 0, images: files.length,
    },
    doc: [], pages: [], screens: [], images: rows,
  };
  result.summary = summarize(result);
  return result;
}

// ---------- live page audit ----------
async function runLive(urls, { projectId = null, config = null, expectedText = null, allUrl = null } = {}) {
  const pKey = presetKey(config);
  const expected = pKey ? { w: PRESET_PX[pKey][0], h: PRESET_PX[pKey][1] } : null;
  const browser = await launchBrowser();
  const started = Date.now();
  const result = {
    meta: {
      tool: 'PDF Studio Audit', version: VERSION, mode: 'pages',
      generatedAt: new Date().toLocaleString('en-GB'),
      target: urls.length === 1 ? urls[0] : `${urls.length} صفحة`,
      project: projectId, preset: pKey, expected,
      width: 1440, height: 900, pages: urls.length, images: 0,
    },
    doc: [], pages: [], screens: [], images: [],
    expected: expectedText ? { checked: expectedText.length, missing: [] } : null,
  };

  const shotsDir = path.join(OUT_DIR, 'shots');
  if (args.shots) mkdirSync(shotsDir, { recursive: true });
  let allText = '';

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  result.meta.userAgent = await page.evaluate(() => navigator.userAgent);

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 45000 });
      await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});
      await page.waitForTimeout(400);
    } catch (e) {
      result.doc.push({ id: 'PAGE_LOAD_ERROR', severity: 'error', title: 'فشل تحميل الصفحة', message: `${url} — ${e.message}`, items: [] });
      continue;
    }

    const raw = await page.evaluate(PAGE_AUDIT, {
      tolerance: args.tolerance,
      expected,
      expectDir: config && config.dir ? config.dir : null,
      requireAlt: true,
    });

    allText += '\n' + (await page.evaluate(() => Array.from(document.querySelectorAll('.pdf-page')).map((p) => p.innerText).join('\n')));

    if (args.shots) {
      const n = await page.locator('.pdf-page').count();
      for (let i = 0; i < Math.min(n, 40); i++) {
        const file = path.join(shotsDir, `page-${String(result.pages.length + i + 1).padStart(2, '0')}.png`);
        try { await page.locator('.pdf-page').nth(i).screenshot({ path: file }); } catch {}
      }
    }

    const offset = result.pages.length;
    for (const f of raw.doc) result.doc.push({ ...f, url });
    for (const p of raw.pages) {
      result.pages.push({ ...p, localIndex: p.index, index: result.pages.length + 1, url });
    }
    for (const img of raw.images) result.images.push({ ...img, page: offset + img.page, url });
  }

  if (consoleErrors.length) {
    result.doc.push({ id: 'CONSOLE_ERRORS', severity: 'warn', title: 'أخطاء في الـ console أثناء العرض', message: `${consoleErrors.length} رسالة — قد تعني خطأ في الصفحة أو خط fonts.`, items: consoleErrors.slice(0, 5).map((t) => ({ selector: '', detail: t.slice(0, 160) })) });
  }

  // ----- الصور: قراءة البايتات + تقييم الجودة -----
  const pageWidths = new Map();
  for (const p of result.pages) pageWidths.set(p.index, p.rect && p.rect.w ? p.rect.w : expected ? expected.w : 0);
  const seen = new Map();
  const enriched = [];
  for (const img of result.images) {
    if (!seen.has(img.src)) seen.set(img.src, []);
    seen.get(img.src).push(img);
  }
  for (const [src, uses] of seen) {
    const first = uses[0];
    let buf = await fetchImageBytes(page, src);
    let info = buf ? parseImageBuffer(buf) : { format: null, width: 0, height: 0, bytes: 0 };
    if (!info.format && info.width === 0 && first.naturalW) {
      info = { ...info, width: first.naturalW, height: first.naturalH, bytes: buf ? buf.length : 0, format: 'unknown' };
    }
    const pxW = pageWidths.get(first.page) || 0;
    const mmW = pKey ? PRESET_MM[pKey] : 0;
    const rw = first.layoutW || first.w;
    const rh = first.layoutH || first.h;
    const advice = first.broken ? [] : imageAdvice(info, { renderedW: rw, renderedH: rh, pagePxW: pxW, pageMmW: mmW });
    if (first.broken) advice.push({ severity: 'error', message: 'الصورة مكسورة (naturalWidth = 0) — المسار غلط أو الملف مش موجود.' });
    else if (first.alt == null) advice.push({ severity: 'warn', message: 'مفيش نص بديل (alt) — مهم للوصولية وفهرسة المحتوى.' });
    enriched.push({ src, file: src.startsWith('data:') ? '(embedded)' : src, pages: uses.map((u) => u.page), renderedW: rw, renderedH: rh, naturalW: first.naturalW, naturalH: first.naturalH, alt: first.alt, info, advice });
  }
  result.images = enriched;

  // ----- الشاشات -----
  for (const w of args.widths) {
    const h = Math.round((w * 9) / 16);
    try {
      await page.setViewportSize({ width: w, height: h });
      const target = allUrl || urls[0];
      await page.goto(target, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(300);
      const fit = await page.evaluate(SCREEN_FIT);
      let shot = null;
      if (args.shots) {
        shot = path.join('shots', `view-${w}.png`);
        try { await page.screenshot({ path: path.join(OUT_DIR, shot), fullPage: false }); } catch { shot = null; }
      }
      result.screens.push({ ...fit, width: w, height: h, shot });
    } catch (e) {
      result.screens.push({ width: w, height: h, pages: [], hScroll: false, error: String(e.message || e), shot: null });
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });

  await browser.close();

  // ----- نصوص متوقعة -----
  if (expectedText) {
    const norm = (s) => s.replace(/\s+/g, ' ').trim();
    const hay = norm(allText);
    for (const line of expectedText) {
      if (!hay.includes(norm(line))) result.expected.missing.push(line);
    }
    if (result.expected.missing.length) {
      result.doc.push({ id: 'MISSING_TEXT', severity: 'error', title: 'نصوص مطلوبة غير موجودة', message: `${result.expected.missing.length} نص من ${expectedText.length} مش موجود في الصفحات.`, items: result.expected.missing.slice(0, 10).map((t) => ({ selector: '', detail: t.slice(0, 90) })) });
    }
  }

  result.meta.images = result.images.length;
  result.meta.pages = result.pages.length;
  result.meta.durationMs = Date.now() - started;
  result.summary = summarize(result);
  return result;
}

// ---------- self-test ----------
async function selfTest() {
  const fixture = path.join(HERE, 'fixtures', 'selftest.html');
  if (!existsSync(fixture)) throw new Error('ملف الاختبار الذاتي غير موجود: ' + fixture);
  const url = pathToFileURL(fixture).href;
  const result = await runLive([url], { projectId: null, config: { preset: 'a4', orientation: 'portrait', dir: 'rtl' } });
  const ids = new Set([
    ...result.doc.map((f) => f.id),
    ...result.pages.flatMap((p) => p.findings.map((f) => f.id)),
  ]);
  const expected = ['OVERFLOW', 'IMG_BROKEN', 'IMG_ALT', 'TEXT_OVERLAP', 'CONTRAST', 'DUP_ID', 'LINKS_IN_PAGE', 'CSS_FIXED', 'FONT_TINY', 'PAGE_EMPTY', 'PAGE_SIZE'];
  const missing = expected.filter((id) => !ids.has(id));
  if (!args.quiet) printConsole(result);
  const paths = writeReports(result, OUT_DIR);
  console.log(missing.length
    ? `\n✗ SELF-TEST FAILED — فحوصات لم تُكتشف: ${missing.join(', ')}`
    : `\n✓ SELF-TEST PASSED — كل الفحوصات (${expected.length}) اشتغلت.`);
  console.log(`  التقارير: ${paths.md}`);
  return missing.length ? 1 : 0;
}

// ---------- main ----------
async function main() {
  if (args.selftest) return selfTest();

  // وضع الصور فقط
  const positional = args._.filter(Boolean);
  if (args.imagesMode || args.image || positional.some((p) => isImagePath(p) || (existsSync(p) && statSync(p).isDirectory()))) {
    let targets = [];
    for (const t of [].concat(args.image || [], positional)) {
      if (!existsSync(t)) continue;
      const st = statSync(t);
      if (st.isDirectory()) targets.push(...listImages(t));
      else if (isImagePath(t)) targets.push(t);
    }
    if (!targets.length) {
      console.error('مفيش صور في المسارات المحددة.');
      return 2;
    }
    const result = runImageMode(targets);
    if (!args.quiet) printConsole(result);
    const paths = writeReports(result, OUT_DIR);
    if (!args.quiet) console.log(`  التقارير: ${paths.md}\n  ${paths.html}\n`);
    if (args.json) console.log(JSON.stringify(result, null, 2));
    return result.summary.error ? 1 : 0;
  }

  const base = args.base || (args.url ? new URL(args.url).origin : DEFAULT_BASE);
  let projectId = args.project || null;
  let config = null;
  const jobs = [];

  if (args.url) {
    jobs.push({ projectId: projectId || null, config: null, urls: [args.url], allUrl: args.url });
  } else {
    let projects = [];
    try {
      const r = await fetch(`${base}/__pdfstudio/projects`);
      const d = await r.json();
      projects = d.projects || [];
    } catch {
      throw new Error(`المحرك مش شغّال على ${base} — شغّله الأول: cd engine && npm run dev`);
    }
    if (!projects.length) {
      console.error('مفيش مشاريع في projects/. اعمل مشروع الأول (أو من الواجهة بزر +).');
      return 2;
    }
    if (projectId) {
      const p = projects.find((x) => x.id === projectId || x.name === projectId);
      if (!p) { console.error(`المشروع "${projectId}" مش موجود. المتاح: ${projects.map((x) => x.id).join(', ')}`); return 2; }
      projectId = p.id;
      config = p.config || {};
    } else if (!args.all) {
      console.error('حدد مشروع: --project <id>  أو كل المشاريع: --all');
      console.error('المتاح: ' + projects.map((x) => `${x.id} (${x.name})`).join(' · '));
      return 2;
    }

    const wanted = projectId ? [projects.find((p) => p.id === projectId)] : projects;
    for (const proj of wanted) {
      let nums = [];
      try {
        const r = await fetch(`${base}/__pdfstudio/pages?project=${encodeURIComponent(proj.id)}`);
        const d = await r.json();
        nums = d.pages || [];
      } catch {}
      if (args.page) nums = nums.filter((n) => String(n) === String(args.page));
      if (!nums.length) nums = args.page ? [parseInt(args.page, 10) || 1] : [1];
      jobs.push({
        projectId: proj.id,
        config: proj.config || {},
        urls: nums.map((n) => `${base}/${encodeURIComponent(proj.id)}/p/${n}`),
        allUrl: `${base}/${encodeURIComponent(proj.id)}/all`,
      });
    }
  }

  let expectedText = null;
  if (args.expect) {
    expectedText = readFileSync(args.expect, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
  }

  const parts = [];
  for (const job of jobs) {
    parts.push(await runLive(job.urls, { projectId: job.projectId, config: job.config, expectedText, allUrl: job.allUrl }));
  }

  // دمج نتائج أكثر من مشروع في تقرير واحد
  let result = parts[0];
  if (parts.length > 1) {
    result = {
      meta: {
        ...parts[0].meta,
        project: parts.map((p) => p.meta.project).filter(Boolean).join(', ') || null,
        target: `${parts.reduce((a, p) => a + p.pages.length, 0)} صفحة في ${parts.length} مشروع`,
        pages: parts.reduce((a, p) => a + p.pages.length, 0),
        images: parts.reduce((a, p) => a + p.images.length, 0),
        expected: null,
        preset: null,
        durationMs: parts.reduce((a, p) => a + (p.meta.durationMs || 0), 0),
      },
      doc: parts.flatMap((p) => p.doc),
      pages: parts.flatMap((p) => p.pages),
      images: parts.flatMap((p) => p.images),
      screens: [],
      expected: null,
    };
    const byWidth = new Map();
    for (const p of parts) for (const s of p.screens) if (!byWidth.has(s.width)) byWidth.set(s.width, s);
    result.screens = Array.from(byWidth.values()).sort((a, b) => b.width - a.width);
    result.summary = summarize(result);
  }

  if (!args.quiet && !args.json) printConsole(result);
  const paths = writeReports(result, OUT_DIR);
  if (!args.quiet && !args.json) {
    console.log(`  الملفات: ${path.relative(process.cwd(), paths.md)}  ·  ${path.relative(process.cwd(), paths.html)}`);
    if (args.shots) console.log(`  الصور: ${path.relative(process.cwd(), path.join(OUT_DIR, 'shots'))}`);
    console.log('');
  }
  if (args.json) console.log(JSON.stringify(result, null, 2));

  const fail = result.summary.error > 0 || (args.strict && result.summary.warn > 0);
  return fail ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('\n✗ ' + (e && e.message ? e.message : e)); process.exit(3); });
