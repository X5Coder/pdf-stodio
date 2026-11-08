// رسالة الصفحة في جملة واحدة: دراسة الجدوى التسويقية تحسم المنتج والفئة والمنافسة والسوق — ثم تقرر الاستكمال أو التوقف.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { ShoppingCart, Users, UserCheck, LineChart, CheckCircle2, TrendingUp } from 'lucide-react';

const PRODUCTS = [
  'دراسة الطلب من المنتج النهائي (الطلب على الجلود مشتق من الطلب على الأحذية و الشنط).',
  'اختبار تجريبي لدراسة مستوى الطلب (توقع حجم الطلب + الكمية).',
  'التنبؤ بحجم واتجاه المبيعات - مدى تحريك الأسعار (مرونة طلب المنتج).',
  'نوع السلعة (أساسية – كمالية).',
  'السلعة النهائية أم وسيطة.'
];

const AUDIENCE = [
  'نوع الفئة المستهدفة (الجنس – العدد – متوسط الدخل).',
  'آراء المستهلكين أو طريقة دلفي (آراء الخبراء).',
  'أذواق المستهلكين والأشكال وأحجام المنتج.'
];

const RIVALS = [
  'نوع المنافسة (احتكارية – منافسة كاملة).',
  'عددهم – مراكزهم التنافسية – الخصائص المميزة لكل منهم.'
];

const MARKET = [
  'جمع البيانات الأولية + الثانوية.',
  'متغيرات السوق (حجمه واتساعه) – قنوات التسويق – البدائل المتاحة.',
  'القيم المجتمعية – القيم البيئية – التصاريح – الضرائب – الرسوم.',
  'فرق العملة، والأسعار الأساسية، ومعدل الخصم – نوع السوق (استهلاكي – سلعة وسيطة – سوق لسلع رأسمالية).'
];

const WHY = [
  { n: '1', t: 'تحديد حجم إنتاج المشروع بناءً على التنبؤ بحجم الطلب والمبيعات لناتج المشروع.' },
  { n: '2', t: 'السعر المتوقع لمنتجات المشروع.' },
  { n: '3', t: 'المواصفات المفضلة في السلعة التي سينتجها المشروع.' },
  { n: '4', t: 'تقرير ما إذا كانت دراسة الجدوى تستكمل أو تتوقف.' }
];

export default function Page07({ pageNo, total }) {
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
            <bdi>04</bdi> | محاور الدراسة
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
            <bdi>1)</bdi> دراسة الجدوى التسويقية
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
          <div dir="ltr" style={{ textAlign: 'end', fontSize: fs.small, fontWeight: 700, color: c.accent }}>
            <div><bdi>Market Feasibility</bdi></div>
            <div style={{ fontSize: fs.caption, color: c.primaryLight, fontWeight: 600 }}><bdi>SWOT analysis</bdi></div>
          </div>
          <div style={{ width: 64, height: 40, borderRadius: sp(1), overflow: 'hidden' }}>
            <Img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
              alt="لوحات تحليل البيانات وأبحاث السوق"
            />
          </div>
        </div>
      </div>

      <Grid gap={2}>
        <Col span={3}>
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
              <ShoppingCart size={16} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>المنتجات / الخدمات</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {PRODUCTS.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </Col>

        <Col span={3}>
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
              <Users size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>الفئة المستهدفة</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {AUDIENCE.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </Col>

        <Col span={3}>
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
              <UserCheck size={16} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>المنافسين</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {RIVALS.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </Col>

        <Col span={3}>
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
              <LineChart size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>تحليل السوق</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {MARKET.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Grid>

      {/* شريط أهمية دراسة الجدوى التسويقية */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.accent}`,
          paddingBlock: sp(2),
          paddingInline: sp(3)
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
          <TrendingUp size={16} color={c.accent} />
          <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
            أهمية دراسة الجدوى التسويقية
          </h3>
        </div>
        <Grid gap={2}>
          {WHY.map((w) => (
            <Col key={w.n} span={6}>
              <div style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
                <strong style={{ color: c.accent }}><bdi>{w.n}</bdi>-</strong> {w.t}
              </div>
            </Col>
          ))}
        </Grid>
      </div>
    </Page>
  );
}
