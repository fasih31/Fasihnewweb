import { Helmet, HelmetProvider } from "react-helmet-async";

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

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
  title = "Fasih ur Rehman - FinTech PM & Islamic Finance Expert",
  description = "9+ years driving FinTech innovation across Middle East. PMP-certified Product Manager delivering Shariah-compliant BNPL, digital banking & AI solutions in Dubai, Saudi Arabia & UAE.",
  keywords = "Fasih ur Rehman, FinTech Product Manager Dubai, Islamic Finance Expert, Shariah Compliant Banking, BNPL Solutions UAE, AI Product Manager, Web3 Blockchain, EdTech Platform Development, Digital Banking Innovation, PMP Certified Professional, Agile Scrum Master, DevOps Integration, Saudi Arabia FinTech, Middle East Technology, VirtualIEC Founder, Labs360 Growth Marketing, AI Ethics Research, Quantum Resistant Security, Digital Identity Solutions, React Native Development, Azure Cloud Architecture",
  ogImage = "/og-image.png",
  canonicalUrl,
  article = false,
  schema,
}: SEOHeadProps) {
  const currentUrl = canonicalUrl || (typeof window !== "undefined" ? window.location.href : "");
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://iamfasih.com";

  return (
    <HelmetProvider>
      <Helmet>
        {/* Basic SEO - Optimized for Search Engines */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Fasih ur Rehman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Geographic and Language Targeting */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <html lang="en" />
        <link rel="alternate" hrefLang="en" href={currentUrl} />
        <link rel="alternate" hrefLang="ar" href={currentUrl} />
        <link rel="alternate" hrefLang="x-default" href={currentUrl} />

        {/* Open Graph - Enhanced Social Sharing */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={article ? "article" : "profile"} />
        <meta property="og:image" content={`${baseUrl}${ogImage}`} />
        <meta property="og:image:secure_url" content={`${baseUrl}${ogImage}`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fasih ur Rehman - FinTech Product Manager & Islamic Finance Expert" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Fasih ur Rehman - Professional Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        
        {/* Profile-specific Open Graph */}
        {!article && (
          <>
            <meta property="profile:first_name" content="Fasih" />
            <meta property="profile:last_name" content="ur Rehman" />
            <meta property="profile:username" content="fasih31" />
          </>
        )}

        {/* Twitter Card - Optimized */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Fasih31" />
        <meta name="twitter:creator" content="@Fasih31" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
        <meta name="twitter:image:alt" content="Fasih ur Rehman - FinTech & Islamic Finance Professional" />

        {/* Social Media Profiles */}
        <link rel="me" href="https://www.linkedin.com/in/fasihurrehman05" />
        <link rel="me" href="https://github.com/fasih31" />
        <link rel="me" href="https://twitter.com/Fasih31" />
        <meta property="og:see_also" content="https://www.linkedin.com/in/fasihurrehman05" />
        <meta property="og:see_also" content="https://github.com/fasih31" />
        <meta property="og:see_also" content="https://twitter.com/Fasih31" />
        <meta property="og:see_also" content="https://www.instagram.com/fasih31/" />
        <meta property="og:see_also" content="https://www.youtube.com/@fasih31" />

        {/* Additional Professional Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fasih ur Rehman" />
        <meta name="application-name" content="Fasih ur Rehman - FinTech Portfolio" />
        
        {/* Verification and Ownership */}
        <meta name="copyright" content="Fasih ur Rehman" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />

        {/* Theme Colors */}
        <meta name="theme-color" content="#0d1117" />
        <meta name="msapplication-TileColor" content="#0d1117" />
        <meta name="msapplication-navbutton-color" content="#0d1117" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
    "E-commerce Design",
    "Project Management Professional (PMP)",
    "Agile & Scrum Methodologies",
    "DevOps & CI/CD",
    "Buy Now Pay Later (BNPL)",
    "Salary Advance Solutions",
    "Ijarah (Islamic Leasing)",
    "Housing Finance",
    "Car Finance",
    "KYC & Digital Onboarding",
    "AGI Research",
    "Blockchain Architecture",
    "Quantum-Resistant Design",
    "AI-as-a-Service (AIaaS)",
    "RPA-as-a-Service (RPAaaS)",
    "Decentralized Identity (DID)",
    "React & Flutter Development",
    "Node.js Backend Systems",
    "Azure DevOps",
    "Docker & Cloud Deployment",
    "Digital Marketing & SEO",
    "Web3 Growth Marketing",
    "Crypto Marketing",
    "AI Ethics & Governance",
    "FinTech Security & Privacy",
    "Data Protection & Compliance"
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Certification",
      "name": "Project Management Professional (PMP)"
    }
  ],
  alumniOf: [
    {
      "@type": "Organization",
      "name": "IEEE"
    }
  ],
  worksFor: {
    "@type": "Organization",
    "name": "Etisalat",
    "description": "Senior Project Manager"
  },
  founder: [
    {
      "@type": "Organization",
      "name": "VirtualIEC",
      "description": "AI & Blockchain innovation ecosystem"
    },
    {
      "@type": "Organization",
      "name": "Labs360.io",
      "description": "Web3 growth marketing agency"
    }
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
  "@type": "SoftwareApplication",
  name: project.title,
  description: project.description,
  applicationCategory: "BusinessApplication",
  creator: {
    "@type": "Person",
    name: "Fasih ur Rehman"
  },
  keywords: project.technologies.join(", "),
  operatingSystem: "Web Browser"
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Product Management & Development",
  provider: {
    "@type": "Person",
    name: "Fasih ur Rehman",
    jobTitle: "FinTech Product Manager",
    url: typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk"
  },
  areaServed: ["UAE", "Saudi Arabia", "Middle East", "Global"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Product Management Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FinTech Product Development",
          description: "Islamic finance solutions, BNPL, digital banking"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & AGI Integration",
          description: "Machine learning solutions and AI-powered automation"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EdTech Solutions",
          description: "Learning management systems and educational platforms"
        }
      }
    ]
  }
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

export const getScholarlyArticleSchema = () => [
  {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "The Implications of Artificial Intelligence on Society, Ethics, and Industry",
    "author": {
      "@type": "Person",
      "name": "Fasih ur Rehman",
      "url": typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk"
    },
    "datePublished": "2023",
    "description": "Explores AI's ethical and industrial transformation across healthcare, banking, and transportation.",
    "about": ["Artificial Intelligence", "AI Ethics", "Industrial Transformation", "Society"],
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "DOI",
      "value": "10.13140/RG.2.2.17764.14727"
    },
    "url": "https://doi.org/10.13140/RG.2.2.17764.14727",
    "publisher": {
      "@type": "Organization",
      "name": "ResearchGate"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Data Defense: Examining Fintech's Security and Privacy Strategies",
    "author": {
      "@type": "Person",
      "name": "Fasih ur Rehman",
      "url": typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk"
    },
    "datePublished": "2023",
    "description": "Focuses on cybersecurity, privacy, and encryption frameworks in financial technology.",
    "about": ["FinTech", "Cybersecurity", "Data Privacy", "Encryption", "Financial Technology"],
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "DOI",
      "value": "10.3390/engproc2023032003"
    },
    "url": "https://doi.org/10.3390/engproc2023032003",
    "publisher": {
      "@type": "Organization",
      "name": "MDPI"
    }
  }
];

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

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What FinTech services does Fasih ur Rehman specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih specializes in Shariah-compliant financial technology solutions including BNPL (Buy Now Pay Later) systems, digital banking platforms, Islamic leasing (Ijarah), salary advance solutions, and housing finance products tailored for Middle Eastern markets."
      }
    },
    {
      "@type": "Question",
      name: "What is Fasih ur Rehman's experience in Islamic Finance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With 9+ years of experience, Fasih has led multiple Islamic finance product initiatives across UAE and Saudi Arabia, developing Shariah-compliant BNPL solutions, digital banking platforms, and ensuring full regulatory compliance with AAOIFI and local central bank guidelines."
      }
    },
    {
      "@type": "Question",
      name: "Which industries does Fasih ur Rehman serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih serves multiple industries including FinTech, EdTech, eCommerce, Web3, AI/AGI, and Data-as-a-Service (DaaS). Primary focus areas are financial services, educational technology platforms, and AI-powered business solutions across Middle East and global markets."
      }
    },
    {
      "@type": "Question",
      name: "What certifications and credentials does Fasih hold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih is a PMP (Project Management Professional) certified product manager with extensive training in Agile/Scrum methodologies, DevOps practices, and published research in AI ethics and FinTech security through IEEE and MDPI publications."
      }
    },
    {
      "@type": "Question",
      name: "What technologies does Fasih ur Rehman work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih has expertise in React, Flutter, Node.js, Azure DevOps, Docker, blockchain architecture, AI/ML frameworks, quantum-resistant security systems, and decentralized identity (DID) solutions. Technical stack includes modern cloud infrastructure and CI/CD pipelines."
      }
    }
  ]
});

export const getWebPageSchema = (pageName: string, pageDescription: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageName,
  description: pageDescription,
  url: typeof window !== "undefined" ? window.location.href : "https://fasih.com.pk",
  author: {
    "@type": "Person",
    name: "Fasih ur Rehman",
    url: typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk"
  },
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "Fasih ur Rehman - Professional Portfolio",
    url: typeof window !== "undefined" ? window.location.origin : "https://fasih.com.pk"
  }
});