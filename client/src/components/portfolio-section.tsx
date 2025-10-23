import { useState } from "react";
import { ExternalLink, Github, ArrowRight, Eye } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import type { Project } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type Category = "All" | "AI" | "Web3" | "FinTech" | "EdTech" | "eCommerce";

export function PortfolioSection() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const handleViewCaseStudy = (project: Project) => {
    setSelectedProject(project);
    setCaseStudyOpen(true);
  };

  const categories: Category[] = ["All", "AI", "Web3", "FinTech", "EdTech", "eCommerce"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 bg-muted/30"
      data-testid="section-portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
              className={`capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-105'
              }`}
              data-state={selectedCategory === category ? "on" : "off"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover-elevate transition-all duration-300 hover:shadow-xl border-card-border"
              data-testid={`project-card-${project.id}`}
            >
              {/* Project Image */}
              <div
                className="relative aspect-video overflow-hidden bg-muted cursor-pointer"
                onClick={() => setLocation(`/project/${project.id}`)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  data-testid={`project-image-${project.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white font-semibold flex items-center gap-2">
                    View Details <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setLocation(`/project/${project.id}`)}
                    >
                      {project.title}
                    </h3>
                    <Badge variant="secondary" className="shrink-0">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                      data-testid={`tech-${project.id}-${index}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleViewCaseStudy(project)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Case Study
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-live-${project.id}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="shrink-0"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${project.id}`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <Dialog open={caseStudyOpen} onOpenChange={setCaseStudyOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="outline" size="icon" className="absolute top-4 right-4 h-8 w-8">
                <ArrowRight className="rotate-90 h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6 py-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedProject.caseStudy && (
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">Case Study:</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.caseStudy}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.liveUrl && (
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="flex-1 min-w-[120px]"
                  >
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 min-w-[120px]"
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}