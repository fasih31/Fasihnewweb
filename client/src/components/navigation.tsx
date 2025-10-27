import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { AuthButton } from "./auth-dialog";
import { Logo } from "./logo";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Handle hash navigation when coming from external pages
    if (location === "/" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

  const scrollToSection = (id: string, isPage?: boolean) => {
    if (isPage) {
      setLocation(`/${id}`);
      setIsMobileMenuOpen(false);
      return;
    }

    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileMenuOpen(false);
      }
    } else {
      // Navigate to home page with hash
      setLocation(`/#${id}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks: Array<{ name: string; id: string; isPage?: boolean }> = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Solutions", id: "solutions" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Blog", id: "blog", isPage: true },
    { name: "Contact", id: "contact" },
  ];

  const updatedNavLinks = navLinks;


  const professionalTools = [
    { name: "Islamic FinTech Solutions", path: "/islamic-fintech", description: "Explore innovative Islamic finance solutions." },
    { name: "Professional Tools", path: "/tools", description: "Access a suite of professional tools for productivity." },
    { name: "Career Opportunities", path: "/career", description: "Find your next career move with us." },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navigation-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <button
              className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2"
              data-testid="button-logo"
            >
              <Logo className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground hidden sm:block">
                Fasih ur Rehman
              </span>
            </button>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {updatedNavLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id, link.isPage)}
                data-testid={`link-${link.id}`}
                className="hover-elevate active-elevate-2 text-sm"
              >
                {link.name}
              </Button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover-elevate active-elevate-2 text-sm gap-1">
                  Professional Tools
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-[100]">
                {professionalTools.map((tool) => (
                  <DropdownMenuItem key={tool.path} asChild>
                    <Link href={tool.path} target="_blank" rel="noopener noreferrer">
                      <div className="w-full px-3 py-2.5 hover:bg-accent rounded-sm transition-colors cursor-pointer">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <AuthButton />
            <Button
              variant="default"
              size="sm"
              data-testid="button-download-resume"
              className="gap-2"
              asChild
            >
              <a href="/attached_assets/Fasih ur Rehman - CV-1_1761140201663.pdf" download="Fasih_ur_Rehman_Resume.pdf">
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <AuthButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              className="hover-elevate active-elevate-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border shadow-lg">
          <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {updatedNavLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id, link.isPage)}
                data-testid={`mobile-link-${link.id}`}
                className="w-full justify-start hover-elevate active-elevate-2 h-12 text-base"
              >
                {link.name}
              </Button>
            ))}
            <div className="pt-3 mt-2 border-t border-border/50">
              <p className="text-sm font-semibold text-muted-foreground px-3 py-2 mb-1">Professional Tools</p>
              {professionalTools.map((tool) => (
                <Link key={tool.path} href={tool.path} target="_blank" rel="noopener noreferrer">
                  <div className="w-full px-3 py-2.5 hover:bg-accent rounded-md transition-colors cursor-pointer">
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </Link>
              ))}
            </div>
            <Button
              variant="default"
              size="lg"
              data-testid="mobile-button-download-resume"
              className="w-full gap-2 mt-4 h-12"
              asChild
            >
              <a href="/attached_assets/Fasih ur Rehman - CV-1_1761140201663.pdf" download="Fasih_ur_Rehman_Resume.pdf">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}