# قواعد تصميم React — تُحمّل تلقائياً في كل سيشن (إلزامي)

> هذا الملف يُحمّل تلقائياً في OpenCode وGoogle Antigravity.
> القواعد القديمة (RULES.md / SVG-RULES.md / فحص tokens الخاص بـ PDF Motion) **محذوفة نهائياً** — لا تعتمد عليها.
> المصدر الوحيد المعتمد هو الملفات السبعة في `rules/`.

## أمر إلزامي للوكيل (اقرأ قبل أي مهمة)

1. اقرأ الملفات السبعة التالية كاملة والتزم بها حرفياً — React فقط (Vite + React + TypeScript) بدون Next.js:
   - `rules/01-design-tokens.md`
   - `rules/02-spacing-typography-colors.md`
   - `rules/03-components-ui-libs.md`
   - `rules/04-a11y-responsive-rtl-motion-perf.md`
   - `rules/05-images-react.md`
   - `rules/06-image-apis-licenses.md`
   - `rules/07-resources-stack-checklist.md`
2. أي بند عليه **(بحث)** راجع وثائقه الرسمية قبل الاعتماد عليه في production.
3. ممنوع اختراع stack أو مكتبات خارج `rules/07-resources-stack-checklist.md`.
4. مفاتيح الصور دائماً خلف proxy مع cache — ممنوع كشف `VITE_*` في المتصفح.
5. قبل التسليم طبّق `rules/07-resources-stack-checklist.md` بنداً بنداً.

## أوامر المشروع

- `npm install` — تثبيت
- `npm run dev` — معاينة (Vite)
- `npm run build` — بناء (vite build فقط)
- `npm run preview` — معاينة الإنتاج
