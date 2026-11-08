// رسالة الصفحة في جملة واحدة: دراسة الجدوى الفنية تخطيط داخلي للمشروع — التكلفة وطرق الإنتاج والطاقة والموقع — ثم تقرر الاستكمال أو التوقف.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Wrench, DollarSign, Cpu, Gauge, MapPin, CheckCircle } from 'lucide-react';

const COSTS = [
  'تكاليف تأسيسية (رسوم – ضرائب – مصاريف التأسيس).',
  'تكاليف رأسمالية (الأصول).',
  'تكاليف تشغيلية (أجور – إنارة – خدمات).',
  'تكاليف الدعاية والإعلان.',
  'تكاليف التدريب.'
];

const METHODS = [
  'طريقة كثيفة العمالة.',
  'طريقة كثيفة رأس المال.',
  'طريقة الاعتماد على المكون المعرفي (إعلانات وسائل التواصل الاجتماعي).',
  'التكنولوجيا.',
  'سلاسل الإمداد.',
  'الصيانة والجودة.',
  'الفاقد في الإنتاج.'
];

const CAPACITY = [
  'الطاقة الإنتاجية + الطاقة القصوى.',
  'الموارد المالية المتاحة.',
  'حجم السوق (من البيانات الأولية: الاستقصاء).',
  'الموارد البشرية.',
  'الأصول والمهمات المطلوبة.',
  'مدى توافر المواد الخام ومواصفاتها + الطاقة المحركة للمشروع.'
];

const SITE = [
  'الخصائص الطبيعية والفنية للموقع حسب النشاط.',
  'تكلفة الحصول على الموقع.',
  'عوامل اقتصادية أخرى تفرض التكلفة.'
];

const WHY = [
  { n: '1', t: 'تحديد حجم المشروع.' },
  { n: '2', t: 'اختيار موقع المشروع.' },
  { n: '3', t: 'تحديد تكاليف تأسيس وإنشاء المشروع.' },
  { n: '4', t: 'تحديد الجدول الزمني لتنفيذ المشروع.' },
  { n: '5', t: 'تحديد عمر المشروع.' },
  { n: '6', t: 'تقرير ما إذا كانت دراسة الجدوى تستكمل أو تتوقف.' }
];

export default function Page08({ pageNo, total }) {
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
          <div style={{ display: 'flex', alignItems: 'baseline', gap: sp(2) }}>
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
              <bdi>1)</bdi> دراسة الجدوى الفنية
            </h1>
            <span style={{ fontSize: fs.small, color: c.textMuted || c.text, fontWeight: 600 }}>
              "وهو التخطيط الداخلي للمشروع"
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
          <div dir="ltr" style={{ fontSize: fs.caption, fontWeight: 700, color: c.accent }}>
            <bdi>(Technical & Operational Feasibility)</bdi>
          </div>
          <div style={{ width: 64, height: 40, borderRadius: sp(1), overflow: 'hidden' }}>
            <Img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
              alt="تخطيط فني وتشغيلي للمصانع والآلات"
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
              <DollarSign size={16} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>التكلفة الإجمالية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {COSTS.map((t, idx) => (
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
              <Cpu size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>طرق الإنتاج وعوامله</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {METHODS.map((t, idx) => (
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
              <Gauge size={16} color={c.accent} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>الطاقة الإنتاجية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {CAPACITY.map((t, idx) => (
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
              <MapPin size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>الموقع</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {SITE.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Grid>

      {/* شريط أهمية دراسة الجدوى الفنية */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.primary}`,
          paddingBlock: sp(2),
          paddingInline: sp(3)
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
          <Wrench size={16} color={c.primary} />
          <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
            أهمية دراسة الجدوى الفنية
          </h3>
        </div>
        <Grid gap={2}>
          {WHY.map((w) => (
            <Col key={w.n} span={4}>
              <div style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
                <strong style={{ color: c.primary }}><bdi>{w.n}</bdi>-</strong> {w.t}
              </div>
            </Col>
          ))}
        </Grid>
      </div>
    </Page>
  );
}
