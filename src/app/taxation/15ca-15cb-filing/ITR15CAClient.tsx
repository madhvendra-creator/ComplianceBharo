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
  { id: 'when-required', label: 'When Required' },
  { id: 'parts', label: 'Parts of 15CA' },
  { id: 'checks', label: '15CB Checks' },
  { id: 'documents', label: 'Documents' },
  { id: 'process', label: 'Filing Process' },
  { id: 'tds-rates', label: 'TDS Rates' },
  { id: 'dtaa', label: 'DTAA Benefits' },
  { id: 'penalties', label: 'Penalties' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Form 15CB Professional Certification',
  'Form 15CA e-Filing (All Parts)',
  'DTAA Treaty Benefit Analysis',
  'TRC & Form 10F Verification',
  'TDS Rate Determination',
  'Bank Acknowledgment Support',
];

const pricingInclusions = [
  'Taxability Assessment',
  'DTAA Applicability Analysis',
  'TDS Rate Determination',
  'Document Review & Compilation',
  'Form 15CB Professional Certification',
  'Form 15CA e-Filing',
  'Bank Acknowledgment Generation',
  'TRC & Form 10F Verification',
  'Post-Filing Query Support',
  'Dedicated Professional Assistance',
];

const overviewFacts: [string, string][] = [
  ['Governing Provision', 'Section 195(6) of the Income-tax Act, 1961, read with Rule 37BB of the Income-tax Rules, 1962'],
  ['Form 15CA', 'An online declaration filed by the remitter on the income tax e-Filing portal before making an outward remittance, disclosing the nature and amount of the payment and the TDS applied'],
  ['Form 15CB', 'A certificate issued by a practising Chartered Accountant confirming the TDS rate, DTAA position, and overall tax compliance of the remittance, required for most payments above ₹5 lakh'],
  ['Who Needs It', 'Any person making a payment to a non-resident (or a foreign company) that is chargeable to tax in India, before the remittance is sent abroad'],
  ['Bank Requirement', 'Authorised dealer banks require the Form 15CA acknowledgment number — and the linked Form 15CB certificate, where applicable — before releasing a taxable foreign remittance'],
  ['Filing Mode', '100% online, filed on the income tax e-Filing portal (incometax.gov.in) and verified using DSC or EVC'],
];

const whenRequiredRows: string[][] = [
  ['Payment ≤ ₹5 lakh in aggregate for the financial year', 'Part A', 'Not required — a self-declaration by the remitter is sufficient'],
  ['Payment > ₹5 lakh, DTAA benefit being claimed', 'Part B', 'Required — the professional confirms the treaty rate and the conditions for claiming it'],
  ['Payment > ₹5 lakh, no DTAA applicable or claimed', 'Part C', 'Required — the professional confirms the domestic Section 195 rate plus applicable surcharge and cess'],
  ['Order obtained under Section 195(2), 195(3) or 197', 'Part D', 'Not required — the Assessing Officer\'s own order substitutes for the professional certificate'],
  ['Rule 37BB specified exempt payments (imports, embassy/diplomatic remittances, government remittances, NRE account interest, and other listed categories)', 'Not applicable', 'Neither Form 15CA nor Form 15CB is required at all'],
];

const partsOfForm = [
  { title: 'Part A', desc: 'Filed where the aggregate remittance to the payee, taken together with all other remittances to that payee during the financial year, does not exceed ₹5 lakh — regardless of whether the payment is chargeable to tax. This is a straightforward self-declaration by the remitter, and no Form 15CB certificate is needed to file it.' },
  { title: 'Part B', desc: 'Filed where the remittance exceeds ₹5 lakh and the remitter intends to apply a DTAA rate instead of the domestic Section 195 rate. Form 15CB becomes mandatory before Part B can be filed, since a practising professional must first confirm that the treaty applies, at what rate, and subject to what conditions.' },
  { title: 'Part C', desc: 'Filed where the remittance exceeds ₹5 lakh and no DTAA is being claimed — either because none exists with the recipient\'s country of residence or because the remitter is not relying on one. Form 15CB is again mandatory here, this time certifying the domestic rate under Section 195 plus applicable surcharge and cess.' },
  { title: 'Part D', desc: 'Filed where the remitter has obtained a specific order from the Assessing Officer under Section 195(2), Section 195(3), or Section 197, determining the taxable proportion or a nil/lower TDS rate for the remittance. No Form 15CB is required in this case, since the AO\'s order already establishes the correct tax position.' },
];

