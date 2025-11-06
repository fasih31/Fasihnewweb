
import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CryptoTracker } from "@/components/tools/crypto-tracker";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { UnitConverter } from "@/components/tools/unit-converter";
import { WebsiteScanner } from "@/components/tools/website-scanner";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import { SEOChecker } from "@/components/tools/seo-checker";
import { CodeIDE } from "@/components/tools/code-ide";
import { AudioVideoConverter } from "@/components/tools/audio-video-converter";
import { QRGenerator } from "@/components/tools/qr-generator";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { JSONFormatter } from "@/components/tools/json-formatter";
import { Base64Converter } from "@/components/tools/base64-converter";
import { HashGenerator } from "@/components/tools/hash-generator";
import { ImageCompressor } from "@/components/tools/image-compressor";
import { URLShortener } from "@/components/tools/url-shortener";
import { MarkdownConverter } from "@/components/tools/markdown-converter";
import { ColorPaletteGenerator } from "@/components/tools/color-palette";
import { LoremIpsumGenerator } from "@/components/tools/lorem-ipsum";
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
  CheckCircle2,
  Music,
  Video,
  QrCode,
  Key,
  FileJson,
  Binary,
  Hash,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Image,
  Link,
  FileCode,
  Palette,
  FileText
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  component?: any;
  gradient: string;
  category: string;
  openAsPage?: boolean;
  pagePath?: string;
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
    category: "Finance",
    openAsPage: false
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "Convert between 150+ global currencies with real-time exchange rates",
    icon: DollarSign,
    features: ["150+ Currencies", "Real-time Rates", "Instant Conversion", "Historical Data"],
    component: CurrencyConverter,
    gradient: "from-green-500 to-emerald-500",
    category: "Finance",
    openAsPage: false
  },
  {
    id: "converter",
    title: "Unit Converter",
    description: "Convert measurements across length, weight, temperature, and more",
    icon: Ruler,
    features: ["Multiple Units", "Precise Calculations", "Various Categories", "Easy to Use"],
    component: UnitConverter,
    gradient: "from-blue-500 to-cyan-500",
    category: "Utilities",
    openAsPage: false
  },
  {
    id: "seo",
    title: "SEO Analyzer",
    description: "Analyze website SEO performance and get optimization recommendations",
    icon: Zap,
    features: ["SEO Score", "Meta Tag Analysis", "Performance Insights", "Recommendations"],
    gradient: "from-purple-500 to-indigo-500",
    category: "Marketing",
    openAsPage: true,
    pagePath: "/tools/seo-analyzer"
  },
  {
    id: "scanner",
    title: "Website Scanner",
    description: "Scan websites for security, performance, and technical SEO issues",
    icon: Search,
    features: ["Security Check", "Performance Audit", "SEO Analysis", "Detailed Reports"],
    gradient: "from-red-500 to-rose-500",
    category: "Security",
    openAsPage: true,
    pagePath: "/tools/website-scanner"
  },
  {
    id: "loan",
    title: "Loan Calculator",
    description: "Calculate loan payments, total interest, and amortization schedules",
    icon: Calculator,
    features: ["Payment Calculation", "Interest Analysis", "Amortization Schedule", "Multiple Scenarios"],
    component: LoanCalculator,
    gradient: "from-yellow-500 to-orange-500",
    category: "Finance",
    openAsPage: false
  },
  {
    id: "ide",
    title: "Code Playground",
    description: "Write, test, and run code in multiple programming languages online",
    icon: Code,
    features: ["Multiple Languages", "Syntax Highlighting", "Live Execution", "Code Sharing"],
    gradient: "from-teal-500 to-green-500",
    category: "Development",
    openAsPage: true,
    pagePath: "/tools/code-playground"
  },
  {
    id: "audio-video",
    title: "Audio/Video Converter",
    description: "Convert audio and video files to different formats easily",
    icon: Video,
    features: ["Multiple Formats", "Fast Conversion", "Audio & Video", "Easy Download"],
    component: AudioVideoConverter,
    gradient: "from-pink-500 to-purple-500",
    category: "Utilities",
    openAsPage: false
  },
  {
    id: "qr-code",
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, and contact information",
    icon: QrCode,
    features: ["Custom Size", "Error Correction", "Instant Generation", "Download PNG"],
    component: QRGenerator,
    gradient: "from-violet-500 to-purple-500",
    category: "Utilities",
    openAsPage: false
  },
  {
    id: "password",
    title: "Password Generator",
    description: "Generate strong, secure passwords with customizable complexity",
    icon: Key,
    features: ["Customizable Length", "Multiple Options", "Strength Meter", "Copy to Clipboard"],
    component: PasswordGenerator,
    gradient: "from-amber-500 to-orange-500",
    category: "Security",
    openAsPage: false
  },
  {
    id: "json",
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data with syntax highlighting",
    icon: FileJson,
    features: ["Format JSON", "Minify JSON", "Validate Syntax", "Copy Output"],
    component: JSONFormatter,
    gradient: "from-lime-500 to-green-500",
    category: "Development",
    openAsPage: false
  },
  {
    id: "base64",
    title: "Base64 Converter",
    description: "Encode and decode text to/from Base64 format",
    icon: Binary,
    features: ["Encode Text", "Decode Base64", "Instant Conversion", "Copy Results"],
    component: Base64Converter,
    gradient: "from-sky-500 to-blue-500",
    category: "Development",
    openAsPage: false
  },
  {
    id: "hash",
    title: "Hash Generator",
    description: "Generate MD5, SHA-256, and other cryptographic hashes",
    icon: Hash,
    features: ["MD5 Hash", "SHA-256 Hash", "Multiple Algorithms", "Copy Hashes"],
    component: HashGenerator,
    gradient: "from-rose-500 to-red-500",
    category: "Security",
    openAsPage: false
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress images to reduce file size while maintaining quality",
    icon: Image,
    features: ["Quality Control", "Before/After Preview", "Instant Download", "Multiple Formats"],
    component: ImageCompressor,
    gradient: "from-indigo-500 to-purple-500",
    category: "Utilities",
    openAsPage: false
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Create short, memorable links for easy sharing",
    icon: Link,
    features: ["Custom Aliases", "Link Analytics", "QR Codes", "Instant Shortening"],
    component: URLShortener,
    gradient: "from-cyan-500 to-blue-500",
    category: "Marketing",
    openAsPage: false
  },
  {
    id: "markdown-converter",
    title: "Markdown to HTML",
    description: "Convert Markdown to HTML with live preview",
    icon: FileCode,
    features: ["Live Preview", "Syntax Highlighting", "Export HTML", "Copy to Clipboard"],
    component: MarkdownConverter,
    gradient: "from-emerald-500 to-teal-500",
    category: "Development",
    openAsPage: false
  },
  {
    id: "color-palette",
    title: "Color Palette Generator",
    description: "Generate beautiful color palettes for your designs",
    icon: Palette,
    features: ["Random Generation", "Lock Colors", "Export CSS", "RGB & HEX"],
    component: ColorPaletteGenerator,
    gradient: "from-fuchsia-500 to-pink-500",
    category: "Design",
    openAsPage: false
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups",
    icon: FileText,
    features: ["Paragraphs Mode", "Sentences Mode", "Words Mode", "Copy to Clipboard"],
    component: LoremIpsumGenerator,
    gradient: "from-amber-500 to-yellow-500",
    category: "Design",
    openAsPage: false
  }
];

