# PDF Studio - Project Structure Map

> **لأي AI Agent / محرر مشاريع PDF:** هذه الخريطة تصف بنية النظام. لا يوجد ستايل/ديزاين مفروض عالميًا على المشاريع؛ التصميم والتعليمات الخاصة بكل مشروع تكون داخل `projects/<project-id>/skills/`.
> - أي تغيير في الهيكل يجب أن يُحدَّث هنا في نفس الجلسة.
> - عند العمل على مشروع محدد: اقرأ `projects/PROJECT_SYSTEM_BASE.md` ثم **كل** `projects/<project-id>/skills/*.md`.

## البنية القياسية

```text
pdf-stodio/
├── package.json
├── vite.config.js                   # @projects -> ./projects
├── index.html
├── opencode.json                    # توافق اختياري (OpenCode)
├── AGENTS.md                        # تعليمات عامة لأي Agent
├── CLAUDE.md                        # مؤشر توافق
├── .github/copilot-instructions.md  # مؤشر توافق
├── PROJECT_MAP.md                   # هذه الخريطة
├── README.md
│
├── src/                             # محرك/واجهة المعاينة والتصدير (PDF editor shell)
│   ├── main.jsx
│   ├── App.jsx                      # واجهة المعاينة + مسار التصدير
│   ├── config.js                    # مرجع المشروع النشط (حسب التنفيذ الحالي)
│   ├── index.css
│   ├── tokens.css
│   ├── pages/
│   │   └── index.js                 # تسجيل صفحات المشروع النشط (تنفيذ حالي static)
│   ├── ds/
│   └── utils/
│       ├── exportPdf.js
│       └── projectLoader.js
│
├── projects/                        # مجلد المشاريع (فصل كامل لكل مشروع)
│   ├── PROJECT_SYSTEM_BASE.md       # السكيل الأساسي العام للنظام
│   └── <project-id>/                # مشروع مستقل بالكامل
│       ├── project.json
│       ├── fonts/                   # خطوط المشروع فقط
│       ├── skills/                  # سكيلز/تصميم/تعليمات المشروع (.md) — تُقرأ كلها
│       │   ├── README.md
│       │   └── *.md
│       └── pages/
│           └── pageNN/
│               ├── page.jsx
│               └── images/
│
├── tools/                           # أدوات مساعدة
│   ├── imageSearch.py
│   ├── fontSearch.py
│   └── README.md
│
├── scripts/                         # (إن وجد)
├── references/                      # مراجع/أرشيف اختياري غير مفروض على المشاريع
│   └── _legacy-design/              # (اختياري) ملفات تصميم قديمة منقولة، ليست إلزامية
└── .gitignore
```

## القواعد
- **فصل كامل:** كل مشروع له `fonts/` و`skills/` و`pages/` وموارده الخاصة.
- **لا ستايل عالمي مفروض:** التصميم/الهوية/التعليمات الخاصة تأتي من `projects/<project-id>/skills/` أو ما يقدمه المستخدم للمشروع.
- **سير العمل:** حمّل المشروع + أعطِ الـ Agent سكيلاته/تصميمه → يبني/يكمل الصفحات → معاينة وتصدير PDF صالح.

## ملاحظة تنفيذية (الوضع الحالي)
- `src/pages/index.js` يستخدم تسجيل static لصفحات المشروع النشط.
- عند تفعيل مشروع آخر في البناء الحالي قد يلزم تحديث `src/config.js` و`src/pages/index.js` حسب آلية التحميل.