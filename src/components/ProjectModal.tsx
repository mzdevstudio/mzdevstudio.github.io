import React from 'react';
import { Modal } from './Modal';
import { PortfolioProject } from '../types';
import { Gauge, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  const { lang } = useLanguage();
  if (!project) return null;

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      labelledBy="project-modal-title"
      maxWidthClass="max-w-3xl"
    >
      {/* Modal Header */}
      <div className="space-y-2 pr-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
            {project.categoryLabel}
          </span>
          {typeof project.lighthouseScore === 'number' && (
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" /> PageSpeed: {project.lighthouseScore}/100
            </span>
          )}
        </div>

        <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-slate-400">
          {lang === 'pl' ? 'Klient:' : 'Client:'} {project.client}
        </p>
      </div>

      {/* Preview Screenshot if available */}
      {project.previewImage && (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
          <img
            src={project.previewImage}
            alt={project.title}
            className="w-full h-auto aspect-[16/10] object-cover object-top"
          />
        </div>
      )}

      {/* Long Description */}
      <p className="text-slate-300 text-sm leading-relaxed">
        {project.longDescription}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
        {(project.metrics || []).map((m, i) => (
          <div key={i}>
            <div className="text-lg font-bold text-blue-400 font-mono">{m.value}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-tight">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase font-mono">
          {lang === 'pl' ? 'Użyte Technologie:' : 'Technologies Used:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{lang === 'pl' ? 'Otwórz stronę na żywo' : 'Visit Live Site'}</span>
          </a>
        )}

        <button
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="btn-3d-primary w-full sm:flex-1 py-3.5 px-6 text-xs font-semibold rounded-full flex items-center justify-center gap-2"
        >
          <span>{lang === 'pl' ? 'Chcę podobną stronę lub aplikację' : 'I want a similar website or app'}</span>
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
