import type { Metadata } from 'next';
// ── OPTION A (active): Unbounded + Instrument Sans ───────────────────────────
import { Instrument_Sans, Unbounded } from 'next/font/google';
// ── OPTION B: Bricolage Grotesque + Instrument Sans ───────────────────────────
// import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
// ── ORIGINAL: Unbounded + Plus Jakarta Sans ──────────────────────────────────
// import { Plus_Jakarta_Sans, Unbounded } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { META } from '@/lib/constants';

// ── OPTION A ─────────────────────────────────────────────────────────────────
const display = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-syne',
  display: 'swap',
});

const body = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

// ── OPTION B (uncomment + comment out above to try) ───────────────────────────
// const display = Bricolage_Grotesque({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
//   variable: '--font-syne',
//   display: 'swap',
// });
// const body = Instrument_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-jakarta',
//   display: 'swap',
// });

// ── ORIGINAL (uncomment + comment out above to revert) ───────────────────────
// const body = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800'],
//   variable: '--font-jakarta',
//   display: 'swap',
// });
// const display = Unbounded({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800', '900'],
//   variable: '--font-syne',
//   display: 'swap',
// });

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
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'WYN WIN: Services for Busy People' }],
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
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-BNH3Q60D6T" />
    </html>
  );
}
