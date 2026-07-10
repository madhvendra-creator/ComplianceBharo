import type { Metadata } from 'next';
import ProducerCompanyClient from './ProducerCompanyClient';

export const metadata: Metadata = {
  title: 'Producer Company Registration | ComplianceBharo',
  description: 'Expert assistance for Producer Company Registration. Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['producer company registration', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/producer-company-registration',
  },
  openGraph: {
    title: 'Producer Company Registration | ComplianceBharo',
    description: 'Expert assistance for Producer Company Registration. Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/producer-company-registration',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Producer Company Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/producer-company-registration',
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
            name: 'Producer Company Registration',
            item: 'https://compliancebharo.com/producer-company-registration',
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
      <ProducerCompanyClient />
    </>
  );
}
