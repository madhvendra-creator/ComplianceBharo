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
  { id: 'who-should-file', label: 'Who Should File' },
  { id: 'structure', label: 'Structure of GSTR-9' },
  { id: 'gstr9-vs-9c', label: 'GSTR-9 vs GSTR-9C' },
  { id: 'reconciliation', label: 'Reconciliation Issues' },
  { id: 'documents', label: 'Documents' },
  { id: 'process', label: 'Filing Process' },
  { id: 'gstr9c', label: 'GSTR-9C Statement' },
  { id: 'penalties', label: 'Late Filing Penalties' },
  { id: 'business-types', label: 'Business Types' },
  { id: 'exemptions', label: 'Exemptions' },
  { id: 'recent-changes', label: 'Recent Changes' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'GSTR-9 Annual Return',
  'GSTR-9C Reconciliation',
  'Sales vs GSTR-1 Matching',
  'ITC Reconciliation',
  'Tax Liability Verification',
  'Professional Assistance',
];

const pricingInclusions = [
  'Complete Data Collection',
  'GSTR-3B vs Books Reconciliation',
  'Tax Payment Verification',
  'GSTR-9 Form Preparation',
  'Filing on GST Portal',
  'GSTR-1 vs Books Reconciliation',
  'ITC Reconciliation with GSTR-2A/2B',
  'HSN Summary Preparation',
  'Professional Review & Approval',
  'Filing Confirmation & ARN',
];

const overviewFacts: string[][] = [
  ['Governing Law', 'Section 44 of the CGST Act, 2017, read with Rule 80 of the CGST Rules, 2017'],
  ['Applicable Form', 'GSTR-9 (Annual Return); GSTR-9C (Reconciliation Statement) for turnover above ₹5 crore'],
  ['Mandatory Threshold', 'Aggregate turnover exceeding ₹2 crore in the financial year'],
  ['GSTR-9C Threshold', 'Aggregate turnover exceeding ₹5 crore in the financial year'],
  ['Filing Frequency', 'Once a year — one consolidated return per GSTIN for the entire financial year'],
  ['What It Consolidates', 'Outward supplies, inward supplies, Input Tax Credit availed/reversed, and tax paid, as already reported across the year\'s GSTR-1 and GSTR-3B filings'],
  ['Due Date', '31 December following the end of the relevant financial year'],
];

const whoShouldFileRows: string[][] = [
  ['Up to ₹2 Crore', 'Optional — may be filed voluntarily even though not mandatory', 'Not applicable'],
  ['₹2 Crore – ₹5 Crore', 'Mandatory', 'Not required'],
  ['Above ₹5 Crore', 'Mandatory', 'Mandatory, self-certified by the taxpayer'],
];

const structureRows: string[][] = [
  ['Part I', 'Basic Details', 'GSTIN, legal name, trade name, and the financial year for which the return is being filed'],
  ['Part II', 'Details of Outward and Inward Supplies', 'A consolidated summary of taxable, exempt, nil-rated, and non-GST supplies declared through the year\'s GSTR-1 and GSTR-3B filings'],
  ['Part III', 'Input Tax Credit (ITC) Details', 'ITC availed during the year as declared in GSTR-3B, ITC reversed, ineligible ITC, and a reconciliation against ITC reflected in GSTR-2B/2A'],
  ['Part IV', 'Tax Paid', 'The actual tax discharged during the year — CGST, SGST, IGST, and Cess — as declared across the year\'s GSTR-3B filings'],
  ['Part V', 'Amendments, Late Fee & Refunds (Prior Year Transactions)', 'Particulars of transactions relating to the previous financial year but declared in returns filed between April and the specified filing month of the current year, along with demands and refunds'],
  ['Part VI', 'HSN Summary & Additional Information', 'HSN-wise summary of outward and inward supplies, late fees payable, and other miscellaneous disclosures'],
];

