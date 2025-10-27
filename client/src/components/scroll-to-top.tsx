
import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top immediately on location change
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
