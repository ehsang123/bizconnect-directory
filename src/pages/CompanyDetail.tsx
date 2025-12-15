import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Globe, Phone, Building2 } from "lucide-react";

type Company = Tables<"companies">;

const useSeo = (name?: string | null) => {
  useEffect(() => {
    const titleBase = name ? `${name} | VAR Directory` : "Company Details | VAR Directory";
    document.title = titleBase;

    const description =
      name
        ? `View detailed profile for ${name}, an approved B2B value added reseller.`
        : "View company details for an approved B2B value added reseller.";
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

    // Mark individual company profile pages as non-indexable for search engines
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex,follow";
  }, [name]);
};

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["company", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .maybeSingle();
      if (error) throw error;
      return data as Company | null;
    },
  });

  useSeo(data?.company_name);

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        {isLoading && (
          <p className="text-muted-foreground">Loading company details...</p>
        )}
        {!isLoading && !data && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              This company could not be found or is not approved for public viewing.
            </CardContent>
          </Card>
        )}
        {!isLoading && data && (
          <Card className="mx-auto max-w-3xl">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {data.logo_url && (
                    <div className="h-14 w-14 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={data.logo_url}
                        alt={`${data.company_name} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {data.company_name}
                    </CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {data.country && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {data.city ? `${data.city}, ` : ""}
                            {data.country}
                          </span>
                        </span>
                      )}
                      {data.industry && (
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-4 w-4" />
                          <span>{data.industry}</span>
                        </span>
                      )}
                      {data.founded_year && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>Founded {data.founded_year}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {data.num_employees && (
                  <Badge variant="outline" className="inline-flex items-center gap-1.5 self-start text-xs md:text-sm">
                    <Users className="h-3.5 w-3.5" />
                    <span>{data.num_employees} employees</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              {data.short_description && (
                <section>
                  <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground">
                    Overview
                  </h2>
                  <p className="leading-relaxed text-sm md:text-base">
                    {data.short_description}
                  </p>
                </section>
              )}

              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <h2 className="text-xs font-semibold tracking-wide text-muted-foreground">
                    Company details
                  </h2>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {data.full_address && <p>{data.full_address}</p>}
                    {!data.full_address && (data.street || data.city || data.state || data.postal_code) && (
                      <p>
                        {[data.street, data.city, data.state, data.postal_code].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {data.phone && (
                      <p className="inline-flex items-center gap-1.5">
                        <Phone className="h-4 w-4" />
                        <span>{data.phone}</span>
                      </p>
                    )}
                    {data.website && (
                      <p className="inline-flex items-center gap-1.5">
                        <Globe className="h-4 w-4" />
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noreferrer"
                          className="underline-offset-2 hover:underline"
                        >
                          {data.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {data.technologies && (
                <section className="space-y-2">
                  <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
                    Key technologies
                  </h2>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {data.technologies
                      .split(",")
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                      .map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                  </div>
                </section>
              )}

              <section className="space-y-2">
                <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
                  Contact & links
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  {data.website && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit website of ${data.company_name}`}
                      >
                        Visit website
                      </a>
                    </Button>
                  )}
                  {data.linkedin_url && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={data.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View LinkedIn profile of ${data.company_name}`}
                      >
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {data.twitter_url && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={data.twitter_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View Twitter profile of ${data.company_name}`}
                      >
                        Twitter
                      </a>
                    </Button>
                  )}
                  {data.facebook_url && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={data.facebook_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View Facebook page of ${data.company_name}`}
                      >
                        Facebook
                      </a>
                    </Button>
                  )}
                </div>
              </section>
            </CardContent>
          </Card>
        )}
      </section>
    </MainLayout>
  );
};

export default CompanyDetail;
