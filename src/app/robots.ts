import { MetadataRoute } from 'next';

// Add the required dynamic configuration for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://hair-transplant-directory.vercel.app/sitemap.xml', // Updated with actual domain
  };
} 