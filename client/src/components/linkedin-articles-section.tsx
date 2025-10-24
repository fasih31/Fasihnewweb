
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ExternalLink, Linkedin, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LinkedInArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category?: string;
}

export function LinkedInArticlesSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: articles, isLoading } = useQuery<LinkedInArticle[]>({
    queryKey: ["/api/linkedin-articles"],
    refetchInterval: 3600000, // Refetch every hour
  });

  const filteredArticles = (articles || []).filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="articles"
      className="py-24 md:py-32 bg-background"
      data-testid="section-articles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Linkedin className="h-8 w-8 text-[#0077b5]" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              LinkedIn Articles
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0077b5] to-chart-2 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore my latest thoughts and insights on technology, business, and innovation.
          </p>

          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? "No articles found matching your search." : "No articles available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article, index) => (
              <Card
                key={index}
                className="group hover-elevate transition-all duration-300 hover:shadow-xl cursor-pointer border-card-border"
                onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20">
                        {article.category || "LinkedIn"}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-[#0077b5] transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-[#0077b5] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.description.replace(/<[^>]*>/g, '')}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(article.pubDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5 w-full justify-start px-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(article.link, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Read on LinkedIn →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover-elevate active-elevate-2 border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10"
          >
            <a
              href="https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-5 w-5" />
              View All Articles on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
