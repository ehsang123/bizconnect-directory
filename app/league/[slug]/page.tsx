import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { leagues, getLeague, SPORTS } from "@/data/leagues";
import { fixturesByLeague, fixtureTeamsByLeague } from "@/data/fixtures";
import { getTeam, teamsByLeague } from "@/data/teams";
import { leagueFaqs } from "@/data/faqs";
import MatchCard from "@/components/MatchCard";
import FaqList from "@/components/FaqList";

const leagueSeo: Record<string, string> = {
  "premier-league":
    "What sets the Premier League apart is its depth: on any given weekend, a mid-table side can take points off the champions. The festive fixture pile-up in December, the final-day drama in May, and atmospheres like Anfield on a European night or St James' Park under the lights give the league an identity no other competition quite matches.",
  "la-liga":
    "Beyond the Clásico, La Liga rewards patient viewing. The league's tactical variety — from Atlético's defensive steel to the Basque intensity of Athletic Bilbao — means styles clash every week. Evening kickoffs in Spain also make it a natural primetime watch for fans across Europe and the Americas.",
  "serie-a":
    "Serie A has reinvented itself as one of Europe's most watchable leagues, blending storied clubs with sharp modern coaching. The Derby della Madonnina and the Derby della Capitale remain bucket-list fixtures, while the Scudetto race has gone to the wire in several recent seasons.",
  "bundesliga":
    "If you like goals, the Bundesliga rarely disappoints — it consistently posts the highest scoring averages among Europe's top five leagues. Der Klassiker usually shapes the title race, but the real joy is the league's faith in young players and its famously loud, affordable terraces.",
  "ligue-1":
    "Ligue 1 is where tomorrow's superstars announce themselves. The league's academies and scouting networks feed talent across Europe, which keeps the football fresh and unpredictable. Le Classique between PSG and Marseille, meanwhile, remains one of the continent's most hostile atmospheres.",
  "champions-league":
    "Nothing in club football carries the weight of a Champions League knockout night. The anthem, the floodlights, the away goals drama — even the league phase now produces heavyweight ties early. Come spring, the semifinals are appointment viewing for the entire sporting world.",
  "nba":
    "The NBA season is a marathon with a sprint finish: 82 games sort the contenders from the pretenders, then the playoffs deliver seven-game series where adjustments and star power decide everything. Christmas Day games and the Finals are the cultural high points of the basketball calendar.",
  "nfl":
    "Seventeen games, no margin for error — the NFL's short season makes every Sunday matter. Primetime slots on Sunday, Monday, and Thursday nights turn individual matchups into national events, and the playoff race tightens dramatically after Thanksgiving.",
  "icc-cricket":
    "International cricket's limited-overs calendar moves fast: bilateral series through the year build toward global tournaments. Day-night ODIs under lights and the frenetic pace of T20s have pulled in a new generation of fans alongside the traditionalists.",
  "atp-tour":
    "The ATP Tour never really sleeps, rolling from hard courts to clay to grass across eleven months. Masters 1000 events are where rivalries sharpen, and the Grand Slams — best-of-five, two-week epics — still define careers and legacies.",
};

export async function generateStaticParams() {
  return leagues.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const league = getLeague(slug);
  if (!league) return {};
  return {
    title: `${league.name} Fixtures & Match Schedule — KickOff`,
    description: `Upcoming ${league.name} fixtures sorted by kickoff time. ${league.blurb}`,
  };
}

export default async function LeaguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const league = getLeague(slug);
  if (!league) notFound();

  const list = fixturesByLeague(slug);
  const sportName = SPORTS.find((s) => s.slug === league.sport)?.name ?? league.sport;
  const directTeams = teamsByLeague(slug);
  const teamSlugs =
    directTeams.length > 0 ? directTeams.map((t) => t.slug) : fixtureTeamsByLeague(slug);
  const faqs = leagueFaqs[slug] ?? [];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/#leagues">Leagues</Link> / {league.name}
          </div>
          <h1>{league.name} Fixtures</h1>
          <p className="meta">
            {sportName} · {league.country} · Season {league.season}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Upcoming Matches</h2>
            <span className="sub">{list.length} fixtures</span>
          </div>
          {list.length === 0 ? (
            <p>No fixtures in the demo dataset right now.</p>
          ) : (
            <div className="match-grid">
              {list.map((fx) => (
                <MatchCard
                  key={fx.slug}
                  fixture={fx}
                  home={getTeam(fx.homeSlug)!}
                  away={getTeam(fx.awaySlug)!}
                  league={league}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Teams</h2>
          </div>
          <div className="team-chips">
            {teamSlugs.map((ts) => {
              const t = getTeam(ts);
              if (!t) return null;
              return (
                <Link key={ts} href={`/team/${ts}`} className="team-chip">
                  {t.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>About the {league.name}</h2>
            <p>{league.blurb}</p>
            <p>{leagueSeo[slug]}</p>
          </div>
          <div className="section-head">
            <h2>{league.name} FAQs</h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
