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
  title = "Fasih ur Rehman - FinTech Product Manager | Islamic Finance & AI Expert Dubai",
  description = "Senior FinTech Product Manager with 9+ years expertise in Shariah-compliant digital banking, BNPL, AI solutions & blockchain. PMP-certified professional driving innovation across UAE, Saudi Arabia & Middle East markets.",
  keywords = "Fasih ur Rehman, FinTech Product Manager Dubai, Islamic Finance Expert UAE, Shariah Compliant Banking Solutions, BNPL Buy Now Pay Later Middle East, Digital Banking Innovation Dubai, AI Product Manager Saudi Arabia, PMP Certified Professional, Blockchain Web3 Development, EdTech Platform Solutions, Ijarah Islamic Leasing, Murabaha Finance Products, Salary Advance Solutions, Housing Finance UAE, Car Finance Islamic, KYC Digital Onboarding, Agile Scrum Product Management, DevOps CI CD Integration, React Native Flutter Development, Node.js Backend Architecture, Azure Cloud Solutions, Machine Learning AI Integration, AGI Artificial General Intelligence, Quantum Resistant Security, Decentralized Identity DID, RPA Automation Services, Data as a Service DaaS, E-commerce Product Design, Growth Marketing Strategy, Crypto Web3 Marketing, Payment Gateway Integration, Financial Technology Consulting, Digital Transformation Middle East, Fintech Regulatory Compliance AAOIFI, Central Bank UAE Saudi Compliance, Islamic Banking Technology, Neobank Digital Wallet, Mobile Banking App Development, API Integration Microservices, Cloud Infrastructure AWS Azure, Database PostgreSQL MongoDB, TypeScript JavaScript Expert, Full Stack Development, Product Strategy Roadmap, User Experience UX Design, Customer Journey Optimization, Conversion Rate Optimization, A B Testing Analytics, Data Driven Decision Making, Stakeholder Management, Cross Functional Team Leadership, Technical Product Owner, Business Analysis Requirements, Market Research Competitive Analysis, Go To Market Strategy, Product Launch Management, Feature Prioritization, Risk Management Mitigation, Security Privacy Compliance, GDPR Data Protection, Cybersecurity Best Practices, Penetration Testing QA, Performance Optimization, Scalability Architecture, High Availability Systems, Disaster Recovery Planning, Business Continuity, Innovation Digital Strategy, Emerging Technology Trends, AI Ethics Governance, Sustainable Finance ESG, Financial Inclusion, Customer Acquisition Retention, Revenue Growth Strategies, Cost Optimization, ROI Measurement, KPI Metrics Tracking, Dashboard Reporting Analytics, Predictive Analytics Forecasting, Natural Language Processing NLP, Computer Vision Applications, Deep Learning Neural Networks, TensorFlow PyTorch Frameworks, Open Source Contribution, IEEE Research Publications, Technical Writing Documentation, Presentation Public Speaking, Workshop Training Facilitation, Mentorship Coaching, Remote Team Management, Distributed Systems, Asynchronous Communication, Collaboration Tools, Project Planning Execution, Budget Management, Vendor Management, Contract Negotiation, Partnership Development, Ecosystem Building, Community Engagement, Thought Leadership, Innovation Labs R&D, Proof of Concept POC, Minimum Viable Product MVP, Lean Startup Methodology, Design Thinking, Human Centered Design, Accessibility WCAG Standards, Internationalization i18n, Localization Arabic English, Multi Currency Support, Cross Border Payments, Remittance Solutions, Foreign Exchange FX, Trading Platform Development, Investment Portfolio Management, Wealth Management Digital Advisory, Robo Advisory Services, Personal Finance Management PFM, Budgeting Tools, Expense Tracking, Credit Scoring Alternative Data, Fraud Detection Prevention, Anti Money Laundering AML, Know Your Customer KYC, Identity Verification, Biometric Authentication, Two Factor Authentication 2FA, Passwordless Login, Single Sign On SSO, OAuth OpenID Connect, API Security Token Management, Encryption Data Security, Blockchain Smart Contracts, DeFi Decentralized Finance, NFT Digital Assets, Tokenization Asset Management, Cryptocurrency Exchange, Stablecoin Development, Layer 2 Scaling Solutions, Consensus Mechanisms, Distributed Ledger Technology DLT, Supply Chain Finance, Trade Finance Solutions, Invoice Factoring, Working Capital Management, Cash Flow Optimization, Treasury Management, Risk Analytics, Credit Risk Assessment, Market Risk Management, Operational Risk Controls, Compliance Monitoring Reporting, Audit Trail Logging, Regulatory Technology RegTech, InsurTech Insurance Technology, PropTech Real Estate Technology, HealthTech Medical Finance, Embedded Finance, Banking as a Service BaaS, Platform as a Service PaaS, Software as a Service SaaS, Infrastructure as Code IaC, Continuous Integration Deployment, Test Automation Framework, Code Review Best Practices, Version Control Git GitHub, Agile Ceremonies Sprint Planning, Backlog Grooming Refinement, Daily Standup Retrospective, Kanban Board Management, Jira Confluence Tools, Slack Microsoft Teams, Documentation Knowledge Base, API Documentation Swagger, Technical Specifications, Architecture Decision Records, System Design Patterns, Microservices Architecture, Event Driven Architecture, RESTful API GraphQL, WebSocket Real Time, Server Sent Events SSE, Message Queue RabbitMQ Kafka, Redis Caching Layer, CDN Content Delivery, Load Balancing Auto Scaling, Container Orchestration Kubernetes, Docker Containerization, Serverless Lambda Functions, Edge Computing, Progressive Web Apps PWA, Mobile First Responsive Design, Cross Platform Development, Native Mobile iOS Android, Hybrid App Frameworks, React Vue Angular, State Management Redux MobX, Component Libraries Design Systems, Storybook Component Documentation, Unit Testing Integration Testing, End to End Testing Cypress, Performance Testing Load Testing, Security Testing Penetration, Accessibility Testing ARIA, Browser Compatibility Testing, Mobile Device Testing, Analytics Implementation Google Analytics, Tag Manager Data Layer, Conversion Tracking Pixels, Heatmap Session Recording, User Feedback Surveys, Customer Support Helpdesk, Live Chat Chatbot Integration, Voice of Customer VoC, Net Promoter Score NPS, Customer Satisfaction CSAT, Customer Effort Score CES, Retention Cohort Analysis, Churn Prediction Prevention, Lifetime Value LTV Calculation, Customer Acquisition Cost CAC, Marketing Attribution Modeling, SEO Search Engine Optimization, Content Marketing Strategy, Social Media Marketing, Email Marketing Automation, CRM Customer Relationship Management, Sales Funnel Optimization, Lead Generation Nurturing, Account Based Marketing ABM, Influencer Partnership Management, Brand Positioning Strategy, Corporate Communications, Crisis Management, Reputation Management, LinkedIn Thought Leadership, Twitter Social Engagement, Medium Blog Publishing, YouTube Video Content, Podcast Guest Speaking, Webinar Hosting, Conference Speaking, Networking Events, Professional Development, Continuous Learning, Online Courses Certifications, Industry Associations Membership, Volunteer Community Service, Diversity Equity Inclusion, Ethical AI Responsible Innovation, Privacy by Design, Transparency Accountability, Sustainability Green Technology, Social Impact Measurement, Corporate Social Responsibility CSR, VirtualIEC Founder CEO, Labs360 Co-founder CMO, Etisalat Senior Project Manager, Digital Transformation Leader, Product Innovation Expert, Technology Evangelist, Strategic Advisor Consultant, Board Member Advisory, Startup Mentor Angel Investor, Entrepreneurship Ecosystem Builder, Dubai UAE Based, Saudi Arabia Market Expert, Middle East MENA Focus, GCC Gulf Cooperation Council, Global International Experience, Multilingual Arabic English, Cultural Intelligence Awareness, Remote First Distributed Teams, Hybrid Work Model, Work Life Balance, Growth Mindset Adaptability, Problem Solving Critical Thinking, Creative Innovation, Results Driven Achievement Oriented, Stakeholder Influence, Executive Presence, Strategic Vision, Long Term Planning, Short Term Execution, Metrics Driven Data Informed, Customer Centric User Focused, Business Value Delivery, Technical Excellence, Quality Assurance Standards, Process Improvement Optimization, Change Management Adoption, Training Development Programs, Knowledge Sharing Culture, Documentation Best Practices, Lessons Learned Retrospectives, Continuous Improvement Kaizen, Six Sigma Lean Principles, ITIL Service Management, PRINCE2 Project Management, SAFe Scaled Agile Framework, OKR Objectives Key Results, SMART Goals Setting, Performance Management Reviews, Career Development Pathways, Talent Acquisition Hiring, Onboarding Integration, Team Building Culture, Motivation Engagement, Recognition Rewards, Compensation Benefits, Work Environment Satisfaction, Employee Experience EX, Organizational Design Structure, Reporting Lines Governance, Decision Making Authority, Escalation Procedures, Issue Resolution, Conflict Management Mediation, Negotiation Compromise, Win Win Solutions, Partnership Collaboration, Vendor Selection Procurement, Contract Management SLA, Service Level Agreements, Quality Metrics Monitoring, Incident Management Response, Problem Management Root Cause, Change Request Process, Release Management Deployment, Configuration Management Database CMDB, Asset Management Inventory, License Management Compliance, Cost Control Optimization, Budget Forecasting Planning, Financial Reporting Analysis, Profitability Revenue Growth, Market Share Expansion, Competitive Advantage Differentiation, Value Proposition Unique Selling Point, Target Market Segmentation, Buyer Persona Development, Customer Journey Mapping, Touchpoint Optimization, Omnichannel Experience, Personalization Customization, Recommendation Engines, Predictive Modeling, Data Science Analytics, Business Intelligence Dashboards, Reporting Visualization Tableau Power BI, SQL Database Queries, Python R Programming, Statistical Analysis, Hypothesis Testing, Experimentation Framework, Feature Flags Testing, Gradual Rollout Deployment, Blue Green Deployment, Canary Release Strategy, Rollback Procedures, Monitoring Observability, Logging Tracing Metrics, APM Application Performance, Infrastructure Monitoring, Alert Management Incident, On Call Rotation Support, Post Mortem Analysis, Blameless Culture Learning, Documentation Runbooks Playbooks, Disaster Recovery Testing, Business Continuity Planning, Backup Restore Procedures, Data Retention Policies, Archive Strategy Compliance, GDPR CCPA Regulations, Privacy Shield Framework, Data Sovereignty Residency, Cross Border Data Transfer, Encryption at Rest Transit, Key Management HSM, Certificate Management PKI, Secure Coding Practices, OWASP Top 10 Vulnerabilities, Code Scanning SAST DAST, Dependency Management Patching, Vulnerability Management Remediation, Threat Modeling Analysis, Security Architecture Review, Compliance Audit Preparation, SOC 2 ISO 27001 PCI DSS, Industry Standards Frameworks, Best Practices Guidelines, Reference Architecture Patterns, Technology Radar Evaluation, Build vs Buy Decisions, Proof of Value POV, Pilot Testing Validation, Phased Implementation Approach, Stakeholder Communication Plan, Change Management Strategy, Training Materials Development, User Documentation Guides, Video Tutorials Walkthroughs, FAQ Knowledge Base, Support Ticket System, Escalation Matrix Procedures, Customer Success Management, Adoption Metrics Tracking, Usage Analytics Insights, Feature Adoption Rates, User Engagement Metrics, Retention Curves Cohorts, Activation Funnel Optimization, Onboarding Experience Design, First Time User Experience FTUE, Time to Value Reduction, Aha Moment Discovery, Habit Formation Triggers, Notification Strategy Push Email SMS, In App Messaging Tooltips, Contextual Help Guidance, Progressive Disclosure Complexity, Information Architecture IA, Navigation Design Patterns, Search Functionality Filters, Sorting Ordering Options, Pagination Infinite Scroll, Lazy Loading Performance, Image Optimization Compression, Video Streaming Adaptive Bitrate, Audio Podcast Integration, File Upload Download Management, Form Design Validation, Error Handling Messages, Success Confirmation Feedback, Loading States Skeletons, Empty States Illustrations, 404 Error Pages, Maintenance Mode Pages, Offline Mode Support, Service Worker PWA, Push Notification API, Background Sync, IndexedDB Local Storage, Session Storage Cookies, OAuth Social Login, Email Verification Workflows, Password Reset Recovery, Account Management Settings, Profile Customization Preferences, Privacy Controls Permissions, Notification Preferences Center, Language Selection Switching, Currency Selection Display, Timezone Handling Conversion, Date Time Formatting Localization, Number Formatting Internationalization, RTL Right to Left Support, Accessibility Screen Readers, Keyboard Navigation Focus, Color Contrast Ratios, Text Alternatives Images, Semantic HTML Structure, ARIA Attributes Labels, Skip Links Navigation, Focus Management Modals, Form Labels Instructions, Error Announcements, Status Messages Alerts, Live Regions Updates, Mobile Touch Targets, Gesture Support Swipe, Haptic Feedback Vibration, Dark Mode Light Mode, System Theme Detection, Custom Theme Editor, Brand Guidelines Consistency, Design Tokens Variables, Component Library Maintenance, Version Control Changelog, Deprecation Strategy Migration, Breaking Changes Communication, Backward Compatibility Support, Feature Toggles Configuration, Environment Management Dev Staging Prod, Configuration Management Secrets, Infrastructure Provisioning Terraform, Cloud Cost Optimization FinOps, Reserved Instances Savings Plans, Spot Instances Preemptible, Auto Scaling Policies Rules, Resource Tagging Organization, Cost Allocation Reporting, Budget Alerts Notifications, Resource Utilization Optimization, Right Sizing Recommendations, Performance Benchmarking Testing, Capacity Planning Forecasting, Traffic Pattern Analysis, Peak Load Management, Geographic Distribution Multi Region, CDN Edge Locations, DNS Management Route 53, SSL TLS Certificate Management, WAF Web Application Firewall, DDoS Protection CloudFlare, Rate Limiting Throttling, IP Whitelisting Blacklisting, Geo Blocking Restrictions, Bot Detection Prevention, CAPTCHA reCAPTCHA Integration, Fraud Scoring Risk Rules, Transaction Monitoring Alerts, Suspicious Activity Detection, Customer Verification Enhanced Due Diligence, Sanctions Screening PEP Checks, Adverse Media Screening, Document Verification OCR, Liveness Detection Biometrics, Face Recognition Matching, Voice Biometrics Authentication, Behavioral Biometrics Analytics, Device Fingerprinting Tracking, Location Based Services GPS, Geofencing Proximity Marketing, Beacon Technology Integration, QR Code Generation Scanning, NFC Near Field Communication, Contactless Payments Tap to Pay, Digital Wallet Integration Apple Pay Google Pay, Payment Method Tokenization, PCI Compliance Level 1, Card Not Present CNP Transactions, 3D Secure Authentication, Strong Customer Authentication SCA, Open Banking PSD2 Compliance, Account Aggregation Data Sharing, Consent Management Revocation, API Rate Limiting Quotas, Developer Portal Documentation, SDK Library Maintenance, Code Samples Examples, Postman Collections Testing, Webhook Event Notifications, Retry Logic Idempotency, API Versioning Strategy, Backward Compatible Changes, Sunset Deprecated Endpoints, Migration Guides Documentation, Client Library Updates, Status Page Uptime Monitoring, Incident Communication Transparency, SLA Credits Compensation, Service Credits Policy, Terms of Service Agreement, Privacy Policy GDPR Compliant, Cookie Consent Banner, Data Processing Agreement DPA, Subprocessor Transparency List, Security Whitepaper Documentation, Compliance Certifications Badges, Trust Center Transparency Reports, Bug Bounty Program Security Researchers, Responsible Disclosure Policy, Coordinated Vulnerability Disclosure CVD, Patch Management Timeline, Security Advisory Notifications, Third Party Security Assessments, Vendor Risk Management Due Diligence, Supply Chain Security Software Bill of Materials SBOM, Open Source License Compliance, Dependency Vulnerability Scanning, Container Image Scanning, Infrastructure as Code Security, Cloud Security Posture Management CSPM, Identity Access Management IAM, Role Based Access Control RBAC, Attribute Based Access Control ABAC, Just in Time Access JIT, Privileged Access Management PAM, Multi Factor Authentication MFA, Single Sign On Federation, SAML OpenID Connect, Directory Services LDAP Active Directory, User Provisioning Deprovisioning, Access Review Certification, Segregation of Duties SOD, Least Privilege Principle, Zero Trust Security Model, Network Segmentation Microsegmentation, Virtual Private Cloud VPC, Security Groups Network ACLs, Firewall Rules Policies, Intrusion Detection Prevention IDS IPS, Security Information Event Management SIEM, Log Aggregation Centralization, Threat Intelligence Feeds, Indicators of Compromise IOC, Security Orchestration Automation Response SOAR, Incident Response Playbooks, Forensics Investigation Tools, Evidence Collection Preservation, Chain of Custody Documentation, Legal Hold eDiscovery, Compliance Reporting Dashboards, Audit Trail Immutable Logs, Blockchain Audit Ledger, Smart Contract Audit Security, Code Review Security Focus, Static Application Security Testing, Dynamic Application Security Testing, Interactive Application Security Testing IAST, Runtime Application Self Protection RASP, Software Composition Analysis SCA, Infrastructure Vulnerability Scanning, Penetration Testing Ethical Hacking, Red Team Blue Team Exercises, Security Awareness Training Phishing Simulations, Social Engineering Defense, Password Hygiene Best Practices, Security Champions Program, DevSecOps Integration Culture, Shift Left Security Early Testing, Security as Code Automation, Policy as Code Enforcement, Compliance as Code Validation, Security Metrics Reporting KPIs, Mean Time to Detect MTTD, Mean Time to Respond MTTR, Mean Time to Remediate, Security Debt Management Prioritization, Risk Based Vulnerability Management, Threat Modeling STRIDE DREAD, Attack Surface Reduction, Defense in Depth Layered Security, Security by Design Architecture, Privacy by Design GDPR Principles, Data Minimization Collection, Purpose Limitation Usage, Storage Limitation Retention, Accuracy Data Quality, Integrity Confidentiality Security, Availability Resilience Business Continuity, Accountability Governance Oversight",
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