import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Cloud Service Providers Directory | VAR Directory";

    const description =
      "Browse cloud service providers (CSPs) including hosting, IaaS, PaaS and SaaS specialists.";
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

const CloudServiceProviders = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Cloud Service Providers</h1>
          <p className="text-muted-foreground">
            A dedicated space for cloud partners, from hyperscalers to regional hosting providers.
          </p>
          <p className="text-sm text-muted-foreground">
            As we grow the project, this page can surface CSP-specific filters like cloud platform,
            region and workload focus.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default CloudServiceProviders;
