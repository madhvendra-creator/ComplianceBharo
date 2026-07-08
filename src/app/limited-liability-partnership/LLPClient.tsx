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
  { id: 'partners', label: 'Partners' },
  { id: 'features', label: 'Key Features' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'documents', label: 'Documents' },
  { id: 'cost', label: 'Cost 2026' },
  { id: 'process', label: 'Process' },
  { id: 'agreement', label: 'LLP Agreement' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'proscons', label: 'Pros & Cons' },
  { id: 'faq', label: "FAQ's" },
];

const plans = [
  {
    name: 'Basic',
    price: 2499,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'Expert assistance', included: true },
      { name: 'Company name filed and approved', included: true },
      { name: 'DSC preparation', included: true },
      { name: 'FiLLiP form in 2-3 working days', included: true },
      { name: 'Incorporation certificate', included: true },
      { name: 'LLP PAN + TAN', included: true },
      { name: 'DPIN for designated partners', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'Form 3 filing', included: false },
      { name: 'MSME registration', included: false },
      { name: 'Startup India registration', included: false },
      { name: 'Pitch Deck', included: false },
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
      { name: 'Expert assistance', included: true },
      { name: 'Company name filed and approved', included: true },
      { name: 'DSC preparation', included: true },
      { name: 'FiLLiP form in 2-3 working days', included: true },
      { name: 'Incorporation certificate', included: true },
      { name: 'LLP PAN + TAN', included: true },
      { name: 'DPIN for designated partners', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'Form 3 filing', included: true },
      { name: 'MSME registration', included: true },
      { name: 'Startup India registration', included: true },
      { name: 'Pitch Deck', included: false },
      { name: 'TM (Trademark) registration', included: false },
    ],
  },
  {
    name: 'Premium',
    price: 7999,
    iconColor: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'Expert assistance', included: true },
      { name: 'Company name filed and approved', included: true },
      { name: 'DSC preparation', included: true },
      { name: 'FiLLiP form in 2-3 working days', included: true },
      { name: 'Incorporation certificate', included: true },
      { name: 'LLP PAN + TAN', included: true },
      { name: 'DPIN for designated partners', included: true },
      { name: 'Digital Signature Certificate (DSC)', included: true },
      { name: 'Form 3 filing', included: true },
      { name: 'MSME registration', included: true },
      { name: 'Startup India registration', included: true },
      { name: 'Pitch Deck', included: true },
      { name: 'TM (Trademark) registration', included: true },
    ],
  },
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Limited Liability Partnership Act, 2008'],
  ['Regulator', 'Ministry of Corporate Affairs (MCA), through the jurisdictional Registrar of Companies (RoC)'],
  ['Filing Form', 'FiLLiP (Form for incorporation of LLP), filed electronically on the MCA21 V3 portal'],
  ['Min Partners', '2 (no upper limit on the total number of partners)'],
  ['Min Designated Partners', '2 individuals, at least 1 of whom must be a resident of India (182+ days in the preceding calendar year)'],
  ['Processing Time', '7–10 working days from submission of a complete, error-free application'],
  ['Government Fee', '₹500 – ₹5,600, depending on the total contribution slab and name reservation'],
  ['ComplianceBharo Professional Fee', '₹2,499'],
];

const partnerTypes = [
  {
    title: 'Designated Partners',
    desc: 'Every LLP must appoint at least 2 designated partners who are individuals, and at least one must be a resident of India. Designated partners hold a Designated Partner Identification Number (DPIN), sign statutory filings, and are personally accountable for regulatory compliance — including Form 8, Form 11, and DIR-3 KYC. They effectively function as the compliance face of the LLP before the MCA.',
  },
  {
    title: 'Regular Partners',
    desc: 'Regular partners contribute capital as agreed in the LLP Agreement and share in profits according to the agreed ratio, but are not required to hold a DPIN unless they also take on a designated partner role. Their rights, obligations, and exit terms are governed entirely by the LLP Agreement.',
  },
  {
    title: 'Corporate Partners',
    desc: 'A company or another LLP can itself become a partner in an LLP. In such cases, the corporate partner nominates an individual — typically a director or authorised signatory — to act on its behalf, and that nominee\'s KYC documents are submitted alongside the corporate entity\'s incorporation records.',
  },
];

