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
  { id: 'classification', label: 'MSME Classification' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'documents', label: 'Documents' },
  { id: 'process', label: 'Registration Process' },
  { id: 'post-registration', label: 'Post-Registration' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'Udyam Certificate with QR Code',
  'Complete Form Filing',
  'Aadhaar-Based Verification',
  'PAN & GST Validation',
  'Instant Certificate Download',
  'Free Modification Support',
];

const pricingInclusions = [
  'Udyam Certificate with QR Code',
  'Complete Form Filing Assistance',
  'Aadhaar Verification',
  'PAN & GST Validation',
  'Enterprise Classification',
  'Certificate Download Support',
  'Portal Registration Assistance',
  'Certificate Delivery Assistance',
  'Modification Support',
  'Scheme Guidance',
];

const overviewFacts: string[][] = [
  ['Governing Law', 'Micro, Small and Medium Enterprises Development (MSMED) Act, 2006'],
  ['Registration Portal', 'udyamregistration.gov.in — the official Government of India portal'],
  ['Verification Method', 'Aadhaar-based OTP verification of the proprietor, partner, or director'],
  ['Government Fee', 'Nil — registration on the official portal is completely free'],
  ['PAN/GST Linkage', 'Mandatory since the process update effective 1 April 2021, drawing turnover and investment data directly from Income Tax and GST records'],
  ['Validity', 'Lifetime — no renewal required, though details must be kept updated as your business changes'],
];

const classificationRows: string[][] = [
  ['Micro', 'Up to ₹1 crore', 'Up to ₹5 crore'],
  ['Small', 'Up to ₹10 crore', 'Up to ₹50 crore'],
  ['Medium', 'Up to ₹50 crore', 'Up to ₹250 crore'],
];

const benefitCards = [
  { title: 'Priority Bank Lending', desc: 'Registered MSMEs get access to priority-sector lending norms, which typically means easier approval and more competitive interest rates compared to standard commercial loans.' },
  { title: 'Government Tender Preference', desc: 'Public sector tenders often carry MSME-specific preferences, including exemption from Earnest Money Deposit (EMD) and reservation of a portion of government procurement for MSME suppliers.' },
  { title: 'Delayed Payment Protection', desc: 'Sections 15 and 16 of the MSMED Act require buyers to pay a registered MSME within 45 days of accepting goods or services, and any delay attracts compound interest at three times the RBI-notified bank rate.' },
  { title: 'Subsidy Access', desc: 'Udyam-registered businesses can apply for subsidies tied to patent filing, ISO certification reimbursement, and technology upgradation schemes run by various central and state departments.' },
  { title: 'Collateral-Free Loans', desc: 'The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) backs collateral-free lending to registered MSMEs, reducing the security a bank would otherwise demand before approving a loan.' },
  { title: 'Reduced Government Fees', desc: 'MSME-registered applicants get a reduction on official government fees for trademark and patent applications, lowering the cost of protecting intellectual property.' },
];

const eligibilityWho = [
  { title: 'Who Can Register', desc: 'Proprietorships, partnership firms, LLPs, and companies engaged in manufacturing or service activities can register, provided their investment in plant & machinery/equipment and annual turnover both fall within the Medium enterprise limits described in the classification table above.' },
  { title: 'Who Generally Cannot Register', desc: 'Pure trading businesses were historically excluded from Udyam registration, though retail and wholesale traders have since been extended limited Udyam benefits (largely for priority-sector lending) without full access to every MSME scheme. Entities that cannot produce a valid PAN — mandatory for registration since the 2021 process update — also cannot complete registration, and any enterprise whose investment or turnover exceeds the Medium enterprise ceiling falls outside Udyam\'s scope entirely.' },
];

