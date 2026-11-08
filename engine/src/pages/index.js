// تسجيل صفحات المشاريع (يدعم خريطة page-N/page.jsx ديناميكيًا عبر Vite glob)
import { getCurrentProject } from '../config.js';

// new map: projects/<id>/page-N/page.jsx (وأيضًا content.jsx كبديل)
const modules = {
  ...import.meta.glob('../../../projects/*/page-*/page.jsx', { eager: true }),
  ...import.meta.glob('../../../projects/*/page-*/content.jsx', { eager: true }),
};

function parsePageModulePath(path) {
  // .../projects/<projectId>/page-<n>/page.jsx
  const m = path.match(/\/projects\/([^/]+)\/page-(\d+)\/(?:page|content)\.jsx$/);
  if (!m) return null;
  return { projectId: m[1], pageNo: parseInt(m[2], 10) };
}

function buildProjectPages() {
  const byProject = {};
  for (const [path, mod] of Object.entries(modules)) {
    const info = parsePageModulePath(path.replace(/\\/g, '/'));
    if (!info) continue;
    const comp = mod?.default || mod?.Page || null;
    if (!comp) continue;
    if (!byProject[info.projectId]) byProject[info.projectId] = [];
    byProject[info.projectId].push({ pageNo: info.pageNo, comp });
  }
  const result = {};
  for (const [pid, items] of Object.entries(byProject)) {
    items.sort((a, b) => a.pageNo - b.pageNo);
    result[pid] = items.map((x) => x.comp);
  }
  return result;
}

export const PROJECT_PAGES = buildProjectPages();

export function getPages(projectId) {
  return PROJECT_PAGES[projectId] || PROJECT_PAGES.default || [];
}

// للتوافق مع الكود القديم
export const PAGES = getPages(getCurrentProject());
