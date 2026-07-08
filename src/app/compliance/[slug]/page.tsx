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
    };
  }

  return {
    title: data.rich?.seoTitle ?? `${data.title} | ComplianceBharo`,
    description: data.rich?.seoDescription ?? data.desc,
  };
}

export default function CompliancePage() {
  return <CompliancePageClient />;
}
