import { getCities } from '@/utils/data-utils';
import { MetadataRoute } from 'next';

// Add the required dynamic configuration for static export
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  // Using the actual live domain
  const baseUrl = 'https://www.hairrestoration.life';
  const cities = getCities();
  
  // Base routes
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Add city routes
  const cityRoutes = cities.map(city => ({
    url: `${baseUrl}/${city.urlSlug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  return [...routes, ...cityRoutes];
} 