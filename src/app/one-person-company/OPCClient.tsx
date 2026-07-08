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
  { id: 'process', label: 'Process' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'proscons', label: 'Pros & Cons' },
  { id: 'conversion', label: 'Conversion' },
  { id: 'faq', label: "FAQ's" },
];

const plans = [
  {
    name: 'Basic',
    price: 2299,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'Company name help', included: true },
      { name: 'DSC preparation in 3-4 days', included: true },
      { name: 'SPICe+ form in 3-4 working days', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'Incorporation certificate in 10-12 days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'PF and ESIC', included: true },
      { name: 'Business commencement certificate', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'MSME registration', included: false },
      { name: 'Pitch Deck', included: false },
      { name: 'Startup India registration', included: false },
      { name: 'TM (Trademark) registration', included: false },
    ],
  },
  {
    name: 'Standard',
    price: 4999,
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.42 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.42 0Z"></path></svg>
    ),
    popular: true,
    features: [
      { name: 'Company name help', included: true },
      { name: 'DSC preparation in 3-4 days', included: true },
      { name: 'SPICe+ form in 3-4 working days', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'Incorporation certificate in 10-12 days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'PF and ESIC', included: true },
      { name: 'Business commencement certificate', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'MSME registration', included: true },
      { name: 'Startup India registration', included: true },
      { name: 'Pitch Deck', included: false },
      { name: 'TM (Trademark) registration', included: false },
    ],
  },
  {
    name: 'Premium',
    price: 6999,
    iconColor: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'Company name help', included: true },
      { name: 'DSC preparation in 3-4 days', included: true },
      { name: 'SPICe+ form in 3-4 working days', included: true },
      { name: 'MOA + AOA', included: true },
      { name: 'Incorporation certificate in 10-12 days', included: true },
      { name: 'Company PAN + TAN', included: true },
      { name: 'DIN for directors', included: true },
      { name: 'PF and ESIC', included: true },
      { name: 'Business commencement certificate', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'MSME registration', included: true },
      { name: 'Startup India registration', included: true },
      { name: 'Pitch Deck', included: true },
      { name: 'TM (Trademark) registration', included: true },
    ],
  },
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Companies Act, 2013 — defined under Section 2(62)'],
  ['Regulator', 'Ministry of Corporate Affairs (MCA), through the jurisdictional Registrar of Companies (RoC)'],
  ['Form', 'SPICe+ (INC-32), Part A & Part B, filed electronically on the MCA21 V3 portal'],
  ['Processing Time', '7–10 working days from submission of a complete, error-free application'],
  ['Government Fee', 'Nil for authorised capital up to ₹15,00,000 (fee waiver under the MCA fee schedule); applicable slab fee beyond this threshold'],
  ['Min Capital', 'No statutory minimum — removed by the Companies (Amendment) Act, 2015'],
  ['Members', '1 member + 1 nominee (nominee consent filed via Form INC-3)'],
  ['Directors', 'Minimum 1 (the sole member can also be the sole director), maximum 15'],
];

const benefits = [
  {
    title: 'Limited Liability',
    ref: 'Section 2(62) read with Section 2(22)(a)',
    desc: 'The sole member\'s exposure is capped strictly to the unpaid value of their shares. Personal assets stay untouched even if the OPC runs into debt or is wound up.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c3.5 2.1 6.5 2.8 8.25 2.8v6.2c0 5.3-3.6 8.9-8.25 10.5-4.65-1.6-8.25-5.2-8.25-10.5v-6.2c1.75 0 4.75-.7 8.25-2.8Z" />
      </svg>
    ),
  },
  {
    title: '100% Ownership & Control',
    ref: 'Single-member structure',
    desc: 'Unlike a Pvt Ltd company, an OPC requires no co-founder or second shareholder — every decision, every share, and every rupee of profit belongs entirely to one person.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    title: 'Separate Legal Entity',
    ref: 'General company law principle',
    desc: 'From the date on the Certificate of Incorporation, the OPC is a legal person distinct from its member — capable of owning assets, entering contracts, and being sued in its own name.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Perpetual Succession via Nominee',
    ref: 'Form INC-3',
    desc: 'A nominee, appointed at incorporation with written consent, automatically steps in as the new sole member if the original member dies or becomes incapacitated — the business never lapses.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12H3m18 0h-5.25" />
      </svg>
    ),
  },
  {
    title: 'Easier Bank Credit',
    ref: 'Corporate credit profile',
    desc: 'Banks and NBFCs generally extend working capital and term loans more readily to a registered company with audited financials than to an unregistered sole proprietorship.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 8.25v10.5A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V8.25M2.25 8.25 12 3l9.75 5.25" />
      </svg>
    ),
  },
  {
    title: 'Government Tender Eligibility',
    ref: 'Corporate registration status',
    desc: 'Many government and PSU tenders require a registered company structure. An OPC\'s CIN and audited financials meet this bar in a way a proprietorship typically cannot.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Lower Tax Rate vs Individual Slab',
    ref: 'Section 115BAA · 22% (effective 25.17%) vs up to 30%+ for individuals',
    desc: 'An OPC can opt for the concessional 22% corporate tax rate under Section 115BAA, often working out cheaper than the individual slab rate (up to 30% plus surcharge and cess) a proprietor would otherwise pay.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 4h6m-6 4h4M5 3h10l4 4v14H5V3Z" />
      </svg>
    ),
  },
  {
    title: 'Exemption from Mandatory AGM',
    ref: 'Section 96(1), proviso',
    desc: 'An OPC is exempt from holding an Annual General Meeting, cutting down on procedural formality that a Pvt Ltd company with multiple shareholders must otherwise observe every year.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
];

