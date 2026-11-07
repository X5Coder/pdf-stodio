// رسالة الصفحة في جملة واحدة: إطار القرار يفرّق بين نفّذ وعدّل وأجّل وارفض لتخرج التوصية بقرار ومسؤول وموعد.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { CheckCircle2, RefreshCw, Clock, XCircle, Compass } from 'lucide-react';

const DECISIONS = [
  { title: 'نفّذ', desc: 'الجدوى مدعومة، والتمويل والموافقات والمخاطر تحت السيطرة.', icon: CheckCircle2, color: 'success' },
  { title: 'عدّل', desc: 'الفكرة واعدة لكن التصميم أو السعة أو التكلفة تحتاج إعادة ضبط.', icon: RefreshCw, color: 'primary' },
  { title: 'أجّل', desc: 'هناك بيانات أو تراخيص أو تمويل حاسم لم يكتمل بعد.', icon: Clock, color: 'warning' },
  { title: 'ارفض', desc: 'المنافع لا تبرر التكلفة والمخاطر حتى بعد دراسة البدائل.', icon: XCircle, color: 'danger' }
];

export default function Page24({ pageNo, total }) {
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
              color: '#3B82F6',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <Compass size={14} />
            <bdi>12</bdi> | القرار
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
            إطار القرار النهائي: نفّذ، عدّل، أجّل أم ارفض؟
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
            alt="اتخاذ القرارات الاستراتيجية للمشروعات"
          />
        </div>
      </div>

      <Grid gap={3}>
        {DECISIONS.map((d) => {
          const IconComp = d.icon;
          const isAccent = d.color === 'warning' || d.color === 'danger';
          const bar = isAccent ? '#3B82F6' : c.primary;
          return (
            <Col key={d.title} span={6}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(3),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderInlineStart: `4px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(3),
                  paddingInline: sp(3),
                  display: 'flex',
                  alignItems: 'center',
                  gap: sp(3),
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <span
                  style={{
                    width: sp(6),
                    height: sp(6),
                    borderRadius: sp(2),
                    background: isAccent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                    color: bar,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={24} />
                </span>
                <div>
                  <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: bar, lineHeight: lhHeading, margin: 0 }}>
                    {d.title}
                  </h2>
                  <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0, marginBlockStart: sp(1) }}>
                    {d.desc}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Grid>

      <div
        style={{
          marginBlockStart: sp(4),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.primary}`,
          paddingBlock: sp(2),
          paddingInline: sp(4),
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhBody, margin: 0 }}>
          التوصية الجيدة تحدد القرار، وأسبابه، وشروطه، والمسؤول عن الخطوة التالية، والموعد المستهدف.
        </p>
      </div>
    </Page>
  );
}
