import React from 'react';
import Link from 'next/link';
import { getCities, getBusinessesByCity, getWebsiteByTitle } from '@/utils/data-utils';
import FAQ from '@/components/FAQ';
import Image from 'next/image';
import BusinessCard from '../components/BusinessCard';
import clinicImages from '@/data/clinic-images.json';

export default function Home() {
  const cities = getCities();
  
  // Get all businesses from all cities and sort by rating
  const allBusinesses = cities.flatMap(city => getBusinessesByCity(city.urlSlug));
  
  console.log(`Total businesses: ${allBusinesses.length}`);
  console.log(`New clinics added: ${allBusinesses.filter(b => 
    b.title === "Beverly Hills Hair Restoration Elite" || 
    b.title === "Malibu Advanced Hair Institute").length}`);
  
  // Filter clinics that exclusively do Hair Transplant and don't have specific keywords in title
  const excludedTerms = ['Wig', 'Salon', 'Scalp Micropigmentation', 'SMP'];
  
  const hairTransplantOnlyClinics = allBusinesses.filter(business => {
    // Check that business has only "Hair Transplant" category
    const hasOnlyHairTransplant = business.categories?.length === 1 && 
                                 business.categories[0] === "Hair Transplant";
    
    // Check that business title doesn't contain any excluded terms
    const titleLower = business.title.toLowerCase();
    const containsExcludedTerm = excludedTerms.some(term => 
      titleLower.includes(term.toLowerCase())
    );
    
    return hasOnlyHairTransplant && !containsExcludedTerm;
  });
  
  console.log(`Clinics specializing exclusively in Hair Transplant (filtered): ${hairTransplantOnlyClinics.length}`);
  
  // Sort by rating and review count (using a weighted score) with bonus for having images
  const topRatedClinics = [...hairTransplantOnlyClinics]
    .sort((a, b) => {
      // Calculate a score based on rating and review count
      // This gives higher weight to clinics with more reviews
      const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
      const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
      
      // Give bonus points to clinics with images (add 5 points to their score)
      const hasImageA = (clinicImages as Record<string, any>)[a.title]?.photo ? 5 : 0;
      const hasImageB = (clinicImages as Record<string, any>)[b.title]?.photo ? 5 : 0;
      
      const finalScoreA = scoreA + hasImageA;
      const finalScoreB = scoreB + hasImageB;
      
      return finalScoreB - finalScoreA;
    })
    .slice(0, 12);
  
  console.log(`Top rated clinics count: ${topRatedClinics.length}`);
  console.log(`Top clinic names: ${topRatedClinics.map(c => c.title).join(', ').substring(0, 100)}...`);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Banner */}
      <section className="relative mb-8 md:mb-12 overflow-hidden rounded-lg h-[250px] md:h-[300px]">
        {/* Banner Background */}
        <div className="absolute inset-0 bg-gray-700">
          <div className="absolute inset-0 opacity-60">
            <Image 
              src="/images/hair-transplant-banner.png" 
              alt="Hair transplant banner" 
              fill 
              unoptimized
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
        {/* Banner Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 md:px-6 text-center z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4" style={{textShadow: "0 3px 5px rgba(0,0,0,0.9)"}}>
            Top Hair Transplant in Los Angeles
          </h1>
          <p className="text-base md:text-xl text-white mb-4 md:mb-6 max-w-3xl mx-auto" style={{textShadow: "0 2px 4px rgba(0,0,0,0.9)"}}>
            Find and compare the best hair transplant and restoration clinics in Los Angeles.
            Browse our comprehensive list of clinics ranked by customer reviews and ratings.
          </p>
        </div>
      </section>
      
      {/* Top Rated Clinics Section */}
      <section className="mb-10 md:mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-8">Top Hair Transplant Clinics Near You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {topRatedClinics.map((clinic, index) => (
            <div key={index} className="mb-4 md:mb-8">
              <BusinessCard business={clinic} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Cities Section */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Browse by LA Neighborhoods
        </h2>
        
        {cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {cities.map((city, index) => (
              <Link 
                key={index} 
                href={`/${city.urlSlug}`}
                className="bg-white shadow rounded-lg p-3 md:p-4 hover:shadow-md transition flex items-center justify-center"
              >
                <span className="text-base md:text-lg font-medium text-gray-700">{city.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No neighborhoods found. Please check back later.
          </p>
        )}
      </section>
      
      {/* Information Section */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Hair Transplant Procedures</h2>
          <p className="text-gray-700 mb-4">
            Hair transplantation is a surgical technique that moves hair follicles from a part of the body called the 'donor site' to a bald or balding part of the body known as the 'recipient site'. It is primarily used to treat male pattern baldness.
          </p>
          <p className="text-gray-700 mb-4">
            Finding the right hair transplant clinic is crucial for successful results. Visit our About page to learn more about our directory and how we can help you find the best clinic for your needs.
          </p>
          <div className="mt-6">
            <Link 
              href="/about" 
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* LA Highlights Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Why Choose Los Angeles for Hair Transplant
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Top Specialists</h3>
            <p className="text-gray-600">
              Los Angeles is home to some of the world's leading hair transplant specialists and surgeons with decades of experience.
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Techniques</h3>
            <p className="text-gray-600">
              LA clinics often offer the latest cutting-edge hair restoration technologies and techniques not available elsewhere.
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Celebrity Approved</h3>
            <p className="text-gray-600">
              Many celebrities choose Los Angeles for their hair transplants, thanks to the discretion and quality offered by local clinics.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
