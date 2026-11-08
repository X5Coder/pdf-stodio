// رسالة الصفحة في جملة واحدة: إعداد دراسة الجدوى عمل جماعي من ثمانية تخصصات متكاملة يقودها مدير الدراسة ويعتمدها راعي القرار.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Users, Briefcase, UserCheck, Wrench, ShoppingBag, Scale, LineChart, Database, ShieldAlert } from 'lucide-react';

const ROLES = [
  { title: 'مدير دراسة الجدوى', body: 'يدير الخطة والتنسيق والجودة والتكامل بين المحاور.', icon: Briefcase, accent: true },
  { title: 'راعي الدراسة / صاحب القرار', body: 'يعتمد النطاق والميزانية والقرار النهائي.', icon: UserCheck, accent: false },
  { title: 'المهندس / الخبير الفني', body: 'يحدد البدائل والتصميم والسعة والتكاليف الفنية.', icon: Wrench, accent: true },
  { title: 'خبير السوق', body: 'يجمع بيانات الطلب والمنافسين والأسعار والعملاء.', icon: ShoppingBag, accent: false },
  { title: 'المستشار القانوني والبيئي', body: 'يفحص الالتزام والتراخيص والأثر والاشتراطات.', icon: Scale, accent: true },
  { title: 'المحلل المالي والاقتصادي', body: 'يبني النموذج المالي ويحسب المؤشرات والبدائل.', icon: LineChart, accent: false },
  { title: 'مسؤول البيانات والجودة', body: 'يوثق المصادر والافتراضات ويدقق الاتساق.', icon: Database, accent: true },
  { title: 'خبير المخاطر والجدول الزمني', body: 'يدير سجل المخاطر والاعتماديات وخطة التنفيذ.', icon: ShieldAlert, accent: false }
];

export default function Page17({ pageNo, total }) {
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
            <Users size={14} />
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
            فريق إعداد دراسة الجدوى: التخصصات والأدوار
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
            alt="فريق الخبراء والاستشاريين"
          />
        </div>
      </div>

      <Grid gap={3}>
        {ROLES.map((r) => {
          const IconComp = r.icon;
          const bar = r.accent ? c.accent : c.primary;
          return (
            <Col key={r.title} span={6}>
              <div
                style={{
                  background: c.card || '#FFFFFF',
                  borderRadius: sp(2),
                  border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                  borderInlineStart: `4px solid ${bar}`,
                  boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                  paddingBlock: sp(2),
                  paddingInline: sp(3),
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: sp(2),
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <span
                  style={{
                    width: sp(4),
                    height: sp(4),
                    borderRadius: sp(2),
                    background: r.accent ? (c.accentBg || 'rgba(184, 123, 30, 0.12)') : c.surface,
                    color: bar,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginBlockStart: 2
                  }}
                >
                  <IconComp size={16} />
                </span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
                    {r.title}
                  </h2>
                  <p style={{ fontSize: fs.compact, color: c.textMuted || c.text, lineHeight: lhBody, margin: 0, marginBlockStart: 2 }}>
                    {r.body}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Grid>
    </Page>
  );
}
