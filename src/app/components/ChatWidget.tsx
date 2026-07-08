'use client';

import React, { useState, useEffect, useRef } from 'react';
import { INDIAN_STATES } from '../../lib/indian-states';
import { supabase } from '../../utils/supabaseClient';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Business Registration',
  'Compliance',
  'GST Registration & Filing',
  'ITR',
  'Other',
] as const;

type Category = (typeof CATEGORIES)[number];

interface ServiceItem {
  name: string;
  href: string;
}

const SERVICES: Record<Category, ServiceItem[]> = {
  'Business Registration': [
    { name: 'Private Limited Company',      href: '/private-limited-company-registration' },
    { name: 'Limited Liability Partnership', href: '/limited-liability-partnership' },
    { name: 'One Person Company (OPC)',      href: '/one-person-company' },
    { name: 'Sole Proprietorship',          href: '/sole-proprietorship' },
  ],
  'Compliance': [
    { name: 'Annual Pvt Ltd Compliance',  href: '/compliance/annual-pvt-ltd-compliance' },
    { name: 'LLP Annual Compliance',      href: '/compliance/llp-annual-compliance' },
    { name: 'Proprietorship Compliance',  href: '/compliance/proprietorship-compliance' },
    { name: 'OPC Annual Compliance',      href: '/compliance/opc-annual-compliance' },
    { name: 'Accounting Services',        href: '/compliance/accounting-services' },
  ],
  'GST Registration & Filing': [
    { name: 'GST Registration',  href: '/taxation/gst-registration' },
    { name: 'GST Return Filing', href: '/taxation/gst-return-filing' },
  ],
  'ITR': [
    { name: 'Income Tax Return Filing', href: '/taxation/income-tax-return-filing' },
  ],
  'Other': [
    { name: 'Trademark Registration',        href: '/trademark-ip/trademark-registration' },
    { name: 'FSSAI Food License',            href: '/fssai-food-license' },
    { name: 'MSME / Udyam Registration',     href: '/msme-registration' },
    { name: 'Digital Signature Certificate', href: '/digital-signature-certificate' },
    { name: 'IEC / Import Export Code',      href: '/import-export-code' },
  ],
};

// ─── Step ordering ────────────────────────────────────────────────────────────

type ConvStep = 'category' | 'service' | 'name' | 'email' | 'phone' | 'state' | 'done';

const STEP_ORDER: ConvStep[] = ['category', 'service', 'name', 'email', 'phone', 'state', 'done'];

