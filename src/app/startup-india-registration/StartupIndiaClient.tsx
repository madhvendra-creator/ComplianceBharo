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
  { id: 'benefits', label: 'Key Benefits' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'entities', label: 'Entity Types' },
  { id: 'documents', label: 'Documents' },
  { id: 'process', label: 'Process' },
  { id: 'tax', label: 'Tax Exemptions' },
  { id: 'ipr', label: 'IPR Benefits' },
  { id: 'funding', label: 'Funding Support' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'postrecognition', label: 'After Recognition' },
  { id: 'proscons', label: 'Pros & Cons' },
  { id: 'faq', label: "FAQ's" },
];

const plans = [
  {
    name: 'Starter',
    price: 999,
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'DPIIT Portal Account Setup', included: true },
      { name: 'Business Description Drafting', included: true },
      { name: 'Application Filing on Portal', included: true },
      { name: 'Certificate Download & Delivery', included: true },
      { name: 'DPIIT Recognition Number', included: true },
      { name: 'Email Support (48hr response)', included: true },
      { name: '80-IAC Tax Exemption Advisory', included: false },
      { name: 'Patent Fee Rebate Advisory', included: false },
      { name: 'Tender Preference Documentation', included: false },
      { name: 'SIDBI Fund of Funds Check', included: false },
      { name: '1-Year Compliance Advisory', included: false },
      { name: 'Dedicated Startup Consultant', included: false },
      { name: 'IP Strategy Report', included: false },
      { name: 'Angel Tax Exemption (Sec 56(2))', included: false },
      { name: 'ESOP Policy Drafting', included: false },
      { name: 'Term Sheet Review', included: false },
      { name: 'Investor Pitch Deck Review', included: false },
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
      { name: 'DPIIT Portal Account Setup', included: true },
      { name: 'Business Description Drafting', included: true },
      { name: 'Application Filing on Portal', included: true },
      { name: 'Certificate Download & Delivery', included: true },
      { name: 'DPIIT Recognition Number', included: true },
      { name: 'Email Support (48hr response)', included: true },
      { name: '80-IAC Tax Exemption Advisory', included: true },
      { name: 'Patent Fee Rebate Advisory', included: true },
      { name: 'Tender Preference Documentation', included: true },
      { name: 'SIDBI Fund of Funds Check', included: true },
      { name: '1-Year Compliance Advisory', included: true },
      { name: 'Dedicated Startup Consultant', included: true },
      { name: 'IP Strategy Report', included: false },
      { name: 'Angel Tax Exemption (Sec 56(2))', included: false },
      { name: 'ESOP Policy Drafting', included: false },
      { name: 'Term Sheet Review', included: false },
      { name: 'Investor Pitch Deck Review', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 2999,
    iconColor: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
    ),
    popular: false,
    features: [
      { name: 'DPIIT Portal Account Setup', included: true },
      { name: 'Business Description Drafting', included: true },
      { name: 'Application Filing on Portal', included: true },
      { name: 'Certificate Download & Delivery', included: true },
      { name: 'DPIIT Recognition Number', included: true },
      { name: 'Email Support (48hr response)', included: true },
      { name: '80-IAC Tax Exemption Advisory', included: true },
      { name: 'Patent Fee Rebate Advisory', included: true },
      { name: 'Tender Preference Documentation', included: true },
      { name: 'SIDBI Fund of Funds Check', included: true },
      { name: '1-Year Compliance Advisory', included: true },
      { name: 'Dedicated Startup Consultant', included: true },
      { name: 'IP Strategy Report', included: true },
      { name: 'Angel Tax Exemption (Sec 56(2))', included: true },
      { name: 'ESOP Policy Drafting', included: true },
      { name: 'Term Sheet Review', included: true },
      { name: 'Investor Pitch Deck Review', included: true },
    ],
  },
];

const overviewFacts: [string, string][] = [
  ['Governing Body', 'Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry'],
  ['Portal', 'startupindia.gov.in'],
  ['Eligible Entities', 'Private Limited Company, LLP, or Registered Partnership Firm'],
  ['Recognition Validity', '10 years from the date of incorporation, or until annual turnover crosses ₹100 crore in any financial year — whichever occurs first'],
  ['Government Fee', 'Free (₹0)'],
  ['Processing Time', 'Typically 2–5 working days for DPIIT review, once a complete application is submitted'],
];

