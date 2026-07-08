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
  { id: 'features', label: 'Key Features' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'documents', label: 'Documents' },
  { id: 'registrations', label: 'Registrations' },
  { id: 'process', label: 'Process' },
  { id: 'cost', label: 'Cost 2026' },
  { id: 'taxation', label: 'Taxation' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'liability', label: 'Liability Risk' },
  { id: 'proscons', label: 'Pros & Cons' },
  { id: 'convert', label: 'When to Convert' },
  { id: 'closure', label: 'Closure' },
  { id: 'faq', label: "FAQ's" },
];

const plans = [
  {
    name: 'Basic',
    price: 999,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'GST Registration', included: true },
      { name: 'Trade Name Guidance', included: true },
      { name: 'Current Account Opening Assist', included: true },
      { name: 'Business Address Documentation', included: true },
      { name: 'Basic Compliance Advisory', included: true },
      { name: 'Starter Templates Pack', included: true },
      { name: 'Email & Chat Support', included: true },
      { name: 'Udyam / MSME Registration', included: false },
      { name: 'Shop & Establishment License', included: false },
      { name: 'GST Return Filing (3 Months)', included: false },
      { name: 'Bank Account Setup Assist', included: false },
      { name: 'Invoicing Template Setup', included: false },
      { name: 'Quarterly Tax Advisory Call', included: false },
    ],
  },
  {
    name: 'Standard',
    price: 1999,
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.42 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.42 0Z"></path></svg>
    ),
    popular: true,
    features: [
      { name: 'GST Registration', included: true },
      { name: 'Trade Name Guidance', included: true },
      { name: 'Current Account Opening Assist', included: true },
      { name: 'Business Address Documentation', included: true },
      { name: 'Basic Compliance Advisory', included: true },
      { name: 'Starter Templates Pack', included: true },
      { name: 'Email & Chat Support', included: true },
      { name: 'Udyam / MSME Registration', included: true },
      { name: 'Shop & Establishment License', included: true },
      { name: 'GST Return Filing (3 Months)', included: true },
      { name: 'Bank Account Setup Assist', included: true },
      { name: 'Invoicing Template Setup', included: true },
      { name: 'Quarterly Tax Advisory Call', included: true },
    ],
  },
  {
    name: 'Premium',
    price: 2999,
    iconColor: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'GST Registration', included: true },
      { name: 'Trade Name Guidance', included: true },
      { name: 'Current Account Opening Assist', included: true },
      { name: 'Business Address Documentation', included: true },
      { name: 'Basic Compliance Advisory', included: true },
      { name: 'Starter Templates Pack', included: true },
      { name: 'Email & Chat Support', included: true },
      { name: 'Udyam / MSME Registration', included: true },
      { name: 'Shop & Establishment License', included: true },
      { name: 'GST Return Filing (1 Year)', included: true },
      { name: 'Income Tax Filing (ITR-3 / ITR-4)', included: true },
      { name: 'Dedicated CA Advisor', included: true },
      { name: 'Bookkeeping Assistance (1 Yr)', included: true },
    ],
  },
];

const overviewFacts: [string, string][] = [
  ['Governing Act', 'None — a sole proprietorship has no dedicated formation statute of its own'],
  ['Operational Acts', 'MSMED Act, 2006 (Udyam), CGST Act, 2017 (GST), state-specific Shops & Establishments Acts, Income Tax Act, 1961'],
  ['Regulator', 'None directly — recognition flows from whichever tax or licensing registration is obtained (GST officer, Udyam portal, state labour department)'],
  ['Processing Time', '3–5 working days in aggregate for Udyam, GST, and current account opening'],
  ['Government Fee', '₹0 — Udyam and GST registration carry no government fee; only state-specific Shop Act/Professional Tax charges may apply'],
  ['ComplianceBharo Professional Fee', 'From ₹999'],
];

