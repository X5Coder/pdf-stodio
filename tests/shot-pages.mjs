// التقاط كل صفحة (.pdf-page) كصورة كاملة بمقاسها الحقيقي — نفس العقد
// التي يلتقطها التصدير تماماً (تحقق بصري w6).
// الاستخدام: node scripts/shot-pages.mjs [url] [outDir]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:5173/export';
const outDir = process.argv[3] ?? 'out/pages';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const nodes = page.locator('.pdf-page');
const n = await nodes.count();
for (let i = 0; i < n; i++) {
  await nodes.nth(i).screenshot({ path: `${outDir}/page-${i + 1}.png` });
  console.log('saved:', `${outDir}/page-${i + 1}.png`);
}
await browser.close();
