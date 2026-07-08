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
  'Presumptive Income Computation (44AD/44ADA/44AE)',
  'Simplified Filing (No Books Required)',
  'Freelancer & Consultant Friendly',
  'Small Business & Trader Support',
  'Form 26AS/AIS Reconciliation',
  'e-Verification Support',
];

const pricingInclusions = [
  'Presumptive Income Computation (44AD/44ADA/44AE)',
  'Profit & Loss Account Review',
  'Old vs New Regime Tax Optimization',
  'Form 26AS & AIS Reconciliation',
  'Chapter VI-A Deduction Optimization',
  'Advance Tax Installment Guidance',
  'e-Filing & e-Verification Support',
  'Refund Tracking Assistance',
  'Tax Saving Advisory',
  'Dedicated Professional Assistance',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Sections 44AD, 44ADA, 44AE, and 139(1) of the Income-tax Act, 1961'],
  ['Applicable To', 'Resident individuals, HUFs, and firms (other than LLPs) opting for presumptive taxation on business income (Section 44AD), professional income (Section 44ADA), or goods transport income (Section 44AE)'],
  ['Not Applicable To', 'LLPs, non-residents, and anyone with income above ₹50 lakh, more than one house property, capital gains, foreign income/assets, a company directorship, or unlisted equity shareholding'],
  ['Core Idea', 'A fixed percentage of turnover or receipts is declared as taxable profit, removing the need to maintain detailed books of account or undergo a tax audit for that presumptive income'],
  ['Verification Modes', 'Aadhaar OTP, net banking, or a Digital Signature Certificate'],
  ['Filing Mode', '100% online through the income tax e-filing portal'],
];

const keyFeatures = [
  { title: 'No Detailed Books Required', desc: 'For income declared under the presumptive scheme, there\'s no obligation to maintain a full set of books of account under Section 44AA — the return is built around a declared percentage of turnover instead.' },
  { title: 'Fixed Presumptive Income Rate', desc: 'Taxable profit is computed as a prescribed percentage of turnover or receipts — 6%/8% under Section 44AD, or 50% under Section 44ADA — rather than through detailed expense-by-expense computation.' },
  { title: 'Combines Business + Salary + One House Property + Other Sources', desc: 'ITR-4 isn\'t limited to presumptive income alone — it also accommodates salary or pension, income from one house property, and other-source income like interest, within the same return.' },
  { title: 'Digital Receipts Higher Threshold Benefit', desc: 'Turnover and receipt thresholds for presumptive eligibility are meaningfully higher — ₹3 crore instead of ₹2 crore for businesses, ₹75 lakh instead of ₹50 lakh for professionals — where at least 95% of receipts flow through digital or banking channels.' },
  { title: 'Simple Turnover-Based Declaration', desc: 'Because taxable income is a straightforward percentage of turnover, the computation itself is quick to arrive at once turnover for the year is finalised, with none of the expense-head-by-expense-head detail regular books require.' },
  { title: 'Fast Filing Process', desc: 'With no audit report to wait on and no detailed Balance Sheet/P&L schedules to populate, ITR-4 filings typically move from document collection to submission faster than ITR-3 filings do.' },
];

const eligibilityRows: string[][] = [
  ['Section 44AD — Business', 'Turnover up to ₹3 crore where at least 95% of receipts are through digital/banking channels, otherwise capped at ₹2 crore', 'A minimum of 8% of turnover is declared as presumptive profit, reduced to 6% for the portion of turnover received through digital or banking modes'],
  ['Section 44ADA — Professionals', 'Gross receipts up to ₹75 lakh where at least 95% are digital, otherwise capped at ₹50 lakh — covers legal, medical, engineering, architectural, accountancy, technical consultancy, interior decoration, and similarly specified professions', 'A minimum of 50% of gross receipts is declared as presumptive profit'],
  ['Section 44AE — Goods Transport', 'Applicable to a taxpayer owning not more than 10 goods carriages at any point during the year', 'Presumptive income is computed per vehicle per month at prescribed rates (varying by vehicle tonnage), rather than as a percentage of receipts'],
];

