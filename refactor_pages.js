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
  "src/app/startup-india-registration/page.tsx",
  "src/app/page.tsx" // Homepage also needs updates
];

function getRelativeDepth(filePath) {
  const parts = filePath.split('/');
  // src/app/page.tsx -> depth 0 relative to app? Actually just use absolute alias if possible or calculate.
  // We can just calculate relative to src/app/components.
  // src/app/page.tsx -> './components/...'
  // src/app/iso-certification/page.tsx -> '../components/...'
  // src/app/taxation/[slug]/page.tsx -> '../../components/...'
  
  // parts[0] = src, parts[1] = app
  const depth = parts.length - 3; // for src/app/page.tsx length is 3. 3-3 = 0.
  if (depth === 0) return './components/';
  if (depth === 1) return '../components/';
  if (depth === 2) return '../../components/';
  return '../components/';
}

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Extract service name
  let serviceName = '"General Inquiry"'; // default
  const serviceMatch = content.match(/<input\s+type="hidden"\s+name="service"\s+value=(\{[^}]+\}|"[^"]+")\s*\/>/);
  if (serviceMatch) {
    serviceName = serviceMatch[1];
  } else if (file === 'src/app/page.tsx') {
    serviceName = '{selectedService || "General Inquiry"}';
  }

  // 2. Remove the inline lead form
  const leadFormRegex = /<div id="lead-form"[\s\S]*?<\/form>[\s\S]*?<\/div>\s*<\/div>/;
  content = content.replace(leadFormRegex, '');

  // For the homepage, there might be a different structure. Let's make it generic for all files.
  // Actually, if it doesn't match the exact </div></div>, we can just replace the form itself.
  // Wait, replacing the form wrapper is better. Let's try to find `<div id="lead-form"` and balance tags, or just use regex.
  // The regex above works well for the standard page layout.

  // 3. Add imports
  const componentsPath = getRelativeDepth(file);
  if (!content.includes('import Modal')) {
    content = content.replace(/import\s+.*?;?\n/, `$&import Modal from '${componentsPath}Modal';\nimport LeadForm from '${componentsPath}LeadForm';\n`);
  }

  // 4. Add useState if needed
  if (!content.includes('const [isModalOpen, setIsModalOpen]')) {
    content = content.replace(/(export default function [A-Za-z0-9_]+\s*\([^)]*\)\s*\{)/, `$1\n  const [isModalOpen, setIsModalOpen] = useState(false);\n`);
  }
  
  // Make sure useState is imported
  if (!content.match(/import\s+.*?useState.*?from\s+['"]react['"]/)) {
    content = content.replace(/import React/, 'import React, { useState }');
  }

  // 5. Update links
  content = content.replace(/href="#lead-form"/g, `href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}`);

  // 6. Insert Modal before Footer
  // First, check if Modal is already added
  if (!content.includes('<Modal isOpen={isModalOpen}')) {
    const dmVar = content.includes('isDarkMode') ? 'isDarkMode' : 'dm';
    // isDarkMode might be called `dm` in some files (like dynamic routes).
    // Let's check which one is defined.
    let dmToUse = 'false';
    if (content.includes('const [isDarkMode')) dmToUse = 'isDarkMode';
    else if (content.match(/const\s+dm\s*=/)) dmToUse = 'dm';
    else if (content.includes('isDarkMode')) dmToUse = 'isDarkMode'; // fallback
    else if (content.includes('dm ?')) dmToUse = 'dm';

    const modalBlock = `
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LeadForm serviceName={${serviceName.startsWith('"') ? serviceName : serviceName}} dm={${dmToUse}} />
      </Modal>
    `;
    
    if (content.includes('<Footer />')) {
      content = content.replace(/<Footer\s*\/>/, `${modalBlock}\n      <Footer />`);
    } else {
      content = content.replace(/<\/main>/, `${modalBlock}\n    </main>`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