const cbChecks = [
  'Classification of the remittance — interest, royalty, fees for technical services, dividend, business income, capital gains, or another head',
  'Whether a Double Taxation Avoidance Agreement (DTAA) applies between India and the recipient\'s country of tax residence',
  'The correct TDS rate — comparing the domestic Section 195 rate against the treaty rate and applying whichever is lower, as permitted under Section 90(2)',
  'Whether the non-resident already holds a lower or nil deduction certificate issued under Section 197',
  'Validity and completeness of the Tax Residency Certificate (TRC) produced by the non-resident',
  'A Permanent Establishment (PE) assessment — whether the non-resident has a taxable presence in India that changes how the income is characterised and taxed',
  'Beneficial ownership verification — confirming the recipient is the genuine economic owner of the income rather than a conduit for someone else',
  'The impact of the Multilateral Instrument (MLI) and its Principal Purpose Test on whether treaty benefits are actually available for the specific arrangement',
];

const documentGroups = [
  { group: 'Transaction Documents', items: ['Underlying invoice or agreement for the remittance', 'Purchase order or contract copy supporting the transaction'] },
  { group: 'Remitter Details', items: ['PAN of the remitter', 'Bank and remittance details, including SWIFT/IBAN and purpose code'] },
  { group: 'Non-Resident Details', items: ['Tax Identification Number (TIN) of the recipient in their home country', 'No-Permanent-Establishment (No-PE) declaration from the non-resident'] },
  { group: 'DTAA Documents', items: ['Tax Residency Certificate (TRC) issued by the foreign tax authority', 'Form 10F self-declaration', 'Reference to the specific treaty article being relied upon'] },
  { group: 'Tax Compliance', items: ['Lower or nil deduction certificate under Section 197, if already obtained', 'TDS challan proof of any prior deposits relevant to the transaction'] },
];

const processSteps = [
  { title: 'Determine Taxability', desc: 'Establish whether the remittance is chargeable to tax under the Income-tax Act at all, since Form 15CA/15CB is only relevant to payments with an Indian tax angle — purely non-taxable or Rule 37BB-exempt remittances don\'t need either form.' },
  { title: 'Obtain TRC from Non-Resident', desc: 'Request the Tax Residency Certificate from the recipient\'s home tax authority, along with a completed Form 10F and a no-PE declaration, since these documents are the foundation for claiming any DTAA benefit.' },
  { title: 'Get Form 15CB from Tax Professional', desc: 'Hand the transaction documents, TRC, and Form 10F to a practising Chartered Accountant, who examines the nature of the payment, applies the correct DTAA or domestic rate, and issues the Form 15CB certificate.' },
  { title: 'Log in to the e-Filing Portal (incometax.gov.in)', desc: 'Access the remitter\'s account on the income tax e-Filing portal, where the Form 15CB (if applicable) is first uploaded so its details can be pulled directly into Form 15CA.' },
  { title: 'Fill Form 15CA (Correct Part)', desc: 'Select and complete Part A, B, C, or D based on the remittance amount and the position established in the earlier steps, ensuring the figures match the underlying invoice and the Form 15CB certificate exactly.' },
  { title: 'Submit with DSC / EVC', desc: 'Verify and submit the form using the remitter\'s Digital Signature Certificate or Electronic Verification Code, depending on the category of remitter and the applicable verification requirement.' },
  { title: 'Generate Acknowledgment for Bank Submission', desc: 'Download the Form 15CA acknowledgment (and the linked Form 15CB, where filed) and submit both to the authorised dealer bank, which will not release the remittance without this documentation.' },
];

const tdsRateRows: string[][] = [
  ['Interest', '20%*', '10% – 15%', '10% – 15%', '10% – 15%', '5% – 12.5%'],
  ['Royalty', '20%*', '10%', '10% – 15%', '10%', '10%'],
  ['Fees for Technical Services (FTS)', '20%*', '10%', '10% – 15%', '10%', '10%'],
  ['Dividends', '20%*', '15% – 25%', '10% – 15%', '10% – 15%', '10%'],
  ['Salary (dependent personal services)', 'Normal slab rates under Section 192', 'Per Article 16 conditions; short-stay exemption may apply', 'Per treaty Article conditions', 'Per treaty Article conditions', 'Per treaty Article conditions'],
  ['Other Income (not specifically covered)', 'Up to 30%–40% depending on payee status', 'Taxable per domestic provisions (residual clause)', 'Taxable per domestic provisions (residual clause)', 'Taxable per domestic provisions (residual clause)', 'Taxable per domestic provisions (residual clause)'],
];

