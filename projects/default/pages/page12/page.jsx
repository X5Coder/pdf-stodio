// رسالة الصفحة في جملة واحدة: خمسة مؤشرات مالية تحسم جدوى المشروع — القيمة الحالية والعائد الداخلي والاسترداد والمنافع والتعادل.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, useDS, Img } from '@ds/index.js';
import { PDF_CONFIG } from '@/config.js';
import { Calculator, TrendingUp, Zap, Clock, Divide, Target } from 'lucide-react';

const METRICS = [
  {
    code: 'NPV',
    name: 'صافي القيمة الحالية',
    latin: 'Net Present Value',
    desc: 'يقيس القيمة المضافة للمشروع. صافي القيمة الحالية عند سعر الخصم = القيمة الحالية للتدفقات النقدية الداخلة (أرباح - فوائد) - قيمة التدفقات النقدية الخارجة (التكلفة الأولية المدفوعة)؛ غالبًا يُفضّل موجبًا. (مجدي إقتصاديًا).',
    icon: TrendingUp,
    accent: false
  },
  {
    code: 'IRR',
    name: 'معدل العائد الداخلي',
    latin: 'Internal Rate of Return',
    desc: '= معدل الخصم: يقيس سرعة نمو رأس المال. معدل الخصم (نقطة التعادل الاستثماري) الذي يجعل NPV مساويًا للصفر؛ (المنافع = التكاليف) يقارن بتكلفة رأس المال – (أقصى فائدة يمكن يدفعها المشروع) يحقق التعادل بين المنافع والتكاليف.',
    icon: Zap,
    accent: true
  },
  {
    code: 'Payback',
    name: 'فترة الاسترداد',
    latin: null,
    desc: 'المدة اللازمة لاستعادة المشروع تكلفة رأس ماله الأولية (من واقع التدفقات الداخلة) تحسب الوقت دون النظر لقيمة النقود الشرائية عبر الزمن.',
    icon: Clock,
    accent: false
  },
  {
    code: 'BCR',
    name: 'نسبة المنافع إلى التكاليف',
    latin: 'Benefit-Cost Ratio',
    desc: 'يحسب القيمة الزمنية للمال (أداة تقييم الكفاءة الاستثمارية للمشروع) - نسبة المنافع إلى التكاليف عند سعر الخصم = القيمة الحالية للمنافع / القيمة الحالية للتكاليف) المشروع المجدي إقتصادي > 1.',
    icon: Divide,
    accent: true
  },
  {
    code: 'BEP',
    name: 'نقطة التعادل',
    latin: 'Break-even point',
    desc: 'النقطة التي تتساوى عنده الإيرادات والتكاليف (الربح الصافي = صفر) ( = التكاليف الثابتة / التكلفة المتغيرة للوحدة – سعر بيع الوحدة).',
    icon: Target,
    accent: false
  }
];

export default function Page12({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer={false}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: sp(2) }}>
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
            <Calculator size={14} />
            <bdi>05</bdi> | التحليل
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
            المؤشرات المالية: ماذا تقيس؟
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80"
            alt="المعادلات والمؤشرات المالية"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: sp(1) * 1.5 }}>
        {METRICS.map((m) => {
          const IconComp = m.icon;
          const bar = m.accent ? '#3B82F6' : c.primary;
          return (
            <div
              key={m.code}
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderInlineStart: `4px solid ${bar}`,
                boxShadow: '0 2px 6px -1px rgba(15, 34, 25, 0.04)',
                paddingBlock: sp(1) * 1.5,
                paddingInline: sp(3),
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
                  <span
                    style={{
                      background: m.accent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                      color: bar,
                      borderRadius: sp(1),
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconComp size={16} />
                  </span>
                  <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                    <bdi>{m.code}</bdi> | {m.name} {m.latin && <span dir="ltr" style={{ fontSize: fs.caption, color: '#3B82F6' }}><bdi>({m.latin})</bdi></span>}
                  </h2>
                </div>
              </div>
              <p style={{ fontSize: fs.compact, color: c.text, lineHeight: 1.35, margin: 0 }}>
                {m.code === 'BCR' ? (
                  <>
                    يحسب القيمة الزمنية للمال (أداة تقييم الكفاءة الاستثمارية للمشروع) - نسبة المنافع إلى التكاليف عند
                    سعر الخصم = القيمة الحالية للمنافع / القيمة الحالية للتكاليف) المشروع المجدي إقتصادي <bdi>{'> 1'}</bdi>.
                  </>
                ) : (
                  m.desc
                )}
              </p>
            </div>
          );
        })}
      </div>

      <footer
        style={{
          marginTop: 'auto',
          paddingTop: sp(2),
          borderTop: `1px solid ${c.border || c.surface}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: fs.caption,
          color: c.textMuted || c.text,
          opacity: 0.85
        }}
      >
        <span>{PDF_CONFIG.title}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>
          <bdi>
            {pageNo} / {total}
          </bdi>
        </span>
      </footer>
    </Page>
  );
}
