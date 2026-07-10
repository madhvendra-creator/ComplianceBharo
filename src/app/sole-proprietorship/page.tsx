import type { Metadata } from 'next';
import SoleProprietorshipClient from './SoleProprietorshipClient';

export const metadata: Metadata = {
  title: 'Sole Proprietorship Registration Online - ₹999 | ComplianceBharo',
  description:
    'Register your Sole Proprietorship online in 3-5 working days. GST, Udyam (MSME), Shop & Establishment licence and current bank account setup included. Expert support, transparent pricing from ₹999.',
  keywords: [
    'sole proprietorship registration',
    'proprietorship registration online',
    'Udyam MSME registration',
    'GST registration for proprietorship',
    'Shop and Establishment registration',
    'proprietorship vs OPC',
    'proprietorship registration cost 2026',
    'presumptive taxation 44AD 44ADA',
    'convert proprietorship to Pvt Ltd',
    'ComplianceBharo sole proprietorship',
  ],
  alternates: {
    canonical: 'https://compliancebharo.com/sole-proprietorship',
  },
  openGraph: {
    title: 'Sole Proprietorship Registration Online - ₹999 | ComplianceBharo',
    description:
      'The simplest, most cost-effective way to legally start your business in India. Get GST, Udyam, and bank account setup done in 3-5 working days.',
    type: 'website',
  },
};

export default function SoleProprietorshipPage() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Sole Proprietorship',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/sole-proprietorship',
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
            name: 'Sole Proprietorship',
            item: 'https://compliancebharo.com/sole-proprietorship',
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
      <SoleProprietorshipClient />
    </>
  );
}