const keyFeatures = [
  {
    title: 'Single Ownership',
    desc: 'One individual owns, manages, and controls the entire business. There are no partners, co-founders, or shareholders to consult before making a decision.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    title: 'No Separate Legal Entity',
    desc: 'Unlike a company or LLP, the business and the proprietor are legally the same person. Contracts, licences, and liabilities all sit in the proprietor\'s own name.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Unlimited Liability',
    desc: 'Because there is no legal separation, the proprietor\'s personal assets — savings, property, vehicles — are fully exposed to settle business debts if the business fails.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Proprietor\'s PAN, No Separate Firm PAN',
    desc: 'A sole proprietorship never gets its own PAN. Every registration — GST, Udyam, bank account — is filed against the proprietor\'s individual PAN card.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 8.25v10.5A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V8.25M2.25 8.25 12 3l9.75 5.25" />
      </svg>
    ),
  },
  {
    title: 'Minimal Compliance',
    desc: 'There are no board meetings, no ROC annual filings, and no mandatory statutory audit tied to the structure itself — just tax filings and whichever licences apply to the business activity.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'No Minimum Capital',
    desc: 'There is no statutory capital requirement of any kind — a proprietorship can be started with whatever amount the individual chooses to invest.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 4h6m-6 4h4M5 3h10l4 4v14H5V3Z" />
      </svg>
    ),
  },
  {
    title: 'Individual Tax Slabs',
    ref: '0%–30% individual slabs vs 22%–25% corporate rates',
    desc: 'Business income is added to the proprietor\'s total personal income and taxed at individual slab rates — which can work out cheaper at lower income levels, but costlier than corporate rates once profits grow substantially.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
      </svg>
    ),
  },
  {
    title: 'Sole Decision-Making',
    desc: 'Every operational and financial decision — pricing, hiring, vendor selection, expansion — rests entirely with the proprietor, with no need for resolutions or partner consent.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const comparisonRows: string[][] = [
  ['Governing Act', 'None (recognised via GST/Udyam/Shop Act)', 'Companies Act, 2013', 'Companies Act, 2013', 'LLP Act, 2008', 'Indian Partnership Act, 1932'],
  ['Minimum Owners', '1 proprietor', '1 member + 1 nominee', '2 shareholders', '2 partners', '2 partners'],
  ['Maximum Owners', '1 proprietor', '1 (single-member structure)', '200 shareholders', 'No upper limit', '50 partners'],
  ['Separate Legal Entity', 'No', 'Yes', 'Yes (Section 9)', 'Yes', 'No'],
  ['Liability', 'Unlimited — extends to personal assets', 'Limited to unpaid share value', 'Limited to unpaid share value', 'Limited to agreed contribution', 'Unlimited — extends to personal assets'],
  ['Registration Authority', 'No central authority — GST/Udyam/local bodies as applicable', 'MCA (SPICe+)', 'MCA (SPICe+)', 'MCA (FiLLiP)', 'Optional — Registrar of Firms'],
  ['Formation Cost', 'Lowest — mostly free registrations plus minor state fees', 'Low to moderate', 'Moderate', 'Moderate', 'Low'],
  ['Timeline', '3–5 working days', '7–10 working days', '7–10 working days', '7–10 working days', '1–2 weeks if registered'],
  ['Approx. Annual Compliance Cost', 'Lowest — mainly income tax and GST filing', 'Moderate (mandatory statutory audit)', 'Moderate to high (audit, ROC filings, AGM)', 'Low to moderate', 'Low'],
  ['Tax Rate', 'Individual slab rates (0%–30% plus surcharge/cess)', '22% (Section 115BAA) or slab rate', '22%–30% depending on regime opted', 'Flat 30% plus applicable surcharge and cess', 'Flat 30% plus applicable surcharge and cess'],
  ['Perpetual Succession', 'No — ends with the proprietor', 'Yes, via the appointed nominee', 'Yes', 'Yes', 'No'],
  ['VC Funding Ability', 'Not possible', 'Not possible until conversion to Pvt Ltd', 'Straightforward — preferred by VCs and angel investors', 'Not possible — no share capital structure', 'Not possible'],
  ['Best Suited For', 'Freelancers, small traders, and single-owner service businesses testing an idea', 'Solo founders wanting a corporate structure without a co-founder', 'Startups planning to raise equity and scale rapidly', 'Professional firms valuing lower compliance with 2+ partners', 'Small, trust-based businesses among known partners'],
];

const opcMiniComparisonRows: string[][] = [
  ['Separate Legal Entity', 'No — the business and owner are legally identical', 'Yes — the OPC is a distinct legal person from its sole member'],
  ['Liability', 'Unlimited — personal assets are fully exposed', 'Limited to the unpaid value of shares held'],
  ['Registration Requirement', 'No dedicated formation statute — recognised only through GST/Udyam/Shop Act', 'Mandatory incorporation with the MCA via SPICe+'],
  ['Ongoing Compliance', 'Minimal — income tax and applicable licence renewals only', 'Statutory audit, AOC-4, MGT-7A, DIR-3 KYC every year'],
  ['Succession on Death', 'Business effectively ends; assets pass through inheritance', 'A pre-appointed nominee automatically becomes the new member'],
  ['Tax Rate', 'Individual slab rates (0%–30%)', '22% under Section 115BAA (effective 25.17%) or slab rate'],
];

const eligibilityRows: string[][] = [
  ['Citizenship', 'No statute mandates Indian citizenship, but in practice, banks and GST/Udyam registrations are designed around an Indian resident individual operating the business'],
  ['Age', '18 years or older'],
  ['Mental Capacity', 'Must be of sound mind and competent to contract under Section 11 of the Indian Contract Act, 1872'],
  ['PAN & Aadhaar', 'Mandatory for every registration — GST, Udyam, and current account opening are all filed against the proprietor\'s personal PAN and Aadhaar'],
  ['NRIs / Foreign Nationals', 'Not eligible to operate a proprietorship-style business under FEMA regulations — non-residents wanting to set up in India typically need a Liaison Office, Branch Office, or a Wholly Owned Subsidiary instead'],
  ['Salaried Persons', 'Can run a proprietorship alongside employment, subject to their employment contract\'s conflict-of-interest clauses, and must separately disclose business income under the head "Profits and Gains of Business or Profession" in their ITR'],
  ['Minors', 'Excluded — a minor cannot validly contract under Section 11 of the Indian Contract Act, 1872, and therefore cannot be registered as a sole proprietor'],
];