const keyFeatures = [
  {
    title: 'Limited Liability',
    desc: 'Each partner\'s liability is restricted to their agreed contribution to the LLP. Personal assets remain shielded from business debts and from the unauthorised acts of co-partners.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c3.5 2.1 6.5 2.8 8.25 2.8v6.2c0 5.3-3.6 8.9-8.25 10.5-4.65-1.6-8.25-5.2-8.25-10.5v-6.2c1.75 0 4.75-.7 8.25-2.8Z" />
      </svg>
    ),
  },
  {
    title: 'Separate Legal Entity',
    desc: 'An LLP exists as a legal person distinct from its partners — it can own assets, sign contracts, and initiate or defend legal proceedings entirely in its own name.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Perpetual Succession',
    desc: 'The LLP\'s existence is independent of any partner joining, retiring, or passing away. It continues uninterrupted until formally wound up under the LLP Act.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12H3m18 0h-5.25" />
      </svg>
    ),
  },
  {
    title: 'No Minimum Capital',
    desc: 'There is no statutory floor on capital contribution — partners can set up an LLP with a nominal amount and increase contribution later as the business grows.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 4h6m-6 4h4M5 3h10l4 4v14H5V3Z" />
      </svg>
    ),
  },
  {
    title: 'Lower Compliance Cost',
    desc: 'With only two annual MCA filings (Form 11 and Form 8), an LLP\'s recurring compliance burden and cost are noticeably lighter than that of a Pvt Ltd company.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: 'No Mandatory Audit Below Threshold',
    desc: 'An LLP is exempt from a mandatory statutory audit as long as annual turnover stays below ₹40 lakh and total capital contribution stays below ₹25 lakh.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Management',
    desc: 'Internal governance — profit sharing, decision-making, admission and exit of partners — is entirely set by the privately-held LLP Agreement rather than rigid statutory rules.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 12h9.75M10.5 18h9.75M3.75 6h.007v.008H3.75V6Zm0 6h.007v.008H3.75V12Zm0 6h.007v.008H3.75V18Z" />
      </svg>
    ),
  },
  {
    title: 'No Dividend Distribution Tax',
    desc: 'Profit withdrawals by partners are not subject to Dividend Distribution Tax the way company dividends once were — profits are taxed once, at the LLP level.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18Z" />
      </svg>
    ),
  },
];

const eligibilityRows: string[][] = [
  ['Indian Residents', 'Any individual who is 18+ years of age, of sound mind, and not disqualified by law can become a partner or designated partner'],
  ['NRIs', 'Can become partners or designated partners; at least one other designated partner on the LLP must still be a resident of India'],
  ['Foreign Nationals', 'Permitted as partners, but FDI into an LLP is allowed only in sectors where 100% FDI is permitted under the automatic route with no performance-linked conditions attached'],
  ['Corporate Entities', 'A company or another LLP can be admitted as a partner through a nominated individual representative'],
  ['Minimum Partners', '2 (no cap on the maximum number of partners)'],
  ['Minimum Designated Partners', '2 individuals, with at least 1 resident in India'],
  ['DPIN', 'Every designated partner must hold a Designated Partner Identification Number, allotted through the FiLLiP form for first-time applicants'],
  ['DSC', 'Every designated partner requires a Class 3 Digital Signature Certificate to sign incorporation and annual filing forms'],
  ['Registered Office', 'A verifiable address in India capable of receiving statutory notices, supported by ownership/rental proof and an NOC'],
];

