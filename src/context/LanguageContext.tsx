import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pl' | 'en';

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  pl: {
    nav: {
      about: 'O mnie',
      services: 'Oferta',
      portfolio: 'Realizacje',
      whyUs: 'Dlaczego ja',
      contact: 'Kontakt',
      getInTouch: 'Skontaktuj się',
    },
    hero: {
      tagline: 'Tworzę szybkie strony internetowe, portale i aplikacje w autorskim kodzie, dopasowane do Twoich potrzeb.',
      ctaPrimary: 'Skontaktuj się',
      ctaSecondary: 'Zobacz realizacje',
      availability: 'Otwarty na nowe projekty',
      badge: 'Strony WWW & Aplikacje',
      terminalHeader: 'Czysty kod i wysoka wydajność',
      features: [
        'Pełne dopasowanie do telefonów (Mobile-First)',
        'Autorski kod bez ciężkich szablonów',
        'Techniczne SEO i metadane',
        'Pomoc z domeną i szybkim hostingiem',
      ],
    },
    about: {
      title: 'O mnie — MZDevStudio',
      subtitle: 'Przejrzyste strony i aplikacje pisane od zera',
      quote: 'Projektuję szybkie i czytelne strony internetowe, bez zbędnego komplikowania. Współpracujesz bezpośrednio z wykonawcą — od pierwszego szkicu po uruchomienie w sieci.',
      stats: {
        experienceYears: 'Lat doświadczenia',
        projectsCompleted: 'Zrealizowanych projektów',
        lighthouseAverage: 'Wydajność',
        satisfactionRate: 'Zaangażowanie',
      },
      techStackTitle: 'Technologie, na których pracuję:',
      readMore: 'Dowiedz się więcej o procesie',
    },
    services: {
      headerBadge: 'Oferta',
      headerTitle: 'Usługi & Rozwiązania Webowe',
      headerDesc: 'Strony internetowe, portale i modernizacje pisane w autorskim kodzie pod konkretny cel.',
      detailsBtn: 'Szczegóły',
      modalTitle: 'Szczegóły usługi',
      estimatedTimeLabel: 'Czas realizacji:',
      priceLabel: 'Wycena:',
      deliverablesLabel: 'Co otrzymujesz:',
      featuresLabel: 'Zakres prac:',
      closeBtn: 'Zamknij',
      orderBtn: 'Zapytaj o usługę',
      items: [
        {
          id: 'strony-internetowe',
          title: 'Strony internetowe',
          description: 'Dedykowane strony internetowe pisane od zera — szybkie, czytelne i dopasowane do urządzeń mobilnych.',
          detailedDescription: 'Kompleksowa budowa strony wizytówkowej, osobistej lub firmowej bez ciężkich gotowych motywów. Przejrzysta struktura, szybkie ładowanie i pełne przygotowanie pod wyszukiwarkę Google.',
          iconName: 'Globe',
          features: ['Indywidualny projekt UI/UX', 'Pełna responsywność (Mobile-First)', 'Techniczne SEO i Open Graph', 'Formularz kontaktowy i analityka'],
          deliverables: ['Gotowa strona z certyfikatem SSL', 'Konfiguracja na Twojej domenie', 'Kod źródłowy projektu'],
          estimatedTime: '10–14 dni',
          startingPrice: 'Indywidualna',
          badge: 'Popularne',
        },
        {
          id: 'landing-page',
          title: 'Landing Page',
          description: 'Przejrzyste strony jednostronicowe pod konkretną usługę, produkt lub kampanię reklamową.',
          detailedDescription: 'Lekka strona skupiona na jednym celu — przekazaniu oferty i ułatwieniu kontaktu z Twoją firmą. Idealna pod kampanie Google Ads lub jako szybka wizytówka.',
          iconName: 'Zap',
          features: ['Czytelna sekcja Hero i oferta', 'Wyraźne przyciski kontaktowe (CTA)', 'Lekka i szybka konstrukcja na telefony', 'Podpięcie statystyk odwiedzin'],
          deliverables: ['Gotowa strona docelowa', 'Skonfigurowany formularz kontaktowy', 'Wersja gotowa pod kampanie reklamowe'],
          estimatedTime: '5–7 dni',
          startingPrice: 'Indywidualna',
        },
        {
          id: 'portale-aplikacje',
          title: 'Portale i aplikacje webowe',
          description: 'Wielojęzyczne serwisy tematyczne, panele informacyjne i dedykowane narzędzia w React lub Next.js.',
          detailedDescription: 'Rozbudowane serwisy internetowe z wieloma podstronami, wersjami językowymi oraz interaktywnymi elementami dopasowanymi do potrzeb użytkowników.',
          iconName: 'ShoppingBag',
          features: ['React / Next.js / TypeScript', 'Obsługa wielu wersji językowych', 'Tryb jasny / ciemny i filtrowanie', 'Szybki hosting statyczny (Cloudflare / Pages)'],
          deliverables: ['Działająca aplikacja lub portal', 'Wdrożenie produkcyjne i mapa witryny', 'Dokumentacja podstawowej obsługi'],
          estimatedTime: '14–21 dni',
          startingPrice: 'Indywidualna',
        },
        {
          id: 'modernizacja-stron',
          title: 'Modernizacja stron',
          description: 'Odświeżenie wyglądu, poprawa błędów, dostosowanie do smartfonów i przepisanie na nowoczesny kod.',
          detailedDescription: 'Przekształcenie przestarzałej lub wolnej witryny w nowoczesną, mobilną stronę bez utraty dotychczasowych adresów i widoczności w Google.',
          iconName: 'RefreshCw',
          features: ['Nowy, czysty wygląd strony', 'Refaktoryzacja i uporządkowanie kodu', 'Dostosowanie do ekranów mobilnych', 'Zachowanie ważnych adresów URL'],
          deliverables: ['Odświeżona wersja witryny', 'Poprawa czytelności i szybkości', 'Konfiguracja HTTPS'],
          estimatedTime: '5–10 dni',
          startingPrice: 'Indywidualna',
        },
        {
          id: 'opieka-techniczna',
          title: 'Opieka i aktualizacje',
          description: 'Pomoc przy zmianach na stronie, aktualizacje treści oraz utrzymanie poprawnego działania.',
          detailedDescription: 'Wsparcie powdrożeniowe dla właścicieli stron: drobne zmiany tekstów, zdjęć, aktualizacja danych rejestrowych oraz pilnowanie certyfikatów i kopii zapasowych.',
          iconName: 'ShieldCheck',
          features: ['Bieżące aktualizacje treści i zdjęć', 'Regularne kopie zapasowe', 'Sprawny kontakt mailowy (< 24h)', 'Kontrola działania formularzy i SSL'],
          deliverables: ['Kopie zapasowe przed zmianami', 'Wdrożenie uzgodnionych poprawek', 'Wsparcie techniczne w razie pytań'],
          estimatedTime: 'Według potrzeb',
          startingPrice: 'Indywidualna',
        },
        {
          id: 'optymalizacja-wydajnosci',
          title: 'Optymalizacja wydajności',
          description: 'Przyspieszenie ładowania istniejącej strony, odchudzenie grafik i poprawa wyników Core Web Vitals.',
          detailedDescription: 'Analiza wąskich gardeł na obecnej stronie oraz optymalizacja obrazów, fontów i skryptów, aby witryna otwierała się zauważalnie szybciej na telefonach.',
          iconName: 'Gauge',
          features: ['Konwersja i kompresja grafik (WebP/AVIF)', 'Ograniczenie zbędnych skryptów', 'Optymalizacja ładowania zasobów', 'Poprawa struktury nagłówków i meta-tagów'],
          deliverables: ['Lista wdrożonych poprawek', 'Pomiar wydajności przed i po', 'Wyższa stabilność na urządzeniach mobilnych'],
          estimatedTime: '2–4 dni',
          startingPrice: 'Indywidualna',
        },
      ],
    },
    whyUs: {
      badge: 'Dlaczego MZDevStudio?',
      title: 'Konkretne podejście bez agencji',
      subtitle: 'Krótko o tym, na czym opiera się każda realizacja',
      comparisonTitle: 'Porównanie podejścia:',
      featureCol: 'Kryterium',
      studioDevCol: 'MZDevStudio',
      agenciesCol: 'Szablony / Agencje',
      benefits: [
        {
          id: 'design',
          iconName: 'Sparkles',
          title: 'Przejrzysty design',
          description: 'Układ dopasowany do branży i treści, bez przeładowania zbędnymi efektami.',
          metric: 'Czytelny UI',
        },
        {
          id: 'speed',
          iconName: 'Zap',
          title: 'Szybkie ładowanie',
          description: 'Lekki kod i zoptymalizowane obrazy dla płynnego działania na telefonach.',
          metric: 'Core Web Vitals',
        },
        {
          id: 'responsive',
          iconName: 'Smartphone',
          title: 'Wersja mobilna',
          description: 'Wygodna obsługa i czytelna nawigacja na smartfonach, tabletach i desktopie.',
          metric: 'Mobile-First',
        },
        {
          id: 'seo',
          iconName: 'Search',
          title: 'Podstawy SEO',
          description: 'Semantyczny HTML, metadane Open Graph, mapa witryny i dane strukturalne.',
          metric: 'SEO Ready',
        },
        {
          id: 'individual',
          iconName: 'UserCheck',
          title: 'Bezpośredni kontakt',
          description: 'Rozmawiasz wprost z osobą, która projektuje i pisze kod Twojej strony.',
          metric: '1-na-1',
        },
        {
          id: 'support',
          iconName: 'HeartHandshake',
          title: 'Wsparcie po starcie',
          description: 'Pomoc przy zmianach treści, rozbudowie oraz konfiguracji domeny i hostingu.',
          metric: 'Pomoc techniczna',
        },
      ],
    },
    portfolio: {
      badge: 'Portfolio',
      title: 'Wybrane Realizacje',
      subtitle: 'Wybrane projekty opublikowane i działające w sieci',
      categories: {
        all: 'Wszystkie',
        corporate: 'Strony firmowe',
        webapp: 'Serwisy i portale',
      },
      metricsLabel: 'Wyniki biznesowe:',
      viewProjectBtn: 'Zobacz szczegóły projektu',
      modalTitle: 'Szczegóły Projektu',
      clientLabel: 'Klient:',
      categoryLabel: 'Kategoria:',
      lighthouseLabel: 'Wynik Lighthouse:',
      projects: [
        {
          id: 'troyaholding',
          title: 'TROYA HOLDING s.r.o. — Serwis Korporacyjny B2B',
          category: 'corporate',
          categoryLabel: 'Strona Firmowa',
          client: 'TROYA HOLDING s.r.o. (Ostrava, CZ)',
          description: 'Wielojęzyczna witryna korporacyjna dla czeskiej spółki handlowej B2B z pełną prezentacją danych rejestrowych, oferty i kontaktem.',
          longDescription: 'Kompleksowa realizacja dla międzynarodowej spółki handlowej TROYA HOLDING s.r.o. z siedzibą w Ostrawie. Strona obsługuje 4 języki (PL, CZ, EN, DE), oferuje tryb jasny i ciemny, formularz kontaktowy Web3Forms, dane strukturalne Schema.org (JSON-LD) oraz szybki hosting na Cloudflare Pages.',
          metrics: [
            { label: 'Wersje językowe', value: '4 (PL/CZ/EN/DE)' },
            { label: 'Motywy UI', value: 'Jasny / Ciemny' },
            { label: 'Hosting', value: 'Cloudflare' },
          ],
          tags: ['React 19', 'TypeScript', 'Tailwind v4', '4 języki', 'SEO / JSON-LD', 'Cloudflare Pages'],
          colorGradient: 'from-amber-500/20 via-blue-500/10 to-transparent',
          liveUrl: 'https://troyaholding.pages.dev/',
          previewImage: `${import.meta.env.BASE_URL}portfolio/troyaholding.webp`,
        },
        {
          id: 'mzdrowy-github-io',
          title: 'mzdrowy.github.io — Portal z E-bookami i Narzędziami',
          category: 'webapp',
          categoryLabel: 'Serwis / Portal',
          client: 'MzdrowY (Projekt własny)',
          description: 'Autorski portal w stylistyce terminala z bezpłatnymi e-bookami technicznymi (PDF) oraz autorskimi programami desktopowymi.',
          longDescription: 'Osobista platforma zbudowana w Next.js 16 (Static Export) i Tailwind CSS v4, hostowana na GitHub Pages. Udostępnia 5 autorskich e-booków w wersjach PL/EN, 3 aplikacje desktopowe, dwujęzyczny interfejs, liczniki pobrań bez backendu oraz formularz zgłoszeniowy.',
          metrics: [
            { label: 'E-booki PDF', value: '5 publikacji' },
            { label: 'Programy', value: '3 aplikacje' },
            { label: 'Hosting', value: 'GitHub Pages' },
          ],
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Static Export', 'GitHub Pages'],
          colorGradient: 'from-emerald-500/20 via-amber-500/10 to-transparent',
          liveUrl: 'https://mzdrowy.github.io/',
          previewImage: `${import.meta.env.BASE_URL}portfolio/mzdrowy-github-io.webp`,
        },
      ],
    },
    faq: {
      faqBadge: 'FAQ',
      faqTitle: 'Najczęstsze Pytania',
      faqAllTab: 'Wszystkie pytania',
      items: [
        {
          question: 'Ile trwa przygotowanie strony?',
          answer: 'Prostsza strona internetowa lub landing page powstaje zwykle w 5–14 dni roboczych, a większy serwis w 2–4 tygodnie. Dokładny termin ustalamy przed startem.',
          category: 'Realizacja',
        },
        {
          question: 'Czy muszę mieć własną domenę i hosting?',
          answer: 'Nie — pomagam dobrać i skonfigurować hosting (np. Cloudflare Pages lub GitHub Pages) oraz podpiąć Twoją domenę.',
          category: 'Hosting',
        },
        {
          question: 'Czy można później zmieniać treści na stronie?',
          answer: 'Tak. Przy prostych stronach statycznych szybko wprowadzam potrzebne zmiany, a przy rozbudowanych projektach można podpiąć wygodny panel edycji.',
          category: 'Obsługa',
        },
        {
          question: 'Jak wygląda wycena i rozliczenie?',
          answer: 'Zakres i koszt ustalamy indywidualnie po krótkiej rozmowie lub mailu. Prace ruszają po akceptacji warunków, a rozliczenie następuje zgodnie z ustaleniami.',
          category: 'Płatności',
        },
        {
          question: 'Dlaczego własny kod zamiast gotowego szablonu?',
          answer: 'Kod pisany pod konkretny projekt nie zawiera setek zbędnych skryptów i wtyczek, dzięki czemu strona ładuje się szybciej i jest łatwa w utrzymaniu.',
          category: 'Technologia',
        },
      ],
    },
    contact: {
      badge: 'Kontakt',
      title: 'Kontakt — MZDevStudio',
      subtitle: 'Napisz wiadomość przez formularz — odpowiadam zwykle w ciągu 24 godzin w dni robocze.',
      directData: 'Bezpośrednie Dane',
      emailActive: 'Aktywny',
      emailTarget: 'Adres e-mail:',
      copyEmail: 'Kopiuj adres',
      copiedSuccess: '✓ Skopiowano adres e-mail!',
      openMailClient: 'Otwórz w programie pocztowym',
      avgResponseTime: 'Czas odpowiedzi:',
      workHours: 'Dni robocze: Pon – Pt, 08:00 – 18:00',
      recipient: 'Odbiorca:',
      formTitle: 'Formularz Kontaktowy',
      formSubtitle: 'Wiadomość trafi bezpośrednio na',
      nameLabel: 'Imię i nazwisko (opcjonalnie)',
      emailLabel: 'Adres email *',
      subjectLabel: 'Temat wiadomości *',
      categoryLabel: 'Kategoria projektu',
      messageLabel: 'Treść wiadomości *',
      submitBtn: 'Wyślij wiadomość',
      sendingMsg: 'Wysyłanie na',
      successTitle: 'Dziękuję! Wiadomość wysłana',
      successDesc: 'Twoje zgłoszenie zostało wysłane na adres',
      summaryTitle: 'Podsumowanie',
      sendCopyEmailBtn: 'Wyślij przez program pocztowy',
      sendAnotherBtn: 'Wyślij kolejną wiadomość',
      errors: {
        emailValid: 'Podaj poprawny adres email',
        subjectMin: 'Temat musi mieć min. 3 znaki',
        messageMin: 'Treść wiadomości musi mieć min. 10 znaków',
      },
    },
    footer: {
      brandDesc: 'Strony internetowe, portale i aplikacje webowe budowane bezpośrednio z autorem kodu.',
      quickLinks: 'Szybkie linki',
      contactHeader: 'Kontakt bezpośredni',
      location: 'Polska • Zdalnie',
      rights: 'Wszelkie prawa zastrzeżone.',
      privacyPolicy: 'Polityka Prywatności & RODO',
      speedGuarantee: 'Autorski kod · Szybkie ładowanie',
    },
  },

  en: {
    nav: {
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      whyUs: 'Why Me',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    hero: {
      tagline: 'I craft fast websites, portals, and applications in custom code, tailored to your needs.',
      ctaPrimary: 'Contact Me',
      ctaSecondary: 'View Work',
      availability: 'Open for new projects',
      badge: 'Websites & Web Apps',
      terminalHeader: 'Clean Code & Fast Performance',
      features: [
        'Mobile-first responsive layout',
        'Custom code without bloated themes',
        'Technical SEO & Open Graph metadata',
        'Domain & fast hosting setup',
      ],
    },
    about: {
      title: 'About — MZDevStudio',
      subtitle: 'Clear websites and web apps built from scratch',
      quote: 'I build fast, readable websites without unnecessary complexity. You work directly with the developer — from initial layout to production launch.',
      stats: {
        experienceYears: 'Years Experience',
        projectsCompleted: 'Completed Projects',
        lighthouseAverage: 'Performance',
        satisfactionRate: 'Dedication',
      },
      techStackTitle: 'Technologies I work with:',
      readMore: 'Learn more about the process',
    },
    services: {
      headerBadge: 'Services',
      headerTitle: 'Services & Web Solutions',
      headerDesc: 'Websites, web portals, and modernizations built in custom code around a clear goal.',
      detailsBtn: 'Details',
      modalTitle: 'Service Details',
      estimatedTimeLabel: 'Timeline:',
      priceLabel: 'Pricing:',
      deliverablesLabel: 'Included:',
      featuresLabel: 'Scope of work:',
      closeBtn: 'Close',
      orderBtn: 'Inquire about service',
      items: [
        {
          id: 'strony-internetowe',
          title: 'Websites',
          description: 'Custom websites built from scratch — fast, readable, and mobile-friendly.',
          detailedDescription: 'End-to-end showcase, personal, or corporate websites without bloated off-the-shelf themes. Clean structure, fast loading, and proper search engine foundations.',
          iconName: 'Globe',
          features: ['Custom UI/UX layout', 'Mobile-first responsiveness', 'Technical SEO & Open Graph', 'Contact form & analytics'],
          deliverables: ['Ready website with SSL', 'Domain & hosting setup', 'Clean source code'],
          estimatedTime: '10–14 days',
          startingPrice: 'Custom quote',
          badge: 'Popular',
        },
        {
          id: 'landing-page',
          title: 'Landing Pages',
          description: 'Focused single-page sites for a specific service, product, or ad campaign.',
          detailedDescription: 'Lightweight page built around one clear goal — presenting your offer clearly and making contact effortless on desktop and mobile.',
          iconName: 'Zap',
          features: ['Clear Hero & offer structure', 'Strong calls to action (CTA)', 'Fast mobile load speed', 'Visit analytics setup'],
          deliverables: ['Ready landing page', 'Configured contact form', 'Ad campaign ready build'],
          estimatedTime: '5–7 days',
          startingPrice: 'Custom quote',
        },
        {
          id: 'portale-aplikacje',
          title: 'Portals & Web Apps',
          description: 'Multilingual portals, resource hubs, and custom tools built with React or Next.js.',
          detailedDescription: 'Multi-page web portals and interactive tools with multi-language support, theme switching, and fast static or cloud deployment.',
          iconName: 'ShoppingBag',
          features: ['React / Next.js / TypeScript', 'Multi-language support', 'Light / dark themes & filters', 'Fast static hosting (Cloudflare / Pages)'],
          deliverables: ['Live portal or web app', 'Production deployment & sitemap', 'Usage documentation'],
          estimatedTime: '14–21 days',
          startingPrice: 'Custom quote',
        },
        {
          id: 'modernizacja-stron',
          title: 'Website Modernization',
          description: 'Refreshing outdated layouts, fixing bugs, and rebuilding on a modern mobile-first stack.',
          detailedDescription: 'Upgrading a slow or dated website into a clean, responsive modern build while keeping existing URLs and search visibility intact.',
          iconName: 'RefreshCw',
          features: ['Clean modern UI refresh', 'Code cleanup & refactoring', 'Mobile screen optimization', 'Preserved important URLs'],
          deliverables: ['Modernized website', 'Faster load speed & clarity', 'HTTPS setup'],
          estimatedTime: '5–10 days',
          startingPrice: 'Custom quote',
        },
        {
          id: 'opieka-techniczna',
          title: 'Care & Updates',
          description: 'Content updates, backups, and ongoing technical assistance whenever needed.',
          detailedDescription: 'Post-launch support for website owners: text and image updates, company detail changes, backups, and SSL monitoring.',
          iconName: 'ShieldCheck',
          features: ['Content & image updates', 'Regular backups', 'Direct email support (< 24h)', 'Form & SSL checks'],
          deliverables: ['Pre-change backups', 'Requested updates deployed', 'Technical guidance'],
          estimatedTime: 'On demand',
          startingPrice: 'Custom quote',
        },
        {
          id: 'optymalizacja-wydajnosci',
          title: 'Performance Optimization',
          description: 'Speeding up existing pages, compressing assets, and improving Core Web Vitals.',
          detailedDescription: 'Identifying bottlenecks on your current site and optimizing images, fonts, and scripts so pages open noticeably faster on mobile devices.',
          iconName: 'Gauge',
          features: ['Image compression (WebP/AVIF)', 'Removing unused scripts', 'Asset loading optimization', 'Cleaner headings & meta tags'],
          deliverables: ['Summary of optimizations', 'Before/after speed check', 'Smoother mobile experience'],
          estimatedTime: '2–4 days',
          startingPrice: 'Custom quote',
        },
      ],
    },
    whyUs: {
      badge: 'Why MZDevStudio?',
      title: 'Practical Work Without Agency Overhead',
      subtitle: 'What every website build focuses on',
      comparisonTitle: 'Approach comparison:',
      featureCol: 'Criteria',
      studioDevCol: 'MZDevStudio',
      agenciesCol: 'Templates / Agencies',
      benefits: [
        {
          id: 'design',
          iconName: 'Sparkles',
          title: 'Clear Design',
          description: 'Layout tailored to your industry and content without distracting visual clutter.',
          metric: 'Clean UI',
        },
        {
          id: 'speed',
          iconName: 'Zap',
          title: 'Fast Loading',
          description: 'Lightweight code and optimized assets for smooth performance on mobile.',
          metric: 'Core Web Vitals',
        },
        {
          id: 'responsive',
          iconName: 'Smartphone',
          title: 'Mobile Friendly',
          description: 'Readable typography and comfortable navigation across phones, tablets, and desktops.',
          metric: 'Mobile-First',
        },
        {
          id: 'seo',
          iconName: 'Search',
          title: 'SEO Foundations',
          description: 'Semantic HTML, Open Graph metadata, XML sitemap, and structured data.',
          metric: 'SEO Ready',
        },
        {
          id: 'individual',
          iconName: 'UserCheck',
          title: 'Direct Contact',
          description: 'You talk directly to the person designing and writing the code.',
          metric: '1-on-1',
        },
        {
          id: 'support',
          iconName: 'HeartHandshake',
          title: 'Post-Launch Help',
          description: 'Assistance with future edits, expansions, and domain or hosting setup.',
          metric: 'Tech Support',
        },
      ],
    },
    portfolio: {
      badge: 'Portfolio',
      title: 'Featured Work',
      subtitle: 'Selected websites and web projects deployed online',
      categories: {
        all: 'All Projects',
        corporate: 'Corporate Websites',
        webapp: 'Web Portals',
      },
      metricsLabel: 'Key Metrics:',
      viewProjectBtn: 'View Project Details',
      modalTitle: 'Project Details',
      clientLabel: 'Client:',
      categoryLabel: 'Category:',
      lighthouseLabel: 'Lighthouse Score:',
      projects: [
        {
          id: 'troyaholding',
          title: 'TROYA HOLDING s.r.o. — Corporate B2B Website',
          category: 'corporate',
          categoryLabel: 'Corporate Website',
          client: 'TROYA HOLDING s.r.o. (Ostrava, CZ)',
          description: 'Multilingual corporate website for a Czech B2B trading company featuring official registry details, business scope, and contact flow.',
          longDescription: 'End-to-end website for the international trading company TROYA HOLDING s.r.o. in Ostrava. Built with 4 languages (PL, CZ, EN, DE), light/dark theme toggle, Web3Forms contact handling, Schema.org JSON-LD structured data, and Cloudflare Pages deployment.',
          metrics: [
            { label: 'Languages', value: '4 (PL/CZ/EN/DE)' },
            { label: 'UI Themes', value: 'Light / Dark' },
            { label: 'Hosting', value: 'Cloudflare' },
          ],
          tags: ['React 19', 'TypeScript', 'Tailwind v4', '4 Languages', 'SEO / JSON-LD', 'Cloudflare Pages'],
          colorGradient: 'from-amber-500/20 via-blue-500/10 to-transparent',
          liveUrl: 'https://troyaholding.pages.dev/',
          previewImage: `${import.meta.env.BASE_URL}portfolio/troyaholding.webp`,
        },
        {
          id: 'mzdrowy-github-io',
          title: 'mzdrowy.github.io — E-books & Tools Portal',
          category: 'webapp',
          categoryLabel: 'Web Portal',
          client: 'MzdrowY (Own Project)',
          description: 'Custom terminal-themed portal featuring free technical e-books (PDF) and original desktop applications.',
          longDescription: 'Personal platform built with Next.js 16 (Static Export) and Tailwind CSS v4, hosted on GitHub Pages. Features 5 original PL/EN e-books, 3 desktop apps, bilingual UI, serverless download counters, and a multi-step contact form.',
          metrics: [
            { label: 'PDF E-books', value: '5 guides' },
            { label: 'Desktop Apps', value: '3 tools' },
            { label: 'Hosting', value: 'GitHub Pages' },
          ],
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Static Export', 'GitHub Pages'],
          colorGradient: 'from-emerald-500/20 via-amber-500/10 to-transparent',
          liveUrl: 'https://mzdrowy.github.io/',
          previewImage: `${import.meta.env.BASE_URL}portfolio/mzdrowy-github-io.webp`,
        },
      ],
    },
    faq: {
      faqBadge: 'FAQ',
      faqTitle: 'Frequently Asked Questions',
      faqAllTab: 'All questions',
      items: [
        {
          question: 'How long does it take to build a website?',
          answer: 'A business website or landing page usually takes 5–14 business days, and a larger portal takes 2–4 weeks. The exact timeline is agreed upfront.',
          category: 'Turnaround',
        },
        {
          question: 'Do I need my own domain and hosting?',
          answer: 'No — I can help pick and configure fast hosting (such as Cloudflare Pages or GitHub Pages) and connect your domain.',
          category: 'Hosting',
        },
        {
          question: 'Can website content be updated later?',
          answer: 'Yes. For static websites I handle requested updates quickly, and for larger setups an editing workflow can be added as needed.',
          category: 'Updates',
        },
        {
          question: 'How do pricing and cooperation work?',
          answer: 'Scope and pricing are agreed individually after a brief message or discussion. Work starts once the details are confirmed.',
          category: 'Pricing',
        },
        {
          question: 'Why custom code instead of pre-made templates?',
          answer: 'Custom code avoids bloated plugins and unnecessary scripts, resulting in faster loading and simpler maintenance.',
          category: 'Technology',
        },
      ],
    },
    contact: {
      badge: 'Contact',
      title: 'Contact — MZDevStudio',
      subtitle: 'Send a message via the form below — I usually reply within 24 hours on business days.',
      directData: 'Direct Contact',
      emailActive: 'Active',
      emailTarget: 'Email Address:',
      copyEmail: 'Copy Email',
      copiedSuccess: '✓ Email address copied!',
      openMailClient: 'Open in Mail Client',
      avgResponseTime: 'Response time:',
      workHours: 'Business days: Mon – Fri, 08:00 – 18:00',
      recipient: 'Recipient:',
      formTitle: 'Contact Form',
      formSubtitle: 'Your message will be sent directly to',
      nameLabel: 'Full Name (optional)',
      emailLabel: 'Email Address *',
      subjectLabel: 'Subject *',
      categoryLabel: 'Project Category',
      messageLabel: 'Your Message *',
      submitBtn: 'Send Message',
      sendingMsg: 'Sending to',
      successTitle: 'Thank you! Message Sent',
      successDesc: 'Your message has been sent to',
      summaryTitle: 'Summary',
      sendCopyEmailBtn: 'Send via Email App',
      sendAnotherBtn: 'Send another message',
      errors: {
        emailValid: 'Please enter a valid email address',
        subjectMin: 'Subject must be at least 3 characters',
        messageMin: 'Message must be at least 10 characters',
      },
    },
    footer: {
      brandDesc: 'Websites, portals, and web apps built directly with the developer.',
      quickLinks: 'Quick Links',
      contactHeader: 'Direct Contact',
      location: 'Poland • Remote',
      rights: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy & GDPR',
      speedGuarantee: 'Custom Code · Fast Loading',
    },
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      // 1. Priorytet: parametr URL ?lang=pl|en (SEO / udostępnianie linków)
      if (typeof window !== 'undefined') {
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'en' || urlLang === 'pl') {
          return urlLang;
        }
      }
      // 2. Następnie: zapisana preferencja w localStorage
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('mzdevstudio_lang');
        if (saved === 'en' || saved === 'pl') {
          return saved;
        }
      }
      // 3. Domyślnie: polski
      return 'pl';
    } catch {
      return 'pl';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('mzdevstudio_lang', newLang);
        // Zapisz język w URL (?lang=...) bez przeładowania strony
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // Ignore iframe storage access restrictions
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'pl' ? 'en' : 'pl');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Helper function to safely traverse nested translation keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (path: string): any => {
    try {
      const keys = path.split('.');
      let current: unknown = translations[lang];
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current && (current as Record<string, unknown>)[key] !== undefined) {
          current = (current as Record<string, unknown>)[key];
        } else {
          // Fallback to PL if missing in EN
          let fallback: unknown = translations['pl'];
          for (const fKey of keys) {
            if (fallback && typeof fallback === 'object' && fKey in fallback && (fallback as Record<string, unknown>)[fKey] !== undefined) {
              fallback = (fallback as Record<string, unknown>)[fKey];
            } else {
              return path;
            }
          }
          return fallback;
        }
      }
      return current;
    } catch {
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
