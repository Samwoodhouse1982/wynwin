// ── Analytics events ────────────────────────────────────────
// Mirrors recordEnquiry in components/ContactForm.tsx, for events that are not
// enquiries. Vercel's track() is a no-op unless the Analytics component is
// mounted, and gtag only exists once analytics consent has been given, so both
// calls respect the cookie banner without needing to check it.
//
// Window.gtag is declared globally in components/ContactForm.tsx.
import { track } from '@vercel/analytics';

export function trackEvent(name: string, detail?: Record<string, string>) {
  try {
    track(name, detail);
    window.gtag?.('event', name, detail);
  } catch {
    // Measurement must never break the thing being measured.
  }
}
