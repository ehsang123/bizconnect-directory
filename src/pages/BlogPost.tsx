import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BlogPost = Tables<"blog_posts">;

const useSeo = (post?: BlogPost | null) => {
  useEffect(() => {
    const title = post ? `${post.title} | VAR Directory Blog` : "Blog Article | VAR Directory";
    document.title = title;

    const description =
      post?.excerpt ??
      "Read this article from the VAR Directory blog about value added reseller networks.";
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
  }, [post]);
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data as BlogPost | null;
    },
  });

  useSeo(data ?? undefined);

  return (
    <MainLayout>
      <section className="container py-10 md:py-16">
        {isLoading && <p className="text-muted-foreground">Loading article...</p>}

        {!isLoading && !data && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              This article could not be found.
            </CardContent>
          </Card>
        )}

        {!isLoading && data && (
          <article className="mx-auto max-w-3xl">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl md:text-3xl">{data.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {new Date(data.published_at).toLocaleDateString()} • {data.category}
                </p>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </CardContent>
            </Card>
          </article>
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPost;
