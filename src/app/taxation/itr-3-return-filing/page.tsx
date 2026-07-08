import type { Metadata } from 'next';
import ITR3Client from './ITR3Client';

export const metadata: Metadata = {
  title: 'ITR-3 Return Filing Online - ₹3,999 | ComplianceBharo',
  description:
    'File your ITR-3 return for business or professional income with expert review — Balance Sheet & P&L preparation, tax audit coordination, and depreciation computation. ComplianceBharo professional fee starting at ₹3,999.',
  keywords: [
    'ITR-3 return filing',
    'ITR-3 filing online',
    'business income tax return',
    'professional income ITR filing',
    'tax audit form 3CA 3CB 3CD',
    'F&O trading income tax',
    'presumptive taxation opt out',
    'balance sheet P&L ITR',
    'ITR-3 filing 2026',
    'ComplianceBharo ITR-3 filing',
  ],
  openGraph: {
    title: 'ITR-3 Return Filing Online - ₹3,999 | ComplianceBharo',
    description:
      'Complete ITR-3 filing support for individuals and HUFs with business or professional income — Balance Sheet/P&L preparation, tax audit coordination, and accurate schedule filing.',
    type: 'website',
  },
};

export default function ITR3ReturnFilingPage() {
  return <ITR3Client />;
}
