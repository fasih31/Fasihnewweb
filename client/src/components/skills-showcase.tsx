
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const skillsData = [
  { category: "Product Management", level: 95, skills: ["Agile", "Scrum", "Roadmapping", "Stakeholder Management"] },
  { category: "Islamic FinTech", level: 98, skills: ["Murabaha", "Ijarah", "BNPL", "Shariah Compliance"] },
  { category: "AI/ML & AGI", level: 90, skills: ["ChatGPT", "NLP", "Predictive Analytics", "Automation"] },
  { category: "Web3 & Blockchain", level: 88, skills: ["Smart Contracts", "DeFi", "NFTs", "Tokenomics"] },
  { category: "Full-Stack Development", level: 92, skills: ["React", "Node.js", "Flutter", "Cloud Architecture"] },
  { category: "Business Strategy", level: 94, skills: ["Growth Marketing", "Analytics", "Revenue Optimization"] }
];

export function SkillsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skillsData.map((skill, index) => (
        <Card
          key={index}
          className={`transition-all duration-300 hover:shadow-lg ${
            hoveredIndex === index ? "border-primary scale-105" : ""
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">{skill.category}</h3>
              <Badge variant="secondary" className="font-mono">{skill.level}%</Badge>
            </div>
            <Progress value={skill.level} className="h-2 mb-4" />
            <div className="flex flex-wrap gap-2">
              {skill.skills.map((s, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
