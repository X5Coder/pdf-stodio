import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { getPages } from './pages/index.js';
import { getCurrentProject, getProjectDefaults } from './config.js';
import { useDS, DSProvider } from './ds/index.js';
import { exportAllPagesToPdf } from './utils/exportPdf.js';
import { loadProjects, loadProjectConfig } from './utils/projectLoader.js';
import { ChevronRight, ChevronLeft, FolderOpen, Download, FileDown } from 'lucide-react';

// ألوان الشل للمعاينة فقط — لا تدخل الـ PDF (التصدير يلتقط عناصر .pdf-page فقط).
const SHELL_BG = '#0a0a0a';
const BAR_BG = '#0a0a0a';
const BAR_BORDER = '#1a1a1a';
const BAR_HOVER = '#1f1f1f';

function TopBar({ current, total, onExport, projectConfig, projects, onProjectChange, activeProjectId }) {
  const [busy, setBusy] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const menuRef = useRef(null);
  const nav = useNavigate();

  const go = (n) => {
    if (n >= 1 && n <= total) nav(`/p/${n}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProjectMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent copy
  const handleCopy = (e) => {
    e.preventDefault();
  };

  const navBtn = (disabled) => ({
    ...iconBtnStyle,
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 8,
    border: `1px solid ${BAR_BORDER}`,
    background: 'transparent',
    color: '#ffffff',
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease'
  });

  return (
    <header
      className="pm-topbar"
      onClick={(e) => e.stopPropagation()}
      onCopy={handleCopy}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        paddingBlock: 6,
        paddingInline: 12,
        background: BAR_BG,
        color: '#ffffff',
        fontSize: '13px',
        minHeight: 40,
        borderBottom: `1px solid ${BAR_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <div className="pm-brand" title="PDF Studio" aria-label="PDF Studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <img src="/favicon.svg" alt="" width="20" height="20" style={{ display: 'block', borderRadius: 5 }} />
          <span className="pm-brand-text" style={{ fontSize: '11px', fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.1px', whiteSpace: 'nowrap' }}>PDF Studio</span>
        </div>
        <div className="pm-sep" style={{ width: 1, height: 16, background: BAR_BORDER, flexShrink: 0 }} />
        <div style={{ position: 'relative', minWidth: 0 }} ref={menuRef}>
          <button
            className="pm-project-btn"
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            title="اختيار المشروع"
            style={{
              ...iconBtnStyle,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              paddingInline: 8,
              paddingBlock: 5,
              borderRadius: 8,
              border: `1px solid ${showProjectMenu ? '#3B82F6' : BAR_BORDER}`,
              background: showProjectMenu ? BAR_HOVER : '#121212',
              color: '#ffffff',
              transition: 'all 0.15s ease',
              fontWeight: 500,
              maxWidth: 220,
              minWidth: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = BAR_HOVER;
              e.currentTarget.style.borderColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = showProjectMenu ? BAR_HOVER : '#121212';
              e.currentTarget.style.borderColor = showProjectMenu ? '#3B82F6' : BAR_BORDER;
            }}
          >
            <span
              className="pm-project-icon"
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: '#1f1f1f',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <FolderOpen size={13} color="#93C5FD" />
            </span>
            <span
              className="pm-title"
              style={{ fontSize: '12px', fontWeight: 600, color: '#f3f4f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {projectConfig?.name?.substring(0, 22) || 'تحميل...'}
            </span>
            <ChevronLeft
              className="pm-project-caret"
              size={12}
              color="#9ca3af"
              style={{ flexShrink: 0, transform: showProjectMenu ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}
            />
          </button>
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              background: '#111111',
              border: `1px solid ${BAR_BORDER}`,
              borderRadius: 10,
              padding: 4,
              minWidth: 210,
              boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
              opacity: showProjectMenu ? 1 : 0,
              transform: showProjectMenu ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
              transformOrigin: 'top right',
              transition: 'all 0.15s ease',
              pointerEvents: showProjectMenu ? 'auto' : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '10px', color: '#6b7280', padding: '6px 8px 4px', fontWeight: 600 }}>المشاريع</div>
            {projects.map((proj) => {
              const active = proj.id === activeProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    onProjectChange(proj.id);
                    setShowProjectMenu(false);
                  }}
                  style={{
                    ...iconBtnStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    justifyContent: 'flex-start',
                    textAlign: 'right',
                    paddingBlock: 7,
                    paddingInline: 8,
                    marginBottom: 2,
                    borderRadius: 7,
                    background: active ? 'rgba(59,130,246,0.16)' : 'transparent',
                    color: active ? '#93C5FD' : '#d1d5db',
                    transition: 'all 0.12s ease',
                    fontWeight: active ? 600 : 500,
                    border: active ? '1px solid rgba(59,130,246,0.35)' : '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = '#1a1a1a';
                      e.currentTarget.style.borderColor = '#222';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <FolderOpen size={13} color={active ? '#93C5FD' : '#6b7280'} />
                  <span style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{proj.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        <span
          className="pm-page-count"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2px',
            color: '#9ca3af',
            background: '#121212',
            border: `1px solid ${BAR_BORDER}`,
            borderRadius: 999,
            padding: '3px 8px',
            lineHeight: 1.4,
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <bdi>{current} / {total}</bdi>
        </span>
      </div>
      <div className="pm-actions" style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <button
          className="pm-nav-btn"
          onClick={() => go(current - 1)}
          disabled={current <= 1}
          title="السابق"
          style={navBtn(current <= 1)}
          onMouseEnter={(e) => { if (current > 1) { e.currentTarget.style.background = BAR_HOVER; e.currentTarget.style.borderColor = '#2a2a2a'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BAR_BORDER; }}
        >
          <ChevronRight size={16} color="#ffffff" />
        </button>
        <button
          className="pm-nav-btn"
          onClick={() => go(current + 1)}
          disabled={current >= total}
          title="التالي"
          style={navBtn(current >= total)}
          onMouseEnter={(e) => { if (current < total) { e.currentTarget.style.background = BAR_HOVER; e.currentTarget.style.borderColor = '#2a2a2a'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BAR_BORDER; }}
        >
          <ChevronLeft size={16} color="#ffffff" />
        </button>
        <div className="pm-sep" style={{ width: 1, height: 18, background: BAR_BORDER, marginInline: 2 }} />
        <button
          className="pm-export-btn"
          onClick={async () => {
            setBusy(true);
            try {
              await onExport();
            } finally {
              setBusy(false);
            }
          }}
          title="تنزيل PDF"
          style={{
            ...iconBtnStyle,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            height: 30,
            paddingInline: 10,
            borderRadius: 8,
            border: '1px solid rgba(239,68,68,0.45)',
            background: busy ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.16)',
            color: '#FCA5A5',
            transition: 'all 0.15s ease',
            fontWeight: 600,
            fontSize: '11px',
            cursor: busy ? 'wait' : 'pointer',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            if (!busy) {
              e.currentTarget.style.background = 'rgba(239,68,68,0.26)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.65)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = busy ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.16)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.45)';
          }}
        >
          {busy ? (
            <span style={{ width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 1s linear infinite', fontSize: 12 }}>⏳</span>
          ) : (
            <FileDown size={14} color="#FCA5A5" />
          )}
          <span className="pm-export-label">PDF</span>
        </button>
      </div>
    </header>
  );
}

const iconBtnStyle = {
  background: 'transparent',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: 8,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'inherit',
  fontSize: 'inherit'
};

// معاينة موحدة بدون سكرول: كل الاتجاهات تُلائم الشاشة، والعرضية تتساوى بصريًا بين المشاريع.
function usePreviewScale(w, h, orientation = 'landscape', offsetH = 76) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const availW = window.innerWidth - 32;
      const availH = window.innerHeight - offsetH;
      const orient = orientation || (w >= h ? 'landscape' : 'portrait');
      if (orient === 'portrait') {
        setS(Math.max(0.2, Math.min(2, availW / w, availH / h)));
      } else {
        // مرجع موحد لكل المشاريع العرضية حتى تتساوى مساحة المعاينة بصريًا
        const refW = 1280;
        const refH = 720;
        setS(Math.max(0.2, Math.min(2, availW / refW, availH / refH)));
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h, orientation, offsetH]);
  return s;
}

function useFitWidth(w, h, orientation = 'landscape') {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const availW = window.innerWidth - 32;
      const orient = orientation || (w >= h ? 'landscape' : 'portrait');
      if (orient === 'portrait') {
        setS(Math.max(0.2, Math.min(1, availW / w))); // يحافظ على الحجم الحقيقي قدر الإمكان بدون تجاوز العرض
      } else {
        setS(Math.max(0.2, Math.min(1, availW / 1280))); // عرض موحد للمشاريع العرضية
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h, orientation]);
  return s;
}

// عرض صفحة واحدة — تنقل بالضغط يمين/شمال والأسهم
function SinglePageView({ projectConfig, projects, onProjectChange, activeProjectId, pages, onExport }) {
  const { dims } = useDS();
  const { num } = useParams();
  const nav = useNavigate();
  const total = pages.length;
  const current = Math.max(1, Math.min(total, parseInt(num ?? '1', 10) || 1));
  const PageComp = pages[current - 1];
  const orientation = projectConfig?.orientation || (dims.w >= dims.h ? 'landscape' : 'portrait');
  const s = usePreviewScale(dims.w, dims.h, orientation);

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
    <div
      style={{
        height: '100dvh',
        minHeight: '100vh',
        background: SHELL_BG,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      dir={projectConfig?.dir || 'rtl'}
    >
      <TopBar
        current={current}
        total={total}
        onExport={onExport}
        projectConfig={projectConfig}
        projects={projects}
        onProjectChange={onProjectChange}
        activeProjectId={activeProjectId}
      />
      <main
        onClick={onStageClick}
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBlock: 16,
          paddingInline: 16,
          overflow: 'hidden',
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
            borderRadius: 16,
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
function AllPagesView({ projectConfig, projects, onProjectChange, activeProjectId, pages, onExport }) {
  const { dims } = useDS();
  const total = pages.length;
  const nav = useNavigate();
  const orientation = projectConfig?.orientation || (dims.w >= dims.h ? 'landscape' : 'portrait');
  const s = useFitWidth(dims.w, dims.h, orientation);

  return (
    <div style={{ minHeight: '100vh', background: SHELL_BG }} dir={projectConfig?.dir || 'rtl'}>
      <TopBar
        current={total}
        total={total}
        onExport={onExport}
        projectConfig={projectConfig}
        projects={projects}
        onProjectChange={onProjectChange}
        activeProjectId={activeProjectId}
      />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, paddingBlock: 32, paddingInline: 16, overflow: 'hidden' }}>
        {pages.map((PageComp, i) => (
          <div key={i} dir="ltr" style={{ width: dims.w * s, height: dims.h * s, flexShrink: 0, overflow: 'hidden', borderRadius: 16, boxShadow: '0 12px 48px rgba(0,0,0,.45)' }}>
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
// التصدير: عرض القالب/الصفحات فقط بدون واجهة معاينة فوقها.
function ExportView({ projectConfig, pages }) {
  const total = pages.length;
  const [params] = useSearchParams();
  const nav = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (params.get('run') !== '1' || started.current) return;
    started.current = true;
    (async () => {
      try {
        await exportAllPagesToPdf({
          fileName: `${projectConfig?.name || 'document'}.pdf`,
        });
        await new Promise((r) => setTimeout(r, 250));
      } catch (e) {
        console.error(e);
        await new Promise((r) => setTimeout(r, 600));
      } finally {
        nav(params.get('from') ?? '/all', { replace: true });
      }
    })();
  }, [params, nav, projectConfig]);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', margin: 0, padding: 0 }} dir={projectConfig?.dir || 'rtl'}>
      {pages.map((PageComp, i) => (
        <PageComp key={i} pageNo={i + 1} total={total} />
      ))}
    </div>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [projectConfig, setProjectConfig] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(getCurrentProject());
  const [switching, setSwitching] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exporting, setExporting] = useState(false);
  const pages = getPages(currentProjectId);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    loadProjects().then(setProjects);
  }, []);

  useEffect(() => {
    loadProjectConfig(currentProjectId).then((config) => {
      if (config) {
        setProjectConfig(config);
        document.title = config.name ? `${config.name} — PDF Studio` : 'PDF Studio';
        const description = config.description
          ? String(config.description).slice(0, 160)
          : (config.name ? `معاينة وتصدير مشروع "${config.name}" بصيغة PDF عبر PDF Studio.` : 'PDF Studio — معاينة وتصميم وتصدير صفحات PDF ضمن مشاريع منظمة.');
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.documentElement.lang = config.lang || 'ar';
        document.documentElement.dir = config.dir || 'rtl';
      }
    });
  }, [currentProjectId]);

  const handleProjectChange = (projectId) => {
    if (projectId === currentProjectId || switching) return;
    setSwitching(true);
    setTimeout(() => {
      localStorage.setItem('pdf-studio-active-project', projectId);
      window.location.href = '/';
    }, 220);
  };

  const handleCopy = (e) => {
    e.preventDefault();
  };

  const exportHostRef = useRef(null);

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 180));
      await exportAllPagesToPdf({
        fileName: `${projectConfig?.name || 'document'}.pdf`,
        root: exportHostRef.current || undefined,
      });
      await new Promise((r) => setTimeout(r, 120));
    } finally {
      setExporting(false);
    }
  };

  const defaults = getProjectDefaults(currentProjectId);
  const dsConfig = projectConfig
    ? { ...defaults, ...projectConfig }
    : defaults;

  const visible = entered && !switching;

  return (
    <div onCopy={handleCopy} onCut={handleCopy} style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px) scale(1)' : 'translateY(6px) scale(0.995)',
          transition: 'opacity 220ms ease, transform 220ms ease',
          minHeight: '100vh'
        }}
      >
        <DSProvider config={dsConfig}>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={
                <SinglePageView
                  projectConfig={projectConfig}
                  projects={projects}
                  onProjectChange={handleProjectChange}
                  activeProjectId={currentProjectId}
                  pages={pages}
                  onExport={handleExport}
                />
              }
            />
            <Route
              path="/p/:num"
              element={
                <SinglePageView
                  projectConfig={projectConfig}
                  projects={projects}
                  onProjectChange={handleProjectChange}
                  activeProjectId={currentProjectId}
                  pages={pages}
                  onExport={handleExport}
                />
              }
            />
            <Route
              path="/all"
              element={
                <AllPagesView
                  projectConfig={projectConfig}
                  projects={projects}
                  onProjectChange={handleProjectChange}
                  activeProjectId={currentProjectId}
                  pages={pages}
                  onExport={handleExport}
                />
              }
            />
            <Route
              path="/export"
              element={
                <ExportView
                  projectConfig={projectConfig}
                  pages={pages}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </DSProvider>
      {exporting && typeof document !== 'undefined' && createPortal(
        <div ref={exportHostRef} style={{ position: 'fixed', left: 0, top: 0, transform: 'translateX(-200vw)', width: 'max-content', height: 'max-content', overflow: 'visible', pointerEvents: 'none', zIndex: -1 }} aria-hidden="true">
          <DSProvider config={dsConfig}>
            {pages.map((PageComp, i) => (
              <PageComp key={i} pageNo={i + 1} total={pages.length} />
            ))}
          </DSProvider>
        </div>,
        document.body
      )}
      </div>
    </div>
  );
}
