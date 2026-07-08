'use client';

import React, { useRef, useActionState, useEffect, useState } from 'react';
import { submitLead } from '../actions';

interface PopupFormProps {
  serviceName: string;
  onClose?: () => void;
}

export default function PopupForm({ serviceName, onClose }: PopupFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  const [hideMessage, setHideMessage] = useState(false);

  useEffect(() => {
    setHideMessage(false);
    if (state?.success) {
      formRef.current?.reset();
      const timer = setTimeout(() => {
        setHideMessage(true);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl font-sans relative">
      
      {/* Header */}
      <div className="bg-brand-orange px-4 py-3 flex items-center justify-between text-white text-[10px] sm:text-xs font-bold relative">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3.5 5.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5zm4.5 0a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" clipRule="evenodd" />
          </svg>
          FREE Consultation
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-full">
            Get Started @ <span className="line-through opacity-75 mx-0.5">₹299</span> <span>₹0</span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Request a Free Quote</h2>
          <p className="text-sm text-gray-500">Talk to our business executives in minutes</p>
        </div>

        <form ref={formRef} action={formAction} className="space-y-4">
          {state?.success && state?.message && !hideMessage && (
            <div className="p-3 rounded-lg border text-sm bg-emerald-50 border-emerald-200 text-emerald-600">
              {state.message}
            </div>
          )}

          {state?.success === false && state?.message && (
            <div className="p-3 rounded-lg border text-sm bg-red-50 border-red-200 text-red-600">
              {state.message}
            </div>
          )}

          {/* Full Name */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <input
                type="text"
                name="name"
                disabled={pending}
                placeholder="Full Name *"
                className={`w-full pl-10 pr-3 py-2.5 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 ${state?.errors?.name ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>
            {state?.errors?.name && (
              <p className="text-red-500 text-xs mt-1 ml-1">{state.errors.name}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <div className={`relative flex rounded-lg border bg-white overflow-hidden focus-within:ring-1 focus-within:ring-brand-orange ${state?.errors?.phone ? 'border-red-500' : 'border-gray-200'}`}>
              <div className="flex items-center px-3 bg-gray-50 border-r border-gray-200 gap-1 text-sm text-gray-600">
                <span className="text-base leading-none">🇮🇳</span>
                <span>+91</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 ml-1 text-gray-400">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.069-3.769-6.664-6.664l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  disabled={pending}
                  maxLength={10}
                  placeholder="Mobile Number *"
                  className="w-full pl-8 pr-3 py-2.5 bg-transparent text-sm text-gray-900 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>
            {state?.errors?.phone && (
              <p className="text-red-500 text-xs mt-1 ml-1">{state.errors.phone}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                disabled={pending}
                placeholder="Email Address *"
                className={`w-full pl-10 pr-3 py-2.5 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 ${state?.errors?.email ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{state.errors.email}</p>
            )}
          </div>

          <input type="hidden" name="service" value={serviceName} />
          {state?.errors?.service && (
            <p className="text-red-500 text-xs mt-1 ml-1">{state.errors.service}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button 
              type="submit" 
              disabled={pending}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-md disabled:opacity-75"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 -rotate-45">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
              GET STARTED NOW
            </button>
            <a 
              href="https://wa.me/917337750923" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] text-white w-12 rounded-lg transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.5c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.5-186.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </a>
          </div>
        </form>

        {/* Footer Features */}
        <div className="flex items-center justify-between mt-5 text-[10px] sm:text-xs text-gray-500 font-medium px-2">
          <div className="flex flex-col items-center gap-1">
            <span className="text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
              </svg>
            </span>
            Instant Response
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </span>
            100% Confidential
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
            </span>
            Expert Advice
          </div>
        </div>

      </div>
    </div>
  );
}
