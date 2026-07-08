import type { Metadata } from 'next';
import ITR6Client from './ITR6Client';

export const metadata: Metadata = {
  title: 'ITR-6 Company Return Filing Online - ₹7,999 | ComplianceBharo',
  description:
    'File ITR-6 for your Private Limited, Public Limited, OPC or Section 8 Company with expert support for tax audit, MAT computation under Section 115JB, and DSC-based e-filing. ComplianceBharo professional fee starting at ₹7,999.',
  keywords: [
    'ITR-6 return filing',
    'company income tax return',
    'ITR-6 filing online',
    'MAT computation section 115JB',
    'tax audit form 3CA-3CD',
    'private limited company ITR',
    'company tax return filing India',
    'DSC based ITR filing',
    'corporate tax return 2026',
    'ComplianceBharo ITR-6',
  ],
  openGraph: {
    title: 'ITR-6 Company Return Filing Online - ₹7,999 | ComplianceBharo',
    description:
      'Complete ITR-6 filing support for companies — statutory audit coordination, tax audit, MAT computation, and DSC-based e-filing with post-filing notice support.',
    type: 'website',
  },
};

export default function ITR6ReturnFilingPage() {
  return <ITR6Client />;
}
