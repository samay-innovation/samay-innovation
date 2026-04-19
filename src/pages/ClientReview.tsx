import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/seo/SEO';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function ClientReview() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: { currentTarget: HTMLFormElement; preventDefault(): void }) {
    e.preventDefault();
    if (rating === 0) { setStatus('error'); return; }
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from('reviews').insert({
      name:    fd.get('name') as string,
      role:    (fd.get('role') as string) || null,
      project: (fd.get('project') as string) || null,
      rating,
      review:  fd.get('review') as string,
      email:   (fd.get('email') as string) || null,
      approved: false,
    });
    if (error) { setErrorMsg('Something went wrong. Please try again.'); setStatus('error'); }
    else setStatus('success');
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex flex-col">
      <SEO title="Share Your Experience" description="" noIndex={true} />
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#C9A97A] via-[#e8d5c4] to-[#C9A97A]" />

      {/* Header bar */}
      <div className="bg-white border-b border-[#ede8e0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo/logo.png" alt="Samay Innovation" className="w-8 h-8 object-contain" />
          <div>
            <p className="text-sm font-light text-[#1a1a1a] tracking-wide">SAMAY INNOVATION</p>
            <p className="text-[10px] text-[#999] tracking-widest uppercase">Client Feedback</p>
          </div>
        </div>
        <a
          href="/"
          className="text-xs text-[#999] hover:text-[#C9A97A] transition-colors tracking-widest uppercase font-light"
        >
          ← Back to Website
        </a>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-start justify-center py-12 px-4">
        <div className="w-full max-w-lg">

          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A97A]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A97A] font-light">
                Share Your Experience
              </span>
              <div className="h-px w-8 bg-[#C9A97A]" />
            </div>
            <h1 className="text-3xl font-light text-[#1a1a1a]">How Did We Do?</h1>
            <p className="text-[#888] text-sm mt-2 font-light">
              Your feedback helps us improve and inspires future clients.
            </p>
          </motion.div>

          {/* Success card */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-[#ede8e0] shadow-sm p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#fdf8f2] border border-[#C9A97A]/30 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={28} className="text-[#C9A97A]" />
                </div>
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-2">Thank You!</h2>
                <p className="text-[#888] text-sm leading-relaxed max-w-xs mx-auto">
                  Your review has been submitted and will be published after a quick check by our team.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setRating(0); }}
                  className="mt-8 text-xs text-[#C9A97A] tracking-widest uppercase font-light hover:underline"
                >
                  Submit Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form card */}
          {status !== 'success' && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#ede8e0] shadow-sm p-8 space-y-6"
            >
              <Field label="Your Name" required>
                <input name="name" type="text" required placeholder="e.g. Rajesh Shah" className={inp} />
              </Field>

              <Field label="Role / Designation">
                <input name="role" type="text" placeholder="e.g. Homeowner, Business Owner" className={inp} />
              </Field>

              <Field label="Project / Property">
                <input name="project" type="text" placeholder="e.g. 4BHK Villa, Bodakdev" className={inp} />
              </Field>

              {/* Star rating */}
              <div>
                <p className={labelClass}>
                  Rating <span className="text-[#C9A97A]">*</span>
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  {[1,2,3,4,5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setRating(s); setErrorMsg(''); }}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      className="focus:outline-none transition-transform duration-100 hover:scale-110"
                    >
                      <Star
                        size={30}
                        className={
                          s <= (hovered || rating)
                            ? 'text-[#C9A97A] fill-[#C9A97A]'
                            : 'text-[#e0d8cc]'
                        }
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-[#999] text-xs ml-2">{ratingLabels[rating]}</span>
                  )}
                </div>
                {status === 'error' && rating === 0 && (
                  <p className="text-red-500 text-xs mt-1.5">Please select a rating.</p>
                )}
              </div>

              <Field label="Your Review" required>
                <textarea
                  name="review"
                  required
                  rows={4}
                  placeholder="Tell us about your experience with Samay Innovation…"
                  className={`${inp} resize-none`}
                />
              </Field>

              <Field label="Email Address" hint="optional">
                <input name="email" type="email" placeholder="For any follow-up" className={inp} />
              </Field>

              {status === 'error' && errorMsg && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2.5 bg-[#1a1a1a] text-white py-4 rounded-xl text-xs tracking-[0.25em] uppercase font-light hover:bg-[#C9A97A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    Submit Review
                  </>
                )}
              </button>

              <p className="text-[#bbb] text-xs text-center">
                Reviews are published after a brief approval by our team.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}

const inp =
  'w-full bg-[#faf8f5] border border-[#e8e2d8] text-[#1a1a1a] placeholder-[#bbb] px-4 py-3 text-sm font-light rounded-lg focus:outline-none focus:border-[#C9A97A] transition-colors duration-200';

const labelClass = 'text-xs tracking-[0.15em] uppercase text-[#888] font-light';

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <p className={`${labelClass} mb-2`}>
        {label}
        {required && <span className="text-[#C9A97A] ml-1">*</span>}
        {hint && <span className="text-[#ccc] normal-case tracking-normal ml-1">({hint})</span>}
      </p>
      {children}
    </div>
  );
}
