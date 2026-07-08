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
  'Partnership Firm ITR Filing',
  'LLP Income Tax Return',
  'AOP/BOI Tax Return',
  'Section 40(b) Computation',
  'Tax Audit Coordination',
  'AMT & Advance Tax Support',
];

const pricingInclusions = [
  'Free Consultation & Eligibility Check',
  'P&L Account Preparation',
  'Balance Sheet Preparation',
  'Partner Remuneration Working (Sec 40(b))',
  'Interest to Partners Verification',
  'Tax Audit Coordination (Form 3CD)',
  'AMT Computation (Sec 115JC)',
  'Form 26AS & AIS Reconciliation',
  'Advance Tax Calculation',
  'ITR-5 Filing & e-Verification',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Section 139(1) of the Income-tax Act, 1961'],
  ['Applicable To', 'Partnership firms (registered and unregistered), Limited Liability Partnerships (LLPs), Associations of Persons (AOP), Bodies of Individuals (BOI), estates of deceased or insolvent persons, business trusts, and investment funds'],
  ['Not Applicable To', 'Individuals and HUFs, who use ITR-1/2/3/4, and companies, which use ITR-6'],
  ['Tax Rate — LLPs', 'A flat 30% on total income, plus applicable surcharge and a 4% Health & Education Cess'],
  ['Tax Rate — Partnership Firms', 'Also a flat 30%, with partner remuneration and interest deductible only within the limits prescribed under Section 40(b)'],
  ['AMT — Section 115JC', 'LLPs (and other non-corporate taxpayers claiming specified deductions) pay Alternate Minimum Tax wherever tax computed on normal income is less than 18.5% of adjusted total income'],
  ['Verification Modes', 'DSC of a designated partner or authorised signatory, mandatory wherever the entity\'s accounts are subject to audit; EVC/Aadhaar-based verification otherwise'],
];

const keyFeatures = [
  { title: 'P&L Account & Balance Sheet Schedules', desc: 'ITR-5 requires the entity\'s Profit & Loss Account and Balance Sheet to be reported within the return, giving a complete financial picture of the firm, LLP, or association for the year.' },
  { title: 'Partner/Member Details Reporting', desc: 'A dedicated schedule captures every partner or member\'s PAN, capital account, and profit-sharing ratio, tying the entity\'s income to how it flows through to each partner or member.' },
  { title: 'Section 40(b) Remuneration & Interest Computation', desc: 'For partnership firms, remuneration and interest paid to working partners are only deductible within the limits Section 40(b) prescribes — amounts beyond that get added back to taxable income.' },
  { title: 'AMT Computation & Credit (Section 115JC/115JD)', desc: 'LLPs (and other eligible entities) compute Alternate Minimum Tax under Section 115JC where it applies, with any resulting credit tracked under Section 115JD for use in future years.' },
  { title: 'Tax Audit Integration', desc: 'Where turnover, receipts, or LLP-specific thresholds cross the Section 44AB (or LLP Act) audit requirement, the audit report feeds directly into the return\'s income computation.' },
  { title: 'Loss Carry-Forward Tracking', desc: 'Business losses and unabsorbed depreciation from current or earlier years are tracked within the return and correctly set off against current-year income where eligible.' },
];

const eligibilityRows: string[][] = [
  ['Partnership Firms (Registered & Unregistered)', 'Must file ITR-5 every year regardless of registration status with the Registrar of Firms, reporting firm-level income alongside partner details'],
  ['Limited Liability Partnerships (LLPs)', 'File ITR-5 every year, taxed at a flat rate, with AMT applicability assessed separately from the main income computation'],
  ['Association of Persons (AOP)', 'A group of persons — not necessarily individuals — that comes together for a common purpose with the intention of earning income, taxed at the entity level via ITR-5'],
  ['Body of Individuals (BOI)', 'Similar to an AOP but consisting only of individuals; also files through ITR-5'],
  ['Local Authorities', 'Municipal corporations and similar local bodies file their income tax return through ITR-5'],
  ['Cooperative Societies', 'File ITR-5, subject to the distinct tax provisions and deduction entitlements that apply specifically to cooperative societies'],
  ['Business Trusts', 'REITs and InvITs registered as business trusts file through ITR-5, subject to the specific pass-through taxation provisions applicable to them'],
  ['Investment Funds', 'Category I and II Alternative Investment Funds file ITR-5 under the specific pass-through regime that applies to such funds'],
];

