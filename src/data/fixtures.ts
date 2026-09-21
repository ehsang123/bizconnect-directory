export interface Fixture {
  slug: string;
  leagueSlug: string;
  homeSlug: string;
  awaySlug: string;
  /** ISO 8601 kickoff time in UTC */
  kickoff: string;
  status: "upcoming";
}

function f(
  slug: string,
  leagueSlug: string,
  homeSlug: string,
  awaySlug: string,
  kickoff: string,
): Fixture {
  return { slug, leagueSlug, homeSlug, awaySlug, kickoff, status: "upcoming" };
}

export const fixtures: Fixture[] = [
  // --- Premier League ---
  f("arsenal-vs-chelsea", "premier-league", "arsenal", "chelsea", "2026-09-21T19:00:00Z"),
  f("manchester-city-vs-liverpool", "premier-league", "manchester-city", "liverpool", "2026-09-22T19:30:00Z"),
  f("tottenham-vs-manchester-united", "premier-league", "tottenham", "manchester-united", "2026-09-26T12:30:00Z"),
  f("newcastle-vs-aston-villa", "premier-league", "newcastle", "aston-villa", "2026-09-26T15:00:00Z"),
  f("everton-vs-west-ham", "premier-league", "everton", "west-ham", "2026-09-27T14:00:00Z"),
  // --- La Liga ---
  f("atletico-madrid-vs-sevilla", "la-liga", "atletico-madrid", "sevilla", "2026-09-22T20:00:00Z"),
  f("valencia-vs-real-betis", "la-liga", "valencia", "real-betis", "2026-09-26T17:30:00Z"),
  f("real-madrid-vs-barcelona", "la-liga", "real-madrid", "barcelona", "2026-09-27T20:00:00Z"),
  f("athletic-bilbao-vs-villarreal", "la-liga", "athletic-bilbao", "villarreal", "2026-09-28T19:00:00Z"),
  // --- Serie A ---
  f("ac-milan-vs-napoli", "serie-a", "ac-milan", "napoli", "2026-09-23T19:45:00Z"),
  f("inter-vs-juventus", "serie-a", "inter", "juventus", "2026-09-27T18:45:00Z"),
  f("roma-vs-lazio", "serie-a", "roma", "lazio", "2026-09-28T18:00:00Z"),
  // --- Bundesliga ---
  f("stuttgart-vs-frankfurt", "bundesliga", "stuttgart", "frankfurt", "2026-09-23T18:30:00Z"),
  f("bayern-vs-dortmund", "bundesliga", "bayern", "dortmund", "2026-09-26T17:30:00Z"),
  f("leverkusen-vs-leipzig", "bundesliga", "leverkusen", "leipzig", "2026-09-27T15:30:00Z"),
  // --- Ligue 1 ---
  f("monaco-vs-lyon", "ligue-1", "monaco", "lyon", "2026-09-25T19:45:00Z"),
  f("psg-vs-marseille", "ligue-1", "psg", "marseille", "2026-09-27T19:45:00Z"),
  // --- Champions League ---
  f("ucl-manchester-city-vs-real-madrid", "champions-league", "manchester-city", "real-madrid", "2026-09-23T19:00:00Z"),
  f("ucl-bayern-vs-psg", "champions-league", "bayern", "psg", "2026-09-24T19:00:00Z"),
  f("ucl-barcelona-vs-inter", "champions-league", "barcelona", "inter", "2026-09-24T21:00:00Z"),
  // --- NBA ---
  f("lakers-vs-celtics", "nba", "lakers", "celtics", "2026-09-23T00:30:00Z"),
  f("warriors-vs-nuggets", "nba", "warriors", "nuggets", "2026-09-25T01:00:00Z"),
  // --- NFL ---
  f("chiefs-vs-bills", "nfl", "chiefs", "bills", "2026-09-27T20:20:00Z"),
  f("cowboys-vs-eagles", "nfl", "cowboys", "eagles", "2026-09-28T00:15:00Z"),
  // --- Cricket ---
  f("india-vs-australia", "icc-cricket", "india", "australia", "2026-09-26T13:30:00Z"),
  f("england-vs-pakistan", "icc-cricket", "england", "pakistan", "2026-09-28T13:30:00Z"),
  // --- Tennis ---
  f("alcaraz-vs-sinner", "atp-tour", "alcaraz", "sinner", "2026-09-27T14:00:00Z"),
];

export function getFixture(slug: string): Fixture | undefined {
  return fixtures.find((x) => x.slug === slug);
}

export function fixturesByLeague(leagueSlug: string): Fixture[] {
  return fixtures
    .filter((x) => x.leagueSlug === leagueSlug)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

export function fixturesByTeam(teamSlug: string): Fixture[] {
  return fixtures
    .filter((x) => x.homeSlug === teamSlug || x.awaySlug === teamSlug)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

/** Teams that appear in a league's fixtures (used for leagues like the Champions League that borrow clubs). */
export function fixtureTeamsByLeague(leagueSlug: string): string[] {
  const seen = new Set<string>();
  for (const x of fixturesByLeague(leagueSlug)) {
    seen.add(x.homeSlug);
    seen.add(x.awaySlug);
  }
  return [...seen];
}
