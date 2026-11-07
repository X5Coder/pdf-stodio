# PDF Studio - Design Guide

> هذا الملف يُحمّل تلقائياً في بداية كل سيشن مع أي agent
> جميع القرارات التصميمية يجب أن تتبع هذا الدليل

## 1. Design Tokens (مصدر الحقيقة)

جميع قيم التصميم تأتي من `src/tokens.css`:
- **لا تكتب قيم خام** (hex, px, ظلال) داخل الكومبوننتات
- استخدم CSS custom properties فقط
- الأمثلة: `var(--color-primary)`, `var(--space-4)`, `var(--radius-lg)`

### الـ Tokens المتاحة

#### المسافات (Spacing)
- `--space-0` إلى `--space-8` (0px إلى 64px، مضاعفات 4/8)
- استخدم دائماً مضاعفات 4 أو 8

#### الخطوط (Typography)
- `--font-family-ar` - الخط العربي (IBM Plex Sans Arabic)
- `--font-family-latin` - الخط اللاتيني (Inter)
- `--line-height-body` - 1.6
- `--line-height-heading` - 1.35

#### الألوان (Colors)
- الأساسي: `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- التمييز: `--color-accent`, `--color-accent-light`, `--color-accent-dark`
- النصوص: `--color-text`, `--color-text-secondary`, `--color-text-muted`
- الخلفيات: `--color-bg`, `--color-surface`, `--color-surface-card`

#### الحواف (Radius)
- `--radius-xs` (4px) إلى `--radius-2xl` (24px)
- `--radius-full` (9999px)

#### الظلال (Shadows)
- `--shadow-sm` - ظلال خفيفة
- `--shadow-md` - ظلال متوسطة
- `--shadow-lg` - ظلال قوية
- `--shadow-glass` - ظلال للزجاج

## 2. قاعدة الألوان 60/30/10

- **60%** - أساسي محايد (backgrounds, surfaces)
- **30%** - ثانوي (text, borders)
- **10%** - تمييز (accents, CTAs)

مثال:
```css
background: var(--color-bg);           /* 60% */
color: var(--color-text);               /* 30% */
border-color: var(--color-accent);      /* 10% */
```

## 3. الـ Themes المدعومة

هناك 3 themes محددة في `tokens.css`:

### Forest (الافتراضي)
- أخضر غامق فاخر
- مناسب للمشاريع الاحترافية

### Calm
- أزرق هادئ
- مناسب للمشاريع التقنية

### Warm
- بني دافئ
- مناسب للمشاريع الإبداعية

لتفعيل theme:
```html
<html data-theme="calm">
```

## 4. قواعد المسافات

- المسافات الكبيرة بين المجموعات
- المسافات الصغيرة داخل المجموعات
- استخدم 8pt للعناوين الرئيسية
- استخدم 4pt للتفاصيل الدقيقة

مثال:
```css
section {
  padding: var(--space-6);  /* 32px - مسافة كبيرة */
}

.card {
  gap: var(--space-3);     /* 12px - مسافة صغيرة */
}
```

## 5. قواعد الطباعة

### أحجام الخطوط (4 أحجام فقط)
- **Body** - 16px (1rem)
- **Caption** - 14px (0.875rem)
- **Heading** - 24px (1.5rem)
- **Display** - 32px (2rem)

### الأوزان (2 وزن فقط)
- **Regular** - 400
- **Bold** - 600 أو 700

### طول السطر
- **65 حرف** تقريباً للنصوص العادية
- **ارتفاع سطر 1.4-1.6**

## 6. التباين (Contrast)

- **WCAG AA**: 4.5:1 للنص العادي
- **WCAG AA**: 3:1 للنص الكبير والعناصر التفاعلية
- استخدم أداة مثل WebAIM Contrast Checker للتحقق

## 7. RTL (من اليمين لليسار)

- استخدم CSS logical properties
- `margin-inline-start` بدلاً من `margin-left`
- `padding-inline` بدلاً من `padding-left/right`
- أو استخدم كلاسات Tailwind: `ms-*`, `ps-*`

مثال:
```css
/* خطأ */
margin-left: var(--space-4);

