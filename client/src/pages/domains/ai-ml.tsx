
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead, getWebPageSchema, getServiceSchema } from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Brain, 
  Cpu, 
  Sparkles, 
  ChartBar, 
  MessageSquare,
  Eye,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LeadCaptureForm } from "@/components/lead-capture-form";

export default function AIMLDomain() {
  const expertise = [
    {
      icon: Brain,
      title: "Machine Learning Solutions",
      description: "Built ML models for credit scoring, fraud detection, and predictive analytics across FinTech platforms.",
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Developed NLP-powered chatbots, sentiment analysis, and text classification systems for customer service.",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Implemented document verification, KYC automation, and visual recognition systems.",
    },
    {
      icon: Sparkles,
      title: "Generative AI & LLMs",
      description: "Integrated GPT models, AI assistants, and automated content generation for business applications.",
    },
  ];

  const achievements = [
    "Published IEEE research on AI ethics and implications",
    "Built AI-powered credit scoring with 95% accuracy",
    "Deployed NLP chatbot serving 100K+ conversations",
    "Implemented computer vision for KYC automation",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI/ML Product Manager | Machine Learning & AI Solutions Expert | Fasih ur Rehman"
        description="Expert AI/ML Product Manager specializing in machine learning, NLP, computer vision, and generative AI. Published IEEE researcher with deployed AI systems serving 100K+ users."
        keywords="AI product manager, machine learning expert, NLP solutions, computer vision, generative AI, LLM integration, deep learning, AI research, chatbot development"
        canonicalUrl="https://iamfasih.com/domains/ai-ml"
        schema={[
          getWebPageSchema(
            "AI/ML Solutions by Fasih ur Rehman",
            "Expert AI/ML Product Manager specializing in artificial intelligence and machine learning solutions"
          ),
          getServiceSchema(),
        ]}
      />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Artificial Intelligence & Machine Learning</Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  AI/ML Product Manager
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Pioneering AI-driven innovation across FinTech, customer service, and automation. 
                  Published IEEE researcher with proven track record in deploying production ML systems 
                  serving hundreds of thousands of users.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/solutions/ai-ml-platform">
                    <Button size="lg" className="gap-2">
                      <Brain className="h-5 w-5" />
                      View AI Solutions
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/#contact">Discuss Your Project</a>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{achievement}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI/ML Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive AI solutions from machine learning to generative AI applications
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary mb-2" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Harness the Power of AI
              </h2>
              <p className="text-xl text-muted-foreground">
                Let's build intelligent solutions for your business challenges
              </p>
            </div>
            <LeadCaptureForm domain="ai-ml" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
