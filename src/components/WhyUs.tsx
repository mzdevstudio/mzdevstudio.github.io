import React from 'react';
import * as m from 'motion/react-m';
import { useLanguage } from '../context/LanguageContext';
import { BenefitItem } from '../types';
import { SpotlightCard } from './fx/SpotlightCard';

export const WhyUs: React.FC = () => {
  const { lang, t } = useLanguage();
  const benefits: BenefitItem[] = Array.isArray(t('whyUs.benefits')) ? t('whyUs.benefits') : [];

  return (
    <section
      id="dlaczego-ja"
      className="py-16 sm:py-24 relative bg-[#040814] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Lewa kolumna przyklejona na desktopie + wykres porównania szybkości */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                {lang === 'pl' ? '04 / Standard wykonania' : '04 / Engineering Standard'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.08]">
                {lang === 'pl'
                  ? 'Dlaczego autorski kod wygrywa z szablonem?'
                  : 'Why custom code beats bloated templates'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {lang === 'pl'
                  ? 'Zamiast kolejnej siatki pudełek — zwięzła lista tego, co realnie zyskujesz na wydajności i obsłudze.'
                  : t('whyUs.subtitle')}
              </p>
            </div>

            {/* Porównanie szybkości i czystości kodu */}
            <SpotlightCard
              accent="blue"
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-4"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <span>{lang === 'pl' ? 'Czas startu (LCP)' : 'Load Benchmark (LCP)'}</span>
                  <span className="text-amber-400 font-bold">Core Web Vitals</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">MZDevStudio (React / Next.js)</span>
                    <span className="font-mono font-bold text-blue-400 tabular-nums">&lt; 0.8s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <m.div
                      initial={{ width: '94%' }}
                      whileInView={{ width: '94%' }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {lang === 'pl' ? 'Gotowy szablon + 30 wtyczek' : 'Generic theme + 30 plugins'}
                    </span>
                    <span className="font-mono text-slate-400 tabular-nums">~ 3.4s</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <m.div
                      initial={{ width: '42%' }}
                      whileInView={{ width: '42%' }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="h-full rounded-full bg-slate-600"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-white/10">
                  {lang === 'pl'
                    ? 'Wartości poglądowe dla typowego wdrożenia na łączu 4G — wynik zależy od zakresu projektu i hostingu.'
                    : 'Illustrative benchmark for a typical 4G load — actual speed depends on project scope and hosting.'}
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Prawa kolumna: precyzyjna numerowana lista */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {benefits.map((benefit, idx) => {
              const itemNumber = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={benefit.id}
                  className="group py-5 sm:py-6 grid grid-cols-[44px_1fr_auto] items-baseline gap-4 hover:bg-white/[0.02] px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl transition-colors"
                >
                  <span className="font-mono text-sm font-bold text-blue-400 tabular-nums group-hover:text-amber-400 transition-colors">
                    {itemNumber}
                  </span>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {benefit.metric && (
                    <span className="hidden sm:inline-block font-mono text-[11px] font-semibold text-amber-400/90 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 whitespace-nowrap">
                      {benefit.metric}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
