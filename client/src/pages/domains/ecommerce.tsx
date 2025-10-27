import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users, 
  CreditCard,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function EcommerceDomain() {
  const expertise = [
    {
      icon: ShoppingCart,
      title: "Multi-Vendor Marketplaces",
      description: "Built scalable B2B and B2C platforms with vendor management, product catalogs, and order fulfillment.",
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description: "Integrated multiple payment gateways including Islamic finance options, BNPL, and international processors.",
    },
    {
      icon: Package,
      title: "Logistics & Fulfillment",
      description: "Designed inventory management, order tracking, and shipping integration systems.",
    },
    {
      icon: TrendingUp,
      title: "Conversion Optimization",
      description: "Implemented A/B testing, analytics, and personalization to increase conversion rates by 45%.",
    },
  ];

  const achievements = [
    "Launched multi-vendor marketplace with 200+ sellers",
    "Achieved 45% increase in conversion through optimization",
    "Integrated Shariah-compliant payment solutions",
    "Built omnichannel retail platform serving 100K+ customers",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="E-commerce Product Manager | Marketplace & Retail Platforms Expert | Fasih ur Rehman"
        description="Expert E-commerce Product Manager specializing in multi-vendor marketplaces, Shariah-compliant payment solutions, and omnichannel retail platforms. Launched platforms serving 100K+ customers."
        keywords="E-commerce product manager, marketplace development, multi-vendor platform, Shariah compliant e-commerce, BNPL integration, retail platforms, conversion optimization"
        canonicalUrl="https://iamfasih.com/domains/ecommerce"
        schema={[
          getWebPageSchema(
            "E-commerce Solutions by Fasih ur Rehman",
            "Expert E-commerce Product Manager specializing in marketplaces and retail platforms"
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
                <Badge className="mb-4">Marketplace & Retail</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  E-commerce Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Building scalable marketplaces, retail platforms, and payment solutions with a focus on 
                  Shariah-compliant commerce and exceptional user experience. 100,000+ satisfied customers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/solutions/ecommerce-platform">
                    <Button size="lg" className="gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      View Solutions
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/#contact">Schedule Consultation</a>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">E-commerce Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive e-commerce solutions from marketplace platforms to payment processing
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
                Ready to Build Your E-commerce Platform?
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's discuss your marketplace or retail platform needs
              </p>
            </div>
            <LeadCaptureForm domain="ecommerce" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
