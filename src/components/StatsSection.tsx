import { useTheme } from '../theme/ThemeProvider';
import { RevealGroup, RevealItem } from './MotionPrimitives';

const STATS = [
  {
    value: '500+',
    label: 'Charging Points',
    sublabel: 'High-speed CCS2 & Type 2',
  },
  {
    value: '10,000+',
    label: 'Happy Drivers',
    sublabel: 'Charging weekly across India',
  },
  {
    value: '28+',
    label: 'Indian Cities',
    sublabel: 'Plus 14 major expressways',
  },
  {
    value: '99.4%',
    label: 'Network Uptime',
    sublabel: 'Monitored 24/7 remotely',
  },
];

export function StatsSection() {
  const { tokens, isDark } = useTheme();

  return (
    <section
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.divider,
      }}
      className="theme-transition py-14 sm:py-16 border-t"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {STATS.map((stat) => (
            <RevealItem key={stat.label} className="h-full">
              <div
                style={{
                  backgroundColor: isDark
                    ? tokens.colors.cardSurface
                    : tokens.colors.backgroundAlt,
                  borderColor: tokens.colors.cardBorder,
                }}
                className="theme-transition h-full p-6 rounded-2xl border flex flex-col gap-1.5"
              >
                <span
                  style={{ color: tokens.colors.accent }}
                  className="font-display text-4xl sm:text-[44px] font-bold leading-tight tabular-nums"
                >
                  {stat.value}
                </span>
                <span
                  style={{ color: tokens.colors.textPrimary }}
                  className="text-sm font-semibold mt-1"
                >
                  {stat.label}
                </span>
                <span style={{ color: tokens.colors.textSecondary }} className="text-xs">
                  {stat.sublabel}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
