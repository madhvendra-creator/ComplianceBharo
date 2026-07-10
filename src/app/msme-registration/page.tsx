import type { Metadata } from 'next';
import MSMEClient from './MSMEClient';

export const metadata: Metadata = {
  title: 'Udyam Registration Online - MSME Certificate From ₹499 | ComplianceBharo',
  description:
    'Register your business under Udyam (MSME) with expert assistance — eligibility assessment, Aadhaar OTP verification support, NIC code selection, and certificate download. Government registration is free; ComplianceBharo professional fee starts at ₹499.',
  keywords: [
    'Udyam registration online',
    'MSME registration India',
    'Udyam certificate download',
    'MSME classification limits',
    'Udyam vs Udyog Aadhaar',
    'MSME registration documents',
    'Udyam registration process',
    'MSME benefits India',
    'NIC code for Udyam',
    'ComplianceBharo Udyam registration',
  ],
  alternates: {
    canonical: 'https://compliancebharo.com/msme-registration',
  },
  openGraph: {
    title: 'Udyam Registration Online - MSME Certificate From ₹499 | ComplianceBharo',
    description:
      'End-to-end Udyam/MSME registration support — eligibility check, document preparation, NIC code selection, and certificate delivery, with lifetime validity and no renewal required.',
    type: 'website',
  },
};

export default function MsmeRegistrationPage() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'MSME Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/msme-registration',
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
            name: 'MSME Registration',
            item: 'https://compliancebharo.com/msme-registration',
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
      <MSMEClient />
    </>
  );
}
