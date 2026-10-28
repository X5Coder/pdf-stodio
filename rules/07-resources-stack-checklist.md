# 07 — موارد GitHub والـ Stack وقائمة المراجعة والمصادر (إلزامي)

## 7.1 مستودعات GitHub وموارد للصور والرسومات

### قوائم Awesome

- **awesome-stock-resources**: صور وفيديو ورسومات وأيقونات وخطوط. (بحث)
- **mrpeker/awesome-illustrations**: رسومات توضيحية مجانية ومدفوعة (404 Illustrations، Flowbite Illustrations بـ SVG ثلاثي الأبعاد). (بحث)
- **noobnooc/awesome-design-dev**: موارد تصميم للمطورين (Notioly بأكثر من 200 رسمة SVG، Open Peeps، صور وخطوط). (بحث)
- صفحة `github.com/topics/illustration` فيها 250+ مستودع. (بحث)

### جاهزة لـ React

- **React unDraw Components**: رسومات unDraw كمكونات React بترخيص MIT. (بحث)
- **Cute SVG React Components**: مكونات SVG جاهزة. (بحث)
- **webalys-hq/streamline-vectors**: أيقونات ورسومات SVG، ترخيص CC BY 4.0 (محتاج نسب). (بحث)
- أيقونات (راجع الترخيص): **lucide-react** و**@phosphor-icons/react** و**@tabler/icons-react** و**react-icons** و**Simple Icons** للشعارات. (بحث لبعضها)
- **WordPress/openverse**: مستودع مفتوح المصدر لمحرك Openverse لو عايز تفهم الـ API. (بحث)

## 7.2 Stack مقترح (React فقط)

| الغرض | الأداة |
|---|---|
| البناء | **Vite** + React + TypeScript |
| الراوتر | **React Router** أو **TanStack Router** |
| التنسيق | **Tailwind CSS v4** + **shadcn/ui** + **Radix** |
| الأيقونات | `lucide-react` |
| الحركة | **Motion (Framer Motion)** |
| البيانات | **TanStack Query** |
| النماذج | react-hook-form + zod |
| الصور | كومبوننت `Img` + Pexels/Unsplash عبر proxy + `picsum.photos` للتطوير |
| الرسومات التوضيحية | unDraw / Notioly / Flowbite Illustrations |
| الخطوط | `@fontsource` (Inter + Cairo) |
| التوثيق والاختبار | Storybook + Vitest + Testing Library + jest-axe |
| 3D / مؤثرات فخمة | **React Three Fiber** (+ drei) |
| رسوم 2D كتير العناصر | **PixiJS** (`@pixi/react`) أو **react-konva** |
| رسوم بيانية | **Recharts** أو **Visx** أو **D3** |

## 7.3 قائمة مراجعة قبل النشر

- [ ] كل الألوان والمسافات من tokens
- [ ] التباين يحقق WCAG AA
- [ ] مفيش `div onClick`، والـ focus ظاهر، وeslint-plugin-jsx-a11y نظيف
- [ ] كل صورة ليها `width/height` و`alt`، وصورة الـ hero فقط بدون lazy
- [ ] المسارات الثقيلة محمّلة بـ `React.lazy`
- [ ] مفاتيح الـ APIs خلف proxy وفيه cache
- [ ] النسب (attribution) والتراخيص متحققة
- [ ] RTL والموبايل شغالين
- [ ] LCP أقل من 2.5 ثانية وCLS قريب من صفر

## 7.4 المصادر

- Design system guides: https://www.gitnexa.com/blogs/design-systems-for-modern-products ، https://skillselion.com/skills/mindrally/skills/design-systems ، https://skillselion.com/skills/daffy0208/ai-dev-standards/design-system-architect
- shadcn/Tailwind/typography rules: https://skillselion.com/skills/hieutrtr/ai1-skills/ui-design-system ، https://www.claudepluginhub.com/skills/yonatangross-ork-plugins-ork-2/ui-components ، https://smithery.ai/skills/vanman2024/design-system-enforcement
- Image API limits: https://wordpress.org/plugins/stock-images-by-indietech/
- Placeholder services: https://alternativeto.net/software/unsplash-it
- GitHub lists: https://github.com/kznmft/awesome-stock-resources ، https://www.context-awesome.com/list/mrpeker/awesome-illustrations ، https://www.context-awesome.com/list/noobnooc/awesome-design-dev ، https://github.com/webalys-hq/streamline-vectors ، https://github.com/topics/illustration
- Openverse: https://github.com/wordpress/openverse
- Image performance (LCP, srcset, lazy loading): https://developer.chrome.com/docs/aurora/image-component
