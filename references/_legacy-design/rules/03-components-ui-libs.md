# 03 — معمارية الكومبوننتات ومكتبات UI (إلزامي)

## 3.1 معمارية الكومبوننتات في React

- **Atomic Design**: ‏atoms (Button, Input) ← molecules ← organisms ← pages. (بحث)
- **Composition over props**: بدل 15 prop، استخدم `children` وكومبوننتات فرعية (`<Card><Card.Header/>…</Card>`).
- كل كومبوننت **يستقبل `className`** و`...rest` ويمرر `ref` (في React 19 ‏`ref` بقى prop عادي، وقبلها `forwardRef`).
- امتدّ بأنواع HTML الأصلية:
  ```ts
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
  ```
  (بحث)
- استخدم **CVA (class-variance-authority)** لإدارة الـ variants، و**tailwind-merge + clsx** لدمج الـ classes.
- غطي كل الحالات: default, hover, focus-visible, active, disabled, loading, error, empty.
- المنطق المتكرر في **custom hooks** (`useMediaQuery`, `useDisclosure`)، والعرض في كومبوننتات نقية.
- وثّق في **Storybook**، فالـ design system من غير توثيق بيفشل. (بحث)

## 3.2 مكتبات UI الأنسب لـ React

| الاحتياج | الأداة |
|---|---|
| كومبوننتات جاهزة قابلة للتعديل (copy-paste) | **shadcn/ui** (React + Radix + Tailwind) (بحث) |
| Primitives بدون ستايل وaccessible | **Radix UI** (بحث) أو **React Aria** أو **Headless UI** |
| مكتبة كاملة بتصميم جاهز | **MUI** أو **Mantine** أو **Chakra UI** |
| نماذج | **react-hook-form** + **zod** (بحث) |
| جداول | **TanStack Table** |
| قوائم طويلة | **TanStack Virtual** |
| Toasts | **sonner** |