const eligibilityRows: string[][] = [
  ['Citizenship', 'Only an Indian citizen can be the sole member or nominee of an OPC under Rule 3 of the Companies (Incorporation) Rules, 2014'],
  ['NRI Residency (post-2021 amendment)', 'A person must have stayed in India for at least 120 days during the immediately preceding financial year to be eligible — reduced from the earlier 182-day requirement, and now extended to NRIs as well'],
  ['Minimum Age', '18 years, of sound mind, and not disqualified from being a director under the Companies Act, 2013'],
  ['Member Limit', 'Exactly 1 member, along with 1 nominee whose written consent is filed via Form INC-3 at the time of incorporation'],
  ['Maximum OPCs Per Person', 'A person can be the sole member of only one OPC at a time, and cannot simultaneously be a nominee in more than one OPC'],
  ['Excluded Business Activities', 'An OPC cannot carry on Non-Banking Financial Investment activities, including investment in securities of any body corporate, and cannot be incorporated as or converted into a Section 8 (non-profit) company'],
  ['Foreign Nationals', 'Not eligible to be a member or nominee of an OPC — this structure remains restricted to Indian citizens only'],
];

const documentGroups = [
  {
    group: 'Director / Member',
    items: [
      'PAN card of the sole member (mandatory identity proof)',
      'Aadhaar card for e-KYC and DSC verification',
      'Recent passport-size photograph with a plain white background',
      'Address proof — utility bill, bank statement, or passbook not older than 2 months',
      'Passport, only where the member qualifies as an eligible NRI under the residency rule',
    ],
  },
  {
    group: 'Nominee',
    items: [
      'PAN card of the nominee',
      'Aadhaar card of the nominee for identity verification',
      'Signed Form INC-3 recording the nominee\'s written consent to act in that capacity',
    ],
  },
  {
    group: 'Registered Office',
    items: [
      'Latest utility bill (electricity, water, or gas) not older than 2 months',
      'No Objection Certificate (NOC) from the property owner permitting business use',
      'Rent/lease agreement or ownership deed for the registered office premises',
    ],
  },
];

const costRows: string[][] = [
  ['MCA SPICe+ Filing Fee — authorised capital up to ₹15,00,000', '₹0 (fee waiver under the MCA fee schedule)'],
  ['MCA SPICe+ Filing Fee — above ₹15,00,000', 'Applicable slab fee under the Companies (Registration Offices and Fees) Rules, 2014'],
  ['Name Reservation (optional, if reserved separately before SPICe+)', '₹1,000 per application'],
  ['Digital Signature Certificate (DSC)', '₹1,500 – ₹2,500 per person — required for both the director and the nominee'],
  ['Stamp Duty on MoA, AoA & Incorporation Documents', '₹300 – ₹3,000 (state-specific, see table below)'],
  ['ComplianceBharo Professional Fee', '₹2,299 (drafting, filing, and end-to-end coordination)'],
];

