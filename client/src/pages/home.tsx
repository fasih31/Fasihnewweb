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
import { SkillsShowcase } from "@/components/skills-showcase";
import { TechStackIcons } from "@/components/tech-stack-icons";
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

export default function Home() {
  return (
    <>
      <SEOHead
        title="Fasih ur Rehman | Product Manager - FinTech, E-commerce, EdTech, Telecom, AI & Crypto"
        description="Versatile Product Manager with 9+ years in FinTech, Islamic Finance, Shariah E-commerce, EdTech, DaaS, SaaS, Telecom, AI research & Crypto. Delivering digital transformation across UAE, Saudi Arabia & Middle East."
        keywords="Fasih ur Rehman, Product Manager Dubai, FinTech, Islamic Finance, E-commerce, EdTech, Telecom, DaaS, SaaS, AI, Crypto, Web3, Blockchain, Dubai UAE"
        canonicalUrl="https://iamfasih.com"
        schema={[getPersonSchema(), getOrganizationSchema(), getServiceSchema(), getFAQSchema(), ...getScholarlyArticleSchema()]}
      />
      <ScrollProgress />
      <FloatingCTA />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
              <p className="text-lg text-muted-foreground">Proficiency levels across key technologies</p>
            </div>
            <SkillsShowcase />
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
              <p className="text-lg text-muted-foreground">Tools & frameworks I work with daily</p>
            </div>
            <TechStackIcons />
          </div>
        </section>
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