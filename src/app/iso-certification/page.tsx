'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import PopupForm from '../components/PopupForm';
import Link from 'next/link';
import { submitLead } from '../actions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const documents = [
  { icon: '🏢', label: 'Company Profile', desc: 'Business overview, products/services offered' },
  { icon: '🪪', label: 'PAN & GST', desc: 'Company PAN card and GST registration certificate' },
  { icon: '📋', label: 'Scope of Certification', desc: 'Defined scope of ISO standard application' },
  { icon: '📄', label: 'Quality Manual', desc: 'Quality management system documentation' },
  { icon: '🗂️', label: 'Process Documents', desc: 'Standard operating procedures and work instructions' },
  { icon: '📊', label: 'Internal Audit Records', desc: 'Recent internal audit findings and corrective actions' },
  { icon: '🧾', label: 'Management Review', desc: 'Minutes from last management review meeting' },
  { icon: '✅', label: 'Previous Certificates', desc: 'Any prior ISO or quality certifications held' },
];

const workflow = [
  { step: '01', title: 'Gap Analysis', desc: 'We assess your current processes against ISO requirements and identify gaps that need to be addressed.' },
  { step: '02', title: 'Documentation', desc: 'Our experts help draft or review your Quality Manual, SOPs, and supporting process documentation.' },
  { step: '03', title: 'Internal Audit', desc: 'Conduct a pre-certification internal audit to ensure all non-conformities are resolved before Stage 1.' },
  { step: '04', title: 'Stage 1 Audit', desc: 'The certifying body reviews documentation and determines readiness for on-site Stage 2 audit.' },
  { step: '05', title: 'Stage 2 Audit', desc: 'On-site audit of actual implementation of the management system across all relevant functions.' },
  { step: '06', title: 'Certificate Issued', desc: 'Receive your ISO certificate, valid for 3 years with annual surveillance audits to maintain certification.' },
];

const plans = [
  {
    name: 'Basic',
    price: 2499,
    desc: 'For micro & small businesses',
    popular: false,
    features: [
      'ISO 9001:2015 (Quality Mgmt)',
      'Gap analysis report',
      'Documentation templates',
      'Internal audit checklist',
      'Stage 1 & 2 audit coordination',
      'Certificate issuance (3 years)',
      'Email & chat support',
    ],
  },
  {
    name: 'Professional',
    price: 2999,
    desc: 'Most popular for SMEs',
    popular: true,
    features: [
      'Any ISO standard of choice',
      'Full documentation drafting',
      'Internal audit conduction',
      'Non-conformity resolution',
      'Stage 1 & 2 audit support',
      'Corrective action plan guidance',
      'Dedicated ISO consultant',
    ],
  },
  {
    name: 'Enterprise',
    price: 4999,
    desc: 'Multi-site & integrated systems',
    popular: false,
    features: [
      'Multiple ISO standards (IMS)',
      'Multi-site audit coordination',
      'Employee awareness training',
      'Management review facilitation',
      'Surveillance audit support (3 yr)',
      'Re-certification management',
      'Priority consultant on-call',
    ],
  },
];

const faqs = [
  { q: 'What is ISO 9001 and who needs it?', a: 'ISO 9001:2015 is the international standard for Quality Management Systems (QMS). Any organisation that wants to demonstrate consistent product/service quality and customer satisfaction can benefit. It is especially sought by companies bidding for government tenders, export contracts, and corporate supplier empanelment.' },
  { q: 'How long does ISO certification take?', a: 'The typical timeline is 4–12 weeks depending on the size of the organisation, complexity of processes, and the readiness of existing documentation. Micro businesses with simple processes can be certified in 4–6 weeks. Larger enterprises with multiple sites take 8–12 weeks.' },
  { q: 'Which ISO standards do you help with?', a: 'We support all major ISO standards including ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Occupational Health & Safety), ISO 27001 (Information Security), ISO 22000 (Food Safety), and IATF 16949 (Automotive). Integrated Management Systems (IMS) combining multiple standards are also available.' },
  { q: 'Does ISO certification need to be renewed?', a: 'Yes. ISO certificates are valid for 3 years. During this period, annual surveillance audits are conducted (Year 1 and Year 2). At the end of 3 years, a recertification audit is required. Our Enterprise plan includes surveillance audit support for all 3 years.' },
  { q: 'Is ISO certification mandatory for MSME government tenders?', a: 'ISO certification is not universally mandatory, but it is increasingly required as a qualification criterion in government tenders and corporate vendor registration processes. Defence, healthcare, export, and food sector tenders frequently mandate relevant ISO standards as a supplier pre-qualification requirement.' },
];

