import { Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LinkedInArticlesSection() {
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
        </div>

        <Card className="max-w-2xl mx-auto hover-elevate transition-all duration-300 border-2 hover:border-[#0077b5]/50">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-[#0077b5]/10 rounded-full">
                <Linkedin className="h-16 w-16 text-[#0077b5]" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground">
              Visit My LinkedIn Profile
            </h3>

            <p className="text-muted-foreground">
              Read my latest articles, posts, and professional updates directly on LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-[#0077b5] hover:bg-[#006399] text-white hover-elevate active-elevate-2"
                asChild
              >
                <a href="https://www.linkedin.com/in/fasihurrehman05/recent-activity/articles/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  View Articles on LinkedIn
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10"
                asChild
              >
                <a href="https://www.linkedin.com/in/fasihurrehman05/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View Full Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}