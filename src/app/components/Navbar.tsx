'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import LeadForm from './LeadForm';
import PopupForm from './PopupForm';
import Link from 'next/link';

type MobileCategoryKey = 'business-registration' | 'compliances' | 'trademark-ip' | 'taxation';

type NavLink = { name: string; href: string };
type NavGroup = { title: string; items: NavLink[] };

const mobileBusinessRegistrationGroups: NavGroup[] = [
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
];

const mobileCompliancesGroups: NavGroup[] = [
  {
    title: 'Annual Compliances',
    items: [
      { name: 'Annual Compliance for Private Limited Company', href: '/compliance/annual-pvt-ltd-compliance' },
      { name: 'LLP Annual Compliance', href: '/compliance/llp-annual-compliance' },
      { name: 'One Person Company Compliance', href: '/compliance/opc-annual-compliance' },
    ],
  },
];

const mobileTrademarkIpGroups: NavGroup[] = [
  {
    title: 'Trademark Registration',
    items: [
      { name: 'Trademark Registration', href: '/trademark-ip/trademark-registration' },
    ],
  },
];

const mobileTaxationGroups: NavGroup[] = [
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
];

const mobileNavCategories: { key: MobileCategoryKey; label: string; icon: string; groups: NavGroup[] }[] = [
  {
    key: 'business-registration',
    label: 'Business Registration',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
    groups: mobileBusinessRegistrationGroups,
  },
  {
    key: 'compliances',
    label: 'Compliances',
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5',
    groups: mobileCompliancesGroups,
  },
  {
    key: 'trademark-ip',
    label: 'Trademark & IP',
    icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
    groups: mobileTrademarkIpGroups,
  },
  {
    key: 'taxation',
    label: 'Taxation',
    icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
    groups: mobileTaxationGroups,
  },
];

type NavbarProps = {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  breadcrumb?: string;
};

