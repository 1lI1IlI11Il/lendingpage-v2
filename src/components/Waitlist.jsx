import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-12 text-center"
          style={{ boxShadow: '0 0 80px rgba(168,85,247,0.15)' }}
        >
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-pink-600/20 blur-3xl" />

          {status === 'success' ? (
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
                <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-zinc-100 mb-2">You&apos;re on the list!</h3>
              <p className="text-zinc-400">We&apos;ll email you when registration opens.</p>
            </div>
          ) : (
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-100 mb-4">
                Secure Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Spot
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
                Be the first to know when registration opens. Drop your email below.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-60 whitespace-nowrap shadow-lg shadow-purple-900/30"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {status === 'error' && (
                <p className="mt-4 text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <p className="mt-4 text-zinc-600 text-sm">We&apos;ll only email you about this seminar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
