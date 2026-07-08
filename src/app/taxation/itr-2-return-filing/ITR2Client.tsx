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
  'Capital Gains Computation (Equity, MF, Property)',
  'Multiple House Property Income',
  'Foreign Income & Asset Disclosure',
  'Crypto/VDA Income Reporting',
  'Dividend & Interest Reconciliation',
  'e-Verification Support',
];

const pricingInclusions = [
  'Capital Gains Computation & Schedule CG',
  'Schedule FA - Foreign Asset Reporting',
  'Form 26AS & AIS Reconciliation',
  'Old vs New Regime Tax Comparison',
  'DTAA & Form 67 Support (NRIs)',
  'Section 54/54EC/54F Exemption Claims',
  'Loss Set-off & Carry Forward Review',
  'e-Filing & e-Verification Support',
  'Dedicated Professional Assistance',
  'Post-Filing Notice Readiness Review',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Section 139(1) of the Income-tax Act, 1961'],
  ['Applicable To', 'Individuals and Hindu Undivided Families (HUFs) with capital gains, more than one house property, foreign income/assets, or other conditions placing them outside ITR-1 — but with no business or professional income'],
  ['Not Applicable To', 'Anyone with business or professional income of any kind — such taxpayers must use ITR-3, or ITR-4 where eligible for presumptive taxation'],
  ['Residential Status', 'Available to residents, Resident but Not Ordinarily Resident (RNOR) individuals, and non-residents alike — unlike ITR-1, which is restricted to residents only'],
  ['Key Schedules', 'Schedule CG (capital gains), Schedule FA (foreign assets), Schedule VDA (virtual digital assets), and Schedule AL (assets and liabilities, where total income exceeds ₹50 lakh)'],
  ['Verification Modes', 'Aadhaar OTP, net banking, or a Digital Signature Certificate'],
];

const keyFeatures = [
  { title: 'Capital Gains Schedule (Short-Term/Long-Term)', desc: 'Schedule CG accommodates gains and losses across equity, debt, mutual funds, and property, computed separately by asset class and holding period, since each carries its own tax treatment.' },
  { title: 'Multiple House Property Support', desc: 'Unlike ITR-1, ITR-2 allows income or loss to be reported from more than one house property, including cases where one property carries forward a loss from a prior year.' },
  { title: 'Foreign Asset/Income Schedule (FA)', desc: 'Schedule FA captures foreign bank accounts, equity holdings, immovable property, and other overseas assets, along with any signing authority held in a foreign account — mandatory disclosure regardless of whether the asset generated income.' },
  { title: 'Virtual Digital Asset (Schedule VDA) Reporting', desc: 'Gains from cryptocurrency and other virtual digital assets are reported through the dedicated Schedule VDA, taxed under the specific provisions that apply to this asset class.' },
  { title: 'Clubbing of Income Provisions', desc: 'Where income is clubbed from a spouse, minor child, or other specified relation under Sections 60-64, ITR-2 provides the schedules needed to report that clubbed income correctly.' },
  { title: 'No Business Income Allowed', desc: 'ITR-2 deliberately excludes any Profit & Loss account or business income schedule — the moment business or professional income enters the picture, the correct form becomes ITR-3.' },
];

const eligibilityRows: string[][] = [
  ['Capital Gains', 'Any capital gains or losses from shares, mutual funds, property, or other capital assets — short-term or long-term'],
  ['Multiple House Properties', 'Income or loss from more than one house property, including cases carrying forward a loss from an earlier year'],
  ['Foreign Income or Assets', 'Holding any foreign asset, having signing authority in a foreign account, or having foreign-sourced income of any kind'],
  ['Agricultural Income', 'Above ₹5,000 in the financial year'],
  ['Company Directorship', 'Serving as a director in any company at any point during the year'],
  ['Unlisted Equity Shares', 'Holding unlisted equity shares at any point during the year'],
  ['High Total Income', 'Total income above ₹50 lakh in the year, even without any of the other conditions above'],
  ['Residential Status', 'Non-residents and Resident but Not Ordinarily Resident (RNOR) individuals, regardless of income composition, are directed to ITR-2 rather than ITR-1'],
];

