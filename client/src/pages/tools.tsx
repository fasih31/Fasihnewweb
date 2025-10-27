
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Zap,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  component: any;
  gradient: string;
  category: string;
}

const tools: Tool[] = [
  {
    id: "crypto",
    title: "Crypto Market Tracker",
    description: "Real-time cryptocurrency prices and market data with live updates",
    icon: TrendingUp,
    features: ["Live Price Updates", "Market Cap Data", "24h Price Changes", "Multiple Cryptocurrencies"],
    component: CryptoTracker,
    gradient: "from-orange-500 to-pink-500",
    category: "Finance"
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "Convert between 150+ global currencies with real-time exchange rates",
    icon: DollarSign,
    features: ["150+ Currencies", "Real-time Rates", "Instant Conversion", "Historical Data"],
    component: CurrencyConverter,
    gradient: "from-green-500 to-emerald-500",
    category: "Finance"
  },
  {
    id: "converter",
    title: "Unit Converter",
    description: "Convert measurements across length, weight, temperature, and more",
    icon: Ruler,
    features: ["Multiple Units", "Precise Calculations", "Various Categories", "Easy to Use"],
    component: UnitConverter,
    gradient: "from-blue-500 to-cyan-500",
    category: "Utilities"
  },
  {
    id: "seo",
    title: "SEO Analyzer",
    description: "Analyze website SEO performance and get optimization recommendations",
    icon: Zap,
    features: ["SEO Score", "Meta Tag Analysis", "Performance Insights", "Recommendations"],
    component: SEOChecker,
    gradient: "from-purple-500 to-indigo-500",
    category: "Marketing"
  },
  {
    id: "scanner",
    title: "Website Scanner",
    description: "Scan websites for security, performance, and technical SEO issues",
    icon: Search,
    features: ["Security Check", "Performance Audit", "SEO Analysis", "Detailed Reports"],
    component: WebsiteScanner,
    gradient: "from-red-500 to-rose-500",
    category: "Security"
  },
  {
    id: "loan",
    title: "Loan Calculator",
    description: "Calculate loan payments, total interest, and amortization schedules",
    icon: Calculator,
    features: ["Payment Calculation", "Interest Analysis", "Amortization Schedule", "Multiple Scenarios"],
    component: LoanCalculator,
    gradient: "from-yellow-500 to-orange-500",
    category: "Finance"
  },
  {
    id: "ide",
    title: "Code Playground",
    description: "Write, test, and run code in multiple programming languages online",
    icon: Code,
    features: ["Multiple Languages", "Syntax Highlighting", "Live Execution", "Code Sharing"],
    component: CodeIDE,
    gradient: "from-teal-500 to-green-500",
    category: "Development"
  }
];

export default function Tools() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const categories = Array.from(new Set(tools.map(t => t.category)));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Professional Tools & Utilities — Fasih ur Rehman"
        description="Access free interactive professional tools including real-time crypto market tracker, currency converter, unit converter, website scanner, and financial loan calculators. Built with modern web technologies by Fasih ur Rehman."
      />
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="secondary">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              Professional Tools Marketplace
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Free Professional Tools
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Real-time data, accurate calculations, and professional-grade utilities for developers, traders, and businesses.
            </p>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div key={category} className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {tools.filter(tool => tool.category === category).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card 
                      key={tool.id} 
                      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                      onClick={() => setSelectedTool(tool)}
                    >
                      <CardHeader>
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl flex items-center justify-between">
                          {tool.title}
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {tool.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className="w-full mt-4 sm:mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTool(tool);
                          }}
                        >
                          Launch Tool
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Footer Note */}
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

      {/* Tool Dialog */}
      <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
        <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-y-auto p-0">
          {selectedTool && (
            <>
              <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-background z-10">
                <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${selectedTool.gradient} flex items-center justify-center`}>
                    <selectedTool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  {selectedTool.title}
                </DialogTitle>
              </DialogHeader>
              <div className="p-6">
                <selectedTool.component />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
