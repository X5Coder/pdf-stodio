import React from 'react';
import { useDS } from './useDS.js';

// حاوية الصفحة بمقاس الـ PDF الحقيقي بالضبط (قواعد p1/p2/p3/e4).
export function Page({ tone = 'paper', footer = false, pageNo, total, children, id, bleed = false, padding }) {
  const { dims, c, fs, sp, font, lhBody, dir, title } = useDS();
  const isBrand = tone === 'brand';
  const bg = isBrand ? c.brand : c.bg;
  const fg = isBrand ? '#FFFFFF' : c.text;
  const noPad = bleed || padding === false || padding === 0;
  const px = noPad ? 0 : dims.marginX;
  const py = noPad ? 0 : dims.marginY;
  const pb = noPad ? 0 : (footer ? sp(3) : dims.marginY);

  return (
    <section
      id={id}
      data-page={pageNo}
      className="pdf-page ds-nobreak"
      dir={dir || 'rtl'}
      style={{
        width: dims.w,
        height: dims.h,
        minWidth: dims.w,
        minHeight: dims.h,
        maxWidth: dims.w,
        maxHeight: dims.h,
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: bg,
        color: fg,
        fontFamily: font,
        lineHeight: lhBody,
        paddingInlineStart: px,
        paddingInlineEnd: px,
        paddingBlockStart: py,
        paddingBlockEnd: pb,
        display: 'flex',
        flexDirection: 'column',
        breakAfter: 'page',
        breakInside: 'avoid',
        pageBreakAfter: 'always',
        textAlign: 'start'
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>
      {footer && (
        <footer
          style={{
            marginTop: sp(4),
            paddingTop: sp(2),
            borderTop: `1px solid ${isBrand ? '#FFFFFF55' : c.surface}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: fs.caption,
            opacity: 0.85
          }}
        >
          <span>{title}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            <bdi>
              {pageNo} / {total}
            </bdi>
          </span>
        </footer>
      )}
    </section>
  );
}

// ---------- قوالب جاهزة (قاعدة w1) ----------

export function CoverPage({ title, subtitle, meta, children }) {
  const { fs, sp, lhHeading } = useDS();
  return (
    <Page tone="brand">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'start' }}>
        <h1 style={{ fontSize: fs.display, fontWeight: 700, lineHeight: lhHeading, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: fs.lead, marginBlockStart: sp(4), marginBlockEnd: 0, opacity: 0.9 }}>{subtitle}</p>}
        {meta && <p style={{ fontSize: fs.small, marginBlockStart: sp(5), marginBlockEnd: 0, opacity: 0.75 }}>{meta}</p>}
        {children}
      </div>
    </Page>
  );
}

export function SectionPage({ eyebrow, title, children }) {
  const { fs, sp, c, lhHeading } = useDS();
  return (
    <Page tone="brand">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'start' }}>
        {eyebrow && <div style={{ fontSize: fs.small, fontWeight: 600, color: '#FFFFFF', opacity: 0.8, marginBottom: sp(3) }}>{eyebrow}</div>}
        <h1 style={{ fontSize: fs.title, fontWeight: 700, lineHeight: lhHeading, margin: 0 }}>{title}</h1>
        <div style={{ width: 64, height: 3, background: '#FFFFFF', opacity: 0.5, marginBlockStart: sp(4) }} />
        {children}
      </div>
    </Page>
  );
}

export function ContentPage({ eyebrow, title, lead, footer = true, pageNo, total, children }) {
  const { fs, sp, c, lhHeading } = useDS();
  return (
    <Page footer={footer} pageNo={pageNo} total={total}>
      {eyebrow && <div style={{ fontSize: fs.small, fontWeight: 600, color: c.accent, marginBottom: sp(2) }}>{eyebrow}</div>}
      {title && (
        <h1 style={{ fontSize: fs.title, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0, maxWidth: '72ch' }}>{title}</h1>
      )}
      {lead && <p style={{ fontSize: fs.lead, color: c.text, opacity: 0.8, marginBlockStart: sp(3), marginBlockEnd: 0, maxWidth: '72ch' }}>{lead}</p>}
      <div style={{ marginBlockStart: sp(5) }}>{children}</div>
    </Page>
  );
}

export function TwoColumnPage({ eyebrow, title, lead, left, right, footer = true, pageNo, total }) {
  const { sp } = useDS();
  return (
    <ContentPage eyebrow={eyebrow} title={title} lead={lead} footer={footer} pageNo={pageNo} total={total}>
      <Grid>
        <Col span={6}>{left}</Col>
        <Col span={6}>{right}</Col>
      </Grid>
    </ContentPage>
  );
}

export function ClosingPage({ title, subtitle }) {
  const { fs, sp, lhHeading } = useDS();
  return (
    <Page tone="brand">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'start' }}>
        <h1 style={{ fontSize: fs.title, fontWeight: 700, lineHeight: lhHeading, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: fs.lead, marginBlockStart: sp(4), opacity: 0.9 }}>{subtitle}</p>}
      </div>
    </Page>
  );
}

// ---------- شبكة 12 عمود (قاعدة g1) ----------

export function Grid({ children, gap = 4, style }) {
  const { sp } = useDS();
  const cols = React.Children.toArray(children);
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: sp(gap), ...style }}>{cols}</div>;
}

export function Col({ span = 6, children }) {
  return <div style={{ gridColumn: `span ${span} / span ${span}`, minWidth: 0 }}>{children}</div>;
}

// ---------- مكوّنات المحتوى ----------

export function List({ items = [] }) {
  const { fs, sp, c } = useDS();
  return (
    <ul style={{ margin: 0, paddingInlineStart: sp(4), display: 'flex', flexDirection: 'column', gap: sp(2) }}>
      {items.map((it, i) => (
        <li key={i} style={{ fontSize: fs.body, lineHeight: 1.6, color: c.text }}>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Stat({ value, label }) {
  const { fs, sp, c } = useDS();
  return (
    <div style={{ textAlign: 'start' }}>
      <div style={{ fontSize: fs.h2, fontWeight: 700, color: c.primary, fontVariantNumeric: 'tabular-nums' }}>
        <bdi>{value}</bdi>
      </div>
      <div style={{ fontSize: fs.small, color: c.text, opacity: 0.8, marginTop: sp(1) }}>{label}</div>
    </div>
  );
}

export function StatRow({ children }) {
  const { sp } = useDS();
  return <div style={{ display: 'flex', gap: sp(6), flexWrap: 'wrap' }}>{children}</div>;
}

export function Callout({ title, children }) {
  const { fs, sp, c } = useDS();
  return (
    <div
      style={{
        background: c.surface,
        borderInlineStart: `3px solid ${c.accent}`,
        padding: sp(4),
        display: 'flex',
        flexDirection: 'column',
        gap: sp(2)
      }}
    >
      {title && <div style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary }}>{title}</div>}
      <div style={{ fontSize: fs.body, color: c.text }}>{children}</div>
    </div>
  );
}

export function Tag({ children }) {
  const { fs, sp, c } = useDS();
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: fs.caption,
        fontWeight: 600,
        color: c.accent,
        background: c.surface,
        paddingBlock: sp(1),
        paddingInline: sp(2)
      }}
    >
      {children}
    </span>
  );
}

// صورة بقواعد 05: alt إلزامي + width/height أو aspect-ratio + loading و fetchpriority
// ملاحظة: بصيغة lowercase لأن React 18 لا يعرف الخاصية بصيغة camelCase ويحذر منها.
export function Img({ priority = false, alt = '', style, ...rest }) {
  return (
    <img
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : 'auto'}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style
      }}
      {...rest}
    />
  );
}

export function DSImg({ src, alt, caption, ratio = '16 / 9', priority = false, style }) {
  const { fs, sp, c } = useDS();
  return (
    <figure style={{ margin: 0, width: '100%', height: '100%', ...style }}>
      <div
        style={{
          width: '100%',
          aspectRatio: ratio,
          borderRadius: sp(3),
          overflow: 'hidden',
          background: c.surface,
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          boxShadow: '0 4px 16px -2px rgba(15, 34, 25, 0.06)'
        }}
      >
        <Img src={src} alt={alt} priority={priority} />
      </div>
      {caption && <figcaption style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.8, marginTop: sp(2) }}>{caption}</figcaption>}
    </figure>
  );
}

// بطاقة صورة فائقة الرقي مع إطار خفيف وظل ناعم
export function PhotoCard({ src, alt, caption, badge, ratio = '16 / 10', priority = false, style, children }) {
  const { fs, sp, c } = useDS();
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: sp(3),
        overflow: 'hidden',
        background: c.surface,
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        boxShadow: '0 8px 24px -4px rgba(15, 34, 25, 0.08)',
        ...style
      }}
    >
      <Img src={src} alt={alt} priority={priority} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15,34,25,0.75) 100%)',
          pointerEvents: 'none'
        }}
      />
      {badge && (
        <div style={{ position: 'absolute', top: sp(3), insetInlineStart: sp(3), zIndex: 2 }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              color: c.primary,
              fontSize: fs.caption,
              fontWeight: 700,
              paddingBlock: sp(1),
              paddingInline: sp(3),
              borderRadius: sp(5),
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
          >
            {badge}
          </span>
        </div>
      )}
      {(caption || children) && (
        <div style={{ position: 'absolute', bottom: sp(3), insetInlineStart: sp(3), insetInlineEnd: sp(3), zIndex: 2 }}>
          {caption && <p style={{ fontSize: fs.caption, color: '#FFFFFF', margin: 0, fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{caption}</p>}
          {children}
        </div>
      )}
    </div>
  );
}

// بطاقة تصميم فاخرة موحدة لجميع الصفحات
export function PremiumCard({
  title,
  subtitle,
  badge,
  icon,
  accent = false,
  accentTop = false,
  glass = false,
  style,
  children
}) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();
  const accentColor = accent ? c.accent : c.primary;

  return (
    <div
      style={{
        background: glass ? 'rgba(255, 255, 255, 0.85)' : (c.card || '#FFFFFF'),
        backdropFilter: glass ? 'blur(10px)' : undefined,
        borderRadius: sp(3),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.07)'}`,
        borderInlineStart: accentTop ? undefined : `${sp(1)}px solid ${accentColor}`,
        borderTop: accentTop ? `${sp(1)}px solid ${accentColor}` : undefined,
        boxShadow: '0 4px 16px -2px rgba(15, 34, 25, 0.05)',
        paddingBlock: sp(3),
        paddingInline: sp(4),
        display: 'flex',
        flexDirection: 'column',
        gap: sp(2),
        height: '100%',
        boxSizing: 'border-box',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ...style
      }}
    >
      {(title || icon || badge) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: sp(2), flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
            {icon && <span style={{ color: accentColor, display: 'flex', alignItems: 'center' }}>{icon}</span>}
            {title && (
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                {title}
              </h2>
            )}
          </div>
          {badge && (
            <span
              style={{
                fontSize: fs.caption,
                fontWeight: 600,
                color: c.accent,
                background: c.accentBg || 'rgba(184, 123, 30, 0.1)',
                paddingBlock: 2,
                paddingInline: sp(2),
                borderRadius: sp(4)
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      {subtitle && <p style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.85, margin: 0 }}>{subtitle}</p>}
      <div style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, flex: 1 }}>{children}</div>
    </div>
  );
}

// شارة أنيقة
export function Badge({ children, variant = 'default', style }) {
  const { fs, sp, c } = useDS();
  const isAccent = variant === 'accent';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sp(1),
        fontSize: fs.caption,
        fontWeight: 600,
        color: isAccent ? c.accent : c.primary,
        background: isAccent ? (c.accentBg || 'rgba(184, 123, 30, 0.1)') : (c.surface),
        border: `1px solid ${isAccent ? (c.borderAccent || 'rgba(184, 123, 30, 0.2)') : (c.border || 'rgba(0,0,0,0.08)')}`,
        paddingBlock: sp(1) / 2,
        paddingInline: sp(3),
        borderRadius: sp(5),
        ...style
      }}
    >
      {children}
    </span>
  );
}
