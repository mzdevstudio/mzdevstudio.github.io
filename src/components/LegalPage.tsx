import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ScrollText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_EMAIL } from '../lib/mailer';

interface LegalPageProps {
  page: 'privacy' | 'terms' | 'notfound';
}

const CONTENT = {
  privacy: {
    pl: {
      badge: 'Polityka Prywatności',
      title: 'Polityka Prywatności & RODO',
      updated: 'Ostatnia aktualizacja: listopad 2026',
      intro:
        'Niniejsza polityka prywatności opisuje zasady przetwarzania danych osobowych w ramach serwisu MZDevStudio („Administrator”). Dbam o Twoją prywatność i przetwarzam dane wyłącznie w zakresie niezbędnym do kontaktu i realizacji usług.',
      sections: [
        {
          h: '1. Administrator danych',
          p: `Administratorem danych osobowych jest MZDevStudio, Polska. Kontakt: ${CONTACT_EMAIL}.`,
        },
        {
          h: '2. Jakie dane zbieram',
          p: 'Formularz kontaktowy: imię i nazwisko (opcjonalnie), adres e-mail, temat i kategoria projektu oraz treść wiadomości. Nie stosuję plików cookies do śledzenia ani profilowania reklamowego.',
        },
        {
          h: '3. Cele przetwarzania',
          p: 'Odpowiedź na zapytania, przygotowanie wycen, realizacja i rozliczenie usług, komunikacja handlowa za zgodą oraz wypełnienie obowiązków prawnych.',
        },
        {
          h: '4. Podstawa prawna',
          p: 'Art. 6 ust. 1 lit. a, b i f RODO — zgoda, umowa oraz prawnie uzasadniony interes administratora.',
        },
        {
          h: '5. Okres przechowywania',
          p: 'Dane przechowuję przez okres niezbędny do realizacji celu, a po jego zakończeniu — zgodnie z przepisami archiwizacji (np. księgowość: 5 lat).',
        },
        {
          h: '6. Twoje prawa',
          p: 'Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz skargi do Prezesa UODO (uodo.gov.pl).',
        },
        {
          h: '7. Bezpieczeństwo',
          p: 'Stosuję szyfrowanie SSL/TLS oraz aktualne praktyki bezpieczeństwa. Wysyłka formularzy odbywa się przez zaufanego pośrednika (FormSubmit.co).',
        },
        {
          h: '8. Kontakt w sprawie prywatności',
          p: `W sprawach dotyczących prywatności napisz na: ${CONTACT_EMAIL}. Odpowiadam w ciągu 48 godzin.`,
        },
      ],
    },
    en: {
      badge: 'Privacy Policy',
      title: 'Privacy Policy & GDPR',
      updated: 'Last updated: November 2026',
      intro:
        'This privacy policy describes how MZDevStudio (the "Controller") processes personal data. I care about your privacy and process data only to the extent necessary to handle inquiries and provide services.',
      sections: [
        {
          h: '1. Data Controller',
          p: `The controller of personal data is MZDevStudio, Poland. Contact: ${CONTACT_EMAIL}.`,
        },
        {
          h: '2. What data I collect',
          p: 'Contact form: name (optional), email address, project category, subject, and message content. I do not use tracking cookies or advertising profiling.',
        },
        {
          h: '3. Purposes of processing',
          p: 'Responding to inquiries, preparing quotes, delivering and settling services, commercial communication with consent, and fulfilling legal obligations.',
        },
        {
          h: '4. Legal basis',
          p: 'Art. 6(1)(a), (b) and (f) GDPR — consent, contract and the legitimate interest of the controller.',
        },
        {
          h: '5. Retention period',
          p: 'I keep data for as long as necessary to fulfil the purpose, and afterwards in line with archiving regulations (e.g. accounting: 5 years).',
        },
        {
          h: '6. Your rights',
          p: 'You have the right to access, rectify, erase, restrict processing, data portability, object, and to lodge a complaint with the Polish DPA (uodo.gov.pl).',
        },
        {
          h: '7. Security',
          p: 'I use SSL/TLS encryption and current security practices. Form submissions are handled by a trusted processor (FormSubmit.co).',
        },
        {
          h: '8. Privacy contact',
          p: `For privacy matters write to: ${CONTACT_EMAIL}. I reply within 48 hours.`,
        },
      ],
    },
  },
  terms: {
    pl: {
      badge: 'Regulamin',
      title: 'Regulamin Świadczenia Usług',
      updated: 'Ostatnia aktualizacja: listopad 2026',
      intro:
        'Niniejszy regulamin określa zasady świadczenia usług tworzenia stron internetowych i aplikacji webowych przez MZDevStudio.',
      sections: [
        {
          h: '1. Zakres usług',
          p: 'Tworzenie stron internetowych, landing page, portali, aplikacji webowych oraz usługi wsparcia technicznego i SEO.',
        },
        {
          h: '2. Zawarcie umowy',
          p: 'Umowa zostaje zawarta po akceptacji wyceny i wpłacie zaliczki. Zakres prac określa specyfikacja uzgodniona przed startem projektu.',
        },
        {
          h: '3. Płatności',
          p: 'Standardowo: 50% zaliczki przed rozpoczęciem prac, 50% po odbiorze. Wycena ma charakter indywidualny.',
        },
        {
          h: '4. Czas realizacji',
          p: 'Terminy wskazane w wycenie są orientacyjne i mogą ulec wydłużeniu w przypadku opóźnień w dostarczaniu materiałów przez Klienta.',
        },
        {
          h: '5. Własność intelektualna',
          p: 'Po pełnej zapłacie Klient otrzymuje prawa do gotowego projektu. Kody i rozwiązania ogólne mogą być ponownie wykorzystane przez Wykonawcę.',
        },
        {
          h: '6. Odpowiedzialność',
          p: 'Wykonawca odpowiada za zgodność z ustaloną specyfikacją. Odpowiedzialność za utracone korzyści jest wyłączona.',
        },
        {
          h: '7. Gwarancja i wsparcie',
          p: 'Gwarancja na błędy techniczne przez 30 dni od odbioru. Pakiety wsparcia po wdrożeniu dostępne są na osobne zlecenie.',
        },
        {
          h: '8. Reklamacje',
          p: `Reklamacje można zgłaszać na ${CONTACT_EMAIL}. Rozpatruję je w ciągu 14 dni roboczych.`,
        },
      ],
    },
    en: {
      badge: 'Terms & Conditions',
      title: 'Terms of Service',
      updated: 'Last updated: November 2026',
      intro:
        'These terms govern the provision of website and web application development services by MZDevStudio.',
      sections: [
        {
          h: '1. Scope of services',
          p: 'Development of websites, landing pages, web portals, web applications, plus technical support and SEO services.',
        },
        {
          h: '2. Contract conclusion',
          p: 'The contract is concluded upon acceptance of the quote and payment of the deposit. The scope of work is defined in the specification agreed before the project starts.',
        },
        {
          h: '3. Payments',
          p: 'Standard: 50% deposit before work starts, 50% upon acceptance. Pricing is agreed individually.',
        },
        {
          h: '4. Delivery time',
          p: 'Timelines in the quote are indicative and may be extended if the Client delays providing materials.',
        },
        {
          h: '5. Intellectual property',
          p: 'After full payment the Client receives rights to the finished project. General code and solutions may be reused by the Contractor.',
        },
        {
          h: '6. Liability',
          p: 'The Contractor is liable for compliance with the agreed specification. Liability for lost profits is excluded.',
        },
        {
          h: '7. Warranty and support',
          p: 'Warranty against technical defects for 30 days from acceptance. Post-launch support packages are available on a separate order.',
        },
        {
          h: '8. Complaints',
          p: `Complaints can be sent to ${CONTACT_EMAIL}. I respond within 14 business days.`,
        },
      ],
    },
  },
} as const;

