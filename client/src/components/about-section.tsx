import { useState } from "react";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { timeline } from "@/data/portfolio-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const INITIAL_ITEMS = 3;
  const displayedTimeline = showAllTimeline ? timeline : timeline.slice(0, INITIAL_ITEMS);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-background"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              I'm Fasih ur Rehman, a seasoned FinTech Product Manager and Islamic Finance Expert with 9+ years of 
              transformative experience delivering cutting-edge Shariah-compliant solutions across multiple domains including 
              FinTech, Islamic Banking, EdTech, E-commerce, Telecom, AI/AGI, DaaS, SaaS, and Web3 technologies.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Currently serving as Senior Project Manager at Etisalat Dubai, I've pioneered innovative Islamic financial products 
              including <strong>BNPL (Buy Now Pay Later)</strong> using Murabaha contracts, <strong>Ijarah leasing solutions</strong> for housing and car finance, 
              <strong>Qard Hasan</strong> salary advance programs, <strong>Takaful insurance</strong> platforms, and comprehensive <strong>P2P lending</strong> ecosystems. 
              My expertise spans the complete spectrum of Islamic finance contracts: Murabaha, Ijarah, Musharakah, Mudarabah, Salam, Istisna, and Sukuk structuring.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              As founder of <strong>VirtualIEC</strong> (AI & Blockchain innovation ecosystem) and co-founder of <strong>Labs360.io</strong> (Web3 growth marketing agency), 
              I've successfully delivered 80% revenue growth, transformed conventional products to full Shariah compliance, and managed 
              multi-million dollar portfolios across UAE, Saudi Arabia, and GCC markets. My technical mastery includes React, Flutter, 
              Node.js, Azure DevOps, AI/ML integration, and quantum-resistant blockchain architecture.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              I excel in Agile/Scrum methodologies, PMP-certified project management, cross-functional team leadership across distributed teams, 
              and leveraging AI, automation (RPA-as-a-Service), and emerging technologies to solve complex business challenges. My research 
              contributions to IEEE and MDPI on AI ethics and FinTech security underscore my commitment to responsible innovation in Islamic finance.
            </p></div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                variant="default"
                onClick={() => scrollToSection("portfolio")}
                data-testid="button-see-projects"
              >
                See My Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a href="/attached_assets/Fasih ur Rehman - CV-1_1761140201663.pdf" download="Fasih_ur_Rehman_Resume.pdf">
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Professional Timeline
            </h3>

            <div className="space-y-6 relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border hidden sm:block"></div>

              {displayedTimeline.map((item, index) => (
                <Card
                  key={index}
                  className="relative hover-elevate transition-all duration-300 p-6 sm:ml-12 border-card-border"
                  data-testid={`timeline-item-${index}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[52px] top-8 w-4 h-4 rounded-full bg-primary border-4 border-background hidden sm:block"></div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="font-mono">{item.year}</span>
                    </div>
                    <h4 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-base font-medium text-primary">
                      {item.company}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
              
              {timeline.length > INITIAL_ITEMS && (
                <div className="sm:ml-12 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllTimeline(!showAllTimeline)}
                    className="w-full gap-2"
                    data-testid="button-toggle-timeline"
                  >
                    {showAllTimeline ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show More ({timeline.length - INITIAL_ITEMS} more positions)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
