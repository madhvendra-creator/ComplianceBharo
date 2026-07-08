import type { Metadata } from 'next';
import { TRADEMARK_DATABASE } from '../../../lib/trademark-data';
import TrademarkPageClient from './TrademarkPageClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = TRADEMARK_DATABASE[slug];

  if (!data) {
    return {
      title: 'Trademark & IP Services | ComplianceBharo',
      description: 'Trademark, copyright, and patent registration services from ComplianceBharo.',
    };
  }

  return {
    title: data.rich?.seoTitle ?? `${data.title} | ComplianceBharo`,
    description: data.rich?.seoDescription ?? data.desc,
  };
}

export default function TrademarkIpPage() {
  return <TrademarkPageClient />;
}