const stampDutyRows: string[][] = [
  ['Delhi', '₹300 – ₹2,000'],
  ['Maharashtra', '₹500 – ₹3,000'],
  ['Karnataka', '₹500 – ₹2,000'],
  ['Tamil Nadu', '₹300 – ₹1,500'],
  ['Gujarat', '₹500 – ₹2,500'],
  ['Uttar Pradesh', '₹300 – ₹1,500'],
  ['West Bengal', '₹300 – ₹1,500'],
];

const processSteps = [
  { title: 'Obtain DSC for the Director & Nominee', desc: 'Both the proposed sole director and the nominee obtain a Class 3 Digital Signature Certificate through video and Aadhaar-based e-KYC, needed to sign the incorporation forms.' },
  { title: 'Reserve the Company Name (SPICe+ Part A)', desc: 'Propose a name that complies with MCA naming conventions — every OPC name must end with "(OPC) Private Limited" as required under the Companies Act, 2013.' },
  { title: 'Prepare MoA, AoA, Form INC-3 & Form INC-9', desc: 'Draft the Memorandum and Articles of Association reflecting the company\'s objects, along with the nominee\'s written consent (INC-3) and the subscribers\' declaration (INC-9).' },
  { title: 'File SPICe+ Part B', desc: 'Submit the incorporation details — registered office, capital structure, member and nominee particulars — along with the supporting KYC documents in the integrated web form.' },
  { title: 'File AGILE-PRO-S', desc: 'A linked web form that simultaneously applies for GSTIN (optional), EPFO, and ESIC registrations, and initiates the company\'s current bank account opening.' },
  { title: 'Professional Certification', desc: 'A practising Chartered Accountant, Company Secretary, or Cost Accountant certifies that the incorporation forms and attached documents comply with the Companies Act, 2013.' },
  { title: 'Receive the Certificate of Incorporation', desc: 'Once the RoC is satisfied, it issues a digitally signed Certificate of Incorporation bearing the CIN, along with the company\'s PAN and TAN. The OPC must then file Form INC-20A (Commencement of Business) within 180 days of incorporation before it can start operations.' },
];

const comparisonRows: string[][] = [
  ['Governing Law', 'Companies Act, 2013', 'Companies Act, 2013', 'LLP Act, 2008', 'No dedicated statute'],
  ['Minimum Members', '1 member + 1 nominee', '2 shareholders', '2 partners', '1 proprietor'],
  ['Maximum Members', '1 (single-member structure)', '200 shareholders', 'No upper limit', '1 proprietor'],
  ['Minimum Directors', '1 (can be the sole member)', '2', '2 designated partners', 'Not applicable'],
  ['Separate Legal Entity', 'Yes', 'Yes (Section 9)', 'Yes', 'No'],
  ['Liability', 'Limited to unpaid share value', 'Limited to unpaid share value', 'Limited to agreed contribution', 'Unlimited — extends to personal assets'],
  ['Statutory Audit', 'Mandatory regardless of turnover (Section 139)', 'Mandatory regardless of turnover', 'Only if turnover > ₹40L or contribution > ₹25L', 'Only if turnover exceeds prescribed limits (tax audit)'],
  ['Tax Rate', '22% under Section 115BAA (effective 25.17%) or slab rate', '22%–30% depending on regime opted', 'Flat 30% plus applicable surcharge and cess', 'Individual slab rates (up to ~42.7% at the highest slab)'],
  ['Foreign Investment', 'Not permitted — restricted to Indian citizens', '100% automatic route in most sectors', 'Automatic route, sectors with no performance conditions only', 'Not permitted'],
  ['Annual ROC Filings', 'AOC-4 and MGT-7A', 'AOC-4 and MGT-7', 'Form 8 and Form 11', 'None (only tax filings)'],
  ['Perpetual Succession', 'Yes, via the appointed nominee', 'Yes', 'Yes', 'No — ends with the proprietor'],
  ['Best Suited For', 'Solo founders wanting a corporate structure without a co-founder', 'Startups planning to raise equity capital', 'Professional and service firms wanting operational flexibility', 'Very small, low-risk businesses with a single owner'],
];

