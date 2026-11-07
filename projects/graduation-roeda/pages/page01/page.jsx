import { Page, useDS } from '@ds/index.js';

const C = {
  bg: '#FBFAF7',
  paper: '#FFFFFF',
  ink: '#1F2937',
  text: '#374151',
  muted: '#6B7280',
  gold: '#B89B5E',
  goldLine: '#D8C9A3',
  panel: '#F4F1EA',
  dark: '#262626',
};

const students = [
  'أسماء سيد عبد النبي',
  'رويدا أشرف فاروق حسن',
  'سلسبيل محمد خليفة عبد ربه',
  'ملك محمد كامل محمد',
  'سارة حداد حمدي خليل',
  'شهد سلامة بدر بيومي',
  'مريم إبراهيم كمال',
  'ملك عصام فاروق',
  'يمنى مصطفى كامل',
];

export default function Page01({ pageNo = 1, total = 1 }) {
  const { dims } = useDS();
  const sidePull = Math.max(0, (dims?.marginX || 0) - 18);

  return (
    <Page pageNo={pageNo} total={total} footer={false}>
      <div
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: C.bg,
          color: C.text,
          padding: '8px 4px',
          marginInline: -sidePull,
          fontFamily: 'Arial, Tahoma, sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: C.paper,
            border: `1px solid ${C.goldLine}`,
            boxSizing: 'border-box',
            padding: '18px 14px 14px 14px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ color: C.gold, fontSize: 13, fontWeight: 700, letterSpacing: '1px' }}>
              GRADUATION PROJECT • 2026
            </div>
          </div>
          <div style={{ height: 2, background: C.gold, margin: '0 24px 18px 24px' }} />

          <div style={{ textAlign: 'center', padding: '0 4px 14px 4px' }}>
            <div style={{ color: C.muted, fontSize: 18, fontWeight: 700, marginBottom: 10 }}>اسم المشروع :</div>
            <h1
              style={{
                margin: 0,
                color: C.ink,
                fontSize: 36,
                lineHeight: 1.42,
                fontWeight: 700,
                fontFamily: "'Sakkal Majalla', 'Traditional Arabic', Arial, Tahoma, sans-serif",
              }}
            >
              فاعلية استراتيجية لعب الأدوار الإلكترونية في تنمية
              <br />
              مهارات الحوار و خفض القلق اللغوي لدى
              <br />
              تلاميذ الصف الرابع الإبتدائي
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '6px 0 18px 0' }}>
            <div style={{ flex: 1, height: 1, background: C.goldLine }} />
            <div style={{ width: 7, height: 7, background: C.gold }} />
            <div style={{ flex: 1, height: 1, background: C.goldLine }} />
          </div>

          <div
            style={{
              color: C.ink,
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: `2px solid ${C.gold}`,
              textAlign: 'center',
            }}
          >
            عمل الطلاب :
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 14,
              rowGap: 10,
              alignContent: 'start',
              marginBottom: 18,
            }}
          >
            {students.map((name) => (
              <div
                key={name}
                style={{
                  color: C.text,
                  fontSize: 17,
                  lineHeight: 1.35,
                  padding: '10px 12px',
                  background: C.bg,
                  border: `1px solid ${C.goldLine}`,
                  textAlign: 'center',
                }}
              >
                {name}
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              background: C.dark,
              color: C.paper,
              padding: '18px 18px',
              textAlign: 'center',
              borderTop: `4px solid ${C.gold}`,
            }}
          >
            <div style={{ color: C.goldLine, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
              تحت إشراف دكتور :
            </div>
            <div
              style={{
                color: C.paper,
                fontSize: 34,
                fontWeight: 700,
                lineHeight: 1.2,
                fontFamily: "'Sakkal Majalla', 'Traditional Arabic', Arial, Tahoma, sans-serif",
              }}
            >
              شيماء سعيد
            </div>
          </div>

          <div style={{ marginTop: 12, textAlign: 'center', color: C.muted, fontSize: 12 }}>
            مشروع تخرج • صفحة 1
          </div>
        </div>
      </div>
    </Page>
  );
}
