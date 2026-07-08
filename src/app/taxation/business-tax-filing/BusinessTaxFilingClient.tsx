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
  { id: 'business-types', label: 'Business Types' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'cost', label: 'Cost' },
  { id: 'documents', label: 'Documents' },
  { id: 'steps', label: 'Steps' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Company ITR-6 Filing with DSC',
  'LLP & Partnership ITR-5 Filing',
  'Tax Audit Coordination (Section 44AB)',
  'MAT/AMT Computation & Credit',
  'Advance Tax Planning & Compliance',
  'Post-Filing Notice Support',
];

const pricingInclusions = [
  'Business Entity Assessment',
  'ITR Form Selection (ITR-3/4/5/6)',
  'Income Computation & Schedules',
  'Depreciation Calculation',
  'MAT/AMT Assessment',
  'Tax Audit Coordination',
  'Advance Tax Reconciliation',
  'Form 26AS & AIS Matching',
  'DSC-Based Filing & e-Verification',
  'Post-Filing Notice Support',
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Section 139 of the Income-tax Act, 1961, read with Rule 12 of the Income-tax Rules, 1962, with the applicable ITR form determined by entity type'],
  ['Applicable ITR Forms', 'ITR-3 (proprietorship/professional with books of account), ITR-4 (presumptive proprietorship), ITR-5 (partnership firm/LLP), ITR-6 (company)'],
  ['Tax Audit Trigger', 'Section 44AB — turnover, receipts, or presumptive opt-out crossing prescribed thresholds mandates an audit before filing'],
  ['MAT / AMT', 'Section 115JB imposes Minimum Alternate Tax on companies; Section 115JC imposes Alternate Minimum Tax on LLPs and other non-corporate taxpayers claiming specified deductions'],
  ['Verification Mode', 'Mandatory DSC for companies; DSC or EVC/Aadhaar-based verification for other entities depending on audit applicability'],
  ['Distinct From', 'GST return filing and TDS/TCS return filing — separate, periodic compliances under different statutes, running alongside the annual income tax return'],
];

const keyFeatures = [
  { title: 'Entity-Specific ITR Filing (ITR-3/4/5/6)', desc: 'Business income is reported on different forms depending on structure — we identify the correct one for your entity and income profile rather than defaulting to a one-size-fits-all form.' },
  { title: 'Tax Audit Coordination', desc: 'Where turnover, receipts, or a presumptive opt-out crosses the Section 44AB threshold, we coordinate the audit process alongside your Chartered Accountant so the ITR and the audit report align cleanly.' },
  { title: 'MAT/AMT Computation & Credit Tracking', desc: 'Companies compute Minimum Alternate Tax under Section 115JB and LLPs compute Alternate Minimum Tax under Section 115JC — we calculate the liability and track any resulting credit for future years.' },
  { title: 'Advance Tax Planning', desc: 'We help estimate quarterly advance tax instalments across the year based on projected income, reducing the risk of interest charges under Sections 234B and 234C at filing time.' },
  { title: 'DSC-Based e-Filing & Verification', desc: 'For companies and other DSC-mandated filings, we handle the digital signature verification step so the return is validly filed the first time, without a rejected or defective submission.' },
  { title: 'Form 26AS/AIS Reconciliation', desc: 'TDS, TCS, and specified transactions reported against your PAN are checked line by line against your own books before filing, catching mismatches before the department does.' },
  { title: 'Post-Filing Notice Support', desc: 'If a routine reconciliation or scrutiny notice arrives after your return is processed, we help you understand what it\'s asking for and prepare an appropriate response.' },
  { title: 'Multi-Year Loss Carry-Forward Tracking', desc: 'Business losses, capital losses, and unabsorbed depreciation carried forward from earlier years are tracked and correctly set off in the current computation, so nothing gets left unclaimed.' },
];

const businessTypeRows: string[][] = [
  ['Private / Public Limited Company', 'ITR-6', 'Digital Signature Certificate (DSC) of an authorised signatory — mandatory, with no alternative verification mode available', 'Minimum Alternate Tax (MAT) under Section 115JB, applicable whenever tax computed on normal income is less than 15% of book profit'],
  ['Limited Liability Partnership (LLP)', 'ITR-5', 'DSC of a designated partner, mandatory wherever the LLP\'s accounts are subject to audit', 'Alternate Minimum Tax (AMT) under Section 115JC, applicable whenever tax on normal income is less than 18.5% of adjusted total income'],
  ['Partnership Firm', 'ITR-5', 'DSC where audit applies; otherwise EVC or Aadhaar-based verification by an authorised partner', 'Partner remuneration and interest deductibility governed by Section 40(b), subject to prescribed limits and conditions'],
  ['Sole Proprietorship', 'ITR-3 (regular books of account) or ITR-4 (presumptive income)', 'Aadhaar OTP, net banking, or DSC — the same individual verification options available to any personal taxpayer', 'Choice between presumptive taxation under Section 44AD/44ADA and regular computation from maintained books of account'],
];

