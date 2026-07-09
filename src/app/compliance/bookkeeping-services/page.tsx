import type { Metadata } from 'next';
import BookkeepingServicesClient from './BookkeepingServicesClient';

export const metadata: Metadata = {
  title: 'Bookkeeping Services Online in India - From ₹1,499/month | ComplianceBharo',
  description:
    'Professional bookkeeping services for startups, freelancers, and SMEs in India: daily transaction recording, weekly bank reconciliation, accounts payable/receivable tracking, and GST-ready books on Zoho Books or Tally. Monthly reports and a dedicated bookkeeper. From ₹1,499/month with ComplianceBharo.',
  keywords: [
    'bookkeeping services India',
    'online bookkeeping services',
    'bookkeeping for small business India',
    'bank reconciliation services',
    'accounts payable receivable outsourcing',
    'GST-ready bookkeeping',
    'virtual bookkeeping services',
    'startup bookkeeping India',
    'cloud bookkeeping Zoho Tally',
    'bookkeeping services cost',
  ],
  openGraph: {
    title: 'Bookkeeping Services Online in India - From ₹1,499/month | ComplianceBharo',
    description:
      'Daily transaction recording, weekly bank reconciliation, and GST-ready books maintained by a dedicated bookkeeper on Zoho Books or Tally, with monthly reports.',
    type: 'website',
  },
};

export default function BookkeepingServicesPage() {
  return <BookkeepingServicesClient />;
}