const requirementItems = [
  'A valid PAN linked to Aadhaar, as required for e-filing under current rules',
  'Capital gains statements from your broker(s) and Asset Management Company (AMC) for every transaction during the year',
  'Property sale and purchase records, including the deed and cost of acquisition/improvement, where property was transacted',
  'Foreign asset documentation — bank statements, investment account statements, or property records — where any foreign asset or income applies',
  'An active, pre-validated bank account for any refund to be credited into',
];

const documentGroups = [
  { group: 'Capital Gains', items: ['Broker or Asset Management Company (AMC) capital gains statements for equity, mutual fund, and other securities transactions', 'Property sale deed and purchase deed, where real estate was transacted during the year', 'Records supporting the cost of acquisition and any cost of improvement claimed'] },
  { group: 'Property Income', items: ['Rent receipts or rental agreement, where house property income is being reported', 'Municipal tax payment records for the property', 'Home loan interest certificate from the lender, where interest deduction is being claimed'] },
  { group: 'Foreign Assets', items: ['Foreign bank account statements for the relevant period', 'Investment account statements for foreign equity, funds, or other holdings'] },
  { group: 'Standard Documents', items: ['Form 16, where salary income also applies', 'Form 26AS and Annual Information Statement (AIS)'] },
];

const processSteps = [
  { title: 'Collect Income & Capital Gains Documents', desc: 'Gather Form 16 (if salaried), broker/AMC capital gains statements, property records, and any foreign asset documentation relevant to the year.' },
  { title: 'Reconcile Form 26AS & AIS', desc: 'Cross-check TDS, dividend income, interest income, and reported securities transactions in Form 26AS and the Annual Information Statement against your own records.' },
  { title: 'Compute Capital Gains (Schedule CG)', desc: 'Classify each capital gains transaction by asset type and holding period, apply the applicable tax treatment, and factor in any exemptions claimed under Sections 54, 54EC, or 54F.' },
  { title: 'Report Foreign Assets, If Applicable (Schedule FA)', desc: 'Disclose every foreign bank account, investment, and asset held during the year in Schedule FA — this disclosure is mandatory regardless of whether the asset produced any income.' },
  { title: 'Compute Total Tax Liability', desc: 'Aggregate income across all applicable heads, apply the relevant regime and rates, and arrive at the final tax payable or refundable figure.' },
  { title: 'File & Submit', desc: 'Submit the completed ITR-2 return on the e-filing portal, after a final review of the capital gains, foreign asset, and other schedules for accuracy.' },
  { title: 'e-Verify Within 30 Days', desc: 'Complete verification via Aadhaar OTP, net banking, or DSC within 30 days of filing — a return that isn\'t verified in time is treated as though it was never filed.' },
];

