'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from './components/Modal';
import LeadForm from './components/LeadForm';
import PopupForm from './components/PopupForm';
import { submitLead, SubmitLeadState } from './actions';
import { ALL_SERVICES_TABS } from '../lib/all-services-data';
import ClientReviews from '../components/ClientReviews';
import Footer from './components/Footer';
import { INDIAN_STATES } from '../lib/indian-states';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme state: true = Dark Mode, false = Light Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mobile menu open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);

  // Pricing duration toggle state (false = monthly, true = annual)
  const [isAnnual, setIsAnnual] = useState(false);

  // Accordion active index (null means all closed)
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Mega-menu and dropdown states
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'company' | 'licenses'>('company');
  const [activeComplianceTab, setActiveComplianceTab] = useState<'changes' | 'annual' | 'conversion'>('annual');
  const [activeIpTab, setActiveIpTab] = useState<'trademark' | 'copyright' | 'patent' | 'design' | 'dispute'>('trademark');
  const [activeTaxTab, setActiveTaxTab] = useState<'income-tax' | 'gst'>('income-tax');

  // Mobile nav category data for drill-down navigation
  const mobileNavCategories = [
    {
      key: 'business-registration',
      label: 'Business Registration',
      icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
      groups: [
        {
          title: 'Company Registration',
          items: [
            { name: 'Private Limited Company', href: '/private-limited-company-registration' },
            { name: 'Limited Liability Partnership', href: '/limited-liability-partnership' },
            { name: 'One Person Company', href: '/one-person-company' },
            { name: 'Sole Proprietorship', href: '/sole-proprietorship' },
            { name: 'Startup India Registration', href: '/startup-india-registration' },
          ],
        },
        {
          title: 'Licenses & Registrations',
          items: [
            { name: 'Digital Signature Certificate', href: '/digital-signature-certificate' },
            { name: 'Udyam Registration', href: '/msme-registration' },
            { name: 'MSME Registration', href: '/msme-registration' },
            { name: 'FSSAI [Food License]', href: '/fssai-food-license' },
            { name: 'IEC [Import/Export Code]', href: '/import-export-code' },
          ],
        },
      ],
    },
    {
      key: 'compliances',
      label: 'Compliance',
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
      groups: [
        {
          title: 'Annual Compliance',
          items: [
            { name: 'Annual Compliance for Private Limited Company', href: '/compliance/annual-pvt-ltd-compliance' },
            { name: 'LLP Annual Compliance', href: '/compliance/llp-annual-compliance' },
            { name: 'One Person Company Compliance', href: '/compliance/opc-annual-compliance' },
            { name: 'Accounting Services', href: '/compliance/accounting-services' },
            { name: 'Bookkeeping Services', href: '/compliance/bookkeeping-services' },
          ],
        },
      ],
    },
    {
      key: 'trademark-ip',
      label: 'Trademark & IP',
      icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
      groups: [
        {
          title: 'Trademark Registration',
          items: [
            { name: 'Trademark Registration', href: '/trademark-ip/trademark-registration' },
          ],
        },
      ],
    },
    {
      key: 'taxation',
      label: 'Taxation',
      icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
      groups: [
        {
          title: 'Income Tax',
          items: [
            { name: 'Income Tax E-Filing', href: '/taxation/income-tax-e-filing' },
            { name: 'Business Tax Filing', href: '/taxation/business-tax-filing' },
            { name: 'ITR-1 Return Filing', href: '/taxation/itr-1-return-filing' },
            { name: 'ITR-2 Return Filing', href: '/taxation/itr-2-return-filing' },
            { name: 'ITR-3 Return Filing', href: '/taxation/itr-3-return-filing' },
            { name: 'ITR-4 Return Filing', href: '/taxation/itr-4-return-filing' },
            { name: 'ITR-5 Return Filing', href: '/taxation/itr-5-return-filing' },
            { name: 'ITR-6 Return Filing', href: '/taxation/itr-6-return-filing' },
            { name: 'ITR-7 Return Filing', href: '/taxation/itr-7-return-filing' },
            { name: '15CA - 15CB Filing', href: '/taxation/15ca-15cb-filing' },
            { name: 'TAN Registration', href: '/taxation/tan-registration' },
            { name: 'TDS Return Filing', href: '/taxation/tds-return-filing' },
          ],
        },
        {
          title: 'GST',
          items: [
            { name: 'GST Registration', href: '/taxation/gst-registration' },
            { name: 'GST Return Filing', href: '/taxation/gst-return-filing' },
            { name: 'GST Annual Return Filing (GSTR-9)', href: '/taxation/gst-annual-return-filing' },
          ],
        },
      ],
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActiveCategory(null);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const [activeServiceTab, setActiveServiceTab] = useState(ALL_SERVICES_TABS[0].key);
  const [selectedService, setSelectedService] = useState('');

  // Server Action implementation for Form Submission
  const [state, formAction, pending] = useActionState(submitLead, {
    success: undefined,
    message: '',
    errors: {}
  });

  // Reference to reset the form after successful lead capture
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Pricing calculations
  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      // 20% discount on annual payment
      const discountedMonthly = Math.round(monthlyPrice * 0.8);
      return {
        amount: discountedMonthly,
        period: '/ month, billed annually',
        originalAmount: monthlyPrice
      };
    }
    return {
      amount: monthlyPrice,
      period: '/ month',
      originalAmount: null
    };
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-brand-orange selection:text-white scroll-smooth ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sticky Navbar */}
      <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 backdrop-blur-md ${
        isDarkMode ? 'border-slate-900 bg-slate-950/85' : 'border-slate-200 bg-white/85'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/80 dark:border-slate-800/80 shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6.5 w-6.5">
                {/* Shield Path */}
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-white' : 'text-slate-900'} />
                {/* Checkmark Path inside in orange */}
                <path d="M9 11.5l2 2 4-4" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Compliance<span className="text-brand-orange">Bharo</span>
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-widest -mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Fast track compliance
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center lg:gap-5 xl:gap-8 text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {/* Business Registration with Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === "business-registration" ? null : "business-registration")}
                className={`flex items-center gap-0.5 transition-colors duration-200 py-2 group cursor-pointer ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
                } ${activeMenu === "business-registration" ? 'text-brand-orange' : ''}`}
              >
                <span>Business Registration</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === "business-registration" ? 'rotate-180 text-brand-orange' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              {/* Yellow bottom line on hover/active */}
              {activeMenu === "business-registration" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />
              )}

              {/* Mega Dropdown Panel */}
              {activeMenu === "business-registration" && (
                <>
                  <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                  <div
                    className={`absolute top-full left-0 mt-3.5 w-[720px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                    isDarkMode 
                      ? 'border-slate-800 bg-slate-950 text-white shadow-black/80' 
                      : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                  }`}
                >
                  {/* Left Column (Tabs) */}
                  <div className={`w-[40%] p-4 flex flex-col gap-2 transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'
                  }`}>
                    {/* Tab 1: Company Registration */}
                    <button
                      onMouseEnter={() => setActiveTab('company')}
                      onClick={() => setActiveTab('company')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                        activeTab === 'company'
                          ? isDarkMode 
                            ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' 
                            : 'bg-white border-slate-100 shadow-md text-brand-orange'
                          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <span className="text-sm">Company Registration</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3.5 w-3.5 transition-transform duration-200 ${activeTab === 'company' ? 'translate-x-1' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>

                    {/* Tab 2: Licenses & Registrations */}
                    <button
                      onMouseEnter={() => setActiveTab('licenses')}
                      onClick={() => setActiveTab('licenses')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                        activeTab === 'licenses'
                          ? isDarkMode 
                            ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' 
                            : 'bg-white border-slate-100 shadow-md text-brand-orange'
                          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-1.2 6.468A3.375 3.375 0 0 0 6 12.75a3.375 3.375 0 0 0-3.3 2.618M12 18.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className="text-sm">Licenses & Registrations</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3.5 w-3.5 transition-transform duration-200 ${activeTab === 'licenses' ? 'translate-x-1' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Right Column (Sub-items details list) */}
                  <div className="w-[60%] p-6 bg-white dark:bg-slate-950 flex flex-col gap-4">
                    <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2">
                      {activeTab === 'company' ? 'Company Registration' : 'Licenses & Registrations'}
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {activeTab === 'company' ? (
                        <>
                          {([
                            { name: "Private Limited Company", href: "/private-limited-company-registration" },
                            { name: "Limited Liability Partnership", href: "/limited-liability-partnership" },
                            { name: "One Person Company", href: "/one-person-company" },
                            { name: "Sole Proprietorship", href: "/sole-proprietorship" },

                            { name: "Startup India Registration", href: "/startup-india-registration" },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a
                              key={name}
                              href={href}
                              onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors" />
                              <span>{name}</span>
                            </a>
                          ))}
                        </>
                      ) : (
                        <>
                          {([
                            { name: "Digital Signature Certificate", href: "/digital-signature-certificate" },
                            { name: "Udyam Registration", href: "/msme-registration" },
                            { name: "MSME Registration", href: "/msme-registration" },

                            { name: "FSSAI [Food License]", href: "/fssai-food-license" },
                            { name: "IEC [Import/Export Code]", href: "/import-export-code" },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a
                              key={name}
                              href={href}
                              onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors" />
                              <span>{name}</span>
                            </a>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>

            {/* Compliance Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === "compliance" ? null : "compliance")}
                className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
                } ${activeMenu === "compliance" ? 'text-brand-orange' : ''}`}
              >
                <span>Compliance</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === "compliance" ? 'rotate-180 text-brand-orange' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {activeMenu === "compliance" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />
              )}

              {activeMenu === "compliance" && (
                <>
                  <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                  <div className={`absolute top-full left-0 mt-3.5 w-[680px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-950 text-white shadow-black/80'
                      : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                  }`}>
                    {/* Left Column — Tabs */}
                    <div className={`w-[40%] p-4 flex flex-col gap-2 transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'
                    }`}>
                      {([
                        { key: 'annual',     label: 'Annual Compliance',   icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5' },
                      ] as { key: typeof activeComplianceTab; label: string; icon: string }[]).map((tab) => (
                        <button
                          key={tab.key}
                          onMouseEnter={() => setActiveComplianceTab(tab.key)}
                          onClick={() => setActiveComplianceTab(tab.key)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                            activeComplianceTab === tab.key
                              ? isDarkMode
                                ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange'
                                : 'bg-white border-slate-100 shadow-md text-brand-orange'
                              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="h-5 w-5 shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                            </svg>
                            <span className="text-sm">{tab.label}</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${activeComplianceTab === tab.key ? 'translate-x-1' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      ))}
                    </div>

                    {/* Right Column — Content list */}
                    <div className="w-[60%] p-5 bg-white dark:bg-slate-950 flex flex-col gap-3 overflow-y-auto max-h-[420px]">
                      <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2 shrink-0">
                        {activeComplianceTab === 'changes'    && 'Corporate Changes'}
                        {activeComplianceTab === 'annual'     && 'Annual Compliance'}
                        {activeComplianceTab === 'conversion' && 'Business Conversion'}
                      </h4>

                      {activeComplianceTab === 'changes' && (
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">Private Limited Company</p>
                            {([
                              { name: 'Director Change / Appointment', href: '/compliance/director-change-appointment' },
                              { name: 'Registered Office Change', href: '/compliance/registered-office-change' },
                              { name: 'Share Transfer & Capital Infusion', href: '/compliance/share-transfer-capital-infusion' },
                            ] as { name: string; href: string }[]).map(({ name, href }) => (
                              <a key={name} href={href} onClick={() => setActiveMenu(null)}
                                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                                <span>{name}</span>
                              </a>
                            ))}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5">LLP</p>
                            {([
                              { name: 'Add Designated Partner', href: '/compliance/add-designated-partner' },
                              { name: 'Changes to LLP Agreement', href: '/compliance/changes-to-llp-agreement' },
                              { name: 'Close the LLP', href: '/compliance/close-the-llp' },
                            ] as { name: string; href: string }[]).map(({ name, href }) => (
                              <a key={name} href={href} onClick={() => setActiveMenu(null)}
                                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                                <span>{name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeComplianceTab === 'annual' && (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                          {([
                            { name: 'Annual Compliance for Private Limited Company', href: '/compliance/annual-pvt-ltd-compliance' },
                            { name: 'LLP Annual Compliance', href: '/compliance/llp-annual-compliance' },
                            { name: 'One Person Company Compliance', href: '/compliance/opc-annual-compliance' },
                            { name: 'Accounting Services', href: '/compliance/accounting-services' },
                            { name: 'Bookkeeping Services', href: '/compliance/bookkeeping-services' },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a key={name} href={href} onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                              <span className="leading-tight">{name}</span>
                            </a>
                          ))}
                        </div>
                      )}

                      {activeComplianceTab === 'conversion' && (
                        <div className="space-y-0.5">
                          {([
                            { name: 'Proprietorship to Pvt Ltd Company', href: '/compliance/proprietorship-to-pvt-ltd-company' },
                            { name: 'Convert Partnership into LLP Company', href: '/compliance/convert-partnership-into-llp' },
                            { name: 'Convert Private into Public Limited Company', href: '/compliance/convert-private-into-public-limited' },
                            { name: 'Convert Private into OPC Company', href: '/compliance/convert-private-into-opc' },
                            { name: 'Compliance Check - Secretarial Audit', href: '/compliance/compliance-check-secretarial-audit' },
                            { name: 'Due Diligence', href: '/compliance/due-diligence-audit' },
                            { name: 'RBI Compliance', href: '/compliance/rbi-compliance-filing' },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a key={name} href={href} onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                              <span>{name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trademark & IP Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === "trademark-ip" ? null : "trademark-ip")}
                className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
                } ${activeMenu === "trademark-ip" ? 'text-brand-orange' : ''}`}
              >
                <span>Trademark & IP</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === "trademark-ip" ? 'rotate-180 text-brand-orange' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {activeMenu === "trademark-ip" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />
              )}

              {activeMenu === "trademark-ip" && (
                <>
                  <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[800px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-950 text-white shadow-black/80'
                      : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                  }`}>
                    {/* Left Column — IP Tabs */}
                    <div className={`w-[38%] p-4 flex flex-col gap-2 transition-colors duration-300 shrink-0 ${
                      isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'
                    }`}>
                      {([
                        { key: 'trademark', label: 'Trademark Registration',       icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z' },

                      ] as { key: typeof activeIpTab; label: string; icon: string }[]).map((tab) => (
                        <button
                          key={tab.key}
                          onMouseEnter={() => setActiveIpTab(tab.key)}
                          onClick={() => setActiveIpTab(tab.key)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                            activeIpTab === tab.key
                              ? isDarkMode
                                ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange'
                                : 'bg-white border-slate-100 shadow-md text-brand-orange'
                              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="h-5 w-5 shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                            </svg>
                            <span className="text-sm">{tab.label}</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${activeIpTab === tab.key ? 'translate-x-1' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      ))}
                    </div>

                    {/* Right Column — 3-column grid */}
                    <div className="flex-1 p-5 bg-white dark:bg-slate-950 flex flex-col gap-3 overflow-y-auto max-h-[440px]">
                      <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2 shrink-0">
                        {activeIpTab === 'trademark' && 'Trademark Registration'}
                        {activeIpTab === 'copyright' && 'Copyright Registration'}
                        {activeIpTab === 'patent'    && 'Patent Registration'}
                        {activeIpTab === 'design'    && 'Design Registration'}
                        {activeIpTab === 'dispute'   && 'Intellectual Property Dispute'}
                      </h4>
                      <div className="grid grid-cols-3 gap-x-4 gap-y-0.5">
                        {(
                          activeIpTab === 'trademark' ? [
                            { name: 'Trademark Registration', href: '/trademark-ip/trademark-registration' },
                          ] :
                          activeIpTab === 'copyright' ? [
                            { name: 'Copyright Registration', href: '/trademark-ip/copyright-registration' },
                            { name: 'Music Copyright', href: '/trademark-ip/music-copyright' },
                            { name: 'Software Copyright', href: '/trademark-ip/software-copyright' },
                            { name: 'Artistic Work Copyright', href: '/trademark-ip/artistic-work-copyright' },
                            { name: 'Website Copyright', href: '/trademark-ip/website-copyright' },
                          ] :
                          activeIpTab === 'patent' ? [
                            { name: 'Patent Search', href: '/trademark-ip/patent-search' },
                            { name: 'Provisional Patent Application', href: '/trademark-ip/provisional-patent-application' },
                            { name: 'Patent Drafting', href: '/trademark-ip/patent-drafting' },
                            { name: 'Patent Filing', href: '/trademark-ip/patent-filing' },
                          ] :
                          activeIpTab === 'design' ? [
                            { name: 'Industrial Design Registration', href: '/trademark-ip/industrial-design-registration' },
                            { name: 'Logo Design Protection', href: '/trademark-ip/logo-design-protection' },
                            { name: 'Packaging Design Protection', href: '/trademark-ip/packaging-design-protection' },
                          ] : [
                            { name: 'IP Legal Notice', href: '/trademark-ip/ip-legal-notice' },
                            { name: 'Cease and Desist Drafting', href: '/trademark-ip/cease-and-desist-drafting' },
                            { name: 'IP Litigation Advisory', href: '/trademark-ip/ip-litigation-advisory' },
                            { name: 'Domain Name Dispute', href: '/trademark-ip/domain-name-dispute' },
                          ]
                        ).map(({ name, href }) => (
                          <a
                            key={name}
                            href={href}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                            <span className="leading-tight">{name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Taxation Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === "taxation" ? null : "taxation")}
                className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
                } ${activeMenu === "taxation" ? 'text-brand-orange' : ''}`}
              >
                <span>Taxation</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === "taxation" ? 'rotate-180 text-brand-orange' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {activeMenu === "taxation" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />
              )}

              {activeMenu === "taxation" && (
                <>
                  <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                  <div className={`absolute top-full right-0 mt-3.5 w-[620px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-950 text-white shadow-black/80'
                      : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                  }`}>
                    {/* Left Column — Tax Tabs */}
                    <div className={`w-[38%] p-4 flex flex-col gap-2 transition-colors duration-300 shrink-0 ${
                      isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'
                    }`}>
                      {([
                        { key: 'income-tax', label: 'Income Tax', icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z' },
                        { key: 'gst',        label: 'GST',        icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008H14.25V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
                      ] as { key: typeof activeTaxTab; label: string; icon: string }[]).map((tab) => (
                        <button
                          key={tab.key}
                          onMouseEnter={() => setActiveTaxTab(tab.key)}
                          onClick={() => setActiveTaxTab(tab.key)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                            activeTaxTab === tab.key
                              ? isDarkMode
                                ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange'
                                : 'bg-white border-slate-100 shadow-md text-brand-orange'
                              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="h-5 w-5 shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                            </svg>
                            <span className="text-sm">{tab.label}</span>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${activeTaxTab === tab.key ? 'translate-x-1' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      ))}
                    </div>

                    {/* Right Column — items list */}
                    <div className="flex-1 p-5 bg-white dark:bg-slate-950 flex flex-col gap-3 overflow-y-auto max-h-[380px]">
                      <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2 shrink-0">
                        {activeTaxTab === 'income-tax' ? 'Income Tax' : 'GST'}
                      </h4>
                      <div className="grid grid-cols-1 gap-0.5">
                        {(activeTaxTab === 'income-tax'
                          ? [
                              { name: 'Income Tax E-Filing', href: '/taxation/income-tax-e-filing' },
                              { name: 'Business Tax Filing', href: '/taxation/business-tax-filing' },
                              { name: 'ITR-1 Return Filing', href: '/taxation/itr-1-return-filing' },
                              { name: 'ITR-2 Return Filing', href: '/taxation/itr-2-return-filing' },
                              { name: 'ITR-3 Return Filing', href: '/taxation/itr-3-return-filing' },
                              { name: 'ITR-4 Return Filing', href: '/taxation/itr-4-return-filing' },
                              { name: 'ITR-5 Return Filing', href: '/taxation/itr-5-return-filing' },
                              { name: 'ITR-6 Return Filing', href: '/taxation/itr-6-return-filing' },
                              { name: 'ITR-7 Return Filing', href: '/taxation/itr-7-return-filing' },
                              { name: '15CA - 15CB Filing', href: '/taxation/15ca-15cb-filing' },
                              { name: 'TAN Registration', href: '/taxation/tan-registration' },
                              { name: 'TDS Return Filing', href: '/taxation/tds-return-filing' },
                            ]
                          : [
                              { name: 'GST Registration', href: '/taxation/gst-registration' },
                              { name: 'GST Return Filing', href: '/taxation/gst-return-filing' },
                              { name: 'GST Annual Return Filing (GSTR-9)', href: '/taxation/gst-annual-return-filing' },
                            ]
                        ).map(({ name, href }) => (
                          <a
                            key={name}
                            href={href}
                            onClick={() => setActiveMenu(null)}
                            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" />
                            <span>{name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Controls & Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.636 1.636M16.5 16.5l1.636 1.636M3 12h2.25m13.5 0H21M4.22 19.78l1.636-1.636M16.5 5.5l1.636-1.636m-8.5 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" />
                </svg>
              ) : (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            

            {/* Talk to Experts Button */}
            <a
              href="tel:+917337750923"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48 1.002a28.09 28.09 0 0013.11 13.11c.447.163.885-.07 1.002-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 18.5V20a1.5 1.5 0 01-1.5 1.5 20 20 0 01-20-20A1.5 1.5 0 012 3.5z" clipRule="evenodd" />
              </svg>
              <span>Talk to Experts</span>
            </a>
          </div>

          {/* Action Row for Mobile Viewports (Toggle & Hamburger next to each other) */}
          <div className="flex lg:hidden items-center gap-3">
            
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400' 
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
              aria-label="Toggle theme mobile"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.636 1.636M16.5 16.5l1.636 1.636M3 12h2.25m13.5 0H21M4.22 19.78l1.636-1.636M16.5 5.5l1.636-1.636m-8.5 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true)}
              className={`flex p-2 rounded-xl transition-colors duration-200 ${
                isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5.5 w-5.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5.5 w-5.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {/* Mobile Menu Drawer — Zolvit-style fullscreen drill-down */}
        {mobileMenuOpen && (
          <div className={`lg:hidden fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] flex flex-col transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-950' : 'bg-[#f5f6f8]'
          }`}>
            {mobileActiveCategory === null ? (
              /* Top-level list — Zolvit-style card rows */
              <div key="list" className="animate-mobile-nav-list flex-1 overflow-y-auto px-4 pt-4 pb-28 flex flex-col gap-2.5">
                {mobileNavCategories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setMobileActiveCategory(cat.key)}
                    className={`flex w-full items-center gap-4 px-4 py-4 rounded-2xl border transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                      isDarkMode
                        ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200/60 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    {/* Icon Container */}
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-slate-100 border-slate-200'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                      </svg>
                    </span>

                    {/* Label */}
                    <span className={`flex-1 text-left text-[16px] font-semibold ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>
                      {cat.label}
                    </span>

                    {/* Chevron */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5 shrink-0 text-brand-orange">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : (
              /* Category detail view — Zolvit-style drill-down */
              <div key={mobileActiveCategory} className="animate-mobile-nav-detail flex-1 flex flex-col overflow-hidden">
                {/* Back Header */}
                <button
                  onClick={() => setMobileActiveCategory(null)}
                  className={`flex items-center gap-2 w-full py-4 px-5 text-lg font-bold border-b shrink-0 cursor-pointer transition-colors ${
                    isDarkMode ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-900'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5 shrink-0 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  <span>{mobileNavCategories.find((c) => c.key === mobileActiveCategory)?.label}</span>
                </button>

                {/* Scrollable Items */}
                <div className={`flex-1 overflow-y-auto pb-28 mobile-nav-scrollbar ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
                  {mobileNavCategories
                    .find((c) => c.key === mobileActiveCategory)
                    ?.groups.map((group, groupIdx) => (
                      <div key={group.title}>
                        {/* Section Divider */}
                        {groupIdx > 0 && (
                          <div className={`mx-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`} />
                        )}

                        {/* Section Title */}
                        <h5 className={`text-base font-bold px-5 pt-6 pb-3 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-900'
                        }`}>
                          {group.title}
                        </h5>

                        {/* Items */}
                        {group.items.map(({ name, href }) => (
                          <a
                            key={name}
                            href={href}
                            onClick={() => closeMobileMenu()}
                            className={`block py-3.5 px-8 text-[15px] font-medium transition-colors ${
                              isDarkMode ? 'text-slate-400 hover:text-white active:bg-slate-900' : 'text-slate-600 hover:text-slate-900 active:bg-slate-50'
                            }`}
                          >
                            {name}
                          </a>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Sticky Bottom CTA */}
            <div className={`shrink-0 px-4 py-3 border-t ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <a
                href="tel:+917337750923"
                onClick={() => closeMobileMenu()}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-orange py-3.5 text-center text-[15px] font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600 active:scale-[0.98] transition-all duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48 1.002a28.09 28.09 0 0013.11 13.11c.447.163.885-.07 1.002-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 18.5V20a1.5 1.5 0 01-1.5 1.5 20 20 0 01-20-20A1.5 1.5 0 012 3.5z" clipRule="evenodd" />
                </svg>
                <span>Talk to Experts</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-8 lg:pt-6 lg:pb-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.08),rgba(255,255,255,0))]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Value-props & Details */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              

              <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Private Limited Company <br />
                Registration
              </h1>
              
              <p className={`mx-auto lg:mx-0 max-w-xl text-lg leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Get your Private Limited Company Registration in just <span className="font-bold text-[#1e4b65] dark:text-sky-400">7 days</span> at <span className="text-orange-400 font-extrabold text-xl lg:text-2xl">Rs.2,499/-</span> only.
              </p>

              {/* Bulleted Value Props */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
                {[
                  { title: "CA/CS Expert Oversight", desc: "Every filing is reviewed by certified professionals." },
                  { title: "100% Online Process", desc: "No physical visits. Completely digital document handovers." },
                  { title: "50% Lower Cost", desc: "Automated filing cuts out the overhead — pay a fraction of what traditional CA firms charge." },
                  { title: "Compliance Calendar Alerts", desc: "Never miss a due date with automated compliance trackers." }
                ].map((item, idx) => (
                  <div key={idx} className={`flex gap-3 items-start p-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-900/30 border-slate-900/50' 
                      : 'bg-white border-slate-200/80 shadow-sm'
                  }`}>
                    <span className="flex h-5 w-5 mt-0.5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <h4 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{item.title}</h4>
                      <p className={`text-xs mt-0.5 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sub-CTA buttons */}
              
            </div>

            {/* Lead Capture Form Card */}
            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={selectedService || "General Inquiry"} dm={isDarkMode} isHomePage={true} />
            </div>          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section id="all-services" className={`pt-10 pb-10 lg:pt-14 lg:pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading with underline accent */}
          <div className="mb-10 text-center">
            <h2 className={`text-3xl font-extrabold uppercase tracking-tight sm:text-4xl transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              All Services
            </h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand-orange" />
          </div>

          {/* Tab bar */}
          <div className={`mb-10 flex flex-wrap justify-center gap-x-1 gap-y-2 border-b transition-colors duration-300 ${
            isDarkMode ? 'border-slate-800' : 'border-slate-200'
          }`}>
            {ALL_SERVICES_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveServiceTab(tab.key)}
                className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-all ${
                  activeServiceTab === tab.key
                    ? 'border-brand-orange text-brand-orange'
                    : `border-transparent ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {ALL_SERVICES_TABS.find((t) => t.key === activeServiceTab)?.services.map((svc) => (
              <div
                key={svc.title}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-slate-800 bg-slate-900/50 hover:border-brand-orange/30'
                    : 'border-slate-200 bg-slate-50 shadow-sm hover:border-brand-orange/40 hover:shadow-md'
                }`}
              >
                {svc.badge && (
                  <div className="absolute -top-3 right-4 bg-[#5465FF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-b-xl shadow-sm rounded-tr-xl">
                    {svc.badge}
                  </div>
                )}
                {/* Conditionally render icon if features are absent to keep layout for simple cards, but for featured card we might hide it if iconPath is undefined */}
                {svc.iconPath && !svc.features && (
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full ${
                    isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-brand-orange">
                      <path strokeLinecap="round" strokeLinejoin="round" d={svc.iconPath} />
                    </svg>
                  </div>
                )}

                {/* Subtitle / Description */}
                {svc.subtitle ? (
                  <p className={`mb-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {svc.subtitle}
                  </p>
                ) : null}

                {/* Title */}
                <h3 className={`font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0B1E40]'
                } ${svc.features ? 'mb-1 text-3xl min-h-[72px]' : 'mb-2 text-base'}`}>
                  {svc.title}
                </h3>
                
                {!svc.subtitle && svc.desc && (
                  <p className={`mb-5 flex-1 text-sm leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {svc.desc}
                  </p>
                )}

                {/* Pricing section for featured card */}
                {svc.oldPrice && svc.discount && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold line-through text-slate-500">₹{svc.oldPrice.toLocaleString('en-IN')}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border transition-colors duration-300 ${
                      isDarkMode ? 'text-brand-orange bg-brand-orange/10 border-brand-orange/20' : 'text-brand-orange bg-orange-50 border-orange-100'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {svc.discount}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className={`mb-5 ${svc.features ? 'mt-2 flex items-center gap-3' : 'mt-auto'}`}>
                  {svc.features && svc.oldPrice && !svc.discount && (
                    <span className={`text-xl font-medium line-through ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      ₹{svc.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className={`font-extrabold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-[#0B1E40]'
                  } ${svc.features ? 'text-3xl' : 'text-2xl'}`}>
                    ₹{typeof svc.price === 'number' ? svc.price.toLocaleString('en-IN') : svc.price}
                  </span>
                  {svc.priceDetail && (
                    <span className={`mt-0.5 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} ${svc.features ? 'ml-1' : 'block'}`}>
                      {svc.priceDetail}
                    </span>
                  )}
                </div>

                {/* CTA */}
                {svc.buttonText === 'Buy Now' ? (
                  <a
                    href={svc.href}
                    className={`block rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-all border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white capitalize ${
                      svc.features ? 'w-full' : 'uppercase'
                    }`}
                  >
                    {svc.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={() => { setSelectedService(svc.title); setIsModalOpen(true); }}
                    className={`block rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-all border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white uppercase ${
                      svc.features ? 'w-full' : ''
                    }`}
                  >
                    {svc.buttonText || "GET STARTED"}
                  </button>
                )}

                {/* Features List */}
                {svc.features && (
                  <div className={`mt-6 border-t pt-5 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h4 className={`text-xs font-medium uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{svc.featuresTitle || "What you'll get"}</h4>
                    <ul className="flex flex-col gap-3">
                      {svc.features.map((featureObj, idx) => {
                        const isObj = typeof featureObj !== 'string';
                        const text = isObj ? (featureObj as any).text : featureObj;
                        const included = isObj ? (featureObj as any).included : true;

                        return (
                          <li key={idx} className={`flex items-start gap-3 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {included ? (
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1da461]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 text-white">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                            ) : (
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#de443a]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5 text-white">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </div>
                            )}
                            <span dangerouslySetInnerHTML={{ __html: text.replace(/(21 days\*)/g, '<strong>$1</strong>').replace(/(2 - 4 days)/g, '<strong>$1</strong>').replace(/(4 - 7 days)/g, '<strong>$1</strong>').replace(/(14 days)/g, '<strong>$1</strong>').replace(/(PAN\+TAN)/g, '<strong>$1</strong>').replace(/(DIN)/g, '<strong>$1</strong>').replace(/(LLP agreement)/g, '<strong>$1</strong>') }} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Process / Timeline Section */}
      <section id="workflow" className={`py-16 lg:py-24 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50/50 border-slate-200'
      }`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-brand-orange font-bold text-sm tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              How It Works
            </div>
            <h2 className={`text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Four Steps to Compliance Success
            </h2>
            <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              We've engineered a frictionless onboarding experience. Skip the bureaucratic maze and let our platform guide you.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Desktop connecting line */}
            <div className={`hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
               <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent"></div>
            </div>

            {[
              {
                step: "01",
                title: "Tell Us What You Need",
                desc: "Complete a brief digital questionnaire outlining your specific goals, and our algorithm will instantly match you with the right services.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Connect With An Expert",
                desc: "A specialized compliance officer will review your profile, provide strategic advice, and outline a crystal-clear roadmap with zero hidden fees.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "We Do The Heavy Lifting",
                desc: "Sit back while our legal team drafts, files, and manages all necessary documentation with the respective government bodies on your behalf.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                )
              },
              {
                step: "04",
                title: "Track Progress in Real-Time",
                desc: "Access your personalized dashboard to monitor application status, receive instant alerts, and securely download your final certificates.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`text-brand-orange font-bold mb-4 text-sm`}>{item.step}</div>
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center bg-white shadow-xl border mb-6 transition-transform duration-300 group-hover:-translate-y-2 ${isDarkMode ? 'border-slate-800 bg-slate-900 shadow-brand-orange/5' : 'border-slate-100 shadow-slate-200/50'}`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-600 px-8 py-4 text-white font-bold transition-all shadow-lg shadow-orange-500/30 active:scale-95">
              Get Started Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Takes less than 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Us - Features Grid Section */}
      <section className={`py-16 lg:py-24 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900/50 border-slate-900' : 'bg-white border-slate-200'
      }`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-brand-orange font-bold text-sm tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              The Compliance Bharo Advantage
            </div>
            <h2 className={`text-3xl lg:text-5xl font-extrabold tracking-tight mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Built For Modern Founders
            </h2>
            <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Experience a new standard in legal services where cutting-edge technology meets deep regulatory expertise, designed to scale with your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Automation Hub",
                desc: "Leverage our proprietary technology to eliminate manual data entry, predict compliance deadlines, and dramatically reduce turnaround times.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                  </svg>
                )
              },
              {
                title: "Elite Legal Minds",
                desc: "Gain direct access to a vetted network of top-tier Chartered Accountants, Company Secretaries, and corporate lawyers dedicated to your growth.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                )
              },
              {
                title: "Frictionless Execution",
                desc: "Navigate complex regulatory landscapes with ease through our structured, step-by-step workflows and dedicated account managers.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                )
              },
              {
                title: "Comprehensive Lifecycle Care",
                desc: "We don't just register your company; we provide continuous legal, tax, and compliance support as your business evolves.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                )
              },
              {
                title: "Predictable Flat-Fee Pricing",
                desc: "Say goodbye to hourly billing. Enjoy absolute financial clarity with our upfront, transparent pricing model and flexible payment options.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                )
              },
              {
                title: "Always-On Support",
                desc: "Your business never sleeps, and neither does our support. Get answers when you need them through our multi-channel communication platform.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                )
              }
            ].map((feature, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-slate-200'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-orange-50'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Platform Feature */}
      <section className="py-20 lg:py-32 bg-[#040C18] border-y border-slate-800/50 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-purple-900/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left side content */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                The Future of Legal Tech is Here
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-6 text-white">
                Meet Compliance Bharo <span className="text-brand-orange">AI</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Our advanced artificial intelligence acts as your virtual Chief Compliance Officer, constantly monitoring regulations and optimizing your legal workflows.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Instant Trademark & Name Availability Analysis", icon: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" },
                  { title: "Dynamic Document Generation Engine", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
                  { title: "Automated Regulatory Deadline Alerts", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
                  { title: "Machine Learning-Accelerated Filings", icon: "M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" },
                  { title: "Intelligent 24/7 Legal Assistant", icon: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800/50 border border-slate-700/50 text-teal-400 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right side AI Graphic */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative mt-12 lg:mt-0">
              <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                {/* Outer Rings */}
                <div className="absolute inset-0 rounded-full border border-slate-700/30 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-8 rounded-full border border-slate-700/50 animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-16 rounded-full border border-slate-600/40 animate-[spin_10s_linear_infinite]"></div>
                
                {/* Floating dots on rings */}
                <div className="absolute top-[10%] left-[20%] w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_2px_rgba(45,212,191,0.5)]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_3px_rgba(59,130,246,0.5)]"></div>
                <div className="absolute top-[30%] right-[25%] w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(192,132,252,0.5)]"></div>

                {/* Central Sphere */}
                <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_40px_10px_rgba(168,85,247,0.4)] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-black/20 mix-blend-overlay"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="relative z-10 text-white font-bold tracking-widest text-lg drop-shadow-md text-center">
                    COMPLIANCE<br/>AI
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials & Leadership Quote */}
      <section className="py-20 lg:py-28 bg-[#0B1221] border-y border-slate-800/60 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
            
            {/* Left Column: Leadership Quote */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-sm tracking-widest uppercase mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Our Core Philosophy
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-8 text-white">
                Empowering India's Next Generation of Entrepreneurs
              </h2>
              
              <div className="relative pl-6 border-l-4 border-brand-orange mb-8">
                <p className="text-xl lg:text-2xl font-medium text-slate-300 italic leading-relaxed">
                  "Our vision was simple: democratize access to premium legal services. We believe that no brilliant idea should fail because of regulatory friction."
                </p>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-8">
                By bridging the gap between innovative software and seasoned professionals, we've created an ecosystem where businesses can thrive without boundaries.
              </p>
              
              <div>
                <h4 className="text-white font-bold text-lg">The Founding Team</h4>
                <p className="text-slate-500">Compliance Bharo</p>
              </div>
            </div>
            
            {/* Right Column: Reviews Grid */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {[
                  {
                    text: "An absolute game-changer for our startup. They handled our incorporation flawlessly while we focused on building our product.",
                    author: "Vikram S., Tech Founder"
                  },
                  {
                    text: "The level of transparency they provide is unmatched. I always knew exactly where my trademark application stood.",
                    author: "Neha P., E-commerce Owner"
                  },
                  {
                    text: "Finally, a compliance partner that actually understands the urgency of modern business. Fast, reliable, and incredibly supportive.",
                    author: "Rahul M., Agency Director"
                  },
                  {
                    text: "Their AI dashboard is brilliant. It alerted us to a compliance deadline we had completely missed. Truly a lifesaver.",
                    author: "Priya K., SaaS CEO"
                  },
                  {
                    text: "We migrated all our annual filings to Compliance Bharo. Best business decision we made this year.",
                    author: "Amit R., Manufacturing Hub"
                  },
                  {
                    text: "The combination of smart tech and human experts gives us total peace of mind. Highly recommend them to any new founder.",
                    author: "Sneha D., EdTech Startup"
                  }
                ].map((review, idx) => (
                  <div key={idx} className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-2xl flex flex-col justify-between hover:bg-slate-800/50 transition-colors">
                    <div>
                      <div className="flex text-brand-orange mb-4 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                        "{review.text}"
                      </p>
                    </div>
                    <p className="text-white font-bold text-sm">
                      {review.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trust Indicators / Social Proof logos */}
      <section className={`py-12 border-y transition-colors duration-300 ${
        isDarkMode ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200 bg-slate-100/50'
      }`}>
        <div className="mx-auto max-w-7xl px-6">
          <p className={`text-center text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
            isDarkMode ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Trusted by founders at India's fastest-growing scale-ups
          </p>

          
          {/* Key Stat Badges */}
          <div className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 border transition-colors duration-300 rounded-2xl p-6 text-center ${
            isDarkMode ? 'border-slate-900/60 bg-slate-900/10' : 'border-slate-200 bg-white shadow-sm'
          }`}>
            <div>
              <p className={`text-3xl font-extrabold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                1500+
              </p>
              <p className={`text-xs font-medium mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                SMEs & Startups Registered
              </p>
            </div>
            <div className={`border-y sm:border-y-0 sm:border-x py-4 sm:py-0 transition-colors duration-300 ${
              isDarkMode ? 'border-slate-900' : 'border-slate-200'
            }`}>
              <p className="text-3xl font-extrabold text-brand-orange">99.93%</p>
              <p className={`text-xs font-medium mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Accuracy & Submission Rate
              </p>
            </div>
            <div>
              <p className={`text-3xl font-extrabold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ₹15 Crores+
              </p>
              <p className={`text-xs font-medium mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tax Savings Managed Annually
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature & Benefits Section */}
      <section id="features" className="py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">Features</h2>
            <p className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Everything you need to stay audit-proof
            </p>
            <p className={`mt-4 text-base leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Ditch the spreadsheets and endless follow-ups. Get full compliance management, legal incorporation, and financial accounting under a single umbrella.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Seamless Incorporation",
                desc: "Establish your Pvt Ltd, LLP, or OPC in less than 10 days. All government fee handling and filing paperwork completely taken care of.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33-1.5 12" />
                  </svg>
                )
              },
              {
                title: "Automated GST & ITR Filings",
                desc: "Never miss GSTR filing deadlines. Simply upload your bank statements and sales sheets, and our algorithms draft matching tax sheets.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5M4.5 19.5h15M5.25 19.5V8.25M18.75 19.5V8.25M9.75 19.5v-6.75M14.25 19.5v-6.75" />
                  </svg>
                )
              },
              {
                title: "Real-time Compliance Health",
                desc: "Check your compliance risk score. Get immediate push alerts and email notifications whenever compliance due-dates are approaching.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                  </svg>
                )
              },
              {
                title: "Trademark & Brand Protection",
                desc: "Secure your brand identity in India. We perform rapid trademark search, file applications, and defend against potential objections.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                )
              },
              {
                title: "Expert CA/CS Dedicated Chat",
                desc: "Get unlimited chat and video queries with your assigned compliance manager. Friendly experts ready to solve custom business questions.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.154-.63 13.09 13.09 0 0 1 .839-3.918C3.622 15.042 3 13.574 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                )
              },
              {
                title: "ISO & Legal Documents",
                desc: "Instantly draft employment agreements, NDA agreements, freelancer contracts, and file for ISO certification through easy legal templates.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                )
              }
            ].map((feat, index) => (
              <div key={index} className={`flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 ${
                isDarkMode 
                  ? 'border-slate-900 bg-slate-900/20 hover:border-slate-800' 
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
              }`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-brand-orange">
                  {feat.icon}
                </span>
                <h3 className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ClientReviews isDarkMode={isDarkMode} />

      {/* Accordion FAQ Section */}
      <section id="faqs" className={`py-8 lg:py-10 border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900/20 border-slate-900' : 'bg-slate-100/50 border-slate-200'
      }`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold text-brand-orange uppercase tracking-wider">FAQ</h2>
            <p className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Frequently Asked Questions
            </p>
            <p className={`mt-4 text-base transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Clear, simple answers to help you understand our services and operations.
            </p>
          </div>

          <div className={`mx-auto max-w-3xl divide-y border rounded-2xl p-4 transition-all duration-300 ${
            isDarkMode 
              ? 'divide-slate-900 border-slate-900 bg-slate-950/40' 
              : 'divide-slate-200 border-slate-200 bg-white shadow-sm'
          }`}>
            {[
              {
                q: "What services does 'Compliance Bharo' specialize in?",
                a: "We offer end-to-end business and legal compliance including startup incorporation (Pvt Ltd, LLP, OPC), GST registrations & filings, Income Tax returns (ITR) for businesses and individuals, trademark registrations, and ISO/MSME certifications."
              },
              {
                q: "How long does it take to register a Private Limited company?",
                a: "Typically, it takes 7 to 10 working days to receive your digital incorporation certificate from the Ministry of Corporate Affairs (MCA). This timeline includes getting Digital Signature Certificates (DSC), Name Approval, and SPICe+ filing. Our team handles all communication with MCA."
              },
              {
                q: "Will I get a dedicated professional assigned to my account?",
                a: "Yes! Based on your selected tier (Growth and Enterprise), you are immediately assigned a dedicated Chartered Accountant (CA) or Company Secretary (CS) associate who will personally manage your account, answer queries, and represent you during filing validations."
              },
              {
                q: "Are there any hidden government fees?",
                a: "No. Our pricing is completely transparent. For plans that exclude governmental filing charges (usually due to capital variations), we list the exact fee schedule upfront so you are fully prepared and never surprised."
              },
              {
                q: "Is my corporate data secure with Compliance Bharo?",
                a: "Data security is our highest priority. All your incorporation documents, financial statements, and personal IDs are encrypted and stored in secure AWS cloud servers. We will never share or lease your corporate files to any third party."
              }
            ].map((faq, index) => (
              <div key={index} className={`py-4 first:pt-2 last:pb-2 transition-colors duration-300 ${
                isDarkMode ? 'divide-slate-900' : 'divide-slate-200'
              }`}>
                <button 
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between text-left font-semibold py-2 focus:outline-none cursor-pointer"
                >
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    {faq.q}
                  </span>
                  <span className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-slate-400 group-hover:text-white transition-all duration-200 ${
                    activeFaq === index ? 'rotate-180 text-brand-orange' : ''
                  } ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 max-h-0 ${activeFaq === index ? 'max-h-40 mt-2' : ''}`}>
                  <p className={`text-sm pr-6 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer isDarkMode={isDarkMode} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName={selectedService || 'General Inquiry'}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
