'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import PopupForm from '../components/PopupForm';
import { submitLead } from '../actions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plans = [
  {
    name: 'Starter',
    price: 1350,
    validity: '1 Year Validity',
    iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
    ),
    desc: 'One-off filings and occasional use',
    popular: false,
    features: [
      'Class 3 DSC (Individual)',
      'Aadhaar OTP + Video KYC',
      'MCA, EPFO & Income Tax Portal Ready',
      'GST Portal Ready',
      'Soft Token (Cloud DSC)',
      'Email Support',
    ],
  },
  {
    name: 'Standard',
    price: 1500,
    validity: '2 Years Validity',
    iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.42 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.42 0Z"></path></svg>
    ),
    desc: 'Best value for frequent filers',
    popular: true,
    features: [
      'Everything in Starter, plus...',
      '2-Year Extended Validity',
      'e-Tendering & NIC Portal Ready',
      'DGFT & Customs Portal Ready',
      'GST e-Invoice Signing',
      'Priority Same-Day Issuance',
    ],
  },
  {
    name: 'Pro',
    price: 2250,
    validity: '3 Years Validity',
    iconColor: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
    ),
    desc: 'Full kit for power users',
    popular: false,
    features: [
      'Everything in Starter, plus...',
      '3-Year Extended Validity',
      'e-Tendering & NIC Portal Ready',
      'DGFT & Customs Portal Ready',
      'GST e-Invoice Signing',
      'Priority Same-Day Issuance',
    ],
  },
];

const faqs = [
  { q: 'What is a Class 3 Digital Signature Certificate?', a: 'A Class 3 DSC is the highest level of digital signature issued by a licensed Certifying Authority (CA). It requires in-person or video-based identity verification and is the only DSC accepted for MCA company filings, Income Tax e-filing, GST registration, e-tendering (GeM, CPPP), and DGFT portals.' },
  { q: 'Is video verification (Video KYC) mandatory for getting a DSC?', a: 'Yes. Since 2021, the Controller of Certifying Authorities (CCA) mandates in-person or Video KYC for all Class 3 DSC issuances. A 2–3 minute live video call with a Registration Authority (RA) officer, combined with Aadhaar OTP, fully satisfies the KYC requirement.' },
  { q: 'How long is a DSC valid and can it be renewed?', a: 'DSCs are issued with a validity of 1, 2, or 3 years. Once expired, a DSC cannot be strictly "renewed" — a fresh DSC must be issued with a new KYC process.' },
  { q: 'What portals accept a Class 3 DSC?', a: 'Class 3 DSCs issued by CCA-licensed CAs are accepted across all major government portals: MCA21, Income Tax, GSTN, DGFT, GeM / CPPP, EPFO, and Customs (ICEGATE).' },
  { q: 'Do I need a USB token or is a soft (cloud) DSC sufficient?', a: 'A Soft/Cloud DSC is delivered digitally and works for most MCA, GST, and IT filings. A USB Cryptographic Token is required for certain e-tendering portals and DGFT filings.' },
];

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

