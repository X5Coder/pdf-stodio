// رسالة الصفحة في جملة واحدة: لوحة جامعة تعرض المشروع كاملًا من الموقع والمالية حتى المخاطر والتوصية في نظرة واحدة.
// ملاحظة: نسخة طبق الأصل من التصميم المرسل (Slide 13) — كثيفة بقرار صريح من المستخدم، لذلك تستخدم fs.compact الاستثنائي الموثق في tokens.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { LayoutDashboard } from 'lucide-react';

function MiniCard({ title, accent, children }) {
  const { fs, sp, c, lhHeading } = useDS();
  const bar = accent ? c.accent : c.primary;
  return (
    <div
      style={{
        background: c.card || '#FFFFFF',
        borderRadius: sp(2),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        borderTop: `3px solid ${bar}`,
        boxShadow: '0 2px 8px -1px rgba(15, 34, 25, 0.04)',
        paddingBlock: sp(1) * 1.5,
        paddingInline: sp(2),
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <h2 style={{ fontSize: fs.compact, fontWeight: 700, color: bar, lineHeight: lhHeading, margin: 0, marginBlockEnd: 2 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>{children}</div>
    </div>
  );
}

function B({ children }) {
  const { fs, sp, c } = useDS();
  return (
    <div style={{ display: 'flex', gap: sp(1), alignItems: 'flex-start' }}>
      <span aria-hidden="true" style={{ width: 4, height: 4, flexShrink: 0, borderRadius: 2, background: c.accent, marginBlockStart: 5 }} />
      <p style={{ fontSize: fs.compact, color: c.text, lineHeight: 1.3, margin: 0 }}>{children}</p>
    </div>
  );
}

function R({ label, value, bold }) {
  const { fs, c } = useDS();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 4,
        paddingBlock: 1,
        borderBottom: `1px solid ${c.surface}`,
        fontSize: fs.compact,
        fontWeight: bold ? 700 : 400,
        color: bold ? c.primary : c.text,
        lineHeight: 1.25,
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      <span>{label}</span>
      <bdi style={{ whiteSpace: 'nowrap' }}>{value}</bdi>
    </div>
  );
}

function P({ children, bold }) {
  const { fs, c } = useDS();
  return (
    <p style={{ fontSize: fs.compact, fontWeight: bold ? 700 : 400, color: bold ? c.primary : c.text, lineHeight: 1.3, margin: 0 }}>
      {children}
    </p>
  );
}

export default function Page21({ pageNo, total }) {
  const { fs, sp, c, lhHeading } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: sp(1) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(1) }}>
          <LayoutDashboard size={16} color={c.accent} />
          <h1 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0 }}>
            <bdi>13</bdi> | لوحة مؤشرات المشروع: مركز تجميع الجلود (الموقع، المالية، المخاطر والتوصية)
          </h1>
        </div>
        <div style={{ fontSize: fs.caption, color: c.accent, fontWeight: 600 }}>
          لوحة جامعة تغطي جميع أبعاد دراسة الجدوى
        </div>
      </div>

      <div style={{ marginBlockStart: sp(1) }}>
        <Grid gap={1}>
          {/* 1. المشروع */}
          <Col span={3}>
            <MiniCard title="المشروع" accent>
              <P bold>مركز تجميع وفرز وحفظ وتسويق الجلود من المجازر المصرية</P>
              <P>استغلال أمثل لمورد حيواني .. قيمة اقتصادية وبيئية مستدامة</P>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <div style={{ width: 36, height: 24, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                  <Img src="https://images.unsplash.com/photo-1745837893977-34f76b11f644?auto=format&fit=crop&w=200&q=80" alt="مدبغة ودباغة الجلود الطبيعية" />
                </div>
                <span style={{ fontSize: fs.compact, color: c.textMuted || c.text }}>صورة: مدبغة وجلود معلقة.</span>
              </div>
            </MiniCard>
          </Col>

          {/* 2. الفكرة والأهداف */}
          <Col span={3}>
            <MiniCard title="الفكرة والأهداف" accent={false}>
              <P>يستقبل الجلود المرخصة ويفرزها جودة ونوعًا ثم يحفظها ويسوقها للمدابغ مع دراسة التصدير.</P>
              <B>عائد من مورد قد تُفقد قيمته، تقليل الفاقد، دعم الصناعة وفرص عمل وقاعدة بيانات للمخزون والإيرادات.</B>
            </MiniCard>
          </Col>

          {/* 3. البدائل والأنسب */}
          <Col span={3}>
            <MiniCard title="البدائل والأنسب" accent>
              <B>تدوير المخلفات: عظام ودهون وأنسجة. شنط وأحذية لقيمة أعلى. جمع وفرز من المرحلة الأولى.</B>
              <P bold>الأنسب: جمع وفرز وحفظ وتسويق الجلود.</P>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <div style={{ width: 36, height: 24, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                  <Img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80" alt="شنط وجلود" />
                </div>
                <span style={{ fontSize: fs.compact, color: c.textMuted || c.text }}>صور: تدوير، شنط، جلود.</span>
              </div>
            </MiniCard>
          </Col>

          {/* 4. الموقع والطاقة */}
          <Col span={3}>
            <MiniCard title="الموقع والطاقة" accent={false}>
              <B>الموقع: قريب من المجازر والأسواق والموانئ.</B>
              <B>الطاقة: <bdi>800</bdi> جلد شهريًا قابلة للزيادة.</B>
              <B>المساحة: <bdi>1,000 - 1,500</bdi> م² حسب المشروع.</B>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <div style={{ width: 36, height: 24, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                  <Img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=200&q=80" alt="مستودع ومخزن" />
                </div>
                <span style={{ fontSize: fs.compact, color: c.textMuted || c.text }}>صورة: مصنع ومخزن وشاحنات.</span>
              </div>
            </MiniCard>
          </Col>

          {/* 5. الهيكل والزمني */}
          <Col span={3}>
            <MiniCard title="الهيكل والزمني" accent={false}>
              <B>المدير: مشتريات، مخزون، تسويق، مالية وإدارية. الفريق: فنيون وتشغيلية ومساندة.</B>
              <B>دراسات <bdi>0-6</bdi> شهور، تجهيز <bdi>6-12</bdi> شهرًا، توسع <bdi>3-5</bdi> سنوات وقابل للتعديل.</B>
            </MiniCard>
          </Col>

          {/* 6. الاستثمار (الأولى) */}
          <Col span={3}>
            <MiniCard title="الاستثمار (الأولى)" accent>
              <R label="الموقع والمخزن" value="600,000" />
              <R label="النقل والتخزين" value="350,000" />
              <R label="الحفظ والسلامة" value="300,000" />
              <R label="نظام إلكتروني" value="150,000" />
              <R label="تأسيس واحتياطي" value="100,000" />
              <R label="الثابت" value="1,500,000" bold />
              <R label="العامل" value="1,400,000" bold />
              <R label="التمويل" value="2,900,000" bold />
            </MiniCard>
          </Col>

          {/* 7. التشغيل والمؤشرات */}
          <Col span={3}>
            <MiniCard title="التشغيل والمؤشرات" accent={false}>
              <R label="شراء الجلود" value="1,200,000" />
              <R label="التداول والنقل" value="80,000" />
              <R label="الثابتة" value="140,000" />
              <R label="التشغيل" value="1,420,000" bold />
              <R label="الإيرادات" value="1,560,000" bold />
              <R label="الفائض" value="140,000" bold />
              <P>هامش <bdi>350</bdi>/جلد، تعادل <bdi>400</bdi>، سنوي <bdi>1,680,000</bdi>، <bdi>57.9%</bdi>، استرداد <bdi>1.73</bdi> سنة.</P>
            </MiniCard>
          </Col>

          {/* 8. التدفقات والحساسية */}
          <Col span={3}>
            <MiniCard title="التدفقات والحساسية" accent>
              <R label="سنة 0" value="-2,900,000" />
              <R label="سنوات 1-5" value="1,680,000" />
              <R label="NPV" value="3,041,000" bold />
              <R label="IRR (خصم 12%)" value="42%" bold />
              <P>الحساسية: أساسية <bdi>140,000</bdi>، بيع <bdi>-5%</bdi> <bdi>62,000</bdi>، شراء <bdi>+5%</bdi> <bdi>80,000</bdi>، بيع <bdi>-10%</bdi> <bdi>-16,000</bdi>، شراء <bdi>+10%</bdi> <bdi>20,000</bdi>. عقود توريد وبيع.</P>
            </MiniCard>
          </Col>

          {/* 9. المخاطر والحد */}
          <Col span={3}>
            <MiniCard title="المخاطر والحد" accent={false}>
              <B>الكميات: عقود طويلة. التلف: تجهيزات مناسبة. التحصيل: مسبق. الاشتراطات: مراجعة التشريعات. الأسعار: دراسة السوق وتنويع العملاء.</B>
            </MiniCard>
          </Col>

          {/* 10. البيئي والتشريعي */}
          <Col span={3}>
            <MiniCard title="البيئي والتشريعي" accent>
              <B>تقليل الفاقد والتلوث ودعم الاقتصاد الدائري.</B>
              <P>زراعة <bdi>53/1966</bdi>، بيئة <bdi>4/1994</bdi> معدل <bdi>9/2009</bdi>، مخلفات <bdi>202/2020</bdi>، اشتراطات الجهاز، التراخيص البيطرية والبيئية والصحية.</P>
            </MiniCard>
          </Col>

          {/* 11. مقارنة البدائل */}
          <Col span={3}>
            <MiniCard title="مقارنة البدائل" accent={false}>
              <B>الاستثمار: تجميع متوسط-مرتفع، غيره مرتفع. التشغيل والمخاطر: تجميع متوسط وغيره مرتفع. القيمة والأثر مرتفعة.</B>
              <B>النجاح: عقود، كوادر وتدريب، تسويق وهوامش.</B>
            </MiniCard>
          </Col>

          {/* 12. التوصية والختام */}
          <Col span={3}>
            <MiniCard title="التوصية والختام" accent>
              <B>البدء بالتجميع والفرز أولًا ثم التوسع. تأمين التمويل والتراخيص ودراسة السوق وعقود.</B>
              <P bold>من مخلفات المجازر نصنع قيمة لمستقبل أكثر استدامة. شكرًا لحسن استماعكم.</P>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <div style={{ width: 36, height: 24, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                  <Img src="https://images.unsplash.com/photo-1768213470228-995720632f58?auto=format&fit=crop&w=200&q=80" alt="أحواض دباغة الجلود في المدبغة" />
                </div>
                <span style={{ fontSize: fs.compact, color: c.textMuted || c.text }}>صورة: منتجات جلدية.</span>
              </div>
            </MiniCard>
          </Col>
        </Grid>
      </div>
    </Page>
  );
}