const cannotFileItems = [
  'Total income above ₹50 lakh',
  'Income from more than one house property',
  'Any capital gains',
  'Foreign income or foreign assets',
  'Being a director in any company during the year',
  'Holding unlisted equity shares at any point during the year',
];

const requirementItems = [
  'No mandatory maintenance of detailed books of account under Section 44AA for the presumptive income being declared',
  'Basic transaction records — bank statements and a sales/receipts summary — are still worth maintaining to support the turnover figure declared, even though full bookkeeping isn\'t required',
  'A valid PAN linked to Aadhaar, as required for e-filing under current rules',
  'An active, pre-validated bank account for any refund to be credited into',
  'Awareness that opting out of the presumptive scheme in a later year, after having used it, can trigger mandatory books of account, a tax audit, and a 5-assessment-year lock-out from re-entering the scheme — worth factoring into your decision each year',
];

const documentGroups = [
  { group: 'Business / Professional Receipts', items: ['Bank statements covering all business or professional receipts for the year', 'A summary of invoices or receipts issued, supporting the declared turnover'] },
  { group: 'Salary Income (If Applicable)', items: ['Form 16, where salary or pension income also applies alongside presumptive income'] },
  { group: 'Deductions', items: ['Investment proofs for deductions claimed under Section 80C, 80D, and similar provisions, where the old regime is chosen'] },
  { group: 'Standard Documents', items: ['Form 26AS and Annual Information Statement (AIS)'] },
];

const processSteps = [
  { title: 'Determine Presumptive Scheme Eligibility', desc: 'Confirm which section applies — 44AD for business, 44ADA for a specified profession, or 44AE for goods transport — and check turnover/receipts against the relevant threshold.' },
  { title: 'Compute Presumptive Income (6%/8% or 50% of Receipts)', desc: 'Apply the prescribed percentage to your total turnover or gross receipts for the year to arrive at the declared presumptive profit.' },
  { title: 'Reconcile with Form 26AS & AIS', desc: 'Cross-check TDS, reported receipts, and other transactions in Form 26AS and the Annual Information Statement against your own records.' },
  { title: 'Add Other Income Heads', desc: 'Combine the presumptive income with any salary, one house property, and other-source income to arrive at total income for the year.' },
  { title: 'File & Submit', desc: 'Submit the completed ITR-4 return on the e-filing portal after a final review of the presumptive computation and other income heads.' },
  { title: 'e-Verify', desc: 'Complete verification via Aadhaar OTP, net banking, or DSC within 30 days of filing — a return that isn\'t verified in time is treated as though it was never filed.' },
];

