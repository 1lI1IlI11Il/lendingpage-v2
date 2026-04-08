function round(value, precision = 2) {
  return Number(value.toFixed(precision))
}

function buildSeries(times, closes, precision = 2, spreadRatio = 0.004) {
  return closes.map((close, index) => {
    const open = index === 0 ? close * (1 - spreadRatio / 2) : closes[index - 1]
    const spread = Math.max(Math.abs(close - open), close * spreadRatio)

    return {
      time: times[index],
      open: round(open, precision),
      high: round(Math.max(open, close) + spread * 0.45, precision),
      low: round(Math.min(open, close) - spread * 0.45, precision),
      close: round(close, precision),
    }
  })
}

function buildSeriesMap({ precision = 2, spreadRatio = 0.004, closesByTimeframe }) {
  return {
    '15m': buildSeries(['2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04', '2024-04-05'], closesByTimeframe['15m'], precision, spreadRatio),
    '1H': buildSeries(['2024-03-20', '2024-03-27', '2024-04-03', '2024-04-10', '2024-04-17'], closesByTimeframe['1H'], precision, spreadRatio),
    '4H': buildSeries(['2024-02-23', '2024-03-08', '2024-03-22', '2024-04-05', '2024-04-19'], closesByTimeframe['4H'], precision, spreadRatio),
    '1D': buildSeries(['2024-01-31', '2024-02-29', '2024-03-29', '2024-04-30', '2024-05-31'], closesByTimeframe['1D'], precision, spreadRatio),
    '1W': buildSeries(['2023-12-29', '2024-01-26', '2024-02-23', '2024-03-22', '2024-04-19'], closesByTimeframe['1W'], precision, spreadRatio),
  }
}

export const navigation = [
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dash', badge: 'Live' },
  { id: 'chart', label: 'Chart Workspace', shortLabel: 'Chart', badge: 'FX' },
  { id: 'macro', label: 'Macro', shortLabel: 'Macro', badge: 'Top' },
  { id: 'calendar', label: 'Calendar', shortLabel: 'Cal', badge: 'Evt' },
  { id: 'heatmap', label: 'Heatmap', shortLabel: 'Map', badge: 'Rot' },
  { id: 'news', label: 'News', shortLabel: 'News', badge: 'Tape' },
  { id: 'fundamentals', label: 'Fundamentals', shortLabel: 'Facts', badge: 'Deep' },
]

export const chartTimeframes = ['15m', '1H', '4H', '1D', '1W']