const gstr9VsGstr9cRows: string[][] = [
  ['Purpose', 'Annual summary return consolidating the year\'s outward supplies, ITC, and tax paid', 'Reconciliation statement matching the figures in GSTR-9 against the taxpayer\'s audited financial statements'],
  ['Legal Basis', 'Section 44(1), CGST Act, 2017 read with Rule 80(1)', 'Section 44(2), CGST Act, 2017 read with Rule 80(3)'],
  ['Who Must File', 'Every regular taxpayer with turnover above ₹2 crore (optional below that)', 'Taxpayers with turnover above ₹5 crore'],
  ['Certification', 'Self-filed by the taxpayer; no external certification required', 'Self-certified by the taxpayer since FY 2020-21 — CA/CMA certification is no longer mandatory'],
  ['Key Content', 'Outward/inward supplies, ITC availed and reversed, tax paid, HSN-wise summary', 'Table-wise reconciliation of turnover, tax paid, and ITC between GSTR-9 and the audited books, with reasons for each variance'],
  ['Data Source', 'The year\'s GSTR-1 and GSTR-3B filings', 'Audited financial statements plus the already-filed GSTR-9'],
  ['Due Date', '31 December following the end of the financial year', '31 December following the end of the financial year, typically filed alongside or right after GSTR-9'],
  ['Late Fee Treatment', 'Late fee under Section 47(2) applies — ₹200/day combined, capped at 0.5% of turnover in the state/UT', 'No dedicated late fee is prescribed specifically for GSTR-9C; non-filing can still attract a general penalty under Section 125'],
];

const reconciliationIssues = [
  {
    title: 'GSTR-3B vs GSTR-1 Turnover Mismatch',
    problem: 'The outward turnover summarised month by month in GSTR-3B often doesn\'t tie out exactly to the invoice-level figures in GSTR-1, because credit notes, rate corrections, and amendments frequently get reported in a different month than the original invoice.',
    solution: 'We reconcile the two on a month-by-month basis across the entire financial year, separating genuine timing differences from actual data entry errors before the consolidated figures go into Table 9 and Table 4 of GSTR-9.',
  },
  {
    title: 'ITC Discrepancies with GSTR-2B',
    problem: 'ITC claimed in GSTR-3B during the year can end up higher or lower than what your suppliers have actually reported against your GSTIN, which is what GSTR-2B reflects — a gap that usually surfaces only when the annual return is being prepared.',
    solution: 'We match ITC claimed each month against the corresponding GSTR-2B, identify supplier-side non-reporting or delayed reporting, and separate eligible credit from ineligible or blocked credit before it\'s reported in Table 8.',
  },
  {
    title: 'HSN Code Mismatches',
    problem: 'HSN codes used across a year\'s worth of GSTR-1 filings can be inconsistent — a code gets revised mid-year, or the required digit count (4-digit vs 6-digit) isn\'t applied uniformly once turnover crosses a threshold partway through the year.',
    solution: 'Rather than stitching together the scattered monthly HSN entries, we rebuild the HSN-wise summary directly from the sales register and verify the applicable digit-count requirement against the year\'s turnover before finalising Table 17.',
  },
  {
    title: 'Export Turnover Differences',
    problem: 'Export turnover reported under LUT/bond in GSTR-3B can diverge from the values on the underlying export invoices and shipping bills, often due to exchange-rate movement or an invoice being reported in a later tax period than the actual shipment.',
    solution: 'We reconcile declared export turnover against shipping bills and, where relevant, FIRC/BRC documentation, and report zero-rated supplies carefully in the relevant table so the figures hold up under review.',
  },
  {
    title: 'Reverse Charge Mismatches',
    problem: 'Tax paid under reverse charge in one month\'s GSTR-3B doesn\'t always line up with the corresponding ITC claimed, especially when the RCM liability is discharged in one tax period and the credit is claimed in a later one.',
    solution: 'We maintain a running reconciliation of RCM liability paid against RCM credit claimed across the year, and cross-check both before they\'re reported in the relevant ITC and tax-paid tables of GSTR-9.',
  },
];

