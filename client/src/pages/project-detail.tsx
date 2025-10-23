import { useRoute, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import { projects } from "@/data/portfolio-data";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const [, setLocation] = useLocation();
  const projectId = params?.id;

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${project.title} - Fasih ur Rehman`}
        description={project.description}
        keywords={`${project.category}, ${project.techStack.join(", ")}, product management`}
      />
      <Navigation />
      <main className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation("/#portfolio")}
            className="mb-6 sm:mb-8 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>

          {/* Project Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="text-sm">
                {project.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button asChild size="lg" className="gap-2">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-base py-2 px-4"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <h2>Project Overview</h2>
            <p>{project.description}</p>

            <h2>Key Features</h2>
            <p>
              This project showcases expertise in {project.category} and demonstrates proficiency in modern technologies including {project.techStack.join(", ")}.
            </p>

            <h2>Impact</h2>
            <p>
              As a Product Manager, I led the development of this solution to address real-world challenges in the {project.category} space, ensuring user-centric design and measurable business outcomes.
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setLocation("/#portfolio")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Projects
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