const documentsRows: string[][] = [
  ['Aadhaar (of proprietor/partner/director)', 'For OTP-based identity verification — the starting point of the entire application'],
  ['PAN of the business', 'Mandatory since 2021, used to pull turnover and investment data automatically from linked records'],
  ['GSTIN (if applicable)', 'Required where the business is GST-registered, used to cross-verify declared turnover'],
  ['Bank account details', 'For linking payment channels and, where relevant, subsidy or scheme disbursement'],
  ['Business activity / NIC code', 'To correctly classify the nature of the enterprise\'s economic activity on the certificate'],
];

const processSteps = [
  { title: 'Aadhaar OTP Verification', desc: 'The application begins with the Aadhaar number of the proprietor, managing partner, or authorised director, verified through an OTP sent to the linked mobile number.' },
  { title: 'PAN Verification', desc: 'The applicant\'s PAN (or the business PAN, for entities other than proprietorships) is validated against Income Tax Department records, since PAN linkage has been mandatory since the 2021 process update.' },
  { title: 'Business Details Entry', desc: 'Core details are entered — business name, type of organisation, registered address, date of commencement, and bank account information.' },
  { title: 'NIC Code Selection', desc: 'The applicant selects the National Industrial Classification (NIC) code(s) that best describe the business\'s actual activities, which determines how the enterprise is categorised.' },
  { title: 'Investment & Turnover Declaration', desc: 'Investment in plant & machinery/equipment and annual turnover are declared — for PAN-linked applicants, these figures increasingly draw from ITR and GST filings rather than manual self-reporting alone.' },
  { title: 'Certificate Generation', desc: 'Once the application is submitted and validated, the Udyam Registration Certificate is generated on the portal, carrying a unique Udyam Registration Number, ready for download.' },
];

