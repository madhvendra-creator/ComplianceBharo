'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import PopupForm from '../components/PopupForm';
import { submitLead } from '../actions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'documents', label: 'Documents' },
  { id: 'cost', label: 'Cost 2026' },
  { id: 'process', label: 'SPICe+ Process' },
  { id: 'tax', label: 'Tax Benefits' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'faq', label: "FAQ's" },
];

const plans = [
  {
    name: 'BASIC',
    price: 2499,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-8.5-5V6L12 1l8.5 5v10z" />
      </svg>
    ),
    textColor: 'text-slate-800 dark:text-white',
    buttonClass: 'bg-[#333333] hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600 text-white',
    features: [
      { name: 'Company name help', included: true },
      { name: 'SPICe+ form in 2–3 working days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'PF and ESIC registration', included: true },
      { name: 'Incorporation certificate in 10–12 days', included: true },
      { name: 'DSC preparation in 3–4 days', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'Expert assisted process', included: true },
      { name: 'INC 20A / Business commencement certificate', included: true },
      { name: 'MSME Registration', included: false },
      { name: 'Startup India Registration', included: false },
      { name: 'Digital signature certificate', included: false },
      { name: 'Company DSC', included: false },
      { name: 'Trademark Registration', included: false },
      { name: 'Pitch Deck', included: false },
    ],
  },
  {
    name: 'STANDARD',
    price: 4999,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    textColor: 'text-[#2B4B77] dark:text-blue-400',
    buttonClass: 'bg-[#2B4B77] hover:bg-[#1A3150] dark:bg-blue-600 dark:hover:bg-blue-500 text-white',
    features: [
      { name: 'Company name help', included: true },
      { name: 'SPICe+ form in 2–3 working days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'PF and ESIC registration', included: true },
      { name: 'Incorporation certificate in 10–12 days', included: true },
      { name: 'DSC preparation in 3–4 days', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'Expert assisted process', included: true },
      { name: 'INC 20A / Business commencement certificate', included: true },
      { name: 'MSME Registration', included: true },
      { name: 'Startup India Registration', included: true },
      { name: 'Digital signature certificate', included: false },
      { name: 'Company DSC', included: false },
      { name: 'Trademark Registration', included: false },
      { name: 'Pitch Deck', included: false },
    ],
  },
  {
    name: 'PREMIUM',
    price: 7999,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    textColor: 'text-[#F59E0B] dark:text-orange-400',
    buttonClass: 'bg-[#F59E0B] hover:bg-[#D97706] text-white',
    features: [
      { name: 'Company name help', included: true },
      { name: 'SPICe+ form in 2–3 working days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'PF and ESIC registration', included: true },
      { name: 'Incorporation certificate in 10–12 days', included: true },
      { name: 'DSC preparation in 3–4 days', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'Expert assisted process', included: true },
      { name: 'INC 20A / Business commencement certificate', included: true },
      { name: 'MSME Registration', included: true },
      { name: 'Startup India Registration', included: true },
      { name: 'Digital signature certificate', included: true },
      { name: 'Company DSC', included: true },
      { name: 'Trademark Registration', included: true },
      { name: 'Pitch Deck', included: true },
    ],
  },
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Companies Act, 2013 — definition under Section 2(68), liability under Section 2(22)(a), legal entity status under Section 9'],
  ['Regulator', 'Ministry of Corporate Affairs (MCA), through the jurisdictional Registrar of Companies (RoC)'],
  ['Primary Form', 'SPICe+ (INC-32), Part A & Part B, filed electronically on the MCA21 V3 portal'],
  ['Processing Time', '7–10 working days from submission of a complete, error-free application'],
  ['Min Directors', '2 (at least 1 must be a resident of India — present in India for 182+ days in the preceding calendar year)'],
  ['Max Shareholders', '200 (past or present employee-shareholders are excluded from this cap)'],
  ['Min Paid-up Capital', 'No statutory minimum — a company can be incorporated with as little as ₹1 in paid-up capital'],
  ['Govt Fee', 'Starts from ₹500 for MCA filing (varies by authorised capital slab), plus DSC, name reservation and stamp duty'],
  ['ComplianceBharo Professional Fee', '₹2,499 (all-inclusive drafting, filing and coordination support)'],
];

const benefits = [
  {
    title: 'Limited Liability Protection',
    ref: 'Section 2(22)(a)',
    desc: 'Shareholder liability is capped strictly to the unpaid value of shares they hold. Personal homes, savings and other assets stay untouched even if the company defaults on a debt or is wound up.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c3.5 2.1 6.5 2.8 8.25 2.8v6.2c0 5.3-3.6 8.9-8.25 10.5-4.65-1.6-8.25-5.2-8.25-10.5v-6.2c1.75 0 4.75-.7 8.25-2.8Z" />
      </svg>
    ),
  },
  {
    title: 'Distinct Legal Personality',
    ref: 'Section 9',
    desc: 'From the date on the Certificate of Incorporation, the company is a legal person in its own right — it can own property, enter contracts, sue and be sued independently of its directors or shareholders.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Perpetual Succession',
    ref: 'Continuity of existence',
    desc: 'The company\'s existence is unaffected by the death, resignation, or insolvency of any director or shareholder. Ownership transfers seamlessly by way of share transfer, without disturbing operations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12H3m18 0h-5.25" />
      </svg>
    ),
  },
  {
    title: 'Investor-Ready Equity Fundraising',
    ref: '90%+ of funded Indian startups are Pvt Ltd',
    desc: 'The share-based capital structure lets founders issue equity, preference shares, and convertible instruments — the format venture capital funds, angel investors and ESOP pools are built around.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: 'Concessional 22% Corporate Tax',
    ref: 'Section 115BAA · effective rate 25.17%',
    desc: 'Domestic companies can opt into a flat 22% tax rate (25.17% with surcharge and cess) by foregoing specified exemptions and incentives — often a substantial saving over the standard slab rates.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 4h6m-6 4h4M5 3h10l4 4v14H5V3Z" />
      </svg>
    ),
  },
  {
    title: 'DPIIT Startup Tax Holiday',
    ref: 'Section 80-IAC',
    desc: 'DPIIT-recognised startups incorporated as a Pvt Ltd can claim a 100% profit-linked income tax deduction for any 3 consecutive financial years out of their first ten years of incorporation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 15-3-3a22.35 22.35 0 0 1 7.13-13.13l1.87 1.87A22.35 22.35 0 0 1 12 15Zm-3-3H2.25s.5-4.5 5-5.25l1.75 1.75M12 15v6.75s4.5-.5 5.25-5l-1.75-1.75" />
      </svg>
    ),
  },
  {
    title: '100% FDI Under Automatic Route',
    ref: 'Consolidated FDI Policy, 2020',
    desc: 'Most sectors allow up to 100% foreign direct investment without prior RBI or government approval, making the Pvt Ltd structure the default entry vehicle for overseas founders and subsidiaries.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
      </svg>
    ),
  },
  {
    title: 'Credibility & Brand Trust',
    ref: 'CIN displayed on official records',
    desc: 'A registered CIN on letterheads, invoices and contracts signals regulatory legitimacy to banks, vendors, and enterprise customers, often making the difference in landing larger contracts.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const eligibilityRows: string[][] = [
  ['Minimum Directors', '2 natural persons (individuals only; a body corporate cannot be appointed as a director)'],
  ['Maximum Directors', '15 — can be increased beyond 15 by passing a special resolution'],
  ['Minimum Shareholders', '2 (subscribers to the Memorandum of Association)'],
  ['Maximum Shareholders', '200, excluding present or former employee-shareholders'],
  ['Minimum Age', '18 years, of sound mind, and not an undischarged insolvent'],
  ['DIN Requirement', 'Every proposed director must hold a valid Director Identification Number — allotted free of cost via SPICe+ for up to 5 first directors'],
  ['Indian Residency', 'At least one director must have stayed in India for a total of 182 days or more during the immediately preceding calendar year (Section 149(3))'],
  ['Foreign Directors', 'Permitted; passport and overseas address proof must be notarised and apostilled (Hague Convention countries) or consularised (non-Hague countries)'],
  ['NRI Directors / Shareholders', 'Permitted, subject to the same apostille/consularisation requirement for KYC documents and applicable sectoral FDI conditions on shareholding'],
];

