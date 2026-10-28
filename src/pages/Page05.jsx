// رسالة الصفحة في جملة واحدة: تحديد المشروع المناسب للمجتمع يمر بتحديد الفرص ثم المبدئية ثم الكاملة ثم القرار — بمصادر بيانات وقاعدة تفصيل.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Lightbulb, FileSearch, CheckCircle2, Database, AlertCircle, Sparkles } from 'lucide-react';

const CHANCES = [
  { n: '1', t: 'دراسة العرض والطلب' },
  { n: '2', t: 'مقارنة البدائل الرئيسية' },
  { n: '3', t: 'دراسة التشابك بين القطاعات المختلفة' },
  { n: '4', t: 'مصادر أخرى (الفرص الاستثمارية في منطقتك مع توفير خدمة)' }
];

const PRELIM = [
  { n: '1', t: 'مدى الحاجة إلى منتجات المشروع؛ وهذا يتطلب وصف السوق بمعنى تقدير الاستهلاك الحالي واتجاهاته والأسعار السائدة، وأذواق المستهلكين.' },
  { n: '2', t: 'مدى توافر عوامل الإنتاج الأساسية، وهذا يتطلب دراسة للخامات التي سيحتاجها المشروع من حيث مدى توافرها باستمرار وجودتها. كذلك العمالة التي سيعتمد عليها المشروع من حيث مدى كفاءتها ومستويات الأجور.' },
  { n: '3', t: 'تحديد المرحلة أو المراحل التي تحتاج إلى تركيز خاص في الدراسة التفصيلية (السوق - الإنتاج - التمويل).' },
  { n: '4', t: 'تقدير حجم الاستثمار المطلوب وتكلفة التشغيل.' },
  { n: '5', t: 'تقدير الأرباح الصافية المتوقعة من المشروع.' },
  { n: '6', t: 'ملخص للمشاكل التي يمكن أن تواجه المشروع؛ وأنواع المخاطر التي يمكن أن تترتب على إقامته.' }
];

const FULL = [
  'تحليل تسويقي',
  'تحليل فني',
  'تحليل مالي (تمويلي) (اقتصادي)',
  'تحليل قانوني',
  'تحليل تجاري',
  'تحليل بيئي',
  'تحليل مخاطر (اختبار الحساسية)',
  'المتابعة ومؤشرات الأداء'
];

const SOURCES = [
  { n: '1', t: 'المعلومات والبحوث السابقة' },
  { n: '2', t: 'تقارير مندوبي البيع والموزعين' },
  { n: '3', t: 'البيانات والإحصاءات الرسمية' },
  { n: '4', t: 'المصادر الأولية (الميدانية) للبيانات' }
];

export default function Page05({ pageNo, total }) {
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
            <Lightbulb size={14} />
            <bdi>02</bdi> | الأساس
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
            كيف تحدد المشروع الذي يناسب احتياجات المجتمع؟
          </h1>
        </div>

        <div
          style={{
            background: c.surface,
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            borderRadius: sp(2),
            paddingBlock: sp(1),
            paddingInline: sp(2),
            fontSize: fs.caption,
            color: c.textMuted || c.text,
            fontWeight: 600
          }}
        >
          المسار المتسلسل: من استكشاف الفرصة إلى القرار
        </div>
      </div>

      {/* المراحل الأربعة في شبكة 4 بطاقات مرتبة ومتسقة */}
      <Grid gap={2}>
        {/* المرحلة 1: تحديد الفرص */}
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
              <span style={{ color: c.accent, fontWeight: 700, fontSize: fs.caption }}>١.</span>
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>تحديد الفرص الاستثمارية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: sp(1), fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
              {CHANCES.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: c.primary }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        {/* المرحلة 2: الجدوى المبدئية */}
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
              <span style={{ color: c.primary, fontWeight: 700, fontSize: fs.caption }}>٢.</span>
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>دراسة الجدوى المبدئية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {PRELIM.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: c.primary }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        {/* المرحلة 3: دراسة جدوى كاملة */}
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
              <span style={{ color: c.accent, fontWeight: 700, fontSize: fs.caption }}>٣.</span>
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>دراسة جدوى كاملة</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.4 }}>
              {FULL.map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 4, height: 4, borderRadius: 2, background: c.accent, flexShrink: 0 }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* المرحلة 4: التوصيات واتخاذ القرار */}
        <Col span={2}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `3px solid ${c.primary}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <span style={{ color: c.primary, fontWeight: 700, fontSize: fs.caption }}>٤.</span>
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>التوصيات والقرار</h2>
              </div>
              <p style={{ margin: 0, fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
                تحليل البيانات في الخطوات السابقة للتحقق من الأهداف المطلوبة القابلة للتنفيذ.
              </p>
            </div>
            <div style={{ width: '100%', height: 40, borderRadius: sp(1), overflow: 'hidden', marginTop: sp(1) }}>
              <Img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80"
                alt="مراجعة المستندات المالية لاتخاذ القرار الاستثماري"
              />
            </div>
          </div>
        </Col>
      </Grid>

      {/* قسم مصادر البيانات والمعلومات */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          paddingBlock: sp(2),
          paddingInline: sp(3)
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
          <Database size={16} color={c.accent} />
          <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
            مصادر البيانات والمعلومات لدراسة الجدوى:
          </h3>
        </div>
        <Grid gap={2}>
          {SOURCES.map((s) => (
            <Col key={s.n} span={3}>
              <div style={{ fontSize: fs.compact, color: c.text }}>
                <strong style={{ color: c.primary }}><bdi>{s.n}</bdi>-</strong> {s.t}
              </div>
            </Col>
          ))}
        </Grid>
      </div>

      {/* القاعدة الذهبية */}
      <div
        style={{
          marginBlockStart: sp(2),
          background: c.accentBg || 'rgba(184, 123, 30, 0.08)',
          borderInlineStart: `4px solid ${c.accent}`,
          borderRadius: sp(2),
          paddingBlock: sp(1),
          paddingInline: sp(3),
          fontSize: fs.compact,
          fontWeight: 600,
          color: c.primary,
          lineHeight: lhBody
        }}
      >
        <span style={{ color: c.accent, fontWeight: 700 }}>قاعدة مهمة:</span> مستوى التفصيل يتناسب مع حجم الاستثمار وتعقيد المشروع ومخاطره، وليس مع قالب ثابت لكل المشروعات.
      </div>
    </Page>
  );
}
