// قراءة معلومات الصورة من رأس الملف (بدون أي مكتبات خارجية).
// تدعم: PNG / APNG · JPEG · GIF · WebP · BMP · AVIF/HEIC · SVG
import { readFileSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.avif', '.heic', '.svg']);

export function isImagePath(p) {
  return IMAGE_EXT.has(path.extname(p).toLowerCase());
}

export function listImages(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (isImagePath(full)) out.push(full);
    }
  };
  walk(dir);
  return out.sort();
}

// ---------- parser ----------
export function parseImageBuffer(buf) {
  const info = {
    format: null, width: 0, height: 0, bytes: buf.length,
    dpi: null, alpha: null, animated: false, frames: 1,
    depth: null, colorType: null, svg: false
  };
  try {
    if (buf.length < 16) return info;
    const ascii = (from, to) => buf.toString('ascii', from, to);
    const u16 = (o) => buf.readUInt16BE(o);
    const u32 = (o) => buf.readUInt32BE(o);
    const le16 = (o) => buf.readUInt16LE(o);
    const le32 = (o) => buf.readUInt32LE(o);

    // PNG / APNG
    if (buf[0] === 0x89 && ascii(1, 4) === 'PNG') {
      info.format = 'png';
      let off = 8;
      while (off + 8 <= buf.length) {
        const len = u32(off);
        const type = ascii(off + 4, off + 8);
        if (type === 'IHDR') {
          info.width = u32(off + 8);
          info.height = u32(off + 12);
          info.depth = buf[off + 16];
          info.colorType = buf[off + 17];
          info.alpha = info.colorType === 4 || info.colorType === 6;
        } else if (type === 'pHYs' && buf.length >= off + 17) {
          const ppu = u32(off + 8);
          if (buf[off + 16] === 1) info.dpi = Math.round(ppu * 0.0254);
        } else if (type === 'tRNS') {
          info.alpha = true;
        } else if (type === 'acTL') {
          info.animated = true;
          info.frames = u32(off + 8);
        } else if (type === 'iCCP') {
          info.icc = true;
        }
        off += 12 + len;
        if (type === 'IEND') break;
      }
      return info;
    }

    // JPEG
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      info.format = 'jpeg';
      info.alpha = false;
      let off = 2;
      const sof = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
      while (off + 4 < buf.length) {
        if (buf[off] !== 0xff) { off++; continue; }
        const marker = buf[off + 1];
        if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { off += 2; continue; }
        if (marker === 0xd9 || marker === 0xda) break;
        const len = u16(off + 2);
        if (len < 2) break;
        if (sof.has(marker) && off + 9 < buf.length) {
          info.depth = buf[off + 4];
          info.height = u16(off + 5);
          info.width = u16(off + 7);
          info.colorType = buf[off + 9] === 4 ? 'CMYK' : buf[off + 9] === 1 ? 'Gray' : 'YCbCr';
        }
        if (marker === 0xe0 && ascii(off + 4, off + 9) === 'JFIF\0' && off + 15 < buf.length) {
          const unit = buf[off + 11];
          const xd = u16(off + 12);
          if (unit === 1) info.dpi = xd;            // dots per inch
          else if (unit === 2) info.dpi = Math.round(xd * 2.54); // dots per cm
        }
        if (marker === 0xe2 && ascii(off + 4, off + 9) === 'ICC_PRO') info.icc = true;
        off += 2 + len;
      }
      return info;
    }

    // GIF
    if (ascii(0, 6) === 'GIF87a' || ascii(0, 6) === 'GIF89a') {
      info.format = 'gif';
      info.width = le16(6);
      info.height = le16(8);
      info.depth = (buf[10] & 0x07) + 1;
      const hasTrans = buf.includes(Buffer.from([0x21, 0xf9, 0x04])) && (buf[buf.indexOf(Buffer.from([0x21, 0xf9, 0x04])) + 3] & 0x01) === 1;
      info.alpha = hasTrans;
      info.animated = buf.includes(Buffer.from('NETSCAPE2.0', 'ascii'));
      info.frames = 0;
      for (let i = 0; i < buf.length - 1; i++) if (buf[i] === 0x2c) { info.frames++; if (info.frames > 1) break; }
      if (info.frames > 1) info.animated = true;
      return info;
    }

    // WebP
    if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') {
      info.format = 'webp';
      const chunk = ascii(12, 16);
      const p = 20; // payload start
      if (chunk === 'VP8 ') {
        const w = le16(p + 6) & 0x3fff;
        const h = le16(p + 8) & 0x3fff;
        info.width = w; info.height = h; info.alpha = false;
      } else if (chunk === 'VP8L') {
        const b0 = buf[p + 1], b1 = buf[p + 2], b2 = buf[p + 3], b3 = buf[p + 4];
        info.width = 1 + (((b1 & 0x3f) << 8) | b0);
        info.height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        info.alpha = true;
      } else if (chunk === 'VP8X') {
        const flags = buf[p];
        info.alpha = !!(flags & 0x10);
        info.animated = !!(flags & 0x02);
        info.width = 1 + (buf[p + 4] | (buf[p + 5] << 8) | (buf[p + 6] << 16));
        info.height = 1 + (buf[p + 7] | (buf[p + 8] << 8) | (buf[p + 9] << 16));
      }
      return info;
    }

    // BMP
    if (ascii(0, 2) === 'BM') {
      info.format = 'bmp';
      info.width = Math.abs(buf.readInt32LE(18));
      info.height = Math.abs(buf.readInt32LE(22));
      info.depth = le16(28);
      info.alpha = false;
      return info;
    }

    // AVIF / HEIC (ftyp box + ispe)
    if (ascii(4, 8) === 'ftyp') {
      const brand = ascii(8, 12);
      info.format = brand.includes('avif') || brand.includes('avis') ? 'avif' : brand.includes('heic') || brand.includes('heix') ? 'heic' : 'isobmff';
      const i = buf.indexOf(Buffer.from('ispe', 'ascii'));
      if (i > 0 && i + 16 <= buf.length) {
        info.width = u32(i + 8);
        info.height = u32(i + 12);
      }
      return info;
    }

    // SVG
    const head = buf.toString('utf8', 0, Math.min(buf.length, 4096));
    if (!head.includes('<svg')) {
      // maybe BOM/whitespace/comment before <svg>
      const head2 = buf.toString('utf8', 0, Math.min(buf.length, 65536));
      if (!head2.includes('<svg')) return info;
    }
    info.format = 'svg';
    info.svg = true;
    const svgTag = /<svg[^>]*>/i.exec(buf.toString('utf8', 0, Math.min(buf.length, 65536)));
    if (svgTag) {
      const tag = svgTag[0];
      const w = /\bwidth\s*=\s*["']?([\d.]+)/i.exec(tag);
      const h = /\bheight\s*=\s*["']?([\d.]+)/i.exec(tag);
      const vb = /\bviewBox\s*=\s*["']([^"']+)["']/i.exec(tag);
      if (w && h) { info.width = Math.round(parseFloat(w[1])); info.height = Math.round(parseFloat(h[1])); }
      else if (vb) {
        const p = vb[1].trim().split(/[\s,]+/).map(Number);
        if (p.length === 4) { info.width = Math.round(p[2]); info.height = Math.round(p[3]); }
      }
      info.alpha = true;
    }
    return info;
  } catch (e) {
    info.error = String(e && e.message ? e.message : e);
    return info;
  }
}

