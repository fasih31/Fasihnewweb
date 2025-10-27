
import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getBreadcrumbSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Shield,
  Briefcase,
  GraduationCap,
  Cpu,
  Bitcoin,
  Radio
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const blogCategories = [
  { id: "all", name: "All Articles", icon: TrendingUp, color: "bg-blue-500" },
  { id: "islamic-fintech", name: "Islamic FinTech Insights", icon: Shield, color: "bg-green-500" },
  { id: "bnpl", name: "BNPL & Digital Lending", icon: Briefcase, color: "bg-purple-500" },
  { id: "compliance", name: "Shariah Compliance", icon: Shield, color: "bg-emerald-500" },
  { id: "ecommerce", name: "E-commerce Best Practices", icon: TrendingUp, color: "bg-orange-500" },
  { id: "edtech", name: "EdTech Innovation", icon: GraduationCap, color: "bg-cyan-500" },
  { id: "ai", name: "AI in Financial Services", icon: Cpu, color: "bg-pink-500" },
  { id: "crypto", name: "Crypto & Blockchain", icon: Bitcoin, color: "bg-yellow-500" },
  { id: "telecom", name: "5G & Telecom Transformation", icon: Radio, color: "bg-indigo-500" },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/articles");
      return response.json();
    },
  });

  const filteredArticles = useMemo(() => {
    if (!articles) return [];

    let filtered = articles;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article: any) => 
        article.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((article: any) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticles = useMemo(() => {
    return articles?.filter((article: any) => article.featured)?.slice(0, 3) || [];
  }, [articles]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog & Articles | Thought Leadership in FinTech, Islamic Finance & AI | Fasih ur Rehman"
        description="Expert insights on Islamic FinTech, BNPL, Shariah compliance, AI in finance, blockchain, EdTech innovation, and digital transformation. Professional articles and case studies."
        keywords="Islamic FinTech blog, BNPL articles, Shariah compliance insights, AI financial services, blockchain regulation, EdTech innovation, digital banking trends, telecom transformation"
        canonicalUrl="https://iamfasih.com/blog"
        schema={[
          getWebPageSchema("Blog & Articles", "Thought leadership articles on FinTech, Islamic Finance, AI, and digital innovation"),
          getBreadcrumbSchema([
            { name: "Home", url: "https://iamfasih.com" },
            { name: "Blog", url: "https://iamfasih.com/blog" }
          ])
        ]}
      />
      <Navigation />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4">Thought Leadership</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Insights & Articles
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert perspectives on Islamic FinTech, digital transformation, AI, and emerging technologies
              </p>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {blogCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && selectedCategory === "all" && !searchQuery && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((article: any) => (
                  <Link key={article.id} href={`/blog/${article.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {article.image && (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader>
                        <div className="flex gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime || "5"} min
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {selectedCategory === "all" ? "All Articles" : blogCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="h-64 animate-pulse bg-muted" />
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article: any) => (
                  <Link key={article.id} href={`/blog/${article.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {article.image && (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader>
                        <div className="flex gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          {article.tags?.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime || "5"} min read
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to receive the latest insights on Islamic FinTech, AI, and digital innovation
            </p>
            <Button size="lg" asChild>
              <a href="/#newsletter">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
