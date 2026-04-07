import PanelCard from '../PanelCard'
import { calendarEvents, newsItems, sectorTiles, summaryCards } from '../data'

export default function DashboardView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_380px]">
      <div className="space-y-4">
        <PanelCard
          title="Dashboard"
          subtitle="Macro pulse, sector rotation, and headline context for the current session."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/50 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{card.label}</div>
                <div className="mt-4 text-2xl font-semibold text-zinc-100">{card.value}</div>
                <div className={`mt-2 text-sm ${card.tone}`}>{card.change}</div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Sector Heatmap Preview"
          subtitle="Static placeholder tiles to stand in for broad market rotation visibility."
        >
          <div className="grid auto-rows-[88px] grid-cols-2 gap-3 md:grid-cols-4">
            {sectorTiles.map((tile) => (
              <div
                key={tile.name}
                className={`flex flex-col justify-between rounded-2xl border p-4 ${tile.span} ${tile.tone}`}
              >
                <span className="text-sm font-medium">{tile.name}</span>
                <span className="text-xl font-semibold">{tile.move}</span>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Top News Preview"
          subtitle="Headline tape placeholder with brief notes for fast context scanning."
        >
          <div className="space-y-3">
            {newsItems.slice(0, 3).map((item) => (
              <article key={item.headline} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
                  <span>{item.source}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{item.tag}</span>
                </div>
                <h3 className="mt-2 text-base font-medium text-zinc-100">{item.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
              </article>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard
        title="Economic Calendar Preview"
        subtitle="Key events stacked in a simple panel to anchor the session narrative."
        className="h-fit"
      >
        <div className="space-y-3">
          {calendarEvents.map((event) => (
            <div key={event.event} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{event.time}</div>
                  <div className="mt-2 text-sm font-medium text-zinc-100">{event.event}</div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    event.impact === 'High'
                      ? 'border border-rose-500/20 bg-rose-500/10 text-rose-300'
                      : 'border border-amber-500/20 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  {event.impact}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-400">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Actual</div>
                  <div className="mt-1 text-zinc-200">{event.actual}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Forecast</div>
                  <div className="mt-1 text-zinc-200">{event.forecast}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
