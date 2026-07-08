import type { Metadata } from 'next';
import ITR5Client from './ITR5Client';

export const metadata: Metadata = {
  title: 'ITR-5 Return Filing Online - ₹4,999 | ComplianceBharo',
  description:
    'File your ITR-5 return for Partnership Firms, LLPs, and AOPs with expert review — P&L, Balance Sheet, Section 40(b) compliance, and AMT computation. ComplianceBharo professional fee starting at ₹4,999.',
  keywords: [
    'ITR-5 return filing',
    'ITR-5 filing online',
    'partnership firm tax return',
    'LLP income tax return',
    'AOP BOI tax filing',
    'Section 40(b) partner remuneration',
    'AMT computation section 115JC',
    'tax audit form 3CD',
    'ITR-5 filing 2026',
    'ComplianceBharo ITR-5 filing',
  ],
  openGraph: {
    title: 'ITR-5 Return Filing Online - ₹4,999 | ComplianceBharo',
    description:
      'Complete ITR-5 filing support for Partnership Firms, LLPs, AOPs and BOIs — P&L/Balance Sheet preparation, Section 40(b) computation, AMT assessment, and DSC-based filing.',
    type: 'website',
  },
};

export default function ITR5ReturnFilingPage() {
  return <ITR5Client />;
}
