import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';
import { META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.home.title,
  description: META.home.description,
  openGraph: {
    title: META.home.title,
    description: META.home.description,
    url: META.siteUrl,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.home.title,
    description: META.home.description,
    images: ['/opengraph-image'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