const dueDateRows: string[][] = [
  ['ITR-4 Filing — Standard Due Date', '31 July of the assessment year', 'Applies since presumptive taxpayers, by definition, are not subject to a mandatory tax audit for the income declared under the scheme'],
  ['Belated Return', '31 December of the assessment year', 'Filed under Section 139(4) after missing the original due date, subject to a late fee under Section 234F'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically where the return is filed after 31 July but before 31 December'],
  ['Consequence of Opting Out of the Presumptive Scheme', 'Mandatory books of account (Section 44AA) and tax audit (Section 44AB) for that year', 'Applies where declared income is lower than the presumptive rate and total income exceeds the basic exemption limit — and separately bars re-entry into the presumptive scheme under the same section for the next 5 assessment years'],
  ['e-Verification Deadline', 'Within 30 days of filing', 'A return that isn\'t e-verified within this window is treated in law as though it was never filed'],
];

const faqs = [
  { q: 'Who can file ITR-4?', a: 'Resident individuals, HUFs, and firms (other than LLPs) who opt for presumptive taxation under Section 44AD (business), 44ADA (specified professions), or 44AE (goods transport), and whose total income and other conditions fall within ITR-4\'s scope, can file it.' },
  { q: 'What is the difference between Sections 44AD, 44ADA, and 44AE?', a: 'Section 44AD covers general businesses, presuming a minimum of 6-8% of turnover as profit. Section 44ADA covers specified professionals — legal, medical, engineering, and similar — presuming a minimum of 50% of gross receipts as profit. Section 44AE covers goods transport operators with up to 10 vehicles, computing presumptive income per vehicle per month rather than as a turnover percentage.' },
  { q: 'Can I switch between presumptive and regular taxation each year?', a: 'You can choose year to year, but switching out of the presumptive scheme after using it carries consequences — if declared income falls below the presumptive rate in a later year and total income exceeds the exemption limit, books and audit become mandatory, and you\'re barred from re-entering the scheme under that section for the next 5 assessment years.' },
  { q: 'What happens if my actual profit is lower than the presumptive rate?', a: 'You can still declare a lower actual profit, but only by maintaining regular books of account and — if your total income exceeds the basic exemption limit — undergoing a tax audit under Section 44AB for that year, since you\'re no longer relying on the presumptive computation.' },
  { q: 'Is a tax audit required under ITR-4?', a: 'Not for income genuinely declared at or above the presumptive rate — that\'s the entire point of the scheme. Audit becomes necessary only if you declare profit below the presumptive percentage and your total income exceeds the basic exemption limit.' },
  { q: 'Can freelancers use ITR-4?', a: 'Yes, if their work falls under a profession specified in Section 44ADA (such as technical consultancy or specified creative/technical work) and gross receipts stay within the prescribed limit. Freelancers whose activity doesn\'t fall under a specified profession, or who exceed the threshold, would need ITR-3 instead.' },
  { q: 'What documents do I need for ITR-4 filing?', a: 'Typically, bank statements and a receipts summary supporting your declared turnover, Form 16 if you also have salary income, investment proofs for any deductions claimed, and the standard Form 26AS/AIS.' },
  { q: 'How does ComplianceBharo assist with ITR-4 filing?', a: 'We confirm which presumptive section applies to your business or profession, compute the presumptive income correctly, reconcile against Form 26AS and AIS, combine it with any other income heads, compare old vs new regime, and file the return with e-verification support.' },
  { q: 'Can a firm file ITR-4?', a: 'Yes — a partnership firm (other than an LLP) opting for presumptive taxation under Section 44AD can file ITR-4, though it cannot claim certain deductions, like partner remuneration and interest, that would otherwise reduce its taxable profit under regular computation.' },
  { q: 'What is the digital receipts benefit under Section 44AD?', a: 'Where at least 95% of a business\'s turnover is received through digital or banking channels — rather than cash — the presumptive turnover eligibility limit rises from ₹2 crore to ₹3 crore, and the presumptive profit rate on that digital portion drops to 6% instead of 8%.' },
  { q: 'Can I claim deductions like Section 80C under ITR-4?', a: 'Yes — Chapter VI-A deductions such as Section 80C and 80D remain available under the old tax regime even when your business/professional income is computed presumptively, since these apply to your overall taxable income, not just the presumptive portion.' },
  { q: 'Is ITR-4 available to non-residents?', a: 'No — ITR-4 is restricted to resident individuals, HUFs, and firms. Non-residents with business or professional income must use ITR-3 instead, regardless of the scale of their income.' },
  { q: 'Can I have more than one business and still use ITR-4?', a: 'Yes, provided each business independently qualifies under the presumptive scheme and the combined turnover across all businesses stays within the applicable threshold — the presumptive computation is applied to the combined eligible turnover.' },
  { q: 'What if I have both business income under 44AD and professional income under 44ADA?', a: 'ITR-4 can accommodate presumptive income under more than one section simultaneously, provided each activity independently meets its own section\'s eligibility conditions and threshold.' },
  { q: 'Does ITR-4 allow reporting of interest and dividend income?', a: 'Yes — income from other sources, such as savings account interest, fixed deposit interest, and dividends, is reported alongside your presumptive business/professional income within the same return.' },
  { q: 'Can I revise my ITR-4 after filing?', a: 'Yes — under Section 139(5), a revised return correcting an error or omission can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first.' },
  { q: 'What if my turnover exceeds the presumptive threshold mid-year?', a: 'What matters is your total turnover or receipts for the full financial year. If it exceeds the applicable presumptive limit for the year, ITR-4 is no longer available, and you would need to file ITR-3 with regular books of account instead.' },
  { q: 'Do goods transport operators under Section 44AE need to track receipts separately for each vehicle?', a: 'Not for presumptive computation purposes — since income under Section 44AE is computed per vehicle per month at prescribed rates rather than as a percentage of receipts, the focus is on the number of vehicles owned and the months held, not on tracking actual freight receipts.' },
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

export default function ITR4Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-4 Return Filing" />

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
                  Presumptive Taxation ITR-4 Sugam Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-4 (Sugam) Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Presumptive Taxation for Small Businesses &amp; Professionals
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  No Books of Account Required. Simple Turnover-Based Computation. Fast Filing. Starting at <span className="text-brand-orange">₹1,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Presumptive Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-4 Return Filing"} dm={isDarkMode} />
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
                ITR-4 Sugam Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹1,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Typically the fastest of the ITR filing categories to complete
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-4 (Sugam)?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-4, officially called <strong className={dm ? 'text-white' : 'text-slate-900'}>Sugam</strong> — meaning &quot;simple&quot; — is the form for resident individuals, HUFs, and firms (other than LLPs) who choose <strong className={dm ? 'text-white' : 'text-slate-900'}>presumptive taxation</strong> under Section 44AD (for business income), Section 44ADA (for specified professional income), or Section 44AE (for goods transport income).
              </p>
              <p>
                The idea behind presumptive taxation is straightforward: instead of maintaining detailed books of account and computing actual profit through a Profit &amp; Loss Account, an eligible taxpayer simply declares a fixed percentage of their turnover or receipts as taxable profit. That percentage is treated as sufficient to satisfy the tax authorities, sidestepping the bookkeeping and (ordinarily) audit obligations that come with regular business income computation.
              </p>
              <p>
                Because this is a genuine simplification, it comes with real trade-offs, the biggest being that ITR-4 has a hard income ceiling — the moment your total income crosses ₹50 lakh, or capital gains, foreign assets, multiple properties, or a directorship enter the picture, you\'re no longer eligible and the return has to move to ITR-2 or ITR-3 instead.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of ITR-4</h2>
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
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility Under the Presumptive Scheme</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Which section applies to you depends entirely on the nature of your income — business, specified profession, or goods transport.
            </p>
            <DataTable headers={['Section', 'Turnover / Receipt Limit', 'Presumptive Rate']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Who CANNOT use ITR-4: </strong>
              You must use ITR-2 or ITR-3 instead if any of the following apply — {cannotFileItems.join('; ')}.
            </div>
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What You Need Before You Start</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              ITR-4&apos;s prerequisites are lighter than ITR-3&apos;s, but one long-term consequence is worth understanding before you opt in.
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
                ComplianceBharo&apos;s ITR-4 filing package starts at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹1,999</strong> as a professional fee for end-to-end assistance — the full inclusion list is shown in the pricing card above.
              </p>
              <p>
                Because presumptive taxation removes the need for detailed books of account and, ordinarily, an audit, ITR-4 is typically the simplest and most affordable of the business-income ITR filing categories to complete. Where your case involves multiple income sources — say, presumptive business income alongside salary and interest income — or the specific vehicle-wise computation under Section 44AE, we\'ll confirm any adjustment to the scope and fee before beginning work.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              ITR-4&apos;s document list is deliberately short, reflecting the simplified nature of presumptive taxation.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-4 Filing Process — Step by Step</h2>
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
              ITR-4 follows the standard non-audit due date, but declaring income below the presumptive rate changes the compliance picture significantly.
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
                Have questions about filing your ITR-4 under presumptive taxation? Let our experts confirm your eligibility and get it filed quickly.
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
          serviceName="ITR-4 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
