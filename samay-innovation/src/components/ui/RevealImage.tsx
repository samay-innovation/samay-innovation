import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 'up' — reveal from bottom (default). 'left' — reveal from right. */
  direction?: 'up' | 'left';
}

const variants = {
  up: {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)' },
  },
  left: {
    hidden: { clipPath: 'inset(0 0 0 100%)' },
    visible: { clipPath: 'inset(0 0 0 0%)' },
  },
};

export default function RevealImage({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealImageProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants[direction]}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
