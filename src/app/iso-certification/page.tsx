import type { Metadata } from 'next';
import IsoCertificationClient from './IsoCertificationClient';

export const metadata: Metadata = {
  title: 'ISO Certification Services | ComplianceBharo',
  description: 'Expert assistance for ISO Certification Services. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['iso certification services', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/iso-certification',
  },
  openGraph: {
    title: 'ISO Certification Services | ComplianceBharo',
    description: 'Expert assistance for ISO Certification Services. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/iso-certification',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'ISO Certification Services',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/iso-certification',
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
            name: 'ISO Certification Services',
            item: 'https://compliancebharo.com/iso-certification',
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
      <IsoCertificationClient />
    </>
  );
}