const documentGroups = [
  {
    group: 'Proprietor KYC',
    items: [
      'PAN card of the proprietor (mandatory identity proof for every registration)',
      'Aadhaar card, linked to a working mobile number for OTP-based verification',
      'Recent passport-size photograph with a plain white background',
      'Bank proof — a cancelled cheque or passbook front page in the proprietor\'s name',
    ],
  },
  {
    group: 'Business Address Proof',
    items: [
      'Owned premises: latest property tax receipt or ownership deed in the proprietor\'s name',
      'Rented premises: rent/lease agreement plus a No Objection Certificate (NOC) from the landlord',
      'Co-working space: the co-working agreement along with an NOC or address confirmation letter from the space provider',
      'Latest utility bill (electricity, water, or gas) not older than 2 months in every scenario',
    ],
  },
  {
    group: 'Business Details',
    items: [
      'Proposed trade name under which the business will operate',
      'Nature of business or professional activity, and the relevant HSN/SAC or activity code',
      'Estimated annual turnover, used to determine GST applicability and the presumptive taxation scheme available',
    ],
  },
];

const registrationsStack = [
  { title: 'PAN (Proprietor\'s Personal PAN)', desc: 'There is no separate PAN for the business — every registration and tax filing uses the proprietor\'s own PAN card as the business\'s permanent identifier.' },
  { title: 'Udyam / MSME Registration', desc: 'A free, same-day registration completed via Aadhaar OTP verification on the Udyam portal. It unlocks priority-sector lending, delayed-payment protection under the MSME Development Act, and access to government tenders.' },
  { title: 'GST Registration', desc: 'Mandatory once turnover crosses ₹40 lakh for goods or ₹20 lakh for services (lower thresholds apply in special category states), or immediately if the business makes inter-state supplies, sells through e-commerce platforms, or the proprietor wants to claim input tax credit.' },
  { title: 'Shop & Establishment Act Registration', desc: 'A state-specific labour law registration that most physical business premises must obtain, typically within 30 days of commencing operations, governing working hours, holidays, and employee welfare conditions.' },
  { title: 'Current Bank Account', desc: 'Banks generally require at least two independent proofs of the business\'s existence under RBI KYC norms — commonly the Udyam certificate plus a GST certificate or Shop Act licence — before opening a current account in the trade name.' },
  { title: 'Professional Tax Registration', desc: 'A state-level tax on trades and professions, applicable in states that levy it, with the total annual liability capped at ₹2,500 under Article 276 of the Constitution of India.' },
];

const stateRegRows: string[][] = [
  ['Maharashtra', 'Mandatory within 30 days of starting business', 'Applicable — capped at ₹2,500/year'],
  ['Karnataka', 'Mandatory, state labour department portal', 'Applicable — capped at ₹2,500/year'],
  ['Delhi', 'Mandatory under the Delhi Shops & Establishments Act', 'Not applicable — Delhi does not levy Professional Tax'],
  ['Tamil Nadu', 'Mandatory within 30 days of commencement', 'Applicable — capped at ₹2,500/year'],
  ['West Bengal', 'Mandatory, state labour department portal', 'Applicable — capped at ₹2,500/year'],
  ['Telangana', 'Mandatory within 30 days of commencement', 'Applicable — capped at ₹2,500/year'],
  ['Gujarat', 'Mandatory, state labour department portal', 'Applicable — capped at ₹2,500/year'],
  ['Andhra Pradesh', 'Mandatory within 30 days of commencement', 'Applicable — capped at ₹2,500/year'],
  ['Madhya Pradesh', 'Mandatory, state labour department portal', 'Applicable — capped at ₹2,500/year'],
  ['Kerala', 'Mandatory within 30 days of commencement', 'Applicable — capped at ₹2,500/year'],
];

const processSteps = [
  { title: 'Choose a Business (Trade) Name', desc: 'Since there is no name-approval authority, simply pick a name that isn\'t already trademarked or actively used by a competitor in your sector, and check its domain/social handle availability.' },
  { title: 'Arrange KYC Documents', desc: 'Gather your PAN, Aadhaar, a recent photograph, and a cancelled cheque or bank passbook — these get reused across every registration that follows.' },
  { title: 'Apply for Udyam Registration', desc: 'File on udyamregistration.gov.in using Aadhaar OTP verification. It is completely free and typically issues a certificate the same day.' },
  { title: 'Obtain GST Registration', desc: 'File Form GST REG-01 on the GST portal if your turnover crosses the threshold, or voluntarily if you need input tax credit or deal in B2B/e-commerce. Approval usually takes 3–7 working days.' },
  { title: 'Get a Shop & Establishment Licence', desc: 'Register with your state\'s labour department portal within 30 days of starting operations. Fees and exact requirements vary by state, typically ranging from ₹300 to ₹2,000.' },
  { title: 'Enrol for Professional Tax', desc: 'If your state levies Professional Tax, enrol via the state commercial tax department — the total annual liability is capped at ₹2,500 under Article 276 of the Constitution.' },
  { title: 'Open a Current Bank Account', desc: 'Approach a bank with your Udyam certificate and GST certificate (or Shop Act licence) as your two proofs of business existence — accounts typically open within 2–4 working days.' },
];

