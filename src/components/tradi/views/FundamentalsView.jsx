import PanelCard from '../PanelCard'
import { fundamentalCards, fundamentalCoverage, researchChecklist } from '../data'

export default function FundamentalsView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <div className="space-y-4">
        <PanelCard
          title="Fundamentals Workspace"
          subtitle="A static research placeholder for the slower-moving drivers behind the active market narrative."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {fundamentalCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{card.label}</div>
                <div className={`mt-4 text-2xl font-semibold ${card.tone}`}>{card.value}</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.note}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Coverage Queue"
          subtitle="Placeholder research lanes for the themes the workspace is already trading around."
        >
          <div className="space-y-3">
            {fundamentalCoverage.map((item) => (
              <div key={item.name} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="text-base font-medium text-zinc-100">{item.name}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.summary}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard
        title="Research Checklist"
        subtitle="Simple static fields for the future deep-dive panel without adding any real data plumbing."
        className="h-fit"
      >
        <div className="space-y-3">
          {researchChecklist.map((item) => (
            <div key={item.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-4">
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">{item.label}</div>
              <div className="mt-2 text-sm leading-relaxed text-zinc-200">{item.value}</div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
