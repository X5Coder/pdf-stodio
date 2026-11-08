// اختبار التصدير طرفاً لطرف (قواعد e5/w6): يفتح /export?run=1 ويلتقط ملف الـ PDF
// الناتج، ثم يتحقق من عدد الصفحات ومقاس كل صفحة.
// الاستخدام: node scripts/test-export.mjs [baseUrl] [outPdf]
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:5173';
const outPdf = process.argv[3] ?? 'out/deck-test.pdf';
const expected = Number(process.argv[4] ?? 3);
mkdirSync(dirname(outPdf), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();
await page.goto(`${base}/export?run=1&from=/export`, { waitUntil: 'networkidle' });
const download = await page.waitForEvent('download', { timeout: 90000 });
const dlPath = await download.path();
writeFileSync(outPdf, readFileSync(dlPath));
await browser.close();

// فحص بنية الـ PDF: عدد الصفحات + مقاس كل صفحة (pt)
const raw = readFileSync(outPdf, 'latin1');
const pageCount = (raw.match(/\/Type\s*\/Page([^sA-Za-z]|$)/g) ?? []).length;
const boxes = [...raw.matchAll(/\/MediaBox\s*\[([^\]]+)\]/g)].map((m) => m[1].trim().split(/\s+/).map(Number));

console.log('pages:', pageCount);
boxes.forEach((b, i) => {
  const w = b[2] - b[0];
  const h = b[3] - b[1];
  console.log(`page ${i + 1}: ${w.toFixed(2)} x ${h.toFixed(2)} pt (expected ~960 x 540)`);
});

// 1280×720px @96dpi = ‏960×540pt — تسامح ±2pt
const okCount = pageCount === expected;
const okSize = boxes.length === pageCount && boxes.every((b) => Math.abs(b[2] - b[0] - 960) < 2 && Math.abs(b[3] - b[1] - 540) < 2);
console.log(okCount && okSize ? 'EXPORT TEST: PASS' : 'EXPORT TEST: FAIL');
process.exit(okCount && okSize ? 0 : 1);
