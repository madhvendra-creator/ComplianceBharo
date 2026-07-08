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
  'Salary & Pension Income Filing',
  'One House Property Income',
  'Other Sources Income (Interest, etc.)',
  'Form 16 & 26AS Reconciliation',
  'Refund Optimization',
  'e-Verification Support',
];

const pricingInclusions = [
  'Free Tax Consultation',
  'ITR-1 Eligibility Verification',
  'Old vs New Regime Comparison',
  'Form 16 & Salary Review',
  'Form 26AS & AIS Reconciliation',
  'Chapter VI-A Deduction Optimization',
  'Accurate Return Preparation',
  'e-Filing & e-Verification Support',
  'Refund Tracking Assistance',
  'Dedicated Professional Assistance',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Section 139(1) of the Income-tax Act, 1961, as notified annually by the CBDT'],
  ['Applicable To', 'Resident individuals (Ordinarily Resident), not Hindu Undivided Families, with total income up to ₹50 lakh from salary/pension, one house property, and other specified sources'],
  ['Not Applicable To', 'Non-residents and RNORs, taxpayers with capital gains or business/professional income, more than one house property, or total income above ₹50 lakh — these must use ITR-2, ITR-3, or ITR-4'],
  ['Verification Modes', 'Aadhaar OTP, net banking, or a Digital Signature Certificate — the widest range of verification options among all ITR forms'],
  ['Form Complexity', 'The shortest and simplest of the seven ITR forms, built around a small number of schedules for salary, one house property, and other-source income'],
  ['Filing Mode', '100% online through the income tax e-filing portal, with most fields pre-filled from Form 16, Form 26AS, and the Annual Information Statement (AIS)'],
];

const keyFeatures = [
  { title: 'Simplified Single-Page-Style Form', desc: 'ITR-1 consolidates salary, one house property, and other-source income into a handful of straightforward schedules, avoiding the dozens of schedules found in the business and company forms.' },
  { title: 'Pre-Filled Data from Form 26AS/AIS', desc: 'Salary details, TDS, interest income, and other reported transactions are pulled in automatically from Form 26AS and the Annual Information Statement, cutting down manual entry.' },
  { title: 'Fast Processing & Refunds', desc: 'Because the form carries far fewer schedules and cross-checks than the other ITR forms, accurately filed ITR-1 returns tend to move through processing more quickly.' },
  { title: 'No Business/Capital Gains Complexity', desc: 'There\'s no Profit & Loss account, balance sheet, or capital gains schedule to populate — ITR-1 is built specifically for taxpayers without these income streams.' },
  { title: 'Online-Only Filing', desc: 'The return is prepared and submitted entirely on the e-filing portal, with no physical paperwork required at any stage of the process.' },
  { title: 'Multiple e-Verification Options', desc: 'Aadhaar OTP, net banking login, or a Digital Signature Certificate are all available to complete verification, giving individual taxpayers more flexibility than company or LLP filers get.' },
];

const eligibilityRows: string[][] = [
  ['Residential Status', 'Resident Individual (Ordinarily Resident) only — not a Hindu Undivided Family (HUF), and not a Non-Resident or Resident but Not Ordinarily Resident (RNOR)'],
  ['Total Income', 'Up to ₹50 lakh in the financial year, computed before claiming Chapter VI-A deductions'],
  ['Income Sources', 'Salary or pension, income from one house property (excluding cases carrying forward a loss from an earlier year), and income from other sources such as savings/FD interest or family pension'],
  ['Agricultural Income', 'Permitted only up to ₹5,000 in the year — agricultural income above this threshold takes the taxpayer outside ITR-1 eligibility entirely'],
];

const cannotFileItems = [
  'Any capital gains — from equity, mutual funds, property, or any other asset',
  'Income from more than one house property',
  'Business or professional income of any kind',
  'Foreign income or foreign assets, including foreign bank accounts or signing authority abroad',
  'Being a director in any company during the year',
  'Holding unlisted equity shares at any point during the year',
  'Total income exceeding ₹50 lakh',
];

