import type { Metadata } from 'next';
import BusinessTaxFilingClient from './BusinessTaxFilingClient';

export const metadata: Metadata = {
  title: 'Business Tax Filing Online - ₹4,999 | ComplianceBharo',
  description:
    'Professional business ITR filing for Companies, LLPs, Partnership Firms and Proprietorships — tax audit coordination, MAT/AMT computation, and DSC-based e-filing. ComplianceBharo professional fee starting at ₹4,999.',
  keywords: [
    'business tax filing',
    'company ITR-6 filing',
    'LLP ITR-5 filing',
    'partnership firm tax return',
    'proprietorship tax filing',
    'MAT computation section 115JB',
    'AMT computation section 115JC',
    'tax audit section 44AB',
    'business income tax return 2026',
    'ComplianceBharo business tax filing',
  ],
  openGraph: {
    title: 'Business Tax Filing Online - ₹4,999 | ComplianceBharo',
    description:
      'Complete business tax filing support — entity-specific ITR filing, tax audit coordination, MAT/AMT computation, and DSC-based e-filing with post-filing notice support.',
    type: 'website',
  },
};

export default function BusinessTaxFilingPage() {
  return <BusinessTaxFilingClient />;
}
