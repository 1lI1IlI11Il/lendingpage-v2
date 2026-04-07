import { navigation, watchlist } from './data'

export default function SidebarNav({ activeView, activeSymbol, onChange }) {
  return (
    <aside className="flex w-20 flex-col border-r border-zinc-900 bg-zinc-950 px-3 py-4 sm:w-64 sm:px-4">
      <div className="mb-8 rounded-2xl border border-zinc-900 bg-zinc-900/70 px-3 py-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">Tradi</div>
        <div className="mt-2 hidden text-lg font-semibold text-zinc-100 sm:block">Workspace</div>
        <div className="mt-1 hidden text-sm text-zinc-400 sm:block">Tracking {activeSymbol.symbol} in the local scaffold</div>
      </div>

      <div className="space-y-2">
        {navigation.map((item) => {
          const isActive = activeView === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition-colors ${
                isActive
                  ? 'border-cyan-500/30 bg-cyan-500/10 text-zinc-50'
                  : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <div>
                <div className="text-sm font-medium sm:hidden">{item.shortLabel}</div>
                <div className="hidden text-sm font-medium sm:block">{item.label}</div>
              </div>
              <span className="hidden rounded-full border border-zinc-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:inline-flex">
                {item.badge}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-3">
        <div className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:block">Watchlist</div>
        <div className="mt-3 space-y-3">
          {watchlist.map((item) => (
            <div
              key={item.symbol}
              className={`rounded-2xl border bg-zinc-950 px-3 py-2 ${
                item.symbol === activeSymbol.symbol ? 'border-cyan-500/30' : 'border-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-medium text-zinc-200 sm:text-sm">{item.symbol}</div>
                {item.symbol === activeSymbol.symbol ? (
                  <span className="hidden rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:inline-flex">
                    Active
                  </span>
                ) : null}
              </div>
              <div className="mt-1 hidden items-center justify-between gap-2 text-xs sm:flex">
                <span className="text-zinc-400">{item.price}</span>
                <span className={item.tone}>{item.move}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-2xl border border-zinc-900 bg-gradient-to-br from-zinc-900 to-zinc-950 p-3">
        <div className="hidden text-xs uppercase tracking-[0.24em] text-zinc-500 sm:block">Session</div>
        <div className="mt-2 text-sm font-medium text-zinc-100">{activeSymbol.symbol} · {activeSymbol.session}</div>
        <div className="mt-1 text-xs text-zinc-400">Local symbol selection only. No live routing or data feed yet.</div>
      </div>
    </aside>
  )
}
