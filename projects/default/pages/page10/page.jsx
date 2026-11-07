// رسالة الصفحة في جملة واحدة: التمويلية تبني الهيكل والتدفقات، والتجارية تقيس الاسترداد والتعادل، والاقتصادية تقيس أثر المجتمع.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Landmark, ArrowLeftRight, Timer, Scale, Globe2, Layers } from 'lucide-react';

const CAPITAL = [
  { n: '1', t: 'رأس المال' },
  { n: '2', t: 'قروض طويلة أو قصيرة الأجل' },
  { n: '3', t: 'أسهم' },
  { n: '4', t: 'سندات' },
  { n: '5', t: 'تمويل من أرباح محتجزة' }
];

const FLOWS = [
  { n: '1', t: 'تدفقات داخلة (الإيرادات)' },
  { n: '2', t: 'تدفقات خارجة (الأصول – الصيانة)' }
];

export default function Page10({ pageNo, total }) {
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
              color: '#3B82F6',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <Layers size={14} />
            <bdi>04</bdi> | محاور الدراسة
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: sp(3), marginBlockStart: sp(1) }}>
            <h1 style={{ fontSize: fs.title, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
              <bdi>4)</bdi> دراسة الجدوى التجارية <span dir="ltr" style={{ fontSize: fs.small, color: '#3B82F6' }}><bdi>(Financial)</bdi></span>
            </h1>
            <h2 style={{ fontSize: fs.h3, fontWeight: 600, color: c.primaryLight, margin: 0 }}>
              <bdi>3)</bdi> دراسة الجدوى التمويلية <span style={{ fontSize: fs.caption, color: c.textMuted || c.text }}>(تكاليف المشروع الاستثمارية والجارية)</span>
            </h2>
          </div>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80"
            alt="التمويل والتحليل المالي"
          />
        </div>
      </div>

      <Grid gap={2}>
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
              <Scale size={16} color={c.primary} />
              <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>نقطة التعادل BCR</h3>
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              تقييم الكفاءة الاستثمارية للمشروع من خلال معادلة = القيمة الحالية للمنافع و التدفقات الداخلة /
              القيمة الحالية للتكاليف و التدفقات الخارجة (تكاليف التشغيل : الإيجار - المواد الخام).
            </p>
          </div>
        </Col>

        <Col span={3}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `3px solid #3B82F6`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <Timer size={16} color='#3B82F6' />
              <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>فترة الاسترداد</h3>
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              = النفقات الاستثمارية الأولية / التدفقات النقدية الداخلة - خلال سنه. مثال: إذا استثمرت{' '}
              <bdi>1,000,000</bdi> جنيه في مشروع، وكان يدر تدفقًا نقديًا صافيًا ثابتًا قدره <bdi>250,000</bdi>{' '}
              جنيه سنويًا، فإن فترة الاسترداد تكون <bdi>4</bdi> سنوات (<bdi>250,000 ÷ 1,000,000</bdi>).
            </p>
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
              <ArrowLeftRight size={16} color={c.primary} />
              <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>التدفقات النقدية</h3>
            </div>
            <p style={{ margin: 0, fontSize: fs.compact, color: c.textMuted || c.text, marginBlockEnd: 4 }}>
              قائمة مُحاسبية تُعد وفقًا للأساس النقدي.
            </p>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text }}>
              {FLOWS.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: c.primary }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
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
              borderTop: `3px solid #3B82F6`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <Landmark size={16} color='#3B82F6' />
              <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>مصادر التمويل</h3>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text }}>
              {CAPITAL.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: '#3B82F6' }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Grid>

      {/* شريط الدراسة الاقتصادية */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid #3B82F6`,
          paddingBlock: sp(2),
          paddingInline: sp(3)
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: 2 }}>
          <Globe2 size={16} color='#3B82F6' />
          <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
            <bdi>5)</bdi> دراسة اقتصادية <span dir="ltr" style={{ color: '#3B82F6' }}><bdi>(Economic Feasibility)</bdi></span>
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
          تقيس أثر المشروع على المجتمع والاقتصاد ككل (العائد الاقتصادي على المجتمع)، وليس فقط أرباح الجهة
          المنفذة (توفير فرص العمل، وخفض الفاقد، وتحسين كفاءة استخدام الموارد، وتقليل تكاليف المخاطر الصحية).
        </p>
      </div>
    </Page>
  );
}
