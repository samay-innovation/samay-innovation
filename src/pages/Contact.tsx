import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Instagram,
  Linkedin,
  Facebook,
  ArrowRight,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '../lib/constants';
import SEO from '../components/seo/SEO';
import { localBusinessSchema } from '../components/seo/schemas';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

// ─── shared field style tokens ───────────────────────────────────────────────
const INPUT_BASE =
  'w-full px-0 py-3 bg-transparent border-b border-[#ddd8d0] focus:border-[#0b1012] outline-none transition-colors duration-300 text-[#0b1012] text-sm font-light';

const LABEL_BASE =
  'absolute left-0 transition-all duration-300 pointer-events-none text-[10px] font-mono tracking-widest uppercase';

const LABEL_ACTIVE   = '-top-4 text-[#0b1012]/60';
const LABEL_INACTIVE = 'top-3 text-[#0b1012]/35';

function floatLabel(focused: boolean, hasValue: boolean) {
  return `${LABEL_BASE} ${focused || hasValue ? LABEL_ACTIVE : LABEL_INACTIVE}`;
}

// ─── contact info rows ────────────────────────────────────────────────────────
const ADDRESS_LINES = [
  '403 Before, Lane of ICICI Bank',
  'PV Enclave, Sindhu Bhavan Marg',
  'opp. Satyam House, Bodakdev',
  'Ahmedabad, Gujarat 380059',
];

