import type { Metadata } from 'next';
import ProprietorshipComplianceClient from './ProprietorshipComplianceClient';

export const metadata: Metadata = {
  title: 'Proprietorship Compliance Filing Online - ₹2,499 | ComplianceBharo',
  description:
    'Complete annual compliance for sole proprietorships: ITR-3/ITR-4 filing, GST returns and GSTR-9, Udyam/MSME update, and tax audit support. Expert-assisted, starting at ₹2,499 with ComplianceBharo.',
  keywords: [
    'proprietorship compliance',
    'sole proprietorship tax filing',
    'ITR-3 vs ITR-4',
    'presumptive taxation 44AD 44ADA',
    'proprietorship GST return filing',
    'tax audit threshold proprietorship',
    'proprietorship annual compliance checklist',
    'Udyam MSME annual update',
    'proprietorship compliance cost',
    'ComplianceBharo proprietorship compliance',
  ],
  openGraph: {
    title: 'Proprietorship Compliance Filing Online - ₹2,499 | ComplianceBharo',
    description:
      'Annual filings for sole proprietors — income tax return, GST returns and GSTR-9 annual return, MSME/Udyam update, and tax audit assistance, all handled end-to-end.',
    type: 'website',
  },
};

export default function ProprietorshipCompliancePage() {
  return <ProprietorshipComplianceClient />;
}
