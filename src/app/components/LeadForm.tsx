'use client';

import React, { useRef, useEffect, useActionState, useState } from 'react';
import { submitLead } from '../actions';

interface LeadFormProps {
  serviceName: string;
  dm?: boolean; // dark mode flag, defaults to false if we want it light-themed like the screenshot
  isHomePage?: boolean;
}

export default function LeadForm({ serviceName, dm = false, isHomePage = false }: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedService, setSelectedService] = useState("Company incorporation");
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
    <div className={`relative rounded-2xl border p-6 lg:p-8 shadow-2xl ${dm ? 'border-slate-800 bg-slate-900/60 backdrop-blur-xl' : 'border-slate-200 bg-white'}`}>
      <div className="mb-6 text-center">
        <h3 className={`text-xl font-bold ${dm ? 'text-white' : 'text-slate-900'}`}>
          Enter your details to receive a full<br />quote and consultation
        </h3>
      </div>
      <form ref={formRef} action={formAction} className="space-y-4">
        {state?.success && state?.message && !hideMessage && (
          <div className="p-3 rounded-xl border text-sm bg-emerald-500/10 border-emerald-500/25 text-emerald-500">
            {state.message}
          </div>
        )}
        {state?.success === false && state?.message && (
          <div className="p-3 rounded-xl border text-sm bg-rose-500/10 border-rose-500/25 text-rose-500">
            {state.message}
          </div>
        )}
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
            Full Name
          </label>
          <input 
            type="text" 
            name="name" 
            disabled={pending} 
            className={`w-full border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 transition-all ${dm ? 'bg-slate-950/70 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'} ${state?.errors?.name ? 'border-rose-500/50' : ''}`} 
          />
          {state?.errors?.name && <p className="text-xs text-rose-500 mt-1">{state.errors.name}</p>}
        </div>
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
            Email Address
          </label>
          <input 
            type="email" 
            name="email" 
            disabled={pending} 
            className={`w-full border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 transition-all ${dm ? 'bg-slate-950/70 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'} ${state?.errors?.email ? 'border-rose-500/50' : ''}`} 
          />
          {state?.errors?.email && <p className="text-xs text-rose-500 mt-1">{state.errors.email}</p>}
        </div>
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
            Phone Number
          </label>
          <input 
            type="tel" 
            name="phone" 
            maxLength={10} 
            disabled={pending} 
            className={`w-full border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 transition-all ${dm ? 'bg-slate-950/70 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'} ${state?.errors?.phone ? 'border-rose-500/50' : ''}`} 
          />
          {state?.errors?.phone && <p className="text-xs text-rose-500 mt-1">{state.errors.phone}</p>}
        </div>
        {isHomePage && (
          <>
            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                Select a service
              </label>
              <select
                name="service"
                disabled={pending}
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className={`w-full border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 transition-all ${dm ? 'bg-slate-950/70 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'}`}
              >
                <option value="Company incorporation">Company incorporation</option>
                <option value="GST registration & filing">GST registration & filing</option>
                <option value="ITR filing">ITR filing</option>
                <option value="Compliance service">Compliance service</option>
              </select>
              {state?.errors?.service && <p className="text-xs text-rose-500 mt-1">{state.errors.service}</p>}
            </div>
            {selectedService === "Company incorporation" && (
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Select your state
                </label>
                <select
                  name="state"
                  disabled={pending}
                  className={`w-full border rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange disabled:opacity-50 transition-all ${dm ? 'bg-slate-950/70 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'}`}
                >
                  <option value="">Select State</option>
                  {[
                    "Andaman and Nicobar Island", "Andhra Pradesh", "Arunachal Pradesh",
                    "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli",
                    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
                    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
                    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
                    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
                    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
                  ].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {!isHomePage && (
          <>
            <input type="hidden" name="service" value={serviceName} />
            {state?.errors?.service && <p className="text-xs text-rose-500 -mt-2">{state.errors.service}</p>}
          </>
        )}
        <button 
          type="submit" 
          disabled={pending} 
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-3.5 text-sm font-semibold text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25 disabled:opacity-75 transition-all mt-2"
        >
          {pending ? 'Submitting Details...' : 'Claim Your Free Consultation'}
        </button>
      </form>
      
      <div className="mt-6 flex items-center justify-center gap-3">
        {/* Google G Logo SVG */}
        <div className="bg-white p-1.5 rounded-full shadow-md shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <span className={`text-[17px] font-bold leading-none tracking-tight ${dm ? 'text-white' : 'text-slate-900'}`}>
            Average Google Rating
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`text-sm font-semibold leading-none ${dm ? 'text-slate-100' : 'text-slate-800'}`}>
              4.9 out of 5
            </span>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
