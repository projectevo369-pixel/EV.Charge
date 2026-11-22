import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { darkTokens, lightTokens, ThemeMode, ThemeTokens } from './tokens';

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

function getInitialThemeMode(): ThemeMode {
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
  root.style.setProperty('--ev-bg', activeTokens.colors.background);
  root.style.setProperty('--ev-bg-alt', activeTokens.colors.backgroundAlt);
  root.style.setProperty('--ev-accent', activeTokens.colors.accent);
  root.style.setProperty('--ev-on-accent', activeTokens.colors.onAccent);
  root.style.setProperty('--ev-text-primary', activeTokens.colors.textPrimary);
  root.style.setProperty('--ev-text-secondary', activeTokens.colors.textSecondary);
  root.style.setProperty('--ev-card-bg', activeTokens.colors.cardSurface);
  root.style.setProperty('--ev-card-border', activeTokens.colors.cardBorder);
  root.style.setProperty('--ev-icon-badge-bg', activeTokens.colors.iconBadgeBg);
  root.style.setProperty('--ev-ring-track', activeTokens.colors.ringTrack);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialThemeMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    applyThemeToDocument(mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored !== 'light' && stored !== 'dark') {
          setModeState(event.matches ? 'dark' : 'light');
        }
      } catch {
        setModeState(event.matches ? 'dark' : 'light');
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
    const tokens = mode === 'dark' ? darkTokens : lightTokens;
    return {
      mode,
      tokens,
      isDark: mode === 'dark',
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
