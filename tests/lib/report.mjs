// توليد التقارير: شاشة (console) + Markdown + HTML + JSON
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const C = { red: '\x1b[31m', yellow: '\x1b[33m', cyan: '\x1b[36m', green: '\x1b[32m', dim: '\x1b[2m', bold: '\x1b[1m', reset: '\x1b[0m' };
const ICON = { error: '✗', warn: '!', info: 'i', pass: '✓' };
const COLOR = { error: C.red, warn: C.yellow, info: C.cyan, pass: C.green };
const AR = { error: 'خطأ', warn: 'تحذير', info: 'معلومة' };

const fmtBytes = (b) => (!b ? '?' : b > 1e6 ? (b / 1e6).toFixed(1) + 'MB' : Math.round(b / 1024) + 'KB');
const shortSrc = (s) => (!s ? '?' : s.startsWith('data:') ? '(صورة مضمنة base64)' : s.length > 60 ? '…' + s.slice(-58) : s);
const fmtDim = (n) => (n ? Math.round(n) : '—');
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function summarize(result) {
  const counts = { error: 0, warn: 0, info: 0 };
  const add = (sev) => { if (counts[sev] != null) counts[sev]++; };
  for (const f of result.doc) add(f.severity);
  for (const p of result.pages) for (const f of p.findings) add(f.severity);
  for (const img of result.images) for (const n of img.advice) add(n.severity);
  return { ...counts, pages: result.pages.length, images: result.images.length };
}

function pageSize(page) {
  const r = page.rect || {};
  return `${Math.round(r.w || 0)}×${Math.round(r.h || 0)}`;
}

export function printConsole(result, { color = true } = {}) {
  const s = result.summary;
  const k = (sev, txt) => (color ? COLOR[sev] + txt + C.reset : txt);
  const dim = (t) => (color ? C.dim + t + C.reset : t);
  const bold = (t) => (color ? C.bold + t + C.reset : t);
  const line = '─'.repeat(64);
  const out = [];
  out.push('');
  out.push(bold('PDF Studio Audit') + '  ·  ' + (result.meta.project ? `project: ${result.meta.project}` : result.meta.target));
  out.push(dim(result.meta.mode === 'images'
    ? `${result.meta.images} صورة · ${result.meta.generatedAt}`
    : `${result.meta.pages} صفحة · ${result.meta.width}×${result.meta.height} · ${result.meta.generatedAt}`));
  out.push(line);
  for (const f of result.doc) {
    out.push(`${k(f.severity, ICON[f.severity])} ${k(f.severity, f.id)}  ${f.title}`);
    out.push(dim(`   ${f.message}`));
    for (const it of f.items || []) out.push(dim(`   • ${it.selector}${it.detail ? ' — ' + it.detail : ''}`));
  }
  for (const p of result.pages) {
    const errs = p.findings.filter((f) => f.severity === 'error').length;
    const warns = p.findings.filter((f) => f.severity === 'warn').length;
    const tag = errs ? k('error', `${errs} خطأ`) : warns ? k('warn', `${warns} تحذير`) : k('pass', 'سليمة');
    out.push('');
    out.push(`${bold(`صفحة ${p.index}`)}  ·  ${pageSize(p)}  ·  ${p.chars.toLocaleString('en-US')} حرف  ·  ${p.images.length} صورة  ·  ${tag}`);
    for (const f of p.findings) {
      out.push(`  ${k(f.severity, ICON[f.severity])} ${f.id.padEnd(14)} ${f.title}`);
      out.push(dim(`      ${f.message}`));
      for (const it of (f.items || []).slice(0, 4)) out.push(dim(`      • ${it.selector}${it.detail ? ' — ' + it.detail : ''}`));
    }
    if (!p.findings.length) out.push(dim('      لا ملاحظات — الصفحة سليمة.'));
  }
  if (result.images.length) {
    out.push('');
    out.push(bold(`الصور (${result.images.length})`));
    for (const img of result.images.slice(0, 40)) {
      const bad = img.advice.filter((n) => n.severity === 'error').length;
      const warn = img.advice.filter((n) => n.severity === 'warn').length;
      const sev = bad ? 'error' : warn ? 'warn' : 'pass';
      const info = img.info || {};
      out.push(`  ${k(sev, ICON[sev])} ${shortSrc(img.src)}`);
      out.push(dim(`      ${info.format || '?'} ${info.width ? info.width + '×' + info.height : '—'} · ${fmtBytes(info.bytes)}${info.effectiveDpi ? ` · ${info.effectiveDpi}DPI` : ''}${img.renderedW ? ` · معروضة ${Math.round(img.renderedW)}×${Math.round(img.renderedH)}` : ''}`));
      for (const n of img.advice.slice(0, 3)) out.push(`      ${k(n.severity, ICON[n.severity])} ${n.message}`);
    }
  }
  if (result.screens.length) {
    out.push('');
    out.push(bold('الشاشات'));
    for (const sc of result.screens) {
      const clipped = sc.pages.filter((p) => p.clippedHoriz).length;
      const scrollV = sc.pages.filter((p) => p.needsScrollV && !p.clippedHoriz).length;
      const sev = clipped ? 'warn' : 'pass';
      const desc = clipped
        ? `${clipped} صفحة مقصوصة أفقيًا`
        : scrollV
          ? `كله ظاهر أفقيًا · ${scrollV} صفحة تحتاج تمرير رأسي (طبيعي)`
          : 'كل الصفحات ظاهرة بالكامل';
      out.push(`  ${k(sev, ICON[sev])} ${sc.width}×${sc.height}  ${desc}${sc.hScroll ? ' · تمرير أفقي للمستند' : ''}`);
    }
  }
  out.push('');
  out.push(line);
  out.push(`${s.error ? k('error', `${s.error} خطأ`) : k('pass', '0 خطأ')}  ·  ${s.warn ? k('warn', `${s.warn} تحذير`) : '0 تحذير'}  ·  ${s.info} معلومة`);
  out.push('');
  console.log(out.join('\n'));
}