/* صحيح */
margin-inline-start: var(--space-4);
```

## 8. الأيقونات الاتجاهية

- اقلب الأيقونات في RTL
- الأسهم تتغير اتجاهها تلقائياً
- استخدم `transform: scaleX(-1)` عند الحاجة

## 9. الحركة (Motion)

- **مدة**: 150-300ms للتفاعلات
- **easing**: طبيعي (cubic-bezier)
- **عناصر الحركة**: `transform` و `opacity` فقط
- **prefers-reduced-motion**: ألغِ الحركة عند تفعيله

مثال:
```css
transition: transform 200ms ease, opacity 200ms ease;
```

## 10. الصور

- كل صورة تحتاج `width` و `height` (لتجنب CLS)
- استخدم `loading="lazy"` للصور تحت الـ fold
- صورة الـ hero فقط بدون lazy
- فضّل WebP/AVIF
- أضف `alt` مفيد لكل صورة

## 11. الكومبوننتات

### البنية (Atomic Design)
- **Atoms**: Button, Input, Icon
- **Molecules**: Card, List Item
- **Organisms**: Header, Footer
- **Pages**: صفحات كاملة

### الممارسات
- استخدم `children` بدلاً من props كثيرة
- كل كومبوننت يستقبل `className` و `...rest`
- غطي كل الحالات: default, hover, focus, disabled

مثال:
```jsx
function Button({ children, className, ...rest }) {
  return (
    <button
      className={className}
      style={{ padding: 'var(--space-2) var(--space-4)' }}
      {...rest}
    >
      {children}
    </button>
  );
}
```

## 12. Accessibility

- استخدم HTML دلالي: `<button>`, `<nav>`, `<main>`
- أظهر `:focus-visible` دائماً
- التنقل بالكيبورد كامل
- `alt` مفيد لكل صورة
- احترم `prefers-reduced-motion`

## 13. التجاوب (Responsive)

- **Mobile-first** صمم للموبايل أولاً
- أهداف اللمس 44×44px على الأقل
- استخدم `@media` للـ breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 14. الأداء

- استخدم `React.lazy` للتحميل الكسول
- صور الـ hero فقط بدون lazy
- قوائم طويلة: virtualization
- حلل الباندل بـ `rollup-plugin-visualizer`

## 15. الموارد المشتركة

### الخطوط
- الخطوط في `assets/fonts/`
- استخدم الخطوط المشتركة عندما يكون مناسباً
- أضف خطوط جديدة باستخدام `tools/fontSearch.py`

### الصور
- الصور المشتركة في `assets/images/`
- صور خاصة بالصفحة في `projects/{project}/page{NN}/images/`
- استخدم أدوات جلب الصور من `tools/imageSearch.py`

## 16. Stack التقني

- **Build**: Vite + React + TypeScript
- **Routing**: React Router
- **Styling**: CSS custom properties + Tailwind CSS v4
- **Icons**: lucide-react
- **Motion**: Framer Motion
- **Data**: TanStack Query
- **Forms**: react-hook-form + zod
- **PDF**: jsPDF + html-to-image

## 17. قائمة المراجعة قبل التسليم

- [ ] كل الألوان والمسافات من tokens
- [ ] التباين يحقق WCAG AA
- [ ] مفيش `div onClick`، والـ focus ظاهر
- [ ] كل صورة ليها `width/height` و `alt`
- [ ] المسارات الثقيلة محمّلة بـ `React.lazy`
- [ ] RTL والموبايل شغالين
- [ ] LCP أقل من 2.5 ثانية
- [ ] CLS قريب من صفر

## 18. المشاريع

كل مشروع في مجلد منفصل:
```
projects/
├── default/
│   ├── project.json
│   ├── page01/
│   │   ├── page.jsx
│   │   └── images/
│   └── ...
```

`project.json` يحتوي:
- `name`: اسم المشروع
- `totalPages`: عدد الصفحات
- `theme`: forest | calm | warm
- `preset`: slide | a4 | letter
- `dir`: rtl | ltr
- `lang`: ar | en

## 19. الأدوات

في مجلد `tools/`:
- `imageSearch.py` - جلب صور من الإنترنت
- `fontSearch.py` - جلب خطوط من الإنترنت
- هذه الأدوات مخصصة لأي agent يستخدم المشروع

## 20. مثال صفحة

```jsx
export default function Page01({ pageNo, total }) {
  return (
    <div className="pdf-page" style={{
      width: '1280px',
      height: '720px',
      background: 'var(--color-bg)',
      padding: 'var(--space-6)'
    }}>
      <h1 style={{
        color: 'var(--color-primary)',
        fontSize: '2rem',
        fontWeight: 600
      }}>
        عنوان الصفحة
      </h1>
      <p style={{
        color: 'var(--color-text)',
        lineHeight: 'var(--line-height-body)'
      }}>
        محتوى الصفحة هنا...
      </p>
    </div>
  );
}
```

---

**ملاحظة مهمة:** هذا الدليل هو المصدر الوحيد المعتمد لقرارات التصميم. أي تعديل يجب أن ينعكس هنا أولاً.
