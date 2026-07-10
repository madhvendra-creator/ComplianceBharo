const fs = require('fs');
const path = require('path');

const dirs = [
  { dir: 'digital-signature-certificate', title: 'Digital Signature Certificate', oldName: 'Digital Signature Certificate (DSC)' },
  { dir: 'fssai-food-license', title: 'FSSAI Food License Registration', oldName: 'FSSAI Food License Registration' },
  { dir: 'import-export-code', title: 'Import Export Code (IEC) Registration', oldName: 'Import Export Code (IEC) Registration' },
  { dir: 'iso-certification', title: 'ISO Certification Services', oldName: 'ISO Certification Services' },
  { dir: 'nidhi-company-registration', title: 'Nidhi Company Registration', oldName: 'Nidhi Company Registration' },
  { dir: 'partnership-firm-registration', title: 'Partnership Firm Registration', oldName: 'Partnership Firm Registration' },
  { dir: 'producer-company-registration', title: 'Producer Company Registration', oldName: 'Producer Company Registration' },
  { dir: 'msme-registration', title: 'MSME Registration', oldName: 'MSME Registration' },
  { dir: 'limited-liability-partnership', title: 'Limited Liability Partnership', oldName: 'Limited Liability Partnership' },
  { dir: 'one-person-company', title: 'One Person Company', oldName: 'One Person Company' },
  { dir: 'private-limited-company-registration', title: 'Private Limited Company Registration', oldName: 'Private Limited Company Registration' },
  { dir: 'sole-proprietorship', title: 'Sole Proprietorship', oldName: 'Sole Proprietorship' },
  { dir: 'startup-india-registration', title: 'Startup India Registration', oldName: 'Startup India Registration' }
];

for (const entry of dirs) {
  const pagePath = path.join(process.cwd(), 'src/app', entry.dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // First, find and remove the entire existing jsonLd block
    content = content.replace(/const jsonLd = \{[\s\S]*?\n  \};\n/m, '');
    
    // Then re-inject the correct jsonLd
    const correctJsonLd = `const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: '${entry.oldName}',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/${entry.dir}',
      },
      {
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
      }
    ]
  };
`;
    
    // Inject it before `return (`
    content = content.replace(/  return \(/, `  ${correctJsonLd}\n  return (`);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Fixed jsonLd in ${entry.dir}`);
  }
}
