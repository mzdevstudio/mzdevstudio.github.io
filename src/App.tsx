import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MotionConfig, LazyMotion } from 'motion/react';

const loadFeatures = () => import('./lib/motionFeatures').then((res) => res.default);
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SEO } from './components/SEO';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/fx/TechMarquee';
import { ScrollProgressBar } from './components/fx/ScrollProgressBar';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { LegalPage } from './components/LegalPage';
import { ServiceItem, PortfolioProject } from './types';

/* Sekcje w dolnej części strony ładujemy leniwie (mniejszy początkowy bundle). */
const WhyUs = lazy(() => import('./components/WhyUs').then((m) => ({ default: m.WhyUs })));
const TestimonialsFAQ = lazy(() => import('./components/TestimonialsFAQ').then((m) => ({ default: m.TestimonialsFAQ })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[32vh] flex items-center justify-center bg-[#040814]" aria-hidden="true">
          <div className="w-7 h-7 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

/* Przy zmianie trasy przewiń na górę; jeśli trasa ma kotwicę (np. /#oferta), przewiń do sekcji. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };
      if (tryScroll()) return;
      let attempts = 0;
      const interval = window.setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts > 20) {
          window.clearInterval(interval);
        }
      }, 100);
      return () => window.clearInterval(interval);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    scrollToSection('kontakt');
  };

  return (
    <>
      <ScrollManager />
      <ScrollProgressBar />

      <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col font-sans overflow-x-clip selection:bg-blue-500/30 selection:text-blue-200">
        {/* Skip-link dla dostępności — pojawia się po naciściu Tab */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-blue-600 focus:text-white focus:text-xs focus:font-bold"
        >
          {lang === 'pl' ? 'Przejdź do treści' : 'Skip to content'}
        </a>

        <SEO />

        {/* Fixed Sticky Header */}
        <Header onOpenContact={handleOpenContact} />

        <Routes>
          <Route
            path="/"
            element={
              <main id="main-content" className="flex-grow">
                <Hero
                  onOpenContact={handleOpenContact}
                  onScrollToPortfolio={() => scrollToSection('realizacje')}
                />
                <TechMarquee />
                <Portfolio
                  onSelectProject={(project) => setSelectedProject(project)}
                />
                <About />
                <Services
                  onSelectService={(service) => setSelectedService(service)}
                  onOpenContact={handleOpenContact}
                />
                <LazySection>
                  <WhyUs />
                </LazySection>
                <LazySection>
                  <TestimonialsFAQ />
                </LazySection>
                <LazySection>
                  <Contact />
                </LazySection>
              </main>
            }
          />

          <Route path="/polityka-prywatnosci" element={<LegalPage page="privacy" />} />
          <Route path="/regulamin" element={<LegalPage page="terms" />} />
          <Route path="*" element={<LegalPage page="notfound" />} />
        </Routes>

        <Footer />

        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenContact={handleOpenContact}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenContact={handleOpenContact}
        />
      </div>
    </>
  );
}

export default function App() {
  const routerBase = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <LanguageProvider>
          <BrowserRouter basename={routerBase}>
            <AppContent />
          </BrowserRouter>
        </LanguageProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
