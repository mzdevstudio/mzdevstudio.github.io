import React from 'react';
import { Modal } from './Modal';
import { ServiceItem } from '../types';
import { CheckCircle, Clock, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenContact }) => {
  const { lang } = useLanguage();

  if (!service) return null;

  return (
    <Modal
      open={!!service}
      onClose={onClose}
      labelledBy="service-modal-title"
    >
      {/* Modal Header */}
      <div className="space-y-2 pr-8">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
            {lang === 'pl' ? 'Szczegóły Usługi' : 'Service Details'}
          </span>
          {service.badge && (
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 text-xs font-medium">
              {service.badge}
            </span>
          )}
        </div>

        <h3 id="service-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          {service.title}
        </h3>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed">
        {service.detailedDescription}
      </p>

      {/* Key Deliverables */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
          {lang === 'pl' ? 'Co zawiera ten pakiet:' : 'Package deliverables:'}
        </h4>
        <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
          {(service.deliverables || []).map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time & Price Row */}
      <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
        <div>
          <span className="text-slate-400 block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            {lang === 'pl' ? 'Czas realizacji:' : 'Timeline:'}
          </span>
          <span className="text-slate-100 font-bold text-sm">{service.estimatedTime}</span>
        </div>
        <div>
          <span className="text-slate-400 block flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            {lang === 'pl' ? 'Wycena:' : 'Pricing:'}
          </span>
          <span className="text-blue-400 font-bold text-sm">{service.startingPrice}</span>
        </div>
      </div>

      {/* Modal Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="btn-3d-primary w-full sm:flex-1 py-3.5 px-6 text-xs font-semibold rounded-full flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span>
            {lang === 'pl'
              ? 'Zapytaj o ten projekt'
              : 'Inquire about this project'}
          </span>
        </button>

        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          {lang === 'pl' ? 'Zamknij' : 'Close'}
        </button>
      </div>
    </Modal>
  );
};
