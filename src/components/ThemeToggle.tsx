import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';

export function ThemeToggle() {
  const { isDark, toggleTheme, tokens, mounted } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle color theme"
        style={{
          backgroundColor: tokens.colors.cardSurfaceElevated,
          borderColor: tokens.colors.cardBorder,
          color: tokens.colors.textPrimary,
        }}
        className="theme-transition inline-flex items-center justify-center min-w-[56px] min-h-[56px] md:min-w-[44px] md:min-h-[44px] rounded-full border shrink-0"
      >
        <span className="w-5 h-5 block" aria-hidden="true" />
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
      style={{
        backgroundColor: tokens.colors.cardSurfaceElevated,
        borderColor: tokens.colors.cardBorder,
        color: tokens.colors.textPrimary,
      }}
      className="theme-transition inline-flex items-center justify-center min-w-[56px] min-h-[56px] md:min-w-[44px] md:min-h-[44px] rounded-full border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 shrink-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="inline-flex items-center justify-center"
            style={{ color: tokens.colors.accent }}
          >
            <Sun className="w-5 h-5" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="inline-flex items-center justify-center"
            style={{ color: tokens.colors.textPrimary }}
          >
            <Moon className="w-5 h-5" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
