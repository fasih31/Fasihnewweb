
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Smartphone, Brain, TrendingUp } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Product Management",
    color: "text-primary",
    skills: ["Agile/Scrum", "Product Strategy", "Roadmap Planning", "Stakeholder Management", "User Stories", "Sprint Planning"]
  },
  {
    icon: Brain,
    title: "AI & Emerging Tech",
    color: "text-chart-1",
    skills: ["AI/AGI Integration", "Machine Learning", "ChatGPT/LLMs", "Automation", "Predictive Analytics", "NLP"]
  },
  {
    icon: Globe,
    title: "Web3 & Blockchain",
    color: "text-chart-2",
    skills: ["Smart Contracts", "DeFi", "NFTs", "Tokenomics", "Web3 Strategy", "Blockchain Integration"]
  },
  {
    icon: Database,
    title: "Technical Skills",
    color: "text-chart-3",
    skills: ["API Integration", "Cloud Architecture", "Microservices", "DevOps", "CI/CD", "System Design"]
  },
  {
    icon: TrendingUp,
    title: "Business & Analytics",
    color: "text-chart-4",
    skills: ["Market Analysis", "KPI Tracking", "A/B Testing", "Revenue Growth", "Data Analytics", "ROI Optimization"]
  },
  {
    icon: Smartphone,
    title: "Industry Expertise",
    color: "text-chart-5",
    skills: ["FinTech", "EdTech", "eCommerce", "Telecom", "SaaS", "Enterprise Solutions"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set spanning product management, technology, and business strategy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group hover-elevate transition-all duration-300 border-card-border overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="text-xs hover:bg-primary/20 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
