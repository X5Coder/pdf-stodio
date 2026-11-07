// Tokens الوحيدة المسموحة في المشروع (قاعدة w2).
// ممنوع كتابة hex / font-size / px حرة داخل الصفحات — استخدم useDS() فقط.

export const PRESETS = {
  slide: { w: 1280, h: 720, marginX: 72, marginY: 56, base: 22, min: 16, lhBody: 1.45, lhHeading: 1.35, isSlide: true },
  a4: { w: 794, h: 1123, marginX: 84, marginY: 76, base: 15, min: 11, lhBody: 1.6, lhHeading: 1.45, isSlide: false },
  a4l: { w: 1123, h: 794, marginX: 72, marginY: 60, base: 15, min: 11, lhBody: 1.6, lhHeading: 1.45, isSlide: false },
  letter: { w: 816, h: 1056, marginX: 84, marginY: 76, base: 15, min: 11, lhBody: 1.6, lhHeading: 1.45, isSlide: false },
  letterl: { w: 1056, h: 816, marginX: 72, marginY: 60, base: 15, min: 11, lhBody: 1.6, lhHeading: 1.45, isSlide: false }
};

// مقياس الخطوط fs — قيم ثابتة للمشروع
const FS_SLIDE = { caption: 17.5, small: 20, body: 22, lead: 27.5, h3: 27.5, h2: 34.5, title: 43, display: 67 };
// compact: استثناء موثق بقرار صريح من المستخدم — للصفحات الكثيفة التي تُبنى
// نسخة طبق الأصل من تصميم مرسل. تحت الحد الأدنى (t2) — ممنوع استخدامه افتراضياً.
FS_SLIDE.compact = 14;
const FS_DOC = { caption: 12.5, small: 13.5, body: 15, lead: 18, h3: 18, h2: 21.5, title: 26, display: 45 };
FS_DOC.compact = 11;

export function getFS(presetName) {
  const p = PRESETS[presetName] ?? PRESETS.a4;
  return p.isSlide ? FS_SLIDE : FS_DOC;
}

// مقياس المسافات sp (قاعدة g2) — مضروب ×1.5 في السلايد تلقائياً
const SP_DOC = [0, 4, 8, 12, 16, 24, 32, 48, 64];

export function getSP(presetName) {
  const p = PRESETS[presetName] ?? PRESETS.a4;
  const k = p.isSlide ? 1.5 : 1;
  return (n) => {
    const clamped = Math.max(0, Math.min(8, n));
    const lo = Math.floor(clamped);
    const hi = Math.ceil(clamped);
    const v = SP_DOC[lo] + (SP_DOC[hi] - SP_DOC[lo]) * (clamped - lo);
    return v * k;
  };
}

export const THEMES = {
  calm: {
    bg: '#FFFFFF',
    surface: '#F4F6F9',
    card: '#FFFFFF',
    text: '#18212D',
    textMuted: '#5C6B7D',
    primary: '#1D3557',
    primaryLight: '#2C4F7C',
    accent: '#3B82F6',
    accentLight: '#60A5FA',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    brand: '#1D3557',
    border: 'rgba(29, 53, 87, 0.12)',
    borderSubtle: 'rgba(29, 53, 87, 0.06)'
  },
  warm: {
    bg: '#FBF8F3',
    surface: '#F3EEE6',
    card: '#FFFFFF',
    text: '#2A2420',
    textMuted: '#6B6056',
    primary: '#2F2A26',
    primaryLight: '#48403B',
    accent: '#A9491F',
    accentLight: '#C95E2D',
    accentBg: 'rgba(169, 73, 31, 0.1)',
    brand: '#2F2A26',
    border: 'rgba(47, 42, 38, 0.12)',
    borderSubtle: 'rgba(47, 42, 38, 0.06)'
  },
  forest: {
    bg: '#FFFFFF',
    surface: '#F5F8F6',
    card: '#FFFFFF',
    text: '#17231C',
    textMuted: '#586E62',
    primary: '#153C2D',
    primaryLight: '#1F4D3A',
    accent: '#3B82F6',
    accentLight: '#60A5FA',
    accentBg: 'rgba(59, 130, 246, 0.1)',
    brand: '#153C2D',
    border: 'rgba(21, 60, 45, 0.12)',
    borderSubtle: 'rgba(21, 60, 45, 0.06)'
  }
};

// ألوان بيانات الرسوم — Okabe-Ito (قاعدة c6)
export const SERIES = ['#0072B2', '#E69F00', '#009E73', '#D55E00', '#CC79A7', '#56B4E9'];

export const FONT_FAMILY = "'IBM Plex Sans Arabic', 'Noto Sans Arabic', Tahoma, sans-serif";

export const MAX_MEASURE = '72ch';
