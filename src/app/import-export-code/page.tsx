import type { Metadata } from 'next';
import ImportExportCodeClient from './ImportExportCodeClient';

export const metadata: Metadata = {
  title: 'Import Export Code (IEC) Registration | ComplianceBharo',
  description: 'Expert assistance for Import Export Code (IEC) Registration. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['import export code (iec) registration', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/import-export-code',
  },
  openGraph: {
    title: 'Import Export Code (IEC) Registration | ComplianceBharo',
    description: 'Expert assistance for Import Export Code (IEC) Registration. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/import-export-code',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Import Export Code (IEC) Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/import-export-code',
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
            name: 'Import Export Code (IEC) Registration',
            item: 'https://compliancebharo.com/import-export-code',
          },
        ],
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImportExportCodeClient />
    </>
  );
}
