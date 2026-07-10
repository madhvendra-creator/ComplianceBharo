import type { Metadata } from 'next';
import StartupIndiaClient from './StartupIndiaClient';

export const metadata: Metadata = {
  title: 'Startup India / DPIIT Registration - ₹999 | ComplianceBharo',
  description:
    'Get DPIIT recognition under Startup India and unlock a 3-year tax holiday (Section 80-IAC), Angel Tax exemption, 80% patent fee rebate, and Fund of Funds access. Free government fee, expert filing from ₹999.',
  keywords: [
    'Startup India registration',
    'DPIIT recognition',
    'DPIIT certificate',
    'Section 80-IAC tax exemption',
    'Angel Tax exemption Section 56',
    'Startup India Seed Fund Scheme',
    'DPIIT eligibility criteria',
    'startup patent fee rebate',
    'Fund of Funds for Startups',
    'ComplianceBharo Startup India',
  ],
  alternates: {
    canonical: 'https://compliancebharo.com/startup-india-registration',
  },
  openGraph: {
    title: 'Startup India / DPIIT Registration - ₹999 | ComplianceBharo',
    description:
      'Get your DPIIT Recognition Certificate and unlock India\'s most powerful startup incentives — tax holiday, angel tax exemption, IPR rebates, and funding access.',
    type: 'website',
  },
};

export default function StartupIndiaPage() {
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Startup India Registration',
        provider: {
          '@type': 'Organization',
          name: 'Compliance Bharo',
          url: 'https://compliancebharo.com',
        },
        url: 'https://compliancebharo.com/startup-india-registration',
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
            name: 'Startup India Registration',
            item: 'https://compliancebharo.com/startup-india-registration',
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
      <StartupIndiaClient />
    </>
  );
}
