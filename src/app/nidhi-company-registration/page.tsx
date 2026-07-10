import type { Metadata } from 'next';
import NidhiCompanyClient from './NidhiCompanyClient';

export const metadata: Metadata = {
  title: 'Nidhi Company Registration | ComplianceBharo',
  description: 'Expert assistance for Nidhi Company Registration. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['nidhi company registration', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/nidhi-company-registration',
  },
  openGraph: {
    title: 'Nidhi Company Registration | ComplianceBharo',
    description: 'Expert assistance for Nidhi Company Registration. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/nidhi-company-registration',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Nidhi Company Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/nidhi-company-registration',
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
            name: 'Nidhi Company Registration',
            item: 'https://compliancebharo.com/nidhi-company-registration',
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
      <NidhiCompanyClient />
    </>
  );
}
