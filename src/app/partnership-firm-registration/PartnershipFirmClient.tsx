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
  { icon: '🪪', label: 'PAN Card', desc: 'All partners (minimum 2)' },
  { icon: '📋', label: 'Aadhaar Card', desc: 'All partners' },
  { icon: '📸', label: 'Passport Photos', desc: 'All partners, white background' },
  { icon: '📄', label: 'Partnership Deed', desc: 'Signed and notarized by all partners' },
  { icon: '🏠', label: 'Office Address Proof', desc: 'Electricity bill or rent agreement' },
  { icon: '📝', label: 'NOC from Owner', desc: 'If business premises is rented from third party' },
  { icon: '🏦', label: 'Bank Statement', desc: 'Latest 2 months for all partners' },
  { icon: '📊', label: 'GST Registration', desc: 'Required if annual turnover exceeds ₹40 lakhs' },
];

const workflow = [
  { step: '01', title: 'Deed Drafting', desc: 'Our experts draft a comprehensive Partnership Deed covering profit-sharing ratios, partner duties, capital contributions, and dispute resolution clauses.' },
  { step: '02', title: 'Notarization', desc: 'All partners sign the deed before a notary on stamp paper of appropriate value — amount varies by state (typically ₹500–₹2,000).' },
  { step: '03', title: 'ROF Filing', desc: 'Submit Form 1 to the Registrar of Firms along with deed copy and prescribed government fee (₹500–₹5,000 depending on state).' },
  { step: '04', title: 'Udyam / MSME', desc: 'Register the firm on the Udyam portal to access government benefits, priority sector lending, and GeM marketplace.' },
  { step: '05', title: 'Current Account', desc: 'Use the registered deed and PAN to open a current account in the firm\'s name at any scheduled commercial bank.' },
];

const plans = [
  {
    name: 'Starter',
    price: 1999,
    desc: 'For 2-partner firms',
    popular: false,
    features: [
      'Partnership Deed Drafting (2 partners)',
      'Notarized Deed Template',
      'ROF Filing (Form 1)',
      'Government Fee Assistance',
      'Firm PAN Application',
      'Registration Certificate',
      'Digital document delivery',
    ],
  },
  {
    name: 'Standard',
    price: 2999,
    desc: 'Most popular for growing firms',
    popular: true,
    features: [
      'Everything in Starter, plus...',
      'Udyam / MSME Registration',
      'GST Registration',
      'Bank Account Opening Support',
      'Profit-Sharing & Capital Clauses',
      'Partner Resolution Templates',
      '1-Year Compliance Reminders',
    ],
  },
  {
    name: 'Pro',
    price: 4999,
    desc: 'Full-service firm launch suite',
    popular: false,
    features: [
      'Everything in Standard, plus...',
      'Up to 5 partners included',
      'Income Tax Return Filing (1st yr)',
      'Bookkeeping Setup (3 months)',
      'Conversion to LLP Advisory',
      'Dedicated CA Manager',
      'Priority Support & Response',
    ],
  },
];

const faqs = [
  { q: 'Is it mandatory to register a Partnership Firm in India?', a: 'Registration with the Registrar of Firms is not legally mandatory but is strongly recommended. An unregistered firm faces serious disadvantages — partners cannot sue each other or third parties in court, cannot claim set-offs in legal proceedings, and face difficulty opening current accounts or signing major contracts. Registration is simple and essential for any serious business.' },
  { q: 'How many partners are allowed in a Partnership Firm?', a: 'A minimum of 2 partners and a maximum of 50 partners is permitted in a Partnership Firm under the Companies Act, 2013. For banking businesses, the limit is 10 partners. Unlike a Pvt Ltd company, there are no separate directors or shareholders — the partners themselves own and manage the firm together.' },
  { q: 'What is the difference between a registered and unregistered partnership?', a: 'A registered firm can file civil suits against third parties and partners in court, set off claims in litigation, and claim legal relief for contract enforcement. An unregistered firm cannot enforce rights through courts, making debt recovery and dispute resolution extremely difficult. Bank account opening and property transactions are also far simpler for registered firms.' },
  { q: 'Can a Partnership Firm be converted to an LLP later?', a: 'Yes. A registered partnership firm can be converted to a Limited Liability Partnership (LLP) under the LLP Act, 2008 by filing Form 17 with MCA — without paying capital gains tax on the conversion (subject to conditions under Section 47(xiii) of Income Tax Act). Our Pro plan includes a detailed advisory on timing and planning the conversion as your firm scales.' },
  { q: 'How is a Partnership Firm taxed?', a: 'A partnership firm is taxed as a separate entity at a flat 30% on net profits plus surcharge and health & education cess. Unlike a Pvt Ltd company, there is no dividend distribution tax. Partners can draw remuneration (deductible from firm income, taxable in partners\' hands under their individual slab) and receive profit share (exempt in partners\' hands as already taxed at firm level).' },
];

export default function PartnershipFirmClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.success) formRef.current?.reset(); }, [state]);

  const dm = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white ${dm ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} breadcrumb="Partnership Firm" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                📄 ROF Registered Partnership Deed — Ready in 5–7 Days
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${dm ? 'text-white' : 'text-slate-900'}`}>
                Partnership Firm<br />
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Registration</span>
              </h1>
              <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                The simplest way to start a multi-owner business in India. A registered Partnership Firm gives you a legal business identity with minimal compliance, profit-sharing flexibility, and a valid deed for bank account opening — in 5–7 working days.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {[
                  { title: 'Simple Formation', desc: 'No MCA involvement — register with the state Registrar of Firms in your jurisdiction.' },
                  { title: 'Low Compliance', desc: 'No mandatory audit for firms with turnover below ₹1 crore. Minimal annual filings.' },
                  { title: 'Full Flexibility', desc: 'Define profit-sharing, salaries, duties, and exit conditions freely in the Partnership Deed.' },
                  { title: 'Bank Account Ready', desc: 'A registered deed with PAN enables a current bank account in the firm\'s name.' },
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
          serviceName="Partnership Firm"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