// ---------- Markdown ----------
export function toMarkdown(result) {
  const s = result.summary;
  const L = [];
  L.push(`# تقرير فحص PDF Studio`);
  L.push('');
  L.push(`- **الهدف:** ${result.meta.project ? `projects/${result.meta.project}` : result.meta.target}`);
  L.push(`- **الملف/الرابط:** ${result.meta.target}`);
  L.push(`- **الصفحات:** ${s.pages} · **الصور:** ${s.images}`);
  L.push(`- **النتيجة:** ${s.error} خطأ · ${s.warn} تحذير · ${s.info} معلومة`);
  L.push(`- **التاريخ:** ${result.meta.generatedAt}`);
  L.push('');
  const rows = [];
  const pushFinding = (f, where) => rows.push(`| ${where} | ${f.severity} | \`${f.id}\` | ${f.title} — ${f.message.replace(/\|/g, '/')} |`);
  for (const f of result.doc) pushFinding(f, '—');
  for (const p of result.pages) for (const f of p.findings) pushFinding(f, `صفحة ${p.index}`);
  if (rows.length) {
    L.push('## الملاحظات');
    L.push('');
    L.push('| الموضع | الخطورة | المعرّف | التفاصيل |');
    L.push('|---|---|---|---|');
    L.push(...rows);
    L.push('');
  }
  L.push('## تفاصيل الصفحات');
  L.push('');
  L.push('| # | المقاس | الحروف | الصور | أخطاء | تحذيرات |');
  L.push('|---|---|---|---|---|---|');
  for (const p of result.pages) {
    const e = p.findings.filter((f) => f.severity === 'error').length;
    const w = p.findings.filter((f) => f.severity === 'warn').length;
    L.push(`| ${p.index} | ${pageSize(p)} | ${p.chars} | ${p.images.length} | ${e} | ${w} |`);
  }
  L.push('');
  if (result.images.length) {
    L.push('## الصور');
    L.push('');
    L.push('| الصورة | الصيغة | المقاس | الحجم | DPI فعلي | معروضة | ملاحظات |');
    L.push('|---|---|---|---|---|---|---|');
    for (const img of result.images) {
      const i = img.info || {};
      L.push(`| ${shortSrc(img.src)} | ${i.format || '?'} | ${i.width || '—'}×${i.height || '—'} | ${fmtBytes(i.bytes)} | ${i.effectiveDpi || '—'} | ${img.renderedW ? `${Math.round(img.renderedW)}×${Math.round(img.renderedH)}` : '—'} | ${img.advice.map((n) => n.message).join(' / ') || 'سليمة'} |`);
    }
    L.push('');
  }
  if (result.screens.length) {
    L.push('## فحص الشاشات');
    L.push('');
    L.push('| العرض | مقصوصة أفقيًا | تمرير رأسي | تمرير أفقي للمستند |');
    L.push('|---|---|---|---|');
    for (const sc of result.screens) {
      L.push(`| ${sc.width}×${sc.height} | ${sc.pages.filter((p) => p.clippedHoriz).length} | ${sc.pages.filter((p) => p.needsScrollV).length} | ${sc.hScroll ? 'نعم' : 'لا'} |`);
    }
    L.push('');
  }
  if (result.expected && result.expected.missing.length) {
    L.push('## نصوص ناقصة (--expect)');
    L.push('');
    for (const m of result.expected.missing) L.push(`- ${m}`);
    L.push('');
  }
  return L.join('\n');
}

