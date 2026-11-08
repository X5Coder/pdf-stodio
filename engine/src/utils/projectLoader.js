// Project Loader — اكتشاف المشاريع/الإعدادات من القرص (عبر المحرك) مع glob كاحتياط

const projectJsonModules = import.meta.glob('../../../projects/*/project.json', { eager: true });
const styleModules = import.meta.glob('../../../projects/*/style.md', { eager: true, query: '?raw', import: 'default' });

function pidFromPath(path) {
  const m = path.replace(/\\/g, '/').match(/\/projects\/([^/]+)\/(?:project\.json|style\.md)$/);
  return m ? m[1] : null;
}

function hasStyle(projectId) {
  return Object.keys(styleModules).some((p) => pidFromPath(p) === projectId);
}

export function getStyleContent(projectId) {
  for (const [p, raw] of Object.entries(styleModules)) {
    if (pidFromPath(p) === projectId) return raw;
  }
  return null;
}

function globProjects() {
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
  return map;
}

// قائمة المشاريع من المحرك مباشرة (يقرأ مجلد projects/ من القرص) —
// هذا المصدر الموثوق: يشمل أي مشروع تم إنشاؤه/حذفه للتو دون الاعتماد على إعادة تشغيل المحرك.
async function fetchRuntimeProjects() {
  try {
    const r = await fetch('/__pdfstudio/projects', { cache: 'no-store' });
    if (!r.ok) return null;
    const d = await r.json().catch(() => null);
    if (!d?.ok || !Array.isArray(d.projects)) return null;
    return d.projects
      .filter((p) => p && typeof p.id === 'string' && p.id)
      .map((p) => ({
        id: p.id,
        name: p.name || p.id,
        description: p.description || '',
        path: p.id,
        hasStyle: !!p.hasStyle,
        config: p.config || {},
      }));
  } catch {
    return null;
  }
}

export async function loadProjects() {
  const map = new Map();
  // 1) المصدر الأساسي: قائمة المحرك (قرص)
  const runtime = await fetchRuntimeProjects();
  if (runtime) {
    for (const p of runtime) map.set(p.id, p);
  }
  // 2) مصدر احتياط (وقت التحويل) — يملأ الفجوات فقط
  for (const [id, p] of globProjects()) {
    if (!map.has(id)) map.set(id, p);
  }
  return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id));
}

export async function loadProjectConfig(projectId) {
  if (!projectId) return null;
  for (const [p, mod] of Object.entries(projectJsonModules)) {
    if (pidFromPath(p) === projectId) return mod?.default || mod || null;
  }
  try {
    const r = await fetch(`/__pdfstudio/config?project=${encodeURIComponent(projectId)}`, { cache: 'no-store' });
    if (r.ok) { const d = await r.json(); if (d?.ok && d.config) return d.config; }
  } catch {}
  return null;
}
