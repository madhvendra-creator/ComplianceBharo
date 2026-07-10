import type { Metadata } from 'next';
import OPCClient from './OPCClient';

export const metadata: Metadata = {
  title: 'One Person Company (OPC) Registration - ₹2,299 | ComplianceBharo',
  description:
    'Register your One Person Company online in 7-10 working days. SPICe+ filing, nominee (Form INC-3), DIN, PAN, TAN & GSTIN included. Expert CA/CS support, transparent pricing from ₹2,299.',
  keywords: [
    'one person company registration',
    'OPC registration online',
    'OPC registration cost 2026',
    'SPICe+ OPC registration',
    'OPC nominee Form INC-3',
    'MCA OPC registration',
    'OPC vs Private Limited',
    'OPC to Pvt Ltd conversion',
    'single person company India',
    'ComplianceBharo OPC registration',
  ],
  alternates: {
    canonical: 'https://compliancebharo.com/one-person-company',
  },
  openGraph: {
    title: 'One Person Company (OPC) Registration - ₹2,299 | ComplianceBharo',
    description:
      'Run a company solo with full corporate benefits — limited liability, separate legal identity, and nominee protection. Register your OPC online in 7-10 working days.',
    type: 'website',
  },
};

export default function OPCPage() {
  return <OPCClient />;
}
