const fs = require('fs');
const path = require('path');

const dirs = [
  { dir: 'digital-signature-certificate', title: 'Digital Signature Certificate (DSC)', name: 'DigitalSignatureCertificate' },
  { dir: 'fssai-food-license', title: 'FSSAI Food License Registration', name: 'FssaiFoodLicense' },
  { dir: 'import-export-code', title: 'Import Export Code (IEC) Registration', name: 'ImportExportCode' },
  { dir: 'iso-certification', title: 'ISO Certification Services', name: 'IsoCertification' },
  { dir: 'nidhi-company-registration', title: 'Nidhi Company Registration', name: 'NidhiCompany' },
  { dir: 'partnership-firm-registration', title: 'Partnership Firm Registration', name: 'PartnershipFirm' },
  { dir: 'producer-company-registration', title: 'Producer Company Registration', name: 'ProducerCompany' },
];

for (const entry of dirs) {
  const dirPath = path.join(process.cwd(), 'src/app', entry.dir);
  const pagePath = path.join(dirPath, 'page.tsx');
  const clientName = `${entry.name}Client`;
  const clientPath = path.join(dirPath, `${clientName}.tsx`);

  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf-8');
    if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
      // Rename page.tsx to Client.tsx
      // Need to fix the component name in the client file if it conflicts, but let's just rename the file
      let newContent = content.replace(/export default function ([A-Za-z0-9_]+)/, `export default function ${clientName}`);
      fs.writeFileSync(clientPath, newContent);

      // Create new page.tsx
      const serverComponentContent = `import type { Metadata } from 'next';
import ${clientName} from './${clientName}';

export const metadata: Metadata = {
  title: '${entry.title} | ComplianceBharo',
  description: 'Expert assistance for ${entry.title}. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['${entry.title.toLowerCase()}', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/${entry.dir}',
  },
  openGraph: {
    title: '${entry.title} | ComplianceBharo',
    description: 'Expert assistance for ${entry.title}. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/${entry.dir}',
    type: 'website',
  },
};

export default function Page() {
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
      <${clientName} />
    </>
  );
}
`;
      fs.writeFileSync(pagePath, serverComponentContent);
      console.log(`Refactored ${entry.dir}`);
    }
  }
}
