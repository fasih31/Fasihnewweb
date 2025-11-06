
import { Linkedin, ExternalLink, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FEATURED_ARTICLES = [
  {
    id: 1,
    title: "Transforming Islamic Finance with AI & Machine Learning",
    excerpt: "Exploring how artificial intelligence is revolutionizing Shariah-compliant banking and financial services across the Middle East.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Islamic FinTech",
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/",
    tags: ["AI", "Islamic Finance", "FinTech"]
  },
  {
    id: 2,
    title: "Building Scalable E-commerce Solutions for MENA Region",
    excerpt: "Best practices and strategies for creating robust e-commerce platforms that cater to the unique needs of Middle Eastern markets.",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "E-commerce",
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/",
    tags: ["E-commerce", "MENA", "Digital Transformation"]
  },
  {
    id: 3,
    title: "The Future of Buy Now Pay Later in Islamic Banking",
    excerpt: "How BNPL solutions are being adapted to comply with Shariah principles while meeting modern consumer demands.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "BNPL",
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/",
    tags: ["BNPL", "Islamic Banking", "Payment Solutions"]
  }
];

export function LinkedInArticlesSection() {
  return (
    <section id="linkedin-articles" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3" variant="secondary">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn Articles
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Published Insights & Thought Leadership
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            In-depth articles on FinTech, Islamic Finance, Product Management, and Digital Transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {FEATURED_ARTICLES.map((article) => (
            <Card key={article.id} className="hover-elevate transition-all duration-300 border-2 hover:border-[#0077b5]/30 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10"
                    asChild
                  >
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read on LinkedIn
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#0077b5] hover:bg-[#006399] text-white"
            asChild
          >
            <a href="https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 mr-2" />
              View All Articles on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