export function readImageInfo(file) {
  const stat = statSync(file);
  const buf = readFileSync(file);
  const info = parseImageBuffer(buf);
  info.file = file;
  info.fileBytes = stat.size;
  info.bytes = stat.size;
  info.mp = info.width && info.height ? +((info.width * info.height) / 1e6).toFixed(2) : null;
  info.aspect = info.width && info.height ? +(info.width / info.height).toFixed(4) : null;
  return info;
}

// ---------- تقييم الجودة (نصائح عملية للتصدير PDF) ----------
export function imageAdvice(info, opts = {}) {
  const notes = [];
  const push = (severity, message) => notes.push({ severity, message });
  const { renderedW, renderedH, pagePxW, pageMmW } = opts;

  if (!info.width || !info.height) {
    push('error', 'لم أستطع قراءة أبعاد الصورة (تلف في الملف أو صيغة غير مدعومة).');
    return notes;
  }
  if (!info.svg && (info.width < 200 || info.height < 200)) {
    push('warn', `الصورة صغيرة جدًا (${info.width}×${info.height}) — هتبان مشوشة في الطباعة.`);
  }
  if (info.width * info.height > 40e6) {
    push('warn', `أبعاد ضخمة (${info.mp} ميجابكسل) — هتبطّئ التصدير والملف هيكبر.`);
  }
  if (info.bytes > 5e6) push('error', `حجم الملف ${(info.bytes / 1e6).toFixed(1)}MB كبير جدًا — اضغط الصورة قبل الاستخدام.`);
  else if (info.bytes > 2e6) push('warn', `حجم الملف ${(info.bytes / 1e6).toFixed(1)}MB — يفضّل ضغطه (WebP أو JPEG بجودة 80).`);
  if (info.animated) push('warn', 'صورة متحركة (Animated) — التصدير هياخد أول فريم فقط، والأفضل صورة ثابتة.');
  if (info.format === 'gif' && !info.animated) push('warn', 'GIF غير مناسب للطباعة (ألوان محدودة) — استخدم PNG/WebP.');
  if (info.format === 'bmp') push('warn', 'BMP غير مضغوط — استخدم PNG.');
  if (info.svg) push('info', 'SVG: التأكد بصريًا أن التصدير يرسمه صح (html-to-image يعتمد على المتصفح).');

  if (!info.svg && renderedW > 0 && pagePxW > 0 && pageMmW > 0) {
    const printedMm = (renderedW / pagePxW) * pageMmW;
    const dpi = Math.round(info.width / (printedMm / 25.4));
    info.effectiveDpi = dpi;
    info.printedMm = +printedMm.toFixed(1);
    if (dpi < 96) push('error', `الدقة الفعلية ${dpi}DPI عند هذا المقاس — أقل من حد الطباعة المقبول (150).`);
    else if (dpi < 150) push('warn', `الدقة الفعلية ${dpi}DPI — مقبولة للشاشة، ضعيفة للطباعة (المستهدف 200–300).`);
  }

  if (renderedW > 0 && renderedH > 0) {
    const renderedAspect = renderedW / renderedH;
    const naturalAspect = info.width / info.height;
    const dev = Math.abs(renderedAspect - naturalAspect) / naturalAspect;
    if (dev > 0.02) {
      push('warn', `نسبة العرض/الارتفاع اتغيّرت ${(dev * 100).toFixed(1)}% (${renderedW}×${renderedH} معروضة مقابل ${info.width}×${info.height} أصلية) — الصورة مشوّهة.`);
    }
    if (renderedW > info.width * 1.15) {
      push('warn', `الصورة معروضة أكبر من أبعادها الأصلية (${renderedW}px مقابل ${info.width}px) — هتبان مبكسلة.`);
    }
  }

  return notes;
}
