import { useEffect, useState } from "react";
import { ArrowRight, Shield, TrendingUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDownloadButton } from "@/components/resume-download-tracker";
import { motion } from "framer-motion";

const skills = [
  "Product Management",
  "AI/AGI",
  "Web3",
  "FinTech",
  "EdTech",
  "DaaS",
  "eCommerce",
  "Growth Marketing",
];

export function HeroSection() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);


  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === currentSkill) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? currentSkill.substring(0, displayedText.length - 1)
          : currentSkill.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentSkillIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      data-testid="section-hero"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Fasih ur Rehman
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
                Best FinTech Advisor | Product Manager for FinTech/EdTech | Islamic Finance & E-commerce Designer
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Fasih - your best fintech advisor and expert product manager for FinTech/EdTech solutions.
              Specializing in Islamic fintech advisory, Shariah-compliant banking, e-commerce design,
              and AI-powered product development. 9+ years transforming digital banking and EdTech platforms.
            </p>

            {/* Animated Skills */}
            <div className="flex items-center gap-2 text-lg sm:text-xl text-foreground justify-center lg:justify-start">
              <span className="text-muted-foreground">Expertise:</span>
              <span className="font-mono text-primary min-w-[200px] text-left">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <ResumeDownloadButton />
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                data-testid="button-hero-contact"
                className="gap-2 text-base"
              >
                Contact Me
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap gap-6 items-center pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>PMP Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                <span>9+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4 text-chart-3" />
                <span>50+ Projects Delivered</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Professional Photo */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative aspect-square rounded-full overflow-hidden border-4 border-border shadow-2xl">
                <img 
                  src="/attached_assets/IMG_8070_1761553568369.jpeg" 
                  alt="Fasih ur Rehman - Professional Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/30"></div>
        </div>
      </div>
    </section>
  );
}