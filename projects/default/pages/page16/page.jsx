// رسالة الصفحة في جملة واحدة: تقرير الجدوى الجيد منظم لا يتجاوز 25 صفحة — عناصره التسعة من الملخص حتى مقاييس الجدوى.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { FileText, CheckCircle2, BookOpen, Layers, Award } from 'lucide-react';

export default function Page16({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: sp(2) }}>
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              fontSize: fs.caption,
              fontWeight: 700,
              color: '#3B82F6',
              background: 'rgba(59, 130, 246, 0.1)',
              paddingBlock: 2,
              paddingInline: sp(2),
              borderRadius: sp(4)
            }}
          >
            <FileText size={14} />
            <bdi>09</bdi> | المخرجات
          </span>
          <h1
            style={{
              fontSize: fs.title,
              fontWeight: 700,
              color: c.primary,
              lineHeight: lhHeading,
              margin: 0,
              marginBlockStart: sp(1)
            }}
          >
            إرشادات في كتابة تقرير دراسة الجدوى
          </h1>
        </div>

        <div style={{ width: 80, height: 45, borderRadius: sp(1), overflow: 'hidden', flexShrink: 0, border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}` }}>
          <Img
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80"
            alt="تقرير دراسة الجدوى والوثائق التنفيذية"
          />
        </div>
      </div>

      <Grid gap={3}>
        {/* العمود الأيمن: تنظيم التقرير والعناصر 1 و2 */}
        <Col span={6}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
            {/* بطاقة أولاً: تنظيم التقرير */}
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `3px solid #3B82F6`,
                padding: sp(2)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <CheckCircle2 size={16} color='#3B82F6' />
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                  أولًا: تنظيم التقرير
                </h2>
              </div>
              <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
                <li>ألا يزيد عدد صفحات التقرير عن <bdi>25</bdi> صفحة.</li>
                <li>يُدعم التقرير بمجموعة من الملاحق في مجلد منفصل.</li>
                <li>صياغة التقرير في شكل يجعل غير المتخصص قادرًا على فهم المشروع.</li>
              </ul>
            </div>

            {/* بطاقة ثانياً: العناصر الرئيسية للتقرير */}
            <div
              style={{
                background: c.card || '#FFFFFF',
                borderRadius: sp(2),
                border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                borderTop: `3px solid ${c.primary}`,
                padding: sp(2)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1), marginBlockEnd: sp(1) }}>
                <Layers size={16} color={c.primary} />
                <h2 style={{ fontSize: fs.small, fontWeight: 700, color: c.primary, margin: 0 }}>
                  ثانيًا: العناصر الرئيسية للتقرير
                </h2>
              </div>
              <ul style={{ margin: 0, paddingInlineStart: sp(2), display: 'flex', flexDirection: 'column', gap: 2, fontSize: fs.compact, color: c.text, lineHeight: 1.35 }}>
                <li>
                  <strong style={{ color: c.primary }}>الملخص والنتائج:</strong> لا يزيد هذا الجزء عن صفحتين، والهدف منه إعطاء القارئ فكرة مختصرة وكاملة عن المشروع.
                </li>
                <li>
                  <strong style={{ color: c.primary }}>المقدمة:</strong> يذكر فيها فكرة المشروع وأهميته.
                </li>
                <li>مبررات اختيار المشروع.</li>
                <li>
                  <strong style={{ color: c.primary }}>منطقة المشروع:</strong> وصف كامل للمنطقة التي سيقام فيها المشروع.
                </li>
                <li>مصادر المدخلات التي يحتاجها المشروع.</li>
                <li>الجوانب الفنية للمشروع.</li>
                <li>مصادر تمويل المشروع، وشروط الاقتراض.</li>
              </ul>
            </div>
          </div>
        </Col>

        {/* العمود الأيسر: باقي العناصر من ثالثاً إلى تاسعاً */}
        <Col span={6}>
          <div
            style={{
              background: c.surface,
              borderRadius: sp(2),
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              padding: sp(2),
              height: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(1) * 1.5 }}>
              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: '#3B82F6', margin: 0 }}>ثالثًا: مراحل تنفيذ المشروع وجدولة الإنفاق</h3>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: c.primary, margin: 0 }}>رابعًا: تقدير التكاليف</h3>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: '#3B82F6', margin: 0 }}>خامسًا: الخطة التمويلية للمشروع في شكل جدول</h3>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: c.primary, margin: 0 }}>سادسًا: الأثر البيئي للمشروع</h3>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: '#3B82F6', margin: 0 }}>سابعًا: إنتاج المشروع والأسواق</h3>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: c.primary, margin: 0 }}>ثامنًا: المنافع أو العوائد من المشروع</h3>
                <div style={{ paddingInlineStart: sp(3), display: 'flex', gap: sp(3), marginTop: 2, fontSize: fs.compact, color: c.text }}>
                  <span>• المنافع الاقتصادية.</span>
                  <span>• المنافع الاجتماعية.</span>
                </div>
              </div>

              <div style={{ background: c.card || '#FFFFFF', padding: sp(1), borderRadius: sp(1), border: `1px solid ${c.border || 'rgba(0,0,0,0.06)'}` }}>
                <h3 style={{ fontSize: fs.compact, fontWeight: 700, color: '#3B82F6', margin: 0 }}>تاسعًا: مقاييس الجدوى الاقتصادية للمشروع</h3>
              </div>
            </div>
          </div>
        </Col>
      </Grid>
    </Page>
  );
}
