export function getAssetChartSeries(asset, timeframe) {
  return asset.chartDataByTimeframe[timeframe] ?? asset.chartDataByTimeframe[asset.defaultTimeframe] ?? []
}

export function getAssetSnapshotRows(asset) {
  return asset.snapshotStats
}

export function getAssetContextRows(asset, tab) {
  return asset.contextPanels[tab] ?? asset.contextPanels.flows ?? []
}
