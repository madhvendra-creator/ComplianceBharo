import type { Metadata } from 'next';
import ITR7Client from './ITR7Client';

export const metadata: Metadata = {
  title: 'ITR-7 Return Filing Online - ₹9,999 | ComplianceBharo',
  description:
    'File ITR-7 for your charitable trust, NGO, Section 8 company, or religious institution with expert support for 12AB compliance, Form 10B/10BB audit coordination, and 85% application of income verification. ComplianceBharo professional fee starting at ₹9,999.',
  keywords: [
    'ITR-7 return filing',
    'trust income tax return',
    'NGO ITR filing online',
    'Section 12AB compliance',
    'Form 10B Form 10BB audit',
    '85% application of income',
    'charitable trust tax return India',
    'Section 139(4A) filing',
    'FCRA donation reporting',
    'ComplianceBharo ITR-7',
  ],
  openGraph: {
    title: 'ITR-7 Return Filing Online - ₹9,999 | ComplianceBharo',
    description:
      'Complete ITR-7 filing support for trusts, NGOs and charitable institutions — 12AB compliance, Form 10B/10BB audit coordination, accumulation planning, and DSC-based e-filing with post-filing notice support.',
    type: 'website',
  },
};

export default function ITR7ReturnFilingPage() {
  return <ITR7Client />;
}
