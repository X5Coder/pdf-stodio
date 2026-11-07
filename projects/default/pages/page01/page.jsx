// رسالة الصفحة في جملة واحدة: غلاف يعرّف بدراسة الجدوى من الفكرة إلى قرار استثماري مبني على الأدلة.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Award, UserCheck, BookOpen, Sparkles } from 'lucide-react';

export default function Page01() {
  const { fs, sp, c, series, lhHeading, lhBody } = useDS();

  return (
    <Page tone="brand">
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: sp(3),
          overflow: 'hidden'
        }}
      >
        <Grid style={{ height: '100%', alignItems: 'center' }} gap={5}>
          {/* العمود الرئيسي للنصوص والمعلومات */}
          <Col span={7}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(3), textAlign: 'start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(2) }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: sp(1),
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: `1px solid #3B82F6`,
                    color: '#60A5FA',
                    fontSize: fs.caption,
                    fontWeight: 700,
                    paddingBlock: sp(1) / 2,
                    paddingInline: sp(3),
                    borderRadius: sp(5)
                  }}
                >
                  <BookOpen size={16} color="#60A5FA" />
                  مقرر أساسيات التقنية
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: sp(1),
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: fs.caption,
                    paddingBlock: sp(1) / 2,
                    paddingInline: sp(2),
                    borderRadius: sp(5)
                  }}
                >
                  <Sparkles size={14} color="#60A5FA" />
                  دليل تدريبي وتطبيقي
                </span>
              </div>

              <div>
                <h1
                  style={{
                    fontSize: fs.display,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em'
                  }}
                >
                  دراسة الجدوى الاقتصادية
                </h1>
                <div
                  dir="ltr"
                  style={{
                    fontSize: fs.title,
                    fontWeight: 600,
                    color: '#60A5FA',
                    lineHeight: lhHeading,
                    marginBlockStart: sp(1)
                  }}
                >
                  <bdi>Feasibility Study</bdi>
                </div>
              </div>

              <div aria-hidden="true" style={{ width: sp(8), height: 4, background: '#3B82F6', borderRadius: 2 }} />

              <p
                style={{
                  fontSize: fs.lead,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  margin: 0,
                  opacity: 0.95,
                  lineHeight: lhBody
                }}
              >
                من الفكرة إلى قرار استثماري مبني على الأدلة
              </p>

              <p
                style={{
                  fontSize: fs.body,
                  color: 'rgba(255, 255, 255, 0.82)',
                  margin: 0,
                  maxWidth: '65ch',
                  lineHeight: lhBody
                }}
              >
                عرض تدريبي وعملي قابل للتطبيق على المشروعات الخدمية والهندسية الاستثمارية
              </p>

              {/* بطاقات الإشراف والإعداد الفاخرة */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: sp(3),
                  marginBlockStart: sp(3),
                  paddingTop: sp(3),
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: sp(3),
                    paddingBlock: sp(2),
                    paddingInline: sp(3),
                    display: 'flex',
                    alignItems: 'center',
                    gap: sp(2)
                  }}
                >
                  <Award size={20} color="#60A5FA" />
                  <div>
                    <div style={{ fontSize: fs.caption, color: 'rgba(255, 255, 255, 0.65)' }}>تحت إشراف</div>
                    <div style={{ fontSize: fs.small, fontWeight: 700, color: '#FFFFFF' }}>أ.د. حسن صالح</div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: sp(3),
                    paddingBlock: sp(2),
                    paddingInline: sp(3),
                    display: 'flex',
                    alignItems: 'center',
                    gap: sp(2)
                  }}
                >
                  <UserCheck size={20} color="#60A5FA" />
                  <div>
                    <div style={{ fontSize: fs.caption, color: 'rgba(255, 255, 255, 0.65)' }}>إعداد الطالبة</div>
                    <div style={{ fontSize: fs.small, fontWeight: 700, color: '#FFFFFF' }}>د. إيناس إبراهيم الطنطاوي</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* عمود الصورة المعمارية والاستثمارية الحقيقية */}
          <Col span={5}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 520,
                borderRadius: sp(4),
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)'
              }}
            >
              <Img
                priority
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="واجهة برج أعمال هندسي حديث يرمز لقرارات الاستثمار المدروسة"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(21, 60, 45, 0.1) 0%, rgba(21, 60, 45, 0.8) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: sp(4),
                  insetInlineStart: sp(4),
                  insetInlineEnd: sp(4),
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: sp(3),
                  paddingBlock: sp(2),
                  paddingInline: sp(3),
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}
              >
                <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary }}>منهجية علمية متكاملة</div>
                <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.85 }}>تحليل السوق • الجدوى الفنية • النمذجة المالية • تقييم المخاطر</div>
              </div>
            </div>
          </Col>
        </Grid>
      </div>
    </Page>
  );
}
