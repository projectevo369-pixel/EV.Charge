import React from 'react';
import { Check, MapPin, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { RevealGroup, RevealItem } from './MotionPrimitives';

/**
 * Drop real theme-matched app screenshots into:
 *   /public/screenshots/light/{map,charging,receipt}.png
 *   /public/screenshots/dark/{map,charging,receipt}.png
 * and set USE_REAL_SCREENSHOTS = true to render them automatically.
 */
const USE_REAL_SCREENSHOTS = false;

function ScreenSlot({
  screenKey,
  alt,
  children,
}: {
  screenKey: 'map' | 'charging' | 'receipt';
  alt: string;
  children: React.ReactNode;
}) {
  const { mode } = useTheme();
  const [failed, setFailed] = React.useState(false);

  if (USE_REAL_SCREENSHOTS && !failed) {
    return (
      <img
        src={`/screenshots/${mode}/${screenKey}.png`}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-auto rounded-2xl object-cover"
      />
    );
  }

  return <>{children}</>;
}

export function AppShowcaseSection() {
  const { tokens, isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="app-showcase"
      style={{
        backgroundColor: tokens.colors.backgroundAlt,
        borderColor: tokens.colors.divider,
      }}
      className="theme-transition py-20 sm:py-24 border-t overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col gap-12 items-center">
        <RevealGroup className="text-center flex flex-col items-center gap-3 max-w-2xl">
          <RevealItem>
            <h2
              style={{ color: tokens.colors.textPrimary }}
              className="theme-transition font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance"
            >
              {isDark ? "Designed for the driver's seat." : 'Designed for daylight clarity.'}
            </h2>
          </RevealItem>
          <RevealItem>
            <p
              style={{ color: tokens.colors.textSecondary }}
              className="theme-transition text-base sm:text-lg leading-relaxed text-pretty"
            >
              {isDark
                ? 'Dark-mode clarity that matches your cockpit—from live station discovery to instant UPI receipts.'
                : 'Crisp mobile screens that stay effortless to read in bright Indian sunlight—from map to UPI receipt.'}
            </p>
          </RevealItem>
        </RevealGroup>

        {/* 3 Floating Phone Mockups */}
        <div className="relative w-full pt-6 pb-4 flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Soft radial glow behind phones */}
          <div
            aria-hidden="true"
            style={{ backgroundColor: tokens.colors.glowBlurPrimary }}
            className="hidden lg:block absolute inset-x-1/4 top-1/4 h-64 rounded-full blur-3xl pointer-events-none"
          />

          {/* Phone 1: Map Screen */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.halo,
            }}
            className="theme-transition relative w-[275px] rounded-3xl border p-4 flex flex-col gap-4 lg:-rotate-3"
          >
            <ScreenSlot screenKey="map" alt="ev.charge live Bengaluru charging map">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: tokens.colors.textSecondary }}
                  className="font-mono-tabular text-xs font-medium"
                >
                  BENGALURU
                </span>
                <span
                  style={{
                    backgroundColor: tokens.colors.accentSoft,
                    borderColor: tokens.colors.accentBorder,
                    color: isDark ? tokens.colors.accent : tokens.colors.textPrimary,
                  }}
                  className="theme-transition px-2.5 py-0.5 rounded-full border text-xs font-semibold"
                >
                  12 Nearby
                </span>
              </div>

              {/* Stylized Map Canvas */}
              <div
                style={{
                  backgroundColor: isDark
                    ? tokens.colors.background
                    : tokens.colors.backgroundAlt,
                  borderColor: tokens.colors.cardBorder,
                }}
                className="theme-transition relative h-44 rounded-2xl border overflow-hidden p-3"
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-75"
                  viewBox="0 0 240 176"
                  aria-hidden="true"
                >
                  <path
                    d="M0 44 H240 M0 88 H240 M0 132 H240 M60 0 V176 M120 0 V176 M180 0 V176"
                    stroke={tokens.colors.mapGridLine}
                    strokeWidth="1.25"
                  />
                  <path
                    d="M20 150 Q110 90 210 30"
                    stroke={tokens.colors.accent}
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                </svg>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div
                    style={{
                      backgroundColor: tokens.colors.accent,
                      color: tokens.colors.onAccent,
                    }}
                    className="self-end inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono-tabular"
                  >
                    <Zap className="w-3 h-3 fill-current" aria-hidden="true" />
                    <span>120 kW</span>
                  </div>
                  <div
                    style={{
                      backgroundColor: tokens.colors.cardSurface,
                      borderColor: tokens.colors.accent,
                      color: isDark ? tokens.colors.accent : tokens.colors.textPrimary,
                    }}
                    className="self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold font-mono-tabular"
                  >
                    <MapPin
                      className="w-3 h-3"
                      style={{ color: tokens.colors.accent }}
                      aria-hidden="true"
                    />
                    <span>60 kW</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: isDark
                    ? tokens.colors.cardSurfaceElevated
                    : tokens.colors.backgroundAlt,
                  borderColor: tokens.colors.cardBorder,
                }}
                className="theme-transition p-3.5 rounded-2xl border flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-display text-sm font-bold"
                  >
                    Indiranagar Hub
                  </span>
                  <span
                    style={{ color: tokens.colors.accent }}
                    className="font-mono-tabular text-xs font-semibold"
                  >
                    1.4 km
                  </span>
                </div>
                <span style={{ color: tokens.colors.textSecondary }} className="text-xs">
                  4 of 6 bays free · CCS2 Fast
                </span>
              </div>
            </ScreenSlot>
          </motion.div>

          {/* Phone 2: Charging Screen (Elevated Center) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.45,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.accent,
              boxShadow: tokens.shadows.halo,
            }}
            className="theme-transition relative w-[290px] rounded-3xl border-2 p-5 flex flex-col items-center gap-4 lg:-translate-y-4"
          >
            <ScreenSlot screenKey="charging" alt="ev.charge live charging progress screen">
              <div className="w-full flex items-center justify-between">
                <span
                  style={{ color: tokens.colors.textSecondary }}
                  className="font-mono-tabular text-xs font-medium"
                >
                  BAY #04
                </span>
                <span
                  style={{
                    backgroundColor: tokens.colors.accentSoft,
                    color: isDark ? tokens.colors.accent : tokens.colors.textPrimary,
                  }}
                  className="theme-transition inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                >
                  <Zap
                    className="w-3 h-3 fill-current"
                    style={{ color: tokens.colors.accent }}
                    aria-hidden="true"
                  />
                  Active
                </span>
              </div>

              <div className="relative w-40 h-40 flex items-center justify-center my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke={tokens.colors.ringTrack}
                    strokeWidth="10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke={tokens.colors.accent}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="414.7"
                    strokeDashoffset="91.2"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-display font-bold text-3xl tabular-nums"
                  >
                    78%
                  </span>
                  <span
                    style={{ color: tokens.colors.accent }}
                    className="font-mono-tabular text-xs font-semibold mt-0.5"
                  >
                    118 kW
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2.5">
                <div
                  style={{
                    backgroundColor: isDark
                      ? tokens.colors.cardSurfaceElevated
                      : tokens.colors.backgroundAlt,
                    borderColor: tokens.colors.cardBorder,
                  }}
                  className="theme-transition p-3 rounded-2xl border"
                >
                  <p style={{ color: tokens.colors.textSecondary }} className="text-xs">
                    Energy
                  </p>
                  <p
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-mono-tabular text-sm font-semibold mt-0.5"
                  >
                    42.6 kWh
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: isDark
                      ? tokens.colors.cardSurfaceElevated
                      : tokens.colors.backgroundAlt,
                    borderColor: tokens.colors.cardBorder,
                  }}
                  className="theme-transition p-3 rounded-2xl border"
                >
                  <p style={{ color: tokens.colors.textSecondary }} className="text-xs">
                    Est. Cost
                  </p>
                  <p
                    style={{ color: tokens.colors.accent }}
                    className="font-mono-tabular text-sm font-semibold mt-0.5"
                  >
                    ₹512
                  </p>
                </div>
              </div>
            </ScreenSlot>
          </motion.div>

          {/* Phone 3: Payment Receipt Screen */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.45,
              delay: shouldReduceMotion ? 0 : 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.halo,
            }}
            className="theme-transition relative w-[275px] rounded-3xl border p-4 flex flex-col gap-4 lg:rotate-3"
          >
            <ScreenSlot screenKey="receipt" alt="ev.charge instant UPI payment receipt">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: tokens.colors.textSecondary }}
                  className="font-mono-tabular text-xs font-medium"
                >
                  RECEIPT
                </span>
                <span
                  style={{ color: tokens.colors.accent }}
                  className="text-xs font-semibold"
                >
                  Pay with UPI
                </span>
              </div>

              <div
                style={{ borderColor: tokens.colors.divider }}
                className="py-4 flex flex-col items-center text-center gap-2 border-b"
              >
                <span
                  style={{
                    backgroundColor: tokens.colors.iconBadgeBg,
                    borderColor: tokens.colors.accentBorder,
                    color: tokens.colors.iconColor,
                  }}
                  className="theme-transition w-12 h-12 rounded-full border flex items-center justify-center"
                >
                  <Check className="w-6 h-6" aria-hidden="true" />
                </span>
                <span
                  style={{ color: tokens.colors.textPrimary }}
                  className="font-display text-2xl font-bold tabular-nums mt-1"
                >
                  ₹512.00
                </span>
                <span style={{ color: tokens.colors.textSecondary }} className="text-xs">
                  Paid seamlessly via UPI AutoPay
                </span>
              </div>

              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span style={{ color: tokens.colors.textSecondary }}>Energy Delivered</span>
                  <span
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-mono-tabular font-medium"
                  >
                    42.6 kWh
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: tokens.colors.textSecondary }}>Tariff (Plus Plan)</span>
                  <span
                    style={{ color: tokens.colors.accent }}
                    className="font-mono-tabular font-semibold"
                  >
                    ₹12.00/kWh
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: tokens.colors.textSecondary }}>Session Time</span>
                  <span
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-mono-tabular font-medium"
                  >
                    24m 18s
                  </span>
                </div>
              </div>
            </ScreenSlot>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
