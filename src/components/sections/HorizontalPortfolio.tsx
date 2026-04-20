import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

const featured = projects.filter((p) => p.featured).slice(0, 6);

export default function HorizontalPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.children[index] as HTMLElement;
    if (!card) return;
    const offset = card.offsetLeft - slider.offsetLeft;
    slider.scrollTo({ left: offset, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(featured.length - 1, activeIndex + 1));

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = (slider.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const idx = Math.round(slider.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.max(0, Math.min(idx, featured.length - 1)));
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#fafaf8]">

      {/* ── Header ── */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 pb-8 border-b border-[#ddd8d0]"
        >
          <div>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 block mb-3">
              Selected Work
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-[#0b1012] leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Featured Projects
            </h2>
          </div>

          {/* Desktop nav arrows + CTA */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                className="w-9 h-9 border border-[#ddd8d0] flex items-center justify-center hover:border-accent-primary hover:text-accent-primary disabled:opacity-20 transition-all duration-200"
                aria-label="Previous"
              >
                <ArrowLeft size={13} />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === featured.length - 1}
                className="w-9 h-9 border border-[#ddd8d0] flex items-center justify-center hover:border-accent-primary hover:text-accent-primary disabled:opacity-20 transition-all duration-200"
                aria-label="Next"
              >
                <ArrowRight size={13} />
              </button>
            </div>
            <Link to="/portfolio" className="flex items-center gap-3 group">
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300">
                All Projects
              </span>
              <div className="w-6 h-px bg-[#0b1012]/20 group-hover:w-10 group-hover:bg-accent-primary transition-all duration-400" />
              <ArrowRight size={11} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Slider (all breakpoints) ── */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-16 pb-2"
        style={{ scrollPaddingLeft: '1.5rem' }}
      >
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            className="snap-start flex-shrink-0 w-[78vw] sm:w-[55vw] md:w-[32vw] lg:w-[28vw]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              to={`/portfolio/${project.slug}`}
              className="block group relative overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/85 via-black/20 to-transparent" />

                {/* Gold hover line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-accent-primary w-0 group-hover:w-full transition-all duration-500 ease-out" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/60 bg-black/30 backdrop-blur-sm px-2 py-1">
                    {project.category}
                  </span>
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="font-light text-white text-xl leading-snug mb-2 group-hover:text-accent-primary/90 transition-colors duration-300"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin size={8} className="text-white/40 shrink-0" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white/40 truncate">
                      {project.location}
                    </span>
                    <span className="text-white/20 text-[9px] shrink-0">·</span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white/40 shrink-0">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Dot indicators + mobile CTA ── */}
      <div className="mt-6 px-6 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-px transition-all duration-400 ${
                i === activeIndex ? 'w-8 bg-accent-primary' : 'w-3 bg-[#0b1012]/20 hover:bg-[#0b1012]/40'
              }`}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <Link to="/portfolio" className="md:hidden group flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#0b1012]/50 group-hover:text-accent-primary transition-colors duration-300">
            View All
          </span>
          <ArrowRight size={11} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
        </Link>
      </div>

    </section>
  );
}