const requirementItems = [
  'A valid PAN that is linked to Aadhaar, as required for e-filing under current rules',
  'An active, pre-validated bank account for the refund (if any) to be credited into',
  'Form 16 issued by the employer, summarising salary paid and tax deducted for the year',
  'Login access to the income tax e-filing portal (incometax.gov.in), either your own credentials or authorisation for us to assist',
];

const documentRows: string[][] = [
  ['Form 16', 'Issued by your employer, this consolidates gross salary, exemptions, and tax deducted at source for the financial year — the primary source document for salary income'],
  ['Form 26AS & AIS', 'The tax credit statement and Annual Information Statement, used to reconcile TDS, interest income, and other reported transactions against what you\'re declaring'],
  ['Bank Account Details', 'Your active, pre-validated bank account number and IFSC code, needed for any refund to be credited'],
  ['Interest Certificates', 'Savings account and fixed deposit interest certificates from your bank, where such interest income applies and isn\'t already fully captured in Form 26AS'],
  ['Rent Receipts', 'Needed if you\'re claiming HRA exemption and it isn\'t already fully reflected in your Form 16'],
  ['Investment Proofs', 'Proofs for deductions under Section 80C, 80D, and similar provisions, where these investments aren\'t already accounted for in your Form 16'],
];

const processSteps = [
  { title: 'Collect Form 16 & Income Documents', desc: 'Gather Form 16 from your employer along with bank interest certificates, rent receipts, and investment proofs for any deductions you plan to claim.' },
  { title: 'Reconcile with Form 26AS & AIS', desc: 'Cross-check the salary, TDS, and interest figures in Form 16 against Form 26AS and the Annual Information Statement, flagging any mismatch before it becomes a notice.' },
  { title: 'Choose Old or New Tax Regime', desc: 'Compare your tax liability under both regimes, factoring in the deductions and exemptions you\'re eligible for, and select whichever works out lower for the year.' },
  { title: 'Enter Income & Claim Deductions', desc: 'Populate salary, house property, and other-source income into the form, and claim eligible deductions under Chapter VI-A where the old regime is chosen.' },
  { title: 'Review & Submit the Return', desc: 'Check the computed tax payable or refundable figure for accuracy against your own calculations before submitting the return on the e-filing portal.' },
  { title: 'e-Verify Within 30 Days', desc: 'Complete verification via Aadhaar OTP, net banking, or DSC within 30 days of filing — a return that isn\'t verified in time is treated as though it was never filed.' },
];

