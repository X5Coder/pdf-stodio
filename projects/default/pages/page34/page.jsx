// رسالة الصفحة في جملة واحدة: هامش المشروع حساس لتغير الأسعار فيلزم تأمين التوريد والمبيعات ومراجعة الأسعار دوريًا.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Sliders, AlertTriangle } from 'lucide-react';

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

function BarRow({ label, value, pct, color, valueColor, isNegative }) {
  const { fs, sp, c, lhBody } = useDS();
  return (
    <div
      style={{
        background: c.card || '#FFFFFF',
        borderRadius: sp(2),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        paddingBlock: sp(1) * 1.5,
        paddingInline: sp(3),
        display: 'flex',
        alignItems: 'center',
        gap: sp(3),
        boxShadow: '0 2px 6px -1px rgba(15, 34, 25, 0.03)'
      }}
    >
      <div style={{ flex: '0 0 32%', textAlign: 'start', fontSize: fs.small, fontWeight: 600, color: c.primary, lineHeight: lhBody }}>
        {label}
      </div>
      <div style={{ flex: 1, background: c.surface, borderRadius: sp(2), overflow: 'hidden', height: sp(3) }}>
        <div
          aria-hidden="true"
          style={{
            width: `${Math.max(5, pct)}%`,
            height: '100%',
            background: color,
            borderRadius: sp(2),
            transition: 'width 0.4s ease'
          }}
        />
      </div>
      <div
        style={{
          flex: '0 0 24%',
          textAlign: 'end',
          fontSize: fs.small,
          fontWeight: 700,
          color: valueColor ?? color,
          lineHeight: lhBody,
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Page34({ pageNo, total }) {
  const { fs, sp, c, series, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band n="12" title="تحليل الحساسية" />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          <Col span={8}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
              <BarRow label="الحالة الأساسية" value={<><bdi dir="ltr">140,000</bdi> جنيه</>} pct={100} color={series[2]} />
              <BarRow label={<>انخفاض سعر البيع <bdi dir="ltr">5%</bdi></>} value={<><bdi dir="ltr">62,000</bdi> جنيه</>} pct={44} color={series[1]} />
              <BarRow label={<>ارتفاع سعر الشراء <bdi dir="ltr">5%</bdi></>} value={<><bdi dir="ltr">80,000</bdi> جنيه</>} pct={57} color={series[0]} />
              <BarRow label={<>انخفاض سعر البيع <bdi dir="ltr">10%</bdi></>} value={<><bdi dir="ltr">-16,000</bdi> جنيه</>} pct={11} color={series[3]} valueColor={series[3]} isNegative />
              <BarRow label={<>ارتفاع سعر الشراء <bdi dir="ltr">10%</bdi></>} value={<><bdi dir="ltr">20,000</bdi> جنيه</>} pct={14} color='#3B82F6' />
            </div>
          </Col>

          <Col span={4}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: 220,
                borderRadius: sp(3),
                overflow: 'hidden',
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80"
                alt="تقلبات الأسعار وتحليل الحساسية المالية"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(3), insetInlineStart: sp(3), insetInlineEnd: sp(3), color: '#FFFFFF' }}>
                <div style={{ fontSize: fs.caption, fontWeight: 700 }}>مرونة وهوامش الأمان</div>
                <div style={{ fontSize: fs.caption, opacity: 0.9 }}>اختبار أثر تقلبات الأسعار على الفائض التشغيلي</div>
              </div>
            </div>
          </Col>
        </Grid>
      </div>

      <div
        style={{
          marginBlockStart: sp(3),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${series[3]}`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          fontSize: fs.small,
          fontWeight: 600,
          color: c.primary,
          lineHeight: lhBody,
          textAlign: 'center'
        }}
      >
        النتيجة: هامش المشروع حساس لتغير الأسعار؛ يلزم تأمين مصادر التوريد والمبيعات ومراجعة الأسعار دوريًا.
      </div>

      <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.75, lineHeight: lhBody, marginBlockStart: sp(1), textAlign: 'end' }}>
        (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
      </div>
    </Page>
  );
}
