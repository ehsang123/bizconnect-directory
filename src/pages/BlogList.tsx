import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BlogPost = Tables<"blog_posts">;

const useSeo = () => {
  useEffect(() => {
    document.title = "Blog | VAR Directory";

    const description =
      "Articles and insights about B2B value added resellers, partner programs, and go-to-market.";
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

const BlogList = () => {
  useSeo();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
          <p className="max-w-2xl text-muted-foreground">
            Insights, guides, and best practices for building and working with B2B value
            added reseller networks.
          </p>
        </header>

        {isLoading && <p className="text-muted-foreground">Loading articles...</p>}

        {!isLoading && (!posts || posts.length === 0) && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No articles have been published yet.
            </CardContent>
          </Card>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-lg">
                      <span>{post.title}</span>
                      <Badge variant="outline">{post.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-5">
                    {post.excerpt && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default BlogList;
