
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LINKEDIN_POSTER_WIDTH = 1200;
const LINKEDIN_POSTER_HEIGHT = 627;

interface ToolPoster {
  id: string;
  title: string;
  tagline: string;
  features: string[];
  gradient: string;
  icon: string;
  description: string;
  hashtags: string[];
}

const toolPosters: ToolPoster[] = [
  {
    id: "seo-analyzer",
    title: "Advanced SEO Analyzer",
    tagline: "Boost Your Rankings with AI-Powered Insights",
    features: [
      "AI-Powered Content Analysis",
      "Real-time Performance Metrics",
      "Competitor Comparison",
      "Actionable Recommendations"
    ],
    gradient: "from-purple-600 via-violet-600 to-indigo-600",
    icon: "🚀",
    description: "Transform your website's SEO with comprehensive analysis powered by AI. Get instant insights on performance, accessibility, security, and content quality. Perfect for digital marketers, agencies, and businesses in UAE, Saudi Arabia, and across the Middle East.",
    hashtags: ["#SEO", "#DigitalMarketing", "#AITools", "#WebOptimization", "#MiddleEastTech", "#DubaiTech", "#MarketingTools", "#SEOAnalysis", "#FinTechAdvisor", "#FasihUrRehman"]
  },
  {
    id: "code-playground",
    title: "Professional Code IDE",
    tagline: "14+ Languages, One Powerful Editor",
    features: [
      "Multi-Language Support",
      "Real-time Execution",
      "Syntax Highlighting",
      "Professional Themes"
    ],
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    icon: "💻",
    description: "Write, test, and execute code in 14+ programming languages including Python, JavaScript, TypeScript, Java, C++, and more. Perfect for developers, students, and tech professionals. Built with cutting-edge technology for the modern developer.",
    hashtags: ["#Programming", "#WebDevelopment", "#CodingTools", "#DeveloperTools", "#TechEducation", "#LearnToCode", "#MiddleEastDevelopers", "#UAETech", "#OnlineIDE", "#FasihUrRehman"]
  },
  {
    id: "website-scanner",
    title: "Deep Website Scanner",
    tagline: "Security, Performance & Tech Stack Analysis",
    features: [
      "Security Vulnerability Detection",
      "Lighthouse Performance Audit",
      "OCR Text Extraction",
      "Technology Stack Detection"
    ],
    gradient: "from-rose-600 via-pink-600 to-red-600",
    icon: "🔍",
    description: "Comprehensive website analysis tool featuring security scanning, Lighthouse audit, OCR text extraction, and technology detection. Essential for cybersecurity professionals, web developers, and digital agencies across the Middle East.",
    hashtags: ["#WebSecurity", "#CyberSecurity", "#PerformanceOptimization", "#TechAnalysis", "#DigitalTransformation", "#UAECyber", "#SecurityTools", "#WebDevelopment", "#FinTechSecurity", "#FasihUrRehman"]
  },
  {
    id: "crypto-tracker",
    title: "Crypto Market Tracker",
    tagline: "Real-Time Cryptocurrency Data",
    features: [
      "Live Price Updates",
      "24h Price Changes",
      "Market Cap Data",
      "Top 10 Cryptocurrencies"
    ],
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    icon: "📈",
    description: "Stay ahead of the crypto market with real-time price tracking powered by CoinGecko API. Monitor top cryptocurrencies, track market movements, and make informed investment decisions. Perfect for traders and investors in the Middle East's growing crypto market.",
    hashtags: ["#Cryptocurrency", "#Bitcoin", "#Ethereum", "#CryptoTrading", "#BlockchainTechnology", "#DigitalAssets", "#UAECrypto", "#FinTech", "#CryptoMarket", "#FasihUrRehman"]
  },
  {
    id: "password-generator",
    title: "Secure Password Generator",
    tagline: "Military-Grade Password Security",
    features: [
      "Customizable Length",
      "Strength Meter",
      "Multiple Character Types",
      "Instant Generation"
    ],
    gradient: "from-amber-600 via-orange-600 to-red-600",
    icon: "🔐",
    description: "Generate ultra-secure passwords with customizable complexity. Features real-time strength analysis and support for uppercase, lowercase, numbers, and symbols. Essential for cybersecurity-conscious professionals and businesses.",
    hashtags: ["#CyberSecurity", "#PasswordSecurity", "#InfoSec", "#DataProtection", "#SecurityTools", "#DigitalSecurity", "#UAESecurity", "#PrivacyProtection", "#SecurityFirst", "#FasihUrRehman"]
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    tagline: "Create Custom QR Codes Instantly",
    features: [
      "Custom Size Options",
      "Error Correction Levels",
      "URL & Text Support",
      "Instant Download"
    ],
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    icon: "📱",
    description: "Generate professional QR codes for URLs, text, and contact information. Perfect for marketing campaigns, business cards, and digital touchpoints. Used by businesses across UAE and Middle East for seamless customer engagement.",
    hashtags: ["#QRCode", "#DigitalMarketing", "#BusinessTools", "#MarketingAutomation", "#ContactlessPayment", "#UAEBusiness", "#DigitalTransformation", "#SmartBusiness", "#TechTools", "#FasihUrRehman"]
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    tagline: "150+ Global Currencies in Real-Time",
    features: [
      "Live Exchange Rates",
      "150+ Currencies",
      "Instant Conversion",
      "Middle East Focus"
    ],
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    icon: "💱",
    description: "Convert between 150+ global currencies with real-time exchange rates. Special support for AED, SAR, PKR, and other Middle Eastern currencies. Essential for international business, traders, and travelers.",
    hashtags: ["#CurrencyExchange", "#ForexTrading", "#InternationalBusiness", "#UAEBusiness", "#FinTech", "#TradingTools", "#ExchangeRates", "#GlobalBusiness", "#MiddleEastFinance", "#FasihUrRehman"]
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    tagline: "Format, Validate & Minify JSON",
    features: [
      "Syntax Highlighting",
      "Validation",
      "Minification",
      "Copy to Clipboard"
    ],
    gradient: "from-lime-600 via-green-600 to-emerald-600",
    icon: "📄",
    description: "Professional JSON formatter with syntax highlighting, validation, and minification. Essential tool for developers, API integration specialists, and technical teams working with data.",
    hashtags: ["#WebDevelopment", "#JSON", "#DeveloperTools", "#APIIntegration", "#TechTools", "#Programming", "#SoftwareDevelopment", "#UAEDevelopers", "#TechCommunity", "#FasihUrRehman"]
  },
  {
    id: "base64-converter",
    title: "Base64 Encoder/Decoder",
    tagline: "Secure Text Encoding Made Simple",
    features: [
      "Instant Encoding",
      "Fast Decoding",
      "Validation",
      "Copy Output"
    ],
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    icon: "🔤",
    description: "Convert text to Base64 encoding and decode Base64 strings instantly. Essential for web developers, security professionals, and technical teams handling data transmission and storage.",
    hashtags: ["#WebDevelopment", "#Encoding", "#DataSecurity", "#DeveloperTools", "#TechUtilities", "#Programming", "#UAETech", "#TechnicalTools", "#SoftwareEngineering", "#FasihUrRehman"]
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    tagline: "MD5, SHA-256 & More",
    features: [
      "Multiple Algorithms",
      "MD5 & SHA-256",
      "Instant Generation",
      "Copy Hashes"
    ],
    gradient: "from-rose-600 via-red-600 to-pink-600",
    icon: "🔑",
    description: "Generate cryptographic hashes using MD5, SHA-256, and other algorithms. Critical tool for security professionals, developers, and anyone working with data integrity and verification.",
    hashtags: ["#Cryptography", "#DataSecurity", "#Hashing", "#InfoSec", "#CyberSecurity", "#DeveloperTools", "#SecurityProfessionals", "#UAESecurity", "#TechSecurity", "#FasihUrRehman"]
  }
];

