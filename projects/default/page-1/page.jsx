import { Page } from '@ds/index.js';

export default function Page01({ pageNo = 1, total = 1 }) {
  return (
    <Page pageNo={pageNo} total={total} footer={false}>
      <div dir="rtl" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, Tahoma, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 720, padding: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: 1, color: '#6b7280', marginBottom: 10 }}>PDF STUDIO • DEFAULT PROJECT</div>
          <h1 style={{ margin: '0 0 12px', fontSize: 34, lineHeight: 1.25, color: '#111827' }}>المشروع الافتراضي جاهز</h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
            تم إنشاء هذا المشروع تلقائيًا لأنه لا توجد مشاريع. عدّل <code>style.md</code> أولًا، ثم حدّث هذه الصفحة حسب متطلباتك.
          </p>
        </div>
      </div>
    </Page>
  );
}
