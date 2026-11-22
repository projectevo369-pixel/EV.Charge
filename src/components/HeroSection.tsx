import { ArrowRight, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryActionButton, SecondaryActionButton } from './MotionPrimitives';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onSeePlans: () => void;
}

export function HeroSection({ onOpenDownload, onSeePlans }: HeroSectionProps) {
  const { tokens, isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{ backgroundColor: tokens.colors.background }}
      className="theme-transition relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      {/* Subtle ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            background: `radial-gradient(circle at 75% 25%, ${tokens.colors.glowBlurPrimary} 0%, transparent 50%), radial-gradient(circle at 20% 70%, ${tokens.colors.glowBlurSecondary} 0%, transparent 45%)`,
          }}
          className="w-full h-full"
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Value Proposition */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          <div
            style={{
              backgroundColor: tokens.colors.accentSoft,
              borderColor: tokens.colors.accentBorder,
              color: tokens.colors.textPrimary,
            }}
            className="theme-transition inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
          >
            <Zap
              className="w-3.5 h-3.5 fill-current shrink-0"
              style={{ color: tokens.colors.accent }}
              aria-hidden="true"
            />
            <span className="font-mono-tabular">India&apos;s fast-charging network</span>
          </div>

          <h1
            style={{ color: tokens.colors.textPrimary }}
            className="theme-transition font-display text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight text-balance"
          >
            Effortless EV charging, built for{' '}
            <span style={{ color: tokens.colors.accent }}>India.</span>
          </h1>

          <p
            style={{ color: tokens.colors.textSecondary }}
            className="theme-transition text-base sm:text-lg leading-relaxed max-w-[54ch] text-pretty"
          >
            Check live availability at DC fast chargers across cities and expressways, reserve
            your bay in seconds, pay with UPI, and save with monthly plans starting at ₹199.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <PrimaryActionButton onClick={onOpenDownload} className="px-6 py-3.5">
              <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Download the App</span>
            </PrimaryActionButton>

            <SecondaryActionButton onClick={onSeePlans} className="px-6 py-3.5">
              <span>See Plans</span>
              <ArrowRight
                className="w-4 h-4"
                style={{ color: tokens.colors.accent }}
                aria-hidden="true"
              />
            </SecondaryActionButton>
          </div>
        </motion.div>

        {/* Right Column: Floating Charge-Percentage Graphic + Pulsing Glow */}
        <div className="lg:col-span-5 flex justify-center relative">
          {/* Pulsing Glow Halo (Soft Halo in Light, Neon Lime Glow in Dark) */}
          <motion.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.08, 1],
                    opacity: isDark ? [0.65, 1, 0.65] : [0.55, 0.85, 0.55],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              backgroundColor: tokens.colors.glowBlurPrimary,
            }}
            className="absolute inset-4 sm:inset-6 rounded-full blur-3xl pointer-events-none"
          />

          {/* Gently Floating Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: [-6, 6, -6],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.5, ease: 'easeOut' },
                    y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.halo,
            }}
            className="theme-transition relative w-full max-w-[380px] rounded-3xl border p-7 sm:p-8 flex flex-col items-center"
          >
            {/* Card Header */}
            <div className="w-full flex items-center justify-between mb-5">
              <span
                style={{ color: tokens.colors.textSecondary }}
                className="font-mono-tabular text-xs font-medium"
              >
                CCS2 · 120 kW
              </span>
              <span
                style={{
                  backgroundColor: tokens.colors.accentSoft,
                  color: isDark ? tokens.colors.accent : tokens.colors.textPrimary,
                }}
                className="theme-transition inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              >
                <Zap
                  className="w-3 h-3 fill-current"
                  style={{ color: tokens.colors.accent }}
                  aria-hidden="true"
                />
                Charging
              </span>
            </div>

            {/* Glowing Circular Progress Ring */}
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke={tokens.colors.ringTrack}
                  strokeWidth="12"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke={tokens.colors.accent}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="527.8"
                  initial={shouldReduceMotion ? { strokeDashoffset: 84.4 } : { strokeDashoffset: 220 }}
                  animate={{ strokeDashoffset: 84.4 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <Zap
                  className="w-6 h-6 fill-current mb-1"
                  style={{ color: tokens.colors.accent }}
                  aria-hidden="true"
                />
                <span
                  style={{ color: tokens.colors.textPrimary }}
                  className="font-display font-bold text-4xl sm:text-5xl tabular-nums tracking-tight"
                >
                  84%
                </span>
                <span
                  style={{ color: tokens.colors.textSecondary }}
                  className="text-xs font-medium mt-1"
                >
                  +310 km range
                </span>
              </div>
            </div>

            {/* Bottom Session Metrics */}
            <div
              style={{ borderColor: tokens.colors.divider }}
              className="w-full mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center"
            >
              <div>
                <p style={{ color: tokens.colors.textSecondary }} className="text-xs font-medium">
                  Power
                </p>
                <p
                  style={{ color: tokens.colors.accent }}
                  className="font-mono-tabular text-sm font-semibold mt-0.5"
                >
                  118 kW
                </p>
              </div>
              <div>
                <p style={{ color: tokens.colors.textSecondary }} className="text-xs font-medium">
                  Added
                </p>
                <p
                  style={{ color: tokens.colors.textPrimary }}
                  className="font-mono-tabular text-sm font-semibold mt-0.5"
                >
                  44.2 kWh
                </p>
              </div>
              <div>
                <p style={{ color: tokens.colors.textSecondary }} className="text-xs font-medium">
                  Time Left
                </p>
                <p
                  style={{ color: tokens.colors.textPrimary }}
                  className="font-mono-tabular text-sm font-semibold mt-0.5"
                >
                  11 min
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
