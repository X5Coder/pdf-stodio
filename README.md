# PDF Studio

محرر/منظّم لمشاريع PDF يعمل مع أي AI Agent. كل مشروع مستقل وله ستايل خاص (`style.md` **إلزامي**)، والهدف صفحات قابلة للمعاينة والتصدير كـ PDF صالح.

## ابدأ هنا
- **`SKILL.md`** — السكيل الأساسية والوحيدة (اقرأها أولًا): تقرأ الكل، تعرض المشاريع، تطلب اختيار المستخدم، وتفرض مراجعة/إنشاء `style.md`.
- **`PROJECT_MAP.md`** — الخريطة المعتمدة.

## الخريطة (مختصر)
- الجذر: `SKILL.md`, `engine/`, `projects/`, `fonts/`, `tools/` (+ `tests/`, docs)
- `engine/`: المعاينة/Preview (Top bar: مشاريع + تنزيل/تحويل PDF + Next/Prev) + كود Vite/React (`src/`, `public/`, `index.html`)
- `projects/<name>/`: `style.md` (إلزامي), `project.json`, `font/` (اختياري), `page-N/page.jsx` + `images/`
- `tools/`: image-search / font-search

## التشغيل
```bash
cd engine
npm install
npm run dev
```
أو من الجذر: `start-dev.bat` (يشغّل `engine/start-dev.bat`).

## ملاحظات واجهة
- زر الستايل: مراجعة/عرض `style.md` (نافذة بأنيميشن فتح/إغلاق وبدون سكرول ظاهر) — **لا تفتح تلقائيًا عند تبديل المشروع**.
- اكتشاف الصفحات تلقائي من `projects/*/page-N/page.jsx` (أو `content.jsx`).