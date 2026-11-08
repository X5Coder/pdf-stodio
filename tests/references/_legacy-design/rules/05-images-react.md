# 05 — التعامل مع الصور في React بدون Next.js (إلزامي)

> مفيش `next/image` — اعمل الآتي بنفسك.

## القواعد

- حدّد `width` و`height` (أو `aspect-ratio` في CSS) لكل صورة لتجنب **CLS**. (بحث)
- استخدم `srcSet` و`sizes` لتقديم أحجام مختلفة حسب الشاشة. (بحث)
- `loading="lazy"` و`decoding="async"` لأي صورة تحت الـ fold. (بحث)
- صورة الـ hero (الـ LCP) فقط: بدون lazy ومعها `fetchPriority="high"`. (بحث)
- فضّل صيغ **WebP/AVIF**. لو الـ API بيدعمها (Unsplash وPexels بيسمحوا بباراميترات الحجم والصيغة في الرابط) استخدمها.
- أثناء التحميل: لون خلفية أو **BlurHash/ThumbHash** (`react-blurhash`) أو skeleton.

## كومبوننت `Img` المعتمد

```tsx
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

export function Img({ priority, alt, ...rest }: ImgProps) {
  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
```

## مكتبات React مساعدة

- **react-lazy-load-image-component**
- **react-blurhash**
- **react-intersection-observer**
