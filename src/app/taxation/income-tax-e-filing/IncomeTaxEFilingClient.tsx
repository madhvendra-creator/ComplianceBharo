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
  { id: 'benefits', label: 'Benefits' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'cost', label: 'Cost' },
  { id: 'documents', label: 'Documents' },
  { id: 'steps', label: 'Steps' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Form 26AS and AIS Reconciliation',
  'Old vs New Regime Comparison',
  'Refund Optimization Support',
  'Capital Gains and Business ITR Guidance',
  'Error-Checked Filing and e-Verification',
  'Post Filing Clarification Support',
];

const pricingInclusions = [
  'ITR Form Selection Guidance',
  'Income and Deduction Review',
  'AIS and Form 26AS Reconciliation',
  'Old vs New Regime Tax Comparison',
  'Accurate Return Preparation',
  'e-Filing and e-Verification Support',
  'Refund Tracking Guidance',
  'Basic Notice Readiness Review',
  'Dedicated Professional Assistance',
  'Secure Digital Documentation',
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Filed under Section 139 of the Income-tax Act, 1961, in the format prescribed by Rule 12 of the Income-tax Rules, 1962'],
  ['Filing Portal', 'The official Income Tax Department e-filing portal at incometax.gov.in — the only recognised channel for online ITR submission'],
  ['Applicable Forms', 'Seven forms — ITR-1 through ITR-7 — each mapped to a specific combination of taxpayer type, income source, and turnover/income thresholds'],
  ['Pre-Filled Data', 'The portal auto-populates salary, TDS, interest income, and specified high-value transactions drawn from Form 26AS and the Annual Information Statement (AIS)'],
  ['Verification Window', 'A filed return must be e-verified within 30 days of submission — Aadhaar OTP, net banking, or a Digital Signature Certificate are the accepted modes'],
  ['Filing Window', 'Ordinarily open from 1 April to 31 July of the assessment year for non-audit taxpayers, extendable to a belated window up to 31 December with a late fee'],
];

const keyFeatures = [
  { title: 'Digital Filing & Real-Time Tracking', desc: 'The entire return — from data entry to submission — is completed on the e-filing portal, with a real-time status tracker showing exactly where the return stands: submitted, under processing, or refund issued.' },
  { title: 'Pre-Filled Data from Form 26AS/AIS', desc: 'Salary, TDS, dividend, interest, and specified high-value transactions are pulled in automatically from Form 26AS and the Annual Information Statement, cutting down manual entry and transcription errors.' },
  { title: 'Multiple ITR Forms for Different Income Types', desc: 'Seven distinct forms — ITR-1 through ITR-7 — accommodate everything from a simple salaried return to complex business, partnership, and trust filings, each scoped to a specific income profile.' },
  { title: 'Faster Refund Processing', desc: 'Refunds on accurately filed, promptly e-verified returns are generally processed and credited directly to the taxpayer\'s bank account faster than the paper-filing era ever allowed.' },
  { title: 'e-Verification Options (Aadhaar OTP, Net Banking, DSC)', desc: 'A return only counts as filed once it is verified — taxpayers can choose between Aadhaar-linked OTP, net banking login, or a Digital Signature Certificate, depending on what is available and applicable to their case.' },
  { title: 'Revised Return Facility', desc: 'Under Section 139(5), an error or omission spotted after filing can be corrected by filing a revised return, provided it is done before the statutory deadline for that assessment year.' },
  { title: 'Belated Return Option (With Late Fee)', desc: 'Missing the original due date doesn\'t close the door entirely — a belated return can still be filed up to 31 December of the assessment year under Section 139(4), subject to a late fee under Section 234F.' },
  { title: 'Old vs New Tax Regime Choice', desc: 'Taxpayers can compare their liability under the exemption-heavy old regime against the lower-slab, fewer-deduction new regime each year and pick whichever works out cheaper for their situation.' },
];

