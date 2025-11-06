
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, ExternalLink, Calendar, RefreshCw, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

export default function NewsDetail() {
  const [category, setCategory] = useState<"business" | "technology">("business");

  const { data: newsData, isLoading, refetch } = useQuery<{ articles: NewsArticle[] }>({
    queryKey: [`/api/news/${category}`],
    refetchInterval: 300000,
    staleTime: 60000,
  });

  const articles = newsData?.articles || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Latest News - Business & Technology | Fasih ur Rehman"
        description="Stay updated with the latest business and technology news from BBC and other trusted sources."
        keywords="business news, technology news, latest news, BBC news, tech updates"
        canonicalUrl="https://iamfasih.com/news"
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Newspaper className="h-8 w-8" />
                  Latest News
                </h1>
                <p className="text-muted-foreground">Real-time news from BBC and trusted sources</p>
              </div>
              <Button onClick={() => refetch()} disabled={isLoading} size="lg">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs value={category} onValueChange={(v) => setCategory(v as "business" | "technology")} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>

            <TabsContent value={category} className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading news...</div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No articles available</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 mb-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span className="font-medium">{article.source.name}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(article.publishedAt), "MMM d, yyyy")}
                          </span>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                            Read Full Article
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
