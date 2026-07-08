import type { Metadata } from 'next';
import ITR2Client from './ITR2Client';

export const metadata: Metadata = {
  title: 'ITR-2 Return Filing Online - ₹2,999 | ComplianceBharo',
  description:
    'File your ITR-2 return for capital gains, multiple house properties, and foreign income/assets with expert review — Schedule CG, Schedule FA, and DTAA support. ComplianceBharo professional fee starting at ₹2,999.',
  keywords: [
    'ITR-2 return filing',
    'ITR-2 filing online',
    'capital gains tax return',
    'Schedule CG filing',
    'Schedule FA foreign assets',
    'NRI ITR filing',
    'crypto VDA tax filing',
    'multiple house property ITR',
    'ITR-2 filing 2026',
    'ComplianceBharo ITR-2 filing',
  ],
  openGraph: {
    title: 'ITR-2 Return Filing Online - ₹2,999 | ComplianceBharo',
    description:
      'Complete ITR-2 filing support for individuals and HUFs with capital gains, multiple properties, and foreign income/assets — accurate computation, reconciliation, and e-verification.',
    type: 'website',
  },
};

export default function ITR2ReturnFilingPage() {
  return <ITR2Client />;
}