const documentGroups = [
  {
    group: 'Monthly Returns Data',
    items: ['GSTR-1 filed through the financial year', 'GSTR-3B filed through the financial year', 'GSTR-2A/2B statements for the year', 'Credit and debit notes issued and received', 'Amendments made to earlier-period returns', 'Tax payment challans'],
  },
  {
    group: 'Books of Accounts',
    items: ['Sales register', 'Purchase register', 'Trial balance / financial statements', 'Bank statements for the financial year', 'Export/import documentation (shipping bills, bill of entry, FIRC/BRC, where applicable)'],
  },
];

const processSteps = [
  { title: 'Data Collection', desc: 'We gather every GSTR-1, GSTR-3B, and GSTR-2A/2B filed during the financial year, along with the sales register, purchase register, and other supporting books.' },
  { title: 'GSTR-1 Reconciliation', desc: 'Outward supply figures declared across the year\'s GSTR-1 filings are matched against the sales register and books of account, and any variance is isolated for review.' },
  { title: 'GSTR-3B Reconciliation', desc: 'Tax paid and summary turnover figures in GSTR-3B are cross-checked against both GSTR-1 and the books, so any month-level mismatch is caught before it flows into the annual figures.' },
  { title: 'ITC Reconciliation', desc: 'ITC claimed through the year is reconciled against GSTR-2B and the purchase register, separating eligible credit from ineligible, reversed, or lapsed credit.' },
  { title: 'GSTR-9 Preparation', desc: 'All six parts of GSTR-9 are populated using the reconciled figures, along with the HSN-wise summary of outward and inward supplies.' },
  { title: 'Review & Filing', desc: 'The prepared return goes through an internal review before submission on the GST portal using DSC or EVC, concluding with the Application Reference Number (ARN) as filing confirmation.' },
];

const penaltyRows: string[][] = [
  ['Late Fee', '₹100 per day under CGST + ₹100 per day under SGST = ₹200 per day combined'],
  ['Maximum Cap', '0.5% of the taxpayer\'s turnover in the state/UT (0.25% CGST + 0.25% SGST combined)'],
  ['Interest', '18% per annum on any additional tax liability identified and paid at the time of filing GSTR-9'],
  ['Scrutiny Risk', 'A return filed well past its due date is more likely to draw departmental attention during scrutiny or audit selection'],
];

const businessTypes = [
  { title: 'Private Limited Companies', desc: 'GSTR-9 becomes mandatory once turnover crosses ₹2 crore, and GSTR-9C once it crosses ₹5 crore. Filing requires a Digital Signature Certificate (DSC) of the authorised signatory, and reconciliation tends to be more involved given the larger number of vendors, cost centres, and inter-branch transactions typically involved.' },
  { title: 'LLPs & Partnership Firms', desc: 'The same ₹2 crore and ₹5 crore thresholds apply. LLPs must file using the DSC of a designated partner, while partnership firms can generally complete the filing through Aadhaar-based EVC unless they choose to use a DSC instead.' },
  { title: 'Proprietorships', desc: 'A proprietorship crossing the applicable turnover threshold must file GSTR-9 the same way as any other taxpayer, but can typically verify and submit the return using EVC rather than needing a DSC, which keeps the filing process simpler operationally.' },
  { title: 'E-commerce Operators', desc: 'An e-commerce operator required to collect Tax Collected at Source under Section 52 must file GSTR-9 regardless of turnover — the usual ₹2 crore exemption doesn\'t apply to this category, so filing is mandatory even for a comparatively small operator.' },
];

const exemptions = [
  'Casual Taxable Persons',
  'Non-Resident Taxable Persons',
  'Input Service Distributors',
  'TDS/TCS deductors, who instead file GSTR-7 or GSTR-8 for their deduction/collection obligations',
  'Taxpayers with aggregate turnover up to ₹2 crore, for whom filing has been made optional by government notification',
  'UIN holders (foreign diplomatic missions and specified international organisations)',
];