export const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [page]);

  if (page === 'notfound') {
    return (
      <main id="main-content" className="flex-grow flex items-center justify-center min-h-[70vh] bg-[#040814] px-4">
        <div className="text-center max-w-md space-y-5">
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 font-display">404</div>
          <h1 className="text-2xl font-bold text-white font-display">
            {lang === 'pl' ? 'Strona nie została znaleziona' : 'Page not found'}
          </h1>
          <p className="text-slate-400 text-sm">
            {lang === 'pl'
              ? 'Ta strona nie istnieje lub została przeniesiona. Wróć na stronę główną.'
              : 'This page does not exist or has been moved. Go back to the homepage.'}
          </p>
          <Link
            to="/"
            className="btn-3d-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'pl' ? 'Wróć na stronę główną' : 'Back to homepage'}
          </Link>
        </div>
      </main>
    );
  }

  const data = CONTENT[page][lang];

  return (
    <main id="main-content" className="flex-grow bg-[#040814] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            {page === 'privacy' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <ScrollText className="w-3.5 h-3.5 text-blue-400" />
            )}
            {data.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            {data.title}
          </h1>
          <p className="text-xs font-mono text-slate-400">{data.updated}</p>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-500/50 px-4 py-2 bg-white/5 rounded-r-2xl border-white/5">
          {data.intro}
        </p>

        <div className="space-y-6">
          {data.sections.map((section) => (
            <div
              key={section.h}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
            >
              <h2 className="text-white font-bold font-display text-base mb-2">{section.h}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{section.p}</p>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            {lang === 'pl' ? 'Wróć na stronę główną' : 'Back to homepage'}
          </Link>
        </div>
      </div>
    </main>
  );
};
