import { useMemo } from 'react'
import PanelCard from '../PanelCard'
import { macroDrivers, policyCompass } from '../data'
import { useMarketSnapshots } from '../useMarketSnapshots'

export default function MacroView() {
  const snapshots = useMarketSnapshots()

  const { macroScorecards, scenarioPaths } = useMemo(() => {
    const byId = Object.fromEntries(snapshots.map((item) => [item.id, item]))
    const kospi = byId.kospi
    const kosdaq = byId.kosdaq
    const nasdaq = byId.nasdaq
    const gold = byId['spot-gold']
    const wti = byId.wti
    const dxy = byId.dxy

    const scorecards = [
      {
        label: 'Korea risk',
        value: kospi?.move?.startsWith('-') || kosdaq?.move?.startsWith('-') ? 'Mixed' : 'Bid',
        note: `${kospi?.symbol ?? 'KOSPI'} ${kospi?.move ?? ''} / ${kosdaq?.symbol ?? 'KOSDAQ'} ${kosdaq?.move ?? ''}`,
        tone: kosdaq?.tone ?? 'text-zinc-300',
      },
      {
        label: 'US growth',
        value: nasdaq?.move?.startsWith('-') ? 'Cooling' : 'Stable',
        note: `${nasdaq?.symbol ?? 'NASDAQ'} ${nasdaq?.move ?? ''} keeps acting as the anchor growth read.`,
        tone: nasdaq?.tone ?? 'text-zinc-300',
      },
      {
        label: 'Dollar path',
        value: dxy?.move?.startsWith('-') ? 'Softer' : 'Firmer',
        note: `${dxy?.symbol ?? 'DXY'} ${dxy?.move ?? ''} shapes pressure on gold and global risk assets.`,
        tone: dxy?.tone ?? 'text-zinc-300',
      },
      {
        label: 'Energy pulse',
        value: wti?.move?.startsWith('-') ? 'Mixed' : 'Firm',
        note: `${wti?.symbol ?? 'WTI'} ${wti?.move ?? ''} while ${gold?.symbol ?? 'XAUUSD'} sits at ${gold?.move ?? ''}.`,
        tone: wti?.tone ?? 'text-zinc-300',
      },
    ]

    const scenarios = [
      {
        name: 'Soft-dollar risk-on',
        probability: dxy?.move?.startsWith('-') && nasdaq && !nasdaq.move.startsWith('-') ? 'Live' : 'Watch',
        outcome: `${nasdaq?.symbol ?? 'NASDAQ'} and ${dxy?.symbol ?? 'DXY'} are currently the cleanest real-time confirmation pair.`,
      },
      {
        name: 'Hot-inflation repricing',
        probability: dxy && !dxy.move.startsWith('-') ? 'Elevated' : 'Muted',
        outcome: `${dxy?.symbol ?? 'DXY'} direction is the fastest available warning signal for this path.`,
      },
      {
        name: 'Growth-scare rotation',
        probability: wti?.move?.startsWith('-') && kosdaq?.move?.startsWith('-') ? 'Rising' : 'Low',
        outcome: `${wti?.symbol ?? 'WTI'} and ${kosdaq?.symbol ?? 'KOSDAQ'} weakening together would validate the scare rotation read.`,
      },
    ]

    return { macroScorecards: scorecards, scenarioPaths: scenarios }
  }, [snapshots])

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <div className="space-y-4">
        <PanelCard
          title="Macro Dashboard"
          subtitle="A dedicated placeholder workspace for the regime, policy, and cross-asset backdrop."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {macroScorecards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{card.label}</div>
                <div className={`mt-4 text-2xl font-semibold ${card.tone}`}>{card.value}</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.note}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Cross-Asset Narrative"
          subtitle="Static notes that frame how growth, inflation, and policy are feeding through the market."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {macroDrivers.map((driver) => (
              <div key={driver.title} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="text-sm font-medium text-zinc-100">{driver.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{driver.description}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <div className="space-y-4">
        <PanelCard
          title="Policy Compass"
          subtitle="Quick static read on how the main central-bank narratives currently differ."
          className="h-fit"
        >
          <div className="space-y-3">
            {policyCompass.map((item) => (
              <div key={item.bank} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-zinc-100">{item.bank}</div>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${item.tone}`}>
                    {item.stance}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.note}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Scenario Tree"
          subtitle="Simplified placeholder paths for how the session could evolve from here."
          className="h-fit"
        >
          <div className="space-y-3">
            {scenarioPaths.map((scenario) => (
              <div key={scenario.name} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-zinc-100">{scenario.name}</div>
                  <div className="text-sm font-semibold text-cyan-300">{scenario.probability}</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{scenario.outcome}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  )
}
