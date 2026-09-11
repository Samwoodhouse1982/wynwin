'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import {
  ENTRANCE_DONE_EVENT,
  ENTRANCE_TOTAL_MS,
  entranceWillPlay,
} from '@/lib/entrance';

const CONSENT_KEY = 'wynwin_cookie_consent';
const GA_ID = 'G-BNH3Q60D6T';

export default function CookieBanner() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [visible, setVisible] = useState(false);
  // On a first visit the entrance stage sits at z-100 and the banner at z-50,
  // so the banner used to appear in a single frame the moment the stage
  // unmounted — landing right on top of the door reveal.
  const [waitingForEntrance, setWaitingForEntrance] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      setConsent('accepted');
    } else if (stored === 'declined') {
      setConsent('declined');
    } else if (entranceWillPlay()) {
      setWaitingForEntrance(true);
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!waitingForEntrance) return;
    const reveal = () => {
      setWaitingForEntrance(false);
      setVisible(true);
    };
    window.addEventListener(ENTRANCE_DONE_EVENT, reveal);
    // Fall back in case the entrance never reports completion, so consent is
    // never withheld from someone who needs to give or refuse it.
    const fallback = setTimeout(reveal, ENTRANCE_TOTAL_MS + 2500);
    return () => {
      window.removeEventListener(ENTRANCE_DONE_EVENT, reveal);
      clearTimeout(fallback);
    };
  }, [waitingForEntrance]);

  // Allow re-opening the banner from a "Cookie Settings" control elsewhere.
  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener('wynwin:open-cookie-settings', reopen);
    return () => window.removeEventListener('wynwin:open-cookie-settings', reopen);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setConsent('declined');
    setVisible(false);
  };

  return (
    <>
      {/* Load analytics only after explicit consent. Vercel Web Analytics is
          cookieless, but the Cookie Policy tells visitors analytics runs only
          with consent, so it is gated here too and the page keeps its promise. */}
      {consent === 'accepted' && (
        <>
          <Analytics />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Consent banner. Slides up rather than appearing in one frame, and on a
          phone it is one short line plus two 44px buttons instead of a block
          that covered the lower third of the hero. */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                We use analytics cookies to see how the site is used.{' '}
                <Link href="/cookies" className="text-pink hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={decline}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center min-h-11 px-5 text-sm font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-full active:scale-[0.97] transition-all duration-200"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center min-h-11 px-5 text-sm font-semibold bg-pink text-white rounded-full hover:bg-pink-dark active:scale-[0.97] transition-all duration-200"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
