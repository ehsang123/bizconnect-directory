import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, getTeam } from "@/data/teams";
import { getLeague } from "@/data/leagues";
import { fixturesByTeam } from "@/data/fixtures";
import MatchCard from "@/components/MatchCard";

export async function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeam(slug);
  if (!team) return {};
  return {
    title: `${team.name} Fixtures & Upcoming Matches — KickOff`,
    description: `All upcoming ${team.name} fixtures in one place, sorted by kickoff time.`,
  };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = getTeam(slug);
  if (!team) notFound();

  const league = getLeague(team.leagueSlug);
  const list = fixturesByTeam(slug);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> /{" "}
            {league && <Link href={`/league/${league.slug}`}>{league.name}</Link>} / {team.name}
          </div>
          <h1>{team.name}</h1>
          <p className="meta">
            {team.shortName}
            {league ? ` · ${league.name} · ${league.season}` : ""}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Upcoming Fixtures</h2>
            <span className="sub">{list.length} matches</span>
          </div>
          {list.length === 0 ? (
            <p>No upcoming fixtures for {team.name} in the demo dataset.</p>
          ) : (
            <div className="match-grid">
              {list.map((fx) => (
                <MatchCard
                  key={fx.slug}
                  fixture={fx}
                  home={getTeam(fx.homeSlug)!}
                  away={getTeam(fx.awaySlug)!}
                  league={getLeague(fx.leagueSlug)!}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>Following {team.name} on KickOff</h2>
            <p>
              This page collects every upcoming {team.name} fixture in our demo schedule,
              ordered by kickoff time and labeled with its competition. Open any match card
              for the full match page, including the kickoff countdown details and the
              demo watch-link layout.
            </p>
            <p>
              {league
                ? `In ${league.season}, ${team.name} competes in the ${league.name} — ${league.blurb}`
                : ""}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
