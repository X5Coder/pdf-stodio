import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
  useSearchParams
} from 'react-router-dom';
import { getPages, refreshProjectPages } from './pages/index.js';
import { BASE_CONFIG } from './config.js';
import { useDS, DSProvider } from './ds/index.js';
import { exportAllPagesToPdf } from './utils/exportPdf.js';
import { loadProjects, loadProjectConfig, getStyleContent } from './utils/projectLoader.js';
import { Dialog, DialogHeader, DialogBody, DialogFooter, DialogButton, StatusLine, TextInput, TextArea, FieldLabel, Stepper } from './components/Dialog.jsx';
import ProjectPicker from './components/ProjectPicker.jsx';
import { ChevronRight, ChevronLeft, FolderOpen, FileDown, FileText, Plus, Trash2, Save, ArrowLeft, ArrowRight, FolderPlus, FileWarning, AlertTriangle, RectangleHorizontal, RectangleVertical, Loader2, CheckCircle2, LayoutGrid } from 'lucide-react';

// ألوان الشل للمعاينة فقط — لا تدخل الـ PDF (التصدير يلتقط عناصر .pdf-page فقط).
const SHELL_BG = '#0a0a0a';
const BAR_BG = '#0a0a0a';
const BAR_BORDER = '#1a1a1a';
const BAR_HOVER = '#1f1f1f';

function TopBar({ onExport, projectConfig, projects, onReviewStyle, onNewProject, onDeleteProject }) {
  const [busy, setBusy] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const menuRef = useRef(null);
  const nav = useNavigate();
  const { projectId, num } = useParams();
  const activeProjectId = projectId;
  const pages = useProjectPages(activeProjectId);
  const total = pages.length;
  const current = total > 0 ? Math.max(1, Math.min(total, parseInt(num ?? '1', 10) || 1)) : 0;

  const go = (n) => {
    if (n >= 1 && n <= total) nav(`/project/${activeProjectId}/p/${n}`);
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
        <button className="pm-brand" onClick={() => nav('/')} title="كل المشاريع" aria-label="كل المشاريع" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, background: 'transparent', border: 'none', padding: 4, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
          <img src="/favicon.svg" alt="" width="20" height="20" style={{ display: 'block', borderRadius: 5 }} />
          <span className="pm-brand-text" style={{ fontSize: '11px', fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.1px', whiteSpace: 'nowrap' }}>PDF Studio</span>
        </button>
        <div className="pm-sep" style={{ width: 1, height: 16, background: BAR_BORDER, flexShrink: 0 }} />
        <button
          className="pm-all-projects"
          onClick={() => nav('/')}
          title="كل المشاريع"
          aria-label="كل المشاريع"
          style={{
            ...iconBtnStyle,
            width: 30,
            height: 30,
            padding: 0,
            borderRadius: 8,
            border: `1px solid ${BAR_BORDER}`,
            background: 'transparent',
            color: '#ffffff',
            transition: 'all 0.15s ease',
            opacity: 0.9
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = BAR_HOVER; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <LayoutGrid size={15} color="#e5e7eb" />
        </button>
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
                    onClick={() => { nav(`/project/${encodeURIComponent(proj.id)}`); setShowProjectMenu(false); }}
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
            <div style={{ borderTop: '1px solid #1f1f24', marginTop: 4, paddingTop: 4 }}>
              <button
                onClick={() => { nav('/'); setShowProjectMenu(false); }}
                style={{
                  ...iconBtnStyle,
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  justifyContent: 'flex-start', textAlign: 'right', paddingBlock: 7, paddingInline: 8,
                  borderRadius: 7, background: 'transparent', color: '#9ca3af', fontSize: 12, fontWeight: 600,
                  transition: 'all 0.12s ease', border: '1px solid transparent'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#e5e7eb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
              >
                <LayoutGrid size={13} />
                <span>كل المشاريع</span>
              </button>
            </div>
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
          {total > 0 ? <bdi>{current} / {total}</bdi> : <bdi>—</bdi>}
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

// انتظار عودة المحرك بعد إعادة التشغيل (يُستخدم بعد إنشاء/حذف مشروع)
async function waitForServer(tries = 50, delay = 400) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch('/__pdfstudio/ping', { cache: 'no-store' });
      if (r.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, delay));
  }
  return false;
}

// صفحات المشروع مع اكتشاف ديناميكي: أي صفحة تُضاف أو تُحذف على القرص تظهر بلا إعادة تشغيل
function useProjectPages(projectId) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!projectId) return;
    let alive = true;
    const check = () => {
      refreshProjectPages(projectId).then((changed) => {
        if (alive && changed) setTick((t) => t + 1);
      });
    };
    check();
    const t = setInterval(check, 2500); // مراقبة القرص دوريًا عشان الصفحات الجديدة تظهر لحظيًا
    return () => { alive = false; clearInterval(t); };
  }, [projectId]);
  return useMemo(() => getPages(projectId), [projectId, tick]);
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
function SinglePageView() {
  const { projectId, projectConfig, pages } = useOutletContext();
  const { dims } = useDS();
  const { num } = useParams();
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const total = pages.length;
  const current = total > 0 ? Math.max(1, Math.min(total, parseInt(num ?? '1', 10) || 1)) : 0;
  const PageComp = total > 0 ? pages[current - 1] : null;
  const s = useFitAll(dims.w, dims.h, isMobile ? 24 : 32);

  const next = useCallback(() => {
    if (current < total) nav(`/project/${projectId}/p/${current + 1}`);
  }, [current, total, nav, projectId]);
  const prev = useCallback(() => {
    if (current > 1) nav(`/project/${projectId}/p/${current - 1}`);
  }, [current, nav, projectId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next(); // اليمين = التالي
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
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
        overflow: 'hidden',
        background: SHELL_BG
      }}
      dir={projectConfig?.dir || 'rtl'}
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
                <div>لا توجد صفحات بعد.<br /><span style={{ fontSize: 12, color: '#6b7280' }}>أضف صفحة في <code>page-1/page.jsx</code> داخل مجلد المشروع ثم أعد التحميل.</span></div>
              </div>
            ) : (
              <PageComp pageNo={current} total={total || 1} />
            )}
          </div>
        </div>
    </main>
  );
}

