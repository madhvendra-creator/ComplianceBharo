'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import PopupForm from '../../components/PopupForm';
import { submitLead } from '../../actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'types', label: 'Types of Accounting' },
  { id: 'who-needs', label: 'Who Needs This' },
  { id: 'by-entity', label: 'By Entity Type' },
  { id: 'why-matters', label: 'Why It Matters' },
  { id: 'bookkeeping', label: 'Bookkeeping Services' },
  { id: 'accounting', label: 'Accounting Services' },
  { id: 'in-house', label: 'In-House vs Outsourced' },
  { id: 'process', label: 'Our Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'compliance', label: 'Compliance & Deadlines' },
  { id: 'software', label: 'Software We Use' },
  { id: 'pricing-factors', label: 'Pricing Factors' },
  { id: 'faq', label: "FAQ's" },
];

const pricingInclusions = [
  'Monthly Profit & Loss Statement',
  'Balance Sheet Preparation',
  'Cash Flow Statement',
  'Bank Reconciliation (All Accounts)',
  'GST Computation & GSTR-1/3B Filing Support',
  'TDS Calculation & Quarterly Returns',
  'Income Tax Planning & Advisory',
  'Zoho Books / Tally Setup Included',
  'Dedicated Tax Professional',
  'Monthly Review Call & WhatsApp Support',
];

const heroFeatures = [
  'Monthly Profit & Loss and Balance Sheet',
  'GST Return Filing Support (GSTR-1, 3B, 9)',
  'TDS Computation & Quarterly Returns',
  'Bank Reconciliation & Cash Flow Reports',
  'Income Tax Planning & ITR Filing Support',
  'Dedicated Finance Professional & Monthly Review Calls',
  'Zoho Books / Tally Setup Included',
  'Audit Support & MCA Filing Coordination',
];

const overviewComparisonRows: string[][] = [
  ['Focus', 'Recording individual transactions as they happen — sales, purchases, receipts, and payments', 'Interpreting and summarising the recorded data into a coherent financial picture'],
  ['Output', 'Ledgers, day books, and reconciled bank records', 'Profit & Loss statement, Balance Sheet, MIS reports, and tax computations'],
  ['Frequency', 'Daily or weekly, as an ongoing activity', 'Monthly, quarterly, or annual, built on top of the bookkeeping already done'],
  ['Skillset Required', 'Accurate data entry and familiarity with accounting software', 'Knowledge of accounting standards, tax law, and financial analysis — typically handled by a qualified accountant'],
];

const whoNeeds = [
  { title: 'Startups & Early-Stage Businesses', desc: 'A startup burning through its first rounds of funding needs clean books from day one — investors and auditors alike expect to see organised financials, and retrofitting a year of messy transactions later is far more expensive than recording them correctly as they happen.' },
  { title: 'Small & Medium Enterprises', desc: 'An SME juggling sales, purchases, payroll, and GST across multiple counters or branches benefits from a dedicated bookkeeping function that keeps daily operations separate from the owner\'s time, freeing them up to actually run the business.' },
  { title: 'Freelancers & Independent Professionals', desc: 'Even a solo consultant or freelancer needs enough of a record to file an accurate ITR, justify expenses claimed, and — where GST-registered — reconcile invoices against returns filed, without necessarily needing full-scale accounting infrastructure.' },
  { title: 'Private Limited Companies & LLPs', desc: 'Incorporated entities carry statutory obligations — annual financial statements, a mandatory audit for companies, and board-level reporting — that simply can\'t be met without accurate, continuously maintained books through the year.' },
  { title: 'E-Commerce Businesses', desc: 'Marketplace settlements, platform fees, multi-state GST implications, and high transaction volumes make e-commerce bookkeeping considerably more involved than a typical services business, and errors here compound quickly across hundreds of small transactions.' },
  { title: 'Retail & Trading Businesses', desc: 'Inventory-heavy businesses need their books to track purchases, stock movement, and sales margins accurately, since these numbers feed directly into GST reconciliation and into knowing which products are actually profitable.' },
];

