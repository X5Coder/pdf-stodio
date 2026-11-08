// رسالة الصفحة في جملة واحدة: حلل التهديدات وقدّرها، واحسب NPV وIRR، ثم اقرر — فالمخاوف تعني التعديل لا صرف النظر.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { ShieldCheck, TrendingUp, CheckCircle2, AlertOctagon, Info } from 'lucide-react';

const THREATS = [
  { n: '1', t: 'تحليل حساسية زيادة التكاليف الرأسمالية مستقبلًا.' },
  { n: '2', t: 'انخفاض سعر المنتج والتأثير على ربحية المشروع.' },
  { n: '3', t: 'حالة التأخير في تنفيذ المشروع.' }
];

export default function Page14({ pageNo, total }) {
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
            <ShieldCheck size={14} />
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
            تحليل المخاطر والقيمة والقرار النهائي
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80"
            alt="اتخاذ القرار الاستثماري النهائي"
          />
        </div>
      </div>

      <Grid gap={2}>
        {/* بطاقة 8: اتخاذ القرار النهائي */}
        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `3px solid ${c.accent}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <CheckCircle2 size={18} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                <bdi>8)</bdi> اتخاذ القرار النهائي
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              أي مخاوف من إحدى الخطوات السابقة لا يعني صرف النظر عن الفكرة، ولكن ممكن تكون محتاجة (تعديل
              الميزانية - طريقة التنفيذ - إعادة ترتيب الأهداف) - اتخاذ القرار (هل النتائج المستهدفة من
              المشروع تستحق الوقت - الجهد - النقود المطلوبة؟) - (هل تلبي طلباتك وتكمل فيه لـ <bdi>10</bdi>{' '}
              سنوات للأمام).
            </p>
          </div>
        </Col>

        {/* بطاقة القيمة والعائد */}
        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `3px solid ${c.primary}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <TrendingUp size={18} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                القيمة والعائد
              </h2>
            </div>
            <div style={{ fontWeight: 700, color: c.primary, fontSize: fs.compact, marginBlockEnd: 2 }}>
              <bdi>NPV</bdi> صافي القيمة الحالية:
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: 1.35, marginBlockEnd: sp(1) }}>
              يقيس القيمة المضافة للمشروع. = الفرق بين القيمة الحالية للتدفقات النقدية الداخلة (أرباح –
              فوائد) وقيمة التدفقات النقدية الخارجة (التكلفة الأولية المدفوعة)؛ غالبًا يُفضل موجبًا.
            </p>
            <div style={{ fontWeight: 700, color: c.accent, fontSize: fs.compact, marginBlockEnd: 2 }}>
              <bdi>IRR</bdi> معدل العائد الداخلي:
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              يقيس سرعة نمو رأس المال. = معدل الخصم (نقطة التعادل الاستثماري) الذي يجعل <bdi>NPV</bdi>{' '}
              مساويًا للصفر؛ يقارن بتكلفة رأس المال، ويتم اختيار المشروع الذي يحقق أعلى نسبة <bdi>IRR</bdi>.
            </p>
          </div>
        </Col>

        {/* بطاقة 6: تحليل المخاطر */}
        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `3px solid ${c.accent}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <AlertOctagon size={18} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                <bdi>6)</bdi> تحليل المخاطر
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.textMuted || c.text, marginBlockEnd: sp(1) }}>
              دراسة التهديدات المحتملة للمشروع + تقييم درجة خطورتها على المشروع:
            </p>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text }}>
              {THREATS.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: c.accent }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Grid>

      {/* ملحوظة البيانات الموثوقة */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.accent}`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          display: 'flex',
          alignItems: 'flex-start',
          gap: sp(2)
        }}
      >
        <Info size={18} color={c.accent} style={{ flexShrink: 0, marginBlockStart: 2 }} />
        <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
          <strong style={{ color: c.accent }}>ملحوظة:</strong> استخدام الطرق الموثوقة في جمع البيانات
          زي (الاستبيانات - الإحصاءات - الأدوات الرقمية) ونتأكد أن البيانات التي ستقدمه لمتخذ القرار هي بيانات
          حقيقية - ممكن تستعين بأصحاب المصلحة في المشروع وتعليقاتهم (الممولين - فريق العمل - أداة معتمدة من موقع
          مستقل (<bdi>mostaql.com</bdi>)).
        </p>
      </div>
    </Page>
  );
}
