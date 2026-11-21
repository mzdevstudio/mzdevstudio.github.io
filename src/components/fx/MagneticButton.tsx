import React, { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Delikatne przyciąganie przycisku do kursora na ekranach z myszką.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.22,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduce || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </m.div>
  );
};
