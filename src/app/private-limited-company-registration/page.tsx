import type { Metadata } from 'next';
import PrivateLimitedClient from './PrivateLimitedClient';

export const metadata: Metadata = {
  title: 'Private Limited Company Registration - ₹2,499 | ComplianceBharo',
  description:
    'Register your Private Limited Company online in 7-10 working days. SPICe+ filing, DIN, PAN, TAN, GSTIN & bank account included. Expert CA/CS support, transparent pricing, ComplianceBharo fee from ₹2,499.',
  keywords: [
    'private limited company registration',
    'pvt ltd registration online',
    'SPICe+ company registration',
    'company incorporation India',
    'MCA company registration',
    'CIN registration',
    'startup company registration',
    'company registration cost 2026',
    'DIN DSC registration',
    'ComplianceBharo company registration',
  ],
  openGraph: {
    title: 'Private Limited Company Registration - ₹2,499 | ComplianceBharo',
    description:
      'India\'s most preferred business structure for startups and SMEs. Limited liability, perpetual existence, and easy fundraising — registered online in 7-10 working days.',
    type: 'website',
  },
};

export default function PrivateLimitedCompanyPage() {
  return <PrivateLimitedClient />;
}