export default function IsoCertificationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state]);

  const dm = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="ISO Certification" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                🏅 Internationally Accredited — Valid 3 Years
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dm ? 'text-white' : 'text-slate-900'}`}>
                ISO Certification<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">for Indian Businesses</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                Build credibility, win government tenders, and access export markets. ISO certification signals world-class quality standards — we handle everything from gap analysis to certificate issuance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: 'Win More Tenders', desc: 'ISO certification is a mandatory qualifier for defence, healthcare, and large enterprise tenders.' },
                  { title: 'Export Readiness', desc: 'ISO 9001 and other standards are internationally recognized and accepted by global buyers.' },
                  { title: 'Process Efficiency', desc: 'Documented SOPs and QMS reduce errors, rework, and operational costs by 15–30%.' },
                  { title: 'Customer Confidence', desc: 'Display your ISO mark on products, packaging, and website to command premium positioning.' },
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

      {/* Documents */}
      <section className={`py-16 border-y transition-colors duration-300 ${dm ? 'border-slate-900 bg-slate-900/20' : 'border-slate-200 bg-slate-100/50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">Checklist</h2>
            <p className={`mt-2 text-2xl font-bold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents.map((doc, i) => (
              <div key={i} className={`flex flex-col gap-2 p-4 rounded-xl border text-center transition-all ${dm ? 'border-slate-800 bg-slate-900/30 hover:border-slate-700' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'}`}>
                <span className="text-2xl">{doc.icon}</span>
                <p className={`text-sm font-semibold ${dm ? 'text-slate-100' : 'text-slate-800'}`}>{doc.label}</p>
                <p className={`text-xs ${dm ? 'text-slate-500' : 'text-slate-500'}`}>{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">Process</h2>
            <p className={`mt-2 text-2xl font-bold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>How It Works</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {workflow.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-bold text-brand-orange ${dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>{s.step}</span>
                <p className={`text-sm font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{s.title}</p>
                <p className={`text-xs leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 border-y transition-colors duration-300 ${dm ? 'border-slate-900 bg-slate-900/20' : 'border-slate-200 bg-slate-100/50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">Pricing</h2>
            <p className={`mt-2 text-2xl font-bold tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>Transparent Plans</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`relative flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 ${plan.popular ? `border-2 border-brand-orange shadow-xl shadow-orange-500/5 ${dm ? 'bg-slate-900/30' : 'bg-white shadow-lg'}` : dm ? 'border-slate-900 bg-slate-900/15 hover:border-slate-800' : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'}`}>
                {plan.popular && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-4 py-1 text-xs font-bold text-white uppercase">Most Popular</span>}
                <div>
                  <p className={`text-lg font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>{plan.name}</p>
                  <p className={`text-sm mt-1 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  <div className={`mt-4 flex items-baseline gap-1 ${dm ? 'text-white' : 'text-slate-900'}`}>
                    <span className={`font-extrabold ${plan.popular ? 'text-4xl' : 'text-3xl'}`}>₹{plan.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-slate-400">one-time</span>
                  </div>
                  <ul className={`mt-6 space-y-3 text-sm ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2 items-start">
                        <span className="text-brand-orange shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg></span>
                        <span className={fi === 0 && plan.popular ? `font-semibold ${dm ? 'text-slate-100' : 'text-slate-900'}` : ''}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7">
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`flex items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all ${plan.popular ? 'bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20' : dm ? 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800'}`}>Get Started</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
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
                <div className={`overflow-hidden transition-all duration-300 max-h-0 ${activeFaq === i ? 'max-h-40 mt-2' : ''}`}>
                  <p className={`text-sm pr-8 leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-500'}`}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={dm} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName="ISO Certification"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
