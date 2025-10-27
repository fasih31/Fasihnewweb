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
  title = "Fasih ur Rehman - FinTech Product Manager | Islamic Finance Expert | BNPL Murabaha Ijarah Specialist Dubai UAE",
  description = "Expert FinTech Product Manager with 9+ years specializing in Shariah-compliant solutions: BNPL (Buy Now Pay Later), Murabaha finance, Ijarah leasing, Salam contracts, Qard Hasan, housing finance, car finance, Takaful insurance, P2P lending, DaaS, SaaS, EdTech, AI/AGI, blockchain & telecom across UAE, Saudi Arabia & GCC markets. PMP-certified driving Islamic banking innovation.",
  keywords = "Fasih ur Rehman, Islamic Finance Expert, Shariah Compliant FinTech, BNPL Buy Now Pay Later, Murabaha Finance, Ijarah Leasing, Diminishing Musharakah, Salam Forward Contract, Istisna Manufacturing Finance, Qard Hasan Interest Free Loan, Takaful Islamic Insurance, Sukuk Islamic Bonds, Wakala Agency Contract, Wakalah Investment, Kafalah Guarantee, Hawala Money Transfer, Riba Free Banking, Halal Finance Solutions, Islamic Banking Products, Shariah Advisory Board, AAOIFI Standards Compliance, Islamic Finance Structuring, Fatwa Compliance, Shariah Audit, Islamic Economics, Maqasid al-Shariah, Fiqh al-Muamalat, Islamic Commercial Law, Housing Finance UAE, Home Finance Ijarah, Diminishing Musharakah Home Loan, Islamic Mortgage Dubai, Shariah Compliant Property Finance, Real Estate Islamic Finance, Car Finance Islamic UAE, Vehicle Ijarah Lease, Auto Murabaha Dubai, Islamic Car Leasing Saudi, Halal Vehicle Finance, Takaful Motor Insurance, Takaful Family Protection, Takaful Medical Insurance, Takaful Life Coverage, Cooperative Insurance Islamic, Tabarru Donation Pool, Surplus Distribution Takaful, Retakaful Reinsurance, P2P Lending Islamic, Peer to Peer Shariah Finance, Crowdfunding Islamic, Profit Loss Sharing Musharakah, Equity Based Financing, Partnership Islamic Finance, Salary Advance Qard Hasan, Payroll Finance Islamic, Employee Advance Shariah, Instant Salary UAE, Wage Access Solutions, SME Finance Islamic, Small Business Murabaha, Working Capital Ijarah, Invoice Financing Shariah, Trade Finance Islamic, Export Finance Murabaha, Import Finance Ijarah, Documentary Credit Islamic, Letter of Credit Halal, Commodity Murabaha, Gold Murabaha Trading, Metal Trading Islamic, Currency Exchange Halal, Forex Islamic Trading, Cryptocurrency Halal, Bitcoin Shariah Ruling, Blockchain Islamic Finance, Smart Contracts Halal, DeFi Decentralized Islamic Finance, NFT Islamic Perspective, Digital Assets Shariah, Tokenization Islamic Finance, Stablecoin Halal Currency, Islamic Wealth Management, Shariah Portfolio Management, Halal Investment Funds, Islamic Asset Management, Waqf Endowment Management, Zakat Calculation Platform, Sadaqah Charity Platform, Qurbani Donation System, Halal Stock Screening, Shariah Equity Funds, Islamic Index Funds, Sukuk Investment Platform, Islamic Treasury Management, Cash Management Shariah, Liquidity Management Islamic, FinTech Product Manager Dubai, Senior Product Manager UAE, PMP Certified Professional, Agile Scrum Master, DevOps Integration Specialist, Full Stack Developer Islamic Finance, React Native Islamic Apps, Flutter Mobile Development, Node.js Backend Islamic Platform, Azure Cloud Islamic Banking, AWS FinTech Solutions, Database Design Islamic Finance, PostgreSQL MongoDB Expert, TypeScript JavaScript Islamic Apps, API Integration Islamic Banking, Microservices Architecture FinTech, RESTful API Islamic Finance, GraphQL FinTech Platform, WebSocket Real Time Trading, Payment Gateway Islamic, Digital Wallet Shariah Compliant, Mobile Banking Islamic App, Neobank Shariah Platform, Digital Banking Transformation, Open Banking Islamic, PSD2 Compliance UAE, KYC Digital Onboarding, AML Anti Money Laundering, Fraud Detection Islamic Banking, Biometric Authentication Islamic, Two Factor Authentication 2FA, Passwordless Login Islamic App, OAuth Islamic Platform, Encryption Islamic Banking, Cybersecurity Shariah Finance, Data Protection GDPR Islamic, Privacy Islamic Banking, AI Artificial Intelligence Islamic Finance, Machine Learning FinTech, AGI Artificial General Intelligence, Natural Language Processing Arabic, Computer Vision Islamic Apps, Deep Learning Financial Models, TensorFlow Islamic Finance, PyTorch FinTech Applications, Predictive Analytics Islamic Banking, Credit Scoring Shariah Compliant, Risk Assessment Islamic Finance, Fraud Prediction AI Islamic, Chatbot Islamic Banking, Voice Assistant Halal Finance, RPA Robotic Process Automation Islamic, Automation Islamic Banking, Workflow Automation FinTech, Business Process Management Islamic, DaaS Device as a Service UAE, SaaS Software as a Service Islamic, BaaS Banking as a Service Shariah, PaaS Platform as a Service FinTech, IaaS Infrastructure Cloud Islamic, EdTech Educational Technology Islamic, Learning Management System LMS, E-Learning Platform Shariah, Online Courses Islamic Finance, Digital Classroom UAE, Student Management System, Educational Apps Islamic, Gamification Learning Islamic, Adaptive Learning AI, Personalized Education Platform, E-commerce Shariah Compliant, Online Marketplace Halal, Digital Store Islamic, Payment Processing Halal, Checkout Optimization Islamic, Conversion Rate E-commerce, Product Recommendations AI, Inventory Management Islamic, Supply Chain Halal, Logistics Management UAE, Delivery Tracking System, Order Fulfillment Platform, Customer Relationship Management CRM, Sales Funnel Islamic Business, Marketing Automation Halal, Email Marketing Islamic, Social Media Marketing Halal, Content Marketing Islamic Finance, SEO Search Engine Optimization, Google Analytics Islamic Site, Digital Marketing Dubai, Growth Hacking FinTech, User Acquisition Islamic App, Retention Strategy Mobile App, Customer Lifetime Value LTV, Churn Reduction Islamic Platform, Telecom Telecommunications UAE, Mobile Network Solutions, 5G Technology Implementation, IoT Internet of Things Islamic, Smart City Dubai Solutions, Digital Transformation Telecom, Network Infrastructure Management, Cloud Telephony Solutions, VoIP Islamic Business, Unified Communications Platform, Contact Center Solutions, Customer Service Platform, Help Desk Ticketing System, Live Chat Support Islamic, WhatsApp Business Integration, SMS Gateway Islamic, Push Notifications Mobile App, Email Notifications Platform, Notification Management System, VirtualIEC Founder CEO, Labs360 Co-founder CMO, Etisalat Senior Project Manager, Digital Innovation Leader UAE, Technology Consultant Dubai, Startup Advisor Middle East, Angel Investor FinTech, Entrepreneurship Ecosystem, Business Mentor UAE, Strategy Consultant Islamic Finance, Product Strategy Roadmap, Go to Market Strategy, Business Model Canvas, Value Proposition Design, Customer Discovery Research, Market Analysis UAE, Competitive Intelligence FinTech, SWOT Analysis Islamic Finance, Porter Five Forces, Business Case Development, ROI Return on Investment, KPI Key Performance Indicators, OKR Objectives Key Results, Balanced Scorecard, Dashboard Analytics Islamic, Data Visualization FinTech, Business Intelligence Islamic, Reporting Analytics Platform, Excel Financial Modeling, PowerBI Islamic Dashboard, Tableau Data Visualization, SQL Data Analysis, Python Data Science, R Statistical Analysis, Stakeholder Management UAE, Executive Presentation Skills, Board Communication, Investor Relations FinTech, Fundraising Islamic Startup, Venture Capital Pitch, Due Diligence Islamic Finance, Term Sheet Negotiation, Cap Table Management, Equity Distribution Startup, Corporate Governance Islamic, Compliance Regulatory FinTech, Central Bank UAE Regulations, DFSA Dubai Financial Services, ADGM Abu Dhabi Global Market, DIFC Dubai International Finance, Saudi Central Bank SAMA, Bahrain Central Bank CBB, Qatar Financial Centre QFC, Oman Capital Market Authority, Kuwait Central Bank CBK, GCC Gulf Cooperation Council, MENA Middle East North Africa, Cross Border Payments Islamic, Remittance Halal Solutions, Foreign Exchange Islamic, Multi Currency Platform, International Money Transfer, Swift Payment Islamic, IBAN Integration Platform, ACH Automated Clearing House, SEPA Payment Integration, ISO 20022 Standards, Payment Card Industry PCI DSS, EMV Chip Card Technology, Contactless Payment NFC, QR Code Payment Islamic, Mobile Wallet Islamic UAE, Apple Pay Google Pay Integration, Samsung Pay Integration, Digital Currency CBDC, Central Bank Digital Currency, E-Dirham UAE CBDC, Project Aber Saudi UAE, Blockchain Consortium GCC, Hyperledger Islamic Finance, Ethereum Smart Contracts, Solidity Development Islamic, Web3 Decentralized Apps, DApp Islamic Finance, Metaverse Islamic Applications, Virtual Reality Islamic Education, Augmented Reality AR Shopping, Mixed Reality MR Training, Quantum Computing Finance, Quantum Resistant Cryptography, Post Quantum Security, Zero Knowledge Proofs, Homomorphic Encryption, Secure Multi Party Computation, Federated Learning Privacy, Differential Privacy Islamic Data, Data Sovereignty UAE, Cloud Security Islamic Banking, Infrastructure Security FinTech, Application Security Islamic App, Network Security Platform, Endpoint Security Management, Identity Access Management IAM, Single Sign On SSO Islamic, Privileged Access Management, Zero Trust Architecture, Security Operations Center SOC, Incident Response Islamic Banking, Disaster Recovery Planning, Business Continuity Management, Backup Recovery Solutions, High Availability Systems, Fault Tolerance Platform, Load Balancing Islamic Apps, Auto Scaling Cloud Islamic, Performance Optimization FinTech, Latency Reduction Platform, Caching Strategy Redis, CDN Content Delivery Network, Edge Computing Islamic Apps, Serverless Architecture AWS, Lambda Functions Islamic Platform, Container Orchestration Kubernetes, Docker Microservices Islamic, CI CD Continuous Integration, Jenkins Pipeline Islamic Platform, GitLab DevOps Islamic, GitHub Actions Automation, Code Quality SonarQube, Unit Testing Jest, Integration Testing Cypress, E2E Testing Selenium, Performance Testing JMeter, Load Testing Gatling, Stress Testing Islamic Platform, Penetration Testing Ethical Hacking, Vulnerability Assessment VAPT, Security Audit Islamic Banking, Code Review Best Practices, Pair Programming Agile, Technical Documentation Islamic, API Documentation Swagger, User Manual Islamic App, Training Material Development, Video Tutorial Creation, Webinar Hosting Islamic Finance, Conference Speaking FinTech, Thought Leadership Islamic Banking, LinkedIn Publishing Islamic Finance, Medium Blogging FinTech, Twitter Social Media Islamic, Instagram Marketing Halal Business, YouTube Channel Islamic Finance, Podcast Islamic Economics, IEEE Research Publications, Academic Papers Islamic Finance, White Paper FinTech, Case Study Islamic Banking, Success Story Customer, Testimonial Management Platform, Reviews Rating System, NPS Net Promoter Score, CSAT Customer Satisfaction, CES Customer Effort Score, Voice of Customer VoC, User Experience UX Islamic, User Interface UI Design, Human Computer Interaction, Usability Testing Islamic App, A B Testing Platform, Multivariate Testing FinTech, Personalization Engine Islamic, Recommendation System AI, Search Optimization Islamic, Autocomplete Search Arabic, Faceted Navigation E-commerce, Filter Sort Islamic Products, Pagination Infinite Scroll, Lazy Loading Images, Progressive Web App PWA Islamic, Mobile First Design, Responsive Design Islamic Site, Cross Browser Compatibility, Accessibility WCAG Islamic, Screen Reader Support Arabic, Keyboard Navigation Islamic, Color Contrast ARIA, Semantic HTML Islamic App, Internationalization i18n Arabic, Localization l10n UAE, RTL Right to Left Arabic, Arabic Typography Islamic, Hijri Calendar Integration, Prayer Times API Islamic, Qibla Direction Finder, Halal Restaurant Locator, Islamic Event Calendar, Ramadan Special Features, Zakat Calculator Islamic, Inheritance Calculator Shariah, Profit Sharing Calculator, Dubai UAE Based Professional, Saudi Arabia Market Expert, Bahrain FinTech Specialist, Qatar Islamic Finance, Kuwait Banking Innovation, Oman Digital Transformation, Abu Dhabi Technology Leader, Sharjah Business Consultant, Riyadh FinTech Advisor, Jeddah Innovation Expert, Dammam Technology Consultant, Manama Islamic Banking, Doha FinTech Solutions, Muscat Digital Banking, Remote Work Product Manager, Distributed Team Leadership, Agile Remote Scrum, Virtual Collaboration Tools, Zoom Microsoft Teams, Slack Communication Platform, Asynchronous Communication, Time Zone Management Global, Multilingual English Arabic, Cultural Intelligence UAE, Islamic Business Ethics, Halal Business Practices, Ethical AI Islamic Perspective, Responsible Innovation Islamic, Sustainable Finance ESG Islamic, Green Sukuk Investment, Social Impact Islamic Finance, Financial Inclusion Shariah, Microfinance Islamic Model, Women Empowerment Islamic Finance, Youth Financial Literacy, Islamic Entrepreneurship Training, Startup Incubator Islamic, Accelerator Program FinTech, Innovation Lab Islamic Banking, R&D Research Development, Proof of Concept POC Islamic, Minimum Viable Product MVP, Lean Startup Islamic Business, Design Thinking Islamic Innovation, Human Centered Design Islamic, Service Design Islamic Banking, Customer Journey Mapping Islamic, Touchpoint Optimization FinTech, Omnichannel Experience Islamic, Digital Branch Islamic Bank, Branch Digitization UAE, ATM Islamic Banking, Kiosk Self Service Islamic, Video Banking Remote, Call Center Islamic Support, Customer Success Manager, Account Management Islamic, Relationship Manager Banking, Corporate Banking Islamic, Retail Banking Shariah, Private Banking Halal, Wealth Advisory Islamic, Investment Advisory Shariah, Robo Advisory Islamic Platform, Algorithm Trading Halal, Quantitative Finance Islamic, Portfolio Optimization Shariah, Asset Allocation Islamic, Diversification Strategy Halal, Risk Management Islamic Finance, Hedging Islamic Perspective, Derivatives Shariah Ruling, Options Futures Islamic, Forward Contracts Halal, Arbitrage Islamic Finance, Market Making Halal, Liquidity Provision Islamic, Treasury Operations Shariah, Cash Pooling Islamic Group, Netting Arrangement Halal, Working Capital Islamic SME, Factoring Invoice Islamic, Discounting Bills Shariah, Supply Chain Finance Islamic, Vendor Financing Halal, Buyer Financing Islamic, Purchase Order Finance, Inventory Financing Islamic, Warehouse Receipt Finance, Commodity Trading Islamic, Sukuk Structuring Advisory, Islamic Bond Issuance, Green Sukuk Sustainable, Social Sukuk Impact, Sukuk al-Ijarah Asset Backed, Sukuk al-Mudarabah Profit Sharing, Sukuk al-Musharakah Partnership, Sukuk al-Salam Forward Sale, Sukuk al-Istisna Project Finance, Convertible Sukuk Hybrid, Perpetual Sukuk Tier 1, Subordinated Sukuk Tier 2, Rating Agency Sukuk, Credit Rating Islamic, Default Risk Islamic Bond, Covenant Sukuk Terms, Redemption Sukuk Maturity, Coupon Payment Profit Distribution, Yield Calculation Islamic Bond, Price Discovery Sukuk Market, Secondary Market Trading Sukuk, Primary Market Issuance, Underwriting Sukuk Islamic, Book Building Process, Road Show Investor, Prospectus Sukuk Offering, Due Diligence Islamic Issuance, Legal Documentation Shariah, Trust Deed Sukuk, Service Agency Agreement, Purchase Undertaking Islamic, Sale Undertaking Promise, Shariah Resolution Islamic Ruling, Fatwa Opinion Islamic Scholar",
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
        
        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/favicon.png" as="image" />
        
        {/* Webmaster Verification Tags */}
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE_PLACEHOLDER" />
        <meta name="msvalidate.01" content="BING_VERIFICATION_CODE_PLACEHOLDER" />
        <meta name="yandex-verification" content="YANDEX_VERIFICATION_CODE_PLACEHOLDER" />

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