export const assetOptions = [
  {
    id: 'kospi',
    symbol: 'KOSPI',
    name: 'Korea Composite Stock Price Index',
    market: 'KRX Index',
    instrumentType: 'index',
    canonicalInstrument: 'KOSPI Index',
    quoteStyle: 'KRX delayed index quote',
    contextLabel: 'krx broad market',
    price: '2,742.1',
    move: '+0.84%',
    tone: 'text-emerald-300',
    sessionBias: 'risk-on domestic',
    defaultTimeframe: '1D',
    session: 'KRX cash session',
    priceMarker: '2,742.1',
    caveat: 'Use KRX delayed/public data for analytics; free real-time is limited.',
    snapshotStats: [
      { label: 'Instrument', value: 'Official broad equity index' },
      { label: 'Feed style', value: 'Delayed KRX index quote' },
      { label: 'Lens', value: 'Domestic risk appetite and large-cap breadth' },
      { label: 'Caveat', value: 'Public KRX access is not a free real-time feed' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [2712, 2719, 2726, 2734, 2742.1],
        '1H': [2688, 2699, 2711, 2728, 2742.1],
        '4H': [2656, 2678, 2697, 2721, 2742.1],
        '1D': [2584, 2627, 2669, 2708, 2742.1],
        '1W': [2512, 2564, 2622, 2691, 2742.1],
      },
    }),
    contextPanels: {
      flows: [
        'Foreign buying remains the cleanest driver for KOSPI follow-through.',
        'Domestic institutions have been supporting pullbacks rather than driving breakouts.',
        'Leadership is broad enough to read this as index strength, not a single-theme squeeze.',
      ],
      levels: [
        '2,750 is the first obvious momentum checkpoint for local breakout continuation.',
        '2,700 is the balance zone where failed breakouts likely reset the tape.',
        '2,665 is the deeper invalidation area for the current domestic risk-on read.',
      ],
      macro: [
        'KRW stability and foreign flow matter more than local headlines on trend days.',
        'Semiconductor leadership is the clearest bridge between KOSPI and Nasdaq sentiment.',
        'US rates and dollar pressure still leak directly into domestic index appetite.',
      ],
    },
  },
  {
    id: 'kosdaq',
    symbol: 'KOSDAQ',
    name: 'Korea Securities Dealers Automated Quotations',
    market: 'KRX Growth Index',
    instrumentType: 'index',
    canonicalInstrument: 'KOSDAQ Index',
    quoteStyle: 'KRX delayed growth-index quote',
    contextLabel: 'krx growth',
    price: '871.6',
    move: '+1.18%',
    tone: 'text-emerald-300',
    sessionBias: 'higher beta bid',
    defaultTimeframe: '1D',
    session: 'KRX growth session',
    priceMarker: '871.6',
    caveat: 'Interpret as higher-beta domestic sentiment rather than a blue-chip benchmark.',
    snapshotStats: [
      { label: 'Instrument', value: 'Official growth/secondary board index' },
      { label: 'Feed style', value: 'Delayed KRX index quote' },
      { label: 'Lens', value: 'Retail risk appetite and small/mid growth tone' },
      { label: 'Caveat', value: 'More sentiment-sensitive and noisier than KOSPI' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [856.4, 860.1, 864.5, 868.3, 871.6],
        '1H': [845.2, 850.8, 857.3, 865.4, 871.6],
        '4H': [832.7, 840.4, 849.9, 861.1, 871.6],
        '1D': [804.3, 821.8, 838.6, 855.2, 871.6],
        '1W': [778.9, 797.6, 821.5, 848.4, 871.6],
      },
    }),
    contextPanels: {
      flows: [
        'KOSDAQ strength is being led by domestic growth and biotech risk appetite.',
        'Retail participation is amplifying upside follow-through more than in KOSPI.',
        'The tape weakens quickly when local momentum names stop making new highs.',
      ],
      levels: [
        '875 is the near-term expansion zone for continued small-cap risk acceptance.',
        '860 is the first meaningful support shelf for trend continuation.',
        '842 is the deeper reset level if higher-beta appetite fades quickly.',
      ],
      macro: [
        'KOSDAQ usually reacts harder than KOSPI to global duration and liquidity shifts.',
        'When Nasdaq cools, KOSDAQ often loses leadership first.',
        'This is the domestic growth-risk gauge, not the best read on broad Korea defensiveness.',
      ],
    },
  },
  {
    id: 'nasdaq',
    symbol: 'NASDAQ',
    name: 'Nasdaq Composite',
    market: 'US Index',
    instrumentType: 'index',
    canonicalInstrument: 'Nasdaq Composite Index',
    quoteStyle: 'Official index semantics, licensed real-time in production',
    contextLabel: 'us tech breadth',
    price: '17,918.4',
    move: '+0.67%',
    tone: 'text-emerald-300',
    sessionBias: 'tech-led constructive',
    defaultTimeframe: '1D',
    session: 'US cash session',
    priceMarker: '17,918.4',
    caveat: 'Decide explicitly whether the product means Composite breadth or Nasdaq-100 leadership.',
    snapshotStats: [
      { label: 'Instrument', value: 'Broad US Nasdaq equity index' },
      { label: 'Feed style', value: 'Official index semantics / licensed real-time' },
      { label: 'Lens', value: 'US growth and tech-led global risk appetite' },
      { label: 'Caveat', value: 'Composite and NDX/QQQ are not interchangeable' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [17784, 17812, 17845, 17878, 17918.4],
        '1H': [17630, 17688, 17735, 17812, 17918.4],
        '4H': [17384, 17516, 17652, 17781, 17918.4],
        '1D': [16884, 17148, 17426, 17695, 17918.4],
        '1W': [16122, 16540, 17008, 17482, 17918.4],
      },
    }),
    contextPanels: {
      flows: [
        'Mega-cap tech continues to anchor the tape, but participation has improved beneath the surface.',
        'Semiconductor leadership remains the fastest signal for Nasdaq continuation or failure.',
        'If breadth narrows again, index highs become less trustworthy than the headline print suggests.',
      ],
      levels: [
        '18,000 is the headline breakout number that likely shapes short-term narrative risk.',
        '17,700 is the first support zone where dip buyers need to show up again.',
        '17,350 is the larger reset area if US duration re-prices against growth.',
      ],
      macro: [
        'Nasdaq is the cleanest global read on duration-friendly growth sentiment.',
        'It transmits quickly into KOSDAQ and semiconductor-heavy KOSPI leadership.',
        'If the dollar and long-end yields both rise together, this index becomes more fragile.',
      ],
    },
  },
  {
    id: 'spot-gold',
    symbol: 'XAUUSD',
    name: 'Spot Gold',
    market: 'Precious Metals',
    instrumentType: 'spot benchmark',
    canonicalInstrument: 'Spot Gold / XAUUSD semantics',
    quoteStyle: 'Spot-style display with futures-capable backend',
    contextLabel: 'gold and real yields',
    price: '2,314.5',
    move: '+0.62%',
    tone: 'text-emerald-300',
    sessionBias: 'defensive firm',
    defaultTimeframe: '4H',
    session: '24h OTC metal session',
    priceMarker: '2,314.5',
    caveat: 'LBMA is a benchmark, not a free continuous intraday feed; futures and spot can diverge.',
    snapshotStats: [
      { label: 'Instrument', value: 'Spot benchmark semantics' },
      { label: 'Feed style', value: 'Spot-style display or GC proxy' },
      { label: 'Lens', value: 'Real yields, dollar stress, hedge demand' },
      { label: 'Caveat', value: 'Benchmark and tradable futures are not the same thing' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [2288.4, 2296.1, 2304.9, 2310.6, 2314.5],
        '1H': [2258.8, 2272.1, 2289.6, 2303.7, 2314.5],
        '4H': [2216.4, 2241.8, 2274.6, 2298.9, 2314.5],
        '1D': [2148.3, 2194.8, 2238.2, 2286.4, 2314.5],
        '1W': [2068.1, 2124.9, 2201.6, 2272.4, 2314.5],
      },
      spreadRatio: 0.008,
    }),
    contextPanels: {
      flows: [
        'Gold stays bid when macro desks want inflation protection without pure equity beta.',
        'Defensive accumulation is more important here than daily directional conviction.',
        'The market responds quickly to real-yield pullbacks even when equities are still strong.',
      ],
      levels: [
        '2,330 is the next obvious extension area if yield pressure keeps easing.',
        '2,285 is the first support shelf for the current breakout structure.',
        '2,240 is the deeper reset line if dollar strength and yields re-accelerate together.',
      ],
      macro: [
        'Spot gold should be analyzed against DXY and real rates more than against single-stock risk sentiment.',
        'This is a benchmark-like macro asset, not a domestic equity index.',
        'GC futures are often the most realistic implementation proxy for robust charting and liquidity context.',
      ],
    },
  },
  {
    id: 'wti',
    symbol: 'WTI',
    name: 'WTI Crude Oil',
    market: 'Energy',
    instrumentType: 'front-month futures proxy',
    canonicalInstrument: 'Front-month NYMEX WTI (CL1)',
    quoteStyle: 'Front-month futures with spot reference caveat',
    contextLabel: 'oil curve and growth',
    price: '79.8',
    move: '-0.44%',
    tone: 'text-rose-300',
    sessionBias: 'range pressure',
    defaultTimeframe: '4H',
    session: 'CME energy session',
    priceMarker: '79.8',
    caveat: 'WTI display usually means front-month futures; roll and contango matter.',
    snapshotStats: [
      { label: 'Instrument', value: 'Front-month crude futures proxy' },
      { label: 'Feed style', value: 'CL front-month with spot reference' },
      { label: 'Lens', value: 'Growth, geopolitics, inventory and curve shape' },
      { label: 'Caveat', value: 'Do not present front futures as physical spot truth' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [81.4, 80.9, 80.4, 80.1, 79.8],
        '1H': [83.2, 82.4, 81.5, 80.7, 79.8],
        '4H': [85.6, 84.2, 82.9, 81.4, 79.8],
        '1D': [88.4, 86.7, 84.1, 81.8, 79.8],
        '1W': [91.6, 89.8, 86.2, 82.7, 79.8],
      },
      precision: 1,
      spreadRatio: 0.01,
    }),
    contextPanels: {
      flows: [
        'Oil is trading more like a macro growth gauge than a pure supply-shock tape right now.',
        'Curve watchers care more about front-month weakness than about a single headline candle.',
        'Energy equities often lag or overshoot the commodity move, so the chart needs curve context.',
      ],
      levels: [
        '81.5 is the first reclaim level if crude wants to stabilize the recent downside pressure.',
        '79.0 is the key round-number support for the current pullback leg.',
        '76.5 is the deeper reset if global demand expectations continue to soften.',
      ],
      macro: [
        'WTI is best tracked as CL front-month, with EIA spot history used as a slower benchmark lane.',
        'Contango and backwardation should be treated as first-class context, not a footnote.',
        'This asset says more about growth and supply risk than about generic equity sentiment.',
      ],
    },
  },
  {
    id: 'dxy',
    symbol: 'DXY',
    name: 'US Dollar Index',
    market: 'FX Macro',
    instrumentType: 'proprietary index',
    canonicalInstrument: 'ICE U.S. Dollar Index',
    quoteStyle: 'Official semantics with proprietary-data caveat',
    contextLabel: 'broad dollar strength',
    price: '104.2',
    move: '-0.21%',
    tone: 'text-rose-300',
    sessionBias: 'soft dollar drift',
    defaultTimeframe: '1D',
    session: 'Global dollar basket session',
    priceMarker: '104.2',
    caveat: 'DXY is proprietary and euro-heavy; a production feed likely needs DX or a licensed source.',
    snapshotStats: [
      { label: 'Instrument', value: 'Official dollar basket index' },
      { label: 'Feed style', value: 'Licensed DXY/DX delayed or proxy' },
      { label: 'Lens', value: 'Broad USD pressure against global risk assets' },
      { label: 'Caveat', value: 'Not a broad trade-weighted dollar measure' },
    ],
    chartDataByTimeframe: buildSeriesMap({
      closesByTimeframe: {
        '15m': [104.9, 104.7, 104.5, 104.3, 104.2],
        '1H': [105.4, 105.1, 104.8, 104.5, 104.2],
        '4H': [106.1, 105.7, 105.2, 104.8, 104.2],
        '1D': [106.8, 106.1, 105.4, 104.8, 104.2],
        '1W': [107.4, 106.9, 106.0, 105.1, 104.2],
      },
      precision: 1,
      spreadRatio: 0.003,
    }),
    contextPanels: {
      flows: [
        'Dollar softness is helping gold and global growth assets hold their recent trend structure.',
        'Because DXY is euro-heavy, EUR/USD still explains a large part of the day-to-day move.',
        'Use this as a macro pressure gauge, not as a tradable implementation detail by itself.',
      ],
      levels: [
        '104.8 is the first reclaim area if the dollar wants to squeeze higher again.',
        '104.0 is the immediate support line for the current soft-dollar read.',
        '103.4 is the next downside extension if rates and inflation tone cool together.',
      ],
      macro: [
        'DXY is a macro context asset first and a charting symbol second.',
        'It should be read alongside yields, gold, and global equity leadership rather than in isolation.',
        'If production data is constrained, DX futures or an explicit proxy path is more honest than pretending the benchmark is free.',
      ],
    },
  },
]

