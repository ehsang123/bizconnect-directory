import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMCA — KickOff",
  description: "DMCA / takedown contact template for the KickOff demo.",
};

export default function DmcaPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / DMCA
          </div>
          <h1>DMCA & Takedown Policy (Template)</h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="content-block">
            <p>
              KickOff is a demonstration template that hosts no video content and links to
              no third-party streams. If a production deployment of this template ever
              displayed material you believe infringes your copyright, you could contact
              the site operator with the work identified, the URL where it appears, and
              your contact details, and the operator would review and remove qualifying
              material promptly. Replace this paragraph with your real takedown process
              before any public launch.
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
