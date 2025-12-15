import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type NewCompany = TablesInsert<"companies">;

const setSeo = () => {
  useEffect(() => {
    document.title = "Submit Company | VAR Directory";

    const description =
      "Submit your B2B value added reseller company for admin review and listing in the directory.";
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

const SubmitCompany = () => {
  setSeo();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<NewCompany>>({
    company_name: "",
    website: "",
    country: "",
    city: "",
    industry: "",
    num_employees: "",
    technologies: "",
    short_description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: keyof NewCompany,
    value: string | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name || !form.country) {
      toast({
        title: "Missing required fields",
        description: "Please fill at least company name and country.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: NewCompany = {
        company_name: form.company_name!,
        website: form.website ?? null,
        country: form.country ?? null,
        city: form.city ?? null,
        industry: form.industry ?? null,
        num_employees: form.num_employees ?? null,
        technologies: form.technologies ?? null,
        short_description: form.short_description ?? null,
        status: "pending",
      } as NewCompany;

      const { error } = await supabase.from("companies").insert([payload]);
      if (error) throw error;

      toast({
        title: "Company submitted",
        description: "Your company is pending admin approval before going live.",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Error submitting company", error);
      toast({
        title: "Submission failed",
        description: error.message ?? "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <div className="mx-auto max-w-2xl space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Submit your value added reseller company
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below. Your submission will be reviewed by an admin
              before it appears in the public directory.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company_name">Company name *</Label>
                <Input
                  id="company_name"
                  value={form.company_name ?? ""}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={form.website ?? ""}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={form.country ?? ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city ?? ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Primary industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g. IT Services, Telecom"
                  value={form.industry ?? ""}
                  onChange={(e) => handleChange("industry", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="num_employees">Company size (employees)</Label>
                <Input
                  id="num_employees"
                  placeholder="e.g. 11-50, 51-200"
                  value={form.num_employees ?? ""}
                  onChange={(e) => handleChange("num_employees", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Key technologies</Label>
              <Input
                id="technologies"
                placeholder="Comma-separated list, e.g. Cisco, Microsoft, AWS"
                value={form.technologies ?? ""}
                onChange={(e) => handleChange("technologies", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short description</Label>
              <Textarea
                id="short_description"
                rows={4}
                placeholder="Describe your value proposition and focus areas."
                value={form.short_description ?? ""}
                onChange={(e) => handleChange("short_description", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                By submitting, you agree that your company details can be listed publicly
                once approved by an admin.
              </p>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for review"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default SubmitCompany;
