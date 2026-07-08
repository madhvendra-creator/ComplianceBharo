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
  { id: 'eligibility', label: 'Who Needs GST' },
  { id: 'features', label: 'Key Features' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'schemes', label: 'Regular vs Composition' },
  { id: 'documents', label: 'Documents' },
  { id: 'process', label: 'Registration Process' },
  { id: 'returns', label: 'Return Filing' },
  { id: 'thresholds', label: 'Threshold Limits' },
  { id: 'penalties', label: 'Penalties' },
  { id: 'late-fees', label: 'Late Fees' },
  { id: 'business-types', label: 'Business Types' },
  { id: 'comparison', label: 'GSTIN vs PAN vs TAN' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'GSTIN & GST Certificate',
  'Secure & Paperless Process',
  'Expert Application Filing',
  'ARN Generation in 24 Hours',
  'Efficient Clarification Handling',
  'Dedicated GST Expert',
];

const pricingInclusions = [
  'Document Verification & Preparation',
  'Filing of GST REG-01 Application',
  'ARN Generation within 24 Hours',
  'Clarification Handling (if required)',
  'GST Registration Certificate (REG-06) Delivery Support',
  'Dedicated GST Expert Support',
  '100% Online & Paperless Process',
  'Transparent Pricing',
];

const overviewFacts: [string, string][] = [
  ['Governing Law', 'Central Goods and Services Tax Act, 2017, along with the corresponding State/UT GST Acts and the IGST Act, 2017'],
  ['What GST Replaced', 'Central Excise Duty, Service Tax, VAT, and a range of other state and central indirect taxes, unified into a single tax from 1 July 2017'],
  ['Nature of Tax', 'A destination-based, multi-stage indirect tax on the supply of goods and services, collected at every stage of the value chain with credit for tax already paid'],
  ['What GSTIN Provides', 'Legal recognition as a supplier, the ability to collect tax from customers, and eligibility to claim Input Tax Credit (ITC) on business purchases'],
  ['Application Form', 'Form GST REG-01, filed online on the GST portal (gst.gov.in)'],
  ['Government Fee', 'Nil — GST registration itself carries no government application fee'],
  ['Processing Time', 'Typically 3–7 working days for a straightforward application that doesn\'t draw an officer clarification query'],
];

const eligibilityRows: string[][] = [
  ['Turnover Basis (Goods)', '₹40 lakh (₹20 lakh in special category states)', 'Section 22(1)'],
  ['Turnover Basis (Services)', '₹20 lakh (₹10 lakh in special category states)', 'Section 22(1)'],
  ['Inter-State Supply', 'Mandatory regardless of turnover', 'Section 24(i)'],
  ['E-commerce Operators & Sellers', 'Mandatory regardless of turnover', 'Section 24(ix)'],
  ['Casual Taxable Person', 'Mandatory for the duration of the casual supply', 'Section 24(ii)'],
  ['Persons Liable Under Reverse Charge', 'Mandatory regardless of turnover', 'Section 24(iii)'],
  ['Freelancers & Consultants', '₹20 lakh threshold, commonly reported under SAC 998311', 'Section 22(1)'],
];

const keyFeatures = [
  { title: 'Input Tax Credit', desc: 'Registered businesses can claim credit for the GST already paid on their business purchases, offsetting it against the GST they collect on sales — the mechanism that keeps GST from cascading like the older tax-on-tax structure.' },
  { title: 'One Nation, One Tax', desc: 'GST folded a patchwork of central and state indirect taxes into a single, uniform tax structure applied consistently across every state and union territory.' },
  { title: 'Online Compliance', desc: 'Registration, return filing, tax payment, and refund processing all happen through the GST portal, removing the need for physical visits to a tax office for routine compliance.' },
  { title: 'Composition Scheme', desc: 'Small businesses below the prescribed turnover limit can opt for a simplified, flat-rate scheme with quarterly filing instead of the standard monthly compliance cycle.' },
  { title: 'Transparency', desc: 'Every invoice, return, and input credit claim is recorded and cross-verified electronically, making it far harder for transactions to go unreported compared to the pre-GST system.' },
  { title: 'Improved Logistics', desc: 'The removal of state-entry checkpoints and the harmonised tax structure have shortened inter-state transit times and simplified how goods move across state borders.' },
];

