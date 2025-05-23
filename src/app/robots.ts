import { MetadataRoute } from 'next';

// Add the required dynamic configuration for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Using the actual live domain
    sitemap: 'https://www.hairrestoration.life/sitemap.xml/',
  };
} 