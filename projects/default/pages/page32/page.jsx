// رسالة الصفحة في جملة واحدة: الإيرادات الشهرية المتوقعة 1,560,000 جنيه من 800 جلد، مشروطة بإثبات السوق قبل اعتماد النموذج.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Package, TrendingUp, DollarSign, Truck, Calculator } from 'lucide-react';

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

function StatCard({ label, value, icon: IconComp, accent }) {
  const { fs, sp, c, lhHeading } = useDS();
  const bar = accent ? '#3B82F6' : c.primary;
  return (
    <div
      style={{
        background: c.card || '#FFFFFF',
        borderRadius: sp(2),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        borderTop: `4px solid ${bar}`,
        boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
        paddingBlock: sp(2),
        paddingInline: sp(2),
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: sp(1)
      }}
    >
      <span
        style={{
          width: sp(4),
          height: sp(4),
          borderRadius: sp(1.5),
          background: accent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
          color: bar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconComp size={17} />
      </span>
      <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary, lineHeight: lhHeading }}>{label}</div>
      <div
        style={{
          fontSize: fs.h3,
          fontWeight: 700,
          color: bar,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: lhHeading
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Page32({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="9"
        title={
          <>
            <bdi>9.</bdi> افتراضات التشغيل والإيرادات
          </>
        }
      />

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: sp(2) }}>
      <div>
        <Grid gap={2}>
          <Col span={3}>
            <StatCard label="الكمية الشهرية" value={<><bdi>800</bdi> جلد</>} icon={Package} />
          </Col>
          <Col span={3}>
            <StatCard label="متوسط الشراء" accent value={<><bdi>1,500</bdi> جنيه/جلد</>} icon={DollarSign} />
          </Col>
          <Col span={3}>
            <StatCard label="متوسط البيع" value={<><bdi>1,950</bdi> جنيه/جلد</>} icon={TrendingUp} />
          </Col>
          <Col span={3}>
            <StatCard label="تداول وحفظ ونقل" accent value={<><bdi>100</bdi> جنيه/جلد</>} icon={Truck} />
          </Col>
        </Grid>
      </div>

      <div
        style={{
          background: c.brand,
          color: '#FFFFFF',
          borderRadius: sp(2),
          paddingBlock: sp(2),
          paddingInline: sp(3),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sp(2),
          boxShadow: '0 8px 24px -4px rgba(15, 34, 25, 0.25)'
        }}
      >
        <Calculator size={22} color={'#60A5FA' || '#60A5FA'} />
        <span
          style={{
            fontSize: fs.small,
            fontWeight: 700,
            lineHeight: lhHeading
          }}
        >
          الإيرادات الشهرية المتوقعة = <bdi>800 × 1,950 = 1,560,000</bdi> جنيه.
        </span>
      </div>
      </div>

      <div
        style={{
          marginBlockStart: sp(2),
          display: 'flex',
          alignItems: 'stretch',
          gap: sp(2)
        }}
      >
        {/* صورة جانبية بنسبة متوازنة بدل الشريط البانورامي المقصوص */}
        <div
          style={{
            width: 320,
            height: 140,
            flexShrink: 0,
            borderRadius: sp(2),
            overflow: 'hidden',
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            background: c.surface
          }}
        >
          <Img
            priority
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=640&q=80"
            alt="شاحنات وحاويات سلاسل التوريد والنقل"
            style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: c.surface,
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
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
          <div style={{ fontSize: fs.small, fontWeight: 700, color: '#3B82F6', lineHeight: lhHeading }}>
            يجب إثبات الكميات والأسعار بعروض سوقية وعقود مبدئية قبل اعتماد النموذج.
          </div>
          <Disclaimer />
        </div>
      </div>
    </Page>
  );
}
