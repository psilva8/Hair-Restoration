const data = require('./src/data/clinics-data.json');
console.log('Checking data for website links...');
const topRatedClinics = [...data]
    .sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log10(a.reviewsCount + 1);
      const scoreB = (b.rating || 0) * Math.log10(b.reviewsCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, 20);

const withoutWebsites = topRatedClinics.filter(c => !c.website);
console.log('Clinics without websites:', withoutWebsites.length);
if (withoutWebsites.length > 0) {
  withoutWebsites.forEach((clinic, i) => {
    console.log(`${i+1}. ${clinic.title} - Rating: ${clinic.rating}, Reviews: ${clinic.reviewsCount}, City: ${clinic.city}`);
  });
} 