const benefits = [
  {
    title: '3-Year Income Tax Holiday',
    ref: 'Section 80-IAC',
    desc: 'Eligible startups can claim a 100% profit-linked income tax deduction for any 3 consecutive financial years out of their first 10 years since incorporation, once a separate approval is obtained.',
  },
  {
    title: 'Angel Tax Exemption',
    ref: 'Section 56(2)(viib) · up to ₹25 crore',
    desc: 'Share premium received from investors above fair market value is exempt from being taxed as "income from other sources," provided the startup\'s aggregate paid-up capital and share premium stays within ₹25 crore.',
  },
  {
    title: 'Self-Certification for Labour & Environmental Laws',
    desc: 'Recognised startups can self-certify compliance under 6 labour laws and 3 environmental laws, reducing the burden of routine physical inspections during the startup\'s early years.',
  },
  {
    title: '80% Patent Fee Rebate',
    desc: 'Patent applications filed by a DPIIT-recognised startup are eligible for an 80% rebate on the official government filing fee, along with fast-track examination to shorten grant timelines.',
  },
  {
    title: '50% Trademark Fee Rebate',
    desc: 'Trademark applications filed by a recognised startup receive a 50% rebate on the government filing fee, along with access to an empanelled facilitator network for drafting and filing support.',
  },
  {
    title: 'Public Procurement Relaxation',
    desc: 'Many government tenders waive the prior turnover and prior experience criteria for DPIIT-recognised startups, opening the door to bid on contracts that would otherwise be out of reach for a young company.',
  },
  {
    title: 'Fund of Funds Access',
    ref: '₹10,000 crore corpus via SIDBI/AIFs',
    desc: 'The government-backed Fund of Funds for Startups routes capital through SEBI-registered Alternative Investment Funds, which in turn invest in the equity of eligible startups.',
  },
  {
    title: 'Fast-Track Winding Up',
    ref: '90 days under the IBC',
    desc: 'A recognised startup with a simple debt structure can be wound up in as little as 90 days under the Insolvency and Bankruptcy Code\'s fast-track process, versus the longer timelines that apply to other companies.',
  },
  {
    title: 'Seed Fund Scheme Access',
    ref: 'Startup India Seed Fund Scheme (SISFS)',
    desc: 'Early-stage startups can apply for seed capital of up to ₹50 lakh, disbursed through DPIIT-approved incubators to fund proof of concept, prototype development, and early market entry.',
  },
  {
    title: 'Credit Guarantee for Collateral-Free Loans',
    desc: 'Under the Credit Guarantee Scheme for Startups, recognised startups can access loans without pledging collateral, since the government guarantee backs the lender against default risk.',
  },
];

const eligibilityChecklist = [
  'Incorporated as a Private Limited Company, LLP, or Registered Partnership Firm (sole proprietorships are not eligible)',
  'The entity is less than 10 years old, calculated from the date of incorporation',
  'Annual turnover has not exceeded ₹100 crore in any financial year since incorporation',
  'The entity is working towards innovation, development, or improvement of products, processes, or services, or has a scalable business model with high potential for employment generation or wealth creation',
  'The entity has not been formed by splitting up or reconstructing an already existing business',
];

const entityTypes = [
  { title: 'Private Limited Company', desc: 'The most common structure for DPIIT-recognised startups, incorporated under the Companies Act, 2013 via SPICe+, offering limited liability and straightforward equity fundraising.' },
  { title: 'Limited Liability Partnership (LLP)', desc: 'Registered under the LLP Act, 2008, an LLP can apply for DPIIT recognition just like a company, though its lack of a share capital structure makes later equity fundraising more complex.' },
  { title: 'Registered Partnership Firm', desc: 'A partnership firm registered with the Registrar of Firms under the Indian Partnership Act, 1932 is also eligible — but an unregistered partnership firm is not.' },
  { title: 'One Person Company (OPC)', desc: 'An OPC qualifies as a subset of the Private Limited Company category and can apply for DPIIT recognition on the same basis as any other Pvt Ltd company.' },
];

const excludedEntities = [
  'Sole Proprietorships — since they have no separate legal registration under the Companies Act or LLP Act',
  'Hindu Undivided Families (HUFs) — not recognised as an eligible business entity under the scheme',
  'Unregistered joint ventures or informal business arrangements without a formal incorporation or registration certificate',
];

