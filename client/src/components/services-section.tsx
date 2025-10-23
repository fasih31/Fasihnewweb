import { Briefcase, Brain, Rocket, Code2 } from "lucide-react";
import { services } from "@/data/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap = {
  briefcase: Briefcase,
  brain: Brain,
  rocket: Rocket,
  code: Code2,
};

export function ServicesSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-muted/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Services I Offer
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card
                key={service.id}
                className="group hover-elevate transition-all duration-300 hover:shadow-xl border-card-border"
                data-testid={`service-card-${service.id}`}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection("contact")}
                    data-testid={`button-service-${service.id}`}
                    className="mt-4 text-primary hover:text-primary w-full justify-start px-0"
                  >
                    Request Consultation →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
