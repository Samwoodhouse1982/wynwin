import type { Metadata } from 'next';

// Every page under /client is a hidden client area: reachable only by direct
// link, never indexed. This layout applies to all of them, so a new client
// folder is hidden from search without having to remember to say so.
//
// Don't add /client routes to sitemap.ts, and don't list them in robots.ts
// either, since a Disallow line would publish the path.
//
// The root layout's description and social-preview tags are Wynwin's own, so
// they are replaced here. A client forwarding the link would otherwise show a
// Wynwin card in Slack or email.
export const metadata: Metadata = {
  description: 'Private page.',
  robots: { index: false, follow: false },
  openGraph: { title: 'Private page', description: 'Private page.', siteName: '' },
  twitter: { card: 'summary', title: 'Private page', description: 'Private page.' },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return children;
}