const documentRows: string[][] = [
  ['Entity Documents', 'Certificate of Incorporation (Pvt Ltd/OPC), LLP Registration Certificate, or Registered Partnership Deed, along with the entity\'s PAN card'],
  ['Director / Partner Details', 'Full name, designation, a recent photograph, mobile number, and email address for each director or partner'],
  ['Proof of Concept', 'A working website URL, mobile app link, pitch deck, or a short video demonstrating the product, service, or business model'],
  ['IPR Details (if any)', 'Patent or trademark application numbers, where the startup has already filed for intellectual property protection — optional, but strengthens the application'],
  ['Authorised Representative Details', 'Contact details of the individual authorised to correspond with DPIIT on the entity\'s behalf during application review'],
];

const processSteps = [
  { title: 'Incorporate the Entity', desc: 'If not already done, first register your business as a Private Limited Company, LLP, or Registered Partnership Firm — DPIIT recognition cannot be applied for before incorporation.' },
  { title: 'Register on the Startup India Portal', desc: 'Create an account on startupindia.gov.in using the entity\'s details, which becomes the profile through which the DPIIT recognition application is filed and tracked.' },
  { title: 'Prepare Supporting Documents', desc: 'Gather the Certificate of Incorporation, entity PAN, director/partner details, and a proof of concept — typically a website, app, or pitch deck.' },
  { title: 'Fill the DPIIT Recognition Application', desc: 'Complete the application form on the portal, including a clear write-up explaining the innovative or scalable nature of the business.' },
  { title: 'Upload Documents & Submit', desc: 'Attach all supporting documents to the application and submit it for DPIIT review through the portal.' },
  { title: 'DPIIT Review', desc: 'DPIIT examines the application against the eligibility criteria — this typically takes 2–5 working days for a complete, well-drafted submission, though DPIIT may seek clarifications for ambiguous applications.' },
  { title: 'Receive the Certificate of Recognition', desc: 'Once approved, DPIIT issues a digital Certificate of Recognition along with a unique Startup Recognition Number, which is used to apply for the various tax and IPR benefits described below.' },
];

const taxSummaryRows: string[][] = [
  ['Section 80-IAC', '100% deduction on profits for any 3 consecutive years out of the first 10 years since incorporation', 'Separate application to the Inter-Ministerial Board (IMB) after DPIIT recognition — not automatic'],
  ['Section 56(2)(viib)', 'Exemption from Angel Tax on share premium received above fair market value, up to an aggregate paid-up capital and premium of ₹25 crore', 'Declaration filed in Form 2 with DPIIT/CBDT, along with conditions on the nature of investors and use of funds'],
  ['Section 54GB', 'Capital gains tax exemption where proceeds from selling a residential property are invested in the equity shares of an eligible startup', 'Investment must be made in a DPIIT-recognised startup within the prescribed time limit, and shares must be held for a minimum period'],
  ['Section 79', 'Relaxation from the general rule disallowing carry-forward of business losses when there is a substantial change in shareholding', 'Applies automatically to eligible startups meeting the conditions prescribed under the section, easing the impact of dilution on accumulated losses'],
];

const iprBenefits = [
  { title: 'Patents', desc: 'DPIIT-recognised startups get an 80% rebate on the government filing fee for patent applications, along with fast-track examination that shortens the typical wait for a first response from the patent office.' },
  { title: 'Trademarks', desc: 'A 50% rebate applies to the government filing fee for trademark applications, and startups can access an empanelled panel of facilitators for drafting and filing assistance at concessional professional rates.' },
  { title: 'Design Registration', desc: 'Startups filing for design registration under the Designs Act, 2000 are also eligible for a fee rebate similar in spirit to the patent and trademark rebates, reducing the cost of protecting product aesthetics.' },
  { title: 'Copyright Guidance', desc: 'While copyright registration itself is not part of the formal rebate scheme, DPIIT-recognised software and content startups can access facilitator guidance to correctly document and register copyright in code, content, and creative work.' },
];

const fundingMechanisms = [
  { title: 'Startup India Seed Fund Scheme (SISFS)', desc: 'Provides seed capital of up to ₹50 lakh to early-stage startups, disbursed through DPIIT-approved incubators. Applicant startups are generally expected to be under 2 years old at the time of application.' },
  { title: 'Fund of Funds for Startups (FFS)', desc: 'A ₹10,000 crore corpus managed by SIDBI, which does not invest directly in startups but is deployed through SEBI-registered Alternative Investment Funds (AIFs) that in turn make equity investments.' },
  { title: 'Credit Guarantee Scheme for Startups (CGSS)', desc: 'Enables eligible startups to raise collateral-free loans of up to ₹10 crore from member lending institutions, with the government guarantee covering the lender\'s default risk.' },
  { title: 'General SIDBI Support Programs', desc: 'SIDBI runs additional startup-focused refinancing and venture debt programs alongside the Fund of Funds, aimed at improving credit access for MSMEs and startups more broadly.' },
];

