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
  { id: 'what-is-return', label: 'What Is a Return' },
  { id: 'return-types', label: 'Types of Returns' },
  { id: 'due-dates', label: 'Due Dates' },
  { id: 'tds-sections', label: 'TDS Sections' },
  { id: 'process', label: 'Filing Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'certificates', label: 'TDS Certificates' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'penalties', label: 'Penalties' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Form 24Q - Salary TDS Returns',
  'Form 26Q - Non-Salary TDS Returns',
  'Form 27Q - NRI Payment TDS Returns',
  'Form 27EQ - TCS Statements',
  'TDS Certificate Generation (Form 16/16A)',
  'Correction Statements & Default Resolution',
];

const pricingInclusions = [
  'Free Consultation',
  'TDS Computation & Reconciliation',
  'Challan Verification & Matching',
  'Return Preparation (24Q/26Q/27Q/27EQ)',
  'FVU Validation',
  'TRACES Portal Upload',
  'Form 16/16A Generation',
  'Correction Statement Support',
  'Default Notice Resolution',
  'Dedicated Professional Assistance',
];

const overviewFacts: [string, string][] = [
  ['Governing Provision', 'Section 200(3) of the Income-tax Act, 1961, read with Rule 31A of the Income-tax Rules, 1962'],
  ['What It Is', 'A quarterly electronic statement linking the deductor\'s TAN with every deductee\'s PAN, the amount paid, and the tax deducted at source'],
  ['Filing Platform', 'TRACES (TDS Reconciliation Analysis and Correction Enabling System), fed by files prepared using the NSDL/Protean Return Preparation Utility (RPU)'],
  ['Who Must File', 'Any person or entity holding a TAN and liable to deduct tax at source — the obligation runs quarter to quarter, independent of whether every quarter actually saw a deduction'],
  ['Frequency', 'Quarterly for Forms 24Q, 26Q, 27Q and 27EQ, with Form 24Q carrying an additional annual Annexure II filed alongside the fourth quarter'],
  ['Downstream Impact', 'A correctly filed return populates the deductee\'s Form 26AS and Annual Information Statement (AIS) — the basis on which they claim TDS credit in their own income tax return'],
];

const returnTypeRows: string[][] = [
  ['Form 24Q', 'Salary payments to employees (Section 192)', 'Quarterly, with Annexure II (annual salary detail) filed along with Q4', 'Standard quarterly due dates'],
  ['Form 26Q', 'Non-salary payments to residents — interest, contractor payments, professional fees, rent, commission, and more', 'Quarterly', 'Standard quarterly due dates'],
  ['Form 27Q', 'Payments to non-residents and foreign companies', 'Quarterly', 'Standard quarterly due dates'],
  ['Form 27EQ', 'Tax Collected at Source (TCS)', 'Quarterly', 'Standard quarterly due dates'],
  ['Form 26QB', 'TDS on purchase of immovable property (Section 194-IA)', 'Per transaction', 'Within 30 days from the end of the month in which TDS was deducted'],
  ['Form 26QC', 'TDS on rent by an individual/HUF (Section 194-IB)', 'Per transaction', 'Within 30 days from the end of the month in which TDS was deducted'],
  ['Form 26QD', 'TDS on Section 194M payments — contractual, professional, or commission payments by individuals/HUF not liable to tax audit', 'Per transaction', 'Within 30 days from the end of the month in which TDS was deducted'],
];

const dueDateRows: string[][] = [
  ['Q1 (April – June)', '31 July'],
  ['Q2 (July – September)', '31 October'],
  ['Q3 (October – December)', '31 January'],
  ['Q4 (January – March)', '31 May'],
];

