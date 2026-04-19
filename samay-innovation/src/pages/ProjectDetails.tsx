import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Maximize2, X, ChevronLeft, ChevronRight, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { getProjectBySlug, projects } from '../data/projects';
import SEO from '../components/seo/SEO';
import { breadcrumbSchema, projectSchema } from '../components/seo/schemas';

/** Returns lg: col-span so the last row always fills the 6-column grid. */
function getColSpan(index: number, total: number): string {
  const remainder = total % 3;
  if (remainder === 0) return 'lg:col-span-2';
  const lastRowStart = total - remainder;
  if (index < lastRowStart) return 'lg:col-span-2';
  if (remainder === 1) return 'lg:col-span-6'; // single leftover → full width
  return 'lg:col-span-3';                      // two leftovers → half each
}

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-light text-[#0b1012] mb-4">Project Not Found</p>
          <Link to="/portfolio" className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#0b1012]/50 hover:text-accent-primary transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="bg-[#fafaf8]">
      <SEO
        title={`${project.title} — Interior Design Project | Samay Innovation Ahmedabad`}
        description={`${project.description.slice(0, 155)}…`}
        keywords={`${project.tags.join(', ')}, interior design ${project.location}, luxury interior Ahmedabad, Samay Innovation portfolio`}
        path={`/portfolio/${project.slug}`}
        image={project.thumbnail}
        structuredData={[
          projectSchema(project),
          breadcrumbSchema([
            { name: 'Home', url: 'https://samayinnovation.in/' },
            { name: 'Portfolio', url: 'https://samayinnovation.in/portfolio' },
            { name: project.title, url: `https://samayinnovation.in/portfolio/${project.slug}` },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden bg-[#0b1012]">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/90 via-black/30 to-black/20" />

        {/* Back */}
        <Link
          to="/portfolio"
          className="absolute top-24 left-6 md:top-28 md:left-10 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-300 z-10"
        >
          <ArrowLeft size={12} />
          Portfolio
        </Link>

        {/* Bottom content */}
        <div className="absolute bottom-10 left-6 right-6 md:bottom-14 md:left-14 md:right-14">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary mb-3">
              {project.flag ? `${project.flag} ` : ''}{project.category}
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-tight mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/40 text-[10px] font-mono tracking-widest uppercase">
              <span className="flex items-center gap-1.5"><MapPin size={9} />{project.location}</span>
              <span>·</span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.size}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section className="bg-[#fafaf8] border-b border-[#ddd8d0]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#ddd8d0]">
          {[
            { label: 'Category', value: project.category },
            { label: 'Location', value: project.location },
            { label: 'Year', value: String(project.year) },
            { label: 'Size', value: project.size },
          ].map((item) => (
            <div key={item.label} className="px-6 md:px-10 py-6">
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 mb-1">{item.label}</p>
              <p className="text-sm font-light text-[#0b1012] capitalize">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-16 md:py-24 px-6 md:px-14 lg:px-24 bg-[#fafaf8]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 mb-6">Overview</p>
            <p
              className="text-xl md:text-2xl font-light text-[#0b1012] leading-relaxed mb-10"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {project.description}
            </p>

            {project.challenges && (
              <div className="mb-8 pl-5 border-l border-accent-primary/40">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#0b1012]/35 mb-2">Challenges</p>
                <p className="text-sm text-[#0b1012]/60 font-light leading-relaxed">{project.challenges}</p>
              </div>
            )}

            {project.solutions && (
              <div className="pl-5 border-l border-accent-primary">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#0b1012]/35 mb-2">Solutions</p>
                <p className="text-sm text-[#0b1012]/60 font-light leading-relaxed">{project.solutions}</p>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-[#ddd8d0] text-[10px] font-mono tracking-widest uppercase text-[#0b1012]/40">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Video ── */}
      {project.videoUrl && (
        <VideoSection videoUrl={project.videoUrl} projectTitle={project.title} />
      )}

      {/* ── Gallery ── */}
      <section className="py-10 md:py-16 bg-[#fafaf8]">
        <div className="px-6 md:px-14">
          <div className="flex items-center justify-between mb-8 border-b border-[#ddd8d0] pb-6">
            <div>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 mb-1">Gallery</p>
              <h2 className="text-2xl md:text-3xl font-light text-[#0b1012]" style={{ fontFamily: 'Georgia, serif' }}>
                Project Images
              </h2>
            </div>
            <p className="text-[10px] font-mono text-[#0b1012]/30 tracking-widest">
              {project.images.length} photos
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
                className={`${getColSpan(index, project.images.length)} aspect-[4/3] group relative overflow-hidden cursor-pointer`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} — ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 border border-white/50 flex items-center justify-center">
                    <Maximize2 size={14} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm px-2 py-0.5 text-white/60 text-[9px] font-mono tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            images={project.images}
            currentIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={() => setSelectedImage((selectedImage + 1) % project.images.length)}
            onPrev={() => setSelectedImage((selectedImage - 1 + project.images.length) % project.images.length)}
          />
        )}
      </AnimatePresence>

      {/* ── Next Project ── */}
      <section className="bg-[#0b1012]">
        <Link
          to={`/portfolio/${nextProject.slug}`}
          className="group relative block h-[280px] sm:h-[380px] md:h-[520px] overflow-hidden"
        >
          <img
            src={nextProject.thumbnail}
            alt={nextProject.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/90 via-black/30 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-accent-primary"
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary mb-3">Next Project</p>
            <h4
              className="text-2xl md:text-4xl font-light text-white mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {nextProject.title}
            </h4>
            <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 group-hover:text-accent-primary transition-colors duration-300">
              View Project <ArrowRight size={11} />
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}

// ─── Video Section ────────────────────────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function VideoSection({ videoUrl, projectTitle }: { videoUrl: string; projectTitle: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractYouTubeId(videoUrl);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;

  return (
    <section className="py-16 md:py-24 bg-[#0b1012]">
      <div className="px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 border-b border-white/8 pb-8"
        >
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary mb-2">Video Tour</p>
          <h2 className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Experience the Space
          </h2>
        </motion.div>

        <div className="relative aspect-video bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <img src={thumbnailUrl} alt={`${projectTitle} video`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute w-36 h-36 rounded-full border border-accent-primary/40"
                  />
                  <div className="relative w-16 h-16 border border-white/30 rounded-full flex items-center justify-center group-hover:border-accent-primary group-hover:bg-accent-primary/20 transition-all duration-300">
                    <Play size={22} className="text-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent-primary mb-1">Client Walkthrough</p>
                  <p className="text-white text-xl font-light">{projectTitle}</p>
                </div>
              </motion.div>
            ) : (
              <motion.iframe
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={embedUrl}
                title={`${projectTitle} — Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex justify-end">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 hover:text-accent-primary transition-colors duration-300"
          >
            Watch on YouTube <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors z-10"
      >
        <X size={18} className="text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-6 w-10 h-10 border border-white/20 items-center justify-center hover:border-white/60 transition-colors z-10"
      >
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-6 w-10 h-10 border border-white/20 items-center justify-center hover:border-white/60 transition-colors z-10"
      >
        <ChevronRight size={20} className="text-white" />
      </button>

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="max-w-[92vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 md:hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onPrev} className="w-10 h-10 border border-white/20 flex items-center justify-center">
          <ChevronLeft size={18} className="text-white" />
        </button>
        <span className="text-white/50 text-[10px] font-mono tracking-widest">
          {currentIndex + 1} / {images.length}
        </span>
        <button onClick={onNext} className="w-10 h-10 border border-white/20 flex items-center justify-center">
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-mono tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}
