
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, CheckCircle2, TrendingUp } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectCaseStudyModal({ project, open, onClose }: ProjectCaseStudyModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          {project.image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="bg-primary/5 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Business Impact</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.impact}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4">
            {project.liveUrl && (
              <Button asChild variant="default">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
