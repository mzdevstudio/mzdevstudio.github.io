import React, { useRef } from 'react';
import { useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';
import { ArrowRight, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './fx/MagneticButton';

interface HeroProps {
  onOpenContact: () => void;
  onScrollToPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onScrollToPortfolio }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const { lang, t } = useLanguage();
  const shouldReduce = useReducedMotion();

  const { scrollY } = useScroll();
  const bgScrollY = useTransform(scrollY, [0, 800], [0, 72]);

  // Delikatna paralaksa głębi podążająca za kursorem
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    el.style.setProperty('--hero-mx', `${rx}px`);
    el.style.setProperty('--hero-my', `${ry}px`);

    if (!shouldReduce && e.pointerType === 'mouse') {
      const nx = (rx / rect.width - 0.5) * -14;
      const ny = (ry / rect.height - 0.5) * -10;
      pointerX.set(nx);
      pointerY.set(ny);
    }
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[88vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-[#040814]"
    >
      {/* Pełnoszerokościowa panorama pracowni (Wariant 3) z subtelną paralaksą */}
      <m.div
        aria-hidden="true"
        style={{
          y: shouldReduce ? 0 : bgScrollY,
          x: shouldReduce ? 0 : smoothX,
          translateY: shouldReduce ? 0 : smoothY,
        }}
        className="pointer-events-none absolute -inset-3 z-0"
      >
        <img
          src={`${import.meta.env.BASE_URL}hero-panorama.webp`}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[74%_20%] lg:object-[right_18%] scale-[1.02] select-none brightness-[1.05] contrast-[1.07] saturate-[1.08]"
        />
      </m.div>

      {/* Czytelność tekstu wyłącznie pod lewą strefą (prawa połowa w 100% wyraźna bez zasłony) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#040814]/55 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(4,8,20,0.85) 0%, rgba(4,8,20,0.52) 34%, rgba(4,8,20,0.06) 50%, transparent 58%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to top, #040814 0%, rgba(4,8,20,0.45) 10%, transparent 22%), linear-gradient(to bottom, rgba(4,8,20,0.38) 0%, transparent 10%)',
        }}
      />

      {/* Subtelna poświata świetlna podążająca za kursorem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(620px circle at var(--hero-mx, 68%) var(--hero-my, 45%), rgba(59, 130, 246, 0.08), rgba(245, 158, 11, 0.04) 40%, transparent 72%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-[580px] space-y-6 text-center lg:text-left mx-auto lg:mx-0">
          {/* Pigułka dostępności */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/35 text-amber-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em]">
              {lang === 'pl' ? 'Wolne terminy na nowe projekty' : t('hero.availability')}
            </span>
          </div>

          {/* Główny nagłówek */}
          <h1
            className="font-display font-black text-4xl sm:text-5xl xl:text-[56px] text-white tracking-[-0.03em] leading-[1.06] drop-shadow-[0_4px_24px_rgba(4,8,20,0.85)]"
          >
            {lang === 'pl' ? (
              <>
                Strony i aplikacje, które{' '}
                <span className="text-amber-400">pracują</span> na Twój{' '}
                <span className="inline-block pr-[0.12em] -mr-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-sky-200">
                  biznes.
                </span>
              </>
            ) : (
              <>
                Websites &amp; apps built to{' '}
                <span className="text-amber-400">power</span> your{' '}
                <span className="inline-block pr-[0.12em] -mr-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-sky-200">
                  business.
                </span>
              </>
            )}
          </h1>

          {/* Lead */}
          <p
            className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-lg mx-auto lg:mx-0 drop-shadow-[0_2px_12px_rgba(4,8,20,0.9)]"
          >
            {t('hero.tagline')}
          </p>

          {/* Pasek 1-na-1 */}
          <div
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#040814]/70 border border-white/15 backdrop-blur-md text-left"
          >
            <span className="w-8 h-8 rounded-full bg-blue-600/25 border border-amber-400/50 flex items-center justify-center text-blue-300 flex-shrink-0">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-xs sm:text-[13px] text-slate-200">
              {lang === 'pl' ? (
                <>
                  Rozmawiasz bezpośrednio z <strong className="text-white">autorem kodu</strong> — od szkicu po wdrożenie.
                </>
              ) : (
                <>
                  Direct work with the <strong className="text-white">developer</strong> — from sketch to launch.
                </>
              )}
            </span>
          </div>

          {/* Przyciski CTA */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1"
          >
            <MagneticButton>
              <button
                onClick={onOpenContact}
                id="hero-contact-btn"
                className="btn-3d-primary px-7 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 group"
              >
                <span>{lang === 'pl' ? 'Wyceń projekt' : t('hero.ctaPrimary')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <button
              onClick={onScrollToPortfolio}
              id="hero-portfolio-btn"
              className="btn-3d-ghost px-7 py-3.5 rounded-full text-sm font-semibold backdrop-blur-md flex items-center gap-2 group"
            >
              <span>{t('hero.ctaSecondary')}</span>
              <span className="font-mono text-xs text-blue-400 group-hover:translate-x-0.5 transition-transform">&lt;/&gt;</span>
            </button>
          </div>

          {/* Statystyki zaufania */}
          <div
            className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white tabular-nums">100%</div>
              <div className="text-[11px] sm:text-xs text-slate-300">
                {lang === 'pl' ? 'Autorski kod od zera' : 'Custom code from scratch'}
              </div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-amber-400 tabular-nums">
                {lang === 'pl' ? '5–14 dni' : '5–14 days'}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300">
                {lang === 'pl' ? 'Typowy czas realizacji' : 'Typical delivery'}
              </div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-blue-400 tabular-nums">&lt; 24h</div>
              <div className="text-[11px] sm:text-xs text-slate-300">
                {lang === 'pl' ? 'Bezpośrednia odpowiedź' : 'Direct reply'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
