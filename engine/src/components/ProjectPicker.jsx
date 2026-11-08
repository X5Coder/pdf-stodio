// شاشة اختيار المشروع — صفوف مستطيلة هادئة، تُعرض دائمًا عند فتح التطبيق
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, FolderPlus, Trash2, ChevronLeft, Plus, LayoutGrid } from 'lucide-react';

const SHELL_BG = '#0a0a0a';
const ROW_BG = '#121216';
const ROW_BG_HOVER = '#17171d';
const BORDER = '#212127';
const BORDER_HOVER = 'rgba(59,130,246,0.40)';
const TEXT = '#f4f4f5';
const TEXT_DIM = '#8b8b96';
const TEXT_FAINT = '#63636d';

function ProjectRow({ project, onDelete }) {
  const nav = useNavigate();
  const [hover, setHover] = useState(false);
  const id = project.id;
  const name = project.name || id;
  const totalPages = project?.config?.totalPages;
  const open = () => nav(`/project/${encodeURIComponent(id)}`);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`الدخول إلى مشروع ${name}`}
      onClick={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', minHeight: 74, cursor: 'pointer', userSelect: 'none',
        background: hover ? ROW_BG_HOVER : ROW_BG,
        border: `1px solid ${hover ? BORDER_HOVER : BORDER}`,
        borderRadius: 14, padding: '10px 14px', boxSizing: 'border-box',
        transition: 'background 0.16s ease, border-color 0.16s ease, transform 0.16s ease',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        outline: 'none', textAlign: 'right',
      }}
    >
      {/* أيقونة المشروع */}
      <span
        aria-hidden="true"
        style={{
          width: 46, height: 46, flexShrink: 0, borderRadius: 11,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.28)',
        }}
      >
        <FolderOpen size={21} color="#93c5fd" strokeWidth={1.7} />
      </span>

      {/* الاسم + بيانات صغيرة */}
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5, color: TEXT_DIM }}>
          {typeof totalPages === 'number' && <span>{totalPages} صفحة</span>}
          {typeof totalPages === 'number' && <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: '50%', background: TEXT_FAINT }} />}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: project.hasStyle ? '#86efac' : '#fcd34d' }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: project.hasStyle ? '#22c55e' : '#f59e0b' }} />
            {project.hasStyle ? 'style.md' : 'بدون style.md'}
          </span>
        </span>
      </span>

      {/* حذف */}
      {onDelete && (
        <button
          type="button"
          title="حذف المشروع"
          aria-label={`حذف مشروع ${name}`}
          onClick={(e) => { e.stopPropagation(); onDelete(project); }}
          style={{
            width: 32, height: 32, flexShrink: 0, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: '1px solid transparent', color: TEXT_FAINT,
            cursor: 'pointer', transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; e.currentTarget.style.color = '#f87171'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = TEXT_FAINT; }}
          onFocus={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; e.currentTarget.style.color = '#f87171'; }}
          onBlur={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = TEXT_FAINT; }}
        >
          <Trash2 size={15} />
        </button>
      )}

      {/* مؤشر الدخول */}
      <ChevronLeft size={16} color={hover ? '#93c5fd' : TEXT_FAINT} style={{ flexShrink: 0, transition: 'color 0.15s ease' }} aria-hidden="true" />
    </div>
  );
}

export default function ProjectPicker({ projects, loading, onNewProject, onDeleteProject }) {
  return (
    <div dir="rtl" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: SHELL_BG, color: TEXT }}>
      {/* شريط علوي مصغّر */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBlock: 12, paddingInline: 'clamp(16px, 4vw, 32px)', borderBottom: '1px solid #141419' }}>
        <img src="/favicon.svg" alt="PDF Studio" width={20} height={20} style={{ display: 'block', borderRadius: 5 }} />
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2px', color: '#e4e4e7' }}>PDF Studio</span>
        <span style={{ marginInlineStart: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: TEXT_DIM, background: '#121216', border: '1px solid #212127', borderRadius: 999, padding: '3px 10px' }}>
          <LayoutGrid size={12} />
          {loading ? '…' : projects.length}
        </span>
      </header>

      {/* المحتوى */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vh, 48px) 16px' }}>
        <div style={{ width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: 800, color: TEXT, margin: '0 0 6px', letterSpacing: '-0.2px' }}>المشاريع</h1>

          {/* بطاقة إنشاء مشروع — نفس شكل الصفوف */}
          <button
            type="button"
            onClick={onNewProject}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', minHeight: 58, cursor: 'pointer', fontFamily: 'inherit',
              background: 'rgba(59,130,246,0.05)', border: '1.5px dashed rgba(59,130,246,0.35)',
              borderRadius: 14, color: '#93c5fd', fontSize: 14, fontWeight: 800,
              transition: 'background 0.16s ease, border-color 0.16s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.10)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.60)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.05)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'; }}
          >
            <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)' }}>
              <Plus size={16} color="#93c5fd" strokeWidth={2.2} />
            </span>
            مشروع جديد
          </button>

          {/* مشاريع التحميل */}
          {loading && projects.length === 0 && [1, 2, 3].map((i) => (
            <div key={i} aria-hidden="true" style={{ minHeight: 74, borderRadius: 14, border: '1px solid #212127', background: ROW_BG, animation: 'pulse 1.4s ease-in-out infinite' }} />
          ))}

          {/* صفوف المشاريع */}
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} onDelete={onDeleteProject} />
          ))}

          {/* حالة فارغة */}
          {!loading && projects.length === 0 && (
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '10px 0 0', fontSize: 12, color: TEXT_FAINT }}>
              <FolderPlus size={14} />
              لا توجد مشاريع بعد
            </p>
          )}
        </div>
      </main>

      <style>{'@keyframes pulse { 0%,100% { opacity: 0.35 } 50% { opacity: 0.7 } }'}</style>
    </div>
  );
}
