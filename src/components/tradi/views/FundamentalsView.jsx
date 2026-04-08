import PanelCard from '../PanelCard'
import { getAssetCapabilities } from '../assetCapabilities'
import { fundamentalCards, fundamentalCoverage, researchChecklist } from '../data'

export default function FundamentalsView({ activeAsset }) {
  const capabilities = getAssetCapabilities(activeAsset)
  const fundamentalsSupported = capabilities.supportsCorporateFundamentals

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <div className="space-y-4">
        <PanelCard
          title="Fundamentals Workspace"
          subtitle={`Research framing for ${activeAsset.symbol}. ${fundamentalsSupported ? 'Index-style structural context is supported.' : 'Corporate fundamentals are not directly applicable to this asset type.'}`}
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {(fundamentalsSupported ? fundamentalCards : [
              {
                label: 'Instrument type',
                value: activeAsset.instrumentType,
                note: `${activeAsset.symbol} is better read as a macro instrument than a company financial statement target.`,
                tone: activeAsset.tone,
              },
              {
                label: 'Quote style',
                value: activeAsset.quoteStyle,
                note: 'Interpret the feed in benchmark/proxy terms before treating it like a corporate security.',
                tone: 'text-zinc-300',
              },
              {
                label: 'Primary lens',
                value: 'Macro context',
                note: 'Rates, dollar pressure, energy flows, and policy events matter more than issuer fundamentals here.',
                tone: 'text-amber-300',
              },
              {
                label: 'Applicability',
                value: 'Not company-level',
                note: 'This workspace should show structural context, not revenue or earnings tables, for this asset.',
                tone: 'text-rose-300',
              },
            ]).map((card) => (
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
          subtitle={fundamentalsSupported ? 'Research lanes for the index-level themes the workspace is already trading around.' : `Coverage guidance for ${activeAsset.symbol} as a macro asset.`}
        >
          <div className="space-y-3">
            {(fundamentalsSupported ? fundamentalCoverage : [
              {
                name: `${activeAsset.symbol} structural drivers`,
                summary: 'Track benchmark construction, proxy limitations, and the macro variables that actually move this asset.',
              },
              {
                name: 'Source honesty',
                summary: 'Keep benchmark, proxy, and delayed-feed caveats visible instead of pretending this behaves like a single listed company.',
              },
              {
                name: 'Cross-asset linkage',
                summary: 'Read this asset alongside the other five tracked macro instruments, not through issuer-specific valuation logic.',
              },
            ]).map((item) => (
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
            {capabilities.reservedSlots.companyFundamentals ? (
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.22em] text-cyan-300">Reserved slot</div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-100">Equity fundamentals module reserved for future corporate symbols.</div>
              </div>
            ) : null}
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