const benefitCards = [
  { title: 'Claim Tax Refunds', desc: 'Where tax deducted at source or advance tax paid during the year exceeds the actual liability, filing a return is the only route to getting that excess credited back to your bank account.' },
  { title: 'Proof of Income', desc: 'Banks, embassies, and credit card issuers routinely ask for filed ITRs as the standard, government-recognised proof of income when evaluating loan, visa, or card applications.' },
  { title: 'Carry Forward Losses', desc: 'Business losses, capital losses, and losses under house property can be carried forward to set off against future income — but only if the return reporting them is filed within the original due date.' },
  { title: 'Avoid Penalties & Notices', desc: 'Timely, accurate filing sidesteps the late fee under Section 234F, interest charges under Sections 234A/234B/234C, and a meaningfully higher chance of a mismatch-triggered scrutiny notice.' },
  { title: 'Faster Loan/Visa Approvals', desc: 'A consistent multi-year filing history signals financial stability to lenders and visa-issuing authorities, often smoothing and speeding up the underwriting or application review process.' },
  { title: 'Build a Clean Compliance Record', desc: 'Regular, on-time filing builds a compliance trail that matters well beyond the current year — it supports future audits, business fundraising due diligence, and dealings with regulators.' },
];

const requirementRows: string[][] = [
  ['Mandatory — Income Threshold', 'Total income exceeds the basic exemption limit under either the old or the new tax regime, computed before claiming Chapter VI-A deductions', 'Applies regardless of whether any tax is actually payable after deductions are factored in'],
  ['Mandatory — Foreign Assets or Income', 'Holding any foreign asset (bank account, equity, property) or signing authority in a foreign account, or having foreign-sourced income', 'Filing is compulsory even if total taxable income is below the exemption limit'],
  ['Mandatory — High-Value Current Account Deposits', 'Aggregate deposits above ₹1 crore in one or more current accounts during the financial year', 'One of several "specified financial transaction" triggers designed to widen the tax base'],
  ['Mandatory — Foreign Travel Spend', 'Expenditure above ₹2 lakh on foreign travel for self or on behalf of another person', 'Applies even where the traveller\'s own income is below the exemption limit'],
  ['Mandatory — Electricity Consumption', 'Electricity expenditure exceeding ₹1 lakh in the financial year', 'Another specified-transaction trigger under the proviso to Section 139(1)'],
  ['Mandatory — Business/Professional Turnover', 'Business turnover or professional gross receipts crossing the prescribed thresholds for the year', 'Applies independently of whether presumptive taxation under Section 44AD/44ADA is opted for'],
  ['Voluntary — Refund Claim', 'Tax deducted or collected at source exceeds the taxpayer\'s actual tax liability for the year', 'Filing a return is the only mechanism available to claim that excess back'],
  ['Voluntary — Loss Carry-Forward', 'Business loss, capital loss, or house-property loss that needs to be carried forward to set off against future income', 'The return must be filed by the original due date under Section 139(1) to preserve this right'],
  ['Voluntary — Documentation Needs', 'Visa applications, loan approvals, credit card applications, or tender eligibility requirements', 'A filed ITR commonly serves as the accepted, government-issued proof of income for these purposes'],
];

const costRows: string[][] = [
  ['Salaried Individual', 'ITR-1 (Sahaj)', '₹499'],
  ['Freelancer / Professional (Presumptive Income)', 'ITR-4 (Sugam)', '₹1,999'],
  ['Capital Gains / Multiple Income Sources', 'ITR-2', '₹2,999'],
  ['Business / Professional with Books of Account', 'ITR-3', '₹3,999'],
];

const documentGroups = [
  { group: 'Salaried', items: ['Form 16 from employer(s), especially where you changed jobs during the year', 'Monthly salary slips', 'Bank account statements for the financial year', 'Investment proofs for deductions claimed (Section 80C, 80D, 80G and similar)', 'Form 26AS and Annual Information Statement (AIS)'] },
  { group: 'Freelance / Professional', items: ['Income and expense records, or a simple profit statement for the year', 'Form 26AS reflecting TDS deducted by clients', 'Bank statements covering all business receipts and payments', 'GST returns, where the business is GST-registered'] },
  { group: 'Capital Gains', items: ['Broker or mutual fund capital gains statements for equity and fund transactions', 'Property sale deed and purchase deed, where real estate was sold', 'Records of the cost of acquisition and any cost of improvement'] },
  { group: 'Business', items: ['Profit & Loss account for the financial year', 'Balance sheet as on the last day of the financial year', 'Audit report in Form 3CA/3CB and 3CD, where a tax audit applies', 'GST returns filed for the corresponding period'] },
];

