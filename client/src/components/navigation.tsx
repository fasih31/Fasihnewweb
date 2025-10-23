import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { AuthButton } from "./auth-dialog";
import logoImage from "@assets/generated_images/Fasih_ur_Rehman_professional_logo_824d90b3.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Solutions", id: "solutions" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  const externalLinks = [
    { name: "Tools", path: "/tools" },
    { name: "Islamic FinTech", path: "/islamic-fintech" },
    { name: "Career", path: "/career" },
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
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2"
            data-testid="button-logo"
          >
            <img src={logoImage} alt="Fasih ur Rehman" className="h-10 w-10" />
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Fasih ur Rehman
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                data-testid={`link-${link.id}`}
                className="hover-elevate active-elevate-2"
              >
                {link.name}
              </Button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <AuthButton />
            <Link href="/tools">
              <Button variant="ghost" className="hover-elevate active-elevate-2">
                Tools
              </Button>
            </Link>
            <Link href="/islamic-fintech">
              <Button variant="ghost" className="hover-elevate active-elevate-2">
                Islamic FinTech
              </Button>
            </Link>
            <Link href="/career">
              <Button variant="ghost" className="hover-elevate active-elevate-2">
                Career
              </Button>
            </Link>
            <Button
              variant="default"
              size="default"
              data-testid="button-download-resume"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
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
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                data-testid={`mobile-link-${link.id}`}
                className="w-full justify-start hover-elevate active-elevate-2"
              >
                {link.name}
              </Button>
            ))}
            <Link href="/tools">
              <Button
                variant="ghost"
                className="w-full justify-start hover-elevate active-elevate-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </Button>
            </Link>
            <Link href="/islamic-fintech">
              <Button
                variant="ghost"
                className="w-full justify-start hover-elevate active-elevate-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Islamic FinTech
              </Button>
            </Link>
            <Link href="/career">
              <Button
                variant="ghost"
                className="w-full justify-start hover-elevate active-elevate-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Career
              </Button>
            </Link>
            <Button
              variant="default"
              size="default"
              data-testid="mobile-button-download-resume"
              className="w-full gap-2 mt-4"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}