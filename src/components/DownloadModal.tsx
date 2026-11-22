import React, { useEffect, useState } from 'react';
import { CheckCircle2, QrCode, Smartphone, X, Zap } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from '../theme/ThemeProvider';
import { PrimaryActionButton } from './MotionPrimitives';

interface DownloadModalProps {
  open: boolean;
  selectedContext: string | null;
  onClose: () => void;
}

export function DownloadModal({ open, selectedContext, onClose }: DownloadModalProps) {
  const { tokens } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: tokens.colors.cardSurface,
              borderColor: tokens.colors.cardBorder,
              boxShadow: tokens.shadows.halo,
            }}
            className="w-full max-w-md rounded-3xl border p-6 sm:p-7 flex flex-col gap-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  style={{
                    backgroundColor: tokens.colors.iconBadgeBg,
                    borderColor: tokens.colors.accentBorder,
                    color: tokens.colors.accent,
                  }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
                >
                  <Zap className="w-5 h-5 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <h2
                    id="download-modal-title"
                    style={{ color: tokens.colors.textPrimary }}
                    className="font-display text-xl font-bold tracking-tight"
                  >
                    Get the ev.charge App
                  </h2>
                  <p style={{ color: tokens.colors.textSecondary }} className="text-xs mt-0.5">
                    {selectedContext
                      ? `Selected: ${selectedContext}`
                      : 'Available on Android & iOS across India'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close download modal"
                style={{
                  backgroundColor: tokens.colors.cardSurfaceElevated,
                  borderColor: tokens.colors.cardBorder,
                  color: tokens.colors.textSecondary,
                }}
                className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* QR Scan Box */}
            <div
              style={{
                backgroundColor: tokens.colors.backgroundAlt,
                borderColor: tokens.colors.cardBorder,
              }}
              className="p-4 rounded-2xl border flex items-center gap-4"
            >
              <div
                style={{
                  backgroundColor: tokens.colors.cardSurface,
                  borderColor: tokens.colors.cardBorder,
                  color: tokens.colors.textPrimary,
                }}
                className="w-16 h-16 rounded-xl border flex items-center justify-center shrink-0"
              >
                <QrCode className="w-10 h-10" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <p
                  style={{ color: tokens.colors.textPrimary }}
                  className="text-sm font-semibold"
                >
                  Scan with your phone camera
                </p>
                <p style={{ color: tokens.colors.textSecondary }} className="text-xs leading-relaxed">
                  Instantly opens Google Play or App Store to start charging with UPI.
                </p>
              </div>
            </div>

            {submitted ? (
              <div
                style={{
                  backgroundColor: tokens.colors.accentSoft,
                  borderColor: tokens.colors.accentBorder,
                }}
                className="p-4 rounded-2xl border flex items-start gap-3"
              >
                <CheckCircle2
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: tokens.colors.accent }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p
                    style={{ color: tokens.colors.textPrimary }}
                    className="text-sm font-semibold"
                  >
                    App link sent to +91 {phone.replace(/\D/g, '')}
                  </p>
                  <p style={{ color: tokens.colors.textSecondary }} className="text-xs">
                    Check your SMS inbox to install ev.charge and unlock monthly plans starting at
                    ₹199.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                <label
                  htmlFor="ev-phone-input"
                  style={{ color: tokens.colors.textPrimary }}
                  className="text-xs font-semibold"
                >
                  Or get an SMS download link
                </label>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      backgroundColor: tokens.colors.backgroundAlt,
                      borderColor: error ? '#EF4444' : tokens.colors.cardBorder,
                      color: tokens.colors.textPrimary,
                    }}
                    className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border"
                  >
                    <Smartphone
                      className="w-4 h-4 shrink-0"
                      style={{ color: tokens.colors.textSecondary }}
                      aria-hidden="true"
                    />
                    <span
                      style={{ color: tokens.colors.textSecondary }}
                      className="font-mono-tabular text-sm select-none"
                    >
                      +91
                    </span>
                    <input
                      id="ev-phone-input"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (error) setError('');
                      }}
                      style={{ color: tokens.colors.textPrimary }}
                      className="w-full bg-transparent text-sm font-mono-tabular focus:outline-none"
                    />
                  </div>
                  <PrimaryActionButton type="submit" className="px-5 py-2.5">
                    Send Link
                  </PrimaryActionButton>
                </div>
                {error && (
                  <p className="text-xs font-medium text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
