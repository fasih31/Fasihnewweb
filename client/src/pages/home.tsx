import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SolutionsSection } from "@/components/solutions-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StockTicker } from "@/components/stock-ticker";
import { NewsFeed } from "@/components/news-feed";
import { SEOHead, StructuredData } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead />
      <StructuredData />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SolutionsSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
        <section className="py-8 md:py-12 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <StockTicker />
              <NewsFeed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
