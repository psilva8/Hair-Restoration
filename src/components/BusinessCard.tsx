import React from 'react';
import { Business, getWebsiteByTitle } from '@/utils/data-utils';
import { StarIcon } from '@heroicons/react/20/solid';
import { LinkIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const { title, address, phone, rating, reviewsCount, categories } = business;
  
  // Display only first 3 categories, with "+" indicator for more
  const displayCategories = categories?.slice(0, 3) || [];
  const hasMoreCategories = categories && categories.length > 3;
  
  // Set website URL and rel attributes, checking website map first
  let websiteUrl = getWebsiteByTitle(title) || business.website || '#';
  let relAttribute = websiteUrl === '#' ? 'nofollow' : 'noopener noreferrer';
  
  return (
    <div className="border border-gray-200 rounded-lg p-2.5 sm:p-3 md:p-4 hover:shadow-md transition-shadow">
      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
      
      {/* Rating display */}
      {rating && (
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-400" />
            <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          </div>
          {reviewsCount && (
            <span className="ml-1.5 sm:ml-2 text-xs text-gray-500">({reviewsCount} reviews)</span>
          )}
        </div>
      )}
      
      {/* Address Section - Enhanced for prominence */}
      <div className="mt-2 md:mt-3 p-1.5 sm:p-2 bg-gray-50 rounded-md">
        <div className="flex items-start">
          <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-500 mt-0.5 mr-1.5 sm:mr-2 flex-shrink-0" />
          <div>
            <p className="text-2xs sm:text-xs md:text-sm font-medium text-gray-700">Address:</p>
            <p className="text-2xs sm:text-xs md:text-sm text-gray-600">{address}</p>
          </div>
        </div>
      
        {/* Phone */}
        {phone && (
          <div className="mt-1.5 sm:mt-2 flex items-center">
            <PhoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-500 mr-1.5 sm:mr-2 flex-shrink-0" />
            <div>
              <p className="text-2xs sm:text-xs md:text-sm font-medium text-gray-700">Phone:</p>
              <p className="text-2xs sm:text-xs md:text-sm text-gray-600">{phone}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Categories */}
      {displayCategories.length > 0 && (
        <div className="mt-1.5 sm:mt-2 md:mt-3 flex flex-wrap gap-1">
          {displayCategories.map((category: string, index: number) => (
            <span key={index} className="inline-flex items-center rounded-full bg-blue-50 px-1.5 sm:px-2 py-0.5 text-2xs sm:text-xs font-medium text-blue-700">
              {category}
            </span>
          ))}
          {hasMoreCategories && (
            <span className="inline-flex items-center rounded-full bg-gray-50 px-1.5 sm:px-2 py-0.5 text-2xs sm:text-xs font-medium text-gray-600">
              +{(categories?.length || 0) - 3} more
            </span>
          )}
        </div>
      )}
      
      {/* Website Link */}
      <div className="mt-2 sm:mt-3 md:mt-4 pt-2 border-t border-gray-100">
        <a 
          href={websiteUrl} 
          target="_blank" 
          rel={relAttribute} 
          className={`inline-flex items-center justify-center w-full text-2xs sm:text-xs md:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded ${
            websiteUrl === "#" ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          <LinkIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          {websiteUrl === "#" ? "No Website Available" : "Visit Website"}
        </a>
      </div>
    </div>
  );
} 