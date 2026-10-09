import type { Metadata } from 'next';

// Hidden client area. Reachable only by direct link: the unguessable folder
// name is the whole access control, so don't add this route to sitemap.ts, and
// don't add it to robots.ts either, since a Disallow line would publish the
// path. noindex keeps it out of search if the link ever leaks.
//
// The root layout's description and social-preview tags are Wynwin's own, so
// they are replaced here. A client forwarding the link would otherwise show a
// Wynwin card in Slack or email.
export const metadata: Metadata = {
  description: 'Private preview.',
  robots: { index: false, follow: false },
  openGraph: { title: 'Client preview', description: 'Private preview.', siteName: '' },
  twitter: { card: 'summary', title: 'Client preview', description: 'Private preview.' },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return children;
}
