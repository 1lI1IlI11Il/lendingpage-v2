import { useMemo, useState } from 'react'
import LocalCandlesChart from '../LocalCandlesChart'
import PanelCard from '../PanelCard'
import { analyzeKronosSymbol } from '../kronosAnalysisService'

const INITIAL_FORM = {
  symbol: '005930',
  market: 'KOSPI',
  interval: '1d',
  lookback: 240,
  horizon: 5,
  temperature: 1.0,
  top_p: 0.9,
  sample_count: 5,
}

function buildCombinedSeries(payload) {
  const history = payload?.history ?? []
  const forecast = payload?.forecast ?? []
  return [...history, ...forecast]
}

function numberInputValue(value) {
  return Number.isFinite(value) ? String(value) : ''
}

export default function KronosAnalysisView() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const combinedSeries = useMemo(() => buildCombinedSeries(analysis), [analysis])

  const handleChange = (field, parser = (value) => value) => (event) => {
    const nextValue = parser(event.target.value)
    setForm((current) => ({ ...current, [field]: nextValue }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = await analyzeKronosSymbol({
        ...form,
        lookback: Number(form.lookback),
        horizon: Number(form.horizon),
        temperature: Number(form.temperature),
        top_p: Number(form.top_p),
        sample_count: Number(form.sample_count),
      })
      setAnalysis(payload)
    } catch (submitError) {
      setAnalysis(null)
      setError(submitError instanceof Error ? submitError.message : 'Analysis request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_380px]">
      <div className="space-y-4">
        <PanelCard
          title="Kronos Analysis"
          subtitle="Run a daily KOSPI or KOSDAQ stock forecast through the Python Kronos API."
        >
          <form className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit}>
            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Symbol</span>
              <input
                value={form.symbol}
                onChange={handleChange('symbol', (value) => value.replace(/\s+/g, '').toUpperCase())}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
                placeholder="005930"
              />
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Market</span>
              <select
                value={form.market}
                onChange={handleChange('market')}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              >
                <option value="KOSPI">KOSPI</option>
                <option value="KOSDAQ">KOSDAQ</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Lookback bars</span>
              <input
                type="number"
                min="60"
                max="512"
                value={numberInputValue(form.lookback)}
                onChange={handleChange('lookback', Number)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              />
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Horizon</span>
              <input
                type="number"
                min="1"
                max="30"
                value={numberInputValue(form.horizon)}
                onChange={handleChange('horizon', Number)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              />
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Temperature</span>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="2"
                value={numberInputValue(form.temperature)}
                onChange={handleChange('temperature', Number)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              />
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Top p</span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="1"
                value={numberInputValue(form.top_p)}
                onChange={handleChange('top_p', Number)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              />
            </label>

            <label className="space-y-2 text-sm text-zinc-300">
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Samples</span>
              <input
                type="number"
                min="1"
                max="16"
                value={numberInputValue(form.sample_count)}
                onChange={handleChange('sample_count', Number)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none transition focus:border-cyan-500/40"
              />
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Running Kronos…' : 'Run analysis'}
              </button>
            </div>
          </form>

          <div className="mt-4 rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-4 text-sm leading-relaxed text-zinc-400">
            Use six-digit Korean stock codes like <span className="text-zinc-200">005930</span>. The backend maps them to Yahoo-style symbols such as <span className="text-zinc-200">005930.KS</span> before fetching daily OHLCV history.
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-4 text-sm text-rose-200">
              {error}
            </div>
          ) : null}
        </PanelCard>

        <PanelCard
          title="Forecast chart"
          subtitle="Combined history and forecast candles returned from the Kronos backend."
        >
          <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_40%)]" />
            <div className="relative h-[440px] p-5">
              {combinedSeries.length ? (
                <LocalCandlesChart data={combinedSeries} height={400} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-zinc-800 text-sm text-zinc-500">
                  Run an analysis to render forecast candles.
                </div>
              )}
            </div>
          </div>
        </PanelCard>
      </div>

      <div className="space-y-4">
        <PanelCard
          title="Model summary"
          subtitle="Directional read and projected close from the current forecast request."
          className="h-fit"
        >
          {analysis ? (
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                <StatCard label="Direction" value={analysis.summary.direction} accent={analysis.summary.direction === 'bullish' ? 'text-emerald-300' : analysis.summary.direction === 'bearish' ? 'text-rose-300' : 'text-zinc-300'} />
                <StatCard label="Projected return" value={`${analysis.summary.projected_return_pct}%`} accent={analysis.summary.projected_return_pct >= 0 ? 'text-emerald-300' : 'text-rose-300'} />
                <StatCard label="Last close" value={String(analysis.summary.last_close)} />
                <StatCard label="Projected close" value={String(analysis.summary.projected_close)} />
              </div>

              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-4 text-sm leading-relaxed text-zinc-300">
                {analysis.summary.summary}
              </div>
            </div>
          ) : (
            <EmptyState message="No forecast yet. The first successful request will populate the summary cards." />
          )}
        </PanelCard>

        <PanelCard
          title="Diagnostics"
          subtitle="Runtime metadata from the backend response for traceability."
          className="h-fit"
        >
          {analysis ? (
            <div className="space-y-3">
              <KeyValueRow label="Normalized symbol" value={analysis.diagnostics.normalized_symbol} />
              <KeyValueRow label="Data source" value={analysis.diagnostics.data_source} />
              <KeyValueRow label="Model" value={analysis.diagnostics.model_id} />
              <KeyValueRow label="Tokenizer" value={analysis.diagnostics.tokenizer_id} />
              <KeyValueRow label="Inference latency" value={`${analysis.diagnostics.inference_ms} ms`} />
            </div>
          ) : (
            <EmptyState message="Diagnostics stay empty until the backend returns a result." />
          )}
        </PanelCard>

        <PanelCard
          title="Forecast bars"
          subtitle="Projected OHLCV bars for the requested horizon."
          className="h-fit"
        >
          {analysis ? (
            <div className="space-y-3">
              {analysis.forecast.map((bar) => (
                <div key={bar.time} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-zinc-100">{bar.time}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">forecast</div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-zinc-300">
                    <Metric label="Open" value={bar.open} />
                    <Metric label="High" value={bar.high} />
                    <Metric label="Low" value={bar.low} />
                    <Metric label="Close" value={bar.close} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Projected bars will appear here after a completed Kronos request." />
          )}
        </PanelCard>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent = 'text-zinc-100' }) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</div>
      <div className={`mt-3 text-2xl font-semibold ${accent}`}>{value}</div>
    </div>
  )
}

function KeyValueRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="text-sm font-medium text-zinc-100">{value}</span>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-950 bg-zinc-950 px-3 py-3">
      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{label}</div>
      <div className="mt-2 text-zinc-100">{value}</div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-6 text-sm text-zinc-500">
      {message}
    </div>
  )
}
