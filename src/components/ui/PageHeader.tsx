import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  const letters = title.split('');

  return (
    <section className="relative h-[38vh] min-h-[260px] md:h-[44vh] md:min-h-[320px] flex items-center overflow-hidden bg-[#111111]">
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      {/* Subtle grid texture overlay */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C9A97A 1px, transparent 1px), linear-gradient(90deg, #C9A97A 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Diagonal accent line — top-right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
        className="absolute top-0 right-0 w-[35%] h-px bg-gradient-to-l from-[#C9A97A]/60 to-transparent"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        style={{ transformOrigin: 'top' }}
        className="absolute top-0 right-0 w-px h-[35%] bg-gradient-to-b from-[#C9A97A]/60 to-transparent"
      />

      {/* Bottom-left corner accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 w-[20%] h-px bg-gradient-to-r from-[#C9A97A]/40 to-transparent"
      />

      {/* Content — centered */}
      <div className="relative z-10 w-full container-custom py-8 flex flex-col items-center text-center">
        {/* Subtitle / label */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] font-light tracking-[0.4em] uppercase text-[#C9A97A] mb-5 flex items-center gap-3"
          >
            <span className="inline-block w-6 h-px bg-[#C9A97A]" />
            {subtitle}
            <span className="inline-block w-6 h-px bg-[#C9A97A]" />
          </motion.p>
        )}

        {/* Title — staggered letter reveal */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-light text-white tracking-tight uppercase leading-none flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.035, delayChildren: 0.3 } },
            }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: '100%', opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: letter === ' ' ? 'inline-block' : 'inline-block', minWidth: letter === ' ' ? '0.3em' : undefined }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Gold accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '64px' }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="h-[2px] bg-[#C9A97A] mt-5 mx-auto"
        />
      </div>
    </section>
  );
}
