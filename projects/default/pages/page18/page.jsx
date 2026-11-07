// رسالة الصفحة في جملة واحدة: مصفوفة RACI تفصل بين المنفذ وصاحب المساءلة والمستشار والمُبلغ فتمنع تداخل الأدوار.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const CELLS = [
  {
    code: 'R',
    latin: 'Responsible',
    name: 'المنفِّذ (يقوم بالعمل الفعلي)',
    body: 'ينجز التحليل أو المخرج المطلوب.',
    accent: false
  },
  {
    code: 'A',
    latin: 'Accountable',
    name: 'صاحب المساءلة',
    subtitle: 'المسؤول النهائي عن النتيجة والجودة',
    body: 'يعتمد النتيجة ويتحمل مسؤوليتها؛ يُفضَّل واحد لكل مخرج.',
    accent: true
  },
  {
    code: 'C',
    latin: 'Consulted',
    name: 'المستشار (أصحاب المصلحة)',
    body: 'يقدم رأيًا تخصصيًا قبل اعتماد القرار.',
    accent: false
  },
  {
    code: 'I',
    latin: 'Informed',
    name: 'المُبلَّغ (يُبلَّغ بالقرارات)',
    body: 'مُطَّلع على التقدم والنتائج والقرارات.',
    accent: true
  }
];

const NOTES = [
  'اعتماد خطة العمل ومواعيد التسليم منذ البداية.',
  'تحديد جهة واحدة مسؤولة عن كل مخرج، ومراجع مستقل للتحقق من الجودة.',
  'توثيق القرارات والتغييرات وإصدارات النموذج المالي.'
];

export default function Page18({ pageNo, total }) {
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
            <ShieldCheck size={14} />
            <bdi>07</bdi> | فريق العمل
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
            توزيع المسؤوليات والحوكمة
          </h1>
          <p style={{ fontSize: fs.small, color: c.textMuted || c.text, margin: 0, marginBlockStart: 2 }}>
            استخدم مصفوفة توزيع المسؤوليات <bdi>RACI</bdi> لتجنب تداخل الأدوار:
          </p>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80"
            alt="حوكمة الفريق واجتماعات التنسيق"
          />
        </div>
      </div>

      <Grid gap={3}>
        {CELLS.map((cell) => {
          const bar = cell.accent ? '#3B82F6' : c.primary;
          return (
            <Col key={cell.code} span={3}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(3),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderTop: `4px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(3),
                  paddingInline: sp(3),
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: sp(1)
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      width: sp(6),
                      height: sp(6),
                      borderRadius: sp(2),
                      background: cell.accent ? '#3B82F6' : c.primary,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: fs.title,
                      fontWeight: 700
                    }}
                  >
                    <bdi>{cell.code}</bdi>
                  </span>
                  <span dir="ltr" style={{ fontSize: fs.caption, fontWeight: 600, color: c.textMuted || c.text }}>
                    <bdi>{cell.latin}</bdi>
                  </span>
                </div>
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0, marginBlockStart: sp(1) }}>
                  {cell.name}
                </h2>
                {cell.subtitle && (
                  <div style={{ fontSize: fs.caption, fontWeight: 600, color: '#3B82F6' }}>
                    {cell.subtitle}
                  </div>
                )}
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0, marginBlockStart: sp(1) }}>
                  {cell.body}
                </p>
              </div>
            </Col>
          );
        })}
      </Grid>

      {/* بطاقة الملاحظات الثلاث */}
      <div
        style={{
          marginBlockStart: sp(3),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          paddingBlock: sp(2),
          paddingInline: sp(3)
        }}
      >
        <Grid gap={2}>
          {NOTES.map((n, i) => (
            <Col key={i} span={4}>
              <div style={{ display: 'flex', gap: sp(1), alignItems: 'center', fontSize: fs.compact, color: c.text }}>
                <CheckCircle2 size={16} color='#3B82F6' style={{ flexShrink: 0 }} />
                <span>{n}</span>
              </div>
            </Col>
          ))}
        </Grid>
      </div>
    </Page>
  );
}
