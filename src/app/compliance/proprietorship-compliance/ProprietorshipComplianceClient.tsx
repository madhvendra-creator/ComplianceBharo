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
  { id: 'checklist', label: 'Annual Checklist' },
  { id: 'itr-forms', label: 'ITR-3 vs ITR-4' },
  { id: 'presumptive', label: 'Presumptive Taxation' },
  { id: 'gst', label: 'GST Compliance' },
  { id: 'tax-audit', label: 'Tax Audit' },
  { id: 'documents', label: 'Documents' },
  { id: 'calendar', label: 'Compliance Calendar' },
  { id: 'penalties', label: 'Penalties' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const pricingInclusions = [
  'Income Tax Return Filing (ITR-3/ITR-4)',
  'GST Return Filing Support (if registered)',
  'GSTR-9 Annual Return (if applicable)',
  'Tax Computation & Advance Tax Planning',
  'Presumptive Taxation Assessment (Section 44AD/44ADA)',
  'MSME/Udyam Annual Update',
  'Books of Accounts Review',
  'Tax Audit Coordination (if threshold crossed)',
  'TDS Return Filing (if TAN held)',
  'Dedicated Compliance Expert Support',
];

const overviewFacts: string[][] = [
  ['Income Tax', 'Income-tax Act, 1961', 'ITR-3 or ITR-4', 'Income Tax Department', '31 July (non-audit) / 31 October (audit cases)', 'Starting ₹2,499'],
  ['GST (if registered)', 'CGST Act, 2017 / respective State GST Act', 'GSTR-1, GSTR-3B, and annual GSTR-9', 'GST Department (CBIC / State GST)', 'Monthly or quarterly, plus 31 December for GSTR-9', 'Starting ₹3,999 (bundled with ITR)'],
  ['MSME / Udyam', 'MSME Development Act, 2006', 'Udyam self-declaration update', 'Ministry of MSME (Udyam portal)', 'As and when turnover or investment figures change', 'Included in the Pro plan'],
  ['Shop & Establishment', 'State-specific Shops & Establishments Act', 'Registration renewal', 'State Labour Department', 'State-specific, typically periodic renewal', 'Available on request'],
];

const checklistRows: string[][] = [
  ['ITR Filing', '31 July (non-audit) / 31 October (if tax audit applies)', 'Section 234F — ₹1,000 (income up to ₹5 lakh) or ₹5,000, plus interest on any unpaid tax'],
  ['GST Returns (if registered)', 'GSTR-1 & GSTR-3B on the applicable monthly/quarterly cycle; GSTR-9 by 31 December', '₹50/day combined late fee (capped per return), plus 18% p.a. interest under Section 50'],
  ['Advance Tax', '15 June, 15 September, 15 December, 15 March', 'Section 234C interest on the shortfall for each quarterly instalment, where liability exceeds ₹10,000'],
  ['TDS Returns (if TAN held)', '31 July, 31 October, 31 January, 31 May', 'Section 234E — ₹200/day, capped at the TDS amount deductible for that quarter'],
  ['Udyam Self-Declaration Update', 'Whenever turnover or investment figures materially change', 'No statutory penalty, but a stale declaration risks losing accurate MSME classification and scheme eligibility'],
  ['Shop & Establishment Renewal', 'State-specific — often annual or multi-year', 'Varies by state; typically a fine or risk to the licence\'s validity'],
  ['Professional Tax', 'Varies by state (monthly/annual)', 'State-specific late payment penalty and interest'],
  ['Tax Audit (if applicable)', 'Audit report by 30 September; ITR by 31 October', 'Section 271B — 0.5% of turnover/gross receipts, capped at ₹1.5 lakh'],
];

const itrComparisonRows: string[][] = [
  ['Applicability', 'Business or professional income computed under the regular, books-based method', 'Business or professional income computed on a presumptive basis under Section 44AD, 44ADA, or 44AE'],
  ['Books of Accounts', 'Mandatory, subject to the Section 44AA thresholds and conditions', 'Not required — income is presumed at a fixed percentage of turnover or gross receipts'],
  ['Presumptive Taxation Option', 'Not applicable — the return reflects actual books-based profit', 'Applicable — Section 44AD (6%/8% of turnover) or Section 44ADA (50% of receipts for professionals)'],
  ['Audit Trigger', 'Applies once the Section 44AB turnover/receipts thresholds are crossed', 'Generally avoided, unless declared profit falls below the presumptive rate and total income exceeds the basic exemption limit'],
  ['Best Suited For', 'Proprietors with larger turnover, more complex operations, or who need to claim actual expenses/losses', 'Small and mid-sized proprietors and professionals within the eligible turnover/receipts limits who want simpler compliance'],
];

const taxAuditRows: string[][] = [
  ['Business (Normal)', 'Turnover exceeding ₹1 crore — raised to ₹10 crore where cash receipts and cash payments each stay under 5% of total receipts/payments', 'Form 3CA-3CD or 3CB-3CD, depending on whether the business is otherwise required to get its accounts audited', '30 September', 'Section 271B — 0.5% of turnover, capped at ₹1.5 lakh'],
  ['Professionals', 'Gross receipts exceeding ₹50 lakh', 'Form 3CB-3CD', '30 September', 'Section 271B — 0.5% of gross receipts, capped at ₹1.5 lakh'],
  ['Presumptive Scheme Opt-Out', 'Declared profit falls below the presumptive rate and total income exceeds the basic exemption limit', 'Form 3CB-3CD', '30 September', 'Section 271B, same cap as above'],
];

const documentGroups = [
  { group: 'Financial Records', items: ['Bank statements for the financial year', 'Sales register', 'Purchase register', 'Petty cash and expense records'] },
  { group: 'Tax Documents', items: ['Previous year\'s ITR (if filed)', 'Form 26AS / AIS', 'Advance tax payment challans', 'PAN of the proprietor'] },
  { group: 'GST Documents (If Registered)', items: ['GST returns filed during the year', 'Sales and purchase invoices', 'GST registration certificate', 'E-way bills, where applicable'] },
  { group: 'Registration Proofs', items: ['Udyam registration certificate (if applicable)', 'Shop & Establishment license (if applicable)', 'Aadhaar of the proprietor', 'Bank account proof'] },
];

const calendarRows: string[][] = [
  ['April', '11th & 20th', 'GST returns for the March period — GSTR-1 and GSTR-3B (if registered)'],
  ['May', '11th & 20th', 'GST returns for the April period (if registered)'],
  ['June', '15 June', 'First advance tax instalment — 15% of the estimated annual tax liability'],
  ['July', '31 July', 'ITR filing due date for proprietorships not subject to tax audit'],
  ['August', '11th & 20th', 'GST returns for the July period (if registered)'],
  ['September', '15 & 30 September', '15th: Second advance tax instalment (45% cumulative). 30th: Tax audit report (Form 3CD) due, if applicable'],
  ['October', '31 October', 'ITR filing due date for proprietorships subject to tax audit'],
  ['November', '11th & 20th', 'GST returns for the October period (if registered)'],
  ['December', '15 & 31 December', '15th: Third advance tax instalment (75% cumulative). 31st: GSTR-9 annual return due, if applicable'],
  ['January', '31 January', 'TDS return for the October–December quarter, if the proprietorship holds a TAN'],
  ['February', '11th & 20th', 'GST returns for the January period (if registered)'],
  ['March', '15 March & 31 March', '15th: Fourth and final advance tax instalment (100% cumulative). 31st: Financial year closes — books finalisation begins'],
];

const penaltyRows: string[][] = [
  ['Late ITR Filing', 'Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 otherwise, for returns filed after the due date'],
  ['Late GST Return Filing', 'Section 47, CGST Act', '₹50 per day (₹25 CGST + ₹25 SGST), capped per return, plus 18% p.a. interest under Section 50 on any tax paid late'],
  ['Missed Advance Tax Instalment', 'Section 234C', 'Interest on the shortfall for each quarterly instalment, generally computed at 1% per month'],
  ['Tax Audit Default', 'Section 271B', '0.5% of turnover or gross receipts, capped at ₹1,50,000'],
  ['Under-Reporting / Misreporting of Income', 'Section 270A', '50% of the tax on under-reported income; up to 200% where it qualifies as misreporting'],
];

const comparisonRows: string[][] = [
  ['ROC / MCA Filing', 'None — a proprietorship isn\'t incorporated, so there\'s no annual return or financial statement filing with the ROC', 'Mandatory — Form AOC-4 and MGT-7A every year', 'Mandatory — Form AOC-4 and MGT-7/MGT-7A every year'],
  ['Board Meetings / AGM', 'Not applicable', 'AGM is exempt; no board meeting requirement for a single director', 'A minimum number of board meetings and an AGM are mandatory'],
  ['Statutory Audit', 'Not mandatory below the Section 44AB tax audit threshold', 'Mandatory regardless of turnover', 'Mandatory regardless of turnover'],
  ['Income Tax Return', 'ITR-3 or ITR-4', 'ITR-6', 'ITR-6'],
  ['Relative Compliance Cost', 'Lowest — largely limited to income tax, and GST if registered', 'Moderate — ROC filings plus a mandatory statutory audit', 'Highest — ROC filings, statutory audit, and broader governance requirements'],
  ['Personal Liability', 'Unlimited — the proprietor and the business are legally the same person', 'Limited to the member\'s shareholding', 'Limited to each shareholder\'s shareholding'],
];

const benefitCards = [
  { title: 'Avoid Penalties', desc: 'Filing on time keeps you out of the daily late-fee and interest cycle under Section 234F, Section 47 of the CGST Act, and Section 234C — costs that add up quickly the longer a return stays pending.' },
  { title: 'Clean Tax Record for Loans', desc: 'A consistent filing history across ITRs and GST returns is often the first thing a bank or NBFC checks when assessing a business loan or credit-line application for a proprietorship.' },
  { title: 'GST Input Credit Continuity', desc: 'Staying current on GSTR-1 and GSTR-3B keeps your Input Tax Credit flowing without interruption — lapses in filing can restrict a buyer\'s ability to claim credit on your invoices, which hurts your standing with customers.' },
  { title: 'MSME Scheme Access', desc: 'An active, updated Udyam registration keeps you eligible for MSME-linked benefits — priority sector lending, delayed payment protection under the MSME Development Act, and various government tender preferences.' },
  { title: 'Smooth Future Conversion', desc: 'Well-maintained books and a clean compliance history make it considerably easier to convert the business into an LLP or Private Limited Company later, since due diligence during conversion draws directly on this filing record.' },
  { title: 'Audit-Ready Books', desc: 'Keeping records reconciled year over year means that if turnover eventually crosses the tax audit threshold, the transition into audited books happens smoothly instead of as a scramble.' },
];

const faqs = [
  { q: 'Does a proprietorship need to file anything with the ROC?', a: 'No. A proprietorship isn\'t incorporated under the Companies Act or the LLP Act, so there\'s no Registrar of Companies to file with — no annual return, no financial statements, and no ROC-driven compliance calendar at all.' },
  { q: 'Which ITR form should a proprietor use?', a: 'ITR-3 for business or professional income computed under the regular books-based method, or ITR-4 (Sugam) if opting for presumptive taxation under Section 44AD, 44ADA, or 44AE.' },
  { q: 'Is GST return filing mandatory for a proprietorship?', a: 'Only if the proprietorship is GST-registered. Registration itself becomes mandatory once turnover crosses ₹40 lakh for goods or ₹20 lakh for services (lower in special category states), or where a mandatory-registration category like inter-state supply or e-commerce selling applies.' },
  { q: 'What is presumptive taxation?', a: 'It\'s a simplified computation method under Section 44AD (business, 6%/8% of turnover) or Section 44ADA (specified professionals, 50% of gross receipts) that lets eligible taxpayers declare income at a fixed rate without maintaining detailed books of account.' },
  { q: 'What is the tax audit threshold for a proprietorship?', a: 'For most businesses it\'s turnover exceeding ₹1 crore, raised to ₹10 crore where cash receipts and cash payments each stay under 5% of total receipts and payments. For professionals, the threshold is gross receipts exceeding ₹50 lakh.' },
  { q: 'Is Udyam/MSME registration itself a recurring filing requirement?', a: 'Not exactly — Udyam registration is a one-time process, but it needs to be kept current through a self-declaration update whenever turnover or investment figures change materially, so the classification (micro/small/medium) stays accurate.' },
  { q: 'Does a proprietorship need a separate PAN?', a: 'No. A proprietorship isn\'t a distinct legal entity, so it uses the proprietor\'s own individual PAN for all tax filings — there\'s no separate business PAN to apply for.' },
  { q: 'What is the penalty for late ITR filing?', a: 'Under Section 234F, a late fee of ₹1,000 applies where total income is up to ₹5 lakh, and ₹5,000 otherwise, in addition to any interest payable on unpaid tax under Sections 234A/B/C.' },
  { q: 'What is the penalty for late GST return filing?', a: 'A late fee of ₹50 per day (₹25 CGST + ₹25 SGST), subject to a cap, plus 18% per annum interest under Section 50 on any tax that remains unpaid past the due date.' },
  { q: 'Is Professional Tax applicable to a proprietorship?', a: 'Where the state levies Professional Tax, yes — the proprietor typically registers and pays it directly, and separately for any employees on the payroll, following that state\'s specific rates and due dates.' },
  { q: 'Does a proprietorship need a CA to file its returns?', a: 'Not strictly for a simple ITR-4 filing, but a CA or tax professional becomes valuable once books-based ITR-3 filing, GST reconciliation, or a tax audit is involved, since errors there carry real penalty exposure.' },
  { q: 'Is MSME/Udyam renewal mandatory every year?', a: 'There\'s no fixed annual renewal date for Udyam itself, but the self-declaration needs to be updated whenever the underlying turnover or investment data changes, so the registration doesn\'t fall out of sync with your actual figures.' },
  { q: 'What happens if returns aren\'t filed for multiple years?', a: 'Unfiled ITRs and GST returns compound late fees and interest year after year, increase the chance of a notice or scrutiny, and can result in a GST registration being cancelled by the department for continuous non-filing.' },
  { q: 'How does a proprietorship\'s compliance differ from an OPC\'s?', a: 'An OPC is incorporated, so it carries ROC filings (AOC-4, MGT-7A), a mandatory statutory audit regardless of turnover, and ITR-6 — none of which apply to a proprietorship, which only deals with income tax and GST (if registered).' },
  { q: 'Can a proprietorship claim Input Tax Credit?', a: 'Yes, provided it\'s GST-registered — ITC can be claimed on eligible business purchases the same way as any other registered taxpayer, subject to matching against the supplier\'s GSTR-1/GSTR-2B.' },
  { q: 'Is GSTR-9 mandatory for every GST-registered proprietorship?', a: 'It\'s mandatory once aggregate turnover exceeds ₹2 crore in the financial year. Below that, filing GSTR-9 currently remains optional under government notification.' },
  { q: 'What records should a proprietor maintain even under presumptive taxation?', a: 'Even without formal books, it\'s worth retaining bank statements, sales and purchase records, and GST filings, since these are exactly what gets requested if the return is picked up for verification or if turnover later crosses the presumptive scheme\'s limit.' },
  { q: 'What happens if a proprietor opts out of presumptive taxation?', a: 'Once you opt out of Section 44AD in a given year, you\'re required to maintain regular books of account and get them audited if opted out again within the next 5 consecutive years while having income above the basic exemption limit.' },
  { q: 'Is advance tax applicable to proprietors under presumptive taxation too?', a: 'Yes, though Section 44AD taxpayers get a simplification — instead of four instalments, the entire advance tax liability can be paid in a single instalment by 15 March.' },
  { q: 'Does a home-based proprietorship need Shop & Establishment registration?', a: 'It depends on the state — several states exempt certain home-based or very small establishments, while others require registration regardless of premises type. It\'s worth checking the specific state Act that applies to your location.' },
  { q: 'What is the consequence of not filing a tax audit report on time?', a: 'Section 271B allows a penalty of 0.5% of turnover or gross receipts, capped at ₹1.5 lakh, in addition to the return itself potentially being treated as defective or attracting further scrutiny.' },
  { q: 'Can a proprietorship\'s GST registration be cancelled for non-filing?', a: 'Yes — under Section 29(2) of the CGST Act, a proper officer can cancel a GST registration on their own initiative for continuous non-filing of returns, typically over six months or more.' },
  { q: 'How is turnover computed for GST registration versus tax audit purposes?', a: 'Both use aggregate turnover as reported through business transactions, but the specific thresholds differ — ₹40 lakh/₹20 lakh trigger GST registration, while ₹1 crore (or ₹10 crore) and ₹50 lakh trigger tax audit for business and professional income respectively.' },
  { q: 'How does ComplianceBharo assist with proprietorship compliance filings?', a: 'We handle the full cycle — ITR-3/ITR-4 preparation and filing, GST return reconciliation and GSTR-9 filing where applicable, Udyam update support, and tax audit coordination once your turnover crosses the prescribed threshold — all tracked against your specific due dates.' },
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

export default function ProprietorshipComplianceClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Proprietorship Compliance" />

      {/* Hero + Lead Form */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6 lg:pt-2">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Trusted Annual Filing Support for Sole Proprietors
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-3 h-3 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                Proprietorship Compliance<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Annual Filings for Sole Proprietors</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                Complete tax and GST compliance for sole proprietorships: income tax return, GST annual return (GSTR-9), and MSME update if applicable.
              </p>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Proprietorship Compliance"} dm={isDarkMode} />
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
                Proprietorship Annual Compliance Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹2,499
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

              <div className="flex justify-center mb-6">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105 ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.428-1.428L13.5 18.75l1.183-.394a2.25 2.25 0 001.428-1.428l.394-1.183.394 1.183a2.25 2.25 0 001.428 1.428l1.183.394-1.183.394a2.25 2.25 0 00-1.428 1.428z" /></svg>
                  Get Expert Assistance
                </a>
              </div>

              <p className={`text-center text-xs mb-8 max-w-2xl mx-auto leading-relaxed ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
                *Listed amounts are ComplianceBharo professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Compliance Does a Sole Proprietorship Need?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A sole proprietorship isn't incorporated under any single statute the way a company or an LLP is — there's no Certificate of Incorporation, no CIN, and consequently <strong className={dm ? 'text-white' : 'text-slate-900'}>no MCA or ROC filing requirement</strong> at all. The proprietor and the business are legally one and the same person, operating under the proprietor's own PAN.
              </p>
              <p>
                That doesn't mean there's nothing to file, though. Compliance obligations arise independently from a handful of other laws: the <strong className={dm ? 'text-white' : 'text-slate-900'}>Income-tax Act, 1961</strong> (through ITR-3 or ITR-4), the <strong className={dm ? 'text-white' : 'text-slate-900'}>CGST Act, 2017</strong> if the business is GST-registered, the <strong className={dm ? 'text-white' : 'text-slate-900'}>MSME Development Act, 2006</strong> for Udyam-registered proprietorships, and the relevant <strong className={dm ? 'text-white' : 'text-slate-900'}>state Shops & Establishments Act</strong> where a physical business premises requires registration.
              </p>
              <p>
                Put together, this is what actually keeps a proprietorship compliant year to year — income tax filing, GST returns if registered, an occasional Udyam data update, and any state-specific renewal that applies to your business.
              </p>
            </div>
            <DataTable headers={['Compliance Area', 'Governing Basis', 'Key Filing', 'Regulator', 'Deadline', 'ComplianceBharo Fee']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Annual Compliance Checklist */}
          <div id="checklist" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Annual Compliance Checklist</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A single reference for every filing a proprietorship might need to track through the year — not every item applies to every proprietor, so treat this as a checklist to run against your own situation.
            </p>
            <DataTable headers={['Compliance Item', 'Due Date', 'Penalty']} rows={checklistRows} dm={dm} />
          </div>

          {/* 3. ITR-3 vs ITR-4 */}
          <div id="itr-forms" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-3 vs ITR-4</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The choice between the two forms comes down to whether you're computing income from actual books or opting into a presumptive rate.
            </p>
            <DataTable headers={['Parameter', 'ITR-3', 'ITR-4 (Sugam)']} rows={itrComparisonRows} dm={dm} />
          </div>

          {/* 4. Presumptive Taxation */}
          <div id="presumptive" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Presumptive Taxation Explained</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44AD</strong> lets an eligible business declare profit at <strong className={dm ? 'text-white' : 'text-slate-900'}>6% of turnover received digitally/through banking channels, or 8% of turnover received in cash</strong>, without maintaining detailed books — available where turnover doesn't exceed <strong className={dm ? 'text-white' : 'text-slate-900'}>₹3 crore</strong> in the financial year. That higher ₹3 crore limit itself depends on a condition: cash receipts must stay within 5% of total turnover for the year, or the scheme reverts to the older ₹2 crore ceiling.
              </p>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44ADA</strong> serves specified professionals — like doctors, engineers, architects, and consultants covered under the Act — letting them declare <strong className={dm ? 'text-white' : 'text-slate-900'}>50% of gross receipts</strong> as taxable income, available up to <strong className={dm ? 'text-white' : 'text-slate-900'}>₹75 lakh</strong> in gross receipts, again subject to the same digital-receipts condition for accessing the enhanced limit (the base limit without it is ₹50 lakh).
              </p>
              <p>
                Opting out of either scheme isn't a one-year decision without consequence. Once you declare income below the presumptive rate or step outside the scheme after having used it, you're required to <strong className={dm ? 'text-white' : 'text-slate-900'}>maintain regular books of account and get them audited</strong> if you opt out again within the next 5 consecutive assessment years while your income exceeds the basic exemption limit — a lock-in that's worth factoring in before switching back and forth between presumptive and regular computation.
              </p>
            </div>
          </div>

          {/* 5. GST Compliance */}
          <div id="gst" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Compliance (If Registered)</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A GST-registered proprietorship follows the same recurring return cycle as any other regular taxpayer — <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTR-1</strong> for outward supplies and <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTR-3B</strong> as the summary return with tax payment, filed either monthly or quarterly depending on whether the QRMP scheme has been opted into.
              </p>
              <p>
                On top of that, the <strong className={dm ? 'text-white' : 'text-slate-900'}>annual return, GSTR-9</strong>, becomes mandatory once aggregate turnover crosses <strong className={dm ? 'text-white' : 'text-slate-900'}>₹2 crore</strong> in the financial year, due by <strong className={dm ? 'text-white' : 'text-slate-900'}>31 December</strong> following the year-end. Below that threshold, GSTR-9 currently remains optional under government notification, though some proprietors file it voluntarily to keep a complete annual record.
              </p>
              <p>
                Non-filing carries consequences beyond the late fee itself. A GSTIN that stops filing can find its buyers' <strong className={dm ? 'text-white' : 'text-slate-900'}>Input Tax Credit effectively blocked</strong>, since GSTR-2B won't reflect invoices from a non-compliant supplier. Prolonged default can also trigger <strong className={dm ? 'text-white' : 'text-slate-900'}>e-way bill generation restrictions</strong>, which makes it difficult to move goods at all until the pending returns are cleared.
              </p>
            </div>
          </div>

          {/* 6. Tax Audit Applicability */}
          <div id="tax-audit" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Tax Audit Applicability</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Under Section 44AB, crossing certain turnover or receipts thresholds makes a tax audit mandatory, regardless of whether the proprietorship uses presumptive taxation.
            </p>
            <DataTable headers={['Applicable To', 'Threshold', 'Audit Form', 'Due Date', 'Penalty for Default']} rows={taxAuditRows} dm={dm} />
          </div>

          {/* 7. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              What you'll need depends on whether the proprietorship is GST-registered and whether it holds any additional registrations — here's the full picture across all four categories.
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

          {/* 8. Compliance Calendar */}
          <div id="calendar" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Compliance Calendar</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A month-by-month view of the recurring due dates a proprietorship typically tracks across a financial year — GST dates apply only if registered, and TDS dates only if a TAN is held.
            </p>
            <DataTable headers={['Month', 'Due Date', 'Filing / Compliance']} rows={calendarRows} dm={dm} />
          </div>

          {/* 9. Penalties for Non-Compliance */}
          <div id="penalties" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Penalties for Non-Compliance</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Each compliance area carries its own default provision — missing one doesn't just cost a flat fee, it often compounds with interest the longer it stays unresolved.
            </p>
            <DataTable headers={['Default', 'Provision', 'Penalty / Consequence']} rows={penaltyRows} dm={dm} />
          </div>

          {/* 10. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Proprietorship vs OPC vs Pvt Ltd Compliance Burden</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A proprietorship carries by far the lightest compliance load of the three structures — but that simplicity comes with a trade-off worth weighing carefully.
            </p>
            <DataTable headers={['Parameter', 'Proprietorship', 'OPC', 'Private Limited Company']} rows={comparisonRows} dm={dm} />
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The lower compliance cost of a proprietorship exists precisely because it isn't a separate legal entity — the flip side is <strong className={dm ? 'text-white' : 'text-slate-900'}>unlimited personal liability</strong>. Business debts and legal claims can reach the proprietor's personal assets directly, unlike an OPC or Private Limited Company, where liability stays capped at the shareholder's investment.
            </p>
          </div>

          {/* 11. Benefits of Staying Compliant */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Staying Compliant</h2>
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

          {/* 12. FAQs */}
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
                Have questions about your proprietorship's compliance obligations? Let our experts help you figure out exactly what applies to you.
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
          serviceName="Proprietorship Compliance"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
