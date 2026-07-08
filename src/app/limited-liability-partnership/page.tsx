import type { Metadata } from 'next';
import LLPClient from './LLPClient';

export const metadata: Metadata = {
  title: 'LLP Registration Online - ₹2,499 | ComplianceBharo',
  description:
    'Register your Limited Liability Partnership online in 7-10 working days. FiLLiP filing, DPIN, DSC, LLP Agreement drafting and Form 3 filing included. Expert CA/CS support, transparent pricing from ₹2,499.',
  keywords: [
    'LLP registration online',
    'limited liability partnership registration',
    'FiLLiP form registration',
    'LLP registration cost 2026',
    'LLP agreement drafting',
    'DPIN registration',
    'MCA LLP registration',
    'LLP vs Pvt Ltd',
    'LLPIN registration',
    'ComplianceBharo LLP registration',
  ],
  openGraph: {
    title: 'LLP Registration Online - ₹2,499 | ComplianceBharo',
    description:
      'Combine the flexibility of a partnership with the protection of limited liability. Register your LLP online in 7-10 working days with ComplianceBharo.',
    type: 'website',
  },
};

export default function LLPPage() {
  return <LLPClient />;
}
