'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import PopupForm from '../components/PopupForm';
import { submitLead } from '../actions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  { q: 'Is IEC mandatory for service exporters?', a: 'Service exporters are generally exempt unless receiving foreign remittances through banking channels that require AD Code, or claiming IGST refund under LUT/SEIS benefits.' },
  { q: 'Does the IEC need to be renewed every year?', a: 'No, it has lifetime validity. However, DGFT mandates an annual update/confirmation of IEC details on their portal between April and June.' },
  { q: 'What is an AD Code and why do I need it?', a: 'AD Code (Authorised Dealer Code) is issued by your bank branch. It is mandatory for customs port filing (ICEGATE) to export goods.' },
  { q: 'Can an individual or sole proprietor get an IEC?', a: 'Yes. For a sole proprietorship, the IEC is issued against the PAN of the individual. One entity can hold only one IEC.' },
  { q: 'What is RCMC?', a: 'Registration cum Membership Certificate (RCMC) is issued by Export Promotion Councils to claim benefits under the Foreign Trade Policy.' },
];

export default function ImportExportCodeClient() {
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="Import Export Code" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Import Export Code Registration Services
                <span className="font-bold ml-0.5">&gt;</span>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dm ? 'text-white' : 'text-slate-900'}`}>
                IEC Registration<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Online in India</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                Get Your Import Export Code (IEC) in Just 2-3 Days - Starting @ ₹1,499 Only
              </p>
              <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                DGFT Approved. Lifetime Validity. 100% Online Process.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: 'Lifetime Validity', desc: 'IEC never expires — one registration covers you for your entire trading journey. No annual renewal fee.' },
                  { title: 'Zero Post-Registration Compliance', desc: 'No GST-style returns, no MCA annual filings. Just a yearly DGFT portal confirmation (free).' },
                  { title: 'Customs Clearance Ready', desc: 'Mandatory for all import/export customs filings through ICEGATE at Indian ports and airports.' },
                  { title: 'DGFT Benefits Unlocked', desc: 'Access MEIS, SEIS, RoDTEP, Advance Authorisation and duty drawback schemes post IEC issuance.' },
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
              <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                  {[
                    '10-Digit IEC Number',
                    'Lifetime Validity',
                    'DGFT Portal Registration',
                    'Import & Export Authorization',
                    'Digital IEC Certificate',
                    'Modification & Update Support',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 shrink-0 mt-0.5 ${dm ? 'text-orange-400' : 'text-orange-500'}`}><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                      <span className={`text-sm font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
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
                IEC Registration Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹1,499
                </span>
              </div>
              <p className="text-white/85 text-xs max-w-xl mx-auto mb-4 leading-relaxed">
                ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees (currently ₹500 for IEC) are charged separately at actuals.
              </p>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Timeline depends on the application type and authority review
              </div>
            </div>

            <div className={`relative -mt-16 mx-4 sm:mx-8 mb-8 rounded-2xl p-6 sm:p-8 shadow-xl ${dm ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg> Application support
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-orange-500/10 text-brand-orange border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> Professional assistance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {[
                  'Free Consultation',
                  'Eligibility Assessment',
                  'Document Preparation',
                  'DGFT Portal Filing',
                  'Application Tracking',
                  'Query Resolution',
                  'IEC Certificate',
                  'Digital Signature Support',
                  'Bank Account Linking',
                  'Modification Support',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${dm ? 'text-green-400' : 'text-green-500'}`}><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                    <span className={`text-[15px] font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-6">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`px-8 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-transform hover:scale-105 ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                  </svg>
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
            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Import Export Code (IEC)</strong><br/>The IEC is a key business identification number required for exporting or importing from India. Issued by the Directorate General of Foreign Trade (DGFT), it is mandatory for any commercial cross-border transaction.</p>
            <p><strong className={dm ? 'text-white' : 'text-slate-900'}>Why is it important?</strong><br/>No export or import shall be made by any person without an IEC unless specifically exempted.</p>
          </div>
        </div>
      </section>

      {/* 2. Eligibility */}
      <section id="eligibility" className="py-16 pt-24 -mt-8 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Eligibility & Requirements</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <p>Any business entity or individual is eligible to apply. You can apply as a:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Proprietorship:</strong> Uses the individual&apos;s PAN.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Partnership / LLP / Company:</strong> Uses the entity&apos;s PAN.</li>
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
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>PAN Card:</strong> PAN of the business entity or individual.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Bank Proof:</strong> Cancelled cheque or bank certificate on bank letterhead.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Address Proof:</strong> Electricity bill, rent agreement, or lease deed of the registered office.</li>
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
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Application Filing (1 Day):</strong> Submitting details on the DGFT portal using DSC.</li>
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Issuance (1-2 Days):</strong> Automatic or semi-automatic issuance by the DGFT portal.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. Updates */}
      <section id="updates" className="py-16 pt-24 -mt-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={`text-3xl font-extrabold tracking-tight mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>2026 DGFT Updates</h2>
          <div className={`space-y-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
            <ul className="list-disc pl-5 space-y-4">
              <li><strong className={dm ? 'text-white' : 'text-slate-900'}>Annual Update Mandatory:</strong> Every IEC holder must update their details on the DGFT portal every year between April and June, even if there are no changes. Failure to do so will result in deactivation.</li>
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
          serviceName="Import Export Code"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
