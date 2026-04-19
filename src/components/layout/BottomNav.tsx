import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',          label: 'Home'      },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services',  label: 'Services'  },
  { href: '/about',     label: 'About'     },
  { href: '/blogs',     label: 'Blogs'     },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Magnetic underline — tracks mouse X across the nav bar
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [showUnderline, setShowUnderline] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
  }

  function handleItemEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setUnderlineWidth(rect.width - 24); // subtract px padding
    setShowUnderline(true);
  }

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowUnderline(false)}
          className="flex items-center"
          style={{
            background: 'rgba(8,8,8,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '100px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 12px 48px rgba(0,0,0,0.55)',
            padding: '6px 6px',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center px-4 py-2 mr-1"
          >
            <img
              src="/logo/logo.svg"
              alt="Samay Innovation"
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>

          {/* Thin divider */}
          <div className="w-px h-4 bg-white/10 mr-1 flex-shrink-0" />

          {/* Nav items with floating underline */}
          <div className="relative flex items-center">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  to={href}
                  onMouseEnter={handleItemEnter}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`text-[11px] tracking-[0.22em] uppercase font-light transition-colors duration-200 ${
                      active ? 'text-white' : 'text-white/45 group-hover:text-white/80'
                    }`}
                  >
                    {label}
                  </span>

                  {/* Persistent active underline */}
                  {active && (
                    <motion.span
                      layoutId="active-line"
                      className="absolute bottom-1 left-4 right-4 h-px bg-accent-primary"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Magnetic hover underline — follows cursor */}
            <AnimatePresence>
              {showUnderline && (
                <motion.span
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.3 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-1 h-px bg-white/25 pointer-events-none"
                  style={{
                    width: underlineWidth,
                    x: springX,
                    translateX: '-50%',
                    transformOrigin: 'center',
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1 flex-shrink-0" />

          {/* Contact CTA */}
          <Link
            to="/contact"
            className="flex items-center gap-1.5 px-4 py-2 group"
          >
            <span className="text-[11px] tracking-[0.22em] uppercase font-light text-accent-primary group-hover:text-accent-secondary transition-colors duration-200">
              Contact
            </span>
            <span className="text-accent-primary/60 text-[10px] group-hover:text-accent-secondary group-hover:translate-x-0.5 transition-all duration-200">
              ↗
            </span>
          </Link>
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <nav className="md:hidden fixed bottom-5 left-4 right-4 z-50">
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: 'rgba(8,8,8,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '100px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/logo/logo.svg"
              alt="Samay Innovation"
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={16} className="text-white/60" />
                </motion.div>
              ) : (
                <motion.div
                  key="burger"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-[5px]"
                >
                  <span className="w-5 h-px bg-white/60" />
                  <span className="w-3 h-px bg-white/35" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-40"
            style={{
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              backgroundColor: 'rgba(8,8,8,0.92)',
            }}
          >
            <div className="flex flex-col justify-center h-full px-8 pb-28 pt-12">
              {[...NAV_ITEMS, { href: '/contact', label: 'Contact' }].map(({ href, label }, i) => {
                const active = isActive(href);
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <Link
                      to={href}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center justify-between py-5 border-b transition-colors duration-200 ${
                        active ? 'border-accent-primary/30' : 'border-white/6'
                      }`}
                    >
                      <span
                        className={`text-4xl font-light transition-colors duration-200 ${
                          active ? 'text-accent-primary' : 'text-white/60 group-hover:text-white'
                        }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {label}
                      </span>
                      {active && (
                        <span className="text-accent-primary text-sm">↗</span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
