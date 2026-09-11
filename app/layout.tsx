import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Unbounded } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import CookieBanner from '@/components/CookieBanner';
import { META } from '@/lib/constants';

// Unbounded — display / headings. Only bold is ever used (h1, h2 and the
// 01–05 numerals all set font-bold), so the other five weights were five font
// files downloaded for nothing.
const display = Unbounded({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-unbounded',
  display: 'swap',
});

// Instrument Sans — body
const body = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: META.home.title,
    template: '%s | WYN WIN',
  },
  description: META.home.description,
  metadataBase: new URL(META.siteUrl),
  openGraph: {
    title: META.home.title,
    description: META.home.description,
    url: META.siteUrl,
    siteName: META.siteName,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.home.title,
    description: META.home.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0D1B3E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Nav />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
          {/* CookieBanner also loads the analytics scripts, but only after
              explicit consent — see components/CookieBanner.tsx. */}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
