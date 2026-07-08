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
  { icon: '🪪', label: 'PAN Card', desc: 'All proposed directors (min 5)' },
  { icon: '📋', label: 'Aadhaar Card', desc: 'All directors and founding members' },
  { icon: '📸', label: 'Passport Photo', desc: 'All directors, white background' },
  { icon: '🌱', label: 'Producer Proof', desc: 'Land records / fishing license / artisan cert' },
  { icon: '🏠', label: 'Office Address Proof', desc: 'Electricity bill / bank statement (2 months)' },
  { icon: '📄', label: 'NOC from Owner', desc: 'If registered office premises is rented' },
  { icon: '🏦', label: 'Bank Statement', desc: 'Latest 2 months for all proposed directors' },
  { icon: '📝', label: 'Name Preferences', desc: '2–3 names ending "Producer Company Limited"' },
];

const workflow = [
  { step: '01', title: 'Eligibility Verification', desc: 'Confirm all 10+ promoters qualify as "primary producers" under Section 378B of Companies Act 2013.' },
  { step: '02', title: 'Name Reservation', desc: 'Reserve name via MCA RUN — must end with "Producer Company Limited". State-based naming restrictions apply.' },
  { step: '03', title: 'DSC & DIN', desc: 'Obtain Digital Signature Certificates and Director Identification Numbers for all 5+ directors.' },
  { step: '04', title: 'SPICe+ Filing', desc: 'File with MOA and AOA reflecting patronage-based dividend structure per Section 378ZA of the Act.' },
  { step: '05', title: 'Certificate Issued', desc: 'Receive Certificate of Incorporation from MCA; begin member subscriptions and produce procurement.' },
];

const plans = [
  {
    name: 'Starter',
    price: 22999,
    desc: 'For producer groups getting started',
    popular: false,
    features: [
      'MCA Name Reservation (RUN)',
      'DSC for 5 Directors',
      'DIN for 5 Directors',
      'MOA & AOA (Producer-specific)',
      'MCA SPICe+ Filing',
      'Certificate of Incorporation',
      'Company PAN & TAN',
    ],
  },
  {
    name: 'Standard',
    price: 24999,
    desc: 'Most popular for FPO groups',
    popular: true,
    features: [
      'Everything in Starter, plus...',
      'GST Registration',
      'Bank Account Opening Assist',
      'NABARD Loan Eligibility Report',
      'Share Certificate Drafting',
      'Member Register & Patronage Setup',
      'FPO Scheme Guidance',
    ],
  },
  {
    name: 'Pro',
    price: 18999,
    desc: 'Full Producer Company launch suite',
    popular: false,
    features: [
      'Everything in Standard, plus...',
      'MSME / Udyam Registration',
      'Patronage Equity Allotment Plan',
      'Annual ROC Compliance (1 Yr)',
      'First Board Meeting Minutes',
      'Dedicated CA / CS Manager',
      'Priority Support & Response',
    ],
  },
];

const faqs = [
  { q: 'Who qualifies as a "primary producer" for a Producer Company?', a: 'A "primary producer" under the Companies Act 2013 means a person engaged in an activity connected with production of primary produce — including agriculture (farmers), horticulture, fishery, animal husbandry, forestry, or any activity related to processing primary produce. Only individuals qualify; corporate bodies cannot be members of a Producer Company.' },
  { q: 'What is the minimum number of members and directors required?', a: 'A Producer Company requires a minimum of 10 individual primary producers as founding members and a minimum of 5 directors. Both requirements must be maintained at all times. The company must also have at least ₹5 lakhs in authorized share capital, though no minimum paid-up capital is prescribed.' },
  { q: 'How are dividends and profits distributed in a Producer Company?', a: 'Profits are distributed as (1) a patronage bonus — in proportion to the volume of produce contributed by each member, (2) limited return on share capital — capped at 25% of paid-up capital, and (3) contributions to general reserves. This patronage-based distribution ensures that higher-contributing producers receive proportionally larger benefits.' },
  { q: 'Can a Producer Company receive loans and grants from banks?', a: 'Yes. NABARD provides direct loans and refinancing to Producer Companies. Government schemes including PM FME, FPO Promotion & Formation, and the SFAC Equity Grant Fund provide grants up to ₹15 lakhs and credit guarantee up to ₹2 crores per Producer Company. SIDBI and many co-operative banks also extend priority credit to registered FPOs.' },
  { q: 'What are the annual compliance requirements for a Producer Company?', a: 'A Producer Company must hold an Annual General Meeting, file an Annual Return (MGT-7), Financial Statements (AOC-4), and appoint a Chartered Accountant as statutory auditor every year. The board must consist of elected member-directors. Our Standard and Pro plans include first-year compliance guidance and template board resolutions.' },
];

export default function ProducerCompanyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state]);

  const dm = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="Producer Company" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                🌾 Farmer-Owned Collective — MCA Incorporated
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dm ? 'text-white' : 'text-slate-900'}`}>
                Producer Company<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Registration</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                A Producer Company bridges individual farmers, fishermen, and artisans with the corporate world. Enjoy limited liability, patronage-based equity, NABARD loans, and government grant access — incorporated under Companies Act 2013 Sections 378A–378ZT.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: 'Farmer-Owned Entity', desc: 'Only primary producers can be members — ensuring benefits flow directly to those who produce.' },
                  { title: 'Limited Liability', desc: 'Members\' liability is limited to unpaid share capital. Personal assets and farmland stay protected.' },
                  { title: 'Equity Patronage', desc: 'Allocate shares based on produce contributed — aligning ownership with actual agricultural output.' },
                  { title: 'Government Support', desc: 'Access NABARD loans, FPO Promotion funds, SFAC equity grants, and priority procurement benefits.' },
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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
                <div className={`overflow-hidden transition-all duration-300 max-h-0 ${activeFaq === i ? 'max-h-48 mt-2' : ''}`}>
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
          serviceName="Producer Company"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
