import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Permanent_Marker } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PreFooterCta from '@/components/PreFooterCta';
import { META } from '@/lib/constants';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-syne',
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
    siteName: META.siteName,
    type: 'website',
    locale: 'en_GB',
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
    <html lang="en-GB" className={`${jakarta.variable} ${permanentMarker.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <PreFooterCta />
        <Footer />
      </body>
    </html>
  );
}
