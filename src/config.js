// إعداد المشروع النشط (يدعم التبديل بين المشاريع المسجلة)
export const DEFAULT_PROJECT = 'default';

export function getCurrentProject() {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('pdf-studio-active-project');
    if (saved) return saved;
  }
  return DEFAULT_PROJECT;
}

export const CURRENT_PROJECT = getCurrentProject();

export const PROJECT_DEFAULTS = {
  default: {
    preset: 'slide',
    theme: 'forest',
    dir: 'rtl',
    lang: 'ar',
    orientation: 'landscape',
    title: 'دليل عملي لإعداد دراسة جدوى متكاملة',
  },
  'graduation-roeda': {
    preset: 'a4',
    theme: 'warm',
    dir: 'rtl',
    lang: 'ar',
    orientation: 'portrait',
    title: 'مشروع تخرج رويدا',
  },
};

export function getProjectDefaults(projectId) {
  return PROJECT_DEFAULTS[projectId] || PROJECT_DEFAULTS[DEFAULT_PROJECT];
}

// للتوافق مع الكود القديم
export const PDF_CONFIG = getProjectDefaults(CURRENT_PROJECT);
