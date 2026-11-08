// رسالة الصفحة في جملة واحدة: منهجية العمل مسار واحد من تحديد المشكلة إلى توصية الاستثمار مرورًا بالبيانات والنموذج المالي والمخاطر.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Workflow, Database, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

const STEPS = [
  'تحديد المشكلة والنطاق',
  'جمع البيانات والتحقق',
  'تطوير البدائل',
  'تحليل السوق والفني',
  'بناء النموذج المالي',
  'اختبار المخاطر والاستدامة',
  'مراجعة مستقلة',
  'توصية وقرار'
];

export default function Page19({ pageNo, total }) {
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
              color: c.accent,
              background: c.accentBg || 'rgba(184, 123, 30, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <Workflow size={14} />
            <bdi>08</bdi> | طريقة التنفيذ
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
            منهجية العمل: من التكليف إلى قرار الاستثمار
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80"
            alt="منهجية العمل وإدارة المراحل والمشروعات"
          />
        </div>
      </div>

      {/* شريط المراحل الثمانية المتسلسلة */}
      <div style={{ display: 'flex', gap: sp(1), marginBlockStart: sp(2) }}>
        {STEPS.map((s, i) => {
          const isAccent = i % 2 === 1;
          const bg = isAccent ? c.accent : c.primary;
          return (
            <div
              key={s}
              style={{
                flex: 1,
                minWidth: 0,
                background: bg,
                color: '#FFFFFF',
                borderRadius: sp(2),
                paddingBlock: sp(2),
                paddingInline: sp(1),
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: sp(1),
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
              }}
            >
              <span
                style={{
                  fontSize: fs.caption,
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: sp(4),
                  paddingInline: sp(2),
                  paddingBlock: 2
                }}
              >
                <bdi>{i + 1}</bdi>
              </span>
              <span style={{ fontSize: fs.compact, fontWeight: 600, lineHeight: 1.35 }}>
                {s}
              </span>
            </div>
          );
        })}
      </div>

      {/* الملاحظات الثلاث الداعمة في بطاقات راقية */}
      <div style={{ marginBlockStart: sp(4) }}>
        <Grid gap={3}>
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `3px solid ${c.primary}`,
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <Database size={18} color={c.primary} />
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>مصادر البيانات</h2>
              </div>
              <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                إحصاءات رسمية، بيانات داخلية، عروض أسعار، مقابلات، مسوح، ودراسات مرجعية.
              </p>
            </div>
          </Col>

          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `3px solid ${c.accent}`,
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <FileSpreadsheet size={18} color={c.accent} />
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>أدوات شائعة / Excel</h2>
              </div>
              <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                نموذج مالي، تحليل <bdi>SWOT</bdi>، تحليل أصحاب المصلحة، سجل المخاطر، وجداول المقارنة.
              </p>
            </div>
          </Col>

          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `3px solid ${c.primary}`,
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <CheckCircle2 size={18} color={c.primary} />
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>قاعدة التوثيق</h2>
              </div>
              <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
                كل رقم جوهري يجب أن يكون له مصدر أو طريقة تقدير وافتراض موثق.
              </p>
            </div>
          </Col>
        </Grid>
      </div>
    </Page>
  );
}
