const fs = require('fs');
const path = require('path');

// Paths to the data files
const clinicsDataPath = path.join(__dirname, '..', 'src', 'data', 'clinics-data.json');
const websiteMapPath = path.join(__dirname, '..', 'src', 'data', 'website-map.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'clinics-data-updated.json');

// Read the data files
try {
  console.log('Reading data files...');
  const clinicsData = JSON.parse(fs.readFileSync(clinicsDataPath, 'utf8'));
  const websiteMap = JSON.parse(fs.readFileSync(websiteMapPath, 'utf8'));
  
  console.log(`Found ${clinicsData.length} clinics and ${Object.keys(websiteMap).length} websites`);
  
  // Update the clinics data with website URLs
  const updatedClinicsData = clinicsData.map(clinic => {
    if (!clinic.website && websiteMap[clinic.title]) {
      return {
        ...clinic,
        website: websiteMap[clinic.title]
      };
    }
    return clinic;
  });
  
  // Count how many clinics were updated
  const updatedCount = updatedClinicsData.filter(clinic => clinic.website).length;
  console.log(`Updated ${updatedCount} clinics with website URLs`);
  
  // Write the updated data to the output file
  fs.writeFileSync(outputPath, JSON.stringify(updatedClinicsData, null, 2), 'utf8');
  console.log(`Successfully wrote updated data to: ${outputPath}`);
  
  // Copy the updated file to the original location
  fs.copyFileSync(outputPath, clinicsDataPath);
  console.log(`Successfully updated the original clinics data file`);
  
} catch (error) {
  console.error('Error updating clinic websites:', error);
} 