
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, ThumbsUp, MessageSquare, Share2, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RECENT_POSTS = [
  {
    id: 1,
    content: "Excited to share insights on how AI is transforming the Islamic FinTech landscape! 🚀 The integration of machine learning algorithms with Shariah-compliant principles is opening new possibilities for financial inclusion across the MENA region.",
    date: "2024-01-18",
    likes: 247,
    comments: 18,
    shares: 32,
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/",
    tags: ["AI", "Islamic FinTech", "Innovation"]
  },
  {
    id: 2,
    content: "Just completed a major milestone in our e-commerce platform transformation project! 💡 Implementing headless commerce architecture has increased performance by 40% and improved user experience across all touchpoints.",
    date: "2024-01-16",
    likes: 189,
    comments: 12,
    shares: 21,
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/",
    tags: ["E-commerce", "Digital Transformation", "Product Management"]
  },
  {
    id: 3,
    content: "The future of EdTech in the Middle East is incredibly promising! 📚 Personalized learning experiences powered by AI are making quality education more accessible. Proud to be part of this transformation.",
    date: "2024-01-14",
    likes: 312,
    comments: 24,
    shares: 45,
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/",
    tags: ["EdTech", "AI", "Education"]
  },
  {
    id: 4,
    content: "Key learnings from building a Shariah-compliant BNPL solution: compliance doesn't have to compromise user experience. With the right product strategy, you can deliver both ethical finance and seamless digital experiences.",
    date: "2024-01-12",
    likes: 421,
    comments: 35,
    shares: 58,
    url: "https://www.linkedin.com/in/fasihurrehman05/recent-activity/",
    tags: ["BNPL", "Islamic Finance", "Product Strategy"]
  }
];

export function LinkedInActivitySection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3" variant="secondary">
            <Linkedin className="h-4 w-4 mr-2" />
            Recent Activity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Latest Posts & Updates
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Professional insights, project updates, and industry discussions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {RECENT_POSTS.map((post) => (
            <Card key={post.id} className="hover-elevate transition-all duration-300 border-2 hover:border-[#0077b5]/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#0077b5]/10 rounded-full">
                      <Linkedin className="h-4 w-4 text-[#0077b5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Fasih ur Rehman</p>
                      <p className="text-xs text-muted-foreground">Product Manager | FinTech Expert</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 leading-relaxed">
                  {post.content}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      {post.shares}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0077b5] hover:text-[#006399]"
                    asChild
                  >
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      View Post
                      <ExternalLink className="h-3 w-3 ml-1" />
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
            <a href="https://www.linkedin.com/in/fasihurrehman05/recent-activity/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 mr-2" />
              Follow for More Updates
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
