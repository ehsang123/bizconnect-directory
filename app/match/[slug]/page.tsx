import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fixtures, getFixture } from "@/data/fixtures";
import { getTeam } from "@/data/teams";
import { getLeague } from "@/data/leagues";
import { matchFaqs } from "@/data/faqs";
import { formatKickoff } from "@/lib/format";
import FaqList from "@/components/FaqList";

/** DEMO ONLY — placeholder links. Never point these at real streams. */
const demoStreams = [
  { label: "Demo Stream 1", quality: "HD 1080p", lang: "English", url: "#" },
  { label: "Demo Stream 2", quality: "HD 720p", lang: "English", url: "#" },
  { label: "Demo Stream 3", quality: "SD 480p", lang: "Spanish", url: "#" },
  { label: "Demo Stream 4", quality: "HD 720p", lang: "English", url: "#" },
];

export async function generateStaticParams() {
  return fixtures.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fx = getFixture(slug);
  if (!fx) return {};
  const home = getTeam(fx.homeSlug);
  const away = getTeam(fx.awaySlug);
  const league = getLeague(fx.leagueSlug);
  return {
    title: `${home?.name} vs ${away?.name} — ${league?.name} | KickOff`,
    description: `${home?.name} vs ${away?.name} in the ${league?.name}. Kickoff ${formatKickoff(fx.kickoff)}. Demo match page.`,
  };
}

export default async function MatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fx = getFixture(slug);
  if (!fx) notFound();

  const home = getTeam(fx.homeSlug)!;
  const away = getTeam(fx.awaySlug)!;
  const league = getLeague(fx.leagueSlug)!;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> /{" "}
            <Link href={`/league/${league.slug}`}>{league.name}</Link> / {home.shortName} vs{" "}
            {away.shortName}
          </div>
          <div className="match-score-line">
            <Link href={`/team/${home.slug}`} style={{ color: "var(--accent)" }}>
              {home.name}
            </Link>
            <span className="vs-badge">VS</span>
            <Link href={`/team/${away.slug}`} style={{ color: "var(--accent)" }}>
              {away.name}
            </Link>
          </div>
          <p className="meta" style={{ marginTop: 12 }}>
            {league.name} · Kickoff {formatKickoff(fx.kickoff)}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Watch</h2>
            <span className="sub">{demoStreams.length} demo options</span>
          </div>
          <div className="demo-notice">
            <strong>DEMO PLACEHOLDERS:</strong> every link below is a non-functional
            placeholder pointing to <code>#</code>. This template ships with no real streams
            and links to no third-party sources.
          </div>
          <div className="stream-list">
            {demoStreams.map((s, i) => (
              <div key={i} className="stream-row">
                <span className="num">{i + 1}</span>
                <div className="info">
                  <div className="label">{s.label}</div>
                  <div className="tags">
                    <span className="tag demo">Demo</span>
                    <span className="tag hd">{s.quality}</span>
                    <span className="tag">{s.lang}</span>
                  </div>
                </div>
                <a href={s.url} className="stream-btn" aria-label={`${s.label} (demo placeholder)`}>
                  Watch Demo
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How to watch on KickOff</h2>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Find your match</h3>
              <p>Browse by sport or league on the homepage — every fixture is sorted by kickoff time.</p>
            </div>
            <div className="step">
              <h3>Open the match page</h3>
              <p>Tap the fixture card to see the teams, competition, and kickoff details in one place.</p>
            </div>
            <div className="step">
              <h3>Pick a listed option</h3>
              <p>
                In production each match lists multiple sources so you have a backup ready. In
                this demo all options are placeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>
              {home.name} vs {away.name} preview
            </h2>
            <p>
              {home.name} host {away.name} in the {league.name} with kickoff set for{" "}
              {formatKickoff(fx.kickoff)}. It&apos;s one of {league.country}&apos;s most
              anticipated fixtures this week, and both sides will be looking to take all
              three points — or the win, depending on the sport.
            </p>
            <p>
              Check the kickoff time against your local timezone before the match, and keep
              an eye on team news closer to the day. More {league.name} fixtures are listed
              on the <Link href={`/league/${league.slug}`}>league page</Link>.
            </p>
          </div>
          <div className="section-head">
            <h2>Match FAQs</h2>
          </div>
          <FaqList faqs={matchFaqs} />
        </div>
      </section>
    </>
  );
}
