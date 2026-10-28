// رسالة الصفحة في جملة واحدة: ما دراسة الجدوى وما أهميتها — التعريف والهدف والحاجة والأسئلة في لوحة واحدة متكاملة وراقية.
// ملاحظة: الحفاظ على نفس المحتوى حرفياً مع إعادة هيكلة شاملة للتصميم والكانفاس لتوفير تجربة بصرية فخمة ومتوازنة.

import { Page, Grid, Col, useDS, Img } from '../ds/index.js';
import { Target, Clock, BookOpen, Layers, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';

const WHEN_ITEMS = [
  'تُعد أداة عملية تُجنِّب المشروع المخاطر وتحمل الخسائر.',
  'تسبق الدراسة اتخاذ أي قرار استثماري، كما تسبق عمليات التشغيل.',
  'الوسيلة التي يُبنى عليها اتخاذ قرار الاستثمار المناسب الذي يحقق الأهداف المنشودة.',
  'لدراسة مشروع جديد، أو دراسة توسع استثماري، أو دراسة إحلال رأسمالي، أو دراسة لتحسين النشاط أو النمط.'
];

const DECISION_QS = [
  'هل المشروع قابل للتنفيذ؟',
  'هل المشروع مناسب لتحقيق الهدف المطلوب؟',
  'هل يستحق تخصيص الموارد له مقارنةً بالبدائل الأخرى؟'
];

export default function Page03({ pageNo, total }) {
  const { fs, sp, c, lhHeading, lhBody } = useDS();

  return (
    <Page footer pageNo={pageNo} total={total}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlockEnd: sp(2),
          paddingBlockEnd: sp(1.5),
          borderBottom: `1px solid ${c.border}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: sp(2), minWidth: 0, flex: 1 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: sp(1),
              fontSize: fs.caption,
              fontWeight: 800,
              color: c.accent,
              background: 'rgba(184, 123, 30, 0.12)',
              border: `1px solid ${c.accent}30`,
              paddingBlock: sp(0.5),
              paddingInline: sp(2),
              borderRadius: '9999px'
            }}
          >
            <bdi>02</bdi> | الأساس المنهجي
          </span>
          <h1
            style={{
              fontSize: fs.h3,
              fontWeight: 800,
              color: c.primary,
              lineHeight: lhHeading,
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            ما دراسة الجدوى؟ وما أهميتها؟
          </h1>
        </div>

        {/* Central Strategic Question Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${c.primary} 0%, #0d281e 100%)`,
            border: `1px solid ${c.accent}40`,
            borderRadius: sp(2),
            paddingBlock: sp(1),
            paddingInline: sp(2.5),
            fontSize: fs.small,
            color: c.bg,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: sp(1.5),
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <Sparkles size={16} color={c.accent} />
          <span>هل يجب أن نمضي قدمًا في هذا المشروع أم نتراجع عنه؟</span>
        </div>
      </div>

      {/* Main Structural Body: 2 Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: sp(3),
          flex: 1,
          minHeight: 0
        }}
      >
        {/* Column 1: Photographic Canvas Backdrop with Definition + Core Questions */}
        <div
          style={{
            position: 'relative',
            borderRadius: sp(3),
            overflow: 'hidden',
            border: `1px solid ${c.border}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: sp(2),
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
          }}
        >
          {/* Real Atmospheric Image Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0
            }}
          >
            <Img
              priority
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
              alt="فريق يخطط لدراسة الجدوى على لوحة متابعة"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }}
            />
            {/* Dark Brand Gradient Overlay for Maximum Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(180deg, ${c.primary}E8 0%, ${c.primary}EE 45%, #0a1f17F2 100%)`
              }}
            />
          </div>

          {/* Top Overlaid Content: Definition & Basis */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: sp(1) }}>
            {/* Definition Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${c.accent}40`,
                borderRight: `4px solid ${c.accent}`,
                borderRadius: sp(2),
                padding: sp(2),
                backdropFilter: 'blur(8px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5), marginBlockEnd: sp(1) }}>
                <BookOpen size={16} color={c.accent} />
                <h2 style={{ fontSize: fs.small, fontWeight: 800, color: c.accent, margin: 0 }}>التعريف</h2>
              </div>
              <p style={{ fontSize: fs.caption, color: c.bg, lineHeight: 1.5, margin: 0 }}>
                هي أسلوب علمي لتقدير احتمالات نجاح فكرة استثمارية قبل التنفيذ الفعلي؛ فكرة قائمة على وجود فرصة
                وقابلة للتنفيذ بناءً على دراسة علمية.
              </p>
              <p style={{ fontSize: fs.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0, marginBlockStart: sp(1) }}>
                جدول تقييمي منظم لفكرة مشروع قبل البدء في تنفيذه؛ لمعرفة هل يستحق الاستثمار أم لا؟
              </p>
            </div>

            {/* Basis Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: sp(2),
                padding: sp(2),
                backdropFilter: 'blur(6px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5), marginBlockEnd: sp(1) }}>
                <Layers size={15} color={c.accent} />
                <h2 style={{ fontSize: fs.caption, fontWeight: 700, color: c.bg, margin: 0 }}>معتمد على</h2>
              </div>
              <p style={{ fontSize: fs.caption, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, margin: 0 }}>
                تحليل منظم للسوق للفرص والبدائل والتكاليف والمنافع والمخاطر؛ لتحديد ما إذا كان المشروع يستحق
                التنفيذ أو لا، وبأي شروط.
              </p>
            </div>
          </div>

          {/* Bottom Overlaid Content: 3 Fundamental Decision Questions */}
          <div style={{ position: 'relative', zIndex: 1, marginBlockStart: sp(1) }}>
            <div style={{ fontSize: fs.caption, fontWeight: 700, color: c.accent, marginBlockEnd: sp(1), letterSpacing: '0.04em' }}>
              أسئلة القرار الاستثماري الجوهرية:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(1) }}>
              {DECISION_QS.map((q, idx) => (
                <div
                  key={q}
                  style={{
                    background: 'rgba(255, 255, 255, 0.09)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: sp(1.5),
                    paddingBlock: sp(1),
                    paddingInline: sp(2),
                    display: 'flex',
                    alignItems: 'center',
                    gap: sp(1.5),
                    color: c.bg,
                    fontSize: fs.caption,
                    fontWeight: 700
                  }}
                >
                  <HelpCircle size={14} color={c.accent} style={{ flexShrink: 0 }} />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: The Final Objective & When We Need It */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(2) }}>
          {/* Card A: Final Objective */}
          <div
            style={{
              background: c.surface,
              borderRadius: sp(3),
              border: `1.5px solid ${c.border}`,
              borderRight: `4px solid ${c.primary}`,
              padding: sp(2),
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5), marginBlockEnd: sp(1) }}>
              <div
                style={{
                  width: sp(4),
                  height: sp(4),
                  borderRadius: sp(1.5),
                  background: `${c.primary}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Target size={16} color={c.primary} />
              </div>
              <h2 style={{ fontSize: fs.small, fontWeight: 800, color: c.primary, margin: 0 }}>الهدف النهائي</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: sp(1) }}>
              <div style={{ display: 'flex', gap: sp(1.5), alignItems: 'flex-start' }}>
                <CheckCircle2 size={15} color={c.accent} style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: fs.caption, color: c.text, lineHeight: 1.5, margin: 0 }}>
                  تحديد مدى صلاحية المشروع من جوانب عدة: سوقية، فنية، مالية، تمويلية، اقتصادية، واجتماعية؛ وذلك تمهيدًا لاختيار تلك المشروعات التي تحقق أعلى منفعة صافية ممكنة، إضافة إلى عدد آخر من الأهداف، وبالتالي اتخاذ قرار إما بتنفيذ الفكرة أو رفضها.
                </p>
              </div>
              <div style={{ display: 'flex', gap: sp(1.5), alignItems: 'center' }}>
                <CheckCircle2 size={15} color={c.accent} style={{ flexShrink: 0 }} />
                <p style={{ fontSize: fs.caption, fontWeight: 700, color: c.primary, lineHeight: 1.4, margin: 0 }}>
                  تحقيق ربحية، قيمة مضافة، تحقيق خدمة.
                </p>
              </div>
            </div>
          </div>

          {/* Card B: When Do We Need a Feasibility Study? */}
          <div
            style={{
              background: c.surface,
              borderRadius: sp(3),
              border: `1.5px solid ${c.border}`,
              borderRight: `4px solid ${c.accent}`,
              padding: sp(2),
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: sp(1.5), marginBlockEnd: sp(1) }}>
              <div
                style={{
                  width: sp(4),
                  height: sp(4),
                  borderRadius: sp(1.5),
                  background: `${c.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Clock size={16} color={c.accent} />
              </div>
              <h2 style={{ fontSize: fs.small, fontWeight: 800, color: c.primary, margin: 0 }}>متى نحتاج إلى دراسة جدوى؟</h2>
            </div>

            <Grid gap={1}>
              {WHEN_ITEMS.map((item, i) => (
                <Col key={i} span={6}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: sp(1),
                      background: c.card || '#FFFFFF',
                      border: `1px solid ${c.border}`,
                      borderRadius: sp(1.5),
                      paddingBlock: sp(1),
                      paddingInline: sp(1.5),
                      height: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <span
                      style={{
                        width: sp(3),
                        height: sp(3),
                        borderRadius: '50%',
                        background: c.primary,
                        color: c.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: fs.caption,
                        fontWeight: 800,
                        flexShrink: 0,
                        marginTop: 2
                      }}
                    >
                      <bdi>{i + 1}</bdi>
                    </span>
                    <p style={{ fontSize: fs.caption, color: c.text, lineHeight: 1.45, margin: 0 }}>
                      {item}
                    </p>
                  </div>
                </Col>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Page>
  );
}

