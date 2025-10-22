import { Briefcase, Calendar } from "lucide-react";
import { timeline } from "@/data/portfolio-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AboutSection() {
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
              I'm Fasih ur Rehman, an experienced Product Manager with 9+ years of 
              dynamic experience delivering innovative, user-centric solutions across 
              FinTech, EdTech, eCommerce, and ICT sectors.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Currently serving as Project Manager at Etisalat Dubai, I specialize in 
              leading end-to-end product development, driving digital transformation, 
              and achieving measurable business growth. My track record includes 
              delivering 80% revenue growth, transforming products to Shariah compliance, 
              and managing portfolios generating millions in annual revenue.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              I excel in Agile methodologies, cross-functional team leadership, and 
              leveraging cutting-edge technologies including AI to solve complex 
              challenges and drive impactful outcomes across diverse industries.
            </p>

            <Button
              size="lg"
              variant="default"
              onClick={() => scrollToSection("portfolio")}
              data-testid="button-see-projects"
              className="mt-4"
            >
              See My Projects
            </Button>
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

              {timeline.map((item, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
