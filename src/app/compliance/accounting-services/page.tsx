import type { Metadata } from 'next';
import AccountingServicesClient from './AccountingServicesClient';

export const metadata: Metadata = {
  title: 'Bookkeeping & Accounting Services Online - From ₹2,499/month | ComplianceBharo',
  description:
    'Professional bookkeeping and accounting services for startups, SMEs, and companies: daily transaction recording, bank reconciliation, GST accounting, TDS computation, payroll accounting, and monthly financial statements. Starting at ₹2,499/month with ComplianceBharo.',
  keywords: [
    'accounting services India',
    'bookkeeping services online',
    'outsourced accounting for startups',
    'GST accounting reconciliation',
    'monthly financial statements service',
    'bookkeeping vs accounting',
    'payroll accounting support',
    'small business bookkeeping India',
    'accounting services cost',
    'ComplianceBharo accounting services',
  ],
  openGraph: {
    title: 'Bookkeeping & Accounting Services Online - From ₹2,499/month | ComplianceBharo',
    description:
      'End-to-end bookkeeping and accounting support — transaction recording, reconciliation, GST/TDS accounting, payroll, and monthly MIS reporting, handled by a dedicated team.',
    type: 'website',
  },
};

export default function AccountingServicesPage() {
  return <AccountingServicesClient />;
}
