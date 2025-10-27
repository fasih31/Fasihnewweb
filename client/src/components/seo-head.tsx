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
  title = "Fasih ur Rehman - FinTech PM | Islamic Finance, E-commerce, EdTech, Telecom & AI Expert",
  description = "Senior Product Manager with 9+ years expertise in FinTech, Islamic Finance, Shariah-compliant E-commerce, EdTech platforms, DaaS, SaaS, Telecom solutions, AI/Crypto research & Web3. PMP-certified driving digital transformation across UAE, Saudi Arabia & Middle East.",
  keywords = "Fasih ur Rehman, FinTech Product Manager Dubai UAE, Islamic Finance Expert Saudi Arabia, Shariah Compliant E-commerce Solutions, Islamic Banking Digital Transformation, BNPL Buy Now Pay Later Middle East, Halal E-commerce Platform Development, EdTech Education Technology Solutions, Learning Management System LMS, DaaS Device as a Service, SaaS Software as a Service, Telecom Telecommunications Product Management, AI Artificial Intelligence Research, Crypto Cryptocurrency Blockchain, Web3 Decentralized Applications, Digital Banking Innovation Dubai, AI Product Manager Saudi Arabia, PMP Certified Professional, Blockchain Web3 Development, EdTech Platform Solutions, Islamic Leasing Ijarah, Murabaha Finance Products, Salary Advance Solutions, Housing Finance UAE, Car Finance Islamic, E-commerce Product Design, Shopify WooCommerce Expert, Payment Gateway Integration, Multi-vendor Marketplace, Subscription E-commerce Models, Digital Wallet Solutions, Mobile Commerce mCommerce, Conversion Rate Optimization CRO, Shopping Cart Optimization, Product Recommendation Engines, Inventory Management Systems, Order Fulfillment Logistics, Dropshipping Solutions, Affiliate Marketing Programs, Customer Retention Strategies, Personalization AI Driven, Omnichannel Retail Strategy, Point of Sale POS Integration, Augmented Reality AR Shopping, Virtual Try-On Technology, Voice Commerce Alexa Google, Social Commerce Instagram Facebook, Live Shopping Streaming, Influencer E-commerce Partnerships, Customer Reviews Management, Trust Badges Security Seals, Abandoned Cart Recovery, Email Marketing Automation, SMS Marketing Campaigns, Push Notification Strategy, Loyalty Programs Rewards, Referral Marketing Systems, Flash Sales Limited Offers, Dynamic Pricing Strategies, Cross-selling Upselling Tactics, Product Bundling Strategies, Gift Cards Vouchers Management, Wishlist Favorites Features, Size Guides Fit Finders, Shipping Cost Calculator, Return Policy Management, Customer Service Chatbots, Live Chat Support, FAQ Knowledge Base, Product Comparison Tools, Advanced Search Filters, Faceted Navigation, Category Management, Product Catalog Design, SEO Optimized Listings, Rich Snippets Schema Markup, Google Shopping Feed, Facebook Pixel Integration, Google Analytics E-commerce, Heatmap User Behavior, A/B Testing Experimentation, Landing Page Optimization, Mobile App Development, Progressive Web App PWA, App Store Optimization ASO, In-App Purchases, Mobile Wallet Integration, QR Code Payments, Contactless Payment Solutions, Buy Online Pickup in Store BOPIS, Ship from Store Fulfillment, Same-Day Delivery Services, Subscription Box Services, Membership E-commerce, B2B E-commerce Portals, Wholesale Trading Platforms, White Label Solutions, Multi-language Support, Multi-currency Payment, International Shipping, Cross-Border E-commerce, Tax Compliance VAT GST, GDPR Privacy Compliance, PCI DSS Security Standards, SSL Certificate HTTPS, Two-Factor Authentication 2FA, Fraud Detection Prevention, Chargeback Management, Payment Reconciliation, Financial Reporting Dashboard, Supplier Management Portal, Vendor Performance Metrics, Procurement Automation, Contract Management System, Educational Technology EdTech, Online Learning Platforms, Virtual Classroom Software, Student Information Systems SIS, Course Management Systems, Assessment Testing Tools, Gamification Learning, Adaptive Learning AI, Microlearning Platforms, Corporate Training LMS, Compliance Training Systems, Certification Programs, Video Conferencing Integration, Screen Sharing Collaboration, Interactive Whiteboard Tools, Discussion Forums Community, Assignment Submission Grading, Progress Tracking Analytics, Learning Analytics Dashboard, Student Engagement Metrics, Attendance Management, Grade Book Systems, Parent Portal Communication, Mobile Learning Apps, Offline Learning Support, SCORM LTI Standards, Content Authoring Tools, Question Bank Management, Automated Grading Systems, Plagiarism Detection, Proctoring Solutions Remote, Certificate Generation, Badge Credential Systems, Learning Path Recommendations, Personalized Learning Plans, Skill Gap Analysis, Career Development Tools, Job Placement Services, Alumni Network Platform, Telecom Product Management, Network Infrastructure Solutions, 5G Technology Implementation, IoT Internet of Things, M2M Machine to Machine, VoIP Voice over IP, Unified Communications UC, Contact Center Solutions, Call Center Software, IVR Interactive Voice Response, SMS Gateway Services, Messaging Platforms WhatsApp, Mobile Virtual Network Operator MVNO, eSIM Digital SIM, Mobile Device Management MDM, Network Security Solutions, SD-WAN Software Defined WAN, Cloud Communications, CPaaS Communication Platform, API Integration Services, Number Portability Management, Billing Rating Systems, Revenue Assurance, Fraud Management Telecom, Customer Relationship Management CRM, Order Management Provisioning, Service Activation Automation, Network Monitoring Tools, Quality of Service QoS, Service Level Agreement SLA, Disaster Recovery Planning, Business Continuity Telecom, Regulatory Compliance Telecom, Spectrum Management, License Management, Interconnection Agreements, Roaming Agreements, Number Management, Emergency Services E911, Caller ID Management, Call Recording Compliance, Data Privacy Regulations, Device as a Service DaaS, Hardware as a Service HaaS, Endpoint Management, Asset Lifecycle Management, Device Procurement, Configuration Management, Remote Monitoring Management RMM, Patch Management Automation, Antivirus Endpoint Protection, Data Backup Recovery, Cloud Storage Solutions, Desktop Virtualization VDI, Application Virtualization, Zero Trust Security, Identity Access Management IAM, Single Sign-On SSO, Multi-Factor Authentication MFA, Privileged Access Management PAM, Security Operations Center SOC, Incident Response Management, Threat Intelligence Platform, Vulnerability Management, Compliance Automation, IT Service Management ITSM, Help Desk Ticketing, Knowledge Management System, Change Management ITIL, Problem Management, Service Catalog, Asset Discovery Inventory, Software License Optimization, Cost Allocation Chargeback, FinOps Cloud Cost Management, Cryptocurrency Trading Platforms, Blockchain Smart Contracts, DeFi Decentralized Finance, NFT Non-Fungible Tokens, Tokenization Asset Management, Crypto Wallet Development, Exchange Platform Development, Liquidity Pool Management, Yield Farming Staking, DAO Decentralized Autonomous Organizations, Web3 Identity Solutions, Metaverse Virtual Worlds, Play-to-Earn Gaming, GameFi Blockchain Gaming, Social Tokens Creator Economy, Layer 2 Scaling Solutions, Ethereum Polygon Solana, Binance Smart Chain BSC, Cross-Chain Bridges, Consensus Mechanisms Proof of Stake, Mining Pool Management, Crypto Payment Gateway, Merchant Services Crypto, Regulatory Compliance Crypto, AML KYC Crypto, Tax Reporting Crypto, Portfolio Management Crypto, Trading Bots Algorithms, Technical Analysis Indicators, Market Making Strategies, Arbitrage Opportunities, Derivatives Futures Options, Margin Trading Leverage, Stop Loss Take Profit, Risk Management Trading, AI Machine Learning, Natural Language Processing NLP, Computer Vision Recognition, Deep Learning Neural Networks, Reinforcement Learning, Generative AI ChatGPT, Large Language Models LLM, AI Model Training Deployment, MLOps Machine Learning Operations, Data Science Analytics, Predictive Analytics Forecasting, Sentiment Analysis, Recommendation Systems, Anomaly Detection, Time Series Analysis, Statistical Modeling, Python R Programming, TensorFlow PyTorch Keras, Scikit-learn XGBoost, Data Preprocessing Cleaning, Feature Engineering Selection, Model Evaluation Metrics, Hyperparameter Tuning, Cross-Validation Techniques, Ensemble Methods, AutoML Automated ML, Explainable AI XAI, AI Ethics Bias Mitigation, Responsible AI Governance, Data Privacy AI, Federated Learning, Edge AI Computing, AI Hardware GPU TPU, AI Research Publications IEEE, KYC Digital Onboarding, Agile Scrum Product Management, DevOps CI CD Integration, React Native Flutter Development, Node.js Backend Architecture, Azure AWS Cloud Solutions, Docker Kubernetes Containerization, Microservices Architecture, API Development RESTful GraphQL, Database Design PostgreSQL MongoDB, Redis Caching Optimization, Message Queue Kafka RabbitMQ, Serverless Lambda Functions, Infrastructure as Code Terraform, Monitoring Observability Grafana, Log Management ELK Stack, Performance Testing JMeter, Security Testing Penetration, Code Review Best Practices, Version Control Git GitHub, Agile Ceremonies Sprint Planning, Kanban Scrum Methodologies, Jira Confluence Atlassian, Product Roadmap Strategy, Stakeholder Management, User Experience UX Design, User Interface UI Design, Design Thinking Workshops, Customer Journey Mapping, Personas User Stories, Wireframing Prototyping Figma, Usability Testing Research, Accessibility WCAG Compliance, Internationalization i18n, Localization Arabic English, Growth Marketing Strategy, SEO Search Engine Optimization, Content Marketing Strategy, Social Media Marketing, LinkedIn Thought Leadership, Twitter Engagement, Medium Blog Publishing, YouTube Video Content, Influencer Marketing, Brand Positioning Strategy, Corporate Communications, Crisis Management PR, Reputation Management Online, Customer Acquisition CAC, Lifetime Value LTV, Retention Cohort Analysis, Churn Prediction Prevention, Revenue Growth Strategies, Cost Optimization Efficiency, ROI Measurement KPIs, OKR Objectives Key Results, Performance Management Reviews, Team Leadership Management, Remote Team Collaboration, Cross-Functional Coordination, Vendor Management Procurement, Contract Negotiation, Partnership Development, Ecosystem Building, Community Engagement, Thought Leadership, Innovation Labs R&D, Proof of Concept POC, Minimum Viable Product MVP, Lean Startup Methodology, VirtualIEC Founder CEO, Labs360 Co-founder CMO, Etisalat Senior Project Manager, Digital Transformation Leader, Product Innovation Expert, Technology Evangelist, Strategic Advisor Consultant, Startup Mentor Investor, Entrepreneurship Ecosystem Builder, Dubai UAE Based Professional, Saudi Arabia Market Expert, Middle East MENA Region, GCC Gulf Cooperation Council, Global International Experience, Multilingual Arabic English, Cultural Intelligence Awareness, Professional Certifications PMP, IEEE Member Researcher, Published Research Papers, Conference Speaker, Workshop Facilitator, Mentorship Coaching Programs",
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
  serviceType: "Product Management & Digital Solutions",
  provider: {
    "@type": "Person",
    name: "Fasih ur Rehman",
    jobTitle: "Senior Product Manager - FinTech, E-commerce, EdTech, Telecom & AI",
    url: typeof window !== "undefined" ? window.location.origin : "https://iamfasih.com"
  },
  areaServed: ["UAE", "Saudi Arabia", "Middle East", "Global"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Comprehensive Product Management Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FinTech & Islamic Finance Solutions",
          description: "Digital banking, BNPL, Shariah-compliant products, salary advance, housing & car finance"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce Platform Development",
          description: "Halal marketplaces, multi-vendor platforms, payment gateways, conversion optimization"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "EdTech Learning Platforms",
          description: "Learning management systems, virtual classrooms, student engagement tools"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DaaS & SaaS Solutions",
          description: "Device management, software services, cloud infrastructure, subscription models"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Telecom Product Management",
          description: "5G solutions, VoIP, cloud communications, IoT connectivity, mobile networks"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI & Machine Learning Integration",
          description: "NLP, computer vision, generative AI, predictive analytics, ML automation"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Crypto & Web3 Development",
          description: "Blockchain platforms, DeFi protocols, NFT marketplaces, smart contracts, crypto trading"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Research & Innovation",
          description: "AI ethics research, FinTech security, emerging technology consulting"
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