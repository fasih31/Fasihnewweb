import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, ExternalLink, Calendar, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

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

  const { data: newsData, isLoading, refetch } = useQuery<{ articles: NewsArticle[] }>({
    queryKey: [`/api/news/${category}`],
    refetchInterval: 300000,
    staleTime: 60000,
  });

  const articles = newsData?.articles || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              Latest News
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              Real-time news from BBC
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Tabs value={category} onValueChange={(v) => setCategory(v as "business" | "technology")}>
          <TabsList className="grid w-full grid-cols-2 mb-4 h-9">
            <TabsTrigger value="business" className="text-xs sm:text-sm">Business</TabsTrigger>
            <TabsTrigger value="technology" className="text-xs sm:text-sm">Technology</TabsTrigger>
          </TabsList>

          <TabsContent value={category} className="space-y-3 sm:space-y-4 mt-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Loading news...</div>
            ) : articles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No articles available</div>
            ) : (
              articles.slice(0, 5).map((article, index) => (
                <div key={index} className="border-b pb-3 sm:pb-4 last:border-b-0">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base leading-snug hover:text-primary transition-colors">
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-start gap-2"
                    >
                      <span className="flex-1">{article.title}</span>
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />
                    </a>
                  </h3>
                  {article.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
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