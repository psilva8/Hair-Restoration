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

console.log('Top 12 clinics displayed on homepage:');
topRatedClinics.forEach((clinic, index) => {
  const hasImage = clinicImages[clinic.title] ? '✅ HAS IMAGE' : '❌ NO IMAGE';
  console.log(`${index + 1}. ${clinic.title} - ${hasImage}`);
});

console.log('\nClinics with images in mapping file:');
Object.keys(clinicImages).forEach(clinicName => {
  console.log('- ' + clinicName);
});

console.log('\nMissing images for top clinics:');
topRatedClinics.forEach(clinic => {
  if (!clinicImages[clinic.title]) {
    console.log(`❌ ${clinic.title}`);
  }
}); 