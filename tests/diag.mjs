// تشخيص مقاسات المعاينة: يطبع innerWidth/Height والـ scale وأبعاد الصفحة.
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto('http://localhost:5173/p/1', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const info = await page.evaluate(() => {
  const inner = document.querySelector('main > div');
  const scaled = inner?.firstElementChild;
  const section = document.querySelector('.pdf-page');
  const h1 = document.querySelector('h1');
  const r = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { x: Math.round(b.x), w: Math.round(b.width), scrollW: el.scrollWidth };
  };
  return {
    win: [window.innerWidth, window.innerHeight],
    transform: scaled?.style?.transform,
    wrapper: r(inner),
    page: r(section),
    h1: h1 ? { x: Math.round(h1.getBoundingClientRect().x), w: Math.round(h1.getBoundingClientRect().width), scrollW: h1.scrollWidth, clientW: h1.clientWidth } : null
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