const documentRows: string[][] = [
  ['Indian Partners', 'PAN card, Aadhaar card, a recent passport-size photograph, and address proof (bank statement, electricity bill, or mobile bill not older than 2 months)'],
  ['Foreign Partners / NRIs', 'Passport (notarised and apostilled for Hague Convention countries, consularised otherwise) and overseas address proof, with certified English translations where required'],
  ['Corporate Partners', 'Board resolution authorising the investment and nominating a representative, Certificate of Incorporation, and MoA/AoA (or LLP Agreement) of the investing entity'],
  ['Registered Office', 'Latest utility bill (not older than 2 months), rent/lease agreement or ownership deed, and a No Objection Certificate from the property owner'],
  ['DSC & DPIN', 'Class 3 Digital Signature Certificates for all designated partners, plus DPIN applications bundled directly within the FiLLiP incorporation form'],
];

const costRows: string[][] = [
  ['MCA Filing Fee — contribution up to ₹1,00,000', '₹500'],
  ['MCA Filing Fee — ₹1,00,001 to ₹5,00,000', '₹2,000'],
  ['MCA Filing Fee — ₹5,00,001 to ₹10,00,000', '₹4,000'],
  ['MCA Filing Fee — above ₹10,00,000', '₹5,000'],
  ['Name Reservation (RUN-LLP)', '₹200 per application'],
  ['Stamp Duty on LLP Agreement', '₹500 – ₹15,000 (state-specific, see table below)'],
  ['Digital Signature Certificate (DSC)', '₹800 – ₹2,000 per designated partner'],
  ['ComplianceBharo Professional Fee', '₹2,499 (drafting, filing, and end-to-end coordination)'],
];

const stampDutyRows: string[][] = [
  ['Delhi', '₹1,000 – ₹5,000'],
  ['Maharashtra', '₹1,000 – ₹10,000'],
  ['Karnataka', '₹1,000 – ₹5,000'],
  ['Tamil Nadu', '₹500 – ₹5,000'],
  ['Uttar Pradesh', '₹500 – ₹5,000'],
  ['Gujarat', '₹1,000 – ₹5,000'],
  ['West Bengal', '₹500 – ₹5,000'],
  ['Rajasthan', '₹1,000 – ₹5,000'],
  ['Madhya Pradesh', '₹2,000 – ₹7,000'],
  ['Telangana', '₹1,000 – ₹5,000'],
];

const processSteps = [
  { title: 'Obtain Digital Signature Certificates (DSC)', desc: 'Every proposed designated partner gets a Class 3 DSC through video and Aadhaar-based e-KYC, used to digitally sign every subsequent incorporation form.' },
  { title: 'Apply for DPIN via FiLLiP', desc: 'Designated Partner Identification Numbers for up to 2 first-time designated partners are applied for directly within the FiLLiP form, avoiding a separate DPIN application.' },
  { title: 'Reserve the LLP Name (RUN-LLP)', desc: 'Propose up to 2 name options through the RUN-LLP web service. Once approved, the reserved name stays valid for 90 days, within which incorporation must be completed.' },
  { title: 'Draft the LLP Agreement', desc: 'Prepare a customised agreement covering capital contribution, profit sharing, partner roles, and exit provisions — ready to be filed once the LLP is incorporated.' },
  { title: 'File FiLLiP', desc: 'Submit the consolidated incorporation form with details of partners, registered office, and capital contribution, along with KYC documents and the proposed business activity.' },
  { title: 'Receive Certificate of Incorporation & LLPIN', desc: 'Upon RoC approval, a digitally signed Certificate of Incorporation is issued, bearing the LLP\'s unique LLP Identification Number (LLPIN), along with PAN and TAN.' },
  { title: 'File the LLP Agreement in Form 3', desc: 'The executed and stamped LLP Agreement must be filed with the RoC within 30 days of incorporation. Missing this deadline attracts a penalty of ₹100 per day of delay, with no upper cap.' },
  { title: 'Open a Bank Account', desc: 'Use the Certificate of Incorporation, LLP Agreement, and PAN to open a current account in the LLP\'s name and deposit the agreed capital contribution.' },
];

