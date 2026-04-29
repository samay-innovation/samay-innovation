import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
  { src: '/assets/hero/hero1.png', category: 'Residential',   label: 'Living Space'   },
  { src: '/assets/hero/hero2.png', category: 'Hospitality',   label: 'Bar & Lounge'   },
  { src: '/assets/hero/hero3.png', category: 'Commercial',    label: 'Restaurant'     },
  { src: '/assets/hero/hero4.png', category: 'International', label: 'USA Restaurant' },
  { src: '/assets/hero/hero5.png', category: 'International', label: 'USA Project'    },
  { src: '/assets/hero/hero6.png', category: 'Residential',   label: 'Villa Interior' },
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  function goTo(index: number) {
    setCurrent(index);
    setProgress(0);
    startRef.current = Date.now();
  }

  // Progress ticker
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        startRef.current = Date.now();
        setProgress(0);
      }
    };
    intervalRef.current = setInterval(tick, 30);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const next = (current + 1) % SLIDES.length;
    const img = new Image();
    img.src = SLIDES[next].src;
  }, [current]);

  useEffect(() => {
    SLIDES.slice(0, 2).forEach(({ src }) => {
      const img = new Image(); img.src = src;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const slide = SLIDES[current];

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-[#0b1012]"
    >
      {/* ── Background image with parallax ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute left-0 right-0 bg-cover bg-center"
            style={{ top: '-15%', height: '130%', backgroundImage: `url(${slide.src})`, y: bgY }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ── */}
      {/* Bottom-heavy for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/90 via-black/20 to-transparent" />
      {/* Subtle left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1012]/50 via-transparent to-transparent" />

      {/* ── Top-right: counter + category — sits below h-20 navbar ── */}
      <div className="absolute top-24 md:top-28 right-6 md:right-10 z-10 text-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-1">
              {slide.category}
            </p>
            <p className="font-mono text-[11px] text-white/25 tracking-widest">
              {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom-left: editorial text ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-16 z-10">

        {/* Slide label — changes per slide */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.45 }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase text-accent-primary mb-5"
          >
            {slide.label}
          </motion.p>
        </AnimatePresence>

        {/* Main headline — fixed, enters once */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.6rem,7vw,6rem)] font-light text-white leading-[1.05] mb-8"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Crafting Spaces<br />
          That Endure.
        </motion.h1>

        {/* Stats + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
        >
          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { value: '1000+', label: 'Projects' },
              { value: '10+',  label: 'Years'    },
              { value: '3',    label: 'Awards'   },
            ].map((s, i) => (
              <div key={s.label} className={`${i > 0 ? 'pl-8 border-l border-white/15' : ''}`}>
                <p className="text-xl font-light text-white leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                  {s.value}
                </p>
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/35 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3"
          >
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">
              View Our Work
            </span>
            <div className="w-8 h-px bg-white/25 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
            <ArrowRight size={12} className="text-white/30 group-hover:text-accent-primary transition-colors duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* ── Right-side scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-6 md:right-10 bottom-20 z-10 flex flex-col items-center gap-3 hidden md:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/25 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

      {/* ── Slide selector dots (left of progress bar) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Dot row */}
        <div className="flex items-center gap-2 px-6 md:px-14 pb-5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === current ? 'w-10 bg-accent-primary' : 'w-4 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        {/* Auto-progress bar */}
        <div className="h-px w-full bg-white/8">
          <motion.div
            className="h-full bg-accent-primary/70"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