export default function DigitalSignatureCertificatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [tokenEnabled, setTokenEnabled] = useState<boolean[]>([false, false, false]);
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'eligibility', 'documents', 'timeline', 'updates', 'faq'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const dm = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="Digital Signature Certificate" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                ✍️ Class 3 DSC — 100% Paperless, Issued in 15–30 Minutes
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dm ? 'text-white' : 'text-slate-900'}`}>
                Digital Signature<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Certificate (DSC)</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                Get a Class 3 DSC — the gold standard accepted by MCA, Income Tax, GST, DGFT, and e-Tendering portals. Aadhaar OTP + Video KYC means zero paperwork and issuance in under 30 minutes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: '100% Paperless', desc: 'Aadhaar OTP + live Video KYC replaces physical document submission entirely.' },
                  { title: 'Issued in 15–30 Min', desc: 'Fastest DSC issuance in India — no courier wait, no branch visit required.' },
                  { title: 'All Portals Ready', desc: 'Valid on MCA, Income Tax, GST, DGFT, GeM, CPPP, ICEGATE — one DSC, every portal.' },
                  { title: 'Legally Binding', desc: 'Class 3 DSC carries the same legal weight as a handwritten signature under IT Act, 2000.' },
                ].map((f, i) => (
                  <div key={i} className={`flex gap-3 items-start p-3 rounded-xl border ${dm ? 'bg-slate-900/30 border-slate-900/50' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <span className="flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${dm ? 'text-slate-100' : 'text-slate-800'}`}>{f.title}</p>
                      <p className={`text-xs mt-0.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">

            
              <LeadForm serviceName={"Consultation"} dm={isDarkMode} />

            
            </div>

            
          </div>

            
        </div>

            
      </section>

      {/* Pricing Section */}
      <section className={`py-16 transition-colors duration-300 ${dm ? 'bg-slate-900/10' : 'bg-[#f8fafc]'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3b82f6] dark:text-blue-400">
              Select the Best DSC Plan
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, i) => {
              const hasToken = tokenEnabled[i];
              const displayPrice = plan.price + (hasToken ? 600 : 0);
              
              return (
              <div key={i} className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 ${plan.popular ? `border-4 border-[#1e3a8a] ${dm ? 'bg-slate-900/50 shadow-2xl shadow-blue-900/20' : 'bg-white shadow-2xl'}` : `border border-slate-200 ${dm ? 'bg-slate-900/30' : 'bg-white shadow-lg'}`}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#1e3a8a] px-5 py-1.5 text-xs font-bold text-white shadow-md flex items-center gap-1.5">
                    ✨ Most Popular
                  </div>
                )}
                <div>
                  <div className="flex justify-center mb-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${plan.iconColor}`}>
                      {plan.icon}
                    </div>
                  </div>
                  <p className={`text-xl font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</p>
                  <p className={`text-xs font-semibold mt-0.5 text-brand-orange`}>{plan.validity}</p>
                  <div className={`mt-2 flex items-baseline gap-1 ${dm ? 'text-white' : 'text-slate-900'}`}>
                    <span className="text-4xl font-extrabold">₹{displayPrice.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className={`mt-6 flex items-center justify-between border-t border-b py-4 ${dm ? 'border-slate-800' : 'border-slate-100'}`}>
                    <span className={`text-sm font-semibold ${dm ? 'text-slate-300' : 'text-slate-700'}`}>Add Physical Token (+₹600)</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newTokens = [...tokenEnabled];
                        newTokens[i] = !newTokens[i];
                        setTokenEnabled(newTokens);
                      }}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasToken ? 'bg-brand-orange' : (dm ? 'bg-slate-700' : 'bg-slate-300')}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasToken ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  
                  <ul className={`mt-6 space-y-3.5 text-sm ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex gap-3 items-start`}>
                        <span className="shrink-0 mt-0.5 text-emerald-500">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="flex w-full items-center justify-center rounded-lg bg-[#f59e0b] py-3 text-sm font-bold text-white hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20">
                    Get Started
                  </a>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <section className={`sticky top-[73px] z-40 border-b transition-colors duration-300 ${dm ? 'border-slate-900 bg-slate-950/90 backdrop-blur-md' : 'border-slate-200 bg-white/90 backdrop-blur-md shadow-sm'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex overflow-x-auto no-scrollbar items-center justify-start lg:justify-center">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'eligibility', label: 'Eligibility' },
              { id: 'documents', label: 'Documents' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'updates', label: '2026 Updates' },
              { id: 'faq', label: "FAQ's" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`whitespace-nowrap px-6 py-4 text-sm transition-all border-t-2 ${
                  activeSection === tab.id 
                  ? `border-brand-orange font-bold ${dm ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}` 
                  : `border-transparent font-medium ${dm ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* 1. Overview */}
      <section id="overview" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Overview & Legal Definition</h2>
          <div className={`space-y-8 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is a Digital Signature Certificate</h3>
              <p>
                A Digital Signature Certificate is an encrypted digital identity credential issued to an individual or an organisation by a licensed <strong className={dm ? 'text-white' : 'text-slate-900'}>Certifying Authority (CA)</strong>, operating under the supervision of the <strong className={dm ? 'text-white' : 'text-slate-900'}>Controller of Certifying Authorities (CCA)</strong>. It doesn&apos;t just prove who you are online — it&apos;s a legally recognised way of putting your signature on an electronic record, carrying the same standing as a handwritten signature under the <strong className={dm ? 'text-white' : 'text-slate-900'}>Information Technology Act, 2000</strong>.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>How a DSC Works</h3>
              <p className="mb-3">
                A DSC is built on <strong className={dm ? 'text-white' : 'text-slate-900'}>Public Key Infrastructure (PKI)</strong> — a cryptographic system that pairs two mathematically linked keys with your verified identity: a <strong className={dm ? 'text-white' : 'text-slate-900'}>private key</strong>, which stays with you and is used to sign documents, and a <strong className={dm ? 'text-white' : 'text-slate-900'}>public key</strong>, embedded in the certificate itself, which anyone can use to verify that signature.
              </p>
              <p>
                Once the CA binds this key pair to your identity, two things become verifiable at once whenever you sign a document: first, that the signature genuinely belongs to you, and second, that the document hasn&apos;t been altered in any way since you signed it. If even a single character changes after signing, the signature no longer validates — which is what makes a DSC meaningfully more tamper-evident than a scanned signature or a typed name.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>DSC Classes Explained</h3>
              <p className="mb-4">
                India previously had a tiered system of DSC classes with different assurance levels. That structure has since been simplified — here&apos;s where things stand today.
              </p>
              <DataTable
                headers={['DSC Class', 'Current Status', 'Assurance / Verification', 'Typical Use']}
                rows={[
                  ['Class 3', 'Currently issued for individuals and organisations', 'Highest assurance level — requires video-based (or in-person) identity verification against Aadhaar/PAN', 'MCA filings, GST, income tax e-filing, e-tendering, trademark filings, e-procurement'],
                  ['Class 2', 'Discontinued for new issuance from 1 January 2021, per CCA directive', 'Previously verified against a pre-existing, trusted database without live video verification', 'Was formerly used for routine filings before being merged into Class 3'],
                ]}
                dm={dm}
              />
              <p className="mt-4">
                In practice, this means every DSC issued today — whether for an individual, a director, or an organisation — is a Class 3 certificate. There is no lower-assurance option available anymore for fresh applications. On validity, a DSC is typically issued for a fixed term of <strong className={dm ? 'text-white' : 'text-slate-900'}>1, 2, or 3 years</strong>; once that period lapses, the certificate simply stops working, and a fresh DSC — with a fresh KYC — is needed to continue signing electronically.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Legal Validity Under the IT Act, 2000</h3>
              <p className="mb-3">
                The legal weight of a DSC doesn&apos;t come from convention — it&apos;s written directly into statute. <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 3</strong> of the IT Act sets out how a digital signature is used to authenticate an electronic record, while <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 5</strong> is what actually gives it legal teeth — it states that where a law requires a document to be signed, that requirement is satisfied if the document is authenticated using a digital signature, putting it on equal legal footing with a handwritten signature.
              </p>
              <p>
                <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 35</strong> governs the other side of this — the actual issuance process. It sets out how a person applies to a Certifying Authority for a DSC, what the CA must verify before issuing one, and the conditions under which an application can be accepted or refused. Together, these three provisions are what let a government portal, a bank, or a counterparty treat a digitally signed document as if you&apos;d signed it in ink in front of them.
              </p>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>DSC vs Digital Signature vs E-Signature</h3>
              <p className="mb-4">
                These three terms get used almost interchangeably in everyday conversation, but they aren&apos;t the same thing. A &ldquo;digital signature&rdquo; is the underlying cryptographic mechanism (the PKI process described above); a DSC is that mechanism formally bound to your verified identity by a licensed CA; and an &ldquo;e-signature&rdquo; or click-to-sign tool is a separate, much lower-assurance category that doesn&apos;t involve a CA at all.
              </p>
              <DataTable
                headers={['Parameter', 'DSC (Digital Signature Certificate)', 'E-Signature / Click-to-Sign']}
                rows={[
                  ['Issued By', 'A licensed Certifying Authority operating under CCA supervision', 'A private software platform, with no CA or government oversight involved'],
                  ['Underlying Technology', 'Public Key Infrastructure (PKI) — a cryptographic key pair bound to a verified identity', 'Typically a typed name, uploaded image, or click-based acknowledgment, sometimes paired with a basic audit trail'],
                  ['Identity Verification', 'Video-based or in-person KYC checked against Aadhaar/PAN records', 'Usually just an email link or OTP confirmation, without formal identity proofing'],
                  ['Accepted for Government/Regulatory Filings', 'Yes — MCA, GST, Income Tax, e-tendering, and other statutory portals', 'Generally no — not accepted for MCA, GST, or income tax filings'],
                  ['Typical Use', 'Regulatory and statutory filings that require strong, verifiable identity assurance', 'Informal document signing — contracts, HR letters, internal approvals'],
                ]}
                dm={dm}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Eligibility */}
      <section id="eligibility" className="py-16 pt-24 -mt-8 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility & Use Cases</h2>
          <div className={`space-y-8 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>

            <div>
              <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Apply for a DSC</h3>
              <div className="space-y-4">
                <p>
                  <strong className={dm ? 'text-white' : 'text-slate-900'}>Individuals</strong><br />
                  Any individual can apply for a DSC in their personal capacity — for e-verifying documents, e-KYC on financial and government portals, or signing filings as a freelance professional. This is the most common category and doesn&apos;t require any business or organisational affiliation.
                </p>
                <p>
                  <strong className={dm ? 'text-white' : 'text-slate-900'}>Organisations</strong><br />
                  Companies, LLPs, partnership firms, and proprietorships apply for a DSC through their directors or authorised signatories, who hold the certificate on the entity&apos;s behalf. The certificate itself is still issued to a named individual, but with the organisation&apos;s details attached, reflecting that person&apos;s authority to sign on the entity&apos;s behalf.
                </p>
                <p>
                  <strong className={dm ? 'text-white' : 'text-slate-900'}>Foreign Nationals & Entities</strong><br />
                  Foreign nationals and foreign entities can also obtain a DSC in India, though the documentation requirement is stricter — typically an apostilled or notarised copy of the passport and other identity documents, since Aadhaar-based e-KYC isn&apos;t available to non-residents.
                </p>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Common Use Cases</h3>
              <p className="mb-4">
                A DSC shows up across a wide range of government and regulatory portals — here&apos;s where it&apos;s used most often.
              </p>
              <DataTable
                headers={['Category', 'Typical Filings / Activity']}
                rows={[
                  ['MCA / ROC Filings', 'Signing SPICe+, AOC-4, MGT-7/7A, DIR-3 KYC, and other Registrar of Companies e-forms — mandatory for directors and authorised signatories'],
                  ['Income Tax & GST', 'E-verifying ITR filings (mandatory for companies and firms subject to statutory audit), and signing GST registration and return filings'],
                  ['E-Tendering & E-Procurement', 'Submitting bids on government procurement portals such as GeM (Government e-Marketplace) and CPPP (Central Public Procurement Portal)'],
                  ['Trademark & IP Filings', 'Signing trademark and patent applications filed with the Controller General of Patents, Designs and Trade Marks'],
                  ['Import-Export', 'IEC (Import Export Code)-related filings with the DGFT'],
                  ['EPFO & Labour Filings', 'Employer-side filings on the EPFO portal and other labour compliance platforms'],
                ]}
                dm={dm}
              />
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Is Required (Not Just Eligible) to Hold a DSC</h3>
              <p className="mb-3">
                Most of the use cases above are optional in the sense that a DSC makes them possible, but a few categories don&apos;t have a choice in the matter — a DSC is a hard requirement, not a convenience:
              </p>
              <ul className="list-disc pl-5 space-y-2.5">
                <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Company directors and authorised signatories</strong> filing forms on the MCA portal — there&apos;s no alternative signing method accepted for these e-forms.</li>
                <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Taxpayers subject to statutory audit under Section 44AB</strong> filing their Income Tax Return — DSC-based verification is mandatory for these filers, rather than the OTP-based e-verification available to smaller taxpayers.</li>
                <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Any entity submitting a government e-tender</strong> — portals like GeM and CPPP require a valid Class 3 DSC to authenticate and submit a bid at all.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Documents */}
      <section id="documents" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Document Checklist</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Aadhaar Card:</strong> For Aadhaar-based OTP verification and e-KYC.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>PAN Card:</strong> Clear scan of the applicant&apos;s PAN card.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Passport Photo:</strong> A recent passport-size photograph.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Video KYC:</strong> A 2-minute live video recording confirming your identity.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section id="timeline" className="py-16 pt-24 -mt-8 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Realistic Timeline</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ol className="list-decimal pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Application (5 Mins):</strong> Filling basic details and Aadhaar verification.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Video KYC (5 Mins):</strong> Live recording to authenticate the applicant.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Issuance (15-30 Mins):</strong> Once approved by the CA, the DSC is instantly issued. Soft tokens are available immediately, USB tokens are dispatched the same day.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. Updates */}
      <section id="updates" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>2026 DSC Guidelines Updates</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Class 2 Abolished:</strong> Note that Class 2 DSCs have been entirely discontinued by the CCA. Only Class 3 DSCs are issued now.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Paperless Mandatory:</strong> Physical document submission is completely phased out in favor of Aadhaar eKYC and PAN KYC.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-16 pt-24 -mt-8 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">FAQ</h2>
            <p className={`mt-2 text-2xl font-bold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>Common Questions</p>
          </div>
          <div className={`divide-y border rounded-2xl p-4 ${dm ? 'divide-slate-900 border-slate-900 bg-slate-950/40' : 'divide-slate-200 border-slate-200 bg-white shadow-sm'}`}>
            {faqs.map((faq, i) => (
               <div key={i} className="py-4 first:pt-2 last:pb-2">
                 <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="flex w-full items-center justify-between text-left font-semibold py-2 focus:outline-none cursor-pointer">
                   <span className={dm ? 'text-white' : 'text-slate-800'}>{faq.q}</span>
                   <span className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-transform ${activeFaq === i ? 'rotate-180 text-brand-orange' : 'text-slate-400'} ${dm ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                   </span>
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 max-h-0 ${activeFaq === i ? 'max-h-64 mt-2' : ''}`}>
                   <p className={`text-sm pr-8 leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{faq.a}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      <Footer isDarkMode={dm} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName="Digital Signature Certificate"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