const tdsSectionRows: string[][] = [
  ['Section 192', 'Salary', 'At the employee\'s applicable slab rate for the year', 'No fixed threshold — applies once taxable salary exceeds the basic exemption limit'],
  ['Section 194A', 'Interest (other than on securities)', '10%', '₹40,000/year for bank/post office deposits (₹50,000 for senior citizens), ₹5,000/year otherwise'],
  ['Section 194C', 'Payments to contractors', '1% (individual/HUF payee) / 2% (other payees)', '₹30,000 per single payment, or ₹1,00,000 in aggregate for the financial year'],
  ['Section 194H', 'Commission or brokerage', '2% (reduced from 5%, effective 1 October 2024)', '₹20,000/year (raised from ₹15,000, effective 1 April 2025)'],
  ['Section 194-I', 'Rent', '2% (plant & machinery) / 10% (land, building, furniture & fittings)', '₹2,40,000/year'],
  ['Section 194J', 'Professional / technical fees', '2% (technical services, call centre operations, royalty for film distribution) / 10% (professional fees, other royalty)', '₹50,000/year per payee (raised from ₹30,000, effective 1 April 2025)'],
  ['Section 194Q', 'Purchase of goods', '0.1% on value exceeding ₹50 lakh', 'Buyer\'s turnover must have exceeded ₹10 crore in the preceding financial year'],
  ['Section 194R', 'Benefits or perquisites arising from business/profession', '10%', '₹20,000/year per recipient'],
  ['Section 194S', 'Transfer of Virtual Digital Assets (VDAs/crypto)', '1%', '₹50,000/year for specified persons, ₹10,000/year for others'],
  ['Section 195', 'Payments to non-residents and foreign companies', '10%–30% depending on the nature of income, or the applicable DTAA rate if lower', 'No general threshold — rate and applicability depend on the specific type of income being remitted'],
];

const processSteps = [
  { title: 'Collect Deductee Details & Verify PAN', desc: 'Gather the PAN of every deductee for the quarter and verify each one against official records, since an invalid or mismatched PAN is one of the most common reasons a return gets flagged as defective.' },
  { title: 'Deduct TDS at the Applicable Rate', desc: 'Apply the correct rate for the specific section governing the payment — salary, contractor, rent, professional fees, or another category — factoring in any lower deduction certificate the deductee may hold.' },
  { title: 'Deposit TDS via Challan 281', desc: 'Pay the deducted tax to the government using Challan 281 by the prescribed deposit deadline, since the return cannot be correctly prepared until every challan for the quarter has actually been paid.' },
  { title: 'Prepare the Return Using RPU', desc: 'Compile deductee-wise, challan-wise, and section-wise details into the applicable form using the NSDL/Protean Return Preparation Utility (RPU), the standard tool for building the return file.' },
  { title: 'Validate the File Using FVU', desc: 'Run the prepared file through the File Validation Utility (FVU), which checks the statement for structural and data errors before it can be accepted for upload.' },
  { title: 'Upload on the TRACES Portal with DSC', desc: 'Submit the validated file on the TRACES portal, authenticated using the deductor\'s Digital Signature Certificate (or other valid verification method), and retain the provisional receipt number generated on successful upload.' },
  { title: 'Generate & Issue TDS Certificates', desc: 'Once the return is processed, generate the relevant certificates — Form 16, 16A, 16B, or 16C — from TRACES and issue them to each deductee within the prescribed timeline.' },
];

const documentGroups = [
  { group: 'Deductor Details', items: ['TAN of the deducting entity', 'PAN of the deducting entity'] },
  { group: 'Deductee Details', items: ['PAN of every deductee for the quarter', 'Salary breakup and investment declarations, for Form 24Q'] },
  { group: 'Challan Details', items: ['BSR code, challan serial number, and date of deposit for every TDS payment made during the quarter'] },
  { group: 'Return Filing', items: ['Provisional receipt (token) number of the previous quarter\'s return', 'Digital Signature Certificate (DSC) for upload authentication'] },
  { group: 'Payment Records', items: ['Section-wise computation of TDS for every payment made during the quarter'] },
];

const certificateRows: string[][] = [
  ['Form 16', 'Salary (Section 192)', 'Annual', 'Due by 15 June following the end of the financial year'],
  ['Form 16A', 'Non-salary payments (sections reported via Form 26Q/27Q)', 'Quarterly', 'Within 15 days from the due date of filing the corresponding TDS return'],
  ['Form 16B', 'Property purchase (Section 194-IA)', 'Per transaction', 'Within 15 days from the due date of filing Form 26QB'],
  ['Form 16C', 'Rent (Section 194-IB)', 'Per transaction', 'Within 15 days from the due date of filing Form 26QC'],
];

