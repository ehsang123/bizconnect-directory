import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Value Added Resellers (VAR) Directory | VAR Directory";

    const description =
      "Browse value added resellers (VARs) providing implementation, configuration and ongoing services.";
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

const ValueAddedResellers = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Value Added Resellers (VARs)</h1>
          <p className="text-muted-foreground">
            This page will become the home for VAR-focused listings and content. Use it to highlight
            partners who bundle software, hardware and services.
          </p>
          <p className="text-sm text-muted-foreground">
            We can later plug in filters, search and dedicated company cards specifically for VAR
            partners.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default ValueAddedResellers;
