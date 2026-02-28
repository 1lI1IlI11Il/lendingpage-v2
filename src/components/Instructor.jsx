export default function Instructor() {
  return (
    <section className="py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-100">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Instructor
            </span>
          </h2>
        </div>

        <div className="mx-auto max-w-sm">
          <div
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"
            style={{ boxShadow: '0 0 40px rgba(168,85,247,0.08)' }}
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/30 ring-4 ring-purple-500/10">
              <svg className="h-10 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-zinc-100 mb-1">Yongseung</h3>
            <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300 mb-4">
              Vibe Coding Educator
            </span>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Vibe coding practitioner and educator. Teaches complete beginners how to build real
              things with AI tools — step by step, no jargon, no gatekeeping.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
