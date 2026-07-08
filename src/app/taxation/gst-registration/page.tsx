import type { Metadata } from 'next';
import GSTRegistrationClient from './GSTRegistrationClient';

export const metadata: Metadata = {
  title: 'GST Registration Online - ₹399 | ComplianceBharo',
  description:
    'Register for GST online and get your GSTIN in 3-7 days with expert document preparation, GST REG-01 filing, ARN generation within 24 hours, and clarification handling. ComplianceBharo professional fee starting at ₹399.',
  keywords: [
    'GST registration online',
    'GSTIN registration India',
    'GST REG-01 filing',
    'new GST registration',
    'GST registration for freelancers',
    'GST registration for e-commerce sellers',
    'composition scheme GST',
    'GST registration documents',
    'GST registration cost',
    'ComplianceBharo GST registration',
  ],
  openGraph: {
    title: 'GST Registration Online - ₹399 | ComplianceBharo',
    description:
      'Complete GST registration support — document verification, GST REG-01 filing, ARN generation, clarification handling, and registration certificate delivery, 100% online and paperless.',
    type: 'website',
  },
};

export default function GSTRegistrationPage() {
  return <GSTRegistrationClient />;
}