const requirementItems = [
  'Books of account maintained as required under Section 44AA (for firms) or the LLP Act\'s own bookkeeping requirements, forming the basis for the P&L and Balance Sheet',
  'PAN issued in the name of the entity itself — the firm, LLP, AOP, or BOI — distinct from the PAN of any individual partner or member',
  'A Digital Signature Certificate (DSC) of a designated partner or authorised signatory, mandatory wherever the entity\'s accounts are subject to audit',
  'Complete details of every partner or member — PAN, capital account, and profit-sharing ratio — needed to populate the return\'s partner/member schedules',
  'An active, pre-validated bank account in the entity\'s name for any refund to be credited into',
];

const documentGroups = [
  { group: 'Entity Documents', items: ['Partnership deed or LLP agreement, including any supplementary deeds', 'PAN card of the firm or LLP'] },
  { group: 'Financial Statements', items: ['Profit & Loss Account and Balance Sheet for the financial year', 'Tax audit report in Form 3CA-3CD/3CB-3CD, where Section 44AB applies'] },
  { group: 'Partner Details', items: ['PAN of every partner or member', 'Partner/member capital account statements', 'Profit-sharing ratio among partners or members for the year'] },
  { group: 'Standard Documents', items: ['Form 26AS and Annual Information Statement (AIS)'] },
];

const processSteps = [
  { title: 'Finalize Financial Statements', desc: 'Close the books for the financial year and finalise the Profit & Loss Account and Balance Sheet for the firm, LLP, or association.' },
  { title: 'Determine Audit Applicability', desc: 'Check turnover, receipts, and applicable thresholds under Section 44AB (or the LLP Act) to confirm whether a tax audit is legally required before filing.' },
  { title: 'Complete Audit, If Required', desc: 'Where audit applies, coordinate with the Chartered Accountant conducting it, ensuring the audit report is finalised well ahead of the ITR-5 due date.' },
  { title: 'Compute Section 40(b) Remuneration/Interest (For Firms)', desc: 'Work out partner remuneration and interest paid, checking each against the limits prescribed under Section 40(b) before treating them as deductible.' },
  { title: 'Compute AMT, If Applicable (For LLPs)', desc: 'Calculate Alternate Minimum Tax under Section 115JC where normal tax falls below 18.5% of adjusted total income, and track any resulting credit.' },
  { title: 'File with DSC', desc: 'Submit the completed ITR-5 return on the e-filing portal, authenticated with the DSC of a designated partner or authorised signatory where mandated.' },
  { title: 'e-Verify / Confirm Filing', desc: 'Where DSC-based filing applies, verification completes automatically on submission; otherwise, complete e-verification within 30 days to ensure the return is treated as validly filed.' },
];

const dueDateRows: string[][] = [
  ['ITR-5 Filing — Non-Audit Entities', '31 July of the assessment year', 'Applies where turnover, receipts, and other thresholds do not cross the Section 44AB audit requirement'],
  ['Tax Audit Report — Form 3CA/3CB-3CD', '30 September of the assessment year', 'Falls a full month ahead of the audit-linked ITR due date, since the return draws directly from the audited figures'],
  ['ITR-5 Filing — Audit-Applicable Entities', '31 October of the assessment year', 'Applies wherever turnover, receipts, or other conditions cross the applicable audit threshold'],
  ['Late Filing Fee — Section 234F', '₹1,000 where total income is up to ₹5 lakh; ₹5,000 where it exceeds ₹5 lakh', 'Levied automatically where the return is filed after the applicable due date but before 31 December'],
  ['Tax Audit Default — Section 271B', '0.5% of turnover or gross receipts, capped at ₹1,50,000', 'Applies where an entity liable for tax audit fails to get the audit done, or fails to furnish the audit report by the due date'],
  ['AMT Credit Carry-Forward — Section 115JD', '15 assessment years', 'Excess AMT paid over normal tax in a year can be carried forward and set off in a future year when normal tax exceeds AMT, mirroring the MAT credit mechanism available to companies'],
  ['Interest — Sections 234A / 234B / 234C', '1% per month or part thereof', 'Charged respectively for late filing with unpaid tax outstanding, a shortfall in advance tax paid, and deferred or short quarterly instalments'],
];

