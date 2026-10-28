// التقاط صورة للصفحة للمراجعة البصرية (قاعدة w6). لا يدخل في البناء.
// الاستخدام: node scripts/shot.mjs [url] [out]
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:5173/p/1';
const out = process.argv[3] ?? 'out/preview.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
await page.screenshot({ path: out });
await browser.close();
console.log('saved:', out);