const whyMattersCards = [
  { title: 'Financial Clarity', desc: 'Properly maintained books tell you exactly where the business stands at any point — what\'s owed, what\'s receivable, and what\'s actually been earned, rather than a rough sense based on the bank balance.' },
  { title: 'Tax Compliance Readiness', desc: 'Accurate, up-to-date books make ITR filing, GST return reconciliation, and tax audit preparation straightforward, instead of a scramble to reconstruct a year\'s transactions right before a deadline.' },
  { title: 'Audit Readiness', desc: 'Whether it\'s a statutory audit, a tax audit, or a one-off due diligence request from an investor, well-organised books mean the audit process moves quickly instead of stalling on missing records.' },
  { title: 'Cash Flow Control', desc: 'Tracking receivables and payables in real time helps you see cash crunches coming — and collect from customers or plan payments to vendors — well before they become a problem.' },
  { title: 'Lender/Investor Confidence', desc: 'Banks, NBFCs, and investors all lean on financial statements to assess a business, and consistent, credible books are often the difference between a smooth approval and repeated queries.' },
  { title: 'Informed Growth Decisions', desc: 'Decisions like hiring, pricing, or expanding into a new product line are only as good as the numbers behind them — accurate books are what let you make those calls with actual data instead of guesswork.' },
];

const bookkeepingIncluded = [
  { title: 'Daily Transaction Recording', desc: 'Every sale, purchase, receipt, and payment gets logged against the correct ledger head as it occurs, so the books never fall behind actual business activity.' },
  { title: 'Bank & Credit Card Reconciliation', desc: 'Bank and credit card statements are matched against recorded entries each period, surfacing missed transactions, duplicate entries, or bank charges that haven\'t been booked yet.' },
  { title: 'Accounts Payable & Receivable Tracking', desc: 'Outstanding vendor bills and customer invoices are tracked separately, so you always know what\'s due to be paid and what\'s due to be collected.' },
  { title: 'Payroll Processing Support', desc: 'Salary computation, statutory deductions, and payslip generation are handled in coordination with your payroll cycle, feeding directly into the books each month.' },
  { title: 'GST-Mapped Bookkeeping', desc: 'Transactions are recorded with the correct GST treatment from the start — tax rate, place of supply, and HSN/SAC mapping — rather than being corrected retroactively at return time.' },
  { title: 'Monthly MIS Reports', desc: 'A monthly management information summary gives you a snapshot of income, expenses, and key ratios without needing to dig through the raw ledgers yourself.' },
];

const accountingIncluded = [
  { title: 'Financial Statement Preparation', desc: 'Profit & Loss statements and Balance Sheets are prepared from the reconciled books, giving a formal, period-end view of the business\'s financial position.' },
  { title: 'GST Accounting & ITC Reconciliation', desc: 'GST liability and Input Tax Credit are reconciled against GSTR-1, GSTR-3B, and GSTR-2B on an ongoing basis, so return filing draws on numbers that are already verified.' },
  { title: 'TDS Computation & Filing Support', desc: 'TDS deductible on payments — salaries, professional fees, rent, and contractor payments — is computed correctly and tracked toward the quarterly TDS return filing.' },
  { title: 'Management Accounting & MIS Dashboards', desc: 'Beyond the statutory statements, we put together MIS views — expense trends, margin analysis, department-wise costs — tailored to what actually helps you run the business.' },
  { title: 'Accounts Finalisation', desc: 'At year-end, the books are closed, adjusting entries are passed, and the final trial balance is prepared as the basis for the annual financial statements and tax return.' },
  { title: 'Payroll Accounting', desc: 'Salary, statutory contributions, and related liabilities are accounted for correctly each period, keeping payroll figures consistent with what\'s reported for TDS and PF/ESI.' },
  { title: 'Multi-Entity Consolidation (For Group Companies)', desc: 'Where a business operates through multiple entities, we consolidate individual books into a group-level financial view, with inter-company transactions identified and eliminated correctly.' },
];

