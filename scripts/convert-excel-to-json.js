const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Path to the Excel file
const excelFilePath = path.join(__dirname, '..', 'Outscraper-20250416234932s92_hair_transplant.xlsx');
const jsonOutputPath = path.join(__dirname, '..', 'src', 'data', 'clinics-data.json');

// Read the Excel file
try {
  console.log(`Reading Excel file from: ${excelFilePath}`);
  const workbook = XLSX.readFile(excelFilePath);
  
  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  console.log(`Processing sheet: ${sheetName}`);
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);
  console.log(`Converted ${data.length} rows to JSON`);
  
  // Print the keys of the first row to understand structure
  if (data.length > 0) {
    console.log('Keys in first row:', Object.keys(data[0]));
    console.log('Sample of first row:', JSON.stringify(data[0], null, 2).substring(0, 500) + '...');
  } else {
    console.log('No data found in the Excel file');
  }
  
  // Create clinics with structured data
  const formattedData = data.filter(row => row.name).map(row => {
    return {
      title: row.name || row.Name || '',
      address: row.address || row.Address || '',
      website: row.website || row.Website || '',
      phone: row.phone || row.Phone || '',
      rating: parseFloat(row.rating || row.Rating || 0) || 0,
      reviewsCount: parseInt(row.reviews || row.Reviews || 0) || 0,
      categories: ((row.categories || row.Categories || '')+',Hair Transplant').split(',').map(cat => cat.trim()).filter(Boolean),
      city: row.city || row.City || 'Los Angeles'
    };
  });
  
  console.log(`Formatted ${formattedData.length} clinics`);
  
  // If no data found, use sample data
  if (formattedData.length === 0) {
    console.log('No valid clinic data found, using sample data');
    
    // Add sample data for testing
    formattedData.push(
      {
        title: 'Beverly Hills Hair Restoration',
        address: '9735 Wilshire Blvd #421, Beverly Hills, CA 90212',
        website: 'https://beverlyhillshr.com',
        phone: '+1 (310) 878-2470',
        rating: 4.9,
        reviewsCount: 120,
        categories: ['Hair Transplant', 'FUE', 'PRP Treatment'],
        city: 'Beverly Hills'
      },
      {
        title: 'LA Hair Clinic',
        address: '11620 Wilshire Blvd #280, Los Angeles, CA 90025',
        website: 'https://www.lahair.com',
        phone: '+1 (310) 289-0901',
        rating: 4.8,
        reviewsCount: 110,
        categories: ['Hair Transplant', 'FUE', 'Hair Restoration'],
        city: 'Los Angeles'
      },
      {
        title: 'US Hair Restoration',
        address: '16661 Ventura Blvd #312, Encino, CA 91436',
        website: 'https://www.ushairrestoration.com',
        phone: '+1 (818) 788-8363',
        rating: 4.7,
        reviewsCount: 92,
        categories: ['Hair Transplant', 'FUT', 'Hair Loss Treatment'],
        city: 'Los Angeles'
      }
    );
  }
  
  // Write the JSON file
  fs.writeFileSync(jsonOutputPath, JSON.stringify(formattedData, null, 2), 'utf8');
  console.log(`Successfully wrote JSON to: ${jsonOutputPath}`);
  
  // Also write a file mapping clinic names to websites for reference
  const websiteMap = {};
  formattedData.forEach(clinic => {
    if (clinic.title && clinic.website) {
      websiteMap[clinic.title] = clinic.website;
    }
  });
  
  const websiteMapPath = path.join(__dirname, '..', 'src', 'data', 'website-map.json');
  fs.writeFileSync(websiteMapPath, JSON.stringify(websiteMap, null, 2), 'utf8');
  console.log(`Successfully wrote website map to: ${websiteMapPath}`);
  
} catch (error) {
  console.error('Error processing Excel file:', error);
} 