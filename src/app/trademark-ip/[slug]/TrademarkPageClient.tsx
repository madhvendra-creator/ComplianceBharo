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
import { TRADEMARK_DATABASE } from '../../../lib/trademark-data';

const DEFAULT_TABS = ['overview', 'documents', 'process', 'faq'];
const RICH_TABS = ['overview', 'types', 'who-can-apply', 'benefits', 'documents', 'process', 'classes', 'cost', 'symbols', 'comparison', 'objection', 'status', 'faq'];

const TAB_LABELS: Record<string, string> = {
  overview: 'Overview',
  types: 'Types',
  'who-can-apply': 'Who Can Apply',
  benefits: 'Benefits',
  documents: 'Documents',
  process: 'Process',
  classes: '45 Classes',
  cost: 'Cost 2026',
  symbols: 'TM vs ®',
  comparison: 'Comparison',
  objection: 'Objection',
  status: 'Status',
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

export default function TrademarkPageClient() {
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
  const data = TRADEMARK_DATABASE[slug];
  const rich = data?.rich;
  const tabs = rich ? RICH_TABS : DEFAULT_TABS;

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

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb={data.title} />

      {/* Hero + Lead Form */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {slug === 'trademark-registration' ? (
              <div className="lg:col-span-7 space-y-6 lg:pt-8">
                <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-slate-200' : 'border-orange-500/35 bg-orange-500/10 text-slate-800'}`}>
                  <span className="flex h-2 w-2 rounded-full bg-brand-orange"></span>
                  700+ Brands Protected | Expert IP Attorneys Across India
                  <span className="font-bold ml-0.5 text-brand-orange">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  Trademark Registration <span className="text-brand-orange">in India</span>
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-900 font-medium'}`}>
                  Register Your Brand Name, Logo, or Slogan with <span className="font-bold text-brand-orange">1-Day Filing</span> - Starting @ <span className="font-bold text-brand-orange">₹1,499</span> Only
                </p>

                <p className={`max-w-xl text-xs font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Listed amounts are IncorpX professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.<br/>
                  <span className={dm ? 'text-slate-300' : 'text-slate-700'}>10-Year Nationwide Protection under Trade Marks Act, 1999. 45-Class TM Search. Objection Handling Included. 100% Online.</span>
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2">
                    {[
                      "Comprehensive Trademark Search (All 45 Classes)",
                      "Form TM-A Drafting & Filing on IP India",
                      "Class Selection by IP Expert",
                      "Form TM-48 (Power of Attorney) Preparation",
                      "Immediate Use of ™ Symbol",
                      "Examination Report Tracking",
                      "Basic Objection Reply Handling",
                      "10-Year Validity with ® Symbol on Registration"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckIcon className={`h-5 w-5 shrink-0 mt-0.5 ${dm ? 'text-brand-orange' : 'text-brand-orange'}`} />
                        <span className={`text-sm font-bold leading-snug ${dm ? 'text-white' : 'text-slate-800'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className={`flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs px-4 py-3 rounded-lg ${dm ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
                  <div className={`flex items-center gap-1.5 font-medium ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-orange">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.568 12.318a.75.75 0 00.364 0c5.504-1.385 9.568-6.376 9.568-12.318 0-1.36-.219-2.665-.635-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM10.25 13.75l-2.03-2.03a.75.75 0 00-1.06 1.06l2.56 2.56a.75.75 0 001.06 0l5.5-5.5a.75.75 0 00-1.06-1.06l-4.97 4.97z" clipRule="evenodd" />
                    </svg>
                    Reviewed by Industry Experts & Startup Specialists.
                  </div>
                  <div className={`flex items-center gap-1.5 font-medium ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                    </svg>
                    Last Updated: 20 Jun 2026, 10:10 PM
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-7 flex flex-col gap-6 lg:pt-8">
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
              </div>
            )}

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={data.title || "Consultation"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className={`py-16 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>Choose Your Plan</h2>
            <p className={`mt-3 text-lg ${dm ? 'text-slate-400' : 'text-slate-600'}`}>Transparent pricing with no hidden fees.</p>
          </div>
          {slug === 'trademark-registration' ? (
            <div className="relative mt-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
              <div className="bg-brand-orange px-8 pt-12 pb-24 text-center relative rounded-t-3xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-[#f59e0b] text-black px-5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                    </svg>
                    MOST POPULAR
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Trademark Registration Assistance Package
                </h3>
                <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <span className="text-lg opacity-90">From</span>
                  <span className="text-6xl font-extrabold tracking-tight">
                    ₹1,499
                  </span>
                  <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">IncorpX professional fee for assistance</span>
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
                    "Comprehensive Trademark Search (All 45 Classes)",
                    "Form TM-A Drafting & E-Filing Assistance",
                    "Class Selection by IP Expert",
                    "Form TM-48 (Power of Attorney)",
                    "Government Fee Payment Facilitation",
                    "Examination Report Tracking",
                    "Basic Objection Reply Handling",
                    "Dedicated IP Attorney Support",
                    "Application Status Monitoring",
                    "Post-Filing Compliance Guidance"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckIcon className={`h-5 w-5 shrink-0 mt-0.5 ${dm ? 'text-green-400' : 'text-green-500'}`} />
                      <span className={`text-[15px] font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <a href="#lead-form" onClick={(e) => scrollToSection(e, 'lead-form')} className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-base bg-[#0f172a] hover:bg-[#1e293b] shadow-slate-900/20`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                    </svg>
                    Get Expert Assistance
                  </a>
                </div>

                <div className="mt-8 text-center text-xs text-slate-500 font-medium px-4">
                  *Listed amounts are IncorpX professional charges for end-to-end assistance. Government / statutory fees are charged separately at actuals.
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
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {data.plans.map((plan, i) => (
                <div key={plan.name} className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  i === 1
                    ? `border-brand-orange shadow-2xl shadow-orange-500/10 scale-105 z-10 ${dm ? 'bg-slate-900' : 'bg-white'}`
                    : `${dm ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900' : 'border-slate-200 bg-white hover:border-slate-300'}`
                }`}>
                  {i === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-orange-400 to-brand-orange px-4 py-1 text-xs font-bold text-white shadow-lg">Most Popular</span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    <div className="mt-4 flex items-baseline text-5xl font-extrabold text-brand-orange">
                      {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString('en-IN')}` : (plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`)}
                      {typeof plan.price === 'string' && plan.price.includes('/') && (
                        <span className={`ml-1 text-lg font-medium ${dm ? 'text-slate-500' : 'text-slate-400'}`}></span>
                      )}
                    </div>
                  </div>
                  <ul className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className={`flex items-start gap-3 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                        <CheckIcon className="h-5 w-5 text-brand-orange shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full block text-center rounded-xl py-3.5 text-sm font-bold transition-all ${
                    i === 1
                      ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25'
                      : dm ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}>
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
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
              {rich ? 'What Is Trademark Registration?' : 'Overview'}
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

          {/* Types Section */}
          {rich && (
            <div id="types" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Types of Trademarks in India</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rich.types.map((type) => (
                  <div key={type.name} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                    <h3 className={`text-base font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{type.name}</h3>
                    <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who Can Apply Section */}
          {rich && (
            <div id="who-can-apply" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Who Can Apply for Trademark Registration?</h2>
              <DataTable headers={rich.whoCanApplyHeaders} rows={rich.whoCanApplyRows} dm={dm} />
            </div>
          )}

          {/* Benefits Section */}
          {rich && (
            <div id="benefits" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Trademark Registration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rich.benefits.map((benefit) => (
                  <div key={benefit.title} className={`flex gap-3 items-start rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className={`text-sm font-bold mb-1 ${dm ? 'text-white' : 'text-slate-900'}`}>{benefit.title}</h3>
                      <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            {rich ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Process Section */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>
              {rich ? 'Step-by-Step Trademark Registration Process' : 'Our Process'}
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

          {/* 45 Classes Section */}
          {rich && (
            <div id="classes" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Trademark Classes: Quick Reference</h2>
              <p className={`text-sm mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Every trademark application is filed under one or more of the 45 Nice Classification classes. Here are the 10 most-filed classes in India.
              </p>
              <DataTable headers={rich.classesHeaders} rows={rich.classesRows} dm={dm} />
            </div>
          )}

          {/* Cost Section */}
          {rich && (
            <div id="cost" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Trademark Registration Cost in India 2026</h2>
              <DataTable headers={rich.costHeaders} rows={rich.costRows} dm={dm} />
              <p className={`text-sm leading-relaxed mt-4 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{rich.renewalNote}</p>
            </div>
          )}

          {/* TM vs (R) vs SM Section */}
          {rich && (
            <div id="symbols" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>TM vs ® vs ℠: Trademark Symbols Explained</h2>
              <DataTable headers={rich.symbolsHeaders} rows={rich.symbolsRows} dm={dm} />
              <div className={`mt-4 rounded-2xl border p-4 text-sm leading-relaxed ${dm ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-amber-400/50 bg-amber-50 text-amber-800'}`}>
                <strong>Note: </strong>{rich.symbolsWarning}
              </div>
            </div>
          )}

          {/* Comparison Section */}
          {rich && (
            <div id="comparison" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Trademark vs Copyright vs Patent</h2>
              <DataTable headers={rich.comparisonHeaders} rows={rich.comparisonRows} dm={dm} />
            </div>
          )}

          {/* Objection Section */}
          {rich && (
            <div id="objection" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Trademark Objection and Opposition</h2>
              <DataTable headers={rich.objectionHeaders} rows={rich.objectionRows} dm={dm} />
            </div>
          )}

          {/* Status Section */}
          {rich && (
            <div id="status" className="scroll-mt-24">
              <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>How to Check Trademark Status Online</h2>
              <ol className="space-y-3 mb-6">
                {rich.statusSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold border border-brand-orange text-brand-orange ${dm ? 'bg-slate-950' : 'bg-white'}`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm leading-relaxed pt-0.5 ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{s}</span>
                  </li>
                ))}
              </ol>
              <DataTable headers={rich.statusHeaders} rows={rich.statusRows} dm={dm} />
            </div>
          )}

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
      <Footer isDarkMode={dm} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName={data.title || 'General Inquiry'}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
