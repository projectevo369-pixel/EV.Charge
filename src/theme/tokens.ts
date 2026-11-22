export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  mode: ThemeMode;
  colors: {
    background: string;
    backgroundAlt: string;
    backgroundElevated: string;
    accent: string;
    accentHover: string;
    onAccent: string;
    accentSoft: string;
    accentBorder: string;
    textPrimary: string;
    textSecondary: string;
    cardSurface: string;
    cardSurfaceElevated: string;
    cardBorder: string;
    cardBorderHover: string;
    divider: string;
    iconBadgeBg: string;
    iconBadgeBorder: string;
    iconColor: string;
    ringTrack: string;
    headerScrolledBg: string;
    headerBorder: string;
    featuredCardBg: string;
    featuredCardBorder: string;
    mapGridLine: string;
    glowBlurPrimary: string;
    glowBlurSecondary: string;
  };
  shadows: {
    card: string;
    halo: string;
    button: string;
    buttonHover: string;
    featuredPulseFrom: string;
    featuredPulseTo: string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

export const lightTokens: ThemeTokens = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    backgroundAlt: '#F6F8F7',
    backgroundElevated: '#EEF3F1',
    accent: '#0FA968',
    accentHover: '#0D945B',
    onAccent: '#FFFFFF',
    accentSoft: '#E6F8F0',
    accentBorder: 'rgba(15, 169, 104, 0.28)',
    textPrimary: '#0F172A',
    textSecondary: '#5B6B69',
    cardSurface: '#FFFFFF',
    cardSurfaceElevated: '#F6F8F7',
    cardBorder: '#E6ECEA',
    cardBorderHover: 'rgba(15, 169, 104, 0.45)',
    divider: '#E6ECEA',
    iconBadgeBg: '#E6F8F0',
    iconBadgeBorder: 'rgba(15, 169, 104, 0.2)',
    iconColor: '#0FA968',
    ringTrack: '#E6F8F0',
    headerScrolledBg: 'rgba(255, 255, 255, 0.86)',
    headerBorder: '#E6ECEA',
    featuredCardBg: 'rgba(230, 248, 240, 0.45)',
    featuredCardBorder: '#0FA968',
    mapGridLine: '#DFE7E4',
    glowBlurPrimary: 'rgba(15, 169, 104, 0.14)',
    glowBlurSecondary: 'rgba(15, 169, 104, 0.08)',
  },
  shadows: {
    card: '0 10px 28px rgba(15, 169, 104, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04)',
    halo: '0 20px 56px rgba(15, 169, 104, 0.16), 0 4px 16px rgba(15, 23, 42, 0.05)',
    button: '0 8px 22px rgba(15, 169, 104, 0.25)',
    buttonHover: '0 12px 30px rgba(15, 169, 104, 0.38)',
    featuredPulseFrom: '0 10px 30px rgba(15, 169, 104, 0.14), 0 0 0 1px rgba(15, 169, 104, 0.28)',
    featuredPulseTo: '0 16px 44px rgba(15, 169, 104, 0.26), 0 0 0 2px rgba(15, 169, 104, 0.55)',
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '24px',
    full: '9999px',
  },
};

export const darkTokens: ThemeTokens = {
  mode: 'dark',
  colors: {
    background: '#0A0E0F',
    backgroundAlt: '#14191A',
    backgroundElevated: '#1A2022',
    accent: '#C6FF3D',
    accentHover: '#D3FF66',
    onAccent: '#0A0E0F',
    accentSoft: 'rgba(198, 255, 61, 0.12)',
    accentBorder: 'rgba(198, 255, 61, 0.35)',
    textPrimary: '#F5F7F6',
    textSecondary: '#8A9594',
    cardSurface: '#14191A',
    cardSurfaceElevated: '#1A2022',
    cardBorder: 'rgba(255, 255, 255, 0.09)',
    cardBorderHover: 'rgba(198, 255, 61, 0.45)',
    divider: 'rgba(255, 255, 255, 0.08)',
    iconBadgeBg: '#1B2224',
    iconBadgeBorder: 'rgba(255, 255, 255, 0.1)',
    iconColor: '#C6FF3D',
    ringTrack: '#1E2527',
    headerScrolledBg: 'rgba(10, 14, 15, 0.84)',
    headerBorder: 'rgba(255, 255, 255, 0.09)',
    featuredCardBg: '#14191A',
    featuredCardBorder: '#C6FF3D',
    mapGridLine: '#262E30',
    glowBlurPrimary: 'rgba(198, 255, 61, 0.14)',
    glowBlurSecondary: 'rgba(198, 255, 61, 0.07)',
  },
  shadows: {
    card: '0 12px 32px rgba(0, 0, 0, 0.32)',
    halo: '0 0 52px rgba(198, 255, 61, 0.18)',
    button: '0 0 24px rgba(198, 255, 61, 0.32)',
    buttonHover: '0 0 38px rgba(198, 255, 61, 0.55)',
    featuredPulseFrom: '0 0 24px rgba(198, 255, 61, 0.14), 0 0 0 1px rgba(198, 255, 61, 0.38)',
    featuredPulseTo: '0 0 46px rgba(198, 255, 61, 0.3), 0 0 0 2px rgba(198, 255, 61, 0.72)',
  },
  radii: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '24px',
    full: '9999px',
  },
};

export const themeTokensMap: Record<ThemeMode, ThemeTokens> = {
  light: lightTokens,
  dark: darkTokens,
};
