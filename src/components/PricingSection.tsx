import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import {
  PrimaryActionButton,
  RevealGroup,
  RevealItem,
  SecondaryActionButton,
} from './MotionPrimitives';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

const PLANS = [
  {
    name: 'Basic',
    price: '₹0',
    period: '/ month',
    description: 'Pay only when you plug in, with zero monthly commitment.',
    features: [
      'Standard ₹16/kWh fast-charge rate',
      'Live availability station map',
      'Pay with UPI & instant GST receipts',
    ],
    ctaLabel: 'Start with Basic',
    featured: false,
  },
  {
    name: 'Plus',
    price: '₹499',
    period: '/ month',
    description: 'Built for daily city commuters and weekend highway drives.',
    features: [
      '50 kWh included, then ₹10/kWh',
      '30-minute priority bay booking',
      '24/7 highway roadside support',
    ],
    ctaLabel: 'Choose Plus',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Pro',
    price: '₹1,499',
    period: '/ month',
    description: 'For high-mileage EV drivers, families, and commercial fleets.',
    features: [
      '180 kWh included, then ₹8.50/kWh',
      'Zero booking or idle fees',
      'Up to 3 vehicles on one pass',
    ],
    ctaLabel: 'Choose Pro',
    featured: false,
  },
];

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const { tokens, isDark, mounted } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="plans"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.divider,
      }}
      className="theme-transition py-16 sm:py-20 border-t"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col gap-10">
        <RevealGroup className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <RevealItem>
            <h2
              style={{ color: tokens.colors.textPrimary }}
              className="theme-transition font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance"
            >
              Simple plans for every kind of driver.
            </h2>
          </RevealItem>
          <RevealItem>
            <p
              style={{ color: tokens.colors.textSecondary }}
              className="theme-transition text-base sm:text-lg leading-relaxed text-pretty"
            >
              Start free with pay-as-you-go, or save up to 35% per kWh with monthly plans starting
              at ₹199 for two-wheelers and compact EVs in the app.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            if (plan.featured) {
              return (
                <RevealItem key={plan.name} className="h-full">
                  <motion.article
                    animate={
                      !mounted || shouldReduceMotion
                        ? undefined
                        : {
                            boxShadow: [
                              tokens.shadows.featuredPulseFrom,
                              tokens.shadows.featuredPulseTo,
                              tokens.shadows.featuredPulseFrom,
                            ],
                          }
                    }
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      backgroundColor: tokens.colors.featuredCardBg,
                      borderColor: tokens.colors.featuredCardBorder,
                      boxShadow: tokens.shadows.featuredPulseFrom,
                    }}
                    className="theme-transition h-full flex flex-col justify-between gap-7 p-7 sm:p-8 rounded-3xl border-2"
                  >
                    <div className="flex flex-col gap-4">
                      <header className="flex flex-col gap-2">
                        <span
                          style={{
                            backgroundColor: tokens.colors.accent,
                            color: tokens.colors.onAccent,
                          }}
                          className="self-start px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                        >
                          {plan.badge}
                        </span>
                        <h3
                          style={{ color: tokens.colors.textPrimary }}
                          className="font-display text-2xl font-bold tracking-tight mt-1"
                        >
                          {plan.name}
                        </h3>
                        <p
                          style={{ color: tokens.colors.textSecondary }}
                          className="text-sm sm:text-[15px] leading-relaxed"
                        >
                          {plan.description}
                        </p>
                      </header>

                      <div className="flex items-baseline gap-1.5 py-2">
                        <span
                          style={{ color: tokens.colors.accent }}
                          className="font-display text-4xl sm:text-5xl font-bold tabular-nums"
                        >
                          {plan.price}
                        </span>
                        <span style={{ color: tokens.colors.textSecondary }} className="text-sm">
                          {plan.period}
                        </span>
                      </div>

                      <ul
                        style={{ borderColor: tokens.colors.accentBorder }}
                        className="flex flex-col gap-3 border-t pt-5"
                      >
                        {plan.features.map((item) => (
                          <li
                            key={item}
                            style={{ color: tokens.colors.textPrimary }}
                            className="flex items-center gap-2.5 text-sm sm:text-[15px]"
                          >
                            <CheckCircle2
                              className="w-4 h-4 shrink-0"
                              style={{ color: tokens.colors.accent }}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <footer>
                      <PrimaryActionButton
                        fullWidth
                        onClick={() => onSelectPlan(plan.name)}
                        className="px-6 py-3"
                      >
                        {plan.ctaLabel}
                      </PrimaryActionButton>
                    </footer>
                  </motion.article>
                </RevealItem>
              );
            }

            return (
              <RevealItem key={plan.name} className="h-full">
                <article
                  style={{
                    backgroundColor: isDark
                      ? tokens.colors.cardSurface
                      : tokens.colors.backgroundAlt,
                    borderColor: tokens.colors.cardBorder,
                    boxShadow: isDark ? tokens.shadows.card : 'none',
                  }}
                  className="theme-transition h-full flex flex-col justify-between gap-7 p-7 sm:p-8 rounded-3xl border"
                >
                  <div className="flex flex-col gap-4">
                    <header className="flex flex-col gap-1.5">
                      <h3
                        style={{ color: tokens.colors.textPrimary }}
                        className="font-display text-2xl font-bold tracking-tight"
                      >
                        {plan.name}
                      </h3>
                      <p
                        style={{ color: tokens.colors.textSecondary }}
                        className="text-sm sm:text-[15px] leading-relaxed"
                      >
                        {plan.description}
                      </p>
                    </header>

                    <div className="flex items-baseline gap-1.5 py-2">
                      <span
                        style={{ color: tokens.colors.textPrimary }}
                        className="font-display text-4xl sm:text-5xl font-bold tabular-nums"
                      >
                        {plan.price}
                      </span>
                      <span style={{ color: tokens.colors.textSecondary }} className="text-sm">
                        {plan.period}
                      </span>
                    </div>

                    <ul
                      style={{ borderColor: tokens.colors.divider }}
                      className="flex flex-col gap-3 border-t pt-5"
                    >
                      {plan.features.map((item) => (
                        <li
                          key={item}
                          style={{ color: tokens.colors.textSecondary }}
                          className="flex items-center gap-2.5 text-sm sm:text-[15px]"
                        >
                          <CheckCircle2
                            className="w-4 h-4 shrink-0"
                            style={{ color: tokens.colors.accent }}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <footer>
                    <SecondaryActionButton
                      fullWidth
                      onClick={() => onSelectPlan(plan.name)}
                      className="px-6 py-3"
                    >
                      {plan.ctaLabel}
                    </SecondaryActionButton>
                  </footer>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
