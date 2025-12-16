import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "About VAR Directory | IT Channel Partner Hub";

    const description =
      "Learn about our IT channel partner directory connecting MSPs, MSSPs, VARs and cloud providers.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);
};

const AboutUs = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">About VAR Directory</h1>
          <p className="text-muted-foreground">
            VAR Directory is a specialized hub for IT channel partners including managed service
            providers (MSPs), managed security service providers (MSSPs), value added resellers
            (VARs), cloud providers, independent software vendors and systems integrators.
          </p>
          <p className="text-muted-foreground text-sm">
            This page is a starting point for your About Us content. You can expand it later with
            your story, mission, team information and how you work with vendors and partners
            globally.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
