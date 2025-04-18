'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  getBusinessesByCity, 
  getCityBySlug, 
  getTopCategories,
  type Business,
  type City
} from '../../utils/data-utils';
import BusinessCard from '../../components/BusinessCard';

export default function CityPage({ 
  params 
}: { 
  params: { city: string } 
}) {
  const { city: citySlug } = params;
  
  const [cityInfo, setCityInfo] = useState<City | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (citySlug) {
      const cityData = getCityBySlug(citySlug);
      const businessData = getBusinessesByCity(citySlug);
      
      setCityInfo(cityData);
      setBusinesses(businessData);
      setLoading(false);
    }
  }, [citySlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!cityInfo) {
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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Top Hair Transplant in Los Angeles
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Find and compare the best hair transplant and restoration clinics in {cityInfo.name}, Los Angeles.
          Browse our comprehensive list of clinics ranked by customer reviews and ratings.
        </p>
      </section>
      
      {/* All Businesses Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Hair Transplant Clinics in {cityInfo.name}
        </h2>
        
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business, index) => (
              <BusinessCard key={index} business={business} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No hair transplant clinics found in {cityInfo.name}, Los Angeles. Please check back later or explore other areas of Los Angeles.
          </p>
        )}
      </section>
      
      {/* Information Section */}
      <section className="bg-gray-100 rounded-xl p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hair Transplant in {cityInfo.name}, Los Angeles: What to Know
          </h2>
          <p className="text-gray-700 mb-4">
            {cityInfo.name} is one of the best neighborhoods in Los Angeles for hair transplant specialists. 
            When choosing a clinic, consider factors like the surgeon's experience, the technique they use, 
            cost, and patient reviews.
          </p>
          <p className="text-gray-700 mb-4">
            Our directory helps you find and compare the top-rated hair transplant clinics in {cityInfo.name} 
            based on real patient experiences and reviews.
          </p>
        </div>
      </section>
    </div>
  );
} 