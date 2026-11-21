import React from 'react';
import {
  Globe,
  Zap,
  ShoppingBag,
  RefreshCw,
  ShieldCheck,
  Gauge,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceItem } from '../types';
import { SpotlightCard } from './fx/SpotlightCard';
import { MagneticButton } from './fx/MagneticButton';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Zap,
  ShoppingBag,
  RefreshCw,
  ShieldCheck,
  Gauge,
};

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenContact }) => {
  const { lang, t } = useLanguage();
  const servicesList: ServiceItem[] = Array.isArray(t('services.items')) ? t('services.items') : [];

  return (
    <section id="oferta" className="py-16 sm:py-24 relative bg-[#070E21] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Nagłówek sekcji */}
        <div className="max-w-2xl space-y-3 mb-12">
          <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            {lang === 'pl' ? '03 / Oferta' : '03 / Services'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {lang === 'pl' ? 'Czym mogę się zająć?' : 'How can I help?'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">{t('services.headerDesc')}</p>
        </div>

        {/* Siatka Bento 6-kolumnowa: 4+2 / 2+2+2 / 2+4 (zero pustych dziur) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {servicesList.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            const isLead = index === 0;
            const colSpanClass = isLead ? 'md:col-span-2 lg:col-span-4' : 'lg:col-span-2';

            return (
              <div key={service.id} className={colSpanClass}>
                <SpotlightCard
                  accent={isLead ? 'amber' : 'blue'}
                  onClick={() => onSelectService(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectService(service);
                    }
                  }}
                  id={`service-card-${service.id}`}
                  className={`group h-full rounded-3xl p-6 sm:p-7 cursor-pointer border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                    isLead
                      ? 'bg-gradient-to-br from-blue-600/15 via-[#040814]/90 to-[#040814]/95 border-blue-500/35 shadow-2xl'
                      : 'bg-[#040814]/85 border-white/10 hover:border-blue-500/40 shadow-xl'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5 gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isLead
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                        } group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {service.badge && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[11px] font-mono font-bold">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-display font-extrabold text-white group-hover:text-blue-300 transition-colors mb-2.5 ${
                        isLead ? 'text-2xl sm:text-3xl' : 'text-xl'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
                      {service.description}
                    </p>

                    <ul className={`mb-6 ${isLead ? 'grid sm:grid-cols-2 gap-2' : 'space-y-1.5'}`}>
                      {(service.features || []).slice(0, isLead ? 4 : 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">
                        {t('services.estimatedTimeLabel')}
                      </span>
                      <span className="text-slate-100 font-bold tabular-nums">{service.estimatedTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-400 group-hover:text-white font-bold group-hover:translate-x-1 transition-all">
                      <span>{t('services.detailsBtn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}

          {/* Kafelek wyceny niestandardowej uzupełniający siatkę 2 + 4 = 6 */}
          <div className="md:col-span-2 lg:col-span-4">
            <SpotlightCard
              accent="amber"
              className="h-full rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#040814]/90 via-blue-950/20 to-amber-950/15 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="relative z-10 space-y-2 max-w-xl">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 block">
                  {lang === 'pl' ? 'PROJEKT DEDYKOWANY' : 'CUSTOM ARCHITECTURE'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                  {lang === 'pl' ? 'Potrzebujesz niestandardowego rozwiązania?' : 'Need a custom web solution?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'pl'
                    ? 'Opisz swój pomysł w formularzu kontaktowym lub napisz bezpośrednio — dostaniesz konkretny plan i wycenę.'
                    : 'Describe your requirements in the contact form or write directly — you will get a clear scope and estimate.'}
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <MagneticButton>
                  <button
                    onClick={onOpenContact}
                    id="services-custom-quote-btn"
                    className="btn-3d-primary px-7 py-3.5 text-xs sm:text-sm font-bold rounded-full flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>{lang === 'pl' ? 'Skontaktuj się' : 'Contact Me'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