const documentGroups = [
  {
    group: 'For Indian Directors',
    items: [
      'PAN card of every director and shareholder (mandatory identity proof)',
      'Aadhaar card for e-KYC and DSC verification',
      'Recent passport-size photograph with a plain white background',
      'Address proof — utility bill, bank statement, or passbook not older than 2 months',
    ],
  },
  {
    group: 'For NRI / Foreign Directors',
    items: [
      'Passport, notarised and apostilled if issued by a Hague Convention country (consularised otherwise)',
      'Overseas address proof — bank statement or utility bill, apostilled/consularised',
      'Class 3 Digital Signature Certificate issued to a foreign national, video-verified',
      'Certified English translation where original documents are in another language',
    ],
  },
  {
    group: 'For Registered Office',
    items: [
      'Rent/lease agreement or ownership deed in the company\'s registered office location',
      'Latest utility bill (electricity, water, or gas) not older than 2 months',
      'No Objection Certificate (NOC) from the property owner permitting business use',
    ],
  },
];

const costRows: string[][] = [
  ['MCA Filing Fee — up to ₹1,00,000 authorised capital', '₹500'],
  ['MCA Filing Fee — ₹1,00,001 to ₹5,00,000', '₹2,000'],
  ['MCA Filing Fee — ₹5,00,001 to ₹10,00,000', '₹2,000 + ₹200 for every ₹10,000 (or part) of additional capital'],
  ['MCA Filing Fee — above ₹10,00,000', 'Progressively higher slab rates as prescribed under the Companies (Registration Offices and Fees) Rules, 2014'],
  ['Name Reservation (SPICe+ Part A / RUN)', '₹1,000 per application attempt'],
  ['Stamp Duty on MoA, AoA, Form INC-33/34', '₹500 – ₹15,000 (state-specific, see table below)'],
  ['Digital Signature Certificate (DSC)', '₹1,500 – ₹2,500 per director, depending on validity and vendor'],
  ['Director Identification Number (DIN)', 'Free — auto-allotted via SPICe+ for up to 5 first directors'],
  ['PAN + TAN', '₹131 combined, auto-issued along with the Certificate of Incorporation'],
  ['GSTIN + EPFO + ESIC Registration', 'Free — bundled through the AGILE-PRO-S linked web form'],
  ['ComplianceBharo Professional Fee', '₹2,499 (drafting, filing, and end-to-end coordination)'],
];