const benefitCards = [
  { title: 'Legal Recognition', desc: 'A GSTIN establishes the business as a recognised supplier of goods or services under law, distinct from operating informally without any tax registration.' },
  { title: 'Input Tax Credit', desc: 'Registration unlocks the ability to claim credit for GST paid on business inputs — a saving that unregistered businesses simply cannot access.' },
  { title: 'E-Commerce Sales Enablement', desc: 'Most e-commerce marketplaces require a valid GSTIN before a seller can even list products or services on their platform.' },
  { title: 'Inter-State Trade', desc: 'A GSTIN is a precondition for making inter-state supplies of goods or services, since Section 24(i) makes registration mandatory for this regardless of turnover.' },
  { title: 'Bank Loan Eligibility', desc: 'GST returns filed over time serve as a verifiable record of business turnover, which lenders commonly rely on when assessing loan and credit-line applications.' },
  { title: 'Corporate B2B Preference', desc: 'Larger corporate buyers frequently prefer or require GST-registered vendors, since only a registered supplier lets them claim Input Tax Credit on the purchase.' },
];

const schemeComparisonRows: string[][] = [
  ['Turnover Limit', 'No upper limit', 'Up to ₹1.5 crore (₹75 lakh in special category states) for goods; up to ₹50 lakh for eligible service providers under Section 10(2A)'],
  ['ITC Availability', 'Available on eligible business purchases', 'Not available'],
  ['Tax Collection Ability', 'Can collect tax from customers on invoices', 'Cannot collect tax separately from customers; the tax is borne out of the dealer\'s own margin'],
  ['Tax Rate', 'As per the applicable HSN/SAC rate slab for the goods or services supplied', 'Concessional flat rate — typically 1% for traders, 2% for manufacturers, 5% for restaurants (without alcohol), and 6% for eligible service providers'],
  ['Return Filing Frequency', 'Monthly or quarterly (GSTR-1, GSTR-3B)', 'Quarterly statement (CMP-08) with one consolidated annual return (GSTR-4)'],
  ['Inter-State Sale', 'Permitted', 'Not permitted'],
  ['E-commerce Sale', 'Permitted', 'Not permitted — composition dealers cannot supply through e-commerce operators required to collect TCS'],
];

const documentGroups = [
  { group: 'Proprietorship', items: ['PAN of the proprietor', 'Aadhaar of the proprietor', 'Passport-size photograph', 'Address proof of the place of business', 'Bank account proof (cancelled cheque, passbook, or statement)'] },
  { group: 'Partnership / LLP', items: ['PAN of the firm', 'PAN and Aadhaar of every partner', 'Partnership Deed or LLP Agreement', 'Address proof of the place of business', 'Bank account proof', 'Authorisation letter for the signatory'] },
  { group: 'Private Limited Company', items: ['PAN of the company', 'Certificate of Incorporation', 'MOA and AOA', 'PAN and Aadhaar of directors', 'Address proof of the registered office', 'Bank account proof', 'Board resolution authorising the signatory'] },
];

