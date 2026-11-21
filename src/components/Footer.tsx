import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Github, Zap } from 'lucide-react';
import { CONTACT_EMAIL } from '../lib/mailer';
import { useLanguage } from '../context/LanguageContext';
import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navColumns = [
    {
      title: t('footer.quickLinks'),
      links: [
        { label: t('nav.portfolio'), target: 'realizacje' },
        { label: t('nav.about'), target: 'o-mnie' },
        { label: t('nav.services'), target: 'oferta' },
        { label: t('nav.whyUs'), target: 'dlaczego-ja' },
        { label: t('nav.contact'), target: 'kontakt' },
      ],
    },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/MzdrowY', icon: <Github className="w-4 h-4" /> },
  ];

  return (
    <footer className="bg-[#02050F] text-slate-400 pt-14 pb-8 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Marka (goły monogram MZ bez obramowania) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <span className="font-display font-black text-lg text-white tracking-wider">MZDEVSTUDIO</span>
                <p className="text-[11px] text-slate-400">
                  {lang === 'pl' ? 'Autorskie strony internetowe & aplikacje webowe' : 'Custom websites & web applications'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t('footer.brandDesc')}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 border border-white/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nawigacja */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-4">
              {t('footer.quickLinks')}
            </h2>
            <ul className="space-y-2.5">
              {navColumns[0].links.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-xs text-slate-400 hover:text-blue-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-4">
              {t('footer.contactHeader')}
            </h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2.5 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{t('footer.location')}</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                <Zap className="w-3 h-3" />
                {t('footer.speedGuarantee')}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} MZDevStudio. {t('footer.rights')}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/polityka-prywatnosci" className="hover:text-white transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span>•</span>
            <Link to="/regulamin" className="hover:text-white transition-colors">
              {lang === 'pl' ? 'Regulamin' : 'Terms & Conditions'}
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
              title={lang === 'pl' ? 'Wróć na górę' : 'Scroll to top'}
              aria-label={lang === 'pl' ? 'Wróć na górę' : 'Scroll to top'}
            >
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
