const fs = require('fs');
const path = require('path');

const dirs = [
  { dir: 'digital-signature-certificate', title: 'Digital Signature Certificate' },
  { dir: 'fssai-food-license', title: 'FSSAI Food License Registration' },
  { dir: 'import-export-code', title: 'Import Export Code (IEC) Registration' },
  { dir: 'iso-certification', title: 'ISO Certification Services' },
  { dir: 'nidhi-company-registration', title: 'Nidhi Company Registration' },
  { dir: 'partnership-firm-registration', title: 'Partnership Firm Registration' },
  { dir: 'producer-company-registration', title: 'Producer Company Registration' },
  { dir: 'msme-registration', title: 'MSME Registration' },
  { dir: 'limited-liability-partnership', title: 'Limited Liability Partnership' },
  { dir: 'one-person-company', title: 'One Person Company' },
  { dir: 'private-limited-company-registration', title: 'Private Limited Company Registration' },
  { dir: 'sole-proprietorship', title: 'Sole Proprietorship' },
  { dir: 'startup-india-registration', title: 'Startup India Registration' }
];

for (const entry of dirs) {
  const pagePath = path.join(process.cwd(), 'src/app', entry.dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    if (!content.includes('BreadcrumbList')) {
      const breadcrumbJson = `        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://compliancebharo.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '${entry.title}',
              item: 'https://compliancebharo.com/${entry.dir}',
            },
          ],
        }`;
        
      // For pages where we already put `const jsonLd = { '@context': ... }`
      if (content.includes("const jsonLd = {")) {
        content = content.replace(/('@type': 'Service',[^}]+\},)/s, `$1\n${breadcrumbJson},`);
        // Wait, the structure in the previous script was just a single object:
        // const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', ... }
        // Let's modify it to be an array under '@graph' if it's not.
        if (!content.includes('@graph')) {
          content = content.replace(/const jsonLd = \{([\s\S]*?)url: 'https:\/\/compliancebharo\.com\/(.*?)',\n  \};/g, 
`const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {$1url: 'https://compliancebharo.com/$2',
      },
${breadcrumbJson}
    ]
  };`);
        }
      }
      fs.writeFileSync(pagePath, content);
      console.log(`Added breadcrumb to ${entry.dir}`);
    }
  }
}
