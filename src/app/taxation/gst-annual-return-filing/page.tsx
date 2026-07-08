import type { Metadata } from 'next';
import GSTR9Client from './GSTR9Client';

export const metadata: Metadata = {
  title: 'GSTR-9 Annual Return Filing Online - ₹2,999 | ComplianceBharo',
  description:
    'File your GST Annual Return (GSTR-9) and GSTR-9C reconciliation statement with expert help. GSTR-1/GSTR-3B reconciliation, ITC matching with GSTR-2B, HSN summary, and portal filing. ComplianceBharo professional fee starting at ₹2,999.',
  keywords: [
    'GSTR-9 annual return filing',
    'GST annual return online',
    'GSTR-9C reconciliation statement',
    'GSTR-9 due date',
    'GSTR-9 late fee',
    'GSTR-9 vs GSTR-9C',
    'GST annual return turnover above 2 crore',
    'ITC reconciliation GSTR-2B',
    'HSN summary GSTR-9',
    'ComplianceBharo GSTR-9 filing',
  ],
  openGraph: {
    title: 'GSTR-9 Annual Return Filing Online - ₹2,999 | ComplianceBharo',
    description:
      'End-to-end GSTR-9 and GSTR-9C filing support — GSTR-1/GSTR-3B/books reconciliation, ITC matching, HSN summary preparation, and portal filing with ARN confirmation.',
    type: 'website',
  },
};

export default function GSTR9AnnualReturnPage() {
  return <GSTR9Client />;
}
