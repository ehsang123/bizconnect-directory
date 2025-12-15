import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl md:text-3xl">
                    {data.company_name}
                  </CardTitle>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {data.country && (
                      <span>
                        {data.city ? `${data.city}, ` : ""}
                        {data.country}
                      </span>
                    )}
                    {data.industry && <span>• {data.industry}</span>}
                    {data.founded_year && <span>• Founded {data.founded_year}</span>}
                  </div>
                </div>
                {data.num_employees && (
                  <Badge variant="outline">{data.num_employees} employees</Badge>
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
