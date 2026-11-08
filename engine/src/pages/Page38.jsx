// رسالة الصفحة في جملة واحدة: أربعة مراجع دولية وروابط إضافية للتوسع في منهجيات دراسات الجدوى.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { BookOpen, ExternalLink, Globe, Link2 } from 'lucide-react';

const REFS = [
  {
    title: 'UNIDO — Manual for the Preparation of Industrial Feasibility Studies (PDF)',
    desc: 'منهجية تقليدية شاملة للسوق والفني والموارد والعمالة والتنفيذ والمالي والاقتصادي.',
    href: 'https://www.unido.org/sites/default/files/files/2021-02/manual_for_the_preparation_of_industrial_feasibility_studies.pdf'
  },
  {
    title: 'HM Treasury — The Green Book 2026',
    desc: 'إطار حكومي حديث لتقييم المقترحات والبدائل والتكاليف والمنافع والمخاطر.',
    href: 'https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026'
  },
  {
    title: 'World Bank — Public Investment Management Reference Guide (PDF)',
    desc: 'يربط دراسة الجدوى بالتصميم الأولي وتقديرات التكلفة والطلب والمنافع على دورة الحياة.',
    href: 'https://documents1.worldbank.org/curated/en/548751582775237521/pdf/Public-Investment-Management-Reference-Guide.pdf'
  },
  {
    title: 'HM Treasury — Green Book and accompanying guidance',
    desc: 'بوابة الإرشادات والنماذج والمواد المكملة؛ آخر تحديثات 2026.',
    href: 'https://www.gov.uk/government/collections/the-green-book-and-accompanying-guidance'
  }
];

export default function Page38({ pageNo, total }) {
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
            <BookOpen size={14} />
            <bdi>13</bdi> | المراجع
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
            مراجع موثوقة للتوسع والتحميل
          </h1>
        </div>

        <div style={{ width: 160, height: 90, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80"
            alt="المكتبات والمراجع العلمية الدولية"
          />
        </div>
      </div>

      <Grid gap={2}>
        {/* المراجع الأربعة الرئيسية */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp(1) * 1.5 }}>
            {REFS.map((r, i) => (
              <div
                key={i}
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(2),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderInlineStart: `4px solid ${i % 2 === 0 ? c.primary : c.accent}`,
                  boxShadow: '0 2px 6px -1px rgba(15, 34, 25, 0.04)',
                  paddingBlock: sp(1) * 1.2,
                  paddingInline: sp(3)
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: 2 }}>
                  <h2
                    style={{ fontSize: fs.small, fontWeight: 700, color: c.accent, lineHeight: lhHeading, margin: 0 }}
                    dir="ltr"
                    lang="en"
                  >
                    <bdi>{r.title}</bdi>
                  </h2>
                  <ExternalLink size={14} color={c.accent} />
                </div>
                <p style={{ fontSize: fs.compact, color: c.text, lineHeight: 1.35, margin: 0 }}>
                  {r.desc}
                </p>
                <a
                  href={r.href}
                  dir="ltr"
                  lang="en"
                  style={{
                    display: 'block',
                    fontSize: fs.caption,
                    color: c.primaryLight,
                    textDecoration: 'underline',
                    marginBlockStart: 2,
                    overflowWrap: 'anywhere',
                    textAlign: 'start'
                  }}
                >
                  <bdi>{r.href}</bdi>
                </a>
              </div>
            ))}
          </div>
        </Col>

        {/* الروابط الإضافية */}
        <Col span={4}>
          <div
            style={{
              background: c.surface,
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              padding: sp(3),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: sp(2)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
              <Link2 size={18} color={c.accent} />
              <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                روابط ومواد إضافية
              </h3>
            </div>
            <div dir="ltr" lang="en" style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
              <div style={{ background: c.card || '#FFFFFF', padding: sp(2), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.05)'}` }}>
                <a
                  href="https://www.alolabor.org/nArabLabor/images/stories/.../dr.%20ehab"
                  style={{ fontSize: fs.caption, color: c.accent, textDecoration: 'underline', overflowWrap: 'anywhere', textAlign: 'start' }}
                >
                  <bdi>www.alolabor.org/nArabLabor/images/stories/.../dr.%20ehab</bdi>
                </a>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(2), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.05)'}` }}>
                <a
                  href="https://www.kantakji.com/fiqh/Files"
                  style={{ fontSize: fs.caption, color: c.accent, textDecoration: 'underline', overflowWrap: 'anywhere', textAlign: 'start' }}
                >
                  <bdi>www.kantakji.com/fiqh/Files</bdi>
                </a>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(2), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.05)'}` }}>
                <a
                  href="https://www.nqeia.com/vb/uploaded/30847"
                  style={{ fontSize: fs.caption, color: c.accent, textDecoration: 'underline', overflowWrap: 'anywhere', textAlign: 'start' }}
                >
                  <bdi>www.nqeia.com/vb/uploaded/30847</bdi>
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Grid>
    </Page>
  );
}
