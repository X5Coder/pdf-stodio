// تسجيل صفحات المشاريع (projects/<id>/page-N/page.jsx — وأيضًا content.jsx كبديل)
// اكتشاف مزدوج: (أ) glob ثابت وقت البناء/الإقلاع، (ب) اكتشاف ديناميكي وقت التشغيل
// عبر /__pdfstudio/pages — عشان أي صفحة تُضاف/تُحذف تظهر بلا إعادة تشغيل للسيرفر.
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
    result[pid] = items;
  }
  return result;
}

const STATIC_ITEMS = buildProjectPages();
const STATIC_COMPS = {};
for (const [pid, items] of Object.entries(STATIC_ITEMS)) {
  STATIC_COMPS[pid] = items.map((x) => x.comp);
}

// ذاكرة وقت التشغيل: الصفحات التي اكتُشفت ديناميكيًا (غير الموجودة في الـ glob الثابت)
// وأيضًا القائمة المدمجة النهائية لكل مشروع بعد آخر فحص
const runtimeState = {}; // pid -> { extra: { pageNo: comp }, merged: [comp], pageNos: [n] }

export function getPages(projectId) {
  // لا يُرجع صفحات مشروع آخر بصمت — إرجاع فاضي يعرض حالة "لا توجد صفحات" بشكل صحيح
  if (!projectId) return [];
  const rt = runtimeState[projectId];
  if (rt) return rt.merged;
  return STATIC_COMPS[projectId] || [];
}

// يفحص القرص عبر المحرك ويستورد أي صفحة جديدة ديناميكيًا.
// يُرجع true إذا تغيّرت القائمة (لازم إعادة رندر).
export async function refreshProjectPages(projectId) {
  if (!projectId) return false;
  try {
    const r = await fetch(`/__pdfstudio/pages?project=${encodeURIComponent(projectId)}`, { cache: 'no-store' });
    if (!r.ok) return false;
    const d = await r.json();
    if (!d?.ok || !Array.isArray(d.pages)) return false;

    const staticItems = STATIC_ITEMS[projectId] || [];
    const staticByNo = new Map(staticItems.map((p) => [p.pageNo, p.comp]));
    const prev = runtimeState[projectId];
    const extra = { ...(prev?.extra || {}) };

    const merged = [];
    const pageNos = [];
    for (const n of d.pages) {
      if (staticByNo.has(n)) { merged.push(staticByNo.get(n)); pageNos.push(n); continue; }
      if (extra[n]) { merged.push(extra[n]); pageNos.push(n); continue; }
      const url = d.urls && d.urls[n];
      if (!url) continue;
      try {
        const mod = await import(/* @vite-ignore */ url);
        const comp = mod?.default || mod?.Page || null;
        if (comp) { extra[n] = comp; merged.push(comp); pageNos.push(n); }
      } catch (e) {
        console.warn('[pdf-studio] تعذر استيراد الصفحة ديناميكيًا:', url, e);
      }
    }

    // هل تغيّرت القائمة فعلًا؟
    const prevNos = prev ? prev.pageNos : staticItems.map((p) => p.pageNo);
    const changed = pageNos.length !== prevNos.length || pageNos.some((n, i) => n !== prevNos[i]);

    runtimeState[projectId] = { extra, merged, pageNos };
    return changed;
  } catch {
    return false;
  }
}
