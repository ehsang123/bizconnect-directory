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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MainLayout } from "@/components/layout/MainLayout";
import { Globe2, Users, MapPin, CalendarDays } from "lucide-react";

type Company = Tables<"companies">;

const ITEMS_PER_PAGE = 40;

const EMPLOYEE_RANGES = [
  { value: "1-10", label: "1 - 10 employees", min: 1, max: 10 },
  { value: "11-50", label: "11 - 50 employees", min: 11, max: 50 },
  { value: "51-200", label: "51 - 200 employees", min: 51, max: 200 },
  { value: "200+", label: "200+ employees", min: 201, max: Infinity },
] as const;

const useSeo = () => {
  useEffect(() => {
    document.title = "Managed Service Providers (MSP) Directory | VAR Directory";

    const description =
      "Discover managed service providers (MSPs) offering proactive IT management and support services.";
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
          "id, company_name, industry, num_employees, short_description, country, city, founded_year, technologies, website, logo_url, status, keywords",
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

  const isMspCompany = (company: Company) => {
    const text = (
      `${company.industry ?? ""} ${company.keywords ?? ""} ${company.technologies ?? ""}`
    ).toLowerCase();

    return (
      text.includes("managed service provider") ||
      text.includes("managed services provider") ||
      text.includes("managed services") ||
      text.includes("msp")
    );
  };

  const { countries, industries, filtered } = useMemo(() => {
    const baseList = (companies ?? []).filter(isMspCompany);

    const countriesSet = new Set<string>();
    const industriesSet = new Set<string>();

    const filteredList = baseList.filter((company) => {
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
      <section className="container py-8 md:py-10">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Managed Service Providers (MSPs)
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse admin-approved managed service providers offering proactive monitoring, support and
            end-to-end IT management.
          </p>
        </div>

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
                <h2 className="text-xl font-semibold tracking-tight">MSP Companies</h2>
                <p className="text-sm text-muted-foreground">
                  {isLoading
                    ? "Loading approved MSP companies..."
                    : `${filtered.length} approved MSP compan${filtered.length === 1 ? "y" : "ies"} found`}
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
                    Loading MSP directory...
                  </CardContent>
                </Card>
              )}

              {!isLoading && filtered.length === 0 && (
                <Card>
                  <CardContent className="py-6 text-center text-muted-foreground">
                    No MSP companies match your filters yet. Try adjusting your search.
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
    </MainLayout>
  );
};

export default ManagedServiceProviders;
