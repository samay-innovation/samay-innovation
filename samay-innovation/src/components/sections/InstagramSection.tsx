import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Grid3X3, ExternalLink } from 'lucide-react';
import { instagramPosts, type InstagramPost as IPost } from '../../data/instagramPosts';

function IgIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const INSTAGRAM_URL = 'https://www.instagram.com/samayinnovation/';

export default function InstagramSection() {
  const posts = instagramPosts.slice(0, 9);
  const [activeReel, setActiveReel] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeReel ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeReel]);

  return (
    <section className="py-24 md:py-32 bg-[#fafaf8]">
      <div className="container-custom">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/35 block mb-3">
            Follow Our Journey
          </span>
          <div className="flex items-end justify-between pb-8 border-b border-[#ddd8d0]">
            <h2
              className="text-4xl md:text-5xl font-light text-[#0b1012]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Instagram
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 group"
            >
              <IgIcon size={13} className="text-[#0b1012]/35 group-hover:text-accent-primary transition-colors duration-300" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300">
                @samayinnovation
              </span>
              <ExternalLink size={10} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
            </a>
          </div>
        </motion.div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 pb-10 border-b border-[#ddd8d0]">

            {/* Avatar — logo in circle */}
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-[#0b1012] border border-[#ddd8d0] flex items-center justify-center">
                <img
                  src="/logo/logo.png"
                  alt="Samay Innovation"
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
            </div>

            {/* Profile info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <h3 className="text-lg font-light text-[#0b1012] tracking-wide">samayinnovation</h3>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 border border-[#0b1012]/20 text-[#0b1012]/60 hover:border-accent-primary hover:text-accent-primary transition-colors duration-300"
                >
                  Follow
                </a>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 mb-4">
                {[
                  { value: posts.length.toString(), label: 'posts' },
                  { value: '31.4K', label: 'followers' },
                  { value: '412', label: 'following' },
                ].map((s, i) => (
                  <div key={s.label} className={`${i > 0 ? '' : ''}`}>
                    <span
                      className="text-sm font-light text-[#0b1012] mr-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {s.value}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#0b1012]/40">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <p className="text-sm text-[#0b1012]/70 leading-relaxed max-w-sm">
                Interior Design Studio · Ahmedabad
                <br />
                <span className="text-[#0b1012]/45 text-[12px]">Residential · Commercial · Hospitality</span>
                <br />
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:underline font-mono text-[11px] tracking-wide"
                >
                  samayinnovation.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Grid tab header (like IG's Posts / Reels tabs) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-8 mb-4"
        >
          <div className="flex items-center gap-2 pb-3 border-b-2 border-[#0b1012]">
            <Grid3X3 size={13} className="text-[#0b1012]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0b1012]">
              Reels
            </span>
          </div>
        </motion.div>

        {/* ── Posts grid ── */}
        <div className="grid grid-cols-3 gap-1 md:gap-1.5">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostCell post={post} onPlayReel={setActiveReel} />
            </motion.div>
          ))}
        </div>

        {/* ── Load more / view on IG ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-3 border border-[#0b1012]/15 hover:border-accent-primary transition-colors duration-300"
          >
            <IgIcon size={12} className="text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#0b1012]/50 group-hover:text-accent-primary transition-colors duration-300">
              View More on Instagram
            </span>
            <ExternalLink size={10} className="text-[#0b1012]/25 group-hover:text-accent-primary transition-colors duration-300" />
          </a>
        </motion.div>

      </div>

      {/* ── Reel lightbox ── */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActiveReel(null)}
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-5 right-5 w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors z-10"
            >
              <X size={18} className="text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm aspect-[9/16] bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.instagram.com/${activeReel}/embed/`}
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Single post cell ─────────────────────────────────────────────────────────

function PostCell({ post, onPlayReel }: { post: IPost; onPlayReel: (id: string) => void }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.97 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
      }}
      className="group relative aspect-square overflow-hidden cursor-pointer bg-[#ddd8d0]"
      onClick={() => {
        if (post.type === 'reel' && post.embedPath) {
          onPlayReel(post.embedPath);
        } else {
          window.open(post.postUrl, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <img
        src={post.image}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        loading="lazy"
      />

      {/* Reel badge */}
      {post.type === 'reel' && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 py-0.5">
          <Play size={8} className="text-white fill-white" />
          <span className="font-mono text-[8px] tracking-widest uppercase text-white/80">Reel</span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#0b1012]/0 group-hover:bg-[#0b1012]/60 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play size={14} className="text-white fill-white ml-0.5" />
        </div>
        <p className="text-white/80 text-[10px] text-center leading-relaxed font-light line-clamp-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {post.caption}
        </p>
      </div>
    </motion.div>
  );
}
