import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SkillsSection } from "@/components/skills-section";
import { SolutionsSection } from "@/components/solutions-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { LinkedInArticlesSection } from "@/components/linkedin-articles-section";
import { LinkedInActivitySection } from "@/components/linkedin-activity-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { FAQSection } from "@/components/faq-section";
import { NewsletterForm } from "@/components/newsletter-form";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StockTicker } from "@/components/stock-ticker";
import { NewsFeed } from "@/components/news-feed";
import { SEOHead, getPersonSchema, getOrganizationSchema, getServiceSchema, getFAQSchema, getScholarlyArticleSchema } from "@/components/seo-head";
import { ScrollProgress } from "@/components/scroll-progress";
import { StatsSection } from "@/components/stats-section";
import { FloatingCTA } from "@/components/floating-cta";
import { TopToolsCarousel } from "@/components/top-tools-carousel";

export default function Home() {
  return (
    <>
      <SEOHead
        title="Fasih ur Rehman | Best FinTech Advisor & Product Manager | Free SEO Tools, Online Calculators"
        description="Expert FinTech Advisor & Product Manager with 9+ years experience in Islamic Finance, E-commerce Designer, EdTech Solutions. Access free professional tools: SEO analyzer, website scanner, QR code generator, password generator, crypto tracker, currency converter, loan calculator, and more. Delivering digital transformation across UAE, Saudi Arabia & Middle East."
        keywords="Fasih ur Rehman, FinTech Advisor, Product Manager Dubai, Islamic Finance Expert, E-commerce Designer, SEO Tools, Website Analyzer, QR Code Generator, Password Generator, Online Calculators, Crypto Market Tracker, Currency Converter, JSON Formatter, Free Online Tools, EdTech Solutions, Digital Transformation UAE, Shariah Compliant Banking"
        canonicalUrl="https://iamfasih.com"
        schema={[getPersonSchema(), getOrganizationSchema(), getServiceSchema(), getFAQSchema(), ...getScholarlyArticleSchema()]}
      />
      <ScrollProgress />
      <FloatingCTA />
      <Navigation />
      <main>
        <HeroSection />
        <TopToolsCarousel />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <SkillsSection />
        <SolutionsSection />
        <PortfolioSection />
        <LinkedInArticlesSection />
        <LinkedInActivitySection />
        <TestimonialsSection />
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
              <p className="text-lg text-muted-foreground">What industry leaders say about working with me</p>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>
        <FAQSection />
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
    </>
  );
}