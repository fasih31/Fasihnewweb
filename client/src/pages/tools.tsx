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
  Sparkles,
  BookOpen,
  Moon
} from "lucide-react";

export default function Tools() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Tools & Utilities — Fasih ur Rehman"
        description="Access free interactive tools including crypto market tracker, currency converter, unit converter, website scanner, financial calculators, and Islamic tools for Qur'an and Hadith. Built with modern web technologies."
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 px-4">
            <Badge className="mb-4 text-xs sm:text-sm" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Free Tools
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Professional Tools & Utilities
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real-time data, accurate calculations, and professional-grade utilities.
            </p>
          </div>

          {/* Tools Tabs */}
          <Tabs defaultValue="crypto" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto gap-2">
              <TabsTrigger value="crypto" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Crypto</span>
              </TabsTrigger>
              <TabsTrigger value="currency" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Currency</span>
              </TabsTrigger>
              <TabsTrigger value="converter" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Ruler className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Units</span>
              </TabsTrigger>
              <TabsTrigger value="scanner" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Scanner</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Loan Calc</span>
              </TabsTrigger>
              <TabsTrigger value="quran" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Qur'an</span>
              </TabsTrigger>
              <TabsTrigger value="hadith" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Hadith</span>
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Daily</span>
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

            {/* Placeholder for Islamic Tools Tabs */}
            <TabsContent value="quran" className="space-y-4">
              {/* Quran Tool Component would go here */}
              <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                <p className="text-muted-foreground">Qur'an Tool coming soon!</p>
              </div>
            </TabsContent>

            <TabsContent value="hadith" className="space-y-4">
              {/* Hadith Tool Component would go here */}
              <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                <p className="text-muted-foreground">Hadith Tool coming soon!</p>
              </div>
            </TabsContent>

            <TabsContent value="daily" className="space-y-4">
              {/* Daily Ayah/Hadith Component would go here */}
              <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
                <p className="text-muted-foreground">Daily Islamic Content coming soon!</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Note */}
          <Card className="mt-8 sm:mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                Built by Fasih ur Rehman
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                All tools are free and built with modern web technologies. Want a custom tool? <a href="/#contact" className="text-primary hover:underline font-medium">Get in touch</a>.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}