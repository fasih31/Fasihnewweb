import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border py-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Professional Branding & Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fasih ur Rehman</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building innovative AI, Web3, and FinTech solutions that drive digital transformation and business growth.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Designed & Developed by Fasih ur Rehman
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/fasihurrehman05"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/fasihurrehman"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:fasih31@gmail.com"
                className="hover-elevate active-elevate-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Back to Top Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            data-testid="button-back-to-top"
            className="gap-2 hover-elevate active-elevate-2 self-start sm:self-end"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="bg-border/50 my-8" />

        {/* Bottom Bar - Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} Fasih ur Rehman. All rights reserved.</p>
            <p className="text-xs">Professional Product Manager | FinTech & AI Specialist</p>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={scrollToTop}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={scrollToTop}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}