import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/constants';

export default function ContactCTA() {
  return (
    <section className="py-32 md:py-40 bg-[#0b1012] relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-accent-primary" />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary">
              Get In Touch
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-10"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Let's create something<br className="hidden md:block" /> beautiful together.
          </motion.h2>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-white group-hover:text-accent-primary transition-colors duration-300">
                Start a Project
              </span>
              <div className="w-8 h-px bg-white/40 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
              <ArrowRight size={12} className="text-white/40 group-hover:text-accent-primary transition-colors duration-300" />
            </Link>

            <span className="text-white/15 hidden sm:block">·</span>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-[11px] font-mono tracking-[0.35em] uppercase text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              {SITE_CONFIG.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
