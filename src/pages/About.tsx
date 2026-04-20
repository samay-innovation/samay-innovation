import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { AWARDS, FEATURED_IN } from '../lib/constants';
import SEO from '../components/seo/SEO';
import { localBusinessSchema } from '../components/seo/schemas';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};


const PHILOSOPHY = [
  {
    number: '01',
    title: 'Purposeful Space',
    description:
      'Every room is a living system — proportion, light, and material work together to support the way people inhabit a space.',
  },
  {
    number: '02',
    title: 'Honest Materials',
    description:
      'We source sustainably and let materials speak for themselves. Wood, stone, and textile retain their texture rather than being masked by ornament.',
  },
  {
    number: '03',
    title: 'Client at Centre',
    description:
      "Design emerges from listening. We immerse ourselves in a client's life before a single line is drawn, ensuring the result feels unmistakably theirs.",
  },
];

export default function About() {
  return (
    <div style={{ backgroundColor: '#fafaf8' }}>
      <SEO
        title="About Us — Seme Nadvi | Award-Winning Interior Designer Ahmedabad"
        description="Meet Seme Nadvi, founder of Samay Innovation — award-winning interior designer based in Ahmedabad, Gujarat since 2015. Recognised at Capitol Hill DC (2025), House of Commons London (2022) & India Excellence Awards (2019). Featured in Forbes, Vogue India, De-Mode & more."
        keywords="best interior designer India, best Indian interior designer, award winning interior designer India, Seme Nadvi interior designer, top interior designer India, most promising interior designer Asia, luxury interior design firm India, Forbes interior designer India, Vogue interior designer India, interior design firm Ahmedabad, award winning interior designer Gujarat, international interior designer India"
        path="/about"
        structuredData={localBusinessSchema}
      />

      {/* ── 1. HERO — full-bleed project image ── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-[#0b1012]">
        <motion.img
          src="/assets/hero/hero3.png"
          alt="Samay Innovation — Featured Project"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/85 via-black/30 to-black/20" />

        {/* Bottom-left text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 pb-14 z-10">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase text-accent-primary mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] font-light text-white leading-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            10 Years of<br />Crafted Spaces.
          </motion.h1>
        </div>

        {/* Stats — top right */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute top-24 md:top-28 right-6 sm:right-8 md:right-10 lg:right-16 xl:right-20 flex items-center gap-8 md:gap-12 z-10"
        >
          {[
            { value: '200+', label: 'Projects' },
            { value: '10+',  label: 'Years'    },
            { value: '3',    label: 'Awards'   },
          ].map((s, i) => (
            <div key={s.label} className={`text-right ${i > 0 ? 'pl-8 border-l border-white/15' : ''}`}>
              <p className="text-2xl md:text-3xl font-light text-white leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/35 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── 2. FEATURED IN ── */}
      <section className="py-8 border-b border-[#ddd8d0]" style={{ backgroundColor: '#fafaf8' }}>
        <div className="container-custom">
        <motion.div {...fadeUp} className="flex flex-wrap items-center gap-x-8 md:gap-x-14 gap-y-3">
          <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-[#0b1012]/40 shrink-0">Featured In</p>
          {FEATURED_IN.map((pub, i) => (
            <span key={pub} className="flex items-center gap-8 md:gap-14">
              <span className="text-2xl md:text-3xl font-light text-[#0b1012]/70" style={{ fontFamily: 'Georgia, serif' }}>
                {pub}
              </span>
              {i < FEATURED_IN.length - 1 && <span className="text-[#ddd8d0] text-2xl select-none">·</span>}
            </span>
          ))}
        </motion.div>
        </div>
      </section>

      {/* ── 4. FOUNDER ── */}
      <section className="py-20 md:py-28 border-t border-[#ddd8d0]" style={{ backgroundColor: '#fafaf8' }}>
        <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div {...fadeUp}>
            <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-[#0b1012]/40 mb-6">Meet the Founder</p>
            <h2
              className="text-4xl md:text-5xl font-light text-[#0b1012] leading-tight mb-10"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Seme Nadvi —<br />A Decade of Luxury Design.
            </h2>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              I am Seme Nadvi, Founder and Principal Designer of Samay Innovation — an award-winning
              luxury interior design studio and experience centre established in 2015. We specialise
              in creating refined, high-end residences, bespoke commercial environments, and turnkey
              interiors for discerning clients who value elegance, comfort, and individuality.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              Our international portfolio includes completed projects across the United States of
              America, alongside residences and commercial spaces in Alicante, Adelaide, Amman,
              Cologne, and Mexico City. For our U.S.-based clients, we offer a seamless design
              experience that combines global sophistication with practical execution — delivering
              interiors that feel timeless, elevated, and deeply personal.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              We work extensively with clients across the United States of America, delivering
              bespoke interiors for luxury residences, premium apartments, vacation homes, offices,
              clinics, restaurants, and high-end commercial spaces. Our approach is designed for
              international clients who seek a seamless, stress-free process with world-class design
              standards and exceptional attention to detail.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              At Samay Innovation, we believe luxury is not excess — it is thoughtful detail,
              intelligent planning, premium finishes, and spaces designed around the way you live.
              Whether it is a private residence, vacation home, investment property, office, clinic,
              or retail environment, every project is tailored to reflect status, lifestyle, and
              long-term value.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              Our work has been featured in Forbes, Vogue India, De-Mode, Outlook Business, and
              Zee UK, reflecting our commitment to excellence and design leadership.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-12">
              If you are based in the USA and seeking a luxury interior partner for your home or
              commercial space, I invite you to connect. Explore our work on Instagram — and as I
              always say, a warm referral goes a long way.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm text-[#0b1012] hover:gap-3 transition-all duration-200"
              >
                View Portfolio <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm text-[#0b1012]/50 hover:text-[#0b1012] hover:gap-3 transition-all duration-200"
              >
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right — founder photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/assets/images/founder/founder-photo-2.png"
                alt="Seme Nadvi — Founder, Samay Innovation"
                className="w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = '/assets/images/founder/founder-photo-2.png'; }}
              />
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ── 5. PHILOSOPHY ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#0b1012' }}>
        <div className="container-custom">
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-white/30 mb-10">Our Philosophy</p>
          <blockquote
            className="text-3xl md:text-5xl font-light italic text-white leading-snug max-w-3xl mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            "We design spaces that shape how people feel."
          </blockquote>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-white/10 pt-16">
          {PHILOSOPHY.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <p className="font-mono tracking-[0.4em] text-[10px] text-white/25 mb-5">{item.number}</p>
              <h3 className="text-xl font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {item.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ── 6. AWARDS ── */}
      <section className="py-20 md:py-28 bg-[#fafaf8]">
        <div className="container-custom">

        <motion.div {...fadeUp} className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#ddd8d0] pb-10">
          <div>
            <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-[#0b1012]/40 mb-4">Recognition</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#0b1012]" style={{ fontFamily: 'Georgia, serif' }}>
              Awards & Achievements
            </h2>
          </div>
          <p className="text-sm font-light text-[#0b1012]/45 max-w-xs leading-relaxed">
            Internationally recognised across three continents for design excellence.
          </p>
        </motion.div>

        <div className="divide-y divide-[#ddd8d0]">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group py-10 md:py-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-14 hover:bg-[#f4f1ec] transition-colors duration-500 -mx-4 px-4 md:-mx-8 md:px-8 rounded-sm"
            >
              {/* Index + Year */}
              <div className="flex-shrink-0 w-24 hidden md:block">
                <p className="font-mono text-[9px] tracking-[0.35em] text-[#0b1012]/20 mb-2">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p
                  className="text-5xl font-light leading-none group-hover:scale-105 transition-transform duration-500 origin-left"
                  style={{ fontFamily: 'Georgia, serif', color: '#b8975a' }}
                >
                  {award.year}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px self-stretch bg-[#ddd8d0] group-hover:bg-accent-primary transition-colors duration-500 flex-shrink-0" />

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="md:hidden text-4xl font-light leading-none mb-4"
                  style={{ fontFamily: 'Georgia, serif', color: '#b8975a' }}
                >
                  {award.year}
                </p>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#0b1012]/35 mb-3 flex items-center gap-2">
                  <Award size={9} className="shrink-0 text-accent-primary" />
                  {award.location}
                </p>
                <h3
                  className="text-xl md:text-2xl font-light text-[#0b1012] leading-snug mb-4 group-hover:text-accent-primary transition-colors duration-400"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {award.title}
                </h3>
                <p className="text-sm text-[#0b1012]/55 leading-relaxed max-w-xl">
                  {award.description}
                </p>
              </div>

              {/* Photo */}
              <div className="flex-shrink-0 w-full md:w-60 lg:w-72">
                {award.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${i === 0 ? 'object-top' : 'object-center'}`}
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[#ede9e3] border border-[#ddd8d0] flex flex-col items-center justify-center gap-3">
                    <Award size={28} className="text-accent-primary/40" />
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0b1012]/25">Photo Coming Soon</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          className="mt-16 pt-12 border-t border-[#ddd8d0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-2xl md:text-3xl font-light text-[#0b1012]" style={{ fontFamily: 'Georgia, serif' }}>
            Ready to transform your space?
          </p>
          <div className="flex items-center gap-10">
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-[#0b1012] hover:gap-3 transition-all duration-200">
              Get in touch <ArrowRight size={14} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-[#0b1012]/40 hover:text-[#0b1012] hover:gap-3 transition-all duration-200">
              View portfolio <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

