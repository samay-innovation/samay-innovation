import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'link' | 'image' | 'drag';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring follows with spring lag — gives the "chasing" luxury feel
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest('a, button, [data-cursor]') as HTMLElement | null;
      if (!el) { setCursorState('default'); return; }

      const type = el.dataset.cursor as CursorState | undefined;
      if (type) { setCursorState(type); return; }

      // Detect if it's an image link / portfolio card
      if (el.closest('[data-cursor-image]') || target.tagName === 'IMG') {
        setCursorState('image');
      } else {
        setCursorState('link');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY, isVisible]);

  const ringSize = cursorState === 'image' ? 72 : cursorState === 'drag' ? 64 : 36;
  const dotSize = cursorState === 'link' || cursorState === 'image' ? 0 : 5;
  const label = cursorState === 'image' ? 'VIEW' : cursorState === 'drag' ? 'DRAG' : '';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] hidden md:block"
      style={{ cursor: 'none' }}
    >
      {/* Dot */}
      <motion.div
        className="absolute rounded-full bg-[#C9A97A]"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0, scale: dotSize === 0 ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="absolute rounded-full border border-[#C9A97A] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? (cursorState === 'default' ? 0.5 : 1) : 0,
          scale: 1,
          backgroundColor: cursorState === 'image' ? 'rgba(201,169,122,0.12)' : 'transparent',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-light tracking-[0.2em] text-[#C9A97A] uppercase select-none"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
