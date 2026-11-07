// رسالة الصفحة في جملة واحدة: مدير المركز يقود خمس وحدات قابلة للدمج مبدئيًا مع الفصل بين اعتماد المشتريات ومراجعة الحسابات.

import { Page, useDS, Img } from '@ds/index.js';
import { User, Users, PackageCheck, Archive, ShoppingBag, Calculator, ShieldCheck } from 'lucide-react';

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

const UNITS = [
  { t: 'الاستلام والفرز', d: 'عمال / فنيون', icon: PackageCheck },
  { t: 'المخازن والحفظ', d: 'مسؤول مخزون', icon: Archive },
  { t: 'التسويق والمبيعات', d: 'مسؤول تعاقدات', icon: ShoppingBag, accent: true },
  { t: 'الحسابات والإدارة', d: 'إداري / محاسب', icon: Calculator },
  { t: 'الجودة والتتبع', d: 'مسؤول جودة', icon: ShieldCheck }
];

export default function Page30({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <Band
        n="7"
        title={
          <>
            <bdi>7.</bdi> الهيكل التنظيمي المقترح
          </>
        }
      />

      <div style={{ marginBlockStart: sp(3) }}>
        {/* صندوق مدير المركز */}
        <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: sp(3), alignItems: 'stretch' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: sp(3),
              overflow: 'hidden',
              minHeight: 96,
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              boxShadow: '0 8px 20px -2px rgba(15, 34, 25, 0.15)'
            }}
          >
            <Img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80"
              alt="فريق العمل وإدارة المركز"
              style={{ objectPosition: 'center 25%' }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(21,60,45,0.45) 100%)'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              background: c.brand,
              color: '#FFFFFF',
              borderRadius: sp(3),
              paddingBlock: sp(2),
              paddingInline: sp(6),
              display: 'flex',
              alignItems: 'center',
              gap: sp(2),
              boxShadow: '0 8px 20px -2px rgba(15, 34, 25, 0.2)'
            }}
          >
            <User size={22} color={'#60A5FA' || '#60A5FA'} />
            <div>
              <div style={{ fontSize: fs.h3, fontWeight: 700, lineHeight: lhHeading }}>مدير المركز</div>
              <div style={{ fontSize: fs.caption, opacity: 0.85 }}>القيادة والإشراف العام وإدارة العمليات</div>
            </div>
          </div>
          </div>
        </div>

        {/* خط الربط الشجري */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ width: 2, height: sp(3), background: '#3B82F6' }} />
        </div>
        <div aria-hidden="true" style={{ height: 2, background: '#3B82F6', marginInline: '8%', borderRadius: 1 }} />

        {/* الوحدات الخمس */}
        <div style={{ display: 'flex', gap: sp(2), alignItems: 'stretch', marginBlockStart: 0 }}>
          {UNITS.map((u) => {
            const IconComp = u.icon;
            const bar = u.accent ? '#3B82F6' : c.primary;
            return (
              <div
                key={u.t}
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div aria-hidden="true" style={{ width: 2, height: sp(2), background: '#3B82F6' }} />
                <div
                  style={{
                    width: '100%',
                    flex: 1,
                    background: c.card || '#FFFFFF',
                    border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                    borderTop: `4px solid ${bar}`,
                    boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                    borderRadius: sp(2),
                    paddingBlock: sp(2),
                    paddingInline: sp(2),
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <span
                    style={{
                      width: sp(4),
                      height: sp(4),
                      borderRadius: sp(2),
                      background: u.accent ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                      color: bar,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBlockEnd: 2
                    }}
                  >
                    <IconComp size={16} />
                  </span>
                  <div style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, lineHeight: lhHeading }}>
                    {u.t}
                  </div>
                  <div style={{ fontSize: fs.caption, color: c.textMuted || c.text, lineHeight: lhBody, marginBlockStart: 2 }}>
                    {u.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginBlockStart: sp(4),
          background: c.surface,
          borderRadius: sp(2),
          border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
          borderInlineStart: `4px solid ${c.primary}`,
          paddingBlock: sp(2),
          paddingInline: sp(3),
          textAlign: 'center',
          fontSize: fs.small,
          fontWeight: 600,
          color: c.primary,
          lineHeight: lhBody
        }}
      >
        يمكن دمج بعض الوظائف في البداية وفق حجم النشاط، مع الفصل بين اعتماد المشتريات ومراجعة الحسابات.
      </div>

      <div style={{ marginBlockStart: sp(2) }}>
        <Disclaimer />
      </div>
    </Page>
  );
}
