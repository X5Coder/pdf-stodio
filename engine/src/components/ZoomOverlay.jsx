import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// وضع التكبير: شاشة كاملة سوداء تحتوي الصفحة الحقيقية وتسمح بـ:
// عجلة الماوس (zoom حول المؤشر)، السحب للتحرك، pinch بإصبعين، نقرة مزدوجة للتبديل،
// وزر X واحد فقط للإغلاق (أو Escape / النقر على الخلفية).
export default function ZoomOverlay({ open, onClose, pageW, pageH, children, label }) {
  const stageRef = useRef(null);
  const pointersRef = useRef(new Map());
  const gestureRef = useRef(null); // { mode:'pan'|'pinch', ... }
  const downPosRef = useRef({ x: 0, y: 0 });
  const [t, setT] = useState({ scale: 1, x: 0, y: 0 });

  const fit = useCallback(() => {
    if (typeof window === 'undefined') return { scale: 1, x: 0, y: 0 };
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.min(vw / pageW, vh / pageH) * 0.92;
    return { scale: s, x: (vw - pageW * s) / 2, y: (vh - pageH * s) / 2 };
  }, [pageW, pageH]);

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  // إعادة الضبط عند الفتح
  useLayoutEffect(() => {
    if (open) {
      setT(fit());
      pointersRef.current.clear();
      gestureRef.current = null;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, fit]);

  // Escape للإغلاق
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // عجلة الماوس — مستمع غير passive عشان نمنع التمرير الافتراضي
  useEffect(() => {
    if (!open) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      setT((prev) => {
        const factor = Math.exp(-e.deltaY * 0.0016);
        const scale = clamp(prev.scale * factor, 0.25, 6);
        // النقطة تحت المؤشر تبقى ثابتة
        const px = (cx - prev.x) / prev.scale;
        const py = (cy - prev.y) / prev.scale;
        return { scale, x: cx - px * scale, y: cy - py * scale };
      });
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [open]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    downPosRef.current = { x: e.clientX, y: e.clientY };
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = Array.from(pointersRef.current.values());
    if (pts.length === 1) {
      gestureRef.current = { mode: 'pan', startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y };
    } else if (pts.length === 2) {
      const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y;
      gestureRef.current = { mode: 'pinch', dist: Math.hypot(dx, dy) || 1, scale: t.scale, midX: (pts[0].x + pts[1].x) / 2, midY: (pts[0].y + pts[1].y) / 2, origX: t.x, origY: t.y };
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gestureRef.current;
    if (!g) return;
    const pts = Array.from(pointersRef.current.values());

    if (g.mode === 'pan' && pts.length === 1) {
      setT((prev) => ({ ...prev, x: g.origX + (e.clientX - g.startX), y: g.origY + (e.clientY - g.startY) }));
      return;
    }
    if (g.mode === 'pinch' && pts.length >= 2) {
      const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y;
      const dist = Math.hypot(dx, dy) || 1;
      const midX = (pts[0].x + pts[1].x) / 2, midY = (pts[0].y + pts[1].y) / 2;
      setT(() => {
        const scale = clamp(g.scale * (dist / g.dist), 0.25, 6);
        // ثبّت نقطة المنتصف الأصلية تحت المنتصف الحالي
        const px = (g.midX - g.origX) / g.scale;
        const py = (g.midY - g.origY) / g.scale;
        return { scale, x: midX - px * scale, y: midY - py * scale };
      });
    }
  };

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    const pts = Array.from(pointersRef.current.values());
    if (pts.length === 0) gestureRef.current = null;
    else if (pts.length === 1) gestureRef.current = { mode: 'pan', startX: pts[0].x, startY: pts[0].y, origX: t.x, origY: t.y };
  };

  const onDoubleClick = (e) => {
    const target = fit();
    setT((prev) => {
      const zoomed = prev.scale > target.scale * 1.4;
      if (zoomed) return target;
      const stage = stageRef.current;
      const rect = stage?.getBoundingClientRect();
      const cx = e.clientX - (rect?.left || 0);
      const cy = e.clientY - (rect?.top || 0);
      const scale = Math.min(2.4, target.scale * 2.6);
      const px = (cx - prev.x) / prev.scale;
      const py = (cy - prev.y) / prev.scale;
      return { scale, x: cx - px * scale, y: cy - py * scale };
    });
  };

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label || 'وضع التكبير'}
      style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(6,6,8,0.94)' }}
    >
      {/* منطقة التفاعل */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        onClick={(e) => {
          if (e.target === e.currentTarget && Math.hypot(e.clientX - downPosRef.current.x, e.clientY - downPosRef.current.y) < 7) onClose();
        }}
        style={{ position: 'absolute', inset: 0, touchAction: 'none', overflow: 'hidden', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: pageW, height: pageH, transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`, transformOrigin: '0 0', willChange: 'transform' }}>
          {children}
        </div>
      </div>
      {/* زر الإغلاق فقط */}
      <button
        onClick={onClose}
        aria-label="إغلاق وضع التكبير"
        title="إغلاق"
        style={{ position: 'absolute', top: 14, left: 14, zIndex: 1, width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(20,20,22,0.72)', color: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(6px)' }}
      >
        <X size={19} strokeWidth={2} />
      </button>
    </div>,
    document.body
  );
}