const comparisonRows: string[][] = [
  ['Governing Authority', 'DPIIT, Ministry of Commerce and Industry', 'Ministry of MSME', 'Ministry of Corporate Affairs (MCA)', 'GST Council / CBIC'],
  ['Purpose', 'Recognises innovative, scalable businesses for tax and IPR incentives', 'Recognises micro, small, and medium enterprises for credit and procurement support', 'Grants legal existence to a company or LLP as a distinct entity', 'Registers a business as a taxpayer under the Goods and Services Tax regime'],
  ['Eligibility Focus', 'Innovation, scalability, age (under 10 years), turnover (under ₹100 crore)', 'Investment in plant/machinery or equipment, and annual turnover slabs', 'Meeting the structural requirements of the Companies Act, 2013 or LLP Act, 2008', 'Turnover crossing the GST threshold, or voluntary registration for input tax credit'],
  ['Key Benefits', 'Tax holidays, angel tax exemption, IPR rebates, procurement relaxation, funding access', 'Priority-sector lending, delayed-payment protection, tender preference', 'Limited liability, separate legal identity, ability to raise equity', 'Legal authority to collect GST and claim input tax credit'],
  ['Tax Exemption', 'Yes — Section 80-IAC (3-year holiday) and Section 56(2)(viib) (angel tax)', 'No direct income tax exemption tied to Udyam itself', 'Depends on the tax regime opted (e.g., Section 115BAA for companies)', 'Not applicable — GST is a tax collection mechanism, not an exemption scheme'],
  ['Self-Certification', 'Yes — for 6 labour laws and 3 environmental laws', 'Not applicable', 'Not applicable', 'Not applicable'],
  ['Government Fee', 'Free', 'Free', 'MCA filing fee applies (varies by capital slab)', 'Free'],
  ['Validity', '10 years from incorporation, or until turnover crosses ₹100 crore', 'No fixed expiry, subject to periodic re-classification based on investment/turnover', 'Perpetual, until the entity is wound up or struck off', 'Perpetual, until cancelled or surrendered'],
  ['Can Be Combined With Others?', 'Yes — a DPIIT-recognised startup can also hold Udyam, GST, and its MCA/LLP registration simultaneously', 'Yes — commonly held alongside DPIIT recognition and GST registration', 'Yes — company/LLP registration is usually the very first step before Udyam, GST, or DPIIT recognition', 'Yes — GST registration is independent of, and can be layered on top of, DPIIT and Udyam status'],
];

const postRecognitionSteps = [
  'Apply separately for the Section 80-IAC tax exemption through the Inter-Ministerial Board (IMB) — DPIIT recognition alone does not grant this benefit automatically',
  'File the Angel Tax exemption declaration in Form 2 before closing any funding round involving share premium above fair market value',
  'Use the 80% patent and 50% trademark fee rebates when filing IPR applications for your products, brand, or technology',
  'Connect with a DPIIT-approved incubator to apply for the Startup India Seed Fund Scheme, if your startup is within the eligible age window',
  'Register on the Government e-Marketplace (GeM) to access public procurement opportunities with relaxed eligibility criteria',
  'Continue all normal entity-level compliance — AOC-4 and MGT-7A/MGT-7 for a Pvt Ltd company, Form 11 and Form 8 for an LLP, annual Income Tax Returns, applicable GST returns, and DIR-3 KYC for directors — since DPIIT recognition does not waive any of these obligations',
];

