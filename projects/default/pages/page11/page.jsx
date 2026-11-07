// رسالة الصفحة في جملة واحدة: مؤشرات ESG تقيس التزام المشروع بالاستدامة — قانونية وبيئية واجتماعية وحوكمة — وتحسم أثره البيئي.
// ملاحظة: صفحة كثيفة طبق الأصل من التصميم المرسل بقرار المستخدم — تستخدم حجم compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Leaf, HeartHandshake, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

const LEGAL = [
  { n: '1', t: 'القوانين المتعلقة بهذا المشروع المباشرة والقوانين العامة للدولة (تحليل مناخ الدولة للاستثمار) الرخصة والنشاط التجاري _ كيفية الاستفادة من الإعفاءات الضريبية _ حوافز الاستثمار _ قيود استخدام العملة الأجنبية.' },
  { n: '2', t: 'اختيار الشكل القانوني الأنسب للمشروع (منشأة فردية أو شركة أشخاص أو شركة أموال) أو شركات مساهمة مغلقة أو مفتوحة للاكتتاب.' }
];

const ENV = [
  { n: '1', t: 'قياس كيفية تفاعل الشركة مع البيئة المحيطة بها ومدى حمايتها لها (انبعاثات الكربون - غازات الاحتباس الحراري) وخطة الرصد والتخفيف.' },
  { n: '2', t: 'إدارة الموارد (استهلاك المياه، كفاءة الطاقة - النفايات والملوثات).' },
  { n: '3', t: 'التنوع البيولوجي (حماية النظم البيئية والممارسات المستدامة للمواد الخام).' }
];

const SOC = [
  { n: '1', t: 'حقوق الإنسان وممارسات العمل: المساواة في الأجور، ظروف العمل، وعمالة الأطفال.' },
  { n: '2', t: 'الصحة والسلامة: السلامة المهنية للموظفين وصحة المستهلكين.' },
  { n: '3', t: 'العلاقات المجتمعية: التنوع والشمول، وحماية خصوصية بيانات العملاء.' }
];

const GOV = [
  { n: '1', t: 'هيكلية مجلس الإدارة (تنوع المجلس، واستقلالية الأعضاء).' },
  { n: '2', t: 'حقوق المساهمين (الشفافية والضوابط الداخلية وعمليات التدقيق).' },
  { n: '3', t: 'الأخلاقيات ومكافحة الفساد (سياسات الأجور التنفيذية، ومنع الرشوة).' }
];

const ENV_WHY = [
  'تحديد القضايا البيئية التي سوف يسببها المشروع وتقدير تكلفتها الفعلية.',
  'اقتراح آليات تخفيف الأضرار التي تنشأ عن تنفيذ المشروع.',
  'تقييم الأثر البيئي للمشروع يساعد في اختيار مواقع بديلة في حالة ارتفاع الأثر البيئي للحفاظ على البيئة.'
];

export default function Page11({ pageNo, total }) {
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
            <bdi>04</bdi> | محاور الدراسة
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
            <bdi>5)</bdi> مؤشرات <bdi>ESG</bdi> (الحوكمة البيئية والاجتماعية والمؤسسية){' '}
            <span dir="ltr" style={{ fontSize: fs.small, color: '#3B82F6' }}><bdi>Social Feasibility & Environmental</bdi></span>
          </h1>
          <p style={{ fontSize: fs.compact, color: c.textMuted || c.text, margin: 0, marginBlockStart: 2 }}>
            مقاييس أداء كمية ونوعية تقييم مدى التزام الشركات لمعايير الاستدامة والمسؤولية الأخلاقية وتقييم المخاطر المستقبلية.
          </p>
        </div>

        <div style={{ width: 80, height: 48, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80"
            alt="الاستدامة البيئية ومؤشرات الحوكمة"
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
              <ShieldCheck size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>مؤشرات الحوكمة</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {GOV.map((it) => (
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
              <HeartHandshake size={16} color='#3B82F6' />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>مؤشرات اجتماعية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {SOC.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: '#3B82F6' }}><bdi>{it.n}</bdi>-</strong> {it.t}
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
              borderTop: `3px solid ${c.primary}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
              <Leaf size={16} color={c.primary} />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>مؤشرات بيئية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {ENV.map((it) => (
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
              <Scale size={16} color='#3B82F6' />
              <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>دراسة جدوى قانونية</h2>
            </div>
            <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
              {LEGAL.map((it) => (
                <li key={it.n}>
                  <strong style={{ color: '#3B82F6' }}><bdi>{it.n}</bdi>-</strong> {it.t}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Grid>

      {/* شريط أهمية دراسة الجدوى البيئية */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: 2 }}>
          <Leaf size={16} color={c.primary} />
          <h3 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
            أهمية دراسة الجدوى البيئية
          </h3>
        </div>
        <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: lhBody }}>
          {ENV_WHY.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </Page>
  );
}
