// رسالة الصفحة في جملة واحدة: التشغيل الشهري يحقق فائضًا 140 ألف جنيه قبل الضرائب والإهلاك والتمويل.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Table, DollarSign } from 'lucide-react';

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
          background: c.accent,
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

const ROWS = [
  { label: 'إيرادات البيع', value: '1,560,000' },
  { label: 'تكلفة شراء الجلود', value: '1,200,000' },
  { label: 'التداول والحفظ والنقل', value: '80,000' },
  { label: 'التكاليف الثابتة', value: '140,000' },
  { label: 'إجمالي التكاليف التشغيلية', value: '1,420,000', total: true },
  { label: 'الفائض التشغيلي الشهري', value: '140,000', total: true, highlight: true },
  { label: 'الفائض التشغيلي السنوي', value: '1,680,000', total: true, highlight: true }
];

export default function Page29({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="10"
        title={
          <>
            <bdi>10.</bdi> التكاليف والإيرادات الشهرية
          </>
        }
      />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          <Col span={8}>
            <div
              style={{
                borderRadius: sp(3),
                overflow: 'hidden',
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: sp(3),
                  background: c.brand,
                  color: '#FFFFFF',
                  paddingBlock: sp(2),
                  paddingInline: sp(3),
                  fontSize: fs.small,
                  fontWeight: 700
                }}
              >
                <span>البند</span>
                <span>القيمة (جنيه)</span>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: sp(3),
                    background: r.highlight ? (c.accentBg || 'rgba(184, 123, 30, 0.08)') : (r.total || i % 2 === 1 ? c.surface : (c.card || '#FFFFFF')),
                    borderBlockEnd: `1px solid ${c.borderSubtle || 'rgba(0,0,0,0.05)'}`,
                    paddingBlock: sp(1) * 1.2,
                    paddingInline: sp(3)
                  }}
                >
                  <span
                    style={{
                      fontSize: fs.small,
                      fontWeight: r.total ? 700 : 500,
                      color: r.highlight ? c.accent : (r.total ? c.primary : c.text)
                    }}
                  >
                    {r.label}
                  </span>
                  <span
                    style={{
                      fontSize: fs.small,
                      fontWeight: r.total ? 700 : 600,
                      color: r.highlight ? c.accent : (r.total ? c.primary : c.text),
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    <bdi>{r.value}</bdi>
                  </span>
                </div>
              ))}
            </div>
          </Col>

          <Col span={4}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: 280,
                borderRadius: sp(3),
                overflow: 'hidden',
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80"
                alt="المحاسبة المالية والتكاليف التشغيلية"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(3), insetInlineStart: sp(3), insetInlineEnd: sp(3), color: '#FFFFFF' }}>
                <div style={{ fontSize: fs.caption, fontWeight: 700 }}>هوامش تشغيلية إيجابية</div>
                <div style={{ fontSize: fs.caption, opacity: 0.9 }}>تحقيق فائض شهري مبني على كفاءة الشراء والبيع</div>
              </div>
            </div>
          </Col>
        </Grid>
      </div>

      <div
        style={{
          marginBlockStart: sp(3),
          textAlign: 'center',
          fontSize: fs.small,
          fontWeight: 600,
          color: c.accent,
          lineHeight: lhBody
        }}
      >
        الفائض قبل الضرائب والإهلاك وتكاليف التمويل وأي مصروفات غير مدرجة.
      </div>

      <div style={{ marginBlockStart: sp(1) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
