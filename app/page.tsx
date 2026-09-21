import type { Metadata } from "next";
import Link from "next/link";
import { SPORTS, leagues, getLeague } from "@/data/leagues";
import { fixturesByLeague } from "@/data/fixtures";
import { getTeam } from "@/data/teams";
import { homeFaqs } from "@/data/faqs";
import MatchCard from "@/components/MatchCard";
import FaqList from "@/components/FaqList";

export const metadata: Metadata = {
  title: "KickOff — Free Live Sports Streams",
  description:
    "Browse upcoming soccer, basketball, American football, cricket, and tennis fixtures on KickOff. Matches organized by league and kickoff time.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            Live Sports, <span className="accent">One KickOff</span> Away
          </h1>
          <p>
            KickOff gathers upcoming fixtures from the world&apos;s biggest leagues — soccer,
            basketball, American football, cricket, and tennis — and lines them up by kickoff
            time so you never miss a match.
          </p>
          <a href="#sport-soccer" className="hero-cta">
            Browse Today&apos;s Matches
          </a>
        </div>
      </section>

      {SPORTS.map((sport) => {
        const sportLeagues = leagues.filter((l) => l.sport === sport.slug);
        const groups = sportLeagues
          .map((league) => ({ league, list: fixturesByLeague(league.slug) }))
          .filter((g) => g.list.length > 0);
        if (groups.length === 0) return null;
        return (
          <section key={sport.slug} id={`sport-${sport.slug}`} className="section">
            <div className="container">
              <div className="section-head">
                <h2>{sport.name}</h2>
                <span className="sub">Upcoming fixtures by league</span>
              </div>
              {groups.map(({ league, list }) => (
                <div key={league.slug} className="league-group">
                  <div className="league-group-title">
                    <h3>{league.name}</h3>
                    <Link href={`/league/${league.slug}`}>View league →</Link>
                  </div>
                  <div className="match-grid">
                    {list.map((fx) => {
                      const home = getTeam(fx.homeSlug)!;
                      const away = getTeam(fx.awaySlug)!;
                      const lg = getLeague(fx.leagueSlug)!;
                      return (
                        <MatchCard key={fx.slug} fixture={fx} home={home} away={away} league={lg} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="section" id="leagues">
        <div className="container">
          <div className="section-head">
            <h2>All Leagues</h2>
            <span className="sub">{leagues.length} competitions covered</span>
          </div>
          <div className="league-grid">
            {leagues.map((l) => (
              <Link key={l.slug} href={`/league/${l.slug}`} className="league-card">
                <span className="sport-tag">
                  {SPORTS.find((s) => s.slug === l.sport)?.name}
                </span>
                <h3>{l.name}</h3>
                <p>
                  {l.country} · {l.season}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>Why fans start their matchday on KickOff</h2>
            <p>
              Most fixture lists are either buried inside club apps or scattered across a dozen
              league websites. KickOff takes a simpler approach: one page per sport, every
              upcoming match grouped under its league and sorted by kickoff time. You can scan
              the whole week of football in seconds — from Friday night&apos;s Ligue 1 games to
              Monday&apos;s NFL primetime — without opening ten tabs.
            </p>
            <p>
              Each fixture gets its own match page with the essentials up top: who&apos;s
              playing, which competition it belongs to, and exactly when it kicks off in UTC.
              Team pages collect every upcoming game for your club in one place, and league
              pages keep the full schedule together with background on the competition itself.
            </p>
          </div>

          <div className="content-block">
            <h2>Built for every sport, not just soccer</h2>
            <p>
              Soccer is the heart of KickOff — the Premier League, La Liga, Serie A, the
              Bundesliga, Ligue 1, and the Champions League all have dedicated sections. But
              matchdays don&apos;t stop there, so neither do we: the <Link href="/league/nba">NBA</Link>{" "}
              and <Link href="/league/nfl">NFL</Link> cover American nights, international
              cricket fills the afternoons, and the{" "}
              <Link href="/league/atp-tour">ATP Tour</Link> keeps tennis fans up to date
              through the season.
            </p>
            <p>
              New to a competition? Every league page includes a short primer on how it works —
              how many teams take part, how the champion is decided, and which rivalries define
              the calendar — so you can follow along even if it&apos;s your first season
              watching.
            </p>
          </div>

          <div className="content-block">
            <h2>A note on the stream listings</h2>
            <p>
              This build is a demonstration template. Every &quot;watch&quot; link on match
              pages is a clearly labeled placeholder and points nowhere. The structure is ready
              for a production operator to connect their own authorized sources — the demo
              itself provides no video and links to no third-party streams.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>
    </>
  );
}
