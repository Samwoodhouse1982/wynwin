import type { Metadata } from 'next';

// Hidden client area. Reachable only by direct link: the unguessable folder
// name is the whole access control, so don't add this route to sitemap.ts, and
// don't add it to robots.ts either, since a Disallow line would publish the
// path. noindex keeps it out of search if the link ever leaks.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return children;
}
