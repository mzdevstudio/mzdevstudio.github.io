import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_EMAIL } from '../lib/mailer';
import { FAQItem } from '../types';

interface MetaDef {
  title: string;
  description: string;
}

const META: Record<string, { pl: MetaDef; en: MetaDef }> = {
  home: {
    pl: {
      title: 'MZDevStudio — Strony Internetowe, Portale & Aplikacje Webowe',
      description: 'MZDevStudio — Tworzę szybkie strony internetowe, portale i aplikacje w autorskim kodzie, dopasowane do Twoich potrzeb. Od szkicu po wdrożenie.',
    },
    en: {
      title: 'MZDevStudio — Websites, Portals & Custom Web Applications',
      description: 'MZDevStudio — I craft fast websites, portals, and applications in custom code, tailored to your needs. Direct work from sketch to launch.',
    },
  },
  privacy: {
    pl: {
      title: 'Polityka Prywatności & RODO — MZDevStudio',
      description: 'Polityka prywatności MZDevStudio. Dowiedz się, jakie dane zbieram, w jakim celu i jakie masz prawa wynikające z RODO.',
    },
    en: {
      title: 'Privacy Policy & GDPR — MZDevStudio',
      description: 'MZDevStudio privacy policy. Learn what data I collect, why, and what rights you have under GDPR.',
    },
  },
  terms: {
    pl: {
      title: 'Regulamin Świadczenia Usług — MZDevStudio',
      description: 'Regulamin świadczenia usług tworzenia stron internetowych i aplikacji webowych przez MZDevStudio. Zasady współpracy, płatności, gwarancji i reklamacji.',
    },
    en: {
      title: 'Terms of Service — MZDevStudio',
      description: 'MZDevStudio terms of service for website and web application development. Cooperation rules, payments, warranty and complaints.',
    },
  },
  notfound: {
    pl: {
      title: '404 — Strona nie została znaleziona | MZDevStudio',
      description: 'Nie znaleziono strony. Wróć na stronę główną MZDevStudio.',
    },
    en: {
      title: '404 — Page Not Found | MZDevStudio',
      description: 'Page not found. Go back to the MZDevStudio homepage.',
    },
  },
};

