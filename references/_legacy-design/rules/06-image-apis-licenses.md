# 06 — APIs المجانية للصور والمفاتيح والتراخيص (إلزامي)

## 6.1 الخدمات المعتمدة

| الخدمة | النوع | ملاحظات |
|---|---|---|
| **Unsplash API** | صور فوتوغرافية | مجاني. **50 طلب/ساعة** في وضع demo، **5000/ساعة** بعد الموافقة على production. (بحث) لازم نسب المصور. |
| **Pexels API** | صور وفيديو | مجاني. **200 طلب/ساعة** في الخطة المجانية. (بحث) |
| **Pixabay API** | صور وفيديو وموسيقى | مجاني. **5000 طلب/ساعة**. (بحث) |
| **Openverse API** | 600+ مليون صورة وصوت بترخيص CC/Public Domain (Flickr، Wikimedia…) | الاستخدام المجهول متاح بدون مفتاح حسب ما لقيت، ولازم تحترم رخصة كل صورة. (بحث) |
| **Lorem Picsum** `picsum.photos/200/300` | placeholders عشوائية | مجاني ومفتوح المصدر MIT، ممتاز للتطوير. (بحث) |
| **DummyImage وأمثالها** | placeholders بالحجم واللون | حط المقاس في الرابط. (بحث) |
| **Gradient API** | placeholders تدرجات لونية | بدل الصور الفاضية. (بحث) |

## 6.2 مشكلة مفتاح الـ API في React

React وحده (Vite/CRA) كل شيء فيه يتحمّل في المتصفح، فأي مفتاح في `import.meta.env.VITE_*` **بيبقى ظاهر لأي حد**. الحلول:

1. **أفضل حل**: proxy صغير يخبي المفتاح ويعمل cache: **Cloudflare Worker** أو **Vercel/Netlify Function** أو Express صغير.
2. للمشاريع الشخصية/التجريبية: ممكن تقبل إن المفتاح ظاهر، بس خلّي حدوده منخفضة.
3. Openverse وpicsum مفيش فيهم المشكلة دي (بدون مفتاح).

### Hook بـ TanStack Query (معتمد)

```tsx
import { useQuery } from "@tanstack/react-query";

type Photo = { id: number; src: { medium: string; large: string }; alt: string };

export function usePhotos(query: string) {
  return useQuery({
    queryKey: ["photos", query],
    queryFn: async (): Promise<Photo[]> => {
      // /api/photos هو الـ proxy اللي بيخبي المفتاح
      const res = await fetch(`/api/photos?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to load photos");
      return (await res.json()).photos;
    },
    staleTime: 1000 * 60 * 60, // ساعة، يوفر عليك الحد اليومي
  });
}
```

### Proxy بسيط — Cloudflare Worker (معتمد)

```ts
export default {
  async fetch(req: Request, env: { PEXELS_KEY: string }) {
    const q = new URL(req.url).searchParams.get("q") ?? "nature";
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=12`,
      { headers: { Authorization: env.PEXELS_KEY }, cf: { cacheTtl: 3600 } }
    );
    return new Response(r.body, {
      headers: { "content-type": "application/json", "cache-control": "public, max-age=3600" },
    });
  },
};
```

## 6.3 التراخيص

- Unsplash وPexels وPixabay مجانية للاستخدام التجاري، لكن ما تبيعش الصور نفسها كصور stock. (بحث)
- راجع شروط كل خدمة بخصوص النسب (attribution) والـ hotlinking.
