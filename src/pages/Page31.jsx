// رسالة الصفحة في جملة واحدة: التمويل المبدئي 2.9 مليون جنيه (1.5 ثابت + 1.4 عامل) بتقديرات تعليمية تُراجع لاحقًا.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Landmark, Coins } from 'lucide-react';

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
  { label: 'تجهيز الموقع والمخزن', value: '600,000' },
  { label: 'معدات المناولة والوزن والفرز', value: '350,000' },
  { label: 'تجهيزات الحفظ والسلامة', value: '300,000' },
  { label: 'نظام إلكتروني وأثاث وتجهيزات', value: '150,000' },
  { label: 'تأسيس واحتياطي مبدئي', value: '100,000' },
  { label: 'إجمالي الاستثمار الثابت', value: '1,500,000', total: true },
  { label: 'رأس المال العامل المفترض', value: '1,400,000' },
  { label: 'إجمالي التمويل المبدئي', value: '2,900,000', total: true, highlight: true }
];

export default function Page31({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="8"
        title={
          <>
            <bdi>8.</bdi> التكاليف الاستثمارية التقديرية
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
                <span>التكلفة التقديرية (جنيه)</span>
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
                    paddingBlock: sp(1) * 1.1,
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
                minHeight: 400,
                borderRadius: sp(3),
                overflow: 'hidden',
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80"
              alt="أعمال التركيبات والمعدات الاستثمارية"
              style={{ objectPosition: 'center 40%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(3), insetInlineStart: sp(3), insetInlineEnd: sp(3), color: '#FFFFFF' }}>
                <div style={{ fontSize: fs.caption, fontWeight: 700 }}>أصول رأسمالية ورأس مال عامل</div>
                <div style={{ fontSize: fs.caption, opacity: 0.9 }}>توازن بين الاستثمار الثابت والسيولة التشغيلية</div>
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
        تقديرات تعليمية أولية وليست عروض أسعار؛ تُراجع بعد تحديد المحافظة والطاقة والموقع.
      </div>

      <div style={{ marginBlockStart: sp(1) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
