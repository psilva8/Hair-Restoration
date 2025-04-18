import React from 'react';
import Link from 'next/link';
import { getCities } from '@/utils/data-utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Los Angeles Neighborhoods | Top Hair Transplant in Los Angeles',
  description: 'Browse hair transplant clinics by Los Angeles neighborhood. Find the best clinics in Beverly Hills, Hollywood, Santa Monica and more.',
};

export default function NeighborhoodsPage() {
  const cities = getCities();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Los Angeles Neighborhoods
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Browse hair transplant clinics by neighborhood in Los Angeles.
          Find the best specialists in your preferred area.
        </p>
      </section>
      
      {/* Neighborhoods Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Los Angeles Neighborhoods
        </h2>
        
        {cities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <Link 
                key={index} 
                href={`/${city.urlSlug}`}
                className="bg-white shadow rounded-lg p-4 hover:shadow-md transition flex items-center justify-center"
              >
                <span className="text-lg font-medium text-gray-700">{city.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No neighborhoods found. Please check back later.
          </p>
        )}
      </section>
      
      {/* Info Section */}
      <section className="bg-gray-100 rounded-xl p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Finding Hair Transplant Clinics in Los Angeles
          </h2>
          <p className="text-gray-700 mb-4">
            Los Angeles is home to some of the world's best hair transplant specialists,
            with different neighborhoods offering unique advantages. Beverly Hills is known for its
            luxury clinics and celebrity doctors, while areas like Santa Monica and Burbank offer
            more affordable options with excellent quality.
          </p>
          <p className="text-gray-700">
            Browse our neighborhood listings to find hair transplant clinics closest to you or
            in your preferred area of Los Angeles.
          </p>
        </div>
      </section>
    </div>
  );
} 