export default function MarketingAssets() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const generatePoster = (poster: ToolPoster) => {
    const canvas = document.createElement('canvas');
    canvas.width = LINKEDIN_POSTER_WIDTH;
    canvas.height = LINKEDIN_POSTER_HEIGHT;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, LINKEDIN_POSTER_WIDTH, LINKEDIN_POSTER_HEIGHT);
    const colors = poster.gradient.match(/from-(\w+-\d+)|via-(\w+-\d+)|to-(\w+-\d+)/g) || [];
    
    gradient.addColorStop(0, getColorHex(colors[0]));
    gradient.addColorStop(0.5, getColorHex(colors[1]));
    gradient.addColorStop(1, getColorHex(colors[2]));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, LINKEDIN_POSTER_WIDTH, LINKEDIN_POSTER_HEIGHT);

    // Overlay pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(i * 60, 0, 1, LINKEDIN_POSTER_HEIGHT);
      ctx.fillRect(0, i * 60, LINKEDIN_POSTER_WIDTH, 1);
    }

    // Icon
    ctx.font = 'bold 120px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(poster.icon, 80, 180);

    // Title
    ctx.font = 'bold 68px Inter, Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(poster.title, 80, 280);

    // Tagline
    ctx.font = '36px Inter, Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(poster.tagline, 80, 340);

    // Features
    ctx.font = 'bold 24px Inter, Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    poster.features.forEach((feature, index) => {
      ctx.fillText(`✓ ${feature}`, 80, 410 + (index * 40));
    });

    // Footer branding
    ctx.font = 'bold 28px Inter, Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Fasih ur Rehman', 80, LINKEDIN_POSTER_HEIGHT - 60);
    
    ctx.font = '20px Inter, Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('FinTech Advisor & Product Manager | iamfasih.com', 80, LINKEDIN_POSTER_HEIGHT - 25);

    return canvas.toDataURL('image/png');
  };

  const getColorHex = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      'from-purple-600': '#9333ea',
      'via-violet-600': '#7c3aed',
      'to-indigo-600': '#4f46e5',
      'from-emerald-600': '#059669',
      'via-teal-600': '#0d9488',
      'to-cyan-600': '#0891b2',
      'from-rose-600': '#e11d48',
      'via-pink-600': '#db2777',
      'to-red-600': '#dc2626',
      'from-orange-600': '#ea580c',
      'via-amber-600': '#d97706',
      'to-yellow-600': '#ca8a04',
      'from-amber-600': '#d97706',
      'via-orange-600': '#ea580c',
      'to-red-600': '#dc2626',
      'from-violet-600': '#7c3aed',
      'via-purple-600': '#9333ea',
      'to-fuchsia-600': '#c026d3',
      'from-green-600': '#16a34a',
      'via-emerald-600': '#059669',
      'to-teal-600': '#0d9488',
      'from-lime-600': '#65a30d',
      'via-green-600': '#16a34a',
      'to-emerald-600': '#059669',
      'from-sky-600': '#0284c7',
      'via-blue-600': '#2563eb',
      'to-indigo-600': '#4f46e5',
      'from-rose-600': '#e11d48',
      'via-red-600': '#dc2626',
      'to-pink-600': '#db2777',
    };
    return colorMap[colorClass] || '#6366f1';
  };

  const downloadPoster = (poster: ToolPoster) => {
    const dataUrl = generatePoster(poster);
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `${poster.id}-linkedin-poster.png`;
    link.href = dataUrl;
    link.click();

    toast({
      title: "Poster Downloaded!",
      description: `${poster.title} poster saved successfully`,
    });
  };

  const copyDescription = (poster: ToolPoster) => {
    const content = `${poster.description}

${poster.hashtags.join(' ')}

🌐 Try it now: https://iamfasih.com/tools

#FreeTool #ProfessionalTools #TechInnovation`;

    navigator.clipboard.writeText(content);
    setCopiedId(poster.id);
    setTimeout(() => setCopiedId(null), 2000);

    toast({
      title: "Copied!",
      description: "Description and hashtags copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Marketing Assets - LinkedIn Promotional Posters"
        description="Professional LinkedIn-sized promotional posters for our free online tools"
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              LinkedIn Marketing Assets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional promotional posters designed for LinkedIn (1200x627px)
            </p>
          </div>

          <div className="space-y-8">
            {toolPosters.map((poster) => (
              <Card key={poster.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <span className="text-3xl">{poster.icon}</span>
                        {poster.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {poster.tagline}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => downloadPoster(poster)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => copyDescription(poster)}
                      >
                        {copiedId === poster.id ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy Post
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Preview */}
                  <div className="border rounded-lg overflow-hidden bg-muted">
                    <div 
                      className={`w-full h-64 bg-gradient-to-br ${poster.gradient} p-8 flex flex-col justify-between text-white`}
                    >
                      <div>
                        <div className="text-5xl mb-4">{poster.icon}</div>
                        <h3 className="text-3xl font-bold mb-2">{poster.title}</h3>
                        <p className="text-lg opacity-90">{poster.tagline}</p>
                      </div>
                      <div className="text-sm opacity-80">
                        Fasih ur Rehman | iamfasih.com
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">LinkedIn Post Description:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                      {poster.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {poster.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          ✓ {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <h4 className="font-semibold mb-2">Hashtags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {poster.hashtags.map((tag, idx) => (
                        <Badge key={idx} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
