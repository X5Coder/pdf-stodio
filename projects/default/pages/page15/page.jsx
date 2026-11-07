// رسالة الصفحة في جملة واحدة: تسديد القروض يتم على سنوات بأساليب عديدة يجب معرفتها للتقييم المالي السليم.

import { Page, Grid, Col, useDS, Img } from '@ds/index.js';
import { Landmark, CreditCard, CalendarCheck, Shield } from 'lucide-react';

const ITEMS = [
  {
    title: 'أصل القرض والفوائد والتدفقات الخارجة',
    text: 'تسديد أصل القروض والفوائد يتم عادة على عدة سنوات، وبالتالي فإن المبالغ المدفوعة لتسديد أصل القرض والفوائد عليها تدخل في التدفقات الخارجة أو التكاليف في السنوات التي تدفع فيها.',
    icon: CreditCard
  },
  {
    title: 'عوامل الاهتمام والتقييم الائتماني',
    text: 'ويهتم المقترض والقائم بالتحليل بسعر الفائدة وحجم القرض وفترة القرض، وما تتضمنه من فترة السماح وفترة تسديد القرض والضمان المطلوب للحصول على القرض، وإجراءات الحصول على القرض والوقت الذي يمضي بين التقدم للقرض والحصول عليه.',
    icon: CalendarCheck
  },
  {
    title: 'تعدد أساليب السداد والتقييم المالي',
    text: 'وهناك أساليب عديدة لتسديد أصل القرض والفوائد عليه، وتساعد معرفة تلك الأساليب في إجراء التقييم المالي للمشروعات.',
    icon: Shield
  }
];

export default function Page15({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: sp(3) }}>
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
            <Landmark size={14} />
            <bdi>04</bdi> | محاور الدراسة
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
            <bdi>7-</bdi> أساليب تسديد القروض
          </h1>
        </div>

        <div
          style={{
            background: c.surface,
            border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
            borderRadius: sp(2),
            paddingBlock: sp(1),
            paddingInline: sp(3),
            fontSize: fs.caption,
            color: c.textMuted || c.text,
            fontWeight: 600
          }}
        >
          التمويل والالتزامات والتدفقات النقدية الخارجة
        </div>
      </div>

      <Grid gap={4}>
        {/* العمود الأيمن: النقاط الثلاثة في بطاقات راقية */}
        <Col span={7}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: sp(3) }}>
            {ITEMS.map((item, i) => {
              const IconComp = item.icon;
              const isHighlight = i === 1;
              return (
                <div
                  key={i}
                  style={{
                    background: c.card || '#FFFFFF',
                    borderRadius: sp(3),
                    border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
                    borderInlineStart: `4px solid ${isHighlight ? '#3B82F6' : c.primary}`,
                    boxShadow: '0 4px 14px -2px rgba(15, 34, 25, 0.05)',
                    paddingBlock: sp(3),
                    paddingInline: sp(3),
                    display: 'flex',
                    gap: sp(3),
                    alignItems: 'flex-start'
                  }}
                >
                  <span
                    style={{
                      width: sp(6),
                      height: sp(6),
                      borderRadius: sp(3),
                      background: isHighlight ? 'rgba(59, 130, 246, 0.12)' : c.surface,
                      color: isHighlight ? '#3B82F6' : c.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: fs.title,
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    <bdi>{i + 1}</bdi>
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: fs.body, color: c.text, lineHeight: lhBody, margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>

        {/* العمود الأيسر: صورة حقيقية راقية للقروض والتمويل البنكي */}
        <Col span={5}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: 400,
              borderRadius: sp(3),
              overflow: 'hidden',
              border: `1px solid ${c.border || 'rgba(0,0,0,0.08)'}`,
              boxShadow: '0 10px 28px -4px rgba(15, 34, 25, 0.1)'
            }}
          >
            <Img
              src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80"
              alt="مبنى مصرفي يعبر عن التمويل والقروض الاستثمارية"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(21,60,45,0.8) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: sp(3),
                insetInlineStart: sp(3),
                insetInlineEnd: sp(3),
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                borderRadius: sp(2),
                padding: sp(2),
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
            >
              <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary }}>هيكلة الديون وفترات السماح</div>
              <div style={{ fontSize: fs.caption, color: c.textMuted || c.text }}>حساب التدفقات بدقة يحمي المشروع من التعثر النقدي</div>
            </div>
          </div>
        </Col>
      </Grid>
    </Page>
  );
}
