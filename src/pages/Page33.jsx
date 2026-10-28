// رسالة الصفحة في جملة واحدة: ستة مؤشرات أولية تلخص اقتصاديات الجلد الواحد قبل حساب صافي الربح.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { DollarSign, Target, TrendingUp, Landmark, Percent, Timer } from 'lucide-react';

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

function MetricCard({ label, value, icon: IconComp, bar }) {
  const { fs, sp, c, lhHeading } = useDS();
  return (
    <div
      style={{
        background: c.card || '#FFFFFF',
        borderRadius: sp(2),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        borderInlineStart: `4px solid ${bar}`,
        boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
        paddingBlock: sp(2),
        paddingInline: sp(2),
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: sp(1.5)
      }}
    >
      <span
        style={{
          width: sp(5),
          height: sp(5),
          borderRadius: sp(1.5),
          background: c.surface,
          color: bar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <IconComp size={18} />
      </span>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: fs.caption, fontWeight: 600, color: c.textMuted || c.text, margin: 0 }}>
          {label}
        </h2>
        <p style={{ fontSize: fs.h3, fontWeight: 700, color: bar, lineHeight: lhHeading, margin: 0, fontVariantNumeric: 'tabular-nums' }}>
          <bdi>{value}</bdi>
        </p>
      </div>
    </div>
  );
}

export default function Page33({ pageNo, total }) {
  const { fs, sp, c, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band n="11" title="المؤشرات المالية الأولية" />

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ marginBlockStart: sp(2) }}>
        <Grid gap={2}>
          <Col span={4}>
            <MetricCard label="هامش المساهمة لكل جلد" value="350 جنيهًا" icon={DollarSign} bar={c.primary} />
          </Col>
          <Col span={4}>
            <MetricCard label="نقطة التعادل التشغيلية" value="400 جلد/شهر" icon={Target} bar={c.accent} />
          </Col>
          <Col span={4}>
            <MetricCard label="الفائض التشغيلي السنوي" value="1.68 مليون جنيه" icon={TrendingUp} bar={c.primary} />
          </Col>
          <Col span={4}>
            <MetricCard label="التمويل المبدئي" value="2.90 مليون جنيه" icon={Landmark} bar={c.accent} />
          </Col>
          <Col span={4}>
            <MetricCard label="نسبة الفائض إلى التمويل" value="57.9% سنويًا" icon={Percent} bar={c.primary} />
          </Col>
          <Col span={4}>
            <MetricCard label="فترة الاسترداد البسيطة" value="1.73 سنة" icon={Timer} bar={c.accent} />
          </Col>
        </Grid>
      </div>
      </div>

      {/* السطر السفلي: صورة بنسبة متوازنة + تنبيه منهجي (لا قص) */}
      <div
        style={{
          marginBlockStart: sp(2),
          display: 'flex',
          alignItems: 'stretch',
          gap: sp(2)
        }}
      >
        <div
          style={{
            width: 300,
            height: 150,
            flexShrink: 0,
            borderRadius: sp(2),
            overflow: 'hidden',
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            background: c.surface
          }}
        >
          <Img
            priority
            src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=640&q=80"
            alt="جداول التحليل المالي والمؤشرات على مكتب"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: c.surface,
            borderRadius: sp(2),
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            borderInlineStart: `4px solid ${c.accent}`,
            paddingBlock: sp(1.5),
            paddingInline: sp(2),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: sp(1)
          }}
        >
          <p style={{ fontSize: fs.small, fontWeight: 600, color: c.primary, lineHeight: lhBody, margin: 0 }}>
            بعد التحقق من السوق والضرائب والتمويل، يلزم إعداد تدفقات نقدية دقيقة وحساب <bdi>NPV</bdi> أو <bdi>IRR</bdi>. هذه مؤشرات أولية لا تمثل صافي الربح أو معدل العائد الداخلي.
          </p>
          <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.75, lineHeight: lhBody, textAlign: 'end' }}>
            (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
          </div>
        </div>
      </div>
    </Page>
  );
}