const processSteps = [
  { title: 'Document Collection & Verification', desc: 'Gather identity, address, and entity-formation documents specific to the applicant type, and verify each one for consistency before the application is drafted.' },
  { title: 'Application Filing (Form GST REG-01)', desc: 'File Part A of Form GST REG-01 using PAN, mobile number, and email to generate a Temporary Reference Number (TRN), then complete Part B with business details, promoter/partner information, and place of business.' },
  { title: 'ARN Generation', desc: 'Once Part B is submitted with all supporting documents, the portal generates an Application Reference Number (ARN), which serves as the tracking ID for the entire application.' },
  { title: 'Verification by GST Officer', desc: 'The jurisdictional GST officer reviews the application, typically within 7 working days, either approving it outright or flagging specific points that need clarification.' },
  { title: 'Clarification if Required', desc: 'Where the officer raises a query, it is communicated through Form GST REG-03, and the applicant responds with the requested details or documents through Form GST REG-04 within the prescribed window.' },
  { title: 'Grant of Registration Certificate (Form REG-06)', desc: 'Once the officer is satisfied, the registration certificate in Form GST REG-06 is issued electronically, carrying the GSTIN and the effective date of registration.' },
];

const returnFilingRows: string[][] = [
  ['GSTR-1', 'Outward supplies (sales) statement', 'Monthly / Quarterly (QRMP)', '11th of the following month (monthly) / 13th of the month following the quarter (QRMP)'],
  ['GSTR-3B', 'Summary return with tax payment', 'Monthly / Quarterly (QRMP)', '20th of the following month (monthly) / 22nd–24th of the month following the quarter, depending on state group (QRMP)'],
  ['CMP-08', 'Quarterly statement for composition dealers', 'Quarterly', '18th of the month following the quarter'],
  ['GSTR-9', 'Annual return', 'Annually', '31 December following the end of the financial year'],
];

const thresholdRows: string[][] = [
  ['Supply of Goods', '₹40 lakh (normal category states); ₹20 lakh (special category states)', 'Section 22(1)'],
  ['Supply of Services', '₹20 lakh (normal category states); ₹10 lakh (special category states)', 'Section 22(1)'],
  ['E-commerce Sellers', 'Mandatory regardless of turnover', 'Section 24(ix)'],
  ['Inter-State Supply', 'Mandatory regardless of turnover', 'Section 24(i)'],
  ['Casual Taxable Person', 'Mandatory for the duration of the casual supply', 'Section 24(ii)'],
  ['Composition Scheme', 'Up to ₹1.5 crore (₹75 lakh special category states) for goods; up to ₹50 lakh for services', 'Section 10'],
];

const specialCategoryStates = [
  'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Tripura', 'Sikkim', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Ladakh',
];

const nonRegistrationPenaltyRows: string[][] = [
  ['Failure to register despite being liable', 'Section 122(1)(xi)', 'Penalty of ₹10,000 or 100% of the tax due, whichever is higher'],
  ['Collecting tax without being registered', 'Section 122(1)(i)', 'Penalty of ₹10,000 or 100% of the tax collected, whichever is higher'],
  ['Tax evasion between ₹1 crore and ₹2 crore', 'Section 132(1)(iii)', 'Imprisonment up to 1 year, plus fine'],
  ['Tax evasion between ₹2 crore and ₹5 crore', 'Section 132(1)(ii)', 'Imprisonment up to 3 years, plus fine'],
  ['Tax evasion exceeding ₹5 crore', 'Section 132(1)(i)', 'Imprisonment up to 5 years, plus fine — a cognizable and non-bailable offence'],
];

