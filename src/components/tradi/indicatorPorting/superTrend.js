import { atr } from './shared.js'

export function computeSuperTrend(bars, period = 10, multiplier = 3) {
  if (bars.length < 2) {
    return {
      state: 'neutral',
      latestLine: null,
      latestAtr: null,
      history: [],
    }
  }

  const atrValues = atr(bars, period)
  const lines = []
  const directions = []
  let previousFinalUpper = null
  let previousFinalLower = null
  let previousSuperTrend = null

  bars.forEach((bar, index) => {
    const hl2 = (bar.high + bar.low) / 2
    const atrValue = atrValues[index] ?? 0
    const basicUpperBand = hl2 + multiplier * atrValue
    const basicLowerBand = hl2 - multiplier * atrValue

    if (index === 0) {
      previousFinalUpper = basicUpperBand
      previousFinalLower = basicLowerBand
      previousSuperTrend = basicLowerBand
      directions.push('neutral')
      lines.push({ time: bar.time, value: previousSuperTrend })
      return
    }

    const previousClose = bars[index - 1].close
    const finalUpperBand =
      basicUpperBand < previousFinalUpper || previousClose > previousFinalUpper
        ? basicUpperBand
        : previousFinalUpper

    const finalLowerBand =
      basicLowerBand > previousFinalLower || previousClose < previousFinalLower
        ? basicLowerBand
        : previousFinalLower

    let currentSuperTrend = previousSuperTrend

    if (previousSuperTrend === previousFinalUpper) {
      currentSuperTrend = bar.close <= finalUpperBand ? finalUpperBand : finalLowerBand
    } else if (previousSuperTrend === previousFinalLower) {
      currentSuperTrend = bar.close >= finalLowerBand ? finalLowerBand : finalUpperBand
    } else {
      currentSuperTrend = bar.close >= finalLowerBand ? finalLowerBand : finalUpperBand
    }

    directions.push(currentSuperTrend === finalLowerBand ? 'bullish' : 'bearish')
    lines.push({ time: bar.time, value: currentSuperTrend })

    previousFinalUpper = finalUpperBand
    previousFinalLower = finalLowerBand
    previousSuperTrend = currentSuperTrend
  })

  return {
    state: directions[directions.length - 1] ?? 'neutral',
    latestLine: lines[lines.length - 1]?.value ?? null,
    latestAtr: atrValues[atrValues.length - 1] ?? null,
    history: lines.slice(-8),
  }
}
