import PanelCard from '../PanelCard'
import { newsItems, newsThemes } from '../data'

export default function NewsView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <PanelCard
        title="News Workspace"
        subtitle="A fuller placeholder tape with desk framing, tags, and headline priority."
      >
        <div className="space-y-3">
          {newsItems.map((item) => (
            <article key={item.headline} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
                <span>{item.source}</span>
                <span className="text-zinc-700">•</span>
                <span>{item.tag}</span>
                <span className="text-zinc-700">•</span>
                <span className={item.priority === 'High' ? 'text-rose-300' : item.priority === 'Medium' ? 'text-amber-300' : 'text-zinc-400'}>
                  {item.priority}
                </span>
              </div>
              <h3 className="mt-2 text-base font-medium text-zinc-100">{item.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
              <div className="mt-4 rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Desk take</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.deskTake}</p>
              </div>
            </article>
          ))}
        </div>
      </PanelCard>

      <div className="space-y-4">
        <PanelCard
          title="Coverage Mix"
          subtitle="Static placeholder counts so the view feels like a switchable tape workspace."
          className="h-fit"
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {newsThemes.map((theme) => (
              <div key={theme.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{theme.label}</div>
                <div className={`mt-3 text-2xl font-semibold ${theme.tone}`}>{theme.value}</div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Workflow Cue"
          subtitle="Static guidance to keep the placeholder aligned with the news-monitoring use case."
          className="h-fit"
        >
          <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              Confirm whether the headline moves rates, equities, and FX in the same direction.
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
              Use the desk take block to store the fast interpretation, then hand off to chart and macro views.
            </div>
          </div>
        </PanelCard>
      </div>
    </div>
  )
}