const costRows: string[][] = [
  ['PAN Card (if the proprietor does not already hold one)', '₹107 (online application fee)', 'Included in ComplianceBharo\'s assistance'],
  ['Udyam / MSME Registration', '₹0', 'Included'],
  ['GST Registration', '₹0', 'Included'],
  ['Shop & Establishment Licence', '₹300 – ₹2,000 (state-specific)', 'Included'],
  ['Professional Tax Registration', '₹0, with annual liability capped at ₹2,500 (state-specific)', 'Included'],
  ['Digital Signature Certificate (only if required for specific digital filings)', '₹1,000 – ₹2,000', 'At actual cost, if needed'],
  ['Current Bank Account Opening', '₹0 (subject to the bank\'s minimum balance policy)', 'Assisted'],
  ['ComplianceBharo Professional Fee', '—', '₹999 (Basic) / ₹1,999 (Standard) / ₹2,999 (Premium)'],
];

const taxSlabRows: string[][] = [
  ['Up to ₹4,00,000', 'Nil'],
  ['₹4,00,001 – ₹8,00,000', '5%'],
  ['₹8,00,001 – ₹12,00,000', '10%'],
  ['₹12,00,001 – ₹16,00,000', '15%'],
  ['₹16,00,001 – ₹20,00,000', '20%'],
  ['₹20,00,001 – ₹24,00,000', '25%'],
  ['Above ₹24,00,000', '30%'],
];

const complianceRows: string[][] = [
  ['GSTR-1 (Outward Supplies)', 'Monthly (11th) or quarterly under QRMP (13th of month after quarter)', 'GSTR-1', 'Late fee per day of delay, subject to a prescribed cap'],
  ['GSTR-3B (Summary Return & Tax Payment)', 'Monthly (20th) or quarterly under QRMP (22nd/24th, state-dependent)', 'GSTR-3B', 'Late fee per day of delay, plus interest at 18% p.a. on unpaid tax'],
  ['Advance Tax', 'Quarterly — 15 June, 15 September, 15 December, 15 March', '—', 'Interest under Sections 234B and 234C for shortfall or delay'],
  ['Income Tax Return', '31 July (no audit applicable) / 31 October (audit applicable)', 'ITR-3 (regular books) or ITR-4 (presumptive scheme)', 'Late fee under Section 234F, plus interest on unpaid tax'],
  ['GSTR-9 (Annual Return)', 'On or before 31 December following the financial year, if applicable', 'GSTR-9', 'Late fee per day of delay, subject to a prescribed cap based on turnover'],
  ['Udyam Registration Self-Update', 'As and when turnover or investment figures change (recommended annually)', 'Udyam online update', 'No direct penalty, but stale data can affect MSME benefit eligibility'],
  ['Shop & Establishment Licence Renewal', 'As per the state-specific validity period (commonly 1–5 years)', 'State labour department renewal', 'Late renewal fees or licence lapse, varying by state'],
  ['Statutory Tax Audit (where triggered)', 'Report to be furnished before the ITR due date under Section 44AB', 'Form 3CA/3CB-3CD', 'Penalty under Section 271B — lower of 0.5% of turnover or ₹1,50,000'],
];

const advantagesList = [
  'The easiest and cheapest business structure to start in India',
  'Complete control over every business decision',
  'Minimal ongoing compliance — no ROC filings or mandatory statutory audit tied to the structure',
  'Business income is taxed at individual slab rates, which can be favourable at lower income levels',
  'No profit-sharing — every rupee earned belongs to the proprietor',
  'Quick and informal to wind up, with no MCA/RoC dissolution process required',
];

const disadvantagesList = [
  'Unlimited personal liability for all business debts and obligations',
  'No separate legal entity — contracts and litigation are in the proprietor\'s own name',
  'No perpetual succession — the business effectively ends with the proprietor',
  'Cannot raise equity capital or bring in outside investors',
  'Tax burden can exceed corporate rates once profits grow past roughly ₹24 lakh in a year',
  'Limited credibility with large corporate clients and government tenders that prefer registered companies',
  'Not eligible for DPIIT Startup recognition, which requires an LLP or company structure',
];

