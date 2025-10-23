
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, Banknote, Home, Car, Shield, HeartHandshake,
  ArrowRight, CheckCircle2, ChevronRight, Calculator
} from "lucide-react";
import { islamicFinTechProducts, type IslamicProduct } from "@/data/islamic-fintech-products";
import { useLocation } from "wouter";
import { BNPLCalculator } from "@/components/islamic-tools/bnpl-calculator";
import { HomeFinanceCalculator } from "@/components/islamic-tools/home-finance-calculator";

const iconMap = {
  "shopping-bag": ShoppingBag,
  "banknote": Banknote,
  "home": Home,
  "car": Car,
  "shield": Shield,
  "heart-handshake": HeartHandshake,
};

export default function IslamicFinTech() {
  const [selectedProduct, setSelectedProduct] = useState<IslamicProduct | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();

  const startJourney = (product: IslamicProduct) => {
    setSelectedProduct(product);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (selectedProduct && currentStep < selectedProduct.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetJourney = () => {
    setSelectedProduct(null);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Islamic FinTech Products | Shariah-Compliant Financial Solutions"
        description="Explore our range of Shariah-compliant financial products including BNPL, home finance, car finance, Takaful insurance, and more."
        keywords="Islamic finance, Shariah compliant, Halal banking, Murabaha, Ijarah, BNPL, Takaful"
      />
      <Navigation />

      <main className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        {!selectedProduct ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <Badge variant="secondary" className="mb-4">Islamic FinTech Solutions</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Shariah-Compliant<br className="hidden sm:block" /> Financial Products
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive suite of Islamic financial solutions designed with transparency, ethics, and Shariah compliance at their core.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {islamicFinTechProducts.map((product) => {
                const Icon = iconMap[product.icon as keyof typeof iconMap];
                return (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                    onClick={() => startJourney(product)}
                  >
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">{product.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed">{product.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <Badge variant="outline" className="mb-4 text-xs sm:text-sm">{product.contractType}</Badge>
                      <Button className="w-full gap-2 group-hover:gap-3 transition-all text-sm sm:text-base">
                        Start Journey
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Journey Header */}
            <div className="mb-8 sm:mb-12">
              <Button variant="ghost" onClick={resetJourney} className="mb-4 sm:mb-6 text-sm sm:text-base">
                ← Back to Products
              </Button>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${selectedProduct.color} flex items-center justify-center flex-shrink-0`}>
                  {(() => {
                    const Icon = iconMap[selectedProduct.icon as keyof typeof iconMap];
                    return <Icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />;
                  })()}
                </div>
                <div className="flex-1 w-full">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">{selectedProduct.title}</h1>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                {selectedProduct.steps.map((step, index) => (
                  <div key={index} className="flex items-center flex-shrink-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        index === currentStep
                          ? "bg-primary text-primary-foreground scale-110"
                          : index < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index < currentStep ? <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" /> : index + 1}
                    </div>
                    {index < selectedProduct.steps.length - 1 && (
                      <div
                        className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 rounded transition-all ${
                          index < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Step {currentStep + 1} of {selectedProduct.steps.length}
              </p>
            </div>

            {/* Current Step Content */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                  {selectedProduct.steps[currentStep].title}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  {selectedProduct.steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedProduct.steps[currentStep].actions && (
                  <div className="space-y-3 sm:space-y-4">
                    {selectedProduct.steps[currentStep].actions!.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg">
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm sm:text-base">{action}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex-1 sm:flex-none sm:w-auto"
              >
                ← Previous Step
              </Button>
              {currentStep < selectedProduct.steps.length - 1 ? (
                <Button onClick={nextStep} className="flex-1 sm:flex-none sm:w-auto gap-2">
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setLocation("/#contact");
                    resetJourney();
                  }}
                  className="flex-1 sm:flex-none sm:w-auto gap-2"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Interactive Calculator */}
            {(selectedProduct.id === "bnpl" || selectedProduct.id === "home-finance") && (
              <div className="mt-12">
                <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <CardTitle>Interactive Calculator</CardTitle>
                    </div>
                    <CardDescription>
                      Try out the calculator to see how {selectedProduct.title} works
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedProduct.id === "bnpl" && <BNPLCalculator />}
                    {selectedProduct.id === "home-finance" && <HomeFinanceCalculator />}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Product Info Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">Key Features</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedProduct.features.map((feature, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 sm:p-6 flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm sm:text-base">{feature}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="benefits" className="mt-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedProduct.benefits.map((benefit, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 sm:p-6 flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm sm:text-base">{benefit}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
