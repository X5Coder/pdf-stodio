# PDF Studio - Project Map (الخريطة المعتمدة)

> **المرجع التنظيمي للبنية.** السكيل الوحيدة: `SKILL.md` (اقرأها أولًا).
> لا ستايل عالمي مفروض — ستايل كل مشروع في `projects/<project>/style.md` (**إلزامي**).

## البنية المعتمدة (مطابقة للخريطة)
```text
pdf-studio/
│
├── SKILL.md                  ← السكيل الرئيسية (تتحمل تلقائيًا)
│
├── engine/                   ← المعاينة / الـ Preview + تطبيق Vite/React
│   ├── src/                  ← كود المحرك/الواجهة
│   │   ├── App.jsx           ← Top bar: قائمة المشاريع (Projects) + تنزيل/تحويل PDF + تقديم/تأخير (Next/Prev)
│   │   ├── pages/index.js    ← اكتشاف صفحات المشاريع تلقائيًا (projects/*/page-N/page.jsx|content.jsx)
│   │   ├── utils/            ← projectLoader.js, exportPdf.js
│   │   └── ds/               ← مكوّنات/نظام تصميم مساعد
│   ├── public/               ← أصول ثابتة (favicon/logo...)
│   ├── index.html
│   ├── vite.config.js        ← alias @projects -> ../projects
│   ├── package.json
│   └── start-dev.bat
│   └── (عناصر المحرك الثابتة/التشغيلية هنا)
│
├── projects/                 ← كل مشروع في فولدر باسمه
│   └── <project-name>/
│       ├── style.md          ← إلزامي: ستايل المشروع (يطبق على كل الصفحات)
│       ├── project.json      ← إعدادات (name, preset, orientation, dir, lang, totalPages)
│       ├── font/             ← خطوط خاصة بالمشروع (اختياري)
│       ├── page-1/
│       │   ├── page.jsx      ← المحتوى/التصميم (أو content.jsx)
│       │   └── images/
│       └── page-2/ ...
│
├── fonts/                    ← خطوط عامة تطبق على كل المشاريع
│
└── tools/                    ← أدوات مساعدة (منفصلة)
    ├── image-search (.bat) / imageSearch.py
    └── font-search  (.bat) / fontSearch.py
```

> ملفات/مجلدات إضافية عملية (خارج الخريطة الأساسية): `tests/` (تجارب/تشخيص)، `PROJECT_MAP.md`, `README.md`, `.gitignore`.

## قواعد ثابتة
1. **`SKILL.md` أولًا:** اقرأ الكل → اعرض المشاريع الحالية → اطلب من المستخدم تحديد ما يريد.
2. **`style.md` إلزامي:** عند دخول/العمل على أي مشروع يراجع الـ Agent `style.md` تلقائيًا؛ إذا مفقود يسأل المستخدم عن الستايل وينشئه إجباريًا. مشروع جديد يُنشأ مع `style.md` بعد سؤال المستخدم. (في الواجهة: زر مراجعة الستايل يفتح النافذة — لا تفتح تلقائيًا عند تبديل المشروع؛ النافذة تدعم تعديل/عرض بدون سكرول ظاهر وبأنيميشن فتح/إغلاق.)
3. **فصل كامل:** كل مشروع مستقل (ستايل + إعدادات + خطوط + صفحات/صور). ممنوع المشاركة بين المشاريع.
4. **الاتجاه/المقاس:** من `project.json` (`orientation`: `portrait`/`landscape`, `preset`, `dir`, `lang`) وتفاصيله في `style.md`.
5. **الصفحات:** `page-N/page.jsx` (+ `images/`). المحرك يكتشفها تلقائيًا؛ حدّث `totalPages` عند تغيير العدد.
6. **الهدف:** معاينة وتصدير **PDF صالح**.
7. **النظافة:** التجارب/غير الإنتاجي في `tests/`.

## تشغيل المحرك
من مجلد `engine/`:
```bash
npm install
npm run dev
```
أو `engine/start-dev.bat` (ومن الجذر: `start-dev.bat` إن وُجد كمشغّل مختصر).
