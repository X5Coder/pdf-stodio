// رسالة الصفحة في جملة واحدة: الامتثال القانوني شرط سابق للتشغيل وليس بندًا يُستكمل بعده.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

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

const IMPACTS = [
  'تقليل التلف والفاقد في الجلود.',
  'رفع كفاءة استخدام الموارد ودعم الاقتصاد الدائري.',
  'ضبط التخزين والنظافة ومنع التسرب أو التلوث.'
];

const PRE_OP = [
  'تحديد التراخيص المطلوبة حسب الموقع والنشاط.',
  'التحقق من اشتراطات البيئة وإدارة المخلفات.',
  'مراجعة القواعد السارية قبل أي تصدير؛ لا تفترض الدراسة إتاحة تصدير الجلود الخام.'
];

export default function Page36({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band n="14" title="الأثر البيئي والاشتراطات التنظيمية" />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          {/* لوحة الصورة الحقيقية للاستدامة والاقتصاد الدائري */}
          <Col span={4}>
            <div
              style={{
                position: 'relative',
                borderRadius: sp(3),
                overflow: 'hidden',
                height: '100%',
                minHeight: 220,
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
                alt="حماية البيئة والاستدامة للأجيال القادمة"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(21,60,45,0.8) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(2), insetInlineStart: sp(3), color: '#FFFFFF', fontSize: fs.caption, fontWeight: 600 }}>
                استدامة بيئية والتزام تشريعي صارم
              </div>
            </div>
          </Col>

          {/* الأثر المتوقع */}
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid #3B82F6`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(2) }}>
                <Leaf size={18} color='#3B82F6' />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: '#3B82F6', margin: 0 }}>
                  الأثر المتوقع
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
                {IMPACTS.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: sp(1), alignItems: 'flex-start', fontSize: fs.small, color: c.text, lineHeight: lhBody }}>
                    <CheckCircle2 size={16} color='#3B82F6' style={{ flexShrink: 0, marginBlockStart: 2 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* قبل التشغيل */}
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid ${c.primary}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(2) }}>
                <ShieldCheck size={18} color={c.primary} />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>
                  قبل التشغيل
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
                {PRE_OP.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: sp(1), alignItems: 'flex-start', fontSize: fs.small, color: c.text, lineHeight: lhBody }}>
                    <CheckCircle2 size={16} color={c.primary} style={{ flexShrink: 0, marginBlockStart: 2 }} />
                    <span>{t}</span>
                  </div>
                ))}
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
          borderInlineStart: `4px solid #3B82F6`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          fontSize: fs.small,
          fontWeight: 700,
          color: c.primary,
          lineHeight: lhBody,
          textAlign: 'center'
        }}
      >
        الامتثال القانوني شرط سابق للتشغيل، وليس بندًا يُستكمل بعد بدء النشاط.
      </div>

      <div style={{ marginBlockStart: sp(1) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
