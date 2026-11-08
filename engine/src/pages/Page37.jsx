// رسالة الصفحة في جملة واحدة: خمس توصيات تضبط البدء والتحقق والامتثال قبل أي توسع نحو قيمة مستدامة.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Award, CheckCircle2, Sparkles } from 'lucide-react';

const RECS = [
  'البدء بمركز تجميع وفرز وحفظ وتسويق الجلود، دون تصنيع في المرحلة الأولى.',
  'عدم اعتماد الاستثمار قبل التحقق من الكميات والأسعار بعقود أو عروض مكتوبة.',
  'بعد إدخال البيانات المالية، يتم تحديث نموذج التدفقات النقدية وحساب IRR أو NPV.',
  'الالتزام بالتراخيص والاشتراطات البيئية والبيطرية والتجارية السارية.',
  'التوسع إلى التصنيع أو تدوير مخلفات أخرى فقط بعد إثبات الجدوى.'
];

export default function Page37() {
  const { fs, sp, c, series, lhHeading, lhBody } = useDS();

  return (
    <Page tone="brand">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center', marginBlockEnd: sp(3) }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              background: 'rgba(184, 123, 30, 0.25)',
              border: `1px solid ${c.accent}`,
              color: c.accentLight || '#D49A3D',
              fontSize: fs.caption,
              fontWeight: 700,
              paddingBlock: 2,
              paddingInline: sp(3),
              borderRadius: sp(4),
              marginBlockEnd: sp(1)
            }}
          >
            <Sparkles size={14} />
            خريطة الطريق التنفيذية
          </span>
          <h1
            style={{
              fontSize: fs.title,
              fontWeight: 700,
              color: c.accentLight || '#D49A3D',
              lineHeight: lhHeading,
              margin: 0
            }}
          >
            الخلاصة والتوصيات
          </h1>
        </div>

        <Grid gap={4} style={{ flex: 1, alignItems: 'center' }}>
          {/* العمود الأيمن: التوصيات الخمس */}
          <Col span={7}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
              {RECS.map((rec, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: sp(2),
                    paddingBlock: sp(2),
                    paddingInline: sp(3),
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: sp(2)
                  }}
                >
                  <span
                    style={{
                      width: sp(4),
                      height: sp(4),
                      borderRadius: sp(4),
                      background: c.accent,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: fs.caption,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginBlockStart: 2
                    }}
                  >
                    <bdi>{i + 1}</bdi>
                  </span>
                  <p style={{ fontSize: fs.body, color: '#FFFFFF', lineHeight: lhBody, margin: 0 }}>
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </Col>

          {/* العمود الأيسر: صورة حقيقية للمنتجات الجلدية الفاخرة */}
          <Col span={5}>
            <div
              style={{
                position: 'relative',
                borderRadius: sp(3),
                overflow: 'hidden',
                height: '100%',
                minHeight: 340,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)'
              }}
            >
              <Img
                src="https://images.pexels.com/photos/3814573/pexels-photo-3814573.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="حرفي يصنع منتجات جلدية يدوية عالية القيمة"
                style={{ objectPosition: 'center 30%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(21,60,45,0.8) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(3), insetInlineStart: sp(3), insetInlineEnd: sp(3), color: '#FFFFFF' }}>
                <div style={{ fontSize: fs.small, fontWeight: 700 }}>منتجات نهائية ذات قيمة تصديرية</div>
                <div style={{ fontSize: fs.caption, opacity: 0.9 }}>تأصيل سلسلة القيمة من المجزر إلى الأسواق</div>
              </div>
            </div>
          </Col>
        </Grid>

        <div
          style={{
            marginBlockStart: sp(3),
            paddingTop: sp(2),
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontSize: fs.lead,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: lhBody,
              margin: 0
            }}
          >
            إلى قيمة اقتصادية وتنموية مستدامة ... من مورد قابل للتلف
          </p>
        </div>
      </div>
    </Page>
  );
}
