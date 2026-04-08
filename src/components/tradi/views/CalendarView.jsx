import { useEffect, useState } from 'react'
import PanelCard from '../PanelCard'
import { getCalendarPayload } from '../calendarService'

export default function CalendarView() {
  const [calendarPayload, setCalendarPayload] = useState({
    provider: 'loading',
    events: [],
    sessions: [],
    checklist: [],
  })

  useEffect(() => {
    let active = true

    getCalendarPayload().then((payload) => {
      if (active) {
        setCalendarPayload(payload)
      }
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_340px]">
      <div className="space-y-4">
        <PanelCard
          title="Calendar Workspace"
          subtitle={`A live macro release feed with fallback behavior. Provider: ${calendarPayload.provider}.`}
        >
          <div className="space-y-3">
            {calendarPayload.events.map((event) => (
              <article key={event.event} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{event.time}</div>
                    <h3 className="mt-2 text-base font-medium text-zinc-100">{event.event}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{event.prep}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm lg:min-w-[190px]">
                    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Forecast</div>
                      <div className="mt-2 text-zinc-100">{event.forecast}</div>
                    </div>
                    <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-3 py-3">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Impact</div>
                      <div className={event.impact === 'High' ? 'mt-2 text-rose-300' : 'mt-2 text-amber-300'}>
                        {event.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="Session Blocks"
          subtitle="High-level placeholders for how the day is segmented across the major trading windows."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {calendarPayload.sessions.map((session) => (
              <div key={session.label} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">{session.time}</div>
                <div className="mt-2 text-base font-medium text-zinc-100">{session.label}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{session.focus}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard
        title="Event Checklist"
        subtitle="Simple guardrails for using the calendar placeholder as a trading workflow anchor."
        className="h-fit"
      >
        <div className="space-y-3">
          {calendarPayload.checklist.map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-900 bg-zinc-900/40 p-4 text-sm leading-relaxed text-zinc-300">
              {item}
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
