import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEffect as ReactUseEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Globe2,
  Users,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Cloud,
  Cpu,
  CloudCog,
  PanelLeft,
} from "lucide-react";

const setSeo = () => {
  ReactUseEffect(() => {
    document.title = "B2B Channel Partner Directory | VARs, MSPs & MSSPs";

    const description =
      "Find the right managed service providers (MSPs) and managed security service providers (MSSPs) first — plus VARs, cloud providers and more, filtered by industry, size and location.";
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

const Index = () => {
  setSeo();

  return (
    <MainLayout>
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
          {/* abstract background shapes */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 top-[-4rem] h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-16 top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="container relative py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-5 animate-fade-in">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Find High-Quality MSPs &amp; MSSPs for Your Next Project
                </h1>
                <p className="text-base text-muted-foreground md:text-lg">
                  Start with managed service providers (MSPs) and managed security service providers (MSSPs)
                  that match your stack, security requirements and geography, then expand into VARs,
                  cloud providers and ISVs as your channel strategy grows.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Link to="/services/value-added-resellers">Browse Directory</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <Link to="/submit-company">List Your Company</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">Verified Listings</Badge>
                  <Badge variant="secondary">Admin Approved</Badge>
                  <Badge variant="secondary">Global Coverage</Badge>
                  <Badge variant="secondary">Weekly Updates</Badge>
                </div>
              </div>

              <div className="relative animate-scale-in">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-accent/20 blur-2xl" />
                <Card className="overflow-hidden border bg-card/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader className="border-b bg-muted/60 pb-3">
                    <CardTitle className="text-base">Live Channel Partner Snapshot</CardTitle>
                    <CardDescription className="text-xs">
                      Example totals across VARs, MSPs, MSSPs, CSPs and more in the directory.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-muted/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">12,500+</span>
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">Verified companies</p>
                      </div>
                      <div className="rounded-lg bg-muted/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">50+ </span>
                          <Globe2 className="h-4 w-4 text-primary" />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">Countries covered</p>
                      </div>
                      <div className="rounded-lg bg-muted/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">20+ </span>
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">Partner categories</p>
                      </div>
                      <div className="rounded-lg bg-muted/60 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">Weekly</span>
                          <CalendarDays className="h-4 w-4 text-primary" />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">Data refresh</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services overview section */}
        <section className="border-b bg-background">
          <div className="container py-10 md:py-14">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Channel Partner Ecosystem
                </p>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Start with MSPs &amp; MSSPs, Then Explore the Full Channel
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your core relationships usually begin with the teams that run your infrastructure
                  and your security operations. From there, extend into VARs, cloud providers,
                  ISVs and systems integrators as your program matures.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* MSP - featured first */}
              <Link to="/services/managed-service-providers" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Service Providers (MSPs)</CardTitle>
                      <CardDescription className="text-xs">
                        End-to-end IT operations and infrastructure partners.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              {/* MSSP - featured second */}
              <Link to="/services/managed-security-services" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Security Services Providers (MSSPs)</CardTitle>
                      <CardDescription className="text-xs">
                        Security operations, MDR, SOC and incident response.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              {/* VARs */}
              <Link to="/services/value-added-resellers" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Globe2 className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Value Added Resellers (VARs)</CardTitle>
                      <CardDescription className="text-xs">
                        Resellers adding services, integrations and local support.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/cloud-service-providers" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Cloud className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Cloud Service Providers</CardTitle>
                      <CardDescription className="text-xs">
                        Cloud hosting, IaaS, PaaS and SaaS specialists.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/independent-software-vendors" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Independent Software Vendors</CardTitle>
                      <CardDescription className="text-xs">
                        ISVs building and selling software products.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/amazon-web-services" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <CloudCog className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Amazon Web Services Partners</CardTitle>
                      <CardDescription className="text-xs">
                        Consulting and technology partners for AWS.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/systems-integrators" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <PanelLeft className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Systems Integrators</CardTitle>
                      <CardDescription className="text-xs">
                        Integration experts for complex IT stacks.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* MSP & MSSP focused content section */}
        <section className="bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="container py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  Why Start with MSPs &amp; MSSPs
                </p>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Build a resilient foundation for operations and security
                </h2>
                <p className="text-sm text-muted-foreground">
                  The right MSP keeps your day-to-day infrastructure running reliably, while the right
                  MSSP defends you against evolving threats. Together they form the core of a modern
                  IT operating model, whether you&apos;re in SaaS, finance, manufacturing or the public sector.
                </p>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-lg border bg-background/60 p-3 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Managed Service Providers (MSPs)
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Help desk, endpoint management, backups, patching, cloud tenancy and more — all in
                      one managed relationship.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-background/60 p-3 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Managed Security Services (MSSPs)
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      24/7 monitoring, SOC, SIEM, MDR and incident response to strengthen your security posture.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-xl border bg-background/70 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    How teams use this directory
                  </p>
                  <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                    <li>
                      • Shortlist 3–5 MSPs or MSSPs in your target region and industry.
                    </li>
                    <li>
                      • Compare capabilities like SOC coverage, certifications and tool stack.
                    </li>
                    <li>
                      • Expand into VARs and cloud providers once your core operations are covered.
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  <Button asChild size="sm" className="shadow-sm">
                    <Link to="/services/managed-service-providers">Browse MSP directory</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="shadow-sm">
                    <Link to="/services/managed-security-services">Browse MSSP directory</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Index;
