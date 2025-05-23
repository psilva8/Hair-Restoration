const clinicsData = require('./src/data/clinics-data.json');
const clinicImages = require('./src/data/clinic-images.json');

// Get top clinics like the homepage does
const allBusinesses = clinicsData;
const excludedTerms = ['Wig', 'Salon', 'Scalp Micropigmentation', 'SMP'];

const hairTransplantOnlyClinics = allBusinesses.filter(business => {
  const hasOnlyHairTransplant = business.categories?.length === 1 && 
                               business.categories[0] === 'Hair Transplant';
  const titleLower = business.title.toLowerCase();
  const containsExcludedTerm = excludedTerms.some(term => 
    titleLower.includes(term.toLowerCase())
  );
  return hasOnlyHairTransplant && !containsExcludedTerm;
});

const topRatedClinics = [...hairTransplantOnlyClinics]
  .sort((a, b) => {
    const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
    const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
    return scoreB - scoreA;
  })
  .slice(0, 12);

console.log('=== DETAILED IMAGE ANALYSIS ===\n');

console.log('Top 12 clinics with exact title matching:');
topRatedClinics.forEach((clinic, index) => {
  const exactMatch = clinicImages[clinic.title];
  console.log(`${index + 1}. "${clinic.title}"`);
  if (exactMatch) {
    console.log(`   ✅ EXACT MATCH FOUND`);
    console.log(`   📸 Photo: ${exactMatch.photo}`);
    console.log(`   🏢 Logo: ${exactMatch.logo}`);
  } else {
    console.log(`   ❌ NO EXACT MATCH`);
    // Look for partial matches
    const imageKeys = Object.keys(clinicImages);
    const partialMatches = imageKeys.filter(key => 
      key.toLowerCase().includes(clinic.title.toLowerCase().split(' ')[0]) ||
      clinic.title.toLowerCase().includes(key.toLowerCase().split(' ')[0])
    );
    if (partialMatches.length > 0) {
      console.log(`   🔍 Possible partial matches: ${partialMatches.join(', ')}`);
    }
  }
  console.log('');
});

console.log('\n=== IMAGE MAPPING KEYS ===');
Object.keys(clinicImages).forEach((key, index) => {
  console.log(`${index + 1}. "${key}"`);
});

console.log('\n=== CHECKING IMAGE FILES ===');
const fs = require('fs');
const path = require('path');

const clinicsImageDir = './public/images/clinics';
if (fs.existsSync(clinicsImageDir)) {
  const imageFiles = fs.readdirSync(clinicsImageDir);
  console.log(`Found ${imageFiles.length} image files in ${clinicsImageDir}:`);
  imageFiles.forEach(file => {
    console.log(`- ${file}`);
  });
} else {
  console.log(`❌ Directory ${clinicsImageDir} does not exist`);
} 