import type { Metadata } from 'next';
import TANClient from './TANClient';

export const metadata: Metadata = {
  title: 'TAN Registration Online - ₹999 | ComplianceBharo',
  description:
    'Apply for your TAN (Tax Deduction and Collection Account Number) online with expert Form 49B preparation, document verification, and NSDL/UTIITSL filing support. ComplianceBharo professional fee starting at ₹999.',
  keywords: [
    'TAN registration online',
    'tax deduction account number',
    'form 49B application',
    'TAN application NSDL',
    'TDS TCS compliance India',
    'section 203A TAN',
    'new TAN number apply',
    'TAN correction online',
    'TAN vs PAN difference',
    'ComplianceBharo TAN registration',
  ],
  openGraph: {
    title: 'TAN Registration Online - ₹999 | ComplianceBharo',
    description:
      'Complete TAN registration support — eligibility assessment, Form 49B preparation, document verification, NSDL/UTIITSL e-filing, and post-allotment TDS/TCS compliance guidance.',
    type: 'website',
  },
};

export default function TANRegistrationPage() {
  return <TANClient />;
}