const stampDutyRows: string[][] = [
  ['Andhra Pradesh', '₹1,000 – ₹5,000'],
  ['Delhi', '₹1,000 – ₹10,000'],
  ['Karnataka', '₹1,000 – ₹5,000'],
  ['Kerala', '₹3,000 – ₹8,000'],
  ['Maharashtra', '₹1,000 – ₹10,000'],
  ['Tamil Nadu', '₹1,000 – ₹5,000'],
  ['Telangana', '₹1,000 – ₹5,000'],
  ['Uttar Pradesh', '₹500 – ₹5,000'],
  ['West Bengal', '₹500 – ₹5,000'],
  ['Rajasthan', '₹1,000 – ₹5,000'],
  ['Madhya Pradesh', '₹2,500 – ₹7,500'],
];

const processSteps = [
  { title: 'Obtain Digital Signature Certificates (DSC)', desc: 'Every proposed director and subscriber gets a Class 3 DSC through video and Aadhaar-based e-KYC — this digital signature is used to sign every subsequent e-form.' },
  { title: 'Reserve the Company Name via SPICe+ Part A', desc: 'Propose up to 2 name options that comply with MCA naming guidelines and are checked against existing companies, LLPs and trademarks before reservation.' },
  { title: 'Draft the MoA (Form INC-33) & AoA (Form INC-34)', desc: 'The Memorandum of Association defines the company\'s objects and scope, while the Articles of Association lay down its internal governance rules — both are drafted in the standard e-form templates.' },
  { title: 'Fill SPICe+ Part B', desc: 'Capture registered office details, authorised and paid-up capital, subscriber and director particulars, and upload the supporting KYC documents in the integrated incorporation form.' },
  { title: 'File AGILE-PRO-S', desc: 'A linked web form that simultaneously applies for GSTIN (optional), EPFO, ESIC, a Shops & Establishment registration where applicable, and opens a current bank account.' },
  { title: 'Generate the INC-9 Declaration', desc: 'A system-generated declaration by all subscribers and first directors affirming they are not disqualified from being appointed, auto-created and digitally signed within the SPICe+ workflow.' },
  { title: 'Professional Certification', desc: 'A practising Chartered Accountant, Company Secretary, or Cost Accountant certifies that the forms and attached documents comply with the Companies Act, 2013 and applicable rules.' },
  { title: 'Pay Government Fees & Submit', desc: 'The consolidated SPICe+ bundle — MoA, AoA, AGILE-PRO-S, INC-9 — is submitted to the Central Registration Centre (CRC) along with the applicable MCA fee and stamp duty.' },
  { title: 'Receive the Certificate of Incorporation (CoI)', desc: 'Upon scrutiny, the RoC issues a digitally signed Certificate of Incorporation bearing the Corporate Identification Number (CIN), along with the company\'s PAN and TAN.' },
  { title: 'Post-Incorporation Compliance', desc: 'Deposit subscribed capital and file the Commencement of Business declaration (Form INC-20A) within 180 days, and appoint the company\'s first statutory auditor (Form ADT-1) within 30 days of incorporation.' },
];