const agreementClauses = [
  'Name of the LLP and the objects/business activity it will carry on',
  'Capital contribution committed by each partner and the mode of contribution',
  'Profit and loss sharing ratio among partners',
  'Rights, duties, and obligations of designated partners versus regular partners',
  'Decision-making procedure — matters requiring simple majority versus unanimous consent',
  'Process for admission of new partners and retirement or expulsion of existing ones',
  'Remuneration or interest payable to partners, if any',
  'Dispute resolution mechanism, typically arbitration',
  'Procedure for winding up and settlement of accounts on dissolution',
  'Non-compete and confidentiality obligations binding on partners',
];

const agreementComparisonRows: string[][] = [
  ['Profit Sharing', 'As per the ratio explicitly agreed and recorded in the LLP Agreement', 'Equal sharing among all partners regardless of capital contributed (default Schedule I rule)'],
  ['Remuneration to Partners', 'Payable if the agreement expressly authorises it, subject to Income Tax Act limits', 'Not payable to any partner — Schedule I does not provide for partner remuneration'],
  ['Interest on Capital', 'Payable at the rate specified in the agreement (commonly capped at 12% p.a. for tax purposes)', 'Not payable — no default entitlement to interest on contribution'],
  ['Admission of a New Partner', 'Governed by whatever process the agreement lays down (majority, unanimous, or otherwise)', 'Requires the consent of all existing partners (default Schedule I rule)'],
  ['Decision-Making on Ordinary Matters', 'Can be customised — simple majority, weighted voting, or partner-specific veto rights', 'Decided by a majority of partners, with each partner having one vote'],
];

const comparisonRows: string[][] = [
  ['Governing Law', 'LLP Act, 2008', 'Companies Act, 2013', 'Indian Partnership Act, 1932', 'No dedicated statute'],
  ['Registration', 'Mandatory with the MCA (FiLLiP)', 'Mandatory with the MCA (SPICe+)', 'Optional (registration recommended but not compulsory)', 'Not required; local licences (GST/Shops & Establishment) suffice'],
  ['Liability', 'Limited to agreed contribution', 'Limited to unpaid share value', 'Unlimited — extends to partners\' personal assets', 'Unlimited — extends to the proprietor\'s personal assets'],
  ['Legal Status', 'Separate legal entity', 'Separate legal entity', 'No separate legal identity from its partners', 'No separate legal identity from the proprietor'],
  ['Taxation', 'Flat 30% plus applicable surcharge and cess (no slab benefit)', '22%–30% depending on regime opted (e.g. Section 115BAA)', 'Flat 30% plus applicable surcharge and cess', 'Individual slab rates applicable to the proprietor'],
  ['Audit Requirement', 'Only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh', 'Statutory audit mandatory regardless of turnover', 'Tax audit only above prescribed turnover limits', 'Tax audit only above prescribed turnover limits'],
  ['Compliance Level', 'Low to moderate — 2 annual MCA forms', 'High — ROC filings, audit, AGM, board meetings', 'Low — mainly tax filings', 'Very low — mainly tax filings'],
  ['FDI', 'Automatic route, but only in sectors with 100% FDI and no performance conditions', '100% automatic route in most sectors', 'Not permitted', 'Not permitted'],
  ['Equity Funding Ability', 'Not possible — no share capital structure', 'Straightforward — preferred by VCs and angel investors', 'Not possible', 'Not possible'],
  ['Best Suited For', 'Professional firms and service businesses valuing lower compliance', 'Startups planning to raise equity and scale rapidly', 'Small, trust-based businesses among known partners', 'Solo, low-risk businesses with a single owner'],
];