const processSteps = [
  { title: 'Onboarding & Financial Assessment', desc: 'We review your current books (or lack of them), understand your business model, transaction volume, and existing software, and map out exactly what needs to be set up or cleaned up.' },
  { title: 'Chart of Accounts Setup', desc: 'A chart of accounts tailored to your business — the right ledger heads for your specific revenue streams, expense categories, and GST treatment — is set up before any transaction is recorded.' },
  { title: 'Transaction Recording', desc: 'Sales, purchases, receipts, and payments are recorded on an ongoing basis directly against the chart of accounts, keeping the books current rather than backlogged.' },
  { title: 'Bank & Ledger Reconciliation', desc: 'Bank statements and internal ledgers are reconciled each period, catching discrepancies while they\'re still easy to trace back to a specific transaction.' },
  { title: 'GST/TDS Mapping', desc: 'Every relevant transaction is tagged with its correct GST and TDS treatment, so the numbers feeding into your monthly/quarterly returns are already reconciled rather than reconstructed at filing time.' },
  { title: 'Monthly Reporting', desc: 'A monthly close produces your P&L, Balance Sheet extract, and MIS summary, giving you a regular, dependable view of the business\'s financial position.' },
  { title: 'Compliance Deadline Tracking', desc: 'GST return dates, TDS deposit and filing dates, and advance tax instalments are tracked against your books, so nothing statutory slips because the underlying data wasn\'t ready in time.' },
  { title: 'Year-End Closing & Audit Support', desc: 'At financial year-end, we finalise the books, prepare the annual financial statements, and support whatever audit — statutory or tax — your business is required to undergo.' },
];

const documentsRows: string[][] = [
  ['Bank statements', 'To reconcile recorded transactions against actual account activity and catch missed or duplicate entries'],
  ['Sales and purchase invoices', 'The primary source documents for revenue and expense entries, and for GST input/output matching'],
  ['Expense receipts', 'To substantiate deductible expenses and keep the expense ledger accurate'],
  ['Payroll records', 'To post salary, PF/ESI, and TDS-on-salary entries correctly each month'],
  ['Existing books of account (if any)', 'To establish opening balances and continue seamlessly from wherever your records currently stand'],
  ['GST returns filed to date', 'To reconcile GST accounting entries against what has already been reported to the department'],
  ['Previous year\'s financial statements', 'To carry forward opening balances and maintain year-on-year comparability'],
];

const accountingTypesRows: string[][] = [
  ['Financial Accounting', 'Recording, classifying, and summarising transactions into Profit & Loss statements, Balance Sheets, and cash flow statements as per applicable accounting standards.', 'All registered companies and LLPs', 'Companies Act, 2013 (Sec. 129)'],
  ['Tax Accounting', 'Structuring the books to compute income tax, GST, and TDS liabilities correctly, and to support ITR and return filing.', 'Any business with taxable income or GST registration', 'Income-tax Act & GST Act'],
  ['Management Accounting', 'Internal reporting — budgets, MIS dashboards, variance and margin analysis — built to support business decisions rather than statutory filing.', 'Growing businesses that need data to make operating decisions', 'Not statutory (advisory)'],
  ['Cost Accounting', 'Tracking material, labour, and overhead costs per product, project, or department to understand true profitability.', 'Manufacturing and project-based businesses', 'Cost Records & Audit Rules, 2014 (specified industries)'],
  ['Forensic Accounting', 'Examining records to detect fraud or errors and to support disputes, investigations, or due diligence.', 'Businesses facing disputes, fraud concerns, or investigation', 'Case-specific'],
  ['Cloud Accounting', 'Maintaining live books on cloud platforms (Zoho Books, Tally, QuickBooks) with bank feeds and real-time access.', 'Remote teams, startups, and multi-location businesses', 'Same statutory basis as financial accounting'],
  ['Bookkeeping', 'Day-to-day recording of every sale, purchase, receipt, and payment — the foundation all other accounting is built on.', 'Every business, regardless of size', 'Companies Act Sec. 128 / IT Act Sec. 44AA'],
  ['Audit Support', 'Preparing audit-ready statements, schedules, and notes, and coordinating with statutory or tax auditors.', 'Businesses above the applicable audit threshold', 'Companies Act & IT Act Sec. 44AB'],
];

const entityRequirementsRows: string[][] = [
  ['Private Limited Company', 'Companies Act, 2013', 'AOC-4, MGT-7, ITR-6, GST returns', 'Turnover above the Sec. 44AB limit'],
  ['One Person Company (OPC)', 'Companies Act, 2013', 'AOC-4, MGT-7, ITR-6', 'Turnover above the Sec. 44AB limit'],
  ['Limited Liability Partnership (LLP)', 'LLP Act, 2008', 'Form 8, Form 11, ITR-5', 'Turnover above the Sec. 44AB limit'],
  ['Partnership Firm', 'Indian Partnership Act, 1932 & IT Act', 'ITR-5, GST returns (if registered)', 'Turnover above the Sec. 44AB limit'],
  ['Sole Proprietorship', 'Income-tax Act (Sec. 44AA)', 'ITR-3 / ITR-4, GST returns (if registered)', 'Turnover above the Sec. 44AB limit'],
  ['Section 8 (Non-Profit) Company', 'Companies Act, 2013 + 12AB/80G', 'AOC-4, MGT-7, ITR-7, grant accounting', 'As applicable to the entity'],
];

