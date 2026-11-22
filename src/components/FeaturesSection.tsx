import { CalendarCheck, CreditCard, RefreshCw, Zap } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { RevealGroup, RevealItem } from './MotionPrimitives';

const FEATURES = [
  {
    title: 'Live availability',
    description:
      'Real-time connector status, kW output, and bay queue times updated every 10 seconds across India.',
    icon: Zap,
  },
  {
    title: 'Easy Booking',
    description:
      'Reserve your preferred DC fast-charging bay up to 30 minutes ahead with a single tap.',
    icon: CalendarCheck,
  },
  {
    title: 'Pay with UPI',
    description:
      'Instant checkout via UPI AutoPay, RuPay, or cards with automatic GST-ready receipts.',
    icon: CreditCard,
  },
  {
    title: 'Monthly Plans',
    description:
      'Lock in lower per-kWh rates with flexible monthly plans starting at ₹199 for daily commutes.',
    icon: RefreshCw,
  },
];

export function FeaturesSection() {
  const { tokens } = useTheme();

  return (
    <section
      id="features"
      style={{
        backgroundColor: tokens.colors.backgroundAlt,
        borderColor: tokens.colors.divider,
      }}
      className="theme-transition py-16 sm:py-20 border-t"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col gap-10">
        <RevealGroup className="flex flex-col gap-3 max-w-2xl">
          <RevealItem>
            <h2
              style={{ color: tokens.colors.textPrimary }}
              className="theme-transition font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance"
            >
              Built for zero-anxiety charging.
            </h2>
          </RevealItem>
          <RevealItem>
            <p
              style={{ color: tokens.colors.textSecondary }}
              className="theme-transition text-base sm:text-lg leading-relaxed text-pretty"
            >
              Every station on ev.charge is verified live, so you never arrive at an offline or
              occupied bay.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <RevealItem key={feature.title} className="h-full">
                <article
                  style={{
                    backgroundColor: tokens.colors.cardSurface,
                    borderColor: tokens.colors.cardBorder,
                    boxShadow: tokens.shadows.card,
                  }}
                  className="theme-transition h-full flex flex-col gap-4 p-6 rounded-2xl border hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <header className="flex items-center gap-3.5">
                    <div
                      style={{
                        backgroundColor: tokens.colors.iconBadgeBg,
                        borderColor: tokens.colors.iconBadgeBorder,
                        color: tokens.colors.iconColor,
                      }}
                      className="theme-transition w-11 h-11 rounded-full border flex items-center justify-center shrink-0"
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3
                      style={{ color: tokens.colors.textPrimary }}
                      className="font-display text-lg font-bold tracking-tight"
                    >
                      {feature.title}
                    </h3>
                  </header>
                  <p
                    style={{ color: tokens.colors.textSecondary }}
                    className="text-sm sm:text-[15px] leading-relaxed"
                  >
                    {feature.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
