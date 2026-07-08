'use client';

import React, { useRef, useState } from 'react';

const REVIEWS: { name: string; role: string; text: string; avatar: string; avatarBg?: string; image?: string }[] = [
  {
    name: "Priya Sharma",
    role: "Founder",
    text: "The team at Compliance Bharo made our company registration a breeze. Their experts guided us through every step of the process with extreme clarity and professionalism. Highly recommended!",
    avatar: "P",
    avatarBg: "bg-purple-500",
  },
  {
    name: "Rohan Gupta",
    role: "CEO",
    text: "Managing our annual filings and tax compliance used to be a nightmare. Since we switched to their services, everything is automated, accurate, and always on time. It gives us peace of mind.",
    avatar: "R",
    avatarBg: "bg-indigo-500"
  },
  {
    name: "Anjali Desai",
    role: "Director",
    text: "Getting our trademark registered was smooth and transparent. They handled all the paperwork efficiently. The regular updates kept us in the loop throughout the entire process.",
    avatar: "A",
    avatarBg: "bg-emerald-500"
  },
  {
    name: "Vikram Singh",
    role: "Startup Founder",
    text: "Outstanding support for GST registration and filing. Their team is extremely knowledgeable and always available to answer any compliance-related queries we have.",
    avatar: "V",
    avatarBg: "bg-blue-500"
  },
  {
    name: "Megha Patel",
    role: "E-commerce Entrepreneur",
    text: "The ISO certification process was incredibly fast thanks to their streamlined approach. I appreciate their dedication and prompt responses to all our queries.",
    avatar: "M",
    avatarBg: "bg-rose-500"
  }
];

export default function ClientReviews({ isDarkMode }: { isDarkMode: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards.length > 0 && cards[index]) {
        const card = cards[index] as HTMLElement;
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(activeIndex + 1, REVIEWS.length - 1);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(activeIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      
      let minDiff = Infinity;
      let newActiveIndex = 0;
      
      Array.from(container.children).forEach((child, index) => {
        const childElement = child as HTMLElement;
        const diff = Math.abs((childElement.offsetLeft - container.offsetLeft) - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          newActiveIndex = index;
        }
      });
      
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  return (
    <section className={`py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950' : 'bg-white'
    }`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/><path d="M6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z"/></svg>
            CLIENT REVIEWS
          </h2>
          <p className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Loved by Entrepreneurs Across India
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.5181H37.4438C36.8369 31.8636 34.9124 34.9196 32.2596 36.7608V42.5076H39.8732C44.3315 38.3129 47.532 32.062 47.532 24.5528Z" fill="#4285F4"/>
              <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.0388 42.5076L32.2596 36.7608C30.123 38.2573 27.5029 39.0664 24.48 39.0664C18.6653 39.0664 13.7226 35.1633 11.9082 29.8396H3.97217V35.9774C7.86877 43.6874 15.6558 48.0016 24.48 48.0016Z" fill="#34A853"/>
              <path d="M11.9082 29.8396C11.4117 28.3752 11.1444 26.8344 11.1444 25.2638C11.1444 23.6931 11.4117 22.1523 11.9082 20.688V14.5502H3.97217C2.31011 17.8427 1.39343 21.464 1.39343 25.2638C1.39343 29.0636 2.31011 32.6849 3.97217 35.9774L11.9082 29.8396Z" fill="#FBBC05"/>
              <path d="M24.48 11.461C27.9734 11.461 31.1462 12.6517 33.6496 15.0006L40.2316 8.41857C36.3861 4.88701 30.9274 2.52594 24.48 2.52594C15.6558 2.52594 7.86877 6.84013 3.97217 14.5502L11.9082 20.688C13.7226 15.3643 18.6653 11.461 24.48 11.461Z" fill="#EA4335"/>
            </svg>
            <div className="flex text-amber-500">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
              {/* Half star for 4.9 */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4.9</span> out of 5 with <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>521+</span> verified reviews
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx} 
                className={`snap-start shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] flex flex-col justify-between p-8 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.5181H37.4438C36.8369 31.8636 34.9124 34.9196 32.2596 36.7608V42.5076H39.8732C44.3315 38.3129 47.532 32.062 47.532 24.5528Z" fill="#4285F4"/>
                      <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.0388 42.5076L32.2596 36.7608C30.123 38.2573 27.5029 39.0664 24.48 39.0664C18.6653 39.0664 13.7226 35.1633 11.9082 29.8396H3.97217V35.9774C7.86877 43.6874 15.6558 48.0016 24.48 48.0016Z" fill="#34A853"/>
                      <path d="M11.9082 29.8396C11.4117 28.3752 11.1444 26.8344 11.1444 25.2638C11.1444 23.6931 11.4117 22.1523 11.9082 20.688V14.5502H3.97217C2.31011 17.8427 1.39343 21.464 1.39343 25.2638C1.39343 29.0636 2.31011 32.6849 3.97217 35.9774L11.9082 29.8396Z" fill="#FBBC05"/>
                      <path d="M24.48 11.461C27.9734 11.461 31.1462 12.6517 33.6496 15.0006L40.2316 8.41857C36.3861 4.88701 30.9274 2.52594 24.48 2.52594C15.6558 2.52594 7.86877 6.84013 3.97217 14.5502L11.9082 20.688C13.7226 15.3643 18.6653 11.461 24.48 11.461Z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <p className={`italic text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    "{review.text}"
                  </p>
                </div>
                <div className={`pt-6 border-t transition-colors duration-300 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} flex items-center gap-4`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 overflow-hidden ${
                    review.image ? '' : (review.avatarBg || 'bg-brand-orange text-white')
                  }`}>
                    {review.image ? (
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white">{review.avatar}</span>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{review.name}</h4>
                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `}} />
        </div>
        
        {/* Navigation */}
        <div className="mt-10 flex justify-center gap-2 items-center">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-8 bg-brand-orange' 
                  : `w-4 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'}`
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          
          <div className="flex gap-2 ml-4">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                activeIndex === 0 
                  ? (isDarkMode ? 'border-slate-800 text-slate-600 opacity-50' : 'border-slate-200 text-slate-300 opacity-50')
                  : (isDarkMode ? 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50')
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={handleNext}
              disabled={activeIndex >= REVIEWS.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                activeIndex >= REVIEWS.length - 1
                  ? (isDarkMode ? 'border-slate-800 text-slate-600 opacity-50' : 'border-slate-200 text-slate-300 opacity-50')
                  : (isDarkMode ? 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50')
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