const businessTypes = [
  { title: 'Freelancers & Consultants', desc: 'A freelancer or independent consultant crossing the ₹20 lakh services threshold must register, typically reporting their work under a Services Accounting Code such as SAC 998311 for management consultancy-type services (the exact SAC depends on the actual nature of work). A home address is generally acceptable as the principal place of business, provided the supporting ownership or rental proof and, where applicable, an NOC are furnished.' },
  { title: 'E-commerce & Marketplace Sellers', desc: 'Anyone supplying goods or services through an e-commerce operator that is required to collect Tax Collected at Source under Section 52 must register under Section 24(ix), regardless of how small their turnover is — the usual threshold exemption simply doesn\'t apply to this category.' },
  { title: 'Home-Based Businesses', desc: 'A home address can serve as the registered place of business, supported by ownership documents or a rent agreement plus a recent utility bill, and — where the property is rented — a No Objection Certificate from the owner permitting its use for business. Some applications, particularly in categories the department treats as higher-risk, may also require physical verification of the premises before or after approval.' },
  { title: 'Virtual Office Use', desc: 'A virtual office arrangement is commonly used by businesses that don\'t operate from a fixed dedicated premises, provided the provider furnishes a valid NOC, a recent utility bill for the address, and the underlying agreement between the business and the virtual office provider. Costs vary by provider and city, so it\'s worth confirming current pricing directly with the chosen provider rather than relying on a fixed figure.' },
];

const gstinComparisonRows: string[][] = [
  ['Full Form', 'Goods and Services Tax Identification Number', 'Permanent Account Number', 'Tax Deduction and Collection Account Number'],
  ['Format', '15-digit alphanumeric — 2-digit state code + 10-digit PAN + entity code + check digit', '10-digit alphanumeric (5 letters + 4 digits + 1 letter)', '10-digit alphanumeric (4 letters + 5 digits + 1 letter)'],
  ['Purpose', 'Identifies a registered taxpayer for supply of goods or services', 'Identifies a taxpayer for income tax purposes and specified financial transactions', 'Identifies a person responsible for deducting or collecting tax at source'],
  ['Issuing Authority', 'GST Network (GSTN), issued state-wise', 'Income Tax Department, via Protean/UTIITSL', 'Income Tax Department, via Protean/UTIITSL'],
  ['Governing Law', 'CGST Act, 2017', 'Section 139A, Income-tax Act, 1961', 'Section 203A, Income-tax Act, 1961'],
  ['Mandatory For', 'Businesses crossing GST thresholds, or falling under a mandatory registration category', 'Virtually all taxpayers and a wide range of specified transactions', 'Anyone deducting or collecting tax at source (TDS/TCS)'],
];

