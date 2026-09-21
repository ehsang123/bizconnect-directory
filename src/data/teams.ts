export interface Team {
  slug: string;
  name: string;
  shortName: string;
  leagueSlug: string;
}

export const teams: Team[] = [
  // Premier League
  { slug: "arsenal", name: "Arsenal", shortName: "ARS", leagueSlug: "premier-league" },
  { slug: "chelsea", name: "Chelsea", shortName: "CHE", leagueSlug: "premier-league" },
  { slug: "manchester-city", name: "Manchester City", shortName: "MCI", leagueSlug: "premier-league" },
  { slug: "liverpool", name: "Liverpool", shortName: "LIV", leagueSlug: "premier-league" },
  { slug: "tottenham", name: "Tottenham Hotspur", shortName: "TOT", leagueSlug: "premier-league" },
  { slug: "manchester-united", name: "Manchester United", shortName: "MUN", leagueSlug: "premier-league" },
  { slug: "newcastle", name: "Newcastle United", shortName: "NEW", leagueSlug: "premier-league" },
  { slug: "aston-villa", name: "Aston Villa", shortName: "AVL", leagueSlug: "premier-league" },
  { slug: "everton", name: "Everton", shortName: "EVE", leagueSlug: "premier-league" },
  { slug: "west-ham", name: "West Ham United", shortName: "WHU", leagueSlug: "premier-league" },
  // La Liga
  { slug: "real-madrid", name: "Real Madrid", shortName: "RMA", leagueSlug: "la-liga" },
  { slug: "barcelona", name: "Barcelona", shortName: "BAR", leagueSlug: "la-liga" },
  { slug: "atletico-madrid", name: "Atlético Madrid", shortName: "ATM", leagueSlug: "la-liga" },
  { slug: "sevilla", name: "Sevilla", shortName: "SEV", leagueSlug: "la-liga" },
  { slug: "valencia", name: "Valencia", shortName: "VAL", leagueSlug: "la-liga" },
  { slug: "real-betis", name: "Real Betis", shortName: "BET", leagueSlug: "la-liga" },
  { slug: "athletic-bilbao", name: "Athletic Bilbao", shortName: "ATH", leagueSlug: "la-liga" },
  { slug: "villarreal", name: "Villarreal", shortName: "VIL", leagueSlug: "la-liga" },
  // Serie A
  { slug: "inter", name: "Inter", shortName: "INT", leagueSlug: "serie-a" },
  { slug: "juventus", name: "Juventus", shortName: "JUV", leagueSlug: "serie-a" },
  { slug: "ac-milan", name: "AC Milan", shortName: "MIL", leagueSlug: "serie-a" },
  { slug: "napoli", name: "Napoli", shortName: "NAP", leagueSlug: "serie-a" },
  { slug: "roma", name: "Roma", shortName: "ROM", leagueSlug: "serie-a" },
  { slug: "lazio", name: "Lazio", shortName: "LAZ", leagueSlug: "serie-a" },
  // Bundesliga
  { slug: "bayern", name: "Bayern Munich", shortName: "BAY", leagueSlug: "bundesliga" },
  { slug: "dortmund", name: "Borussia Dortmund", shortName: "BVB", leagueSlug: "bundesliga" },
  { slug: "leverkusen", name: "Bayer Leverkusen", shortName: "LEV", leagueSlug: "bundesliga" },
  { slug: "leipzig", name: "RB Leipzig", shortName: "RBL", leagueSlug: "bundesliga" },
  { slug: "stuttgart", name: "VfB Stuttgart", shortName: "STU", leagueSlug: "bundesliga" },
  { slug: "frankfurt", name: "Eintracht Frankfurt", shortName: "SGE", leagueSlug: "bundesliga" },
  // Ligue 1
  { slug: "psg", name: "Paris Saint-Germain", shortName: "PSG", leagueSlug: "ligue-1" },
  { slug: "marseille", name: "Marseille", shortName: "OM", leagueSlug: "ligue-1" },
  { slug: "monaco", name: "AS Monaco", shortName: "MON", leagueSlug: "ligue-1" },
  { slug: "lyon", name: "Lyon", shortName: "OL", leagueSlug: "ligue-1" },
  { slug: "lens", name: "Lens", shortName: "RCL", leagueSlug: "ligue-1" },
  { slug: "lille", name: "Lille", shortName: "LOSC", leagueSlug: "ligue-1" },
  // NBA
  { slug: "lakers", name: "Los Angeles Lakers", shortName: "LAL", leagueSlug: "nba" },
  { slug: "celtics", name: "Boston Celtics", shortName: "BOS", leagueSlug: "nba" },
  { slug: "warriors", name: "Golden State Warriors", shortName: "GSW", leagueSlug: "nba" },
  { slug: "nuggets", name: "Denver Nuggets", shortName: "DEN", leagueSlug: "nba" },
  // NFL
  { slug: "chiefs", name: "Kansas City Chiefs", shortName: "KC", leagueSlug: "nfl" },
  { slug: "bills", name: "Buffalo Bills", shortName: "BUF", leagueSlug: "nfl" },
  { slug: "cowboys", name: "Dallas Cowboys", shortName: "DAL", leagueSlug: "nfl" },
  { slug: "eagles", name: "Philadelphia Eagles", shortName: "PHI", leagueSlug: "nfl" },
  // Cricket (national sides)
  { slug: "india", name: "India", shortName: "IND", leagueSlug: "icc-cricket" },
  { slug: "australia", name: "Australia", shortName: "AUS", leagueSlug: "icc-cricket" },
  { slug: "england", name: "England", shortName: "ENG", leagueSlug: "icc-cricket" },
  { slug: "pakistan", name: "Pakistan", shortName: "PAK", leagueSlug: "icc-cricket" },
  // Tennis (players)
  { slug: "alcaraz", name: "Carlos Alcaraz", shortName: "ALC", leagueSlug: "atp-tour" },
  { slug: "sinner", name: "Jannik Sinner", shortName: "SIN", leagueSlug: "atp-tour" },
  { slug: "djokovic", name: "Novak Djokovic", shortName: "DJO", leagueSlug: "atp-tour" },
  { slug: "medvedev", name: "Daniil Medvedev", shortName: "MED", leagueSlug: "atp-tour" },
];

export function getTeam(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function teamsByLeague(leagueSlug: string): Team[] {
  return teams.filter((t) => t.leagueSlug === leagueSlug);
}
