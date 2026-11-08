// رسالة الصفحة في جملة واحدة: لا تسأل كم الربح بل ما الذي يدهور النتيجة — حساسية وسيناريوهات وضغط ونقطة تحول.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Sliders, GitMerge, Activity, AlertTriangle, FileSpreadsheet } from 'lucide-react';

export default function Page09({ pageNo, total }) {
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
            <bdi>06</bdi> | المخاطر
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
            <bdi>5-</bdi> اختبار الحساسية والسيناريوهات <bdi>Sensitivity & Scenario Analysis</bdi>
          </h1>
          <p
            style={{
              fontSize: fs.lead,
              fontWeight: 600,
              color: c.accent,
              margin: 0,
              marginBlockStart: sp(1)
            }}
          >
            لا تسأل فقط :كم سيكون الربح؟ «بل اسأل»: ما الذي يجب أن يتغير حتى تتدهور النتيجة؟
          </p>
        </div>

        <div style={{ width: 120, height: 75, borderRadius: sp(2), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80"
            alt="تحليل تقلبات الأسواق والمخاطر المالية"
          />
        </div>
      </div>

      <Grid gap={3}>
        <Col span={6}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderInlineStart: `4px solid ${c.primary}`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
              <span style={{ color: c.primary }}><Sliders size={20} /></span>
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>تحليل الحساسية</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              تغيير متغير واحد: التكلفة <bdi>+10%</bdi>، السعر <bdi>-5%</bdi>، الطلب <bdi>-15%</bdi>.
            </p>
          </div>
        </Col>

        <Col span={6}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderInlineStart: `4px solid ${c.accent}`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
              <span style={{ color: c.accent }}><GitMerge size={20} /></span>
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>السيناريوهات</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              تغير عدة افتراضات مترابطة: متحفظ / أساسي / متفائل.
            </p>
          </div>
        </Col>

        <Col span={6}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderInlineStart: `4px solid ${c.primary}`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
              <span style={{ color: c.primary }}><Activity size={20} /></span>
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>اختبار الضغط</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              تأخر التنفيذ، زيادة سعر الصرف، انقطاع الإمداد أو انخفاض الاستغلال.
            </p>
          </div>
        </Col>

        <Col span={6}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderInlineStart: `4px solid ${c.accent}`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), marginBlockEnd: sp(1) }}>
              <span style={{ color: c.accent }}><AlertTriangle size={20} /></span>
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>نقطة التحول</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              تحديد القيمة التي عندها يصبح <bdi>NPV</bdi> سالبًا أو يتعذر سداد الدين.
            </p>
          </div>
        </Col>
      </Grid>

      <div
        style={{
          marginBlockStart: sp(3),
          background: c.surface,
          borderRadius: sp(3),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.accent}`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          display: 'flex',
          alignItems: 'center',
          gap: sp(2)
        }}
      >
        <FileSpreadsheet size={20} color={c.accent} style={{ flexShrink: 0 }} />
        <p style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
          مخرج أساسي: جدول يوضح المتغيرات المؤثرة، حدود التحمل، وإجراءات الاستجابة.
        </p>
      </div>
    </Page>
  );
}
