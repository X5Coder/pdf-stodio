// التحقق من وجود كل المحتوى المطلوب داخل الصفحة المبنية (قاعدة: حط كل المحتوى).
// الاستخدام: node scripts/verify-content.mjs [url] [expected.txt]
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:5173/p/3';
const file = process.argv[3] ?? '';
const expected = readFileSync(file, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const text = await page.locator('.pdf-page').last().innerText();
await browser.close();

let missing = 0;
for (const s of expected) {
  if (text.includes(s)) console.log('FOUND  :', s);
  else {
    console.log('MISSING:', s);
    missing++;
  }
}
console.log(missing ? `RESULT: FAIL — ${missing} missing` : `RESULT: PASS — all ${expected.length} found`);
process.exit(missing ? 1 : 0);