const complianceRows: string[][] = [
  ['Form 11 — Annual Return', 'Within 60 days of financial year end (on or before 30 May)', 'Form 11', '₹100 per day of delay, without any upper cap'],
  ['Form 8 — Statement of Account & Solvency', 'On or before 30 October each year', 'Form 8', '₹100 per day of delay, without any upper cap'],
  ['Income Tax Return', '31 July (no audit applicable) / 30 September (audit applicable)', 'ITR-5', 'Late fee under Section 234F, plus interest on any unpaid tax'],
  ['DIR-3 KYC (every designated partner, annually)', 'On or before 30 September each year', 'DIR-3 KYC / web-based e-KYC', '₹5,000 reactivation fee and deactivation of the DPIN until completed'],
  ['Statutory Tax Audit', 'Applicable if annual turnover exceeds ₹40 lakh or capital contribution exceeds ₹25 lakh', 'Form 3CA/3CB-3CD', 'Penalty under Section 271B — lower of 0.5% of turnover or ₹1,50,000'],
  ['GST Returns (if GST-registered)', 'Monthly/quarterly and annual, as applicable to the registration type', 'GSTR-1, GSTR-3B, GSTR-9', 'Late fee and interest as prescribed under the CGST Act'],
];

const prosConsRows: string[][] = [
  ['Limited Liability', 'Partners\' personal assets stay protected beyond their agreed contribution', 'Does not shield partners from liability arising from their own fraud or wrongful acts'],
  ['Separate Legal Entity', 'LLP can independently own assets, contract, and litigate', 'Requires maintaining proper statutory records to preserve this separation in practice'],
  ['Perpetual Succession', 'Business continuity unaffected by partner exits or death', 'Transfer of partnership interest still requires the consent process set out in the agreement'],
  ['Compliance Burden', 'Only 2 mandatory annual MCA filings — lighter than a company', 'Still requires DPIN, DSC renewal, and income tax compliance regardless of activity level'],
  ['Taxation', 'No Dividend Distribution Tax on profit withdrawals by partners', 'Taxed at a flat 30% plus cess/surcharge, with no access to the lower 22%/15% company tax regimes'],
  ['Management Flexibility', 'Internal governance fully customisable via the LLP Agreement', 'Requires a well-drafted agreement upfront — a poorly drafted one can create disputes later'],
  ['Fundraising', 'Straightforward to bring in new partners with fresh capital', 'Cannot issue equity shares, ESOPs, or convertible instruments — unattractive to VCs and angel investors'],
  ['Credibility', 'MCA-registered LLPIN lends more credibility than an unregistered partnership', 'Still perceived as less investor-ready than a Pvt Ltd company by many institutional lenders and funds'],
];

