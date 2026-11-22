import React, { useEffect, useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryActionButton } from './MotionPrimitives';
import { ThemeToggle } from './ThemeToggle';

export type AppRoute = '/' | '/privacy' | '/terms' | '/refund';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, hash?: string) => void;
  onOpenDownload: (sourcePlan?: string) => void;
}

const NAV_LINKS = [
  { label: 'Features', hash: 'features' },
  { label: 'How It Works', hash: 'how-it-works' },
  { label: 'App', hash: 'app-showcase' },
  { label: 'Plans', hash: 'plans' },
];

export function Navbar({ currentRoute, onNavigate, onOpenDownload }: NavbarProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (hash) {
      onNavigate('/', hash);
    } else {
      onNavigate('/');
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header
      style={{
        backgroundColor: scrolled ? tokens.colors.headerScrolledBg : tokens.colors.background,
        borderColor: scrolled ? tokens.colors.headerBorder : 'transparent',
      }}
      className={`theme-transition sticky top-0 z-40 border-b ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-2.5 md:py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e)}
          style={{ color: tokens.colors.textPrimary }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span
            style={{
              backgroundColor: tokens.colors.iconBadgeBg,
              borderColor: tokens.colors.accentBorder,
              color: tokens.colors.accent,
            }}
            className="theme-transition w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
          >
            <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">ev.charge</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              onClick={(e) => handleNavClick(e, item.hash)}
              style={{ color: tokens.colors.textSecondary }}
              className="theme-transition relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 hover:opacity-100 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tokens.colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = tokens.colors.textSecondary;
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme toggle (always visible, 56px min tap target on mobile) + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <ThemeToggle />

          <PrimaryActionButton
            onClick={() => onOpenDownload()}
            className="hidden sm:inline-flex px-5 py-2.5"
          >
            Download the App
          </PrimaryActionButton>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              backgroundColor: tokens.colors.cardSurfaceElevated,
              borderColor: tokens.colors.cardBorder,
              color: tokens.colors.textPrimary,
            }}
            className="theme-transition md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{
              backgroundColor: tokens.colors.backgroundAlt,
              borderColor: tokens.colors.divider,
            }}
            className="md:hidden border-t px-6 py-4"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.hash}
                  href={`/#${item.hash}`}
                  onClick={(e) => handleNavClick(e, item.hash)}
                  style={{ color: tokens.colors.textPrimary }}
                  className="py-2 text-base font-semibold whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
              {currentRoute !== '/' && (
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e)}
                  style={{ color: tokens.colors.textSecondary }}
                  className="py-2 text-base font-semibold whitespace-nowrap"
                >
                  Home
                </a>
              )}
              <div className="pt-2">
                <PrimaryActionButton
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDownload();
                  }}
                  className="px-5 py-3"
                >
                  Download the App
                </PrimaryActionButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
