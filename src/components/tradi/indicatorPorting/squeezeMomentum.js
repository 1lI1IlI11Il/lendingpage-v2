import { highest, linreg, lowest, rollingStdDev, sma } from './shared.js'

export function computeSqueezeMomentum(bars, length = 20, bbMultiplier = 2, kcMultiplier = 1.5) {
  if (!bars.length) {
    return {
      state: 'neutral',
      latestMomentum: null,
      histogram: [],
      squeezeOn: false,
      squeezeOff: false,
    }
  }

  const closes = bars.map((bar) => bar.close)
  const highs = bars.map((bar) => bar.high)
  const lows = bars.map((bar) => bar.low)

  const basis = sma(closes, length)
  const deviations = rollingStdDev(closes, length)
  const highsWindow = highest(highs, length)
  const lowsWindow = lowest(lows, length)
  const rangeBasis = basis.map((value, index) => (((highsWindow[index] + lowsWindow[index]) / 2) + value) / 2)
  const momentumInput = closes.map((close, index) => close - rangeBasis[index])
  const momentumValues = linreg(momentumInput, length)

  const bbUpper = basis.map((value, index) => value + deviations[index] * bbMultiplier)
  const bbLower = basis.map((value, index) => value - deviations[index] * bbMultiplier)
  const trueRanges = bars.map((bar) => bar.high - bar.low)
  const kcBasis = sma(closes, length)
  const kcRange = sma(trueRanges, length)
  const kcUpper = kcBasis.map((value, index) => value + kcRange[index] * kcMultiplier)
  const kcLower = kcBasis.map((value, index) => value - kcRange[index] * kcMultiplier)
  const latestBbLower = bbLower[bbLower.length - 1]
  const latestBbUpper = bbUpper[bbUpper.length - 1]
  const latestKcLower = kcLower[kcLower.length - 1]
  const latestKcUpper = kcUpper[kcUpper.length - 1]
  const squeezeOn = latestBbLower >= latestKcLower && latestBbUpper <= latestKcUpper
  const squeezeOff = latestBbLower < latestKcLower && latestBbUpper > latestKcUpper
  const state = squeezeOn ? 'compression' : squeezeOff ? 'released' : 'neutral'

  const recentMomentum = momentumValues.slice(-8)
  const histogramScale = Math.max(...recentMomentum.map((item) => Math.abs(item)), 0.0001)

  const histogram = recentMomentum.map((value, index) => ({
    id: `${index}-${value}`,
    value,
    heightPercent: Math.max(18, Math.round((Math.abs(value) / histogramScale) * 100)),
    tone: value >= 0 ? 'bg-emerald-500/55' : 'bg-rose-500/55',
  }))

  return {
    state,
    latestMomentum: momentumValues[momentumValues.length - 1] ?? null,
    histogram,
    squeezeOn,
    squeezeOff,
  }
}
