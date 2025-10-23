import type { Project, BlogPost, Service, Solution, TimelineItem } from "@shared/schema";

export const projects: Project[] = [
  {
    id: "1",
    title: "VirtualIEC AGI",
    description: "Self-learning AGI platform with multi-modal capabilities and autonomous decision-making systems.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    liveUrl: "https://virtualiec.fasih.io",
    githubUrl: "https://github.com",
    techStack: ["Python", "TensorFlow", "React", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Labs360.io",
    description: "Web3 growth marketing platform with analytics, community engagement, and crypto project strategy tools.",
    category: "Web3",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
    liveUrl: "https://labs360.fasih.io",
    githubUrl: "https://github.com",
    techStack: ["Next.js", "Web3.js", "Solidity", "GraphQL"],
  },
  {
    id: "3",
    title: "AI Chatbot Platform",
    description: "Multi-model AI chatbot integrating DeepSeek, ChatGPT, and Gemini for enhanced conversational experiences.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop",
    liveUrl: "https://chatbot.fasih.io",
    githubUrl: "https://github.com",
    techStack: ["Node.js", "OpenAI API", "React", "WebSocket"],
  },
  {
    id: "4",
    title: "Islamic FinTech Platform",
    description: "Comprehensive Shariah-compliant financial solutions including BNPL, home finance, Takaful, and more.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
    liveUrl: "/islamic-fintech",
    techStack: ["React", "Node.js", "PostgreSQL", "Blockchain"],
  },
  {
    id: "5",
    title: "EdTech Learning Platform",
    description: "Interactive learning management system with AI assessments and gamification for enhanced engagement.",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    techStack: ["Vue.js", "Django", "MongoDB", "TensorFlow"],
  },
  {
    id: "6",
    title: "eCommerce Marketplace",
    description: "Scalable online marketplace with AI personalization and multi-currency payment support.",
    category: "eCommerce",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
    techStack: ["React", "Node.js", "Redis", "Elasticsearch"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Self-Learning AGI: VirtualIEC Journey",
    excerpt: "Exploring the challenges and breakthroughs in creating autonomous general intelligence systems that can learn and adapt.",
    category: "AI",
    date: "2025-01-15",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "The Future of Web3 Growth Marketing",
    excerpt: "How blockchain technology is revolutionizing marketing strategies and community engagement in the crypto space.",
    category: "Web3",
    date: "2025-01-10",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "AI-as-a-Service: Opportunities & Challenges",
    excerpt: "Understanding the potential and pitfalls of delivering AI capabilities through service-based models.",
    category: "AI",
    date: "2025-01-05",
    readTime: "7 min read",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Product Management Consulting",
    description: "End-to-end roadmaps, Agile implementation, backlog prioritization, and project execution for high-impact delivery.",
    icon: "briefcase",
  },
  {
    id: "2",
    title: "AI & AGI Development",
    description: "AI prototyping, multi-modal AGI integration, and deployment of intelligent systems with cutting-edge technology.",
    icon: "brain",
  },
  {
    id: "3",
    title: "Web3 Growth Marketing",
    description: "Crypto project strategy, community engagement, analytics, and growth hacking for blockchain ventures.",
    icon: "rocket",
  },
  {
    id: "4",
    title: "Technical Project Delivery",
    description: "Scalable architectures, DevOps, CI/CD pipelines, and cross-functional team execution for complex projects.",
    icon: "code",
  },
];

export const solutions: Solution[] = [
  {
    id: "fintech",
    title: "FinTech & Islamic Finance Solutions",
    description: "Expert FinTech product management delivering Shariah-compliant digital banking, payment systems, and Islamic finance solutions. Specializing in Halal fintech platforms with AI-driven analytics, blockchain integration, and full regulatory compliance.",
    offerings: [
      "Islamic digital banking & Shariah-compliant solutions",
      "Halal payment gateways & multi-platform integration",
      "Islamic finance product development & compliance",
      "AI-driven financial analytics & risk management",
      "Digital wallet & mobile banking solutions",
      "P2P lending & Islamic crowdfunding platforms",
    ],
    icon: "coins",
  },
  {
    id: "edtech",
    title: "EdTech Solutions",
    description: "Our EdTech platforms empower educators and students through AI-driven assessments, gamification, and analytics, creating engaging, adaptive learning experiences.",
    offerings: [
      "Online learning platforms & LMS",
      "AI-driven personalized learning",
      "Gamification for engagement",
      "Education analytics & reporting",
    ],
    icon: "graduation-cap",
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform Design & Development",
    description: "Expert e-commerce designer and product manager building modern, scalable online stores and marketplaces. Specializing in Halal e-commerce platforms, Islamic marketplace design, and AI-powered personalization for maximum conversion and customer engagement.",
    offerings: [
      "Custom e-commerce platform design & development",
      "Islamic marketplace & Halal product platforms",
      "Multi-currency & Shariah-compliant payment integration",
      "Mobile-first shopping experience design",
      "AI-driven product recommendations & personalization",
      "Inventory management & order fulfillment systems",
    ],
    icon: "shopping-cart",
  },
  {
    id: "daas",
    title: "DaaS Solutions",
    description: "Our Data-as-a-Service solutions provide clean, actionable data for analytics and AI insights, helping businesses make data-driven decisions securely and efficiently.",
    offerings: [
      "Real-time data pipelines & APIs",
      "Analytics dashboards & visualizations",
      "AI-powered insights & predictions",
      "Secure cloud storage & compliance",
    ],
    icon: "database",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "May 2024 – Present",
    title: "Project Manager",
    company: "Etisalat – Dubai, UAE",
    description: "Leading digital transformation initiatives and telecom infrastructure projects across MENA region.",
  },
  {
    year: "Jul 2023 – May 2024",
    title: "ICT Product Manager",
    company: "Tahakam – Medina, Saudi Arabia",
    description: "Drove 25% increase in user engagement through strategic product metrics. Managed portfolio generating 3M+ SAR annual revenue. Led cross-functional teams delivering enterprise ICT solutions.",
  },
  {
    year: "Sep 2021 – Jul 2023",
    title: "Product Manager",
    company: "Greens Fin Innovations – Pakistan",
    description: "Transformed 8 FinTech products to Shariah-compliant offerings, achieving 80% revenue growth. Launched virtual credit cards, BNPL, and Islamic financing solutions with 95% on-time delivery rate.",
  },
  {
    year: "Nov 2021 – May 2023",
    title: "Product Development Manager",
    company: "iMarkplace – Pakistan",
    description: "Built Halal-focused eCommerce platform achieving 30% sales increase. Improved conversion rates by 20% and reduced churn by 15% through data-driven optimization.",
  },
  {
    year: "Jan 2019 – May 2023",
    title: "Project Manager",
    company: "Usmani & Co – Pakistan",
    description: "Delivered 12+ consulting projects with 95% client satisfaction. Provided strategic support to banks and fintechs in Shariah-compliant product development.",
  },
  {
    year: "May 2019 – Sep 2022",
    title: "Product Manager",
    company: "Green EdTech – Pakistan",
    description: "Led product lifecycle achieving 30% user adoption increase. Reduced support tickets by 40% through innovative EdTech solutions and improved UX.",
  },
];