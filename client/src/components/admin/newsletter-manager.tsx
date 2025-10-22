import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Users } from "lucide-react";
import { type NewsletterSubscriber } from "@shared/schema";
import { format } from "date-fns";

export function NewsletterManager() {
  const { data: response } = useQuery<{ success: boolean; data: NewsletterSubscriber[] }>({
    queryKey: ["/api/newsletter"],
  });

  const subscribers = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active newsletter subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter(s => {
                const subDate = new Date(s.subscribedAt);
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return subDate > monthAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              New subscribers this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>Newsletter subscriber list</CardDescription>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No subscribers yet.
            </div>
          ) : (
            <div className="space-y-4">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{subscriber.email}</div>
                    {subscriber.name && (
                      <div className="text-sm text-muted-foreground">{subscriber.name}</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      Subscribed: {format(new Date(subscriber.subscribedAt), "MMM d, yyyy")}
                    </div>
                  </div>
                  <Badge variant={subscriber.subscribed ? "default" : "secondary"}>
                    {subscriber.subscribed ? "Active" : "Unsubscribed"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
