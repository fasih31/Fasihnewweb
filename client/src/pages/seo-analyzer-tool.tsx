
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import { SEOChecker } from "@/components/tools/seo-checker";

export default function SEOAnalyzerTool() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="SEO Analyzer Tool — Professional Website SEO Analysis"
        description="Comprehensive SEO analysis tool with AI insights, performance metrics, security checks, and actionable recommendations to improve your website's search engine ranking."
      />
      <Navigation />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              SEO Analyzer
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced SEO analysis with AI-powered insights, performance metrics, and optimization recommendations
            </p>
          </div>

          <SEOChecker />
        </div>
      </main>

      <Footer />
    </div>
  );
}
