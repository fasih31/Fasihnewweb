
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Wifi, 
  Radio, 
  Smartphone, 
  Cloud, 
  Network,
  Signal,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function TelecomDomain() {
  const expertise = [
    {
      icon: Wifi,
      title: "5G & Network Solutions",
      description: "Designed and deployed 5G infrastructure, network optimization, and IoT connectivity platforms.",
    },
    {
      icon: Cloud,
      title: "Cloud Communications",
      description: "Built VoIP systems, unified communications platforms, and cloud telephony solutions.",
    },
    {
      icon: Smartphone,
      title: "Mobile Network Services",
      description: "Developed mobile network management, subscriber services, and digital transformation initiatives.",
    },
    {
      icon: Network,
      title: "DaaS & Infrastructure",
      description: "Implemented Device as a Service platforms, network infrastructure management, and enterprise solutions.",
    },
  ];

  const achievements = [
    "Deployed 5G network solutions for enterprise clients",
    "Built VoIP platform serving 10K+ concurrent users",
    "Managed telecom infrastructure projects worth $5M+",
    "Implemented IoT connectivity solutions for smart cities",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Telecom Product Manager | 5G, VoIP & Network Solutions Expert | Fasih ur Rehman"
        description="Expert Telecom Product Manager specializing in 5G networks, VoIP systems, cloud communications, and DaaS platforms. Delivered infrastructure projects serving 10K+ users."
        keywords="Telecom product manager, 5G network solutions, VoIP platform, cloud communications, DaaS, IoT connectivity, network infrastructure, unified communications"
        canonicalUrl="https://iamfasih.com/domains/telecom"
        schema={[
          getWebPageSchema(
            "Telecom Solutions by Fasih ur Rehman",
            "Expert Telecom Product Manager specializing in 5G networks and communications platforms"
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
                <Badge className="mb-4">Telecommunications & Infrastructure</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Telecom Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Driving digital transformation in telecommunications through 5G networks, cloud 
                  communications, and innovative DaaS solutions. Delivered enterprise-grade infrastructure 
                  serving thousands of users.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/solutions/telecom-platform">
                    <Button size="lg" className="gap-2">
                      <Signal className="h-5 w-5" />
                      Explore Solutions
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/#contact">Get Consultation</a>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Telecom Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive telecommunications solutions from network infrastructure to cloud services
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
                Build Your Telecom Infrastructure
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's discuss your network and communications platform needs
              </p>
            </div>
            <LeadCaptureForm domain="telecom" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
