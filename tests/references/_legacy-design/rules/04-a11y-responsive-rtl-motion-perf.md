# 04 — Accessibility والتجاوب وRTL والحركة والأداء والقواعد البصرية (إلزامي)

## 4.1 Accessibility في React

- HTML دلالي: `<button>` مش `<div onClick>`، و`<nav>` و`<main>`.
- `:focus-visible` ظاهر دايماً، والتنقل بالكيبورد كامل.
- `alt` مفيد لكل صورة (`alt=""` للزخرفية).
- أدوات React: **eslint-plugin-jsx-a11y** (فحص وقت الكتابة)، و**jest-axe** أو **@axe-core/react** للاختبار، و**Storybook a11y addon**. (بحث)
- ركّز الـ focus صح في المودال (Radix بيعملها لك)، وأعد الـ focus للعنصر اللي فتحه.
- احترم `prefers-reduced-motion`. المرجع: WCAG 2.2. (بحث)

## 4.2 التجاوب

- **Mobile-first**. (بحث)
- شبكة جاهزة: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. (بحث)
- **Container Queries** للكومبوننتات المستقلة (Tailwind v4 بيدعمها). (بحث)
- أهداف اللمس 44×44px على الأقل.

## 4.3 العربي وRTL في React

- عيّن `dir="rtl"` و`lang="ar"` على `<html>` حسب لغة المستخدم.
- استخدم **CSS logical properties** (`margin-inline-start`، `padding-inline`) أو كلاسات Tailwind `ms-*` و`ps-*` بدل `ml-*`.
- اقلب الأيقونات الاتجاهية (الأسهم) في RTL.
- لو متعدد اللغات: **react-i18next** أو **react-intl**، و**React Aria `I18nProvider`** لو بتستخدمه.

## 4.4 الحركة

- 150 إلى 300ms للتفاعلات، easing طبيعي.
- حرّك `transform` و`opacity` فقط للأداء.
- **Motion (Framer Motion)** للانتقالات و`AnimatePresence` لدخول/خروج العناصر.
- ألغِ الحركة عند `prefers-reduced-motion` (`useReducedMotion`).

## 4.5 أداء React

- **Code splitting**: ‏`React.lazy` + `<Suspense>` لكل صفحة/route ثقيل. (بحث: lazy-loading للصور تحت الـ fold)
- ما تعملش `memo` على كل حاجة. قِس الأول بـ **React DevTools Profiler**. فكّر في **React Compiler** (بيعمل memoization تلقائي).
- القوائم الطويلة: virtualization.
- حالة السيرفر: **TanStack Query** (cache، retry، dedupe) بدل `useEffect + fetch` يدوي.
- Skeletons أثناء التحميل بدل شاشة فاضية.
- حلل الباندل بـ `rollup-plugin-visualizer` (Vite).

## 4.6 قواعد بصرية عامة

1. تسلسل هرمي واضح: عنصر بارز واحد في كل شاشة.
2. اتساق في الـ radius والظلال والمسافات.
3. ظلال ناعمة للعمق، ولوحة محايدة مع لون تمييز واحد. (بحث)
4. صور بجودة عالية وبنفس أسلوب المعالجة.
5. نصوص حقيقية بدل Lorem ipsum.