const faqs = [
  { q: 'Is Udyam Registration mandatory for every business?', a: 'No, it isn\'t universally mandatory, but it\'s functionally necessary for any business that wants to access MSME benefits — priority lending, delayed payment protection, tender preferences, and various subsidies are all gated behind having a valid Udyam certificate.' },
  { q: 'How much does Udyam Registration cost?', a: 'Registration on the official government portal is completely free — there is no government fee at all. ComplianceBharo\'s charge covers eligibility assessment, document preparation, and end-to-end filing assistance, starting at ₹499.' },
  { q: 'What is the validity period of a Udyam certificate?', a: 'Udyam Registration has lifetime validity with no expiry date and no renewal requirement. That said, businesses need to keep their turnover and investment details updated on the portal, since your MSME classification can change as these figures change.' },
  { q: 'What is the difference between Udyam Registration and the old Udyog Aadhaar?', a: 'Udyog Aadhaar was the earlier self-declaration-based registration system. Udyam Registration replaced it from 1 July 2020, introducing Aadhaar-based OTP verification and, from 2021, mandatory PAN and GST linkage — making the process more integrated with actual tax filings rather than relying purely on self-reported figures.' },
  { q: 'Is GST registration mandatory to apply for Udyam Registration?', a: 'Not universally — GST registration is required for Udyam only where the business is otherwise liable to register for GST under the CGST Act. Businesses below the GST threshold, or in categories exempt from GST registration, can still complete Udyam Registration using their PAN.' },
  { q: 'Can a sole proprietor register under Udyam?', a: 'Yes — a proprietorship is one of the most common entity types registering under Udyam, using the proprietor\'s own Aadhaar and PAN for verification.' },
  { q: 'Can I register multiple businesses under the same Aadhaar?', a: 'Yes, an individual can obtain separate Udyam Registrations for multiple business entities they own or operate, provided each entity has its own distinct PAN and business details.' },
  { q: 'How do I update details on an existing Udyam certificate?', a: 'The Udyam portal allows registered businesses to log in and update details — turnover, investment figures, NIC codes, bank information, or business address — at any time, without needing to file a fresh registration.' },
  { q: 'What are the main benefits of Udyam Registration?', a: 'Priority-sector bank lending, protection against delayed payments under Sections 15 and 16 of the MSMED Act, preference and EMD exemption in government tenders, subsidies on patent/ISO costs, collateral-free loans under CGTMSE, and reduced government fees for trademark and patent filings.' },
  { q: 'What happens if my turnover crosses the Medium enterprise limit?', a: 'Your classification updates based on the figures reflected in your ITR and GST filings. If your investment and turnover exceed the Medium enterprise thresholds, the enterprise no longer qualifies as an MSME and falls outside Udyam\'s classification framework.' },
  { q: 'Is a NIC code mandatory for Udyam Registration?', a: 'Yes — selecting the correct National Industrial Classification (NIC) code for your business activity is a required part of the application, and it directly affects how your enterprise is categorised for scheme eligibility.' },
  { q: 'Can service businesses register under Udyam, or is it only for manufacturers?', a: 'Both — since the July 2020 reform, the same investment and turnover criteria apply uniformly to manufacturing and service enterprises. Earlier rules had separate, lower limits for services, but that distinction no longer exists.' },
  { q: 'Do I need a business bank account before registering?', a: 'A bank account isn\'t a strict prerequisite to begin the application, but you\'ll need to provide bank account details as part of the registration, so it\'s best to have one ready before starting.' },
  { q: 'Is physical document submission required anywhere in the process?', a: 'No — Udyam Registration is entirely online and paperless, relying on Aadhaar OTP verification and PAN-linked data rather than physical document uploads or in-person visits.' },
  { q: 'Can an existing Udyog Aadhaar holder continue using it, or do they need to migrate?', a: 'Udyog Aadhaar registrations have been phased out in favour of Udyam. Businesses still holding an old Udyog Aadhaar registration need to re-register on the Udyam portal to continue accessing MSME benefits.' },
  { q: 'Does Udyam Registration guarantee loan approval?', a: 'No — it makes a business eligible for priority-sector lending norms and schemes like CGTMSE, but the actual loan approval still depends on the lender\'s standard credit assessment of the business.' },
  { q: 'Can a company or LLP register, or is it only for individuals?', a: 'Companies and LLPs can register under Udyam just as proprietorships and partnerships can, using the entity\'s PAN and the Aadhaar of an authorised director or designated partner for verification.' },
  { q: 'How does ComplianceBharo assist with Udyam Registration?', a: 'We assess your eligibility and correct classification upfront, prepare and verify your details before submission, guide you through Aadhaar OTP and PAN verification, help select the right NIC code, complete the filing on the Udyam portal, and support you with certificate download and any future updates to your registration.' },
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

export default function MSMEClient() {
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
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="MSME / Udyam Registration" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Now Facilitating Instant Udyam Registration
                <span className="font-bold ml-0.5">&gt;</span>
              </div>

              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                MSME Udyam Registration<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Online in India</span>
              </h1>

              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                Get Assistance for Udyam Registration in Just Same Day - Starting @ ₹499 Only
              </p>

              <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                100% Online Process. Lifetime Validity. Government Benefits.
              </p>

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
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"MSME / Udyam Registration"} dm={isDarkMode} />
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
                MSME Registration Assistance Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹499
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <p className="text-white/85 text-xs max-w-xl mx-auto mb-4 leading-relaxed">
                ComplianceBharo professional fee for assistance. Government/statutory fees are charged separately at actuals. Udyam Registration on the official portal (udyamregistration.gov.in) is free of government charges.
              </p>
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

              <div className="flex justify-center mb-6">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105 ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.428-1.428L13.5 18.75l1.183-.394a2.25 2.25 0 001.428-1.428l.394-1.183.394 1.183a2.25 2.25 0 001.428 1.428l1.183.394-1.183.394a2.25 2.25 0 00-1.428 1.428z" /></svg>
                  Get Expert Assistance
                </a>
              </div>

              <p className={`text-center text-xs mb-8 max-w-2xl mx-auto leading-relaxed ${dm ? 'text-slate-500' : 'text-slate-500'}`}>
                *Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. Government/statutory fees, where applicable, are charged separately at actuals.
              </p>

              <div className={`pt-6 border-t flex flex-wrap justify-center gap-6 sm:gap-8 text-sm font-semibold ${dm ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Transparent scope
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                  Secure payment
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" /></svg>
                  Application support
                </div>
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is Udyam Registration?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Udyam Registration is the official process by which a business gets recognised as a Micro, Small, or Medium Enterprise (MSME) under the <strong className={dm ? 'text-white' : 'text-slate-900'}>MSMED Act, 2006</strong>. It runs entirely through <strong className={dm ? 'text-white' : 'text-slate-900'}>udyamregistration.gov.in</strong>, the government's dedicated portal, and is verified using an <strong className={dm ? 'text-white' : 'text-slate-900'}>Aadhaar-based OTP</strong> tied to the proprietor, a partner, or a director, depending on the entity type.
              </p>
              <p>
                Registration itself is <strong className={dm ? 'text-white' : 'text-slate-900'}>completely free</strong> at the government level — there's no official fee for filing the application or downloading the certificate. Since the process update effective <strong className={dm ? 'text-white' : 'text-slate-900'}>1 April 2021</strong>, PAN and GST details are also linked into the application, which means the portal increasingly draws turnover and investment figures directly from your existing tax filings rather than relying purely on manual self-declaration.
              </p>
              <p>
                Once issued, the Udyam certificate is what unlocks the MSME ecosystem of benefits — priority lending, payment protection, tender preferences, and various subsidy schemes — described in detail further down this page.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. MSME Classification */}
          <div id="classification" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>MSME Classification</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Since the July 2020 reform, classification is based jointly on investment and turnover, and the same limits apply uniformly whether the enterprise is engaged in manufacturing or services — an earlier distinction between the two has since been removed.
            </p>
            <DataTable headers={['Category', 'Investment in Plant & Machinery / Equipment', 'Annual Turnover']} rows={classificationRows} dm={dm} />
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              A business only qualifies for a given category if <strong className={dm ? 'text-white' : 'text-slate-900'}>both</strong> figures — investment and turnover — fall within the specified limit; crossing either one on its own is enough to bump the classification up to the next tier.
            </p>
          </div>

          {/* 3. Benefits */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Udyam Registration</h2>
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

          {/* 4. Eligibility */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility</h2>
            <div className="space-y-4">
              {eligibilityWho.map((w) => (
                <div key={w.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{w.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The Udyam process is designed to be document-light — here's everything that's actually needed.
            </p>
            <DataTable headers={['Document', 'Purpose']} rows={documentsRows} dm={dm} />
          </div>

          {/* 6. Registration Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Registration Process — Step by Step</h2>
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

          {/* 7. Post-Registration */}
          <div id="post-registration" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Post-Registration</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Once your application is approved, the <strong className={dm ? 'text-white' : 'text-slate-900'}>Udyam Registration Certificate</strong> becomes available for download directly from the portal, carrying your unique Udyam Registration Number — this is the document you'll present to banks, tender authorities, and scheme administrators as proof of MSME status.
              </p>
              <p>
                Unlike most licences and registrations, a Udyam certificate doesn't expire and never needs to be renewed. What it does need is to be kept <strong className={dm ? 'text-white' : 'text-slate-900'}>accurate</strong> — the portal allows registered businesses to log in and update their details, including turnover, investment figures, NIC codes, and business address, at any point.
              </p>
              <p>
                A related but distinct requirement is the <strong className={dm ? 'text-white' : 'text-slate-900'}>annual self-declaration</strong> of turnover and investment figures on the portal. This isn't a renewal — your registration stays valid regardless — but it's what keeps your classification (Micro, Small, or Medium) accurate as your business grows or changes, since a stale classification can affect which schemes and benefits you remain eligible for.
              </p>
            </div>
          </div>

          {/* 8. FAQs */}
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
                Have questions about Udyam Registration or your MSME classification? Let our experts help you figure out the right approach.
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
          serviceName="MSME / Udyam Registration"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
