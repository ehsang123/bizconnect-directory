import Link from "next/link";
import type { Fixture } from "@/data/fixtures";
import type { Team } from "@/data/teams";
import type { League } from "@/data/leagues";
import { formatKickoff } from "@/lib/format";

interface Props {
  fixture: Fixture;
  home: Team;
  away: Team;
  league: League;
}

export default function MatchCard({ fixture, home, away, league }: Props) {
  return (
    <Link href={`/match/${fixture.slug}`} className="match-card">
      <div className="match-card-league">{league.name}</div>
      <div className="match-card-teams">
        <span className="team-name">{home.name}</span>
        <span className="vs">vs</span>
        <span className="team-name">{away.name}</span>
      </div>
      <div className="match-card-kickoff">{formatKickoff(fixture.kickoff)}</div>
    </Link>
  );
}
