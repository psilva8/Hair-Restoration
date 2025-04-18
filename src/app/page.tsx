import React from 'react';
import Link from 'next/link';
import { getCities, getBusinessesByCity, getWebsiteByTitle } from '@/utils/data-utils';
import FAQ from '@/components/FAQ';
import Image from 'next/image';

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
  
  // Sort by rating and review count (using a weighted score)
  const topRatedClinics = [...hairTransplantOnlyClinics]
    .sort((a, b) => {
      // Calculate a score based on rating and review count
      // This gives higher weight to clinics with more reviews
      const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
      const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
      return scoreB - scoreA;
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
          {topRatedClinics.map((clinic, index) => {
            // Get website URL from the website map instead of directly from clinic object
            let websiteUrl = getWebsiteByTitle(clinic.title) || clinic.website || '#';
            let relAttribute = websiteUrl === '#' ? 'nofollow' : 'noopener noreferrer';
            
            return (
              <div key={index} className="mb-4 md:mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{clinic.title}</h3>
                    <div className="flex items-center mb-2">
                      <div className="text-yellow-500 font-medium mr-2">{clinic.rating?.toFixed(1) || 'N/A'} ★</div>
                      <div className="text-sm text-gray-600">
                        ({clinic.reviewsCount} reviews)
                      </div>
                    </div>
                    
                    {/* Address and Contact Information - Enhanced */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-md">
                      {clinic.address && (
                        <div className="flex items-start mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Address:</p>
                            <p className="text-sm text-gray-600">
                              {clinic.address}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {clinic.phone && (
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Phone:</p>
                            <p className="text-sm text-gray-600">
                              {clinic.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-gray-600 mt-3 mb-3">
                      <span className="font-semibold">City:</span> {clinic.city}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <a 
                        href={websiteUrl} 
                        target="_blank" 
                        rel={relAttribute} 
                        className={`inline-flex items-center py-2 px-3 rounded text-sm font-medium w-full md:w-auto justify-center ${
                          websiteUrl === "#" 
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {websiteUrl === "#" ? "No Website Available" : "Visit Website"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
