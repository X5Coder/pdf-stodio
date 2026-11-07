// رسالة الصفحة في جملة واحدة: التشغيل السليم خمسة متطلبات من الموقع إلى السجل الإلكتروني، وقاعدة كل دفعة ثمانية بيانات.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { CheckCircle2, FileCheck2 } from 'lucide-react';

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

const POINTS = [
  'موقع قريب من المجازر وطرق النقل والعملاء.',
  'ميزان مناسب وأدوات فحص وتصنيف ومناولة.',
  'مكان تخزين ملائم وطريقة حفظ معتمدة للجلود.',
  'إجراءات نظافة وسلامة مهنية ومكافحة آفات.',
  'سجل إلكتروني للاستلام والمخزون والمبيعات والمرتجعات.'
];

export default function Page27({ pageNo, total }) {
  const { fs, sp, c, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="6"
        title={
          <>
            <bdi>6.</bdi> الدراسة الفنية والتشغيلية
          </>
        }
      />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          <Col span={7}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: sp(2)
              }}
            >
              {POINTS.map((t, idx) => (
                <div key={t} style={{ display: 'flex', gap: sp(2), alignItems: 'center', fontSize: fs.small, color: c.text, lineHeight: lhBody }}>
                  <span
                    style={{
                      width: sp(4),
                      height: sp(4),
                      borderRadius: sp(4),
                      background: idx % 2 === 0 ? c.primary : '#3B82F6',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: fs.caption,
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    <bdi>{idx + 1}</bdi>
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col span={5}>
            <div
              style={{
                position: 'relative',
                borderRadius: sp(3),
                overflow: 'hidden',
                height: '100%',
                minHeight: 200,
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80"
                alt="التشغيل الفني والمخازن وأدوات الفحص والوزن"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(2), insetInlineStart: sp(3), color: '#FFFFFF', fontSize: fs.caption, fontWeight: 600 }}>
                تجهيزات فنية ومعدات وزن وحفظ متقدمة
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
          textAlign: 'center',
          fontSize: fs.small,
          fontWeight: 700,
          color: c.primary,
          lineHeight: lhBody
        }}
      >
        فاتورة + عميل + طريقة حفظ + درجة جودة + وزن + نوع + تاريخ + مصدر: كل دفعة.
      </div>

      <div style={{ marginBlockStart: sp(2) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