export default function Contact() {
  // ── form state ──────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          reply_to:     formData.email,
          phone:        formData.phone || 'Not provided',
          project_type: formData.projectType,
          budget:       formData.budget || 'Not specified',
          message:      formData.message,
          to_name:      'Seme Nadvi',
          to_email:     'info@samayinnovation.in',
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      const message =
        err && typeof err === 'object' && 'text' in err
          ? String((err as { text: unknown }).text)
          : 'Something went wrong. Please try calling us directly or email us at ' +
            SITE_CONFIG.email;
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── contact info list ────────────────────────────────────────────────────────
  const contactInfo = [
    {
      icon: MapPin,
      label: 'Visit Us',
      details: ADDRESS_LINES,
      link: SITE_CONFIG.mapUrl,
    },
    {
      icon: Phone,
      label: 'Call Us',
      details: [SITE_CONFIG.phone],
      link: `tel:${SITE_CONFIG.phone}`,
    },
    {
      icon: Mail,
      label: 'Email Us',
      details: [SITE_CONFIG.email],
      link: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: Clock,
      label: 'Hours',
      details: [SITE_CONFIG.hours],
      link: undefined,
    },
  ] as const;

  const socialLinks = [
    { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
    { icon: Linkedin,  href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn'  },
    { icon: Facebook,  href: SITE_CONFIG.social.facebook,  label: 'Facebook'  },
  ];

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#fafaf8] min-h-screen">
      <SEO
        title="Contact Samay Innovation — Interior Designer in Ahmedabad, Gujarat"
        description="Get in touch with Samay Innovation to start your interior design project. Visit our studio at Bodakdev, Ahmedabad or call (+91) 989 852 4366. Serving residential and commercial clients across Ahmedabad, Gujarat and the US."
        keywords="contact best interior designer India, hire interior designer India, book interior designer India, interior design consultation India, top interior design firm India, best interior design studio India, interior designer contact India, luxury interior design India, interior design firm Ahmedabad, book interior designer Ahmedabad, interior design consultation Gujarat, Samay Innovation contact, contact Indian interior designer USA, hire Indian interior designer for US project, book interior design consultation online USA, Indian interior design firm for US clients, Samay Innovation USA contact, remote interior design consultation for American clients"
        path="/contact"
        structuredData={localBusinessSchema}
      />

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <header className="bg-[#fafaf8] pt-32 pb-16 border-b border-[#ddd8d0] text-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0b1012]/50 mb-4">
              Get in Touch
            </p>
            <h1
              className="text-[clamp(3rem,8vw,6.5rem)] font-light leading-none text-[#0b1012] mb-5"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Contact
            </h1>
            <p className="text-base font-light text-[#0b1012]/45 max-w-sm mx-auto leading-relaxed">
              We'd love to hear about your project. Let's create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── Main two-column section ──────────────────────────────────────────── */}
      <section className="bg-[#fafaf8] py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* ── Left col — contact info ──────────────────────────────────── */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-[#0b1012]/50 text-sm font-light leading-relaxed mb-12 max-w-xs"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Whether you're planning a residential renovation, commercial space, or hospitality
                project — we're here to bring your vision to life.
              </p>

              {/* Contact info list */}
              <ul className="divide-y divide-[#ddd8d0]">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  const inner = (
                    <div className="flex items-start gap-4 py-6 group">
                      <Icon
                        size={14}
                        className="mt-0.5 flex-shrink-0 text-accent-primary"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#0b1012]/40 mb-1.5">
                          {item.label}
                        </p>
                        {item.details.map((line, idx) => (
                          <p key={idx} className="text-sm font-light text-[#0b1012] leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );

                  return (
                    <li key={i}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block hover:text-accent-primary transition-colors duration-300"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Social links */}
              <div className="mt-10 pt-8 border-t border-[#ddd8d0]">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0b1012]/40 mb-5">
                  Follow Us
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
                        className="flex items-center gap-1.5 group"
                      >
                        <SIcon
                          size={14}
                          strokeWidth={1.5}
                          className="text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300"
                        />
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300">
                          {s.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── Right col — form ─────────────────────────────────────────── */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="text-2xl font-light text-[#0b1012] mb-10"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Send us a message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>

                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="name"
                      className={INPUT_BASE}
                      placeholder=" "
                    />
                    <label className={floatLabel(focusedField === 'name', !!formData.name)}>
                      Your Name *
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      autoComplete="email"
                      className={INPUT_BASE}
                      placeholder=" "
                    />
                    <label className={floatLabel(focusedField === 'email', !!formData.email)}>
                      Email Address *
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="tel"
                      className={INPUT_BASE}
                      placeholder=" "
                    />
                    <label className={floatLabel(focusedField === 'phone', !!formData.phone)}>
                      Phone Number
                    </label>
                  </div>

                  {/* Two-col row: Project Type + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Project Type */}
                    <div className="relative">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('projectType')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`${INPUT_BASE} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled />
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="retail">Retail</option>
                        <option value="other">Other</option>
                      </select>
                      <label
                        className={floatLabel(
                          focusedField === 'projectType',
                          !!formData.projectType,
                        )}
                      >
                        Project Type *
                      </label>
                      {/* Chevron */}
                      <div className="absolute right-0 top-3.5 pointer-events-none">
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className="text-[#0b1012]/30"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('budget')}
                        onBlur={() => setFocusedField(null)}
                        className={`${INPUT_BASE} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled />
                        <option value="under-10">Under ₹10 Lakhs</option>
                        <option value="10-25">₹10 – 25 Lakhs</option>
                        <option value="25-50">₹25 – 50 Lakhs</option>
                        <option value="50-100">₹50 Lakhs – 1 Crore</option>
                        <option value="above-100">Above ₹1 Crore</option>
                      </select>
                      <label
                        className={floatLabel(focusedField === 'budget', !!formData.budget)}
                      >
                        Budget Range
                      </label>
                      <div className="absolute right-0 top-3.5 pointer-events-none">
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          className="text-[#0b1012]/30"
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`${INPUT_BASE} resize-none`}
                      placeholder=" "
                    />
                    <label className={floatLabel(focusedField === 'message', !!formData.message)}>
                      Tell us about your project *
                    </label>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <AlertCircle
                        size={14}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-xs font-light text-red-500 leading-relaxed">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 group mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012] group-hover:text-accent-primary transition-colors duration-300">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <div className="w-8 h-px bg-[#0b1012]/40 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
                    <ArrowRight
                      size={12}
                      className="text-[#0b1012]/40 group-hover:text-accent-primary transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </button>
                </form>
              ) : (
                /* ── Success state ── */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="py-16 text-center"
                >
                  <CheckCircle
                    size={32}
                    strokeWidth={1}
                    className="mx-auto mb-6 text-accent-primary"
                  />
                  <h3
                    className="text-2xl font-light text-[#0b1012] mb-4"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Message received
                  </h3>
                  <p className="text-sm font-light text-[#0b1012]/60 leading-relaxed mb-8 max-w-xs mx-auto">
                    Thank you for reaching out. We'll be in touch within 24 hours.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-3 group"
                  >
                    <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012] group-hover:text-accent-primary transition-colors duration-300">
                      Back to Home
                    </span>
                    <div className="w-8 h-px bg-[#0b1012]/30 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
                    <ArrowRight
                      size={12}
                      className="text-[#0b1012]/30 group-hover:text-accent-primary transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map section ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0b1012] py-20 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-white/8 pb-8">
              <div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 block mb-3">
                  Find Us
                </span>
                <h2
                  className="text-3xl md:text-4xl font-light text-white"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Visit Our Studio
                </h2>
              </div>
              <a
                href={SITE_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-accent-primary group-hover:text-white transition-colors duration-300">
                  Get Directions
                </span>
                <div className="w-8 h-px bg-accent-primary/50 group-hover:w-14 group-hover:bg-white transition-all duration-500" />
                <ArrowRight size={12} className="text-accent-primary/50 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/8 overflow-hidden">
              {/* Map iframe */}
              <div className="lg:col-span-2 h-[320px] md:h-[400px] relative">
                <iframe
                  title="Samay Innovation Location"
                  src="https://maps.google.com/maps?q=PV+Enclave+Sindhu+Bhavan+Marg+Bodakdev+Ahmedabad+Gujarat+380059&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(40%) contrast(1.1) brightness(0.75)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-accent-primary/60" />
              </div>

              {/* Address sidebar */}
              <div className="bg-[#0f1618] p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/8">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6">Studio Address</p>
                  <h3 className="text-lg font-light text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Samay Innovation
                  </h3>
                  <div className="space-y-1 mb-8">
                    {ADDRESS_LINES.map((line, i) => (
                      <p key={i} className="text-white/45 text-sm font-light">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="w-8 h-px bg-accent-primary/30 mb-8" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock size={12} strokeWidth={1.5} className="text-accent-primary flex-shrink-0" />
                      <span className="text-white/45 text-xs font-light">
                        Mon – Sat, 10:00 AM – 7:00 PM
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={12} strokeWidth={1.5} className="text-accent-primary flex-shrink-0" />
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="text-white/45 text-xs font-light hover:text-accent-primary transition-colors duration-200"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-3 group"
                >
                  <MapPin size={12} strokeWidth={1.5} className="text-accent-primary group-hover:text-white transition-colors duration-300" />
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-primary group-hover:text-white transition-colors duration-300">
                    Open in Maps
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#fafaf8] py-24 border-t border-[#ddd8d0]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0b1012]/40 mb-5">
              Ready to begin
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-[#0b1012] leading-snug mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Let's transform<br />your space together.
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a
                href={SITE_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012] group-hover:text-accent-primary transition-colors duration-300">
                  Get Directions
                </span>
                <div className="w-8 h-px bg-[#0b1012]/30 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
                <ArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#0b1012]/30 group-hover:text-accent-primary transition-colors duration-300"
                />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#0b1012] group-hover:text-accent-primary transition-colors duration-300">
                  View Our Work
                </span>
                <div className="w-8 h-px bg-[#0b1012]/30 group-hover:w-14 group-hover:bg-accent-primary transition-all duration-500" />
                <ArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#0b1012]/30 group-hover:text-accent-primary transition-colors duration-300"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