const prosConsRows: string[][] = [
  ['Tax Benefits', 'Up to 100% profit exemption for 3 consecutive years under Section 80-IAC', 'Requires a separate, additional application to the Inter-Ministerial Board — not granted automatically with DPIIT recognition'],
  ['Angel Tax Relief', 'Removes tax exposure on share premium raised above fair market value', 'Capped at ₹25 crore aggregate paid-up capital and premium, with conditions on investor category'],
  ['IPR Rebates', '80% off patent fees and 50% off trademark fees, plus fast-track examination', 'Rebate applies only to the government filing fee, not to attorney or facilitator professional fees'],
  ['Compliance Relief', 'Self-certification reduces routine inspections under 6 labour and 3 environmental laws', 'Self-certification is a declaration of compliance, not an exemption from the underlying legal obligations themselves'],
  ['Government Procurement', 'Relaxed prior turnover and experience criteria on many tenders', 'Technical qualification and quality/output standards for the tendered work still apply in full'],
  ['Funding Access', 'Visibility into the Seed Fund Scheme, Fund of Funds, and Credit Guarantee Scheme', 'Capital is routed through incubators and AIFs rather than disbursed directly by the government, and is not guaranteed'],
  ['Credibility', 'The DPIIT badge signals legitimacy to investors, customers, and partners', 'Recognition alone does not guarantee investment interest or commercial success'],
  ['Easy Exit', 'Fast-track winding up in as little as 90 days under the IBC', 'Only realistic for startups with simple, uncontested debt structures — complex creditor disputes still take longer'],
];

