import { MetadataRoute } from 'next';

// Add the required dynamic configuration for static export
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // IMPORTANT: Replace this URL with your actual deployed URL from Vercel
    sitemap: 'https://hair-transplant-directory.vercel.app/sitemap.xml',
  };
} 