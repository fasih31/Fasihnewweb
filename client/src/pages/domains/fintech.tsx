import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  ChartBar, 
  Lock,
  CheckCircle2,
  ArrowRight,
  Calculator
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function FinTechDomain() {
  const expertise = [
    {
      icon: Shield,
      title: "Shariah-Compliant Solutions",
      description: "Expert in Islamic finance products including BNPL, Murabaha, Ijarah, and Takaful systems following AAOIFI standards.",
    },
    {
      icon: TrendingUp,
      title: "Payment & Lending Platforms",
      description: "Designed and launched BNPL platforms, digital lending solutions, and multi-currency payment gateways.",
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description: "Implemented PCI DSS, KYC/AML frameworks, and fraud detection systems for financial applications.",
    },
    {
      icon: ChartBar,
      title: "Analytics & Risk Management",
      description: "Built real-time dashboards, credit scoring models, and risk assessment frameworks for lending platforms.",
    },
  ];

  const achievements = [
    "Launched 3 Islamic FinTech products serving 50K+ users",
    "Reduced transaction processing time by 65% through optimization",
    "Implemented Shariah-compliant BNPL system with 98% approval rate",
    "Built multi-currency payment gateway processing $10M+ annually",
  ];

  const solutions = [
    {
      title: "Islamic Finance Solutions",
      description: "BNPL, Murabaha, Ijarah calculators and platforms",
      link: "/calculators",
      badge: "Popular",
    },
    {
      title: "Payment Gateway Integration",
      description: "Multi-currency, PCI-compliant payment processing",
      link: "/solutions/payment-gateway",
      badge: "Enterprise",
    },
    {
      title: "Digital Lending Platform",
      description: "Automated credit scoring and loan management",
      link: "/solutions/digital-lending",
      badge: "AI-Powered",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FinTech Product Manager | Islamic Finance & Payment Solutions Expert | Fasih ur Rehman"
        description="Expert FinTech Product Manager specializing in Islamic Finance, BNPL, payment gateways, and digital lending. Launched 3 Shariah-compliant products serving 50K+ users."
        keywords="FinTech product manager, Islamic finance expert, BNPL solutions, payment gateway, digital lending, Shariah compliant, Murabaha, Ijarah, Takaful"
        canonicalUrl="https://iamfasih.com/domains/fintech"
        schema={[
          getWebPageSchema(
            "FinTech Solutions by Fasih ur Rehman",
            "Expert FinTech Product Manager specializing in Islamic Finance and payment solutions"
          ),
          getServiceSchema(),
        ]}
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" data-testid="badge-domain">Islamic Finance & Payments</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
                  FinTech Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
                  Transforming financial services with Shariah-compliant solutions, innovative payment systems, 
                  and data-driven lending platforms. Launched 3 Islamic FinTech products serving 50,000+ users.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/calculators">
                    <Button size="lg" className="gap-2" data-testid="button-calculators">
                      <Calculator className="h-5 w-5" />
                      Try Islamic Finance Calculators
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild data-testid="button-contact">
                    <a href="/#contact">Get In Touch</a>
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

        {/* Expertise Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core FinTech Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Deep expertise in Islamic Finance, payment processing, and digital lending solutions
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

        {/* Solutions Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured FinTech Solutions</h2>
              <p className="text-xl text-muted-foreground">
                Ready-to-use solutions and consulting services
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <Link key={index} href={solution.link}>
                  <Card className="h-full hover:border-primary transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{solution.badge}</Badge>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardTitle>{solution.title}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Build Your FinTech Solution
              </h2>
              <p className="text-xl text-muted-foreground">
                Get expert consultation on your Islamic Finance or payment platform project
              </p>
            </div>
            <LeadCaptureForm domain="fintech" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