const complianceCalendarRows: string[][] = [
  ['Books of account (Companies Act)', 'Sec. 128', 'Maintained continuously at the registered office', 'Fine on officers in default (₹50,000 to ₹5,00,000)'],
  ['Financial statements filing', 'AOC-4', 'Within 30 days of the AGM', 'Additional fee of ₹100 per day of delay'],
  ['Annual return', 'MGT-7', 'Within 60 days of the AGM', 'Additional fee of ₹100 per day of delay'],
  ['GST monthly returns', 'GSTR-1 / GSTR-3B', 'Monthly (per the notified due dates)', 'Late fee plus interest on tax due'],
  ['GST annual return', 'GSTR-9', 'By 31 December of the following year', 'Late fee capped as a % of turnover'],
  ['TDS returns', '24Q / 26Q / 27Q', 'Quarterly', 'Late-filing fee under Sec. 234E plus interest'],
  ['Income tax return', 'ITR-5 / ITR-6 (as applicable)', 'As per the notified due date (audit vs non-audit)', 'Late fee under Sec. 234F plus interest'],
  ['Books of account (IT Act)', 'Sec. 44AA', 'Maintained continuously above the threshold', 'Penalty under Sec. 271A (up to ₹25,000)'],
];

const inHouseVsOutsourcedRows: string[][] = [
  ['Monthly cost', '₹25,000 to ₹50,000 (salary + benefits)', 'From ₹4,999/month'],
  ['Expertise', 'A single individual, limited coverage', 'A team spanning accounting, GST, and TDS'],
  ['Software cost', 'Often an extra annual licence', 'Setup handled as part of the engagement'],
  ['Scaling up', 'Requires rehiring or added headcount', 'Scope adjusts as volume grows'],
  ['Leave / absence', 'Work stalls when the person is away', 'Continuity through a backup team'],
  ['Audit support', 'A separate professional is usually still needed', 'Built into the engagement'],
  ['Compliance coverage', 'Typically one or two areas', 'Companies Act, IT Act, and GST together'],
  ['Report turnaround', 'Depends on the individual', 'A fixed monthly reporting cadence'],
  ['HR overhead', 'PF, ESI, bonus, gratuity', 'None'],
];

const pricingFactors = [
  { title: 'Transaction Volume', desc: 'The number of sales, purchases, and payment entries recorded each month is the single biggest driver of effort — a handful of invoices a month costs far less to maintain than hundreds of daily transactions.' },
  { title: 'Number of Bank Accounts', desc: 'Each additional bank or credit card account adds its own reconciliation cycle, so a business operating multiple accounts needs proportionally more reconciliation work.' },
  { title: 'GST Registration Status', desc: 'A GST-registered business needs every transaction mapped and reconciled against GSTR-1/3B/2B, which adds a layer of work that a non-registered business doesn\'t need.' },
  { title: 'Payroll Headcount', desc: 'More employees means more payroll entries, statutory deduction computations, and reconciliation between payroll and the books each month.' },
  { title: 'Industry Complexity', desc: 'Certain business models — e-commerce with marketplace settlements, multi-state operations, or inventory-heavy trading — require more involved bookkeeping than a straightforward services business.' },
];

