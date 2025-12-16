import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Amazon Web Services (AWS) Partners Directory | VAR Directory";

    const description =
      "Explore consulting and technology partners specializing in Amazon Web Services (AWS).";
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

const AmazonWebServices = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Amazon Web Services (AWS) Partners
          </h1>
          <p className="text-muted-foreground">
            A dedicated space for AWS-focused consultancies, resellers and technology partners.
          </p>
          <p className="text-sm text-muted-foreground">
            We can later surface partner tier, certifications and workload specializations here.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default AmazonWebServices;
