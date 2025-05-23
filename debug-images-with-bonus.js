const clinicsData = require('./src/data/clinics-data.json');
const clinicImages = require('./src/data/clinic-images.json');

// Get top clinics like the homepage does WITH IMAGE BONUS
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
    // Calculate a score based on rating and review count
    const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
    const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
    
    // Give bonus points to clinics with images (add 5 points to their score)
    const hasImageA = clinicImages[a.title]?.photo ? 5 : 0;
    const hasImageB = clinicImages[b.title]?.photo ? 5 : 0;
    
    const finalScoreA = scoreA + hasImageA;
    const finalScoreB = scoreB + hasImageB;
    
    return finalScoreB - finalScoreA;
  })
  .slice(0, 12);

console.log('=== NEW RANKING WITH IMAGE BONUS ===\n');

console.log('Top 12 clinics with image bonus ranking:');
topRatedClinics.forEach((clinic, index) => {
  const hasImage = clinicImages[clinic.title] ? '✅ HAS IMAGE' : '❌ NO IMAGE';
  const baseScore = (clinic.rating || 0) * Math.log10(clinic.reviewsCount + 1);
  const imageBonus = clinicImages[clinic.title]?.photo ? 5 : 0;
  const totalScore = baseScore + imageBonus;
  
  console.log(`${index + 1}. ${clinic.title} - ${hasImage}`);
  console.log(`   Score: ${totalScore.toFixed(2)} (base: ${baseScore.toFixed(2)} + image bonus: ${imageBonus})`);
  console.log('');
});

const withImages = topRatedClinics.filter(clinic => clinicImages[clinic.title]?.photo);
console.log(`\n🎉 RESULT: ${withImages.length} out of 12 clinics now have images!`);
console.log(`That's ${(withImages.length / 12 * 100).toFixed(1)}% of displayed clinics with images.`); 