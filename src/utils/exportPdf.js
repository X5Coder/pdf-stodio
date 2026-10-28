import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

// يحوّل كل صفحة (بعنصر .pdf-page) لصورة PNG واحدة بنفس المقاس الحقيقي،
// ثم يجمعها في PDF واحد — كل صفحة PDF = صورة واحدة بملء الصفحة تماماً،
// بلا هوامش ولا عناصر إضافية.
// المقاس بالبكسل يتحوّل للمليمتر (96dpi): 1px = 0.264583mm.
const PX_TO_MM = 0.2645833333;

async function waitReady() {
  await document.fonts.ready;
  try {
    await Promise.all([
      document.fonts.load("400 22px 'IBM Plex Sans Arabic'"),
      document.fonts.load("600 22px 'IBM Plex Sans Arabic'"),
      document.fonts.load("700 22px 'IBM Plex Sans Arabic'")
    ]);
  } catch {
    // يكفي fonts.ready كاحتياط
  }
  await new Promise((r) => setTimeout(r, 400));
}

export async function exportAllPagesToPdf({ fileName = 'document.pdf' } = {}) {
  await waitReady();
  const nodes = Array.from(document.querySelectorAll('.pdf-page'));
  if (!nodes.length) throw new Error('لا توجد صفحات للتصدير');

  const pixelRatio = 2; // دقة مضاعفة لصورة حادة في الـ PDF
  let pdf = null;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    // خلفية الصفحة نفسها (تحفظ صفحات brand الداكنة كما هي)
    const bg = getComputedStyle(node).backgroundColor;
    const dataUrl = await toPng(node, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: bg,
      width: w,
      height: h,
      style: { transform: 'none', margin: '0' }
    });
    const orientation = h >= w ? 'portrait' : 'landscape';
    const format = [w * PX_TO_MM, h * PX_TO_MM];
    if (!pdf) {
      pdf = new jsPDF({ orientation, unit: 'mm', format, compress: true });
    } else {
      pdf.addPage(format, orientation);
    }
    pdf.addImage(dataUrl, 'PNG', 0, 0, format[0], format[1]);
  }
  pdf.save(fileName);
}

export async function exportSinglePageToPng(node, fileName = 'page.png') {
  await waitReady();
  const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  a.click();
}
