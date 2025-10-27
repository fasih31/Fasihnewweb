import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, ExternalLink } from "lucide-react";

export function LinkedInActivitySection() {
  const openLinkedInActivity = () => {
    const link = document.createElement('a');
    link.href = 'https://www.linkedin.com/in/fasihurrehman05/recent-activity/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Linkedin className="h-8 w-8 text-[#0077b5]" />
            <h2 className="text-3xl md:text-4xl font-bold">Recent Activity</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Latest posts, articles, and professional updates
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
                onClick={openLinkedInActivity}
              >
                <Linkedin className="h-5 w-5 mr-2" />
                View Recent Activity
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'https://www.linkedin.com/in/fasihurrehman05/';
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Connect on LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}