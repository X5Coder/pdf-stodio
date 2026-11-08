import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

// يحوّل كل صفحة (بعنصر .pdf-page) لصورة PNG واحدة بنفس المقاس الحقيقي،
// ثم يجمعها في PDF واحد — كل صفحة PDF = صورة واحدة بملء الصفحة تماماً،
// بلا هوامش ولا عناصر إضافية.
// المقاس بالبكسل يتحوّل للمليمتر (96dpi): 1px = 0.264583mm.
const PX_TO_MM = 0.2645833333;

// يترك للواجهة فرصة ترسم التحديثات (النِسبة داخل الزر) بين الصفحات
const paint = () => new Promise((r) => setTimeout(r, 40));

async function waitReady() {
  try { await document.fonts.ready; } catch {}
  await new Promise((r) => setTimeout(r, 250));
}

// مهلة قصوى لكل صفحة — تحول أي توقف غير متوقع لخطأ يعيده الـ export بدل تجميد الموقع
function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`timeout: ${label}`)), ms)),
  ]);
}

export async function exportAllPagesToPdf({ fileName = 'document.pdf', onProgress, root } = {}) {
  const report = (payload) => {
    if (typeof onProgress === 'function') onProgress(payload);
  };

  report({ phase: 'preparing', current: 0, total: 0, percent: 2, message: 'تجهيز الخطوط والصفحات...' });
  await waitReady();
  const scope = root && typeof root.querySelectorAll === 'function' ? root : document;
  const nodes = Array.from(scope.querySelectorAll('.pdf-page'));
  if (!nodes.length) throw new Error('لا توجد صفحات للتصدير');

  const total = nodes.length;
  const pixelRatio = 2; // دقة مضاعفة لصورة حادة في الـ PDF
  let pdf = null;
  for (let i = 0; i < nodes.length; i++) {
    const current = i + 1;
    const renderPercent = 5 + Math.round((i / total) * 85);
    report({
      phase: 'rendering',
      current,
      total,
      percent: renderPercent,
      message: `معالجة الصفحة ${current} من ${total}...`
    });
    await paint();

    const node = nodes[i];
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    // خلفية الصفحة نفسها (تحفظ صفحات brand الداكنة كما هي)
    const bg = getComputedStyle(node).backgroundColor;
    const dataUrl = await withTimeout(
      toPng(node, {
        pixelRatio,
        backgroundColor: bg,
        width: w,
        height: h,
        style: { transform: 'none', margin: '0' }
      }),
      60000,
      `rendering page ${current}`
    );
    const orientation = h >= w ? 'portrait' : 'landscape';
    const format = [w * PX_TO_MM, h * PX_TO_MM];
    if (!pdf) {
      pdf = new jsPDF({ orientation, unit: 'mm', format, compress: true });
    } else {
      pdf.addPage(format, orientation);
    }
    pdf.addImage(dataUrl, 'PNG', 0, 0, format[0], format[1]);

    report({
      phase: 'rendering',
      current,
      total,
      percent: 5 + Math.round((current / total) * 85),
      message: `تم تجهيز الصفحة ${current} من ${total}`
    });
  }

  report({ phase: 'saving', current: total, total, percent: 96, message: 'إنشاء ملف PDF...' });
  await paint();
  pdf.save(fileName);
  report({ phase: 'done', current: total, total, percent: 100, message: 'بدأ تنزيل الملف' });
}

export async function exportSinglePageToPng(node, fileName = 'page.png') {
  await waitReady();
  const dataUrl = await toPng(node, { pixelRatio: 2 });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  a.click();
}
