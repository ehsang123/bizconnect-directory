import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const useSeo = () => {
  useEffect(() => {
    document.title = "Admin Login | VAR Directory";

    const description = "Secure admin login to manage companies and write blog posts.";
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

const WpAdmin = () => {
  useSeo();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("info.muzammal.gbob@gmail.com");
  const [password, setPassword] = useState("Muzammal786");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = authSchema.safeParse({ email, password });
    if (!parseResult.success) {
      const firstError = Object.values(parseResult.error.flatten().fieldErrors)[0]?.[0];
      toast({
        title: "Invalid credentials",
        description: firstError ?? "Please check your email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) throw error;

        toast({
          title: "Signup successful",
          description: "Check your email to confirm your account, then log in.",
        });

        setMode("login");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        throw error ?? new Error("Login failed");
      }

      // Try to grant admin role if this is the allowed email
      await supabase.rpc("grant_admin_if_allowed");

      toast({
        title: "Welcome back",
        description: "You are now logged in.",
      });

      navigate("/admin", { replace: true });
    } catch (err: any) {
      console.error("Auth error", err);
      toast({
        title: mode === "login" ? "Login failed" : "Signup failed",
        description: err?.message ?? "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <main className="container flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {mode === "login" ? "Admin login" : "Admin signup"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Use your admin email and password to access the dashboard and blog editor.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "login" ? "Log in" : "Sign up"}
              </Button>

              <button
                type="button"
                className="mt-2 w-full text-center text-xs text-muted-foreground underline"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login"
                  ? "Need an account? Sign up first."
                  : "Already have an account? Switch to login."}
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default WpAdmin;
