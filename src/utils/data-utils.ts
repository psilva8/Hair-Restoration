// Import data from JSON file
import mockData from '../data/mock-data';
import clinicsData from '../data/clinics-data.json';
import websiteMap from '../data/website-map.json';

export interface Business {
  title: string;
  address: string;
  phone: string;
  website?: string;
  rating: number;
  reviewsCount: number;
  categories: string[];
  city: string;
}

export interface City {
  name: string;
  urlSlug: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface Data {
  cities: City[];
  businesses: {
    [citySlug: string]: Business[];
  };
  categories: {
    [citySlug: string]: {
      [category: string]: Business[];
    };
  };
}

// Cache the loaded data
let cachedData: Data | null = null;

// LA area neighborhoods/cities
const losAngelesAreaCities = [
  'beverly-hills',
  'west-hollywood',
  'santa-monica',
  'burbank',
  'glendale',
  'pasadena',
  'culver-city',
  'sherman-oaks',
  'encino',
  'studio-city',
  'los-angeles',
  'hollywood',
  'koreatown',
  'long-beach',
  'manhattan-beach',
  'woodland-hills',
  'calabasas',
  'westwood',
  'brentwood',
  'century-city',
  'marina-del-rey',
  'venice'
];

// Default address templates for LA neighborhoods
const defaultAddresses: { [key: string]: string } = {
  'beverly-hills': '9876 Wilshire Blvd, Beverly Hills, CA 90210',
  'west-hollywood': '8555 Santa Monica Blvd, West Hollywood, CA 90069',
  'santa-monica': '1335 Ocean Ave, Santa Monica, CA 90401',
  'burbank': '3400 W Riverside Dr, Burbank, CA 91505',
  'glendale': '100 N Brand Blvd, Glendale, CA 91203',
  'pasadena': '35 S Raymond Ave, Pasadena, CA 91105',
  'culver-city': '9400 Culver Blvd, Culver City, CA 90232',
  'sherman-oaks': '14141 Ventura Blvd, Sherman Oaks, CA 91423',
  'encino': '16350 Ventura Blvd, Encino, CA 91436',
  'studio-city': '12345 Ventura Blvd, Studio City, CA 91604',
  'los-angeles': '400 S Hope St, Los Angeles, CA 90071',
  'hollywood': '6925 Hollywood Blvd, Hollywood, CA 90028',
  'koreatown': '3510 W 6th St, Los Angeles, CA 90020',
  'long-beach': '200 E Ocean Blvd, Long Beach, CA 90802',
  'manhattan-beach': '1142 Manhattan Ave, Manhattan Beach, CA 90266',
  'woodland-hills': '6100 Topanga Canyon Blvd, Woodland Hills, CA 91367',
  'calabasas': '23975 Park Sorrento, Calabasas, CA 91302',
  'westwood': '10889 Wilshire Blvd, Los Angeles, CA 90024',
  'brentwood': '11677 San Vicente Blvd, Los Angeles, CA 90049',
  'century-city': '10100 Santa Monica Blvd, Los Angeles, CA 90067',
  'marina-del-rey': '4175 Admiralty Way, Marina Del Rey, CA 90292',
  'venice': '1697 Pacific Ave, Venice, CA 90291'
};

// Helper function to convert string to URL slug
function stringToSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate a realistic address for a clinic based on its city
function generateAddress(cityName: string, citySlug: string, businessIndex: number): string {
  // Try to get the default address template for this city
  const baseAddress = defaultAddresses[citySlug] || defaultAddresses['los-angeles'];
  
  if (!baseAddress) {
    return `123 Main St, ${cityName}, CA`;
  }
  
  // Extract parts of the template address
  const parts = baseAddress.split(',');
  if (parts.length < 2) {
    return baseAddress;
  }
  
  // Get the street part
  const streetPart = parts[0].trim();
  
  // Basic address number and street name separation
  const streetMatch = streetPart.match(/^(\d+)\s+(.+)$/);
  if (!streetMatch) {
    return baseAddress;
  }
  
  const [_, baseNumber, streetName] = streetMatch;
  
  // Generate a new street number that's close to the original
  const newNumber = parseInt(baseNumber) + (businessIndex * 4) % 100;
  
  // Construct the new address
  return `${newNumber} ${streetName}, ${parts.slice(1).join(',')}`;
}

// Process the imported JSON data to match our Data structure
function processClinicData(): Data {
  // Create city map from clinics
  const cities: City[] = [];
  const cityMap: {[name: string]: string} = {};
  const businesses: {[citySlug: string]: Business[]} = {};
  const categories: {[citySlug: string]: {[category: string]: Business[]}} = {};
  
  // Process each clinic
  clinicsData.forEach((clinic: any, index: number) => {
    const cityName = clinic.city || 'Los Angeles';
    let citySlug = cityMap[cityName];
    
    // If this city hasn't been processed yet, create it
    if (!citySlug) {
      citySlug = stringToSlug(cityName);
      cityMap[cityName] = citySlug;
      cities.push({ name: cityName, urlSlug: citySlug });
      businesses[citySlug] = [];
      categories[citySlug] = {};
    }
    
    // Generate an address if it's empty
    const address = clinic.address || generateAddress(cityName, citySlug, businesses[citySlug].length);
    
    // Add the clinic to the businesses for this city
    const business: Business = {
      title: clinic.title,
      address: address,
      rating: clinic.rating,
      reviewsCount: clinic.reviewsCount,
      categories: clinic.categories,
      city: cityName,
      website: clinic.website,
      phone: clinic.phone
    };
    
    businesses[citySlug].push(business);
    
    // Add the clinic to each of its categories
    if (clinic.categories && Array.isArray(clinic.categories)) {
      clinic.categories.forEach((category: string) => {
        if (!categories[citySlug][category]) {
          categories[citySlug][category] = [];
        }
        categories[citySlug][category].push(business);
      });
    }
  });
  
  // Filter cities to only include LA area
  const filteredCities = cities.filter(city => 
    losAngelesAreaCities.includes(city.urlSlug) || 
    losAngelesAreaCities.some(laCity => city.urlSlug.includes(laCity))
  );
  
  return {
    cities: filteredCities,
    businesses,
    categories
  };
}

export const loadData = (): Data => {
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // Process the clinic data into our structure
    const processedData = processClinicData();
    cachedData = processedData;
    return cachedData;
  } catch (error) {
    console.error('Error loading data:', error);
    cachedData = {
      cities: [],
      businesses: {},
      categories: {}
    };
    return cachedData;
  }
};

