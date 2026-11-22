import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cssVarTokens, darkTokens, lightTokens, ThemeMode, ThemeTokens } from './tokens';

const STORAGE_KEY = 'ev-charge-theme';

interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  isDark: boolean;
  setMode: (nextMode: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readClientThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Ignore storage read errors in restricted iframes
  }
  return 'light';
}

function applyThemeToDocument(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const activeTokens = mode === 'dark' ? darkTokens : lightTokens;

  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  root.style.colorScheme = mode;
  root.style.backgroundColor = activeTokens.colors.background;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start deterministic on SSR & initial hydration pass to prevent mismatch errors
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialClientMode = readClientThemeMode();
    setModeState(initialClientMode);
    applyThemeToDocument(initialClientMode);
    setMounted(true);

    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored !== 'light' && stored !== 'dark') {
          const nextMode: ThemeMode = event.matches ? 'dark' : 'light';
          setModeState(nextMode);
          applyThemeToDocument(nextMode);
        }
      } catch {
        const nextMode: ThemeMode = event.matches ? 'dark' : 'light';
        setModeState(nextMode);
        applyThemeToDocument(nextMode);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // Ignore storage write errors
    }
    applyThemeToDocument(nextMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(() => {
    const activeConcreteTokens = mode === 'dark' ? darkTokens : lightTokens;
    const tokens: ThemeTokens = {
      ...cssVarTokens,
      mode: mounted ? mode : 'light',
      shadows: {
        ...cssVarTokens.shadows,
        featuredPulseFrom: activeConcreteTokens.shadows.featuredPulseFrom,
        featuredPulseTo: activeConcreteTokens.shadows.featuredPulseTo,
      },
    };
    return {
      mode: mounted ? mode : 'light',
      tokens,
      isDark: mounted && mode === 'dark',
      setMode,
      toggleTheme,
      mounted,
    };
  }, [mode, setMode, toggleTheme, mounted]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
