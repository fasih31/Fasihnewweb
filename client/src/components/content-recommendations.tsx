
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

interface RecommendedContent {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  relevanceScore: number;
}

interface ContentRecommendationsProps {
  currentArticleId?: string;
  userInterests?: string[];
}

export function ContentRecommendations({ currentArticleId, userInterests }: ContentRecommendationsProps) {
  const { data: recommendations } = useQuery<RecommendedContent[]>({
    queryKey: ["/api/articles/recommendations", currentArticleId],
    queryFn: async () => {
      const response = await fetch(`/api/articles/recommendations?current=${currentArticleId || ''}`);
      return response.json();
    },
  });

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Recommended for You</CardTitle>
        </div>
        <CardDescription>
          Based on your interests and reading history
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.slice(0, 3).map((article) => (
          <Link key={article.id} href={`/blog/${article.id}`}>
            <div className="group p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} min read
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
