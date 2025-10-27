import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { SkillsSection } from "@/components/skills-section";
import { SolutionsSection } from "@/components/solutions-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { LinkedInArticlesSection } from "@/components/linkedin-articles-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { NewsletterForm } from "@/components/newsletter-form";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { StockTicker } from "@/components/stock-ticker";
import { NewsFeed } from "@/components/news-feed";
import { SEOHead, getPersonSchema, getOrganizationSchema, getServiceSchema, getFAQSchema, getScholarlyArticleSchema } from "@/components/seo-head";
import { ScrollProgress } from "@/components/scroll-progress";
import { StatsSection } from "@/components/stats-section";

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