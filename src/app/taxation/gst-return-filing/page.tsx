import type { Metadata } from 'next';
import GSTReturnClient from './GSTReturnClient';

export const metadata: Metadata = {
  title: 'GST Return Filing Online - ₹499/month | ComplianceBharo',
  description:
    'File your GSTR-1 and GSTR-3B returns on time with expert invoice verification, ITC reconciliation, and GSTR-2A/2B matching. ComplianceBharo professional fee starting at ₹499/month.',
  keywords: [
    'GST return filing online',
    'GSTR-1 filing',
    'GSTR-3B filing',
    'ITC reconciliation service',
    'QRMP scheme filing',
    'GST return due date',
    'GSTR-2A GSTR-2B matching',
    'monthly GST filing service',
    'GST return filing cost',
    'ComplianceBharo GST return filing',
  ],
  openGraph: {
    title: 'GST Return Filing Online - ₹499/month | ComplianceBharo',
    description:
      'Complete GST return filing support — invoice verification, ITC reconciliation, GSTR-2A/2B matching, tax liability calculation, and on-time GSTR-1/GSTR-3B filing every period.',
    type: 'website',
  },
};

export default function GSTReturnFilingPage() {
  return <GSTReturnClient />;
}
