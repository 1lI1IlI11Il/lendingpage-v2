function getCloses(data) {
  return data.map((bar) => bar.close)
}

function average(values) {
  if (values.length === 0) {
    return 0
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function getTrendSnapshot(data) {
  const closes = getCloses(data)
  const shortWindow = closes.slice(-3)
  const longWindow = closes.slice(-5)
  const shortAverage = average(shortWindow)
  const longAverage = average(longWindow)
  const lastClose = closes.at(-1) ?? 0
  const previousClose = closes.at(-2) ?? lastClose
  const trendDelta = shortAverage - longAverage
  const momentum = lastClose - previousClose

  return {
    shortAverage,
    longAverage,
    lastClose,
    trendDelta,
    momentum,
    bias: trendDelta >= 0 ? 'Trend above base' : 'Trend below base',
  }
}

export function getMomentumBars(data) {
  const closes = getCloses(data)
  const deltas = closes.slice(1).map((close, index) => Number((close - closes[index]).toFixed(4)))
  const recentDeltas = deltas.slice(-6)
  const maxDelta = Math.max(...recentDeltas.map((value) => Math.abs(value)), 0.0001)

  return recentDeltas.map((value, index) => ({
    id: `${index}-${value}`,
    value,
    heightPercent: Math.max(18, Math.round((Math.abs(value) / maxDelta) * 100)),
    tone: value >= 0 ? 'bg-emerald-500/55' : 'bg-rose-500/55',
  }))
}