function atOrPast(current: ConvStep, target: ConvStep): boolean {
  return STEP_ORDER.indexOf(current) >= STEP_ORDER.indexOf(target);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center shrink-0 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <BotAvatar />
      <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2 text-sm text-slate-700 shadow-sm max-w-[85%] border border-slate-100 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-slate-200 text-slate-800 rounded-2xl rounded-tr-none px-3 py-2 text-sm max-w-[85%] leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <BotAvatar />
      <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2.5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-1">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PillButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-brand-orange text-brand-orange text-xs font-semibold px-3 py-1.5 hover:bg-brand-orange hover:text-white transition-colors"
    >
      {label}
    </button>
  );
}

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.5c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.5-186.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [convStep, setConvStep] = useState<ConvStep>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [endTime, setEndTime] = useState('');
  const [showFeedback, setShowFeedback] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [convStep, isTyping, isOpen, selectedCategory, selectedService, selectedState]);

  useEffect(() => {
    if (!isTyping && ['name', 'email', 'phone'].includes(convStep)) {
      inputRef.current?.focus();
    }
  }, [convStep, isTyping]);

  // ── Advance the conversation after a simulated typing delay ───────────────

  const botReply = (nextStep: ConvStep, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setConvStep(nextStep);
      if (nextStep === 'done') {
        setEndTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    }, delay);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleToggle = () => {
    if (!isOpen) {
      setConvStep('category');
      setSelectedCategory(null);
      setSelectedService(null);
      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setSelectedState('');
      setInputValue('');
      setInputError('');
      setIsTyping(false);
      setShowFeedback(true);
    }
    setIsOpen((v) => !v);
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    botReply('service', 450);
  };

  const handleServiceSelect = (svc: ServiceItem) => {
    setSelectedService(svc);
    botReply('name', 600);
  };

  const handleNameSubmit = () => {
    const v = inputValue.trim();
    if (v.length < 2) { setInputError('Please enter your full name.'); return; }
    setUserName(v);
    setInputValue('');
    setInputError('');
    botReply('email', 600);
  };

  const handleEmailSubmit = () => {
    const v = inputValue.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setInputError('Please enter a valid email address.');
      return;
    }
    setUserEmail(v);
    setInputValue('');
    setInputError('');
    botReply('phone', 600);
  };

  const handlePhoneSubmit = () => {
    const v = inputValue.trim();
    if (!/^[6-9]\d{9}$/.test(v)) {
      setInputError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setUserPhone(v);
    setInputValue('');
    setInputError('');
    botReply('state', 600);
  };

  const handleStateSelect = async (state: string) => {
    setSelectedState(state);
    try {
      const { error } = await supabase.from('consultations').insert([
        {
          full_name: userName,
          email: userEmail,
          phone_number: userPhone,
          service: selectedService?.name,
        },
      ]);
      if (error) {
        console.error('Supabase insert error:', error);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
    botReply('done', 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (convStep === 'name') handleNameSubmit();
    else if (convStep === 'email') handleEmailSubmit();
    else if (convStep === 'phone') handlePhoneSubmit();
  };

  const handleBack = () => {
    if (convStep === 'service') {
      setSelectedCategory(null);
      setConvStep('category');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl shadow-2xl overflow-hidden font-sans border border-slate-200/80 flex flex-col bg-slate-50"
          style={{ maxHeight: 'min(520px, calc(100vh - 7rem))' }}
        >
          {/* Header */}
          <div className="bg-brand-orange px-3 py-2.5 flex items-center gap-2 text-white shrink-0">
            <button
              onClick={handleBack}
              disabled={convStep !== 'service'}
              aria-label="Go back"
              className={`p-1.5 rounded-full transition-colors shrink-0 ${
                convStep === 'service'
                  ? 'hover:bg-white/20 text-white cursor-pointer'
                  : 'text-white/30 cursor-default'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 border-2 border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm leading-tight">Riya</p>
                <p className="text-[11px] text-white/80 leading-tight">Compliance Expert · Online</p>
              </div>
            </div>

            {/* Right icon: mail at done step, three-dot otherwise */}
            {convStep === 'done' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/80 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white/80 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            )}

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message body */}
          <div ref={scrollRef} className="p-4 space-y-3 overflow-y-auto flex-1">

            {/* Permanent greeting */}
            <BotBubble>Hi. I am Riya. How may i help you today?</BotBubble>
            <BotBubble>Are you looking for?</BotBubble>

            {/* Category pills — disappear once a selection is made */}
            {!selectedCategory && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CATEGORIES.map((cat) => (
                  <PillButton key={cat} label={cat} onClick={() => handleCategorySelect(cat)} />
                ))}
              </div>
            )}

            {/* User echoes category selection immediately */}
            {selectedCategory && <UserBubble text={selectedCategory} />}

            {/* Bot asks for specific service */}
            {atOrPast(convStep, 'service') && (
              <BotBubble>Please select a specific service:</BotBubble>
            )}

            {/* Service pills — disappear once a selection is made */}
            {convStep === 'service' && !selectedService && !isTyping && selectedCategory && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SERVICES[selectedCategory].map((svc) => (
                  <PillButton key={svc.name} label={svc.name} onClick={() => handleServiceSelect(svc)} />
                ))}
              </div>
            )}

            {/* User echoes service selection immediately */}
            {selectedService && <UserBubble text={selectedService.name} />}

            {/* Bot asks name */}
            {atOrPast(convStep, 'name') && <BotBubble>What&apos;s your name?</BotBubble>}

            {/* User echoes name */}
            {userName && <UserBubble text={userName} />}

            {/* Bot asks email */}
            {atOrPast(convStep, 'email') && <BotBubble>What&apos;s your email ID?</BotBubble>}

            {/* User echoes email */}
            {userEmail && <UserBubble text={userEmail} />}

            {/* Bot asks phone */}
            {atOrPast(convStep, 'phone') && <BotBubble>What&apos;s your phone number?</BotBubble>}

            {/* User echoes phone */}
            {userPhone && <UserBubble text={`+91 ${userPhone}`} />}

            {/* Bot asks state */}
            {atOrPast(convStep, 'state') && (
              <BotBubble>In which state would you like to incorporate your company?</BotBubble>
            )}

            {/* State pills — disappear once a selection is made */}
            {convStep === 'state' && !selectedState && !isTyping && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {INDIAN_STATES.map((state) => (
                  <button
                    key={state}
                    onClick={() => handleStateSelect(state)}
                    className="rounded-full border border-slate-300 text-slate-600 text-[11px] font-medium px-2.5 py-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}

            {/* User echoes state */}
            {selectedState && <UserBubble text={selectedState} />}

            {/* Final card + closing messages */}
            {convStep === 'done' && selectedService && (
              <>
                <BotBubble>
                  <p className="mb-2">Get started with registration by clicking here!</p>
                  <a
                    href={selectedService.href}
                    className="flex items-center gap-2 rounded-lg border border-brand-orange/30 bg-brand-orange/5 px-3 py-2 hover:bg-brand-orange/10 transition-colors"
                  >
                    <span>🛡</span>
                    <span className="text-brand-orange text-xs font-semibold flex-1 truncate">
                      {selectedService.name}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-brand-orange shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                </BotBubble>

                <BotBubble>
                  Thank you for sharing your requirements! A detailed quotation along with the documents required has been sent to your Email ID. Our Sales Associate will contact you to explain the process further.
                  <br /><br />
                  You can speed up the process by clicking on the link shared above and following the payment process. Thank you for your patience!
                </BotBubble>

                {/* System message */}
                <div className="flex items-center gap-2 py-1">
                  <div className="flex-1 h-px bg-slate-200" />
                  <p className="text-[10px] text-slate-400 shrink-0 whitespace-nowrap">
                    Riya has ended this chat session {endTime}
                  </p>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              </>
            )}

            {/* Typing indicator — always at the end */}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Docked text input (name / email / phone steps) */}
          {['name', 'email', 'phone'].includes(convStep) && !isTyping && (
            <div className="bg-white border-t border-slate-200 px-3 py-2.5 shrink-0">
              {inputError && (
                <p className="text-red-500 text-[11px] mb-1.5 ml-1">{inputError}</p>
              )}

              {convStep === 'phone' ? (
                /* Phone: flag + code prefix + input + submit link */
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden flex-1 bg-white">
                    <span className="px-2.5 py-2 text-sm border-r border-slate-200 bg-slate-50 flex items-center gap-1 shrink-0 text-slate-700">
                      🇮🇳 <span className="font-medium">+91</span>
                    </span>
                    <input
                      ref={inputRef}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value.replace(/\D/g, ''));
                        setInputError('');
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="10-digit number"
                      className="flex-1 px-2.5 py-2 text-sm text-slate-900 focus:outline-none placeholder:text-slate-400 bg-transparent"
                    />
                  </div>
                  <button
                    onClick={handlePhoneSubmit}
                    className="flex items-center gap-0.5 text-brand-orange text-sm font-semibold hover:text-orange-600 transition-colors shrink-0"
                  >
                    Submit
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              ) : (
                /* Name / email: text input + circular send button */
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type={convStep === 'email' ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); setInputError(''); }}
                    onKeyDown={handleKeyDown}
                    placeholder={convStep === 'name' ? 'Your full name' : 'your@email.com'}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-orange placeholder:text-slate-400"
                  />
                  <button
                    onClick={convStep === 'name' ? handleNameSubmit : handleEmailSubmit}
                    aria-label="Submit"
                    className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center hover:bg-orange-600 transition-colors shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback bar — shown at done step */}
          {convStep === 'done' && showFeedback && (
            <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0">
              <p className="text-xs text-slate-500 font-medium">Share your rating &amp; feedback</p>
              <button
                onClick={() => setShowFeedback(false)}
                aria-label="Dismiss feedback"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── WhatsApp floating button — BOTTOM LEFT ─────────────────────────── */}
      <a
        href="https://wa.me/917337750923?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-4 sm:left-6 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
      </a>

      {/* ── Chat widget toggle — BOTTOM RIGHT ─────────────────────────────── */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223Z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </>
  );
}
