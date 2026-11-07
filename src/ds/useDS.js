import { PDF_CONFIG } from '../config.js';
import { PRESETS, THEMES, SERIES, FONT_FAMILY, MAX_MEASURE, getFS, getSP } from './tokens.js';
import { useDSContext } from './context.jsx';

// Hook للوصول لإعدادات/مقاسات التصميم.
// يفضّل مصدره من DSProvider (إعدادات المشروع)، مع fallback إلى PDF_CONFIG للتوافق.
export function useDS() {
  const ctx = useDSContext();
  if (ctx) return ctx;

  const preset = PRESETS[PDF_CONFIG.preset] ?? PRESETS.a4;
  const c = THEMES[PDF_CONFIG.theme] ?? THEMES.calm;
  const fs = getFS(PDF_CONFIG.preset);
  const sp = getSP(PDF_CONFIG.preset);
  return {
    preset: PDF_CONFIG.preset,
    theme: PDF_CONFIG.theme,
    dir: PDF_CONFIG.dir,
    dims: preset,
    c,
    fs,
    sp,
    series: SERIES,
    font: FONT_FAMILY,
    measure: MAX_MEASURE,
    lhBody: preset.lhBody,
    lhHeading: preset.lhHeading
  };
}
