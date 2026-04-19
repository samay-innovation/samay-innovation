import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NAVIGATION, SITE_CONFIG } from '../../lib/constants';

const DARK_HERO_ROUTES = ['/', '/about'];

function hasDarkHero(pathname: string) {
  if (DARK_HERO_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith('/portfolio/') || pathname.startsWith('/blogs/')) return true;
  return false;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const darkHero = hasDarkHero(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#fafaf8]/95 backdrop-blur-md border-b border-[#ddd8d0]'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 md:px-16">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/logo/logo.svg"
                alt={SITE_CONFIG.name}
                className="h-8 w-auto transition-all duration-500"
                style={{
                  filter: isScrolled
                    ? 'brightness(0)'
                    : darkHero
                    ? 'brightness(0) invert(1)'
                    : 'brightness(0)',
                }}
                onError={(e) => { e.currentTarget.src = '/logo/logo.png'; }}
              />
              <span
                className={`text-sm font-light tracking-[0.18em] uppercase transition-colors duration-500 ${
                  isScrolled ? 'text-[#0b1012]' : darkHero ? 'text-white' : 'text-[#0b1012]'
                }`}
              >
                Samay Innovation
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {NAVIGATION.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative text-[11px] font-mono tracking-[0.25em] uppercase transition-colors duration-300 group ${
                      isScrolled
                        ? active ? 'text-[#0b1012]' : 'text-[#0b1012]/45 hover:text-[#0b1012]'
                        : darkHero
                          ? active ? 'text-white' : 'text-white/60 hover:text-white'
                          : active ? 'text-[#0b1012]' : 'text-[#0b1012]/45 hover:text-[#0b1012]'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-accent-primary transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`md:hidden flex flex-col gap-[5px] p-2 transition-colors duration-300 ${
                isScrolled ? 'text-[#0b1012]' : darkHero ? 'text-white' : 'text-[#0b1012]'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
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
                    <span className="w-5 h-px bg-current block" />
                    <span className="w-3 h-px bg-current block opacity-60" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden fixed inset-0 z-40"
            style={{
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              backgroundColor: 'rgba(243,240,236,0.97)',
            }}
          >
            <div className="flex flex-col justify-center h-full px-8 pb-12 pt-24">
              {NAVIGATION.map(({ name, href }, i) => {
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
                      className={`group flex items-center justify-between py-5 border-b transition-colors duration-200 ${
                        active ? 'border-accent-primary/30' : 'border-[#ddd8d0]'
                      }`}
                    >
                      <span
                        className={`text-4xl font-light transition-colors duration-200 ${
                          active ? 'text-accent-primary' : 'text-[#0b1012]/50 group-hover:text-[#0b1012]'
                        }`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {name}
                      </span>
                      {active && <span className="text-accent-primary text-sm">↗</span>}
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
