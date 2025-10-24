import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getArticleSchema, getBreadcrumbSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ReadingTime } from "@/components/reading-time";
import { SocialShare } from "@/components/social-share";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug;

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await fetch(`/api/articles/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Article not found");
        }
        throw new Error("Failed to fetch article");
      }
      const result = await response.json();
      return result.data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Fasih ur Rehman`;
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.excerpt}
        keywords={article.metaKeywords}
        ogImage={article.ogImage || article.featuredImage}
        article={true}
        canonicalUrl={`https://fasih.com.pk/blog/${slug}`}
        schema={getArticleSchema(article.title, article.metaDescription || article.excerpt, article.publishedAt || article.createdAt)}
      />
      <Navigation />
      <main className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation("/#blog")}
            className="mb-6 sm:mb-8 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>

          {/* Article Header */}
          <header className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                {article.category}
              </Badge>
              {!article.published && (
                <Badge variant="outline" className="text-sm">
                  Draft
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <ReadingTime content={article.content} />
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.authorName || 'Fasih ur Rehman'}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {article.views || 0} views
              </div>
            </div>

            <SocialShare 
              url={window.location.href}
              title={article.title}
              description={article.excerpt}
            />
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setLocation("/#blog")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Button>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}