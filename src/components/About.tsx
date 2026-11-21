import React, { useState } from 'react';
import { Check, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SpotlightCard } from './fx/SpotlightCard';

const PROCESS_STEPS = {
  pl: [
    {
      num: '01',
      title: 'Rozmowa i wycena',
      desc: 'Ustalamy cel strony, zakres, termin i koszt bez ukrytych dopłat.',
    },
    {
      num: '02',
      title: 'Makieta i kierunek',
      desc: 'Widzisz projekt wizualny i układ treści przed kodowaniem całości.',
    },
    {
      num: '03',
      title: 'Autorski kod',
      desc: 'Buduję stronę w React/Next.js, testuję na telefonach i sprawdzam SEO.',
    },
    {
      num: '04',
      title: 'Start i wsparcie',
      desc: 'Podpinam domenę, SSL, szybką chmurę oraz pomagam po uruchomieniu.',
    },
  ],
  en: [
    {
      num: '01',
      title: 'Scope & Quote',
      desc: 'We align on business goals, timeline, and clear upfront pricing.',
    },
    {
      num: '02',
      title: 'Direction & Layout',
      desc: 'You review visual direction and structure before full implementation.',
    },
    {
      num: '03',
      title: 'Custom Engineering',
      desc: 'Built in React/Next.js, tested on real mobile screens and SEO-checked.',
    },
    {
      num: '04',
      title: 'Launch & Care',
      desc: 'Domain, SSL, edge cloud setup, and responsive support after go-live.',
    },
  ],
};

export const About: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = PROCESS_STEPS[lang];
  const benefits =
    lang === 'pl'
      ? [
          'Bez gotowych szablonów i pośredników',
          'Dopasowanie do telefonów i komputerów',
          'Techniczne SEO i szybki hosting',
          'Pełne prawa i kod po zakończeniu',
        ]
      : [
          'No bloated templates or middlemen',
          'Responsive across mobile and desktop',
          'Technical SEO & fast hosting setup',
          'Full code and rights ownership',
        ];

  return (
    <section id="o-mnie" className="py-16 sm:py-24 relative bg-[#040814] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14 sm:space-y-20">
        {/* Główny podział O mnie: zdjęcie pracowni + manifesto */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Karta standardu współpracy MZDevStudio */}
          <div className="lg:col-span-5">
            <SpotlightCard
              accent="amber"
              className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-display text-xl font-extrabold text-white">MZDevStudio</div>
                      <div className="font-mono text-xs text-amber-400">
                        {lang === 'pl' ? 'Autorski kod · Polska & zdalnie' : 'Custom Code · Poland & Remote'}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    1-na-1
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(lang === 'pl'
                    ? [
                        { code: '01', label: 'Własność', val: '100% kodu i praw po Twojej stronie' },
                        { code: '02', label: 'Kontakt', val: 'Bezpośrednio z autorem kodu (< 24h)' },
                        { code: '03', label: 'Wdrożenie', val: 'Domena, SSL, SEO i szybki hosting' },
                      ]
                    : [
                        { code: '01', label: 'Ownership', val: '100% of source code and rights yours' },
                        { code: '02', label: 'Contact', val: 'Direct communication with developer (< 24h)' },
                        { code: '03', label: 'Launch', val: 'Domain, SSL, SEO & edge cloud hosting' },
                      ]
                  ).map((row) => (
                    <div
                      key={row.code}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#040814]/85 border border-white/10"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] font-bold text-amber-400 tabular-nums">{row.code}</span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{row.label}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-100 text-right">{row.val}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-2xl bg-[#040814]/80 border border-white/10">
                  {lang === 'pl'
                    ? 'Bezpośredni kontakt z osobą piszącą każdą linijkę kodu — przejrzysty zakres, stały podgląd postępów i wdrożenie pod klucz.'
                    : 'Direct communication with the person writing every line of code — clear scope, live previews, and turnkey deployment.'}
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Prawa kolumna: Cytat + 4 zalety */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                {lang === 'pl' ? '02 / Bezpośrednia współpraca' : '02 / Direct Collaboration'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.08]">
                {lang === 'pl'
                  ? 'Jeden wykonawca od projektu po domenę'
                  : 'One engineer from first sketch to domain'}
              </h2>
            </div>

            <blockquote className="font-display text-xl sm:text-2xl font-bold text-slate-100 leading-snug border-l-4 border-amber-400 pl-5 py-1">
              {lang === 'pl' ? '„' : '“'}
              {t('about.quote')}
              {lang === 'pl' ? '”' : '”'}
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interaktywna ścieżka procesu 4-etapowego */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                {lang === 'pl' ? 'JAK WYGLĄDA WSPÓŁPRACA' : 'HOW I WORK'}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {lang === 'pl' ? 'Przejrzysty proces w czterech krokach' : 'Clear four-step delivery'}
              </h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <SpotlightCard
                  key={step.num}
                  accent={isActive ? 'amber' : 'blue'}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                  className={`rounded-2xl p-5 cursor-pointer border transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.06] border-amber-400/40 shadow-[0_12px_36px_rgba(245,158,11,0.08)]'
                      : 'bg-white/[0.025] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative z-10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-2xl font-extrabold tabular-nums transition-colors ${
                          isActive ? 'text-amber-400' : 'text-blue-400/80'
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`h-1.5 w-8 rounded-full transition-colors ${
                          isActive ? 'bg-amber-400' : 'bg-white/10'
                        }`}
                      />
                    </div>
                    <h4 className="font-display text-base font-extrabold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
