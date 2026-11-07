// رسالة الصفحة في جملة واحدة: دراسات الجدوى الاقتصادية أهم أدوات متخذ القرار — اثنا عشر أثراً في قائمتين.
// ملاحظة: الترقيم الأصلي يقفز من 7 إلى 9 (لا توجد نقطة 8 في المصدر) — أُبقي كما هو بأمانة.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';

const RIGHT = [
  { n: '1', t: 'تعتبر دراسات الجدوى الاقتصادية من أهم الأدوات التي يستعين بها متخذ القرار الاقتصادي على مستوى المشروع الخاص.' },
  { n: '2', t: 'المساعدة في الوصول إلى أفضل تخصيص ممكن للموارد الاقتصادية.' },
  { n: '3', t: 'توضح العوائد المتوقعة مقارنة بالتكاليف المتوقعة من الاستثمار طوال عمر المشروع الافتراضي.' },
  { n: '4', t: 'تعرض منظومة كاملة عن بيانات المشروع وتحليلها بصورة تساعد المستثمر على اتخاذ القرار الاستثماري المناسب.' },
  { n: '5', t: 'تضع خطة أو برنامجًا لتنفيذ المشروع (مراحل الإعداد والتنفيذ والمتابعة) وتحدد أسلوب إدارة المشروع، وتحقيق التفاعل بين عناصر التشغيل والتمويل والتسويق.' },
  { n: '6', t: 'توضح الاستثمارات المطلوبة للمشروع، كذلك العائد الاستثماري الذي يمكن أن يحققه المشروع.' }
];

const LEFT = [
  { n: '7', t: 'التفكير في طرق وبدائل مختلفة، ومقارنة المشروعات وتبني الأمثل من حيث طاقة الإنتاج والوسائل التقنية ونوعية العمالة.' },
  { n: '9', t: 'تساعد الدراسة المستثمر في معرفة احتياجات المشروع من الموارد المالية وتوقيتها.' },
  { n: '10', t: 'درجة الدقة في دراسة الجدوى تمكن من الاعتماد عليها في فرص نجاح المشروع.' },
  { n: '11', t: 'تشمل الدراسة التعرف على مقدرة المشروع على تحمل نتائج أي متغيرات أو تقلبات في الافتراضات (اختبارات الحساسية).' },
  { n: '12', t: 'تساعد دراسة الجدوى على التعرف على المتغيرات الاقتصادية والسياسية والقانونية المتوقع حدوثها خلال عمر المشروع الافتراضي.' },
  { n: '13', t: 'تجعل دراسة الجدوى تأخذ في الاعتبار جميع العوامل التي يمكن أن تؤثر على أداء المشروع التي تؤثر على اتخاذ...' }
];

function NumberedList({ items, accentStart = false }) {
  const { fs, sp, c, lhBody } = useDS();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
      {items.map((it, idx) => {
        const isHighlight = (idx === 0 && accentStart) || it.n === '11';
        return (
          <div
            key={it.n}
            style={{
              background: isHighlight ? 'rgba(59, 130, 246, 0.08)' : (c.card || '#FFFFFF'),
              border: `1px solid ${isHighlight ? 'rgba(59, 130, 246, 0.25)' : (c.border || 'rgba(0,0,0,0.06)')}`,
              borderRadius: sp(2),
              paddingBlock: sp(1) * 1.5,
              paddingInline: sp(2),
              display: 'flex',
              gap: sp(2),
              alignItems: 'flex-start',
              boxShadow: '0 2px 6px -1px rgba(15, 34, 25, 0.03)'
            }}
          >
            <span
              style={{
                width: sp(4),
                height: sp(4),
                borderRadius: sp(4),
                background: isHighlight ? '#3B82F6' : c.primary,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fs.caption,
                fontWeight: 700,
                flexShrink: 0,
                marginBlockStart: 2,
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              <bdi>{it.n}</bdi>
            </span>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
              {it.t}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function Page04({ pageNo, total }) {
  const { fs, sp, c, lhHeading } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Grid style={{ marginBlockEnd: sp(3), alignItems: 'center' }}>
        <Col span={8}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              fontSize: fs.caption,
              fontWeight: 700,
              color: '#60A5FA',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <TrendingUp size={14} />
            <bdi>02</bdi> | الأساس
          </span>
          <h1
            style={{
              fontSize: fs.title,
              fontWeight: 700,
              color: c.primary,
              lineHeight: lhHeading,
              margin: 0,
              marginBlockStart: sp(1)
            }}
          >
            أهمية دراسات الجدوى الاقتصادية
          </h1>
        </Col>

        {/* بطاقة صورة بيانية توثيقية حقيقية */}
        <Col span={4}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: sp(2),
              background: c.surface,
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              padding: sp(1),
              overflow: 'hidden'
            }}
          >
            <div style={{ width: 80, height: 50, borderRadius: sp(2), overflow: 'hidden', flexShrink: 0 }}>
              <Img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
                alt="رسوم بيانية لتحليل الجدوى الاقتصادية"
              />
            </div>
            <div style={{ fontSize: fs.caption, fontWeight: 600, color: c.primary }}>
              ١٢ أثراً حاسماً لدعم قرارات الاستثمار
            </div>
          </div>
        </Col>
      </Grid>

      <Grid gap={3}>
        <Col span={6}>
          <NumberedList items={RIGHT} />
        </Col>
        <Col span={6}>
          <NumberedList items={LEFT} accentStart />
        </Col>
      </Grid>
    </Page>
  );
}