export const watchlist = assetOptions.map(({ id, symbol, price, move, tone }) => ({
  id,
  symbol,
  price,
  move,
  tone,
}))

const assetById = Object.fromEntries(assetOptions.map((asset) => [asset.id, asset]))
const koreaAssets = assetOptions.filter((asset) => asset.market.startsWith('KRX'))
const commodityAssets = assetOptions.filter((asset) => ['spot benchmark', 'front-month futures proxy'].includes(asset.instrumentType))

function getTileTone(asset, neutral = false) {
  if (neutral) {
    return 'border-zinc-800 bg-zinc-900 text-zinc-300'
  }

  return asset.move.startsWith('-')
    ? 'border-rose-500/20 bg-rose-500/10 text-rose-300'
    : asset.instrumentType === 'spot benchmark'
      ? 'border-amber-500/20 bg-amber-500/10 text-amber-300'
      : asset.market.includes('Growth')
        ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
        : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
}

const kospiAsset = assetById.kospi
const kosdaqAsset = assetById.kosdaq
const nasdaqAsset = assetById.nasdaq
const goldAsset = assetById['spot-gold']
const wtiAsset = assetById.wti
const dxyAsset = assetById.dxy

export const summaryCards = [
  { label: 'Korea beta', value: `${kosdaqAsset.symbol} lead`, change: kosdaqAsset.move, tone: kosdaqAsset.tone },
  { label: 'US growth', value: `${nasdaqAsset.symbol} active`, change: nasdaqAsset.move, tone: nasdaqAsset.tone },
  { label: 'Dollar', value: `${dxyAsset.symbol} softer`, change: dxyAsset.move, tone: dxyAsset.tone },
  { label: 'Macro hedge', value: `${goldAsset.symbol} bid`, change: goldAsset.move, tone: goldAsset.tone },
]

