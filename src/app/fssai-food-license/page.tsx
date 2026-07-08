'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import PopupForm from '../components/PopupForm';
import { submitLead } from '../actions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const faqs = [
  { q: 'Who mandatorily needs an FSSAI license?', a: 'Any individual or entity involved in the manufacture, processing, storage, distribution, or sale of food products in India must obtain FSSAI registration or license.' },
  { q: 'What is the difference between Registration and License?', a: 'Registration is for petty food businesses with turnover < ₹12 lakhs. State License is for medium businesses (₹12 lakhs - ₹20 crores). Central License is for large businesses (> ₹20 crores) or multi-state operations.' },
  { q: 'Is FSSAI registration mandatory for home-based food businesses?', a: 'Yes. Home bakers, tiffin services, and cloud kitchens must obtain at least an FSSAI Basic Registration.' },
  { q: 'How long is an FSSAI license valid?', a: 'Valid for 1 to 5 years. Renewal must be applied for at least 30 days before expiry.' },
  { q: 'What are penalties for operating without FSSAI registration?', a: 'Operating without FSSAI registration can attract a fine of up to ₹5 lakhs and imprisonment of up to 6 months.' },
];

const heroFeatures = [
  'Complete FSSAI Application Filing',
  'Document Preparation & Review',
  'License Type Assessment',
  'FSSAI Portal Registration',
  'FSSAI License Certificate',
  'Renewal Reminder Service',
];

