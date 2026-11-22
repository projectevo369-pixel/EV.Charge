import { ArrowLeft } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { AppRoute } from './Navbar';

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalContent {
  title: string;
  updatedAt: string;
  summary: string;
  sections: LegalSection[];
}

const LEGAL_CONTENT: Record<Exclude<AppRoute, '/'>, LegalContent> = {
  '/privacy': {
    title: 'Privacy Policy',
    updatedAt: 'Last updated: 1 November 2026',
    summary:
      'This Privacy Policy explains how ev.charge India Pvt. Ltd. collects, uses, and protects your personal information when you use our mobile app, charging stations, and website.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'When you create an ev.charge account, we collect your name, mobile number, email address, and vehicle connector preferences (CCS2, Type 2, or Bharat DC-001) so we can show compatible fast chargers nearby.',
          'During charging sessions, we record station location, energy delivered (kWh), session duration, and UPI or card transaction references needed to generate GST-compliant receipts.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        body: [
          'We use your location only while searching for nearby charging bays or navigating to a reserved station, and only with your explicit device permission.',
          'Payment details are processed through PCI-DSS and NPCI-compliant payment partners. ev.charge does not store your UPI PIN, full card number, or CVV.',
        ],
      },
      {
        heading: '3. Data Sharing & Retention',
        body: [
          'We never sell your personal data to third-party advertisers. Aggregated, anonymized station utilization data may be used to expand fast-charging coverage along Indian highways.',
          'You may request a copy or deletion of your account data at any time by writing to privacy@evcharge.in.',
        ],
      },
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    updatedAt: 'Last updated: 1 November 2026',
    summary:
      'These Terms of Service govern your access to the ev.charge mobile application, charging network, bay reservations, and monthly energy plans across India.',
    sections: [
      {
        heading: '1. Eligibility & Account Registration',
        body: [
          'You must be at least 18 years old and hold a valid Indian mobile number to register an ev.charge account and initiate paid charging sessions.',
          'You are responsible for maintaining the security of your account credentials and for all charging activity initiated through your registered device.',
        ],
      },
      {
        heading: '2. Bay Reservations & Station Etiquette',
        body: [
          'Priority bay reservations hold a charger for up to 30 minutes prior to arrival. If you do not plug in within the grace window, the bay automatically returns to live availability.',
          'Please unplug and vacate DC fast-charging bays promptly after your session finishes so fellow EV drivers can charge without delay.',
        ],
      },
      {
        heading: '3. Tariffs, UPI Payments & Monthly Plans',
        body: [
          'Per-kWh tariffs, applicable GST, and idle-time policies are displayed upfront in the app before you start charging. Monthly energy packs starting at ₹199 renew automatically unless cancelled prior to the billing date.',
          'ev.charge reserves the right to update station tariffs or plan terms with prior in-app notice.',
        ],
      },
    ],
  },
  '/refund': {
    title: 'Refund Policy',
    updatedAt: 'Last updated: 1 November 2026',
    summary:
      'We aim to make every charging session reliable and transparent. This Refund Policy outlines when charging session charges, bay holds, or monthly plans are eligible for a refund.',
    sections: [
      {
        heading: '1. Failed or Interrupted Charging Sessions',
        body: [
          'If a charging session fails to start after authorization or disconnects due to a charger hardware fault before delivering energy, any pre-authorized UPI or card amount is automatically released or refunded within 3–5 business days.',
          'If a session ends early with partial delivery, you are billed only for the exact kWh delivered to your vehicle.',
        ],
      },
      {
        heading: '2. Monthly Energy Plans',
        body: [
          'Monthly plans (including Lite packs starting at ₹199, Plus, and Pro) can be cancelled anytime in the app to stop the next billing cycle.',
          'Unused monthly kWh allowances do not roll over to the following month. Full refunds on a newly purchased monthly plan are available within 48 hours if zero kWh have been consumed.',
        ],
      },
      {
        heading: '3. How to Request Support',
        body: [
          'For billing disputes or delayed UPI reversals, open the session receipt inside the ev.charge app and tap "Report Billing Issue", or email support@evcharge.in with your session ID.',
        ],
      },
    ],
  },
};

interface LegalPageProps {
  route: Exclude<AppRoute, '/'>;
  onNavigate: (route: AppRoute) => void;
}

export function LegalPage({ route, onNavigate }: LegalPageProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const doc = LEGAL_CONTENT[route];

  return (
    <main
      style={{ backgroundColor: tokens.colors.background }}
      className="theme-transition flex-1 py-12 sm:py-16"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[820px] mx-auto px-5 sm:px-6 flex flex-col gap-8"
      >
        <div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            style={{ color: tokens.colors.accent }}
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </a>
        </div>

        <header
          style={{ borderColor: tokens.colors.divider }}
          className="flex flex-col gap-3 pb-6 border-b"
        >
          <p
            style={{ color: tokens.colors.textSecondary }}
            className="font-mono-tabular text-xs font-medium"
          >
            {doc.updatedAt}
          </p>
          <h1
            style={{ color: tokens.colors.textPrimary }}
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {doc.title}
          </h1>
          <p
            style={{ color: tokens.colors.textSecondary }}
            className="text-base leading-relaxed"
          >
            {doc.summary}
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {doc.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2
                style={{ color: tokens.colors.textPrimary }}
                className="font-display text-xl font-bold tracking-tight"
              >
                {section.heading}
              </h2>
              {section.body.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{ color: tokens.colors.textSecondary }}
                  className="text-sm sm:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div
          style={{
            backgroundColor: tokens.colors.backgroundAlt,
            borderColor: tokens.colors.cardBorder,
          }}
          className="theme-transition mt-4 p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4"
        >
          <span style={{ color: tokens.colors.textSecondary }} className="text-sm">
            Other legal documents:
          </span>
          <div className="flex flex-wrap items-center gap-5">
            {(['/privacy', '/terms', '/refund'] as const)
              .filter((r) => r !== route)
              .map((otherRoute) => (
                <a
                  key={otherRoute}
                  href={otherRoute}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(otherRoute);
                  }}
                  style={{ color: tokens.colors.accent }}
                  className="text-sm font-semibold hover:underline underline-offset-4"
                >
                  {LEGAL_CONTENT[otherRoute].title}
                </a>
              ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
