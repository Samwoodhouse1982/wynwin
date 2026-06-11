import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Unbounded } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import CookieBanner from '@/components/CookieBanner';
import { META } from '@/lib/constants';

// Unbounded — display / headings
const display = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
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
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'WYN WIN — Services for busy people.' }],
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: META.home.title,
    description: META.home.description,
    images: ['/opengraph-image'],
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
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
