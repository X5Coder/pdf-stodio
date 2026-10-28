import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { PAGES } from './pages/index.js';
import { PDF_CONFIG } from './config.js';
import { useDS } from './ds/index.js';
import { exportAllPagesToPdf } from './utils/exportPdf.js';

// ألوان الشل للمعاينة فقط — لا تدخل الـ PDF (التصدير يلتقط عناصر .pdf-page فقط).
const SHELL_BG = '#2b2f36';
const BAR_BG = '#1c1f24';

function TopBar({ current, total, onExport }) {
  const { fs, sp } = useDS();
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const go = (n) => {
    if (n >= 1 && n <= total) nav(`/p/${n}`);
  };

  return (
    <header
      className="pm-topbar"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        paddingBlock: 5,
        paddingInline: 12,
        background: BAR_BG,
        color: '#fff',
        fontSize: fs.caption,
        minHeight: 38,
        borderBottom: '1px solid #ffffff14'
      }}
    >
      <strong className="pm-title">{PDF_CONFIG.title}</strong>
      <span style={{ opacity: 0.8 }}>
        <bdi>
          {current} / {total}
        </bdi>
      </span>
      <span className="pm-actions">
      <button onClick={() => go(current - 1)} disabled={current <= 1} style={btnStyle}>
        السابق
      </button>
      <button onClick={() => go(current + 1)} disabled={current >= total} style={btnStyle}>
        التالي
      </button>
      <button
        onClick={async () => {
          setBusy(true);
          try {
            await onExport();
          } finally {
            setBusy(false);
          }
        }}
        style={{ ...btnStyle, fontWeight: 700, background: '#E69F00', borderColor: '#E69F00', color: '#1c1f24' }}
      >
        {busy ? 'جارٍ التصدير…' : 'تصدير PDF'}
      </button>
      </span>
    </header>
  );
}

const btnStyle = {
  background: 'transparent',
  color: '#fff',
  border: '1px solid #ffffff2e',
  borderRadius: 6,
  paddingBlock: 3,
  paddingInline: 10,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 1.6
};

// ملء الشاشة: تصغير أو تكبير لتناسب المساحة (عرض فقط — التصدير دائماً بالمقاس الحقيقي).
function useFitScale(w, h) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const availW = window.innerWidth - 32; // = main paddingInline (16×2)
      const availH = window.innerHeight - 100; // الشريط العلوي + حشو المعاينة
      setS(Math.max(0.2, Math.min(2, availW / w, availH / h)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h]);
  return s;
}

// ملء العرض فقط (لعرض كل الصفحات على الهاتف): تصغير ليناسب عرض الشاشة.
function useFitWidth(w) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const availW = window.innerWidth - 32;
      setS(Math.max(0.2, Math.min(1, availW / w)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w]);
  return s;
}

// عرض صفحة واحدة — تنقل بالضغط يمين/شمال والأسهم
function SinglePageView() {
  const { dims } = useDS();
  const { num } = useParams();
  const nav = useNavigate();
  const total = PAGES.length;
  const current = Math.max(1, Math.min(total, parseInt(num ?? '1', 10) || 1));
  const PageComp = PAGES[current - 1];
  const s = useFitScale(dims.w, dims.h);

  const next = useCallback(() => {
    if (current < total) nav(`/p/${current + 1}`);
  }, [current, total, nav]);
  const prev = useCallback(() => {
    if (current > 1) nav(`/p/${current - 1}`);
  }, [current, nav]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next(); // اليمين = التالي
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const onStageClick = (e) => {
    const x = e.clientX;
    const w = window.innerWidth;
    if (x > w * 0.6) next();
    else if (x < w * 0.4) prev();
  };

  return (
    <div style={{ minHeight: '100vh', background: SHELL_BG }} dir={PDF_CONFIG.dir}>
      <TopBar
        current={current}
        total={total}
        onExport={async () => {
          // التصدير يتم دائماً من مسار /export المخصص: القالب كاملاً كصورة واحدة
          nav(`/export?run=1&from=/p/${current}`);
        }}
      />
      <main
        onClick={onStageClick}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingBlock: 24,
          paddingInline: 16,
          overflow: 'auto',
          cursor: 'pointer'
        }}
      >
        <div
          // ltr هنا لشل المعاينة فقط: يثبّت العنصر الداخلي على الحافة اليسرى
          // لتتوافق مع transform-origin، ومحتوى الصفحة نفسها يبقى rtl من الداخل.
          dir="ltr"
          style={{
            width: dims.w * s,
            height: dims.h * s,
            flexShrink: 0,
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(0,0,0,.45)'
          }}
        >
          <div
            style={{
              width: dims.w,
              height: dims.h,
              transform: `scale(${s})`,
              transformOrigin: 'top left'
            }}
          >
            <PageComp pageNo={current} total={total} />
          </div>
        </div>
      </main>
    </div>
  );
}

// عرض كل الصفحات بمقاسها الحقيقي — للمراجعة والتصدير (الصور فقط للـ PDF)
function AllPagesView() {
  const { dims } = useDS();
  const total = PAGES.length;
  const nav = useNavigate();
  const s = useFitWidth(dims.w);

  return (
    <div style={{ minHeight: '100vh', background: SHELL_BG }} dir={PDF_CONFIG.dir}>
      <TopBar
        current={total}
        total={total}
        onExport={() => nav('/export?run=1&from=/all')}
      />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, paddingBlock: 32, paddingInline: 16 }}>
        {PAGES.map((PageComp, i) => (
          <div key={i} dir="ltr" style={{ width: dims.w * s, height: dims.h * s, flexShrink: 0, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,.45)' }}>
            <div style={{ width: dims.w, height: dims.h, transform: `scale(${s})`, transformOrigin: 'top left' }}>
              <PageComp pageNo={i + 1} total={total} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

// عرض مخصص للتصدير فقط: الصفحات بمقاسها الحقيقي وبدون أي واجهة
// (لا شريط علوي ولا ظلال) — الالتقاط يأخذ عناصر .pdf-page فقط،
// فكل صفحة PDF = صورة واحدة للقالب كاملاً ولا شيء غيره.
function ExportView() {
  const total = PAGES.length;
  const [params] = useSearchParams();
  const nav = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (params.get('run') !== '1' || started.current) return;
    started.current = true;
    (async () => {
      try {
        await exportAllPagesToPdf({ fileName: `${PDF_CONFIG.title}.pdf` });
      } finally {
        nav(params.get('from') ?? '/all', { replace: true });
      }
    })();
  }, [params, nav]);

  return (
    <div style={{ background: '#ffffff' }} dir={PDF_CONFIG.dir}>
      {PAGES.map((PageComp, i) => (
        <PageComp key={i} pageNo={i + 1} total={total} />
      ))}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.title = PDF_CONFIG.title;
    document.documentElement.lang = PDF_CONFIG.lang;
    document.documentElement.dir = PDF_CONFIG.dir;
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SinglePageView />} />
        <Route path="/p/:num" element={<SinglePageView />} />
        <Route path="/all" element={<AllPagesView />} />
        <Route path="/export" element={<ExportView />} />
      </Routes>
    </BrowserRouter>
  );
}
