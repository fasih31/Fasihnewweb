import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Users, 
  Award,
  Brain,
  CheckCircle2
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function EdTechDomain() {
  const expertise = [
    {
      icon: GraduationCap,
      title: "Learning Management Systems",
      description: "Built comprehensive LMS platforms with course management, assessments, and student tracking.",
    },
    {
      icon: Video,
      title: "Virtual Classrooms",
      description: "Designed interactive video conferencing, live streaming, and collaboration tools for online education.",
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Implemented adaptive learning paths, personalized recommendations, and automated assessments.",
    },
    {
      icon: Award,
      title: "Certification & Compliance",
      description: "Created accreditation systems, certificate generation, and regulatory compliance frameworks.",
    },
  ];

  const achievements = [
    "Launched LMS platform with 50K+ active learners",
    "Built AI-powered adaptive learning system",
    "Achieved 85% course completion rate",
    "Integrated with 15+ educational institutions",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="EdTech Product Manager | Learning Management Systems Expert | Fasih ur Rehman"
        description="Expert EdTech Product Manager specializing in LMS platforms, virtual classrooms, and AI-powered learning solutions. Launched platforms serving 50K+ learners with 85% completion rates."
        keywords="EdTech product manager, learning management system, LMS platform, virtual classroom, e-learning, adaptive learning, AI education, online courses"
        canonicalUrl="https://iamfasih.com/domains/edtech"
        schema={[
          getWebPageSchema(
            "EdTech Solutions by Fasih ur Rehman",
            "Expert EdTech Product Manager specializing in learning platforms and educational technology"
          ),
          getServiceSchema(),
        ]}
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Education Technology</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  EdTech Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Transforming education through innovative learning platforms, virtual classrooms, 
                  and AI-powered solutions. Launched platforms serving 50,000+ active learners with 
                  industry-leading 85% completion rates.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/solutions/lms-platform">
                    <Button size="lg" className="gap-2">
                      <BookOpen className="h-5 w-5" />
                      Explore Solutions
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/#contact">Get Started</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{achievement}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">EdTech Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive educational technology solutions from LMS to AI-powered learning
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary mb-2" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Transform Education with Technology
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's build your next-generation learning platform
              </p>
            </div>
            <LeadCaptureForm domain="edtech" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