const processSteps = [
  { title: 'Collect Income Documents', desc: 'Gather every source of income for the year — Form 16, bank interest certificates, capital gains statements, rental receipts, or business books — so nothing gets left out of the return.' },
  { title: 'Choose the Correct ITR Form', desc: 'Match your income profile (salary, capital gains, business income, or a combination) against the applicable ITR form, since filing the wrong form results in the return being treated as defective.' },
  { title: 'Reconcile with Form 26AS & AIS', desc: 'Cross-check the TDS, TCS, advance tax, and reported financial transactions in Form 26AS and the Annual Information Statement against your own records, and flag any mismatch before it becomes a notice.' },
  { title: 'Compute Total Income & Tax Liability', desc: 'Aggregate income under all applicable heads, apply the relevant slab or concessional rates under whichever regime is chosen, and arrive at the final tax payable or refundable figure.' },
  { title: 'Claim Eligible Deductions', desc: 'Under the old regime, claim Chapter VI-A deductions such as Section 80C, 80D, and 80G where applicable; under the new regime, apply the more limited set of deductions it still permits.' },
  { title: 'File & e-Verify the Return', desc: 'Submit the completed return on the e-filing portal and complete e-verification — via Aadhaar OTP, net banking, or DSC — within 30 days, since an unverified return is treated as not filed at all.' },
  { title: 'Track Refund Status', desc: 'Once processed, monitor the refund status on the e-filing portal or through the NSDL/TIN refund tracking service, and follow up if the credited amount doesn\'t match what was claimed.' },
];