const pricingInclusions = [
  'FSSAI License Certificate',
  'Complete Application Filing',
  'Document Preparation',
  'License Type Assessment',
  'FSSAI Portal Registration',
  'Application Follow-up',
  'Query Response Handling',
  'License Delivery',
  'Renewal Reminders',
  'Compliance Guidance',
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

export default function FssaiFoodLicensePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="FSSAI Food License" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Now Facilitating FSSAI License Registration
                <span className="font-bold ml-0.5">&gt;</span>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                FSSAI Registration<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Online in India</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                FSSAI Food License Assistance in Just 7-15 Days - Starting @ ₹1,499 Only
              </p>
              <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                100% Online Process. FSSAI Compliant. Expert Support.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: 'Legal Compliance', desc: 'Avoid fines up to ₹5 lakhs and business shutdown for operating unlicensed.' },
                  { title: 'Consumer Trust', desc: 'Display your FSSAI number on packaging, menu, and signage to build credibility.' },
                  { title: 'All FBO Types', desc: 'Covers manufacturers, restaurants, cloud kitchens, importers, and e-commerce.' },
                  { title: 'Fast Processing', desc: 'Basic registration in 7 days; State/Central licenses in 30–45 days.' },
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
                FSSAI Registration Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹1,499
                </span>
              </div>
              <p className="text-white/85 text-xs max-w-xl mx-auto mb-4 leading-relaxed">
                ComplianceBharo professional fee for end-to-end assistance. Government fees (FSSAI registration fee of ₹100/year for Basic Registration) are charged separately at actuals.
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
                *Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. Government/statutory fees are charged separately at actuals.
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
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>What Is FSSAI Registration/License</strong><br/>
            FSSAI Registration/License is the mandatory authorisation that every Food Business Operator (FBO) in India must secure from the Food Safety and Standards Authority of India before they can manufacture, store, transport, distribute, or sell any food product. FSSAI functions as an autonomous body under the Ministry of Health & Family Welfare, Government of India, and was constituted under the Food Safety and Standards Act, 2006. In practice, this authorisation is what tells the government — and your customers — that a named individual or entity is accountable for the food changing hands, and that the operation has been checked against baseline safety norms before it is allowed to run.</p>

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Legal Basis</strong><br/>
            The Food Safety and Standards Act, 2006 consolidates what used to be a scattered set of food-related laws into a single framework, giving FSSAI the authority to set science-based standards for food articles and to regulate their manufacture, storage, distribution, sale, and import. Beyond safety limits for contaminants and additives, the Act and its associated regulations also govern packaging norms and how a product must be labelled — net quantity, ingredients, allergen declarations, and manufacturing/expiry details among them. Trading without a valid FSSAI registration or license is not a mere formality lapse; it is treated as a punishable offense, and the penalties for doing so can run up to ₹5 lakh, with imprisonment on the table in more serious cases.</p>

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Why It Matters</strong><br/>
            There are two reasons an FBO cannot treat this as optional. The first is legal necessity — the requirement to hold FSSAI registration or license applies uniformly to every food business regardless of its size, so a home baker taking orders on WhatsApp is under the same underlying obligation as a large-scale food manufacturer, even though the specific tier they need differs. The second is the commercial value of the FSSAI number itself: once displayed on packaging, a menu card, or premises signage, it acts as a visible signal to customers that the business has been through FSSAI&apos;s compliance checks, which in a food business — where trust is earned meal by meal — is not a small thing.</p>

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Types of FSSAI Registration/License</strong><br/>
            Which of the three tiers applies to a given business is determined primarily by annual turnover, along with a few category-specific exceptions. The table below summarises how they compare.</p>

            <DataTable
              dm={dm}
              headers={['Type', 'Applicable To', 'Regulator', 'Validity', 'Processing Time']}
              rows={[
                ['Basic Registration', 'Annual turnover up to ₹12 lakh — petty food manufacturers, home-based food businesses, small retailers, and other small-scale FBOs', 'State FSSAI Authority', '1–5 years (renewable)', '7–10 working days'],
                ['State License', 'Annual turnover between ₹12 lakh and ₹20 crore — medium-sized manufacturers, restaurants, and transporters operating within a single state', 'State FSSAI Authority', '1–5 years (renewable)', '30–45 working days'],
                ['Central License', 'Annual turnover above ₹20 crore, and specific categories such as importers, exporters, large-scale manufacturers, and businesses operating across multiple states', 'Central FSSAI Authority', '1–5 years (renewable)', '30–60 working days'],
              ]}
            />

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Who Needs It</strong><br/>
            FSSAI registration or license is not limited to large food companies — it covers virtually every point where food changes hands commercially. Common categories include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Restaurants, cafes, and dhabas</li>
              <li>Cloud kitchens and delivery-only food brands</li>
              <li>Food manufacturers and processors</li>
              <li>Packaged food sellers and distributors</li>
              <li>Importers and exporters of food products</li>
              <li>E-commerce platforms selling or fulfilling food orders</li>
              <li>Caterers and event food service providers</li>
              <li>Home-based food businesses (bakers, tiffin services, pickle/snack makers)</li>
              <li>Dairy, meat, and fish processors</li>
            </ul>

            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Consequences of Non-Compliance</strong><br/>
            The Act builds in a graded penalty structure rather than a single flat fine, and it scales with how serious the lapse is:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Operating a food business without the applicable FSSAI registration or license is punishable under Section 63 of the Act, with fines that can extend up to ₹5 lakh.</li>
              <li>Where the violation involves unsafe or substandard food rather than just a missing license, Sections 59 to 66 of the Act prescribe escalating penalties depending on the harm caused — ranging from monetary fines to imprisonment in cases that cause grievous injury or death.</li>
              <li>Every registered or licensed FBO is required to prominently display their FSSAI registration/license certificate at their business premises — failing to do so is itself a compliance lapse that inspecting authorities can flag.</li>
            </ul>

          </div>
        </div>
      </section>

      {/* 2. Eligibility */}
      <section id="eligibility" className="py-16 pt-24 -mt-8 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility & License Types</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Basic Registration:</strong> For petty food businesses with a turnover of less than ₹12 lakhs per annum.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>State License:</strong> For medium businesses with a turnover between ₹12 lakhs and ₹20 crores.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Central License:</strong> For large businesses with a turnover above ₹20 crores, or those operating across multiple states.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Documents */}
      <section id="documents" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Document Checklist</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Identity Proof:</strong> Aadhaar Card / Voter ID / Passport.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Business Proof:</strong> Shop & Establishment Certificate, Rent Agreement, or Utility Bill.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Additional Docs (State/Central):</strong> Water test report, NOC, List of directors/partners, layout plan.</li>
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
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Basic Registration (7-10 Days):</strong> Once filed, it usually gets approved in 7-10 working days.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>State/Central License (30-45 Days):</strong> Requires detailed document scrutiny and possible physical inspection by a Food Safety Officer.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. Updates */}
      <section id="updates" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>2026 FoSCoS Updates</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>FoSCoS Portal:</strong> The Food Safety Compliance System (FoSCoS) has completely replaced the older FLRS system, making the process faster and paperless.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Annual Returns:</strong> Online filing of annual returns is now strictly monitored.</li>
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
          serviceName="FSSAI Food License"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
