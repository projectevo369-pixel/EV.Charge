import { BookmarkCheck, MapPin, QrCode, Zap } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { RevealGroup, RevealItem } from './MotionPrimitives';

const STEPS = [
  {
    number: '01',
    title: 'Find Station',
    description:
      'Filter nearby hubs by CCS2 or Type 2 connector, charging speed, and live availability.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Book Your Bay',
    description:
      'Hold a charger slot while you drive so your bay is waiting when you pull in.',
    icon: BookmarkCheck,
  },
  {
    number: '03',
    title: 'Scan & Charge',
    description:
      'Scan the station QR code, plug in your EV, and track live kWh delivery on your phone.',
    icon: Zap,
  },
  {
    number: '04',
    title: 'Auto Pay',
    description:
      'Unplug and drive off—your session settles automatically via UPI or your monthly plan.',
    icon: QrCode,
  },
];

export function HowItWorksSection() {
  const { tokens, isDark } = useTheme();

  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: tokens.colors.background,
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
              Plug in and power up in four steps.
            </h2>
          </RevealItem>
          <RevealItem>
            <p
              style={{ color: tokens.colors.textSecondary }}
              className="theme-transition text-base sm:text-lg leading-relaxed text-pretty"
            >
              From finding the nearest hub to driving away charged, everything happens in one app.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <RevealItem key={step.number} className="h-full">
                <div
                  style={{
                    backgroundColor: isDark
                      ? tokens.colors.cardSurface
                      : tokens.colors.backgroundAlt,
                    borderColor: tokens.colors.cardBorder,
                  }}
                  className="theme-transition h-full flex flex-col gap-4 p-6 rounded-2xl border"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        backgroundColor: tokens.colors.iconBadgeBg,
                        borderColor: tokens.colors.accentBorder,
                        color: tokens.colors.iconColor,
                      }}
                      className="theme-transition inline-flex items-center justify-center w-9 h-9 rounded-full border font-mono-tabular text-xs font-semibold"
                    >
                      {step.number}
                    </span>

                    <span
                      style={{
                        backgroundColor: isDark
                          ? tokens.colors.cardSurfaceElevated
                          : tokens.colors.cardSurface,
                        borderColor: tokens.colors.cardBorder,
                        color: tokens.colors.iconColor,
                      }}
                      className="theme-transition w-10 h-10 rounded-full border flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>

                  <h3
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-display text-lg font-bold tracking-tight"
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{ color: tokens.colors.textSecondary }}
                    className="text-sm sm:text-[15px] leading-relaxed"
                  >
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
