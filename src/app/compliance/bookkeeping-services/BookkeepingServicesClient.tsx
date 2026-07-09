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
  { id: 'bookkeeping-vs-accounting', label: 'Bookkeeping vs Accounting' },
  { id: 'whats-included', label: "What's Included" },
  { id: 'methods', label: 'Bookkeeping Methods' },
  { id: 'who-needs', label: 'Who Needs This' },
  { id: 'process', label: 'Our Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'pricing-factors', label: 'Pricing Factors' },
  { id: 'diy-vs-professional', label: 'DIY vs Professional' },
  { id: 'faq', label: "FAQ's" },
];

const pricingInclusions = [
  'Daily Transaction Recording',
  'Weekly Bank & Card Reconciliation',
  'Accounts Payable Tracking',
  'Accounts Receivable Tracking',
  'Invoice Processing & Entry',
  'Expense Categorisation',
  'GST-Ready Book Maintenance',
  'Monthly Trial Balance',
  'Monthly P&L & Balance Sheet',
  'Cloud Software Access (Zoho Books / Tally)',
];

const heroHighlights = [
  'Daily Transaction Recording',
  'Weekly Bank Reconciliation',
  'Accounts Payable & Receivable Tracking',
  'Invoice & Expense Categorisation',
  'GST-Ready Book Maintenance',
  'Monthly Trial Balance, P&L & Balance Sheet',
  'Cloud Access (Zoho Books / Tally)',
  'Dedicated Bookkeeper Assigned',
];

const bkVsAccountingRows: string[][] = [
  ['Primary role', 'Recording and categorising every transaction as it happens', 'Interpreting those records into statements, tax computations, and advice'],
  ['Typical output', 'Cash book, journals, ledgers, and a monthly trial balance', 'Profit & Loss, Balance Sheet, MIS reports, and tax returns'],
  ['Cadence', 'Daily recording with weekly reconciliation', 'Monthly, quarterly, and year-end'],
  ['Handled by', 'A bookkeeper', 'A qualified accountant'],
  ['Legal touchpoint', 'Books of account under Sec. 44AA (IT Act) and Sec. 128 (Companies Act)', 'Financial statements under Sec. 129; tax audit under Sec. 44AB'],
  ['What it is for', 'Knowing exactly what was earned, spent, owed, and received', 'Filing returns, planning tax, and making financial decisions'],
];

const bkIncludedRows: string[][] = [
  ['Transaction recording', 'Daily', 'Every sale, purchase, receipt, and payment posted to the right ledger head'],
  ['Bank & card reconciliation', 'Weekly', 'Books matched to bank and card statements, with mismatches traced and fixed'],
  ['Accounts payable', 'Ongoing', 'Vendor bills tracked with due dates and an ageing view of what is owed'],
  ['Accounts receivable', 'Ongoing', 'Customer invoices tracked with follow-up reminders and an ageing view'],
  ['Invoice & expense entry', 'Daily', 'Invoices logged and expenses categorised against the correct account head'],
  ['GST-ready books', 'Ongoing', 'Correct HSN/SAC coding and input-credit mapping so returns reconcile cleanly'],
  ['Trial balance', 'Monthly', 'A debit-credit check confirming the books balance before month close'],
  ['Financial reports', 'Monthly', 'A P&L extract and Balance Sheet snapshot shared after each monthly close'],
  ['Cloud access', '24/7', 'Live login to your books on Zoho Books or Tally, exportable anytime'],
];

const bkMethodsRows: string[][] = [
  ['Single-entry', 'Each transaction is recorded once, like a running cash log', 'Very small businesses with simple, low-volume transactions'],
  ['Double-entry', 'Every transaction is recorded as a matching debit and credit', 'Most businesses; the practical standard as volume and turnover grow'],
  ['Cash basis', 'Entries are booked when money actually moves', 'Small proprietors and professionals tracking real cash flow'],
  ['Accrual basis', 'Entries are booked when income is earned or an expense is incurred, regardless of payment', 'Companies — accrual is the basis required under the Companies Act'],
];

