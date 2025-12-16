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
      "Discover verified VARs, MSPs, MSSPs, cloud providers and more with filters for industry, size and location.";
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
                  Discover Verified VARs, MSPs, MSSPs &amp; Cloud Partners Instantly
                </h1>
                <p className="text-base text-muted-foreground md:text-lg">
                  Find managed service providers, security partners, cloud providers and value added
                  resellers in one place. Filter by location, size and specialization to match the
                  right channel partner for your business.
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
                  Explore Our IT Channel Partner Categories
                </h2>
                <p className="text-sm text-muted-foreground">
                  Drill down into specialized partner types like MSPs, MSSPs, VARs, CSPs and more. Each
                  category will host its own curated directory.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Link to="/services/managed-service-providers" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Service Providers</CardTitle>
                      <CardDescription className="text-xs">
                        MSPs offering end-to-end IT management.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/value-added-resellers" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <Globe2 className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Value Added Resellers</CardTitle>
                      <CardDescription className="text-xs">
                        Resellers adding services and integrations.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/managed-security-services" className="group block">
                <Card className="h-full cursor-pointer border border-transparent bg-gradient-to-br from-transparent via-transparent to-transparent transition hover:-translate-y-1 hover:border-primary/40 hover:from-primary/5 hover:via-transparent hover:to-transparent hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary/20">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Security Services Providers</CardTitle>
                      <CardDescription className="text-xs">
                        Security-focused MSSPs and SOC partners.
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
      </main>
    </MainLayout>
  );
};

export default Index;
