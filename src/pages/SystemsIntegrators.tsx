import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Systems Integrators Directory | VAR Directory";

    const description =
      "Find systems integrators specialising in complex IT deployments and multi-vendor projects.";
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

const SystemsIntegrators = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Systems Integrators</h1>
          <p className="text-muted-foreground">
            Showcase integrators who bring together hardware, software and services into complete
            solutions.
          </p>
          <p className="text-sm text-muted-foreground">
            Later we can connect this page to a dedicated systems integrator directory with the same
            filters you like on the home page.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default SystemsIntegrators;
