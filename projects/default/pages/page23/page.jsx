// رسالة الصفحة في جملة واحدة: الملخص التنفيذي يثبت أن التجميع والفرز والحفظ هو البداية الصحيحة قبل أي تصنيع.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { FileText, PackageCheck, TrendingUp, CheckCircle2, MapPin, Gauge } from 'lucide-react';

export default function Page23({ pageNo, total }) {
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
            <FileText size={14} />
            <bdi>2</bdi> | الملخص التنفيذي
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
            الملخص التنفيذي: تجميع وفرز قبل التصنيع
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80"
            alt="المستودعات والفرز وسلاسل الإمداد"
          />
        </div>
      </div>

      <Grid gap={3}>
        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `4px solid #3B82F6`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: sp(2)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
              <PackageCheck size={20} color='#3B82F6' />
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>فكرة المشروع</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              إنشاء مركز يستقبل الجلود من المجازر المرخصة، ويفرزها ويصنفها ويحفظها ثم يوردها إلى المدابغ والمصانع.
            </p>
          </div>
        </Col>

        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `4px solid ${c.primary}`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: sp(2)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
              <TrendingUp size={20} color={c.primary} />
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>القيمة المضافة</h2>
            </div>
            <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
              تقليل التلف والفاقد، تحسين جودة الخامة، انتظام التوريد، ورفع كفاءة تتبع الكميات والمبيعات.
            </p>
          </div>
        </Col>

        <Col span={4}>
          <div
            style={{
              background: c.card || '#FFFFFF',
              borderRadius: sp(3),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              borderTop: `4px solid #3B82F6`,
              boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
              paddingBlock: sp(3),
              paddingInline: sp(3),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: sp(2)
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
              <CheckCircle2 size={20} color='#3B82F6' />
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>القرار المبدئي</h2>
            </div>
            <p style={{ fontSize: fs.compact, color: c.text, lineHeight: lhBody, margin: 0 }}>
              البدء بالتجميع والفرز والحفظ والتسويق؛ وتأجيل التصنيع أو المعالجة إلى مرحلة لاحقة بعد إثبات السوق.
            </p>
            <div
              style={{
                background: c.surface,
                borderRadius: sp(2),
                padding: sp(2),
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: fs.caption, fontWeight: 700, color: c.primary }}>
                <MapPin size={14} color='#3B82F6' />
                الموقع: قريب من المجازر والأسواق والموانئ.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: fs.caption, fontWeight: 700, color: c.primary }}>
                <Gauge size={14} color={c.primary} />
                الطاقة: <bdi>800</bdi> جلد شهريًا.
              </div>
            </div>
          </div>
        </Col>
      </Grid>

      <div
        style={{
          marginBlockStart: sp(4),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          fontSize: fs.caption,
          color: c.textMuted || c.text,
          lineHeight: lhBody
        }}
      >
        النموذج المقترح يركز على الجلود السليمة القابلة للتداول، وليس على جميع مخلفات المجازر. الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية.
      </div>
    </Page>
  );
}
