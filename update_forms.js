const fs = require('fs');
const path = require('path');

const files = [
  "src/app/producer-company-registration/page.tsx",
  "src/app/sole-proprietorship/page.tsx",
  "src/app/nidhi-company-registration/page.tsx",
  "src/app/digital-signature-certificate/page.tsx",
  "src/app/import-export-code/page.tsx",
  "src/app/trademark-ip/[slug]/page.tsx",
  "src/app/fssai-food-license/page.tsx",
  "src/app/limited-liability-partnership/page.tsx",
  "src/app/one-person-company/page.tsx",
  "src/app/compliance/[slug]/page.tsx",
  "src/app/msme-registration/page.tsx",
  "src/app/partnership-firm-registration/page.tsx",
  "src/app/taxation/[slug]/page.tsx",
  "src/app/private-limited-company-registration/page.tsx",
  "src/app/iso-certification/page.tsx",
  "src/app/startup-india-registration/page.tsx"
];

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Replace the h3 text and delete the subtitle p
    // We match <h3 ...>...</h3>\n...<p...>...within 2 hours...</p>
    const titleRegex = /(<h3[^>]*>)[^<]*(<\/h3>)\s*<p[^>]*>.*?within 2 hours.*?<\/p>/g;
    
    // Some files might have different text inside h3. We capture the tags and replace the content.
    content = content.replace(titleRegex, '$1Enter your details to receive a full quote and consultation$2');
    
    // 2. Replace the button text
    // We look for : 'Get Free Consultation' or 'Get Free Expert Consultation'
    // The user said: "get free consultation to claim your free consultation"
    content = content.replace(/:\s*'Get Free Consultation'/g, ": 'Claim Your Free Consultation'");
    content = content.replace(/:\s*'Get Free Expert Consultation'/g, ": 'Claim Your Free Consultation'");

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log(`Total files updated: ${updatedCount}`);
