
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CryptoTracker } from "@/components/tools/crypto-tracker";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { UnitConverter } from "@/components/tools/unit-converter";
import { WebsiteScanner } from "@/components/tools/website-scanner";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { 
  TrendingUp, 
  DollarSign, 
  Ruler, 
  Search, 
  Calculator,
  Sparkles
} from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Tools & Utilities — Fasih ur Rehman"
        description="Access free interactive tools including crypto market tracker, currency converter, unit converter, website scanner, and financial calculators. Built with modern web technologies."
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Free Interactive Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Tools & Utilities
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore free tools built by Fasih ur Rehman. Real-time data, accurate calculations, and professional-grade utilities.
            </p>
          </div>

          {/* Tools Tabs */}
          <Tabs defaultValue="crypto" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
              <TabsTrigger value="crypto" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Crypto Market</span>
                <span className="sm:hidden">Crypto</span>
              </TabsTrigger>
              <TabsTrigger value="currency" className="gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Currency</span>
                <span className="sm:hidden">Currency</span>
              </TabsTrigger>
              <TabsTrigger value="converter" className="gap-2">
                <Ruler className="h-4 w-4" />
                <span className="hidden sm:inline">Converter</span>
                <span className="sm:hidden">Convert</span>
              </TabsTrigger>
              <TabsTrigger value="scanner" className="gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Website Scanner</span>
                <span className="sm:hidden">Scanner</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Calculators</span>
                <span className="sm:hidden">Calc</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto" className="space-y-4">
              <CryptoTracker />
            </TabsContent>

            <TabsContent value="currency" className="space-y-4">
              <CurrencyConverter />
            </TabsContent>

            <TabsContent value="converter" className="space-y-4">
              <UnitConverter />
            </TabsContent>

            <TabsContent value="scanner" className="space-y-4">
              <WebsiteScanner />
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4">
              <LoanCalculator />
            </TabsContent>
          </Tabs>

          {/* Footer Note */}
          <Card className="mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Built by Fasih ur Rehman
              </CardTitle>
              <CardDescription>
                All tools are free to use and built with modern web technologies. Data updates in real-time where applicable.
                Want a custom tool for your business? <a href="/#contact" className="text-primary hover:underline">Get in touch</a>.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
