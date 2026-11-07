// الإعداد الثابت للمشروع - اسم المشروع الحالي فقط
// تفاصيل المشروع الكاملة تُحمل من projects/{projectName}/project.json

export const CURRENT_PROJECT = 'default'; // اسم المشروع النشط حالياً

// للتوافق مع الكود القديم - PDF_CONFIG سيُستبدل مستقبلاً بالتحميل الديناميكي
export const PDF_CONFIG = {
  preset: 'slide',
  theme: 'forest',
  dir: 'rtl',
  lang: 'ar',
  title: 'دليل عملي لإعداد دراسة جدوى متكاملة'
};
