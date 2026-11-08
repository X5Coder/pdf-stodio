// فحوصات داخل الصفحة (تعمل جوه المتصفح) — ترجع بيانات خام + ملاحظات مصنّفة.
// تُستدعى عبر page.evaluate(PAGE_AUDIT, cfg)

export function PAGE_AUDIT(cfg = {}) {
  const TOL = cfg.tolerance ?? 1;
  const textsCap = 900;
  const d = document;
  const out = { viewport: {}, doc: [], pages: [], images: [] };

  const sel = (el) => {
    if (!el || el.nodeType !== 1) return '';
    if (el === d.body) return 'body';
    const parts = [];
    let cur = el;
    let depth = 0;
    while (cur && cur.nodeType === 1 && depth < 7) {
      if (cur.id) { parts.unshift('#' + cur.id); break; }
      let name = cur.tagName.toLowerCase();
      const cls = typeof cur.className === 'string' ? cur.className.trim() : (cur.className && cur.className.baseVal) || '';
      if (cls) name += '.' + cls.split(/\s+/).filter(Boolean).slice(0, 2).join('.');
      parts.unshift(name);
      cur = cur.parentElement;
      depth++;
    }
    return parts.join(' > ');
  };

  const rectObj = (r) => ({ x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) });
  const parseColor = (s) => {
    if (!s) return null;
    const m = /rgba?\(([^)]+)\)/.exec(s);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const blend = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  });

  const bgOf = (el, pageEl) => {
    let cur = el;
    let opacity = 1;
    while (cur && cur.nodeType === 1) {
      const cs = getComputedStyle(cur);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null; // خلفية صورة/تدرّج = غير معروفة
      const c = parseColor(cs.backgroundColor);
      if (c && c.a > 0.05) {
        const bg = c.a >= 1 ? c : blend(c, { r: 255, g: 255, b: 255 });
        return opacity < 0.99 ? blend({ ...bg, a: opacity }, { r: 255, g: 255, b: 255 }) : bg;
      }
      opacity *= parseFloat(cs.opacity || '1');
      if (cur === pageEl) break;
      cur = cur.parentElement;
    }
    return { r: 255, g: 255, b: 255 };
  };

  // ---------- viewport ----------
  const de = d.documentElement;
  out.viewport = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    dpr: +(+window.devicePixelRatio).toFixed(2),
    screenW: window.screen.width,
    screenH: window.screen.height,
    availW: window.screen.availWidth,
    availH: window.screen.availHeight,
    visualScale: window.visualViewport ? +window.visualViewport.scale.toFixed(3) : null,
    docScrollW: de.scrollWidth,
    docClientW: de.clientWidth,
    docScrollH: de.scrollHeight,
    hScroll: de.scrollWidth > de.clientWidth + 1,
    vScroll: de.scrollHeight > window.innerHeight + 1,
    title: d.title,
  };

  const pages = Array.from(d.querySelectorAll('.pdf-page'));
  out.pageCount = pages.length;
  const seenIds = new Map();
  const allTextRects = [];

  pages.forEach((page, index) => {
    const pRect = page.getBoundingClientRect();
    const pcs = getComputedStyle(page);
    // الصفحة قد تكون مصغّرة بـ transform داخل المعاينة — نقيس بالمقاس التصميمي (layout px)
    const layoutW = Math.round(page.offsetWidth || pRect.width);
    const layoutH = Math.round(page.offsetHeight || pRect.height);
    const scale = pRect.width > 0 ? layoutW / pRect.width : 1;
    const p = {
      index: index + 1,
      id: page.id || null,
      dataPage: page.getAttribute('data-page'),
      rect: {
        x: +pRect.x.toFixed(1), y: +pRect.y.toFixed(1),
        w: layoutW, h: layoutH,
        screenW: +pRect.width.toFixed(1), screenH: +pRect.height.toFixed(1),
        scale: +scale.toFixed(3),
      },
      dir: pcs.direction,
      lang: page.getAttribute('lang') || d.documentElement.getAttribute('lang') || null,
      overflowStyle: { x: pcs.overflowX, y: pcs.overflowY },
      scroll: { w: page.scrollWidth, h: page.scrollHeight, cw: page.clientWidth, ch: page.clientHeight },
      expected: cfg.expected || null,
      findings: [],
      images: [],
      chars: 0,
      fonts: [],
      textNodes: 0,
    };
    const add = (id, severity, title, message, items) => {
      p.findings.push({ id, severity, title, message, items: (items || []).slice(0, 8) });
    };

    // 1) مقاس الصفحة
    if (cfg.expected) {
      const dw = Math.abs(layoutW - cfg.expected.w);
      const dh = Math.abs(layoutH - cfg.expected.h);
      if (dw > 1.5 || dh > 1.5) {
        add('PAGE_SIZE', dh > 3 ? 'error' : 'warn', 'مقاس الصفحة مختلف عن الـ preset',
          `المقاس الفعلي ${layoutW}×${layoutH}px والمتوقع ${cfg.expected.w}×${cfg.expected.h}px.`,
          [{ selector: sel(page), detail: `فرق: ${dw.toFixed(1)}px أفقي / ${dh.toFixed(1)}px رأسي` }]);
      }
    }

    // 2) تجاوز المحتوى لحدود الصفحة + 3) قصّ داخلي + 8) مخاطر التصدير
    const all = Array.from(page.querySelectorAll('*')).slice(0, 4000);
    const over = [];
    const clipped = [];
    const hazards = { fixed: [], anim: [], transition: [], filter: [], blend: [], willChange: [], bigShadow: [] };
    const fontsSet = new Set();
    let maxBottom = 0, maxLeft = 0, maxRight = 0, maxTop = 0;

    for (const el of all) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const viewportPinned = cs.position === 'fixed' || cs.position === 'sticky';
      if (!viewportPinned && r.width > 0 && r.height > 0) {
        const oL = (pRect.left - r.left) * scale;
        const oR = (r.right - pRect.right) * scale;
        const oT = (pRect.top - r.top) * scale;
        const oB = (r.bottom - pRect.bottom) * scale;
        if (oB > maxBottom) maxBottom = oB;
        if (oL > maxLeft) maxLeft = oL;
        if (oR > maxRight) maxRight = oR;
        if (oT > maxTop) maxTop = oT;
        if (oB > TOL || oL > TOL || oR > TOL || oT > TOL) {
          const worst = Math.max(oB, oL, oR, oT);
          if (over.length < 40) {
            over.push({
              selector: sel(el),
              tag: el.tagName.toLowerCase(),
              text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 70),
              sides: { left: +Math.max(0, oL).toFixed(1), right: +Math.max(0, oR).toFixed(1), top: +Math.max(0, oT).toFixed(1), bottom: +Math.max(0, oB).toFixed(1) },
              worst: +worst.toFixed(1),
            });
          }
        }
      }
      const ox = cs.overflowX, oy = cs.overflowY;
      if ((ox !== 'visible' || oy !== 'visible') && el !== page) {
        const cw = el.clientWidth, ch = el.clientHeight;
        if ((ox !== 'visible' && el.scrollWidth > cw + 1) || (oy !== 'visible' && el.scrollHeight > ch + 1)) {
          if (clipped.length < 20) {
            clipped.push({
              selector: sel(el),
              axes: { x: el.scrollWidth - cw, y: el.scrollHeight - ch },
              overflow: `${ox}/${oy}`,
              text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
            });
          }
        }
      }
      if (cs.position === 'fixed' || cs.position === 'sticky') hazards.fixed.push(sel(el));
      if (cs.animationName && cs.animationName !== 'none') hazards.anim.push(sel(el));
      if (cs.transitionProperty && cs.transitionDuration && cs.transitionDuration !== '0s') hazards.transition.push(sel(el));
      if ((cs.filter && cs.filter !== 'none') || (cs.backdropFilter && cs.backdropFilter !== 'none')) hazards.filter.push(sel(el));
      if (cs.mixBlendMode && cs.mixBlendMode !== 'normal') hazards.blend.push(sel(el));
      if (cs.willChange && cs.willChange !== 'auto' && cs.willChange !== 'initial') hazards.willChange.push(sel(el));
      if (cs.boxShadow && cs.boxShadow !== 'none' && el.getBoundingClientRect().height > pRect.height * 0.4) hazards.bigShadow.push(sel(el));
      const hover = cs.fontFamily || '';
      hover.split(',').forEach((f) => {
        const name = f.trim().replace(/^['"]|['"]$/g, '');
        if (name && !/^(inherit|initial|unset|sans-serif|serif|monospace|system-ui|Arial|Tahoma|Helvetica)$/i.test(name)) fontsSet.add(name);
      });
    }

    p.overflow = { maxBottom: +maxBottom.toFixed(1), maxLeft: +maxLeft.toFixed(1), maxRight: +maxRight.toFixed(1), maxTop: +maxTop.toFixed(1) };
    if (over.length) {
      over.sort((a, b) => b.worst - a.worst);
      const worst = over[0].worst;
      add('OVERFLOW', worst > 2 ? 'error' : 'warn', 'محتوى خارج حدود الصفحة (هيتقص في الـ PDF)',
        `${over.length} عنصر خارج إطار الصفحة${over.length >= 40 ? ' (أو أكتر)' : ''} — أقصى تجاوز ${worst}px.`,
        over.slice(0, 8).map((o) => ({ selector: o.selector, detail: `تجاوز ${JSON.stringify(o.sides)} • "${o.text}"` })));
    }
    const pScrollY = page.scrollHeight - page.clientHeight;
    const pScrollX = page.scrollWidth - page.clientWidth;
    if (pScrollY > 2 || pScrollX > 2) {
      add('PAGE_CLIPPED', 'error', 'الصفحة نفسها بتقصّ محتوى (overflow: hidden)',
        `المحتوى أطول/أعرض من الصفحة: رأسي +${pScrollY}px، أفقي +${pScrollX}px — لازم تصغّر المحتوى أو توزّعه على صفحة تانية.`,
        []);
    }
    if (clipped.length) {
      add('INNER_CLIP', 'warn', 'عناصر جوّه الصفحة بتقصّ محتواها',
        `${clipped.length} حاوية فيها محتوى مخفي (scroll أكبر من المساحة الظاهرة).`,
        clipped.slice(0, 6).map((c) => ({ selector: c.selector, detail: `زيادة ${JSON.stringify(c.axes)}px • overflow ${c.overflow}` })));
    }

    // 4) الصور
    Array.from(page.querySelectorAll('img')).forEach((img, i) => {
      const r = img.getBoundingClientRect();
      const abs = img.currentSrc || img.src;
      const rec = {
        page: index + 1,
        index: i + 1,
        src: abs,
        alt: img.getAttribute('alt'),
        complete: img.complete,
        naturalW: img.naturalWidth,
        naturalH: img.naturalHeight,
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
        layoutW: img.offsetWidth || Math.round(r.width * scale),
        layoutH: img.offsetHeight || Math.round(r.height * scale),
        broken: img.complete && img.naturalWidth === 0,
      };
      p.images.push(rec);
      out.images.push(rec);
      if (rec.broken) add('IMG_BROKEN', 'error', 'صورة مكسورة أو مسارها غلط', abs, [{ selector: sel(img), detail: 'naturalWidth = 0' }]);
      if (!img.getAttribute('alt') && cfg.requireAlt !== false) {
        add('IMG_ALT', 'warn', 'صورة بدون نص بديل (alt)', abs, [{ selector: sel(img) }]);
      }
      if (/^https?:/i.test(abs) && !abs.startsWith(location.origin)) {
        add('IMG_EXTERNAL', 'warn', 'صورة من رابط خارجي (بتقطع أوفلاين)', abs, [{ selector: sel(img) }]);
      }
    });

    // 5) نصوص: أحجام، تداخل، تباين
    const walker = d.createTreeWalker(page, NodeFilter.SHOW_TEXT);
    let tn;
    const textRects = [];
    const sizes = [];
    const fontSetEl = new Set();
    while ((tn = walker.nextNode())) {
      const val = tn.nodeValue;
      if (!val || !val.trim()) continue;
      const el = tn.parentElement;
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
      p.chars += val.trim().length;
      p.textNodes++;
      sizes.push(parseFloat(cs.fontSize));
      fontSetEl.add(el);
      if (textRects.length < textsCap) {
        const range = d.createRange();
        range.selectNodeContents(tn);
        for (const r of range.getClientRects()) {
          if (r.width > 2 && r.height > 2) {
            textRects.push({ el, text: val.trim().slice(0, 60), rect: { x: r.x, y: r.y, w: r.width, h: r.height } });
          }
        }
      }
    }
    p.fonts = Array.from(fontSetEl).map((el) => getComputedStyle(el).fontFamily).filter(Boolean).slice(0, 12);
    p.fontSize = sizes.length ? { min: +Math.min(...sizes).toFixed(2), max: +Math.max(...sizes).toFixed(2), avg: +(sizes.reduce((a, b) => a + b, 0) / sizes.length).toFixed(2) } : null;
    if (sizes.length && Math.min(...sizes) < 8) {
      add('FONT_TINY', 'warn', 'خط أصغر من 8px', 'هيبقى غير مقروء في الطباعة.', [{ selector: '', detail: `أصغر خط ${Math.min(...sizes)}px` }]);
    }

    // تداخل نصوص
    const overlaps = [];
    for (let i = 0; i < textRects.length && overlaps.length < 8; i++) {
      const A = textRects[i];
      for (let j = i + 1; j < textRects.length; j++) {
        const B = textRects[j];
        if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
        const ix = Math.max(0, Math.min(A.rect.x + A.rect.w, B.rect.x + B.rect.w) - Math.max(A.rect.x, B.rect.x));
        const iy = Math.max(0, Math.min(A.rect.y + A.rect.h, B.rect.y + B.rect.h) - Math.max(A.rect.y, B.rect.y));
        if (ix * iy < 16) continue;
        const minH = Math.min(A.rect.h, B.rect.h);
        if (iy / minH < 0.4) continue;
        overlaps.push({ a: sel(A.el), b: sel(B.el), area: +(ix * iy).toFixed(1), textA: A.text, textB: B.text });
        if (overlaps.length >= 8) break;
      }
    }
    if (overlaps.length) {
      add('TEXT_OVERLAP', 'error', 'نصوص متراكبة فوق بعضها',
        `${overlaps.length} حالة تداخل بين نصوص مختلفة — المحتوى هيطلع غير مقروء.`,
        overlaps.map((o) => ({ selector: `${o.a}  ×  ${o.b}`, detail: `مساحة التداخل ${o.area}px² • "${o.textA}" / "${o.textB}"` })));
    }

    // تباين الألوان
    const lowContrast = [];
    const els = Array.from(fontSetEl).slice(0, 400);
    for (const el of els) {
      const cs = getComputedStyle(el);
      const fg = parseColor(cs.color);
      if (!fg) continue;
      const bg = bgOf(el, page);
      if (!bg) continue;
      const op = parseFloat(cs.opacity || '1');
      const eff = blend({ ...fg, a: fg.a * op }, bg);
      const cr = ratio(eff, bg);
      const size = parseFloat(cs.fontSize);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const need = large ? 3 : 4.5;
      if (cr < need) {
        lowContrast.push({
          selector: sel(el),
          ratio: +cr.toFixed(2),
          need,
          color: cs.color,
          bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
          text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
        });
      }
    }
    if (lowContrast.length) {
      lowContrast.sort((a, b) => a.ratio - b.ratio);
      const worst = lowContrast[0].ratio;
      add('CONTRAST', worst < 2.5 ? 'error' : 'warn', 'تباين لون النص ضعيف',
        `${lowContrast.length} عنصر نصي بنسبة تباين أقل من المطلوب (WCAG).`,
        lowContrast.slice(0, 6).map((c) => ({ selector: c.selector, detail: `تباين ${c.ratio}:1 (المطلوب ${c.need}:1) • "${c.text}"` })));
    }

    // 6) عناصر تفاعلية داخل صفحة PDF (التصدير صورة → مش هتشتغل)
    const links = page.querySelectorAll('a[href]');
    if (links.length) {
      add('LINKS_IN_PAGE', 'warn', 'روابط داخل الصفحة (هتبقى غير قابلة للنقر في PDF)',
        `${links.length} رابط — التصدير يحوّل الصفحة لصورة، فالروابط تفقد وظيفتها.`,
        Array.from(links).slice(0, 5).map((a) => ({ selector: sel(a), detail: a.getAttribute('href') || '' })));
    }

    // 7) مخاطر التصدير
    if (hazards.fixed.length) add('CSS_FIXED', 'warn', 'عناصر fixed/sticky داخل الصفحة', 'قد تظهر في مكان مختلف عند التصدير.', hazards.fixed.map((s) => ({ selector: s })));
    if (hazards.anim.length) add('CSS_ANIM', 'warn', 'أنيميشن داخل الصفحة', 'التصدير يلتقط لحظة واحدة فقط — ثبّت الحالة النهائية.', hazards.anim.map((s) => ({ selector: s })));
    if (hazards.filter.length) add('CSS_FILTER', 'info', 'فلاتر/backdrop-filter مستخدمة', 'قد تبطّئ التصدير أو تختلف نتيجة الرسم.', hazards.filter.map((s) => ({ selector: s })));
    if (hazards.blend.length) add('CSS_BLEND', 'info', 'mix-blend-mode مستخدم', 'قد يختلف في التصدير (raster).', hazards.blend.map((s) => ({ selector: s })));
    if (hazards.bigShadow.length) add('CSS_SHADOW', 'info', 'ظل كبير على عنصر ضخم', 'يزوّد حجم/زمن التصدير.', hazards.bigShadow.map((s) => ({ selector: s })));

    // 8) صفحة فاضية
    if (p.chars < 20 && p.images.length === 0) {
      add('PAGE_EMPTY', 'error', 'الصفحة فاضية تقريبًا', 'مفيش نص ولا صور — تأكد إن المحتوى اتبني فعلاً.', []);
    }

    // 9) duplicate ids / dir
    page.querySelectorAll('[id]').forEach((el) => {
      const id = el.id;
      if (seenIds.has(id)) {
        add('DUP_ID', 'warn', 'id مكرر داخل الصفحة', `#${id} مستخدم أكتر من مرة.`, [{ selector: sel(el) }]);
      } else seenIds.set(id, true);
    });
    if (cfg.expectDir && p.dir !== cfg.expectDir) {
      add('DIR', 'warn', 'اتجاه الصفحة مختلف عن المطلوب', `الفعلي "${p.dir}" والمتوقع "${cfg.expectDir}".`, []);
    }

    out.pages.push(p);
  });

  // فحوصات على مستوى المستند
  const docIds = new Map();
  d.querySelectorAll('[id]').forEach((el) => {
    if (!el.closest('.pdf-page')) return;
    docIds.set(el.id, (docIds.get(el.id) || 0) + 1);
  });

  if (!pages.length) {
    out.doc.push({ id: 'NO_PAGES', severity: 'error', title: 'مفيش صفحات', message: 'لم أجد أي عنصر .pdf-page في الصفحة المفتوحة — تأكد إن الرابط صح وإن الصفحة اتحمّلت.', items: [] });
  }
  if (out.viewport.hScroll) {
    out.doc.push({ id: 'DOC_HSCROLL', severity: 'warn', title: 'تمرير أفقي في الشاشة', message: `عرض المستند ${out.viewport.docScrollW}px أكبر من عرض الشاشة ${out.viewport.docClientW}px.`, items: [] });
  }
  if (out.viewport.visualScale && out.viewport.visualScale !== 1) {
    out.doc.push({ id: 'ZOOM', severity: 'info', title: 'المتصفح مكبّر/مصغّر', message: `visualViewport.scale = ${out.viewport.visualScale} — القياسات متأثرة بالزوم.`, items: [] });
  }
  return out;
}
