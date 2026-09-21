# KickOff — Demo Sports Directory (Next.js)

A demonstration template of a sports fixture directory site (homepage, league pages,
team pages, match pages with demo watch-link placeholders, about + DMCA pages).
Built with **Next.js App Router + TypeScript**, statically generated, no database.

**Demo rules baked in:** every "stream link" is a clearly labeled placeholder
(`url: "#"`, tagged DEMO). All fixtures are fictional sample data in `src/data/`.
No real streams, no third-party stream URLs, no API keys.

## Run it

```bash
npm install
npm run dev      # dev server → http://localhost:3000
npm run build    # production build (static generation)
npm start        # serve the production build
```

Requires Node.js 18.18+ (20+ recommended).

## Project structure

```
app/
  page.tsx                 Homepage: hero, fixtures grouped by league per sport, league grid, SEO blocks, FAQ
  layout.tsx               Header/nav, footer, global metadata
  globals.css              All styling (dark theme, responsive, no frameworks)
  league/[slug]/page.tsx   League schedule + teams + SEO copy + FAQs
  team/[slug]/page.tsx     Team's upcoming fixtures + short SEO block
  match/[slug]/page.tsx    Match header, DEMO watch placeholders, how-to steps, FAQs
  about/page.tsx           About page
  dmca/page.tsx            DMCA template page
src/
  data/
    leagues.ts             10 leagues (soccer, NBA, NFL, cricket, tennis)
    teams.ts               Clubs / franchises / national sides / players
    fixtures.ts            ~27 fixtures, 2026-09-21 → 2026-09-28 (UTC ISO strings)
    faqs.ts                Homepage, per-league, and match-page FAQs
  lib/format.ts            Kickoff time formatting helpers
  components/              MatchCard, FaqList
```

All dynamic routes use `generateStaticParams`, so every league/team/fixture page is
pre-rendered at build time and every internal link resolves.

## Plugging in a real fixtures API later

The whole site reads from the `src/data/` layer, so swapping the data source is
contained:

1. **Pick a provider** — e.g. [API-Football](https://www.api-football.com/) (fixtures,
   teams, leagues; free tier available), TheSportsDB, or football-data.org. Keep the
   API key in an env var (`API_FOOTBALL_KEY` in `.env.local`), never in the repo.
2. **Write a fetcher** in `src/lib/api.ts` that calls the provider at build time and
   maps its response into the existing `League` / `Team` / `Fixture` interfaces in
   `src/data/*.ts`.
3. **Replace the static arrays** — e.g. turn `fixtures` into an async
   `getFixtures()` used by `generateStaticParams` and the pages, or fetch once in
   a build script and write JSON the pages import. The pages and components don't
   need to change as long as the interfaces stay the same.
4. **Revalidate on a schedule** — add `export const revalidate = 3600` (or per-page
   values) so fixture lists refresh without a full rebuild, and use
   `generateStaticParams` + `dynamicParams` for new matches that appear mid-week.

Stream/source links (in a licensed production setup) would come from your own
database or CMS and replace the `demoStreams` array in `app/match/[slug]/page.tsx`.
