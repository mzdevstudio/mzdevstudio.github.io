import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, AlertCircle, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_EMAIL, sendContactMessage } from '../lib/mailer';
import { SpotlightCard } from './fx/SpotlightCard';

const PROJECT_CATEGORIES = [
  { pl: 'Strona internetowa', en: 'Website' },
  { pl: 'Landing Page', en: 'Landing Page' },
  { pl: 'Portal / Serwis WWW', en: 'Web Portal' },
  { pl: 'Modernizacja strony', en: 'Website Redesign' },
  { pl: 'Optymalizacja wydajności', en: 'Performance Optimization' },
  { pl: 'Inne / Dedykowana aplikacja', en: 'Custom Web Application' },
] as const;

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: PROJECT_CATEGORIES[0][lang] as string,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  useEffect(() => {
    setFormData((prev) => {
      const matched = PROJECT_CATEGORIES.find(
        (cat) => cat.pl === prev.projectType || cat.en === prev.projectType
      );
      const nextCategory = matched ? matched[lang] : PROJECT_CATEGORIES[0][lang];
      return prev.projectType === nextCategory ? prev : { ...prev, projectType: nextCategory };
    });
  }, [lang]);

  const validate = (data: typeof formData = formData) => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
      newErrors.email = t('contact.errors.emailValid');
    }

    if (!data.subject.trim() || data.subject.trim().length < 3) {
      newErrors.subject = t('contact.errors.subjectMin');
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageMin');
    }

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ email: true, subject: true, message: true });
      return;
    }

    setErrors({});
    setSubmitError(null);
    setLoading(true);

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        projectType: formData.projectType,
        message: formData.message.trim(),
      });

      setLoading(false);
      setSubmittedData({ ...formData });
      setSubmitted(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#60a5fa', '#34d399', '#93c5fd']
      });
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setLoading(false);
      setSubmitError(
        lang === 'pl'
          ? `Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę lub napisz bezpośrednio na ${CONTACT_EMAIL}.`
          : `Failed to send your message. Please try again shortly or write directly to ${CONTACT_EMAIL}.`
      );
    }
  };

  return (
    <section id="kontakt" className="py-16 sm:py-24 relative bg-[#040814] overflow-hidden w-full">

      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[500px] bg-gradient-to-t from-blue-900/18 via-amber-500/[0.04] to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Architectural Header */}
        <div className="max-w-2xl space-y-3 mb-10 sm:mb-14">
          <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            {lang === 'pl' ? '06 / Kontakt' : '06 / Contact'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display break-words">
            {lang === 'pl' ? 'Porozmawiajmy o Twojej stronie' : t('contact.title')}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-start w-full">

          {/* Direct Brand Contact Box Left */}
          <SpotlightCard
            accent="amber"
            className="lg:col-span-5 bg-white/[0.03] border border-white/10 p-5 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6 sm:space-y-8 w-full overflow-hidden"
          >

            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-mono text-blue-400 uppercase tracking-widest font-bold block">
                {t('contact.directData')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                MZDevStudio
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'pl'
                  ? 'Niezależne studio projektowo-programistyczne. Tworzę bezkompromisowo szybkie strony i aplikacje www.'
                  : 'Independent web development & design studio creating ultra-fast websites and web applications.'
                }
              </p>
            </div>

            {/* Email Prominent Display */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 shadow-lg w-full overflow-hidden">
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>{t('contact.emailTarget')}</span>
                <span className="text-emerald-400 font-bold">{t('contact.emailActive')}</span>
              </div>

              <div className="flex items-center justify-between gap-2 min-w-0">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm sm:text-lg font-bold text-blue-400 hover:text-blue-300 transition-colors font-mono flex items-center gap-2.5 min-w-0 flex-1"
                  id="contact-email-link"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all border border-white/10 flex-shrink-0"
                  title={t('contact.copyEmail')}
                  aria-label={t('contact.copyEmail')}
                  id="contact-copy-email-btn"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                </button>
              </div>

              {copied && (
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-mono block">
                  {t('contact.copiedSuccess')}
                </span>
              )}
            </div>

            {/* Additional Channels */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  lang === 'pl' ? 'Zapytanie do MZDevStudio' : 'Inquiry for MZDevStudio'
                )}`}
                className="btn-3d-primary w-full py-3 sm:py-3.5 px-4 text-xs font-semibold rounded-full flex items-center justify-center gap-2 text-center truncate"
                id="contact-direct-write-btn"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{t('contact.openMailClient')}</span>
              </a>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs">{t('contact.avgResponseTime')}</span>
                </span>
                <span className="font-mono font-bold text-slate-200 text-[11px] sm:text-xs">&lt; 24h</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="text-[11px] sm:text-xs text-slate-400 space-y-1 font-mono pt-2 break-words relative z-10">
              <div>{t('contact.workHours')}</div>
              <div>{t('contact.recipient')} {CONTACT_EMAIL}</div>
            </div>

          </SpotlightCard>

          {/* Form Right */}
          <SpotlightCard
            accent="blue"
            className="lg:col-span-7 bg-white/[0.03] border border-white/10 p-5 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl w-full overflow-hidden"
          >
            <div className="relative z-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 sm:py-8 space-y-6 w-full"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      {t('contact.successTitle')}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      {t('contact.successDesc')} <strong className="text-blue-400 font-mono break-all">{CONTACT_EMAIL}</strong>.
                    </p>
                  </div>

                  {submittedData && (
                    <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-3 font-mono w-full overflow-hidden">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between border-b border-white/10 pb-2">
                        <span>{t('contact.summaryTitle')}</span>
                        <span className="text-emerald-400 font-bold">{lang === 'pl' ? 'STATUS: WYŚLANO' : 'STATUS: SENT'}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-slate-300 text-[11px] sm:text-xs break-words">
                        <div>
                          <span className="text-slate-400">{lang === 'pl' ? 'Nadawca:' : 'Sender:'}</span>{' '}
                          <span className="break-all">
                            {submittedData.name.trim()
                              ? `${submittedData.name.trim()} (${submittedData.email})`
                              : submittedData.email}
                          </span>
                        </div>
                        <div><span className="text-slate-400">{t('contact.recipient')}</span> <span className="break-all">{CONTACT_EMAIL}</span></div>
                        <div><span className="text-slate-400">{lang === 'pl' ? 'Temat:' : 'Subject:'}</span> <span className="break-words">{submittedData.subject}</span></div>
                        <div><span className="text-slate-400">{t('contact.categoryLabel')}:</span> {submittedData.projectType}</div>
                      </div>
                      <div className="pt-2 border-t border-white/10 text-slate-400 italic font-sans text-xs break-words max-h-36 overflow-y-auto">
                        {lang === 'pl' ? '„' : '“'}{submittedData.message}{lang === 'pl' ? '”' : '”'}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                        submittedData?.subject || (lang === 'pl' ? 'Zapytanie' : 'Inquiry')
                      )}&body=${encodeURIComponent(
                        `${lang === 'pl' ? 'Od:' : 'From:'} ${submittedData?.name ?? ''} (${submittedData?.email ?? ''})\n\n${submittedData?.message ?? ''}`
                      )}`}
                      className="btn-3d-primary w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 text-center"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{t('contact.sendCopyEmailBtn')}</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          projectType: PROJECT_CATEGORIES[0][lang],
                          message: ''
                        });
                        setTouched({});
                        setErrors({});
                      }}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
                    >
                      {t('contact.sendAnotherBtn')}
                    </button>
                  </div>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 w-full" id="contact-form" noValidate>
                  <div className="space-y-1 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{t('contact.formTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {t('contact.formSubtitle')} <strong className="text-blue-300 font-mono break-all">{CONTACT_EMAIL}</strong>
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Field 1: Imię i nazwisko (opcjonalnie) */}
                    <div className="space-y-1 w-full min-w-0">
                      <label htmlFor="contact-name" className="text-[11px] font-bold text-slate-300 font-mono uppercase flex items-center justify-between">
                        <span>{t('contact.nameLabel')}</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        placeholder={lang === 'pl' ? 'Jan Kowalski' : 'John Smith'}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-slate-100 text-xs focus:outline-none transition-colors max-w-full"
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div className="space-y-1 w-full min-w-0">
                      <label htmlFor="contact-email" className="text-[11px] font-bold text-slate-300 font-mono uppercase flex items-center justify-between">
                        <span>{t('contact.emailLabel')}</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        required
                        placeholder={lang === 'pl' ? 'jan@firma.pl' : 'john@company.com'}
                        value={formData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => {
                          const next = { ...formData, email: e.target.value };
                          setFormData(next);
                          if (touched.email) setErrors(validate(next));
                        }}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${
                          touched.email && errors.email ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                        } text-slate-100 text-xs focus:outline-none transition-colors max-w-full`}
                      />
                      {touched.email && errors.email && (
                        <span className="text-[11px] text-red-400 font-medium flex items-start gap-1 mt-1 leading-tight">
                          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Field 3: Temat */}
                    <div className="space-y-1 w-full min-w-0">
                      <label htmlFor="contact-subject" className="text-[11px] font-bold text-slate-300 font-mono uppercase flex items-center justify-between">
                        <span>{t('contact.subjectLabel')}</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        autoComplete="off"
                        type="text"
                        required
                        placeholder={lang === 'pl' ? 'np. Zapytanie o stronę www' : 'e.g. Website Inquiry'}
                        value={formData.subject}
                        onBlur={() => handleBlur('subject')}
                        onChange={(e) => {
                          const next = { ...formData, subject: e.target.value };
                          setFormData(next);
                          if (touched.subject) setErrors(validate(next));
                        }}
                        className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${
                          touched.subject && errors.subject ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                        } text-slate-100 text-xs focus:outline-none transition-colors max-w-full`}
                      />
                      {touched.subject && errors.subject && (
                        <span className="text-[11px] text-red-400 font-medium flex items-start gap-1 mt-1 leading-tight">
                          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span>{errors.subject}</span>
                        </span>
                      )}
                    </div>

                    {/* Field 4: Typ projektu */}
                    <div className="space-y-1 w-full min-w-0">
                      <label htmlFor="contact-category" className="text-[11px] font-bold text-slate-300 font-mono uppercase block">
                        {t('contact.categoryLabel')}
                      </label>
                      <select
                        id="contact-category"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#040814] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-blue-500 transition-colors max-w-full"
                      >
                        {PROJECT_CATEGORIES.map((category) => (
                          <option key={category.pl} value={category[lang]}>
                            {category[lang]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 5: Treść wiadomości */}
                  <div className="space-y-1 w-full min-w-0">
                    <label htmlFor="contact-message" className="text-[11px] font-bold text-slate-300 font-mono uppercase flex items-center justify-between">
                      <span>{t('contact.messageLabel')}</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder={lang === 'pl' ? 'Opisz krótko swój projekt, cele biznesowe i orientacyjny termin...' : 'Describe your project, business goals, and estimated timeline...'}
                      value={formData.message}
                      onBlur={() => handleBlur('message')}
                      onChange={(e) => {
                        const next = { ...formData, message: e.target.value };
                        setFormData(next);
                        if (touched.message) setErrors(validate(next));
                      }}
                      className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${
                        touched.message && errors.message ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                      } text-slate-100 text-xs focus:outline-none transition-colors resize-none max-w-full`}
                    />
                    {touched.message && errors.message && (
                      <span className="text-[11px] text-red-400 font-medium flex items-start gap-1 mt-1 leading-tight">
                        <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 text-xs leading-relaxed"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-3d-primary w-full py-3.5 sm:py-4 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center gap-2 group disabled:opacity-50 text-center px-4"
                    id="contact-submit-btn"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 truncate">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></span>
                        <span className="truncate">{t('contact.sendingMsg')} {CONTACT_EMAIL}...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 flex-shrink-0" />
                        <span>{t('contact.submitBtn')}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-0.5">
                    {lang === 'pl' ? (
                      <>
                        Dane z formularza wykorzystuję wyłącznie do odpowiedzi na Twoje zapytanie. Szczegóły w{' '}
                        <Link
                          to="/polityka-prywatnosci"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                          Polityce Prywatności
                        </Link>
                        .
                      </>
                    ) : (
                      <>
                        Form data is used solely to reply to your inquiry. See details in the{' '}
                        <Link
                          to="/polityka-prywatnosci"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </form>
              )}
            </AnimatePresence>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};
