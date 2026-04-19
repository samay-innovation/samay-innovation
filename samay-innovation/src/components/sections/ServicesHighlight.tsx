import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    index: '01',
    title: 'Residential Interior',
    description: 'Luxury homes, villas, and apartments crafted around how you live — from concept to final finish.',
  },
  {
    index: '02',
    title: 'Commercial Design',
    description: 'Offices, showrooms, and retail environments that communicate brand identity through space.',
  },
  {
    index: '03',
    title: 'Turnkey Solutions',
    description: 'End-to-end project delivery — design, procurement, execution, and handover under one roof.',
  },
  {
    index: '04',
    title: 'Design Consultation',
    description: 'Expert direction on palette, furniture, and spatial planning for projects at any stage.',
  },
];

export default function ServicesHighlight() {
  return (
    <section className="py-24 md:py-32 bg-[#fafaf8]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16 md:mb-20 border-b border-[#ddd8d0] pb-8"
        >
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/40 block mb-3">
              What We Do
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-[#0b1012] leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Services
            </h2>
            <p className="text-sm font-light text-[#0b1012]/45 mt-3 max-w-xs leading-relaxed">
              Full-service interior design from residential to commercial.
            </p>
          </div>
          <Link
            to="/services"
            className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#0b1012]/50 hover:text-accent-primary transition-colors duration-300 group"
          >
            All Services
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-start gap-6 md:gap-10 py-7 border-b border-[#ddd8d0] hover:border-[#0b1012]/20 transition-colors duration-300"
            >
              <span className="text-[11px] font-mono tracking-widest text-[#0b1012]/25 pt-1">
                {service.index}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-light text-[#0b1012] mb-1.5 group-hover:text-accent-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-[#0b1012]/50 font-light leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="mt-1.5 text-[#0b1012]/20 group-hover:text-accent-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:hidden"
        >
          <Link
            to="/services"
            className="flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-[#0b1012]/50"
          >
            All Services <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
