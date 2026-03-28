import { MetadataRoute } from 'next';
import { META } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${META.siteUrl}/sitemap.xml`,
  };
}
