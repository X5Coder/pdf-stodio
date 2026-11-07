// رسالة الصفحة في جملة واحدة: أربع مراحل من دراسة السوق إلى التشغيل والتوسع بمدد تراجع حسب الترخيص والتمويل.

import { Page, useDS, Img } from '@ds/index.js';
import { Search, FileCheck, Wrench, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

function Band({ n, title }) {
  const { fs, sp, c, dims, lhHeading } = useDS();
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${c.primary} 0%, '#0d281e' 100%)`,
        marginInlineStart: -dims.marginX,
        marginInlineEnd: -dims.marginX,
        marginBlockStart: -dims.marginY,
        paddingInlineStart: dims.marginX,
        paddingInlineEnd: dims.marginX,
        paddingBlock: sp(1.5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: sp(2),
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5) }}>
        <Calendar size={20} color='#3B82F6' />
        <h1 style={{ fontSize: fs.h3, fontWeight: 800, color: c.bg, lineHeight: lhHeading, margin: 0 }}>
          {title}
        </h1>
      </div>
      <span
        style={{
          width: sp(5),
          height: sp(5),
          flexShrink: 0,
          borderRadius: '50%',
          background: `linear-gradient(135deg, '#3B82F6' 0%, '#60A5FA' 100%)`,
          color: c.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fs.small,
          fontWeight: 800
        }}
      >
        <bdi>{n}</bdi>
      </span>
    </div>
  );
}

const PHASES = [
  { rangeLtr: '0-2', name: 'دراسة السوق', desc: 'حصر الكميات، مقابلات العملاء، عروض الأسعار.', icon: Search, step: 'المرحلة 1' },
  { rangeLtr: '2-4', name: 'التأسيس والتراخيص', desc: 'الموقع، التعاقدات، إجراءات الترخيص.', icon: FileCheck, step: 'المرحلة 2' },
  { rangeLtr: '4-6', name: 'التجهيز والتشغيل التجريبي', desc: 'المعدات، النظام الإلكتروني، تدريب العاملين.', icon: Wrench, step: 'المرحلة 3' },
  { rangeLtr: null, range: 'بعد 6 أشهر', name: 'التشغيل والتوسع', desc: 'مراجعة المؤشرات، التوسع عند ثبوت الجدوى.', icon: TrendingUp, step: 'المرحلة 4' }
];

export default function Page40({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band n="15" title="14. الجدول الزمني المقترح" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2), marginBlockStart: sp(2), flex: 1, minHeight: 0 }}>
        {/* خارطة طريق أفقية: 4 مراحل متساوية — أنسب لشريحة 16:9 */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: sp(2), alignItems: 'stretch' }}>
          {PHASES.map((p, idx) => {
            const Icon = p.icon;
            const active = idx === 1;
            return (
              <div key={p.name} style={{ position: 'relative', minWidth: 0 }}>
                {/* خط الوصل الأفقي */}
                {idx < PHASES.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: sp(2) + 14,
                      insetInlineStart: 'calc(50% + 28px)',
                      width: `calc(100% - 56px)`,
                      height: 2,
                      background: c.border,
                      borderRadius: 1,
                      zIndex: 0
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    background: c.card || '#FFFFFF',
                    border: `1px solid ${c.border}`,
                    borderTop: `4px solid ${active ? '#3B82F6' : c.primary}`,
                    borderRadius: sp(2),
                    paddingBlock: sp(2),
                    paddingInline: sp(2),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: sp(1),
                    height: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: active ? '#3B82F6' : c.primary,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    style={{
                      fontSize: fs.caption,
                      fontWeight: 700,
                      color: c.textMuted,
                      background: c.surface,
                      border: `1px solid ${c.border}`,
                      paddingInline: sp(1.5),
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {p.step}
                  </span>
                  <div style={{ fontSize: fs.caption, fontWeight: 800, color: active ? '#3B82F6' : c.primary, fontVariantNumeric: 'tabular-nums' }}>
                    {p.rangeLtr ? <>شهر <bdi dir="ltr">{p.rangeLtr}</bdi></> : p.range}
                  </div>
                  <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.text, lineHeight: lhHeading }}>
                    {p.name}
                  </div>
                  <p style={{ fontSize: fs.caption, color: c.textMuted, lineHeight: lhBody, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* السطر السفلي: صورة بنسبة متوازنة + ملاحظة المراجعة */}
        <div style={{ marginBlockStart: sp(2), display: 'flex', alignItems: 'stretch', gap: sp(2) }}>
          <div
            style={{
              width: 320,
              height: 150,
              flexShrink: 0,
              borderRadius: sp(2),
              overflow: 'hidden',
              border: `1px solid ${c.border}`,
              background: c.surface
            }}
          >
            <Img
              priority
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=640&q=80"
              alt="تقويم يوضح تخطيط الجدول الزمني ومراحل المشروع"
              style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
            />
          </div>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              background: c.surface,
              border: `1px solid ${c.border}`,
              borderInlineStart: `4px solid #3B82F6`,
              borderRadius: sp(2),
              paddingBlock: sp(1.5),
              paddingInline: sp(2),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: sp(1)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5) }}>
              <AlertCircle size={16} color='#3B82F6' style={{ flexShrink: 0 }} />
              <p style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhBody, margin: 0 }}>
                تُراجع المدة وفق إجراءات الترخيص وتوافر الموقع والتمويل والتعاقدات.
              </p>
            </div>
            <div style={{ fontSize: fs.caption, color: c.textMuted, lineHeight: lhBody, textAlign: 'end' }}>
              (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
