import { calendarEvents, calendarSessions, eventChecklist } from './data'

export async function getCalendarPayload() {
  try {
    const response = await fetch('/api/calendar')
    if (!response.ok) {
      throw new Error('Calendar request failed')
    }

    const payload = await response.json()
    return {
      provider: payload.provider ?? 'fed-eia-rss',
      events: payload.events ?? [],
      sessions: calendarSessions,
      checklist: eventChecklist,
    }
  } catch {
    return {
      provider: 'local-fallback',
      events: calendarEvents,
      sessions: calendarSessions,
      checklist: eventChecklist,
    }
  }
}