export const sectorTiles = [
  { name: kospiAsset.symbol, move: kospiAsset.move, span: 'col-span-2 row-span-2', tone: getTileTone(kospiAsset) },
  { name: kosdaqAsset.symbol, move: kosdaqAsset.move, span: '', tone: getTileTone(kosdaqAsset) },
  { name: nasdaqAsset.symbol, move: nasdaqAsset.move, span: '', tone: getTileTone(nasdaqAsset) },
  { name: goldAsset.name, move: goldAsset.move, span: '', tone: getTileTone(goldAsset) },
  { name: wtiAsset.symbol, move: wtiAsset.move, span: '', tone: getTileTone(wtiAsset) },
  { name: dxyAsset.symbol, move: dxyAsset.move, span: 'col-span-2', tone: getTileTone(dxyAsset, true) },
]

export const calendarEvents = [
  {
    time: '08:30',
    event: 'US CPI (Core)',
    impact: 'High',
    actual: '--',
    forecast: '3.1%',
    prep: 'This is the event that can reprice Nasdaq, DXY, gold, and WTI at the same time.',
  },
  {
    time: '09:00',
    event: 'KRX Foreign Flow Check',
    impact: 'Medium',
    actual: '--',
    forecast: 'Risk-on bias',
    prep: 'Use this as the first read on whether KOSPI/KOSDAQ strength has foreign sponsorship.',
  },
  {
    time: '10:30',
    event: 'EIA Crude Inventory',
    impact: 'Medium',
    actual: '--',
    forecast: 'Drawdown watch',
    prep: 'WTI needs inventory context, not just chart momentum, to avoid false narrative reads.',
  },
  {
    time: 'Tomorrow',
    event: 'Fed Speaker',
    impact: 'High',
    actual: '--',
    forecast: 'Policy tone',
    prep: 'Policy rhetoric often transmits directly into DXY, yields, gold, and Nasdaq leadership.',
  },
]