// ---------- HTML ----------
export function toHtml(result) {
  const s = result.summary;
  const sevClass = (sev) => (sev === 'error' ? 'err' : sev === 'warn' ? 'wrn' : 'inf');
  const badge = (sev) => `<span class="b ${sevClass(sev)}">${AR[sev] || sev}</span>`;
  const findingsBlock = (list) => (list.length ? list.map((f) => `
      <div class="finding ${sevClass(f.severity)}">
        <div class="fh"><code>${esc(f.id)}</code> ${badge(f.severity)} <b>${esc(f.title)}</b></div>
        <div class="fm">${esc(f.message)}</div>
        ${f.items && f.items.length ? `<ul>${f.items.map((i) => `<li><code>${esc(i.selector)}</code>${i.detail ? ' — ' + esc(i.detail) : ''}</li>`).join('')}</ul>` : ''}
      </div>`).join('') : '<p class="ok">لا ملاحظات.</p>');

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>PDF Studio Audit</title>
<style>
:root{--bg:#0f1115;--card:#171a21;--line:#252a34;--txt:#e7eaf0;--mut:#98a2b3;--err:#ef5f6b;--wrn:#f2b451;--inf:#59a8ff;--ok:#3ecf8e}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--txt);font:14px/1.7 "Segoe UI",Tahoma,Arial,sans-serif;padding:28px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:26px 0 10px}
.sub{color:var(--mut);font-size:12.5px}
.chips{display:flex;gap:10px;flex-wrap:wrap;margin:16px 0}
.chip{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13px}
.chip b{display:block;font-size:18px;margin-top:2px}
.chip.err b{color:var(--err)}.chip.wrn b{color:var(--wrn)}.chip.inf b{color:var(--inf)}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.finding{border-inline-start:3px solid var(--line);padding:8px 10px;margin:8px 0;background:#12151b;border-radius:8px}
.finding.err{border-color:var(--err)}.finding.wrn{border-color:var(--wrn)}.finding.inf{border-color:var(--inf)}
.fh{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.fm{color:var(--mut);font-size:12.5px;margin-top:2px}
.finding ul{margin:6px 0 0;padding-inline-start:18px;color:var(--mut);font-size:12.5px}
code{background:#0b0d11;border:1px solid var(--line);border-radius:5px;padding:1px 5px;font-size:11.5px;color:#c8d2e0}
.b{font-size:11px;border-radius:5px;padding:1px 6px}
.b.err{background:#3a161a;color:var(--err)}.b.wrn{background:#3a2c12;color:var(--wrn)}.b.inf{background:#132639;color:var(--inf)}
.ok{color:var(--ok);font-size:12.5px;margin:4px 0}
table{width:100%;border-collapse:collapse;font-size:12.5px}
th,td{text-align:start;padding:6px 8px;border-bottom:1px solid var(--line)}
th{color:var(--mut);font-weight:600}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}
.tag{font-size:11.5px;color:var(--mut)}
</style></head><body>
<h1>تقرير فحص PDF Studio</h1>
<div class="sub">${esc(result.meta.project ? 'projects/' + result.meta.project : result.meta.target)} · ${esc(result.meta.generatedAt)}</div>
<div class="chips">
  <div class="chip err">أخطاء<b>${s.error}</b></div>
  <div class="chip wrn">تحذيرات<b>${s.warn}</b></div>
  <div class="chip inf">معلومات<b>${s.info}</b></div>
  <div class="chip">صفحات<b>${s.pages}</b></div>
  <div class="chip">صور<b>${s.images}</b></div>
</div>
${result.doc.length ? `<h2>ملاحظات عامة</h2><div class="card">${findingsBlock(result.doc)}</div>` : ''}
${result.pages.map((p) => `<h2>صفحة ${p.index} <span class="tag">${pageSize(p)} · ${p.chars} حرف · ${p.images.length} صورة</span></h2><div class="card">${findingsBlock(p.findings)}</div>`).join('')}
${result.images.length ? `<h2>الصور</h2><div class="card"><table><tr><th>الصورة</th><th>الصيغة</th><th>المقاس</th><th>الحجم</th><th>DPI</th><th>معروضة</th></tr>
${result.images.map((i) => `<tr><td><code>${esc(shortSrc(i.src))}</code></td><td>${esc((i.info || {}).format || '?')}</td><td>${(i.info || {}).width || '—'}×${(i.info || {}).height || '—'}</td><td>${fmtBytes((i.info || {}).bytes)}</td><td>${(i.info || {}).effectiveDpi || '—'}</td><td>${i.renderedW ? Math.round(i.renderedW) + '×' + Math.round(i.renderedH) : '—'}</td></tr>`).join('')}
</table></div>` : ''}
${result.screens.length ? `<h2>فحص الشاشات</h2><div class="card"><table><tr><th>العرض</th><th>مقصوصة أفقيًا</th><th>تمرير رأسي</th><th>تمرير أفقي للمستند</th><th>لقطة</th></tr>
${result.screens.map((sc) => `<tr><td>${sc.width}×${sc.height}</td><td>${sc.pages.filter((p) => p.clippedHoriz).length}</td><td>${sc.pages.filter((p) => p.needsScrollV).length}</td><td>${sc.hScroll ? 'نعم' : 'لا'}</td><td>${sc.shot ? `<a href="${esc(sc.shot)}" style="color:var(--inf)">${esc(path.basename(sc.shot))}</a>` : '—'}</td></tr>`).join('')}
</table></div>` : ''}
${result.expected && result.expected.missing.length ? `<h2>نصوص ناقصة</h2><div class="card">${result.expected.missing.map((m) => `<div>✗ ${esc(m)}</div>`).join('')}</div>` : ''}
</body></html>`;
}

// ---------- كتابة الملفات ----------
export function writeReports(result, outDir) {
  mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, 'report.json');
  const mdPath = path.join(outDir, 'report.md');
  const htmlPath = path.join(outDir, 'report.html');
  writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf8');
  writeFileSync(mdPath, toMarkdown(result), 'utf8');
  writeFileSync(htmlPath, toHtml(result), 'utf8');
  return { json: jsonPath, md: mdPath, html: htmlPath };
}