const requirementRows: string[][] = [
  ['Mandatory — Business Turnover Audit Threshold', 'Turnover exceeds ₹1 crore in a year, raised to ₹10 crore where cash receipts and cash payments each stay within 5% of the total transaction value', 'Crossing this threshold triggers a tax audit under Section 44AB regardless of whether the business made a profit'],
  ['Mandatory — Professional Gross Receipts', 'Gross receipts of a professional exceed ₹50 lakh in a year', 'The same Section 44AB audit obligation applies to professionals, independently assessed from the business turnover threshold'],
  ['Mandatory — Presumptive Scheme Opt-Out', 'Declared profit falls below the prescribed presumptive rate under Section 44AD/44ADA in a year total income exceeds the basic exemption limit', 'Opting out of a presumptive scheme that was used in an earlier year can itself trigger a mandatory audit in specified circumstances'],
  ['Mandatory — Company Verification', 'Applies to every company, regardless of turnover or profitability', 'ITR-6 cannot be verified through Aadhaar OTP or EVC — a Digital Signature Certificate of an authorised signatory is the only accepted mode'],
  ['Voluntary — Computation Accuracy', 'Complex income streams — multiple business verticals, depreciation schedules, or related-party transactions', 'Professional review reduces the risk of an incorrect schedule or a reconciliation mismatch that draws department attention'],
  ['Voluntary — Loss Carry-Forward Eligibility', 'Business or capital losses intended to be carried forward and set off against future income', 'Carry-forward is available only where the return is filed by the original due date under Section 139(1)'],
  ['Voluntary — MAT/AMT Credit Tracking', 'Companies or LLPs that paid MAT/AMT in excess of their normal tax liability in a given year', 'The resulting credit under Section 115JAA/115JD must be tracked and correctly claimed in a future year when normal tax exceeds MAT/AMT'],
];

const documentGroups = [
  { group: 'Company', items: ['Audited Profit & Loss Account and Balance Sheet for the financial year', 'Board resolution authorising the ITR filing', 'Company\'s Digital Signature Certificate (DSC)', 'Form 26AS and Annual Information Statement (AIS)', 'Tax audit report in Form 3CA-3CD, where Section 44AB applies'] },
  { group: 'LLP / Partnership', items: ['Partnership deed or LLP agreement, including any supplementary deeds', 'Financial statements for the year', 'Partner or designated partner capital account statements', 'Form 26AS and Annual Information Statement (AIS)'] },
  { group: 'Proprietorship', items: ['Bank statements for the financial year', 'Sales and purchase records or a summarised profit statement', 'Previous year\'s filed ITR, where available', 'Form 26AS and Annual Information Statement (AIS)'] },
];

const processSteps = [
  { title: 'Collect Financial Records', desc: 'Gather bank statements, sales/purchase records or financial statements, prior-year returns, and TDS certificates for the year, so the return is built on a complete financial picture.' },
  { title: 'Determine Audit Applicability', desc: 'Check turnover, receipts, and presumptive-scheme history against the Section 44AB thresholds to confirm whether a tax audit is legally required before the return can be filed.' },
  { title: 'Complete Statutory/Tax Audit (If Required)', desc: 'Where audit applies, coordinate with the Chartered Accountant conducting it — companies additionally need their Companies Act statutory audit completed before the ITR figures are finalised.' },
  { title: 'Compute Income & Tax Liability (Including MAT/AMT)', desc: 'Arrive at total income under the applicable heads, apply the relevant tax rate or regime, and separately compute MAT (for companies) or AMT (for LLPs and other eligible entities) where it applies.' },
  { title: 'Reconcile with Form 26AS/AIS', desc: 'Match TDS, TCS, advance tax payments, and reported transactions against the business\'s own books, resolving any mismatch before it becomes a reconciliation notice.' },
  { title: 'File the Correct ITR Form with DSC', desc: 'Submit ITR-3, ITR-4, ITR-5, or ITR-6 as applicable, completing DSC-based verification for companies and any other filing that mandates it.' },
  { title: 'Track Processing & Refund Status', desc: 'Monitor the return\'s processing status on the e-filing portal and follow up on any refund due or notice raised once the department has processed the filing.' },
];

