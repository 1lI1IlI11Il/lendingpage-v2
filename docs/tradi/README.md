# Tradi Planning Bundle

This directory captures the current product direction for **Tradi** as discussed and drafted in-session.

Included here:

- `PRD.md` — MVP product requirements document
- `WIREFRAMES.md` — low-fidelity screen wireframes
- `IMPLEMENTATION_PLAN.md` — phased implementation plan, architecture, data model, and delivery sequence

Working product summary:

- Tradi is a context-rich investing workspace for retail investors.
- It combines charts, technical indicators, macro data, economic events, sector rotation, news, insider activity, and lightweight fundamentals in one workflow.
- The core product thesis is that retail investors lose context when they must switch between multiple disconnected tools.

Current stack direction:

- Next.js 16 + React 19
- Tailwind CSS 4
- Lightweight Charts 5
- Supabase (PostgreSQL, RLS, Auth)
- SWR / React Query
- Vitest with 80%+ coverage threshold
- next-intl for Korean / English support
