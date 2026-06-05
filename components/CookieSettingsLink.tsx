'use client';

// Re-opens the cookie consent banner (CookieBanner listens for this event),
// so visitors can change their preference at any time.
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('wynwin:open-cookie-settings'))}
      className={className}
    >
      Cookie Settings
    </button>
  );
}
