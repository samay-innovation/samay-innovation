import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getBlogBySlug, blogs } from '../data/blogs';
import SEO from '../components/seo/SEO';

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const blog = getBlogBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-light text-[#0b1012] mb-4">Article Not Found</p>
          <Link to="/blogs" className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#0b1012]/50 hover:text-accent-primary transition-colors">
            ← Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const relatedBlogs = blogs.filter((_, index) => index !== currentIndex).slice(0, 3);

  return (
    <div className="bg-[#fafaf8]">
      <SEO
        title={blog.title}
        description={blog.excerpt.slice(0, 155)}
        path={`/blogs/${blog.slug}`}
        image={blog.image}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.excerpt.slice(0, 155),
          image: blog.image,
          datePublished: blog.date,
          author: { '@type': 'Person', name: blog.author },
          publisher: { '@type': 'Organization', name: 'Samay Innovation', url: 'https://samayinnovation.com' },
          url: `https://samayinnovation.com/blogs/${blog.slug}`,
          keywords: blog.tags.join(', '),
        }}
      />

      {/* ── Hero ── */}
      <section className="relative h-[65vh] md:h-[75vh] overflow-hidden bg-[#0b1012]">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1012]/95 via-black/30 to-black/10" />

        {/* Back */}
        <Link
          to="/blogs"
          className="absolute top-24 left-6 md:top-28 md:left-10 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-300 z-10"
        >
          <ArrowLeft size={12} />
          Journal
        </Link>

        {/* Content */}
        <div className="absolute bottom-10 left-6 right-6 md:bottom-14 md:left-14 md:right-14 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-primary mb-4">
              {blog.category}
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-white/40 text-[10px] font-mono tracking-widest uppercase">
              <span className="flex items-center gap-1.5">
                <Calendar size={9} strokeWidth={1.5} />
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock size={9} strokeWidth={1.5} />
                {blog.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article content ── */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[#fafaf8]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="prose-custom"
          >
            <div
              className="text-[#0b1012]/75 font-light leading-relaxed text-base [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-[#0b1012] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-serif [&_h3]:text-xl [&_h3]:font-light [&_h3]:text-[#0b1012] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 [&_p]:leading-relaxed [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-[#0b1012]/70 [&_strong]:text-[#0b1012] [&_strong]:font-normal [&_blockquote]:border-l-2 [&_blockquote]:border-accent-primary [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:text-[#0b1012]/60 [&_blockquote]:italic"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 pt-10 border-t border-[#ddd8d0]"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <Tag size={12} strokeWidth={1.5} className="text-[#0b1012]/30" />
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-[#ddd8d0] font-mono text-[9px] tracking-widest uppercase text-[#0b1012]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Related articles ── */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 md:py-28 bg-[#0b1012]">
          <div className="px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 border-b border-white/8 pb-8"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 block mb-3">
                Continue Reading
              </span>
              <h2
                className="text-3xl md:text-4xl font-light text-white"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Related Articles
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {relatedBlogs.map((rb, index) => (
                <motion.article
                  key={rb.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group ${index < relatedBlogs.length - 1 ? 'md:border-r border-white/8 md:pr-8' : ''} ${index > 0 ? 'md:pl-8' : ''} border-b md:border-b-0 border-white/8 pb-8 md:pb-0`}
                >
                  <Link to={`/blogs/${rb.slug}`} className="block">
                    <div className="relative overflow-hidden aspect-[16/10] mb-6">
                      <img
                        src={rb.image}
                        alt={rb.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-400" />
                    </div>
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-accent-primary mb-3">
                      {rb.category}
                    </p>
                    <h3
                      className="text-lg font-light text-white leading-snug mb-3 group-hover:text-accent-primary transition-colors duration-300"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {rb.title}
                    </h3>
                    <p className="text-sm font-light text-white/40 line-clamp-2 mb-5">
                      {rb.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/30 group-hover:text-accent-primary transition-colors duration-300">
                        Read
                      </span>
                      <ArrowRight size={11} className="text-white/25 group-hover:text-accent-primary transition-colors duration-300" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