const dueDateRows: string[][] = [
  ['ITR Filing — Non-Audit Taxpayers', '31 July of the assessment year', 'Applies to businesses and professionals not required to get their accounts audited under Section 44AB'],
  ['Tax Audit Report — Form 3CA/3CB-3CD', '30 September of the assessment year', 'Falls a full month ahead of the ITR due date for audit-liable taxpayers, since the ITR draws directly from the audited figures'],
  ['ITR Filing — Audit-Liable Taxpayers', '31 October of the assessment year', 'Applies to companies, and to any other business or professional whose accounts are subject to audit under Section 44AB'],
  ['ITR Filing — Transfer Pricing Cases', '30 November of the assessment year', 'An extended date for businesses with international or specified domestic transactions requiring a Form 3CEB report'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically where the return is filed after the due date but before 31 December'],
  ['Interest — Sections 234A / 234B / 234C', '1% per month or part of a month', 'Charged respectively for late filing with unpaid tax outstanding, a shortfall in advance tax paid, and deferred or short quarterly instalments'],
  ['Tax Audit Default — Section 271B', '0.5% of turnover or gross receipts, capped at ₹1,50,000', 'Applies where a taxpayer liable for tax audit fails to get the audit done, or fails to furnish the audit report by the due date'],
];

const faqs = [
  { q: 'Which ITR form applies to my business?', a: 'It depends on your entity type: a company files ITR-6, an LLP or partnership firm files ITR-5, and a sole proprietorship files either ITR-3 (regular books of account) or ITR-4 (presumptive income under Section 44AD/44ADA), depending on turnover and whether presumptive taxation is opted for.' },
  { q: 'When is tax audit mandatory for a business?', a: 'Under Section 44AB, audit becomes mandatory once turnover exceeds ₹1 crore in a year — raised to ₹10 crore where cash receipts and cash payments each stay within 5% of total transactions — or once a professional\'s gross receipts exceed ₹50 lakh. Opting out of a presumptive scheme used in an earlier year can also trigger audit in specified situations.' },
  { q: 'What is MAT and who has to pay it?', a: 'Minimum Alternate Tax, under Section 115JB, applies to companies whenever the tax computed under normal provisions works out to less than 15% of book profit. It ensures companies reporting healthy accounting profits but low taxable income, due to exemptions and deductions, still pay a baseline level of tax.' },
  { q: 'What is AMT and who has to pay it?', a: 'Alternate Minimum Tax, under Section 115JC, is MAT\'s counterpart for LLPs (and certain other non-corporate taxpayers claiming specified deductions). It applies when tax computed on normal income is less than 18.5% of adjusted total income, with the adjustment adding back specified deductions claimed.' },
  { q: 'Is a Digital Signature Certificate mandatory for all businesses?', a: 'No — it is mandatory only for companies filing ITR-6, and for LLPs whose accounts are subject to audit. Partnership firms and proprietorships not liable for audit can typically verify their return through Aadhaar OTP, net banking, or EVC, the same as individual taxpayers.' },
  { q: 'What is the difference between business ITR filing and GST filing?', a: 'They are separate, unrelated compliances under different statutes. The ITR is an annual return of total income filed under the Income-tax Act, while GST returns are periodic (monthly/quarterly) filings of sales, purchases, and tax collected under the GST law. A business with GST registration still has to file both — one doesn\'t substitute for the other.' },
  { q: 'Can business losses be carried forward to future years?', a: 'Yes, subject to conditions — business losses and capital losses can be carried forward and set off against future income, but only if the return declaring them is filed by the original due date under Section 139(1). Unabsorbed depreciation is a notable exception that can still carry forward even with a late-filed return.' },
  { q: 'What happens if the tax audit deadline is missed?', a: 'Failing to get the audit done, or failing to furnish the audit report by the due date, attracts a penalty under Section 271B of 0.5% of turnover or gross receipts, capped at ₹1,50,000. The ITR filing itself also gets delayed as a consequence, since audited figures are needed to complete it.' },
  { q: 'Should a business choose the old or new tax regime?', a: 'It depends on the entity and the deductions available. Companies largely choose between the standard regime and concessional flat-rate options under Sections 115BAA/115BAB. For proprietorships filing as individuals, the choice mirrors the personal old-vs-new regime comparison, weighed against deductions the business would otherwise claim.' },
  { q: 'What documents does ComplianceBharo need to start a business tax filing?', a: 'It varies by entity — broadly, financial statements or bank/sales records for the year, Form 26AS and AIS, the previous year\'s ITR where available, and entity-specific documents such as a board resolution and DSC for companies, or a partnership deed/LLP agreement for firms and LLPs.' },
  { q: 'How does ComplianceBharo assist with business tax filing?', a: 'We assess your entity type and audit applicability, coordinate with your auditor where a statutory or tax audit is required, compute income along with any MAT/AMT liability, reconcile Form 26AS and AIS against your books, file the correct ITR form with DSC where mandated, and stay available for post-filing notice support.' },
  { q: 'Can a proprietorship choose between ITR-3 and ITR-4?', a: 'Yes, where it\'s eligible for presumptive taxation under Section 44AD or 44ADA and turnover/receipts fall within the prescribed limits, ITR-4 is available as a simpler option declaring a prescribed percentage of receipts as profit. Outside those limits, or where actual profit is being computed from maintained books, ITR-3 applies instead.' },
  { q: 'Is advance tax applicable to businesses?', a: 'Yes — any taxpayer, including a business, with an estimated annual tax liability of ₹10,000 or more must pay advance tax in quarterly instalments during the year. Shortfalls in any instalment attract interest under Sections 234B and 234C at the time of filing.' },
  { q: 'What is Section 40(b) and why does it matter for partnership firms?', a: 'Section 40(b) caps how much of the remuneration and interest paid to working partners a partnership firm can actually deduct as a business expense — amounts paid beyond the prescribed limits are disallowed, directly affecting the firm\'s taxable income.' },
  { q: 'How is MAT credit different from a regular tax deduction?', a: 'MAT credit under Section 115JAA isn\'t a deduction from income — it\'s a credit for the excess tax already paid under MAT over what would have been due under normal provisions, which can be carried forward up to 15 assessment years and set off in a year when normal tax exceeds MAT.' },
  { q: 'Does a dormant or loss-making company still need to file ITR-6?', a: 'Yes. Corporate status alone creates the filing obligation — a company must file ITR-6 every year it remains on the register, even with no transactions or a declared loss, and even where MAT works out to nil for the year.' },
  { q: 'What is Form 3CEB and when is it required?', a: 'Form 3CEB is a transfer pricing accountant\'s report required where a business has entered into international transactions with associated enterprises, or specified domestic transactions crossing the prescribed threshold under Sections 92B/92BA. It extends the ITR due date to 30 November for those businesses.' },
  { q: 'Can a business revise its ITR after filing?', a: 'Yes — under Section 139(5), a revised return correcting errors or omissions can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first, provided the original return was filed within the statutory timeline.' },
  { q: 'Are GST returns required in addition to income tax filing for a GST-registered business?', a: 'Yes, and they run on entirely separate timelines — GST returns are typically monthly or quarterly, while the ITR is annual. ComplianceBharo\'s business tax filing service covers the income tax side; GST return filing is a related but distinct compliance.' },
  { q: 'What is the penalty for not maintaining proper books of account?', a: 'Failure to maintain books of account required under Section 44AA can attract a penalty of up to ₹25,000 under Section 271A, in addition to making it practically difficult to prepare an accurate return or withstand audit scrutiny.' },
  { q: 'How is depreciation treated differently for tax purposes versus the books?', a: 'Tax depreciation under Section 32 follows a block-of-assets method with rates prescribed by the Income-tax Rules, which rarely matches the depreciation method used in the entity\'s own financial statements — the computation schedule reconciles the two figures for tax purposes.' },
  { q: 'Can a partnership firm opt for a concessional tax rate like companies do?', a: 'No — the concessional flat-rate options under Sections 115BAA and 115BAB are available only to domestic companies. Partnership firms and LLPs are taxed at their own applicable flat rates under the normal provisions, without an equivalent concessional election.' },
  { q: 'What happens if MAT/AMT liability is not paid despite being due?', a: 'Unpaid MAT or AMT is treated the same as any other unpaid tax — it attracts interest under Sections 234B and 234C for the advance tax shortfall, and the return risks being flagged as inconsistent if the reported MAT/AMT computation doesn\'t match the tax actually paid.' },
  { q: 'Does every LLP need to be audited?', a: 'No — audit for an LLP is triggered where its turnover exceeds ₹40 lakh, or its contribution from partners exceeds ₹25 lakh, in a financial year. LLPs below both thresholds are not required to have their accounts audited under the LLP Act, though income tax filing is still required regardless.' },
  { q: 'Why choose ComplianceBharo for business tax filing over filing it independently?', a: 'Business filings involve entity-specific forms, audit coordination, MAT/AMT computation, and multi-year loss tracking that carry real financial consequences if handled incorrectly — ComplianceBharo brings together each of these steps under one transparent professional fee, with support that continues if a notice is raised after filing.' },
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

export default function BusinessTaxFilingClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Business Tax Filing" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex flex-col gap-3">
                <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full shadow-sm border text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                  Business Tax Filing &amp; Corporate Tax Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>
                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="text-brand-orange">Business Tax Filing</span> in India
                </h1>
                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Professional Business ITR Filing for Companies, LLPs &amp; Firms - Starting @ <span className="font-bold text-brand-orange">₹4,999</span> Only
                </p>
                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Corporate Tax, Partnership Firm Tax, LLP Tax &amp; Proprietorship Tax Filing with Audit Coordination.
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
              <LeadForm serviceName={"Business Tax Filing"} dm={isDarkMode} />
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
                Business Tax Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹4,999
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Business Tax Filing in India: What It Covers</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                "Business tax filing" isn&apos;t a single, uniform obligation — what it actually involves depends heavily on how the business is structured. A company must file <strong className={dm ? 'text-white' : 'text-slate-900'}>ITR-6</strong>, verified compulsorily through a Digital Signature Certificate, with no alternative verification mode available. An LLP or partnership firm files <strong className={dm ? 'text-white' : 'text-slate-900'}>ITR-5</strong>, carrying its own set of partner-related schedules. A sole proprietorship files either <strong className={dm ? 'text-white' : 'text-slate-900'}>ITR-3</strong>, where regular books of account are maintained, or <strong className={dm ? 'text-white' : 'text-slate-900'}>ITR-4</strong>, where presumptive taxation under Sections 44AD/44ADA is being used instead.
              </p>
              <p>
                Layered on top of the entity-specific form is the question of audit. Once turnover, receipts, or a presumptive opt-out crosses the thresholds under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44AB</strong>, a tax audit becomes mandatory before the return can be filed — and for companies, a separate Companies Act statutory audit is required regardless of scale. Companies additionally have to work out <strong className={dm ? 'text-white' : 'text-slate-900'}>Minimum Alternate Tax (MAT)</strong> under Section 115JB wherever their normal tax liability falls below 15% of book profit, while LLPs face the equivalent <strong className={dm ? 'text-white' : 'text-slate-900'}>Alternate Minimum Tax (AMT)</strong> under Section 115JC.
              </p>
              <p>
                It's worth being clear about what business tax filing is <em>not</em>: it is not the same compliance as GST return filing or TDS/TCS return filing. Those are separate, periodic obligations under different statutes — monthly or quarterly filings that run alongside, not instead of, the single annual income tax return. A GST-registered business still has to file its ITR every year regardless of how current its GST returns are, and vice versa.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of Our Business Tax Filing Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Business Types Covered */}
          <div id="business-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Business Types Covered</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The applicable ITR form, verification mode, and special tax provisions all shift depending on how your business is structured.
            </p>
            <DataTable headers={['Entity Type', 'Applicable ITR Form', 'Verification Mode', 'Key Tax Provision']} rows={businessTypeRows} dm={dm} />
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Needs Professional Business Tax Filing</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Some triggers make audit and professional filing legally mandatory; others are reasons a business chooses to file carefully even without a strict legal push.
            </p>
            <DataTable headers={['Category', 'Trigger / Condition', 'Why It Matters']} rows={requirementRows} dm={dm} />
          </div>

          {/* 5. Cost */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What It Costs</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ComplianceBharo&apos;s business tax filing packages start at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹4,999</strong> as a professional fee for end-to-end assistance. Where the exact price lands within and beyond that starting point depends on a handful of factors specific to your business: the entity type (a company's ITR-6 with mandatory DSC and MAT computation is inherently more involved than a proprietorship's ITR-4), whether a statutory or tax audit applies, the volume of transactions requiring reconciliation, the complexity of any MAT/AMT calculation and credit tracking, and whether the business operates across multiple verticals or income streams that each need separate computation.
              </p>
              <p>
                We confirm the exact scope and final professional fee with you upfront, after reviewing your entity type and financials, so there are no surprises once the filing is underway.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The document checklist follows your entity type — here&apos;s what's typically needed for each.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Business Tax Filing Process — Step by Step</h2>
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
              The tax audit report deadline falls a full month ahead of the ITR due date for audit-liable businesses — the audit has to close before the return can realistically be finalised.
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
                Have questions about tax filing for your company, LLP, firm, or proprietorship? Let our experts help you figure out the right compliance plan.
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
          serviceName="Business Tax Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
