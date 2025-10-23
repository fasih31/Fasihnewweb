import { useState } from "react";
import { Calendar, Clock, Search } from "lucide-react";
import { blogPosts } from "@/data/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export function BlogSection() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map(a => a.category)))];

  return (
    <section
      id="blog"
      className="py-24 md:py-32 bg-background"
      data-testid="section-blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Insights & Articles
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto mb-8"></div>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto space-y-4">
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

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPosts.map((post) => {
            const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
              <Card
                key={post.id}
                className="group hover-elevate transition-all duration-300 hover:shadow-xl cursor-pointer border-card-border"
                data-testid={`blog-card-${post.id}`}
                onClick={() => setLocation(`/blog/${slug}`)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" data-testid={`blog-category-${post.id}`}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary w-full justify-start px-0"
                    data-testid={`button-read-${post.id}`}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}