const recentChanges = [
  { title: 'Simplified Optional Tables Below ₹5 Crore', desc: 'For taxpayers with turnover under ₹5 crore, several tables within GSTR-9 have been made optional rather than mandatory, cutting down the volume of granular disclosure required from smaller filers.' },
  { title: 'Self-Certification of GSTR-9C', desc: 'Since FY 2020-21, GSTR-9C no longer needs to be certified by a Chartered Accountant or Cost Accountant — the taxpayer can self-certify the reconciliation statement, though professional review remains advisable given how easily reconciliation errors can be missed.' },
  { title: 'The ₹2 Crore Turnover Exemption', desc: 'Government notifications have continued to keep GSTR-9 filing optional for taxpayers below ₹2 crore turnover, a relief that has been extended year over year rather than being a one-time measure.' },
  { title: 'HSN Reporting Digit Requirements', desc: 'The number of HSN digits required in the summary table depends on turnover — typically 4-digit codes for smaller taxpayers and 6-digit codes once turnover crosses the higher threshold, mirroring the digit requirements that already apply to GSTR-1.' },
  { title: 'GSTR-2B Replacing GSTR-2A for Table 8', desc: 'Table 8 ITC reconciliation is now benchmarked against GSTR-2B rather than GSTR-2A, since GSTR-2B is a static, period-locked statement that makes month-on-month ITC reconciliation considerably more reliable than the dynamically-updating GSTR-2A.' },
];

