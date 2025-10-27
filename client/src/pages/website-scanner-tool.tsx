
import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { WebsiteScanner } from "@/components/tools/website-scanner";

export default function WebsiteScannerTool() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Website Scanner Tool — Advanced Security & Performance Analysis"
        description="Deep website analysis with OCR, screenshots, Lighthouse audit, security scanning, and technology detection for comprehensive website insights."
      />
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              Website Scanner
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced website scanning with OCR, screenshots, Lighthouse audit, and comprehensive security analysis
            </p>
          </div>

          <WebsiteScanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
