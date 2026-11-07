# PDF Studio (محرر/منظّم مشاريع PDF)

نظام يعمل كـ **محرر مشاريع PDF**: تختار/تحمّل مشروعًا، تعطيه لأي AI Agent مع **التصميم/السكيلز** الخاصة بالمشروع، والـ Agent يبني أو يكمل الصفحات داخل نفس المشروع. النتيجة قابلة للمعاينة والتصدير كـ PDF.

## المبادئ
- **فصل كامل بين المشاريع**: كل مشروع له `fonts/` و`skills/` و`pages/` و`project.json`.
- **لا يوجد ديزاين عالمي مفروض**: التصميم يجي من `projects/<project-id>/skills/` أو من تعليمات المستخدم للمشروع.

## لأي AI Agent
1. اقرأ `projects/PROJECT_SYSTEM_BASE.md`
2. اقرأ `AGENTS.md` و`PROJECT_MAP.md`
3. عند العمل على مشروع محدد: اقرأ **كل ملفات `.md`** في `projects/<project-id>/skills/`

## التشغيل
```bash
cd pdf-stodio
npm install
npm run dev
```

راجع `PROJECT_MAP.md` للبنية الكاملة.