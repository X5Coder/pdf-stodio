// رسالة الصفحة في جملة واحدة: ثمانية أخطاء متكررة — من تضخيم الإيرادات إلى تجاهل التراخيص — هي ما يُضعف دراسة الجدوى فتجنبها.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const ERRORS = [
  'تضخيم الطلب أو الإيرادات دون دليل مستقل.',
  'نسيان تكاليف ما قبل التشغيل، والصيانة، ورأس المال العامل، والإحلال.',
  'استخدام أسعار قديمة أو عروض غير قابلة للمقارنة.',
  'اعتبار فترة الاسترداد وحدها دليلًا كافيًا على الجدوى.',
  'إهمال البدائل أو افتراض أن المشروع يجب أن يُنفَّذ مهما كانت النتيجة.',
  'عدم اختبار التأخير وتجاوز التكلفة وتغير الأسعار وسعر الصرف.',
  'إخفاء الافتراضات أو عدم توثيق مصدر البيانات.',
  'تجاهل التراخيص والأثر البيئي والاجتماعي ومخاطر التشغيل.'
];

export default function Page20({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: sp(3) }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              fontSize: fs.caption,
              fontWeight: 700,
              color: '#3B82F6',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <AlertTriangle size={14} />
            <bdi>11</bdi> | ضمان الجودة
          </span>
          <h1
            style={{
              fontSize: fs.h2,
              fontWeight: 700,
              color: c.primary,
              lineHeight: lhHeading,
              margin: 0,
              marginBlockStart: sp(1)
            }}
          >
            أخطاء شائعة تُضعف دراسة الجدوى
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80"
            alt="مراجعة وتدقيق الأخطاء في دراسات الجدوى"
          />
        </div>
      </div>

      <Grid gap={3}>
        {ERRORS.map((t, i) => {
          const isAccent = i % 2 === 0;
          const bar = isAccent ? '#3B82F6' : c.primary;
          return (
            <Col key={t} span={6}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(2),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderInlineStart: `4px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(2),
                  paddingInline: sp(3),
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  gap: sp(2),
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    fontSize: fs.caption,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: bar,
                    borderRadius: sp(4),
                    width: sp(4),
                    height: sp(4),
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  <bdi>{i + 1}</bdi>
                </span>
                <p style={{ fontSize: fs.small, color: c.text, lineHeight: lhBody, margin: 0 }}>
                  {t}
                </p>
              </div>
            </Col>
          );
        })}
      </Grid>
    </Page>
  );
}
