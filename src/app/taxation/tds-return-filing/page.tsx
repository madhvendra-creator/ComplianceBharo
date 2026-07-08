import type { Metadata } from 'next';
import TDSReturnClient from './TDSReturnClient';

export const metadata: Metadata = {
  title: 'TDS Return Filing Online - ₹1,999 | ComplianceBharo',
  description:
    'File your quarterly TDS/TCS returns — Form 24Q, 26Q, 27Q, 27EQ — with expert reconciliation, FVU validation, TRACES upload, and Form 16/16A generation. ComplianceBharo professional fee starting at ₹1,999.',
  keywords: [
    'TDS return filing online',
    'form 24Q 26Q 27Q 27EQ',
    'TRACES portal filing',
    'TDS certificate form 16 16A',
    'quarterly TDS return',
    'TDS correction statement',
    'TDS return due date',
    'section 234E late fee',
    'TDS return filing cost',
    'ComplianceBharo TDS return filing',
  ],
  openGraph: {
    title: 'TDS Return Filing Online - ₹1,999 | ComplianceBharo',
    description:
      'Complete TDS/TCS return filing support — computation, challan reconciliation, FVU validation, TRACES upload, Form 16/16A generation, and correction statement assistance.',
    type: 'website',
  },
};

export default function TDSReturnFilingPage() {
  return <TDSReturnClient />;
}