export default function Tools() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 9;

  const categories = Array.from(new Set(tools.map(t => t.category)));

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * toolsPerPage;
    return filteredTools.slice(startIndex, startIndex + toolsPerPage);
  }, [filteredTools, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Free Online Tools: QR Code, Password Generator, SEO Analyzer, Currency Converter & More"
        description="Access 13+ free professional online tools including QR code generator, password generator, SEO analyzer, website scanner, JSON formatter, Base64 converter, hash generator, crypto tracker, currency converter, loan calculator, and code playground. Built by Fasih ur Rehman - FinTech Advisor & Product Manager."
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

          {/* Search and Filter */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    data-testid="input-search-tools"
                    placeholder="Search tools by name, description, or features..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <Button
                      data-testid="button-clear-search"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => handleSearchChange("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger data-testid="select-category-filter" className="w-full sm:w-[200px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span data-testid="text-tool-count">
                  Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
                  {(searchQuery || selectedCategory !== "all") && ` (filtered)`}
                </span>
                {totalPages > 1 && (
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tools Grid */}
          {filteredTools.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <Search className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">No tools found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
                <Button
                  data-testid="button-reset-filters"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card 
                      key={tool.id} 
                      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                      onClick={() => {
                        if (!tool.openAsPage) {
                          setSelectedTool(tool);
                        }
                      }}
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
                            if (tool.openAsPage && tool.pagePath) {
                              window.open(tool.pagePath, '_self');
                            } else {
                              setSelectedTool(tool);
                            }
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    data-testid="button-prev-page"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          data-testid={`button-page-${pageNum}`}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    data-testid="button-next-page"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}

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
