import PanelCard from '../PanelCard'
import { macroDrivers, macroScorecards, policyCompass, scenarioPaths } from '../data'

export default function MacroView() {
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
