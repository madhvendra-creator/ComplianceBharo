const fs = require('fs');
const path = require('path');

const dirs = [
  { dir: 'msme-registration', title: 'MSME Registration', name: 'MsmeRegistrationPage', clientComponent: '<MSMEClient />' },
  { dir: 'limited-liability-partnership', title: 'Limited Liability Partnership', name: 'LLPRegistrationPage', clientComponent: '<LLPClient />' },
  { dir: 'one-person-company', title: 'One Person Company', name: 'OPCRegistrationPage', clientComponent: '<OPCClient />' },
  { dir: 'private-limited-company-registration', title: 'Private Limited Company Registration', name: 'PrivateLimitedCompanyPage', clientComponent: '<PrivateLimitedClient />' },
  { dir: 'sole-proprietorship', title: 'Sole Proprietorship', name: 'SoleProprietorshipPage', clientComponent: '<SoleProprietorshipClient />' },
  { dir: 'startup-india-registration', title: 'Startup India Registration', name: 'StartupIndiaPage', clientComponent: '<StartupIndiaClient />' }
];

for (const entry of dirs) {
  const pagePath = path.join(process.cwd(), 'src/app', entry.dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // Add alternates: canonical if it doesn't exist
    if (!content.includes('alternates: {')) {
      content = content.replace(/openGraph: \{/, `alternates: {
    canonical: 'https://compliancebharo.com/${entry.dir}',
  },
  openGraph: {`);
    }

    // Add JSON-LD if it doesn't exist
    if (!content.includes('application/ld+json')) {
      const jsonLdContent = `
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '${entry.title}',
    provider: {
      '@type': 'Organization',
      name: 'Compliance Bharo',
      url: 'https://compliancebharo.com',
    },
    url: 'https://compliancebharo.com/${entry.dir}',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      ${entry.clientComponent}
    </>
  );
`;
      // We need to replace the return statement of the export default function
      const functionRegex = new RegExp(`export default function ${entry.name}\\(\\) \\{[\\s\\S]*?return ${entry.clientComponent};\\n\\}`);
      content = content.replace(functionRegex, `export default function ${entry.name}() {${jsonLdContent}}`);
      
      fs.writeFileSync(pagePath, content);
      console.log(`Updated ${entry.dir}`);
    }
  }
}
