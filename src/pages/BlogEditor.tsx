import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Bold, Italic, Heading1, Heading2, List, ListOrdered, Save } from "lucide-react";

type BlogPost = Tables<"blog_posts">;

const useSeo = () => {
  useEffect(() => {
    document.title = "Admin Blog Editor | VAR Directory";

    const description =
      "Admin-only rich text blog editor to create and update articles for the VAR directory.";
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

const BlogEditor = () => {
  useSeo();
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const checkAccessAndLoad = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsAdmin(false);
          return;
        }

        const { data: roleResult, error: roleError } = await supabase.rpc("has_role", {
          _role: "admin",
          _user_id: user.id,
        });

        if (roleError) {
          console.error("Error checking role", roleError);
          toast({
            title: "Access check failed",
            description: "Could not verify admin permissions.",
            variant: "destructive",
          });
          setIsAdmin(false);
          return;
        }

        if (!roleResult) {
          setIsAdmin(false);
          return;
        }

        setIsAdmin(true);

        const { data: postsData, error: postsError } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData ?? []);
      } catch (error) {
        console.error("Error loading blog editor", error);
        toast({
          title: "Error",
          description: "Failed to load blog editor.",
          variant: "destructive",
        });
      } finally {
        setIsCheckingAccess(false);
        setIsLoadingPosts(false);
      }
    };

    checkAccessAndLoad();
  }, [toast]);

  const resetForm = () => {
    setSelectedPostId(null);
    setTitle("");
    setCategory("");
    setContent("");
  };

  const loadPost = (post: BlogPost) => {
    setSelectedPostId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setContent(post.content);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const applyFormatting = (type: "bold" | "italic" | "h1" | "h2" | "ul" | "ol") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    let formatted = content;

    switch (type) {
      case "bold":
        formatted = `${before}**${selected || "bold text"}**${after}`;
        break;
      case "italic":
        formatted = `${before}*${selected || "italic text"}*${after}`;
        break;
      case "h1": {
        const insertion = selected || "Heading 1";
        formatted = `${before}# ${insertion}\n${after}`;
        break;
      }
      case "h2": {
        const insertion = selected || "Heading 2";
        formatted = `${before}## ${insertion}\n${after}`;
        break;
      }
      case "ul": {
        const insertion = selected || "List item";
        formatted = `${before}- ${insertion}\n${after}`;
        break;
      }
      case "ol": {
        const insertion = selected || "List item";
        formatted = `${before}1. ${insertion}\n${after}`;
        break;
      }
      default:
        break;
    }

    setContent(formatted);

    setTimeout(() => {
      const newPos = formatted.length;
      textarea.setSelectionRange(newPos, newPos);
      textarea.focus();
    }, 0);
  };

  const generateSlug = (titleValue: string) => {
    return titleValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const slugBase = generateSlug(title);
      const existingWithSameSlug = posts.filter((p) => p.slug.startsWith(slugBase));
      const slug =
        selectedPostId || existingWithSameSlug.length === 0
          ? slugBase
          : `${slugBase}-${existingWithSameSlug.length + 1}`;

      if (selectedPostId) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title,
            category: category || "General",
            content,
            slug,
          })
          .eq("id", selectedPostId);

        if (error) throw error;
        toast({ title: "Post updated", description: "Your blog post has been updated." });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title,
          category: category || "General",
          content,
          slug,
        });

        if (error) throw error;
        toast({ title: "Post created", description: "Your blog post has been published." });
      }

      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData ?? []);
      resetForm();
    } catch (error: any) {
      console.error("Error saving post", error);
      toast({
        title: "Save failed",
        description:
          error?.message ?? "There was an error saving the post. Make sure you have admin access.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const statusText = useMemo(() => {
    if (isCheckingAccess) return "Checking admin access...";
    if (!isAdmin) return "You must be an admin to manage blog posts.";
    if (isLoadingPosts) return "Loading posts...";
    return "";
  }, [isCheckingAccess, isAdmin, isLoadingPosts]);

  return (
    <MainLayout>
      <main className="container py-8 md:py-12">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog Editor</h1>
            <p className="text-sm text-muted-foreground">
              Create and update blog posts for the directory. Only admins can access this page.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin">Back to Admin Dashboard</Link>
          </Button>
        </header>

        {statusText && (
          <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            {isCheckingAccess || isLoadingPosts ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {statusText}
          </p>
        )}

        {!isAdmin && !isCheckingAccess && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              You do not have permission to access this page. Please log in as an admin.
            </CardContent>
          </Card>
        )}

        {isAdmin && !isCheckingAccess && (
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    {selectedPostId ? "Edit Post" : "New Post"}
                  </CardTitle>
                  {selectedPostId && (
                    <p className="text-xs text-muted-foreground">Editing an existing article.</p>
                  )}
                </div>
                {selectedPostId && (
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Clear
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="title">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter blog post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="category">
                    Category (optional)
                  </label>
                  <Input
                    id="category"
                    placeholder="e.g. News, Insights, Guides"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Content</label>
                    <div className="flex flex-wrap gap-1">
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("bold")}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("italic")}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("h1")}
                      >
                        <Heading1 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("h2")}
                      >
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("ul")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => applyFormatting("ol")}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    ref={textareaRef}
                    rows={16}
                    placeholder="Write or paste your blog content here. Use the toolbar to add headings, bold text, and lists."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports Markdown-style formatting (headings, bold, italics, lists).
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    {selectedPostId ? "Update post" : "Publish post"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Existing posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[480px] overflow-y-auto">
                {posts.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No blog posts yet. Create your first article using the editor.
                  </p>
                )}

                {posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => loadPost(post)}
                    className="w-full rounded-md border bg-card px-3 py-2 text-left text-sm transition hover:bg-accent"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{post.title}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {new Date(post.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                    {post.category && (
                      <p className="mt-1 text-xs text-muted-foreground">{post.category}</p>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default BlogEditor;
