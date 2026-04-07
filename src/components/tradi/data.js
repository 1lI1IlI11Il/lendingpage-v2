export const navigation = [
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dash', badge: 'Live' },
  { id: 'chart', label: 'Chart Workspace', shortLabel: 'Chart', badge: 'FX' },
  { id: 'macro', label: 'Macro', shortLabel: 'Macro', badge: 'Top' },
  { id: 'calendar', label: 'Calendar', shortLabel: 'Cal', badge: 'Evt' },
  { id: 'heatmap', label: 'Heatmap', shortLabel: 'Map', badge: 'Rot' },
  { id: 'news', label: 'News', shortLabel: 'News', badge: 'Tape' },
  { id: 'fundamentals', label: 'Fundamentals', shortLabel: 'Facts', badge: 'Deep' },
]

export const symbolOptions = [
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    market: 'Spot FX',
    contextLabel: 'g10 fx',
    price: '1.0846',
    move: '+0.41%',
    tone: 'text-emerald-300',
    sessionBias: 'constructive',
    timeframe: '15m',
    session: 'London / New York overlap',
    priceMarker: '1.0846',
    snapshotStats: [
      { label: 'Trend', value: 'Bullish intraday' },
      { label: 'Bias', value: 'Buy dips above 1.0820' },
      { label: 'Range', value: '68 pips ADR' },
      { label: 'Catalyst', value: 'US CPI / ECB tone' },
    ],
    contextPanels: {
      flows: [
        'Real-money bids clustered near 1.0820 with lighter offers into 1.0880.',
        'London fix demand favored EUR baskets in early trade.',
        'Fast money remains short gamma into the CPI print.',
      ],
      levels: [
        '1.0885: Weekly supply zone and first upside decision area.',
        '1.0840: Intraday balance point and opening range mid.',
        '1.0818: Session invalidation for the current bullish structure.',
      ],
      macro: [
        'Rates market still prices a soft landing path with choppy inflation surprises.',
        'EUR sentiment improved after resilient PMIs and calmer peripheral spreads.',
        'US data remains the key catalyst for trend continuation this week.',
      ],
    },
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    market: 'Spot FX',
    contextLabel: 'g10 fx',
    price: '1.2721',
    move: '+0.18%',
    tone: 'text-emerald-300',
    sessionBias: 'balanced bid',
    timeframe: '15m',
    session: 'London-led trend day',
    priceMarker: '1.2721',
    snapshotStats: [
      { label: 'Trend', value: 'Grinding higher' },
      { label: 'Bias', value: 'Buy pullbacks into 1.2695' },
      { label: 'Range', value: '74 pips ADR' },
      { label: 'Catalyst', value: 'UK wage tone / USD drift' },
    ],
    contextPanels: {
      flows: [
        'Macro funds added modest sterling length after the European open.',
        'Cable kept attracting shallow dip buyers above 1.2700.',
        'Dealer chatter suggests upside supply thickens into 1.2750.',
      ],
      levels: [
        '1.2752: Prior swing high and first expansion target.',
        '1.2710: Intraday pivot where momentum kept rebuilding.',
        '1.2688: Failure level for the current London impulse.',
      ],
      macro: [
        'Sterling remains supported while UK rate-cut expectations stay sticky.',
        'Broad USD softness matters more than domestic catalysts in the short run.',
        'Risk sentiment can extend the move if US yields fail to reprice higher.',
      ],
    },
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    market: 'Spot FX',
    contextLabel: 'rates fx',
    price: '149.82',
    move: '-0.27%',
    tone: 'text-rose-300',
    sessionBias: 'defensive',
    timeframe: '15m',
    session: 'Rates-sensitive reversal pocket',
    priceMarker: '149.82',
    snapshotStats: [
      { label: 'Trend', value: 'Pullback below 150.00' },
      { label: 'Bias', value: 'Sell rallies into 150.10' },
      { label: 'Range', value: '92 pips ADR' },
      { label: 'Catalyst', value: 'US yields / BoJ signaling' },
    ],
    contextPanels: {
      flows: [
        'Exporters sold rebounds while rates traders trimmed fresh dollar longs.',
        'Stops cleared once 149.95 gave way during the overlap.',
        'Intraday flow still feels headline-sensitive around intervention chatter.',
      ],
      levels: [
        '150.18: Resistance where the prior breakout failed.',
        '149.78: Current balance area around the pullback shelf.',
        '149.42: Next downside pocket if yields keep easing.',
      ],
      macro: [
        'USD/JPY is tracking front-end Treasury direction more tightly again.',
        'BoJ normalization hints keep downside squeezes sharper than usual.',
        'A hotter US print could still snap the pair back above 150.00 quickly.',
      ],
    },
  },
  {
    id: 'xauusd',
    symbol: 'XAU/USD',
    name: 'Gold / US Dollar',
    market: 'Spot Gold',
    contextLabel: 'metals',
    price: '2314.5',
    move: '+0.62%',
    tone: 'text-emerald-300',
    sessionBias: 'firm',
    timeframe: '1H',
    session: 'Event-risk hedge holding bid',
    priceMarker: '2314.5',
    snapshotStats: [
      { label: 'Trend', value: 'Higher-high structure' },
      { label: 'Bias', value: 'Hold above 2306.0' },
      { label: 'Range', value: '$34 daily band' },
      { label: 'Catalyst', value: 'Real yields / risk hedge demand' },
    ],
    contextPanels: {
      flows: [
        'Macro desks kept adding gold on dips as a hedge into data risk.',
        'Physical demand chatter stayed supportive underneath 2310.0.',
        'Momentum accounts chased the break once bullion reclaimed the Asia high.',
      ],
      levels: [
        '2322.0: First extension zone above the current breakout shelf.',
        '2310.0: Near-term pivot where dip buying kept showing up.',
        '2301.5: Structure break if the bid fully unwinds.',
      ],
      macro: [
        'Gold is benefiting from softer real yields without needing a full risk-off tape.',
        'Sticky inflation risk keeps bullion supported even when equities stay resilient.',
        'The next impulse likely depends on whether yields confirm or reject the current pullback.',
      ],
    },
  },
]

