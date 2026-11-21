import React from 'react';
import { useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none bg-transparent"
    >
      <m.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400 shadow-[0_0_12px_rgba(96,165,250,0.75)]"
      />
    </div>
  );
};
