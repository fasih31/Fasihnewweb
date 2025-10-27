
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2, ExternalLink, Linkedin } from "lucide-react";

export function LinkedInActivitySection() {
  const { data: response, isLoading } = useQuery<{ success: boolean; data: any[] }>({
    queryKey: ["/api/linkedin-activity"],
  });

  const activities = Array.isArray(response?.data) ? response.data : [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Activity</h2>
            <p className="text-xl text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (activities.length === 0) {
    return null;
  }

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={activity.type === "article" ? "default" : "secondary"}>
                    {activity.type === "article" ? "Article" : "Post"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {activity.title && (
                  <CardTitle className="text-lg line-clamp-2">{activity.title}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {activity.excerpt || activity.content}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{activity.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{activity.comments}</span>
                  </div>
                  {activity.shares && (
                    <div className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>{activity.shares}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = activity.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on LinkedIn
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover-elevate border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5]/10"
            onClick={() => {
              const link = document.createElement('a');
              link.href = 'https://www.linkedin.com/in/fasihurrehman05/recent-activity/';
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Linkedin className="h-5 w-5 mr-2" />
            View All Activity
          </Button>
        </div>
      </div>
    </section>
  );
}
