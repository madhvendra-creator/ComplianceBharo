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
import { TAXATION_DATABASE } from '../../../lib/taxation-data';

export default function DynamicPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [activeTab, setActiveTab] = useState('overview');

  const [state, formAction, pending] = useActionState(submitLead, null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  const slug = params?.slug as string;
  const data = TAXATION_DATABASE[slug];

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

    const sections = ['overview', 'documents', 'process', 'faq'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
      <section className={`relative overflow-hidden ${slug === 'income-tax-e-filing' ? 'pt-6 pb-8 lg:pt-10 lg:pb-12' : 'pt-12 pb-16 lg:pt-20 lg:pb-24'} bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              {slug === 'income-tax-e-filing' || slug === 'business-tax-filing' || slug === 'itr-1-return-filing' || slug === 'itr-2-return-filing' || slug === 'itr-3-return-filing' || slug === 'itr-4-return-filing' || slug === 'itr-5-return-filing' ? (
                <>
                  <div className="flex flex-col gap-3">
                    <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full shadow-sm border text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
                      {slug === 'income-tax-e-filing' ? 'Preferred by taxpayers and business owners across India' 
                       : slug === 'business-tax-filing' ? 'Business Tax Filing & Corporate Tax Compliance'
                       : slug === 'itr-1-return-filing' ? 'ITR-1 Sahaj Filing & Income Tax Return Services'
                       : slug === 'itr-2-return-filing' ? 'ITR-2 Filing & Capital Gains Tax Return Services'
                       : slug === 'itr-3-return-filing' ? 'ITR-3 Filing & Business Income Tax Return Services'
                       : slug === 'itr-5-return-filing' ? 'ITR-5 Filing & Partnership/LLP Tax Return Services'
                       : 'ITR-4 Filing & Presumptive Income Tax Return Services'}
                      <span className="font-bold ml-0.5">&gt;</span>
                    </div>
                    <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                      {slug === 'income-tax-e-filing' ? (
                        <>
                          <span className="text-brand-orange">Income Tax Return E-Filing</span><br/>
                          Online in India
                        </>
                      ) : slug === 'business-tax-filing' ? (
                        <>
                          <span className="text-brand-orange">Business Tax Filing</span> in India
                        </>
                      ) : slug === 'itr-1-return-filing' ? (
                        <>
                          <span className="text-brand-orange">ITR-1 Sahaj Return Filing</span> in India
                        </>
                      ) : slug === 'itr-2-return-filing' ? (
                        <>
                          <span className="text-brand-orange">ITR-2 Return Filing</span> in India
                        </>
                      ) : slug === 'itr-3-return-filing' ? (
                        <>
                          <span className="text-brand-orange">ITR-3 Return Filing</span> in India
                        </>
                      ) : slug === 'itr-5-return-filing' ? (
                        <>
                          <span className="text-brand-orange">ITR-5 Return Filing</span> in India
                        </>
                      ) : (
                        <>
                          <span className="text-brand-orange">ITR-4 Return Filing</span> in India
                        </>
                      )}
                    </h1>
                    <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                      {slug === 'income-tax-e-filing' ? (
                        <>Accurate ITR Filing with Professional Review in <span className="font-bold text-brand-orange">24 to 48 Hours</span> Starting at <span className="font-bold text-brand-orange">₹999</span></>
                      ) : slug === 'business-tax-filing' ? (
                        <>Professional Business ITR Filing for Companies, LLPs & Firms - Starting @ <span className="font-bold text-brand-orange">₹4,999</span> Only</>
                      ) : slug === 'itr-1-return-filing' ? (
                        <>File Your ITR-1 Sahaj Return for Salaried Individuals - Starting @ <span className="font-bold text-brand-orange">₹999</span> Only</>
                      ) : slug === 'itr-2-return-filing' ? (
                        <>Professional ITR-2 Filing Assistance for <span className="font-bold text-brand-orange">Capital Gains, NRIs & Foreign Assets</span> Starting at <span className="font-bold text-brand-orange">₹2,999</span></>
                      ) : slug === 'itr-3-return-filing' ? (
                        <>Professional ITR-3 Filing for <span className="font-bold text-brand-orange">Business & Professional Income</span> Starting at <span className="font-bold text-brand-orange">₹3,999</span></>
                      ) : slug === 'itr-5-return-filing' ? (
                        <>Complete Tax Return Filing for <span className="font-bold text-brand-orange">Partnership Firms, LLPs & AOPs</span> - Starting @ <span className="font-bold text-brand-orange">₹4,999</span> Only</>
                      ) : (
                        <>Professional ITR-4 (Sugam) Filing for <span className="font-bold text-brand-orange">Presumptive Business & Professional Income</span> Starting at <span className="font-bold text-brand-orange">₹1,999</span></>
                      )}
                    </p>
                    <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                      {slug === 'income-tax-e-filing' 
                        ? 'Salaried, Freelance, Professional and Business Returns with Complete Reconciliation Support.'
                        : slug === 'business-tax-filing' 
                        ? 'Corporate Tax, Partnership Firm Tax, LLP Tax & Proprietorship Tax Filing with Audit Coordination.'
                        : slug === 'itr-1-return-filing'
                        ? 'Professional Assistance. Form 26AS Reconciliation. Old vs New Regime Comparison. e-Verification Support. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.'
                        : slug === 'itr-2-return-filing'
                        ? 'Accurate Schedule CG & Schedule FA Preparation. DTAA Support. Notice-Safe Filing. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.'
                        : slug === 'itr-3-return-filing'
                        ? 'For Proprietors, Freelancers, Doctors, Lawyers, tax experts & Self-Employed Professionals. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.'
                        : slug === 'itr-5-return-filing'
                        ? 'P&L Account. Balance Sheet. Partner Details. Section 40(b) Compliance. AMT Computation. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.'
                        : 'For Small Businesses, Freelancers, Doctors, Lawyers & Self-Employed under Sections 44AD/44ADA/44AE. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.'}
                    </p>
                  </div>
                  
                  <div className={`rounded-2xl border p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-[15px] font-semibold shadow-sm ${
                    slug === 'itr-3-return-filing' || slug === 'itr-4-return-filing'
                      ? 'bg-brand-orange border-orange-500/30 text-white'
                      : slug === 'itr-5-return-filing'
                      ? 'bg-blue-600 border-blue-500/30 text-white'
                      : dm ? 'bg-[#152033] border-slate-700/60 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    {(slug === 'income-tax-e-filing' ? [
                      "Form 26AS and AIS Reconciliation",
                      "Old vs New Regime Comparison",
                      "Refund Optimization Support",
                      "Capital Gains and Business ITR Guidance",
                      "Error-Checked Filing and e-Verification",
                      "Post Filing Clarification Support"
                    ] : slug === 'business-tax-filing' ? [
                      "Company ITR-6 Filing with DSC",
                      "LLP & Partnership ITR-5 Filing",
                      "Tax Audit Coordination (Section 44AB)",
                      "MAT/AMT Computation & Credit",
                      "Advance Tax Planning & Compliance",
                      "Post-Filing Notice Support"
                    ] : slug === 'itr-1-return-filing' ? [
                      "Salaried & Pensioner ITR-1 Filing",
                      "Old vs New Regime Tax Optimization",
                      "Form 26AS & AIS Reconciliation",
                      "Chapter VI-A Deduction Maximization",
                      "e-Filing & e-Verification Support",
                      "Refund Tracking & Post-Filing Help"
                    ] : slug === 'itr-2-return-filing' ? [
                      "Capital Gains Computation (Equity, MF, Property)",
                      "Schedule FA - Foreign Asset Disclosure",
                      "NRI & RNOR Return Filing with DTAA",
                      "Multiple House Property Income Reporting",
                      "26AS & AIS Reconciliation",
                      "Old vs New Regime Tax Comparison"
                    ] : slug === 'itr-3-return-filing' ? [
                      "Profit & Loss and Balance Sheet Preparation",
                      "Schedule BP Business Income Computation",
                      "Tax Audit Coordination (Section 44AB)",
                      "Depreciation & Expense Optimization",
                      "Form 26AS and AIS Reconciliation",
                      "Advance Tax & Refund Support"
                    ] : slug === 'itr-5-return-filing' ? [
                      "Partnership Firm ITR Filing",
                      "LLP Income Tax Return",
                      "AOP/BOI Tax Return",
                      "Section 40(b) Computation",
                      "Tax Audit Coordination",
                      "AMT & Advance Tax Support"
                    ] : [
                      "Presumptive Income Computation (44AD/44ADA/44AE)",
                      "Old vs New Regime Tax Optimization",
                      "Form 26AS and AIS Reconciliation",
                      "Chapter VI-A Deduction Maximization",
                      "e-Filing & e-Verification Support",
                      "Advance Tax & Refund Tracking Support"
                    ]).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`w-5 h-5 shrink-0 mt-0.5 ${
                          slug === 'itr-3-return-filing' || slug === 'itr-4-return-filing' || slug === 'itr-5-return-filing' ? 'text-white' : 'text-brand-orange'
                        }`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`mt-3 flex items-center justify-between gap-2 text-sm font-medium px-2 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-orange shrink-0">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 00(1.14)-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    Reviewed by Industry Experts & Startup Specialists.
                    </div>
                    {(slug === 'itr-3-return-filing' || slug === 'itr-4-return-filing' || slug === 'itr-5-return-filing') && (
                      <div className={`flex items-center gap-1.5 text-xs ${dm ? 'text-slate-500' : 'text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                        </svg>
                        <span>Last Updated: <strong>20 Jun 2026, 10:10 PM</strong></span>
                      </div>
                    )}
                  </div>
                </>
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
      <section className={`py-12 lg:py-16 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className={`text-center ${slug === 'income-tax-e-filing' || slug === 'itr-5-return-filing' ? 'mb-6' : 'mb-12'}`}>
            <h2 className={`text-3xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>
              {slug === 'income-tax-e-filing' || slug === 'itr-5-return-filing' ? 'Simple & Transparent Pricing' : 'Choose Your Plan'}
            </h2>
            {slug !== 'income-tax-e-filing' && slug !== 'itr-5-return-filing' && (
              <p className={`mt-3 text-lg ${dm ? 'text-slate-400' : 'text-slate-600'}`}>Transparent pricing with no hidden fees.</p>
            )}
            {(slug === 'income-tax-e-filing' || slug === 'itr-5-return-filing') && (
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                  </svg>
                  PRICING
                </span>
              </div>
            )}
          </div>
          {slug === 'income-tax-e-filing' || slug === 'business-tax-filing' || slug === 'itr-1-return-filing' || slug === 'itr-2-return-filing' || slug === 'itr-3-return-filing' || slug === 'itr-4-return-filing' || slug === 'itr-5-return-filing' ? (
            <div className="relative mt-2 rounded-3xl shadow-2xl max-w-4xl mx-auto">
              <div className={`${slug === 'itr-5-return-filing' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-brand-orange'} px-8 pt-12 pb-24 text-center relative rounded-t-3xl`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-amber-400 text-black px-5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                    </svg>
                    MOST POPULAR
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  {slug === 'income-tax-e-filing' ? 'Income Tax Return E-Filing Package' 
                   : slug === 'business-tax-filing' ? 'Business Tax Filing Package' 
                   : slug === 'itr-1-return-filing' ? 'ITR-1 Sahaj Filing Package'
                   : slug === 'itr-2-return-filing' ? 'ITR-2 Return Filing Package'
                   : slug === 'itr-3-return-filing' ? 'ITR-3 Return Filing Package'
                   : slug === 'itr-5-return-filing' ? 'ITR-5 Return Filing Package'
                   : 'ITR-4 Return Filing Package'}
                </h3>
                <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <span className="text-lg opacity-90">From</span>
                  <span className="text-6xl font-extrabold tracking-tight">
                    {slug === 'income-tax-e-filing' ? '₹999' : slug === 'business-tax-filing' ? '₹4999' : slug === 'itr-1-return-filing' ? '₹999' : slug === 'itr-2-return-filing' ? '₹2999' : slug === 'itr-3-return-filing' ? '₹3999' : slug === 'itr-5-return-filing' ? '₹4999' : '₹1999'}
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg> Application support
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' : 'bg-orange-50 text-brand-orange border-orange-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> Professional assistance
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {(slug === 'income-tax-e-filing' ? [
                    "ITR Form Selection Guidance",
                    "Income and Deduction Review",
                    "AIS and Form 26AS Reconciliation",
                    "Old vs New Regime Tax Comparison",
                    "Accurate Return Preparation",
                    "e-Filing and e-Verification Support",
                    "Refund Tracking Guidance",
                    "Basic Notice Readiness Review",
                    "Dedicated Professional Assistance",
                    "Secure Digital Documentation"
                  ] : slug === 'business-tax-filing' ? [
                    "Business Entity Assessment",
                    "ITR Form Selection (ITR-3/4/5/6)",
                    "Income Computation & Schedules",
                    "Depreciation Calculation",
                    "MAT/AMT Assessment",
                    "Tax Audit Coordination",
                    "Advance Tax Reconciliation",
                    "Form 26AS & AIS Matching",
                    "DSC-Based Filing & e-Verification",
                    "Post-Filing Notice Support"
                  ] : slug === 'itr-1-return-filing' ? [
                    "Free Tax Consultation",
                    "ITR-1 Eligibility Verification",
                    "Old vs New Regime Comparison",
                    "Form 16 & Salary Review",
                    "Form 26AS & AIS Reconciliation",
                    "Chapter VI-A Deduction Optimization",
                    "Accurate Return Preparation",
                    "e-Filing & e-Verification Support",
                    "Refund Tracking Assistance",
                    "Dedicated Professionals"
                  ] : slug === 'itr-2-return-filing' ? [
                    "Capital Gains Computation & Schedule CG",
                    "Schedule FA - Foreign Asset Reporting",
                    "Form 26AS & AIS Reconciliation",
                    "Old vs New Regime Tax Comparison",
                    "DTAA & Form 67 Support (NRIs)",
                    "Section 54/54EC/54F Exemption Claims",
                    "Loss Set-off & Carry Forward Review",
                    "e-Filing & e-Verification Support",
                    "Dedicated Professional Assistance",
                    "Post-Filing Notice Readiness Review"
                  ] : slug === 'itr-3-return-filing' ? [
                    "Business Income Computation",
                    "Profit & Loss Account Review",
                    "Balance Sheet Preparation Support",
                    "Schedule BP & All Schedule Filing",
                    "Depreciation Chart Computation",
                    "Form 26AS & AIS Reconciliation",
                    "Advance Tax Installment Guidance",
                    "Tax Audit Coordination Support",
                    "e-Filing and e-Verification",
                    "Dedicated Professional Assistance"
                  ] : slug === 'itr-5-return-filing' ? [
                    "Free Consultation & Eligibility Check",
                    "P&L Account Preparation",
                    "Balance Sheet Preparation",
                    "Partner Remuneration Working (Sec 40(b))",
                    "Interest to Partners Verification",
                    "Tax Audit Coordination (Form 3CD)",
                    "AMT Computation (Sec 115JC)",
                    "Form 26AS & AIS Reconciliation",
                    "Advance Tax Calculation",
                    "ITR-5 Filing & e-Verification"
                  ] : [
                    "Presumptive Income Computation (44AD/44ADA/44AE)",
                    "Profit & Loss Account Review",
                    "Old vs New Regime Tax Optimization",
                    "Form 26AS & AIS Reconciliation",
                    "Chapter VI-A Deduction Optimization",
                    "Advance Tax Installment Guidance",
                    "e-Filing & e-Verification Support",
                    "Refund Tracking Assistance",
                    "Tax Saving Advisory",
                    "Dedicated Professional Assistance"
                  ]).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 shrink-0 mt-0.5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                      <span className={`text-[15px] font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <a href="#lead-form" onClick={(e) => scrollToSection(e, 'lead-form')} className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-base ${slug === 'itr-5-return-filing' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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
          ) : slug === 'gst-return-filing' || slug === 'gst-registration' ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {data.plans.map((plan: any) => (
                <div key={plan.name} className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${dm ? 'border-slate-800 bg-[#0a0f1d]' : 'border-slate-200 bg-white shadow-sm'}`}>
                  <p className={`min-h-[32px] text-[10px] font-bold tracking-widest uppercase mb-3 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    {plan.subtitle}
                  </p>
                  <h3 className={`min-h-[64px] text-2xl font-bold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <div className={`flex items-baseline text-4xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>
                    ₹{plan.price}
                    {slug === 'gst-return-filing' && (
                      <span className={`ml-1 text-sm font-medium ${dm ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
                    )}
                  </div>
                  
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full block text-center rounded-xl py-3.5 text-sm font-bold transition-all uppercase tracking-wide border ${dm ? 'border-brand-orange text-brand-orange hover:bg-brand-orange/10' : 'border-brand-orange text-brand-orange hover:bg-orange-50'} mb-8`}>
                    GET STARTED
                  </a>

                  <div className={`border-b mb-6 ${dm ? 'border-slate-800' : 'border-slate-200'}`}></div>

                  <p className={`text-[11px] font-bold tracking-widest uppercase mb-5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    WHAT YOU'LL GET
                  </p>
                  
                  <ul className="flex-1 space-y-4">
                    {plan.features.map((feat: any, idx: number) => (
                      <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feat.included ? (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <span className={feat.included ? (dm ? 'text-slate-200' : 'text-slate-700') : (dm ? 'text-slate-500' : 'text-slate-400')}>{feat.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : slug === 'income-tax-return-filing' ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
              {data.plans.map((plan: any, i) => (
                <div key={plan.name} className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${dm ? 'bg-[#0B0F19] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 right-6">
                      <span className="rounded bg-indigo-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white shadow-lg uppercase">{plan.badge}</span>
                    </div>
                  )}
                  <div className="mb-8">
                    <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                      {plan.subtitle}
                    </p>
                    <h3 className={`text-3xl font-bold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    <div className={`flex items-baseline text-4xl font-extrabold ${dm ? 'text-white' : 'text-slate-900'}`}>
                      {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString('en-IN')}` : (plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`)}
                    </div>
                  </div>
                  
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full block text-center rounded-lg py-3.5 text-sm font-bold transition-all uppercase tracking-wide border ${dm ? 'border-brand-orange text-brand-orange hover:bg-brand-orange/10' : 'border-brand-orange text-brand-orange hover:bg-orange-50'} mb-8`}>
                    GET STARTED
                  </a>

                  <p className={`text-[10px] font-bold tracking-widest uppercase mb-5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    COVERS INCOME FROM
                  </p>
                  
                  <ul className="flex-1 space-y-4">
                    {plan.features.map((feat: any, idx: number) => (
                      <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feat.included ? (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                        <span className={feat.included ? '' : dm ? 'text-slate-500' : 'text-slate-400'}>{feat.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
                      <li key={feat as string} className={`flex items-start gap-3 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-orange shrink-0">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                        {feat as string}
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
            {['overview', 'documents', 'process', 'faq'].map((tab) => (
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          
          {/* Overview Section */}
          <div id="overview" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Overview</h2>
            <div className={`prose prose-sm max-w-none ${dm ? 'prose-invert text-slate-300' : 'text-slate-600'}`}>
              <p className="text-base leading-relaxed mb-4">
                {data.desc}
              </p>
              <p className="text-base leading-relaxed">
                Our experts will handle the entire procedure seamlessly, ensuring full regulatory compliance so that you can focus on running your business. With CA/CS verified guidance, the process is streamlined and hassle-free.
              </p>
            </div>
          </div>

          {/* Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <div className={`p-6 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <ul className="space-y-4">
                {data.checklists.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className={`text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process Section */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Our Process</h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {data.steps.map((step, i) => (
                <div key={i} className="relative pl-8">
                  <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ring-4 ${dm ? 'bg-slate-950 ring-slate-950 text-brand-orange border border-brand-orange' : 'bg-white ring-white text-brand-orange border border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{step}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                    Our team takes care of this step meticulously, maintaining clear communication with you throughout to ensure complete accuracy and compliance.
                  </p>
                </div>
              ))}
            </div>
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
