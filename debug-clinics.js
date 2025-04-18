const clinicsData = require('./src/data/clinics-data.json');
const websiteMap = require('./src/data/website-map.json');

// Helper function to convert string to URL slug
function stringToSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Process the imported JSON data to match our Data structure
function processClinicData() {
  // Create city map from clinics
  const cities = [];
  const cityMap = {};
  const businesses = {};
  
  // Process each clinic
  clinicsData.forEach((clinic) => {
    const cityName = clinic.city || 'Los Angeles';
    let citySlug = cityMap[cityName];
    
    // If this city hasn't been processed yet, create it
    if (!citySlug) {
      citySlug = stringToSlug(cityName);
      cityMap[cityName] = citySlug;
      cities.push({ name: cityName, urlSlug: citySlug });
      businesses[citySlug] = [];
    }
    
    // Add the clinic to the businesses for this city
    const business = {
      title: clinic.title,
      address: clinic.address,
      rating: clinic.rating,
      reviewsCount: clinic.reviewsCount,
      categories: clinic.categories,
      city: cityName,
      website: clinic.website,
      phone: clinic.phone
    };
    
    businesses[citySlug].push(business);
  });
  
  // Check businesses for Los Angeles
  console.log('Los Angeles slug:', stringToSlug('Los Angeles'));
  console.log('LA businesses:', businesses['los-angeles'] ? businesses['los-angeles'].length : 0);
  
  // Get top 10 businesses by rating and review count (using a weighted score)
  const allBusinesses = Object.values(businesses).flat();
  const topRatedClinics = [...allBusinesses]
    .sort((a, b) => {
      // Calculate a score based on rating and review count
      // This gives higher weight to clinics with more reviews
      const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
      const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, 20);
  
  console.log('Top 20 clinics by rating and reviews:');
  topRatedClinics.forEach((clinic, index) => {
    console.log(`${index + 1}. ${clinic.title} - Rating: ${clinic.rating}, Reviews: ${clinic.reviewsCount}, City: ${clinic.city}, Website: ${clinic.website || 'none'}`);
  });
  
  // Count how many of the top clinics have websites
  const withWebsites = topRatedClinics.filter(c => c.website);
  console.log(`\nOf the top 20 clinics, ${withWebsites.length} have websites (${(withWebsites.length / 20 * 100).toFixed(1)}%)`);
  
  if (withWebsites.length < 20) {
    console.log("\nClinics without websites:");
    topRatedClinics.filter(c => !c.website).forEach((clinic, index) => {
      console.log(`- ${clinic.title} (Rating: ${clinic.rating}, Reviews: ${clinic.reviewsCount})`);
    });
  }
  
  return { cities, businesses };
}

processClinicData(); 