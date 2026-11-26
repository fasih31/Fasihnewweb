import { innovationPages } from "@shared/innovation";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
  ...innovationPages.filter(page=>page.path.startsWith("/tools/") || page.path==="/solutions/islamic-bnpl").map(page=>({
    id:page.path, title:page.title, description:page.intro, icon:Calculator, features:page.sections.slice(0,1).map(([heading])=>heading),
    gradient:"from-emerald-600 to-teal-700", category:page.label, openAsPage:true, pagePath:page.path
  })),
  {
    id: "crypto",
    title: "Crypto Market Tracker",
    description: "Real-time cryptocurrency prices and market data with live updates",
    icon: TrendingUp,
    features: ["Live Price Updates", "Market Cap Data", "24h Price Changes", "Multiple Cryptocurrencies"],
    gradient: "from-orange-500 to-pink-500",
    category: "Finance",
    openAsPage: true,
    pagePath: "/tools/crypto-tracker"
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "Convert between 150+ global currencies with real-time exchange rates",
    icon: DollarSign,
    features: ["150+ Currencies", "Real-time Rates", "Instant Conversion", "Historical Data"],
    gradient: "from-green-500 to-emerald-500",
    category: "Finance",
    openAsPage: true,
    pagePath: "/tools/currency-converter"
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
    gradient: "from-violet-500 to-purple-500",
    category: "Utilities",
    openAsPage: true,
    pagePath: "/tools/qr-generator"
  },
  {
    id: "password",
    title: "Password Generator",
    description: "Generate strong, secure passwords with customizable complexity",
    icon: Key,
    features: ["Customizable Length", "Multiple Options", "Strength Meter", "Copy to Clipboard"],
    gradient: "from-amber-500 to-orange-500",
    category: "Security",
    openAsPage: true,
    pagePath: "/tools/password-generator"
  },
  {
    id: "json",
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data with syntax highlighting",
    icon: FileJson,
    features: ["Format JSON", "Minify JSON", "Validate Syntax", "Copy Output"],
    gradient: "from-lime-500 to-green-500",
    category: "Development",
    openAsPage: true,
    pagePath: "/tools/json-formatter"
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
    gradient: "from-amber-500 to-yellow-500",
    category: "Design",
    openAsPage: true,
    pagePath: "/tools/lorem-ipsum"
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
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              My personal toolkit
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              I keep these calculators and development utilities alongside my portfolio. Search for a task, such as formatting JSON, converting currencies or creating a QR code.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    aria-label="Search tools" data-testid="input-search-tools"
                    placeholder="Search tools by name, description, or features..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <Button
                      aria-label="Clear tool search" data-testid="button-clear-search"
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
                    <SelectTrigger aria-label="Filter tools by category" data-testid="select-category-filter" className="w-full sm:w-[200px]">
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
              <ul className="divide-y border-y">
                {paginatedTools.map(tool=><li key={tool.id} className="grid gap-2 py-5 md:grid-cols-[1fr_1.5fr_auto] md:items-center md:gap-8">
                  <div><small className="text-muted-foreground">{tool.category}</small><h2 className="text-xl font-medium">{tool.title}</h2></div>
                  <p>{tool.description}</p>
                  {tool.openAsPage && tool.pagePath ? <a className="underline underline-offset-4 py-2" href={tool.pagePath}>Open {tool.title} ↗</a>
                    : <button className="text-left underline underline-offset-4 py-2" onClick={()=>setSelectedTool(tool)}>Open {tool.title}</button>}
                </li>)}
              </ul>
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
