import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export function ContactMessages() {
  const { data: messagesResponse, isLoading } = useQuery<{
    success: boolean;
    data: ContactMessage[];
  }>({
    queryKey: ["/api/contact"],
  });

  const messages = messagesResponse?.data || [];

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <p className="text-muted-foreground">
          View and respond to inquiries from your contact form
        </p>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet. Messages from your contact form will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <CardDescription>{message.email}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {format(new Date(message.createdAt), "MMM d, yyyy")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
