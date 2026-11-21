import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Send, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BrandMark } from './BrandMark';
import { MagneticButton } from './fx/MagneticButton';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;

      const sections = ['hero', 'realizacje', 'o-mnie', 'oferta', 'dlaczego-ja', 'faq', 'kontakt'];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.portfolio'), href: '#realizacje' },
    { name: t('nav.about'), href: '#o-mnie' },
    { name: t('nav.services'), href: '#oferta' },
    { name: t('nav.whyUs'), href: '#dlaczego-ja' },
    { name: t('nav.contact'), href: '#kontakt' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#040814]/88 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_12px_40px_rgba(2,6,23,0.75)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo (goły monogram MZ bez obramowania) */}
        <a
          href={baseUrl}
          onClick={(e) => {
            e.preventDefault();
            handleLogoClick();
          }}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          id="header-logo-link"
        >
          <BrandMark className="w-8 h-8 sm:w-9 sm:h-9 text-white group-hover:scale-105 transition-transform duration-300 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
              <span>MZDev<span className="text-blue-400">Studio</span></span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-slate-400 font-medium whitespace-nowrap">
              Digital Craftsmanship
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md"
          id="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === '/' && activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={`${baseUrl}${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3.5 xl:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 relative whitespace-nowrap ${
                  isActive ? 'text-white font-bold' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <m.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-400/40 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="flex items-center rounded-full bg-white/[0.04] p-1 border border-white/10 backdrop-blur-md"
            id="language-switcher"
          >
            <button
              type="button"
              onClick={() => setLang('pl')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all border ${
                lang === 'pl'
                  ? 'pill-3d-active'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
              title="Przełącz na Polski"
              id="lang-pl-btn"
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all border ${
                lang === 'en'
                  ? 'pill-3d-active'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
              title="Switch to English"
              id="lang-en-btn"
            >
              EN
            </button>
          </div>

          <div className="hidden sm:inline-block">
            <MagneticButton>
              <button
                onClick={onOpenContact}
                className="btn-3d-primary flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold rounded-full items-center gap-1.5 whitespace-nowrap group"
                id="header-contact-btn"
              >
                <span>{t('nav.getInTouch')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#040814]/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden"
            id="mobile-drawer"
          >
            <div className="px-5 py-6 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Język / Language:</span>
                </span>
                <div className="flex items-center rounded-full bg-white/10 p-1 border border-white/10">
                  <button
                    onClick={() => setLang('pl')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      lang === 'pl' ? 'pill-3d-active' : 'border-transparent text-slate-300'
                    }`}
                  >
                    PL
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      lang === 'en' ? 'pill-3d-active' : 'border-transparent text-slate-300'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`${baseUrl}${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-blue-400 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="btn-3d-primary w-full py-3 px-4 text-xs font-bold rounded-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('nav.getInTouch')}</span>
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};
