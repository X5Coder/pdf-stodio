// رسالة الصفحة في جملة واحدة: خريطة تعرض أقسام العرض الستة في شبكة واحدة ليعرف القارئ مسار الدراسة كاملاً.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Compass, Layers, Workflow, Users, LineChart, FileCheck2, MapPin } from 'lucide-react';

const SECTIONS = [
  { no: '01', title: 'مفهوم دراسة الجدوى', desc: 'لماذا ندرس؟ وما القرار المطلوب؟', icon: Compass, accent: false },
  { no: '02', title: 'محاور الدراسة', desc: 'أولية، السوقية، الفنية، المالية، القانونية، البيئية', icon: Layers, accent: true },
  { no: '03', title: 'منهجية التنفيذ', desc: 'خطوات العمل والبيانات والأدوات', icon: Workflow, accent: false },
  { no: '04', title: 'فريق العمل', desc: 'الأدوار والمسؤوليات والحوكمة', icon: Users, accent: false },
  { no: '05', title: 'التحليل والقرار', desc: 'المؤشرات، السيناريوهات، المخاطر والتوصية', icon: LineChart, accent: true },
  { no: '06', title: 'المخرجات', desc: 'التقرير النهائي وخطة التنفيذ', icon: FileCheck2, accent: false }
];

export default function Page02({ pageNo, total }) {
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
              color: '#60A5FA',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <MapPin size={14} />
            <bdi>01</bdi> | نظرة عامة
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
            خريطة العرض
          </h1>
        </div>

        {/* شارة إحصائية أو تعريفية مرافقة */}
        <div
          style={{
            background: c.surface,
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            borderRadius: sp(2),
            paddingBlock: sp(1),
            paddingInline: sp(3),
            fontSize: fs.caption,
            color: c.textMuted || c.text,
            fontWeight: 600
          }}
        >
          ٦ محاور رئيسية للمسار التحليلي
        </div>
      </div>

      <Grid gap={3}>
        {/* شبكة بطاقات الأقسام الستة */}
        <Col span={8}>
          <Grid gap={3}>
            {SECTIONS.map((s) => {
              const IconComp = s.icon;
              const bar = s.accent ? '#3B82F6' : c.primary;
              return (
                <Col key={s.no} span={6}>
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
                      flexDirection: 'column',
                      gap: sp(2),
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
                        <span
                          style={{
                            width: sp(5),
                            height: sp(5),
                            borderRadius: sp(2),
                            background: s.accent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                            color: bar,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <IconComp size={18} />
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
                          {s.title}
                        </h2>
                      </div>
                      <span
                        style={{
                          fontSize: fs.caption,
                          fontWeight: 700,
                          color: bar,
                          fontVariantNumeric: 'tabular-nums'
                        }}
                      >
                        <bdi>{s.no}</bdi>
                      </span>
                    </div>
                    <p style={{ fontSize: fs.compact || fs.small, margin: 0, color: c.textMuted || c.text, lineHeight: lhBody }}>
                      {s.desc}
                    </p>
                  </div>
                </Col>
              );
            })}
          </Grid>
        </Col>

        {/* لوحة الصورة الفوتوغرافية الاستراتيجية الحقيقية */}
        <Col span={4}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: 380,
              borderRadius: sp(3),
              overflow: 'hidden',
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              boxShadow: '0 8px 24px -4px rgba(15, 34, 25, 0.08)'
            }}
          >
            <Img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
              alt="تخطيط استراتيجي ودراسة تحليلية للمشروعات الاستثمارية"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(21,60,45,0.75) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: sp(3),
                insetInlineStart: sp(3),
                insetInlineEnd: sp(3),
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                borderRadius: sp(2),
                padding: sp(2),
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary }}>منهجية متسلسلة ودقيقة</div>
              <div style={{ fontSize: fs.caption, color: c.textMuted || c.text }}>كل خطوة تؤسس للقرار الاستثماري النهائي</div>
            </div>
          </div>
        </Col>
      </Grid>
    </Page>
  );
}
