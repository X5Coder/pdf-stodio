import React, { createContext, useContext, useMemo } from 'react';
import { PRESETS, THEMES, SERIES, FONT_FAMILY, MAX_MEASURE, getFS, getSP } from './tokens.js';

const DEFAULT_DS_CONFIG = {
  preset: 'a4',
  orientation: null,
  theme: 'forest',
  dir: 'rtl',
  lang: 'ar',
};

const DSContext = createContext(null);

export function resolvePresetName(config = {}) {
  const rawPreset = String(config.preset || DEFAULT_DS_CONFIG.preset).toLowerCase();
  const orientation = config.orientation ? String(config.orientation).toLowerCase() : null;

  if (orientation === 'portrait' || orientation === 'landscape') {
    if (rawPreset === 'a4' || rawPreset === 'a4l') return orientation === 'landscape' ? 'a4l' : 'a4';
    if (rawPreset === 'letter' || rawPreset === 'letterl') return orientation === 'landscape' ? 'letterl' : 'letter';
    if (rawPreset === 'slide') {
      // slide افتراضي أفقي؛ لو طُلب عمودي نقلب الأبعاد عبر preset مشتق ديناميكيًا في buildDS
      return 'slide';
    }
  }

  return PRESETS[rawPreset] ? rawPreset : DEFAULT_DS_CONFIG.preset;
}

export function buildDS(config = {}) {
  const merged = { ...DEFAULT_DS_CONFIG, ...(config || {}) };
  const presetName = resolvePresetName(merged);
  let preset = PRESETS[presetName] ?? PRESETS.a4;
  let effectivePresetName = presetName;

  const orientation = merged.orientation ? String(merged.orientation).toLowerCase() : null;
  if (presetName === 'slide' && orientation === 'portrait') {
    preset = { ...preset, w: preset.h, h: preset.w, marginX: preset.marginY, marginY: preset.marginX };
    effectivePresetName = 'slide-portrait';
  }

  const c = THEMES[merged.theme] ?? THEMES.forest ?? THEMES.calm;
  const fs = getFS(presetName);
  const sp = getSP(presetName);
  return {
    preset: effectivePresetName,
    basePreset: presetName,
    orientation: orientation || (preset.w >= preset.h ? 'landscape' : 'portrait'),
    theme: merged.theme || DEFAULT_DS_CONFIG.theme,
    dir: merged.dir || DEFAULT_DS_CONFIG.dir,
    lang: merged.lang || DEFAULT_DS_CONFIG.lang,
    dims: preset,
    c,
    fs,
    sp,
    series: SERIES,
    font: FONT_FAMILY,
    measure: MAX_MEASURE,
    lhBody: preset.lhBody,
    lhHeading: preset.lhHeading,
  };
}

export function DSProvider({ config, children }) {
  const value = useMemo(() => buildDS(config), [
    config?.preset,
    config?.orientation,
    config?.theme,
    config?.dir,
    config?.lang,
  ]);
  return <DSContext.Provider value={value}>{children}</DSContext.Provider>;
}

export function useDSContext() {
  return useContext(DSContext);
}