const correctionTypes = [
  { title: 'C1 — Deductee Correction', desc: 'Corrects deductee-level details such as name or PAN, without touching the challan or the amount already reported.' },
  { title: 'C2 — Challan Correction', desc: 'Corrects details of a challan already reported in the return — BSR code, deposit date, or challan serial number.' },
  { title: 'C3 — Add New Challan/Deductee', desc: 'Adds an entirely new challan or deductee record to a return that has already been filed and processed.' },
  { title: 'C4 — PAN Update', desc: 'Updates the PAN linked to a specific deductee record across the return, commonly used where the original PAN was incorrect or has since changed.' },
  { title: 'C5 — Salary Detail Correction (Form 24Q)', desc: 'Adds or updates the salary breakup records specific to Annexure II of Form 24Q, relevant only to the annual salary statement filed with the Q4 return.' },
];

const penaltyRows: string[][] = [
  ['Late filing of TDS return', 'Section 234E', 'Fee of ₹200 per day of delay, capped at the total TDS/TCS amount for that return'],
  ['Incorrect or non-filing of TDS return', 'Section 271H', 'Penalty ranging from ₹10,000 to ₹1,00,000'],
  ['Non-deduction of TDS', 'Section 201(1A)', 'Interest at 1% per month or part thereof from the date tax was deductible to the date it is actually deducted'],
  ['TDS deducted but not deposited', 'Section 201(1A)', 'Interest at 1.5% per month or part thereof from the date of deduction to the date of actual deposit'],
  ['Business expenditure disallowance', 'Section 40(a)(ia)', '30% of the expenditure disallowed while computing business income, where TDS on a payment to a resident was not deducted or deposited'],
  ['Wilful failure to deduct or deposit TDS', 'Section 276B', 'Prosecution with rigorous imprisonment ranging from 3 months to 7 years, along with a fine'],
];

const benefitCards = [
  { title: 'Penalty Protection', desc: 'Correctly computed, on-time returns avoid the daily fee under Section 234E and the additional penalty exposure under Section 271H for incorrect or missed filings.' },
  { title: 'Accurate Form 26AS', desc: 'Precise deductee-wise reporting ensures every employee and vendor sees their TDS credit reflected correctly in Form 26AS and AIS, without the mismatches that trigger their own tax notices.' },
  { title: 'TDS Certificate Compliance', desc: 'Filing on time keeps Form 16, 16A, 16B, and 16C generation on schedule, so employees and vendors receive valid certificates in time for their own return filing.' },
  { title: 'Default Resolution', desc: 'Where TRACES flags a short deduction, short payment, or late deposit as a "default," prompt professional review helps identify the cause and resolve it before interest keeps compounding.' },
  { title: 'Correction Support', desc: 'Errors in a filed return — a wrong PAN, an unmatched challan, a missed deductee — can be fixed through the correct correction category without restarting the entire filing.' },
  { title: 'Quarterly Reminders', desc: 'A structured quarterly filing cadence, tracked well ahead of each due date, avoids the last-minute scramble that leads to data entry errors and missed deadlines.' },
];

