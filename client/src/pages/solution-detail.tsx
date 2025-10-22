import { useParams, useLocation } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo-head";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { solutions } from "@/data/portfolio-data";
import { Briefcase, GraduationCap, ShoppingCart, Database, Coins } from "lucide-react";

const iconMap = {
  "briefcase": Briefcase,
  "graduation-cap": GraduationCap,
  "shopping-cart": ShoppingCart,
  "database": Database,
  "coins": Coins,
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function SolutionDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const solution = solutions.find(s => s.id === id);

  if (!solution) {
    setLocation("/not-found");
    return null;
  }

  const Icon = iconMap[solution.icon as keyof typeof iconMap];

  const seoTitle = `${solution.title} | Fasih ur Rehman`;
  const seoDescription = solution.description;
  const seoKeywords = `${solution.title}, ${solution.id}, Fasih ur Rehman, fintech, edtech, ecommerce, product management`;

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": solution.title,
      "description": solution.description,
      "provider": {
        "@type": "Person",
        "name": "Fasih ur Rehman",
        "jobTitle": "FinTech Product Manager & Islamic Finance Advisor"
      },
      "areaServed": "Worldwide",
      "serviceType": solution.id,
      "offers": solution.offerings.map(offering => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offering
        }
      }))
    };

    let script = document.querySelector('script[type="application/ld+json"][data-solution]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-solution", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-solution]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [solution]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/solutions/${id}`}
      />
      <Navigation />

      <main className="pt-20">
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              onClick={() => {
                setLocation("/");
                setTimeout(() => scrollToSection("solutions"), 300);
              }}
              className="mb-8 hover-elevate"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Solutions
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {solution.id.toUpperCase()}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {solution.title}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>

                <div className="flex gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      setLocation("/");
                      setTimeout(() => scrollToSection("contact"), 300);
                    }}
                    className="gap-2"
                  >
                    Request Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setLocation("/");
                      setTimeout(() => scrollToSection("portfolio"), 300);
                    }}
                  >
                    View Related Projects
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 via-chart-2/10 to-background border-2 border-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="h-48 w-48 text-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Key Offerings
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {solution.offerings.map((offering, index) => (
                <Card
                  key={index}
                  className="hover-elevate transition-all duration-300 border-card-border"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-base text-foreground leading-relaxed">
                      {offering}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can leverage these solutions to achieve your business goals
              and drive measurable results.
            </p>
            <Button
              size="lg"
              onClick={() => {
                setLocation("/");
                setTimeout(() => scrollToSection("contact"), 300);
              }}
              className="gap-2"
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
