// إعداد المشروع النشط (متوافق مع الخريطة الجديدة)
export const DEFAULT_PROJECT = 'default';

export function getCurrentProject() {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('pdf-studio-active-project');
    if (saved) return saved;
  }
  return DEFAULT_PROJECT;
}

export const CURRENT_PROJECT = getCurrentProject();

// افتراضات عامة — تفاصيل كل مشروع تأتي من project.json / style.md
export const PROJECT_DEFAULTS = {
  default: {
    preset: 'slide',
    theme: 'forest',
    dir: 'rtl',
    lang: 'ar',
    orientation: 'landscape',
    title: 'PDF Studio',
  },
};

const GENERIC_DEFAULTS = {
  preset: 'slide',
  theme: 'forest',
  dir: 'rtl',
  lang: 'ar',
  orientation: 'landscape',
  title: 'PDF Studio',
};

export function getProjectDefaults(projectId) {
  if (projectId && PROJECT_DEFAULTS[projectId]) return PROJECT_DEFAULTS[projectId];
  if (projectId === 'default' || !projectId) return PROJECT_DEFAULTS.default;
  return GENERIC_DEFAULTS;
}

// للتوافق مع الكود القديم
export const PDF_CONFIG = getProjectDefaults(CURRENT_PROJECT);
