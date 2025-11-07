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
  title = "Fasih ur Rehman | FinTech PM & Islamic Finance",
  description = "Expert FinTech Product Manager with 9+ years in Islamic Finance, BNPL, Digital Banking & AI. Delivering transformation across UAE & Middle East.",
  keywords = "Fasih ur Rehman, Product Manager Dubai, FinTech, Islamic Finance, E-commerce, EdTech, DaaS, SaaS, Telecom, AI, Crypto, Web3, Blockchain, Shariah Compliant, Digital Transformation, UAE, Saudi Arabia, BNPL, Murabaha, Ijarah, Takaful, Islamic Banking, Halal Finance, PMP Certified",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="canonical" href={canonicalUrl || currentUrl} />

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

        {/* Industry & Expertise Tags */}
        <meta name="industry" content="Financial Technology, Islamic Finance, Product Management" />
        <meta name="category" content="FinTech, Banking, Technology, Consulting" />
        <meta name="profession" content="Product Manager, Technology Consultant" />
        <meta name="expertise" content="Shariah Compliance, Digital Banking, BNPL, AI Solutions" />

        {/* Additional Professional Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fasih ur Rehman" />
        <meta name="application-name" content="Fasih ur Rehman - FinTech Portfolio" />
        
        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/favicon.png" as="image" />
        
        {/* Webmaster Verification Tags */}
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE_PLACEHOLDER" />
        <meta name="msvalidate.01" content="BING_VERIFICATION_CODE_PLACEHOLDER" />
        <meta name="yandex-verification" content="YANDEX_VERIFICATION_CODE_PLACEHOLDER" />
        
        {/* Facebook Pixel - Add your pixel ID when ready */}
        {typeof window !== "undefined" && (
          <script dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID_HERE');
              fbq('track', 'PageView');
            `
          }} />
        )}

        {/* Rich Snippet Enhancement */}
        <meta name="page-topic" content="FinTech Product Management and Islamic Finance Solutions" />
        <meta name="page-type" content="Professional Portfolio, Business Profile" />
        <meta name="audience" content="Business Professionals, Investors, Recruiters, Entrepreneurs" />
        <meta name="revisit-after" content="7 days" />

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
  jobTitle: "Senior Product Manager - FinTech, E-commerce, EdTech, Telecom, AI & Crypto",
  description: "Versatile Product Manager with 9+ years delivering innovative solutions across FinTech, Islamic Finance, Shariah-compliant E-commerce, EdTech platforms, DaaS, SaaS, Telecom, AI research, and Crypto/Web3. Driving digital transformation and business growth across Middle East and global markets.",
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
    "Islamic Finance & Banking",
    "Shariah-Compliant Solutions",
    "E-commerce Platform Development",
    "Halal E-commerce Marketplaces",
    "Digital Commerce Strategy",
    "Multi-vendor Marketplaces",
    "Payment Gateway Integration",
    "Shopping Cart Optimization",
    "EdTech Education Technology",
    "Learning Management Systems (LMS)",
    "Virtual Classroom Platforms",
    "Online Course Development",
    "Student Engagement Tools",
    "Educational Assessment Systems",
    "DaaS (Device as a Service)",
    "SaaS (Software as a Service)",
    "Telecom Product Management",
    "Telecommunications Solutions",
    "5G Network Technology",
    "VoIP & Cloud Communications",
    "Mobile Network Solutions",
    "IoT & M2M Connectivity",
    "AI & Machine Learning",
    "Artificial Intelligence Research",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Deep Learning & Neural Networks",
    "Generative AI & LLMs",
    "Cryptocurrency & Blockchain",
    "Web3 Decentralized Applications",
    "DeFi (Decentralized Finance)",
    "NFT & Digital Assets",
    "Smart Contract Development",
    "Crypto Trading Platforms",
    "Buy Now Pay Later (BNPL)",
    "Digital Banking Solutions",
    "Mobile Banking Apps",
    "Salary Advance Products",
    "Ijarah (Islamic Leasing)",
    "Murabaha Financing",
    "Housing & Car Finance",
    "KYC & Digital Onboarding",
    "Project Management Professional (PMP)",
    "Agile & Scrum Methodologies",
    "DevOps & CI/CD",
    "React & Flutter Development",
    "Node.js Backend Systems",
    "Azure & AWS Cloud Solutions",
    "Docker & Kubernetes",
    "Microservices Architecture",
    "API Development & Integration",
    "Database Design & Management",
    "Security & Compliance",
    "Data Privacy & Protection",
    "Digital Transformation",
    "Product Strategy & Roadmapping",
    "User Experience (UX) Design",
    "Growth Marketing & SEO",
    "Stakeholder Management",
    "Team Leadership",
    "Innovation & R&D"
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

export function getArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://iamfasih.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fasih ur Rehman",
      "logo": {
        "@type": "ImageObject",
        "url": "https://iamfasih.com/og-image.png"
      }
    },
    ...(article.image && {
      "image": {
        "@type": "ImageObject",
        "url": article.image
      }
    })
  };
}

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

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Product Management & Technology Consulting",
  provider: {
    "@type": "Person",
    name: "Fasih ur Rehman",
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
          name: "FinTech Product Management",
          description: "End-to-end product management for financial technology solutions including Islamic finance, BNPL, digital banking"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce Platform Development",
          description: "Shariah-compliant e-commerce platforms, multi-vendor marketplaces, and payment solutions"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EdTech Solutions",
          description: "Learning management systems, virtual classrooms, and educational technology platforms"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Blockchain Solutions",
          description: "Artificial intelligence research, machine learning, Web3 applications, and blockchain development"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Telecom & SaaS",
          description: "Telecommunications product management, DaaS, and SaaS platform development"
        }
      }
    ]
  }
});

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What industries and domains does Fasih ur Rehman specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih specializes in multiple domains including FinTech, Islamic Finance, E-commerce (especially Shariah-compliant marketplaces), EdTech learning platforms, DaaS (Device as a Service), SaaS solutions, Telecommunications, AI research, and Cryptocurrency/Web3 development. He delivers comprehensive product management and development services across all these sectors."
      }
    },
    {
      "@type": "Question",
      name: "What FinTech and Islamic Finance solutions does Fasih offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih develops Shariah-compliant financial products including BNPL (Buy Now Pay Later), digital banking platforms, Islamic leasing (Ijarah), Murabaha financing, salary advance solutions, housing finance, car finance, KYC/digital onboarding systems, and mobile banking applications - all compliant with AAOIFI and regional central bank regulations."
      }
    },
    {
      "@type": "Question",
      name: "What E-commerce expertise does Fasih ur Rehman have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih specializes in building Halal e-commerce platforms, multi-vendor marketplaces, payment gateway integrations, shopping cart optimization, product recommendation engines, conversion rate optimization, mobile commerce solutions, and Shariah-compliant payment systems for online retail businesses."
      }
    },
    {
      "@type": "Question",
      name: "What EdTech and learning solutions does Fasih provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih develops comprehensive EdTech solutions including Learning Management Systems (LMS), virtual classroom platforms, student information systems, online course management, assessment tools, gamification features, mobile learning apps, and AI-powered adaptive learning platforms."
      }
    },
    {
      "@type": "Question",
      name: "What Telecom and DaaS services does Fasih offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih provides telecom product management including 5G solutions, VoIP/cloud communications, IoT connectivity, mobile network solutions, and Device as a Service (DaaS) offerings with endpoint management, asset lifecycle management, and cloud infrastructure services."
      }
    },
    {
      "@type": "Question",
      name: "What AI and Crypto expertise does Fasih bring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fasih conducts AI research and develops machine learning solutions (NLP, computer vision, generative AI). In crypto/Web3, he builds blockchain platforms, DeFi protocols, NFT marketplaces, smart contracts, cryptocurrency trading platforms, and decentralized applications. He also publishes research on AI ethics and FinTech security."
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