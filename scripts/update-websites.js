const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Define paths
const excelFilePath = path.join(__dirname, '..', 'Outscraper-20250416234932s92_hair_transplant.xlsx');
const websiteMapPath = path.join(__dirname, '..', 'src', 'data', 'website-map.json');

// Read the Excel file
console.log('Reading Excel file:', excelFilePath);
const workbook = XLSX.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Read the current website map
console.log('Reading current website map:', websiteMapPath);
const websiteMap = JSON.parse(fs.readFileSync(websiteMapPath, 'utf8'));

// Extract data from Excel and update the website map
let websitesAdded = 0;
let websitesUpdated = 0;

data.forEach(row => {
  // Get the business name and website from the row (using the correct column names)
  const businessName = row['name'] || '';
  const website = row['site'] || '';
  
  // Only update if the website is not empty
  if (businessName && website && website !== '#' && website !== '') {
    // Clean up the website URL (remove query parameters if present)
    const cleanWebsite = website.split('?')[0];
    
    // Check if the business already exists in the website map
    if (websiteMap[businessName]) {
      if (websiteMap[businessName] !== cleanWebsite) {
        console.log(`Updating website for "${businessName}": ${websiteMap[businessName]} -> ${cleanWebsite}`);
        websiteMap[businessName] = cleanWebsite;
        websitesUpdated++;
      }
    } else {
      console.log(`Adding new website for "${businessName}": ${cleanWebsite}`);
      websiteMap[businessName] = cleanWebsite;
      websitesAdded++;
    }
  }
});

// Write the updated website map back to the file
fs.writeFileSync(websiteMapPath, JSON.stringify(websiteMap, null, 2), 'utf8');

console.log(`Website map updated successfully!`);
console.log(`- ${websitesAdded} websites added`);
console.log(`- ${websitesUpdated} websites updated`);
console.log(`- ${Object.keys(websiteMap).length} total websites in the map`); 