const faqs = [
  { q: 'Who must file ITR-5?', a: 'Partnership firms, LLPs, Associations of Persons, Bodies of Individuals, local authorities, cooperative societies, business trusts, and investment funds all file ITR-5 — essentially any entity that isn\'t an individual, HUF, or company.' },
  { q: 'Is a Digital Signature Certificate mandatory for ITR-5 filing?', a: 'DSC is mandatory wherever the entity\'s accounts are subject to tax audit — a common situation for most active LLPs and larger firms. Entities not liable for audit can typically verify through EVC or Aadhaar-based modes instead.' },
  { q: 'What is Section 40(b) and why does it matter?', a: 'Section 40(b) caps how much of the remuneration and interest paid to working partners a partnership firm can actually deduct as a business expense. Amounts paid within the prescribed limits reduce the firm\'s taxable income; amounts beyond those limits are disallowed and added back.' },
  { q: 'What is AMT and who has to pay it?', a: 'Alternate Minimum Tax, under Section 115JC, applies to LLPs (and certain other non-corporate taxpayers claiming specified deductions) whenever tax computed on normal income works out to less than 18.5% of adjusted total income — ensuring a baseline level of tax is paid even after specified deductions.' },
  { q: 'What is the difference between ITR-5 and ITR-6?', a: 'ITR-6 is exclusively for companies registered under the Companies Act, mandating DSC-based verification and MAT computation. ITR-5 is for every other non-individual, non-company entity — firms, LLPs, AOPs, BOIs, trusts, and funds — and applies AMT rather than MAT where relevant.' },
  { q: 'Is tax audit mandatory for all LLPs and firms filing ITR-5?', a: 'No — audit is triggered by specific thresholds. For LLPs, this includes turnover above ₹40 lakh or partner contribution above ₹25 lakh under the LLP Act; for firms and other entities, the Section 44AB thresholds on turnover, receipts, or cash transaction limits apply.' },
  { q: 'How are partner drawings treated in ITR-5?', a: 'Drawings themselves are not a tax event — they\'re simply withdrawals against a partner\'s capital account and don\'t appear as an expense or income in the firm\'s P&L. What is taxable is the partner\'s share of profit, remuneration, and interest, as reported through the return\'s partner schedules.' },
  { q: 'What documents does ComplianceBharo need to start an ITR-5 filing?', a: 'Typically, the partnership deed or LLP agreement, PAN of the entity, financial statements (P&L and Balance Sheet), the tax audit report where applicable, and partner/member details including PAN, capital accounts, and profit-sharing ratios.' },
  { q: 'How does ComplianceBharo assist with ITR-5 filing?', a: 'We assess audit applicability, coordinate with your auditor where required, compute Section 40(b) remuneration and interest for firms, calculate AMT and track credit for LLPs, reconcile Form 26AS and AIS, and file the return with DSC-based or standard e-verification as applicable.' },
  { q: 'Can an LLP claim deductions similar to a company under concessional tax regimes?', a: 'No — the concessional flat-rate options under Sections 115BAA and 115BAB are available only to domestic companies. LLPs are taxed at their standard flat rate under the normal provisions, with AMT as the applicable minimum-tax safeguard instead of MAT.' },
  { q: 'What happens if a partnership firm doesn\'t maintain proper books of account?', a: 'Failure to maintain books of account required under Section 44AA can attract a penalty of up to ₹25,000 under Section 271A, in addition to making it practically difficult to prepare an accurate P&L, Balance Sheet, and Section 40(b) computation.' },
  { q: 'Can business losses be carried forward under ITR-5?', a: 'Yes, subject to conditions — business losses can be carried forward and set off against future business income, but only if the return declaring them is filed by the original due date under Section 139(1). Unabsorbed depreciation is a notable exception that can carry forward even with a late-filed return.' },
  { q: 'Does every AOP or BOI need to file ITR-5?', a: 'Yes — if the association or body has taxable income for the year, it must file ITR-5 in its own right as a distinct assessable entity, separate from the individual returns its members or individuals may file for their own personal income.' },
  { q: 'Is advance tax applicable to firms and LLPs filing ITR-5?', a: 'Yes — any entity with an estimated annual tax liability of ₹10,000 or more, including firms and LLPs, must pay advance tax in quarterly instalments, with shortfalls in any instalment attracting interest under Sections 234B and 234C.' },
  { q: 'Can ITR-5 be revised after filing?', a: 'Yes — under Section 139(5), a revised return correcting an error or omission can be filed any time before three months prior to the end of the relevant assessment year, or before assessment is completed, whichever comes first, provided the original return was filed within the statutory timeline.' },
  { q: 'What is the difference between a registered and unregistered partnership firm for ITR-5 purposes?', a: 'Registration with the Registrar of Firms is a separate legal formality under the Indian Partnership Act and doesn\'t affect the firm\'s income tax filing obligation — both registered and unregistered firms are required to file ITR-5 in the same manner.' },
  { q: 'How is MAT credit different from AMT credit?', a: 'They work on the same underlying principle — carrying forward excess minimum tax paid over normal tax for use in a future year — but MAT under Section 115JB and its credit under Section 115JAA apply to companies, while AMT under Section 115JC and its credit under Section 115JD apply to LLPs and other eligible non-corporate taxpayers.' },
  { q: 'Can a business trust or investment fund file ITR-5 on its own, or does it need a special process?', a: 'Business trusts and investment funds file ITR-5 like any other eligible entity, but their income computation follows the specific pass-through taxation provisions applicable to them, which differ meaningfully from how a standard partnership firm or LLP computes its income.' },
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

export default function ITR5Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-5 Return Filing" />

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
                  Partnership Firm, LLP &amp; AOP ITR-5 Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-5 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Complete Tax Return Filing for Partnership Firms, LLPs &amp; AOPs - Starting @ <span className="font-bold text-brand-orange">₹4,999</span> Only
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  P&amp;L Account. Balance Sheet. Partner Details. Section 40(b) Compliance. AMT Computation.
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
                    Reviewed by Industry Experts &amp; Partnership Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-5 Return Filing"} dm={isDarkMode} />
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
                ITR-5 Return Filing Package
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
                Timeline depends on audit applicability and number of partners
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-5?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-5 is the income tax return form for entities that are neither individuals/HUFs nor companies — a broad category that covers <strong className={dm ? 'text-white' : 'text-slate-900'}>Partnership Firms</strong>, <strong className={dm ? 'text-white' : 'text-slate-900'}>Limited Liability Partnerships (LLPs)</strong>, Associations of Persons (AOP), Bodies of Individuals (BOI), estates of deceased or insolvent persons, business trusts, and investment funds.
              </p>
              <p>
                LLPs and partnership firms are taxed similarly in one respect — both pay a flat <strong className={dm ? 'text-white' : 'text-slate-900'}>30%</strong> on total income, plus applicable surcharge and cess — but diverge in the specific provisions layered on top. LLPs are subject to <strong className={dm ? 'text-white' : 'text-slate-900'}>Alternate Minimum Tax (AMT)</strong> under Section 115JC wherever normal tax falls below 18.5% of adjusted total income, while partnership firms instead work within <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 40(b)</strong>, which caps how much partner remuneration and interest the firm can actually deduct.
              </p>
              <p>
                What unites the entities that file ITR-5 is really what they aren&apos;t — none of them are individuals, HUFs, or companies, each of which has its own dedicated form. If your organisation doesn&apos;t fit into one of those three categories, ITR-5 is very likely the form you need.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of ITR-5</h2>
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
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Must File ITR-5</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              ITR-5&apos;s eligibility test is entity type, not scale or profitability — every entity below files it for as long as it exists and has taxable income.
            </p>
            <DataTable headers={['Entity Type', 'Filing Requirement']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Who does NOT file ITR-5: </strong>
              Individuals and HUFs file ITR-1, ITR-2, ITR-3, or ITR-4 depending on their income profile, and companies file <strong>ITR-6</strong> — none of these use ITR-5.
            </div>
          </div>

          {/* 4. Requirements */}
          <div id="requirements" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What You Need Before You Start</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A few prerequisites need to be in place before an ITR-5 filing can go through smoothly.
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
                ComplianceBharo&apos;s ITR-5 filing package starts at <strong className={dm ? 'text-white' : 'text-slate-900'}>₹4,999</strong> as a professional fee for end-to-end assistance, covering P&amp;L and Balance Sheet preparation, Section 40(b) computation, AMT assessment, and e-verification — the full inclusion list is shown in the pricing card above.
              </p>
              <p>
                Where your final quote lands depends on a couple of factors specific to your entity: whether tax audit applies (bringing in coordination work with your auditor), and the number of partners or members whose details need to be captured and reconciled within the return. We confirm the exact scope and fee after reviewing your entity\'s financials and structure.
              </p>
            </div>
          </div>

          {/* 6. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Here&apos;s the typical document checklist for an ITR-5 filing, grouped by what it covers.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-5 Filing Process — Step by Step</h2>
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
              Audit applicability drives the due date, and AMT credit has its own long carry-forward window worth planning around.
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
                Have questions about filing ITR-5 for your firm, LLP, or association? Let our experts help you figure out the right compliance plan.
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
          serviceName="ITR-5 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
