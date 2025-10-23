import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  article?: boolean;
}

export function SEOHead({
  title = "Fasih ur Rehman | Fasih Best FinTech Advisor | Product Manager for FinTech/EdTech | Islamic Finance Expert",
  description = "Fasih ur Rehman - Best FinTech Advisor & Product Manager for FinTech/EdTech. Expert in Islamic Finance, Shariah-compliant banking, AI-powered solutions, and e-commerce design. 9+ years transforming digital platforms.",
  keywords = "Fasih best fintech advisor, product manager for fintech/edtech, product manager for fintech, product manager for edtech, Islamic fintech advisor, fintech advisor, e-commerce designer, Islamic finance expert, fintech product manager, shariah compliant fintech, digital banking product manager, payment systems expert, AI product manager, web3 product manager, certified product manager, PMP, digital transformation",
  ogImage = "/og-image.png",
  canonicalUrl,
  article = false,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    updateMeta("author", "Fasih ur Rehman");
    updateMeta("robots", "index, follow");
    updateMeta("viewport", "width=device-width, initial-scale=1");

    updateProperty("og:title", title);
    updateProperty("og:description", description);
    updateProperty("og:type", article ? "article" : "website");
    updateProperty("og:image", ogImage);
    if (canonicalUrl) {
      updateProperty("og:url", canonicalUrl);
    }

    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}

export function StructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Fasih ur Rehman",
      jobTitle: "FinTech Product Manager & Islamic Finance Advisor",
      description: "Expert FinTech Product Manager and Islamic Finance Advisor specializing in Shariah-compliant financial technology, AI/AGI, Web3, EdTech, and eCommerce solutions. Delivering innovative digital banking, payment systems, and e-commerce platforms.",
      knowsAbout: [
        "FinTech Product Management",
        "Islamic Finance",
        "Shariah-Compliant Banking",
        "Digital Banking Solutions",
        "Payment Systems",
        "E-commerce Design",
        "AI & Machine Learning",
        "Web3 & Blockchain",
        "EdTech Solutions",
        "Product Strategy",
        "Agile Methodology",
        "Digital Transformation"
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Project Management Professional (PMP)",
      },
      sameAs: [
        "https://www.linkedin.com/in/fasih-ur-rehman",
        "https://github.com/fasih-ur-rehman"
      ],
      url: typeof window !== "undefined" ? window.location.origin : "",
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}