import type { Metadata } from 'next';
import ITR4Client from './ITR4Client';

export const metadata: Metadata = {
  title: 'ITR-4 (Sugam) Return Filing Online - ₹1,999 | ComplianceBharo',
  description:
    'File your ITR-4 (Sugam) return under presumptive taxation (Section 44AD/44ADA/44AE) with expert review — no books of account required. ComplianceBharo professional fee starting at ₹1,999.',
  keywords: [
    'ITR-4 return filing',
    'Sugam form filing',
    'presumptive taxation ITR',
    'Section 44AD filing',
    'Section 44ADA filing',
    'Section 44AE filing',
    'freelancer ITR filing',
    'small business ITR filing',
    'ITR-4 filing 2026',
    'ComplianceBharo ITR-4 filing',
  ],
  openGraph: {
    title: 'ITR-4 (Sugam) Return Filing Online - ₹1,999 | ComplianceBharo',
    description:
      'Simple, fast presumptive taxation ITR filing for small businesses, professionals, and goods transport operators — no books of account required.',
    type: 'website',
  },
};

export default function ITR4ReturnFilingPage() {
  return <ITR4Client />;
}
