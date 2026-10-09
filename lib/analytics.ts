// ── Analytics events ────────────────────────────────────────
// The one place analytics events are sent from. Vercel's track() is a no-op
// unless the Analytics component is mounted, and gtag only exists once
// analytics consent has been given, so both calls respect the cookie banner
// without needing to check it. Both are wrapped, because measurement must
// never break the thing being measured.
import { track } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Send one event to both analytics destinations.
 *
 * `gtagName` defaults to `name` and exists for the cases where GA4 has a
 * standard event name worth using — an enquiry is 'enquiry' in Vercel but
 * 'generate_lead' in GA4, which is what its conversion reporting expects.
 */
export function trackEvent(
  name: string,
  detail?: Record<string, string>,
  gtagName: string = name,
) {
  try {
    track(name, detail);
    window.gtag?.('event', gtagName, detail);
  } catch {
    // Measurement must never break the thing being measured.
  }
}
