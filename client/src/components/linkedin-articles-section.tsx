import { Linkedin, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

type LinkedInArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
};

export function LinkedInArticlesSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/linkedin/articles"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/linkedin/articles");
      return response.json();
    },
  });

  const articles: LinkedInArticle[] = (data?.data || []).slice(0, 6);

  return (
    <section id="linkedin-articles" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3" variant="secondary">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn Articles
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Published Insights from LinkedIn</h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-56 animate-pulse bg-muted" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <Card className="p-8 text-center mb-8">
            <p className="text-muted-foreground">No LinkedIn articles available right now.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map((article) => (
              <Card key={article.id} className="hover-elevate transition-all duration-300 border-2 hover:border-[#0077b5]/30 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{article.excerpt}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedAt).toLocaleDateString("en-US")}
                    </span>
                    <Button variant="outline" size="sm" className="w-full border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10" asChild>
                      <Link href={`/blog/${article.slug}`}>
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button size="lg" className="bg-[#0077b5] hover:bg-[#006399] text-white" asChild>
            <a href="https://ae.linkedin.com/in/fasihurrehman05/recent-activity/articles/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 mr-2" />
              View All Articles on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
