export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: "Is KickOff free to use?",
    a: "Yes. Browsing fixtures, leagues, and teams on KickOff costs nothing and never asks for a subscription.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Everything on this demo is visible without signing up — just pick a sport, open a match, and look through the listing.",
  },
  {
    q: "Which sports does KickOff cover?",
    a: "Soccer, basketball, American football, cricket, and tennis — from the Premier League and La Liga to the NBA, NFL, international cricket, and the ATP Tour.",
  },
  {
    q: "How are fixtures organized?",
    a: "Every fixture is grouped under its league and sorted by kickoff time, so you can see what's on today and later in the week at a glance.",
  },
  {
    q: "What are the stream links on match pages?",
    a: "They are clearly marked DEMO placeholders (pointing to '#'). In a production build they would be replaced with your own licensed or authorized sources.",
  },
  {
    q: "Can I use KickOff on my phone?",
    a: "Yes — the layout is fully responsive and the match lists, league pages, and FAQs all work on small screens.",
  },
];

export const matchFaqs: Faq[] = [
  {
    q: "When does this match kick off?",
    a: "The kickoff date and time are shown at the top of the page in UTC, so you can convert it to your local timezone easily.",
  },
  {
    q: "Why are the stream links marked DEMO?",
    a: "This is a template build. Every link is a placeholder pointing to '#' — wire them to your own authorized sources before any public launch.",
  },
  {
    q: "What should I do if a link doesn't work?",
    a: "On a production site you would try the next listed option. In this demo all links are placeholders, so they intentionally go nowhere.",
  },
  {
    q: "Can I follow a team to see all its fixtures?",
    a: "Yes — tap either team name on the match page to open its team page with every upcoming fixture listed.",
  },
];

const generic = (league: string): Faq[] => [
  {
    q: `Where can I see the full ${league} fixture list?`,
    a: `Every upcoming ${league} fixture in our demo dataset is listed above, sorted by kickoff time. Each card links to a dedicated match page.`,
  },
  {
    q: `Are ${league} kickoff times shown in my timezone?`,
    a: "Kickoff times are displayed in UTC. Add or subtract your local offset to get the exact start time where you live.",
  },
  {
    q: `Does KickOff cover every ${league} team?`,
    a: "This demo includes the league's biggest clubs. A production version would expand the team list and the fixture feed.",
  },
];

export const leagueFaqs: Record<string, Faq[]> = {
  "premier-league": [
    {
      q: "How many teams play in the Premier League?",
      a: "Twenty clubs play 38 rounds each, from August to May, in a double round-robin format.",
    },
    {
      q: "Which derbies headline the Premier League calendar?",
      a: "The North London derby (Arsenal vs Tottenham), the Manchester derby, and the Merseyside derby (Liverpool vs Everton) are the standout rivalries.",
    },
    ...generic("Premier League"),
  ],
  "la-liga": [
    {
      q: "What is El Clásico?",
      a: "El Clásico is the meeting of Real Madrid and Barcelona — the most watched club fixture in world football, played twice each league season.",
    },
    {
      q: "How many clubs compete in La Liga?",
      a: "Twenty clubs play 38 matchdays, with the bottom three relegated to the Segunda División at the end of the season.",
    },
    ...generic("La Liga"),
  ],
  "serie-a": [
    {
      q: "What is the Derby della Madonnina?",
      a: "It's the Milan derby between Inter and AC Milan, named after the statue of the Virgin Mary atop Milan Cathedral.",
    },
    {
      q: "How is the Serie A champion decided?",
      a: "The club with the most points after 38 rounds wins the Scudetto. Tie-breakers are decided by head-to-head record.",
    },
    ...generic("Serie A"),
  ],
  bundesliga: [
    {
      q: "What is Der Klassiker?",
      a: "Der Klassiker is Bayern Munich vs Borussia Dortmund — Germany's biggest club fixture, usually decisive in the title race.",
    },
    {
      q: "How many teams are in the Bundesliga?",
      a: "Eighteen clubs play 34 rounds. The Bundesliga is famous for the highest average attendances in European football.",
    },
    ...generic("Bundesliga"),
  ],
  "ligue-1": [
    {
      q: "What is Le Classique?",
      a: "Le Classique is Paris Saint-Germain vs Marseille — the fiercest rivalry in French football, splitting the capital and the south.",
    },
    {
      q: "How many rounds does a Ligue 1 season have?",
      a: "Eighteen clubs play 34 rounds, with the bottom two relegated directly and the 16th-placed club entering a playoff.",
    },
    ...generic("Ligue 1"),
  ],
  "champions-league": [
    {
      q: "How does the Champions League work?",
      a: "Europe's top clubs first play a league phase, then the best sides advance to two-legged knockout ties culminating in a single final.",
    },
    {
      q: "Which clubs have won the most European Cups?",
      a: "Real Madrid lead the way with the most titles, followed by AC Milan, Bayern Munich, Liverpool, and Barcelona.",
    },
    ...generic("the Champions League"),
  ],
  nba: [
    {
      q: "How long is the NBA regular season?",
      a: "Each of the 30 teams plays 82 games, followed by a play-in tournament and four rounds of best-of-seven playoff series.",
    },
    {
      q: "When are the NBA Finals?",
      a: "The Finals are played in June, ending a postseason that begins in April after the regular season wraps up.",
    },
    ...generic("the NBA"),
  ],
  nfl: [
    {
      q: "How many games does each NFL team play?",
      a: "Each of the 32 teams plays 17 regular-season games across 18 weeks, with one bye week per club.",
    },
    {
      q: "How do teams reach the Super Bowl?",
      a: "Seven teams from each conference make the playoffs; the AFC and NFC champions then meet in the Super Bowl.",
    },
    ...generic("the NFL"),
  ],
  "icc-cricket": [
    {
      q: "What formats are played in international cricket?",
      a: "The main limited-overs formats are ODIs (50 overs per side) and T20s (20 overs per side), alongside five-day Test matches.",
    },
    {
      q: "Which is the biggest rivalry in world cricket?",
      a: "India vs Pakistan draws the largest global audience of any cricket fixture; India vs Australia is the premier contest in Test cricket.",
    },
    ...generic("international cricket"),
  ],
  "atp-tour": [
    {
      q: "What are the four Grand Slams?",
      a: "The Australian Open, French Open, Wimbledon, and US Open — the four majors, each played over two weeks.",
    },
    {
      q: "How does the ATP ranking work?",
      a: "Players earn points based on results over a rolling 52-week period, with the most points deciding the world No. 1.",
    },
    ...generic("the ATP Tour"),
  ],
};
