import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, Eye, TrendingUp } from "lucide-react";

export function DashboardOverview() {
  const { data: articles } = useQuery<{ success: boolean; data: any[] }>({
    queryKey: ["/api/articles?published=false"],
  });

  const { data: messages } = useQuery<{ success: boolean; data: any[] }>({
    queryKey: ["/api/contact"],
  });

  const totalArticles = articles?.data?.length || 0;
  const publishedArticles = articles?.data?.filter((a) => a.published).length || 0;
  const draftArticles = totalArticles - publishedArticles;
  const totalMessages = messages?.data?.length || 0;
  const totalViews = articles?.data?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;

  const stats = [
    {
      title: "Total Articles",
      value: totalArticles,
      description: `${publishedArticles} published, ${draftArticles} drafts`,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Contact Messages",
      value: totalMessages,
      description: "Total inquiries received",
      icon: Mail,
      color: "text-green-500",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      description: "Article page views",
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Engagement",
      value: totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0,
      description: "Average views per article",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Admin Dashboard</CardTitle>
          <CardDescription>
            Manage your portfolio content, view analytics, and respond to inquiries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Quick Actions</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Create and publish blog articles to share your insights</li>
              <li>View and respond to contact form submissions</li>
              <li>Monitor article performance and engagement metrics</li>
              <li>Update your portfolio content and project information</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
