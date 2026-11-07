// رسالة الصفحة في جملة واحدة: الفكرة أربع خطوات من الاستلام إلى التسويق لتحقيق أربعة أهداف من العائد إلى الاقتصاد الدائري.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Target, CheckCircle2 } from 'lucide-react';

function Band({ n, title }) {
  const { fs, sp, c, dims, lhHeading } = useDS();
  return (
    <div
      style={{
        background: c.brand,
        marginInlineStart: -dims.marginX,
        marginInlineEnd: -dims.marginX,
        marginBlockStart: -dims.marginY,
        paddingInlineStart: dims.marginX,
        paddingInlineEnd: dims.marginX,
        paddingBlock: sp(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: sp(3),
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <h1 style={{ fontSize: fs.h2, fontWeight: 700, color: '#FFFFFF', lineHeight: lhHeading, margin: 0 }}>{title}</h1>
      <span
        style={{
          width: sp(5),
          height: sp(5),
          flexShrink: 0,
          borderRadius: sp(5),
          background: '#3B82F6',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fs.h3,
          fontWeight: 700
        }}
      >
        <bdi>{n}</bdi>
      </span>
    </div>
  );
}

function Disclaimer() {
  const { fs, c, lhBody } = useDS();
  return (
    <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.75, lineHeight: lhBody, textAlign: 'end' }}>
      (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
    </div>
  );
}

const STEPS = [
  { t: 'استلام', d: 'من مجازر مرخصة.' },
  { t: 'وزن وفرز', d: 'حسب النوع والجودة.' },
  { t: 'حفظ', d: 'وفق أسلوب مناسب.' },
  { t: 'تسويق', d: 'توريد بعقود واضحة.' }
];

const GOALS = [
  'تحقيق عائد من مورد قابل للتلف إذا أسيء حفظه.',
  'تحسين جودة الجلود ورفع موثوقية التوريد.',
  'خلق فرص عمل وتطوير بيانات دقيقة عن الكميات.',
  'تقليل الفاقد ودعم الاقتصاد الدائري.'
];

export default function Page28({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="3"
        title={
          <>
            <bdi>3.</bdi> فكرة المشروع والأهداف
          </>
        }
      />

      {/* الخطوات الأربع */}
      <div style={{ display: 'flex', gap: sp(2), marginBlockStart: sp(3) }}>
        {STEPS.map((s, i) => {
          const isAccent = i % 2 === 1;
          const bg = isAccent ? '#3B82F6' : c.primary;
          return (
            <div
              key={s.t}
              style={{
                flex: 1,
                minWidth: 0,
                background: bg,
                color: '#FFFFFF',
                borderRadius: sp(2),
                paddingBlock: sp(2),
                paddingInline: sp(2),
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
              }}
            >
              <span
                style={{
                  fontSize: fs.caption,
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: sp(4),
                  paddingInline: sp(2),
                  paddingBlock: 2
                }}
              >
                <bdi>{i + 1}</bdi>
              </span>
              <span style={{ fontSize: fs.small, fontWeight: 700 }}>{s.t}</span>
              <span style={{ fontSize: fs.caption, opacity: 0.9 }}>{s.d}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          {/* الأهداف الرئيسية */}
          <Col span={7}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderInlineStart: `4px solid ${c.primary}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(2) }}>
                <Target size={20} color={c.primary} />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                  الأهداف الرئيسية
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
                {GOALS.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: sp(2), alignItems: 'center', fontSize: fs.small, color: c.text, lineHeight: lhBody }}>
                    <CheckCircle2 size={16} color='#3B82F6' style={{ flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* صورة الثروة الحيوانية والاقتصاد الدائري */}
          <Col span={5}>
            <div
              style={{
                position: 'relative',
                borderRadius: sp(3),
                overflow: 'hidden',
                height: '100%',
                minHeight: 180,
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80"
                alt="الموارد الحيوانية والاستدامة البيئية"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(2), insetInlineStart: sp(3), color: '#FFFFFF', fontSize: fs.caption, fontWeight: 600 }}>
                استغلال الموارد وتطوير الاقتصاد الدائري
              </div>
            </div>
          </Col>
        </Grid>
      </div>

      <div style={{ marginBlockStart: sp(2) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
