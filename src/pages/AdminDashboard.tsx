import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type Company = Tables<"companies">;

const useSeo = () => {
  useEffect(() => {
    document.title = "Admin | VAR Directory";

    const description =
      "Admin dashboard to review, approve, or reject submitted value added reseller companies.";
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

const AdminDashboard = () => {
  useSeo();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pendingCompanies, isLoading } = useQuery({
    queryKey: ["companies", "pending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Company[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "rejected" }) => {
      const { error } = await supabase
        .from("companies")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["companies", "approved"] });
    },
  });

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({
        title: `Company ${status}`,
        description:
          status === "approved"
            ? "The company is now visible in the public directory."
            : "The company has been rejected.",
      });
    } catch (error: any) {
      console.error("Failed to update company status", error);
      toast({
        title: "Action failed",
        description:
          error.message ??
          "You might not have permission to perform this action. Please ensure you are an admin.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (file: File | null) => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please choose a CSV file exported from your Excel sheet.",
      });
      return;
    }

    try {
      const text = await file.text();
      const { data, error } = await supabase.functions.invoke("import-companies", {
        body: { csv: text },
      });

      if (error) {
        console.error("Import error", error);
        toast({
          title: "Import failed",
          description: "There was an error while importing companies.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Import complete",
        description: `Inserted ${data?.inserted ?? 0} companies, skipped ${
          data?.skipped ?? 0
        } existing ones.`,
      });

      queryClient.invalidateQueries({ queryKey: ["companies", "approved"] });
    } catch (err) {
      console.error("Unexpected import error", err);
      toast({
        title: "Import failed",
        description: "Unexpected error while reading or sending the file.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <header className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Admin</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Review new company submissions and import bulk companies from CSV. Only approved
            companies are shown in the public directory.
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Bulk import companies from CSV</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Export your Excel file as CSV and upload it here. Existing companies (by name or
              website) will be skipped automatically.
            </p>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => handleImport(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {isLoading && <p className="text-muted-foreground">Loading pending submissions...</p>}

        {!isLoading && (!pendingCompanies || pendingCompanies.length === 0) && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              There are currently no pending company submissions.
            </CardContent>
          </Card>
        )}

        {!isLoading && pendingCompanies && pendingCompanies.length > 0 && (
          <div className="space-y-4">
            {pendingCompanies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{company.company_name}</CardTitle>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {company.country && <span>{company.country}</span>}
                      {company.industry && <span>• {company.industry}</span>}
                      {company.num_employees && <span>• {company.num_employees}</span>}
                    </div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pb-5 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {company.short_description ?? "No description provided."}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(company.id, "rejected")}
                      disabled={updateStatus.isPending}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAction(company.id, "approved")}
                      disabled={updateStatus.isPending}
                    >
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default AdminDashboard;