export const SEO: React.FC = () => {
  const { lang, t } = useLanguage();
  const { pathname } = useLocation();

  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const pageKey: keyof typeof META =
    normalizedPath === '/' ? 'home'
    : normalizedPath === '/polityka-prywatnosci' ? 'privacy'
    : normalizedPath === '/regulamin' ? 'terms'
    : 'notfound';

  useEffect(() => {
    // 1. Set HTML lang attribute dynamically
    document.documentElement.lang = lang;

    const meta = META[pageKey][lang];
    const canonicalPath = normalizedPath;
    const configuredSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim().replace(/\/+$/, '');
    const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/+$/, '');
    const runtimeOrigin =
      typeof window !== 'undefined' && !['localhost', '127.0.0.1'].includes(window.location.hostname)
        ? `${window.location.origin}${basePath}`
        : '';
    const siteUrl = configuredSiteUrl || runtimeOrigin || 'https://mzdevstudio.pl';
    const siteNoindex = import.meta.env.VITE_SITE_NOINDEX === 'true';

    const plHref = `${siteUrl}${canonicalPath}`;
    const enHref = `${siteUrl}${canonicalPath}?lang=en`;
    const canonicalHref = pageKey === 'notfound' ? null : lang === 'en' ? enHref : plHref;
    const pageUrl = canonicalHref ?? `${siteUrl}${normalizedPath}`;

    // 2. Set dynamic Title, Robots and Meta Description based on current route + language
    document.title = meta.title;

    const updateMeta = (selector: string, content: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      }
    };

    const upsertHeadLink = (rel: string, href: string, extraAttrs?: Record<string, string>) => {
      const attrSelector = extraAttrs
        ? Object.entries(extraAttrs)
            .map(([k, v]) => `[${k}="${v}"]`)
            .join('')
        : '';
      let el = document.querySelector(`link[rel="${rel}"]${attrSelector}`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        if (extraAttrs) {
          Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
        }
        document.head.appendChild(el);
      }
      el.href = href;
    };

    const removeHeadLinks = (selector: string) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    };

    updateMeta(
      'meta[name="robots"]',
      pageKey === 'notfound' || siteNoindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    updateMeta('meta[name="description"]', meta.description);
    updateMeta('meta[property="og:title"]', meta.title);
    updateMeta('meta[property="og:description"]', meta.description);
    updateMeta('meta[property="og:url"]', pageUrl);
    updateMeta('meta[property="og:image"]', `${siteUrl}/og-image.jpg`);
    updateMeta('meta[property="og:locale"]', lang === 'pl' ? 'pl_PL' : 'en_US');
    updateMeta('meta[name="twitter:title"]', meta.title);
    updateMeta('meta[name="twitter:description"]', meta.description);
    updateMeta('meta[name="twitter:url"]', pageUrl);
    updateMeta('meta[name="twitter:image"]', `${siteUrl}/og-image.jpg`);

    if (canonicalHref) {
      upsertHeadLink('canonical', canonicalHref);
      upsertHeadLink('alternate', plHref, { hreflang: 'pl' });
      upsertHeadLink('alternate', enHref, { hreflang: 'en' });
      upsertHeadLink('alternate', plHref, { hreflang: 'x-default' });
    } else {
      removeHeadLinks('link[rel="canonical"]');
      removeHeadLinks('link[rel="alternate"][hreflang]');
    }

    // 3. Structured data (JSON-LD)
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"], #static-seo-schema');
    existingScripts.forEach((s) => s.remove());

    const injectJsonLd = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    if (pageKey === 'home') {
      const faqData: FAQItem[] = Array.isArray(t('faq.items')) ? t('faq.items') : [];
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqData.map((f) => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      };

      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        'name': 'MZDevStudio',
        'url': `${siteUrl}/`,
        'inLanguage': ['pl', 'en']
      };

      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#organization`,
        'name': 'MZDevStudio',
        'url': siteUrl,
        'logo': `${siteUrl}/icon.svg`,
        'image': `${siteUrl}/og-image.jpg`,
        'email': CONTACT_EMAIL,
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'PL'
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '18:00'
        },
        'sameAs': [
          'https://github.com/MzdrowY'
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': lang === 'pl' ? 'Usługi Tworzenia Stron & Aplikacji' : 'Web Development Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': lang === 'pl' ? 'Dedykowane Strony Internetowe' : 'Custom Websites',
                'description':
                  lang === 'pl'
                    ? 'Szybkie i responsywne strony internetowe w autorskim kodzie i SEO.'
                    : 'Fast, responsive websites built with clean custom code and SEO.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': lang === 'pl' ? 'Portale i Serwisy WWW' : 'Web Portals',
                'description':
                  lang === 'pl'
                    ? 'Wielojęzyczne serwisy i portale dopasowane do Twoich potrzeb.'
                    : 'Multilingual portals and web platforms tailored to your needs.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': lang === 'pl' ? 'Aplikacje Webowe' : 'Web Applications',
                'description':
                  lang === 'pl'
                    ? 'Dedykowane narzędzia i aplikacje webowe szyte na miarę.'
                    : 'Custom web applications and interactive digital tools built to spec.'
              }
            }
          ]
        }
      };

      injectJsonLd(websiteSchema);
      injectJsonLd(localBusinessSchema);
      injectJsonLd(faqSchema);
    } else if (pageKey === 'privacy' || pageKey === 'terms') {
      // Breadcrumb dla podstron prawnych
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': lang === 'pl' ? 'Strona Główna' : 'Home',
            'item': `${siteUrl}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': pageKey === 'privacy'
              ? (lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy')
              : (lang === 'pl' ? 'Regulamin' : 'Terms of Service'),
            'item': `${siteUrl}${canonicalPath}`
          }
        ]
      });
    }

  }, [lang, t, normalizedPath, pageKey]);

  return null;
};
