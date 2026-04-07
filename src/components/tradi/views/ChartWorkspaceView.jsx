import PanelCard from '../PanelCard'
import { chartTimeframes, contextTabs } from '../data'

export default function ChartWorkspaceView({ activeSymbol, activeTab, onTabChange }) {
  const activeContext = activeSymbol.contextPanels[activeTab] ?? activeSymbol.contextPanels.flows

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_360px]">
      <div className="space-y-4">
        <PanelCard
          title="Chart Header"
          subtitle="Primary instrument, timeframe, and session state placeholders for the local symbol flow."
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-3xl font-semibold text-zinc-100">{activeSymbol.symbol}</div>
              <div className="mt-2 text-sm text-zinc-400">{activeSymbol.market} &middot; {activeSymbol.timeframe} execution view &middot; {activeSymbol.session}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chartTimeframes.map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    item === activeSymbol.timeframe
                      ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
                      : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </PanelCard>

        <PanelCard
          title="Main Chart Placeholder"
          subtitle={`Reserved area for the future ${activeSymbol.symbol} charting surface, overlays, and drawing tools.`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_40%)]" />
            <div className="relative grid h-[420px] grid-cols-12 gap-2 p-5">
              {Array.from({ length: 12 }).map((_, columnIndex) => (
                <div key={`chart-col-${columnIndex}`} className="relative rounded-full bg-zinc-900/60">
                  <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-zinc-800" />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-x-5 top-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>Asia</span>
                <span>Europe</span>
                <span>US</span>
              </div>

              <div className="pointer-events-none absolute inset-x-8 bottom-12 flex items-end justify-between gap-4">
                {['h-28', 'h-36', 'h-24', 'h-40', 'h-32', 'h-44', 'h-[120px]', 'h-48'].map((height, index) => (
                  <div
                    key={`bar-${index}`}
                    className={`w-full rounded-t-2xl ${height} ${
                      index % 3 === 0 ? 'bg-rose-500/35' : 'bg-emerald-500/35'
                    }`}
                  />
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-8 top-1/2 border-t border-dashed border-cyan-500/30" />
              <div className="pointer-events-none absolute right-6 top-12 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                {activeSymbol.symbol} · {activeSymbol.priceMarker}
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          title="Indicator Panel Placeholder"
          subtitle="Momentum, breadth, and execution indicators can slot into this lower workspace."
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Momentum</div>
              <div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-zinc-900 via-cyan-500/10 to-zinc-900" />
              <div className="mt-3 text-sm text-zinc-400">RSI / MACD placeholder surface</div>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Execution</div>
              <div className="mt-4 h-24 rounded-2xl bg-gradient-to-r from-zinc-900 via-fuchsia-500/10 to-zinc-900" />
              <div className="mt-3 text-sm text-zinc-400">Volume / delta placeholder surface</div>
            </div>
          </div>
        </PanelCard>
      </div>

      <div className="space-y-4">
        <PanelCard
          title="Symbol Snapshot"
          subtitle={`Compact overview of ${activeSymbol.symbol} and the current working bias.`}
          className="h-fit"
        >
          <div className="space-y-3">
            {activeSymbol.snapshotStats.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-3">
                <span className="text-sm text-zinc-400">{item.label}</span>
                <span className="text-sm font-medium text-zinc-100">{item.value}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Right Context Tabs / Panel"
          subtitle={`Simple stateful tabs for ${activeSymbol.symbol} notes, levels, and macro framing.`}
          className="h-fit"
        >
          <div className="flex flex-wrap gap-2">
            {contextTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
                    : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {activeContext.map((item) => (
              <div key={`${activeTab}-${item}`} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4 text-sm leading-relaxed text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  )
}
