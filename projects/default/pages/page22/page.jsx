// رسالة الصفحة في جملة واحدة: غلاف يقدّم مركز تجميع الجلود كاستغلال أمثل لمورد حيواني بقيمة اقتصادية وبيئية مستدامة.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Sparkles, Layers, FileCheck } from 'lucide-react';

export default function Page22() {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

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
          {/* العمود الرئيسي للنصوص والبيانات */}
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
                    color: '#60A5FA' || '#60A5FA',
                    fontSize: fs.caption,
                    fontWeight: 700,
                    paddingBlock: sp(1) / 2,
                    paddingInline: sp(3),
                    borderRadius: sp(5)
                  }}
                >
                  <Sparkles size={16} />
                  دراسة جدوى مبدئية
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
                  <Layers size={14} color={'#60A5FA' || '#60A5FA'} />
                  نموذج تطبيقي عملي
                </span>
              </div>

              <div>
                <h1
                  style={{
                    fontSize: fs.title,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    margin: 0,
                    color: '#FFFFFF'
                  }}
                >
                  مركز تجميع وفرز وحفظ وتسويق الجلود الحيوانية الناتجة عن المجازر المصرية
                </h1>
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
                استغلال مورد اقتصادي بكفاءة وتحقيق قيمة مضافة وأثر بيئي مستدام
              </p>

              <p
                style={{
                  fontSize: fs.body,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                  lineHeight: lhBody
                }}
              >
                استغلال أمثل لمورد حيواني .. قيمة اقتصادية وبيئية مستدامة
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: sp(2),
                  marginBlockStart: sp(3),
                  paddingTop: sp(3),
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <FileCheck size={20} color={'#60A5FA' || '#60A5FA'} />
                <span style={{ fontSize: fs.small, color: '#FFFFFF', opacity: 0.9, fontWeight: 600 }}>
                  إعداد تصوري لأغراض التخطيط واتخاذ القرار
                </span>
              </div>
            </div>
          </Col>

          {/* العمود الأيسر: صورة حقيقية راقية للمنتجات والجلود */}
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
                src="https://images.unsplash.com/photo-1768213470228-995720632f58?auto=format&fit=crop&w=1200&q=80"
                alt="أحواض دباغة الجلود الطبيعية في المدابغ"
                style={{ objectPosition: 'center 62%' }}
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
                <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary }}>سلاسل القيمة والاقتصاد الدائري</div>
                <div style={{ fontSize: fs.caption, color: c.textMuted || c.text }}>تحويل مخلفات المجازر إلى مدخلات صناعية عالية الجودة</div>
              </div>
            </div>
          </Col>
        </Grid>
      </div>
    </Page>
  );
}