const complianceRows: string[][] = [
  ['File Commencement of Business Declaration', 'Within 180 days of incorporation', 'INC-20A', '₹50,000 penalty on the company + ₹1,000 per day on every officer in default'],
  ['Appoint First Statutory Auditor', 'Within 30 days of incorporation', 'ADT-1', 'Company and officers in default liable to a monetary penalty under Section 139'],
  ['File Financial Statements', 'Within 180 days from the end of the financial year', 'AOC-4', '₹100 per day of delay, without any upper cap'],
  ['File Annual Return', 'Within 60 days from the date the AGM should have been held (deemed date for OPCs)', 'MGT-7A (simplified return, not full MGT-7)', '₹100 per day of delay, without any upper cap'],
  ['DIR-3 KYC (director, annually)', 'On or before 30 September each year', 'DIR-3 KYC / web-based e-KYC', '₹5,000 reactivation fee and deactivation of the DIN until completed'],
  ['Board Meetings', 'Minimum 2 per calendar year, with a gap of at least 90 days between meetings (where the OPC has more than one director)', '—', 'Penalty on officers in default under Section 173'],
  ['Income Tax Return', 'On or before 31 October where a tax audit applies', 'ITR-6', 'Late fee under Section 234F, plus interest on any unpaid tax'],
];

const advantagesList = [
  'Limited liability protects the sole member\'s personal assets',
  '100% ownership and decision-making control, with no co-founder required',
  'Access to the concessional 22% corporate tax rate under Section 115BAA',
  'Separate legal entity status distinct from the individual member',
  'Perpetual succession secured through a legally appointed nominee',
  'Exemption from the requirement to hold an Annual General Meeting',
  'No minimum capital requirement to get started',
  'Eligible to bid for government and PSU tenders that require a registered company',
];

const limitationsRows: string[][] = [
  ['Higher compliance than a proprietorship', 'Mandatory statutory audit, ROC filings, and DIN/DSC maintenance apply regardless of business size', 'Budget for a modest annual compliance retainer — still lighter than a multi-shareholder Pvt Ltd company'],
  ['No foreign investment permitted', 'FDI cannot flow into an OPC since membership is restricted to Indian citizens', 'Convert to a Private Limited Company via Form INC-6 before onboarding any foreign investor'],
  ['NBFI activities are prohibited', 'An OPC cannot invest in securities of other body corporates or carry on non-banking financial activities', 'Structure such activities under a Private Limited Company or an NBFC-specific entity instead'],
  ['Single member only', 'An OPC cannot add a second shareholder while it remains an OPC, limiting co-founder equity structures', 'Convert to a Private Limited Company via Form INC-6 once a co-founder needs to be brought on board'],
  ['No direct venture capital funding', 'VCs and angel investors typically require a share-based cap table with multiple shareholders and instruments like CCPS/ESOPs', 'Convert to a Private Limited Company via Form INC-6 ahead of a fundraising round'],
];

const conversionReasons = [
  'Bringing in a co-founder or additional shareholders to share equity and decision-making',
  'Raising a funding round from venture capital or angel investors who require a multi-shareholder cap table',
  'Accepting foreign direct investment, which is not permitted in an OPC structure',
  'Issuing Employee Stock Option Plans (ESOPs) to attract and retain talent',
];

