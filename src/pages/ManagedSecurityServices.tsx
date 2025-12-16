import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const useSeo = () => {
  useEffect(() => {
    document.title = "Managed Security Service Providers (MSSP) Directory | VAR Directory";

    const description =
      "Explore managed security service providers (MSSPs) delivering SOC, monitoring and managed detection.";
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

const ManagedSecurityServices = () => {
  useSeo();

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Managed Security Service Providers (MSSPs)
          </h1>
          <p className="text-muted-foreground">
            This page will hold your MSSP directory, showcasing security operations, MDR, SIEM,
            incident response and more.
          </p>
          <p className="text-sm text-muted-foreground">
            Later we can mirror the directory UX here with filters for security services, regions and
            certifications.
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default ManagedSecurityServices;
