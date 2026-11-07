// رسالة الصفحة في جملة واحدة: دراسة الجدوى المتكاملة ثمانية محاور — من السوق حتى الحوكمة — في شبكة واحدة.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Globe, DollarSign, Wrench, ShoppingBag, ShieldAlert, Leaf, Scale, GitBranch, Layers } from 'lucide-react';

const AXES = [
  { title: 'الاقتصادي والاجتماعي', desc: 'المنافع العامة، فرص العمل، العدالة المكانية، القيمة المضافة.', icon: Globe, accent: false },
  { title: 'المالي والتمويلي', desc: 'الاستثمار، التشغيل، الإيرادات، التدفقات النقدية، التمويل.', icon: DollarSign, accent: false },
  { title: 'الفني والتشغيلي', desc: 'الموقع، التكنولوجيا، السعة، التصميم، المدخلات والتشغيل.', icon: Wrench, accent: true },
  { title: 'السوق والتسويق', desc: 'الطلب، العملاء، المنافسون، الأسعار، قنوات الوصول.', icon: ShoppingBag, accent: false },
  { title: 'التنفيذ والحوكمة', desc: 'الجدول الزمني، المشتريات، المسؤوليات، المتابعة والقياس.', icon: GitBranch, accent: false },
  { title: 'المخاطر والحساسية', desc: 'الاحتمالات، الأثر، السيناريوهات، خطط الاستجابة.', icon: ShieldAlert, accent: false },
  { title: 'البيئي والاستدامة', desc: 'المياه والطاقة والانبعاثات والمخلفات والمناخ.', icon: Leaf, accent: true },
  { title: 'القانوني والمؤسسي', desc: 'التراخيص، الأراضي، العقود، الضرائب، الجهات المسؤولة.', icon: Scale, accent: false }
];

export default function Page06({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: sp(3), marginBlockEnd: sp(2) }}>
        <div style={{ minWidth: 0 }}>
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
            <Layers size={14} />
            <bdi>04</bdi> | محاور الدراسة
          </span>
          <h1
            style={{
              fontSize: fs.h3,
              fontWeight: 700,
              color: c.primary,
              lineHeight: lhHeading,
              margin: 0,
              marginBlockStart: sp(1)
            }}
          >
            المحاور الرئيسية لدراسة الجدوى المتكاملة
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
            fontWeight: 600,
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
        >
          منظومة شاملة تضمن تقييم جميع أبعاد المشروع
        </div>
      </div>

      {/* المحاور: تتمدد لتملأ المساحة وتتوسطها — لا فراغ مفاجئ */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid gap={2}>
        {AXES.map((a) => {
          const IconComp = a.icon;
          const bar = a.accent ? '#3B82F6' : c.primary;
          return (
            <Col key={a.title} span={3}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(2),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderInlineStart: `4px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(2),
                  paddingInline: sp(2),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: sp(1),
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5) }}>
                  <span
                    style={{
                      width: sp(4),
                      height: sp(4),
                      borderRadius: sp(1.5),
                      background: a.accent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                      color: bar,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={16} />
                  </span>
                  <h2
                    style={{
                      fontSize: fs.small,
                      fontWeight: 700,
                      color: c.primary,
                      lineHeight: lhHeading,
                      margin: 0
                    }}
                  >
                    {a.title}
                  </h2>
                </div>
                <p style={{ fontSize: fs.caption, margin: 0, color: c.textMuted || c.text, opacity: 0.9, lineHeight: lhBody }}>
                  {a.desc}
                </p>
              </div>
            </Col>
          );
        })}
      </Grid>
      </div>

      {/* شريط التكامل: صورة جانبية بنسبة متوازنة (لا قص) + نص */}
      <div
        style={{
          marginBlockStart: sp(2),
          display: 'flex',
          alignItems: 'stretch',
          gap: sp(2),
          background: c.surface,
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderRadius: sp(2),
          padding: sp(2),
          boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
        }}
      >
        <div
          style={{
            width: 340,
            height: 132,
            flexShrink: 0,
            borderRadius: sp(1.5),
            overflow: 'hidden',
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            background: c.card || '#FFFFFF'
          }}
        >
          <Img
            priority
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&q=80"
            alt="فريق العمل المتكامل يتعاون عبر محاور الدراسة الثمانية"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: sp(1), minWidth: 0 }}>
          <div style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
            التكامل بين المحاور الثمانية
          </div>
          <p style={{ fontSize: fs.caption, color: c.textMuted || c.text, lineHeight: lhBody, margin: 0 }}>
            لا يُعتمد أي محور منفردًا؛ القرار الاستثماري يُبنى على تكامل السوق والفني والمالي والمخاطر والحوكمة معًا.
          </p>
        </div>
      </div>
    </Page>
  );
}
