import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  urlToImage?: string;
}

export function NewsFeed() {
  const [category, setCategory] = useState<"business" | "technology">("business");

  const { data: newsData, isLoading } = useQuery<{ articles: NewsArticle[] }>({
    queryKey: [`/api/news/${category}`],
    refetchInterval: 300000, // Refresh every 5 minutes
    staleTime: 60000,
  });

  const articles = newsData?.articles || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          Latest News
        </CardTitle>
        <CardDescription>Stay updated with business and tech news</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={category} onValueChange={(v) => setCategory(v as "business" | "technology")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>

          <TabsContent value={category} className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading news...</div>
            ) : articles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">{newsData?.message || "No articles available"}</div>
            ) : (
              articles.slice(0, 5).map((article, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2">
                      {article.title}
                      <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    </a>
                  </h3>
                  {article.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium">{article.source.name}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(article.publishedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}