const faqs = [
  { q: 'What is a sole proprietorship?', a: 'A sole proprietorship is an unincorporated business owned and run by a single individual, where the business has no legal identity separate from its owner.' },
  { q: 'Is a sole proprietorship registered under any specific Act?', a: 'No. There is no dedicated statute for forming a sole proprietorship. It is recognised indirectly through registrations such as GST, Udyam (MSME), or a state Shop & Establishment licence.' },
  { q: 'Is a sole proprietorship a separate legal entity?', a: 'No. The proprietorship and the proprietor are legally the same person — the business cannot own property, sue, or be sued independently of its owner.' },
  { q: 'Does a sole proprietorship have its own PAN?', a: 'No. A sole proprietorship uses the proprietor\'s personal PAN for every registration and tax filing — there is no separate PAN issued to the business itself.' },
  { q: 'Is there a minimum capital requirement?', a: 'No. A sole proprietorship can be started with any amount of capital the proprietor chooses to invest — there is no statutory floor.' },
  { q: 'Can I run multiple businesses under one proprietorship?', a: 'Yes, a proprietor can operate multiple trade names or business lines under their own PAN, though each activity may need its own GST registration if operated from different states or under separate trade names for banking purposes.' },
  { q: 'How long does it take to set up a sole proprietorship?', a: 'Setting up the core registrations — Udyam, GST, and a current bank account — typically takes 3–5 working days in total, depending on document readiness and bank processing time.' },
  { q: 'What does unlimited liability actually mean?', a: 'It means there is no legal wall between business debts and personal assets — if the business cannot pay a creditor or a loan, the proprietor\'s personal savings, property, or other assets can be used to settle the shortfall.' },
  { q: 'What happens to the business when the proprietor dies?', a: 'The proprietorship does not have perpetual succession — it effectively ceases to exist as a business, and its assets and liabilities pass to the proprietor\'s legal heirs through inheritance and probate, not through any automatic business continuity mechanism.' },
  { q: 'Can a sole proprietorship be sued?', a: 'Legal action is technically taken against the proprietor personally, since the business has no separate legal identity — any judgment can be enforced against the proprietor\'s personal assets, not just business assets.' },
  { q: 'What is the difference between a sole proprietorship and an OPC?', a: 'A sole proprietorship has no separate legal entity, no MCA registration, and unlimited liability, while an OPC is a registered company with limited liability, a separate legal identity, and perpetual succession through a nominee — see our detailed comparison in the Comparison section above.' },
  { q: 'Can a salaried person register a sole proprietorship?', a: 'Yes, subject to their employment contract not restricting outside business activity, and they must separately report business income under "Profits and Gains of Business or Profession" in their income tax return.' },
  { q: 'Can NRIs or foreign nationals register a sole proprietorship in India?', a: 'No. Non-residents are not eligible to operate a proprietorship-style business under FEMA regulations and should instead consider a Liaison Office, Branch Office, or Wholly Owned Subsidiary structure.' },
  { q: 'Is Udyam registration mandatory?', a: 'Udyam registration is not legally mandatory to operate, but it is free, instant, and unlocks priority-sector lending, delayed-payment protection, and tender eligibility — making it worthwhile for almost every proprietorship.' },
  { q: 'Is GST registration mandatory for a sole proprietorship?', a: 'GST becomes mandatory once turnover crosses ₹40 lakh for goods or ₹20 lakh for services (lower thresholds in special category states), or immediately for inter-state supply, e-commerce sales, or if voluntary registration is chosen for input tax credit.' },
  { q: 'Is a Shop & Establishment licence required?', a: 'Most states require any business with a physical premises to register under their Shops & Establishments Act, typically within 30 days of starting operations — exact rules and fees vary by state.' },
  { q: 'Why do banks ask for two documents to open a current account?', a: 'Under RBI KYC norms, banks need independent verification of a genuinely operating business before opening an account in a trade name, so they typically require at least two official proofs such as the Udyam certificate and a GST certificate or Shop Act licence.' },
  { q: 'Does Professional Tax apply to every proprietorship?', a: 'Only in states that levy Professional Tax on trades and professions. Where applicable, the total annual liability is capped at ₹2,500 under Article 276 of the Constitution of India.' },
  { q: 'Does a proprietorship need FSSAI or IEC registration?', a: 'Only if the business activity requires it — FSSAI registration applies to businesses handling food products, and an Import Export Code (IEC) is required only if the proprietorship engages in cross-border import or export transactions.' },
  { q: 'Can I use my home address as the business address?', a: 'Yes, a residential address can be used as the business address for most registrations, provided you can furnish ownership or rental proof, a recent utility bill, and, where required, an NOC.' },
  { q: 'Can I operate from a co-working space?', a: 'Yes, provided the co-working provider issues a valid agreement and an NOC or address confirmation letter that can be submitted for GST, Udyam, or bank account documentation.' },
  { q: 'How is a sole proprietorship taxed?', a: 'Business income is clubbed with the proprietor\'s other personal income and taxed at individual slab rates, ranging from nil up to 30% depending on the total taxable income for the year.' },
  { q: 'Which ITR form should a sole proprietor file?', a: 'A proprietor maintaining regular books of account files ITR-3, while one opting for the presumptive taxation scheme under Section 44AD or 44ADA files the simpler ITR-4.' },
  { q: 'What is Section 44AD?', a: 'Section 44AD is a presumptive taxation scheme for eligible businesses with turnover up to ₹3 crore (extended limit where at least 95% of receipts are digital), under which 6% of digital turnover and 8% of cash turnover is deemed as taxable profit, without needing to maintain detailed books.' },
  { q: 'What is Section 44ADA?', a: 'Section 44ADA is a presumptive taxation scheme for specified professionals (such as legal, medical, engineering, and consulting professionals) with gross receipts up to ₹75 lakh (extended limit where at least 95% of receipts are digital), under which 50% of gross receipts is deemed as taxable profit.' },
  { q: 'What is the tax audit threshold for a proprietorship?', a: 'A tax audit under Section 44AB is generally triggered once turnover exceeds ₹1 crore (extended to ₹10 crore where cash transactions are 5% or less of total transactions) for businesses, or gross receipts exceed ₹50 lakh for professionals not opting for presumptive taxation.' },
  { q: 'Should I choose the old or new tax regime?', a: 'The new regime offers lower slab rates and a higher rebate threshold but removes most deductions and exemptions, while the old regime allows deductions like Section 80C and HRA — the better choice depends on how many deductions you can actually claim, and is best evaluated each year based on your specific income and investments.' },
  { q: 'Does a sole proprietorship have TDS obligations?', a: 'Yes, if the proprietorship\'s turnover exceeds the threshold prescribed under the tax audit provisions in the preceding year, it must deduct TDS on applicable payments such as rent, professional fees, and contractor payments, and file periodic TDS returns.' },
  { q: 'What annual compliances does a sole proprietorship have?', a: 'At a minimum, an annual income tax return and periodic GST returns (if GST-registered) — there are no ROC annual filings since the structure is never incorporated with the MCA.' },
  { q: 'Is maintaining books of account mandatory?', a: 'Books of account become mandatory once income or turnover crosses the thresholds prescribed under Section 44AA, though maintaining basic records is advisable from day one regardless of the threshold.' },
  { q: 'Can a sole proprietorship hire employees?', a: 'Yes, a proprietorship can hire employees like any other business, and depending on headcount, may need to comply with EPF, ESI, and Shop & Establishment Act labour provisions.' },
  { q: 'Is a sole proprietorship eligible for DPIIT Startup India recognition?', a: 'No. DPIIT Startup recognition requires the entity to be registered as a Private Limited Company, LLP, or registered Partnership Firm — a sole proprietorship does not qualify.' },
  { q: 'Can a sole proprietorship access MSME loans or sell on GeM?', a: 'Yes. With a valid Udyam registration, a proprietorship can access priority-sector MSME lending schemes and register as a seller on the Government e-Marketplace (GeM) to bid for government tenders.' },
  { q: 'When should I convert my proprietorship to an LLP or Pvt Ltd?', a: 'Common triggers include turnover crossing roughly ₹1 crore, bringing in an investor or co-founder, needing DPIIT recognition, or requiring a larger secured loan — see the "When to Convert" section above for a fuller discussion.' },
  { q: 'How do I convert a proprietorship into a company?', a: 'Conversion is achieved either through a slump sale under Section 50B, where the entire business is transferred as a going concern for a lump sum, or through an asset-by-asset transfer, where individual assets and liabilities are moved into the new entity separately.' },
  { q: 'What are the tax implications of converting a proprietorship into a company?', a: 'A conversion can potentially trigger capital gains tax on the transfer, but Section 47(xiv) allows this to be deferred if the proprietor holds at least 50% of the new company\'s shareholding for a minimum of 5 years after conversion.' },
  { q: 'How do I close a sole proprietorship?', a: 'Closure involves filing a final GST return (GSTR-10) and cancelling GST registration via Form REG-16, surrendering the Udyam and Shop Act registrations, filing a final income tax return, settling outstanding creditors, and closing the current bank account — no MCA/RoC filing is needed since the structure was never incorporated.' },
  { q: 'Is a sole proprietorship a good fit for freelancers?', a: 'Yes, for most freelancers just starting out, a sole proprietorship (often backed by just a GST or Udyam registration) is the simplest, lowest-cost way to formalise income and issue invoices in a business name.' },
  { q: 'What registrations does a proprietorship need to sell on e-commerce platforms?', a: 'Most e-commerce marketplaces require a valid GST registration regardless of turnover, along with PAN and bank account details, before a proprietorship can list and sell products online.' },
  { q: 'What is the turnover limit for presumptive taxation?', a: 'Under Section 44AD, eligible businesses can opt for presumptive taxation up to ₹3 crore turnover (with the digital-receipts condition), while under Section 44ADA, eligible professionals can opt for it up to ₹75 lakh in gross receipts (with the same condition).' },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function CrossIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
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

export default function SoleProprietorshipClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Sole Proprietorship" />

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
                  1,240+ Proprietorships Assisted | Expert-Led | All India (25+ States)
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  Sole Proprietorship <br />
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Registration in India</span>
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Start Your Proprietorship Firm Online in <span className="font-bold text-brand-orange">3 to 5 Working Days</span> Professional Fee from <span className="font-bold text-brand-orange">₹1,999</span>
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  PAN + Udyam (MSME) + GST + Shop Act + Current Account. Government Fees at Actuals. Expert-Assisted.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {[
                      "PAN Validation and Linkage",
                      "Udyam (MSME) Certificate with URN",
                      "GST Registration (GSTIN)",
                      "Shop and Establishment Act Licence",
                      "Professional Tax Enrolment (Where Applicable)",
                      "Current Account Opening Support",
                      "Expert-Assisted Filing and Documentation",
                      "Post-Registration Compliance Guidance"
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
              <LeadForm serviceName={"Sole Proprietorship Registration"} dm={isDarkMode} />
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
                Sole Proprietorship Registration Package 2026
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
                  "PAN Validation and Aadhaar Linkage Check",
                  "GST Registration (GSTIN Issuance)",
                  "Professional Tax Enrolment (Where Applicable)",
                  "Expert-Assisted Filing and Documentation",
                  "Udyam (MSME) Registration (URN Certificate)",
                  "Shop and Establishment Act Licence Filing",
                  "Current Account Opening Guidance",
                  "30-Day Post-Registration Compliance Support"
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is a Sole Proprietorship?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A sole proprietorship is an <strong className={dm ? 'text-white' : 'text-slate-900'}>unincorporated, one-owner business</strong> where the individual and the business are legally identical. It has <strong className={dm ? 'text-white' : 'text-slate-900'}>no separate legal personality</strong>, no separate PAN of its own, and <strong className={dm ? 'text-white' : 'text-slate-900'}>no perpetual succession</strong> — when the proprietor exits or passes away, the business does not automatically continue as an independent entity. Because there is no legal wall between the two, the proprietor also carries <strong className={dm ? 'text-white' : 'text-slate-900'}>unlimited personal liability</strong> for every business debt and obligation.
              </p>
              <p>
                Unlike a company or LLP, a sole proprietorship has <strong className={dm ? 'text-white' : 'text-slate-900'}>no dedicated formation statute</strong> — there is no "Sole Proprietorship Act" and no central registration authority for the structure itself. Instead, it is recognised indirectly through whichever operational registrations the business needs: <strong className={dm ? 'text-white' : 'text-slate-900'}>Udyam registration</strong> under the MSMED Act, 2006, <strong className={dm ? 'text-white' : 'text-slate-900'}>GST registration</strong> under the CGST Act, 2017, a state <strong className={dm ? 'text-white' : 'text-slate-900'}>Shop & Establishment Act</strong> licence, and annual filings under the Income Tax Act, 1961.
              </p>
              <p>
                This makes it the fastest and cheapest way to start operating legally in India — most proprietors can get their core registrations in place and open a current bank account within <strong className={dm ? 'text-white' : 'text-slate-900'}>3–5 working days</strong>.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of a Sole Proprietorship</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`flex gap-3 items-start rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                    {f.ref && <p className={`text-xs font-semibold mb-1.5 ${dm ? 'text-brand-orange/80' : 'text-orange-600'}`}>{f.ref}</p>}
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Sole Proprietorship vs OPC vs Pvt Ltd vs LLP vs Partnership</h2>
            <DataTable headers={['Parameter', 'Sole Proprietorship', 'OPC', 'Private Limited Company', 'LLP', 'Partnership Firm']} rows={comparisonRows} dm={dm} />

            <div className={`mt-8 rounded-2xl border p-5 ${dm ? 'border-amber-500/30 bg-amber-500/10' : 'border-amber-400/50 bg-amber-50'}`}>
              <h3 className={`text-base font-bold mb-3 ${dm ? 'text-amber-200' : 'text-amber-800'}`}>A Common Confusion: Proprietorship vs OPC</h3>
              <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-amber-200/90' : 'text-amber-800'}`}>
                Many founders assume a One Person Company is just a "registered version" of a proprietorship — it isn&apos;t. An OPC is a fully incorporated company with its own legal identity, while a proprietorship never gains that separation.
              </p>
              <DataTable headers={['Aspect', 'Sole Proprietorship', 'One Person Company (OPC)']} rows={opcMiniComparisonRows} dm={dm} />
            </div>
          </div>

          {/* 4. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Start a Sole Proprietorship?</h2>
            <DataTable headers={['Parameter', 'Requirement']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 5. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for Sole Proprietorship</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Keep the following three categories of documents ready before applying for any registration.
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

          {/* 6. Registrations Stack */}
          <div id="registrations" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Registrations Needed to Run a Proprietorship</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Since there is no single "proprietorship registration," identity is built up through this stack of registrations, taken up as relevant to your business.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {registrationsStack.map((r) => (
                <div key={r.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{r.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{r.desc}</p>
                </div>
              ))}
            </div>

            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>State-Wise Shop Act & Professional Tax Applicability</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Both requirements are governed by state law, so applicability and exact fees vary. Here is a quick reference for commonly registered states.
            </p>
            <DataTable headers={['State', 'Shop & Establishment Act', 'Professional Tax']} rows={stateRegRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Indicative applicability only. Exact fees, exemption thresholds, and renewal cycles vary by state and are periodically revised — we confirm the precise requirement applicable to your registered address before filing.
            </p>
          </div>

          {/* 7. Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>How to Register: 7-Step Process</h2>
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

          {/* 8. Cost 2026 */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Sole Proprietorship Registration Cost in 2026</h2>
            <DataTable headers={['Registration / Item', 'Government Fee', 'ComplianceBharo Fee']} rows={costRows} dm={dm} />
          </div>

          {/* 9. Taxation */}
          <div id="taxation" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>How a Sole Proprietorship Is Taxed</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Since a proprietorship has no separate legal identity, all business profit is added to the proprietor&apos;s other personal income and taxed at <strong className={dm ? 'text-white' : 'text-slate-900'}>individual slab rates</strong> under the new tax regime (the default regime for FY 2025-26).
              </p>
            </div>
            <DataTable headers={['Taxable Income Slab', 'Tax Rate (New Regime, FY 2025-26)']} rows={taxSlabRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 mb-6 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              A rebate under Section 87A can bring the effective tax to nil for taxable income up to ₹12,00,000. Surcharge and health & education cess apply additionally above prescribed income thresholds.
            </p>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Many proprietors avoid maintaining detailed books by opting for <strong className={dm ? 'text-white' : 'text-slate-900'}>presumptive taxation</strong>. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44AD</strong>, eligible businesses with turnover up to ₹3 crore (where at least 95% of receipts are digital) can declare 6% of digital turnover and 8% of cash turnover as taxable profit. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 44ADA</strong>, specified professionals with gross receipts up to ₹75 lakh (subject to the same digital-receipts condition) can declare 50% of gross receipts as taxable profit.
              </p>
              <p>
                A statutory <strong className={dm ? 'text-white' : 'text-slate-900'}>tax audit under Section 44AB</strong> is triggered once turnover exceeds ₹1 crore (extended to ₹10 crore where cash transactions are 5% or less of total transactions) for a business, or gross receipts exceed ₹50 lakh for a professional not opting for the presumptive scheme. Choosing between the <strong className={dm ? 'text-white' : 'text-slate-900'}>old and new regimes</strong> comes down to how many deductions — Section 80C investments, HRA, home loan interest — you can actually claim; it is worth re-evaluating this choice every financial year rather than assuming last year&apos;s answer still holds.
              </p>
            </div>
          </div>

          {/* 10. Compliance Calendar */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Compliance Calendar</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Ongoing obligations depend on which registrations you hold — a GST-registered proprietor has considerably more recurring filings than one operating purely on Udyam.
            </p>
            <DataTable headers={['Compliance', 'Deadline', 'Form', 'Penalty for Default']} rows={complianceRows} dm={dm} />
          </div>

          {/* 11. Liability Risk */}
          <div id="liability" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Understanding Unlimited Personal Liability</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                In plain terms, unlimited liability means there is <strong className={dm ? 'text-white' : 'text-slate-900'}>no legal fence</strong> between the business and the proprietor&apos;s personal life. If a supplier isn&apos;t paid, a loan defaults, or a customer wins a legal claim against the business, the creditor can pursue the proprietor&apos;s personal bank accounts, property, or other assets to recover the dues — not just whatever cash or stock sits inside the business.
              </p>
              <p>
                This risk is often manageable for a small, low-overhead operation, but it is worth reconsidering the structure once any of the following start to apply:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You are taking on business loans above roughly ₹10 lakh, especially unsecured ones</li>
                <li>You carry meaningful inventory or fixed assets that could be seized in a dispute</li>
                <li>You sign B2B contracts with penalty clauses, indemnities, or liquidated damages</li>
                <li>You operate in a risk-prone sector — manufacturing, food, healthcare, logistics — where accidents or product liability claims are plausible</li>
              </ul>
              <p>
                In any of these situations, moving to an <strong className={dm ? 'text-white' : 'text-slate-900'}>OPC or Private Limited Company</strong> caps your personal exposure to the capital you&apos;ve invested in the business, which is often worth the modest increase in compliance.
              </p>
            </div>
          </div>

          {/* 12. Pros & Cons */}
          <div id="proscons" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Advantages and Disadvantages of a Sole Proprietorship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border ${dm ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-emerald-300 bg-emerald-50'}`}>
                <h3 className={`text-base font-bold mb-4 ${dm ? 'text-emerald-300' : 'text-emerald-700'}`}>Advantages</h3>
                <ul className="space-y-3">
                  {advantagesList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 mt-0.5">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-6 rounded-2xl border ${dm ? 'border-rose-500/25 bg-rose-500/5' : 'border-rose-300 bg-rose-50'}`}>
                <h3 className={`text-base font-bold mb-4 ${dm ? 'text-rose-300' : 'text-rose-700'}`}>Disadvantages</h3>
                <ul className="space-y-3">
                  {disadvantagesList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-500 mt-0.5">
                        <CrossIcon className="h-3 w-3" />
                      </span>
                      <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 13. When to Convert */}
          <div id="convert" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Converting to LLP or Private Limited Company</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>Founders typically start considering conversion when one or more of these triggers show up:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Annual turnover crosses roughly ₹1 crore, making the tax and credibility case for a company structure stronger</li>
                <li>An investor or co-founder needs to be brought on board with a formal equity stake</li>
                <li>The business starts winning high-value B2B contracts that require vendor empanelment as a registered company</li>
                <li>Larger secured loans or working capital lines are needed, which lenders often prefer to extend to a company rather than an individual</li>
                <li>DPIIT Startup India recognition becomes relevant, since it requires an LLP, Partnership Firm, or company structure</li>
              </ul>
              <p>
                Conversion is generally carried out through one of two routes. A <strong className={dm ? 'text-white' : 'text-slate-900'}>slump sale under Section 50B</strong> transfers the entire business — assets, liabilities, and goodwill — as a single going concern for a lump sum consideration, without assigning individual values to each asset. Alternatively, an <strong className={dm ? 'text-white' : 'text-slate-900'}>asset-by-asset transfer</strong> moves each asset and liability into the new entity separately, which can offer more granular control but adds documentation and valuation work for each item transferred.
              </p>
              <p>
                Either route can trigger capital gains tax on the transfer, but <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 47(xiv)</strong> allows this tax to be deferred if the proprietor retains at least 50% shareholding in the new company for a minimum of 5 years following the conversion.
              </p>
            </div>
          </div>

          {/* 14. Closure */}
          <div id="closure" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Winding Up a Sole Proprietorship</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Closing a sole proprietorship is considerably simpler than dissolving a company, since <strong className={dm ? 'text-white' : 'text-slate-900'}>no MCA or RoC filing is ever required</strong> — the structure was never incorporated in the first place. The practical steps are:
              </p>
            </div>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {[
                  'File a final GSTR-10 return once GST registration is cancelled',
                  'Cancel GST registration by filing Form REG-16 with the jurisdictional GST officer',
                  'Surrender the Udyam registration and any active Shop & Establishment Act licence',
                  'File a final Income Tax Return covering income up to the date of closure',
                  'Settle outstanding dues with creditors, vendors, and employees',
                  'Close the business current bank account once all pending transactions clear',
                ].map((item, i) => (
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

          {/* 15. FAQs */}
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
                Have questions about Sole Proprietorship registration? Let our experts help you figure out the best structure for your business.
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
          serviceName="Sole Proprietorship"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
