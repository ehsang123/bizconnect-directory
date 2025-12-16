import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { MainLayout } from "@/components/layout/MainLayout";
import { Globe2, Users, MapPin, CalendarDays, ShieldCheck, Cloud, Cpu, CloudCog, PanelLeft } from "lucide-react";

type Company = Tables<"companies">;

const ITEMS_PER_PAGE = 40;

const EMPLOYEE_RANGES = [
  { value: "1-10", label: "1 - 10 employees", min: 1, max: 10 },
  { value: "11-50", label: "11 - 50 employees", min: 11, max: 50 },
  { value: "51-200", label: "51 - 200 employees", min: 51, max: 200 },
  { value: "200+", label: "200+ employees", min: 201, max: Infinity },
] as const;

const setSeo = () => {
  useEffect(() => {
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

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [industry, setIndustry] = useState<string>("all");
  const [employees, setEmployees] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialCompanies] = useState<Company[] | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    try {
      const stored = window.localStorage.getItem("companies_cache_v1");
      return stored ? (JSON.parse(stored) as Company[]) : undefined;
    } catch {
      return undefined;
    }
  });

  const getDescriptionPreview = (text: string, maxLength = 80) => {
    if (!text) return "";
    const normalized = text.replace(/\s+/g, " ").trim();
    if (normalized.length <= maxLength) return normalized;
    return normalized.slice(0, maxLength).replace(/[,;:]?\s*$/, "") + "...";
  };

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies", "approved"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select(
          "id, company_name, industry, num_employees, short_description, country, city, founded_year, technologies, website, logo_url, status",
        )
        .eq("status", "approved")
        .order("company_name", { ascending: true });

      if (error) throw error;

      const typedData = data as Company[];
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem("companies_cache_v1", JSON.stringify(typedData));
        } catch {
          // ignore cache errors
        }
      }

      return typedData;
    },
    initialData: initialCompanies,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { countries, industries, filtered } = useMemo(() => {
    const list = companies ?? [];

    const countriesSet = new Set<string>();
    const industriesSet = new Set<string>();

    const filteredList = list.filter((company) => {
      if (company.country) countriesSet.add(company.country);
      if (company.industry) industriesSet.add(company.industry);

      const matchesSearch =
        !search.trim() ||
        company.company_name.toLowerCase().includes(search.toLowerCase()) ||
        (company.industry ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (company.technologies ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesCountry = country === "all" || company.country === country;
      const matchesIndustry = industry === "all" || company.industry === industry;

      let matchesEmployees = true;
      if (employees !== "all") {
        const range = EMPLOYEE_RANGES.find((r) => r.value === employees);
        if (range) {
          const numericEmployees = company.num_employees
            ? parseInt(company.num_employees.replace(/[^0-9]/g, ""), 10)
            : undefined;

          matchesEmployees = Boolean(
            numericEmployees &&
              Number.isFinite(numericEmployees) &&
              numericEmployees >= range.min &&
              numericEmployees <= range.max,
          );
        }
      }

      return matchesSearch && matchesCountry && matchesIndustry && matchesEmployees;
    });

    return {
      countries: Array.from(countriesSet).sort(),
      industries: Array.from(industriesSet).sort(),
      filtered: filteredList,
    };
  }, [companies, search, country, industry, employees]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, country, industry, employees]);

  const { paginatedCompanies, totalPages } = useMemo(() => {
    const totalPagesCalc = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPagesCalc);
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedCompanies: filtered.slice(start, end),
      totalPages: totalPagesCalc,
    };
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="border-b bg-muted/40">
          <div className="container py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-5">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Discover Verified VARs, MSPs, MSSPs &amp; Cloud Partners Instantly
                </h1>
                <p className="text-base text-muted-foreground md:text-lg">
                  Find managed service providers, security partners, cloud providers and value added
                  resellers in one place. Filter by location, size and specialization to match the
                  right channel partner for your business.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <a href="#directory">Browse Directory</a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
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

              <div className="relative">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 blur-2xl" />
                <Card className="overflow-hidden border bg-card/80 shadow-lg backdrop-blur">
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

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Link to="/services/managed-service-providers" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Service Providers</CardTitle>
                      <CardDescription className="text-xs">MSPs offering end-to-end IT management.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/value-added-resellers" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Globe2 className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Value Added Resellers</CardTitle>
                      <CardDescription className="text-xs">Resellers adding services and integrations.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/managed-security-services" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Managed Security Services Providers</CardTitle>
                      <CardDescription className="text-xs">Security-focused MSSPs and SOC partners.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/cloud-service-providers" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cloud className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Cloud Service Providers</CardTitle>
                      <CardDescription className="text-xs">Cloud hosting, IaaS, PaaS and SaaS specialists.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/independent-software-vendors" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Independent Software Vendors</CardTitle>
                      <CardDescription className="text-xs">ISVs building and selling software products.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/amazon-web-services" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CloudCog className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Amazon Web Services Partners</CardTitle>
                      <CardDescription className="text-xs">Consulting and technology partners for AWS.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/services/systems-integrators" className="group block">
                <Card className="h-full cursor-pointer transition hover:-translate-y-1 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-3 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PanelLeft className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Systems Integrators</CardTitle>
                      <CardDescription className="text-xs">Integration experts for complex IT stacks.</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Directory section */}
        <section id="directory" className="container py-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
            {/* Filters sidebar */}
            <aside className="space-y-6 rounded-lg border bg-card p-4 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="search">
                  Company Name
                </label>
                <Input
                  id="search"
                  placeholder="Search by name, industry, or technology"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All countries</SelectItem>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All industries</SelectItem>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Employees</label>
                <Select value={employees} onValueChange={setEmployees}>
                  <SelectTrigger>
                    <SelectValue placeholder="All sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All sizes</SelectItem>
                    {EMPLOYEE_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </aside>

            {/* Results column */}
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">All Companies</h2>
                  <p className="text-sm text-muted-foreground">
                    {isLoading
                      ? "Loading approved companies..."
                      : `${filtered.length} approved compan${filtered.length === 1 ? "y" : "ies"} found`}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Sort by:</span>
                  <Badge variant="outline">Recommended</Badge>
                </div>
              </div>

              <div className="space-y-3">
                {isLoading && (
                  <Card>
                    <CardContent className="py-6 text-center text-muted-foreground">
                      Loading directory...
                    </CardContent>
                  </Card>
                )}

                {!isLoading && filtered.length === 0 && (
                  <Card>
                    <CardContent className="py-6 text-center text-muted-foreground">
                      No companies match your filters yet. Try adjusting your search.
                    </CardContent>
                  </Card>
                )}

                {!isLoading &&
                  paginatedCompanies.map((company) => (
                    <Card key={company.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
                      <div className="flex flex-1 items-start gap-4">
                        {company.logo_url && (
                          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border bg-muted sm:h-14 sm:w-14">
                            <img
                              src={company.logo_url}
                              alt={`${company.company_name} logo`}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-base font-semibold md:text-lg">
                                {company.company_name}
                              </CardTitle>
                              {company.industry && (
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  {company.industry}
                                </p>
                              )}
                            </div>
                            {company.num_employees && (
                              <Badge variant="outline" className="text-xs">
                                {company.num_employees}
                              </Badge>
                            )}
                          </div>

                          {company.short_description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {getDescriptionPreview(company.short_description)}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            {company.num_employees && (
                              <span className="inline-flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{company.num_employees} employees</span>
                              </span>
                            )}
                            {company.country && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {company.city ? `${company.city}, ` : ""}
                                  {company.country}
                                </span>
                              </span>
                            )}
                            {company.founded_year && (
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3 w-3" />
                                <span>Founded {company.founded_year}</span>
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {company.technologies &&
                              company.technologies
                                .split(",")
                                .map((tech) => tech.trim())
                                .filter(Boolean)
                                .slice(0, 4)
                                .map((tech) => (
                                  <Badge key={tech} variant="outline">
                                    {tech}
                                  </Badge>
                                ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:w-40">
                        {company.website && (
                          <Button asChild size="sm" className="w-full">
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center gap-1"
                            >
                              <Globe2 className="h-3 w-3" />
                              <span>Visit Website</span>
                            </a>
                          </Button>
                        )}
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <Link to={`/companies/${company.id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}

                {!isLoading && totalPages > 1 && (
                  <div className="flex justify-center pt-4">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(Math.max(1, currentPage - 1));
                              }}
                            />
                          </PaginationItem>
                        )}

                        {(() => {
                          const windowSize = 5;
                          const pages: (number | "ellipsis")[] = [];

                          if (totalPages <= windowSize + 2) {
                            for (let p = 1; p <= totalPages; p += 1) pages.push(p);
                          } else {
                            const firstPage = 1;
                            const lastPage = totalPages;
                            let startPage = currentPage - Math.floor(windowSize / 2);
                            let endPage = currentPage + Math.floor(windowSize / 2);

                            if (startPage < 2) {
                              startPage = 2;
                              endPage = startPage + windowSize - 1;
                            }
                            if (endPage > lastPage - 1) {
                              endPage = lastPage - 1;
                              startPage = endPage - windowSize + 1;
                            }

                            pages.push(firstPage);
                            if (startPage > firstPage + 1) pages.push("ellipsis");

                            for (let p = startPage; p <= endPage; p += 1) pages.push(p);

                            if (endPage < lastPage - 1) pages.push("ellipsis");
                            pages.push(lastPage);
                          }

                          return pages.map((page, index) => {
                            if (page === "ellipsis") {
                              return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }

                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={page === currentPage}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                  }}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          });
                        })()}

                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(Math.min(totalPages, currentPage + 1));
                              }}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Index;
