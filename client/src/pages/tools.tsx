
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
import { SEOChecker } from "@/components/tools/seo-checker";
import { CodeIDE } from "@/components/tools/code-ide";
import {
  TrendingUp,
  DollarSign,
  Ruler,
  Search,
  Calculator,
  Sparkles,
  Code,
  Zap
} from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Professional Tools & Utilities — Fasih ur Rehman"
        description="Access free interactive professional tools including real-time crypto market tracker, currency converter, unit converter, website scanner, and financial loan calculators. Built with modern web technologies by Fasih ur Rehman."
      />
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="secondary">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              Professional Tools Suite
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Free Professional Tools
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Real-time data, accurate calculations, and professional-grade utilities for developers, traders, and businesses.
            </p>
          </div>

          {/* Tools Tabs with Improved Layout */}
          <Tabs defaultValue="crypto" className="space-y-6 sm:space-y-8">
            <div className="sticky top-16 sm:top-20 z-10 bg-background/95 backdrop-blur-sm py-3 sm:py-4 -mx-4 px-4 sm:mx-0 sm:px-0 border-b sm:border-none">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-7 h-auto gap-1 sm:gap-2 p-1 bg-muted">
                  <TabsTrigger 
                    value="crypto" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Crypto Tracker</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="currency" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Currency</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="converter" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Units</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="seo" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>SEO</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="scanner" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Scanner</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calculator" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Loan Calc</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ide" 
                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Code IDE</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="crypto" className="space-y-4 mt-0">
              <CryptoTracker />
            </TabsContent>

            <TabsContent value="currency" className="space-y-4 mt-0">
              <CurrencyConverter />
            </TabsContent>

            <TabsContent value="converter" className="space-y-4 mt-0">
              <UnitConverter />
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-0">
              <SEOChecker />
            </TabsContent>

            <TabsContent value="scanner" className="space-y-4 mt-0">
              <WebsiteScanner />
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4 mt-0">
              <LoanCalculator />
            </TabsContent>

            <TabsContent value="ide" className="space-y-4 mt-0">
              <CodeIDE />
            </TabsContent>
          </Tabs>

          {/* Enhanced Footer Note */}
          <Card className="mt-8 sm:mt-12 bg-gradient-to-br from-primary/5 via-chart-2/5 to-chart-3/5 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Built with Excellence by Fasih ur Rehman
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                All tools are free, open-source, and built with cutting-edge web technologies. 
                Need a custom tool for your business? 
                <a href="/#contact" className="text-primary hover:underline font-semibold ml-1">
                  Let's build it together →
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Real-time Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">No Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Fast & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Mobile Optimized</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
