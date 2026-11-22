import { Smartphone, Store, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenDownload: (platform?: string) => void;
}

export function Footer({ onNavigate, onOpenDownload }: FooterProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, route: AppRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer
      id="download"
      style={{
        backgroundColor: tokens.colors.backgroundAlt,
        borderColor: tokens.colors.divider,
      }}
      className="theme-transition border-t py-14 sm:py-16"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2.5">
            <span
              style={{
                backgroundColor: tokens.colors.iconBadgeBg,
                borderColor: tokens.colors.accentBorder,
                color: tokens.colors.accent,
              }}
              className="theme-transition w-8 h-8 rounded-full border flex items-center justify-center"
            >
              <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
            </span>
            <span
              style={{ color: tokens.colors.textPrimary }}
              className="font-display text-xl font-bold tracking-tight"
            >
              ev.charge
            </span>
          </div>
          <p style={{ color: tokens.colors.textSecondary }} className="text-sm sm:text-[15px]">
            Powering India&apos;s electric commute.
          </p>
          <p style={{ color: tokens.colors.textSecondary }} className="text-xs">
            © 2026 ev.charge India Pvt. Ltd.
          </p>
        </div>

        <nav aria-label="Legal" className="flex flex-wrap items-center gap-6">
          <a
            href="/privacy"
            onClick={(e) => handleLinkClick(e, '/privacy')}
            style={{ color: tokens.colors.textSecondary }}
            className="text-sm font-semibold hover:underline underline-offset-4 transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = tokens.colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = tokens.colors.textSecondary;
            }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            onClick={(e) => handleLinkClick(e, '/terms')}
            style={{ color: tokens.colors.textSecondary }}
            className="text-sm font-semibold hover:underline underline-offset-4 transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = tokens.colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = tokens.colors.textSecondary;
            }}
          >
            Terms of Service
          </a>
          <a
            href="/refund"
            onClick={(e) => handleLinkClick(e, '/refund')}
            style={{ color: tokens.colors.textSecondary }}
            className="text-sm font-semibold hover:underline underline-offset-4 transition-colors"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = tokens.colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = tokens.colors.textSecondary;
            }}
          >
            Refund Policy
          </a>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={() => onOpenDownload('Google Play')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.card,
            }}
            className="theme-transition inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border cursor-pointer text-left"
          >
            <Store
              className="w-5 h-5 shrink-0"
              style={{ color: tokens.colors.accent }}
              aria-hidden="true"
            />
            <div className="flex flex-col leading-tight">
              <span style={{ color: tokens.colors.textSecondary }} className="text-[11px]">
                GET IT ON
              </span>
              <span
                style={{ color: tokens.colors.textPrimary }}
                className="font-display text-sm font-bold"
              >
                Google Play
              </span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onOpenDownload('App Store')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.card,
            }}
            className="theme-transition inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border cursor-pointer text-left"
          >
            <Smartphone
              className="w-5 h-5 shrink-0"
              style={{ color: tokens.colors.textPrimary }}
              aria-hidden="true"
            />
            <div className="flex flex-col leading-tight">
              <span style={{ color: tokens.colors.textSecondary }} className="text-[11px]">
                Download on the
              </span>
              <span
                style={{ color: tokens.colors.textPrimary }}
                className="font-display text-sm font-bold"
              >
                App Store
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
