import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Review } from '../../lib/supabase';

const FALLBACK = [
  {
    id: 'f1', name: 'Sadhna Shah', role: 'Homeowner', rating: 5,
    review: 'I am glad that I have come across you and have your recommendation from one of my friends. What I want for my house is what you actually give in return. A big thank you for letting my dream come true. Kudos to Samay Innovation!',
    project: 'Residential Interior',
  },
  {
    id: 'f2', name: 'Ashwin Shukla', role: 'Homeowner', rating: 5,
    review: "We breathe relaxed in our home because we have perfect interior designing, perfect color combination, and everything is just perfect as we dreamt. I don't have words to express my gratitude to Samay Innovation!",
    project: 'Home Interior',
  },
  {
    id: 'f3', name: 'Amit Shah', role: 'Business Owner', rating: 5,
    review: 'Technically what we want is almost impossible within the space we have, but Seme Nadvi makes it happen for us! My employees and I are very happy to have such an amazing, comfortable, and relaxing working space.',
    project: 'Office Interior',
  },
  {
    id: 'f4', name: 'Amit Agrawal', role: 'Client', rating: 5,
    review: 'Samay Innovations has performed and delivered for us in an efficient and professional fashion. The design talent is exceptional and has given us unique designs and interior design as we want.',
    project: 'Interior Design',
  },
];

type T = { id: string; name: string; role: string | null; review: string; project: string | null; rating: number };

function toT(r: Review): T {
  return { id: r.id, name: r.name, role: r.role, review: r.review, project: r.project, rating: r.rating };
}

export default function Testimonials() {
  const [list, setList] = useState<T[]>(FALLBACK);
  const [idx, setIdx]   = useState(0);
  const [dir, setDir]   = useState(1);

  useEffect(() => {
    supabase.from('reviews').select('*').eq('approved', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) { setList((data as Review[]).map(toT)); setIdx(0); } });
  }, []);

  function go(next: number) {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  }
  const prev = () => go((idx - 1 + list.length) % list.length);
  const next = () => go((idx + 1) % list.length);
  const t = list[idx];

  return (
    <section className="relative py-24 md:py-36 bg-[#0b1012] overflow-hidden">

      {/* Large decorative quote mark */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(160px, 20vw, 280px)',
          lineHeight: 1,
          color: 'rgba(201,169,122,0.04)',
          fontWeight: 700,
        }}
      >
        &ldquo;
      </div>

      <div className="relative z-10 container-custom">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pb-10 border-b border-white/8"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 block mb-3">
            Client Reviews
          </span>
          <h2
            className="text-4xl md:text-5xl font-light text-white"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Quote area */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop side arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/15 hover:text-accent-primary transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={20} strokeWidth={1} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-white/15 hover:text-accent-primary transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight size={20} strokeWidth={1} />
          </button>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={t.id}
              custom={dir}
              initial={{ opacity: 0, y: dir * 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1.5 mb-10">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`w-3 h-3 ${s <= t.rating ? 'text-accent-primary' : 'text-white/10'}`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/70 text-xl sm:text-2xl md:text-3xl font-light leading-relaxed tracking-wide mb-12 md:mb-14"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {t.review}
              </p>

              {/* Gold accent line */}
              <div className="w-12 h-px bg-accent-primary/60 mx-auto mb-8" />

              {/* Client info */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-1">
                  <span className="text-accent-primary text-sm font-light tracking-wide">{t.name.charAt(0)}</span>
                </div>
                <p className="text-white text-sm font-light tracking-[0.15em]">{t.name}</p>
                {t.role && (
                  <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase">{t.role}</p>
                )}
                {t.project && (
                  <p className="text-accent-primary/50 text-[10px] tracking-[0.25em] uppercase mt-1">{t.project}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-center gap-5 mt-14 md:mt-16">
          <button
            onClick={prev}
            className="md:hidden text-white/20 hover:text-accent-primary transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={18} strokeWidth={1} />
          </button>

          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all duration-400 rounded-full ${
                  i === idx
                    ? 'w-8 h-[2px] bg-accent-primary'
                    : 'w-[6px] h-[6px] bg-white/15 hover:bg-white/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="md:hidden text-white/20 hover:text-accent-primary transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight size={18} strokeWidth={1} />
          </button>
        </div>

      </div>
    </section>
  );
}
