// رسالة الصفحة في جملة واحدة: خمسة مخاطر من نقص الكميات إلى الالتزامات القانونية يقابل كل منها إجراء حد عملي.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { ShieldAlert, AlertTriangle, PackageX, TrendingDown, Clock, Scale } from 'lucide-react';

function Band({ n, title }) {
  const { fs, sp, c, dims, lhHeading } = useDS();
  return (
    <div
      style={{
        background: c.brand,
        marginInlineStart: -dims.marginX,
        marginInlineEnd: -dims.marginX,
        marginBlockStart: -dims.marginY,
        paddingInlineStart: dims.marginX,
        paddingInlineEnd: dims.marginX,
        paddingBlock: sp(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: sp(3),
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <h1 style={{ fontSize: fs.h2, fontWeight: 700, color: '#FFFFFF', lineHeight: lhHeading, margin: 0 }}>{title}</h1>
      <span
        style={{
          width: sp(5),
          height: sp(5),
          flexShrink: 0,
          borderRadius: sp(5),
          background: c.accent,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fs.h3,
          fontWeight: 700
        }}
      >
        <bdi>{n}</bdi>
      </span>
    </div>
  );
}

function RiskCard({ title, body, icon: IconComp, bar }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();
  return (
    <div
      style={{
        background: c.card || '#FFFFFF',
        borderRadius: sp(2),
        border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
        borderInlineStart: `4px solid ${bar}`,
        boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
        paddingBlock: sp(1.5),
        paddingInline: sp(2),
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-start',
        gap: sp(1.5)
      }}
    >
      <span
        style={{
          width: sp(4),
          height: sp(4),
          borderRadius: sp(1.5),
          background: c.surface,
          color: bar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <IconComp size={15} />
      </span>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: fs.caption, fontWeight: 700, color: bar, lineHeight: lhHeading, margin: 0 }}>
          {title}
        </h2>
        <p style={{ fontSize: fs.caption, color: c.text, lineHeight: lhBody, margin: 0, marginBlockStart: 2 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

export default function Page35({ pageNo, total }) {
  const { fs, sp, c, series, lhBody, lhHeading } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band n="13" title="المخاطر وطرق الحد منها" />

      {/* شبكة منظمة: المخاطر يمين + بطاقة صورة عمودية بنسبة سليمة يسارًا */}
      <div
        style={{
          marginBlockStart: sp(2),
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '7.5fr 4.5fr',
          gap: sp(2),
          alignItems: 'stretch'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: sp(2), minWidth: 0, height: '100%' }}>
          <Grid gap={2}>
            <Col span={6}>
              <RiskCard
                title="نقص الكميات"
                body="عقود توريد مع أكثر من مجزر وخطة بديلة للموردين."
                icon={PackageX}
                bar={series[3]}
              />
            </Col>
            <Col span={6}>
              <RiskCard
                title="تلف الجلود"
                body="فرز سريع، وتدريب العاملين، ومراقبة التخزين والحفظ."
                icon={AlertTriangle}
                bar={c.accent}
              />
            </Col>
            <Col span={6}>
              <RiskCard
                title="تقلب الأسعار"
                body="عروض شراء وبيع دورية، وعقود تحدد الجودة وآلية التسعير."
                icon={TrendingDown}
                bar={series[0]}
              />
            </Col>
            <Col span={6}>
              <RiskCard
                title="تأخر التحصيل"
                body="حدود ائتمانية للعملاء، وجدول تحصيل، ومخصص لرأس المال العامل."
                icon={Clock}
                bar={series[2]}
              />
            </Col>
            <Col span={12}>
              <RiskCard
                title="مخاطر قانونية وبيئية"
                body="مراجعة التراخيص، والتصنيف القانوني، واشتراطات النقل والتخزين والتخلص من المخلفات."
                icon={Scale}
                bar={c.primary}
              />
            </Col>
          </Grid>
          <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.75, lineHeight: lhBody, textAlign: 'end' }}>
            (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
          </div>
        </div>

        {/* بطاقة صورة عمودية بنسبة 4/5 — تمنع القص البانورامي */}
        <div
          style={{
            position: 'relative',
            borderRadius: sp(2),
            overflow: 'hidden',
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            background: c.surface,
            minHeight: 0
          }}
        >
          <Img
            priority
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=640&q=80"
            alt="موقع إنشائي يطبق إجراءات السلامة والحد من مخاطر التشغيل"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(21,60,45,0.05) 0%, rgba(21,60,45,0.72) 100%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: sp(2),
              insetInlineStart: sp(2),
              insetInlineEnd: sp(2),
              display: 'flex',
              alignItems: 'center',
              gap: sp(1.5),
              background: 'rgba(255,255,255,0.94)',
              borderRadius: sp(1.5),
              paddingBlock: sp(1.5),
              paddingInline: sp(2)
            }}
          >
            <ShieldAlert size={16} color={c.accent} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary, lineHeight: lhHeading }}>
              كل خطر يقابله إجراء حد عملي موثق
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
}
