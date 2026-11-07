// Project Loader - تحميل المشاريع والصفحات ديناميكياً

export async function loadProjects() {
  // تحميل قائمة المشاريع من مجلد projects/
  // في بيئة المتصفح، سنستخدم قائمة ثابتة لأننا لا نستطيع قراءة نظام الملفات مباشرة
  // يمكن تحسين هذا باستخدام API على الخادم

  const projects = [
    {
      id: 'default',
      name: 'دليل عملي لإعداد دراسة جدوى متكاملة',
      path: 'default'
    }
  ];

  // إضافة مشاريع أخرى يمكن قراءتها من localStorage أو من خادم
  const savedProjects = localStorage.getItem('pdf-studio-projects');
  if (savedProjects) {
    try {
      const parsed = JSON.parse(savedProjects);
      projects.push(...parsed);
    } catch (e) {
      console.error('Failed to load saved projects:', e);
    }
  }

  return projects;
}

export async function loadProjectConfig(projectId) {
  // تحميل إعدادات المشروع من project.json
  // في بيئة التطوير، سنستخدم ملف JSON ثابت
  try {
    const response = await fetch(`/projects/${projectId}/project.json`);
    if (!response.ok) throw new Error('Failed to load project config');
    return await response.json();
  } catch (e) {
    console.error('Failed to load project config:', e);
    return null;
  }
}

export async function loadPage(projectId, pageNumber) {
  // تحميل صفحة معينة من المشروع
  try {
    const pageNum = pageNumber.toString().padStart(2, '0');
    const response = await fetch(`/projects/${projectId}/pages/page${pageNum}/page.jsx`);
    if (!response.ok) throw new Error('Failed to load page');
    const code = await response.text();

    // تحويل النص إلى كومبوننت React ديناميكياً
    // هذا يتطلب استخدام react-loadable أو babel-standalone
    // للتبسيط، سنفترض أن الصفحات مُسبقة التحميل

    return code;
  } catch (e) {
    console.error('Failed to load page:', e);
    return null;
  }
}

export async function loadAllPages(projectId) {
  // تحميل جميع صفحات المشروع
  const config = await loadProjectConfig(projectId);
  if (!config) return [];

  const pages = [];
  for (let i = 1; i <= config.totalPages; i++) {
    const pageCode = await loadPage(projectId, i);
    if (pageCode) {
      pages.push({ number: i, code: pageCode });
    }
  }

  return pages;
}

export function saveProjects(projects) {
  // حفظ قائمة المشاريع في localStorage
  localStorage.setItem('pdf-studio-projects', JSON.stringify(projects));
}
