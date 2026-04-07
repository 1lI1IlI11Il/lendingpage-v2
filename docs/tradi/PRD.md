# Tradi MVP PRD

## Product Summary

Tradi is a context-rich investment workspace for retail investors.
It combines charting, technical indicators, macro data, economic events, sector rotation, news, insider activity, and basic fundamental analysis in one product experience.

## Problem

Retail investors often use multiple disconnected tools:

- charting tools for technical analysis
- macro data sites for economic context
- finance portals for news
- SEC or third-party tools for insider activity
- spreadsheets for manual workflow tracking

This fragmentation leads to slower decisions, weak context continuity, and unnecessary tab switching.

## Goal

Give retail investors one place to answer:

- What is the chart doing?
- Is the trend healthy?
- What is the macro backdrop?
- Which sectors are leading?
- Is there relevant news or insider activity?
- Do the fundamentals support the move?

## Target User

Primary user:

- self-directed retail investors
- chart-oriented users who also care about macro context
- users who want a cleaner workflow than juggling multiple tabs

## MVP Scope

### 1. Chart Workspace
- candlestick chart rendering
- symbol search
- timeframe switching
- overlay or panel-based indicator rendering

### 2. Technical Indicators
Initial set includes:

- Mansfield RS
- Trend Template
- Squeeze Momentum
- Tether Line
- SuperTrend
- additional implemented TradingView-inspired signals

### 3. Macro Dashboard
- FRED-based macro summary cards
- historical chart views for key series

### 4. Economic Calendar
- monthly view
- event detail surface

### 5. Sector Heatmap
- 11 major SPDR sectors
- color intensity by performance strength

### 6. News & Insider Feed
- Finnhub news feed
- SEC EDGAR-linked insider context

### 7. Fundamentals
- SEC XBRL-based revenue trend
- operating income trend
- lightweight summary cards and table

## Non-Goals

The MVP does not include:

- brokerage execution
- full portfolio management
- advanced backtesting
- mobile-native launch
- institutional-grade data breadth

## UX Principles

- charts stay central
- context stays nearby
- information density should feel efficient, not cluttered
- Korean and English support should feel native

## Success Criteria

- core chart workflow works without tab-hopping
- macro/news/fundamentals modules support the chart workflow instead of feeling separate
- indicator behavior is consistent and trustworthy

## Open Questions

- exact final indicator list for MVP
- launch scope for watchlist and auth
- default history depth and refresh rules per data source
