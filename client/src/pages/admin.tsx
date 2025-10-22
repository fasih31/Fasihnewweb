import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, FileText, Mail, Newspaper, TrendingUp, Star, Briefcase } from "lucide-react";
import { ArticleManager } from "@/components/admin/article-manager";
import { ContactMessages } from "@/components/admin/contact-messages";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { TestimonialManager } from "@/components/admin/testimonial-manager";
import { NewsletterManager } from "@/components/admin/newsletter-manager";
import { CareerInquiries } from "@/components/admin/career-inquiries";

export default function AdminDashboard() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      setLocation("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio content and settings</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-4xl">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="gap-2">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Newsletter</span>
            </TabsTrigger>
            <TabsTrigger value="career" className="gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Career</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="articles">
            <ArticleManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterManager />
          </TabsContent>

          <TabsContent value="career">
            <CareerInquiries />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