const taxComparisonRows: string[][] = [
  ['Standard Domestic Company (no concessional regime)', '30% (25% if turnover ≤ ₹400 crore in the relevant prior year)', '~31.2% – 34.9% with surcharge & cess', 'No specific conditions; standard deductions and exemptions remain available'],
  ['Section 115BAA — Concessional Regime', '22%', '25.17%', 'Available to any domestic company that forgoes specified exemptions/incentives (e.g., additional depreciation, certain profit-linked deductions)'],
  ['Section 115BAB — New Manufacturing Companies', '15%', '17.16%', 'New domestic manufacturing company set up and registered on or after 1 Oct 2019, commencing production by the prescribed deadline, subject to conditions'],
  ['Section 80-IAC — DPIIT Startup Deduction', '0% (100% profit deduction)', 'Effectively nil on eligible profits for the chosen years', 'DPIIT-recognised startup; deduction available for any 3 consecutive years out of the first 10 years from incorporation'],
];

const complianceRows: string[][] = [
  ['Appoint First Statutory Auditor', 'Within 30 days of incorporation', 'ADT-1', 'Company and every officer in default liable to a monetary penalty under Section 139'],
  ['Open Company Bank Account', 'Within 30 days of incorporation (practically, before capital subscription)', '—', 'Delays capital deposit and, consequently, INC-20A filing'],
  ['File Commencement of Business Declaration', 'Within 180 days of incorporation', 'INC-20A', '₹50,000 penalty on the company + ₹1,000/day on every officer in default, up to ₹1,00,000; RoC may strike off the company for continued non-filing'],
  ['Issue Share Certificates', 'Within 60 days of incorporation', 'SH-1', 'Penalty on the company and officers in default under Section 46 of the Companies Act, 2013'],
  ['DIR-3 KYC (every director, annually)', 'On or before 30 September each year', 'DIR-3 KYC / web-based e-KYC', '₹5,000 late fee and deactivation of the DIN until KYC is completed'],
  ['File Financial Statements', 'Within 30 days of the Annual General Meeting', 'AOC-4', '₹100 per day of delay, without any upper cap'],
  ['File Annual Return', 'Within 60 days of the Annual General Meeting', 'MGT-7 / MGT-7A', '₹100 per day of delay, without any upper cap'],
  ['Hold First Annual General Meeting', 'Within 9 months from the end of the first financial year', '—', 'Penalty up to ₹1,00,000 on the company and every officer in default, with an additional ₹5,000 per day for continuing default'],
  ['File Income Tax Return', 'On or before 31 October (where a tax audit applies)', 'ITR-6', 'Late fee up to ₹5,000–₹10,000 under Section 234F, plus applicable interest on unpaid tax'],
];

const comparisonRows: string[][] = [
  ['Governing Law', 'Companies Act, 2013', 'Limited Liability Partnership Act, 2008', 'Companies Act, 2013', 'No dedicated statute — governed by general commercial law'],
  ['Minimum Members', '2 shareholders + 2 directors', '2 partners', '1 shareholder + 1 nominee + 1 director', '1 proprietor'],
  ['Maximum Members', '200 shareholders', 'No upper limit', '1 shareholder', '1 proprietor'],
  ['Liability', 'Limited to unpaid share value', 'Limited to agreed contribution', 'Limited to unpaid share value', 'Unlimited — extends to personal assets'],
  ['Separate Legal Entity', 'Yes (Section 9)', 'Yes', 'Yes', 'No'],
  ['Effective Tax Rate', '25.17% (Section 115BAA) or slab rate', '31.2% flat (plus surcharge/cess where applicable)', '25.17% (Section 115BAA) or slab rate', 'Individual slab rates (up to ~42.7% at the highest slab)'],
  ['Equity Fundraising', 'Straightforward — preferred by VCs and angel investors', 'Difficult — no share capital structure', 'Not permitted until conversion to Pvt Ltd', 'Not possible'],
  ['Approx. Annual Compliance Cost', 'Moderate to high (audit, ROC filings, AGM)', 'Low to moderate (audit only above prescribed turnover/contribution)', 'Moderate (similar to Pvt Ltd, fewer meeting requirements)', 'Low (mainly tax filings)'],
  ['FDI Route', '100% automatic route in most sectors', 'Automatic route, but with more sectoral restrictions', '100% automatic route in most sectors', 'Not permitted'],
  ['Conversion to Public Company', 'Direct route available', 'Must first convert to Pvt Ltd, then to Public', 'Mandatory conversion once paid-up capital/turnover thresholds are crossed', 'Must incorporate a fresh company'],
  ['Best Suited For', 'Startups and businesses planning to raise equity capital', 'Professional and service firms wanting operational flexibility', 'Solo founders wanting a corporate structure without a co-founder', 'Very small, low-risk businesses with a single owner'],
];

