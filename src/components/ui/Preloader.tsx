import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-white dark:bg-dark-bg-primary flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <img
                src="/logo/logo.svg"
                alt="Samay Innovation"
                className="h-20 w-auto mx-auto mb-4 brightness-0"
                onError={(e) => {
                  e.currentTarget.src = '/logo/logo.png';
                }}
              />
              <h1 className="text-2xl font-light tracking-[0.2em] uppercase text-text-primary dark:text-dark-text-primary">
                SAMAY INNOVATION
              </h1>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 h-0.5 bg-border-light dark:bg-border-dark mx-auto overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/3 bg-accent-primary"
              />
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-xs font-light tracking-[0.3em] uppercase text-text-tertiary dark:text-dark-text-tertiary"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
