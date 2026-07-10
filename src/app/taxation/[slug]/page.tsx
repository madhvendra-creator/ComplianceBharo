import type { Metadata } from 'next';
import { TAXATION_DATABASE } from '../../../lib/taxation-data';
import TaxationPageClient from './TaxationPageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = TAXATION_DATABASE[slug as keyof typeof TAXATION_DATABASE];

  if (!data) {
    return {
      title: 'Taxation Services | ComplianceBharo',
      description: 'Taxation and accounting services from ComplianceBharo.',
      alternates: {
        canonical: `/taxation/${slug}`,
      },
    };
  }

  const title = data.title ? `${data.title} | ComplianceBharo` : 'Taxation Services | ComplianceBharo';
  const description = data.desc || 'Taxation and accounting services from ComplianceBharo.';
  const url = `https://compliancebharo.com/taxation/${slug}`;

  return {
    title,
    description,
    keywords: [data.title, 'taxation', 'GST', 'ITR', 'accounting', 'India'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Compliance Bharo',
      images: [
        {
          url: 'https://compliancebharo.com/logo.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://compliancebharo.com/logo.png'],
    },
  };
}

export default async function TaxationPage({ params }: Props) {
  const { slug } = await params;
  const data = TAXATION_DATABASE[slug as keyof typeof TAXATION_DATABASE];

  let jsonLd = null;
  if (data) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: data.title,
          description: data.desc,
          provider: {
            '@type': 'Organization',
            name: 'Compliance Bharo',
            url: 'https://compliancebharo.com',
          },
          areaServed: {
            '@type': 'Country',
            name: 'India',
          },
          url: `https://compliancebharo.com/taxation/${slug}`,
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
              name: 'Taxation Services',
              item: 'https://compliancebharo.com/taxation',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: data.title,
              item: `https://compliancebharo.com/taxation/${slug}`,
            },
          ],
        }
      ],
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <TaxationPageClient />
    </>
  );
}