const faqs = [
  { q: 'Is maintaining books of accounts mandatory in India?', a: 'For companies and LLPs, yes — the Companies Act, 2013 and the LLP Act, 2008 both require proper books to be maintained. For proprietorships and partnerships, it becomes mandatory once turnover or income crosses the thresholds specified under Section 44AA of the Income-tax Act, though maintaining clean records is a good idea regardless of whether it\'s strictly required.' },
  { q: 'What is the difference between bookkeeping and accounting?', a: 'Bookkeeping is the day-to-day recording of transactions — sales, purchases, receipts, and payments. Accounting builds on those records to produce financial statements, management reports, and tax computations. Bookkeeping is the input; accounting is the analysis and output built on top of it.' },
  { q: 'What determines the cost of accounting services?', a: 'Primarily transaction volume, the number of bank accounts to reconcile, whether the business is GST-registered, payroll headcount, and how complex the business model is — an e-commerce operation with marketplace settlements typically needs more work than a straightforward services business of similar size.' },
  { q: 'Is my financial data secure with ComplianceBharo?', a: 'Yes — your financial records and business data are handled with restricted access limited to the team working on your account, and are used solely for delivering the bookkeeping and accounting services you\'ve engaged us for.' },
  { q: 'Which accounting software do you work with?', a: 'We work within commonly used Indian accounting platforms such as Tally, Zoho Books, and QuickBooks, adapting to whichever system your business already uses, or helping you set one up if you\'re starting fresh.' },
  { q: 'How do I get started?', a: 'Share your current books (or confirm there aren\'t any yet), your transaction volume, and your GST/payroll situation with us — we\'ll assess the scope and set up your chart of accounts before we begin recording transactions.' },
  { q: 'Can messy or backlogged books be cleaned up?', a: 'Yes, this is one of the more common starting points — we reconstruct missing periods from bank statements and available invoices, reconcile them against what\'s already been filed, and bring the books current before moving into regular monthly bookkeeping.' },
  { q: 'Do I need a bookkeeper or a CA?', a: 'It depends on what you need — day-to-day transaction recording can be handled by a bookkeeper, while financial statement preparation, tax computation, and audit support benefit from a qualified accountant\'s oversight. Our engagement covers both, with the right level of expertise applied to each task.' },
  { q: 'Is GST accounting included in your service?', a: 'Yes — GST-mapped bookkeeping and reconciliation against GSTR-1, GSTR-3B, and GSTR-2B are part of the standard scope for any GST-registered business we work with.' },
  { q: 'How often are reports delivered?', a: 'Monthly, as a standard cadence — you get a P&L extract, a Balance Sheet snapshot, and an MIS summary each month, with more frequent updates available if your business needs closer tracking.' },
  { q: 'Can this scale as my business grows?', a: 'Yes — the scope adjusts as your transaction volume, headcount, or entity structure grows, whether that means more frequent reconciliation, additional bank accounts, or eventually multi-entity consolidation.' },
  { q: 'Is payroll accounting included?', a: 'Payroll accounting support is included — salary entries, statutory deductions, and related liabilities are accounted for each period. Full payroll processing (payslips, statutory filings) can be scoped in as part of a broader engagement.' },
  { q: 'Do you provide TDS computation as well?', a: 'Yes, TDS computation on payments like salaries, professional fees, rent, and contractor payments is part of the accounting scope, feeding directly into your quarterly TDS return filing.' },
  { q: 'What if I already use an accounting software with data in it?', a: 'We can work directly within your existing setup — reviewing what\'s already recorded, reconciling it against bank statements and invoices, and continuing bookkeeping from there rather than starting over.' },
  { q: 'Do you prepare financial statements for a tax audit or bank loan?', a: 'Yes — accurate, reconciled books maintained through the year make it straightforward to produce the financial statements needed for a tax audit, a bank loan application, or investor due diligence, without a last-minute reconstruction exercise.' },
  { q: 'Is this service suitable for a business with no GST registration?', a: 'Yes — bookkeeping and accounting are useful independent of GST status. A non-registered business still needs accurate books for income tax filing, loan applications, and simply understanding its own financial position.' },
  { q: 'What happens if my transaction volume changes significantly during the year?', a: 'We reassess the scope and adjust accordingly — a sudden jump in transaction volume, a new bank account, or new hires all factor into the ongoing engagement rather than requiring a fresh setup.' },
  { q: 'How does ComplianceBharo assist with accounting and bookkeeping?', a: 'We handle the full cycle — setting up your chart of accounts, recording transactions, reconciling banks and ledgers, mapping GST/TDS correctly, delivering monthly financial reports, tracking your compliance deadlines, and supporting year-end closing and audit preparation, with a dedicated accounting expert assigned to your account.' },
  { q: 'What are the main types of accounting services?', a: 'The common categories are financial accounting (statements and reporting), tax accounting (income tax, GST, and TDS), management accounting (budgets and MIS), cost accounting (product and project costing), forensic accounting (fraud and dispute work), and cloud accounting (live books on platforms like Zoho Books or Tally). Bookkeeping underpins all of them, and audit support sits on top. Most businesses start with financial plus tax accounting and add the rest as they grow.' },
  { q: 'How long must books of account be preserved?', a: 'For companies, the Companies Act requires books of account and relevant records to be kept for at least eight financial years immediately preceding the current year. Where an investigation is ongoing, the authorities can require records to be kept longer. It is good practice to retain digital backups even beyond the statutory minimum.' },
  { q: 'What is the difference between Ind AS and Indian GAAP?', a: 'Indian Accounting Standards (Ind AS) are the IFRS-converged standards that apply to larger companies once they cross the prescribed net-worth threshold. Smaller companies follow the older Accounting Standards (Indian GAAP). The practical difference is that Ind AS leans more on fair-value measurement, while Indian GAAP is largely historical-cost based. Which set applies is determined by your company size and category.' },
  { q: 'What is cost accounting and who needs it?', a: 'Cost accounting tracks the cost of producing goods or delivering services — materials, labour, and overheads — broken down by product, project, or department. It helps with pricing and profitability decisions. Certain notified industries are also required to maintain cost records and have them audited under the Cost Records and Audit Rules.' },
  { q: 'What is forensic accounting?', a: 'Forensic accounting is the examination of financial records to detect fraud, trace discrepancies, or support a dispute or investigation. It is engagement-based rather than a monthly service, and is typically brought in when a business faces a specific concern, a partner dispute, or a due-diligence review.' },
  { q: 'Do freelancers and small proprietors need professional accounting?', a: 'Yes, once income or turnover crosses the thresholds in Section 44AA of the Income-tax Act, maintaining books becomes mandatory. Even below those thresholds, clean records make ITR filing accurate, substantiate expense claims, and are usually required for loan or visa applications. A lighter bookkeeping-first engagement often suits this group well.' },
  { q: 'How does the MCA audit-trail requirement affect my books?', a: 'Companies are required to use accounting software that keeps an unalterable edit log (audit trail) of every transaction, with the feature enabled throughout the financial year. Both Zoho Books and Tally support this. We make sure the audit trail is switched on from the start of the engagement so it does not become an issue at audit time.' },
  { q: 'Is outsourcing accounting better than hiring in-house?', a: 'For most startups and SMEs, outsourcing is more cost-effective — you get a team spanning accounting, GST, and TDS instead of a single hire, without PF, ESI, or software overhead, and coverage does not stop when one person is on leave. Larger businesses with a dedicated finance function may prefer in-house, and many use a hybrid: in-house data entry with outsourced compliance and reporting.' },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function DataTable({ headers, rows, dm }: { headers: string[]; rows: string[][]; dm: boolean }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border ${dm ? 'border-slate-800' : 'border-slate-200'}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className={dm ? 'bg-slate-900/60' : 'bg-slate-100'}>
            {headers.map((h) => (
              <th key={h} className={`whitespace-nowrap px-4 py-3 font-semibold ${dm ? 'text-white' : 'text-slate-900'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${dm ? 'divide-slate-800' : 'divide-slate-200'}`}>
          {rows.map((row, i) => (
            <tr key={i} className={dm ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 align-top leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AccountingServicesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  const dm = isDarkMode;

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-140px 0px -60% 0px' }
    );

    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Bookkeeping & Accounting Services" />

      {/* Hero + Lead Form */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6 lg:pt-2">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold ${dm ? 'border-green-500/25 bg-green-500/5 text-green-400' : 'border-green-500/35 bg-green-500/10 text-green-700'}`}>
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                1,200+ Businesses Served | Dedicated Professional for Every Client
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]`}>
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Professional Accounting</span>{' '}
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Services</span>{' '}
                <span className={dm ? 'text-white' : 'text-slate-900'}>in India</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed font-semibold ${dm ? 'text-slate-200' : 'text-slate-800'}`}>
                Expert Tax Professionals Manage Your Books, GST, TDS, and Financial Statements from{' '}
                <span className="text-brand-orange font-bold">₹4,999/month</span> - Onboarding in{' '}
                <span className="text-brand-orange font-bold">3 to 5 Working Days</span>
              </p>
              <p className={`max-w-xl text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Monthly P&L & Balance Sheet. GST/TDS Compliance. Dedicated Finance Professional. Zoho Books & Tally. Zero Hidden Charges.
              </p>

              {/* Feature Highlights Box */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 p-6 mt-2 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {heroFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckIcon className="h-5 w-5 shrink-0 text-green-300" />
                      <span className="text-sm font-semibold text-white leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review & Last Updated */}
              <div className={`flex flex-wrap items-center gap-6 mt-2 text-sm ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-orange">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Reviewed by Industry Experts & Startup Specialists.
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span>Last Updated: <strong>20 Jun 2026, 10:10 PM</strong></span>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Accounting Services"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`pt-6 pb-16 lg:pt-10 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4 ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              PRICING
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${dm ? 'text-white' : 'text-slate-900'}`}>
              Simple &amp; Transparent Pricing
            </h2>
          </div>

          <div className="relative mt-8 rounded-3xl shadow-2xl">
            <div className="bg-brand-orange px-8 pt-12 pb-24 text-center relative rounded-t-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-amber-400 text-black px-5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                  </svg>
                  MOST POPULAR
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Accounting Services Starter Package 2026
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹4,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">IncorpX professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on the application type and authority review
              </div>
            </div>

            <div className={`relative -mt-16 mx-4 sm:mx-8 mb-8 rounded-2xl p-6 sm:p-8 shadow-xl ${dm ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  <CheckIcon className="w-3.5 h-3.5" /> Application support
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-orange-500/10 text-brand-orange border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> Professional assistance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {pricingInclusions.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckIcon className={`h-5 w-5 shrink-0 ${dm ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`text-[15px] font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="px-8 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105 bg-brand-orange hover:bg-orange-600 shadow-orange-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.428-1.428L13.5 18.75l1.183-.394a2.25 2.25 0 001.428-1.428l.394-1.183.394 1.183a2.25 2.25 0 001.428 1.428l1.183.394-1.183.394a2.25 2.25 0 00-1.428 1.428z" /></svg>
                  Get Expert Assistance
                </a>
              </div>

              <p className={`text-center text-xs mb-4 max-w-2xl mx-auto leading-relaxed ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
                *Listed amounts are IncorpX professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
              </p>

              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-amber-400">★★★★</span><span className="text-slate-300">★</span>
                  <span className={`font-semibold ${dm ? 'text-slate-300' : 'text-slate-700'}`}>4.9/5 based on 1000+ reviews</span>
                </div>
              </div>

              <div className={`pt-6 border-t flex flex-wrap justify-center gap-6 sm:gap-8 text-sm font-semibold ${dm ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Transparent scope
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                  Secure payment
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" /></svg>
                  Application support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-xl ${dm ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => scrollToSection(e, tab.id)}
                className={`whitespace-nowrap py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-orange text-brand-orange'
                    : `border-transparent ${dm ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">

          {/* 1. Overview */}
          <div id="overview" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Are Bookkeeping and Accounting Services?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Bookkeeping</strong> is the day-to-day recording of a business's financial transactions — every sale, purchase, receipt, and payment, logged against the correct ledger head as it happens. It's the raw, ongoing data-entry layer that everything else in a business's finances is built on top of.
              </p>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Accounting</strong> takes those recorded transactions and turns them into something usable — financial statements, management reports, and tax computations. Where bookkeeping asks "what happened," accounting asks "what does it mean," summarising and interpreting the data into a Profit & Loss statement, a Balance Sheet, and the numbers a business actually needs to file returns, apply for a loan, or make a decision.
              </p>
              <p>
                The two functions are related but distinct, and the table below lays out exactly where one ends and the other begins.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Bookkeeping', 'Accounting']} rows={overviewComparisonRows} dm={dm} />
          </div>

          {/* 2. Types of Accounting */}
          <div id="types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Types of Accounting Services in India</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Accounting isn't a single function — different types serve different purposes, and most businesses need more than one working together.
            </p>
            <DataTable headers={['Type', 'What It Covers', 'Who Needs It', 'Governing Basis']} rows={accountingTypesRows} dm={dm} />
          </div>

          {/* 3. Who Needs These Services */}
          <div id="who-needs" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Needs These Services</h2>
            <div className="space-y-4">
              {whoNeeds.map((w) => (
                <div key={w.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{w.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Accounting Requirements by Entity Type */}
          <div id="by-entity" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Accounting Requirements by Entity Type</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The governing law, mandatory filings, and audit threshold that apply to your books depend on how your business is incorporated.
            </p>
            <DataTable headers={['Entity Type', 'Governing Law', 'Key Filings', 'Tax Audit Threshold']} rows={entityRequirementsRows} dm={dm} />
          </div>

          {/* 5. Why Bookkeeping Matters */}
          <div id="why-matters" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Why Bookkeeping Matters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyMattersCards.map((b) => (
                <div key={b.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className={`text-sm font-bold mb-1.5 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                      <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. What's Included - Bookkeeping */}
          <div id="bookkeeping" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What&apos;s Included — Bookkeeping Services</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The ongoing, day-to-day layer of work that keeps your books current and reconciled.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookkeepingIncluded.map((item) => (
                <div key={item.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. What's Included - Accounting */}
          <div id="accounting" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What&apos;s Included — Accounting Services</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The higher-level work built on top of your bookkeeping — statements, reconciliations, and reporting.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accountingIncluded.map((item) => (
                <div key={item.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. In-House vs Outsourced Accounting */}
          <div id="in-house" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>In-House vs Outsourced Accounting</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Hiring an in-house accountant isn't the only option — here's how it stacks up against outsourcing to a dedicated team.
            </p>
            <DataTable headers={['Parameter', 'In-House Accountant', 'Outsourced (ComplianceBharo)']} rows={inHouseVsOutsourcedRows} dm={dm} />
          </div>

          {/* 9. Our Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Our Process</h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {processSteps.map((step, i) => (
                <div key={i} className="relative pl-8">
                  <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ring-4 ${dm ? 'bg-slate-950 ring-slate-950 text-brand-orange border border-brand-orange' : 'bg-white ring-white text-brand-orange border border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              This is what we typically ask for to set up or take over your bookkeeping — not everything applies to every business, especially at the very first onboarding stage.
            </p>
            <DataTable headers={['Document', "Why It's Needed"]} rows={documentsRows} dm={dm} />
          </div>

          {/* 11. Compliance & Deadlines */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Accounting Compliance & Deadlines</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The recurring statutory deadlines that well-maintained books need to feed into, and what's at stake if they're missed.
            </p>
            <DataTable headers={['Requirement', 'Form', 'Typical Deadline', 'Penalty for Default']} rows={complianceCalendarRows} dm={dm} />
            <p className={`text-xs mt-4 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              Statutory figures and due dates change from time to time — confirm the current position for your entity before relying on them.
            </p>
          </div>

          {/* 12. Accounting Software We Work With */}
          <div id="software" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Accounting Software We Work With</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                We work within whichever accounting platform your business already uses, or help you set one up if you're starting from scratch. Among Indian businesses, the most commonly used platforms are <strong className={dm ? 'text-white' : 'text-slate-900'}>Tally</strong>, <strong className={dm ? 'text-white' : 'text-slate-900'}>Zoho Books</strong>, and <strong className={dm ? 'text-white' : 'text-slate-900'}>QuickBooks</strong> — and our team is comfortable operating in any of them.
              </p>
              <p>
                If you're migrating from spreadsheets or switching between platforms, we handle the transition as part of onboarding, so historical data carries over correctly rather than starting from a blank slate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Tally', 'Zoho Books', 'QuickBooks'].map((s) => (
                <span key={s} className={`px-4 py-2 rounded-full text-sm font-semibold border ${dm ? 'border-slate-800 bg-slate-900/40 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 13. Pricing Factors */}
          <div id="pricing-factors" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What Affects Your Final Quote</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The ₹4,999/month starting price covers a straightforward, low-volume setup. The actual scope and quote depend on a handful of factors specific to your business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricingFactors.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 14. FAQs */}
          <div id="faq" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`rounded-2xl border overflow-hidden transition-colors ${dm ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/70' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-semibold text-base pr-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{faq.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {activeFaq === i && (
                    <div className={`px-6 pb-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className={`rounded-2xl border p-6 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Need Help?</h3>
              <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Have questions about bookkeeping or accounting support for your business? Let our experts help you figure out the right scope.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${dm ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer isDarkMode={dm} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName="Accounting Services"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
