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
import { loadProjects, loadProjectConfig, getStyleContent, hasStyle } from './utils/projectLoader.js';
import { ChevronRight, ChevronLeft, FolderOpen, FileDown, FileText, Plus, Trash2 } from 'lucide-react';

// ألوان الشل للمعاينة فقط — لا تدخل الـ PDF (التصدير يلتقط عناصر .pdf-page فقط).
const SHELL_BG = '#0a0a0a';
const BAR_BG = '#0a0a0a';
const BAR_BORDER = '#1a1a1a';
const BAR_HOVER = '#1f1f1f';

function TopBar({ current, total, onExport, projectConfig, projects, onProjectChange, activeProjectId, onReviewStyle, onNewProject, onDeleteProject }) {
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

  // منع النسخ خارج المحررات، مع السماح بالتحرير/التحديد داخل حقول الإدخال
  const handleCopy = (e) => {
    const t = e.target;
    const tag = t && t.tagName;
    const editable = tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable);
    if (editable) return;
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
            <div style={{ fontSize: '10px', color: '#6b7280', padding: '6px 8px 4px', fontWeight: 600, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>المشاريع</span>
              {onNewProject && <button onClick={() => { onNewProject(); setShowProjectMenu(false); }} title="مشروع جديد" style={{...iconBtnStyle, padding:2, color:'#93C5FD'}}><Plus size={13} color="#93C5FD"/></button>}
            </div>
            {projects.map((proj) => {
              const active = proj.id === activeProjectId;
              return (
                <div key={proj.id} style={{ display:'flex', alignItems:'center', gap:4, marginBottom:2 }}>
                  <button
                    onClick={() => { onProjectChange(proj.id); setShowProjectMenu(false); }}
                    style={{
                      ...iconBtnStyle,
                      display: 'flex', alignItems: 'center', gap: 8, flex:1, minWidth:0,
                      justifyContent: 'flex-start', textAlign: 'right', paddingBlock: 7, paddingInline: 8,
                      borderRadius: 7,
                      background: active ? 'rgba(59,130,246,0.16)' : 'transparent',
                      color: active ? '#93C5FD' : '#d1d5db',
                      transition: 'all 0.12s ease', fontWeight: active ? 600 : 500,
                      border: active ? '1px solid rgba(59,130,246,0.35)' : '1px solid transparent'
                    }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#222'; } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; } }}
                  >
                    <FolderOpen size={13} color={active ? '#93C5FD' : '#6b7280'} />
                    <span style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{proj.name}</span>
                  </button>
                  {onDeleteProject && (
                    <button title="حذف المشروع" onClick={(e) => { e.stopPropagation(); setShowProjectMenu(false); onDeleteProject(proj); }} style={{ ...iconBtnStyle, width:26, height:26, borderRadius:6, border:'1px solid transparent', color:'#9ca3af', flexShrink:0 }}
                      onMouseEnter={(e)=>{ e.currentTarget.style.background='rgba(239,68,68,.12)'; e.currentTarget.style.borderColor='rgba(239,68,68,.35)'; e.currentTarget.style.color='#f87171'; }}
                      onMouseLeave={(e)=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='transparent'; e.currentTarget.style.color='#9ca3af'; }}>
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
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
        <button
          className="pm-style-btn"
          onClick={() => onReviewStyle && onReviewStyle(activeProjectId)}
          title="مراجعة الستايل (style.md)"
          style={navBtn(false)}
          onMouseEnter={(e) => { e.currentTarget.style.background = BAR_HOVER; e.currentTarget.style.borderColor = '#2a2a2a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BAR_BORDER; }}
        >
          <FileText size={15} color="#ffffff" />
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
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(252,165,165,0.35)" strokeWidth="2.5" />
              <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
              </path>
            </svg>
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

function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < breakpoint : false));
  useEffect(() => {
    const on = () => setM(window.innerWidth < breakpoint);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [breakpoint]);
  return m;
}

// معاينة: على الهاتف تُلائم عرض الصفحة الفعلي (بدون سكرول أفقي) مع تمرير عمودي.
function usePreviewScale(w, h, orientation = 'landscape', offsetH = 76) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768;
      const availW = window.innerWidth - (mobile ? 16 : 32);
      const availH = window.innerHeight - offsetH;
      const orient = orientation || (w >= h ? 'landscape' : 'portrait');
      if (mobile) {
        // ملاءمة عرض الشاشة دائمًا لمنع السكرول الأفقي
        setS(Math.max(0.1, Math.min(2, availW / w)));
      } else if (orient === 'portrait') {
        setS(Math.max(0.2, Math.min(2, availW / w, availH / h)));
      } else {
        const refW = 1280;
        setS(Math.max(0.2, Math.min(2, availW / refW, availH / 720)));
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
      const mobile = window.innerWidth < 768;
      const availW = window.innerWidth - (mobile ? 16 : 32);
      if (mobile) setS(Math.max(0.1, Math.min(2, availW / w)));
      else {
        const orient = orientation || (w >= h ? 'landscape' : 'portrait');
        if (orient === 'portrait') setS(Math.max(0.2, Math.min(1, availW / w)));
        else setS(Math.max(0.2, Math.min(1, availW / 1280)));
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h, orientation]);
  return s;
}

// تحجيم لعرض الصفحة كاملة داخل الشاشة (بدون قص/سكرول)، مع توسيط
function useFitAll(w, h, topPad = 32) {
  const [s, setS] = useState(1);
  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768;
      const padX = mobile ? 16 : 32;
      const padY = topPad + (mobile ? 16 : 24);
      const topBar = 40; // تقريبي لارتفاع الشريط
      const availW = Math.max(120, window.innerWidth - padX);
      const availH = Math.max(120, window.innerHeight - topBar - padY);
      setS(Math.max(0.1, Math.min(1, availW / w, availH / h)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [w, h, topPad]);
  return s;
}

// عرض صفحة واحدة — تنقل بالأسهم (تُعرض كاملة ومُوسَّطة؛ على الهاتف صغيرة في منتصف الشاشة)
function SinglePageView({ projectConfig, projects, onProjectChange, activeProjectId, pages, onExport, onReviewStyle, onNewProject, onDeleteProject }) {
  const { dims } = useDS();
  const { num } = useParams();
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const total = pages.length;
  const current = total > 0 ? Math.max(1, Math.min(total, parseInt(num ?? '1', 10) || 1)) : 0;
  const PageComp = total > 0 ? pages[current - 1] : null;
  const s = useFitAll(dims.w, dims.h, isMobile ? 24 : 32);

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
        onReviewStyle={onReviewStyle}
        onNewProject={onNewProject}
        onDeleteProject={onDeleteProject}
      />
      <main
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          paddingTop: isMobile ? 12 : 36,
          paddingBottom: isMobile ? 12 : 16,
          paddingInline: isMobile ? 8 : 16,
          overflow: 'hidden'
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
            borderRadius: '6px',
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
            {!PageComp ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14, textAlign: 'center', background: '#111', borderRadius: 6 }}>
                <div>No pages found.<br /><span style={{ fontSize: 12, color: '#6b7280' }}>Create a project with a page, or add <code>page-1/page.jsx</code>.</span></div>
              </div>
            ) : (
              <PageComp pageNo={current} total={total || 1} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// عرض كل الصفحات (كل صفحة تُعرض كاملة بالعرض؛ تمرير طبيعي عند الحاجة)
function AllPagesView({ projectConfig, projects, onProjectChange, activeProjectId, pages, onExport, onReviewStyle, onNewProject, onDeleteProject }) {
  const { dims } = useDS();
  const total = pages.length;
  const isMobile = useIsMobile();
  // ملاءمة العرض حتى تظهر كل صفحة كاملة بدون قص أفقي
  const fitW = (() => {
    if (typeof window === 'undefined') return 1;
    const availW = Math.max(120, window.innerWidth - (isMobile ? 16 : 32));
    return Math.max(0.1, Math.min(1, availW / dims.w));
  })();
  const [s, setS] = useState(fitW);
  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768;
      const availW = Math.max(120, window.innerWidth - (mobile ? 16 : 32));
      setS(Math.max(0.1, Math.min(1, availW / dims.w)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [dims.w]);

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
        onReviewStyle={onReviewStyle}
        onNewProject={onNewProject}
        onDeleteProject={onDeleteProject}
      />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 16 : 32, paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 12 : 32, paddingInline: isMobile ? 8 : 16, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {pages.map((PageComp, i) => (
          <div key={i} dir="ltr" style={{ width: dims.w * s, height: dims.h * s, flexShrink: 0, overflow: 'hidden', borderRadius: '6px', boxShadow: '0 12px 48px rgba(0,0,0,.45)' }}>
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
  const [styleModal, setStyleModal] = useState({ open: false, phase: 'closed', projectId: null, content: '', draft: '', missing: false, mode: 'review', saving: false, status: '' });
  const [newProjectModal, setNewProjectModal] = useState({ open: false, phase: 'closed', step: 1, id: '', name: '', style: '', orientation: 'landscape', saving: false, status: '' });
  const [deleteModal, setDeleteModal] = useState({ open: false, phase: 'closed', project: null, saving: false, status: '' });
  const pages = getPages(currentProjectId);

  const defaultStyleTemplate = (pid) => `# Style — ${pid}\n\n> مصدر الستايل المعتمد. يُطبَّق على كل الصفحات. (إلزامي)\n\n## الهوية والإعدادات\n- **الاسم:** ${pid}\n- **اللغة/الاتجاه:** العربية، RTL (dir=\"rtl\", lang=\"ar\")\n- **مقاس/اتجاه الصفحة:** A4 عمودي (portrait) أو عرضي (landscape)\n- **الثيم/الألوان:** \n\n## الخطوط\n- عام: fonts/\n- خاص بالمشروع: font/\n\n## تخطيط ومكوّنات الصفحة\n- \n\n## قواعد التصدير\n- PDF صالح.\n`;
  const openStyleReview = useCallback(async (projectId, mode = 'review') => {
    const pid = projectId || currentProjectId;
    let content = getStyleContent(pid) || '';
    let missing = !content;
    try {
      const r = await fetch(`/__pdfstudio/style?project=${encodeURIComponent(pid)}`);
      if (r.ok) { const d = await r.json(); if (d && d.ok) { content = d.content || ''; missing = !d.exists; } }
    } catch {}
    const draft = missing ? defaultStyleTemplate(pid) : content;
    setStyleModal({ open: true, phase: 'enter', projectId: pid, content, draft, missing, mode, saving: false, status: '' });
    requestAnimationFrame(() => requestAnimationFrame(() => setStyleModal(m => m.open ? { ...m, phase: 'entered' } : m)));
  }, [currentProjectId]);

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

  const saveStyle = async () => {
    setStyleModal(m => ({...m, saving:true, status:''}));
    try {
      const r = await fetch(`/__pdfstudio/style?project=${encodeURIComponent(styleModal.projectId||'')}`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ content: styleModal.draft ?? '' }) });
      const d = await r.json().catch(()=>({}));
      if (r.ok && d.ok) setStyleModal(m => ({...m, saving:false, missing:false, content:m.draft, status:'تم الحفظ في style.md ✓'}));
      else setStyleModal(m => ({...m, saving:false, status: d.error ? `تعذر الحفظ: ${d.error}` : 'تعذر الحفظ'}));
    } catch (e) { setStyleModal(m => ({...m, saving:false, status:'تعذر الحفظ (تأكد أن المحرك شغال محليًا)'})); }
  };
  const closeStyleModal = () => { setStyleModal(m => ({...m, phase:'exit'})); setTimeout(() => setStyleModal(m => m.phase==='exit'?{...m, open:false, phase:'closed'}:m), 220); };
  const closeNewProject = () => { setNewProjectModal(m => ({...m, phase:'exit'})); setTimeout(() => setNewProjectModal(m => m.phase==='exit'?{...m, open:false, phase:'closed'}:m), 220); };
  const closeDeleteModal = () => { setDeleteModal(m => ({...m, phase:'exit'})); setTimeout(() => setDeleteModal(m => m.phase==='exit'?{...m, open:false, phase:'closed', project:null}:m), 220); };
  const openDeleteProject = useCallback((proj) => { setDeleteModal({ open:true, phase:'enter', project: proj, saving:false, status:'' }); requestAnimationFrame(()=>requestAnimationFrame(()=>setDeleteModal(m=>m.open?{...m,phase:'entered'}:m))); }, []);
  const confirmDeleteProject = async () => {
    const proj = deleteModal.project; if (!proj) return;
    setDeleteModal(m=>({...m,saving:true,status:''}));
    try {
      const r = await fetch(`/__pdfstudio/project?project=${encodeURIComponent(proj.id)}`, { method:'DELETE' });
      const d = await r.json().catch(()=>({}));
      if (r.ok && d.ok) {
        setDeleteModal(m=>({...m,saving:false,status:'تم الحذف ✓'}));
        if (currentProjectId === proj.id) localStorage.setItem('pdf-studio-active-project','default');
        const wait = async () => { for(let i=0;i<40;i++){ try{ await fetch('/__pdfstudio/style?project=__ping__',{cache:'no-store'}); break; } catch{} await new Promise(r=>setTimeout(r,400)); } window.location.href='/'; };
        setTimeout(wait, d.restarting ? 700 : 300);
      } else setDeleteModal(m=>({...m,saving:false,status:d.error?`تعذر الحذف: ${d.error}`:'تعذر الحذف'}));
    } catch(e){ setDeleteModal(m=>({...m,saving:false,status:'تعذر الحذف (تأكد أن المحرك شغال محليًا)'})); }
  };
  const slugifyId = (v) => { const x = String(v||'').trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9_\-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,''); return x || ('project-' + Date.now().toString(36)); };
  const openNewProject = () => {
    setNewProjectModal({ open: true, phase: 'enter', step: 1, id: '', name: '', style: '', orientation: 'landscape', saving: false, status: '' });
    requestAnimationFrame(() => requestAnimationFrame(() => setNewProjectModal(m => m.open ? { ...m, phase: 'entered' } : m)));
  };
  const createProject = async () => {
    const name = (newProjectModal.name||'').trim();
    if (!name) { setNewProjectModal(m=>({...m,status:'اكتب اسم المشروع'})); return; }
    const id = (newProjectModal.id||'').trim() || slugifyId(name);
    const orientation = newProjectModal.orientation === 'portrait' ? 'portrait' : 'landscape';
    const preset = orientation === 'portrait' ? 'a4' : 'slide';
    setNewProjectModal(m=>({...m,saving:true,status:''}));
    try {
      const r = await fetch('/__pdfstudio/project', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, name, orientation, preset, style: newProjectModal.style }) });
      const d = await r.json().catch(()=>({}));
      if (r.ok && d.ok) {
        localStorage.setItem('pdf-studio-active-project', d.id || id);
        if (d.restarting) {
          setNewProjectModal(m=>({...m,saving:false,status:'تم الإنشاء ✓ جاري إعادة تشغيل المحرك...'}));
          const target = d.id || id;
          const wait = async () => {
            for (let i=0;i<40;i++){ try { const pr = await fetch('/__pdfstudio/style?project=__ping__', { cache:'no-store' }); if (pr) break; } catch {} await new Promise(r=>setTimeout(r,400)); }
            window.location.href = '/';
          };
          setTimeout(wait, 700);
        } else {
          setNewProjectModal(m=>({...m,saving:false,status:'تم إنشاء المشروع ✓'}));
          setTimeout(() => { window.location.href = '/'; }, 450);
        }
      } else {
        setNewProjectModal(m=>({...m,saving:false,status: d.error==='project already exists' ? 'يوجد مشروع بنفس المعرّف' : (d.error ? 'تعذر الإنشاء: '+d.error : 'تعذر الإنشاء')}));
      }
    } catch (e) { setNewProjectModal(m=>({...m,saving:false,status:'تعذر الإنشاء (تأكد أن المحرك شغال محليًا)'})); }
  };

  const handleCopy = (e) => {
    const t = e.target;
    const tag = t && t.tagName;
    const editable = tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable);
    if (editable) return;
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
                  onReviewStyle={openStyleReview}
                  onNewProject={openNewProject}
                  onDeleteProject={openDeleteProject}
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
                  onReviewStyle={openStyleReview}
                  onNewProject={openNewProject}
                  onDeleteProject={openDeleteProject}
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
                  onReviewStyle={openStyleReview}
                  onNewProject={openNewProject}
                  onDeleteProject={openDeleteProject}
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
      {(() => {
        const any = styleModal.open || newProjectModal.open || deleteModal.open;
        const phase = styleModal.open ? styleModal.phase : (newProjectModal.open ? newProjectModal.phase : deleteModal.phase);
        const shown = phase === 'entered';
        if (!any) return null;
        const close = () => { if (styleModal.open) closeStyleModal(); if (newProjectModal.open) closeNewProject(); if (deleteModal.open) closeDeleteModal(); };
        const nosb = { scrollbarWidth: 'none', msOverflowStyle: 'none' };
        return (
          <div style={{position:'fixed',inset:0,background: shown?'rgba(0,0,0,.72)':'rgba(0,0,0,0)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:16,transition:'background 220ms ease'}} dir="rtl" onClick={close}>
            <style>{`.pm-nosb::-webkit-scrollbar{display:none}`}</style>
            <div className="pm-nosb" style={{width:'min(720px,100%)',maxHeight:'85vh',overflow:'auto',background:'#111',border:'1px solid #2a2a2a',borderRadius:14,padding:16,color:'#e5e7eb',opacity:shown?1:0,transform:shown?'translateY(0) scale(1)':'translateY(10px) scale(.985)',transition:'opacity 220ms ease, transform 220ms ease',...nosb}} onClick={e=>e.stopPropagation()}>
              {styleModal.open && (<>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,gap:8,flexWrap:'wrap'}}>
                  <div style={{fontWeight:700,fontSize:15}}>{styleModal.missing ? 'ملف الستايل مطلوب (إلزامي) — أنشئه الآن' : 'ستايل المشروع (style.md)'}</div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <button onClick={saveStyle} disabled={styleModal.saving} style={{...iconBtnStyle,background:'#2563eb',border:'1px solid #3b82f6',borderRadius:8,padding:'5px 12px',fontWeight:600,opacity:styleModal.saving?.7:1}}>{styleModal.saving?'جارٍ الحفظ...':'حفظ'}</button>
                    <button onClick={closeStyleModal} style={{...iconBtnStyle,border:'1px solid #333',borderRadius:8,padding:'4px 10px'}}>إغلاق</button>
                  </div>
                </div>
                <div style={{fontSize:12,color:'#9ca3af',marginBottom:8}}>المشروع: <b style={{color:'#fff'}}>{styleModal.projectId}</b> — <code>projects/{styleModal.projectId}/style.md</code>{styleModal.status && <span style={{marginInlineStart:10,color: styleModal.status.includes('✓')?'#86efac':'#fca5a5'}}>{styleModal.status}</span>}</div>
                {styleModal.missing && <div style={{background:'rgba(239,68,68,.12)',border:'1px solid rgba(239,68,68,.35)',color:'#fca5a5',padding:10,borderRadius:10,fontSize:13,marginBottom:10}}>لا يوجد <b>style.md</b>. عدّل القالب أدناه ثم اضغط <b>حفظ</b> (إلزامي لكل مشروع).</div>}
                <textarea value={styleModal.draft} onChange={e=>setStyleModal(m=>({...m,draft:e.target.value,status:''}))} spellCheck={false} className="pm-nosb" style={{width:'100%',minHeight:320,background:'#0a0a0a',color:'#d1d5db',border:'1px solid #2a2a2a',borderRadius:10,padding:12,fontFamily:'ui-monospace,monospace',fontSize:12,lineHeight:1.6,direction:'ltr',textAlign:'left',overflow:'auto',scrollbarWidth:'none',msOverflowStyle:'none',resize:'vertical'}} />
              </>)}
              {newProjectModal.open && (<>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,gap:8}}>
                  <div style={{fontWeight:700,fontSize:15}}>مشروع جديد</div>
                  <button onClick={closeNewProject} style={{...iconBtnStyle,border:'1px solid #333',borderRadius:8,padding:'4px 10px'}}>إغلاق</button>
                </div>
                {newProjectModal.step === 1 ? (<>
                  <div style={{fontSize:13,color:'#d1d5db',marginBottom:10}}>اكتب اسم المشروع واختر اتجاه الورقة، ثم التالي لتحديد الستايل (إلزامي).</div>
                  <label style={{fontSize:12,color:'#9ca3af'}}>اسم المشروع</label>
                  <input autoFocus value={newProjectModal.name} onChange={e=>{ const name=e.target.value; setNewProjectModal(m=>({...m,name,id:slugifyId(name),status:''})); }} placeholder="مثال: كتالوج المنتج" style={{width:'100%',margin:'6px 0 12px',background:'#0a0a0a',color:'#e5e7eb',border:'1px solid #2a2a2a',borderRadius:10,padding:'10px 12px',fontFamily:'inherit',fontSize:13,boxSizing:'border-box'}} />
                  <label style={{fontSize:12,color:'#9ca3af',display:'block',marginBottom:6}}>اتجاه الورقة</label>
                  <div style={{display:'flex',gap:8,marginBottom:12}}>
                    {[
                      { id: 'landscape', label: 'عرضي', hint: 'Slide 1280×720' },
                      { id: 'portrait', label: 'طولي', hint: 'A4 عمودي' },
                    ].map(opt => {
                      const active = (newProjectModal.orientation || 'landscape') === opt.id;
                      return (
                        <button key={opt.id} type="button" onClick={()=>setNewProjectModal(m=>({...m,orientation:opt.id,status:''}))}
                          style={{...iconBtnStyle, flex:1, flexDirection:'column', gap:2, padding:'10px 12px', borderRadius:10, border:`1px solid ${active ? 'rgba(59,130,246,.55)' : '#2a2a2a'}`, background: active ? 'rgba(59,130,246,.16)' : '#0a0a0a', color: active ? '#93C5FD' : '#d1d5db', fontWeight: active ? 700 : 500}}>
                          <span style={{fontSize:14}}>{opt.label}</span>
                          <span style={{fontSize:11,color: active ? '#93C5FD' : '#6b7280',fontWeight:500}}>{opt.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                  {newProjectModal.status && <div style={{fontSize:12,color:'#fca5a5',marginBottom:8}}>{newProjectModal.status}</div>}
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <button onClick={()=>{ const name=(newProjectModal.name||'').trim(); if(!name){setNewProjectModal(m=>({...m,status:'اكتب اسم المشروع'}));return;} const id=slugifyId(name); const orientation = newProjectModal.orientation === 'portrait' ? 'portrait' : 'landscape'; const sizeLine = orientation === 'portrait' ? 'A4 طولي (portrait)' : 'Slide عرضي 1280×720 (landscape)'; const layoutLine = orientation === 'portrait' ? 'صفحة A4 عمودية بنفس الهوامش/الحجم الأصلي.' : 'صفحة بيضاء بنفس الحجم/الحواف الأصلية (1280×720).'; const style=`# Style — ${name}

> مصدر الستايل المعتمد. يُطبَّق على كل الصفحات. (إلزامي)

## الهوية والإعدادات
- **الاسم:** ${name}
- **اللغة/الاتجاه:** العربية، RTL (dir=\"rtl\", lang=\"ar\")
- **مقاس/اتجاه الصفحة:** ${sizeLine}
- **الثيم/الألوان:** 

## الخطوط
- عام: fonts/
- خاص بالمشروع: font/

## تخطيط ومكوّنات الصفحة
- ${layoutLine}

## قواعد التصدير
- PDF صالح.
`; setNewProjectModal(m=>({...m,step:2,id,style,orientation,status:''})); }} style={{...iconBtnStyle,background:'#2563eb',border:'1px solid #3b82f6',borderRadius:8,padding:'6px 14px',fontWeight:600}}>التالي: الستايل</button>
                  </div>
                </>) : (<>
                  <div style={{fontSize:12,color:'#9ca3af',marginBottom:8}}>المشروع: <b style={{color:'#fff'}}>{newProjectModal.name}</b> — <code>projects/{newProjectModal.id}/</code>{newProjectModal.status && <span style={{marginInlineStart:10,color:newProjectModal.status.includes('✓')?'#86efac':'#fca5a5'}}>{newProjectModal.status}</span>}</div>
                  <div style={{fontSize:13,color:'#d1d5db',marginBottom:8}}>حدّد الستايل (إلزامي) ثم اضغط إنشاء:</div>
                  <textarea value={newProjectModal.style} onChange={e=>setNewProjectModal(m=>({...m,style:e.target.value,status:''}))} spellCheck={false} className="pm-nosb" style={{width:'100%',minHeight:300,background:'#0a0a0a',color:'#d1d5db',border:'1px solid #2a2a2a',borderRadius:10,padding:12,fontFamily:'ui-monospace,monospace',fontSize:12,lineHeight:1.6,direction:'ltr',textAlign:'left',overflow:'auto',scrollbarWidth:'none',msOverflowStyle:'none',resize:'vertical',boxSizing:'border-box'}} />
                  <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:10}}>
                    <button onClick={()=>setNewProjectModal(m=>({...m,step:1,status:''}))} style={{...iconBtnStyle,border:'1px solid #333',borderRadius:8,padding:'6px 12px'}}>رجوع</button>
                    <button onClick={createProject} disabled={newProjectModal.saving} style={{...iconBtnStyle,background:'#16a34a',border:'1px solid #22c55e',borderRadius:8,padding:'6px 14px',fontWeight:600,opacity:newProjectModal.saving?.7:1}}>{newProjectModal.saving?'جارٍ الإنشاء...':'إنشاء المشروع'}</button>
                  </div>
                </>)}
              </>)}

              {deleteModal.open && (<>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,gap:8}}>
                  <div style={{fontWeight:700,fontSize:15,color:'#fca5a5'}}>تأكيد حذف المشروع</div>
                  <button onClick={closeDeleteModal} style={{...iconBtnStyle,border:'1px solid #333',borderRadius:8,padding:'4px 10px'}}>إغلاق</button>
                </div>
                <div style={{fontSize:13,color:'#d1d5db',marginBottom:14,lineHeight:1.7}}>هل أنت متأكد من حذف المشروع <b style={{color:'#fff'}}>{deleteModal.project?.name || deleteModal.project?.id}</b>؟<br/><span style={{color:'#fca5a5'}}>سيتم حذف مجلد المشروع وكل صفحاته/ملفاته نهائيًا.</span>{deleteModal.status && <div style={{marginTop:8,color: deleteModal.status.includes('✓')?'#86efac':'#fca5a5'}}>{deleteModal.status}</div>}</div>
                <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
                  <button onClick={closeDeleteModal} disabled={deleteModal.saving} style={{...iconBtnStyle,border:'1px solid #333',borderRadius:8,padding:'6px 12px'}}>إلغاء</button>
                  <button onClick={confirmDeleteProject} disabled={deleteModal.saving} style={{...iconBtnStyle,background:'#dc2626',border:'1px solid #ef4444',borderRadius:8,padding:'6px 14px',fontWeight:600,opacity:deleteModal.saving?.7:1}}>{deleteModal.saving?'جارٍ الحذف...':'حذف المشروع'}</button>
                </div>
              </>)}
            </div>
          </div>
        );
      })()}

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
