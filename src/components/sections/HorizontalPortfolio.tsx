import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

const featured = projects.filter((p) => p.featured && p.region !== 'international').slice(0, 6);

export default function HorizontalPortfolio() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#fafaf8]">
      <div className="container-custom">

        {/* ── Header ── */}
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
          <Link
            to="/portfolio"
            className="hidden md:flex items-center gap-3 group"
          >
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300">
              All Projects
            </span>
            <div className="w-6 h-px bg-[#0b1012]/20 group-hover:w-10 group-hover:bg-accent-primary transition-all duration-400" />
            <ArrowRight size={11} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
          </Link>
        </motion.div>

        {/* ── Row 1: wide hero (2/3) + tall card (1/3), equal height via grid-rows ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* Hero card — 2 cols */}
          {featured[0] && (
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ProjectCard
                project={featured[0]}
                aspectClass="aspect-[4/3] md:aspect-[3/2]"
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            </motion.div>
          )}
          {/* Right card — fills the row height */}
          {featured[1] && (
            <motion.div
              className="md:h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <ProjectCard
                project={featured[1]}
                aspectClass="aspect-[4/3] md:h-full"
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                fillHeight
              />
            </motion.div>
          )}
        </div>

        {/* ── Row 2: 4 equal cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featured.slice(2, 6).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ProjectCard
                project={project}
                aspectClass="aspect-[4/3]"
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Mobile CTA ── */}
        <div className="mt-10 md:hidden">
          <Link to="/portfolio" className="group flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#0b1012]/50 group-hover:text-accent-primary transition-colors duration-300">
              View All Projects
            </span>
            <div className="w-6 h-px bg-[#0b1012]/20 group-hover:w-10 group-hover:bg-accent-primary transition-all duration-400" />
            <ArrowRight size={11} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface CardProps {
  project: typeof featured[0];
  aspectClass: string;
  fillHeight?: boolean;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function ProjectCard({ project, aspectClass, fillHeight = false, hoveredId, setHoveredId }: CardProps) {
  const isHovered = hoveredId === project.id;

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group block relative overflow-hidden ${fillHeight ? 'h-full' : ''}`}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className={`relative overflow-hidden w-full ${fillHeight ? 'h-full min-h-[260px]' : aspectClass}`}>
        <img
          src={project.images[0]}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/80 via-black/10 to-transparent" />

        {/* Gold line on hover */}
        <div
          className={`absolute bottom-0 left-0 h-[2px] bg-accent-primary transition-all duration-500 ease-out ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/60 bg-black/30 backdrop-blur-sm px-2 py-1">
            {project.category}
          </span>
        </div>

        {/* Text — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3
            className={`font-light text-white leading-tight transition-colors duration-300 text-lg md:text-xl ${
              isHovered ? 'text-accent-primary/90' : ''
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-white/40">
              <MapPin size={8} />
              {project.location}
            </span>
            <span className="text-white/20 text-[9px]">·</span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/40">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