const dueDateRows: string[][] = [
  ['ITR-1 Filing — Standard Due Date', '31 July of the assessment year', 'Applies to individual taxpayers, since salaried and pension income does not require any audit under Section 44AB'],
  ['Belated Return', '31 December of the assessment year', 'Filed under Section 139(4) after missing the original due date; still allowed, but subject to a late fee under Section 234F'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically the moment a belated return is filed after 31 July but before 31 December'],
  ['Interest for Late Filing — Section 234A', '1% per month or part thereof', 'Charged on any unpaid tax from the original due date until the date the return is actually filed'],
  ['e-Verification Deadline', 'Within 30 days of filing', 'A return that isn\'t e-verified within this window is treated in law as though it was never filed, regardless of when it was originally submitted'],
];

const faqs = [
  { q: 'Who can file ITR-1?', a: 'Resident individuals (Ordinarily Resident) with total income up to ₹50 lakh, earned from salary or pension, one house property, and other sources such as interest income, can file ITR-1. It isn\'t available to HUFs, non-residents, or RNORs.' },
  { q: 'Can I file ITR-1 if I had multiple Form 16s during the year?', a: 'Yes — switching jobs during the year and receiving Form 16 from more than one employer doesn\'t affect ITR-1 eligibility. You simply consolidate the salary and TDS figures from each Form 16 into a single return.' },
  { q: 'What if I have more than one house property?', a: 'ITR-1 only accommodates income from a single house property. If you own and earn income (or carry a loss) from more than one property, you\'ll need to file ITR-2 instead.' },
  { q: 'Can freelancers or self-employed individuals use ITR-1?', a: 'No — ITR-1 doesn\'t accommodate business or professional income of any kind. Freelancers and self-employed professionals typically need ITR-3 or, where eligible for presumptive taxation, ITR-4.' },
  { q: 'What is the difference between ITR-1 and ITR-4?', a: 'ITR-1 is for salaried individuals and pensioners with straightforward income and no business activity. ITR-4 (Sugam) is for individuals, HUFs, and firms (other than LLPs) declaring presumptive business or professional income under Sections 44AD, 44ADA, or 44AE.' },
  { q: 'Is filing mandatory if my employer already deducted TDS?', a: 'Generally yes, if your total income crosses the applicable filing threshold — TDS deduction only reduces the outstanding tax, it doesn\'t remove the obligation to file. Filing is also how you\'d claim back any excess TDS as a refund.' },
  { q: 'How do I claim a tax refund through ITR-1?', a: 'If the tax deducted at source or paid during the year exceeds your actual liability, the excess is automatically computed as a refund when you file your return, and gets credited to your validated bank account after processing.' },
  { q: 'Should I choose the old or the new tax regime?', a: 'It depends on how much you claim in deductions and exemptions. The old regime tends to favour taxpayers with significant Section 80C/80D investments or HRA/home loan interest claims, while the new regime offers lower slab rates with far fewer deductions. We compare both during filing and recommend whichever results in a lower liability.' },
  { q: 'What happens if my income crosses ₹50 lakh partway through the year?', a: 'What matters is your total income for the full financial year, not when during the year it accrued. If total income for the year exceeds ₹50 lakh, ITR-1 is no longer applicable and you\'d need to file ITR-2 instead.' },
  { q: 'How does e-verification work for ITR-1?', a: 'After submitting the return, you verify it through Aadhaar-linked OTP, net banking login, or a Digital Signature Certificate, within 30 days of filing. Skipping this step means the return is treated as though it was never filed.' },
  { q: 'Can I file ITR-1 without Form 16?', a: 'Yes — Form 16 is convenient but not the only source of salary data. Salary details can be reconstructed from payslips and Form 26AS/AIS, which is particularly useful if an employer delays issuing Form 16.' },
  { q: 'What if I have agricultural income?', a: 'ITR-1 permits agricultural income only up to ₹5,000 in the year. If your agricultural income exceeds that threshold, you\'re no longer eligible to file ITR-1 and would need to move to ITR-2 instead.' },
  { q: 'Can I claim HRA exemption in ITR-1?', a: 'Yes — HRA exemption is claimed as part of your salary income computation. If it\'s already factored into your Form 16, no separate action is needed; otherwise, rent receipts help support the claim during filing.' },
  { q: 'What if I was a company director during the year — can I still file ITR-1?', a: 'No — holding a directorship in any company at any point during the year disqualifies you from using ITR-1, regardless of how simple your income otherwise is. ITR-2 or ITR-3 would apply instead, depending on your income sources.' },
  { q: 'Do I need to report exempt income in ITR-1?', a: 'Yes — certain exempt income, such as interest on PPF or specified allowances, is reported in the exempt income schedule of the form even though it isn\'t taxed, since the form still expects a complete picture of your income for the year.' },
  { q: 'Can I revise my ITR-1 after filing it?', a: 'Yes — under Section 139(5), a revised return correcting an error or omission can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first.' },
  { q: 'What if I held unlisted equity shares during the year?', a: 'Holding unlisted equity shares at any point during the year makes you ineligible for ITR-1, even if the shares generated no income or were never sold — ITR-2 or ITR-3 would apply instead.' },
  { q: 'How does ComplianceBharo assist with ITR-1 filing?', a: 'We verify your ITR-1 eligibility, review your Form 16 and salary details, reconcile everything against Form 26AS and AIS, compare your liability under the old and new regimes, prepare and file an accurate return, and support you through e-verification and refund tracking.' },
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

export default function ITR1Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-1 Return Filing" />

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
                  Salaried Individual ITR-1 Sahaj Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-1 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Sahaj Form for Salaried Individuals - Simple &amp; Fast Filing
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Form 26AS Reconciliation. Old vs New Regime Comparison. e-Verification Support. Starting at <span className="text-brand-orange">₹499</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Tax Filing Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-1 Return Filing"} dm={isDarkMode} />
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
                ITR-1 Sahaj Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹499
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Typically completed in 24 to 48 hours after documents are shared
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-1 (Sahaj)?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-1, officially called <strong className={dm ? 'text-white' : 'text-slate-900'}>Sahaj</strong>, is the simplest of the seven income tax return forms notified by the CBDT. It&apos;s built specifically for resident individuals whose income comes from a small, well-defined set of sources — salary or pension, at most one house property, and other straightforward sources like bank interest — with no business activity, capital gains, or foreign income involved.
              </p>
              <p>
                The name itself is a clue to its purpose: <strong className={dm ? 'text-white' : 'text-slate-900'}>&quot;Sahaj&quot;</strong> means &quot;easy&quot; or &quot;simple&quot;, and the form is deliberately designed around that idea. Where forms like ITR-3 or ITR-6 run to dozens of schedules covering business income, depreciation, and audit disclosures, ITR-1 strips the return down to only what a salaried taxpayer actually needs to report — making it the fastest form to complete correctly, provided your income profile genuinely fits within its narrow scope.
              </p>
              <p>
                That narrow scope is also ITR-1&apos;s defining limitation. The moment your income involves capital gains, a second house property, business income, or crosses ₹50 lakh in a year, the form is no longer available to you — the trade-off for its simplicity is a strict eligibility boundary, covered in detail below.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of ITR-1</h2>
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
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can File ITR-1</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Every condition below has to hold true at the same time — ITR-1 eligibility isn&apos;t a matter of meeting most of them, it&apos;s all or nothing.
            </p>
            <DataTable headers={['Condition', 'Requirement']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Who CANNOT file ITR-1: </strong>
              You must use ITR-2, ITR-3, or ITR-4 instead if any of the following apply — {cannotFileItems.join('; ')}.
            </div>
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What You Need Before You Start</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Beyond eligibility, a handful of practical prerequisites need to be in place before an ITR-1 filing can actually go through.
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
                ComplianceBharo&apos;s ITR-1 filing package starts at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹499</strong> as a professional fee for end-to-end assistance, covering everything from eligibility verification through to e-verification and refund tracking — the full inclusion list is shown in the pricing card above.
              </p>
              <p>
                Because ITR-1 is scoped to a single, well-defined income profile, pricing for a genuine ITR-1 case stays close to this starting point. If, during review, your income turns out to include capital gains, more than one house property, or business income — meaning ITR-1 no longer applies — we\'ll flag it and quote separately for the correct form (ITR-2, ITR-3, or ITR-4) rather than filing an ineligible return.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Most ITR-1 filings need only a short list of documents — here&apos;s what to have ready.
            </p>
            <DataTable headers={['Document', 'Why It\'s Needed']} rows={documentRows} dm={dm} />
          </div>

          {/* 7. Steps */}
          <div id="steps" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-1 Filing Process — Step by Step</h2>
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
              Since salaried and pension income doesn&apos;t require an audit, ITR-1 taxpayers work to the earliest of the ITR due dates.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Don&apos;t skip e-verification: </strong>
              Submitting the return isn&apos;t the final step — a return that isn&apos;t e-verified within 30 days is treated in law as though it was never filed, and the late-filing consequences apply as if nothing was submitted at all.
            </div>
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
                Have questions about filing your ITR-1? Let our experts confirm your eligibility and get your return filed quickly.
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
          serviceName="ITR-1 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
