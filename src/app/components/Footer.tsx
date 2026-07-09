import React from 'react';
import Link from 'next/link';

interface FooterProps {
  isDarkMode?: boolean;
}

export default function Footer({ isDarkMode = false }: FooterProps) {
  return (
    <footer className={`border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
      } py-12 lg:py-16`}>
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 lg:gap-8">
            
            {/* Column 1 - Brand Info */}
            <div className="flex flex-col gap-6 lg:pr-4">
              <a href="#" className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </span>
                <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Compliance<span className="text-brand-orange">Bharo</span>
                </span>
              </a>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                AI-powered company registration assistance, compliance management, and business advisory services for entrepreneurs across India.
              </p>
              
              <div className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'} w-max mt-2`}>
                <div className="flex -space-x-1 items-center">
                   <svg viewBox="0 0 24 24" className="h-5 w-5 mr-3">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                   </svg>
                   {[...Array(4)].map((_, i) => (
                     <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 relative z-10">
                       <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                     </svg>
                   ))}
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 relative z-10">
                      <path fillRule="evenodd" d="M12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354Z" clipRule="evenodd" />
                   </svg>
                </div>
                <span className={`text-xs font-bold tracking-wide ml-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>4.9/5</span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                 {/* Social Icons */}
                 {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((social) => (
                    <a key={social} href="#" className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      isDarkMode ? 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-brand-orange'
                    }`}>
                      {social === 'facebook' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>}
                      {social === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>}
                      {social === 'twitter' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                      {social === 'linkedin' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                      {social === 'youtube' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M21.582 6.186a2.68 2.68 0 00-1.888-1.895C17.986 3.833 12 3.833 12 3.833s-5.986 0-7.694.458a2.68 2.68 0 00-1.888 1.895C1.96 7.91 1.96 12 1.96 12s0 4.09.458 5.814a2.68 2.68 0 001.888 1.895c1.708.458 7.694.458 7.694.458s5.986 0 7.694-.458a2.68 2.68 0 001.888-1.895c.458-1.724.458-5.814.458-5.814s0-4.09-.458-5.814zM9.957 15.352V8.648l6.19 3.352-6.19 3.352z"/></svg>}
                    </a>
                 ))}
              </div>
            </div>

            {/* Column 2 - BUSINESS REGISTRATION */}
            <div>
              <h4 className={`text-sm font-bold tracking-wider mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                BUSINESS REGISTRATION
              </h4>
              <ul className={`space-y-4 text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Private Limited Company</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>LLP Registration</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>One Person Company</a></li>

                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Sole Proprietorship</a></li>

              </ul>
            </div>

            {/* Column 3 - TAX & COMPLIANCE */}
            <div>
              <h4 className={`text-sm font-bold tracking-wider mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                TAX & COMPLIANCE
              </h4>
              <ul className={`space-y-4 text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>GST Registration</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>GST Return Filing</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Income Tax Filing</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Annual Compliance</a></li>
                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>Trademark Registration</a></li>

                <li><a href="#lead-form" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>FSSAI Registration</a></li>

              </ul>
            </div>


            {/* Column 5 - GET IN TOUCH */}
            <div className="flex flex-col gap-6">
              <h4 className={`text-sm font-bold tracking-wider mb-0 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                GET IN TOUCH
              </h4>
              <div className={`flex flex-col gap-5 text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                
                {/* Location */}
                <div className={`flex items-start gap-4 transition-colors duration-200`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span>301, Shriji Tower, Bicholi road, Near phoenix hospital, indore</span>
                </div>

                {/* Phone */}
                <a href="tel:+917337750923" className={`flex items-center gap-4 transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 shrink-0">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                  <span>+91 73377 50923</span>
                </a>

                {/* Email */}
                <a href="mailto:support@compliancebharo.in" className={`flex items-center gap-4 transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 shrink-0">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  <span>support@compliancebharo.in</span>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/917337750923" className={`flex items-center gap-4 transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 shrink-0">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 1.706.438 3.31 1.218 4.707L2.25 21.75l5.226-1.168c1.353.722 2.894 1.168 4.524 1.168 5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.846 13.682c-.22.62-1.272 1.196-1.745 1.25-.436.05-.986.138-3.13-.75-2.576-1.066-4.225-3.69-4.354-3.864-.13-.173-1.04-1.385-1.04-2.64 0-1.256.657-1.879.888-2.126.231-.247.502-.308.669-.308.167 0 .334.004.484.01.16.007.375-.062.585.441.22.525.706 1.725.772 1.856.066.13.11.282.026.447-.084.165-.128.267-.255.418-.128.15-.27.323-.383.454-.123.142-.255.297-.107.553.147.256.653 1.082 1.402 1.749.965.86 1.77 1.127 2.027 1.25.257.123.407.105.56-.07.153-.175.658-.767.834-1.03.176-.263.352-.22.585-.13.234.088 1.474.693 1.726.82.252.127.42.19.482.296.062.106.062.617-.158 1.238z" clipRule="evenodd" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Google Maps Button */}
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={`mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
                Find us on Google Maps
              </a>
            </div>
          </div>

         {/* NEW DISCLAIMER SECTION */}
         <div className="mt-16 pt-8 border-t border-slate-800/50">
            <p className={`text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              ComplianceBharo brand is under SUPEREVATECHNOLOGY private limited, CIN: U72900MP2022PTC061465, GSTIN: 23ABICS7881F1Z1
            </p>
            
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
               <p className="text-xs mb-4 leading-relaxed">
                 <span className="font-bold text-yellow-500">Disclaimer:</span> ComplianceBharo is a brand of SUPEREVATECHNOLOGY private limited, a company incorporated under the Ministry of Corporate Affairs (MCA). We are authorised to carry on the business of consulting, document preparation, accounting, bookkeeping, and facilitation services for company registrations and related government processes. We are <span className="font-bold">not affiliated with, endorsed by, or representing any government authority</span> in a regulatory or advisory capacity, including GSTN, the Income Tax Department, IP India, or Startup India, nor are we affiliated with any CA firm, CS firm, or law firm. We do not provide regulated legal, tax, accounting, or statutory compliance representation. All registrations, licences, approvals, and certificates are <span className="font-bold">issued solely by the respective government authorities</span>, which alone decide every application and timeline. Our charges are <span className="font-bold">professional facilitation fees</span>; any government or statutory fees are separate, charged at actuals, and payable to the relevant authority. You can also apply directly on the official government portals, where certain services are free.
               </p>
               <p className="text-xs leading-relaxed">
                 <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>Content Notice:</span> The information provided is for general informational purposes only and should not be considered as professional legal, tax, or financial advice. Laws, regulations, government fees, and procedures are subject to change. Readers are advised to verify all facts, figures, and regulatory requirements from official government sources or consult a qualified professional before making any business decisions.
               </p>
            </div>
            
            <p className={`text-xs mt-6 mb-8 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
               By continuing past this page, you agree to our <a href="#" className="underline hover:text-brand-orange">Terms of Service</a>, <a href="#" className="underline hover:text-brand-orange">Privacy Policy</a>, <a href="#" className="underline hover:text-brand-orange">Refund Policy</a> and <a href="#" className="underline hover:text-brand-orange">Disclaimer</a>.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                 © 2026 SUPEREVATECHNOLOGY private limited. All Rights Reserved.
              </p>
              
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                      <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
                      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                    </svg>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>MCA Documents</span>
                 </div>
              </div>
            </div>
            
         </div>

        </div>
    </footer>
  );
}
