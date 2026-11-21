import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  maxWidthClass?: string;
}

/**
 * Dostępny modal z:
 * - focus trap (klawiatura nie ucieka z okna),
 * - zamknięciem klawiszem Escape i kliknięciem tła,
 * - zablokowaniem scrolla tła,
 * - role="dialog" + aria-modal + aria-labelledby.
 */
export const Modal: React.FC<ModalProps> = ({ open, onClose, children, labelledBy, maxWidthClass = 'max-w-2xl' }) => {
  const { lang } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const closeLabel = lang === 'pl' ? 'Zamknij okno (Esc)' : 'Close dialog (Esc)';

  // Focus trap + Escape + blokada scrolla
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Fokus na pierwszym elemencie po otwarciu
    const focusTimer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 50);

    // Przywróć fokus do elementu, który otworzył modal
    const previouslyFocused = document.activeElement as HTMLElement | null;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseRef.current();
          }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-[#040814]/82 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
        >
          <m.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${maxWidthClass} bg-[#070E21] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 my-8`}
          >
            {/* Close Button */}
            <button
              onClick={() => onCloseRef.current()}
              aria-label={closeLabel}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};
