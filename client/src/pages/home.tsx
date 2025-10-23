import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SkillsSection } from "@/components/skills-section";
import { SolutionsSection } from "@/components/solutions-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { LinkedInArticlesSection } from "@/components/linkedin-articles-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsletterForm } from "@/components/newsletter-form";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StockTicker } from "@/components/stock-ticker";
import { NewsFeed } from "@/components/news-feed";
import { SEOHead, StructuredData } from "@/components/seo-head";
import { ScrollProgress } from "@/components/scroll-progress";
import { StatsSection } from "@/components/stats-section";


export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead />
      <StructuredData />
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <SolutionsSection />
        <PortfolioSection />
        <LinkedInArticlesSection />
        <TestimonialsSection />
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <NewsletterForm />
              <div className="space-y-6">
                <StockTicker />
                <NewsFeed />
              </div>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}