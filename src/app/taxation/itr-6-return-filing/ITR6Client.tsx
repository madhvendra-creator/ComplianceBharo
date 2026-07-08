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
  { id: 'eligibility', label: 'Who Must File' },
  { id: 'structure', label: 'Structure' },
  { id: 'tax-rates', label: 'Tax Rates' },
  { id: 'process', label: 'Filing Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'mat', label: 'MAT' },
  { id: 'schedules', label: 'Key Schedules' },
  { id: 'due-dates', label: 'Due Dates' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Private Limited Company ITR',
  'Public Limited Company ITR',
  'OPC & Section 8 Company ITR',
  'MAT Computation (Section 115JB)',
  'Tax Audit (Form 3CA-3CD)',
  'DSC-Based e-Filing & Verification',
];

const pricingInclusions = [
  'Financial Statement Review',
  'Statutory Audit Coordination',
  'Tax Audit (Form 3CA-3CD)',
  'Computation of Total Income',
  'MAT Computation (Section 115JB)',
  'Schedule SH/AL/ESR Completion',
  'Form 26AS & AIS Reconciliation',
  'ITR-6 Preparation & DSC Filing',
  'e-Verification & Acknowledgement',
  'Post-Filing Notice Support',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Section 139(1) of the Income-tax Act, 1961, as notified annually by the CBDT'],
  ['Applicable To', 'Every company registered under the Companies Act, 2013 (or its 1956 predecessor) that is not claiming exemption under Section 11'],
  ['Not Applicable To', 'Charitable/religious entities claiming Section 11 exemption (file ITR-7); LLPs, firms, and AOP/BOI (file ITR-5)'],
  ['Verification Mode', 'Mandatory Digital Signature Certificate (DSC) of an authorised signatory — Aadhaar OTP and Electronic Verification Code are not valid alternatives'],
  ['Form Complexity', 'One of the most detailed ITR forms, spanning 40+ schedules covering financial statements, income computation, MAT, and disclosures'],
  ['Audit Pre-Requisites', 'Statutory audit under the Companies Act, 2013 and (where applicable) tax audit under Section 44AB must both be completed before filing'],
  ['Filing Mode', '100% online through the income tax e-Filing portal, in either JSON utility or online form mode'],
];

const eligibilityRows: string[][] = [
  ['Private Limited Company', 'Must file ITR-6 every year regardless of whether it made a profit, incurred a loss, or remained inactive'],
  ['Public Limited Company', 'Same filing obligation as a private company, with additional schedules where the company is listed or widely held'],
  ['One Person Company (OPC)', 'A single-shareholder company remains a distinct corporate taxpayer and files ITR-6 like any other company'],
  ['Section 8 Company (not claiming Section 11)', 'A non-profit company that has not registered under Section 12A/12AB to claim charitable-trust exemption is taxed as an ordinary company and files ITR-6'],
  ['Foreign Company with India-sourced income', 'Must report income accruing or arising in India, or received in India, subject to relief available under an applicable Double Taxation Avoidance Agreement'],
  ['Nidhi Company', 'A mutual-benefit company recognised under Section 406 of the Companies Act, 2013, files ITR-6 in the same manner as any other company'],
  ['Government Company', 'A company in which the Central or State Government holds 51% or more of the paid-up share capital continues to be assessed as a company under ITR-6'],
  ['Dormant / Inactive Company', 'Even a company holding "dormant" status under Section 455 of the Companies Act, or one with no transactions during the year, must file a nil ITR-6 return — incorporation itself creates the filing obligation'],
];

const structureRows: string[][] = [
  ['Financial Statements', 'Schedule Manufacturing Account, Schedule Trading Account, Schedule Profit & Loss, Schedule Balance Sheet'],
  ['Income Computation', 'Schedule BP (Business/Profession), Schedule CG (Capital Gains), Schedule OS (Other Sources), Schedule HP (House Property)'],
  ['Loss & Deduction', 'Schedule CYLA (Current Year Loss Adjustment), Schedule BFLA (Brought Forward Loss Adjustment), Schedule VI-A (Chapter VI-A Deductions)'],
  ['MAT & Tax Computation', 'Schedule MAT (Minimum Alternate Tax under Section 115JB), Schedule MATC (MAT Credit under Section 115JAA)'],
  ['Disclosure Schedules', 'Schedule SH (Shareholding Pattern), Schedule AL (Assets & Liabilities), Schedule ESR (Scientific Research Expenditure), Schedule TPSA (Transfer Pricing Secondary Adjustment)'],
];

const taxRateRows: string[][] = [
  ['Domestic Company — turnover up to ₹400 crore (in the prescribed base year)', '25%', '26.00% – 29.12%', 'Standard regime; the full range of exemptions, incentives and deductions under the Act remains available'],
  ['Domestic Company — turnover above ₹400 crore', '30%', '31.20% – 34.94%', 'Standard regime; same exemptions and deductions as above, taxed at the higher slab rate'],
  ['Section 115BAA — Concessional Regime', '22%', '25.17% (flat)', 'Open to any domestic company irrespective of turnover, provided it forgoes specified exemptions, incentives and additional depreciation; election made in Form 10-IC is irrevocable once exercised'],
  ['Section 115BAB — New Manufacturing Companies', '15%', '17.16% (flat)', 'Domestic manufacturing company set up and registered on or after 1 October 2019 and commencing production within the prescribed timeline; election made in Form 10-ID is irrevocable'],
  ['Foreign Company', '35%', '36.40% – 38.22%', 'Applies to income accruing or arising in India; surcharge and cess apply on slab; relief may be available under an applicable tax treaty'],
];

const processSteps = [
  { title: 'Finalize Audited Financial Statements', desc: 'Close the books for the financial year and finalise the Profit & Loss Account, Balance Sheet, and Cash Flow Statement in the format prescribed under Schedule III of the Companies Act, 2013.' },
  { title: 'Complete Statutory Audit', desc: 'The company\'s statutory auditor examines the finalised financial statements and issues an audit opinion as required under Section 143 of the Companies Act, 2013 — a mandatory step for every company, irrespective of size or turnover.' },
  { title: 'Obtain Tax Audit Report (Form 3CA-3CD)', desc: 'Where turnover, receipts, or other thresholds under Section 44AB are crossed, a Chartered Accountant conducts a separate tax audit and certifies Form 3CA-3CD, examining the computation of income under the Income-tax Act specifically.' },
  { title: 'Prepare Computation of Total Income', desc: 'Adjust the audited book profit for items treated differently under tax law — depreciation, disallowances, exempt income, and Chapter VI-A deductions — to arrive at the total income chargeable to tax.' },
  { title: 'Log in to the e-Filing Portal', desc: 'Access the company\'s account on the income tax e-Filing portal using its registered credentials and select ITR-6 for the relevant assessment year.' },
  { title: 'Fill All Schedules with DSC', desc: 'Populate every applicable schedule — financial statements, income computation, MAT, and disclosure schedules — and authenticate the return using the Digital Signature Certificate of an authorised signatory, since DSC is the only valid verification mode for companies.' },
  { title: 'Verify, Submit & Download Acknowledgement', desc: 'Once the DSC-based verification is successfully completed, the return is submitted and an ITR-V acknowledgement is generated instantly — no separate physical or electronic verification step is needed for companies.' },
];

const documentGroups = [
  {
    group: 'Financial Statements',
    items: ['Audited Profit & Loss Account for the financial year', 'Audited Balance Sheet as on the last day of the financial year', 'Cash Flow Statement, where applicable to the company'],
  },
  {
    group: 'Audit Reports',
    items: ['Statutory Auditor\'s Report issued under the Companies Act, 2013', 'Tax Audit Report in Form 3CA-3CD, where Section 44AB applies'],
  },
  {
    group: 'Tax Computation',
    items: ['Computation of Total Income for the assessment year', 'MAT Computation Statement under Section 115JB, where applicable'],
  },
  {
    group: 'Tax Credits',
    items: ['Form 26AS and Annual Information Statement (AIS)', 'Advance tax and self-assessment tax payment challans'],
  },
  {
    group: 'Corporate Documents',
    items: ['Board Resolution authorising the ITR-6 filing', 'Company\'s Digital Signature Certificate (DSC) for verification'],
  },
  {
    group: 'Special Reports (where applicable)',
    items: ['Form 3CEB for international or specified domestic transactions', 'CSR expenditure report, where the company is subject to Section 135 obligations'],
  },
];

const matComparisonRows: string[][] = [
  ['Tax Base', 'Total Income computed under the normal provisions of the Income-tax Act, 1961', 'Book Profit computed under Explanation 1 to Section 115JB, starting from net profit in the audited P&L account'],
  ['Applicable Rate', 'Slab / concessional rate depending on the regime chosen (30%, 25%, 22% or 15%, plus surcharge and cess)', 'Flat 15% of book profit, plus applicable surcharge and cess'],
  ['When It Governs', 'Always forms the base computation for every company', 'Applies only when tax computed under the normal provisions is less than 15% of book profit'],
  ['Exemptions & Deductions', 'Full range of Chapter VI-A deductions and other incentives available under the standard or concessional regime chosen', 'Book profit is adjusted only for the specific additions and deductions listed in Explanation 1 — most regular tax deductions are added back'],
  ['Credit for Excess Tax Paid', 'Not applicable', 'Excess MAT paid over normal tax becomes MAT credit under Section 115JAA, carried forward for 15 assessment years and set off in years when normal tax exceeds MAT'],
  ['Applicability to 115BAA/115BAB Companies', 'Governs the tax liability directly', 'Not applicable — companies that have opted for Section 115BAA or 115BAB are fully exempt from MAT under Section 115JB(5A)'],
];

const keySchedules = [
  { title: 'Schedule SH — Shareholding Pattern', desc: 'Requires an unlisted company to disclose its complete shareholding pattern as on the last day of the financial year — the number and class of shares and the percentage holding of every shareholder — along with any changes in shareholding during the year, mirroring the disclosures already made to the Registrar of Companies.' },
  { title: 'Schedule AL — Assets and Liabilities', desc: 'Where a company\'s total income exceeds ₹50 lakh in a year, this schedule requires it to report the cost of specified assets — immovable property, jewellery, vehicles, and financial assets such as shares and deposits — and the corresponding liabilities as on 31 March, with a narrower disclosure format available for companies meeting certain concessional criteria.' },
  { title: 'Schedule ESR — Expenditure on Scientific Research', desc: 'Captures deductions claimed under Section 35 for capital and revenue expenditure on in-house or sponsored scientific research, including weighted deductions available for contributions made to approved research associations, universities, or notified research programs.' },
  { title: 'Schedule TPSA — Secondary Adjustment to Transfer Price', desc: 'Applies under Section 92CE where a primary transfer pricing adjustment has already been made — through an Advance Pricing Agreement, a Mutual Agreement Procedure resolution, or an accepted audit adjustment — and the resulting excess money has not been repatriated to India within the prescribed period, requiring notional interest income to be imputed on the unrepatriated balance.' },
  { title: 'Schedule CYLA / BFLA — Loss Adjustment', desc: 'Schedule CYLA sets off current-year losses under one head of income against current-year income under another head, following the ordering rules in the Income-tax Act. Schedule BFLA then applies brought-forward losses and unabsorbed depreciation from earlier years against whatever income remains after the current-year set-off.' },
  { title: 'Schedule VI-A — Chapter VI-A Deductions', desc: 'Consolidates the narrower set of Chapter VI-A deductions available to companies — largely profit-linked deductions such as Sections 80-IA/80-IB/80-IC for specified undertakings, Section 80JJAA for additional employee cost, Section 80G for donations, and Section 80LA for units in an IFSC.' },
  { title: 'Schedule DEP — Depreciation', desc: 'Computes depreciation allowable under Section 32 and the Income-tax Rules on a block-of-assets basis, applying the prescribed rates to the written-down value. Because tax depreciation methods differ from the book depreciation charged in the audited financial statements, the two figures rarely match.' },
  { title: 'Schedule TDS — Tax Deducted / Collected at Source', desc: 'Consolidates every tax deduction and collection at source reported against the company\'s PAN, matched line by line with Form 26AS and the Annual Information Statement. Mismatches in this schedule are among the most common triggers for a routine income tax notice.' },
];

const dueDateRows: string[][] = [
  ['Tax Audit Report (Form 3CA-3CD)', '30 September of the assessment year', 'Must be finalised a full month ahead of the ITR due date; delay can attract a penalty under Section 271B of 0.5% of turnover, up to ₹1,50,000'],
  ['ITR-6 Filing — companies liable to audit', '31 October of the assessment year', 'The standard due date applicable to the large majority of companies, since virtually every company crosses the Section 44AB audit threshold or requires a statutory audit under the Companies Act'],
  ['ITR-6 Filing — cases involving transfer pricing (Form 3CEB)', '30 November of the assessment year', 'Extended due date available where the company has entered into international transactions or specified domestic transactions requiring a Form 3CEB accountant\'s report'],
  ['Late Filing Fee — Section 234F', '₹5,000 (₹1,000 where total income does not exceed ₹5 lakh)', 'Levied automatically where the return is filed after the due date but before 31 December of the assessment year'],
  ['Interest for Late Filing — Section 234A', '1% per month or part thereof', 'Charged on unpaid tax from the original due date until the date the return is actually filed'],
  ['Interest for Advance Tax Shortfall — Section 234B', '1% per month or part thereof', 'Applies where advance tax paid during the year is less than 90% of the company\'s assessed tax liability'],
  ['Interest for Deferred Instalments — Section 234C', '1% per month for each deferred or short instalment', 'Applies where any of the four quarterly advance tax instalments is paid short of the prescribed percentage'],
  ['Prosecution for Wilful Non-Filing — Section 276CC', 'Rigorous imprisonment from 3 months up to 7 years, plus fine', 'Applies to wilful failure to file the return, with the higher end of imprisonment reserved for cases where the tax sought to be evaded exceeds ₹25 lakh'],
];

const benefitCards = [
  { title: 'Avoid Penalties & Prosecution', desc: 'Filing within the due date sidesteps the late fee under Section 234F, the compounding monthly interest under Sections 234A/234B/234C, and — in serious cases of wilful default — the risk of prosecution under Section 276CC.' },
  { title: 'Carry Forward Losses', desc: 'Business losses and capital losses can only be carried forward to future years if the return is filed by the original due date under Section 139(1); missing the deadline generally forfeits this right, though unabsorbed depreciation remains an exception.' },
  { title: 'Banking & Credit Facility', desc: 'Banks and NBFCs routinely ask for the last 2-3 years of filed ITRs and audited financials while evaluating loan and credit-limit applications — a consistent filing record strengthens the company\'s case.' },
  { title: 'Faster Refund Processing', desc: 'Returns filed early in the filing window are typically processed and refunded sooner, since they enter the queue ahead of the pre-deadline rush that the tax department handles every year.' },
  { title: 'Government Tender Eligibility', desc: 'Public sector undertakings and government departments commonly require recent, timely-filed ITRs as part of the financial eligibility criteria for tender participation and empanelment.' },
  { title: 'MCA Compliance Synergy', desc: 'Figures reported in ITR-6 are increasingly cross-verified against MCA filings such as AOC-4 and MGT-7; keeping both sets of filings aligned and on schedule reduces the chance of a reconciliation-triggered notice.' },
];

const faqs = [
  { q: 'What is ITR-6 and who needs to file it?', a: 'ITR-6 is the income tax return form prescribed for every company registered under the Companies Act, 2013 (or its 1956 predecessor) that is not claiming exemption under Section 11. This covers Private Limited Companies, Public Limited Companies, OPCs, Section 8 Companies not claiming charitable exemption, Nidhi Companies, Government Companies, and foreign companies with India-sourced income.' },
  { q: 'What is the difference between ITR-6 and ITR-5?', a: 'ITR-6 is exclusively for companies assessed under the Companies Act, while ITR-5 is used by partnership firms, LLPs, AOPs, BOIs, and other non-company entities. ITR-6 also mandates DSC-based verification and includes company-specific schedules such as MAT, Schedule SH, and Schedule AL that do not appear in ITR-5.' },
  { q: 'Is tax audit mandatory for all companies filing ITR-6?', a: 'Not automatically — tax audit under Section 44AB is triggered only when a company\'s turnover, gross receipts, or other specified thresholds are crossed. In practice, most active companies do cross these thresholds, but a genuinely small or dormant company may fall outside the tax audit requirement while still needing a Companies Act statutory audit.' },
  { q: 'Is a Digital Signature Certificate (DSC) mandatory for ITR-6 filing?', a: 'Yes. Unlike individual taxpayers, companies cannot verify their return using Aadhaar OTP or an Electronic Verification Code. The return must be digitally signed using the Class 3 DSC of an authorised signatory — typically a director — before it is treated as validly filed.' },
  { q: 'What are the current corporate tax rates for companies in India?', a: 'A domestic company can be taxed at 25% or 30% under the standard regime (turnover-dependent), or opt into concessional flat rates of 22% under Section 115BAA or 15% under Section 115BAB (for new manufacturing companies). Foreign companies with India-sourced income are taxed at 35%. All rates attract applicable surcharge and a 4% Health & Education Cess.' },
  { q: 'What is MAT (Minimum Alternate Tax) under Section 115JB?', a: 'MAT ensures that companies reporting healthy book profits but low taxable income due to exemptions and deductions still pay a minimum level of tax — currently 15% of book profit. It applies whenever tax computed under the normal provisions works out to less than 15% of book profit.' },
  { q: 'What is Schedule SH in ITR-6?', a: 'Schedule SH requires an unlisted company to disclose its complete shareholding pattern as on the last day of the financial year, including any changes in shareholding that occurred during the year, giving the tax department visibility into beneficial ownership.' },
  { q: 'What is Schedule AL in ITR-6?', a: 'Schedule AL applies once a company\'s total income exceeds ₹50 lakh in a year and requires disclosure of specified assets — such as immovable property, vehicles, jewellery, and financial investments — along with the liabilities held against them, as on 31 March.' },
  { q: 'What is Schedule ESR in ITR-6?', a: 'Schedule ESR captures the deduction claimed under Section 35 for expenditure incurred on scientific research, whether carried out in-house or through contributions to approved research institutions, universities, or notified programs.' },
  { q: 'What is the due date for filing ITR-6?', a: 'For companies subject to audit, the standard due date is 31 October of the assessment year. Companies that have entered into international or specified domestic transactions requiring a Form 3CEB transfer pricing report get an extended due date of 30 November.' },
  { q: 'What are the penalties for late filing of ITR-6?', a: 'A late fee of up to ₹5,000 applies under Section 234F, along with monthly interest on any unpaid tax under Section 234A. Persistent or wilful non-filing can additionally attract prosecution under Section 276CC, with imprisonment ranging from 3 months to 7 years depending on the amount of tax evaded.' },
  { q: 'How is advance tax computed for companies filing ITR-6?', a: 'Companies must estimate their total tax liability for the year — including any MAT liability — and pay it in four instalments (15%, 45%, 75%, and 100% of the estimated tax by 15 June, 15 September, 15 December, and 15 March respectively). Shortfalls in any instalment attract interest under Sections 234B and 234C.' },
  { q: 'What is Section 115BAA and who should opt for it?', a: 'Section 115BAA offers any domestic company a flat 22% tax rate (25.17% effective) in exchange for giving up specified exemptions, incentives, and additional depreciation claims. It generally suits companies that do not have significant unclaimed incentives or brought-forward benefits worth preserving, since the election, once made in Form 10-IC, cannot be withdrawn.' },
  { q: 'What is Section 115BAB and how is it different from 115BAA?', a: 'Section 115BAB offers an even lower 15% flat rate (17.16% effective), but it is restricted to new domestic manufacturing companies incorporated on or after 1 October 2019 that commence production within the prescribed timeline. Section 115BAA, by contrast, is open to any domestic company regardless of business activity or incorporation date.' },
  { q: 'What financial statements are required for ITR-6 filing?', a: 'A company needs its audited Profit & Loss Account, audited Balance Sheet, and (where applicable) Cash Flow Statement, along with the statutory auditor\'s report and, where Section 44AB applies, the tax audit report in Form 3CA-3CD.' },
  { q: 'Is a transfer pricing report (Form 3CEB) required for every company?', a: 'No. Form 3CEB is required only where a company has entered into international transactions with associated enterprises, or specified domestic transactions crossing the prescribed threshold under Sections 92B and 92BA. Companies without such transactions do not need to file it.' },
  { q: 'Can a dormant or inactive company skip filing ITR-6?', a: 'No. A company incorporated under the Companies Act must file ITR-6 every year — even a nil return — for as long as it remains on the register, regardless of whether it carried out any business activity, holding "dormant" status under Section 455 does not remove this obligation.' },
  { q: 'What role do Form 26AS and AIS play in ITR-6 filing?', a: 'Form 26AS and the Annual Information Statement consolidate every tax deducted or collected at source, along with advance tax payments and reported financial transactions linked to the company\'s PAN. Reconciling these against the company\'s own books before filing helps avoid mismatches that commonly trigger scrutiny notices.' },
  { q: 'Can a company revise its ITR-6 after filing?', a: 'Yes. A revised return can be filed under Section 139(5) at any time before three months prior to the end of the relevant assessment year, or before completion of assessment, whichever is earlier — provided the original return was filed within the statutory timelines.' },
  { q: 'What happens if a company doesn\'t pay MAT despite being liable?', a: 'Unpaid MAT liability is treated the same as any other unpaid tax — it attracts interest under Sections 234B and 234C for shortfall in advance tax payment, and the return itself risks being flagged as defective if the MAT computation in Schedule MAT does not match the tax actually paid.' },
  { q: 'Can ITR-6 be filed without statutory audit completion?', a: 'Practically, no. ITR-6 requires figures from the audited financial statements to be entered across multiple schedules, and the tax audit report (where applicable) must be furnished before the ITR itself. Filing before the audits are complete typically means filing with provisional or inaccurate figures, inviting later correction.' },
  { q: 'What is the penalty for not maintaining books of account before filing ITR-6?', a: 'Failure to maintain the books of account required under Section 44AA (or the Companies Act\'s own bookkeeping requirements) can attract a penalty of up to ₹25,000 under Section 271A, in addition to making it practically impossible to prepare an accurate return or pass audit scrutiny.' },
  { q: 'Can losses be carried forward if ITR-6 is filed after the due date?', a: 'Generally, no — Section 80 requires the return to be filed by the original due date under Section 139(1) for business losses and capital losses to be eligible for carry-forward. Unabsorbed depreciation is a notable exception and can still be carried forward even where the return is filed late.' },
  { q: 'How does ComplianceBharo assist Private Limited Companies with ITR-6 filing?', a: 'We coordinate the full pre-filing sequence — reviewing the finalised financial statements, working with your statutory and tax auditors, computing MAT liability and total income, reconciling Form 26AS and AIS, and completing every applicable schedule (including SH, AL and ESR) — before filing and DSC-verifying the return on your behalf.' },
  { q: 'Why choose ComplianceBharo for ITR-6 filing?', a: 'ComplianceBharo brings together financial statement review, audit coordination, MAT computation, and schedule-by-schedule preparation under one transparent, fixed professional fee, with support extending to post-filing notices if the tax department raises a query after the return is processed.' },
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

export default function ITR6Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  const dm = isDarkMode;

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-6 Return Filing" />

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
                  Company Income Tax Return & MAT Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-6 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Company Income Tax Return for Pvt Ltd, OPC &amp; Public Companies
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Statutory Audit Coordination. Tax Audit (Form 3CA-3CD). MAT Computation. DSC-Based Filing &amp; Verification. Starting at <span className="text-brand-orange">₹7,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Corporate Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-6 Return Filing"} dm={isDarkMode} />
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
                ITR-6 Company Return Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹7,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on audit completion and schedule complexity
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
                Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-6?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-6 is the income tax return form prescribed by the CBDT for every company registered under the <strong className={dm ? 'text-white' : 'text-slate-900'}>Companies Act, 2013</strong> that is not claiming exemption under Section 11. This single form covers Private Limited Companies, Public Limited Companies, One Person Companies, Section 8 Companies that have not opted into charitable-trust exemption, Nidhi Companies, and foreign companies with income sourced in India.
              </p>
              <p>
                It is widely regarded as the most detailed of the seven ITR forms, running to <strong className={dm ? 'text-white' : 'text-slate-900'}>over 40 schedules</strong> that capture everything from the audited Profit &amp; Loss Account and Balance Sheet to Minimum Alternate Tax computation, shareholding disclosures under Schedule SH, asset disclosures under Schedule AL, scientific research deductions under Schedule ESR, and transfer pricing secondary adjustments under Schedule TPSA. Very few of these schedules are optional in practice — a company with any meaningful scale of operations ends up populating most of them.
              </p>
              <p>
                Verification works differently for companies than for individuals: ITR-6 must be authenticated using the <strong className={dm ? 'text-white' : 'text-slate-900'}>Digital Signature Certificate (DSC)</strong> of an authorised signatory. Aadhaar OTP and the Electronic Verification Code, both common shortcuts for individual taxpayers, are simply not available here. And before a single figure can be entered into the return, two separate audits typically need to be completed — the <strong className={dm ? 'text-white' : 'text-slate-900'}>statutory audit</strong> mandated for every company under the Companies Act, 2013, and the <strong className={dm ? 'text-white' : 'text-slate-900'}>tax audit</strong> under Section 44AB, certified in Form 3CA-3CD, wherever the prescribed turnover or receipt thresholds are crossed.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Who Must File */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Must File ITR-6?</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The test for ITR-6 eligibility is corporate status, not profitability or scale of operations. Every entity below must file it for as long as it remains an active company on the register.
            </p>
            <DataTable headers={['Entity Type', 'Filing Requirement']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Who should NOT file ITR-6: </strong>
              Charitable or religious entities structured as a Section 8 company but registered under Section 12A/12AB to claim Section 11 exemption must file <strong>ITR-7</strong> instead. Similarly, LLPs, partnership firms, and Associations of Persons/Bodies of Individuals are not companies at all and must file <strong>ITR-5</strong>.
            </div>
          </div>

          {/* 3. ITR-6 Structure */}
          <div id="structure" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-6 Structure — Key Schedule Categories</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The form is organised into a general Part A, a computation-driven Part B, and a long tail of schedules grouped broadly into five categories.
            </p>
            <DataTable headers={['Category', 'Key Schedules']} rows={structureRows} dm={dm} />
          </div>

          {/* 4. Corporate Tax Rates */}
          <div id="tax-rates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Corporate Tax Rates</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Companies choose between the standard slab-based regime and two concessional flat-rate regimes, each carrying its own trade-offs.
            </p>
            <DataTable headers={['Category', 'Nominal Rate', 'Effective Rate*', 'Key Conditions']} rows={taxRateRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Effective rate includes applicable surcharge (nil up to ₹1 crore of total income, an intermediate slab between ₹1-10 crore, and the highest slab above ₹10 crore for domestic companies; a similar two-tier structure for foreign companies) plus a 4% Health &amp; Education Cess on the resulting tax and surcharge.
            </p>
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
              Companies that elect into Section 115BAA or Section 115BAB are entirely exempt from Minimum Alternate Tax, but they permanently forgo standard exemptions, incentives, and additional depreciation claims in exchange for the lower flat rate. The election is made through Form 10-IC (for Section 115BAA) or Form 10-ID (for Section 115BAB) and, once exercised, is <strong className={dm ? 'text-white' : 'text-slate-900'}>irrevocable</strong> for all subsequent assessment years.
            </div>
          </div>

          {/* 5. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-6 Filing Process — Step by Step</h2>
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

          {/* 6. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for ITR-6 Filing</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Because ITR-6 draws directly from audited financials, most of the document checklist is generated as a by-product of the audit process itself.
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

          {/* 7. MAT */}
          <div id="mat" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>MAT — Minimum Alternate Tax (Section 115JB)</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                MAT exists to stop companies with genuinely healthy accounting profits from reducing their tax outgo to near zero purely through exemptions and deductions. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 115JB</strong>, whenever the tax a company owes under the normal provisions works out to less than <strong className={dm ? 'text-white' : 'text-slate-900'}>15% of its book profit</strong>, the company must instead pay tax at 15% of that book profit.
              </p>
              <p>
                Book profit is not simply the net profit shown in the audited Profit &amp; Loss Account — it is arrived at by starting with that figure and applying a specific set of additions and deductions listed in Explanation 1 to Section 115JB. Additions typically include the income tax provision already debited, unascertained liabilities and provisions, and certain capital expenditure charged to the P&amp;L, while deductions include brought-forward business loss or unabsorbed depreciation (whichever is lower, as per the books) and specified categories of exempt income.
              </p>
              <p>
                Where MAT paid in a year exceeds the tax that would otherwise have been due under normal provisions, the excess becomes <strong className={dm ? 'text-white' : 'text-slate-900'}>MAT credit under Section 115JAA</strong>. This credit can be carried forward for up to <strong className={dm ? 'text-white' : 'text-slate-900'}>15 assessment years</strong> and set off in any future year where normal tax exceeds the MAT liability for that year — effectively smoothing out the impact of a high-book-profit, low-taxable-income year. Companies that have opted into the concessional regimes under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 115BAA or Section 115BAB</strong> are carved out of MAT altogether under Section 115JB(5A) — the provision simply does not apply to them, in either direction.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Normal Tax', 'MAT (Section 115JB)']} rows={matComparisonRows} dm={dm} />
          </div>

          {/* 8. Key Schedules Explained */}
          <div id="schedules" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Schedules Explained</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keySchedules.map((s) => (
                <div key={s.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Due Dates & Penalties */}
          <div id="due-dates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Due Dates &amp; Penalties</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Note that the tax audit report deadline (30 September) falls a full month ahead of the ITR-6 due date (31 October) — the audit has to close before the return can even be started in earnest.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
          </div>

          {/* 10. Benefits of Timely Filing */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Timely ITR-6 Filing</h2>
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

          {/* 11. FAQs */}
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
                Have questions about ITR-6 filing for your company? Let our experts help you figure out the right compliance plan.
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
          serviceName="ITR-6 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
