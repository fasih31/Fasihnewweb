import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SolutionsSection } from "@/components/solutions-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { BlogSection } from "@/components/blog-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { NewsletterForm } from "@/components/newsletter-form";
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
