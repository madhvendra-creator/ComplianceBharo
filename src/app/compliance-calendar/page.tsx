import type { Metadata } from 'next'
import ComplianceCalendar from './ComplianceCalendar'

export const metadata: Metadata = {
  title: 'Compliance Calendar FY 2026-27 | ComplianceBharo',
  description:
    'Every statutory due date for Indian businesses in FY 2026-27 — GST returns (GSTR-1, GSTR-3B, GSTR-9), TDS deposits and returns, ROC filings (AOC-4, MGT-7, ADT-1), advance tax installments, and ESI/PF contributions. Filter by entity type.',
  keywords: [
    'compliance calendar 2026-27',
    'GST return due dates',
    'TDS filing deadlines India',
    'ROC annual filing dates',
    'MGT-7 due date',
    'AOC-4 due date',
    'advance tax dates FY 2026-27',
    'India statutory compliance',
    'Pvt Ltd compliance calendar',
    'LLP annual filing',
  ],
  openGraph: {
    title: 'India Compliance Calendar FY 2026-27 | ComplianceBharo',
    description:
      'All statutory due dates for Pvt Ltd, LLP, Partnership & Proprietorship businesses — organized month-wise and category-wise.',
    type: 'website',
  },
}

export default function ComplianceCalendarPage() {
  return <ComplianceCalendar />
}
