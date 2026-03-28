import { MetadataRoute } from 'next';
import { META } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = META.siteUrl;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/what-we-do`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/who-we-are`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/get-in-touch`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