export const newsItems = [
  {
    source: 'Macro Pulse',
    tag: 'KRX',
    priority: 'High',
    headline: 'Foreign inflows lift Korea indices as semiconductor leadership broadens.',
    detail: 'KOSPI tracks broad domestic appetite while KOSDAQ keeps reading as a higher-beta extension.',
    deskTake: 'If Nasdaq holds, Korea growth beta can keep outrunning defensives.',
  },
  {
    source: 'US Tape',
    tag: 'Nasdaq',
    priority: 'High',
    headline: 'Nasdaq inches toward breakout as rate pressure cools.',
    detail: 'Mega-cap leadership still matters, but breadth is improving enough to trust the move more than before.',
    deskTake: 'Use this as the anchor growth-risk gauge across global assets.',
  },
  {
    source: 'Commodity Wire',
    tag: 'Gold',
    priority: 'Medium',
    headline: 'Spot gold firms while the dollar softens into macro-heavy session.',
    detail: 'The move is consistent with lower real-yield pressure rather than a pure panic bid.',
    deskTake: 'Gold strength is validating softer DXY more than it is signaling equity stress.',
  },
  {
    source: 'Energy Desk',
    tag: 'WTI',
    priority: 'Medium',
    headline: 'WTI drifts lower as the front curve reflects softer demand assumptions.',
    detail: 'Front-month price action is under pressure even before a larger supply shock re-enters the tape.',
    deskTake: 'Treat crude as a growth-and-curve problem, not just a spot price line.',
  },
]