const dtaaRequirements = [
  { title: 'Tax Residency Certificate (Section 90(4))', desc: 'A TRC issued by the foreign tax authority is the mandatory starting point for any treaty claim — without it, a DTAA benefit cannot be claimed at all, regardless of whether every other condition is met.' },
  { title: 'Form 10F Self-Declaration', desc: 'Where the TRC does not already carry every prescribed particular — status, nationality, tax identification number, period of residency, and address — the non-resident must additionally file Form 10F electronically to fill the gap.' },
  { title: 'No-PE Declaration', desc: 'The non-resident must confirm it does not have a Permanent Establishment in India through which the income is effectively connected; where a PE does exist, the income is generally taxed as ordinary business profit rather than at the concessional treaty rate.' },
  { title: 'Beneficial Ownership Requirement', desc: 'Several treaty articles — particularly those covering interest and royalty — restrict the reduced rate to the income\'s "beneficial owner," denying the benefit to pass-through or conduit arrangements that lack real economic substance.' },
  { title: 'MLI Principal Purpose Test', desc: 'Under India\'s adoption of the OECD\'s Multilateral Instrument, treaty benefits can still be denied where obtaining that benefit was one of the principal purposes of the arrangement — even if the TRC, Form 10F, and beneficial ownership conditions are all technically satisfied.' },
];

const penaltyRows: string[][] = [
  ['Non-filing or inaccurate Form 15CA/15CB', 'Section 271-I', 'Penalty of ₹1,00,000 per default'],
  ['Non-deduction of TDS', 'Section 201(1A)', 'Interest at 1% per month from the date tax was deductible to the date it is actually deducted'],
  ['TDS deducted but not deposited', 'Section 201(1A)', 'Interest at 1.5% per month from the date of deduction to the date of actual deposit'],
  ['Business expenditure disallowance', 'Section 40(a)(i)', '100% of the expenditure disallowed while computing business income, where TDS on a payment to a non-resident was not deducted or, after deduction, not deposited'],
  ['Short deduction of TDS', 'Section 201', 'The remitter is treated as an "assessee-in-default" for the shortfall, along with interest on the deficient amount'],
  ['Wilful failure to deduct or deposit TDS', 'Section 276B', 'Prosecution with rigorous imprisonment ranging from 3 months to 7 years, along with a fine'],
];

const benefitCards = [
  { title: 'Penalty Protection', desc: 'Correctly identifying the applicable Part and TDS rate upfront avoids the ₹1,00,000 penalty under Section 271-I and the compounding interest under Section 201(1A) that follow an inaccurate or missed filing.' },
  { title: 'DTAA Tax Savings', desc: 'Where a lower treaty rate genuinely applies, a properly documented Form 15CB lets the remitter apply it directly instead of defaulting to the higher domestic Section 195 rate, reducing the TDS actually withheld.' },
  { title: 'Smooth Bank Processing', desc: 'Authorised dealer banks will not release a taxable foreign remittance without a valid Form 15CA acknowledgment (and Form 15CB, where applicable), so getting the documentation right the first time avoids payment delays that can strain vendor and counterparty relationships.' },
  { title: 'Expense Protection', desc: 'Correct TDS compliance on the remittance protects the underlying business expenditure from the 100% disallowance under Section 40(a)(i) that applies when tax on a payment to a non-resident goes undeducted.' },
  { title: 'Professional Certification', desc: 'An independent Chartered Accountant\'s Form 15CB gives the remitter a documented, defensible basis for the TDS position taken — a record that matters if the transaction is later questioned.' },
  { title: 'Fast Processing', desc: 'Organised documentation and the correct Part selected on the first attempt avoid the back-and-forth that otherwise slows down both the professional certification and the bank\'s own compliance checks.' },
];

