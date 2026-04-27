import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Star, Lock, LogOut, RefreshCw, Clock, Eye } from 'lucide-react';
import { supabase, type Review } from '../lib/supabase';
import SEO from '../components/seo/SEO';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} size={12}
          className={s <= rating ? 'text-[#C9A97A] fill-[#C9A97A]' : 'text-[#e0d8cc]'} />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [authed, setAuthed]       = useState(false);
  const [password, setPassword]   = useState('');
  const [pwError, setPwError]     = useState('');
  const [pending, setPending]     = useState<Review[]>([]);
  const [approved, setApproved]   = useState<Review[]>([]);
  const [loading, setLoading]     = useState(false);
  const [tab, setTab]             = useState<'pending' | 'approved'>('pending');
  const [actionId, setActionId]   = useState<string | null>(null);

  function login() {
    if (password === ADMIN_PASSWORD) { setAuthed(true); setPwError(''); }
    else setPwError('Incorrect password. Please try again.');
  }

  async function fetchReviews() {
    setLoading(true);
    const [{ data: p }, { data: a }] = await Promise.all([
      supabase.from('reviews').select('*').eq('approved', false).order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').eq('approved', true).order('created_at', { ascending: false }),
    ]);
    setPending(p ?? []);
    setApproved(a ?? []);
    setLoading(false);
  }

  useEffect(() => { if (authed) fetchReviews(); }, [authed]);

  async function approve(id: string) {
    setActionId(id);
    await supabase.from('reviews').update({ approved: true }).eq('id', id);
    await fetchReviews();
    setActionId(null);
  }

  async function reject(id: string) {
    setActionId(id);
    await supabase.from('reviews').delete().eq('id', id);
    await fetchReviews();
    setActionId(null);
  }

  async function unapprove(id: string) {
    setActionId(id);
    await supabase.from('reviews').update({ approved: false }).eq('id', id);
    await fetchReviews();
    setActionId(null);
  }

  /* ── Login ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex flex-col items-center justify-center px-4">
        {/* Top accent */}
        <div className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C9A97A] via-[#e8d5c4] to-[#C9A97A]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#ede8e0] shadow-sm w-full max-w-sm p-10 text-center"
        >
          {/* Logo */}
          <img src="/logo/logo.svg" alt="Samay Innovation" className="w-10 h-10 object-contain mx-auto mb-6 brightness-0" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-6 bg-[#C9A97A]" />
            <Lock size={13} className="text-[#C9A97A]" />
            <div className="h-px w-6 bg-[#C9A97A]" />
          </div>

          <h1 className="text-xl font-light text-[#1a1a1a] mb-1">Admin Access</h1>
          <p className="text-[#aaa] text-xs mb-8 tracking-wide">Review approvals — Samay Innovation</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Enter admin password"
            className="w-full bg-[#faf8f5] border border-[#e8e2d8] text-[#1a1a1a] placeholder-[#bbb] px-4 py-3 text-sm font-light rounded-lg focus:outline-none focus:border-[#C9A97A] transition-colors duration-200 mb-3 text-center"
          />

          <AnimatePresence>
            {pwError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-red-500 text-xs mb-3"
              >
                {pwError}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={login}
            className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl text-xs tracking-[0.25em] uppercase font-light hover:bg-[#C9A97A] transition-colors duration-300"
          >
            Enter Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const list = tab === 'pending' ? pending : approved;

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <SEO title="Admin" description="" noIndex={true} />
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[#C9A97A] via-[#e8d5c4] to-[#C9A97A]" />

      {/* Topbar */}
      <div className="bg-white border-b border-[#ede8e0] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo/logo.svg" alt="Samay Innovation" className="w-8 h-8 object-contain brightness-0" />
            <div>
              <p className="text-sm font-light text-[#0b1012] tracking-wide">SAMAY INNOVATION</p>
              <p className="text-[10px] text-[#aaa] tracking-widest uppercase">Review Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchReviews}
              disabled={loading}
              className="w-9 h-9 rounded-lg border border-[#e8e2d8] flex items-center justify-center text-[#aaa] hover:text-[#C9A97A] hover:border-[#C9A97A]/50 transition-colors disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => setAuthed(false)}
              className="flex items-center gap-1.5 border border-[#e8e2d8] rounded-lg px-4 py-2 text-xs text-[#888] hover:text-[#1a1a1a] hover:border-[#ccc] transition-colors font-light"
            >
              <LogOut size={13} /> Log out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Pending Reviews', value: pending.length, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
            { label: 'Approved Reviews', value: approved.length, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-xl border ${s.border} p-5 flex items-center gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                <span className={`text-2xl font-light ${s.color}`}>{s.value}</span>
              </div>
              <p className="text-sm text-[#888] font-light">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-[#ede8e0] p-1 w-fit shadow-sm">
          {(['pending', 'approved'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs tracking-[0.15em] uppercase font-light transition-all duration-200 ${
                tab === t
                  ? 'bg-[#1a1a1a] text-white shadow-sm'
                  : 'text-[#888] hover:text-[#1a1a1a]'
              }`}
            >
              {t === 'pending' ? <Clock size={12} /> : <Eye size={12} />}
              {t} ({t === 'pending' ? pending.length : approved.length})
            </button>
          ))}
        </div>

        {/* Empty */}
        {!loading && list.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-16 text-center">
            <div className="w-14 h-14 rounded-full bg-[#faf8f5] flex items-center justify-center mx-auto mb-4">
              {tab === 'pending'
                ? <Clock size={22} className="text-[#C9A97A]" />
                : <CheckCircle size={22} className="text-[#C9A97A]" />}
            </div>
            <p className="text-[#888] text-sm font-light">
              {tab === 'pending' ? 'No pending reviews right now.' : 'No approved reviews yet.'}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-[#bbb] text-sm font-light gap-2">
            <RefreshCw size={14} className="animate-spin" /> Loading…
          </div>
        )}

        {/* Review cards */}
        <AnimatePresence mode="popLayout">
          {!loading && list.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -16, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-[#ede8e0] p-7 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-[#fdf8f2] border border-[#e8d8c0] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C9A97A] font-light text-base">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#1a1a1a] font-light text-base leading-tight">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {r.role && <span className="text-[#aaa] text-xs">{r.role}</span>}
                      {r.project && (
                        <>
                          {r.role && <span className="text-[#ddd] text-xs">·</span>}
                          <span className="text-xs bg-[#fdf8f2] text-[#C9A97A] border border-[#e8d8c0] px-2.5 py-0.5 rounded-full font-light">
                            {r.project}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <Stars rating={r.rating} />
                  <p className="text-[#ccc] text-[11px] mt-1.5">
                    {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Review text */}
              <div className="bg-[#faf8f5] rounded-xl px-5 py-4 mb-6 border border-[#f0ebe3]">
                <p className="text-[#555] text-sm font-light leading-relaxed italic">
                  "{r.review}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                {tab === 'pending' ? (
                  <>
                    <button
                      onClick={() => approve(r.id)}
                      disabled={actionId === r.id}
                      className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-xs tracking-[0.1em] uppercase font-light hover:bg-emerald-600 disabled:opacity-50 transition-colors duration-200 shadow-sm"
                    >
                      <CheckCircle size={13} />
                      {actionId === r.id ? 'Approving…' : 'Approve'}
                    </button>
                    <button
                      onClick={() => reject(r.id)}
                      disabled={actionId === r.id}
                      className="flex items-center gap-2 border border-red-200 text-red-400 px-5 py-2.5 rounded-lg text-xs tracking-[0.1em] uppercase font-light hover:bg-red-50 disabled:opacity-50 transition-colors duration-200"
                    >
                      <XCircle size={13} />
                      {actionId === r.id ? 'Deleting…' : 'Reject'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => unapprove(r.id)}
                    disabled={actionId === r.id}
                    className="flex items-center gap-2 border border-[#e8e2d8] text-[#aaa] px-5 py-2.5 rounded-lg text-xs tracking-[0.1em] uppercase font-light hover:text-[#1a1a1a] hover:border-[#ccc] disabled:opacity-50 transition-colors duration-200"
                  >
                    <XCircle size={13} />
                    {actionId === r.id ? 'Moving…' : 'Unpublish'}
                  </button>
                )}
                {r.email && (
                  <a
                    href={`mailto:${r.email}`}
                    className="ml-auto text-xs text-[#bbb] hover:text-[#C9A97A] transition-colors font-light"
                  >
                    {r.email}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
}
