import { Page } from '@ds/index.js';

const C = {
  black: '#121212',
  gold: '#B8913A',
  beige: '#F3EBDA',
  text: '#2E2A22',
  goldSoft: '#D8C595',
  goldDark: '#8C6D2B',
  white: '#FFFFFF',
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
  return (
    <Page pageNo={pageNo} total={total} footer={false}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: C.white,
          color: C.text,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', paddingTop: 4, paddingBottom: 10 }}>
          <div
            style={{
              color: C.gold,
              fontSize: 14,
              letterSpacing: '1px',
              marginBottom: 6,
              fontWeight: 400,
            }}
          >
            GRADUATION PROJECT • 2026
          </div>
        </div>
        <div style={{ height: 4, background: C.gold, width: '100%', flexShrink: 0 }} />

        <div style={{ padding: '22px 24px 10px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.black, marginBottom: 8 }}>
            اسم المشروع :
          </div>
          <h1
            style={{
              margin: 0,
              color: C.black,
              fontSize: 34,
              lineHeight: 1.45,
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

        <div style={{ height: 1, background: C.goldSoft, margin: '14px 0 0 0', flexShrink: 0 }} />

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1.55fr 1fr',
            gap: 0,
            marginTop: 16,
          }}
        >
          <div
            style={{
              padding: '0 18px 0 22px',
              borderLeft: `2px solid ${C.gold}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
                color: C.black,
                borderBottom: `1px solid ${C.gold}`,
                paddingBottom: 6,
                marginBottom: 14,
              }}
            >
              عمل الطلاب :
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 18,
                rowGap: 10,
                alignContent: 'start',
              }}
            >
              {students.map((name) => (
                <div
                  key={name}
                  style={{
                    fontSize: 17,
                    color: C.text,
                    lineHeight: 1.4,
                    textAlign: 'center',
                  }}
                >
                  <span style={{ color: C.gold }}>&#9670;</span>&nbsp; {name}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '0 22px 0 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '100%', maxWidth: 360 }}>
              <div
                style={{
                  background: C.beige,
                  borderTop: `2px solid ${C.gold}`,
                  borderBottom: `2px solid ${C.gold}`,
                  padding: '18px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: C.gold, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                  تحت إشراف دكتور :
                </div>
                <div
                  style={{
                    color: C.black,
                    fontSize: 28,
                    fontWeight: 700,
                    fontFamily: "'Sakkal Majalla', 'Traditional Arabic', Arial, Tahoma, sans-serif",
                  }}
                >
                  شيماء سعيد
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  textAlign: 'center',
                  color: C.goldDark,
                  fontSize: 13,
                }}
              >
                مشروع تخرج • صفحة 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
