import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Send, CheckCircle } from "lucide-react";
import { insertCareerInquirySchema, type InsertCareerInquiry } from "@shared/schema";
import { useState } from "react";

export default function Career() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertCareerInquiry>({
    resolver: zodResolver(insertCareerInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "collaboration",
      message: "",
      resumeUrl: "",
      linkedinUrl: "",
      portfolioUrl: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertCareerInquiry) => {
      const response = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your interest. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertCareerInquiry) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Work With Me | Fasih ur Rehman"
        description="Interested in collaboration, freelance work, or consulting? Let's discuss how we can work together on FinTech, EdTech, or Web3 projects."
        keywords="hire fasih ur rehman, fintech consultant, product manager hire, freelance product manager, collaboration opportunities"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Work With Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm open to new opportunities in product management, consulting, and collaboration.
            Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover-elevate">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Full-Time Roles</h3>
              <p className="text-sm text-muted-foreground">
                Product Manager positions in FinTech, EdTech, or AI/AGI
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-elevate">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Freelance Projects</h3>
              <p className="text-sm text-muted-foreground">
                Short-term projects and product consulting
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover-elevate">
            <CardContent className="pt-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Strategic partnerships and co-founding opportunities
              </p>
            </CardContent>
          </Card>
        </div>

        {isSubmitted ? (
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your inquiry has been submitted successfully. I'll review it and get back to you within 24-48 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Submit Another Inquiry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and I'll respond as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fulltime">Full-Time Position</SelectItem>
                              <SelectItem value="freelance">Freelance Project</SelectItem>
                              <SelectItem value="collaboration">Collaboration</SelectItem>
                              <SelectItem value="consulting">Consulting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about the opportunity, project scope, timeline, or how you'd like to collaborate..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="portfolioUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Portfolio URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourcompany.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resumeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume/Job Description URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    size="lg"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
