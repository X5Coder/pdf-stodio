// رسالة الصفحة في جملة واحدة: السوق واضح (مجازر تورد ومدابغ تشتري) لكن الاستثمار مشروط بأربع تحققات مسبقة.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Truck, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
          background: '#3B82F6',
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

function Disclaimer() {
  const { fs, c, lhBody } = useDS();
  return (
    <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, opacity: 0.75, lineHeight: lhBody, textAlign: 'end' }}>
      (الأرقام افتراضية وتحتاج إلى التحقق السوقي – دراسة مبدئية)
    </div>
  );
}

const BEFORE = [
  'حصر عدد المجازر والكميات الشهرية المتاحة.',
  'الحصول على عروض شراء فعلية من العملاء.',
  'اختبار درجات الجودة وأسعار كل فئة.',
  'تحديد تكلفة النقل والحفظ وفترة التحصيل.'
];

export default function Page26({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="5"
        title={
          <>
            <bdi>5.</bdi> الدراسة السوقية والتسويقية
          </>
        }
      />

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          <Col span={4}>
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `4px solid ${c.primary}`,
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <Truck size={18} color={c.primary} />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>الموردون</h2>
              </div>
              <p style={{ fontSize: fs.small, color: c.text, lineHeight: lhBody, margin: 0 }}>
                المجازر الحكومية والخاصة المرخصة، بعقود أو آليات توريد موثقة.
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
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <Store size={18} color='#3B82F6' />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: '#3B82F6', margin: 0 }}>العملاء</h2>
              </div>
              <p style={{ fontSize: fs.small, color: c.text, lineHeight: lhBody, margin: 0 }}>
                المدابغ ومصانع المنتجات الجلدية والتجار المتخصصون.
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
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <ShieldCheck size={18} color={c.primary} />
                <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, margin: 0 }}>ميزة تنافسية</h2>
              </div>
              <p style={{ fontSize: fs.small, color: c.text, lineHeight: lhBody, margin: 0 }}>
                تصنيف واضح، جودة حفظ، وزن دقيق، انتظام التوريد وإمكانية التتبع.
              </p>
            </div>
          </Col>
        </Grid>
      </div>

      <div style={{ marginBlockStart: sp(3) }}>
        <Grid gap={3}>
          <Col span={7}>
            <div
              style={{
                background: c.surface,
                borderRadius: sp(3),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                padding: sp(3),
                height: '100%',
                boxSizing: 'border-box'
              }}
            >
              <h2 style={{ fontSize: fs.h3, fontWeight: 700, color: c.primary, lineHeight: lhHeading, margin: 0, marginBlockEnd: sp(2) }}>
                قبل الاستثمار
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
                {BEFORE.map((t) => (
                  <div key={t} style={{ display: 'flex', gap: sp(2), alignItems: 'center', fontSize: fs.small, color: c.text, lineHeight: lhBody }}>
                    <CheckCircle2 size={16} color='#3B82F6' style={{ flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col span={5}>
            <div
              style={{
                position: 'relative',
                borderRadius: sp(3),
                overflow: 'hidden',
                height: '100%',
                minHeight: 180,
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)'
              }}
            >
              <Img
                src="https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=600&q=80"
                alt="المصانع والمدابغ وعقود التوريد التجاري"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(21,60,45,0.75) 100%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: sp(2), insetInlineStart: sp(3), color: '#FFFFFF', fontSize: fs.caption, fontWeight: 600 }}>
                تكامل سلاسل التوريد بين المجازر والمدابغ
              </div>
            </div>
          </Col>
        </Grid>
      </div>

      <div style={{ marginBlockStart: sp(2) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
