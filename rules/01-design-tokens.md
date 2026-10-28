# 01 — Design Tokens أولاً (إلزامي)

> النطاق: React فقط (Vite + React + TypeScript) بدون Next.js.
> أي بند عليه **(بحث)** معناه من بحث خارجي — راجع الوثائق الرسمية قبل الاعتماد عليه في production.

## القواعد

- كل قرار تصميم (ألوان، مسافات، خطوط، ظلال، حركة) يتخزن كـ **token** مش قيمة مكتوبة جوّه الكومبوننت. (بحث)
- 3 مستويات فقط:
  1. **Primitive** (قيم خام)
  2. **Semantic** (بالغرض مثل `--color-text-muted`)
  3. **Component** (خاص بكومبوننت). (بحث)
- **CSS custom properties** هي مصدر الحقيقة، وتُستورد مرة واحدة في `main.tsx`:
  ```ts
  import "./tokens.css";
  ```
  (بحث)
- الـ Dark mode = تبديل الـ semantic tokens عبر `[data-theme="dark"]` أو `prefers-color-scheme`، مش إعادة كتابة الستايلات. (بحث)
- لو عايز أتمتة: **Style Dictionary** مع صيغة W3C Design Tokens. (بحث)

## ممنوع

- ممنوع كتابة قيم تصميم خام (hex / px / ظل / مدة حركة) داخل الكومبوننتات — لازم token.
