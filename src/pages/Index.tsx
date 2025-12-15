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
          <div className="grid gap-4 rounded-lg border bg-card p-4 shadow-sm md:grid-cols-4 md:gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium" htmlFor="search">
                Search companies
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
            <div className="space-y-2 md:col-span-1">
              <label className="text-sm font-medium">Company size</label>
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
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <p>
              {isLoading
                ? "Loading approved companies..."
                : `${filtered.length} approved compan${filtered.length === 1 ? "y" : "ies"} found`}
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && (
              <p className="col-span-full text-center text-muted-foreground">
                Loading directory...
              </p>
            )}
            {!isLoading && filtered.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="py-6 text-center text-muted-foreground">
                  No companies match your filters yet. Try adjusting your search.
                </CardContent>
              </Card>
            )}
            {!isLoading &&
              filtered.map((company) => (
                <Card key={company.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2 text-lg">
                      <span>{company.company_name}</span>
                      {company.num_employees && (
                        <Badge variant="outline">{company.num_employees}</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="space-y-1 text-sm">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {company.country && (
                          <span className="text-muted-foreground">
                            {company.city ? `${company.city}, ` : ""}
                            {company.country}
                          </span>
                        )}
                        {company.industry && <span>• {company.industry}</span>}
                      </div>
                      {company.short_description && (
                        <p className="line-clamp-3 text-xs md:text-sm">
                          {company.short_description}
                        </p>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-3 border-t pt-4">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {company.technologies &&
                        company.technologies
                          .split(",")
                          .map((tech) => tech.trim())
                          .filter(Boolean)
                          .slice(0, 3)
                          .map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/companies/${company.id}`}>View details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Index;
