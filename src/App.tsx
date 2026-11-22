import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AppRoute, Navbar } from './components/Navbar';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';

const AppShowcaseSection = lazy(() =>
  import('./components/AppShowcaseSection').then((m) => ({ default: m.AppShowcaseSection }))
);
const PricingSection = lazy(() =>
  import('./components/PricingSection').then((m) => ({ default: m.PricingSection }))
);
const StatsSection = lazy(() =>
  import('./components/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const LegalPage = lazy(() =>
  import('./components/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const DownloadModal = lazy(() =>
  import('./components/DownloadModal').then((m) => ({ default: m.DownloadModal }))
);

function parseRouteFromLocation(): AppRoute {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  if (path === '/privacy' || path === '/terms' || path === '/refund') {
    return path;
  }
  return '/';
}

const ROUTE_TITLES: Record<AppRoute, string> = {
  '/': 'ev.charge — Effortless EV Charging Across India',
  '/privacy': 'Privacy Policy — ev.charge',
  '/terms': 'Terms of Service — ev.charge',
  '/refund': 'Refund Policy — ev.charge',
};

function AppShell() {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [route, setRoute] = useState<AppRoute>(parseRouteFromLocation);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadContext, setDownloadContext] = useState<string | null>(null);

  useEffect(() => {
    document.title = ROUTE_TITLES[route];
  }, [route]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToSection = useCallback(
    (hash: string) => {
      const behavior: ScrollBehavior = shouldReduceMotion ? 'auto' : 'smooth';
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' });
        } else if (attempts < 10) {
          window.setTimeout(() => tryScroll(attempts + 1), 60);
        }
      };
      tryScroll();
    },
    [shouldReduceMotion]
  );

  const handleNavigate = useCallback(
    (nextRoute: AppRoute, hash?: string) => {
      const targetUrl = hash ? `${nextRoute === '/' ? '' : nextRoute}/#${hash}` : nextRoute;
      if (window.location.pathname !== nextRoute) {
        window.history.pushState({}, '', targetUrl);
        setRoute(nextRoute);
      } else if (hash) {
        window.history.replaceState({}, '', `/#${hash}`);
      }

      if (hash) {
        window.setTimeout(() => scrollToSection(hash), 40);
      } else {
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
    },
    [scrollToSection, shouldReduceMotion]
  );

  const handleOpenDownload = useCallback((context?: string) => {
    setDownloadContext(context ?? null);
    setDownloadOpen(true);
  }, []);

  return (
    <div
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.textPrimary,
      }}
      className="theme-transition min-h-screen flex flex-col overflow-x-hidden"
    >
      <Navbar
        currentRoute={route}
        onNavigate={handleNavigate}
        onOpenDownload={handleOpenDownload}
      />

      {route === '/' ? (
        <main className="flex-1">
          <HeroSection
            onOpenDownload={() => handleOpenDownload()}
            onSeePlans={() => handleNavigate('/', 'plans')}
          />
          <FeaturesSection />
          <HowItWorksSection />
          <Suspense fallback={null}>
            <AppShowcaseSection />
            <PricingSection onSelectPlan={(plan) => handleOpenDownload(`${plan} Plan`)} />
            <StatsSection />
          </Suspense>
        </main>
      ) : (
        <Suspense
          fallback={
            <main className="flex-1 py-20 max-w-[820px] mx-auto px-6">
              <div className="h-8 w-48 rounded-lg animate-pulse opacity-20 bg-current" />
            </main>
          }
        >
          <LegalPage route={route} onNavigate={handleNavigate} />
        </Suspense>
      )}

      <Footer
        onNavigate={handleNavigate}
        onOpenDownload={(platform) => handleOpenDownload(platform)}
      />

      <Suspense fallback={null}>
        <DownloadModal
          open={downloadOpen}
          selectedContext={downloadContext}
          onClose={() => setDownloadOpen(false)}
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
