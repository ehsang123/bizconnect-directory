import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SPORTS, leagues } from "@/data/leagues";

export const metadata: Metadata = {
  title: "KickOff — Free Live Sports Streams",
  description:
    "KickOff is a demo sports directory: browse upcoming fixtures across soccer, basketball, American football, cricket, and tennis, organized by league and kickoff time.",
};

const sportAnchor: Record<string, string> = {
  soccer: "soccer",
  basketball: "basketball",
  "american-football": "american-football",
  cricket: "cricket",
  tennis: "tennis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="brand">
              <span className="kick">Kick</span>Off
            </Link>
            <nav className="main-nav" aria-label="Sports">
              {SPORTS.map((s) => (
                <Link key={s.slug} href={`/#sport-${sportAnchor[s.slug]}`}>
                  {s.name}
                </Link>
              ))}
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <h4>KickOff</h4>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/dmca">DMCA</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Soccer Leagues</h4>
                <ul>
                  {leagues
                    .filter((l) => l.sport === "soccer")
                    .slice(0, 5)
                    .map((l) => (
                      <li key={l.slug}>
                        <Link href={`/league/${l.slug}`}>{l.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h4>Other Sports</h4>
                <ul>
                  {leagues
                    .filter((l) => l.sport !== "soccer")
                    .map((l) => (
                      <li key={l.slug}>
                        <Link href={`/league/${l.slug}`}>{l.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 KickOff Demo. All fixture data is fictional sample data.</span>
              <span>Template build — no real streams are provided.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