const faqs = [
  { q: 'What is a One Person Company (OPC)?', a: 'A One Person Company is a company structure defined under Section 2(62) of the Companies Act, 2013, that allows a single individual to be the sole member while still enjoying limited liability and a separate legal identity, with a mandatory nominee ensuring the business continues if the member is unable to run it.' },
  { q: 'Who is eligible to register an OPC?', a: 'Only a natural person who is an Indian citizen can be the sole member or nominee of an OPC. Following the 2021 amendment, NRIs who have stayed in India for at least 120 days in the preceding financial year are also eligible.' },
  { q: 'Can NRIs or foreign nationals register an OPC?', a: 'NRIs can register an OPC if they satisfy the 120-day residency condition in the preceding financial year. Foreign nationals, however, are not eligible to be a member or nominee of an OPC under current rules.' },
  { q: 'What is the role of the nominee in an OPC?', a: 'The nominee, whose consent is recorded in Form INC-3 at incorporation, automatically becomes the new sole member if the original member dies or becomes incapacitated, ensuring the company\'s perpetual succession without interruption.' },
  { q: 'Can one person be the member of multiple OPCs?', a: 'No. A person can be the sole member of only one OPC at a time and cannot simultaneously act as a nominee in more than one OPC.' },
  { q: 'Can a minor be a member or nominee of an OPC?', a: 'No. Only an individual who is 18 years or older, of sound mind, and not otherwise disqualified under the Companies Act can be a member or nominee of an OPC.' },
  { q: 'Is there a minimum capital requirement for an OPC?', a: 'No. The minimum capital requirement was removed by the Companies (Amendment) Act, 2015. An OPC can be incorporated with any nominal amount of capital.' },
  { q: 'What is the maximum number of directors an OPC can have?', a: 'An OPC must have at least 1 director — who can also be the sole member — and can have up to 15 directors on its board, even though it has only one shareholder.' },
  { q: 'What business activities are excluded for an OPC?', a: 'An OPC cannot carry on Non-Banking Financial Investment activities, including investing in the securities of other body corporates, and cannot be incorporated as or converted into a Section 8 non-profit company.' },
  { q: 'What happens if the sole member of an OPC dies?', a: 'The nominee named in Form INC-3 automatically becomes the new member of the OPC. The nominee, or the new member, must then intimate the change to the RoC and, if desired, appoint a fresh nominee.' },
  { q: 'Can the nominee of an OPC be changed?', a: 'Yes. The sole member can change the nominee at any time by giving notice in the prescribed form, obtaining the new nominee\'s written consent, and filing the change with the Registrar of Companies.' },
  { q: 'What is the total cost of registering an OPC?', a: 'Total cost typically includes the MCA SPICe+ fee (often nil for capital up to ₹15 lakh), DSC charges for both the director and nominee, applicable stamp duty, and ComplianceBharo\'s professional fee of ₹2,299 — usually working out to a few thousand rupees in total.' },
  { q: 'What is the government fee for OPC registration?', a: 'The SPICe+ filing fee is waived (₹0) for OPCs with authorised capital up to ₹15,00,000. Beyond this threshold, the applicable slab fee under the MCA fee schedule applies.' },
  { q: 'Does stamp duty apply to OPC registration?', a: 'Yes. Stamp duty on the Memorandum and Articles of Association is levied under each state\'s Stamp Act and typically ranges from ₹300 to ₹3,000 depending on the state and authorised capital.' },
  { q: 'How much does a Digital Signature Certificate cost for OPC registration?', a: 'A Class 3 DSC typically costs ₹1,500 to ₹2,500 per person. Since both the director and the nominee require their own DSC, budget for two certificates during incorporation.' },
  { q: 'Are there any hidden charges in OPC registration?', a: 'ComplianceBharo\'s ₹2,299 professional fee is fixed and covers drafting and filing support. Government charges — MCA fee (if applicable), DSC cost, and stamp duty — are statutory and disclosed upfront before filing.' },
  { q: 'How is an OPC taxed?', a: 'An OPC is taxed as a company — it can opt for the standard slab rate or the concessional 22% rate under Section 115BAA (effective 25.17% with surcharge and cess), often more favourable than the individual slab rate a sole proprietor would pay.' },
  { q: 'Is statutory audit mandatory for an OPC?', a: 'Yes. Since an OPC is a registered company under the Companies Act, 2013, a statutory audit by a Chartered Accountant is mandatory every year under Section 139, regardless of turnover.' },
  { q: 'What is the difference between SPICe+ Part A and Part B?', a: 'SPICe+ Part A is used solely to reserve the proposed company name, while Part B captures the full incorporation details — registered office, capital structure, member/nominee particulars, and PAN/TAN — and can be filed together with or after Part A approval.' },
  { q: 'What is the purpose of the AGILE-PRO-S form?', a: 'AGILE-PRO-S is a linked web form filed alongside SPICe+ that simultaneously applies for GSTIN (optional), EPFO, and ESIC registrations, and initiates the process of opening the company\'s current bank account.' },
  { q: 'What documents are needed to register an OPC?', a: 'PAN, Aadhaar, a photograph, and address proof for the director; PAN, Aadhaar, and a signed Form INC-3 for the nominee; and a recent utility bill, NOC, and rent/ownership proof for the registered office.' },
  { q: 'How long does OPC registration take?', a: 'A complete, error-free application typically takes 7–10 working days from document submission to receipt of the Certificate of Incorporation, factoring in DSC issuance, name approval, and RoC scrutiny.' },
  { q: 'When are PAN and TAN issued for an OPC?', a: 'PAN and TAN are issued automatically along with the Certificate of Incorporation, since SPICe+ integrates both applications directly into the incorporation filing.' },
  { q: 'How is an OPC different from a Private Limited Company?', a: 'An OPC has exactly one member and is exempt from holding an AGM, while a Pvt Ltd company needs a minimum of 2 shareholders, permits external equity fundraising and FDI, and must hold an AGM — options an OPC does not have until it converts.' },
  { q: 'How is an OPC different from a Sole Proprietorship?', a: 'An OPC is a registered company with limited liability and a separate legal identity, while a sole proprietorship has no separate legal status and exposes the proprietor to unlimited personal liability for business debts.' },
  { q: 'How is an OPC different from an LLP?', a: 'An OPC has a single shareholder and a share capital structure taxed as a company, while an LLP requires a minimum of 2 partners, has no share capital, and is taxed at a flat 30% with no access to concessional corporate tax rates.' },
  { q: 'Can an OPC convert into a Private Limited Company?', a: 'Yes. An OPC can voluntarily convert into a Private Limited Company at any time by filing Form INC-6 — the earlier mandatory conversion thresholds based on paid-up capital and turnover were removed by the Companies (Incorporation) Second Amendment Rules, 2021.' },
  { q: 'What is the penalty for not filing INC-20A on time?', a: 'Failure to file INC-20A within 180 days of incorporation attracts a penalty of ₹50,000 on the company and ₹1,000 per day of default on every officer in default, and the RoC may initiate action to strike the company off for continued non-compliance.' },
  { q: 'Can an OPC accept foreign investment?', a: 'No. Since OPC membership is restricted to Indian citizens, foreign direct investment cannot be made into an OPC. A business needing FDI should incorporate as, or convert into, a Private Limited Company instead.' },
  { q: 'What annual returns does an OPC need to file?', a: 'An OPC files Form AOC-4 for its financial statements within 180 days from the financial year end, and the simplified Form MGT-7A as its annual return, in addition to its yearly income tax return.' },
  { q: 'Can an existing sole proprietorship be converted into an OPC?', a: 'A sole proprietorship does not "convert" in the legal sense — instead, a fresh OPC is incorporated, and the proprietorship\'s assets, contracts, and liabilities are transferred into the new company through appropriate agreements and regulatory filings.' },
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

export default function OPCClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="One Person Company" />

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
                  10,000+ Businesses Assisted | Expert-Assisted SPICe+ Filing
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  One Person Company (OPC) <br />
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Registration Online in India</span>
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Get Expert Assistance for OPC Registration in Just <span className="font-bold text-brand-orange">7 to 10 Days</span> with Expert Support @ <span className="font-bold text-brand-orange">₹1,999</span> Professional Fee
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Single Ownership. Limited Liability. No Minimum Capital. Certificate of Incorporation with PAN and TAN. ₹1,999 is ComplianceBharo professional fee for end-to-end assistance. Government fees charged separately at actuals.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {[
                      "Certificate of Incorporation with CIN",
                      "Company PAN and TAN (auto-generated)",
                      "e-MoA (INC-33) and e-AoA (INC-34) Drafting",
                      "DSC for Director and Nominee",
                      "Nominee Consent (Form INC-3) Preparation",
                      "GSTIN, EPFO, ESIC via AGILE-PRO-S"
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
              <LeadForm serviceName={"One Person Company Registration"} dm={isDarkMode} />
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
                One Person Company (OPC) Registration Package
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
                  "Certificate of Incorporation with CIN",
                  "Digital Signature Certificate (DSC)",
                  "Director Identification Number (DIN)",
                  "Nominee Documentation (INC-3)",
                  "e-MoA and e-AoA Drafting",
                  "AGILE-PRO-S Filing (GST, EPFO, ESIC)",
                  "Company PAN and TAN",
                  "Bank Account Opening Assistance",
                  "Compliance Calendar Setup",
                  "Post-Incorporation Support"
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
            <div className={`mt-8 py-6 border-t flex flex-wrap justify-center gap-6 sm:gap-8 text-sm font-semibold mx-8 ${dm ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is a One Person Company (OPC)?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A One Person Company is a company structure defined under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 2(62) of the Companies Act, 2013</strong>, that lets a single individual own and run a registered company entirely on their own. It bridges the gap between an unregistered sole proprietorship and a multi-shareholder Private Limited Company — giving a solo founder the credibility and limited liability of a corporate structure without needing a second person to hold shares.
              </p>
              <p>
                Because there is only one member, the law requires every OPC to appoint a <strong className={dm ? 'text-white' : 'text-slate-900'}>nominee</strong> at the time of incorporation, whose written consent is recorded in <strong className={dm ? 'text-white' : 'text-slate-900'}>Form INC-3</strong>. If the sole member dies or becomes incapable of contracting, the nominee automatically steps in as the new member — securing the company&apos;s <strong className={dm ? 'text-white' : 'text-slate-900'}>perpetual succession</strong> without any interruption to the business.
              </p>
              <p>
                Registration is completed entirely online through <strong className={dm ? 'text-white' : 'text-slate-900'}>SPICe+ (INC-32)</strong> on the MCA V3 portal, and there is <strong className={dm ? 'text-white' : 'text-slate-900'}>no minimum capital requirement</strong> — this floor was removed by the Companies (Amendment) Act, 2015. The government filing fee itself is waived entirely for OPCs with authorised capital up to ₹15 lakh. A complete, error-free application is typically processed within <strong className={dm ? 'text-white' : 'text-slate-900'}>7–10 working days</strong>.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Benefits */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Registering an OPC</h2>
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Register an OPC in India?</h2>
            <DataTable headers={['Parameter', 'Requirement']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 4. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for OPC Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Organise the following three categories of documents before starting your SPICe+ filing.
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

          {/* 5. Cost 2026 */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>OPC Registration Cost in 2026</h2>
            <DataTable headers={['Cost Head', 'Approximate Amount']} rows={costRows} dm={dm} />

            <h3 className={`text-lg font-bold mt-8 mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>State-Wise Stamp Duty on Incorporation Documents</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Stamp duty on the MoA and AoA is levied under each state&apos;s own Stamp Act and depends on the authorised capital chosen. Indicative ranges for commonly registered states are below.
            </p>
            <DataTable headers={['State', 'Approx. Stamp Duty Range']} rows={stampDutyRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Indicative ranges for standard authorised capital slabs. Exact stamp duty depends on your state&apos;s Stamp Act, chosen authorised capital, and periodic rate revisions — we compute and disclose the precise amount applicable to your company before filing.
            </p>
          </div>

          {/* 6. Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Step-by-Step OPC Registration Process</h2>
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

          {/* 7. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>OPC vs Private Limited vs LLP vs Sole Proprietorship</h2>
            <DataTable headers={['Parameter', 'OPC', 'Private Limited Company', 'LLP', 'Sole Proprietorship']} rows={comparisonRows} dm={dm} />
          </div>

          {/* 8. Compliance */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Post-Registration Compliance for OPC</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              An OPC carries recurring statutory obligations from day one. Note that an OPC files the simplified <strong className={dm ? 'text-white' : 'text-slate-900'}>Form MGT-7A</strong> rather than the full MGT-7, but statutory audit remains mandatory regardless of turnover under Section 139.
            </p>
            <DataTable headers={['Compliance', 'Deadline', 'Form', 'Penalty for Default']} rows={complianceRows} dm={dm} />
          </div>

          {/* 9. Pros & Cons */}
          <div id="proscons" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Advantages and Limitations of OPC</h2>
            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Advantages</h3>
            <div className={`p-6 rounded-2xl border mb-8 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {advantagesList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Limitations — and How Founders Work Around Them</h3>
            <DataTable headers={['Limitation', 'Why It Matters', 'Workaround']} rows={limitationsRows} dm={dm} />
          </div>

          {/* 10. Conversion */}
          <div id="conversion" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Converting OPC to Private Limited Company</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Earlier, an OPC was required to mandatorily convert into a Private Limited Company once its paid-up capital exceeded ₹50 lakh or its average annual turnover crossed ₹2 crore over three consecutive years. The <strong className={dm ? 'text-white' : 'text-slate-900'}>Companies (Incorporation) Second Amendment Rules, 2021</strong> removed these thresholds entirely — conversion today is <strong className={dm ? 'text-white' : 'text-slate-900'}>purely voluntary</strong>, and an OPC can choose to convert at any point, or never at all.
              </p>
              <p>
                The conversion itself is carried out by filing <strong className={dm ? 'text-white' : 'text-slate-900'}>Form INC-6</strong> with the Registrar of Companies, along with an altered Memorandum and Articles of Association reflecting the new multi-shareholder structure. The process typically takes <strong className={dm ? 'text-white' : 'text-slate-900'}>15–30 working days</strong>, depending on RoC processing time and the completeness of the application.
              </p>
            </div>
            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Common Reasons Founders Convert</h3>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {conversionReasons.map((item, i) => (
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
                Have questions about OPC registration? Let our experts help you figure out the best structure for your business.
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
          serviceName="One Person Company"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
