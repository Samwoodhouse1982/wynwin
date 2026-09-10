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
  },
  twitter: {
    card: 'summary_large_image',
    title: META.home.title,
    description: META.home.description,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