const faqs = [
  { q: 'What is Form 15CA?', a: 'Form 15CA is an online declaration a remitter files on the income tax e-Filing portal before sending money abroad, disclosing the nature, amount, and applicable TDS on a remittance to a non-resident that is chargeable to tax in India.' },
  { q: 'What is Form 15CB?', a: 'Form 15CB is a certificate issued by a practising Chartered Accountant confirming the correct TDS rate, DTAA position, and overall tax compliance for a specific remittance, generally required before Form 15CA can be filed under Part B or Part C.' },
  { q: 'What are the four parts of Form 15CA?', a: 'Part A applies to remittances up to ₹5 lakh in aggregate for the year; Part B applies above that threshold where a DTAA rate is claimed; Part C applies above that threshold where no DTAA is claimed; and Part D applies where a specific Assessing Officer order under Section 195(2), 195(3), or 197 already governs the remittance.' },
  { q: 'When is Form 15CB not required?', a: 'Form 15CB is not required for remittances up to ₹5 lakh in aggregate for the financial year (Part A), where an Assessing Officer order under Section 195(2)/195(3)/197 already applies (Part D), or where the payment falls within the Rule 37BB list of specified exempt payments.' },
  { q: 'What are the Rule 37BB exemptions?', a: 'Rule 37BB lists specific categories of payments — including certain imports, embassy and diplomatic remittances, government-to-government remittances, and interest credited to an NRE account — for which neither Form 15CA nor Form 15CB needs to be filed at all.' },
  { q: 'What are the TDS rates under Section 195?', a: 'Rates vary by nature of income: royalty and fees for technical services attract 20% under Section 115A (doubled from 10% effective 1 April 2023), dividends and interest are commonly taxed around 20% subject to specific provisions, and other income can attract rates up to 30%–40% depending on the payee\'s status — all subject to surcharge and cess, and to any lower rate available under an applicable DTAA.' },
  { q: 'How does a DTAA reduce TDS on foreign remittances?', a: 'Under Section 90(2), a taxpayer can apply whichever is lower — the domestic Section 195 rate or the rate specified in the applicable Double Taxation Avoidance Agreement — provided the recipient furnishes a valid Tax Residency Certificate, Form 10F, and satisfies conditions like beneficial ownership and the absence of a Permanent Establishment.' },
  { q: 'What documents are needed for Form 15CA-15CB filing?', a: 'Typical requirements include the underlying invoice or agreement, the remitter\'s PAN and bank details, the non-resident\'s TIN and no-PE declaration, a Tax Residency Certificate and Form 10F where a DTAA is claimed, and proof of any lower deduction certificate already obtained.' },
  { q: 'What is a TRC and why is it needed?', a: 'A Tax Residency Certificate (TRC) is an official document issued by a foreign tax authority confirming that the recipient is a tax resident of that country. It is a mandatory precondition under Section 90(4) for claiming any DTAA benefit on the remittance.' },
  { q: 'What is the filing process for Form 15CA-15CB?', a: 'Broadly: determine taxability, obtain the TRC and Form 10F from the non-resident, get Form 15CB from a Chartered Accountant, log in to the e-Filing portal, complete the correct Part of Form 15CA, submit using DSC or EVC, and download the acknowledgment for the bank.' },
  { q: 'What is the penalty for not filing Form 15CA?', a: 'Failure to furnish Form 15CA, or furnishing inaccurate particulars in it, attracts a penalty of ₹1,00,000 under Section 271-I, in addition to any interest and disallowance consequences that follow from the underlying TDS default itself.' },
  { q: 'Can Form 15CA be filed without Form 15CB?', a: 'Yes, but only in specific situations — where the remittance falls under Part A (up to ₹5 lakh aggregate for the year), Part D (covered by an Assessing Officer order), or a Rule 37BB exempt category. For most remittances above ₹5 lakh where tax is being withheld, Form 15CB is a precondition to filing Part B or Part C.' },
  { q: 'What is MLI (Multilateral Instrument)?', a: 'The MLI is a multilateral treaty developed under the OECD\'s BEPS project that India has adopted to modify its existing tax treaties. Its Principal Purpose Test allows treaty benefits to be denied where obtaining that benefit was one of the principal purposes behind a transaction or arrangement, even if all other conditions are technically met.' },
  { q: 'Is Form 15CA required for payments to NRIs?', a: 'Yes, if the payment is chargeable to tax in India and exceeds the thresholds or falls outside the Rule 37BB exempt list — the requirement applies to remittances to any non-resident, including Non-Resident Indians, not just foreign nationals or foreign companies.' },
  { q: 'What is the timeline for filing Form 15CA-15CB before a remittance?', a: 'There is no fixed statutory lead time, but practically, the Form 15CB certification and Form 15CA filing must both be completed before the remittance is sent, since the authorised dealer bank will not process the payment without the acknowledgment — most remitters build in a few working days for the CA review and documentation.' },
  { q: 'Can a single Form 15CA/15CB cover multiple remittances?', a: 'No, each remittance generally requires its own Form 15CA (and Form 15CB, where applicable), since the forms capture transaction-specific details such as the invoice amount, nature of payment, and the exact TDS computation for that particular transfer.' },
  { q: 'What is the difference between Section 195(2) and Section 195(3)?', a: 'Section 195(2) is invoked by the remitter, who applies to the Assessing Officer to determine what proportion of the remittance is actually chargeable to tax when the payer believes the whole sum isn\'t taxable. Section 195(3) is invoked by the non-resident recipient itself, who applies (under Rule 29B) for a certificate authorising receipt of the income without any TDS deduction, generally available to specified categories of non-residents meeting prescribed conditions.' },
  { q: 'What role does the bank play in 15CA-15CB compliance?', a: 'The authorised dealer bank acts as the checkpoint — it verifies that a valid Form 15CA acknowledgment (and Form 15CB, where required) has been generated before it will process and release the outward remittance, effectively enforcing the compliance requirement at the point of payment.' },
  { q: 'Is Form 15CA-15CB applicable to remittances under the Liberalised Remittance Scheme (LRS)?', a: 'Many common LRS remittances by individuals — such as private travel, medical treatment, education expenses, and maintenance of close relatives — appear on the Rule 37BB specified exempt list and don\'t require Form 15CA/15CB, though banks may still ask for supporting paperwork as part of their own FEMA checks. Larger or less common LRS remittances outside that specified list may still trigger the filing requirement depending on their nature and value.' },
  { q: 'Can Form 15CA or 15CB be revised or withdrawn after filing?', a: 'Form 15CA can be withdrawn on the e-Filing portal within a limited window after submission if an error is spotted before the remittance is processed; Form 15CB, once certified and uploaded, generally needs to be corrected by filing a fresh, revised certificate rather than editing the original.' },
  { q: 'What happens if the wrong Part of Form 15CA is selected?', a: 'Selecting the wrong Part — for instance, using Part A for a remittance that actually exceeds ₹5 lakh and is taxable — can result in TDS being under-reported or skipped entirely, exposing the remitter to interest under Section 201(1A), disallowance under Section 40(a)(i), and the ₹1,00,000 penalty under Section 271-I for inaccurate particulars.' },
  { q: 'Does Form 15CB guarantee that no tax notice will be issued later?', a: 'No. Form 15CB reflects the Chartered Accountant\'s professional opinion based on the facts and documents available at the time of certification — it does not bind the tax department\'s own assessment, and if the underlying facts turn out differently, the position can still be questioned or reassessed.' },
  { q: 'How does ComplianceBharo assist with Form 15CA-15CB filing?', a: 'We assess the taxability of the remittance, verify DTAA applicability and the correct TDS rate, review the TRC and Form 10F, arrange the Form 15CB certification, file the correct Part of Form 15CA, and generate the acknowledgment your bank needs to release the payment.' },
  { q: 'Why choose ComplianceBharo for Form 15CA-15CB compliance?', a: 'ComplianceBharo combines taxability assessment, treaty analysis, professional certification, and e-filing under one transparent, fixed fee, with support extending to any post-filing query the bank or the tax department may raise about the remittance.' },
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

export default function ITR15CAClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Form 15CA-15CB Filing" />

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
                  Foreign Remittance TDS Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Form 15CA-15CB Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Professional Certificate &amp; Declaration for Foreign Remittances - TDS Compliance
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  DTAA Treaty Rate Analysis. TRC &amp; Form 10F Verification. Bank-Ready Acknowledgment. Starting at <span className="text-brand-orange">₹4,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; Cross-Border Tax Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Form 15CA-15CB Filing"} dm={isDarkMode} />
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
                Form 15CA-15CB Filing Package
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
                Timeline depends on documentation and DTAA complexity
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is Form 15CA-15CB Filing?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Forms 15CA and 15CB work together under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 195(6)</strong> of the Income-tax Act, 1961, read with <strong className={dm ? 'text-white' : 'text-slate-900'}>Rule 37BB</strong> of the Income-tax Rules, 1962, to ensure that any outward remittance to a non-resident carries the correct tax deducted at source before it leaves India. <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 15CA</strong> is the remitter's own online declaration, filed directly on the income tax e-Filing portal, disclosing what the payment is for, how much is being sent, and what TDS has been applied.
              </p>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 15CB</strong>, by contrast, is not something the remitter fills in themselves — it is a certificate issued by a practising Chartered Accountant, who independently examines the nature of the remittance, checks whether a tax treaty applies, and confirms the correct TDS rate before the payment goes out. For most remittances above the prescribed threshold, Form 15CB has to be obtained and referenced inside Form 15CA before the filing can be completed.
              </p>
              <p>
                In practice, neither form is optional paperwork that can be skipped — <strong className={dm ? 'text-white' : 'text-slate-900'}>authorised dealer banks</strong> will not process a taxable foreign remittance without seeing the Form 15CA acknowledgment (and the linked Form 15CB certificate, where one is required), which makes this filing a hard gate between deciding to make a payment and actually being able to send it.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. When Required */}
          <div id="when-required" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>When Is Form 15CA-15CB Required?</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Which part of Form 15CA applies — and whether Form 15CB is needed at all — depends on the remittance amount, whether a treaty rate is being claimed, and whether a specific tax officer order already covers the payment.
            </p>
            <DataTable headers={['Scenario', 'Applicable Part', 'Form 15CB Required?']} rows={whenRequiredRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *The ₹5 lakh threshold is computed on the aggregate of all remittances made to a payee during the financial year, not on each individual transaction — several smaller payments to the same recipient can still cross the threshold once totalled.
            </p>
          </div>

          {/* 3. Parts of Form 15CA */}
          <div id="parts" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Parts of Form 15CA Explained</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partsOfForm.map((p) => (
                <div key={p.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. What the Professional Examines for Form 15CB */}
          <div id="checks" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What the Professional Examines for Form 15CB</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Issuing Form 15CB isn't a rubber-stamp exercise — it involves working through a specific set of checks before a Chartered Accountant will certify the remittance.
            </p>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-4">
                {cbChecks.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className={`text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for Form 15CA-15CB Filing</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Gathering these upfront — especially the TRC and Form 10F from the non-resident recipient — is usually what determines how quickly the filing can be completed.
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

          {/* 6. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Form 15CA-15CB Filing Process — Step by Step</h2>
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

          {/* 7. TDS Rates on Foreign Payments */}
          <div id="tds-rates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>TDS Rates on Foreign Payments</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Domestic rates under Section 195 are frequently higher than the equivalent DTAA rate, which is exactly why treaty analysis matters before a remittance is made.
            </p>
            <DataTable headers={['Type of Payment', 'Domestic Rate (Section 195)', 'USA', 'UK', 'Singapore', 'UAE']} rows={tdsRateRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Rates shown are indicative and exclude applicable surcharge and 4% Health &amp; Education Cess. Under Section 90(2), a taxpayer can apply whichever is lower — the domestic rate or the treaty rate — but the DTAA rate is available only where the recipient furnishes a valid Tax Residency Certificate, Form 10F, and satisfies conditions such as beneficial ownership; exact treaty rates further depend on factors like shareholding percentage and whether the payee is a bank or financial institution.
            </p>
          </div>

          {/* 8. DTAA Benefits */}
          <div id="dtaa" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>DTAA Benefits — What It Takes to Claim Treaty Relief</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A lower treaty rate is never automatic — five distinct conditions need to line up before it can actually be applied to a remittance.
            </p>
            <div className="space-y-4">
              {dtaaRequirements.map((r, i) => (
                <div key={r.title} className={`flex gap-4 rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold border ${dm ? 'bg-slate-950 text-brand-orange border-brand-orange' : 'bg-white text-brand-orange border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold mb-1.5 ${dm ? 'text-white' : 'text-slate-900'}`}>{r.title}</h3>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Penalties for Non-Compliance */}
          <div id="penalties" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Penalties for Non-Compliance</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Getting Form 15CA-15CB wrong doesn't just risk a single penalty — it can trigger interest, a disallowed business expense, and a penalty simultaneously on the same transaction.
            </p>
            <DataTable headers={['Non-Compliance', 'Provision', 'Consequence']} rows={penaltyRows} dm={dm} />
          </div>

          {/* 10. Benefits of Professional Filing */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Professional Form 15CA-15CB Filing</h2>
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
                Have questions about Form 15CA-15CB filing for your foreign remittance? Let our experts help you figure out the right compliance approach.
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
          serviceName="Form 15CA-15CB Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
