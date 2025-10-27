
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SkillsShowcase } from "@/components/skills-showcase";
import { TechStackIcons } from "@/components/tech-stack-icons";
import { SEOHead } from "@/components/seo-head";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers } from "lucide-react";

export default function Expertise() {
  return (
    <>
      <SEOHead
        title="Technical Expertise & Skills | Fasih ur Rehman"
        description="Explore my comprehensive technical expertise across programming languages, frameworks, and tools. Product management skills combined with hands-on technical proficiency."
        keywords="technical skills, programming expertise, tech stack, frameworks, product management skills"
        canonicalUrl="https://iamfasih.com/expertise"
      />
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4">Technical Proficiency</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Technical Expertise
              </h1>
              <p className="text-xl text-muted-foreground">
                A comprehensive view of my technical skills, frameworks, and tools
              </p>
            </div>
          </div>
        </section>

        {/* Skills Showcase */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Code2 className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Proficiency Levels</h2>
              </div>
              <p className="text-lg text-muted-foreground">Skills mapped with proficiency percentages</p>
            </div>
            <SkillsShowcase />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Layers className="h-8 w-8 text-chart-2" />
                <h2 className="text-3xl md:text-4xl font-bold">Technology Stack</h2>
              </div>
              <p className="text-lg text-muted-foreground">Tools & frameworks I work with daily</p>
            </div>
            <TechStackIcons />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