const faqs = [
  { q: 'What is GSTR-9?', a: 'GSTR-9 is the annual return under Section 44 of the CGST Act, 2017, read with Rule 80, that consolidates all the outward supplies, inward supplies, Input Tax Credit, and tax paid figures a taxpayer has already reported across their monthly or quarterly returns during a financial year.' },
  { q: 'Who must file GSTR-9?', a: 'Every regular GST taxpayer with aggregate turnover exceeding ₹2 crore in the financial year must file GSTR-9. Taxpayers below that threshold can file it voluntarily, since it currently remains optional for them under government notification.' },
  { q: 'What is the due date for GSTR-9?', a: 'GSTR-9 is due by 31 December following the end of the relevant financial year, unless the government extends the deadline through a specific notification.' },
  { q: 'How is the GSTR-9 late fee calculated?', a: 'Late fee accrues at ₹100 per day under CGST and ₹100 per day under SGST — ₹200 per day combined — from the day after the due date until the return is filed, subject to a cap of 0.5% of the taxpayer\'s turnover in that state or UT.' },
  { q: 'What is GSTR-9C?', a: 'GSTR-9C is a reconciliation statement that compares the figures declared in GSTR-9 against the taxpayer\'s audited financial statements, mandatory for taxpayers with aggregate turnover exceeding ₹5 crore in the financial year.' },
  { q: 'Is CA/CMA certification required for GSTR-9C?', a: 'No, not since FY 2020-21. GSTR-9C can now be self-certified by the taxpayer. Professional review is still worth having, since reconciliation errors in this statement can be easy to miss without one.' },
  { q: 'Can GSTR-9 be revised after filing?', a: 'No, GSTR-9 cannot be revised once filed. This makes the reconciliation work done before filing — matching GSTR-1, GSTR-3B, and the books — critical, since errors identified afterward can only be corrected through subsequent periods\' returns, not by amending the annual return itself.' },
  { q: 'Is GSTR-9 mandatory for Composition scheme dealers?', a: 'No. Composition dealers do not file GSTR-9. Their annual return obligation — earlier covered by a separate Form GSTR-9A — has since been merged into Form GSTR-4, which now serves as their consolidated annual filing.' },
  { q: 'What happens if there\'s a discrepancy found during GSTR-9 preparation?', a: 'Where reconciliation uncovers short-paid tax, the differential amount along with applicable interest can be paid voluntarily through Form DRC-03 at the time of filing GSTR-9, rather than waiting for the department to raise a demand.' },
  { q: 'Is the HSN summary mandatory in GSTR-9?', a: 'It is required for taxpayers above the applicable turnover threshold, with the digit requirement (4-digit or 6-digit) depending on turnover. For taxpayers below ₹5 crore, this table has been made optional under the current simplification.' },
  { q: 'What are the consequences of not filing GSTR-9?', a: 'Continued non-filing attracts an escalating late fee (capped at 0.5% of turnover), 18% annual interest on any unpaid tax, and increases the likelihood of the taxpayer being selected for departmental scrutiny or audit.' },
  { q: 'Can additional ITC be claimed while filing GSTR-9?', a: 'No, GSTR-9 is not a mechanism to claim fresh ITC that wasn\'t claimed during the year through GSTR-3B. It only reports and reconciles what was already claimed — any ITC missed during the year and not claimed within the prescribed time limit is generally lost.' },
  { q: 'What is Table 8 of GSTR-9?', a: 'Table 8 reconciles the ITC a taxpayer has availed during the year against what\'s reflected in GSTR-2B, helping identify credit that was claimed but not matched by supplier reporting, or credit that was available but not claimed.' },
  { q: 'Is GSTR-9 filed GSTIN-wise or PAN-wise?', a: 'GSTIN-wise. A business holding multiple GST registrations across different states must file a separate GSTR-9 for each GSTIN, even though they share the same PAN.' },
  { q: 'What is the exemption threshold for GSTR-9?', a: 'Taxpayers with aggregate turnover up to ₹2 crore are currently exempt from mandatory GSTR-9 filing under government notification, though they may still choose to file it voluntarily.' },
  { q: 'Is GSTR-9 filed on a financial year or calendar year basis?', a: 'Financial year basis — it covers 1 April to 31 March, consistent with every other GST return period, and is due by 31 December following the close of that financial year.' },
  { q: 'How are errors from earlier monthly returns corrected through GSTR-9?', a: 'Genuine corrections relating to the previous financial year but identified afterward are reported in Part V of GSTR-9, covering amendments declared in the returns filed between April and the specified filing month of the following year — GSTR-9 itself is a reporting document, not an amendment mechanism.' },
  { q: 'Is a Digital Signature Certificate mandatory for filing GSTR-9?', a: 'DSC is mandatory for companies and LLPs. Proprietorships and other individual filers can typically complete the filing using Aadhaar-based EVC instead.' },
  { q: 'What does professional GSTR-9 filing typically cost?', a: 'Fees vary with turnover, transaction volume, and how much reconciliation work is involved. ComplianceBharo\'s GSTR-9 Filing Package starts at ₹2,999 as our professional fee for end-to-end assistance.' },
  { q: 'Does GSTR-9C have its own separate due date?', a: 'GSTR-9C shares the same due date as GSTR-9 — 31 December following the financial year — and is typically filed alongside or immediately after the GSTR-9 for the same GSTIN.' },
  { q: 'Are UIN holders required to file GSTR-9?', a: 'No. UIN holders — foreign diplomatic missions and specified international organisations registered for GST refund purposes — are exempt from filing GSTR-9.' },
  { q: 'Do TDS or TCS deductors need to file GSTR-9?', a: 'No. Entities registered specifically as TDS or TCS deductors/collectors file their respective returns — GSTR-7 or GSTR-8 — instead of GSTR-9, since their GST obligations are structured differently from a regular taxpayer\'s.' },
  { q: 'How does ComplianceBharo assist with GSTR-9 filing?', a: 'We collect and reconcile the full year\'s GSTR-1, GSTR-3B, GSTR-2A/2B, and books of account, resolve turnover and ITC mismatches before they get carried into the return, prepare the HSN summary, and handle the portal filing through to ARN confirmation — with GSTR-9C support where turnover crosses ₹5 crore.' },
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

export default function GSTR9Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="GSTR-9 Annual Return Filing" />

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
                  GST Annual Return &amp; Reconciliation
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">GSTR-9 Annual Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  GST Annual Return | GSTR-9C Reconciliation Professional Filing Assistance
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Full-year GSTR-1, GSTR-3B, and ITC reconciliation, handled end-to-end. Starting at <span className="text-brand-orange">₹2,999</span> ComplianceBharo professional fee for assistance. Government/statutory fees, if any, are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; GST Reconciliation Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"GSTR-9 Annual Return Filing"} dm={isDarkMode} />
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
                GSTR-9 Filing Package
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
                Government/statutory fees, if applicable, are charged separately at actuals
              </div>
            </div>

            <div className={`relative -mt-16 mx-4 sm:mx-8 mb-8 rounded-2xl p-6 sm:p-8 shadow-xl ${dm ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  <CheckIcon className="w-3.5 h-3.5" /> Reconciliation support
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
                Listed amount is ComplianceBharo&apos;s professional charge for end-to-end GSTR-9 assistance. GST itself carries no separate government fee for annual return filing — the ₹2,999 covers data reconciliation, form preparation, and portal filing support.
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
                Reconciliation support
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is GSTR-9?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                GSTR-9 is the <strong className={dm ? 'text-white' : 'text-slate-900'}>annual return</strong> under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44 of the CGST Act, 2017</strong>, read with <strong className={dm ? 'text-white' : 'text-slate-900'}>Rule 80</strong> of the CGST Rules. It's a once-a-year, GSTIN-wise filing that pulls together everything already reported across the financial year's monthly or quarterly returns — outward supplies, inward supplies, Input Tax Credit availed and reversed, and the tax actually paid — into a single consolidated statement.
              </p>
              <p>
                Think of it less as a fresh disclosure and more as a <strong className={dm ? 'text-white' : 'text-slate-900'}>year-end reconciliation exercise</strong>. The numbers should, in theory, already exist inside GSTR-1 and GSTR-3B — GSTR-9's job is to bring them together, surface any mismatches between what was declared monthly and what the books actually show, and present a single, GSTIN-wise picture for the tax authorities.
              </p>
              <p>
                Filing is <strong className={dm ? 'text-white' : 'text-slate-900'}>mandatory for taxpayers with aggregate turnover exceeding ₹2 crore</strong> in the financial year. Once turnover crosses <strong className={dm ? 'text-white' : 'text-slate-900'}>₹5 crore</strong>, a second filing — the GSTR-9C reconciliation statement — is layered on top. The due date for both is <strong className={dm ? 'text-white' : 'text-slate-900'}>31 December following the end of the financial year</strong>, unless extended by a specific government notification.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Who Should File */}
          <div id="who-should-file" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Should File GSTR-9?</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Applicability turns entirely on aggregate annual turnover, with GSTR-9C layered on above the higher threshold.
            </p>
            <DataTable headers={['Turnover', 'GSTR-9', 'GSTR-9C']} rows={whoShouldFileRows} dm={dm} />
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Composition scheme dealers are not part of this framework at all — their earlier annual return, Form GSTR-9A, has been discontinued and merged into <strong className={dm ? 'text-white' : 'text-slate-900'}>Form GSTR-4</strong>, which now serves as their consolidated yearly filing.
            </p>
          </div>

          {/* 3. Structure of GSTR-9 */}
          <div id="structure" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Structure of GSTR-9</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              GSTR-9 is organised into six parts, moving from basic identification details through to the more detailed reconciliation and disclosure tables.
            </p>
            <DataTable headers={['Part', 'Covers', 'Description']} rows={structureRows} dm={dm} />
          </div>

          {/* 4. GSTR-9 vs GSTR-9C */}
          <div id="gstr9-vs-9c" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>GSTR-9 vs GSTR-9C</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The two are often confused, but they serve distinct purposes and apply at different turnover thresholds.
            </p>
            <DataTable headers={['Parameter', 'GSTR-9', 'GSTR-9C']} rows={gstr9VsGstr9cRows} dm={dm} />
          </div>

          {/* 5. Common Reconciliation Issues */}
          <div id="reconciliation" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Common Reconciliation Issues</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Most of the difficulty in GSTR-9 filing isn't the form itself — it's the reconciliation work that has to happen before the form can be filled in accurately. These are the mismatches we see most often.
            </p>
            <div className="space-y-4">
              {reconciliationIssues.map((issue) => (
                <div key={issue.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>{issue.title}</h3>
                  <div className="space-y-2">
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className={`font-semibold ${dm ? 'text-orange-400' : 'text-orange-600'}`}>The Problem: </span>{issue.problem}
                    </p>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className={`font-semibold ${dm ? 'text-green-400' : 'text-green-600'}`}>Our Approach: </span>{issue.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              GSTR-9 preparation draws from two sources — what was already filed on the GST portal through the year, and the underlying books of account.
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

          {/* 7. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GSTR-9 Filing Process — Step by Step</h2>
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

          {/* 8. GSTR-9C Reconciliation Statement */}
          <div id="gstr9c" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GSTR-9C Reconciliation Statement</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                GSTR-9C becomes relevant once a taxpayer's aggregate turnover crosses <strong className={dm ? 'text-white' : 'text-slate-900'}>₹5 crore</strong> in the financial year. Where GSTR-9 consolidates what was already reported on the GST portal, GSTR-9C goes a step further — it reconciles those figures against the <strong className={dm ? 'text-white' : 'text-slate-900'}>audited financial statements</strong>, table by table, and requires an explanation for any variance between the two.
              </p>
              <p>
                Since <strong className={dm ? 'text-white' : 'text-slate-900'}>FY 2020-21</strong>, GSTR-9C has been <strong className={dm ? 'text-white' : 'text-slate-900'}>self-certifiable</strong> — the earlier requirement for a Chartered Accountant or Cost Accountant to certify the statement was removed, and the taxpayer can now sign it off directly. That said, professional certification isn't mandatory, but it's still a sensible safeguard given how easily a turnover or ITC variance can slip through if the reconciliation isn't reviewed carefully before submission.
              </p>
            </div>
          </div>

          {/* 9. Late Filing Penalties */}
          <div id="penalties" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Late Filing Penalties</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Missing the 31 December deadline triggers a per-day late fee under Section 47(2), capped as a percentage of turnover, plus interest on any tax that remains unpaid.
            </p>
            <DataTable headers={['Component', 'Details']} rows={penaltyRows} dm={dm} />

            <div className={`mt-8 rounded-2xl border p-6 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <h3 className={`text-sm font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Worked Example</h3>
              <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Take a business with turnover of <strong className={dm ? 'text-white' : 'text-slate-900'}>₹3 crore</strong> in a state, whose GSTR-9 is filed <strong className={dm ? 'text-white' : 'text-slate-900'}>90 days</strong> after the 31 December due date. The late fee runs at ₹200/day combined, so:
              </p>
              <div className={`rounded-xl p-4 mb-4 font-mono text-sm ${dm ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                90 days × ₹200/day = ₹18,000<br />
                Cap: 0.5% of ₹3,00,00,000 = ₹1,50,000<br />
                Since ₹18,000 is below the ₹1,50,000 cap, the fee payable is <strong>₹18,000</strong>.
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Now stretch that same delay to <strong className={dm ? 'text-white' : 'text-slate-900'}>800 days</strong>:
              </p>
              <div className={`rounded-xl p-4 font-mono text-sm ${dm ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                800 days × ₹200/day = ₹1,60,000<br />
                Cap: 0.5% of ₹3,00,00,000 = ₹1,50,000<br />
                Since ₹1,60,000 exceeds the cap, the fee payable is capped at <strong>₹1,50,000</strong>.
              </div>
              <p className={`text-sm leading-relaxed mt-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                This is a simplified day-count illustration to show how the cap works — actual liability also depends on whether any additional tax is separately payable, which would draw 18% annual interest on top of the late fee.
              </p>
            </div>
          </div>

          {/* 10. Filing by Business Type */}
          <div id="business-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Filing by Business Type</h2>
            <div className="space-y-4">
              {businessTypes.map((b) => (
                <div key={b.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Exemptions from GSTR-9 */}
          <div id="exemptions" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Exemptions from GSTR-9</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Not every GST-registered person falls under the GSTR-9 requirement — the following categories are exempt:
            </p>
            <div className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {exemptions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 12. Recent Changes */}
          <div id="recent-changes" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Recent Changes to GSTR-9 Filing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentChanges.map((c) => (
                <div key={c.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 13. FAQs */}
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
                Have questions about GSTR-9 or GSTR-9C filing for your business? Let our experts help you figure out the right approach.
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
          serviceName="GSTR-9 Annual Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
