export default function PanelCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-zinc-900 bg-zinc-950/80 ${className}`}>
      <div className="border-b border-zinc-900 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">{title}</h2>
            {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
          </div>
          <span className="rounded-full border border-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-500">
            Phase 1
          </span>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}
