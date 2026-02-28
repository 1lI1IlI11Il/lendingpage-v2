const tools = [
  { name: 'Codex',       desc: "OpenAI's AI coding agent — install, configure, and ship." },
  { name: 'Claude Code', desc: "Anthropic's terminal-native AI pair programmer." },
  { name: 'Kilo Code',   desc: 'VS Code extension for in-editor AI assistance.' },
  { name: 'Antigravity', desc: 'Next-gen vibe coding environment. Set up from zero.' },
]

export default function Tools() {
  return (
    <section id="tools" className="py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-100 mb-4">
            What You&apos;ll{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learn
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Get every major AI coding tool installed and running — step by step, from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-purple-500/50 transition-all duration-300"
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20">
                <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-zinc-100 mb-2">{tool.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-sm mt-8">...and more tools on the day</p>
      </div>
    </section>
  )
}
