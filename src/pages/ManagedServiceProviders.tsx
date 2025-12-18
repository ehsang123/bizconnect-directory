import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Managed Service Providers (MSP) Directory | VAR Directory";

    const description =
      "Discover managed service providers (MSPs) offering end-to-end IT management and support.";
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

const ManagedServiceProviders = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Managed Service Providers (MSPs)
          </h1>
          <p className="text-muted-foreground">
            This section will host your dedicated MSP directory. You can add filters, categories and
            detailed profiles for managed service providers here.
          </p>
          <p className="text-sm text-muted-foreground">
            For now this is a placeholder page so you can start planning content and structure. We can
            later connect this to data in your backend the same way the main directory works.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default ManagedServiceProviders;
