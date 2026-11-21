import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: 'blue' | 'amber';
  children: React.ReactNode;
}

/**
 * Karta architektoniczna ze światłem podążającym za kursorem (bez re-renderów Reacta).
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  accent = 'blue',
  className = '',
  style,
  children,
  onPointerMove,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  };

  const accentVars =
    accent === 'amber'
      ? {
          '--spot-border': 'rgba(245, 158, 11, 0.52)',
          '--spot-fill': 'rgba(245, 158, 11, 0.1)',
        }
      : {
          '--spot-border': 'rgba(96, 165, 250, 0.5)',
          '--spot-fill': 'rgba(59, 130, 246, 0.11)',
        };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      style={{ ...accentVars, ...style } as React.CSSProperties}
      className={`spotlight-surface ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
