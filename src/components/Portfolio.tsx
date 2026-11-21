import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { ExternalLink, Gauge, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioProject } from '../types';
import { SpotlightCard } from './fx/SpotlightCard';

interface PortfolioProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { lang, t } = useLanguage();

  const projectsList: PortfolioProject[] = Array.isArray(t('portfolio.projects')) ? t('portfolio.projects') : [];
  const filteredProjects =
    activeTab === 'all' ? projectsList : projectsList.filter((p) => p.category === activeTab);

  const categories = [
    { id: 'all', label: t('portfolio.categories.all') || (lang === 'pl' ? 'Wszystkie' : 'All') },
    { id: 'corporate', label: t('portfolio.categories.corporate') || (lang === 'pl' ? 'Strony firmowe' : 'Corporate') },
    { id: 'ecommerce', label: t('portfolio.categories.ecommerce') || (lang === 'pl' ? 'Sklepy E-Commerce' : 'E-Commerce') },
    { id: 'landing', label: t('portfolio.categories.landing') || (lang === 'pl' ? 'Landing Page' : 'Landing Pages') },
    { id: 'webapp', label: t('portfolio.categories.webapp') || (lang === 'pl' ? 'Serwisy i portale' : 'Web Portals') },
    { id: 'desktop', label: t('portfolio.categories.desktop') || (lang === 'pl' ? 'Aplikacje desktopowe' : 'Desktop Apps') },
  ].filter((cat) => cat.id === 'all' || projectsList.some((p) => p.category === cat.id));

  return (
    <section
      id="realizacje"
      className="py-16 sm:py-24 relative bg-[#070E21] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Nagłówek architektoniczny (wyrównany do lewej jak w Architekcie) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              {lang === 'pl' ? '01 / Dowody zamiast obietnic' : '01 / Proof over promises'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {t('portfolio.title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              {t('portfolio.subtitle')}
            </p>
          </div>

          {/* Filtry kategorii */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    isActive
                      ? 'pill-3d-active'
                      : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Siatka realizacji */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <m.article
                key={project.id}
                layout
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <SpotlightCard
                  accent={idx % 2 === 1 ? 'amber' : 'blue'}
                  className="group h-full bg-[#040814]/85 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl hover:-translate-y-1 transition-transform duration-300"
                >
                  {/* Podgląd strony */}
                  {project.previewImage ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-white/10">
                      <img
                        src={project.previewImage}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.035] transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040814]/60 via-transparent to-transparent" />
                    </div>
                  ) : null}

                  {/* Treść projektu */}
                  <div className="spotlight-static p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-white/5 text-blue-300 border border-white/10 text-[11px] font-mono font-medium">
                          {project.categoryLabel}
                        </span>

                        <div className="flex items-center gap-3">
                          {typeof project.lighthouseScore === 'number' ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-[11px] font-mono font-bold">
                              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                              {project.lighthouseScore}/100
                            </span>
                          ) : project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-[11px] font-mono font-bold transition-colors"
                            >
                              <ExternalLink className="w-3 h-3 text-emerald-400" />
                              <span>{project.liveLabel || 'Live'}</span>
                            </a>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            aria-label={
                              lang === 'pl'
                                ? `Zobacz szczegóły projektu ${project.title}`
                                : `View project details: ${project.title}`
                            }
                            className="flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-bold group-hover:translate-x-0.5 transition-transform cursor-pointer after:content-[''] after:absolute after:inset-0 after:z-[5] after:rounded-3xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-blue-400"
                          >
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{lang === 'pl' ? 'Szczegóły' : 'Details'}</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400 mb-2">
                          {lang === 'pl' ? 'Klient:' : 'Client:'} {project.client}
                        </p>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Metryki tabelaryczne */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left">
                        {(project.metrics || []).map((metric, i) => (
                          <div key={i}>
                            <div className="text-sm font-bold text-white font-mono tabular-nums">{metric.value}</div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tagi technologii */}
                      <div className="flex flex-wrap gap-1.5">
                        {(project.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