const dueDateRows: string[][] = [
  ['ITR-2 Filing — Standard Due Date', '31 July of the assessment year', 'Applies to the large majority of ITR-2 filers, since ITR-2 does not involve business income that would otherwise require an audit'],
  ['ITR-2 Filing — Partner in an Audited Firm', '31 October of the assessment year', 'An extended due date applies where a taxpayer\'s only business-adjacent income is remuneration or interest received as a partner from a partnership firm that is itself subject to tax audit'],
  ['Belated Return', '31 December of the assessment year', 'Filed under Section 139(4) after missing the original due date, subject to a late fee under Section 234F'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically where the return is filed after the due date but before 31 December'],
  ['Interest — Sections 234A / 234B / 234C', '1% per month or part thereof', 'Charged respectively for late filing with unpaid tax outstanding, a shortfall in advance tax paid, and deferred or short quarterly instalments'],
  ['Foreign Asset Disclosure (Schedule FA)', 'Same due date as the ITR itself', 'Beyond ordinary late-filing consequences, inaccurate or missing disclosure of foreign assets can separately attract penalty under the Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015'],
  ['e-Verification Deadline', 'Within 30 days of filing', 'A return that isn\'t e-verified within this window is treated in law as though it was never filed'],
];

const faqs = [
  { q: 'Who must file ITR-2?', a: 'Individuals and HUFs who have capital gains, income from more than one house property, foreign income or assets, agricultural income above ₹5,000, a company directorship, unlisted equity shareholding, or total income above ₹50 lakh — provided they have no business or professional income — must file ITR-2.' },
  { q: 'What is the difference between ITR-1 and ITR-2?', a: 'ITR-1 is limited to salary/pension, one house property, and simple other-source income, capped at ₹50 lakh total income. ITR-2 covers everything ITR-1 does not — capital gains, multiple properties, foreign assets, directorships, and unlisted shareholding — with no upper income limit, but still excludes business income entirely.' },
  { q: 'What is the difference between ITR-2 and ITR-3?', a: 'The dividing line is business or professional income. ITR-2 is exclusively for individuals and HUFs without any business/professional income, however complex their capital gains or foreign holdings are. The moment business or professional income enters the picture, ITR-3 becomes the applicable form instead.' },
  { q: 'How are capital gains taxed under ITR-2?', a: 'Treatment varies by asset class and holding period. As per current provisions, listed equity shares and equity-oriented mutual funds attract 20% tax on short-term gains and 12.5% on long-term gains above ₹1.25 lakh in a year (with indexation no longer available for this category); debt mutual funds acquired after the relevant cut-off are taxed at slab rates regardless of holding period; and immovable property held long-term is generally taxed at 12.5% without indexation, subject to transitional rules for property acquired earlier. Rates and thresholds are revised periodically through the Finance Act, so we confirm the applicable rate at the time of filing.' },
  { q: 'Is cryptocurrency or virtual digital asset income covered in ITR-2?', a: 'Yes — gains from cryptocurrency and other virtual digital assets are reported through the dedicated Schedule VDA within ITR-2, taxed under the specific provisions that apply to this asset class rather than the general capital gains rules.' },
  { q: 'What are the foreign asset disclosure requirements in ITR-2?', a: 'Schedule FA requires disclosure of every foreign bank account, investment, immovable property, and any signing authority held in a foreign account during the year — this disclosure is mandatory regardless of whether the asset generated any income, and applies even to resident individuals with even modest foreign holdings.' },
  { q: 'Can NRIs file ITR-2?', a: 'Yes — ITR-2 is available to non-residents and RNOR individuals, and is in fact the form most NRIs use to report India-sourced income such as rental income, capital gains, or interest, often alongside DTAA relief claimed through Form 67.' },
  { q: 'What documents do I need for ITR-2 filing?', a: 'Typically, capital gains statements from your broker or AMC, property sale/purchase records where applicable, foreign asset documentation if you hold any, and the standard Form 16/Form 26AS/AIS — the exact list depends on which of these income types apply to you.' },
  { q: 'How does ComplianceBharo assist with ITR-2 filing?', a: 'We review your income profile to confirm ITR-2 is the right form, compute capital gains transaction by transaction with applicable exemptions, prepare accurate foreign asset disclosures where relevant, reconcile everything against Form 26AS and AIS, file the return, and support you through e-verification.' },
  { q: 'Can I claim exemptions on capital gains under ITR-2?', a: 'Yes — exemptions under Sections 54 (residential property reinvestment), 54EC (specified bonds), and 54F (investment of net sale consideration in a residential property) are all claimable within ITR-2\'s capital gains schedules, subject to each section\'s specific conditions.' },
  { q: 'What if I have both capital gains and freelance income?', a: 'Freelance income is professional income, which ITR-2 does not accommodate — you would need to file ITR-3 instead, which includes both the business/professional income schedules and the capital gains schedule.' },
  { q: 'Do I need to disclose a foreign asset even if it earned no income?', a: 'Yes — Schedule FA disclosure is triggered by simply holding the asset during the year, not by whether it generated taxable income. This is one of the most commonly missed disclosures, and getting it wrong carries its own separate penalty risk.' },
  { q: 'Can losses be carried forward under ITR-2?', a: 'Yes, subject to conditions — capital losses and house property losses can be carried forward to set off against future income of the same type, but only if the return is filed by the original due date under Section 139(1).' },
  { q: 'What is Schedule AL and when does it apply?', a: 'Schedule AL requires disclosure of specified assets — immovable property, vehicles, jewellery, and financial investments — and the corresponding liabilities, and applies once your total income for the year exceeds ₹50 lakh.' },
  { q: 'Is DSC mandatory for filing ITR-2?', a: 'No — individuals filing ITR-2 can verify through Aadhaar OTP, net banking, or a Digital Signature Certificate, whichever is most convenient. DSC is only made mandatory for ITR-6, which applies exclusively to companies.' },
  { q: 'How does clubbing of income work in ITR-2?', a: 'Under Sections 60-64, certain income earned by a spouse, minor child, or other specified relation may need to be clubbed with your own income for tax purposes — ITR-2 provides the schedules to correctly report such clubbed income alongside your own.' },
  { q: 'What happens if I don\'t report a capital gains transaction?', a: 'Since capital gains transactions from brokers and AMCs are also reported to the tax department, an omission in your return is likely to surface as a mismatch during processing, which commonly triggers a reconciliation notice even if the omission was unintentional.' },
  { q: 'Can I revise my ITR-2 after filing?', a: 'Yes — under Section 139(5), a revised return correcting an error or omission can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first.' },
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

export default function ITR2Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-2 Return Filing" />

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
                  Capital Gains, Multiple Properties &amp; Foreign Income Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-2 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  For Individuals &amp; HUFs with Capital Gains, Multiple Properties &amp; Foreign Income
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Schedule CG Computation. Schedule FA Foreign Asset Reporting. DTAA Support. Starting at <span className="text-brand-orange">₹2,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Capital Gains Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-2 Return Filing"} dm={isDarkMode} />
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
                ITR-2 Return Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹2,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on the number of capital gains transactions and schedules involved
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-2?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-2 is the income tax return form for individuals and Hindu Undivided Families (HUFs) whose income goes beyond what the simpler <strong className={dm ? 'text-white' : 'text-slate-900'}>ITR-1</strong> can accommodate, but who still have no business or professional income to report. It sits in the space between ITR-1&apos;s narrow scope and ITR-3&apos;s business-income schedules — built for taxpayers with genuinely more complex personal finances rather than a running business.
              </p>
              <p>
                In practice, ITR-2 becomes necessary the moment any one of a handful of conditions applies: capital gains from shares, mutual funds, or property; income from more than one house property; foreign assets or foreign-sourced income; serving as a director in a company; holding unlisted equity shares at any point during the year; or simply having total income above ₹50 lakh, regardless of how simple the income sources themselves are.
              </p>
              <p>
                It's a notably broader form than ITR-1 in scope — covering capital gains, foreign assets, and virtual digital assets — while still deliberately excluding anything to do with running a business. That distinction is what determines whether ITR-2 or ITR-3 is the correct form for a given taxpayer.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of ITR-2</h2>
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
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Must Use ITR-2</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Meeting any one of the following conditions — not necessarily all of them — is enough to place a taxpayer outside ITR-1&apos;s scope and into ITR-2.
            </p>
            <DataTable headers={['Condition', 'Details']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Who CANNOT file ITR-2: </strong>
              Anyone with business or professional income of any kind — including freelance and consulting income — must use <strong>ITR-3</strong> instead, regardless of how complex or simple their other income sources are.
            </div>
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What You Need Before You Start</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              ITR-2&apos;s broader scope means a somewhat longer list of prerequisites than a simple salaried return.
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
                ComplianceBharo&apos;s ITR-2 filing package starts at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹2,999</strong> as a professional fee for end-to-end assistance, covering capital gains computation, foreign asset reporting, regime comparison, and e-verification support — the full inclusion list is shown in the pricing card above.
              </p>
              <p>
                Where your final quote lands depends on how involved your specific filing turns out to be — the number of capital gains transactions to compute (a handful of trades reads very differently from hundreds across multiple brokers), whether foreign assets need to be disclosed, whether more than one house property is involved, and whether DTAA relief or NRI-specific provisions apply. We assess this during the initial review and confirm the exact scope and fee before beginning work.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              What you need depends on which of ITR-2&apos;s income categories apply to you — here&apos;s the typical checklist by category.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-2 Filing Process — Step by Step</h2>
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
              ITR-2 largely follows the standard individual due date, but foreign asset disclosure carries a penalty risk of its own worth understanding separately.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Foreign asset disclosure matters beyond the ITR itself: </strong>
              Non-disclosure or inaccurate disclosure of foreign assets or income in Schedule FA can attract a penalty of up to ₹10 lakh under the Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015 — a consequence entirely separate from, and in addition to, anything under the Income-tax Act itself.
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
                Have questions about filing your ITR-2 with capital gains or foreign assets? Let our experts help you get it filed accurately.
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
          serviceName="ITR-2 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
