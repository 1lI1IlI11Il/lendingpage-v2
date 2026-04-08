import { getAssetSourceStrategy } from './assetSources'
import { getAssetChartSeries, getAssetContextRows, getAssetSnapshotRows } from './marketDataAdapter'

export async function getLocalChartPayload(asset, timeframe, contextTab) {
  let remotePayload = null

  try {
    const response = await fetch(`/api/chart?assetId=${encodeURIComponent(asset.id)}&timeframe=${encodeURIComponent(timeframe)}`)
    if (response.ok) {
      remotePayload = await response.json()
    }
  } catch {
    remotePayload = null
  }

  const bars = remotePayload?.bars ?? getAssetChartSeries(asset, timeframe)

  return {
    assetId: asset.id,
    timeframe,
    bars,
    snapshotRows: getAssetSnapshotRows(asset),
    contextRows: getAssetContextRows(asset, contextTab),
    sourceStrategy: getAssetSourceStrategy(asset),
    lastClose: bars[bars.length - 1]?.close ?? asset.priceMarker,
    provider: remotePayload?.provider ?? 'local-registry-fallback',
  }
}
