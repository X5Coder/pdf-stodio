// رسالة الصفحة في جملة واحدة: نبدأ بتجميع الجلود لأنه الأبسط والأسرع في اختبار السوق قبل أي توسع.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { CheckCircle2, Layers } from 'lucide-react';

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

export default function Page25({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="4"
        title={
          <>
            <bdi>4.</bdi> لماذا نبدأ بتجميع الجلود؟
          </>
        }
      />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          {/* البديل 1: البديل المقترح */}
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid ${c.primary}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '100%', height: 160, position: 'relative' }}>
                <Img
                  src="https://images.unsplash.com/photo-1745837893977-34f76b11f644?auto=format&fit=crop&w=600&q=80"
                  alt="تجميع وفرز الجلود الأولية"
                  style={{ objectPosition: 'center 38%' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: sp(2),
                    insetInlineStart: sp(2),
                    background: c.primary,
                    color: '#FFFFFF',
                    fontSize: fs.caption,
                    fontWeight: 700,
                    paddingBlock: 2,
                    paddingInline: sp(2),
                    borderRadius: sp(3)
                  }}
                >
                  الخيار المعتمد
                </span>
              </div>
              <div style={{ padding: sp(3), flex: 1, display: 'flex', flexDirection: 'column', gap: sp(1) }}>
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                  البديل المقترح
                </h2>
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                  تشغيل: تجميع وفرز وحفظ وتسويق الجلود. أبسط نسبيًا ويمكن اختبار السوق بعقود توريد.
                </p>
              </div>
            </div>
          </Col>

          {/* البديل 2: تصنيع الشنط والأحذية */}
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid #3B82F6`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '100%', height: 160, position: 'relative' }}>
                <Img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
                  alt="تصنيع الشنط والأحذية الجلدية"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: sp(2),
                    insetInlineStart: sp(2),
                    background: '#3B82F6',
                    color: '#FFFFFF',
                    fontSize: fs.caption,
                    fontWeight: 700,
                    paddingBlock: 2,
                    paddingInline: sp(2),
                    borderRadius: sp(3)
                  }}
                >
                  مرحلة متقدمة
                </span>
              </div>
              <div style={{ padding: sp(3), flex: 1, display: 'flex', flexDirection: 'column', gap: sp(1) }}>
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: '#3B82F6', lineHeight: lhHeading, margin: 0 }}>
                  تصنيع الشنط والأحذية
                </h2>
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                  قيمة مضافة محتملة أعلى، لكن يحتاج إلى جلد مدبوغ ومعدات وعمالة وتسويق.
                </p>
              </div>
            </div>
          </Col>

          {/* البديل 3: تدوير المخلفات المتنوعة */}
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid ${c.primary}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ width: '100%', height: 160, position: 'relative' }}>
                <Img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"
                  alt="تدوير مخلفات المجازر"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: sp(2),
                    insetInlineStart: sp(2),
                    background: 'rgba(21,60,45,0.85)',
                    color: '#FFFFFF',
                    fontSize: fs.caption,
                    fontWeight: 700,
                    paddingBlock: 2,
                    paddingInline: sp(2),
                    borderRadius: sp(3)
                  }}
                >
                  بديل استراتيجي
                </span>
              </div>
              <div style={{ padding: sp(3), flex: 1, display: 'flex', flexDirection: 'column', gap: sp(1) }}>
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                  تدوير المخلفات المتنوعة
                </h2>
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                  أثر بيئي أوسع محتملًا، مع متطلبات فنية وترخيصية وسلامة حيوية أكبر.
                </p>
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
          color: c.text,
          lineHeight: lhBody
        }}
      >
        <strong style={{ color: c.primary }}>التوصية:</strong> تنفيذ المشروع على مراحل، وعدم التوسع قبل التحقق من
        الكميات والسوق والتراخيص.
      </div>

      <div style={{ marginBlockStart: sp(1) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
