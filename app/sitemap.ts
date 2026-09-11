import { MetadataRoute } from 'next';
import { META } from '@/lib/constants';

// lastModified is deliberately omitted. It used to be stamped with the build
// time on every route, so each deploy told crawlers the whole site had changed.
// That churn signal makes the field worth less than no field at all. Add real
// per-route dates if page-level edits ever get tracked.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = META.siteUrl;

  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/what-we-do`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/who-we-are`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/get-in-touch`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
