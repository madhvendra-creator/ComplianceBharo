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
  { id: 'features', label: 'Key Features' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'cost', label: 'Cost' },
  { id: 'documents', label: 'Documents' },
  { id: 'steps', label: 'Steps' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Business & Professional Income Filing',
  'Balance Sheet & P&L Preparation',
  'Tax Audit Coordination (If Applicable)',
  'Presumptive Taxation Opt-Out Support',
  'Capital Gains & Other Income Integration',
  'e-Verification Support',
];

const pricingInclusions = [
  'Business Income Computation',
  'Profit & Loss Account Review',
  'Balance Sheet Preparation Support',
  'Schedule BP & All Schedule Filing',
  'Depreciation Chart Computation',
  'Form 26AS & AIS Reconciliation',
  'Advance Tax Installment Guidance',
  'Tax Audit Coordination Support',
  'e-Filing and e-Verification',
  'Dedicated Professional Assistance',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Section 139(1) of the Income-tax Act, 1961'],
  ['Applicable To', 'Individuals and HUFs earning income from a proprietary business or profession, including those eligible for presumptive taxation who choose not to opt for it, and those exceeding presumptive turnover/receipt limits'],
  ['Also Covers', 'Partners in a partnership firm or LLP, who report their exempt share of profit from the firm along with any remuneration and interest received, alongside their other personal income'],
  ['Not Applicable To', 'Individuals/HUFs with no business or professional income (use ITR-1/ITR-2), and companies, LLPs, or firms filing in their own right (use ITR-6/ITR-5)'],
  ['Key Schedules', 'Schedule BP (business/profession income), Balance Sheet and P&L schedules, Schedule CG (capital gains), depreciation schedules, and audit-linked schedules where applicable'],
  ['Verification Modes', 'Aadhaar OTP, net banking, or a Digital Signature Certificate'],
];

const keyFeatures = [
  { title: 'Balance Sheet & P&L Schedules', desc: 'ITR-3 requires a full Balance Sheet and Profit & Loss Account to be reported within the return itself, giving a complete financial picture of the proprietary business or profession for the year.' },
  { title: 'Tax Audit Report Integration (Form 3CA/3CB-3CD)', desc: 'Where Section 44AB applies, the figures certified in Form 3CA-3CD (audited entities) or Form 3CB-3CD (non-audited-under-other-law entities) feed directly into the return\'s income computation.' },
  { title: 'Depreciation Schedule', desc: 'Business assets are depreciated on a block-of-assets basis under Section 32, with the resulting depreciation chart directly reducing taxable business income for the year.' },
  { title: 'Capital Gains Integration', desc: 'Beyond business income, ITR-3 accommodates capital gains, house property income, and other-source income within the same return — a proprietor doesn\'t need a separate form for these.' },
  { title: 'Partner\'s Remuneration/Interest Reporting', desc: 'A partner in a firm reports remuneration and interest received from the firm, and their exempt share of firm profit, through the specific schedules ITR-3 provides for this relationship.' },
  { title: 'Carry-Forward of Business Losses', desc: 'Unabsorbed business losses and depreciation from the current or earlier years are tracked and carried forward within the return, ready to be set off against future business income.' },
];

const eligibilityRows: string[][] = [
  ['Individuals/HUFs with Business or Professional Income (Not Opting Presumptive)', 'Running a proprietary business or professional practice and choosing regular computation from maintained books rather than a presumptive scheme'],
  ['Businesses Exceeding Presumptive Limits', 'Turnover or gross receipts beyond the thresholds prescribed under Sections 44AD, 44ADA, or 44AE, which take the taxpayer outside presumptive taxation eligibility'],
  ['Partners in a Firm', 'Reporting their exempt share of profit from the firm along with remuneration and interest received from it, plus any other personal income such as salary or capital gains'],
  ['Speculative or F&O Traders', 'Income from speculative transactions or Futures & Options (F&O) trading is treated as business income under the Act, even though it may feel more like an investment activity'],
  ['Presumptive Opt-Out (Even If Eligible)', 'A taxpayer eligible for presumptive taxation under Section 44AD/44ADA who nonetheless chooses to declare actual profit computed from maintained books'],
];

const requirementItems = [
  'Books of account maintained as required under Section 44AA, mandatory once income or turnover crosses the prescribed thresholds',
  'A clear assessment of whether tax audit under Section 44AB applies, since this determines the return\'s due date and whether an audit report must be filed first',
  'A valid PAN linked to Aadhaar, as required for e-filing under current rules',
  'An active, pre-validated bank account for any refund to be credited into',
  'Complete records of business receipts, expenses, and asset purchases for the year, to support the Balance Sheet and P&L schedules',
];