const faqs = [
  { q: 'What are the minimum requirements to register an LLP?', a: 'An LLP needs a minimum of 2 partners and 2 designated partners (who can be the same individuals), at least one designated partner resident in India, a registered office address, and DSC and DPIN for the designated partners. There is no minimum capital requirement.' },
  { q: 'Is there a minimum capital requirement for an LLP?', a: 'No. An LLP can be incorporated with any amount of capital contribution mutually agreed by the partners, including a nominal sum — there is no statutory floor under the LLP Act, 2008.' },
  { q: 'Is an LLP Agreement mandatory?', a: 'Yes. Every LLP must execute an LLP Agreement and file it with the RoC in Form 3 within 30 days of incorporation. If it is not filed, the default rules under Schedule I of the LLP Act automatically apply to govern the partners\' relationship.' },
  { q: 'What documents are needed to register an LLP?', a: 'PAN, Aadhaar, address proof and a photograph for Indian partners; an apostilled/consularised passport and overseas address proof for foreign partners; and a utility bill, rent agreement, and NOC for the registered office.' },
  { q: 'Can NRIs be partners in an Indian LLP?', a: 'Yes, NRIs can become partners or designated partners in an LLP, provided at least one other designated partner is a resident of India and any applicable FDI conditions on the sector are satisfied.' },
  { q: 'What is the difference between a partner and a designated partner?', a: 'A designated partner holds a DPIN, signs statutory filings, and is personally responsible for regulatory compliance. A regular partner contributes capital and shares profits per the LLP Agreement but has no personal compliance obligation to the MCA unless also designated.' },
  { q: 'Can a single person register an LLP?', a: 'No. An LLP structurally requires a minimum of 2 partners at incorporation. A solo founder wanting limited liability with a single owner should consider a One Person Company (OPC) instead.' },
  { q: 'What is FiLLiP?', a: 'FiLLiP (Form for incorporation of Limited Liability Partnership) is the integrated web-based incorporation form on the MCA21 V3 portal that captures partner details, registered office information, DPIN applications, and PAN/TAN allotment in a single filing.' },
  { q: 'How long does LLP registration take?', a: 'A complete, error-free application typically takes 7–10 working days from document submission to the receipt of the Certificate of Incorporation, accounting for DSC issuance, name reservation, and RoC scrutiny.' },
  { q: 'Is a Digital Signature Certificate mandatory for LLP registration?', a: 'Yes. Every designated partner must obtain a Class 3 DSC before incorporation, since all e-forms — including FiLLiP and the subsequent annual filings — must be digitally signed.' },
  { q: 'What happens if the proposed LLP name gets rejected?', a: 'If the RUN-LLP application is rejected for resembling an existing name, trademark, or violating naming guidelines, a fresh application with revised name options must be filed, which may extend the registration timeline by a few days.' },
  { q: 'What ongoing compliance does an LLP need to maintain?', a: 'Every LLP must file Form 11 (Annual Return) within 60 days of the financial year end, Form 8 (Statement of Account and Solvency) by 30 October, an Income Tax Return annually, and DIR-3 KYC for each designated partner by 30 September.' },
  { q: 'What are the consequences of non-compliance for an LLP?', a: 'Late filing of Form 11 or Form 8 attracts a penalty of ₹100 per day with no upper cap, DPINs get deactivated for unfiled DIR-3 KYC, and prolonged non-compliance can lead to the RoC striking the LLP off the register.' },
  { q: 'Can an LLP raise funds from the public or issue shares?', a: 'No. An LLP cannot issue equity shares or raise funds from the public. It can only bring in new partners who contribute capital directly, making it unsuitable for businesses planning to raise institutional or venture capital.' },
  { q: 'What tax benefits does an LLP offer?', a: 'An LLP is not subject to Dividend Distribution Tax on profit withdrawals, and interest and remuneration paid to partners (within prescribed limits) are deductible business expenses, reducing the LLP\'s taxable profit.' },
  { q: 'What does "limited liability" mean for LLP partners?', a: 'It means each partner\'s financial exposure for the LLP\'s debts and obligations is capped at their agreed capital contribution — personal assets beyond that contribution cannot be attached to settle business liabilities, except in cases of fraud.' },
  { q: 'Is GST registration mandatory for an LLP?', a: 'GST registration is mandatory only if the LLP\'s aggregate turnover crosses the prescribed threshold (₹40 lakh for goods, ₹20 lakh for services, lower for special category states) or if it undertakes specific activities like inter-state supply or e-commerce.' },
  { q: 'What is the audit threshold for an LLP?', a: 'A statutory audit becomes mandatory once the LLP\'s annual turnover exceeds ₹40 lakh or its total capital contribution exceeds ₹25 lakh. Below these thresholds, audit is optional.' },
  { q: 'Can an LLP be converted into a Private Limited Company?', a: 'Yes. An LLP can convert into a Pvt Ltd company by following the statutory conversion procedure under the Companies Act, 2013, which involves obtaining partner consent, filing conversion forms, and vesting the LLP\'s assets and liabilities into the new company.' },
  { q: 'What is the difference between LLPIN and DPIN?', a: 'The LLPIN (LLP Identification Number) is the unique identity assigned to the LLP itself upon incorporation, while the DPIN (Designated Partner Identification Number) is a unique identifier assigned to an individual before they can be appointed as a designated partner.' },
  { q: 'How is an LLP different from an OPC?', a: 'An OPC (One Person Company) allows a single individual to run a company-style entity, while an LLP mandatorily requires at least 2 partners. An OPC has a share capital structure and must convert to a Pvt Ltd company beyond certain thresholds; an LLP has no share capital and no such mandatory conversion trigger.' },
  { q: 'Can an LLP be registered with zero paid-up capital?', a: 'Yes, effectively. Since there is no minimum capital requirement, partners can set a nominal contribution amount (even a few thousand rupees) and increase it later as the business requires additional funding.' },
  { q: 'What is the applicable tax rate for an LLP?', a: 'An LLP is taxed at a flat 30% on its total income, plus a surcharge (where applicable) and health and education cess — there is no access to the lower 22%/15% concessional regimes available to companies under Sections 115BAA/115BAB.' },
  { q: 'Can an existing partnership firm convert into an LLP?', a: 'Yes. A registered partnership firm can convert into an LLP by filing Form 17 along with the FiLLiP application, subject to the consent of all partners and settlement of any pending statutory dues of the firm.' },
  { q: 'Do LLP partners need to be Indian citizens?', a: 'No. Partners can be foreign nationals or NRIs, but the LLP must have at least one designated partner who is a resident of India, and foreign investment must comply with applicable FDI sector conditions.' },
  { q: 'What is the validity of the name reserved through RUN-LLP?', a: 'A name approved through RUN-LLP remains reserved for 90 days from the date of approval. The FiLLiP incorporation form must be filed within this window, failing which the name reservation lapses.' },
  { q: 'Does an LLP need to hold an Annual General Meeting?', a: 'No. Unlike a Pvt Ltd company, an LLP is not required to hold an Annual General Meeting or maintain a fixed board meeting schedule — internal meetings and decision-making frequency are governed entirely by the LLP Agreement.' },
  { q: 'Can salaried employees also be partners in an LLP?', a: 'Yes, an individual can be both a salaried employee elsewhere and a partner in an LLP, subject to their employment terms not restricting such involvement and no conflict of interest arising from the arrangement.' },
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

export default function LLPClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="LLP Registration" />

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
                  Trusted by 10,000+ Professionals and Businesses
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  LLP Registration<br />
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Online in India</span>
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Get Expert Assistance for LLP Registration in <span className="font-bold text-brand-orange">7 to 10 Working Days</span> with Complete FiLLiP Filing Support @ <span className="font-bold text-brand-orange">₹1,999</span> Professional Fee
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  ₹1,999 is ComplianceBharo professional fee for end-to-end assistance. Government fees charged separately at actuals. 100% Digital Process. Custom LLP Agreement Included.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {[
                      "Certificate of Incorporation with LLPIN",
                      "Custom LLP Agreement Drafting",
                      "Class 3 DSC for All Partners",
                      "GST Registration Support",
                      "LLP PAN and TAN",
                      "DPIN Allotment for Designated Partners",
                      "Bank Account Opening Assistance",
                      "Post-Incorporation Compliance Guidance"
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
              <LeadForm serviceName={"LLP Registration"} dm={isDarkMode} />
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
                LLP Registration Package 2026
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
                  "Certificate of Incorporation (LLPIN)",
                  "Digital Signature Certificate (DSC)",
                  "Designated Partner ID Number (DPIN)",
                  "Custom LLP Agreement Drafting",
                  "LLP PAN and TAN",
                  "FiLLiP Form Filing on MCA Portal",
                  "Complete Documentation Support",
                  "Bank Account Opening Assistance",
                  "GST Registration Assistance",
                  "Post-Incorporation Compliance Setup"
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is an LLP (Limited Liability Partnership)?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                A Limited Liability Partnership is a hybrid business structure created under the <strong className={dm ? 'text-white' : 'text-slate-900'}>Limited Liability Partnership Act, 2008</strong>. It combines the operational flexibility of a traditional partnership with the liability protection normally associated with a company. Once registered, the LLP exists as a <strong className={dm ? 'text-white' : 'text-slate-900'}>separate legal entity</strong> — distinct from the individuals who own and manage it — capable of holding assets, entering contracts, and being sued or suing in its own name.
              </p>
              <p>
                An LLP needs a minimum of <strong className={dm ? 'text-white' : 'text-slate-900'}>2 partners</strong>, with no cap on the maximum, and at least <strong className={dm ? 'text-white' : 'text-slate-900'}>2 designated partners</strong> — the individuals who take on personal responsibility for regulatory compliance. At least one designated partner must be a resident of India, meaning they stayed in the country for 182 days or more during the immediately preceding calendar year. There is no minimum capital contribution required to incorporate.
              </p>
              <p>
                Registration is completed entirely online through <strong className={dm ? 'text-white' : 'text-slate-900'}>FiLLiP (Form for Incorporation of LLP)</strong> on the MCA21 V3 portal, and a complete, error-free filing is typically processed within <strong className={dm ? 'text-white' : 'text-slate-900'}>7–10 working days</strong>. On approval, the Registrar of Companies issues a Certificate of Incorporation carrying the LLP&apos;s unique LLPIN, along with PAN and TAN.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Types of Partners */}
          <div id="partners" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Designated Partners vs Partners</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              An LLP recognises three distinct participant roles, each with a different compliance footprint and set of responsibilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {partnerTypes.map((p) => (
                <div key={p.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-base font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of an LLP</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`flex gap-3 items-start rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                    {f.icon}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Register an LLP?</h2>
            <DataTable headers={['Category', 'Requirement']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 5. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for LLP Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Keep the following categories of documents ready before starting your FiLLiP filing.
            </p>
            <DataTable headers={['Category', 'Documents Required']} rows={documentRows} dm={dm} />
          </div>

          {/* 6. Cost 2026 */}
          <div id="cost" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>LLP Registration Cost in India 2026</h2>
            <DataTable headers={['Cost Head', 'Approximate Amount']} rows={costRows} dm={dm} />

            <h3 className={`text-lg font-bold mt-8 mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>State-Wise Stamp Duty on the LLP Agreement</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Stamp duty on the LLP Agreement is levied under each state&apos;s own Stamp Act and varies with the capital contribution declared. Indicative ranges for commonly registered states are below.
            </p>
            <DataTable headers={['State', 'Approx. Stamp Duty Range']} rows={stampDutyRows} dm={dm} />
            <p className={`text-xs leading-relaxed mt-3 ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
              *Indicative ranges for standard contribution slabs. Exact stamp duty depends on your state&apos;s Stamp Act, declared capital contribution, and periodic rate revisions — we compute and disclose the precise amount applicable before filing.
            </p>
          </div>

          {/* 7. Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Step-by-Step LLP Registration Process</h2>
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

          {/* 8. LLP Agreement */}
          <div id="agreement" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What the LLP Agreement Should Cover</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The LLP Agreement is the private rulebook that governs how partners work together. A well-drafted agreement should address:
            </p>
            <div className={`p-6 rounded-2xl border mb-8 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {agreementClauses.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>With a Filed Agreement vs Without One</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              If an LLP never executes and files its own agreement, the default rules under <strong className={dm ? 'text-white' : 'text-slate-900'}>Schedule I of the LLP Act, 2008</strong> apply automatically — and they rarely match what founders actually intend.
            </p>
            <DataTable headers={['Aspect', 'With a Custom Filed Agreement', 'Without a Filed Agreement (Schedule I Default)']} rows={agreementComparisonRows} dm={dm} />
          </div>

          {/* 9. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>LLP vs Pvt Ltd vs Partnership vs Sole Proprietorship</h2>
            <DataTable headers={['Parameter', 'LLP', 'Private Limited Company', 'Partnership Firm', 'Sole Proprietorship']} rows={comparisonRows} dm={dm} />
          </div>

          {/* 10. Compliance */}
          <div id="compliance" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Annual Compliance Requirements for LLPs</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Registration is only the first step — an LLP carries recurring statutory obligations every year, regardless of whether it is actively trading.
            </p>
            <DataTable headers={['Compliance', 'Deadline', 'Form', 'Penalty for Default']} rows={complianceRows} dm={dm} />
          </div>

          {/* 11. Pros & Cons */}
          <div id="proscons" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Advantages and Disadvantages of an LLP</h2>
            <DataTable headers={['Aspect', 'Advantage', 'Disadvantage']} rows={prosConsRows} dm={dm} />
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
                Have questions about LLP registration? Let our experts help you figure out the best structure for your business.
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
          serviceName="LLP Registration"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
