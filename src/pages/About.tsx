import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { AWARDS, FEATURED_IN } from '../lib/constants';
import { projects } from '../data/projects';
import SEO from '../components/seo/SEO';
import { localBusinessSchema } from '../components/seo/schemas';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

// Pull 4 featured projects for the gallery
const showcaseProjects = projects.filter((p) => p.featured && p.region !== 'international').slice(0, 4);

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
              Seme Nadvi —<br />A Decade of Design.
            </h2>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              I am Seme Nadvi, founder and principal designer at Samay Innovation — an award-winning
              interior design studio and experience centre based in Ahmedabad, Gujarat, established in
              2015. Over the past decade, I have built the studio on a single belief: that truly
              exceptional interiors are born from listening, not just drawing.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              Our work spans continents — with completed projects in Alicante (Spain), Adelaide
              (Australia), Amman (Jordan), Cologne (Germany), and Mexico City, alongside turnkey
              residential and commercial projects across the United States and India. Every space,
              regardless of geography, carries the same intention: refined, purposeful, and
              unmistakably personal.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-5">
              The studio's work has been featured in Forbes, Vogue India, De-Mode (an Indo-Italian
              design magazine), Outlook Business, and Zee UK, among others. I have also had the
              privilege of serving on a panel for Women's Day on Zee News Channel, speaking on
              design, entrepreneurship, and creative leadership.
            </p>
            <p className="text-base text-[#0b1012]/70 leading-relaxed mb-12">
              You can explore more of my work on Instagram — and as I always say, a warm referral
              goes a long way.
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
                src="/assets/images/founder/founder-photo.png"
                alt="Seme Nadvi — Founder, Samay Innovation"
                className="w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = '/assets/images/founder/founder-photo.png'; }}
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
      <section className="py-20 md:py-28" style={{ backgroundColor: '#fafaf8' }}>
        <div className="container-custom">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-[#0b1012]/40 mb-6">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-light text-[#0b1012]" style={{ fontFamily: 'Georgia, serif' }}>
            Awards & Achievements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`pt-10 pb-12 border-t border-[#ddd8d0] ${i === 0 ? 'md:pr-12' : 'md:pl-12 md:border-l'}`}
            >
              {award.image && (
                <div className="aspect-[4/3] overflow-hidden mb-8">
                  <img src={award.image} alt={award.title} className="w-full h-full object-cover object-center" />
                </div>
              )}
              <p className="text-6xl md:text-7xl font-light mb-6 leading-none" style={{ fontFamily: 'Georgia, serif', color: '#b8975a' }}>
                {award.year}
              </p>
              <p className="font-mono tracking-[0.4em] uppercase text-[10px] text-[#0b1012]/40 mb-3 flex items-center gap-2">
                <Award size={10} className="shrink-0" />{award.location}
              </p>
              <h3 className="text-xl md:text-2xl font-light text-[#0b1012] leading-snug mb-5" style={{ fontFamily: 'Georgia, serif' }}>
                {award.title}
              </h3>
              <p className="text-sm text-[#0b1012]/60 leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          className="mt-20 pt-12 border-t border-[#ddd8d0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-2xl md:text-3xl font-light text-[#0b1012]" style={{ fontFamily: 'Georgia, serif' }}>
            Ready to transform your space?
          </p>
          <div className="flex items-center gap-10">
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-[#0b1012] hover:gap-3 transition-all duration-200">
              Get in touch <ArrowRight size={14} />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-[#0b1012]/50 hover:text-[#0b1012] hover:gap-3 transition-all duration-200">
              View portfolio <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