const documentGroups = [
  { group: 'Business Records', items: ['Sales and purchase register for the financial year', 'Bank statements covering all business receipts and payments', 'Expense records and supporting bills/vouchers'] },
  { group: 'Audit Reports (Where Applicable)', items: ['Tax audit report in Form 3CA-3CD or Form 3CB-3CD, as applicable', 'Any other statutory audit report relevant to the business'] },
  { group: 'Depreciation Records', items: ['Fixed asset schedule showing additions, disposals, and written-down value', 'Purchase invoices for assets acquired during the year'] },
  { group: 'F&O / Trading Statements (If Applicable)', items: ['Contract notes or trading statements from the broker for F&O and speculative transactions', 'Profit & loss statement generated by the broker for the trading account'] },
  { group: 'Standard Documents', items: ['Form 26AS and Annual Information Statement (AIS)', 'Form 16, where salary income also applies alongside business income'] },
];

const processSteps = [
  { title: 'Compile Business Financial Records', desc: 'Gather sales and purchase registers, bank statements, expense records, and asset purchase details for the year to build a complete picture of the business.' },
  { title: 'Determine Tax Audit Applicability', desc: 'Check turnover, receipts, and presumptive-scheme history against the Section 44AB thresholds to confirm whether a tax audit is legally required before filing.' },
  { title: 'Complete Audit, If Required', desc: 'Where audit applies, coordinate with the Chartered Accountant conducting it, ensuring the audit report in Form 3CA/3CB-3CD is finalised ahead of the ITR due date.' },
  { title: 'Prepare Balance Sheet & P&L', desc: 'Compile the Balance Sheet and Profit & Loss Account for the business or profession in the format the ITR-3 schedules require.' },
  { title: 'Compute Total Income Across All Heads', desc: 'Combine business/professional income with any capital gains, house property income, or other-source income to arrive at total income for the year.' },
  { title: 'File with Correct Schedules', desc: 'Submit ITR-3 on the e-filing portal with every applicable schedule completed — Schedule BP, Balance Sheet, P&L, depreciation, and capital gains where relevant.' },
  { title: 'e-Verify', desc: 'Complete verification via Aadhaar OTP, net banking, or DSC within 30 days of filing — a return that isn\'t verified in time is treated as though it was never filed.' },
];

