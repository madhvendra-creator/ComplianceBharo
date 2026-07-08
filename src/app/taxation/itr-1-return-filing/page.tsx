import type { Metadata } from 'next';
import ITR1Client from './ITR1Client';

export const metadata: Metadata = {
  title: 'ITR-1 Sahaj Return Filing Online - ₹499 | ComplianceBharo',
  description:
    'File your ITR-1 (Sahaj) return for salaried individuals and pensioners with expert review — Form 26AS/AIS reconciliation, old vs new regime comparison, and e-verification support. ComplianceBharo professional fee starting at ₹499.',
  keywords: [
    'ITR-1 return filing',
    'Sahaj form filing',
    'ITR-1 filing online',
    'salaried individual ITR filing',
    'ITR-1 eligibility',
    'income tax return for salaried employees',
    'old vs new tax regime ITR-1',
    'Form 26AS AIS reconciliation',
    'ITR-1 filing 2026',
    'ComplianceBharo ITR-1 filing',
  ],
  openGraph: {
    title: 'ITR-1 Sahaj Return Filing Online - ₹499 | ComplianceBharo',
    description:
      'Simple, fast ITR-1 filing support for salaried individuals and pensioners — eligibility check, Form 26AS/AIS reconciliation, regime comparison, and e-verification.',
    type: 'website',
  },
};

export default function ITR1ReturnFilingPage() {
  return <ITR1Client />;
}
