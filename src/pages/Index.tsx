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
import { MainLayout } from "@/components/layout/MainLayout";
import { Globe2, Users, MapPin, CalendarDays } from "lucide-react";

type Company = Tables<"companies">;

const setSeo = () => {
  useEffect(() => {
    document.title = "B2B Value Added Reseller Directory";

    const description = "Discover approved B2B value added resellers with filters for industry, size, and location.";
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

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies", "approved"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("status", "approved")
        .order("company_name", { ascending: true });

      if (error) throw error;
      return data as Company[];
    },
  });

  const { countries, industries, employeeRanges, filtered } = useMemo(() => {
    const list = companies ?? [];

    const countriesSet = new Set<string>();
    const industriesSet = new Set<string>();
    const employeesSet = new Set<string>();

    const filteredList = list.filter((company) => {
      if (company.country) countriesSet.add(company.country);
      if (company.industry) industriesSet.add(company.industry);
      if (company.num_employees) employeesSet.add(company.num_employees);

      const matchesSearch =
        !search.trim() ||
        company.company_name.toLowerCase().includes(search.toLowerCase()) ||
        (company.industry ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (company.technologies ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesCountry = country === "all" || company.country === country;
      const matchesIndustry = industry === "all" || company.industry === industry;
      const matchesEmployees = employees === "all" || company.num_employees === employees;

      return matchesSearch && matchesCountry && matchesIndustry && matchesEmployees;
    });

    return {
      countries: Array.from(countriesSet).sort(),
      industries: Array.from(industriesSet).sort(),
      employeeRanges: Array.from(employeesSet).sort(),
      filtered: filteredList,
    };
  }, [companies, search, country, industry, employees]);

  return (
    <MainLayout>
      <main className="min-h-screen bg-background">
        <section className="border-b bg-muted/40">
          <div className="container py-12 md:py-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  B2B Value Added Reseller Directory
                </h1>
                <p className="text-muted-foreground">
                  Explore a curated list of approved B2B value added resellers. Filter by
                  industry, company size, and geography to find the right partner for your
                  business.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">Verified Listings</Badge>
                  <Badge variant="secondary">Admin Approved</Badge>
                  <Badge variant="secondary">Global Coverage</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">
                  Are you a value added reseller?
                </p>
                <Button asChild size="sm">
                  <Link to="/submit-company">Submit your company</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-10">
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
                    {employeeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
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
                  filtered.map((company) => (
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
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {company.short_description}
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Index;
