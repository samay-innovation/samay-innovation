import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogs } from '../data/blogs';
import SEO from '../components/seo/SEO';

const categories = ['all', 'Trends', 'Lifestyle', 'Sustainability', 'Design Tips', 'Space Planning', 'Budget Design'];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="bg-[#fafaf8]">
      <SEO
        title="Interior Design Blog — Trends, Tips & Inspiration | Samay Innovation"
        description="Explore interior design insights, trends, and inspiration from Samay Innovation's expert team. Articles on luxury residential design, space planning, sustainable interiors, and design tips for homes in Ahmedabad and beyond."
        keywords="interior design blog India, best interior design ideas India, luxury home decor India, interior design trends India, modern interior design India, sustainable interior design India, space planning tips India, home renovation ideas India, residential interior design tips India, commercial interior design India, interior design inspiration India, luxury living ideas India, interior design tips Ahmedabad"
        path="/blogs"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Samay Innovation Journal',
          url: 'https://samayinnovation.com/blogs',
          description: 'Interior design insights, trends, and inspiration from Samay Innovation.',
          publisher: { '@type': 'Organization', name: 'Samay Innovation', url: 'https://samayinnovation.com' },
          blogPost: blogs.slice(0, 10).map((b) => ({
            '@type': 'BlogPosting',
            headline: b.title,
            url: `https://samayinnovation.com/blogs/${b.slug}`,
            image: b.image,
            datePublished: b.date,
            author: { '@type': 'Person', name: b.author },
          })),
        }}
      />

      {/* ── Header ── */}
      <section className="pt-32 pb-16 border-b border-[#ddd8d0] text-center">
        <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#0b1012]/40 block mb-4">
            Insights & Inspiration
          </span>
          <h1
            className="text-5xl md:text-7xl font-light text-[#0b1012] leading-none mb-5"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Journal
          </h1>
          <p className="text-base font-light text-[#0b1012]/45 max-w-sm mx-auto leading-relaxed">
            Design thinking, material stories, and spatial ideas from our studio.
          </p>
        </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-0 z-40 bg-[#fafaf8]/95 backdrop-blur-md border-b border-[#ddd8d0]">
        <div className="container-custom py-4 flex items-center gap-8 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex-shrink-0 text-[10px] font-mono tracking-[0.35em] uppercase pb-1 transition-colors duration-300 ${
                activeCategory === cat
                  ? 'text-[#0b1012]'
                  : 'text-[#0b1012]/35 hover:text-[#0b1012]/70'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="blog-filter-line"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blog grid ── */}
      <section className="py-16">
        <div className="container-custom">
        {filteredBlogs.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-sm font-light text-[#0b1012]/40">No articles in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35) }}
                className={`group border-b border-[#ddd8d0] ${
                  index % 3 !== 2 ? 'md:border-r md:border-r-[#ddd8d0]' : ''
                }`}
              >
                <Link to={`/blogs/${blog.slug}`} className="block">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#fafaf8]/90 backdrop-blur-sm font-mono text-[9px] tracking-[0.35em] uppercase text-[#0b1012]/70">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Meta */}
                    <div className="flex items-center gap-5 mb-4">
                      <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#0b1012]/35">
                        <Calendar size={9} strokeWidth={1.5} />
                        {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#0b1012]/35">
                        <Clock size={9} strokeWidth={1.5} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-light leading-snug mb-3 transition-colors duration-300 ${
                        'text-[#0b1012] group-hover:text-accent-primary'
                      }`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {blog.title}
                    </h3>

                    <p className="text-sm font-light text-[#0b1012]/50 leading-relaxed line-clamp-2 mb-6">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300">
                        Read Article
                      </span>
                      <div className="w-4 h-px bg-[#0b1012]/20 group-hover:w-8 group-hover:bg-accent-primary transition-all duration-400" />
                      <ArrowRight size={11} className="text-[#0b1012]/30 group-hover:text-accent-primary transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