const dueDateRows: string[][] = [
  ['ITR-3 Filing — Non-Audit Cases', '31 July of the assessment year', 'Applies where turnover, receipts, and other Section 44AB thresholds are not crossed, so no tax audit is required'],
  ['Tax Audit Report — Form 3CA/3CB-3CD', '30 September of the assessment year', 'Falls a full month ahead of the audit-linked ITR due date, since the return draws directly from the audited figures'],
  ['ITR-3 Filing — Audit-Applicable Cases', '31 October of the assessment year', 'Applies wherever turnover, receipts, or a presumptive opt-out crosses the Section 44AB audit threshold'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically where the return is filed after the applicable due date but before 31 December'],
  ['Interest — Sections 234A / 234B / 234C', '1% per month or part thereof', 'Charged respectively for late filing with unpaid tax outstanding, a shortfall in advance tax paid, and deferred or short quarterly instalments'],
  ['Tax Audit Default — Section 271B', '0.5% of turnover or gross receipts, capped at ₹1,50,000', 'Applies where a taxpayer liable for tax audit fails to get the audit done, or fails to furnish the audit report by the due date'],
];

const faqs = [
  { q: 'Who must file ITR-3?', a: 'Individuals and HUFs earning income from a proprietary business or profession — whether or not they\'re eligible for presumptive taxation — along with partners in a firm reporting their share of profit and remuneration, and traders with speculative or F&O income, must file ITR-3.' },
  { q: 'What is the difference between ITR-3 and ITR-4?', a: 'ITR-4 (Sugam) is a simpler form for taxpayers eligible for and opting into presumptive taxation under Sections 44AD, 44ADA, or 44AE, declaring a prescribed percentage of receipts as profit without maintaining full books. ITR-3 is required wherever actual profit is computed from maintained books, or where presumptive limits are exceeded, or a taxpayer chooses not to use the presumptive scheme.' },
  { q: 'Is tax audit always mandatory for ITR-3 filers?', a: 'No — audit under Section 44AB is triggered only when turnover, gross receipts, or a presumptive opt-out crosses the prescribed thresholds. A smaller proprietorship or professional practice filing ITR-3 can still fall outside the audit requirement while using regular books instead of presumptive taxation.' },
  { q: 'Can F&O traders use ITR-3?', a: 'Yes — in fact, Futures & Options (F&O) trading income is classified as business income under the Income-tax Act, which means F&O traders typically need to file ITR-3 rather than ITR-2, even though the activity may feel more like investing than running a business.' },
  { q: 'How do business losses carry forward under ITR-3?', a: 'Business losses can be carried forward for up to 8 assessment years and set off against future business income, but only if the return declaring the loss is filed by the original due date under Section 139(1). Unabsorbed depreciation is a notable exception that can carry forward even with a late-filed return.' },
  { q: 'What documents do I need for ITR-3 filing?', a: 'Typically, sales and purchase records, bank statements, expense records, the fixed asset schedule, the tax audit report where applicable, F&O/trading statements if relevant, and the standard Form 26AS/AIS — the exact list depends on the nature and scale of your business.' },
  { q: 'How does ComplianceBharo assist with ITR-3 filing?', a: 'We assess whether tax audit applies, coordinate with your auditor where it does, prepare the Balance Sheet and P&L schedules, compute depreciation and total income across all applicable heads, reconcile against Form 26AS and AIS, and file the return with e-verification support.' },
  { q: 'Can a professional (doctor, lawyer, consultant) file ITR-3?', a: 'Yes — professionals not opting for presumptive taxation under Section 44ADA, or whose gross receipts exceed the presumptive threshold, file ITR-3 using regular books of account rather than the simplified presumptive computation.' },
  { q: 'What happens if the tax audit deadline is missed?', a: 'Failing to get the audit done, or failing to furnish the audit report by the due date, attracts a penalty under Section 271B of 0.5% of turnover or gross receipts, capped at ₹1,50,000, in addition to delaying the ITR itself.' },
  { q: 'Is maintaining books of account mandatory for everyone filing ITR-3?', a: 'Books of account become mandatory under Section 44AA once income or turnover crosses prescribed thresholds specific to the type of business or profession. Below those thresholds, some flexibility exists, though maintaining clean records is still advisable for an accurate filing.' },
  { q: 'Can capital gains be reported alongside business income in ITR-3?', a: 'Yes — ITR-3 accommodates capital gains, house property income, and other-source income within the same return alongside business/professional income, so a proprietor with a share portfolio doesn\'t need to file a separate form.' },
  { q: 'What is Schedule BP in ITR-3?', a: 'Schedule BP is where business or professional income is computed — starting from net profit as per the P&L account and adjusting for items treated differently under tax law, such as disallowed expenses and depreciation differences, to arrive at taxable business income.' },
  { q: 'How is a partner\'s income from a firm reported in ITR-3?', a: 'A partner\'s share of profit from the firm is exempt in their hands (since the firm itself pays tax on it), but any remuneration and interest received from the firm is taxable and reported through the specific schedules ITR-3 provides for partner income.' },
  { q: 'Can I switch from ITR-4 (presumptive) to ITR-3 in a later year?', a: 'Yes, but be aware that opting out of a presumptive scheme you\'ve used in recent years can itself trigger a mandatory tax audit under specified conditions, so the switch is worth planning for rather than doing at the last minute.' },
  { q: 'What is the penalty for not maintaining proper books of account?', a: 'Failure to maintain books of account required under Section 44AA can attract a penalty of up to ₹25,000 under Section 271A, separate from any audit-related penalty and independent of whether tax was actually evaded.' },
  { q: 'Does advance tax apply to ITR-3 filers?', a: 'Yes — any taxpayer, including a proprietor or professional, with an estimated annual tax liability of ₹10,000 or more must pay advance tax in quarterly instalments, with shortfalls attracting interest under Sections 234B and 234C.' },
  { q: 'Can I revise my ITR-3 after filing?', a: 'Yes — under Section 139(5), a revised return correcting an error or omission can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first, provided the original return was filed within the statutory timeline.' },
  { q: 'What is the difference between speculative and non-speculative business income?', a: 'Speculative transactions (like intraday equity trading) are treated distinctly from non-speculative business income (like F&O trading, which is treated as non-speculative), and losses from speculative business can only be set off against other speculative business income, not against regular business profits.' },
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

export default function ITR3Client() {
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
    <div className={`min-h-screen transition-colors duration-300 ${dm ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-3 Return Filing" />

      {/* Hero */}
      <section className={`relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden transition-colors duration-300 ${dm ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-b from-brand-orange/10 to-transparent blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex flex-col gap-3">
                <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  Business &amp; Professional Income ITR-3 Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-3 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  For Individuals &amp; HUFs with Business or Professional Income
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Balance Sheet &amp; P&amp;L Preparation. Tax Audit Coordination. Depreciation Computation. Starting at <span className="text-brand-orange">₹3,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {heroFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckIcon className={`h-4 w-4 shrink-0 mt-0.5 ${dm ? 'text-orange-400' : 'text-orange-500'}`} />
                        <span className={`text-sm font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs">
                  <div className={`flex items-center gap-1.5 font-medium ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-orange">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.568 12.318a.75.75 0 00.364 0c5.504-1.385 9.568-6.376 9.568-12.318 0-1.36-.219-2.665-.635-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM10.25 13.75l-2.03-2.03a.75.75 0 00-1.06 1.06l2.56 2.56a.75.75 0 001.06 0l5.5-5.5a.75.75 0 00-1.06-1.06l-4.97 4.97z" clipRule="evenodd" />
                    </svg>
                    Reviewed by Industry Experts &amp; Business Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-3 Return Filing"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
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
                ITR-3 Return Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹3,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on audit applicability and schedule complexity
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

              <div className="flex justify-center mt-10">
                <a href="#lead-form" onClick={(e) => scrollToSection(e, 'lead-form')} className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-base ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                  </svg>
                  Get Expert Assistance
                </a>
              </div>

              <div className="mt-8 text-center text-xs text-slate-500 font-medium px-4">
                Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. Government/statutory fees, where applicable, are charged separately at actuals.
              </div>
            </div>

            {/* Trust markers */}
            <div className={`mt-8 py-6 border-t ${dm ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'} grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm font-semibold mx-8`}>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Transparent scope
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                Secure payment
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                Application support
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-3?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-3 is the income tax return form for individuals and Hindu Undivided Families (HUFs) who earn income from a proprietary business or a profession — this covers sole proprietors and independent professionals directly, and is distinct from how a partnership or LLP itself files (that\'s ITR-5, filed by the firm). A partner in a firm still files ITR-3 personally, reporting their exempt share of firm profit alongside any remuneration and interest received from the firm and their own other income.
              </p>
              <p>
                A common misconception is that presumptive taxation and ITR-3 are mutually exclusive — they\'re not, quite. ITR-3 is exactly where a taxpayer lands when they&apos;re <strong className={dm ? 'text-white' : 'text-slate-900'}>eligible</strong> for presumptive taxation under Section 44AD/44ADA but chooses to declare actual profit from maintained books instead, as well as where anyone exceeding the presumptive turnover or receipt limits is required to file.
              </p>
              <p>
                Because it accommodates genuine business complexity, ITR-3 is a considerably more detailed form than ITR-1 or ITR-2 — carrying a Balance Sheet, a Profit &amp; Loss Account, depreciation schedules, and (where applicable) tax audit integration, alongside the capital gains and other-source schedules also found in ITR-2.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of ITR-3</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Must File ITR-3</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              ITR-3 eligibility centres on having genuine business or professional income — here are the situations that most commonly require it.
            </p>
            <DataTable headers={['Category', 'Applies When']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What You Need Before You Start</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Because ITR-3 draws from actual business records rather than a presumptive percentage, a few prerequisites need to be in place before filing.
            </p>
            <div className={`rounded-2xl border p-5 sm:p-6 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-4">
                {requirementItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Cost */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What It Costs</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ComplianceBharo&apos;s ITR-3 filing package starts at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹3,999</strong> as a professional fee for end-to-end assistance, covering business income computation, Balance Sheet and P&amp;L preparation, depreciation, and e-verification support — the full inclusion list is shown in the pricing card above.
              </p>
              <p>
                The final price for your specific filing can move beyond the starting point depending on a few factors: whether a tax audit applies (which brings in audit coordination work), whether you have F&amp;O or speculative trading activity (which often means reconciling a high volume of transactions), and how many income heads — business, capital gains, house property, foreign sources — need to be integrated into a single return. We confirm the exact scope and fee after reviewing your financials.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Here&apos;s the typical document checklist, grouped by what it covers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentGroups.map((group) => (
                <div key={group.group} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 ${dm ? 'text-brand-orange' : 'text-orange-600'}`}>{group.group}</h3>
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                        <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Steps */}
          <div id="steps" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-3 Filing Process — Step by Step</h2>
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

          {/* 8. Compliance */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Due Dates &amp; Penalties</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The applicable due date depends entirely on whether tax audit applies — audit-liable filers get an extra three months, but with their own upstream deadline to hit first.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
          </div>

          {/* 9. FAQs */}
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
                Have questions about filing your ITR-3 for business or professional income? Let our experts help you figure out the right approach.
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
          serviceName="ITR-3 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
