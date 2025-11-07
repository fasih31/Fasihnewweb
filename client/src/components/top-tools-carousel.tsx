
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp, DollarSign, Search, Code, QrCode, Key } from "lucide-react";
import { useLocation } from "wouter";

const topTools = [
  {
    id: "crypto",
    title: "Crypto Tracker",
    description: "Real-time cryptocurrency prices",
    icon: TrendingUp,
    gradient: "from-orange-500 to-pink-500",
    path: "/tools/crypto-tracker"
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "150+ currencies with live rates",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
    path: "/tools/currency-converter"
  },
  {
    id: "seo",
    title: "SEO Analyzer",
    description: "Advanced website optimization",
    icon: Search,
    gradient: "from-purple-500 to-indigo-500",
    path: "/tools/seo-analyzer"
  },
  {
    id: "code",
    title: "Code Playground",
    description: "14+ programming languages",
    icon: Code,
    gradient: "from-teal-500 to-cyan-500",
    path: "/tools/code-playground"
  },
  {
    id: "qr",
    title: "QR Generator",
    description: "Custom QR codes instantly",
    icon: QrCode,
    gradient: "from-violet-500 to-purple-500",
    path: "/tools/qr-generator"
  },
  {
    id: "password",
    title: "Password Generator",
    description: "Secure passwords in seconds",
    icon: Key,
    gradient: "from-amber-500 to-orange-500",
    path: "/tools/password-generator"
  }
];

export function TopToolsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setLocation] = useLocation();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topTools.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % topTools.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + topTools.length) % topTools.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate visible tools (current and adjacent)
  const getVisibleTools = () => {
    const tools = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + topTools.length) % topTools.length;
      tools.push({ ...topTools[index], offset: i });
    }
    return tools;
  };

  return (
    <div 
      className="w-full py-8 sm:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">🔥 Popular Tools</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore our most-used professional tools
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLocation("/tools")}
            className="hidden sm:inline-flex"
          >
            View All
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:flex items-center justify-center gap-4 relative min-h-[200px]">
            {getVisibleTools().map((tool, idx) => {
              const Icon = tool.icon;
              const isCenter = tool.offset === 0;
              
              return (
                <div
                  key={`${tool.id}-${idx}`}
                  className={`transition-all duration-500 ${
                    isCenter 
                      ? 'scale-100 opacity-100 z-10' 
                      : 'scale-90 opacity-60 z-0'
                  }`}
                  style={{
                    transform: `translateX(${tool.offset * 20}px)`
                  }}
                >
                  <Card 
                    className={`w-80 cursor-pointer hover:shadow-xl transition-all ${
                      isCenter ? 'border-2 border-primary' : ''
                    }`}
                    onClick={() => isCenter && setLocation(tool.path)}
                  >
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.gradient} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {tool.description}
                      </p>
                      {isCenter && (
                        <Badge variant="default" className="animate-pulse">
                          Try Now
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet View - Single Card */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {topTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div 
                      key={tool.id} 
                      className="w-full flex-shrink-0 px-2"
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-all border-2 border-primary/50"
                        onClick={() => setLocation(tool.path)}
                      >
                        <CardContent className="p-6">
                          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.gradient} mb-4`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {tool.description}
                          </p>
                          <Badge variant="default">Try Now</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 rounded-full shadow-lg z-20 bg-background/80 backdrop-blur-sm"
            onClick={prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 rounded-full shadow-lg z-20 bg-background/80 backdrop-blur-sm"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {topTools.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex 
                  ? 'w-8 h-2 bg-primary' 
                  : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-6 sm:hidden">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setLocation("/tools")}
          >
            View All Tools
          </Button>
        </div>
      </div>
    </div>
  );
}