const faqs = [
  { q: 'What is TDS return filing and who needs to file it?', a: 'TDS return filing is the quarterly electronic statement a TAN holder submits to report every tax deduction made during the quarter, along with the corresponding deductee PAN and challan details. Anyone holding a TAN and liable to deduct tax at source must file it, regardless of the deductor\'s own income level.' },
  { q: 'What are the different TDS return forms?', a: 'The main quarterly forms are Form 24Q (salary), Form 26Q (non-salary payments to residents), Form 27Q (payments to non-residents), and Form 27EQ (TCS), alongside the per-transaction forms Form 26QB (property purchase), Form 26QC (rent by individuals/HUF), and Form 26QD (Section 194M payments).' },
  { q: 'What are the due dates for TDS return filing?', a: 'Quarterly returns are due on 31 July for Q1 (April–June), 31 October for Q2 (July–September), 31 January for Q3 (October–December), and 31 May for Q4 (January–March).' },
  { q: 'What is the penalty for late filing of TDS returns?', a: 'Late filing attracts a fee of ₹200 per day under Section 234E, capped at the TDS/TCS amount involved, and can additionally invite a penalty of ₹10,000 to ₹1,00,000 under Section 271H for incorrect or non-filing beyond the prescribed period.' },
  { q: 'What is the difference between Form 24Q and Form 26Q?', a: 'Form 24Q reports TDS deducted on salary payments to employees under Section 192, while Form 26Q reports TDS on non-salary payments to residents — such as contractor payments, professional fees, rent, and interest — under the various other TDS sections.' },
  { q: 'How do I file a TDS return online?', a: 'The return is prepared offline using the Return Preparation Utility (RPU), validated using the File Validation Utility (FVU) to catch structural errors, and then uploaded on the TRACES portal along with the deductor\'s Digital Signature Certificate for authentication.' },
  { q: 'What is TRACES?', a: 'TRACES (TDS Reconciliation Analysis and Correction Enabling System) is the online portal where deductors file and correct TDS/TCS returns, download consolidated files for corrections, and generate TDS certificates like Form 16 and Form 16A.' },
  { q: 'What documents are required for TDS return filing?', a: 'Typical requirements include the deductor\'s TAN and PAN, PAN of every deductee, salary breakup details for Form 24Q, challan details (BSR code, serial number, deposit date) for every payment, and the provisional receipt number of the previous quarter\'s return.' },
  { q: 'What is Form 16?', a: 'Form 16 is the annual TDS certificate an employer issues to employees under Section 192, consolidating salary paid and tax deducted through the year; it must be issued by 15 June following the end of the financial year.' },
  { q: 'What is Form 16A?', a: 'Form 16A is the TDS certificate for non-salary payments — such as professional fees, rent, or contractor payments — issued quarterly within 15 days of the due date for filing the corresponding TDS return.' },
  { q: 'What is the correction/revision process for TDS returns?', a: 'A filed return is corrected — not entirely refiled — by downloading the latest consolidated file from TRACES and applying the relevant correction category (C1 through C5) for the specific field that needs updating, whether that\'s a deductee detail, a challan, or a new record.' },
  { q: 'What happens if TDS is deducted but not deposited?', a: 'Interest at 1.5% per month accrues under Section 201(1A) from the date of deduction to the date of actual deposit, and the deductor can be treated as an "assessee-in-default," with potential prosecution under Section 276B for wilful non-deposit.' },
  { q: 'How is the Section 234E late fee calculated?', a: 'The fee runs at ₹200 for every day the return remains unfiled after its due date, but the total fee for any single return is capped at the total TDS or TCS amount reported in that statement — it never exceeds the tax involved.' },
  { q: 'Is TAN mandatory for filing TDS returns?', a: 'Yes, every TDS/TCS return must be filed against a valid TAN — the return simply cannot be uploaded on TRACES without one, since TAN is the identifier the entire filing system is built around.' },
  { q: 'What is the difference between TDS and TCS?', a: 'TDS (Tax Deducted at Source) is withheld by the payer before crediting a payment such as salary, rent, or professional fees, while TCS (Tax Collected at Source) is added on and collected by the seller from the buyer on specified transactions — both are reported through their own dedicated return forms.' },
  { q: 'How does TDS return filing affect Form 26AS?', a: 'Once a return is processed successfully, the reported deductee-wise TDS entries flow into that deductee\'s Form 26AS and Annual Information Statement, which is what they rely on to claim TDS credit while filing their own income tax return.' },
  { q: 'Is a Digital Signature Certificate required for TDS return filing?', a: 'A DSC is commonly used to authenticate the upload on TRACES, particularly for company and larger deductors, though the exact verification method available can vary by deductor category and portal requirement at the time of filing.' },
  { q: 'What are the major TDS rates to remember?', a: 'Frequently applied rates include 10% on interest under Section 194A, 1%/2% on contractor payments under Section 194C, 2% on commission under Section 194H, 2%/10% on rent under Section 194-I, 2%/10% on professional and technical fees under Section 194J, and 0.1% on purchase of goods under Section 194Q.' },
  { q: 'How do I download TDS certificates from TRACES?', a: 'Once a return is processed and the certificate is available, it can be downloaded through the "Downloads" section of the TRACES portal by requesting the specific certificate (Form 16, 16A, 16B, or 16C) for the relevant financial year and quarter.' },
  { q: 'Is a nil TDS return required if no tax was deducted in a quarter?', a: 'Filing a nil statement isn\'t always mandatory by law, but where a deductor has an established filing history or expects transactions later in the year, declaring a nil statement or a valid "reason for non-filing" on TRACES avoids the portal treating the quarter as a default.' },
  { q: 'What is the RPU and FVU used for?', a: 'The Return Preparation Utility (RPU) is the tool used to compile deductee, challan, and section-wise data into the correct return format, while the File Validation Utility (FVU) checks that compiled file for structural and data errors before it is accepted for upload on TRACES.' },
  { q: 'Can a TDS return be revised multiple times?', a: 'Yes, there is no cap on the number of correction statements that can be filed against an original return — each correction simply needs to start from the most recently updated consolidated file to avoid conflicting with changes already processed.' },
  { q: 'What is Section 206AA and how does it affect TDS rates?', a: 'Section 206AA requires TDS to be deducted at a flat 20% wherever the deductee fails to furnish a valid PAN, overriding the section-specific rate if that rate would otherwise be lower — a separate, now-repealed provision (Section 206AB) previously imposed a similar higher rate on ITR non-filers, but that was omitted from the statute effective 1 April 2025.' },
  { q: 'How does ComplianceBharo assist with TDS return filing?', a: 'We handle TDS computation and reconciliation, challan verification, return preparation across all applicable forms, FVU validation, TRACES upload, Form 16/16A generation, and correction statement support if a default notice or reporting error surfaces afterward.' },
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

export default function TDSReturnClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="TDS Return Filing" />

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
                  Quarterly TDS/TCS Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">TDS Return Filing</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Quarterly TDS/TCS Return Filing - Form 24Q, 26Q, 27Q, 27EQ
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Reconciliation, FVU Validation &amp; TRACES Upload. Form 16/16A Generation. Starting at <span className="text-brand-orange">₹1,999</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
                    Reviewed by Industry Experts &amp; TDS Compliance Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"TDS Return Filing"} dm={isDarkMode} />
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
                TDS Return Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹1,999
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on reconciliation and correction needs
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is TDS Return Filing?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                TDS return filing is the quarterly compliance step that follows every TAN registration — a statement, required under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 200(3) of the Income-tax Act, 1961, read with Rule 31A</strong>, that reports the deductor's TAN against every deductee's PAN, the amount paid, the tax deducted, and the challan through which that tax was deposited.
              </p>
              <p>
                It's the mechanism that turns a tax deduction into a usable tax credit: without a correctly filed return, the amount withheld from a salary payment, a contractor invoice, or a rent payment never shows up in the deductee's <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 26AS</strong> or <strong className={dm ? 'text-white' : 'text-slate-900'}>Annual Information Statement (AIS)</strong> — which means they can't claim it while filing their own return, no matter how correctly the tax was actually deducted at source.
              </p>
              <p>
                The obligation to file runs with the TAN itself. Once an entity holds a TAN, it is expected to account for every quarter going forward — the filing isn't optional simply because a particular quarter happened to see no deductions.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. What Is a TDS Return */}
          <div id="what-is-return" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is a TDS Return, Exactly?</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A TDS return is filed on the <strong className={dm ? 'text-white' : 'text-slate-900'}>TRACES</strong> ecosystem — prepared offline, validated, and then uploaded to the government's TDS reconciliation system. Each return reports, line by line, every transaction the deductor made during the quarter: the deductee's PAN, the amount paid, the tax deducted, the specific section under which it was deducted, and the challan that tax was deposited against.
              </p>
              <p>
                Which form to file depends entirely on the nature of the payment, not on the deductor's business type. A company that pays salaries, rent, and contractor invoices in the same quarter will typically file <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 24Q</strong> for the salary portion and <strong className={dm ? 'text-white' : 'text-slate-900'}>Form 26Q</strong> for everything else — the two forms exist side by side precisely because salary TDS is computed against the employee's annual slab liability, while non-salary TDS is computed transaction by transaction under its own section-specific rate.
              </p>
            </div>
          </div>

          {/* 3. Types of Returns */}
          <div id="return-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Types of TDS/TCS Returns</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Seven distinct forms cover the full range of TDS and TCS reporting — four filed quarterly by regular TAN holders, and three filed per-transaction by individuals making one-off large payments.
            </p>
            <DataTable headers={['Form', 'Covers', 'Frequency', 'Due Date / Timeline']} rows={returnTypeRows} dm={dm} />
          </div>

          {/* 4. Due Dates */}
          <div id="due-dates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>TDS Return Due Dates</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Every quarterly form — 24Q, 26Q, 27Q, and 27EQ — shares the same filing calendar.
            </p>
            <DataTable headers={['Quarter', 'Return Due Date']} rows={dueDateRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *This is the return filing deadline, distinct from the TDS deposit deadline — tax deducted in a given month must be deposited by the <strong className={dm ? 'text-slate-300' : 'text-slate-700'}>7th of the following month</strong>, except for deductions made in March, which must be deposited by <strong className={dm ? 'text-slate-300' : 'text-slate-700'}>30 April</strong>.
            </p>
          </div>

          {/* 5. TDS Sections */}
          <div id="tds-sections" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>TDS Sections — Rates &amp; Thresholds</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              These are the sections that come up most often in day-to-day TDS compliance, each with its own rate and its own threshold below which no deduction is required.
            </p>
            <DataTable headers={['Section', 'Nature of Payment', 'Rate', 'Threshold']} rows={tdsSectionRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>PAN &amp; Non-Filer Overrides: </strong>
              Under <strong>Section 206AA</strong>, TDS applies at a flat <strong>20%</strong> wherever the deductee does not furnish a valid PAN, overriding the section-specific rate if that rate is lower. A related provision, <strong>Section 206AB</strong>, previously imposed a higher rate on deductees who hadn&apos;t filed their ITR for the preceding two years — this section has been <strong>omitted from the statute effective 1 April 2025</strong>, removing that additional compliance check for deductors.
            </div>
          </div>

          {/* 6. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>TDS Return Filing Process — Step by Step</h2>
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

          {/* 7. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for TDS Return Filing</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Most of this checklist is generated as part of the deduction and deposit process itself, rather than gathered separately at filing time.
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

          {/* 8. TDS Certificates */}
          <div id="certificates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>TDS Certificates</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Each certificate is generated from TRACES only after the corresponding return has been successfully processed — so a delayed return means a delayed certificate for the deductee too.
            </p>
            <DataTable headers={['Certificate', 'Covers', 'Frequency', 'Due Date']} rows={certificateRows} dm={dm} />
          </div>

          {/* 9. Corrections & Revised Returns */}
          <div id="corrections" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Corrections &amp; Revised Returns</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A filed TDS return is never simply refiled from scratch — errors are fixed through a specific correction category matched to what actually needs to change.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {correctionTypes.map((c) => (
                <div key={c.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{c.desc}</p>
                </div>
              ))}
            </div>
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Corrections can be filed an <strong className={dm ? 'text-white' : 'text-slate-900'}>unlimited number of times</strong>, either through TRACES&apos; online correction facility for simpler changes, or offline using the RPU/FVU workflow for more complex ones. Either way, every correction must start from the <strong className={dm ? 'text-white' : 'text-slate-900'}>latest consolidated (conso) file</strong> downloaded from TRACES, since starting from an outdated file risks overwriting a correction that was already processed.
            </p>
          </div>

          {/* 10. Penalties */}
          <div id="penalties" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Penalties for Non-Compliance</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              TDS return defaults tend to stack — a single late or incorrect filing can trigger a fee, a penalty, and interest simultaneously.
            </p>
            <DataTable headers={['Non-Compliance', 'Provision', 'Consequence']} rows={penaltyRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *The Section 271H penalty can be waived if the return is filed and the TDS, interest, and late fee are all paid within one year of the due date. The Section 234E late fee, however, is mandatory and cannot be waived regardless of the reason for the delay.
            </p>
          </div>

          {/* 11. Benefits of Professional Filing */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Professional TDS Return Filing</h2>
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
                Have questions about TDS return filing for your business? Let our experts help you figure out the right compliance approach.
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
          serviceName="TDS Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
