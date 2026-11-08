# Tools Directory

هذا المجلد يحتوي على الأدوات المساعدة لمشروع PDF Studio.

## الأدوات المتاحة

### 1. imageSearch.py
أداة جلب الصور من الإنترنت للصفحات.

**المميزات:**
- البحث في مصادر مجانية متعددة (Openverse, Iconify)
- اكتشاف تلقائي للصور vs الأيقونات
- تحميل وحفظ الصور في مجلد الصفحة
- دعم الصيغ: JPG, PNG, WebP, SVG

**الاستخدام:**
```bash
python tools/imageSearch.py "business meeting" "projects/myproject/page01/images" 3
```

**المعاملات:**
- `query`: كلمات البحث
- `target_dir`: مجلد الحفظ
- `count`: عدد الصور (اختياري، الافتراضي 3)

**ملاحظة:** بعض المصادر مثل Unsplash وPexels تتطلب مفتاح API. Openverse وIconify تعمل بدون مفتاح.

---

### 2. fontSearch.py
أداة جلب الخطوط من الإنترنت للمشروع.

**المميزات:**
- البحث في Fontsource و Google Fonts
- دعم الخطوط العربية واللاتينية
- تحميل ملفات الخطوط (WOFF2, TTF)
- توليد CSS @font-face تلقائياً

**الاستخدام:**
```bash
python tools/fontSearch.py "Cairo" "assets/fonts" ar
```

**المعاملات:**
- `font_name`: اسم الخط
- `target_dir`: مجلد الحفظ
- `language`: `ar` للعربي، `en` للإنجليزي (اختياري)

---

### 3. لا يوجد مشروع افتراضي
التطبيق لا يفترض أي مشروع — عند فتحه تظهر شاشة اختيار المشروع دائمًا وتختار منها ما تريد الدخول إليه أو إنشاء مشروع جديد.

---

## الهيكل المقترح للمشاريع

```
projects/
├── my-project/                # مشروع جديد
│   ├── style.md               # إلزامي: مرجع الستايل
│   ├── project.json           # معلومات المشروع
│   ├── font/                  # خطوط خاصة بالمشروع (اختياري)
│   ├── page-1/
│   │   ├── page.jsx           # كود الصفحة
│   │   └── images/            # صور خاصة بالصفحة
│   ├── page-2/
│   │   ├── page.jsx
│   │   └── images/
│   └── ...
├── another-project/
│   ├── style.md
│   ├── project.json
│   └── ...

assets/                        # الموارد المشتركة
├── fonts/                     # الخطوط المشتركة
├── images/                    # الصور المشتركة
└── styles/                    # ملفات Styles المُشتركة
```

---

## API Keys المطلوبة (اختياري)

للحصول على نتائج أفضل من مصادر الصور، يمكنك إضافة مفاتيح API في ملف `.env`:

```env
UNSPLASH_ACCESS_KEY=your_key_here
PEXELS_API_KEY=your_key_here
PIXABAY_API_KEY=your_key_here
```

بدون المفاتيح، الأداة ستعمل مع Openverse وIconify فقط (مجانية بالكامل).
