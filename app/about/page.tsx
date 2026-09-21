import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — KickOff",
  description: "What KickOff is: a demo sports fixture directory template.",
};

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / About
          </div>
          <h1>About KickOff</h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="content-block">
            <h2>A demo fixture directory</h2>
            <p>
              KickOff is a demonstration template for a sports directory website. It shows
              how fixtures can be organized by sport and league, how match, team, and
              league pages can link together, and how SEO content and FAQs can sit
              alongside the schedule — all rendered as a fast static site.
            </p>
            <p>
              Every fixture in this build is fictional sample data, and every
              &quot;watch&quot; link is a clearly marked placeholder. The template provides
              no video, hosts no streams, and links to no third-party sources.
            </p>
            <p>
              <Link href="/">← Back to the homepage</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
