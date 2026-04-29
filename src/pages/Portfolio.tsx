import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import { projects, getProjectsByCategory } from '../data/projects';
import SEO from '../components/seo/SEO';
import { breadcrumbSchema } from '../components/seo/schemas';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'retail', name: 'Retail' },
];

const internationalProjects = projects.filter((p) => p.region === 'international');

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(
    projects.filter((p) => p.region !== 'international')
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setFilteredProjects(
      getProjectsByCategory(activeCategory).filter((p) => p.region !== 'international')
    );
  }, [activeCategory]);

  return (
    <div className="bg-[#fafaf8]">
      <SEO
        title="Interior Design Portfolio — Luxury Projects in Ahmedabad, Gujarat & USA"
        description="Explore Samay Innovation's award-winning interior design portfolio — luxury villas, 4BHK apartments, commercial offices & international projects across Ahmedabad, Gujarat and the USA."
        keywords="best interior design portfolio India, luxury interior design projects India, top interior design firm India, best residential interior designer India, best commercial interior designer India, luxury home design India, villa interior design India, hotel interior design India, restaurant interior design India, apartment interior design India, interior design projects Ahmedabad, luxury interior design Gujarat, international interior design projects India"
        path="/portfolio"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: 'https://samayinnovation.com/' },
          { name: 'Portfolio', url: 'https://samayinnovation.com/portfolio' },
        ])}
      />

      {/* ── Page Header ── */}
      <section className="pt-32 pb-16 border-b border-[#ddd8d0] text-center">
        <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/40 block mb-4">
            Our Work
          </span>
          <h1
            className="text-5xl md:text-7xl font-light text-[#0b1012] leading-none mb-5"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Portfolio
          </h1>
          <p className="text-base font-light text-[#0b1012]/45 max-w-md mx-auto leading-relaxed">
            1000+ spaces crafted across India and beyond — residential, commercial, and hospitality.
          </p>
        </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-0 z-40 bg-[#fafaf8]/95 backdrop-blur-md border-b border-[#ddd8d0]">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-0 px-6 min-w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-4 text-[10px] font-mono tracking-[0.35em] uppercase whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === cat.id
                    ? 'text-[#0b1012]'
                    : 'text-[#0b1012]/35 hover:text-[#0b1012]/70'
                }`}
              >
                {cat.name}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="portfolio-filter"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── India projects ── */}
      <section className="py-16">
        <div className="container-custom">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[#0b1012]/25 text-[10px] font-mono tracking-[0.4em] uppercase">
                  No projects in this category.
                </p>
              </div>
            ) : (
              <ProjectGrid projects={filteredProjects} hoveredId={hoveredId} setHoveredId={setHoveredId} />
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </section>

      {/* ── International ── */}
      <InternationalSection />
    </div>
  );
}

/* ── Project Grid — 3-col clean cards with text below ── */
interface GridProps {
  projects: (typeof projects);
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function ProjectGrid({ projects: list, hoveredId, setHoveredId }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
      {list.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectCard
            project={project}
            index={i}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Project Card — image top, text below ── */
interface CardProps {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: CardProps) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] mb-4">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
        />
        {/* Subtle dark overlay on hover only */}
        <div className={`absolute inset-0 bg-[#0b1012]/0 group-hover:bg-[#0b1012]/15 transition-colors duration-500`} />
        {/* Gold bottom line */}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-primary transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
        {/* Index number top-left */}
        <span className="absolute top-4 left-4 font-mono text-[10px] text-white/50 tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Text below image */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#0b1012]/35 mb-1.5">
            {project.category}
          </p>
          <h3
            className={`text-lg font-light leading-snug transition-colors duration-300 ${isHovered ? 'text-accent-primary' : 'text-[#0b1012]'}`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-[#0b1012]/30">
              <MapPin size={7} />{project.location}
            </span>
            <span className="text-[#0b1012]/20 text-[9px]">·</span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#0b1012]/30">{project.year}</span>
          </div>
        </div>
        <ArrowRight
          size={14}
          className={`flex-shrink-0 mt-6 transition-all duration-300 ${isHovered ? 'text-accent-primary translate-x-0.5' : 'text-[#0b1012]/20'}`}
        />
      </div>
    </Link>
  );
}

/* ── International Section ── */
function InternationalSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0b1012]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 border-b border-white/8 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={10} className="text-accent-primary" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary">Global Reach</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-white"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              International Projects
            </h2>
          </div>
          <p className="text-sm font-light text-white/30 max-w-xs leading-relaxed">
            Extending our design philosophy beyond borders — crafting spaces across India and the United States.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {internationalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className="group block relative overflow-hidden"
              >
                {/* Full-bleed image */}
                <div className="relative h-[420px] md:h-[520px] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  {/* Gradient overlay — strong at bottom for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Animated gold line on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-accent-primary"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Country badge — top left, clean and minimal */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="text-xl leading-none">{project.flag}</span>
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/60">{project.country}</span>
                  </div>

                  {/* Text — overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                    <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent-primary mb-2">
                      {project.category}
                    </p>
                    <h3
                      className="text-2xl md:text-3xl font-light text-white leading-tight mb-4 group-hover:text-accent-primary/90 transition-colors duration-500"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 font-mono text-[10px] text-white/40 tracking-widest uppercase">
                        <span className="flex items-center gap-1"><MapPin size={9} />{project.location}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-accent-primary flex items-center gap-2 transition-colors duration-300">
                        View <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
