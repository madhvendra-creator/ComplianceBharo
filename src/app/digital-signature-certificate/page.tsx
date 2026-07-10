import type { Metadata } from 'next';
import DigitalSignatureCertificateClient from './DigitalSignatureCertificateClient';

export const metadata: Metadata = {
  title: 'Digital Signature Certificate (DSC) | ComplianceBharo',
  description: 'Expert assistance for Digital Signature Certificate (DSC). Fast, reliable, and affordable services by ComplianceBharo.',
  keywords: ['digital signature certificate (dsc)', 'compliance bharo', 'registration', 'online', 'India'],
  alternates: {
    canonical: 'https://compliancebharo.com/digital-signature-certificate',
  },
  openGraph: {
    title: 'Digital Signature Certificate (DSC) | ComplianceBharo',
    description: 'Expert assistance for Digital Signature Certificate (DSC). Fast, reliable, and affordable services by ComplianceBharo.',
    url: 'https://compliancebharo.com/digital-signature-certificate',
    type: 'website',
  },
};

export default function Page() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Digital Signature Certificate (DSC)',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/digital-signature-certificate',
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
            name: 'Digital Signature Certificate',
            item: 'https://compliancebharo.com/digital-signature-certificate',
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
      <DigitalSignatureCertificateClient />
    </>
  );
}
