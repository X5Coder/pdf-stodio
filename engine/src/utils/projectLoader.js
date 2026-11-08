// Project Loader - اكتشاف المشاريع/الإعدادات (متوافق مع الخريطة الجديدة: style.md إلزامي)

const projectJsonModules = import.meta.glob('../../../projects/*/project.json', { eager: true });
const styleModules = import.meta.glob('../../../projects/*/style.md', { eager: true, query: '?raw', import: 'default' });

function pidFromPath(path) {
  const m = path.replace(/\\/g, '/').match(/\/projects\/([^/]+)\/(?:project\.json|style\.md)$/);
  return m ? m[1] : null;
}

export function hasStyle(projectId) {
  return Object.keys(styleModules).some((p) => pidFromPath(p) === projectId);
}

export function getStyleContent(projectId) {
  for (const [p, raw] of Object.entries(styleModules)) {
    if (pidFromPath(p) === projectId) return raw;
  }
  return null;
}

export async function loadProjects() {
  const map = new Map();
  for (const [p, mod] of Object.entries(projectJsonModules)) {
    const id = pidFromPath(p);
    if (!id) continue;
    const data = mod?.default || mod || {};
    map.set(id, {
      id,
      name: data.name || id,
      description: data.description || '',
      path: id,
      hasStyle: hasStyle(id),
      config: data,
    });
  }
  // include projects that have style.md but maybe missing project.json
  for (const p of Object.keys(styleModules)) {
    const id = pidFromPath(p);
    if (!id || map.has(id)) continue;
    map.set(id, { id, name: id, description: '', path: id, hasStyle: true, config: {} });
  }
  // merge any locally saved projects
  const savedProjects = localStorage.getItem('pdf-studio-projects');
  if (savedProjects) {
    try {
      const parsed = JSON.parse(savedProjects);
      for (const sp of parsed) {
        if (sp?.id && !map.has(sp.id)) map.set(sp.id, { ...sp, hasStyle: hasStyle(sp.id) });
      }
    } catch (e) {
      console.error('Failed to load saved projects:', e);
    }
  }
  return Array.from(map.values());
}

export async function loadProjectConfig(projectId) {
  for (const [p, mod] of Object.entries(projectJsonModules)) {
    if (pidFromPath(p) === projectId) return mod?.default || mod || null;
  }
  try {
    const r = await fetch(`/__pdfstudio/config?project=${encodeURIComponent(projectId)}`, { cache: 'no-store' });
    if (r.ok) { const d = await r.json(); if (d?.ok && d.config) return d.config; }
  } catch {}
  return null;
}

export async function loadPage(_projectId, _pageNumber) {
  // new map uses build-time glob registration in src/pages/index.js
  return null;
}

export async function loadAllPages(_projectId) {
  return [];
}

export function saveProjects(projects) {
  localStorage.setItem('pdf-studio-projects', JSON.stringify(projects));
}
