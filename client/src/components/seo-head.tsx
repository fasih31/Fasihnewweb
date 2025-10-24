
import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  article?: boolean;
  schema?: object | object[];
}

export function SEOHead({
  title = "Fasih ur Rehman | FinTech Product Manager & AI Expert",
  description = "Expert Product Manager with 9+ years in FinTech, AI & EdTech. Specializing in Islamic Finance, digital transformation, and AI-powered solutions.",
  keywords = "Fasih ur Rehman, Product Manager, FinTech, AI, Web3, EdTech, eCommerce, Islamic Finance, Shariah Compliant, Dubai, Saudi Arabia",
  ogImage = "/og-image.png",
  canonicalUrl,
  article = false,
  schema,
}: SEOHeadProps) {
  const currentUrl = canonicalUrl || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <HelmetProvider>
      <Helmet>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Fasih ur Rehman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={article ? "article" : "website"} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Fasih ur Rehman Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:creator" content="@Fasih31" />
        <meta name="twitter:site" content="@Fasih31" />

        {/* LinkedIn */}
        <meta property="og:see_also" content="https://www.linkedin.com/in/fasihurrehman05" />
        
        {/* Additional Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fasih ur Rehman" />
        <meta name="application-name" content="Fasih ur Rehman Portfolio" />
        
        {/* Theme */}
        <meta name="theme-color" content="#0d1117" />
        <meta name="msapplication-TileColor" content="#0d1117" />

        {/* Schema.org Structured Data */}
        {schema && (
          <script type="application/ld+json">
            {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
          </script>
        )}
      </Helmet>
    </HelmetProvider>
  );
}

// Page-specific schema generators
export const getPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fasih ur Rehman",
  jobTitle: "FinTech Product Manager & Islamic Finance Advisor",
  description: "Expert Product Manager with 9+ years in FinTech, AI & EdTech. Specializing in Islamic Finance, digital transformation, and AI-powered solutions.",
  url: typeof window !== "undefined" ? window.location.origin : "",
  image: "/og-image.png",
  sameAs: [
    "https://www.linkedin.com/in/fasihurrehman05",
    "https://github.com/fasih31",
    "https://twitter.com/Fasih31",
    "https://www.instagram.com/fasih31/",
    "https://www.youtube.com/@fasih31"
  ],
  email: "fasih31@gmail.com",
  telephone: "+971-50-618-4687",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "UAE"
  },
  knowsAbout: [
    "FinTech Product Management",
    "Islamic Finance",
    "Shariah-Compliant Banking",
    "AI & Machine Learning",
    "Web3 & Blockchain",
    "EdTech Solutions",
    "E-commerce Design"
  ]
});

export const getArticleSchema = (title: string, description: string, datePublished: string, dateModified?: string, imageUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description: description,
  image: imageUrl || "/og-image.png",
  author: {
    "@type": "Person",
    name: "Fasih ur Rehman",
    url: typeof window !== "undefined" ? window.location.origin : "",
    sameAs: [
      "https://www.linkedin.com/in/fasihurrehman05",
      "https://github.com/fasih31",
      "https://twitter.com/Fasih31"
    ]
  },
  publisher: {
    "@type": "Person",
    name: "Fasih ur Rehman",
    logo: {
      "@type": "ImageObject",
      url: "/og-image.png"
    }
  },
  datePublished: datePublished,
  dateModified: dateModified || datePublished,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": typeof window !== "undefined" ? window.location.href : ""
  },
  inLanguage: "en-US"
});

export const getProjectSchema = (project: { title: string; description: string; technologies: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.title,
  description: project.description,
  creator: {
    "@type": "Person",
    name: "Fasih ur Rehman"
  },
  keywords: project.technologies.join(", ")
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Fasih ur Rehman - FinTech & AI Solutions",
  description: "Expert Product Manager specializing in FinTech, AI, Islamic Finance, and digital transformation solutions",
  url: typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk",
  logo: "/og-image.png",
  image: "/og-image.png",
  telephone: "+971-50-618-4687",
  email: "fasih31@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "UAE"
  },
  sameAs: [
    "https://www.linkedin.com/in/fasihurrehman05",
    "https://github.com/fasih31",
    "https://twitter.com/Fasih31",
    "https://www.instagram.com/fasih31/",
    "https://www.youtube.com/@fasih31"
  ],
  areaServed: ["UAE", "Saudi Arabia", "Middle East", "Global"],
  priceRange: "$$"
});
