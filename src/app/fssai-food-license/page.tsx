import type { Metadata } from 'next';
import FssaiFoodLicenseClient from './FssaiFoodLicenseClient';

export const metadata: Metadata = {
  title: 'FSSAI Food License Registration | ComplianceBharo',
  description: 'Expert assistance for FSSAI Food License Registration. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['fssai food license registration', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/fssai-food-license',
  },
  openGraph: {
    title: 'FSSAI Food License Registration | ComplianceBharo',
    description: 'Expert assistance for FSSAI Food License Registration. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/fssai-food-license',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'FSSAI Food License Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/fssai-food-license',
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
            name: 'FSSAI Food License Registration',
            item: 'https://compliancebharo.com/fssai-food-license',
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
      <FssaiFoodLicenseClient />
    </>
  );
}