const whoNeedsBk = [
  { title: 'Startups', desc: 'Investors and auditors expect clean books from day one. Recording transactions correctly as they happen is far cheaper than reconstructing a year of activity before a funding round or audit.' },
  { title: 'Freelancers & Consultants', desc: 'Once income crosses the Section 44AA threshold, maintaining books becomes mandatory. Even below it, a clean record makes ITR filing accurate and substantiates the expenses you claim.' },
  { title: 'E-Commerce Sellers', desc: 'Marketplace settlements, platform fees, and high order volumes make e-commerce books involved. Small errors compound fast across hundreds of transactions, so daily recording matters most here.' },
  { title: 'Retail & Trading Businesses', desc: 'Purchases, stock movement, supplier payables, and customer receivables all feed into GST reconciliation and into knowing which lines actually make money.' },
  { title: 'Private Limited Companies & LLPs', desc: 'Section 128 requires companies to maintain books at the registered office regardless of turnover, and those books are the base for annual filings and any statutory audit.' },
  { title: 'Growing SMEs', desc: 'As transaction volume climbs, owner-maintained books start slipping. A dedicated bookkeeping function keeps daily operations off the owner\'s plate and the books current.' },
];

const bkProcess = [
  { title: 'Share Your Business Details', desc: 'Tell us your entity type, turnover, monthly transaction volume, and current software (if any). This lets us assign the right scope and a dedicated bookkeeper.' },
  { title: 'Chart of Accounts & Software Setup', desc: 'We set up your books on Zoho Books or Tally with a chart of accounts tailored to your revenue streams and expenses, GST configuration, and opening balances.' },
  { title: 'Document Handover', desc: 'Share bank and card statements, sales and purchase invoices, and expense receipts through a secure channel. Any backlog is scoped and cleared first.' },
  { title: 'Daily Transaction Recording', desc: 'Sales, purchases, receipts, and payments are recorded daily against the correct ledger head, keeping the books current rather than backlogged.' },
  { title: 'Weekly Reconciliation', desc: 'Bank and card feeds are reconciled each week, catching missed entries, duplicates, and charges while they are still easy to trace.' },
  { title: 'Monthly Reporting', desc: 'A monthly close produces your trial balance, P&L extract, and Balance Sheet snapshot, plus a heads-up on upcoming GST, TDS, and filing deadlines.' },
];

const bkDocsRows: string[][] = [
  ['Bank & credit card statements', 'To record and reconcile actual account activity and catch missed or duplicate entries'],
  ['Sales invoices', 'The source documents for revenue entries and GST output matching'],
  ['Purchase bills', 'The source documents for expense entries and GST input-credit matching'],
  ['Expense receipts', 'To substantiate deductible expenses and keep the expense ledger accurate'],
  ['GST credentials / returns filed', 'To reconcile book entries against what has already been reported to the department'],
  ['Existing books or Tally backup', 'To establish opening balances and continue from where your records currently stand'],
  ["Previous year's financial statements", 'To carry forward opening balances and keep year-on-year figures comparable'],
];

const bkPricingFactors = [
  { title: 'Monthly Transaction Volume', desc: 'The number of entries recorded each month is the biggest driver of effort — a few dozen invoices costs far less to maintain than hundreds of daily transactions.' },
  { title: 'Number of Bank & Card Accounts', desc: 'Each additional account adds its own weekly reconciliation cycle, so businesses running several accounts need proportionally more work.' },
  { title: 'GST Registration Status', desc: 'A GST-registered business needs every entry coded and reconciled for input credit, which adds a layer that a non-registered business does not need.' },
  { title: 'Entry Method & Reporting Frequency', desc: 'Double-entry books and more frequent reporting take more effort than a simple monthly cash summary.' },
  { title: 'Backlog Clean-Up', desc: 'If prior months are unrecorded, clearing that backlog is a one-time effort scoped separately from ongoing monthly bookkeeping.' },
];

const bkDiyVsProRows: string[][] = [
  ['Time investment', "A meaningful chunk of the owner's week", 'Fully handled by your bookkeeper'],
  ['Accuracy', 'Depends on your familiarity with the software', 'Reviewed before every month close'],
  ['Software', 'A separate cost you set up and manage', 'Set up as part of the engagement'],
  ['GST readiness', 'Easy to miss coding or input-credit matching', 'Books kept GST-ready throughout the year'],
  ['Audit readiness', 'Often a year-end scramble for records', 'Books stay current all year'],
  ['Best suited for', 'Very low transaction volumes', 'Growing or higher-volume businesses'],
];

