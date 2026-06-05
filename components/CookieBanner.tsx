'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const CONSENT_KEY = 'wynwin_cookie_consent';
const GA_ID = 'G-BNH3Q60D6T';

export default function CookieBanner() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      setConsent('accepted');
    } else if (stored === 'declined') {
      setConsent('declined');
    } else {
      setVisible(true);
    }
  }, []);

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
      {/* Load GA only after explicit consent */}
      {consent === 'accepted' && (
        <>
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

      {/* Consent banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
              We use analytics cookies to understand how visitors use this site. See our{' '}
              <Link href="/cookies" className="text-pink hover:underline">
                Cookie Policy
              </Link>{' '}
              for details. You can change your preference at any time.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="px-5 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-colors duration-200"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-sm font-semibold bg-pink text-white rounded-full hover:bg-pink-dark transition-colors duration-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
