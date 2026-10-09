'use client';

import { usePathname } from 'next/navigation';

// Routes under these prefixes render bare, with no Wynwin nav, footer or cookie
// banner. Used for the hidden client previews that mimic the client's own site.
const BARE_PREFIXES = ['/client/'];

interface SiteShellProps {
  nav: React.ReactNode;
  footer: React.ReactNode;
  banner: React.ReactNode;
  children: React.ReactNode;
}

// nav, footer and banner come in as props so they stay server-rendered where
// they can; only the pathname check needs the client.
export default function SiteShell({ nav, footer, banner, children }: SiteShellProps) {
  const pathname = usePathname();

  if (BARE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return <>{children}</>;
  }

  return (
    <>
      {nav}
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      {footer}
      {banner}
    </>
  );
}
