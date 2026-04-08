export function sma(values, period) {
  if (!values.length) return []
  return values.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const window = values.slice(start, index + 1)
    return window.reduce((sum, value) => sum + value, 0) / window.length
  })
}

export function ema(values, period) {
  if (!values.length) return []
  const multiplier = 2 / (period + 1)
  return values.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value)
      return acc
    }
    acc.push(value * multiplier + acc[index - 1] * (1 - multiplier))
    return acc
  }, [])
}

export function trueRange(bar, previousClose) {
  return Math.max(
    bar.high - bar.low,
    Math.abs(bar.high - previousClose),
    Math.abs(bar.low - previousClose),
  )
}

export function atr(bars, period) {
  if (!bars.length) return []
  const ranges = bars.map((bar, index) => {
    const previousClose = index === 0 ? bar.close : bars[index - 1].close
    return trueRange(bar, previousClose)
  })
  return ema(ranges, period)
}

export function rollingStdDev(values, period) {
  if (!values.length) return []
  return values.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const window = values.slice(start, index + 1)
    const mean = window.reduce((sum, value) => sum + value, 0) / window.length
    const variance = window.reduce((sum, value) => sum + (value - mean) ** 2, 0) / window.length
    return Math.sqrt(variance)
  })
}

export function highest(values, period) {
  return values.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    return Math.max(...values.slice(start, index + 1))
  })
}

export function lowest(values, period) {
  return values.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    return Math.min(...values.slice(start, index + 1))
  })
}

export function linreg(values, period) {
  return values.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const window = values.slice(start, index + 1)
    const n = window.length
    const sumX = (n * (n - 1)) / 2
    const sumY = window.reduce((sum, value) => sum + value, 0)
    const sumXY = window.reduce((sum, value, x) => sum + x * value, 0)
    const sumXX = window.reduce((sum, _, x) => sum + x * x, 0)
    const denominator = n * sumXX - sumX * sumX
    if (denominator === 0) return window[window.length - 1] ?? 0
    const slope = (n * sumXY - sumX * sumY) / denominator
    const intercept = (sumY - slope * sumX) / n
    return intercept + slope * (n - 1)
  })
}
