const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Create directories if they don't exist
const clinicImagesDir = path.join('public', 'images', 'clinics');
const logoImagesDir = path.join('public', 'images', 'logos');

if (!fs.existsSync(clinicImagesDir)) {
  fs.mkdirSync(clinicImagesDir, { recursive: true });
}

if (!fs.existsSync(logoImagesDir)) {
  fs.mkdirSync(logoImagesDir, { recursive: true });
}

// Read the Excel file
const excelFile = 'Outscraper-20250416234932s92_hair_transplant.xlsx';
const workbook = XLSX.readFile(excelFile);

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

// Generate a safe filename from business name
function getSafeFilename(businessName) {
  return businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Get file extension from URL or default to .jpg
function getExtensionFromUrl(url) {
  const extension = url.split('.').pop().split('=')[0].split('?')[0];
  return extension && extension.length <= 4 ? extension : 'jpg';
}

// Download image from URL to local file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Only proceed if URL is valid
    if (!url || !url.startsWith('http')) {
      return reject(new Error(`Invalid URL: ${url}`));
    }

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      return resolve(filepath);
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Create a mapping between business names and image paths
const imageMapping = {};

// Process the first 20 businesses
const limitCount = 20;
let processedCount = 0;

// Start downloading images
async function downloadAllImages() {
  console.log(`Starting to download images for ${Math.min(limitCount, data.length)} businesses...`);
  
  for (const business of data) {
    if (processedCount >= limitCount) break;
    
    const businessName = business.name;
    if (!businessName) continue;
    
    const photoUrl = business.photo;
    const logoUrl = business.logo;
    
    // Use a hash of the business name as the filename to avoid duplicates
    const nameHash = crypto.createHash('md5').update(businessName).digest('hex').substring(0, 8);
    const safeName = getSafeFilename(businessName);
    
    try {
      let photoPath = null;
      let logoPath = null;
      
      // Download main photo
      if (photoUrl) {
        const photoFilepath = path.join(clinicImagesDir, `${safeName}-${nameHash}.${getExtensionFromUrl(photoUrl)}`);
        try {
          await downloadImage(photoUrl, photoFilepath);
          photoPath = `/images/clinics/${path.basename(photoFilepath)}`;
          console.log(`Downloaded photo for "${businessName}"`);
        } catch (err) {
          console.error(`Error downloading photo for "${businessName}":`, err.message);
        }
      }
      
      // Download logo
      if (logoUrl) {
        const logoFilepath = path.join(logoImagesDir, `${safeName}-logo-${nameHash}.${getExtensionFromUrl(logoUrl)}`);
        try {
          await downloadImage(logoUrl, logoFilepath);
          logoPath = `/images/logos/${path.basename(logoFilepath)}`;
          console.log(`Downloaded logo for "${businessName}"`);
        } catch (err) {
          console.error(`Error downloading logo for "${businessName}":`, err.message);
        }
      }
      
      // Add to mapping if either image was downloaded
      if (photoPath || logoPath) {
        imageMapping[businessName] = {
          photo: photoPath,
          logo: logoPath
        };
      }
      
      processedCount++;
    } catch (err) {
      console.error(`Error processing "${businessName}":`, err.message);
    }
  }
  
  // Save the mapping to a JSON file
  const mappingPath = path.join('src', 'data', 'clinic-images.json');
  fs.writeFileSync(mappingPath, JSON.stringify(imageMapping, null, 2));
  
  console.log(`Completed downloading images for ${processedCount} businesses`);
  console.log(`Image mapping saved to ${mappingPath}`);
}

downloadAllImages().catch(err => {
  console.error('Error in main process:', err);
}); 