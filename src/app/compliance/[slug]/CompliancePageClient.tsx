'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import PopupForm from '../../components/PopupForm';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { submitLead } from '../../actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { COMPLIANCE_DATABASE } from '../../../lib/compliance-data';

const DEFAULT_TABS = ['overview', 'documents', 'process', 'faq'];

const TAB_LABELS: Record<string, string> = {
  overview: 'Overview',
  checklist: 'Checklist',
  'due-dates': 'Due Dates',
  exemptions: 'Exemptions',
  form11: 'Form 11',
  form8: 'Form 8',
  penalties: 'Penalties',
  cost: 'Cost',
  process: 'Process',
  'first-year': 'First Year',
  audit: 'Audit Requirement',
  comparison: 'Comparison',
  documents: 'Documents',
  faq: 'FAQs',
};

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

export default function CompliancePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [activeTab, setActiveTab] = useState('overview');

  const [state, formAction, pending] = useActionState(submitLead, null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  const slug = params?.slug as string;
  const data = COMPLIANCE_DATABASE[slug];
  const rich = data?.rich;
  const tabs = rich
    ? [
        'overview',
        'checklist',
        'due-dates',
        ...(rich.exemptions ? ['exemptions'] : []),
        ...(rich.form11 ? ['form11'] : []),
        ...(rich.form8 ? ['form8'] : []),
        'penalties',
        'cost',
        'process',
        ...(rich.firstYearRows ? ['first-year'] : []),
        ...(rich.auditRequirement ? ['audit'] : []),
        'comparison',
        'documents',
        'faq',
      ]
    : DEFAULT_TABS;

  // Handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav + some padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  // Setup Intersection Observer for active tab
  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    tabs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
        <h1 className="text-4xl font-extrabold text-brand-orange mb-2">Service Route Activated</h1>
        <p className="text-slate-400 text-center max-w-md mb-6">Path for &ldquo;{slug}&rdquo; verified. Full content coming soon.</p>
        <Link href="/" className="px-5 py-2 rounded-xl bg-brand-orange font-semibold hover:bg-orange-600 transition-all text-sm text-white">Return to Dashboard</Link>
      </div>
    );
  }

  const dm = isDarkMode;
  const isRichPlan = slug === 'annual-pvt-ltd-compliance' || slug === 'llp-annual-compliance' || slug === 'opc-annual-compliance';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb={data.title} />

      {/* Hero + Lead Form */}
      <section className="relative overflow-hidden pt-6 pb-8 lg:pt-10 lg:pb-12 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6 lg:pt-2">
              {slug === 'annual-pvt-ltd-compliance' || slug === 'llp-annual-compliance' || slug === 'opc-annual-compliance' ? (
                <div className="flex flex-col gap-3">
                  <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    {slug === 'annual-pvt-ltd-compliance' 
                      ? 'Trusted by 250+ Pvt Ltd companies | 200+ Expert Professional across India'
                      : slug === 'llp-annual-compliance'
                      ? 'Expert assists with all your LLP filings from ₹1,999'
                      : '2,000+ OPCs compliant and penalty-free with ComplianceBharo'}
                    <span className="font-bold ml-0.5">&gt;</span>
                  </div>

                  <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                    {slug === 'annual-pvt-ltd-compliance' ? (
                      <>
                        Private Limited Company<br />
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Compliance Services</span>
                      </>
                    ) : slug === 'llp-annual-compliance' ? (
                      <>
                        LLP Annual Compliance <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Services</span>
                      </>
                    ) : (
                      <>
                        OPC Annual Compliance <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Services</span> in India
                      </>
                    )}
                  </h1>

                  <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                    {slug === 'annual-pvt-ltd-compliance' ? (
                      <>AOC-4, MGT-7, DIR-3 KYC, Board Meetings, AGM, Audit & Tax Returns Filed On Time by Expert tax experts/compliance experts @ <span className="font-bold text-brand-orange">₹2,999/year</span> Only</>
                    ) : slug === 'llp-annual-compliance' ? (
                      <>File Form 11, Form 8, DIR-3 KYC & ITR-5 On Time <span className="font-bold text-brand-orange">Dedicated Expert Support</span> - Starting @ <span className="font-bold text-brand-orange">₹1,999</span> Only</>
                    ) : (
                      <>Complete OPC Annual Compliance with <span className="font-bold text-brand-orange">Expert Support</span> in <span className="font-bold text-brand-orange">7 to 15 Days</span> @ <span className="font-bold text-brand-orange">₹2,299</span> Only</>
                    )}
                  </p>

                  <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    {slug === 'annual-pvt-ltd-compliance' ? (
                      '100% Online Process. Zero Penalties. 7 to 15 Working Days Per Filing. FY 2026-27 Filing Season Open.'
                    ) : slug === 'llp-annual-compliance' ? (
                      '100% Online Process. 7-15 Working Days. Avoid ₹100/Day Penalties.'
                    ) : (
                      '100% Online Process. Avoid ₹100/Day Penalties. On-Time Filing for 2,000+ OPCs.'
                    )}
                  </p>

                  {/* Features Grid */}
                  <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                      {(slug === 'annual-pvt-ltd-compliance' ? [
                        "Annual Return Filing (MGT-7/MGT-7A)",
                        "Financial Statements Filing (AOC-4)",
                        "Director KYC (DIR-3 KYC) for All Directors",
                        "Auditor Appointment Filing (ADT-1)",
                        "Board Meeting & AGM Minutes Drafting",
                        "Statutory Audit Coordination",
                        "Income Tax Return (ITR-6)",
                        "GST & TDS Return Filing",
                        "Statutory Register Maintenance",
                        "Compliance Calendar with Deadline Alerts"
                      ] : slug === 'llp-annual-compliance' ? [
                        "Form 11 Annual Return Filing (Due 30 May)",
                        "Form 8 Statement of Accounts (Due 30 Oct)",
                        "DIR-3 KYC for Designated Partners",
                        "ITR-5 Income Tax Return Filing",
                        "GST & TDS Return Filing Support",
                        "Compliance Calendar & Deadline Tracking",
                        "Statutory Audit Coordination (if applicable)",
                        "MCA Notice Response Support"
                      ] : [
                        "Financial Statement Filing (AOC-4)",
                        "Annual Return Filing (MGT-7A)",
                        "Director KYC (DIR-3 KYC)",
                        "Statutory Audit Coordination",
                        "Income Tax Return (ITR-6)",
                        "Compliance Calendar Management"
                      ]).map((feature, idx) => (
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
              ) : (
                <>
                  <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                    {data.badge}
                  </div>
                  <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                    {data.title}<br />
                    <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">{data.tagline}</span>
                  </h1>
                  <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                    {data.desc}
                  </p>
                </>
              )}
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={data.title || "Consultation"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      {/* Pricing Plans */}
      <section className={`pt-6 pb-16 lg:pt-10 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        {slug === 'annual-pvt-ltd-compliance' || slug === 'llp-annual-compliance' || slug === 'opc-annual-compliance' ? (
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
                  {slug === 'annual-pvt-ltd-compliance'
                    ? 'Private Limited Company Compliance Package 2026'
                    : slug === 'llp-annual-compliance'
                    ? 'LLP Annual Compliance Package'
                    : 'OPC Annual Compliance Package'
                  }
                </h3>
                <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <span className="text-lg opacity-90">From</span>
                  <span className="text-6xl font-extrabold tracking-tight">
                    {slug === 'annual-pvt-ltd-compliance' ? '₹2,999' : slug === 'llp-annual-compliance' ? '₹1,999' : '₹2,299'}
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
                  {(slug === 'annual-pvt-ltd-compliance' ? [
                    "Annual Return Filing (MGT-7/MGT-7A)",
                    "Financial Statement Filing (AOC-4)",
                    "Director KYC (DIR-3 KYC) for All Directors",
                    "Auditor Appointment Filing (ADT-1)",
                    "Board Meeting Minutes (4 Meetings/Year)",
                    "AGM Notice, Minutes & Resolutions",
                    "Statutory Register Maintenance",
                    "Income Tax Return (ITR-6)",
                    "TDS Return Filing (24Q/26Q)",
                    "Compliance Calendar with Deadline Alerts"
                  ] : slug === 'llp-annual-compliance' ? [
                    "Form 11 Annual Return Filing",
                    "Form 8 Statement of Accounts Filing",
                    "DIR-3 KYC for All Designated Partners",
                    "ITR-5 Income Tax Return Filing",
                    "GST Return Filing Support",
                    "TDS Return Filing (if applicable)",
                    "Financial Statement Preparation",
                    "Compliance Calendar Management",
                    "MCA Notice Response Support",
                    "Dedicated Expert Manager"
                  ] : [
                    "Annual Return Filing (MGT-7A)",
                    "Financial Statement Filing (AOC-4)",
                    "Director KYC (DIR-3 KYC)",
                    "Board Meeting Minutes Drafting",
                    "Statutory Register Maintenance",
                    "Income Tax Return (ITR-6)",
                    "GST Return Filing Support",
                    "TDS Return Filing",
                    "Compliance Calendar Management",
                    "Dedicated Expert Support"
                  ]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckIcon className={`h-5 w-5 shrink-0 ${dm ? 'text-green-400' : 'text-green-500'}`} />
                      <span className={`text-sm font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
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
                  *Listed amounts are ComplianceBharo professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
                </p>

                <div className="flex flex-col items-center justify-center gap-2 mb-8">
                  <div className="flex text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                  </div>
                  <span className={`text-sm font-semibold ${dm ? 'text-slate-300' : 'text-slate-700'}`}>4.9/5 based on 1000+ reviews</span>
                </div>

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
        ) : (
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>Choose Your Plan</h2>
              <p className={`mt-3 text-lg ${dm ? 'text-slate-400' : 'text-slate-600'}`}>Transparent pricing with no hidden fees.</p>
            </div>
            <div className={`grid grid-cols-1 ${isRichPlan ? 'gap-6 lg:grid-cols-3 lg:items-stretch' : 'gap-8 sm:grid-cols-2 lg:grid-cols-3'} max-w-6xl mx-auto`}>
              {data.plans.map((plan, i) => (
                <div key={plan.name} className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  isRichPlan
                    ? `${dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`
                    : (i === 1
                      ? `border-brand-orange shadow-2xl shadow-orange-500/10 scale-105 z-10 flex flex-col justify-between ${dm ? 'bg-slate-900' : 'bg-white'}`
                      : `flex flex-col justify-between ${dm ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900' : 'border-slate-200 bg-white hover:border-slate-300'}`)
                }`}>
                  {i === 1 && !isRichPlan && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-orange-400 to-brand-orange px-4 py-1 text-xs font-bold text-white shadow-lg">Most Popular</span>
                    </div>
                  )}
                  <div className="mb-6">
                    {isRichPlan ? (
                      <div className={`flex items-center gap-2 ${plan.textColor} mb-2`}>
                        {plan.icon && <div dangerouslySetInnerHTML={{ __html: plan.icon }} />}
                        <h3 className="text-sm font-extrabold tracking-wider">{plan.name}</h3>
                      </div>
                    ) : (
                      <h3 className={`text-xl font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    )}
                    <div className={`mt-4 flex items-baseline ${isRichPlan ? 'gap-1' : 'text-5xl font-extrabold text-brand-orange'}`}>
                      {isRichPlan ? (
                        <>
                          <span className={`text-4xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>
                            {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString('en-IN')}` : (plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`)}
                          </span>
                        </>
                      ) : (
                        <>
                          {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString('en-IN')}` : (plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`)}
                          {typeof plan.price === 'string' && plan.price.includes('/') && (
                            <span className={`ml-1 text-lg font-medium ${dm ? 'text-slate-500' : 'text-slate-400'}`}></span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {isRichPlan && (
                    <div className={`mb-4 text-sm font-semibold ${dm ? 'text-slate-300' : 'text-slate-800'}`}>
                      What you&apos;ll get
                    </div>
                  )}

                  <ul className={`flex-1 space-y-4 ${isRichPlan ? 'mb-4' : 'mb-8'}`}>
                    {plan.features.map((feat, fi: number) => {
                      const isObj = typeof feat !== 'string';
                      const name = isObj ? feat.name : feat;
                      const included = isObj ? feat.included : true;

                      if (isRichPlan) {
                        return (
                          <li key={fi} className={`flex gap-3 items-start text-sm ${included ? (dm ? 'text-slate-200' : 'text-slate-700') : (dm ? 'text-slate-600 line-through' : 'text-slate-400 line-through')}`}>
                            <span className="shrink-0 mt-0.5">
                              {included ? (
                                <CheckIcon className={`h-4 w-4 ${dm ? 'text-slate-400' : 'text-slate-400'}`} />
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${dm ? 'text-red-500/50' : 'text-red-400/80'}`}>
                                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                              )}
                            </span>
                            <span>{name}</span>
                          </li>
                        );
                      }

                      return (
                        <li key={name} className={`flex items-start gap-3 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                          <CheckIcon className="h-5 w-5 text-brand-orange shrink-0" />
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                  <div className={isRichPlan ? 'mt-8 pt-4' : ''}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full block text-center rounded-xl py-3.5 text-sm font-bold transition-all ${
                      isRichPlan
                        ? (plan.buttonClass || 'bg-brand-orange text-white hover:bg-orange-600')
                        : (i === 1
                          ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25'
                          : dm ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                    }`}>
                      Get Started
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Sticky Sub-Navigation */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-xl ${dm ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <a
                key={tab}
                href={`#${tab}`}
                onClick={(e) => scrollToSection(e, tab)}
                className={`whitespace-nowrap py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-brand-orange text-brand-orange'
                    : `border-transparent ${dm ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                }`}
              >
                {TAB_LABELS[tab] ?? (tab.charAt(0).toUpperCase() + tab.slice(1))}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">

          {/* Overview Section */}
          <div id="overview" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>
              {rich ? (rich.overviewTitle ?? 'What Is Annual Compliance for a Private Limited Company?') : 'Overview'}
            </h2>
            <div className={`prose prose-sm max-w-none ${dm ? 'prose-invert text-slate-300' : 'text-slate-600'}`}>
              <p className="text-base leading-relaxed mb-4">
                {rich ? rich.overviewIntro : data.desc}
              </p>
              <p className="text-base leading-relaxed">
                Our experts will handle the entire procedure seamlessly, ensuring full regulatory compliance so that you can focus on running your business. With CA/CS verified guidance, the process is streamlined and hassle-free.
              </p>
            </div>
            {rich && (
              <div className="mt-6">
                <DataTable headers={['Parameter', 'Details']} rows={rich.overviewFacts.map(([label, value]) => [label, value])} dm={dm} />
              </div>
            )}
          </div>

          {/* Checklist Section */}
          {rich && (
            <div id="checklist" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.checklistTitle ?? 'Pvt Ltd Compliance Checklist 2026-27'}</h2>
              <p className={`text-sm mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                {rich.checklistSubtitle ?? 'Every statutory filing a private limited company needs to track through the year, in one place.'}
              </p>
              <DataTable headers={rich.checklistHeaders} rows={rich.checklistRows} dm={dm} />
            </div>
          )}

          {/* Due Dates Section */}
          {rich && (
            <div id="due-dates" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.dueDatesTitle ?? 'Compliance Calendar FY 2026-27'}</h2>
              <DataTable headers={rich.dueDatesHeaders} rows={rich.dueDatesRows} dm={dm} />
            </div>
          )}

          {/* Exemptions Section */}
          {rich?.exemptions && (
            <div id="exemptions" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.exemptions.title}</h2>
              {rich.exemptions.intro && (
                <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{rich.exemptions.intro}</p>
              )}
              <DataTable headers={rich.exemptions.headers} rows={rich.exemptions.rows} dm={dm} />
              {rich.exemptions.note && (
                <div className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  {rich.exemptions.note}
                </div>
              )}
            </div>
          )}

          {/* Form 11 Section */}
          {rich?.form11 && (
            <div id="form11" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.form11.title}</h2>
              <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                {rich.form11.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <DataTable headers={rich.form11.feeHeaders} rows={rich.form11.feeRows} dm={dm} />
            </div>
          )}

          {/* Form 8 Section */}
          {rich?.form8 && (
            <div id="form8" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.form8.title}</h2>
              <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                {rich.form8.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Penalties Section */}
          {rich && (
            <div id="penalties" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Penalties for Non-Compliance</h2>
              <DataTable headers={rich.penaltiesHeaders} rows={rich.penaltiesRows} dm={dm} />
              <div className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
                <strong>Warning: </strong>{rich.penaltiesWarning}
              </div>
              {rich.penaltiesMultiplierHeaders && rich.penaltiesMultiplierRows && (
                <div className="mt-8">
                  <h3 className={`text-base font-bold mb-3 ${dm ? 'text-slate-200' : 'text-slate-800'}`}>Late Filing Fee Multiplier Table</h3>
                  <DataTable headers={rich.penaltiesMultiplierHeaders} rows={rich.penaltiesMultiplierRows} dm={dm} />
                </div>
              )}
              {rich.penaltiesWorkedExample && (
                <div className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                  {rich.penaltiesWorkedExample}
                </div>
              )}
            </div>
          )}

          {/* Cost Section */}
          {rich && (
            <div id="cost" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.costTitle ?? 'Annual Compliance Cost for Pvt Ltd Company 2026'}</h2>
              <h3 className={`text-base font-bold mb-3 ${dm ? 'text-slate-200' : 'text-slate-800'}`}>{rich.govtFeeTitle ?? 'Government Filing Fee (Per Form, by Authorised Capital)'}</h3>
              <DataTable headers={rich.govtFeeHeaders} rows={rich.govtFeeRows} dm={dm} />
              <h3 className={`text-base font-bold mt-8 mb-3 ${dm ? 'text-slate-200' : 'text-slate-800'}`}>ComplianceBharo Professional Fee Plans</h3>
              <DataTable headers={rich.pricingHeaders} rows={rich.pricingRows} dm={dm} />
              {rich.scenarioCostHeaders && rich.scenarioCostRows && (
                <>
                  <h3 className={`text-base font-bold mt-8 mb-3 ${dm ? 'text-slate-200' : 'text-slate-800'}`}>Total Cost by Scenario</h3>
                  <DataTable headers={rich.scenarioCostHeaders} rows={rich.scenarioCostRows} dm={dm} />
                </>
              )}
            </div>
          )}

          {/* Process Section */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>
              {rich ? 'Step-by-Step Compliance Process' : 'Our Process'}
            </h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {(rich ? rich.processSteps : data.steps.map((s) => ({ title: s, desc: 'Our team takes care of this step meticulously, maintaining clear communication with you throughout to ensure complete accuracy and compliance.' }))).map((step, i) => (
                <div key={i} className="relative pl-8">
                  <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ring-4 ${dm ? 'bg-slate-950 ring-slate-950 text-brand-orange border border-brand-orange' : 'bg-white ring-white text-brand-orange border border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* First Year Section */}
          {rich?.firstYearHeaders && rich?.firstYearRows && (
            <div id="first-year" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Compliance After Company Registration (First 180 Days)</h2>
              <DataTable headers={rich.firstYearHeaders} rows={rich.firstYearRows} dm={dm} />
              {rich.firstYearWarning && (
                <div className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
                  <strong>Note: </strong>{rich.firstYearWarning}
                </div>
              )}
            </div>
          )}

          {/* Audit Requirement Section */}
          {rich?.auditRequirement && (
            <div id="audit" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.auditRequirement.title}</h2>
              <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                {rich.auditRequirement.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <DataTable headers={rich.auditRequirement.headers} rows={rich.auditRequirement.rows} dm={dm} />
            </div>
          )}

          {/* Comparison Section */}
          {rich && (
            <div id="comparison" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>{rich.comparisonTitle ?? 'Pvt Ltd vs LLP vs OPC: Compliance Compared'}</h2>
              <DataTable headers={rich.comparisonHeaders} rows={rich.comparisonRows} dm={dm} />
            </div>
          )}

          {/* Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            {rich ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rich.documentGroups.map((group) => (
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
            ) : (
              <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <ul className="space-y-4">
                  {data.checklists.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <span className={`text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FAQs */}
          <div id="faq" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {data.faqs.map((faq, i) => (
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
                Have questions about {data.title}? Let our experts help you figure out the best plan for your business.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${dm ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName={data.title || 'General Inquiry'}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
