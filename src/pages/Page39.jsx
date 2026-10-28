// رسالة الصفحة في جملة واحدة: دراسة الجدوى أداة لاكتشاف أفضل قرار بالأدلة ومعادلتها حوكمة ومخاطر ونموذج وبدائل وبيانات.

import { Page, useDS, Img } from '../ds/index.js';
import { Quote, Sparkles, CheckCircle2, Shield, BarChart3, Layers, FileSearch } from 'lucide-react';

const FORMULA = [
  { text: 'حوكمة', icon: Shield },
  { text: 'إدارة مخاطر', icon: FileSearch },
  { text: 'نموذج مالي قابل للاختبار', icon: BarChart3 },
  { text: 'بدائل واضحة', icon: Layers },
  { text: 'بيانات موثوقة', icon: CheckCircle2 }
];

export default function Page39() {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page tone="brand">
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: sp(2) }}>
        {/* الترويسة */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp(1) }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              paddingBlock: sp(0.5),
              paddingInline: sp(2),
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${c.accent}40`
            }}
          >
            <Sparkles size={14} color={c.accent} />
            <span style={{ fontSize: fs.caption, fontWeight: 700, color: c.accent }}>
              الرؤية والقرار الاستثماري
            </span>
          </div>
          <h1 style={{ fontSize: fs.h2, fontWeight: 800, color: c.bg, lineHeight: lhHeading, margin: 0 }}>
            الخلاصة
          </h1>
        </div>

        {/* المحتوى: عبارة + معادلة يمين، صورة متوازنة يسار */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '7fr 5fr',
            gap: sp(2.5),
            alignItems: 'stretch',
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${c.accent}35`,
            borderRadius: sp(3),
            padding: sp(2.5)
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2), minWidth: 0, justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: sp(2), alignItems: 'flex-start' }}>
              <div
                style={{
                  width: sp(5),
                  height: sp(5),
                  borderRadius: sp(1.5),
                  background: `${c.accent}25`,
                  border: `1px solid ${c.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Quote size={18} color={c.accent} />
              </div>
              <p style={{ fontSize: fs.small, fontWeight: 700, color: c.bg, lineHeight: 1.6, margin: 0 }}>
                دراسة الجدوى ليست وثيقة لإثبات أن الفكرة جيدة؛ بل أداة لاكتشاف أفضل قرار ممكن بناءً على الأدلة.
              </p>
            </div>

            <div aria-hidden="true" style={{ height: 1, background: `linear-gradient(to right, transparent, ${c.accent}60, transparent)` }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: sp(1) }}>
              {FORMULA.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: sp(1),
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: sp(1.5),
                        paddingBlock: sp(1),
                        paddingInline: sp(1.5),
                        fontSize: fs.caption,
                        fontWeight: 600,
                        color: c.bg,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Icon size={13} color={c.accent} />
                      {item.text}
                    </span>
                    {idx < FORMULA.length - 1 && (
                      <span style={{ color: c.accent, fontWeight: 700, fontSize: fs.caption }}>+</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: sp(1.5),
                background: `linear-gradient(135deg, ${c.accent}30, ${c.accent}15)`,
                border: `1.5px solid ${c.accent}`,
                borderRadius: sp(2),
                paddingBlock: sp(1.5),
                paddingInline: sp(2)
              }}
            >
              <span style={{ fontSize: fs.small, fontWeight: 800, color: c.accent }}>=</span>
              <span style={{ fontSize: fs.small, fontWeight: 800, color: c.bg }}>قرار استثماري قوي.</span>
            </div>
          </div>

          {/* صورة بنسبة 4/3 متوازنة — بدون قص بانورامي */}
          <div
            style={{
              position: 'relative',
              borderRadius: sp(2),
              overflow: 'hidden',
              border: `1px solid ${c.accent}40`,
              background: 'rgba(255,255,255,0.06)',
              minHeight: 0
            }}
          >
            <Img
              priority
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=80"
              alt="بيئة عمل استثمارية وتنفيذية راقية"
              style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
            />
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 45%, ${c.primary}CC 100%)` }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: sp(1.5),
                insetInlineStart: sp(1.5),
                insetInlineEnd: sp(1.5),
                display: 'flex',
                alignItems: 'center',
                gap: sp(1),
                paddingBlock: sp(1),
                paddingInline: sp(1.5),
                borderRadius: sp(1.5),
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <CheckCircle2 size={14} color={c.accent} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: fs.caption, color: c.bg, fontWeight: 600 }}>
                حوكمة القرارات الاستثمارية المستندة للأدلة
              </span>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: fs.caption, fontWeight: 600, color: c.bg, opacity: 0.85, lineHeight: lhBody, margin: 0 }}>
          حوكمة + إدارة مخاطر + نموذج مالي قابل للاختبار + بدائل واضحة + بيانات موثوقة = قرار استثماري قوي.
        </p>
      </div>
    </Page>
  );
}
