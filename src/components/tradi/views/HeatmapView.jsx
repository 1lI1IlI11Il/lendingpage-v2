import { useMemo } from 'react'
import PanelCard from '../PanelCard'
import { rotationNotes } from '../data'
import { useMarketSnapshots } from '../useMarketSnapshots'

export default function HeatmapView() {
  const snapshots = useMarketSnapshots()

  const heatmapGroups = useMemo(() => {
    const tracked = snapshots.map((item) => ({
      label: item.symbol,
      move: item.move,
      tone: item.tone === 'text-emerald-300'
        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
        : 'border-rose-500/20 bg-rose-500/10 text-rose-300',
    }))

    return [
      {
        title: 'Tracked Assets',
        items: tracked,
      },
      {
        title: 'Macro Hedges',
        items: tracked.filter((item) => ['XAUUSD', 'WTI', 'DXY'].includes(item.label)),
      },
    ]
  }, [snapshots])

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_340px]">
      <div className="space-y-4">
        <PanelCard
          title="Heatmap Workspace"
          subtitle="Expanded rotation placeholder with grouped cells for currencies, equity futures, and cross-asset signals."
        >
          <div className="space-y-4">
            {heatmapGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-zinc-900 bg-zinc-900/30 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{group.title}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-5">
                  {group.items.map((item) => (
                    <div key={item.label} className={`rounded-2xl border p-4 ${item.tone}`}>
                      <div className="text-xs uppercase tracking-[0.2em]">{item.label}</div>
                      <div className="mt-3 text-2xl font-semibold">{item.move}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard
        title="Rotation Notes"
        subtitle="Brief context beside the color blocks so the placeholder still reads like a workspace, not a poster."
        className="h-fit"
      >
        <div className="space-y-3">
          {rotationNotes.map((note) => (
            <div key={note} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4 text-sm leading-relaxed text-zinc-300">
              {note}
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
