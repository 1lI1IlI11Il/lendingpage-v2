import { navigation } from './data'

export default function TopBar({ activeView, activeAsset, assets, liveSnapshots, onAssetChange }) {
  const activeItem = navigation.find((item) => item.id === activeView) ?? navigation[0]
  const activeSnapshot = liveSnapshots.find((item) => item.id === activeAsset.id)

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/90 px-4 py-4 backdrop-blur xl:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3 lg:min-w-[320px]">
            <span className="text-sm text-zinc-500">⌕</span>
            <label htmlFor="asset-picker" className="sr-only">
              Choose active asset
            </label>
            <select
              id="asset-picker"
              value={activeAsset.id}
              onChange={(event) => onAssetChange(event.target.value)}
              className="w-full bg-transparent text-sm text-zinc-300 outline-none"
            >
              {assets.map((item) => (
                <option key={item.id} value={item.id} className="bg-zinc-950 text-zinc-100">
                  {item.symbol} · {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              {activeAsset.symbol}
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400">
              View: {activeItem.label}
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400">
              {activeAsset.market}
            </span>
            <span className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400">
              {activeAsset.instrumentType}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            Session bias: {activeAsset.sessionBias}
          </span>
          {activeSnapshot ? (
            <span className={`rounded-full border border-zinc-800 px-3 py-1.5 text-xs font-medium ${activeSnapshot.tone}`}>
              {activeSnapshot.price} · {activeSnapshot.move}
            </span>
          ) : null}
          <span className="rounded-full border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-500">
            {activeAsset.quoteStyle}
          </span>
        </div>
      </div>
    </header>
  )
}
