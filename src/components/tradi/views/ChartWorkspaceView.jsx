import { useEffect, useState } from 'react'
import LocalCandlesChart from '../LocalCandlesChart'
import PanelCard from '../PanelCard'
import { getMomentumBars, getTrendSnapshot } from '../chartMath'
import { chartTimeframes, contextTabs } from '../data'
import { getLocalChartPayload } from '../localChartService'

export default function ChartWorkspaceView({
  activeAsset,
  activeTimeframe,
  activeTab,
  onTimeframeChange,
  onTabChange,
}) {
  const [chartPayload, setChartPayload] = useState(() => ({
    bars: [],
    snapshotRows: [],
    contextRows: [],
    sourceStrategy: null,
    lastClose: activeAsset.priceMarker,
  }))

  useEffect(() => {
    let active = true

    getLocalChartPayload(activeAsset, activeTimeframe, activeTab).then((payload) => {
      if (active) {
        setChartPayload(payload)
      }
    })

    return () => {
      active = false
    }
  }, [activeAsset, activeTimeframe, activeTab])

  const activeChartData = chartPayload.bars
  const snapshotRows = chartPayload.snapshotRows
  const activeContext = chartPayload.contextRows
  const sourceStrategy = chartPayload.sourceStrategy
  const trendSnapshot = getTrendSnapshot(activeChartData)
  const momentumBars = getMomentumBars(activeChartData)

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_360px]">
      <div className="space-y-4">
        <PanelCard
          title="Chart Header"
          subtitle="Primary instrument, timeframe, and session state placeholders for the local symbol flow."
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-3xl font-semibold text-zinc-100">{activeAsset.symbol}</div>
              <div className="mt-2 text-sm text-zinc-400">{activeAsset.market} &middot; {activeAsset.instrumentType} &middot; {activeTimeframe} view</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chartTimeframes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onTimeframeChange(item)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    item === activeTimeframe
                      ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </PanelCard>

        <PanelCard
          title="Main Chart"
          subtitle={`${activeAsset.canonicalInstrument} rendered as a local registry-backed chart prototype.`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-x-5 top-8 z-10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>Asia</span>
                <span>Europe</span>
                <span>US</span>
            </div>
            <div className="pointer-events-none absolute right-6 top-12 z-10 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                {activeAsset.symbol} · {chartPayload.lastClose}
            </div>
            <div className="relative h-[420px] p-5">
              <LocalCandlesChart data={activeChartData} />
            </div>
          </div>
        </PanelCard>

        <PanelCard
          title="Indicator Panel"
          subtitle={`Simple computed trend and momentum reads derived from the ${activeAsset.symbol} local chart series.`}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Trend</div>
                <div className={`text-xs font-semibold ${trendSnapshot.trendDelta >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {trendSnapshot.bias}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Fast avg</div>
                  <div className="mt-2 text-zinc-100">{trendSnapshot.shortAverage.toFixed(4)}</div>
                </div>
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Base avg</div>
                  <div className="mt-2 text-zinc-100">{trendSnapshot.longAverage.toFixed(4)}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-zinc-400">Tracks whether the recent closes are holding above the local base.</div>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">Momentum</div>
                <div className={`text-xs font-semibold ${trendSnapshot.momentum >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                  Last Δ {trendSnapshot.momentum.toFixed(4)}
                </div>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3">
                {momentumBars.map((bar) => (
                  <div key={bar.id} className="flex h-full flex-1 items-end">
                    <div className={`w-full rounded-t-xl ${bar.tone}`} style={{ height: `${bar.heightPercent}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-zinc-400">Recent close-to-close change bars for the selected timeframe.</div>
            </div>
          </div>
        </PanelCard>
      </div>

      <div className="space-y-4">
        <PanelCard
          title="Symbol Snapshot"
          subtitle={`Compact overview of ${activeAsset.symbol}, quote style, and the current working bias.`}
          className="h-fit"
        >
          <div className="space-y-3">
            {snapshotRows.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-3">
                <span className="text-sm text-zinc-400">{item.label}</span>
                <span className="text-sm font-medium text-zinc-100">{item.value}</span>
              </div>
            ))}
            {sourceStrategy ? (
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{sourceStrategy.primaryLabel}</div>
                <div className="mt-2 text-sm text-zinc-100">{sourceStrategy.primaryValue}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{sourceStrategy.backupLabel}</div>
                <div className="mt-2 text-sm text-zinc-300">{sourceStrategy.backupValue}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{sourceStrategy.implementationLabel}</div>
                <div className="mt-2 text-sm text-zinc-300">{sourceStrategy.implementationValue}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Provider</div>
                <div className="mt-2 text-sm text-zinc-300">{chartPayload.provider}</div>
              </div>
            ) : null}
          </div>
        </PanelCard>

        <PanelCard
          title="Right Context Tabs / Panel"
          subtitle={`Simple stateful tabs for ${activeAsset.symbol} notes, levels, and macro framing.`}
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
