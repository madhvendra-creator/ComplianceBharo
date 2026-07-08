import type { Metadata } from 'next';
import IncomeTaxEFilingClient from './IncomeTaxEFilingClient';

export const metadata: Metadata = {
  title: 'Income Tax Return E-Filing Online - ₹499 | ComplianceBharo',
  description:
    'File your Income Tax Return online with expert review — Form 26AS/AIS reconciliation, old vs new regime comparison, and e-verification support. ComplianceBharo professional fee starting at ₹499.',
  keywords: [
    'income tax return e-filing',
    'ITR filing online',
    'ITR-1 ITR-2 ITR-3 ITR-4',
    'income tax e-filing portal',
    'old vs new tax regime',
    'Form 26AS AIS reconciliation',
    'income tax refund',
    'belated return filing',
    'income tax return 2026',
    'ComplianceBharo ITR filing',
  ],
  openGraph: {
    title: 'Income Tax Return E-Filing Online - ₹499 | ComplianceBharo',
    description:
      'Complete ITR e-filing support for salaried, freelance, professional and business taxpayers — form selection, reconciliation, accurate filing, and e-verification.',
    type: 'website',
  },
};

export default function IncomeTaxEFilingPage() {
  return <IncomeTaxEFilingClient />;
}
