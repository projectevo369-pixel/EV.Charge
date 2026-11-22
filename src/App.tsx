import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';

const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const RefundPage = lazy(() =>
  import('./pages/RefundPage').then((m) => ({ default: m.RefundPage }))
);
const DownloadModal = lazy(() =>
  import('./components/DownloadModal').then((m) => ({ default: m.DownloadModal }))
);

function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

function AppShell() {
  const { tokens } = useTheme();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadContext, setDownloadContext] = useState<string | null>(null);

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
      <ScrollToTopOnRouteChange />
      <Navbar onOpenDownload={handleOpenDownload} />

      <Suspense
        fallback={
          <main className="flex-1 py-20 max-w-[1200px] mx-auto px-6">
            <div className="h-8 w-48 rounded-lg animate-pulse opacity-20 bg-current" />
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage onOpenDownload={handleOpenDownload} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <Footer onOpenDownload={(platform) => handleOpenDownload(platform)} />

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