export const watchlist = symbolOptions.map(({ symbol, price, move, tone }) => ({
  symbol,
  price,
  move,
  tone,
}))

export const summaryCards = [
  { label: 'Watchlist P/L', value: '+$12.4K', change: '+3.2%', tone: 'text-emerald-300' },
  { label: 'Risk On', value: '64%', change: 'Europe led', tone: 'text-cyan-300' },
  { label: 'Volatility', value: 'Elevated', change: 'Pre-CPI drift', tone: 'text-amber-300' },
  { label: 'Focus Pair', value: 'EUR/USD', change: '1.0846', tone: 'text-fuchsia-300' },
]

export const sectorTiles = [
  { name: 'AI Infra', move: '+2.4%', span: 'col-span-2 row-span-2', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
  { name: 'Financials', move: '+0.8%', span: '', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
  { name: 'Energy', move: '-1.1%', span: '', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
  { name: 'Industrials', move: '+1.3%', span: '', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
  { name: 'Rates', move: '-0.4%', span: '', tone: 'border-amber-500/20 bg-amber-500/10 text-amber-300' },
  { name: 'Crypto Beta', move: '+3.9%', span: 'col-span-2', tone: 'border-violet-500/20 bg-violet-500/10 text-violet-300' },
]

export const calendarEvents = [
  {
    time: '08:30',
    event: 'US CPI (Core)',
    impact: 'High',
    actual: '--',
    forecast: '3.1%',
    prep: 'Expect index and USD volatility to spike around the release window.',
  },
  {
    time: '10:00',
    event: 'Fed Speaker',
    impact: 'Medium',
    actual: '--',
    forecast: 'Policy tone',
    prep: 'Listen for labor-market and services inflation language.',
  },
  {
    time: '14:00',
    event: '10Y Auction',
    impact: 'Medium',
    actual: '--',
    forecast: '4.18%',
    prep: 'Treasury demand will shape the rates backdrop into the close.',
  },
  {
    time: 'Tomorrow',
    event: 'ECB Minutes',
    impact: 'High',
    actual: '--',
    forecast: 'Hawkish hold',
    prep: 'Useful for validating whether EUR resilience can extend.',
  },
]

export const newsItems = [
  {
    source: 'Tradi Wire',
    tag: 'FX',
    priority: 'High',
    headline: 'Dollar softens as traders fade early rate-cut skepticism.',
    detail: 'Desk note: intraday flow shows exporters selling rallies above 1.0860.',
    deskTake: 'EUR/USD squeeze risk stays alive while yields remain contained.',
  },
  {
    source: 'Macro Pulse',
    tag: 'Equities',
    priority: 'Medium',
    headline: 'European equities outperform on cyclicals and softer yields.',
    detail: 'Breadth improved into the open, with financials and industrials leading.',
    deskTake: 'Confirms the broader risk-on tone instead of a pure defensive bid.',
  },
  {
    source: 'Newsfeed',
    tag: 'Commodities',
    priority: 'Medium',
    headline: 'Oil slips while gold holds firm ahead of calendar-heavy session.',
    detail: 'Cross-asset price action remains cautious but not defensive.',
    deskTake: 'Gold firmness with softer crude keeps inflation and growth signals mixed.',
  },
  {
    source: 'Desk Color',
    tag: 'Rates',
    priority: 'Low',
    headline: 'Front-end Treasury pricing steadies after choppy Asia session.',
    detail: 'Dealers see the market waiting for a cleaner inflation signal before repricing cuts.',
    deskTake: 'Keeps USD direction data-dependent rather than trend-confirmed.',
  },
]

export const contextTabs = [
  { id: 'flows', label: 'Flows' },
  { id: 'levels', label: 'Levels' },
  { id: 'macro', label: 'Macro' },
]

export const chartTimeframes = ['1m', '5m', '15m', '1H', '4H']

export const macroScorecards = [
  { label: 'Growth Pulse', value: 'Resilient', note: 'US services still absorbing tighter policy.', tone: 'text-emerald-300' },
  { label: 'Inflation Path', value: 'Sticky', note: 'Shelter and wages keep disinflation uneven.', tone: 'text-amber-300' },
  { label: 'Policy Pricing', value: 'Two cuts', note: 'Front end remains reactive to every data print.', tone: 'text-cyan-300' },
  { label: 'Risk Mood', value: 'Constructive', note: 'Equities and credit still lean toward soft landing.', tone: 'text-fuchsia-300' },
]

export const macroDrivers = [
  {
    title: 'Rates Repricing',
    description: 'Treasury yields are no longer surging, which gives pro-cyclical assets room to recover.',
  },
  {
    title: 'Europe Stabilization',
    description: 'PMIs and spreads have improved enough to keep EUR downside shallower than last month.',
  },
  {
    title: 'Commodity Divergence',
    description: 'Oil softness offsets some inflation anxiety while gold stays supported by event risk.',
  },
]

export const policyCompass = [
  { bank: 'Fed', stance: 'Restrictive', note: 'Needs cleaner inflation data before easing.', tone: 'border-amber-500/20 bg-amber-500/10 text-amber-300' },
  { bank: 'ECB', stance: 'Balanced', note: 'Minutes may define whether EUR optimism can hold.', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
  { bank: 'BoJ', stance: 'Watching', note: 'Yen remains sensitive to every policy normalization hint.', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
]

export const scenarioPaths = [
  { name: 'Soft landing extension', probability: '52%', outcome: 'Risk assets firm, USD softens, carry works.' },
  { name: 'Hot inflation shock', probability: '28%', outcome: 'Front-end yields jump and FX reverses sharply.' },
  { name: 'Growth scare fade', probability: '20%', outcome: 'Defensives lead and commodity beta lags.' },
]

export const calendarSessions = [
  {
    label: 'Asia',
    time: '00:00 – 06:00',
    focus: 'Liquidity was thinner and rates were choppy, but no regime shift emerged.',
  },
  {
    label: 'Europe',
    time: '06:00 – 12:00',
    focus: 'Cyclicals led, EUR found buyers, and cross-asset tone improved into the open.',
  },
  {
    label: 'US',
    time: '12:00 – Close',
    focus: 'Calendar-heavy block where CPI and auction tone can reset intraday conviction.',
  },
]

export const eventChecklist = [
  'Mark the two minutes before and after each high-impact release as no-chase territory.',
  'Watch whether yields and the dollar confirm the same story or diverge.',
  'Use the calendar panel to frame reaction trades instead of prediction trades.',
]

export const heatmapGroups = [
  {
    title: 'FX Majors',
    items: [
      { label: 'EUR', move: '+0.6%', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
      { label: 'GBP', move: '+0.3%', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
      { label: 'JPY', move: '-0.4%', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
      { label: 'CHF', move: '-0.1%', tone: 'border-zinc-800 bg-zinc-900 text-zinc-300' },
      { label: 'AUD', move: '+0.5%', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
    ],
  },
  {
    title: 'Index Futures',
    items: [
      { label: 'NQ', move: '+1.1%', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
      { label: 'ES', move: '+0.7%', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
      { label: 'DAX', move: '+1.0%', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
      { label: 'FTSE', move: '+0.2%', tone: 'border-zinc-800 bg-zinc-900 text-zinc-300' },
      { label: 'HSI', move: '-0.3%', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
    ],
  },
  {
    title: 'Rates & Commodities',
    items: [
      { label: '2Y UST', move: '-3bp', tone: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' },
      { label: '10Y UST', move: '-2bp', tone: 'border-zinc-800 bg-zinc-900 text-zinc-300' },
      { label: 'Gold', move: '+0.6%', tone: 'border-amber-500/20 bg-amber-500/10 text-amber-300' },
      { label: 'WTI', move: '-0.8%', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' },
      { label: 'Copper', move: '+0.4%', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' },
    ],
  },
]

export const rotationNotes = [
  'Leadership remains pro-cyclical, not defensive, with AI infra and industrials still green.',
  'Rates are helping risk rather than fighting it, which supports the constructive session bias.',
  'Commodities are mixed, so inflation-sensitive signals are not confirming one clean macro story yet.',
]

export const newsThemes = [
  { label: 'Rates', value: '4 items', tone: 'text-cyan-300' },
  { label: 'FX', value: '3 items', tone: 'text-emerald-300' },
  { label: 'Equities', value: '2 items', tone: 'text-fuchsia-300' },
  { label: 'Commodities', value: '1 item', tone: 'text-amber-300' },
]

export const fundamentalCards = [
  { label: 'US Demand', value: 'Holding up', note: 'Labor and services keep the base case constructive.', tone: 'text-emerald-300' },
  { label: 'Eurozone', value: 'Bottoming', note: 'Sentiment data is no longer deteriorating outright.', tone: 'text-cyan-300' },
  { label: 'Margins', value: 'Stable', note: 'Input costs eased faster than wage pressure.', tone: 'text-fuchsia-300' },
  { label: 'Balance Sheets', value: 'Selective', note: 'Quality names still absorb tighter financing better.', tone: 'text-amber-300' },
]

export const fundamentalCoverage = [
  {
    name: 'AI Infrastructure Basket',
    summary: 'Top-line momentum is still outpacing multiple compression, so leadership remains justified for now.',
  },
  {
    name: 'European Banks',
    summary: 'Higher rates still support net interest income, but loan growth and deposit competition need monitoring.',
  },
  {
    name: 'Energy Majors',
    summary: 'Cash generation stays healthy, yet softer crude caps the upside for the near-term narrative.',
  },
]

export const researchChecklist = [
  { label: 'Revenue trend', value: 'Accelerating in cyclicals, flat in defensives' },
  { label: 'Margin direction', value: 'Holding as freight and energy costs cool' },
  { label: 'Balance-sheet stress', value: 'Contained outside lower-quality consumer pockets' },
  { label: 'Catalysts', value: 'CPI, ECB minutes, and the next earnings guide reset' },
]