const faqs = [
  { q: 'What is Startup India?', a: 'Startup India is a flagship initiative launched by the Government of India in January 2016 to build a supportive ecosystem for innovation and entrepreneurship, offering tax benefits, easier compliance, and funding access to recognised startups.' },
  { q: 'What is DPIIT recognition?', a: 'DPIIT recognition is the official "Startup" status granted by the Department for Promotion of Industry and Internal Trade to eligible entities under the Startup India initiative, unlocking tax exemptions, IPR fee rebates, and procurement relaxations.' },
  { q: 'Is DPIIT recognition mandatory to run a startup?', a: 'No. DPIIT recognition is entirely optional — a business can operate without it. It only becomes necessary if you want to access the specific tax, IPR, and funding benefits tied to Startup India recognition.' },
  { q: 'What are the eligibility criteria for DPIIT recognition?', a: 'The entity must be a Private Limited Company, LLP, or Registered Partnership Firm, under 10 years old from incorporation, with turnover under ₹100 crore in any financial year, and working towards innovation or a scalable business model — see our Eligibility section above for the full checklist.' },
  { q: 'How long does DPIIT recognition take to process?', a: 'DPIIT typically reviews a complete, well-documented application within 2–5 working days, though incomplete or vaguely worded applications can take longer as DPIIT seeks clarifications.' },
  { q: 'What documents are needed to apply?', a: 'You need the Certificate of Incorporation or registration certificate, entity PAN, director/partner details, and a proof of concept such as a website, pitch deck, or demo video — see our Documents section for the complete list.' },
  { q: 'Can an existing, already-operating company apply for DPIIT recognition?', a: 'Yes, as long as it is within 10 years of incorporation and its turnover has never exceeded ₹100 crore in any financial year — the 10-year window is measured from the date of incorporation, not from the date of application.' },
  { q: 'Can an OPC apply for DPIIT recognition?', a: 'Yes. A One Person Company qualifies as a subset of the Private Limited Company category and can apply for DPIIT recognition on the same basis as any other Pvt Ltd company.' },
  { q: 'What is Section 80-IAC?', a: 'Section 80-IAC of the Income Tax Act allows an eligible DPIIT-recognised startup to claim a 100% deduction on profits for any 3 consecutive financial years out of its first 10 years since incorporation.' },
  { q: 'How do I apply for the 80-IAC tax exemption?', a: 'After obtaining DPIIT recognition, you must separately apply to the Inter-Ministerial Board (IMB) with your business plan, financials, and evidence of innovation — this is a distinct approval, not granted automatically alongside DPIIT recognition.' },
  { q: 'What is Angel Tax exemption?', a: 'Angel Tax refers to Section 56(2)(viib) of the Income Tax Act, which treats share premium received above fair market value as taxable income. DPIIT-recognised startups meeting the prescribed conditions can file Form 2 to be exempted from this tax, subject to an aggregate cap of ₹25 crore in paid-up capital and premium.' },
  { q: 'What is the Startup India Seed Fund Scheme?', a: 'The Startup India Seed Fund Scheme (SISFS) provides seed capital of up to ₹50 lakh to early-stage startups, disbursed through DPIIT-approved incubators, generally aimed at startups under 2 years old that need funding for proof of concept or prototype development.' },
  { q: 'Are NRIs or foreign nationals eligible to be part of a DPIIT-recognised startup?', a: 'Yes, NRIs and foreign nationals can be directors, partners, or shareholders in an eligible entity, as long as the entity itself is registered in India as a Private Limited Company, LLP, or Registered Partnership Firm and otherwise satisfies the eligibility criteria.' },
  { q: 'Is there a government fee for DPIIT recognition?', a: 'No. DPIIT recognition is entirely free of any government fee — you only need to pay a professional fee if you engage a service provider like ComplianceBharo to prepare and file the application on your behalf.' },
  { q: 'How long is DPIIT recognition valid?', a: 'Recognition remains valid for 10 years from the date of incorporation, or until the entity\'s turnover crosses ₹100 crore in any financial year — whichever happens first.' },
  { q: 'Can I apply without having a website?', a: 'Yes, a website is not strictly mandatory — a pitch deck, mobile app link, or demo video can serve as an alternative proof of concept demonstrating your product or business model.' },
  { q: 'What happens if my application is rejected?', a: 'A rejected application can be revised and resubmitted with a clearer explanation of the business\'s innovative or scalable nature and stronger supporting documentation — there is no permanent bar on reapplying.' },
  { q: 'What does self-certification mean in this context?', a: 'Self-certification allows a recognised startup to declare its own compliance under 6 specified labour laws and 3 environmental laws instead of undergoing routine physical inspections, reducing early-stage regulatory friction — though the underlying legal obligations still apply in full.' },
  { q: 'What government tender benefits does DPIIT recognition offer?', a: 'Many government tenders relax the prior turnover and prior experience eligibility criteria for DPIIT-recognised startups, though the technical qualification and quality standards for the tendered work still need to be met.' },
  { q: 'What is the Startup India Hub?', a: 'The Startup India Hub is an online platform on startupindia.gov.in that connects recognised startups with incubators, mentors, investors, government schemes, and learning resources, alongside hosting the DPIIT recognition application itself.' },
  { q: 'Can a sole proprietorship get DPIIT recognition?', a: 'No. Sole proprietorships are explicitly excluded from DPIIT recognition — only a Private Limited Company, LLP, or Registered Partnership Firm can apply.' },
  { q: 'What is the Fund of Funds for Startups?', a: 'The Fund of Funds for Startups is a ₹10,000 crore corpus managed by SIDBI that does not invest directly in individual startups, but is deployed through SEBI-registered Alternative Investment Funds, which then make equity investments in eligible startups.' },
  { q: 'Is having a patent mandatory to get DPIIT recognition?', a: 'No. Holding a patent or trademark is not a prerequisite for DPIIT recognition — it is optional supporting evidence that can strengthen an application, but innovation can also be demonstrated through a clear business description, pitch deck, or working product.' },
  { q: 'How much rebate is available on patent filing fees?', a: 'DPIIT-recognised startups receive an 80% rebate on the government filing fee for patent applications, along with fast-track examination to reduce the typical waiting period.' },
  { q: 'How much rebate is available on trademark filing fees?', a: 'DPIIT-recognised startups receive a 50% rebate on the government filing fee for trademark applications, in addition to access to an empanelled facilitator network.' },
  { q: 'Does DPIIT recognition affect FDI eligibility?', a: 'DPIIT recognition itself does not change FDI rules — foreign investment into the recognised entity still follows the same FEMA and sectoral FDI policy conditions that would apply to any similar Indian company or LLP.' },
  { q: 'What is the Insolvency and Bankruptcy Code fast-exit benefit?', a: 'Recognised startups with simple debt structures can be wound up within roughly 90 days under a fast-track insolvency resolution process, significantly quicker than the standard timelines applicable to other companies under the IBC.' },
  { q: 'How is DPIIT recognition different from MSME/Udyam registration?', a: 'DPIIT recognition focuses on innovation, scalability, and age/turnover thresholds to unlock tax and IPR benefits, while Udyam registration classifies a business by its investment and turnover to unlock MSME-specific credit and procurement support — see our Comparison section for a full side-by-side view.' },
  { q: 'Is an e-commerce business eligible for DPIIT recognition?', a: 'Yes, an e-commerce business can qualify for DPIIT recognition as long as it meets the standard eligibility criteria, including demonstrating innovation, scalability, or a differentiated business model rather than being a plain resale operation.' },
  { q: 'What should I do after receiving DPIIT recognition?', a: 'You should separately apply for Section 80-IAC tax exemption, file the Angel Tax exemption declaration before raising funds, use the IPR fee rebates, connect with incubators for seed funding, and continue all your normal entity compliance obligations — see our Post-Recognition Checklist above.' },
  { q: 'Is there a minimum capital requirement for DPIIT recognition?', a: 'No. DPIIT recognition has no minimum capital requirement of its own — whatever capital requirement applies is purely a function of the underlying entity type (Pvt Ltd, LLP, or Partnership Firm) you have chosen.' },
  { q: 'Can foreign directors be part of a DPIIT-recognised startup?', a: 'Yes, foreign directors or partners can be part of an eligible entity, provided the entity itself is registered in India and otherwise meets the DPIIT eligibility criteria.' },
  { q: 'What is the Startup India Learning Program?', a: 'It is a free, government-run online learning resource on the Startup India portal covering topics like fundraising, legal compliance, and business planning, available to any registered user regardless of DPIIT recognition status.' },
  { q: 'How can I track my DPIIT application status?', a: 'You can log into your Startup India portal account and check the real-time status of your recognition application under your registered profile.' },
  { q: 'Can I apply for multiple benefits at once?', a: 'Yes, once DPIIT-recognised, you can pursue the 80-IAC tax exemption, Angel Tax exemption, IPR rebates, and Seed Fund applications in parallel — each is a separate process with its own documentation, but none are mutually exclusive.' },
  { q: 'What is the Credit Guarantee Scheme for Startups?', a: 'It is a scheme that enables eligible DPIIT-recognised startups to raise collateral-free loans of up to ₹10 crore from participating lending institutions, with the government guarantee protecting the lender against default.' },
  { q: 'How do I prove "innovation" in my application?', a: 'A strong application typically explains what specific problem the product or service solves, how it differs from existing alternatives in the market, and why the business model is scalable — supported by a working demo, pitch deck, or documented traction where available.' },
  { q: 'Are IT services companies eligible for DPIIT recognition?', a: 'Yes, IT services companies can qualify, provided they can demonstrate genuine innovation, process improvement, or a scalable delivery model rather than describing themselves as a purely generic services provider.' },
  { q: 'What is the difference between Startup India and Stand-Up India?', a: 'Startup India focuses on recognising innovative, scalable businesses for tax and IPR benefits regardless of the promoter\'s background, while Stand-Up India is a lending scheme specifically aimed at facilitating bank loans between ₹10 lakh and ₹1 crore for women entrepreneurs and SC/ST entrepreneurs setting up greenfield enterprises.' },
  { q: 'Can DPIIT recognition be transferred if the business changes hands?', a: 'Recognition is tied to the specific legal entity, not to any individual promoter — as long as the entity itself continues to exist and meet the eligibility criteria, recognition remains valid even if shareholding or partnership composition changes.' },
  { q: 'Does DPIIT recognition remove the need for regular compliance filings?', a: 'No. DPIIT recognition does not waive any of the entity\'s normal statutory obligations — AOC-4/MGT-7A filings for a Pvt Ltd company, Form 11/Form 8 for an LLP, income tax returns, applicable GST returns, and DIR-3 KYC must all continue as usual.' },
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

export default function StartupIndiaClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="Startup India" />

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
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  5,000+ Startups Assisted | 250+ Expert Professional | 4.9/5 Client Rating
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  Startup India Registration <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Online</span> <br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Get Expert Assistance for DPIIT Recognition and Tax Benefits in <span className="font-bold text-brand-orange">3 Working Days</span> Professional Fee from <span className="font-bold text-brand-orange">₹1,999</span>
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Government Portal Fee: ₹0. Section 80-IAC Tax Holiday. 80% Patent Rebate. GeM Procurement Access. Self-Certification for 12 Laws.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {[
                      "DPIIT Recognition Certificate with Startup Recognition Number",
                      "Section 80-IAC Tax Holiday Guidance (3 Years Out of 10)",
                      "80% Patent Fee Rebate and 50% Trademark Discount Access",
                      "Self-Certification for 9 Labour and 3 Environmental Laws",
                      "Government e-Marketplace (GeM) Procurement Registration",
                      "Seed Fund and CGSS Eligibility Support",
                      "Innovation Narrative and Proof of Concept Drafting",
                      "Post-Recognition Compliance Guidance"
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
              <LeadForm serviceName={"Startup India / DPIIT Registration"} dm={isDarkMode} />
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
                Startup India Registration Package 2026
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
                  "DPIIT Recognition Certificate",
                  "Eligibility Assessment and Verification",
                  "Innovation Narrative and PoC Drafting",
                  "Complete Portal Filing on startupindia.gov.in",
                  "Section 80-IAC Tax Holiday Application Guidance",
                  "GeM Registration Support",
                  "Seed Fund and CGSS Eligibility Guidance",
                  "IPR Rebate Application Guidance",
                  "Post-Recognition Compliance Support",
                  "Dedicated Startup Expert Assigned"
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is Startup India Registration and DPIIT Recognition?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Startup India</strong> is a flagship initiative of the Government of India, launched in <strong className={dm ? 'text-white' : 'text-slate-900'}>January 2016</strong>, aimed at building a stronger ecosystem for innovation and entrepreneurship. It is run by the <strong className={dm ? 'text-white' : 'text-slate-900'}>Department for Promotion of Industry and Internal Trade (DPIIT)</strong>, part of the Ministry of Commerce and Industry.
              </p>
              <p>
                Under this initiative, DPIIT grants official <strong className={dm ? 'text-white' : 'text-slate-900'}>&ldquo;Startup&rdquo; recognition</strong> to eligible entities that apply through the startupindia.gov.in portal. This recognition is not a business registration in itself — it is a status layered on top of an already-incorporated company, LLP, or partnership firm — but it unlocks a wide set of benefits: tax holidays, exemption from angel tax on share premium, rebates on IPR filing fees, relaxed public procurement criteria, and easier access to government-backed funding schemes.
              </p>
              <p>
                DPIIT recognition itself carries <strong className={dm ? 'text-white' : 'text-slate-900'}>no government fee</strong> and is typically processed within a few working days once a complete application is submitted.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Key Benefits */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Benefits of DPIIT Recognition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                  {b.ref && <p className={`text-xs font-semibold mb-1.5 ${dm ? 'text-brand-orange/80' : 'text-orange-600'}`}>{b.ref}</p>}
                  <p className={`text-sm leading-relaxed mt-1 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility Checklist</h2>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {eligibilityChecklist.map((item, i) => (
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

          {/* 4. Entity Types */}
          <div id="entities" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligible Entity Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {entityTypes.map((e) => (
                <div key={e.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{e.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{e.desc}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-2xl border p-5 ${dm ? 'border-amber-500/30 bg-amber-500/10' : 'border-amber-400/50 bg-amber-50'}`}>
              <h3 className={`text-sm font-bold mb-3 ${dm ? 'text-amber-200' : 'text-amber-800'}`}>Not Eligible</h3>
              <ul className="space-y-2">
                {excludedEntities.map((item, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm leading-relaxed ${dm ? 'text-amber-200/90' : 'text-amber-800'}`}>
                    <span className="mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Documents */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Have the following ready before starting your application on the Startup India portal.
            </p>
            <DataTable headers={['Category', 'Documents Required']} rows={documentRows} dm={dm} />
          </div>

          {/* 6. Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Registration Process</h2>
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

          {/* 7. Tax Exemptions */}
          <div id="tax" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Tax Exemptions Available to Recognised Startups</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                DPIIT recognition unlocks access to four distinct tax provisions, each requiring its own separate compliance step beyond the recognition certificate itself.
              </p>
            </div>
            <DataTable headers={['Section', 'Benefit', 'Application Requirement']} rows={taxSummaryRows} dm={dm} />
          </div>

          {/* 8. IPR Benefits */}
          <div id="ipr" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Intellectual Property Rebates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {iprBenefits.map((b) => (
                <div key={b.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Funding Support */}
          <div id="funding" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Funding Support Mechanisms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fundingMechanisms.map((f) => (
                <div key={f.title} className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Comparison */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Startup India vs MSME/Udyam vs Company Registration vs GST Registration</h2>
            <DataTable headers={['Parameter', 'Startup India (DPIIT)', 'MSME / Udyam', 'Company / LLP Registration', 'GST Registration']} rows={comparisonRows} dm={dm} />
          </div>

          {/* 11. Post-Recognition Checklist */}
          <div id="postrecognition" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Post-Recognition Checklist</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Receiving your Certificate of Recognition is the starting point, not the finish line. Here is what to do next.
            </p>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-3">
                {postRecognitionSteps.map((item, i) => (
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

          {/* 12. Pros & Cons */}
          <div id="proscons" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Pros and Cons of DPIIT Recognition</h2>
            <DataTable headers={['Aspect', 'Advantage', 'Limitation to Keep in Mind']} rows={prosConsRows} dm={dm} />
          </div>

          {/* 13. FAQs */}
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
                Have questions about Startup India / DPIIT registration? Let our experts help you figure out the right benefits for your business.
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
          serviceName="Startup India"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
