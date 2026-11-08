import { BASE_CONFIG } from '../config.js';
import { PRESETS, THEMES, SERIES, FONT_FAMILY, MAX_MEASURE, getFS, getSP } from './tokens.js';
import { useDSContext } from './context.jsx';

// Hook للوصول لإعدادات/مقاسات التصميم.
// المصدر الأساسي هو DSProvider (إعدادات المشروع)، مع fallback أساسي عند الاستخدام خارج السياق.
export function useDS() {
  const ctx = useDSContext();
  if (ctx) return ctx;

  const preset = PRESETS[BASE_CONFIG.preset] ?? PRESETS.slide;
  const c = THEMES[BASE_CONFIG.theme] ?? THEMES.forest;
  const fs = getFS(BASE_CONFIG.preset);
  const sp = getSP(BASE_CONFIG.preset);
  return {
    preset: BASE_CONFIG.preset,
    theme: BASE_CONFIG.theme,
    dir: BASE_CONFIG.dir,
    dims: preset,
    c,
    fs,
    sp,
    series: SERIES,
    font: FONT_FAMILY,
    measure: MAX_MEASURE,
    lhBody: preset.lhBody,
    lhHeading: preset.lhHeading,
    title: 'PDF Studio',
  };
}
