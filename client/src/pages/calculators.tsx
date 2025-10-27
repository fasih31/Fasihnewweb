import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema } from "@/components/seo-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BNPLCalculator } from "@/components/calculators/bnpl-calculator";
import { MurabahaCalculator } from "@/components/calculators/murabaha-calculator";
import { IjarahCalculator } from "@/components/calculators/ijarah-calculator";
import { ROICalculator } from "@/components/calculators/roi-calculator";
import { TakafulCalculator } from "@/components/calculators/takaful-calculator";
import { ProfitSharingCalculator } from "@/components/calculators/profit-sharing-calculator";
import { Calculator, TrendingUp, Home, Car, Shield, Users } from "lucide-react";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("bnpl");

  const calculators = [
    {
      id: "bnpl",
      title: "BNPL Calculator",
      description: "Calculate Buy Now Pay Later installments and payment schedules",
      icon: Calculator,
      component: BNPLCalculator,
    },
    {
      id: "murabaha",
      title: "Murabaha Calculator",
      description: "Calculate Islamic Murabaha financing with profit calculations",
      icon: TrendingUp,
      component: MurabahaCalculator,
    },
    {
      id: "ijarah",
      title: "Ijarah Calculator",
      description: "Calculate Islamic lease payments and total costs",
      icon: Home,
      component: IjarahCalculator,
    },
    {
      id: "roi",
      title: "ROI Calculator",
      description: "Calculate Return on Investment for your projects",
      icon: TrendingUp,
      component: ROICalculator,
    },
    {
      id: "takaful",
      title: "Takaful Calculator",
      description: "Calculate Islamic insurance contributions and coverage",
      icon: Shield,
      component: TakafulCalculator,
    },
    {
      id: "profit-sharing",
      title: "Profit Sharing Calculator",
      description: "Calculate profit distribution in Musharakah partnerships",
      icon: Users,
      component: ProfitSharingCalculator,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Islamic Finance Calculators | BNPL, Murabaha, Ijarah, Takaful | Fasih ur Rehman"
        description="Free Shariah-compliant financial calculators for BNPL, Murabaha, Ijarah leasing, ROI, Takaful insurance, and profit sharing. Calculate Islamic finance solutions instantly."
        keywords="Islamic finance calculator, BNPL calculator, Murabaha calculator, Ijarah calculator, Takaful calculator, Islamic ROI, profit sharing calculator, Shariah compliant finance, halal finance tools"
        canonicalUrl="https://iamfasih.com/calculators"
        schema={[
          getWebPageSchema(
            "Islamic Finance Calculators",
            "Comprehensive suite of Shariah-compliant financial calculators including BNPL, Murabaha, Ijarah, Takaful, and more"
          ),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Islamic Finance Calculator Suite",
            applicationCategory: "FinanceApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description: "Free Shariah-compliant financial calculators",
          },
        ]}
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-calculators-title">
              Islamic Finance Calculators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-calculators-description">
              Professional Shariah-compliant financial calculators for BNPL, Murabaha, Ijarah, Takaful, and more.
              Calculate your Islamic finance solutions instantly.
            </p>
          </div>

          {/* Calculator Grid - Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-4 mb-8">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <button
                  key={calc.id}
                  onClick={() => setActiveTab(calc.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    activeTab === calc.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                  data-testid={`button-calculator-${calc.id}`}
                >
                  <Icon className="h-6 w-6 mb-2 mx-auto text-primary" />
                  <p className="text-sm font-medium text-center">{calc.title}</p>
                </button>
              );
            })}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden lg:grid w-full grid-cols-6 mb-8">
              {calculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <TabsTrigger
                    key={calc.id}
                    value={calc.id}
                    className="flex items-center gap-2"
                    data-testid={`tab-${calc.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{calc.title}</span>
                    <span className="xl:hidden">{calc.id.toUpperCase()}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {calculators.map((calc) => {
              const Component = calc.component;
              return (
                <TabsContent key={calc.id} value={calc.id} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <calc.icon className="h-6 w-6 text-primary" />
                        {calc.title}
                      </CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Component />
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shariah Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All calculations follow Islamic finance principles and AAOIFI standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get real-time calculations with detailed breakdowns and payment schedules.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Save & Share</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Save your calculations and share results with your email for future reference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