// عرض كل الصفحات (كل صفحة تُعرض كاملة بالعرض؛ تمرير طبيعي عند الحاجة)
function AllPagesView() {
  const { projectConfig, pages } = useOutletContext();
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
    <main style={{ flex: 1, background: SHELL_BG, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 16 : 32, paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 12 : 32, paddingInline: isMobile ? 8 : 16, overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} dir={projectConfig?.dir || 'rtl'}>
      {pages.map((PageComp, i) => (
        <div key={i} dir="ltr" style={{ width: dims.w * s, height: dims.h * s, flexShrink: 0, overflow: 'hidden', borderRadius: '6px', boxShadow: '0 12px 48px rgba(0,0,0,.45)' }}>
          <div style={{ width: dims.w, height: dims.h, transform: `scale(${s})`, transformOrigin: 'top left' }}>
            <PageComp pageNo={i + 1} total={total} />
          </div>
        </div>
      ))}
    </main>
  );
}

// عرض مخصص للتصدير فقط: الصفحات بمقاسها الحقيقي وبدون أي واجهة
// التصدير: عرض القالب/الصفحات فقط بدون واجهة معاينة فوقها.
function ExportView() {
  const { projectId, projectConfig, pages } = useOutletContext();
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
        nav(params.get('from') ?? `/project/${projectId}/all`, { replace: true });
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

// مشروع غير موجود لديه رابط — شاشة واضحة مع زر العودة للمشاريع
function ProjectNotFound({ projectId }) {
  const nav = useNavigate();
  return (
    <div dir="rtl" style={{ minHeight: '100dvh', background: SHELL_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div aria-hidden="true" style={{ width: 64, height: 64, margin: '0 auto', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.35)' }}>
          <FileWarning size={28} color="#fcd34d" strokeWidth={1.6} />
        </div>
        <h1 style={{ fontSize: 19, fontWeight: 800, color: '#f4f4f5', margin: '16px 0 8px' }}>المشروع غير موجود</h1>
        <p style={{ fontSize: 12.5, color: '#a1a1aa', lineHeight: 1.8, margin: 0 }}>
          لا يوجد مجلد للمشروع <code dir="ltr" style={{ color: '#93c5fd' }}>projects/{projectId}/</code> — ربما حُذف من القرص.
        </p>
        <button
          onClick={() => nav('/')}
          style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, paddingInline: 18, borderRadius: 9, border: '1px solid #3b82f6', background: '#2563eb', color: '#fff', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}
        >
          <LayoutGrid size={15} />
          كل المشاريع
        </button>
      </div>
    </div>
  );
}

// الإطار العام لكل مسارات /project/:projectId — يحمّل الإعدادات ويوفّر TopBar والسياق
function ProjectLayout({ projects, onReviewStyle, onNewProject, onDeleteProject }) {
  const { projectId } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const [projectConfig, setProjectConfig] = useState(undefined); // undefined = جارٍ التحميل، null = غير موجود
  const [exporting, setExporting] = useState(false);
  const exportHostRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setProjectConfig(undefined);
    loadProjectConfig(projectId).then((cfg) => {
      if (!alive) return;
      setProjectConfig(cfg || null);
      if (cfg) {
        document.title = cfg.name ? `${cfg.name} — PDF Studio` : 'PDF Studio';
        const description = cfg.description
          ? String(cfg.description).slice(0, 160)
          : (cfg.name ? `معاينة وتصدير مشروع "${cfg.name}" بصيغة PDF عبر PDF Studio.` : 'PDF Studio — معاينة وتصميم وتصدير صفحات PDF ضمن مشاريع منظمة.');
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.documentElement.lang = cfg.lang || 'ar';
        document.documentElement.dir = cfg.dir || 'rtl';
      }
    });
    return () => { alive = false; };
  }, [projectId]);

  useEffect(() => () => {
    document.title = 'PDF Studio';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  const pages = useProjectPages(projectId);
  const dsConfig = projectConfig ? { ...BASE_CONFIG, ...projectConfig } : BASE_CONFIG;
  const isExportRoute = /\/export\/?$/.test(location.pathname);

  const handleCopy = (e) => {
    const t = e.target;
    const tag = t && t.tagName;
    const editable = tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable);
    if (editable) return;
    e.preventDefault();
  };

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

  if (projectConfig === null) {
    return <ProjectNotFound projectId={projectId} />;
  }

  return (
    <DSProvider config={dsConfig}>
      <div onCopy={handleCopy} onCut={handleCopy} style={{ background: SHELL_BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!isExportRoute && (
          <TopBar
            onExport={handleExport}
            projectConfig={projectConfig}
            projects={projects}
            onReviewStyle={onReviewStyle}
            onNewProject={onNewProject}
            onDeleteProject={onDeleteProject}
          />
        )}
        <Outlet context={{ projectId, projectConfig, pages }} />
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
    </DSProvider>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const [styleModal, setStyleModal] = useState({ open: false, phase: 'closed', projectId: null, content: '', draft: '', missing: false, mode: 'review', saving: false, status: '' });
  const [newProjectModal, setNewProjectModal] = useState({ open: false, phase: 'closed', step: 1, id: '', name: '', style: '', orientation: 'landscape', saving: false, status: '' });
  const [deleteModal, setDeleteModal] = useState({ open: false, phase: 'closed', project: null, saving: false, status: '' });

  const defaultStyleTemplate = (pid) => `# Style — ${pid}\n\n> مصدر الستايل المعتمد. يُطبَّق على كل الصفحات. (إلزامي)\n\n## الهوية والإعدادات\n- **الاسم:** ${pid}\n- **اللغة/الاتجاه:** العربية، RTL (dir=\"rtl\", lang=\"ar\")\n- **مقاس/اتجاه الصفحة:** A4 عمودي (portrait) أو عرضي (landscape)\n- **الثيم/الألوان:** \n\n## الخطوط\n- عام: fonts/\n- خاص بالمشروع: font/\n\n## تخطيط ومكوّنات الصفحة\n- \n\n## قواعد التصدير\n- PDF صالح.\n`;
  const openStyleReview = useCallback(async (projectId, mode = 'review') => {
    if (!projectId) return;
    const pid = projectId;
    let content = getStyleContent(pid) || '';
    let missing = !content;
    try {
      const r = await fetch(`/__pdfstudio/style?project=${encodeURIComponent(pid)}`);
      if (r.ok) { const d = await r.json(); if (d && d.ok) { content = d.content || ''; missing = !d.exists; } }
    } catch {}
    const draft = missing ? defaultStyleTemplate(pid) : content;
    setStyleModal({ open: true, phase: 'enter', projectId: pid, content, draft, missing, mode, saving: false, status: '' });
    requestAnimationFrame(() => requestAnimationFrame(() => setStyleModal(m => m.open ? { ...m, phase: 'entered' } : m)));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setProjectsLoading(true);
      try {
        const list = await loadProjects();
        if (alive) setProjects(list);
      } catch (e) {
        console.error('Failed to load projects:', e);
      } finally {
        if (alive) setProjectsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

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
        setTimeout(() => { waitForServer().then(() => { window.location.href='/'; }); }, d.restarting ? 700 : 250);
      } else setDeleteModal(m=>({...m,saving:false,status:d.error?`تعذر الحذف: ${d.error}`:'تعذر الحذف'}));
    } catch(e){ setDeleteModal(m=>({...m,saving:false,status:'تعذر الحذف (تأكد أن المحرك شغال محليًا)'})); }
  };
  const slugifyId = (v) => { const x = String(v||'').trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9_\-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,''); return x || ('project-' + Date.now().toString(36)); };
  const openNewProject = () => {
    setNewProjectModal({ open: true, phase: 'enter', step: 1, id: '', name: '', style: '', orientation: 'landscape', saving: false, status: '' });
    requestAnimationFrame(() => requestAnimationFrame(() => setNewProjectModal(m => m.open ? { ...m, phase: 'entered' } : m)));
  };
  const goToStyleStep = () => {
    const name = (newProjectModal.name||'').trim();
    if (!name) { setNewProjectModal(m=>({...m,status:'اكتب اسم المشروع'})); return; }
    const id = slugifyId(name);
    const orientation = newProjectModal.orientation === 'portrait' ? 'portrait' : 'landscape';
    const sizeLine = orientation === 'portrait' ? 'A4 طولي (portrait)' : 'Slide عرضي 1280×720 (landscape)';
    const layoutLine = orientation === 'portrait' ? 'صفحة A4 عمودية بنفس الهوامش/الحجم الأصلي.' : 'صفحة بيضاء بنفس الحجم/الحواف الأصلية (1280×720).';
    const style = `# Style — ${name}

> مصدر الستايل المعتمد. يُطبَّق على كل الصفحات. (إلزامي)

## الهوية والإعدادات
- **الاسم:** ${name}
- **اللغة/الاتجاه:** العربية، RTL (dir="rtl", lang="ar")
- **مقاس/اتجاه الصفحة:** ${sizeLine}
- **الثيم/الألوان:** 

## الخطوط
- عام: fonts/
- خاص بالمشروع: font/

## تخطيط ومكوّنات الصفحة
- ${layoutLine}

## قواعد التصدير
- PDF صالح.
`;
    setNewProjectModal(m => ({ ...m, step: 2, id, style, orientation, status: '' }));
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
        setNewProjectModal(m=>({...m,saving:false,status:'تم الإنشاء ✓ جاري إعادة تشغيل المحرك...'}));
        setTimeout(() => { waitForServer().then(() => { window.location.href=`/project/${encodeURIComponent(d.id || id)}/p/1`; }); }, d.restarting ? 700 : 250);
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

  const visible = entered;

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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProjectPicker
                  projects={projects}
                  loading={projectsLoading}
                  onNewProject={openNewProject}
                  onDeleteProject={openDeleteProject}
                />
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <ProjectLayout
                  projects={projects}
                  onReviewStyle={openStyleReview}
                  onNewProject={openNewProject}
                  onDeleteProject={openDeleteProject}
                />
              }
            >
              <Route index element={<Navigate to="p/1" replace relative="path" />} />
              <Route path="p/:num" element={<SinglePageView />} />
              <Route path="all" element={<AllPagesView />} />
              <Route path="export" element={<ExportView />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      {styleModal.open && (
        <Dialog phase={styleModal.phase} onClose={closeStyleModal} width={720} labelledBy="dlg-style-title">
          <DialogHeader
            tone={styleModal.missing ? 'amber' : 'blue'}
            icon={styleModal.missing ? FileWarning : FileText}
            title={styleModal.missing ? 'ملف الستايل مفقود — أنشئه الآن' : 'ستايل المشروع'}
            subtitle={<><bdi>projects/{styleModal.projectId}/style.md</bdi> — يُطبَّق على كل صفحات المشروع</>}
            onClose={closeStyleModal}
            labelledBy="dlg-style-title"
          />
          <DialogBody>
            {styleModal.missing && (
              <div role="alert" style={{ display:'flex', gap:10, alignItems:'flex-start', background:'rgba(245,158,11,0.09)', border:'1px solid rgba(245,158,11,0.35)', color:'#fcd34d', padding:'10px 12px', borderRadius:10, fontSize:12, lineHeight:1.8, marginBottom:12 }}>
                <AlertTriangle size={15} style={{ flexShrink:0, marginTop:2 }} />
                <span>لا يوجد <b>style.md</b>. عدّل القالب أدناه ثم اضغط <b>حفظ style.md</b> — الملف إلزامي لكل مشروع.</span>
              </div>
            )}
            <FieldLabel htmlFor="style-draft">محتوى الملف</FieldLabel>
            <TextArea id="style-draft" autoFocus={styleModal.missing} value={styleModal.draft} onChange={e=>setStyleModal(m=>({...m,draft:e.target.value,status:''}))} style={{ minHeight: 340 }} aria-label="محتوى style.md" />
          </DialogBody>
          <DialogFooter>
            <div style={{ flex:'1 1 auto', minWidth:0 }}><StatusLine status={styleModal.status} /></div>
            <div style={{ display:'flex', gap:8 }}>
              <DialogButton tone="ghost" onClick={closeStyleModal}>إغلاق</DialogButton>
              <DialogButton tone="primary" onClick={saveStyle} disabled={styleModal.saving}>
                {styleModal.saving ? <Loader2 size={14} style={{ animation:'spin 0.8s linear infinite' }} /> : <Save size={14} />}
                {styleModal.saving ? 'جارٍ الحفظ...' : 'حفظ style.md'}
              </DialogButton>
            </div>
          </DialogFooter>
        </Dialog>
      )}

      {newProjectModal.open && (
        <Dialog phase={newProjectModal.phase} onClose={closeNewProject} width={600} labelledBy="dlg-new-title">
          <DialogHeader
            tone="blue"
            icon={FolderPlus}
            title="مشروع جديد"
            subtitle={newProjectModal.step === 1 ? 'خطوة 1 من 2 — بيانات المشروع' : 'خطوة 2 من 2 — الستايل (إلزامي)'}
            onClose={closeNewProject}
            labelledBy="dlg-new-title"
          />
          <DialogBody>
            <Stepper steps={['بيانات المشروع', 'الستايل']} current={newProjectModal.step} />
            {newProjectModal.step === 1 ? (
              <>
                <div style={{ marginTop: 16 }}>
                  <FieldLabel htmlFor="np-name">اسم المشروع</FieldLabel>
                  <TextInput id="np-name" autoFocus value={newProjectModal.name} invalid={!!newProjectModal.status} onChange={e=>{ const name=e.target.value; setNewProjectModal(m=>({...m,name,id:slugifyId(name),status:''})); }} placeholder="مثال: كتالوج المنتج" />
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginTop:7 }}>
                    <span style={{ fontSize: 11, color: '#71717a' }}>سيُنشأ مجلد للمشروع تلقائيًا</span>
                    <code dir="ltr" style={{ fontSize: 10.5, color: '#93c5fd', background:'#16161c', border:'1px solid #23232b', borderRadius:6, padding:'2px 8px' }}>projects/{newProjectModal.name.trim() ? slugifyId(newProjectModal.name) : '…'}/</code>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <FieldLabel>اتجاه الورقة</FieldLabel>
                  <div style={{ display:'flex', gap:10 }}>
                    {[
                      { id: 'landscape', label: 'عرضي', hint: 'Slide 1280×720', Icon: RectangleHorizontal },
                      { id: 'portrait', label: 'طولي', hint: 'A4 عمودي', Icon: RectangleVertical },
                    ].map(({ id, label, hint, Icon }) => {
                      const active = (newProjectModal.orientation || 'landscape') === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={active}
                          onClick={()=>setNewProjectModal(m=>({...m,orientation:id,status:''}))}
                          style={{ flex:1, display:'flex', alignItems:'center', gap:10, textAlign:'right', fontFamily:'inherit', padding:'11px 12px', borderRadius:12, cursor:'pointer', border:`1px solid ${active ? 'rgba(59,130,246,0.55)' : '#26262e'}`, background: active ? 'rgba(59,130,246,0.12)' : '#0e0e11', transition:'all 0.15s ease' }}
                        >
                          <span style={{ width:36, height:36, flexShrink:0, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background: active ? 'rgba(59,130,246,0.18)' : '#16161c', border:`1px solid ${active ? 'rgba(59,130,246,0.4)' : '#23232b'}`, transition:'all 0.15s ease' }}>
                            <Icon size={18} color={active ? '#93c5fd' : '#8b8b96'} strokeWidth={1.6} />
                          </span>
                          <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
                            <span style={{ fontSize:13, fontWeight:700, color: active ? '#dbeafe' : '#d4d4d8' }}>{label}</span>
                            <span style={{ fontSize:10.5, color:'#71717a', whiteSpace:'nowrap' }}>{hint}</span>
                          </span>
                          {active && <CheckCircle2 size={17} color="#60a5fa" style={{ marginInlineStart:'auto', flexShrink:0 }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display:'flex', alignItems:'center', gap:10, background:'#0e0e11', border:'1px solid #23232b', borderRadius:10, padding:'10px 12px', marginTop:16, marginBottom:12 }}>
                  <span style={{ width:36, height:36, flexShrink:0, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(59,130,246,0.14)', border:'1px solid rgba(59,130,246,0.35)' }}>
                    <FolderOpen size={17} color="#93c5fd" />
                  </span>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight:700, color:'#f4f4f5', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{newProjectModal.name}</div>
                    <code dir="ltr" style={{ fontSize:10.5, color:'#71717a' }}>projects/{newProjectModal.id}/</code>
                  </div>
                </div>
                <FieldLabel htmlFor="np-style">الستايل (إلزامي) — سيُحفظ كـ style.md</FieldLabel>
                <TextArea id="np-style" value={newProjectModal.style} onChange={e=>setNewProjectModal(m=>({...m,style:e.target.value,status:''}))} style={{ minHeight: 260 }} aria-label="محتوى style.md" />
              </>
            )}
          </DialogBody>
          <DialogFooter>
            <div style={{ flex:'1 1 auto', minWidth:0 }}><StatusLine status={newProjectModal.status} /></div>
            {newProjectModal.step === 1 ? (
              <DialogButton tone="primary" onClick={goToStyleStep}>التالي: الستايل <ArrowLeft size={14} /></DialogButton>
            ) : (
              <div style={{ display:'flex', gap:8 }}>
                <DialogButton tone="ghost" onClick={()=>setNewProjectModal(m=>({...m,step:1,status:''}))}><ArrowRight size={14} /> رجوع</DialogButton>
                <DialogButton tone="success" onClick={createProject} disabled={newProjectModal.saving}>
                  {newProjectModal.saving ? <Loader2 size={14} style={{ animation:'spin 0.8s linear infinite' }} /> : <FolderPlus size={14} />}
                  {newProjectModal.saving ? 'جارٍ الإنشاء...' : 'إنشاء المشروع'}
                </DialogButton>
              </div>
            )}
          </DialogFooter>
        </Dialog>
      )}

      {deleteModal.open && (
        <Dialog phase={deleteModal.phase} onClose={closeDeleteModal} width={480} labelledBy="dlg-del-title">
          <DialogHeader
            tone="red"
            icon={Trash2}
            title="حذف المشروع"
            subtitle="لا يمكن التراجع عن هذا الإجراء"
            onClose={closeDeleteModal}
            labelledBy="dlg-del-title"
          />
          <DialogBody>
            <div role="alert" style={{ display:'flex', gap:10, alignItems:'flex-start', background:'rgba(239,68,68,0.09)', border:'1px solid rgba(239,68,68,0.35)', padding:'11px 12px', borderRadius:10, marginBottom:12 }}>
              <AlertTriangle size={16} color="#fca5a5" style={{ flexShrink:0, marginTop:2 }} />
              <div style={{ fontSize:12, lineHeight:1.8, color:'#fecaca' }}>سيُحذف مجلد المشروع و<b>كل صفحاته وملفاته نهائيًا</b> من القرص.</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'#0e0e11', border:'1px solid #23232b', borderRadius:10, padding:'10px 12px' }}>
              <span style={{ width:36, height:36, flexShrink:0, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.35)' }}>
                <FolderOpen size={17} color="#fca5a5" />
              </span>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#f4f4f5', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{deleteModal.project?.name || deleteModal.project?.id}</div>
                <code dir="ltr" style={{ fontSize:10.5, color:'#71717a' }}>projects/{deleteModal.project?.id}/</code>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <div style={{ flex:'1 1 auto', minWidth:0 }}><StatusLine status={deleteModal.status} /></div>
            <div style={{ display:'flex', gap:8 }}>
              <DialogButton tone="ghost" onClick={closeDeleteModal} disabled={deleteModal.saving}>إلغاء</DialogButton>
              <DialogButton tone="danger" onClick={confirmDeleteProject} disabled={deleteModal.saving}>
                {deleteModal.saving ? <Loader2 size={14} style={{ animation:'spin 0.8s linear infinite' }} /> : <Trash2 size={14} />}
                {deleteModal.saving ? 'جارٍ الحذف...' : 'حذف المشروع'}
              </DialogButton>
            </div>
          </DialogFooter>
        </Dialog>
      )}
      </div>
    </div>
  );
}
