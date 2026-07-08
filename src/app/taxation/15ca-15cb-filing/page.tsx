import type { Metadata } from 'next';
import ITR15CAClient from './ITR15CAClient';

export const metadata: Metadata = {
  title: 'Form 15CA-15CB Filing Online - ₹4,999 | ComplianceBharo',
  description:
    'File Form 15CA and Form 15CB for your foreign remittance with expert DTAA treaty rate analysis, TDS determination, TRC/Form 10F verification, and bank-ready acknowledgment. ComplianceBharo professional fee starting at ₹4,999.',
  keywords: [
    'form 15CA 15CB filing',
    'foreign remittance TDS',
    'form 15CB certificate',
    'DTAA treaty rate India',
    'section 195 TDS foreign payment',
    'tax residency certificate TRC',
    'form 10F filing',
    'outward remittance tax compliance',
    'form 15CA online filing',
    'ComplianceBharo 15CA 15CB',
  ],
  openGraph: {
    title: 'Form 15CA-15CB Filing Online - ₹4,999 | ComplianceBharo',
    description:
      'Complete Form 15CA-15CB filing support for foreign remittances — DTAA applicability analysis, TDS rate determination, professional certification, and bank acknowledgment with post-filing query support.',
    type: 'website',
  },
};

export default function Form15CA15CBFilingPage() {
  return <ITR15CAClient />;
}