export const contextTabs = [
  { id: 'flows', label: 'Flows' },
  { id: 'levels', label: 'Levels' },
  { id: 'macro', label: 'Macro' },
]

export const macroScorecards = [
  { label: 'Korea risk', value: koreaAssets.every((asset) => !asset.move.startsWith('-')) ? 'Bid' : 'Mixed', note: 'KOSPI and KOSDAQ are now read directly from the tracked Korea asset set.', tone: kospiAsset.tone },
  { label: 'US growth', value: nasdaqAsset.move.startsWith('-') ? 'Cooling' : 'Stable', note: `${nasdaqAsset.symbol} remains the anchor growth-risk asset in the registry.`, tone: nasdaqAsset.tone },
  { label: 'Dollar path', value: dxyAsset.move.startsWith('-') ? 'Softer' : 'Firmer', note: `${dxyAsset.symbol} is the broad dollar pressure gauge tied into the same asset model.`, tone: dxyAsset.tone },
  { label: 'Energy pulse', value: wtiAsset.move.startsWith('-') ? 'Mixed' : 'Firm', note: `${wtiAsset.symbol} is derived from the futures-style proxy asset rather than a disconnected placeholder.`, tone: wtiAsset.tone },
]

export const macroDrivers = [
  {
    title: 'Korea + US growth linkage',
    description: 'Semiconductor and tech leadership tie KOSPI, KOSDAQ, and Nasdaq together more than domestic headlines alone.',
  },
  {
    title: 'Dollar pressure channel',
    description: 'DXY softness is one of the cleanest shared drivers for gold strength and easier global risk conditions.',
  },
  {
    title: 'Oil as macro filter',
    description: 'WTI weakness can calm inflation but also challenge the growth narrative if demand assumptions are driving it.',
  },
]

