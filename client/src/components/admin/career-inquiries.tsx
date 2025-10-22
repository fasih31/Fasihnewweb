import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink } from "lucide-react";
import { type CareerInquiry } from "@shared/schema";
import { format } from "date-fns";

export function CareerInquiries() {
  const { data: response } = useQuery<{ success: boolean; data: CareerInquiry[] }>({
    queryKey: ["/api/career"],
  });

  const inquiries = response?.data || [];

  const getInquiryTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      fulltime: "default",
      freelance: "secondary",
      collaboration: "outline",
      consulting: "outline",
      other: "secondary",
    };
    return variants[type] || "secondary";
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries.length}</div>
            <p className="text-xs text-muted-foreground">
              Career inquiries received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries.filter(i => {
                const inquiryDate = new Date(i.createdAt);
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                return inquiryDate > monthAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              New inquiries this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Full-Time</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inquiries.filter(i => i.inquiryType === "fulltime").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Full-time opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Career Inquiries</CardTitle>
          <CardDescription>Collaboration and employment opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No career inquiries yet.
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-lg">{inquiry.name}</div>
                          <div className="text-sm text-muted-foreground">{inquiry.email}</div>
                          {inquiry.phone && (
                            <div className="text-sm text-muted-foreground">{inquiry.phone}</div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={getInquiryTypeBadge(inquiry.inquiryType)}>
                            {inquiry.inquiryType}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(inquiry.createdAt), "MMM d, yyyy")}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-1">Message:</div>
                        <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                      </div>

                      {(inquiry.linkedinUrl || inquiry.portfolioUrl || inquiry.resumeUrl) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                          {inquiry.linkedinUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a href={inquiry.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a>
                            </Button>
                          )}
                          {inquiry.portfolioUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a href={inquiry.portfolioUrl} target="_blank" rel="noopener noreferrer">
                                Portfolio
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a>
                            </Button>
                          )}
                          {inquiry.resumeUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a href={inquiry.resumeUrl} target="_blank" rel="noopener noreferrer">
                                Resume
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
