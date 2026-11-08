// نظام الحوارات (Modals) الخاص بشل المعاينة — تصميم موحّد، داكن، RTL
import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export const dialogTones = {
  blue:  { iconBg: 'rgba(59,130,246,0.14)', iconBorder: 'rgba(59,130,246,0.38)', icon: '#93c5fd' },
  amber: { iconBg: 'rgba(245,158,11,0.12)', iconBorder: 'rgba(245,158,11,0.35)', icon: '#fcd34d' },
  red:   { iconBg: 'rgba(239,68,68,0.12)',  iconBorder: 'rgba(239,68,68,0.35)',  icon: '#fca5a5' },
  green: { iconBg: 'rgba(34,197,94,0.12)',  iconBorder: 'rgba(34,197,94,0.35)',  icon: '#86efac' },
};

const FOCUS_RING = '0 0 0 3px rgba(59,130,246,0.28)';

// الإطار العام: الخلفية + اللوحة + الإغلاق بالـ Esc / الضغط خارجها
export function Dialog({ phase = 'entered', onClose, width = 560, labelledBy, children }) {
  const shown = phase === 'entered';

  useEffect(() => {
    if (!onClose) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      role="presentation"
      dir="rtl"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        background: shown ? 'rgba(5,5,9,0.72)' : 'rgba(5,5,9,0)',
        backdropFilter: shown ? 'blur(6px)' : 'blur(0px)',
        WebkitBackdropFilter: shown ? 'blur(6px)' : 'blur(0px)',
        transition: 'background 220ms ease, backdrop-filter 220ms ease',
      }}
    >
      <style>{'.dlg-panel::-webkit-scrollbar,.dlg-nosb::-webkit-scrollbar{display:none}'}</style>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="dlg-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width, maxHeight: '88vh', overflow: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          background: '#131318',
          border: '1px solid #27272e',
          borderRadius: 16,
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.45)',
          color: '#e8e8ec',
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// رأس الحوار: أيقونة ملوّنة + عنوان + وصف + زر إغلاق
export function DialogHeader({ tone = 'blue', icon: Icon, title, subtitle, onClose, labelledBy }) {
  const t = dialogTones[tone] || dialogTones.blue;
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        borderBottom: '1px solid #1f1f26',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 38, height: 38, flexShrink: 0, borderRadius: 11,
          background: t.iconBg, border: `1px solid ${t.iconBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {Icon ? <Icon size={19} color={t.icon} strokeWidth={1.8} /> : null}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div id={labelledBy} style={{ fontWeight: 700, fontSize: 14.5, color: '#f4f4f5', lineHeight: 1.35 }}>{title}</div>
        {subtitle ? <div style={{ fontSize: 11.5, color: '#8b8b96', marginTop: 2, lineHeight: 1.5 }}>{subtitle}</div> : null}
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          title="إغلاق (Esc)"
          className="dlg-close"
          style={{
            width: 30, height: 30, flexShrink: 0, borderRadius: 8,
            border: '1px solid transparent', background: 'transparent',
            color: '#8b8b96', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#1e1e24'; e.currentTarget.style.color = '#e8e8ec'; e.currentTarget.style.borderColor = '#2c2c34'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b8b96'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
          <X size={15} />
        </button>
      ) : null}
    </div>
  );
}

// جسم الحوار
export function DialogBody({ children, style }) {
  return <div style={{ padding: '16px 18px', ...style }}>{children}</div>;
}

// تذييل الحوار: حالة (يمين) + أزرار (يسار/آخر الصف)
export function DialogFooter({ children }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        padding: '12px 18px',
        borderTop: '1px solid #1f1f26',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
}

const BUTTON_BASE = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
  height: 34, paddingInline: 14, borderRadius: 9,
  fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600,
  border: '1px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap',
  transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease, opacity 0.15s ease',
};

const BUTTON_VARIANTS = {
  ghost:   { background: 'transparent', borderColor: '#2d2d35', color: '#d4d4d8' },
  primary: { background: '#2563eb', borderColor: '#3b82f6', color: '#ffffff' },
  success: { background: '#16a34a', borderColor: '#22c55e', color: '#ffffff' },
  danger:  { background: '#dc2626', borderColor: '#ef4444', color: '#ffffff' },
};

const BUTTON_HOVER = {
  ghost:   { background: '#1d1d23', borderColor: '#3a3a44', color: '#f4f4f5' },
  primary: { background: '#1d4ed8', borderColor: '#60a5fa', color: '#ffffff' },
  success: { background: '#15803d', borderColor: '#4ade80', color: '#ffffff' },
  danger:  { background: '#b91c1c', borderColor: '#f87171', color: '#ffffff' },
};

export function DialogButton({ tone = 'ghost', disabled, style, children, ...rest }) {
  const v = BUTTON_VARIANTS[tone] || BUTTON_VARIANTS.ghost;
  const h = BUTTON_HOVER[tone] || BUTTON_HOVER.ghost;
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        ...BUTTON_BASE, ...v,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) Object.assign(e.currentTarget.style, h); }}
      onMouseLeave={(e) => { if (!disabled) Object.assign(e.currentTarget.style, v); }}
    >
      {children}
    </button>
  );
}

// سطر الحالة: نجاح (✓) أخضر أو خطأ أحمر
export function StatusLine({ status }) {
  if (!status) return null;
  const ok = status.includes('✓');
  const color = ok ? '#86efac' : '#fca5a5';
  const bg = ok ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)';
  const border = ok ? 'rgba(34,197,94,0.30)' : 'rgba(239,68,68,0.30)';
  const Icon = ok ? CheckCircle2 : AlertCircle;
  return (
    <span
      role="status"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11.5, fontWeight: 500, color,
        background: bg, border: `1px solid ${border}`,
        borderRadius: 999, padding: '4px 10px', lineHeight: 1.4,
      }}
    >
      <Icon size={13} style={{ flexShrink: 0 }} />
      <span>{status}</span>
    </span>
  );
}

// حقل نصي بسلوك تركيز واضح
export function TextInput({ style, invalid, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...rest}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: '#0e0e11', color: '#ececef',
        border: `1px solid ${invalid ? 'rgba(239,68,68,0.55)' : focused ? '#3b82f6' : '#26262e'}`,
        boxShadow: focused && !invalid ? FOCUS_RING : 'none',
        borderRadius: 10, padding: '10px 12px',
        fontFamily: 'inherit', fontSize: 13, outline: 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        ...style,
      }}
    />
  );
}

// مساحة نص (محرر style.md / قالب) — تُكتب بنفس اتجاه النص
export function TextArea({ style, className, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...rest}
      spellCheck={false}
      onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: '#0e0e11', color: '#d4d4d8',
        border: `1px solid ${focused ? '#3b82f6' : '#26262e'}`,
        boxShadow: focused ? FOCUS_RING : 'none',
        borderRadius: 10, padding: '12px 14px',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: 12, lineHeight: 1.7,
        direction: 'ltr', textAlign: 'left',
        overflow: 'auto', resize: 'vertical', outline: 'none',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        ...style,
      }}
      className={`dlg-nosb ${className || ''}`.trim()}
    />
  );
}

// تسميات الحقول
export function FieldLabel({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'block', fontSize: 11.5, fontWeight: 600, color: '#a1a1aa', marginBottom: 6, letterSpacing: '0.2px' }}>
      {children}
    </label>
  );
}

// مؤشر خطوات (wizard)
export function Stepper({ steps, current }) {
  return (
    <div dir="rtl" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <React.Fragment key={n}>
            {i > 0 && (
              <div aria-hidden="true" style={{ flex: 1, height: 2, borderRadius: 2, background: done || active ? '#3b82f6' : '#24242b', transition: 'background 0.25s ease' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: done ? '#16a34a' : active ? '#2563eb' : '#1c1c22',
                  border: `1px solid ${done ? '#22c55e' : active ? '#60a5fa' : '#2d2d35'}`,
                  color: done || active ? '#ffffff' : '#8b8b96',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
              >
                {done ? <CheckCircle2 size={13} /> : n}
              </div>
              <span style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? '#e8e8ec' : done ? '#86efac' : '#71717a', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
