export interface League {
  slug: string;
  name: string;
  sport: "soccer" | "basketball" | "american-football" | "cricket" | "tennis";
  country: string;
  season: string;
  blurb: string;
}

export const SPORTS: { slug: string; name: string }[] = [
  { slug: "soccer", name: "Soccer" },
  { slug: "basketball", name: "Basketball" },
  { slug: "american-football", name: "American Football" },
  { slug: "cricket", name: "Cricket" },
  { slug: "tennis", name: "Tennis" },
];

export const leagues: League[] = [
  {
    slug: "premier-league",
    name: "Premier League",
    sport: "soccer",
    country: "England",
    season: "2026–27",
    blurb:
      "England's top flight, where 20 clubs play 38 rounds from August to May. Famous for its pace, packed stadiums, and a title race that regularly goes down to the final weekend.",
  },
  {
    slug: "la-liga",
    name: "La Liga",
    sport: "soccer",
    country: "Spain",
    season: "2026–27",
    blurb:
      "Spain's first division, home to two of the most decorated clubs in world football. Known for technical, possession-based play and fiercely contested derbies up and down the table.",
  },
  {
    slug: "serie-a",
    name: "Serie A",
    sport: "soccer",
    country: "Italy",
    season: "2026–27",
    blurb:
      "Italy's top division, where tactical discipline meets historic rivalries. Twenty clubs compete across 38 matchdays, with the Milan and Rome derbies among Europe's most intense fixtures.",
  },
  {
    slug: "bundesliga",
    name: "Bundesliga",
    sport: "soccer",
    country: "Germany",
    season: "2026–27",
    blurb:
      "Germany's premier competition, played in some of the best-attended stadiums in world football. An 18-club league known for high pressing, young talent, and big atmospheres.",
  },
  {
    slug: "ligue-1",
    name: "Ligue 1",
    sport: "soccer",
    country: "France",
    season: "2026–27",
    blurb:
      "France's top tier, a proven production line of world-class talent. Eighteen clubs battle through 34 rounds, with the Paris–Marseille rivalry headlining the calendar.",
  },
  {
    slug: "champions-league",
    name: "UEFA Champions League",
    sport: "soccer",
    country: "Europe",
    season: "2026–27",
    blurb:
      "Europe's elite club tournament, where domestic champions and top finishers from across the continent meet. The anthem, the night matches, and the knockout rounds make it the most watched club competition on the planet.",
  },
  {
    slug: "nba",
    name: "NBA",
    sport: "basketball",
    country: "USA",
    season: "2026–27",
    blurb:
      "The world's premier basketball league: 30 teams, an 82-game regular season, and a playoff bracket that decides the champion each spring. Star-driven, fast, and global.",
  },
  {
    slug: "nfl",
    name: "NFL",
    sport: "american-football",
    country: "USA",
    season: "2026",
    blurb:
      "America's biggest sports league. Thirty-two teams play a 17-game regular season from September to January, building toward the playoffs and the Super Bowl.",
  },
  {
    slug: "icc-cricket",
    name: "ICC International Cricket",
    sport: "cricket",
    country: "International",
    season: "2026",
    blurb:
      "Top-level international cricket: national sides meeting in ODIs and T20s through the season. Big crowds, big rivalries, and formats that fit into a single day or evening.",
  },
  {
    slug: "atp-tour",
    name: "ATP Tour",
    sport: "tennis",
    country: "International",
    season: "2026",
    blurb:
      "The men's professional tennis circuit, running nearly year-round across hard courts, clay, and grass. The biggest names meet at Masters events and the four Grand Slams.",
  },
];

export function getLeague(slug: string): League | undefined {
  return leagues.find((l) => l.slug === slug);
}

export function leaguesBySport(sport: string): League[] {
  return leagues.filter((l) => l.sport === sport);
}
