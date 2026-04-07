# Tradi Implementation Plan

## Delivery Phases

### Phase 1 — Core product loop
- app shell
- sidebar + top search
- dashboard shell
- chart workspace
- 3 to 5 core indicators
- right-side context panel
- i18n baseline

### Phase 2 — Context expansion
- macro dashboard
- economic calendar
- sector heatmap
- news and insider feed hardening
- cache policy stabilization

### Phase 3 — Company context
- fundamentals page
- revenue / operating income trends
- watchlist and recent symbols

## Recommended Folder Structure

```text
src/
  app/
  components/
  features/
  hooks/
  lib/
  types/
  messages/
```

Key separation rules:

- `app/` composes pages
- `components/` renders UI
- `features/` owns client data access and view-model shaping
- `lib/indicators/` contains pure calculation logic
- `app/api/` acts as the BFF layer for external data normalization

## Data Model Direction

User-owned tables:

- `profiles`
- `watchlists`
- `watchlist_items`
- `recent_symbols`
- `indicator_preferences`

Cache-oriented tables:

- `cached_macro_series`
- `cached_calendar_events`
- `cached_sector_heatmaps`
- `cached_news`
- `cached_insider_events`
- `cached_fundamentals`
- `cached_symbol_snapshots`

## API Surface

- `GET /api/search/symbols?q=`
- `GET /api/chart/[symbol]?timeframe=`
- `GET /api/macro/summary`
- `GET /api/macro/series/[key]`
- `GET /api/calendar?month=`
- `GET /api/sectors/heatmap?range=`
- `GET /api/news?symbol=`
- `GET /api/insiders?symbol=`
- `GET /api/fundamentals/[symbol]?period=`

## Caching Rules

- macro summary: 1 hour
- macro series: 6 hours
- calendar: 12 hours
- heatmap: 15 to 60 minutes
- news: 10 to 30 minutes
- insiders: 6 to 24 hours
- fundamentals: 24 hours
- symbol snapshot: 5 to 15 minutes

## Indicator Engine Rules

- pure TypeScript functions only
- no React dependencies in indicator modules
- warm-up periods represented with `null`
- shared helpers for pivots, smoothing, ATR, rolling windows, and backpaint
- parity-oriented tests against fixed fixtures

## Sprint Sequence

### Sprint 1
- scaffold app shell
- dashboard route
- chart route
- symbol search
- basic OHLC rendering

### Sprint 2
- indicator shared utilities
- Mansfield RS
- SuperTrend
- Squeeze Momentum
- indicator toggle UI

### Sprint 3
- right context panel
- news tab
- mini fundamentals tab
- recent symbols persistence

### Sprint 4
- dashboard preview modules
- macro summary
- calendar preview
- heatmap preview

### Sprint 5
- dedicated macro, calendar, and heatmap pages
- cache hardening

### Sprint 6
- fundamentals detail page
- watchlist
- release hardening

## Quality Gates

- zero new diagnostics on changed files
- indicator calculation tests for deterministic output
- build passes
- manual verification for core chart workflow