export default function Navbar({ isDarkMode, setIsDarkMode, breadcrumb }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<MobileCategoryKey | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'company' | 'licenses'>('company');
  const [activeComplianceTab, setActiveComplianceTab] = useState<'changes' | 'annual' | 'conversion'>('annual');
  const [activeIpTab, setActiveIpTab] = useState<'trademark' | 'copyright' | 'patent' | 'design' | 'dispute'>('trademark');
  const [activeTaxTab, setActiveTaxTab] = useState<'income-tax' | 'gst'>('income-tax');

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActiveCategory(null);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 backdrop-blur-md ${
      isDarkMode ? 'border-slate-900 bg-slate-950/85' : 'border-slate-200 bg-white/85'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/80 dark:border-slate-800/80 shadow-md group-hover:scale-105 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" stroke={isDarkMode ? '#fff' : '#0f172a'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 11.5l2 2 4-4" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Compliance<span className="text-brand-orange">Bharo</span>
            </span>
            {breadcrumb ? (
              <span className={`text-[10px] font-semibold -mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="hover:text-brand-orange transition-colors">Home</span>
                <span className="mx-1">›</span>
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{breadcrumb}</span>
              </span>
            ) : (
              <span className={`text-[10px] font-semibold uppercase tracking-widest -mt-1 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Fast track compliance ZZTESTMARKER123
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center lg:gap-5 xl:gap-8 text-sm font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>

          {/* Business Registration Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'business-registration' ? null : 'business-registration')}
              className={`flex items-center gap-0.5 transition-colors duration-200 py-2 group cursor-pointer ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
              } ${activeMenu === 'business-registration' ? 'text-brand-orange' : ''}`}
            >
              <span>Business Registration</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === 'business-registration' ? 'rotate-180 text-brand-orange' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === 'business-registration' && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />
            )}
            {activeMenu === 'business-registration' && (
              <>
                <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                <div className={`absolute top-full left-0 mt-3.5 w-[720px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                  isDarkMode ? 'border-slate-800 bg-slate-950 text-white shadow-black/80' : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                }`}>
                  {/* Left Tabs */}
                  <div className={`w-[40%] p-4 flex flex-col gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'}`}>
                    <button
                      onMouseEnter={() => setActiveTab('company')}
                      onClick={() => setActiveTab('company')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                        activeTab === 'company'
                          ? isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' : 'bg-white border-slate-100 shadow-md text-brand-orange'
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
                    <button
                      onMouseEnter={() => setActiveTab('licenses')}
                      onClick={() => setActiveTab('licenses')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                        activeTab === 'licenses'
                          ? isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' : 'bg-white border-slate-100 shadow-md text-brand-orange'
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
                  {/* Right Items */}
                  <div className="w-[60%] p-6 bg-white dark:bg-slate-950 flex flex-col gap-4">
                    <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2">
                      {activeTab === 'company' ? 'Company Registration' : 'Licenses & Registrations'}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {activeTab === 'company' ? (
                        <>
                          {([
                            { name: 'Private Limited Company', href: '/private-limited-company-registration' },
                            { name: 'Limited Liability Partnership', href: '/limited-liability-partnership' },
                            { name: 'One Person Company', href: '/one-person-company' },
                            { name: 'Sole Proprietorship', href: '/sole-proprietorship' },

                            { name: 'Startup India Registration', href: '/startup-india-registration' },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a key={name} href={href} onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors" />
                              <span>{name}</span>
                            </a>
                          ))}
                        </>
                      ) : (
                        <>
                          {([
                            { name: 'Digital Signature Certificate', href: '/digital-signature-certificate' },
                            { name: 'Udyam Registration', href: '/msme-registration' },
                            { name: 'MSME Registration', href: '/msme-registration' },

                            { name: 'FSSAI [Food License]', href: '/fssai-food-license' },
                            { name: 'IEC [Import/Export Code]', href: '/import-export-code' },
                          ] as { name: string; href: string }[]).map(({ name, href }) => (
                            <a key={name} href={href} onClick={() => setActiveMenu(null)}
                              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
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

          {/* Compliances Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'compliances' ? null : 'compliances')}
              className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
              } ${activeMenu === 'compliances' ? 'text-brand-orange' : ''}`}
            >
              <span>Compliances</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === 'compliances' ? 'rotate-180 text-brand-orange' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === 'compliances' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />}
            {activeMenu === 'compliances' && (
              <>
                <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                <div className={`absolute top-full left-0 mt-3.5 w-[680px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                  isDarkMode ? 'border-slate-800 bg-slate-950 text-white shadow-black/80' : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                }`}>
                  <div className={`w-[40%] p-4 flex flex-col gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'}`}>
                    {([
                      { key: 'annual',     label: 'Annual Compliances',  icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5' },
                    ] as { key: typeof activeComplianceTab; label: string; icon: string }[]).map((tab) => (
                      <button
                        key={tab.key}
                        onMouseEnter={() => setActiveComplianceTab(tab.key)}
                        onClick={() => setActiveComplianceTab(tab.key)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                          activeComplianceTab === tab.key
                            ? isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' : 'bg-white border-slate-100 shadow-md text-brand-orange'
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
                  <div className="w-[60%] p-5 bg-white dark:bg-slate-950 flex flex-col gap-3 overflow-y-auto max-h-[420px]">
                    <h4 className="text-base font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-900 pb-2 shrink-0">
                      {activeComplianceTab === 'changes'    && 'Corporate Changes'}
                      {activeComplianceTab === 'annual'     && 'Annual Compliances'}
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
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" /><span>{name}</span>
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
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" /><span>{name}</span>
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
                        ] as { name: string; href: string }[]).map(({ name, href }) => (
                          <a key={name} href={href} onClick={() => setActiveMenu(null)}
                            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" /><span className="leading-tight">{name}</span>
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
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover/item:bg-brand-orange transition-colors shrink-0" /><span>{name}</span>
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
              onClick={() => setActiveMenu(activeMenu === 'trademark-ip' ? null : 'trademark-ip')}
              className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
              } ${activeMenu === 'trademark-ip' ? 'text-brand-orange' : ''}`}
            >
              <span>Trademark & IP</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === 'trademark-ip' ? 'rotate-180 text-brand-orange' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === 'trademark-ip' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />}
            {activeMenu === 'trademark-ip' && (
              <>
                <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[800px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                  isDarkMode ? 'border-slate-800 bg-slate-950 text-white shadow-black/80' : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                }`}>
                  <div className={`w-[38%] p-4 flex flex-col gap-2 transition-colors duration-300 shrink-0 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'}`}>
                    {([
                      { key: 'trademark', label: 'Trademark Registration',       icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z' },

                    ] as { key: typeof activeIpTab; label: string; icon: string }[]).map((tab) => (
                      <button
                        key={tab.key}
                        onMouseEnter={() => setActiveIpTab(tab.key)}
                        onClick={() => setActiveIpTab(tab.key)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left font-semibold transition-all duration-150 cursor-pointer ${
                          activeIpTab === tab.key
                            ? isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' : 'bg-white border-slate-100 shadow-md text-brand-orange'
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
                        <a key={name} href={href} onClick={() => setActiveMenu(null)}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
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
              onClick={() => setActiveMenu(activeMenu === 'taxation' ? null : 'taxation')}
              className={`flex items-center gap-0.5 transition-colors duration-200 py-2 cursor-pointer ${
                isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
              } ${activeMenu === 'taxation' ? 'text-brand-orange' : ''}`}
            >
              <span>Taxation</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${activeMenu === 'taxation' ? 'rotate-180 text-brand-orange' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === 'taxation' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f59e0b]" />}
            {activeMenu === 'taxation' && (
              <>
                <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenu(null)} />
                <div className={`absolute top-full right-0 mt-3.5 w-[620px] border rounded-2xl shadow-2xl z-50 overflow-hidden flex transition-all duration-200 ${
                  isDarkMode ? 'border-slate-800 bg-slate-950 text-white shadow-black/80' : 'border-slate-200 bg-white text-slate-900 shadow-slate-200/50'
                }`}>
                  <div className={`w-[38%] p-4 flex flex-col gap-2 transition-colors duration-300 shrink-0 ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/70'}`}>
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
                            ? isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg text-brand-orange' : 'bg-white border-slate-100 shadow-md text-brand-orange'
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
                        <a key={name} href={href} onClick={() => setActiveMenu(null)}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-orange transition-colors py-0.5 flex items-center gap-2 group/item">
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

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3.5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
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

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-white border-slate-200 text-slate-600'
            }`}
            aria-label="Toggle theme"
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
          <button
            onClick={() => (mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true))}
            className={`flex p-2 rounded-xl transition-colors duration-200 ${
              isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] flex flex-col transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950' : 'bg-[#f5f6f8]'
        }`}>
          {mobileActiveCategory === null ? (
            /* Top-level list view — Zolvit-style card rows */
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className={`h-5.5 w-5.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
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
                          onClick={() => { setMobileMenuOpen(false); setMobileActiveCategory(null); }}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48 1.002a28.09 28.09 0 0013.11 13.11c.447.163.885-.07 1.002-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 18.5V20a1.5 1.5 0 01-1.5 1.5 20 20 0 01-20-20A1.5 1.5 0 012 3.5z" clipRule="evenodd" />
              </svg>
              <span>Talk to Experts</span>
            </a>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName="General Inquiry"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </header>
  );
}