// Get all businesses
export const getBusinesses = (): Business[] => {
  const data = loadData();
  const businesses = Object.values(data.businesses).flat();
  return businesses;
};

// Get website for a business by its title
export const getWebsiteByTitle = (title: string): string | undefined => {
  // Check if the title exists directly in the website map
  const typedWebsiteMap = websiteMap as Record<string, string>;
  if (typedWebsiteMap[title]) {
    return typedWebsiteMap[title];
  }
  
  // If not found directly, try checking for partial matches (case insensitive)
  const titleLower = title.toLowerCase();
  for (const [mapTitle, url] of Object.entries(typedWebsiteMap)) {
    if (mapTitle.toLowerCase().includes(titleLower) || 
        titleLower.includes(mapTitle.toLowerCase())) {
      return url;
    }
  }
  
  return undefined;
};

export function getCities(): City[] {
  const data = loadData();
  // Filter to only include LA area cities
  return data.cities.filter(city => losAngelesAreaCities.includes(city.urlSlug) || 
    losAngelesAreaCities.some(laCity => city.urlSlug.includes(laCity)));
}

export function getBusinessesByCity(citySlug: string): Business[] {
  const data = loadData();
  return data.businesses[citySlug] || [];
}

export function getCategoriesByCity(citySlug: string): { [category: string]: Business[] } {
  const data = loadData();
  return data.categories?.[citySlug] || {};
}

export function getCityBySlug(citySlug: string): City | null {
  const cities = getCities();
  return cities.find(city => city.urlSlug === citySlug) || null;
}

export function getAllCitySlugs(): string[] {
  const cities = getCities(); // This will already be filtered for LA
  return cities.map(city => city.urlSlug);
}

export function getTopBusinessesByCity(citySlug: string, limit: number = 10): Business[] {
  const businesses = getBusinessesByCity(citySlug);
  return businesses.slice(0, limit);
}

export function getTopCategories(citySlug: string, limit: number = 5): string[] {
  const categories = getCategoriesByCity(citySlug);
  // Sort categories by the number of businesses and their ratings
  return Object.entries(categories)
    .sort((a, b) => {
      // First compare by number of businesses
      const countDiff = b[1].length - a[1].length;
      if (countDiff !== 0) return countDiff;
      
      // If equal, compare by average rating
      const aAvgRating = a[1].reduce((sum, business) => sum + (business.rating || 0), 0) / a[1].length;
      const bAvgRating = b[1].reduce((sum, business) => sum + (business.rating || 0), 0) / b[1].length;
      return bAvgRating - aAvgRating;
    })
    .map(([category]) => category)
    .slice(0, limit);
}

export function getBusinessesByCategory(citySlug: string, category: string): Business[] {
  const categories = getCategoriesByCity(citySlug);
  return categories[category] || [];
}

export function getCategoriesFromBusinesses(businesses: Business[]): Category[] {
  const categoriesMap: Record<string, Business[]> = {};
  
  businesses.forEach(business => {
    if (business.categories) {
      business.categories.forEach(category => {
        if (!categoriesMap[category]) {
          categoriesMap[category] = [];
        }
        categoriesMap[category].push(business);
      });
    }
  });
  
  return Object.entries(categoriesMap)
    .map(([name, businesses]) => ({
      name,
      count: businesses.length,
    }))
    .sort((a, b) => b.count - a.count);
} 