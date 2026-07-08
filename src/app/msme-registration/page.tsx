import type { Metadata } from 'next';
import MSMEClient from './MSMEClient';

export const metadata: Metadata = {
  title: 'Udyam Registration Online - MSME Certificate From ₹499 | ComplianceBharo',
  description:
    'Register your business under Udyam (MSME) with expert assistance — eligibility assessment, Aadhaar OTP verification support, NIC code selection, and certificate download. Government registration is free; ComplianceBharo professional fee starts at ₹499.',
  keywords: [
    'Udyam registration online',
    'MSME registration India',
    'Udyam certificate download',
    'MSME classification limits',
    'Udyam vs Udyog Aadhaar',
    'MSME registration documents',
    'Udyam registration process',
    'MSME benefits India',
    'NIC code for Udyam',
    'ComplianceBharo Udyam registration',
  ],
  openGraph: {
    title: 'Udyam Registration Online - MSME Certificate From ₹499 | ComplianceBharo',
    description:
      'End-to-end Udyam/MSME registration support — eligibility check, document preparation, NIC code selection, and certificate delivery, with lifetime validity and no renewal required.',
    type: 'website',
  },
};

export default function MsmeRegistrationPage() {
  return <MSMEClient />;
}