const dueDateRows: string[][] = [
  ['ITR Filing — Non-Audit Taxpayers', '31 July of the assessment year', 'Applies to most salaried individuals, pensioners, and other taxpayers who are not required to get their accounts audited'],
  ['ITR Filing — Taxpayers Requiring Audit', '31 October of the assessment year', 'Applies where turnover or receipts cross the Section 44AB audit threshold; the tax audit report itself is generally due a month earlier, by 30 September'],
  ['ITR Filing — Transfer Pricing Cases', '30 November of the assessment year', 'An extended date for taxpayers with international or specified domestic transactions that require a Form 3CEB accountant\'s report'],
  ['Belated Return', '31 December of the assessment year', 'Filed under Section 139(4) after missing the original due date; still allowed, but subject to a late fee under Section 234F'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically the moment a return is filed after the original due date but before 31 December'],
  ['Interest — Sections 234A / 234B / 234C', '1% per month or part of a month', 'Charged respectively for late filing with unpaid tax outstanding, a shortfall in advance tax paid, and deferred or short quarterly instalments'],
  ['e-Verification Deadline', 'Within 30 days of filing', 'A return that isn\'t e-verified within this window is treated in law as though it was never filed, regardless of when it was originally submitted'],
];

const faqs = [
  { q: 'Which ITR form applies to me?', a: 'It depends on your income sources: ITR-1 suits salaried individuals with straightforward income, ITR-2 covers capital gains and multiple house properties, ITR-3 applies to business/professional income with books of account, ITR-4 covers presumptive business or professional income, and ITR-5/6/7 apply to firms, companies, and trusts respectively. Our team confirms the right form as part of the review before filing.' },
  { q: 'Is filing an ITR mandatory if my income is below the exemption limit?', a: 'Not automatically — but several conditions can still make it mandatory even below the exemption limit, such as holding foreign assets, high-value current account deposits, foreign travel spend above ₹2 lakh, or electricity bills above ₹1 lakh in the year. Outside these triggers, filing below the limit is voluntary, though often useful for refunds or documentation.' },
  { q: 'What happens if I miss the ITR filing deadline?', a: 'You can still file a belated return under Section 139(4) up to 31 December of the assessment year, but it attracts a late fee under Section 234F and interest on any unpaid tax under Section 234A. Missing the original due date can also forfeit your right to carry forward certain losses.' },
  { q: 'What is the difference between a belated return and a revised return?', a: 'A belated return is one filed after the original due date has passed, under Section 139(4). A revised return, under Section 139(5), corrects errors or omissions in a return that was already filed — either the original or a previously filed belated return — before the statutory deadline for revision.' },
  { q: 'How does e-verification work?', a: 'After submitting your return, you must verify it through Aadhaar-linked OTP, net banking login, a Digital Signature Certificate, or a few other accepted modes, within 30 days of filing. Skipping this step means the return is treated as though it was never filed at all.' },
  { q: 'How long does it take to receive an income tax refund?', a: 'Timelines vary by case, but accurately filed and promptly e-verified returns are generally processed faster than returns with mismatches or manual intervention needed. Refunds are credited directly to the bank account validated and nominated on the e-filing portal.' },
  { q: 'What is the difference between Form 26AS and AIS?', a: 'Form 26AS is the traditional tax credit statement, showing TDS, TCS, and tax payments linked to your PAN. The Annual Information Statement (AIS) is a broader, more recent statement that additionally captures specified financial transactions — like large deposits, securities transactions, and foreign remittances — giving a fuller picture for reconciliation.' },
  { q: 'Should I choose the old tax regime or the new tax regime?', a: 'It depends on how much you claim in deductions and exemptions. The old regime rewards taxpayers with significant Section 80C/80D investments, HRA, or home loan interest, while the new regime offers lower slab rates but with far fewer deductions available. We compare both during the filing process and recommend whichever results in a lower liability.' },
  { q: 'Can I file my ITR without Form 16?', a: 'Yes — Form 16 is convenient but not the only source of data. Salary details can be reconstructed from payslips, the salary structure, and Form 26AS/AIS, particularly useful if an employer delays issuing Form 16 or you changed jobs mid-year.' },
  { q: 'Do I need a Chartered Accountant to file my ITR?', a: 'Not legally, for most individual taxpayers — the e-filing portal allows self-filing. That said, professional review reduces the risk of an incorrect form, a missed deduction, or a reconciliation mismatch, which is where ComplianceBharo\'s assistance adds value even for relatively simple returns.' },
  { q: 'What if I have income from multiple sources — salary, freelancing, and investments?', a: 'You\'ll typically need ITR-2 or ITR-3 depending on whether the freelance income is presumptive or maintained through regular books, since ITR-1 does not accommodate business/professional income or most capital gains. All sources still get reported in a single consolidated return for the year.' },
  { q: 'How does presumptive taxation work for freelancers?', a: 'Under Sections 44ADA (for specified professionals) and 44AD (for eligible businesses), you can declare a prescribed percentage of gross receipts as taxable profit without maintaining detailed books of account or undergoing an audit, provided turnover stays within the prescribed limits.' },
  { q: 'How do I check my refund status?', a: 'Refund status is visible directly on the e-filing portal under your return history, or through the separate NSDL/TIN refund status tracker using your PAN and assessment year.' },
  { q: 'What should I do if I receive a notice from the Income Tax Department?', a: 'Read the notice carefully to identify the section it\'s issued under and the specific discrepancy flagged — commonly a mismatch with Form 26AS/AIS or a defective-return notice. Most notices have a defined response window, and ComplianceBharo can help review the notice and prepare an appropriate response.' },
  { q: 'How does ComplianceBharo assist with ITR filing?', a: 'We help identify the correct ITR form, reconcile your income against Form 26AS and AIS, compare the old and new tax regimes, prepare and file an error-checked return, complete e-verification, and stay available for basic notice-readiness review and refund tracking after filing.' },
  { q: 'What is a defective return, and what penalty applies?', a: 'A defective return is one that is incomplete or inconsistent — a missing schedule, mismatched figures, or an incorrect form for your income type. The department issues a notice under Section 139(9) giving 15 days to correct it; if not corrected, the return can be treated as though it was never filed.' },
  { q: 'Can NRIs use this ITR filing service?', a: 'Yes — NRIs with India-sourced income (rental income, capital gains, interest, or business income) generally need to file an Indian ITR, typically ITR-2 or ITR-3 depending on the income profile, and we assist with that filing including DTAA-related considerations where applicable.' },
  { q: 'How are capital gains from stocks or mutual funds reported?', a: 'Equity and mutual fund transactions are reported under Schedule CG in ITR-2 or ITR-3, classified as short-term or long-term based on the holding period, with gains computed from your broker or fund house\'s capital gains statement for the year.' },
  { q: 'If my employer already deducted TDS, do I still need to file an ITR?', a: 'Generally yes, if your total income crosses the applicable filing threshold — TDS being deducted only reduces the tax outstanding, it doesn\'t substitute for the filing obligation itself, and filing is also how you\'d claim any excess TDS back as a refund.' },
  { q: 'What is the difference between ITR-1 and ITR-4?', a: 'ITR-1 (Sahaj) is for salaried individuals and pensioners with income from salary, one house property, and limited other sources, with total income up to ₹50 lakh. ITR-4 (Sugam) is for individuals, HUFs, and firms (other than LLPs) declaring presumptive income under Sections 44AD, 44ADA, or 44AE.' },
  { q: 'Can I revise my return after e-verifying it?', a: 'Yes — e-verification simply completes the filing of that particular version of the return. If you spot an error afterward, you can file a revised return under Section 139(5) before the statutory revision deadline, and the revised version replaces the earlier one.' },
  { q: 'What if I don\'t have Form 16 and my employer is unresponsive?', a: 'You can still file using your salary slips, offer letter/salary structure, and Form 26AS/AIS, which will reflect any TDS your employer has actually deposited against your PAN, letting you reconstruct salary income independently.' },
  { q: 'Can I claim missed deductions after the financial year has ended?', a: 'Deductions requiring specific proof of investment (like Section 80C instruments) generally need the underlying investment to be made within the relevant financial year or the permitted extension window; once the year closes without the investment, that particular deduction typically can\'t be claimed retroactively.' },
  { q: 'What is the difference between advance tax and self-assessment tax?', a: 'Advance tax is paid in instalments during the financial year itself, based on estimated income, as required under Sections 208 and 211. Self-assessment tax is any balance tax paid after the year ends but before filing the return, to clear the final computed liability under Section 140A.' },
  { q: 'If my income is entirely tax-exempt, do I still need to file an ITR?', a: 'If none of the mandatory filing triggers apply — income threshold, foreign assets, high-value transactions, and so on — filing is not compulsory purely because income is exempt. Many taxpayers with exempt income still choose to file voluntarily to maintain a documented income record.' },
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

export default function IncomeTaxEFilingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Income Tax Return E-Filing" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex flex-col gap-3">
                <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full shadow-sm border text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                  Preferred by taxpayers and business owners across India
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>
                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="text-brand-orange">Income Tax Return E-Filing</span><br />
                  Online in India
                </h1>
                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Accurate ITR Filing with Professional Review in <span className="font-bold text-brand-orange">24 to 48 Hours</span> Starting at <span className="font-bold text-brand-orange">₹499</span>
                </p>
                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Salaried, Freelance, Professional and Business Returns with Complete Reconciliation Support.
                </p>

                <div className={`rounded-2xl border p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-[15px] font-semibold shadow-sm ${dm ? 'bg-[#152033] border-slate-700/60 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  {heroFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5 text-brand-orange">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`mt-3 flex items-center gap-2 text-sm font-medium px-2 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-orange shrink-0">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.568 12.318a.75.75 0 00.364 0c5.504-1.385 9.568-6.376 9.568-12.318 0-1.36-.219-2.665-.635-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM10.25 13.75l-2.03-2.03a.75.75 0 00-1.06 1.06l2.56 2.56a.75.75 0 001.06 0l5.5-5.5a.75.75 0 00-1.06-1.06l-4.97 4.97z" clipRule="evenodd" />
                  </svg>
                  Reviewed by Industry Experts &amp; Startup Specialists.
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Income Tax Return E-Filing"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`pt-6 pb-16 lg:pt-10 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-6">
            <div className="mt-4 flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                  <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                </svg>
                PRICING
              </span>
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>
              Simple &amp; Transparent Pricing
            </h2>
          </div>

          <div className="relative mt-2 rounded-3xl shadow-2xl max-w-4xl mx-auto">
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
                Income Tax Return E-Filing Package
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

              <div className="flex justify-center mt-10">
                <a href="#lead-form" onClick={(e) => scrollToSection(e, 'lead-form')} className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-base ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  Get Expert Assistance
                </a>
              </div>

              <div className="mt-8 text-center text-xs text-slate-500 font-medium px-4">
                *Listed amounts are ComplianceBharo&apos;s professional charges for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Income Tax Return E-Filing: Complete Guide</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Income Tax Return (ITR) e-filing is the annual exercise of declaring your income, the taxes already paid on it, and the exemptions and deductions you&apos;re claiming, to the Income Tax Department — submitted in a prescribed digital format through the department&apos;s own e-filing portal at incometax.gov.in. It replaced the older paper-filing regime entirely for the vast majority of taxpayers, and today it&apos;s the sole recognised channel for filing a valid return.
              </p>
              <p>
                Accuracy in this process matters more than it might first appear. An ITR is what lets you claim back excess tax deducted at source, and it doubles as the most widely accepted proof of income when applying for a home loan, a car loan, a credit card, or a visa. Just as importantly, the return you file gets automatically checked against the data the department already has on you — from Form 16, Form 26AS, and the Annual Information Statement (AIS) — and a mismatch between what you report and what these third-party sources show is one of the most common reasons an otherwise routine return draws scrutiny.
              </p>
              <p>
                What "getting it right" looks like differs by taxpayer. A salaried employee is usually filing to secure a refund and to have a clean, verifiable income document on hand for future financial needs. A freelancer or business owner is filing for a different reason altogether — the return becomes the compliance trail that banks, investors, and government departments will later rely on when evaluating a loan application, a funding round, or a tender, which makes getting the income computation and reconciliation right from the outset far more consequential than it is for a simple salaried filing.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of the E-Filing System</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Benefits */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Filing Your ITR</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefitCards.map((b) => (
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

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Should File an ITR</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Filing obligations fall into two buckets — situations where filing is legally mandatory, and situations where it isn&apos;t required but is still worth doing.
            </p>
            <DataTable headers={['Category', 'Trigger / Condition', 'Why It Matters']} rows={requirementRows} dm={dm} />
          </div>

          {/* 5. Cost */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What It Costs</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ComplianceBharo&apos;s ITR filing packages are scoped by taxpayer type and start at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹499</strong> for a straightforward salaried return. As the income profile gets more involved — presumptive freelance/professional income, capital gains, or business income with full books of account — the applicable package moves up accordingly, since each profile involves meaningfully more computation, schedules, and reconciliation work.
              </p>
            </div>
            <DataTable headers={['Taxpayer Profile', 'Typical ITR Form', 'ComplianceBharo Starting Price']} rows={costRows} dm={dm} />
            <p className={`text-sm leading-relaxed mt-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The final quote for your specific return can move beyond the starting price where the filing involves additional complexity — multiple Form 16s from job changes during the year, capital gains across several instruments, foreign income or foreign asset reporting, or a case that requires tax audit coordination. We confirm the exact scope and final price with you before beginning the filing.
            </p>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              What you need to hand over depends on your income profile — here&apos;s the typical checklist by taxpayer type.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR Filing Process — Step by Step</h2>
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
              The applicable due date depends on whether you need an audit, and missing it doesn&apos;t end your options — it just adds a late fee and interest to the equation.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Don&apos;t skip e-verification: </strong>
              Filing the return is only half the job. A return that isn&apos;t e-verified within 30 days of submission is treated in law as though it was never filed at all — the due-date clock and any late-filing consequences apply as if no return was submitted.
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
                Have questions about filing your ITR? Let our experts help you figure out the right form and the fastest path to getting it filed.
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
          serviceName="Income Tax Return E-Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
