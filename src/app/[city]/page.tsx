import React from 'react';
import Link from 'next/link';
import { 
  getBusinessesByCity, 
  getCityBySlug,
  getAllCitySlugs
} from '../../utils/data-utils';
import BusinessCard from '../../components/BusinessCard';

interface CityPageProps {
  params: {
    city: string
  }
}

// Generate all possible city pages at build time
export function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  return citySlugs.map(city => ({
    city: city
  }));
}

export default function CityPage({ params }: CityPageProps) {
  const citySlug = params.city;
  const cityData = getCityBySlug(citySlug);
  const businessData = getBusinessesByCity(citySlug);
  
  if (!cityData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">City Not Found</h1>
        <p className="text-gray-600 mb-8">The city you're looking for does not exist in our directory.</p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Hero Section */}
      <section className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
          Top Hair Transplant in Los Angeles
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-3xl">
          Find and compare the best hair transplant and restoration clinics in {cityData.name}, Los Angeles.
          Browse our comprehensive list of clinics ranked by customer reviews and ratings.
        </p>
      </section>
      
      {/* All Businesses Section */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
          All Hair Transplant Clinics in {cityData.name}
        </h2>
        
        {businessData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {businessData.map((business, index) => (
              <BusinessCard key={index} business={business} />
            ))}
          </div>
        ) : (
          <p className="text-sm md:text-base text-gray-600">
            No hair transplant clinics found in {cityData.name}, Los Angeles. Please check back later or explore other areas of Los Angeles.
          </p>
        )}
      </section>
      
      {/* Information Section */}
      <section className="bg-gray-100 rounded-xl p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
            Hair Transplant in {cityData.name}, Los Angeles: What to Know
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
            {cityData.name} is one of the best neighborhoods in Los Angeles for hair transplant specialists. 
            When choosing a clinic, consider factors like the surgeon's experience, the technique they use, 
            cost, and patient reviews.
          </p>
          <p className="text-sm md:text-base text-gray-700">
            Our directory helps you find and compare the top-rated hair transplant clinics in {cityData.name} 
            based on real patient experiences and reviews.
          </p>
        </div>
      </section>
    </div>
  );
} 