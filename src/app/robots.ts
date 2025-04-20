import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://hair-transplant-directory.vercel.app/sitemap.xml', // Updated with actual domain
  };
} 