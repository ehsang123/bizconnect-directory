import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Independent Software Vendors (ISV) Directory | VAR Directory";

    const description =
      "Discover independent software vendors (ISVs) building products across industries and regions.";
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

const IndependentSoftwareVendors = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Independent Software Vendors (ISVs)
          </h1>
          <p className="text-muted-foreground">
            Use this page to feature ISVs, their flagship products and partner programs.
          </p>
          <p className="text-sm text-muted-foreground">
            We can later connect this to structured ISV profiles, product categories and partner tiers.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default IndependentSoftwareVendors;
