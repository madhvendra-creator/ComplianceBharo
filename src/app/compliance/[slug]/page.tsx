import type { Metadata } from 'next';
import { COMPLIANCE_DATABASE } from '../../../lib/compliance-data';
import CompliancePageClient from './CompliancePageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPLIANCE_DATABASE[slug];

  if (!data) {
    return {
      title: 'Compliance Services | ComplianceBharo',
      description: 'ROC, MCA, and statutory compliance services from ComplianceBharo.',
      alternates: {
        canonical: `/compliance/${slug}`,
      },
    };
  }

  const title = data.rich?.seoTitle ?? `${data.title} | ComplianceBharo`;
  const description = data.rich?.seoDescription ?? data.desc;
  const url = `https://compliancebharo.com/compliance/${slug}`;

  return {
    title,
    description,
    keywords: (data.rich as any)?.keywords || [data.title, 'compliance', 'ROC', 'MCA', 'India'],
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

export default async function CompliancePage({ params }: Props) {
  const { slug } = await params;
  const data = COMPLIANCE_DATABASE[slug];

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
          url: `https://compliancebharo.com/compliance/${slug}`,
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
              name: 'Compliance Services',
              item: 'https://compliancebharo.com/compliance',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: data.title,
              item: `https://compliancebharo.com/compliance/${slug}`,
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
      <CompliancePageClient />
    </>
  );
}
