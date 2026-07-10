import type { Metadata } from 'next';
import PartnershipFirmClient from './PartnershipFirmClient';

export const metadata: Metadata = {
  title: 'Partnership Firm Registration | ComplianceBharo',
  description: 'Expert assistance for Partnership Firm Registration. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['partnership firm registration', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/partnership-firm-registration',
  },
  openGraph: {
    title: 'Partnership Firm Registration | ComplianceBharo',
    description: 'Expert assistance for Partnership Firm Registration. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/partnership-firm-registration',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Partnership Firm Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/partnership-firm-registration',
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
            name: 'Partnership Firm Registration',
            item: 'https://compliancebharo.com/partnership-firm-registration',
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
      <PartnershipFirmClient />
    </>
  );
}
