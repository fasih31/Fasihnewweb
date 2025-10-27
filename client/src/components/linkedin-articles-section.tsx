import { Linkedin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function LinkedInArticlesSection() {
  return (
    <section id="linkedin-articles" className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge className="mb-3" variant="secondary">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn Content
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Published Articles & Insights
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge on product management, fintech, and technology
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