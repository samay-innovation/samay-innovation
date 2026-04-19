import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '../data/services';
import SEO from '../components/seo/SEO';
import { servicesSchema, breadcrumbSchema } from '../components/seo/schemas';

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We begin with a detailed discussion to understand your vision, lifestyle, and budget. This forms the foundation of everything we design.',
  },
  {
    step: '02',
    title: 'Concept & Design',
    description: 'Our team develops bespoke design concepts with mood boards, material palettes, and 3D visualisations so you can see your space before we build it.',
  },
  {
    step: '03',
    title: 'Execution',
    description: 'We manage every aspect of the build — contractors, vendors, timelines, and quality checks — so you never have to worry about the details.',
  },
  {
    step: '04',
    title: 'Handover',
    description: 'We deliver your completed space on time and on budget, with a final walkthrough to ensure every detail meets our exacting standards.',
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="bg-[#fafaf8]">
      <SEO
        title="Interior Design Services — Residential, Commercial & Turnkey | Ahmedabad"
        description="Samay Innovation offers full-service interior design in Ahmedabad — residential villas & apartments, commercial offices, turnkey project management, 3D visualisation, furniture design & more."
        keywords="best interior design services India, luxury interior design services India, residential interior design India, commercial interior design India, turnkey interior solutions India, hotel interior design India, restaurant interior design India, office interior design India, 3D visualisation interior design India, furniture design India, space planning India, interior design company India, best interior designers India, top interior design studio India, interior design services Ahmedabad, residential interior design Gujarat"
        path="/services"
        structuredData={[
          servicesSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://samayinnovation.in/' },
            { name: 'Services', url: 'https://samayinnovation.in/services' },
          ]),
        ]}
      />

      {/* ── Header ── */}
      <section className="pt-32 pb-16 border-b border-[#ddd8d0] text-center">
        <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/40 block mb-4">
            What We Offer
          </span>
          <h1
            className="text-5xl md:text-7xl font-light text-[#0b1012] leading-none mb-5"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Services
          </h1>
          <p className="text-base font-light text-[#0b1012]/45 max-w-md mx-auto leading-relaxed">
            From concept to completion — every detail handled with precision and care.
          </p>
        </motion.div>
        </div>
      </section>

      {/* ── Services list ── */}
      <section className="py-8">
        <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group py-8 md:py-10 border-b border-[#ddd8d0] cursor-default transition-colors duration-300 ${
                index % 2 === 0 ? 'md:pr-12 md:border-r md:border-r-[#ddd8d0]' : 'md:pl-12'
              }`}
            >
              <div className="flex items-start justify-between gap-6 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#0b1012]/25 block mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`text-2xl md:text-3xl font-light leading-tight transition-colors duration-300 ${
                      hoveredId === service.id ? 'text-accent-primary' : 'text-[#0b1012]'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {service.name}
                  </h3>
                </div>
                <ArrowRight
                  size={16}
                  className={`flex-shrink-0 mt-8 transition-all duration-300 ${
                    hoveredId === service.id ? 'text-accent-primary translate-x-1' : 'text-[#0b1012]/20'
                  }`}
                />
              </div>

              <p className="text-sm text-[#0b1012]/55 font-light leading-relaxed mb-6 max-w-sm">
                {service.description}
              </p>

              <AnimatePresence>
                {hoveredId === service.id && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="overflow-hidden space-y-2"
                  >
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-[#0b1012]/40"
                      >
                        <Check size={10} className="text-accent-primary flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32 bg-[#0b1012]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 border-b border-white/8 pb-8 text-center"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 block mb-4">
              How We Work
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Our Process
            </h2>
            <p className="text-sm font-light text-white/35 max-w-sm mx-auto leading-relaxed">
              A structured approach that keeps your project on time, on budget, and exactly as envisioned.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`py-10 ${
                  index < process.length - 1
                    ? 'lg:border-r border-white/8 lg:pr-10 lg:mr-0'
                    : ''
                } ${index > 0 ? 'lg:pl-10' : ''} border-b lg:border-b-0 border-white/8`}
              >
                <p
                  className="text-6xl md:text-7xl font-light text-accent-primary/20 mb-6 leading-none"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {item.step}
                </p>
                <h4 className="text-xl font-light text-white mb-3">{item.title}</h4>
                <p className="text-sm text-white/40 font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-[#fafaf8] border-t border-[#ddd8d0]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 block mb-4">
              Get Started
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-[#0b1012] mb-10 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Ready to transform your space?
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012] group-hover:text-accent-primary transition-colors duration-300">
                  Start a Project
                </span>
                <div className="w-8 h-px bg-[#0b1012]/40 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
                <ArrowRight size={12} className="text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300" />
              </Link>

              <span className="text-[#0b1012]/15 hidden sm:block">·</span>

              <Link
                to="/portfolio"
                className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012]/40 hover:text-[#0b1012]/70 transition-colors duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
