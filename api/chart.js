const ASSET_SYMBOLS = {
  kospi: '^KS11',
  kosdaq: '^KQ11',
  nasdaq: '^IXIC',
  'spot-gold': 'GC=F',
  wti: 'CL=F',
  dxy: 'DX-Y.NYB',
}

const TIMEFRAME_CONFIG = {
  '15m': { interval: '15m', range: '5d', aggregateSize: 1 },
  '1H': { interval: '60m', range: '1mo', aggregateSize: 1 },
  '4H': { interval: '60m', range: '1mo', aggregateSize: 4 },
  '1D': { interval: '1d', range: '6mo', aggregateSize: 1 },
  '1W': { interval: '1wk', range: '2y', aggregateSize: 1 },
}

function round(value, precision = 4) {
  return Number(value.toFixed(precision))
}

function normalizeBars(result, aggregateSize) {
  const timestamps = result.timestamp ?? []
  const quote = result.indicators?.quote?.[0] ?? {}
  const bars = timestamps.map((timestamp, index) => ({
    time: timestamp,
    open: quote.open?.[index],
    high: quote.high?.[index],
    low: quote.low?.[index],
    close: quote.close?.[index],
  })).filter((bar) => [bar.open, bar.high, bar.low, bar.close].every((value) => typeof value === 'number'))

  if (aggregateSize === 1) {
    return bars.map((bar) => ({
      time: new Date(bar.time * 1000).toISOString().slice(0, 10),
      open: round(bar.open),
      high: round(bar.high),
      low: round(bar.low),
      close: round(bar.close),
    }))
  }

  const aggregated = []
  for (let index = 0; index < bars.length; index += aggregateSize) {
    const chunk = bars.slice(index, index + aggregateSize)
    if (!chunk.length) continue
    aggregated.push({
      time: new Date(chunk[0].time * 1000).toISOString().slice(0, 10),
      open: round(chunk[0].open),
      high: round(Math.max(...chunk.map((bar) => bar.high))),
      low: round(Math.min(...chunk.map((bar) => bar.low))),
      close: round(chunk[chunk.length - 1].close),
    })
  }

  return aggregated
}

export async function fetchChartPayload(assetId, timeframe) {
  const yahooSymbol = ASSET_SYMBOLS[assetId]
  const config = TIMEFRAME_CONFIG[timeframe] ?? TIMEFRAME_CONFIG['1D']

  if (!yahooSymbol) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?interval=${config.interval}&range=${config.range}`,
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
  )

  if (!response.ok) {
    throw new Error(`Upstream request failed: ${response.status}`)
  }

  const json = await response.json()
  const result = json.chart?.result?.[0]
  if (!result) {
    throw new Error('Upstream payload missing chart result')
  }

  const bars = normalizeBars(result, config.aggregateSize)

  return {
    assetId,
    timeframe,
    bars,
    provider: 'yahoo-chart-proxy',
    instrumentSymbol: yahooSymbol,
    fetchedAt: new Date().toISOString(),
    lastClose: bars[bars.length - 1]?.close ?? null,
  }
}

export default async function handler(request, response) {
  const { assetId, timeframe = '1D' } = request.query

  try {
    const payload = await fetchChartPayload(assetId, timeframe)
    response.status(200).json(payload)
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown chart proxy error',
    })
  }
}
