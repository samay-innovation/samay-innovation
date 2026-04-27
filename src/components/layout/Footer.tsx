import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION } from '../../lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
    { icon: Linkedin,  href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
    { icon: Facebook,  href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  ];

  return (
    <footer className="bg-[#0b1012] text-white">
      {/* ── Main content ── */}
      <div className="px-6 md:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 pb-16 border-b border-white/8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/logo/logo.svg"
                alt={SITE_CONFIG.name}
                className="h-10 w-auto"
                onError={(e) => { e.currentTarget.src = '/logo/logo.png'; }}
              />
              <span className="text-sm font-light tracking-[0.18em] uppercase text-white">
                Samay Innovation
              </span>
            </div>
            <p
              className="text-sm font-light text-white/45 leading-relaxed mb-10 max-w-xs"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-6">
              {socialLinks.map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex items-center gap-1.5"
                  >
                    <SIcon
                      size={14}
                      strokeWidth={1.5}
                      className="text-white/30 group-hover:text-accent-primary transition-colors duration-300"
                    />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-accent-primary transition-colors duration-300">
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-1">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/25 mb-8">Navigation</p>
            <nav className="space-y-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center gap-3"
                >
                  <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/45 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <div className="w-4 h-px bg-white/15 group-hover:w-8 group-hover:bg-accent-primary transition-all duration-400" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-1">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/25 mb-8">Get in Touch</p>
            <div className="space-y-6">
              <a
                href={SITE_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <MapPin size={13} strokeWidth={1.5} className="text-accent-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-light text-white/45 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    403 Before, Lane of ICICI Bank<br />
                    PV Enclave, Sindhu Bhavan Marg<br />
                    opp. Satyam House, Bodakdev<br />
                    Ahmedabad, Gujarat 380059
                  </p>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="group flex items-center gap-3"
              >
                <Phone size={13} strokeWidth={1.5} className="text-accent-primary flex-shrink-0" />
                <span className="text-sm font-light text-white/45 group-hover:text-white/70 transition-colors duration-300">
                  {SITE_CONFIG.phone}
                </span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group flex items-center gap-3"
              >
                <Mail size={13} strokeWidth={1.5} className="text-accent-primary flex-shrink-0" />
                <span className="text-sm font-light text-white/45 group-hover:text-white/70 transition-colors duration-300">
                  {SITE_CONFIG.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20">
            © {currentYear} Samay Innovation. All rights reserved.
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group flex items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-300">
              Back to Top
            </span>
            <ArrowRight size={10} className="text-white/20 group-hover:text-white/50 -rotate-90 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
