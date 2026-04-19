import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'p',
}: RevealTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