const bkFaqs = [
  { q: 'What is bookkeeping?', a: 'Bookkeeping is the day-to-day recording of every financial transaction a business makes — sales, purchases, receipts, and payments — logged against the correct ledger head. It is the foundation that accounting, GST filing, and tax returns are all built on.' },
  { q: 'What is the difference between single-entry and double-entry bookkeeping?', a: 'Single-entry records each transaction once, like a running cash log, and suits very small, low-volume businesses. Double-entry records every transaction as a matching debit and credit so the books always balance, and it becomes the practical standard as volume and turnover grow.' },
  { q: 'What is the difference between cash basis and accrual basis?', a: 'On a cash basis, entries are booked when money actually moves. On an accrual basis, they are booked when income is earned or an expense is incurred, regardless of when it is paid. Companies are required to follow the accrual basis under the Companies Act.' },
  { q: 'What records does a bookkeeper maintain?', a: 'Typically cash books, sales and purchase journals, general ledgers, bank reconciliation statements, a trial balance, and accounts payable and receivable registers, along with copies of invoices and bills. The specific books depend on your entity type and turnover.' },
  { q: 'What is bank reconciliation?', a: 'Bank reconciliation matches the transactions recorded in your books against your bank and card statements. It surfaces missed entries, duplicates, and charges that have not been booked. We reconcile weekly so discrepancies are caught while they are still easy to trace.' },
  { q: 'What is a chart of accounts?', a: 'A chart of accounts is the organised index of every ledger head in your books — grouped into assets, liabilities, equity, income, and expenses. Setting it up correctly for your specific business at the start makes every later entry faster and more consistent.' },
  { q: 'What are accounts payable and accounts receivable?', a: 'Accounts payable is what your business owes suppliers for goods or services received but not yet paid. Accounts receivable is what customers owe you for goods or services delivered on credit. Tracking both, with ageing views, keeps cash flow visible.' },
  { q: 'What is a trial balance and why does it matter?', a: 'A trial balance lists every ledger balance at a point in time to confirm that total debits equal total credits. If they do not match, it flags a recording error. It is the check we run before closing the books each month.' },
  { q: 'How long must books of account be preserved?', a: 'Under the Income Tax Act, books are generally kept for six years from the end of the relevant assessment year (longer if an assessment is pending). Under the Companies Act, companies keep books for eight financial years preceding the current one. Retaining digital backups beyond the minimum is good practice.' },
  { q: 'Is maintaining books of account mandatory?', a: 'For companies and LLPs, yes — the Companies Act and LLP Act require it. For proprietors and professionals, it becomes mandatory once income or turnover crosses the thresholds under Section 44AA of the Income-tax Act. Failure to maintain prescribed books can attract a penalty under Section 271A.' },
  { q: 'Do you work on the cloud or on desktop software?', a: 'Both. We maintain books on Zoho Books for cloud access with bank feeds and real-time dashboards, or on Tally for businesses that prefer it. Whichever you already use, we adapt to it; if you are starting fresh, we set it up.' },
  { q: 'Can you clean up a backlog of unrecorded months?', a: 'Yes. We reconstruct missing periods from bank statements and available invoices, reconcile them against what has already been filed, and bring the books current before moving into regular monthly bookkeeping. Backlog is scoped separately from the ongoing service.' },
  { q: 'Is bookkeeping the same as accounting?', a: 'No. Bookkeeping is the recording layer — capturing transactions accurately. Accounting is the analysis layer built on top — preparing financial statements, computing tax, and advising on decisions. Many businesses start with bookkeeping and add accounting as they grow.' },
  { q: 'Do I still need an accountant if I have bookkeeping?', a: 'Bookkeeping keeps your records accurate and current; an accountant or CA is still involved for financial statement finalisation, tax computation, and audit. Clean books make that work faster and cheaper, and our accounting service picks up directly from your bookkeeping when you need it.' },
  { q: 'Is GST return filing included in bookkeeping?', a: 'Bookkeeping keeps your books GST-ready — correct HSN/SAC coding and input-credit matching — so returns reconcile cleanly. The actual filing of GSTR-1, GSTR-3B, and GSTR-9 is a separate service that can be bundled with your bookkeeping.' },
  { q: 'How do I receive my books and reports?', a: 'You get login access to your books on Zoho Books or Tally with real-time visibility, and a monthly report pack — trial balance, P&L extract, and Balance Sheet snapshot — after each monthly close, exportable in PDF or Excel.' },
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

export default function BookkeepingServicesClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Bookkeeping Services" />

      {/* Hero + Lead Form */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6 lg:pt-2">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold ${dm ? 'border-green-500/25 bg-green-500/5 text-green-400' : 'border-green-500/35 bg-green-500/10 text-green-700'}`}>
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Cloud-Based • GST-Ready Books • Dedicated Bookkeeper
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]`}>
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Bookkeeping Services</span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Your Books, Maintained Daily</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed font-semibold ${dm ? 'text-slate-200' : 'text-slate-800'}`}>
                Daily transaction recording, weekly bank reconciliation, and GST-ready books — maintained by a dedicated bookkeeper on Zoho Books or Tally, with a monthly P&amp;L and Balance Sheet. From{' '}
                <span className="text-brand-orange font-bold">₹1,499/month</span>.
              </p>

              {/* Feature Highlights Box */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 p-6 mt-2 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {heroHighlights.map((feature, idx) => (
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
                  <span>Last Updated: <strong>09 Jul 2026, 11:30 AM</strong></span>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Bookkeeping Services"} dm={isDarkMode} />
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
                Bookkeeping Services Starter Package 2026
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹1,499
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">IncorpX professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Final scope depends on transaction volume and business complexity
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

              <p className={`text-center text-xs mb-8 max-w-2xl mx-auto leading-relaxed ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
                *Listed amounts are IncorpX professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
              </p>

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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is Bookkeeping?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Bookkeeping</strong> is the day-to-day recording of a business's financial transactions — every sale, purchase, receipt, and payment, logged against the correct ledger head as it happens. It's the raw, ongoing data-entry layer that everything else in a business's finances — GST filing, tax returns, financial statements — is built on top of.
              </p>
              <p>
                Done well, bookkeeping means your books are never more than a day or two behind actual business activity, so you always know what's been earned, what's owed, and what's actually in the bank — not just a rough sense based on the account balance.
              </p>
            </div>
            <div className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <h3 className={`text-sm font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Legal Framework</h3>
              <ul className={`space-y-2 text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><strong className={dm ? 'text-slate-200' : 'text-slate-800'}>Section 44AA, Income-tax Act</strong> — requires specified professionals and businesses to maintain prescribed books once income or turnover crosses the notified thresholds.</li>
                <li><strong className={dm ? 'text-slate-200' : 'text-slate-800'}>Section 128, Companies Act, 2013</strong> — requires every company to maintain proper books of account at its registered office, regardless of turnover.</li>
                <li><strong className={dm ? 'text-slate-200' : 'text-slate-800'}>Section 35, CGST Act, 2017</strong> — requires every registered person to maintain accounts of production, stock, supplies, and input tax credit at their principal place of business.</li>
              </ul>
            </div>
            <p className={`text-xs mt-4 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              Statutory figures, thresholds, and due dates change from time to time — confirm the current position for your entity before relying on them.
            </p>
          </div>

          {/* 2. Bookkeeping vs Accounting */}
          <div id="bookkeeping-vs-accounting" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Bookkeeping vs Accounting</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The two are related but distinct — bookkeeping is the recording layer, accounting is the analysis layer built on top of it.
            </p>
            <DataTable headers={['Parameter', 'Bookkeeping', 'Accounting']} rows={bkVsAccountingRows} dm={dm} />
          </div>

          {/* 3. What's Included */}
          <div id="whats-included" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What&apos;s Included in Our Bookkeeping Service</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Every engagement covers the same core scope, delivered on a fixed cadence so your books never fall behind.
            </p>
            <DataTable headers={['Service', 'Frequency', 'What You Get']} rows={bkIncludedRows} dm={dm} />
          </div>

          {/* 4. Bookkeeping Methods */}
          <div id="methods" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Bookkeeping Methods</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Which recording method and basis apply depends on your entity type and size — here's how the common ones differ.
            </p>
            <DataTable headers={['Method', 'How It Works', 'Best Suited For']} rows={bkMethodsRows} dm={dm} />
          </div>

          {/* 5. Who Needs This */}
          <div id="who-needs" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Needs Bookkeeping</h2>
            <div className="space-y-4">
              {whoNeedsBk.map((w) => (
                <div key={w.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{w.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Our Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Our Process</h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {bkProcess.map((step, i) => (
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

          {/* 7. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              This is what we typically ask for to set up or take over your bookkeeping — not everything applies to every business, especially at the very first onboarding stage.
            </p>
            <DataTable headers={['Document', "Why It's Needed"]} rows={bkDocsRows} dm={dm} />
          </div>

          {/* 8. Pricing Factors */}
          <div id="pricing-factors" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What Affects Your Final Quote</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The ₹1,499/month starting price covers a straightforward, low-volume setup. The actual scope and quote depend on a handful of factors specific to your business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bkPricingFactors.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9. DIY vs Professional */}
          <div id="diy-vs-professional" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>DIY vs Professional Bookkeeping</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Maintaining your own books is possible at very low transaction volumes — here's how it compares once volume picks up.
            </p>
            <DataTable headers={['Factor', 'DIY', 'With ComplianceBharo']} rows={bkDiyVsProRows} dm={dm} />
          </div>

          {/* 10. FAQs */}
          <div id="faq" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {bkFaqs.map((faq, i) => (
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
                Have questions about bookkeeping support for your business? Let our experts help you figure out the right scope.
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
          serviceName="Bookkeeping Services"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
