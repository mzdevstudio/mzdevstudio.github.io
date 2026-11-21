import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface BrandBadge {
  name: string;
  glow: string;
  renderIcon: (suffix: number) => React.ReactNode;
}

const TECH_BRANDS: BrandBadge[] = [
  {
    name: 'HTML5',
    glow: 'rgba(227, 79, 38, 0.25)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" fill="#E34F26" />
        <path
          d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    glow: 'rgba(38, 77, 228, 0.28)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0" fill="#264DE4" />
        <path
          d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    glow: 'rgba(247, 223, 30, 0.26)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#F7DF1E" />
        <path
          d="M8.5 9v6.5a1.5 1.5 0 0 1 -1.5 1.5h-.5"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 9.5h-2a1 1 0 0 0 -1 1v1.2a1 1 0 0 0 1 1h1.2a1 1 0 0 1 1 1v1.3a1.5 1.5 0 0 1 -1.5 1.5h-1.7"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    glow: 'rgba(49, 120, 198, 0.3)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3.5" fill="#3178C6" />
        <path
          d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 12h4.5M9.75 12v6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'React',
    glow: 'rgba(97, 218, 251, 0.28)',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
        <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
        <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
        <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
        <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
        <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
        <circle cx="12" cy="12" r="1.4" fill="#61DAFB" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    glow: 'rgba(255, 255, 255, 0.2)',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F8FAFC"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
        <path d="M15 12v-3" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    glow: 'rgba(56, 189, 248, 0.28)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968m-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: 'Python',
    glow: 'rgba(255, 212, 59, 0.25)',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2" stroke="#4B8BBE" />
        <path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" stroke="#4B8BBE" />
        <path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" stroke="#FFD43B" />
        <path d="M8 15v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4" stroke="#FFD43B" />
        <circle cx="10.5" cy="5.8" r="0.9" fill="#4B8BBE" stroke="none" />
        <circle cx="13.5" cy="18.2" r="0.9" fill="#FFD43B" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    glow: 'rgba(95, 160, 78, 0.28)',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5FA04E"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" />
        <path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" stroke="#8CC84B" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    glow: 'rgba(168, 85, 247, 0.28)',
    renderIcon: (suffix: number) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <defs>
          <linearGradient id={`viteShield-${suffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
        <path d="M15 6.5l7 -1.5l-10 17l-10 -17l7.741 1.5z" fill={`url(#viteShield-${suffix})`} />
        <path d="M10 4.5l6 -1.5l-2 6.5l2 -.5l-4 7v-5l-3 1l1 -7.5z" fill="#FFD62E" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    glow: 'rgba(243, 128, 32, 0.3)',
    renderIcon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          d="M13.031 7.007c2.469 -.007 3.295 1.293 3.969 2.993c4 0 4.994 3.825 5 6h-20c-.001 -1.64 1.36 -2.954 3 -3c0 -1.5 1 -3 3 -3c.66 -1.942 2.562 -2.986 5.031 -2.993"
          fill="rgba(243, 128, 32, 0.2)"
          stroke="#F38020"
        />
        <path d="M12 13h6M17 10l-2.5 6" stroke="#FAAD3F" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    glow: 'rgba(248, 250, 252, 0.22)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#F8FAFC" className="w-5 h-5" aria-hidden="true">
        <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
      </svg>
    ),
  },
];

export const TechMarquee: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="relative border-y border-white/10 bg-[#060C1D]/95 backdrop-blur-md py-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400/95 whitespace-nowrap flex-shrink-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
          {lang === 'pl' ? 'JĘZYKI I TECHNOLOGIE' : 'LANGUAGES & STACK'}
        </span>

        <div className="marquee-wrapper relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="marquee-track items-center gap-3.5 py-0.5">
            {[0, 1].map((dupIdx) => (
              <div key={dupIdx} className="flex items-center gap-3.5 pr-3.5" aria-hidden={dupIdx === 1}>
                {TECH_BRANDS.map((brand) => (
                  <div
                    key={`${dupIdx}-${brand.name}`}
                    style={{ '--brand-glow': brand.glow } as React.CSSProperties}
                    className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.035] border border-white/10 hover:border-white/25 hover:bg-white/[0.075] hover:shadow-[0_0_20px_var(--brand-glow)] transition-all duration-200 whitespace-nowrap"
                  >
                    <span className="flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {brand.renderIcon(dupIdx)}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
