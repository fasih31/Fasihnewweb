import { useState } from "react";
import { useLocation } from "wouter";
import { Coins, GraduationCap, ShoppingCart, Database, X } from "lucide-react";
import { solutions } from "@/data/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const iconMap = {
  coins: Coins,
  "graduation-cap": GraduationCap,
  "shopping-cart": ShoppingCart,
  database: Database,
};

export function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const scrollToContact = () => {
    setSelectedSolution(null);
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  const solution = solutions.find((s) => s.id === selectedSolution);

  return (
    <>
      <section
        id="solutions"
        className="py-24 md:py-32 bg-background"
        data-testid="section-solutions"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Innovative Solutions Across Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Scalable, secure, and intelligent platforms that transform businesses
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {solutions.map((sol) => {
              const Icon = iconMap[sol.icon as keyof typeof iconMap];
              return (
                <Card
                  key={sol.id}
                  className="group hover-elevate transition-all duration-300 hover:shadow-xl cursor-pointer border-card-border"
                  onClick={() => setSelectedSolution(sol.id)}
                  data-testid={`solution-card-${sol.id}`}
                >
                  <CardContent className="p-8 space-y-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-chart-2/30 transition-colors">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {sol.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-testid={`button-explore-${sol.id}`}
                      className="text-primary hover:text-primary"
                    >
                      Explore Solutions →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Modal */}
      <Dialog open={!!selectedSolution} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-solution">
          {solution && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    {(() => {
                      const Icon = iconMap[solution.icon as keyof typeof iconMap];
                      return <Icon className="h-8 w-8 text-primary" />;
                    })()}
                  </div>
                  <DialogTitle className="text-3xl font-bold">
                    {solution.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                  {solution.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    Key Offerings
                  </h4>
                  <ul className="space-y-3">
                    {solution.offerings.map((offering, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{offering}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      setSelectedSolution(null);
                      setLocation(`/solutions/${solution.id}`);
                    }}
                    data-testid="button-view-full-details"
                    variant="default"
                  >
                    View Full Details
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      onClick={scrollToContact}
                      data-testid="button-request-consultation"
                      variant="outline"
                      className="flex-1"
                    >
                      Request Consultation
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" data-testid="button-close-modal">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
