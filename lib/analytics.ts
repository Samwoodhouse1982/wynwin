// ── Analytics events ────────────────────────────────────────
// Thin wrapper over the Google Analytics tag the site already uses.
// CookieBanner only injects the gtag script once the visitor has
// accepted analytics cookies, so `window.gtag` is undefined without
// consent and every call here is a no-op. No new tracking tools.

type GtagFn = (
  command: 'event',
  action: string,
  params?: Record<string, string>,
) => void;

export function trackEvent(action: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const { gtag } = window as unknown as { gtag?: GtagFn };
  if (typeof gtag === 'function') gtag('event', action, params);
}