const faqs = [
  { q: 'Is GST registration mandatory for all businesses?', a: 'No. It becomes mandatory once a business crosses the applicable turnover threshold (₹40 lakh for goods, ₹20 lakh for services, lower in special category states), or falls under a category made mandatory regardless of turnover — such as inter-state supply, e-commerce selling, or reverse charge liability.' },
  { q: 'Can I register for GST voluntarily even if I\'m below the threshold?', a: 'Yes, voluntary registration is allowed for businesses below the threshold, and it\'s a common choice for those who want to claim Input Tax Credit, sell on e-commerce platforms, or simply appear more credible to corporate buyers who prefer GST-registered vendors.' },
  { q: 'What is the difference between CGST, SGST, and IGST?', a: 'CGST and SGST are levied together on intra-state supplies — one going to the central government and the other to the state government — while IGST is levied on inter-state supplies and collected by the central government, later apportioned between the states involved.' },
  { q: 'How long does GST registration take?', a: 'A straightforward application that doesn\'t draw an officer clarification query is typically processed within 3–7 working days from ARN generation; applications flagged for clarification can take longer depending on how quickly the requested response is submitted.' },
  { q: 'Do I need a physical office to register for GST?', a: 'Not necessarily a commercial office — a home address, a virtual office, or any premises with valid supporting documentation (ownership proof or rent agreement, a recent utility bill, and an NOC where rented) can serve as the principal place of business.' },
  { q: 'What is the Composition Scheme and who can opt for it?', a: 'The Composition Scheme, under Section 10, lets eligible small businesses pay tax at a concessional flat rate with quarterly filing instead of the standard monthly cycle, in exchange for giving up Input Tax Credit and the ability to make inter-state or e-commerce sales — available to businesses with turnover up to ₹1.5 crore for goods (₹75 lakh in special category states) or ₹50 lakh for eligible services.' },
  { q: 'Is a Digital Signature Certificate (DSC) mandatory for GST registration?', a: 'DSC is mandatory for companies and LLPs, while proprietorships and other individual applicants can generally verify their application using an Aadhaar-based e-signature or EVC instead.' },
  { q: 'Can a business have multiple GST registrations?', a: 'Yes — a business operating in multiple states needs a separate GSTIN for each state, and even within a single state, it can opt for multiple registrations for distinct business verticals under the same PAN, subject to the conditions in Section 25.' },
  { q: 'What is the penalty for not registering for GST?', a: 'Failure to register despite being liable attracts a penalty of ₹10,000 or 100% of the tax due, whichever is higher, under Section 122(1)(xi), and can escalate to prosecution under Section 132 where the tax evaded crosses ₹1 crore.' },
  { q: 'How do I cancel my GST registration?', a: 'Cancellation can be initiated by the registered person by filing Form GST REG-16 on the portal, citing reasons such as business closure or turnover falling below the threshold, or it can be initiated by the department itself for continued non-compliance, such as prolonged non-filing of returns.' },
  { q: 'Are freelancers eligible for GST registration?', a: 'Yes, freelancers and independent consultants register the same way as any other service provider once they cross the ₹20 lakh threshold (or choose to register voluntarily), typically reporting their services under the applicable SAC code.' },
  { q: 'Can I use a virtual office address for GST registration?', a: 'Yes, provided the virtual office provider furnishes a valid NOC, a recent utility bill for that address, and the underlying service agreement — this is a commonly used route for businesses without a fixed physical premises.' },
  { q: 'What is the turnover threshold for e-commerce sellers?', a: 'There isn\'t one — Section 24(ix) makes GST registration mandatory for anyone supplying goods or services through an e-commerce operator required to collect TCS, regardless of how small their turnover actually is.' },
  { q: 'Do dropshipping businesses need GST registration?', a: 'Generally yes, since dropshipping typically involves supplying goods through an online platform and often across state lines, both of which are mandatory registration triggers under Sections 24(i) and 24(ix) independent of turnover.' },
  { q: 'What bank account requirements apply for GST registration?', a: 'A bank account in the business or proprietor\'s name is required, evidenced by a cancelled cheque, a recent bank statement, or a passbook page showing the account holder\'s name, account number, and IFSC code.' },
  { q: 'Is GST applicable to consultancy services?', a: 'Yes, consultancy and professional services are taxable supplies under GST, and a consultant crossing the ₹20 lakh threshold (or opting in voluntarily) must register and charge GST on their invoices at the applicable rate.' },
  { q: 'Can I use my home address for GST registration?', a: 'Yes, a home address is commonly accepted as the principal place of business, supported by ownership or rental proof, a recent utility bill, and — for rented premises — a No Objection Certificate from the property owner.' },
  { q: 'What is the typical registration timeline?', a: 'From document submission to certificate issuance, a clean application typically takes 3–7 working days; add a few more days if the officer raises a clarification query that needs a documented response.' },
  { q: 'What is an ARN and why does it matter?', a: 'The Application Reference Number (ARN) is generated once Part B of Form GST REG-01 is submitted, and it\'s the reference number used to track the application\'s status on the GST portal until the registration certificate is issued.' },
  { q: 'What happens if my application is sent for clarification?', a: 'The officer raises specific queries through Form GST REG-03, and the applicant must respond with the requested documents or explanations through Form GST REG-04 within the window allowed — failing to respond in time can result in the application being rejected.' },
  { q: 'What is the difference between GSTIN and PAN?', a: 'PAN identifies a taxpayer for income tax purposes and is actually embedded within the GSTIN itself — the middle 10 digits of a 15-digit GSTIN are the entity\'s PAN, with a state code prefix and an entity/check-digit suffix added around it.' },
  { q: 'Can GST registration be cancelled by the department without my request?', a: 'Yes — under Section 29(2), a proper officer can cancel registration on their own initiative for reasons including continuous non-filing of returns (typically six months or more), registration obtained by fraud, or contravention of specific provisions of the Act.' },
  { q: 'Is GST registration required for inter-state supply of even small amounts?', a: 'Yes — Section 24(i) makes registration mandatory for any person making inter-state taxable supplies, with no turnover-based exemption, unlike the general threshold that applies to intra-state suppliers.' },
  { q: 'How does ComplianceBharo assist with GST registration?', a: 'We verify eligibility and documentation upfront, file Form GST REG-01 accurately the first time, track the application through ARN generation, handle any officer clarification promptly, and support you through to receiving the registration certificate in Form GST REG-06.' },
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

export default function GSTRegistrationClient() {
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
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="GST Registration" />

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
                  GST Registration &amp; Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">GST Registration Online</span><br />
                  in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  Get Your GST Identification Number (GSTIN) in Just 3-7 Days
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  100% Online &amp; Paperless Filing. ARN in 24 Hours. Starting at <span className="text-brand-orange">₹399</span> ComplianceBharo professional fee for end-to-end assistance. GST registration itself has no separate government fee.
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
                    Reviewed by Industry Experts &amp; GST Compliance Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"GST Registration"} dm={isDarkMode} />
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
                GST Registration Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹399
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">ComplianceBharo professional fee for assistance</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                GSTIN typically issued within 3-7 working days
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
                Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. GST registration itself carries no separate government fee — the ₹399 covers document preparation, filing, and application support.
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
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is GST Registration?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                GST — Goods and Services Tax — is a <strong className={dm ? 'text-white' : 'text-slate-900'}>destination-based indirect tax</strong> introduced under the <strong className={dm ? 'text-white' : 'text-slate-900'}>Central Goods and Services Tax Act, 2017</strong>, along with the parallel State/UT GST Acts and the IGST Act. It replaced a fragmented set of central and state indirect taxes — Central Excise Duty, Service Tax, VAT, and several others — with a single, uniform tax applied across the entire supply chain from 1 July 2017 onward.
              </p>
              <p>
                Registering for GST means obtaining a <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTIN</strong> — a state-wise identification number that gives a business legal recognition as a supplier of goods or services. That recognition comes with a practical benefit attached: the ability to claim <strong className={dm ? 'text-white' : 'text-slate-900'}>Input Tax Credit</strong> on GST already paid for business purchases, offsetting it against the GST collected on sales, rather than absorbing tax on tax the way the older system often did.
              </p>
              <p>
                Registration itself carries <strong className={dm ? 'text-white' : 'text-slate-900'}>no government application fee</strong> — the entire process runs through Form GST REG-01 on the GST portal, and a clean application is typically approved within 3–7 working days.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Who Needs GST Registration */}
          <div id="eligibility" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Needs GST Registration?</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              GST registration is triggered either by crossing a turnover threshold, or by falling into a category the law treats as mandatory regardless of turnover.
            </p>
            <DataTable headers={['Category', 'Threshold / Basis', 'Applicable Provision']} rows={eligibilityRows} dm={dm} />
          </div>

          {/* 3. Key Features */}
          <div id="features" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Key Features of GST</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((f) => (
                <div key={f.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Benefits of Registration */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of GST Registration</h2>
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

          {/* 5. Regular vs Composition Scheme */}
          <div id="schemes" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Regular Scheme vs Composition Scheme</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Choosing between the two isn't just about the tax rate — it changes what a business can and can't do commercially.
            </p>
            <DataTable headers={['Parameter', 'Regular Scheme', 'Composition Scheme']} rows={schemeComparisonRows} dm={dm} />
          </div>

          {/* 6. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required for GST Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The exact checklist depends on the entity structure — here's what's typically needed for the three most common applicant types.
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

          {/* 7. Registration Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Registration Process — Step by Step</h2>
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

          {/* 8. GST Return Filing After Registration */}
          <div id="returns" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Return Filing After Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Registration is the starting point — every GSTIN then carries a recurring return filing obligation, whose form and frequency depend on the scheme opted for.
            </p>
            <DataTable headers={['Return', 'Purpose', 'Frequency', 'Due Date']} rows={returnFilingRows} dm={dm} />
          </div>

          {/* 9. Legal Framework - Threshold Limits */}
          <div id="thresholds" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Registration Threshold Limits</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              These thresholds under Sections 22, 24 and 10 govern exactly when registration shifts from optional to mandatory.
            </p>
            <DataTable headers={['Category', 'Threshold', 'Provision']} rows={thresholdRows} dm={dm} />
            <h3 className={`text-lg font-bold mt-8 mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Special Category States</h3>
            <p className={`text-sm leading-relaxed mb-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              The lower threshold applies to businesses based in the following states and union territories:
            </p>
            <div className="flex flex-wrap gap-2">
              {specialCategoryStates.map((s) => (
                <span key={s} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${dm ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 10. Penalties for Non-Registration */}
          <div id="penalties" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Penalties for Non-Registration</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Consequences scale sharply with the amount of tax involved — a small default stays a monetary penalty, while a large one crosses into criminal prosecution.
            </p>
            <DataTable headers={['Default', 'Provision', 'Consequence']} rows={nonRegistrationPenaltyRows} dm={dm} />
            <p className={`text-sm leading-relaxed mt-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              In practice, the department generally treats a business that comes forward and registers voluntarily — even belatedly — more favourably than one that continues operating unregistered until detected during an audit or survey. Getting compliant sooner rather than later tends to matter more than the specific mechanism used to do so.
            </p>
          </div>

          {/* 11. Late Filing Penalty */}
          <div id="late-fees" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Late Filing Penalty</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                Missing a GSTR-3B or GSTR-1 due date attracts a late fee of <strong className={dm ? 'text-white' : 'text-slate-900'}>₹50 per day (₹25 CGST + ₹25 SGST)</strong>, capped at a maximum of <strong className={dm ? 'text-white' : 'text-slate-900'}>₹10,000 per return</strong> — though CBIC notifications have periodically introduced lower, turnover-linked caps for smaller taxpayers. Nil returns attract a reduced fee of <strong className={dm ? 'text-white' : 'text-slate-900'}>₹20 per day (₹10 CGST + ₹10 SGST)</strong>.
              </p>
              <p>
                Beyond the late fee, any tax that remains unpaid past the due date accrues <strong className={dm ? 'text-white' : 'text-slate-900'}>interest at 18% per annum</strong> under Section 50, calculated on a daily basis from the day after the due date until the tax is actually paid.
              </p>
              <p>
                Continued non-filing carries a more serious risk: a registration that stays inactive for <strong className={dm ? 'text-white' : 'text-slate-900'}>six months or more of continuous non-filing</strong> can be cancelled by the department on its own initiative (suo moto) under Section 29(2), after which reinstatement requires a separate application and, often, a satisfactory explanation for the lapse.
              </p>
            </div>
          </div>

          {/* 12. GST Registration for Specific Business Types */}
          <div id="business-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Registration for Specific Business Types</h2>
            <div className="space-y-4">
              {businessTypes.map((b) => (
                <div key={b.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 13. GSTIN vs PAN vs TAN */}
          <div id="comparison" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>GSTIN vs PAN vs TAN</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              These three identifiers get confused often — largely because a GSTIN is actually built around a business's PAN, not issued independently of it.
            </p>
            <DataTable headers={['Parameter', 'GSTIN', 'PAN', 'TAN']} rows={gstinComparisonRows} dm={dm} />
          </div>

          {/* 14. FAQs */}
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
                Have questions about GST registration for your business? Let our experts help you figure out the right approach.
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
          serviceName="GST Registration"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