const faqs = [
  { q: 'What is a Private Limited Company?', a: 'A Private Limited Company is a business entity defined under Section 2(68) of the Companies Act, 2013. It restricts the transfer of its shares, caps its membership at 200, and cannot invite the public to subscribe to its securities, while still enjoying limited liability and a separate legal identity.' },
  { q: 'Is there a minimum capital requirement to register a Pvt Ltd company?', a: 'No. There is no statutory minimum paid-up capital — a company can legally be incorporated with as little as ₹1. Most founders still set a nominal authorised capital of around ₹1,00,000 for practical banking and credibility reasons.' },
  { q: 'How many directors are needed to register a Pvt Ltd company?', a: 'A minimum of 2 directors is required, and at least one of them must be a resident of India — present in the country for 182 days or more in the immediately preceding calendar year. The maximum permitted is 15 directors, extendable by a special resolution.' },
  { q: 'Can just 2 people register a Private Limited Company?', a: 'Yes. Two individuals can register a Pvt Ltd company by acting as both directors and shareholders simultaneously, satisfying the minimum requirement of 2 directors and 2 shareholders.' },
  { q: 'What is a CIN and why does it matter?', a: 'The Corporate Identification Number (CIN) is a unique 21-digit alphanumeric code issued by the Registrar of Companies on the Certificate of Incorporation. It identifies the company across all MCA records and must be quoted on invoices, letterheads, and official communication.' },
  { q: 'Is a physical registered office mandatory?', a: 'Yes. Every company must have a registered office in India capable of receiving statutory notices, verified using a rent/lease agreement or ownership deed, a recent utility bill, and a No Objection Certificate from the property owner. Virtual and co-working office addresses are permitted if properly documented.' },
  { q: 'What are the MoA and AoA?', a: 'The Memorandum of Association (MoA), filed as Form INC-33, defines the company\'s name, registered office, objects, and capital structure. The Articles of Association (AoA), filed as Form INC-34, lays down the internal rules governing management, meetings, and shareholder rights.' },
  { q: 'What is SPICe+ v3?', a: 'SPICe+ (Simplified Proforma for Incorporating a Company Electronically Plus) is the integrated incorporation form on the MCA21 V3 portal. It bundles name reservation (Part A), incorporation details (Part B), MoA, AoA, INC-9, PAN, TAN, and — via the linked AGILE-PRO-S form — GSTIN, EPFO, ESIC and bank account opening into a single filing.' },
  { q: 'Can NRIs or foreign nationals be directors in an Indian Pvt Ltd company?', a: 'Yes. NRIs and foreign nationals can be appointed as directors and hold shares, provided at least one director on the board is a resident Indian. Their KYC documents — typically a passport and overseas address proof — must be notarised and apostilled (or consularised, depending on the country of origin).' },
  { q: 'How long is the Certificate of Incorporation valid?', a: 'The Certificate of Incorporation does not expire. It remains valid for as long as the company exists and is not struck off, wound up, or dissolved by the Registrar of Companies.' },
  { q: 'What is Form INC-20A?', a: 'INC-20A is the declaration for Commencement of Business that a company must file within 180 days of incorporation, confirming that subscribed share capital has been deposited into the company\'s bank account. Companies cannot start business operations or borrow funds until this is filed.' },
  { q: 'What is a DIN?', a: 'A Director Identification Number (DIN) is a unique identification number allotted to an individual before they can be appointed as a director of any Indian company. For new companies, DINs for up to 5 first directors are allotted free of cost directly through the SPICe+ form.' },
  { q: 'What is the difference between authorised and paid-up capital?', a: 'Authorised capital is the maximum value of shares a company is permitted to issue as stated in its MoA, while paid-up capital is the actual amount shareholders have paid for the shares they hold. Paid-up capital can never exceed authorised capital, but authorised capital can be increased later by amending the MoA.' },
  { q: 'How long does Pvt Ltd registration take in 2026?', a: 'On the MCA21 V3 portal, a complete and error-free application typically takes 7–10 working days from document submission to receipt of the Certificate of Incorporation, factoring in DSC issuance, name approval, and RoC scrutiny.' },
  { q: 'Can the entire registration process be completed online?', a: 'Yes. Every step — DSC issuance, name reservation, drafting and filing of SPICe+, AGILE-PRO-S, and receipt of the digitally signed Certificate of Incorporation — is completed entirely online through the MCA21 V3 portal.' },
  { q: 'What is the total cost of registering a Pvt Ltd company?', a: 'Total cost depends on authorised capital, state of registration (for stamp duty), and the number of directors (for DSC), but typically ranges from roughly ₹6,000–₹12,000 in government and incidental charges, plus ComplianceBharo\'s professional fee of ₹2,499.' },
  { q: 'Is GST registration free when incorporating a company?', a: 'GST registration can be applied for at no separate government fee through the AGILE-PRO-S form bundled with SPICe+. However, GST registration is optional at the time of incorporation and can also be applied for separately later if not needed immediately.' },
  { q: 'Are there any hidden charges in Pvt Ltd registration?', a: 'ComplianceBharo\'s ₹2,499 professional fee is fixed and covers drafting and filing support. Government charges — MCA fee, stamp duty, and DSC cost — are statutory, vary by state and capital, and are disclosed upfront before filing; there are no undisclosed add-ons.' },
  { q: 'Should a startup choose a Pvt Ltd or an LLP?', a: 'Startups planning to raise equity funding from investors should choose a Pvt Ltd company, since LLPs cannot issue shares and are far less attractive to venture capital and angel investors. LLPs suit professional service firms that prioritise lower compliance costs over external fundraising.' },
  { q: 'How is a Pvt Ltd company different from an OPC?', a: 'An OPC (One Person Company) allows a single individual to incorporate a company with corporate structure benefits, but it cannot have more than one shareholder and must mandatorily convert into a Pvt Ltd company once it crosses prescribed paid-up capital or turnover thresholds. A Pvt Ltd company requires at least 2 shareholders from the outset and has no such conversion trigger.' },
  { q: 'Who is eligible for the Section 80-IAC tax holiday?', a: 'A company must be recognised as a "Startup" by the Department for Promotion of Industry and Internal Trade (DPIIT), be incorporated as a Pvt Ltd company or LLP, and be within 10 years of incorporation with turnover not exceeding the prescribed limit, to claim the 3-year profit-linked deduction under Section 80-IAC.' },
  { q: 'What are the annual compliance costs for a Pvt Ltd company?', a: 'Recurring annual compliance — statutory audit, AOC-4 and MGT-7 filing, DIR-3 KYC, income tax return, and board/AGM documentation — typically runs from a few thousand rupees for a dormant company to significantly more for an actively trading company with multiple transactions.' },
  { q: 'What is the corporate tax rate applicable to a Pvt Ltd company?', a: 'A domestic Pvt Ltd company can pay tax at the standard slab rate (25%–30% plus surcharge and cess) or opt for the concessional 22% rate under Section 115BAA (effective 25.17%), or 15% under Section 115BAB if it qualifies as a new manufacturing company (effective 17.16%).' },
  { q: 'Is FDI treated differently for a Pvt Ltd company versus an LLP?', a: 'Both structures permit 100% FDI under the automatic route in most sectors, but LLPs face additional conditions — FDI in an LLP is allowed only where 100% FDI is permitted under the automatic route with no performance-linked conditions, making the Pvt Ltd structure the more commonly used vehicle for foreign investment.' },
  { q: 'Can the registered office be a residential address?', a: 'Yes, a residential address can serve as the registered office provided the applicant furnishes valid ownership or rental proof, a recent utility bill, and a No Objection Certificate from the property owner permitting its use for business purposes.' },
  { q: 'What happens if INC-20A is not filed within 180 days?', a: 'Failure to file INC-20A within 180 days attracts a penalty of ₹50,000 on the company and ₹1,000 per day of default on every officer in default (up to ₹1,00,000), and the Registrar of Companies may initiate action to strike the company off the register for continued non-compliance.' },
  { q: 'Does a Pvt Ltd company need a Company Secretary from day one?', a: 'A whole-time Company Secretary is mandatory only once the company crosses prescribed paid-up capital thresholds under the Companies Act, 2013. Smaller companies can engage a practising CS on a retainer basis for annual filings without a full-time appointment.' },
  { q: 'Can a Pvt Ltd company be converted into an LLP or vice versa?', a: 'A Private Limited Company can convert into an LLP, and an LLP can convert into a Pvt Ltd company, each following a defined statutory procedure involving approvals, filings, and — for LLP-to-Pvt Ltd conversions — vesting of assets and liabilities into the new entity.' },
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

export default function PrivateLimitedClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Private Limited Company" />

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
                  5,000+ Companies Assisted | 250+ Incorporation Experts
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  Private Limited Company<br />
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Registration Online in India</span>
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Get Expert Assistance for Pvt Ltd Registration via SPICe+ v3 in <span className="font-bold text-brand-orange">7 Working Days</span> Starting at Just <span className="font-bold text-brand-orange">₹2,499</span>
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  100% Online MCA21 V3 Filing. DIN + DSC + PAN + TAN + GSTIN + EPFO + ESIC Included. ₹2,499 is ComplianceBharo professional fee for end-to-end assistance. Government fees charged separately at actuals.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {[
                      "Certificate of Incorporation (CoI) with CIN",
                      "MoA (INC-33) and AoA (INC-34) Drafting",
                      "Class 3 DSC for All Directors",
                      "Expert Professional Certification",
                      "Company PAN and TAN",
                      "DIN for up to 3 Directors via SPICe+",
                      "GSTIN + EPFO + ESIC via AGILE-PRO-S",
                      "Bank Account Opening Assistance"
                    ].map((feature, idx) => (
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
                    Reviewed by Industry Experts & Startup Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"Private Limited Company Registration"} dm={isDarkMode} />
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
              Simple & Transparent Pricing
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
                Private Limited Company Registration Package 2026
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
                {[
                  "Certificate of Incorporation (CoI) with CIN",
                  "Digital Signature Certificate (DSC) for Directors",
                  "EPFO + ESIC + Professional Tax Registration",
                  "GST Registration via AGILE-PRO-S",
                  "Director Identification Number (DIN)",
                  "MoA (INC-33) and AoA (INC-34) Drafting",
                  "Company PAN and TAN",
                  "Bank Account Opening Assistance",
                  "SPICe+ v3 Filing and Complete Documentation",
                  "Post-Incorporation Compliance Guidance"
                ].map((feature, idx) => (
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
                *Listed amounts are ComplianceBharo professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="flex gap-1 text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                </div>
                <span className={`text-sm font-semibold ${dm ? 'text-slate-300' : 'text-slate-700'}`}>4.9/5 based on 1000+ reviews</span>
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is Private Limited Company Registration?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A Private Limited Company is the entity type defined under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 2(68) of the Companies Act, 2013</strong>. By its Articles of Association, it restricts the transfer of its shares, caps its total membership at 200 shareholders, and is prohibited from inviting the general public to subscribe to its shares or debentures. In exchange for these restrictions, it unlocks limited liability, a separate legal identity, and access to institutional and venture capital in a way sole proprietorships and partnerships simply cannot.
              </p>
              <p>
                Registration is carried out entirely online through <strong className={dm ? 'text-white' : 'text-slate-900'}>SPICe+ (INC-32) on the MCA21 V3 portal</strong> — the Ministry of Corporate Affairs&apos; integrated incorporation form that bundles name reservation, incorporation particulars, the Memorandum and Articles of Association, PAN, TAN, and (via the linked AGILE-PRO-S form) GSTIN, EPFO, ESIC and bank account opening into a single filing. Once the Registrar of Companies is satisfied with the application, it issues a digitally signed <strong className={dm ? 'text-white' : 'text-slate-900'}>Certificate of Incorporation</strong> bearing a unique 21-digit <strong className={dm ? 'text-white' : 'text-slate-900'}>Corporate Identification Number (CIN)</strong> — the company&apos;s permanent identity across every MCA record thereafter.
              </p>
              <p>
                A Pvt Ltd company needs a minimum of 2 and a maximum of 200 shareholders, with liability capped strictly to the unpaid value of shares held by each member under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 2(22)(a)</strong>. Once incorporated, the company becomes a distinct legal person under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 9</strong> — capable of owning property, entering contracts, and suing or being sued in its own name, entirely independent of its directors and shareholders. This separation, combined with <strong className={dm ? 'text-white' : 'text-slate-900'}>perpetual succession</strong>, means the company&apos;s existence is unaffected by the death, resignation, or exit of any individual director or shareholder — ownership simply transfers by way of share transfer.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Benefits */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Registering a Private Limited Company</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className={`flex gap-3 items-start rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                    {b.icon}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                    <p className={`text-xs font-semibold mb-1.5 ${dm ? 'text-brand-orange/80' : 'text-orange-600'}`}>{b.ref}</p>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Register a Private Limited Company?</h2>
            <DataTable headers={['Parameter', 'Requirement']} rows={eligibilityRows} dm={dm} />
            <div className={`mt-6 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
              <strong>Section 164 Disqualification Warning: </strong>
              An individual is disqualified from being appointed or continuing as a director if they are of unsound mind, an undischarged insolvent, convicted of an offence involving moral turpitude with a sentence of 6 months or more, have not filed financial statements or annual returns for any continuous period of 3 financial years, or are otherwise disqualified by a court or tribunal order. Always verify director eligibility before filing SPICe+.
            </div>
          </div>

          {/* 4. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for Pvt Ltd Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The MCA verifies every incorporation application against a strict document checklist. Organise the following three categories before you begin filing.
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
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong className={dm ? 'text-slate-200' : 'text-slate-800'}>Tip:</strong> Scan every document in colour at a minimum of 300 DPI. Blurry, cropped, or black-and-white scans are among the most common reasons SPICe+ applications get sent back for resubmission, adding days to your timeline.
            </p>
          </div>

          {/* 5. Cost 2026 */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Private Limited Company Registration Cost in 2026</h2>
            <DataTable headers={['Cost Head', 'Approximate Amount']} rows={costRows} dm={dm} />

            <h3 className={`text-lg font-bold mt-8 mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>State-Wise Stamp Duty on Incorporation Documents</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Stamp duty on the MoA and AoA is levied under each state&apos;s own Stamp Act and depends on the authorised capital chosen. Indicative ranges for the most commonly registered states are below.
            </p>
            <DataTable headers={['State', 'Approx. Stamp Duty Range']} rows={stampDutyRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Indicative ranges for standard authorised capital slabs. Exact stamp duty depends on your state&apos;s Stamp Act, chosen authorised capital, and periodic rate revisions — we compute and disclose the precise amount applicable to your company before filing.
            </p>
          </div>

          {/* 6. SPICe+ Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>How to Register a Pvt Ltd Company Online (Step-by-Step)</h2>
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

          {/* 7. Tax Benefits */}
          <div id="tax" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Tax Benefits of a Private Limited Company</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A Pvt Ltd company can choose from three distinct tax regimes depending on its business profile. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 115BAA</strong>, any domestic company can opt for a flat 22% tax rate (an effective rate of <strong className={dm ? 'text-white' : 'text-slate-900'}>25.17%</strong> after surcharge and cess) by giving up specified exemptions and incentives such as additional depreciation. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 115BAB</strong>, new domestic manufacturing companies set up and registered on or after 1 October 2019, and commencing production within the prescribed timeline, can pay tax at just 15% (effective <strong className={dm ? 'text-white' : 'text-slate-900'}>17.16%</strong>).
              </p>
              <p>
                DPIIT-recognised startups get an additional layer of relief under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 80-IAC</strong> — a 100% profit-linked deduction for any 3 consecutive financial years out of their first 10 years of incorporation, effectively eliminating income tax on eligible profits during the chosen window. Separately, registering the company under the <strong className={dm ? 'text-white' : 'text-slate-900'}>Udyam (MSME)</strong> portal — available regardless of the tax regime chosen — opens up collateral-free loans, priority sector lending, delayed-payment protection under the MSME Development Act, and government tender preferences.
              </p>
            </div>
            <DataTable headers={['Regime', 'Nominal Rate', 'Effective Rate', 'Key Conditions']} rows={taxComparisonRows} dm={dm} />
          </div>

          {/* 8. Compliance */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Post-Registration Compliance for Pvt Ltd Company</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Incorporation is only the starting point — a Pvt Ltd company carries recurring statutory obligations from day one. Missing these deadlines invites daily penalties and, in serious cases, risk of the company being struck off.
            </p>
            <DataTable headers={['Compliance', 'Deadline', 'Form', 'Penalty for Default']} rows={complianceRows} dm={dm} />
          </div>

          {/* 9. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Pvt Ltd vs LLP vs OPC vs Sole Proprietorship</h2>
            <DataTable headers={['Parameter', 'Private Limited Company', 'LLP', 'OPC', 'Sole Proprietorship']} rows={comparisonRows} dm={dm} />
          </div>

          {/* 10. FAQs */}
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
                Have questions about Private Limited Company registration? Let our experts help you figure out the best plan for your business.
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
          serviceName="Private Limited Company"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
