export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      {/* Date badge */}
      <div className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 mb-10">
        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
        March 1, 2026 &middot; Online
      </div>

      {/* Headline */}
      <h1 className="relative text-5xl sm:text-7xl font-black tracking-tight leading-none mb-6">
        <span className="text-zinc-100">Learn to Build</span>
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          with AI
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        The hands-on beginner seminar for installing and using the best AI coding tools &mdash;{' '}
        <span className="text-zinc-200 font-medium">
          Codex, Claude Code, Kilo Code, Antigravity
        </span>
        , and more. Zero experience required.
      </p>

      {/* CTA buttons */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#waitlist"
          className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl shadow-purple-900/40"
        >
          Join the Waitlist &rarr;
        </a>
        <a
          href="#tools"
          className="w-full sm:w-auto rounded-xl border border-zinc-700 px-8 py-4 text-lg font-semibold text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-all"
        >
          See the Curriculum
        </a>
      </div>
    </section>
  )
}
