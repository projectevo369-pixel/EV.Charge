import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { FeaturesSection } from '../components/FeaturesSection';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { SeoHead } from '../components/SeoHead';

const AppShowcaseSection = lazy(() =>
  import('../components/AppShowcaseSection').then((m) => ({ default: m.AppShowcaseSection }))
);
const PricingSection = lazy(() =>
  import('../components/PricingSection').then((m) => ({ default: m.PricingSection }))
);
const StatsSection = lazy(() =>
  import('../components/StatsSection').then((m) => ({ default: m.StatsSection }))
);

interface HomePageProps {
  onOpenDownload: (context?: string) => void;
}

export function HomePage({ onOpenDownload }: HomePageProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      } else if (attempts < 10) {
        attempts += 1;
        window.setTimeout(tryScroll, 60);
      }
    };
    tryScroll();
  }, [location.hash, shouldReduceMotion]);

  const handleSeePlans = () => {
    const el = document.getElementById('plans');
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="flex-1">
      <SeoHead
        title="ev.charge — Effortless EV Charging Across India"
        description="Locate live DC fast chargers across India, check real-time availability, pay with UPI, and save with monthly plans starting at ₹199."
      />
      <HeroSection onOpenDownload={() => onOpenDownload()} onSeePlans={handleSeePlans} />
      <FeaturesSection />
      <HowItWorksSection />
      <Suspense fallback={null}>
        <AppShowcaseSection />
        <PricingSection onSelectPlan={(plan) => onOpenDownload(`${plan} Plan`)} />
        <StatsSection />
      </Suspense>
    </main>
  );
}
