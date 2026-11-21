import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { Plus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FAQItem } from '../types';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { lang, t } = useLanguage();

  const faqList: FAQItem[] = Array.isArray(t('faq.items')) ? t('faq.items') : [];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative bg-[#070E21] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Lewa kolumna z tytułem */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              {lang === 'pl' ? '05 / Najczęstsze pytania' : '05 / Questions'}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'pl' ? (
                <>
                  Masz{' '}
                  <span className="inline-block pr-[0.1em] -mr-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                    pytania?
                  </span>
                </>
              ) : (
                <>
                  Got{' '}
                  <span className="inline-block pr-[0.1em] -mr-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                    Questions?
                  </span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {lang === 'pl'
                ? 'Krótko o czasie realizacji, kosztach, domenie oraz zmianach po starcie projektu.'
                : 'Quick answers on timelines, domain setup, pricing, and post-launch changes.'}
            </p>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-400 hover:text-amber-300 transition-colors pt-2"
            >
              <span>{lang === 'pl' ? 'Zadaj własne pytanie' : 'Ask your own question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Prawa kolumna: akordeon bez zbędnych ozdobników */}
          <div className="lg:col-span-8 space-y-3">
            {faqList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;
              const num = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'bg-[#040814]/90 border-blue-500/35'
                      : 'bg-[#040814]/55 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    id={buttonId}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full p-5 sm:px-6 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isOpen ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        {num}
                      </span>
                      <span className="font-display text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </span>
                    </div>

                    <Plus
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-amber-400' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 pl-12 sm:pl-14 text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
