import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, ExternalLink, Activity } from "lucide-react"; // Assuming Activity is a valid icon and imported correctly
import { Badge } from "@/components/ui/badge"; // Assuming Badge is imported correctly

export function LinkedInActivitySection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge className="mb-3" variant="secondary">
            <Activity className="h-4 w-4 mr-2" />
            Recent Activity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            LinkedIn Engagement
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Latest professional interactions and discussions
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
              Follow My Journey on LinkedIn
            </h3>

            <p className="text-muted-foreground">
              Stay updated with my latest posts, insights, and professional milestones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-[#0077b5] hover:bg-[#006399] text-white hover-elevate active-elevate-2"
                asChild
              >
                <a href="https://www.linkedin.com/in/fasihurrehman05/recent-activity/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  View Recent Activity
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
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}