// رسالة الصفحة في جملة واحدة: كل مشروع حساس لأربع صدمات — التكاليف والتأخير والأسعار والإنتاج — فاختبرها قبل القرار.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { ShieldAlert, TrendingDown, Clock, DollarSign, Factory } from 'lucide-react';

const AREAS = [
  {
    n: '1',
    title: 'حساسية المشروع لزيادة التكاليف',
    icon: DollarSign,
    accent: false,
    body: 'يجب أن يتم اختبار حساسية أي مشروع في حالة تجاوز التكاليف. فالمشروعات تميل إلى الحساسية الشديدة بالنسبة لزيادة التكاليف (خاصة تكاليف التأسيس أو التكاليف الاستثمارية) لأن معظم تلك التكاليف تنفق في وقت مبكر في المشروع ويكون لها وزن كبير في عملية الخصم. ويمكن أن تحول الزيادة في التكاليف المشروع من مجدي إلى غير مجدي. ولذا يجب أن يتوصل القائم بجدوى المشروع إلى أي مدى يتحمل المشروع زيادة التكاليف. وهذه إشارة هامة لمتخذي القرارات.'
  },
  {
    n: '2',
    title: 'حساسية المشروع لتأخير فترة التنفيذ',
    icon: Clock,
    accent: true,
    body: 'يؤثر التأخير في التنفيذ أو تأخير تسليم المعدات على مقاييس جدوى المشروع. ومن ثم فإن إجراء اختبار حساسية المشروع للتأخير في التنفيذ هام جدًا في دراسة الجدوى الاقتصادية.'
  },
  {
    n: '3',
    title: 'حساسية المشروع لانخفاض أسعار منتج المشروع',
    icon: TrendingDown,
    accent: false,
    body: 'كثيرًا ما تتغير الأسعار عن الأسعار المتوقعة عند تقييم جدوى المشروع. وبالتالي تؤثر على قيمة عوائد المشروع. ولمعظم المشاريع حساسية مختلفة لانخفاض أسعار بيع منتجاتها. ولذا فإن القائم بدراسة الجدوى الاقتصادية يضع عددًا من الافتراضات البديلة حول الأسعار المستقبلية لمنتجات المشروع، مثلًا في حالة انخفاض الأسعار 10% أو 20% وهكذا، وتحديد تأثير ذلك على مقاييس جدوى المشروع.'
  },
  {
    n: '4',
    title: 'حساسية المشروع لانخفاض الإنتاج',
    icon: Factory,
    accent: true,
    body: 'يواجه أي مشروع خلال عمره الإنتاجي عوامل كثيرة تؤدي إلى انخفاض الإنتاج، تأخير إمدادات المواد الخام تؤدي إلى انخفاض الطاقة الإنتاجية، وعدم القدرة على تسويق كل الناتج أو انخفاض الأسعار تؤدي إلى انخفاض الإنتاج، وظروف جوية مختلفة تواجه المشروع الزراعي تؤدي إلى انخفاض الإنتاج.'
  }
];

export default function Page13({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: sp(2) }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              fontSize: fs.caption,
              fontWeight: 700,
              color: c.accent,
              background: c.accentBg || 'rgba(184, 123, 30, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <ShieldAlert size={14} />
            <bdi>06</bdi> | المخاطر
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
            تحليل الحساسية للمشروعات
          </h1>
          <p style={{ fontSize: fs.compact, color: c.textMuted || c.text, margin: 0, marginBlockStart: 2 }}>
            إن جميع المشروعات ينبغي أن تخضع لإجراء تحليل الحساسية، ولمعظم المشاريع هناك حساسية للتغير في أربع مجالات رئيسية:
          </p>
        </div>

        <div style={{ width: 80, height: 48, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
            alt="سلاسل الإمداد ومخاطر التشغيل والإنتاج"
          />
        </div>
      </div>

      <Grid gap={2}>
        {AREAS.map((a) => {
          const IconComp = a.icon;
          const bar = a.accent ? c.accent : c.primary;
          return (
            <Col key={a.n} span={6}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(2),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderTop: `3px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(2),
                  paddingInline: sp(3),
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
                  <span
                    style={{
                      width: sp(4),
                      height: sp(4),
                      borderRadius: sp(4),
                      background: a.accent ? (c.accentBg || 'rgba(184, 123, 30, 0.12)') : c.surface,
                      color: bar,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={16} />
                  </span>
                  <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                    <bdi>{a.n}.</bdi> {a.title}
                  </h2>
                </div>
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: 1.35, margin: 0 }}>
                  {a.body}
                </p>
              </div>
            </Col>
          );
        })}
      </Grid>
    </Page>
  );
}
