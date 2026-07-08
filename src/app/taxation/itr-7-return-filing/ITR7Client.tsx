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
  { id: 'sections', label: 'Applicable Sections' },
  { id: 'structure', label: 'Structure' },
  { id: 'process', label: 'Filing Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'exemption', label: 'Sec 11/12 Exemption' },
  { id: 'audit-forms', label: '10B vs 10BB' },
  { id: 'changes', label: 'Recent Changes' },
  { id: 'due-dates', label: 'Due Dates' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Charitable & Religious Trust Filing',
  'Section 12AB Registration Compliance',
  'Form 10B / 10BB Audit Coordination',
  '85% Application of Income Verification',
  'FCRA Donation Reporting',
  'Corpus & Accumulation Management',
];

const pricingInclusions = [
  'Trust/NGO Eligibility Assessment',
  '12AB Registration Compliance Check',
  'Income Computation & Exemption Claim',
  '85% Application of Income Verification',
  'Form 10B / 10BB Audit Coordination',
  'Corpus & Voluntary Contribution Tracking',
  'Section 11(2) Accumulation Planning',
  'FCRA Donation Compliance (if applicable)',
  'ITR-7 Preparation & DSC Filing',
  'Post-Filing Notice Support',
];

const overviewFacts: [string, string][] = [
  ['Governing Rule', 'Rule 12 of the Income-tax Rules, 1962, read with Sections 139(4A), 139(4B), 139(4C) and 139(4D) of the Income-tax Act, 1961'],
  ['Applicable To', 'Charitable and religious trusts, NGOs, Section 8 companies, political parties, universities, hospitals, research associations, news agencies, trade unions and similar institutions claiming exemption'],
  ['Core Test', 'Whether at least 85% of the entity\'s income was applied toward its charitable, religious, or specified objects during the year'],
  ['Not for Business Profit', 'ITR-7 is not built around computing taxable business profit — it is built around verifying that income was applied (or validly accumulated) for exempt purposes'],
  ['Verification Mode', 'Mandatory Digital Signature Certificate (DSC) of an authorised trustee or signatory — there is no Aadhaar OTP or EVC option for entities filing ITR-7'],
  ['Audit Pre-Requisite', 'A Form 10B or Form 10BB audit report must generally be filed before the ITR-7 itself, wherever the entity is registered under Section 12AB or an equivalent approval'],
  ['Filing Mode', '100% online through the income tax e-Filing portal (incometax.gov.in)'],
];

const eligibilityRows: string[][] = [
  ['Charitable Trusts', 'Section 139(4A)', 'Sections 11 & 12 — income held wholly or partly under trust for charitable purposes'],
  ['Religious Trusts', 'Section 139(4A)', 'Sections 11 & 12 — income held wholly or partly for religious purposes, including religious-cum-charitable objects'],
  ['Section 8 Companies registered under 12AB', 'Section 139(4A)', 'Sections 11 & 12 — same exemption regime as any other registered trust or institution, despite being incorporated under the Companies Act'],
  ['Political Parties', 'Section 139(4B)', 'Section 13A — exemption conditional on maintaining books, getting accounts audited, and receiving donations above ₹2,000 only through banking channels or electoral bonds'],
  ['Universities & Hospitals', 'Section 139(4C)', 'Section 10(23C) — specific sub-clause depends on whether the institution is wholly government-funded, below a prescribed receipts threshold, or separately approved'],
  ['Research Associations', 'Section 139(4C)', 'Section 10(21) — approved scientific research associations'],
  ['News Agencies', 'Section 139(4C)', 'Section 10(22B) — notified news agencies applying their income solely to news collection and distribution'],
  ['Trade Unions', 'Section 139(4C)', 'Section 10(24) — income from house property and other sources of a registered trade union or association'],
  ['Government-Aided Colleges & Institutions', 'Section 139(4D)', 'Institutions not required to furnish a return under any other provision of Section 139, typically government or government-aided educational bodies'],
];

const sectionsRows: string[][] = [
  ['Section 139(4A)', 'Trusts and institutions (including Section 8 companies) holding income wholly or partly for charitable or religious purposes', 'Sections 11 & 12', 'Valid Section 12AB (or erstwhile 12A/12AA) registration; at least 85% of income applied to objects during the year; cash donations above ₹2,000 are not eligible for exemption treatment'],
  ['Section 139(4B)', 'Political parties registered with the Election Commission of India', 'Section 13A', 'Books of account maintained and audited by a Chartered Accountant; donations above ₹2,000 received only via banking channels or electoral bonds; a contribution report filed with the Election Commission'],
  ['Section 139(4C)', 'Universities, hospitals, research associations, news agencies, trade unions and other specified institutions', 'Section 10(21) / 10(22B) / 10(23C) / 10(24), as applicable', 'Approval or notification under the relevant clause must be in force; income must be applied in line with the conditions attached to that specific exemption'],
  ['Section 139(4D)', 'Universities, colleges and institutions not otherwise required to file a return under Section 139', 'Exemption tied to the specific university/college funding provision applicable to the institution', 'Applies mainly to government or government-aided educational institutions that fall outside the standard Section 10(23C) approval route'],
];

const structureRows: string[][] = [
  ['Part A – General', 'Entity identification, registration details (12AB or 10(23C) approval reference), nature of activities, and the specific sub-section of Section 139 under which the return is filed'],
  ['Schedule VC', 'Voluntary contributions received during the year, split between corpus donations and other (non-corpus) donations'],
  ['Schedule HP', 'Income from any house property held by the trust or institution'],
  ['Schedule BP', 'Income from business or profession that is incidental to the trust\'s charitable or religious objects'],
  ['Schedule AI', 'Application of income toward the trust\'s charitable or religious objects during the year, the figure tested against the 85% threshold'],
  ['Schedule IA', 'Income accumulated or set apart for future application under Section 11(1) or 11(2), including details of any Form 10 filed'],
  ['Schedule I(5)', 'Investments and deposits maintained in the specified modes prescribed under Section 11(5)'],
  ['Schedule FC', 'Foreign contributions received and utilised during the year, cross-referenced against the entity\'s FCRA records'],
  ['Schedule ET', 'Income exempt under provisions other than Sections 11/12, such as specific clauses of Section 10'],
  ['Schedule TDS/IT', 'Tax deducted or collected at source, along with advance tax and self-assessment tax paid during the year'],
];

const processSteps = [
  { title: 'Maintain Books of Accounts (Section 12A(1)(b))', desc: 'Keep books of account and supporting vouchers through the year in the format required for registered trusts — a precondition for both the audit and the return, and mandatory once gross receipts cross the prescribed threshold.' },
  { title: 'Obtain Audit Report (Form 10B or Form 10BB)', desc: 'Engage a Chartered Accountant to examine the accounts and file the applicable audit form — Form 10B or Form 10BB depending on income size, foreign contributions, and whether income was applied outside India — before the ITR-7 due date.' },
  { title: 'Prepare Income Computation', desc: 'Compute gross receipts, voluntary contributions, and other income, then work out how much has been genuinely applied toward the trust\'s objects and how much (if any) remains for accumulation.' },
  { title: 'Document Application of Income', desc: 'Compile the supporting evidence for the reported application of income — project expenditure records, grant utilisation reports, and payment vouchers — since this is precisely what the 85% test and any future scrutiny will examine.' },
  { title: 'Log in to the e-Filing Portal', desc: 'Access the trust or institution\'s account on the income tax e-Filing portal (incometax.gov.in) using its registered credentials and select ITR-7 for the relevant assessment year.' },
  { title: 'Fill All Schedules', desc: 'Populate every applicable schedule — Schedule VC, AI, IA, I(5), FC and the others — ensuring the figures tie back to the audited accounts and the Form 10B/10BB report already filed.' },
  { title: 'Submit with DSC', desc: 'Verify and submit the return using the Digital Signature Certificate of an authorised trustee or signatory, the only valid verification method for entities filing ITR-7, and download the acknowledgement once accepted.' },
];

const documentGroups = [
  { group: 'Entity Formation', items: ['Trust Deed or Memorandum of Association', 'Certificate of Incorporation, for entities registered as a Section 8 company'] },
  { group: 'Tax Registration', items: ['Section 12A/12AA/12AB registration certificate', 'Section 80G registration certificate, where applicable'] },
  { group: 'Audit Reports', items: ['Form 10B or Form 10BB audit report, as applicable to the entity'] },
  { group: 'Financial Records', items: ['Audited financial statements for the year', 'Annual report or activity report describing the year\'s programs'] },
  { group: 'Donation Records', items: ['Donation receipts issued during the year', 'Donor-wise details for reporting in Form 10BD'] },
  { group: 'Investment Details', items: ['Proof of investments and deposits held in the Section 11(5) specified modes'] },
  { group: 'FCRA Documents (if applicable)', items: ['FCRA registration certificate', 'Annual FC-4 return filed under the Foreign Contribution (Regulation) Act'] },
  { group: 'Accumulation Documentation', items: ['Form 10, where income is set apart under Section 11(2) beyond the 15% threshold'] },
  { group: 'Verification', items: ['Digital Signature Certificate (DSC) of the authorised trustee or signatory'] },
];

const investmentModes = [
  'Government savings certificates and deposits in a post office savings bank account',
  'Deposits with scheduled banks or co-operative banks (other than a land mortgage/land development bank)',
  'Investment in units of the Unit Trust of India and SEBI-regulated mutual funds',
  'Investment in Central or State Government securities',
  'Investment in bonds issued by specified public sector companies',
  'Investment in immovable property (excluding plant and machinery not forming part of immovable property)',
];

const auditFormRows: string[][] = [
  ['Applies When', 'Total income before giving effect to Sections 11/12 or Section 10(23C) exceeds ₹5 crore, OR the entity received any foreign contribution during the year, OR the entity applied part of its income outside India', 'None of the Form 10B triggers apply — income (before exemption) is ₹5 crore or less, no foreign contribution was received, and no income was applied outside India'],
  ['Filing Deadline', 'One month before the ITR-7 due date — typically 30 September of the assessment year', 'Same deadline — one month before the ITR-7 due date, typically 30 September of the assessment year'],
  ['Typically Filed By', 'Larger trusts, FCRA-recipient institutions, and entities with international program activity', 'Smaller, domestically-focused trusts and institutions with straightforward operations'],
  ['Reporting Depth', 'More detailed disclosures, reflecting the higher income threshold and cross-border complexity', 'A streamlined reporting format suited to smaller entities with simpler affairs'],
];

const recentChanges = [
  { title: 'Section 12AB Registration Regime', desc: 'The older, indefinite 12A/12AA registration has been replaced by a time-bound regime — provisional registration for 3 years via Form 10A for new trusts, and regular registration for 5 years via Form 10AB, which must be renewed well before expiry to avoid a compliance gap.' },
  { title: 'Bifurcated Audit Forms', desc: 'Form 10B and Form 10BB replaced the earlier single audit report format, splitting the reporting obligation based on income size and whether the entity has foreign-contribution or foreign-application exposure.' },
  { title: 'Penalty for Non-Application at MMR', desc: 'Where the 85% application condition is not met and no valid Form 10 accumulation has been filed, the shortfall loses its exempt character and is instead taxed at the Maximum Marginal Rate rather than being carried forward as exempt income.' },
  { title: 'Form 10BD Donation Statement', desc: 'Trusts must report every donation received during the year, donor-wise, in Form 10BD by 31 May following the financial year, and issue a corresponding Form 10BE donation certificate to each donor.' },
  { title: 'Section 115TD Exit Tax', desc: 'If a trust converts into a non-charitable form, merges with an entity that isn\'t similarly registered, or fails to renew its 12AB registration, its accreted income (broadly, net assets) becomes taxable at the maximum marginal rate as a one-time exit tax.' },
  { title: 'Tightened FCRA Compliance', desc: 'Entities receiving foreign contributions face stricter reporting under the Foreign Contribution (Regulation) Act — including a mandatory designated FCRA bank account and annual FC-4 filings — figures that must reconcile against Schedule FC of ITR-7.' },
];

const dueDateRows: string[][] = [
  ['Audit Report (Form 10B / 10BB)', 'One month before the ITR-7 due date — typically 30 September of the assessment year', 'A delayed audit report leaves little room to finalise the ITR-7 on time and can invite scrutiny of the underlying accounts'],
  ['ITR-7 Filing — entities requiring audit', '31 October of the assessment year', 'Applies to the large majority of registered trusts and institutions, since most cross the audit threshold under their registration conditions'],
  ['ITR-7 Filing — transfer pricing cases (Form 3CEB)', '30 November of the assessment year', 'Extended due date for entities that have entered into international or specified domestic transactions requiring a Form 3CEB report'],
  ['Late Filing Fee — Section 234F', '₹5,000 (₹1,000 where total income does not exceed ₹5 lakh)', 'Levied automatically where the return is filed after the due date but before 31 December of the assessment year'],
  ['Interest for Late Filing — Section 234A', '1% per month or part thereof', 'Charged on any unpaid tax from the original due date until the date the return is actually filed'],
  ['Interest for Advance Tax Shortfall — Section 234B', '1% per month or part thereof', 'Applies where advance tax paid during the year falls short of 90% of the assessed tax liability'],
  ['Loss of Exemption Risk — Section 12A(1)(ba)', 'Return not filed within the time allowed under Section 139(4A)/(4B)/(4C)', 'Filing after the due date can disqualify the trust from claiming exemption under Sections 11/12 for that entire year — not merely delay it, unlike the position for most other taxpayers'],
  ['12AB Cancellation Risk', 'Repeated or serious non-compliance', 'Persistent late filing or other lapses can lead the jurisdictional Principal Commissioner/Commissioner to cancel the entity\'s Section 12AB registration under Section 12AB(4)/(5)'],
];

const benefitCards = [
  { title: 'Maintain Exempt Status', desc: 'Filing ITR-7 within the due date keeps the Section 11/12 exemption intact under Section 12A(1)(ba) — a condition unique to trusts, where a late return can void the exemption for the entire year rather than merely attracting a fee.' },
  { title: 'Protect 12AB Registration', desc: 'Consistent, on-time filing forms part of the compliance track record that the jurisdictional Commissioner considers before renewing or reviewing a trust\'s Section 12AB registration.' },
  { title: 'Donor Confidence', desc: 'A clean, timely-filed return and audit report signal financial credibility to individual donors, corporates, and CSR committees evaluating whether to support the organisation.' },
  { title: 'Government Grant Eligibility', desc: 'Government departments and CSR-linked funding bodies commonly ask for the most recent ITR-7 and audit report before sanctioning grants or empanelling an NGO for a program.' },
  { title: 'Accumulation Benefits (via Form 10)', desc: 'The right to accumulate income beyond the 15% threshold under Section 11(2) is conditional on filing Form 10 along with a timely ITR-7 — miss the deadline and the accumulation claim itself is at risk.' },
  { title: 'Avoid Penalties & Scrutiny', desc: 'Timely filing sidesteps the late fee under Section 234F, ongoing interest under Sections 234A/234B, and reduces the likelihood of the return being picked up for detailed scrutiny.' },
];

const faqs = [
  { q: 'What is ITR-7 and who needs to file it?', a: 'ITR-7 is the income tax return form for entities claiming exemption under Sections 11, 12, 13A or 10(21)/10(22B)/10(23C)/10(24) — broadly, charitable and religious trusts, NGOs, Section 8 companies, political parties, universities, hospitals, research associations, news agencies, and trade unions filing under Sections 139(4A) through 139(4D).' },
  { q: 'What is the difference between ITR-6 and ITR-7?', a: 'ITR-6 is for ordinary companies computing taxable profit under the normal provisions of the Act, while ITR-7 is for entities claiming exemption — the return is structured around verifying application of income toward exempt objects rather than computing a business tax liability. A company can still end up filing ITR-7 instead of ITR-6 if it is registered as a Section 8 company claiming Section 11 exemption.' },
  { q: 'Who must file under Section 139(4A)?', a: 'Trusts and institutions — including Section 8 companies — holding income wholly or partly for charitable or religious purposes, and claiming exemption under Sections 11 and 12, file under Section 139(4A).' },
  { q: 'Who must file under Section 139(4B)?', a: 'Political parties registered with the Election Commission of India file under Section 139(4B), claiming exemption under Section 13A subject to maintaining audited accounts and receiving donations above ₹2,000 only through banking channels or electoral bonds.' },
  { q: 'Who must file under Section 139(4C)?', a: 'Universities, hospitals, research associations, news agencies, and trade unions claiming exemption under Section 10(21), 10(22B), 10(23C), or 10(24) file under Section 139(4C).' },
  { q: 'Who must file under Section 139(4D)?', a: 'Universities, colleges, and institutions that are not required to furnish a return under any other provision of Section 139 — typically government or government-aided educational bodies outside the standard Section 10(23C) approval route — file under Section 139(4D).' },
  { q: 'Is filing ITR-7 mandatory even if the trust has zero taxable income?', a: 'Yes. A registered trust or institution must file ITR-7 for every year it remains registered, regardless of whether its income after exemption is nil, because the filing obligation flows from its registration status, not from a taxable income threshold.' },
  { q: 'What is the 85% application of income rule?', a: 'Under Section 11(1), a trust must apply at least 85% of the income it derives from property held for charitable or religious purposes toward those objects within the same financial year for that income to remain fully exempt; any shortfall is either accumulated formally under Section 11(2) or becomes taxable.' },
  { q: 'How does Section 11(2) accumulation work, and what is Form 10?', a: 'Where a trust cannot apply the full 85% in the current year, it can accumulate the balance for up to 5 years by filing Form 10 (electronically, along with or before the ITR-7) and specifying the purpose of accumulation, keeping that portion exempt until it is eventually applied.' },
  { q: 'What is the difference between Form 10B and Form 10BB?', a: 'Form 10B applies where the trust\'s income before exemption exceeds ₹5 crore, it received foreign contributions, or it applied income outside India; Form 10BB applies to all other, generally smaller and purely domestic, trusts and institutions. Both carry the same filing deadline — one month before the ITR-7 due date.' },
  { q: 'What is the Section 12AB registration regime?', a: 'Section 12AB replaced the earlier indefinite 12A/12AA registration with a time-bound system — new trusts get provisional registration for 3 years via Form 10A, which must then be converted to regular registration for 5 years via Form 10AB, renewable before each expiry.' },
  { q: 'What is the due date for filing ITR-7?', a: 'For trusts and institutions requiring an audit, the standard due date is 31 October of the assessment year. Entities with transfer pricing reporting obligations under Form 3CEB get an extended due date of 30 November.' },
  { q: 'What are the penalties for late filing of ITR-7?', a: 'Beyond the late fee under Section 234F and interest under Section 234A, a trust filing after its due date risks a consequence unique to exempt entities — losing its Section 11/12 exemption for that entire year under Section 12A(1)(ba), which can be far costlier than the fee itself.' },
  { q: 'How are corpus donations treated under the Income-tax Act?', a: 'Donations expressly given toward the corpus are fully exempt under Section 11(1)(d), but since the Finance Act 2021 amendment, this exemption holds only if the corpus amount is invested or deposited in one of the specified modes under Section 11(5) and kept separately identifiable from the trust\'s other funds.' },
  { q: 'What are the requirements for reporting FCRA/foreign donations?', a: 'Trusts receiving foreign contributions must hold FCRA registration, route the funds through a designated FCRA bank account, file an annual FC-4 return under the Foreign Contribution (Regulation) Act, and report the same figures in Schedule FC of the ITR-7 so both filings reconcile.' },
  { q: 'Can a Section 8 company file ITR-7?', a: 'Yes — a Section 8 company that has obtained Section 12AB registration and is claiming exemption under Sections 11/12 files ITR-7 under Section 139(4A), even though it remains incorporated under the Companies Act, 2013. A Section 8 company not claiming this exemption would instead file ITR-6.' },
  { q: 'What happens if a trust fails to apply 85% of its income?', a: 'The shortfall between actual application and the 85% threshold loses its exempt character — unless it is validly accumulated under Section 11(2) using Form 10 — and becomes taxable at the Maximum Marginal Rate rather than at a concessional or nil rate.' },
  { q: 'What investments qualify under Section 11(5)?', a: 'Section 11(5) lists the specified modes in which a trust\'s funds — including corpus and accumulated income — must be held to retain exempt status: government securities and savings certificates, deposits with scheduled or co-operative banks, UTI and SEBI-regulated mutual fund units, bonds of specified public sector companies, and investment in immovable property.' },
  { q: 'What is Form 10BD and who needs to file it?', a: 'Form 10BD is an annual, donor-wise statement of donations received, which every trust approved under Section 80G or 12AB (as applicable) must file by 31 May following the financial year; it triggers the issuance of Form 10BE certificates that donors use to claim their own deductions.' },
  { q: 'What is Section 115TD exit tax?', a: 'Section 115TD taxes the accreted income (broadly, the net asset value) of a trust at the Maximum Marginal Rate when the trust converts into a non-charitable form, merges with an entity not similarly registered, or fails to renew its 12AB registration — treated as a one-time exit event outside the normal annual tax cycle.' },
  { q: 'Can a trust revise its ITR-7 after filing?', a: 'Yes, a revised return can be filed under Section 139(5) at any time before three months prior to the end of the relevant assessment year or before assessment is completed, whichever is earlier, provided the original return was filed within the statutory due date.' },
  { q: 'Does missing the ITR-7 due date affect the trust\'s tax exemption?', a: 'Yes, and more severely than for most other taxpayers — Section 12A(1)(ba) makes timely filing under Section 139(4A) a precondition for claiming exemption under Sections 11/12, so a late return can result in the entire year\'s income losing exempt status.' },
  { q: 'What books of account must a trust maintain?', a: 'A trust or institution must maintain regular books of account and supporting vouchers under Section 12A(1)(b), in a format aligned with its size and activities, and once gross receipts exceed a prescribed threshold this record-keeping becomes even more detailed to support the audit under Form 10B/10BB.' },
  { q: 'How does ComplianceBharo assist with ITR-7 filing for trusts and NGOs?', a: 'We assess the trust\'s eligibility and 12AB registration status, verify the 85% application of income, coordinate the Form 10B/10BB audit, track corpus and voluntary contributions, plan any Section 11(2) accumulation via Form 10, and handle FCRA-linked reporting before preparing and DSC-filing the ITR-7 itself.' },
  { q: 'Why choose ComplianceBharo for ITR-7 filing?', a: 'ComplianceBharo brings eligibility assessment, audit coordination, exemption verification, and accumulation planning together under one transparent, fixed professional fee, with continued support if the tax department raises a query or notice after the return is processed.' },
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

export default function ITR7Client() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="ITR-7 Return Filing" />

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
                  Trust, NGO &amp; Charitable Institution Tax Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">ITR-7 Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Trust, NGO &amp; Charitable Institution Income Tax Return Under Sections 139(4A)-139(4D)
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  12AB Registration Compliance. Form 10B/10BB Audit Coordination. 85% Application Verification. Starting at <span className="text-brand-orange">₹9,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Trust/NGO Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"ITR-7 Return Filing"} dm={isDarkMode} />
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
                ITR-7 Trust &amp; NGO Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹9,999
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is ITR-7?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                ITR-7 is the income tax return form the CBDT prescribes for entities claiming exemption rather than computing ordinary business profit — charitable trusts, religious trusts, NGOs, Section 8 companies registered under Section 12AB, political parties, universities, hospitals, research associations, news agencies, trade unions, and similar institutions. Depending on the type of entity and the exemption it relies on, the filing obligation arises under one of four provisions: <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 139(4A), 139(4B), 139(4C), or 139(4D)</strong>.
              </p>
              <p>
                Unlike ITR-6, ITR-7 is not really built around arriving at a taxable profit figure — it is built around demonstrating that the entity has genuinely used its income for the objects it was registered to pursue. The central test running through the form is whether <strong className={dm ? 'text-white' : 'text-slate-900'}>at least 85% of the entity's income was applied</strong> toward its charitable or religious objects (or the equivalent condition for the specific exemption being claimed) during the year — everything from Schedule VC to Schedule AI to Schedule IA exists to document that application, or explain why part of it was validly accumulated instead.
              </p>
              <p>
                Verification, like with companies, allows no shortcuts: ITR-7 must be signed using the <strong className={dm ? 'text-white' : 'text-slate-900'}>Digital Signature Certificate</strong> of an authorised trustee or signatory, since Aadhaar OTP and the Electronic Verification Code are not accepted for this category of return.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Who Must File */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Must File ITR-7?</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Eligibility turns on the exemption an entity relies on, not on its legal form — a trust, a society, and a Section 8 company can all end up filing ITR-7 under the same provision if they share the same exemption basis.
            </p>
            <DataTable headers={['Entity Type', 'Applicable Section', 'Exemption Basis']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 3. Applicable Sections */}
          <div id="sections" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Applicable Sections — 139(4A) to 139(4D)</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              These four sub-sections of Section 139 cover distinct categories of exempt entities, each tied to a different exemption provision and a different set of conditions.
            </p>
            <DataTable headers={['Sub-Section', 'Who Files', 'Exemption Basis', 'Key Conditions']} rows={sectionsRows} dm={dm} />
          </div>

          {/* 4. ITR-7 Structure */}
          <div id="structure" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-7 Structure — Key Schedules</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The form's schedules trace the full life cycle of a trust's money — what came in, what was applied, what was accumulated, and what remains invested.
            </p>
            <DataTable headers={['Schedule', 'What It Captures']} rows={structureRows} dm={dm} />
          </div>

          {/* 5. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITR-7 Filing Process — Step by Step</h2>
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
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for ITR-7 Filing</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A trust's document checklist spans both its formation and tax registration history — file gaps here often surface only when the audit or the return is being prepared.
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

          {/* 7. Section 11/12 Exemption */}
          <div id="exemption" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Understanding the Section 11/12 Exemption</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 11(1)</strong> is the starting point: a trust must apply at least <strong className={dm ? 'text-white' : 'text-slate-900'}>85% of the income</strong> it derives from property held for charitable or religious purposes toward those objects within the same financial year for that income to remain fully exempt. Where the full 85% cannot be applied in time — a delayed grant, a project running behind schedule, or funds simply not yet received — <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 11(2)</strong> allows the shortfall to be accumulated for up to <strong className={dm ? 'text-white' : 'text-slate-900'}>5 years</strong>, provided the trust files <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 10</strong> specifying the purpose and period of accumulation, and keeps the accumulated funds invested in the modes specified under Section 11(5).
              </p>
              <p>
                Donations expressly given toward the <strong className={dm ? 'text-white' : 'text-slate-900'}>corpus</strong> sit outside this 85% test altogether and are fully exempt under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 11(1)(d)</strong> — but since the Finance Act 2021 amendment, that exemption is conditional on the corpus amount being invested or deposited in a Section 11(5) mode and kept separately identifiable from the trust's general funds. Every other donation received — voluntary contributions that are not earmarked for corpus — is treated as income under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 12</strong> and folds into the 85% application computation like any other receipt.
              </p>
              <p>
                Both corpus funds and accumulated income must be parked in the specified modes under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 11(5)</strong>, which include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                {investmentModes.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Consequence of Non-Application: </strong>
              If income is neither applied within the 85% threshold nor validly accumulated via Form 10, it loses its exempt character. That portion is then taxed at the <strong>Maximum Marginal Rate (MMR)</strong> — the rate applicable to the highest income slab for an individual or AOP under the Finance Act, currently in the region of <strong>42.74%</strong> once the applicable surcharge and 4% cess are factored in — rather than at the trust's normal exempt or concessional treatment.
            </div>
          </div>

          {/* 8. Form 10B vs Form 10BB */}
          <div id="audit-forms" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Form 10B vs Form 10BB</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Since 1 April 2023, which audit form applies depends on the trust's income and cross-border activity, not on which section it is registered under.
            </p>
            <DataTable headers={['Parameter', 'Form 10B', 'Form 10BB']} rows={auditFormRows} dm={dm} />
          </div>

          {/* 9. Recent Changes in Trust Taxation */}
          <div id="changes" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Recent Changes in Trust Taxation</h2>
            <div className="space-y-4">
              {recentChanges.map((c, i) => (
                <div key={c.title} className={`flex gap-4 rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold border ${dm ? 'bg-slate-950 text-brand-orange border-brand-orange' : 'bg-white text-brand-orange border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold mb-1.5 ${dm ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Due Dates & Penalties */}
          <div id="due-dates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Due Dates &amp; Penalties</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              For trusts, missing a deadline carries a risk most other taxpayers don't face — the exemption itself, not just a fee, can be on the line.
            </p>
            <DataTable headers={['Compliance Requirement', 'Applicable Date / Rate', 'Details']} rows={dueDateRows} dm={dm} />
          </div>

          {/* 11. Benefits of Timely Filing */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Timely ITR-7 Filing</h2>
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
                Have questions about ITR-7 filing for your trust or NGO? Let our experts help you figure out the right compliance plan.
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
          serviceName="ITR-7 Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