export const policyCompass = [
  { bank: 'Fed', stance: 'Restrictive', note: 'Still the main policy driver for Nasdaq, DXY, and gold.', tone: 'border-amber-500/20 bg-amber-500/10 text-amber-300' },
  { bank: 'BoK', stance: 'Watching', note: 'Local policy matters, but KRX indices still transmit global flow and dollar conditions.', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
  { bank: 'Global demand', stance: 'Mixed', note: 'WTI remains the fastest read on whether growth-sensitive macro is improving or deteriorating.', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
]

export const scenarioPaths = [
  { name: 'Soft-dollar risk-on', probability: '48%', outcome: 'Nasdaq, KOSDAQ, and gold can all stay supported together.' },
  { name: 'Hot-inflation repricing', probability: '32%', outcome: 'DXY firms, Nasdaq cools, and gold has to absorb higher real yields.' },
  { name: 'Growth-scare rotation', probability: '20%', outcome: 'WTI stays soft, KOSDAQ loses leadership, and defensive macro hedges outperform.' },
]

export const calendarSessions = [
  {
    label: 'Korea open',
    time: '09:00 – 15:30 KST',
    focus: 'Best read on whether KOSPI and KOSDAQ are moving with domestic flow or following overnight US growth sentiment.',
  },
  {
    label: 'Europe / Macro',
    time: '13:00 – 18:00 UTC',
    focus: 'Good transition window for DXY, gold, and WTI narrative alignment before the US session takes control.',
  },
  {
    label: 'US cash',
    time: '09:30 – 16:00 ET',
    focus: 'Nasdaq direction and macro releases usually determine whether the cross-asset story continues or breaks.',
  },
]

export const eventChecklist = [
  'Treat KOSPI and KOSDAQ as separate reads on broad domestic risk and higher-beta domestic growth.',
  'Use Nasdaq as the global growth anchor before interpreting the Korea indices too confidently.',
  'Always read gold, WTI, and DXY with their benchmark/proxy caveats in mind before making a strong narrative call.',
]

export const heatmapGroups = [
  {
    title: 'Tracked Assets',
    items: assetOptions.map((asset) => ({
      label: asset.symbol,
      move: asset.move,
      tone: getTileTone(asset, asset.id === 'dxy'),
    })),
  },
  {
    title: 'Macro Hedges',
    items: [
      { label: goldAsset.symbol, move: goldAsset.move, tone: getTileTone(goldAsset) },
      { label: dxyAsset.symbol, move: dxyAsset.move, tone: getTileTone(dxyAsset) },
      { label: wtiAsset.symbol, move: wtiAsset.move, tone: getTileTone(wtiAsset) },
      { label: kosdaqAsset.symbol, move: kosdaqAsset.move, tone: getTileTone(kosdaqAsset) },
      { label: nasdaqAsset.symbol, move: nasdaqAsset.move, tone: getTileTone(nasdaqAsset) },
    ],
  },
]

export const rotationNotes = [
  `${kosdaqAsset.symbol} outperforming ${kospiAsset.symbol} remains the domestic higher-beta confirmation signal.`,
  `${nasdaqAsset.symbol} plus a softer ${dxyAsset.symbol} is still the cleanest constructive backdrop for growth-sensitive assets.`,
  `${goldAsset.symbol} strength with softer ${wtiAsset.symbol} can mean easier inflation pressure without a full risk-off regime.`,
]

export const newsThemes = [
  { label: 'Korea', value: `${koreaAssets.length} assets`, tone: 'text-cyan-300' },
  { label: 'US growth', value: `${nasdaqAsset.symbol}`, tone: 'text-emerald-300' },
  { label: 'Commodities', value: commodityAssets.map((asset) => asset.symbol).join(' + '), tone: 'text-amber-300' },
  { label: 'Dollar', value: `${dxyAsset.symbol}`, tone: 'text-rose-300' },
]

export const fundamentalCards = [
  { label: 'Korea equities', value: koreaAssets.every((asset) => !asset.move.startsWith('-')) ? 'Flow-led' : 'Mixed', note: `${kospiAsset.symbol} and ${kosdaqAsset.symbol} should be read through breadth and foreign participation.`, tone: kospiAsset.tone },
  { label: nasdaqAsset.symbol, value: 'Duration-sensitive', note: `Keep the rate-growth link central when reading ${nasdaqAsset.symbol}.`, tone: nasdaqAsset.tone },
  { label: goldAsset.symbol, value: 'Macro hedge', note: `Best read ${goldAsset.symbol} through real yields and dollar pressure, not equity beta.`, tone: goldAsset.tone },
  { label: `${wtiAsset.symbol} / ${dxyAsset.symbol}`, value: 'Context assets', note: 'These remain macro interpretation anchors as much as charting targets.', tone: dxyAsset.tone },
]

export const fundamentalCoverage = [
  {
    name: `${kospiAsset.symbol} vs ${kosdaqAsset.symbol}`,
    summary: 'Track broad domestic benchmark strength separately from higher-beta local growth sentiment.',
  },
  {
    name: `${nasdaqAsset.symbol} as anchor`,
    summary: `Use ${nasdaqAsset.symbol} as the global growth-risk compass before extrapolating Korea or commodity narratives too far.`,
  },
  {
    name: `${goldAsset.symbol}, ${wtiAsset.symbol}, ${dxyAsset.symbol}`,
    summary: 'These should be read as a linked macro context set rather than as isolated lines on a chart.',
  },
]

export const researchChecklist = [
  { label: 'Instrument type', value: 'Distinguish index, spot benchmark, futures proxy, and proprietary benchmark' },
  { label: 'Feed honesty', value: 'Make delayed/public vs licensed/proxy data obvious in the UI' },
  { label: 'Context metrics', value: 'Keep rates, dollar, breadth, and curve shape near the asset chart' },
  { label: 'Narrative discipline', value: 'Do not interpret KOSPI, gold, WTI, and DXY through one generic framework' },
]
