import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type LinkedInActivity = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
};

export function LinkedInActivitySection() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/linkedin/activity"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/linkedin/activity");
      return response.json();
    },
  });

  const posts: LinkedInActivity[] = (data?.data || []).slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3" variant="secondary">
            <Linkedin className="h-4 w-4 mr-2" />
            Recent LinkedIn Activity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Latest Posts & Updates</h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[1, 2].map((i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Card className="p-8 text-center mb-8">
            <p className="text-muted-foreground">No recent LinkedIn activity found.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover-elevate transition-all duration-300 border-2 hover:border-[#0077b5]/30">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">Fasih ur Rehman</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{post.excerpt}</p>
                  <Button variant="ghost" size="sm" className="text-[#0077b5] hover:text-[#006399]" asChild>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      View Post
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button size="lg" className="bg-[#0077b5] hover:bg-[#006399] text-white" asChild>
            <a href="https://ae.linkedin.com/in/fasihurrehman05/recent-activity/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 mr-2" />
              Follow for More Updates
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
