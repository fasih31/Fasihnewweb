
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsExpanded(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {isExpanded ? (
            <div className="bg-card border-2 border-primary rounded-lg shadow-2xl p-4 w-64">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">Ready to Start?</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Let's discuss your project and bring your vision to life.
              </p>
              <Button onClick={scrollToContact} className="w-full gap-2" size="sm">
                <MessageCircle className="h-4 w-4" />
                Get In Touch
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsExpanded(true)}
              size="lg"
              className="rounded-full h-14 w-14 shadow-2xl hover:scale-110 transition-transform"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
