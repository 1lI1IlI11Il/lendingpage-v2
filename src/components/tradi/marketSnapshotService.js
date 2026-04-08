import { assetOptions } from './data'

function formatSignedPercent(value) {
  const rounded = value.toFixed(2)
  return `${value >= 0 ? '+' : ''}${rounded}%`
}

function getFallbackSnapshot(asset) {
  return {
    id: asset.id,
    symbol: asset.symbol,
    name: asset.name,
    market: asset.market,
    price: asset.price,
    move: asset.move,
    tone: asset.tone,
    provider: 'local-registry-fallback',
  }
}

function getTone(changePercent) {
  return changePercent >= 0 ? 'text-emerald-300' : 'text-rose-300'
}

export async function getMarketSnapshots() {
  const snapshots = await Promise.all(
    assetOptions.map(async (asset) => {
      try {
        const response = await fetch(`/api/chart?assetId=${encodeURIComponent(asset.id)}&timeframe=1D`)
        if (!response.ok) {
          return getFallbackSnapshot(asset)
        }

        const payload = await response.json()
        const bars = payload.bars ?? []
        const lastBar = bars[bars.length - 1]
        const previousBar = bars[bars.length - 2]

        if (!lastBar || !previousBar) {
          return getFallbackSnapshot(asset)
        }

        const changePercent = ((lastBar.close - previousBar.close) / previousBar.close) * 100

        return {
          id: asset.id,
          symbol: asset.symbol,
          name: asset.name,
          market: asset.market,
          price: lastBar.close.toLocaleString(undefined, { maximumFractionDigits: 4 }),
          move: formatSignedPercent(changePercent),
          tone: getTone(changePercent),
          provider: payload.provider ?? 'remote-unknown',
        }
      } catch {
        return getFallbackSnapshot(asset)
      }
    }),
  )

  return snapshots
}
