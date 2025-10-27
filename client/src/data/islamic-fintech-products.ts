
export interface ProductStep {
  title: string;
  description: string;
  actions?: string[];
}

export interface IslamicProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contractType: string;
  icon: string;
  color: string;
  steps: ProductStep[];
  features: string[];
  benefits: string[];
}

export const islamicFinTechProducts: IslamicProduct[] = [
  {
    id: "bnpl",
    title: "Islamic Buy-Now-Pay-Later",
    subtitle: "Murabaha-Based BNPL",
    description: "Shariah-compliant installment solution with transparent markup and zero interest",
    contractType: "Murabaha",
    icon: "shopping-bag",
    color: "from-emerald-500 to-teal-600",
    steps: [
      {
        title: "Login & Onboarding",
        description: "Secure registration with email/phone verification",
        actions: ["Register or sign in", "OTP verification", "JWT session creation", "Complete KYC (ID, selfie, income proof)", "AML/Shariah database verification"]
      },
      {
        title: "Merchant Checkout",
        description: "Select BNPL at checkout and generate Murabaha contract",
        actions: ["Select BNPL payment option", "API retrieves product price", "Generate Murabaha contract", "System buys from merchant", "Sell to customer with disclosed markup (cost + 10%)"]
      },
      {
        title: "Approval Engine",
        description: "AI-powered credit scoring and limit assignment",
        actions: ["Credit scoring analysis", "Salary and history verification", "Assign spending limit", "Digital contract signing"]
      },
      {
        title: "Disbursement & Settlement",
        description: "Instant payment to merchant, flexible repayment for customer",
        actions: ["Platform pays merchant upfront", "Customer repays in equal installments", "No interest, only fixed margin"]
      },
      {
        title: "Repayment Tracking",
        description: "Monitor your payments with automated deductions",
        actions: ["View remaining dues in dashboard", "Track payment schedule", "Auto-debit via card or bank", "Late fees donated to charity"]
      },
      {
        title: "Return/Refund Handling",
        description: "Ethical refund process with transparent settlement",
        actions: ["Merchant refund triggers cancellation", "Customer balance adjusted", "Charity portion reallocated"]
      }
    ],
    features: ["Zero interest", "Transparent markup", "Instant approval", "Flexible installments"],
    benefits: ["Shariah compliant", "No hidden fees", "Credit building", "Ethical commerce"]
  },
  {
    id: "advance-salary",
    title: "Advance Salary",
    subtitle: "Qard Hasan / Murabaha",
    description: "Interest-free payroll financing for employees in need",
    contractType: "Qard Hasan",
    icon: "banknote",
    color: "from-blue-500 to-indigo-600",
    steps: [
      {
        title: "Login & KYC",
        description: "Link your employer account and verify identity",
        actions: ["Employee ID verification", "Salary slip upload", "Employer account linking"]
      },
      {
        title: "Eligibility Check",
        description: "Automated assessment of salary history and limits",
        actions: ["Review salary history", "Calculate repayment score", "Set maximum limit (e.g., 50% of salary)"]
      },
      {
        title: "Contract Generation",
        description: "Choose between Qard Hasan or Murabaha structure",
        actions: ["Qard Hasan: Interest-free with admin fee", "Murabaha: For asset purchases with markup"]
      },
      {
        title: "Approval",
        description: "Quick approval process with optional HR verification",
        actions: ["Auto approval within limit", "HR verification if needed"]
      },
      {
        title: "Disbursement",
        description: "Instant transfer to your account",
        actions: ["Transfer to wallet or bank", "Auto-deduction on next payday"]
      },
      {
        title: "Repayment Management",
        description: "Flexible options for job changes",
        actions: ["Notify employer of changes", "Reschedule if needed"]
      }
    ],
    features: ["No interest", "Small admin fee", "Quick approval", "Salary deduction"],
    benefits: ["Financial flexibility", "Shariah compliant", "No credit impact", "Emergency support"]
  },
  {
    id: "home-finance",
    title: "Islamic Home Finance",
    subtitle: "Ijarah / Diminishing Musharakah",
    description: "Shariah-compliant home ownership through co-ownership or leasing",
    contractType: "Ijarah / Diminishing Musharakah",
    icon: "home",
    color: "from-purple-500 to-pink-600",
    steps: [
      {
        title: "Login & KYC",
        description: "Upload documents and property details",
        actions: ["ID verification", "Income proof", "Property documentation"]
      },
      {
        title: "Eligibility & Assessment",
        description: "Comprehensive evaluation of creditworthiness",
        actions: ["Credit assessment", "Property valuation", "Legal verification"]
      },
      {
        title: "Contract Structure",
        description: "Choose your preferred Islamic financing model",
        actions: ["Ijarah: Lease-to-own model", "Diminishing Musharakah: Co-ownership", "Gradual ownership transfer"]
      },
      {
        title: "Approval Process",
        description: "Legal and Shariah compliance verification",
        actions: ["Legal review", "Shariah board approval", "Digital contract signing"]
      },
      {
        title: "Disbursement",
        description: "Payment to seller and ownership registration",
        actions: ["Payment to property seller", "Joint ownership registration"]
      },
      {
        title: "Repayment & Transfer",
        description: "Monthly payments lead to full ownership",
        actions: ["Monthly rent + ownership payments", "Ownership transfer upon completion"]
      }
    ],
    features: ["Co-ownership", "Lease-to-own", "No riba", "Transparent pricing"],
    benefits: ["Home ownership", "Shariah compliant", "Flexible terms", "Asset building"]
  },
  {
    id: "car-finance",
    title: "Car Finance",
    subtitle: "Murabaha / Ijarah",
    description: "Drive your dream car with Islamic financing options",
    contractType: "Murabaha / Ijarah",
    icon: "car",
    color: "from-orange-500 to-red-600",
    steps: [
      {
        title: "Login & KYC",
        description: "Register and verify your credentials",
        actions: ["Upload driving license", "Income proof verification"]
      },
      {
        title: "Vehicle Selection",
        description: "Choose your car and get instant quote",
        actions: ["Select vehicle", "Fetch dealer invoice", "Review pricing"]
      },
      {
        title: "Contract Creation",
        description: "Select financing structure",
        actions: ["Murabaha: Purchase with markup", "Ijarah: Lease with ownership option"]
      },
      {
        title: "Approval Workflow",
        description: "Auto and manual verification",
        actions: ["Affordability check", "Shariah compliance verification"]
      },
      {
        title: "Disbursement",
        description: "Payment and vehicle delivery",
        actions: ["Payment to dealer", "Vehicle delivery to customer"]
      },
      {
        title: "Repayment",
        description: "Flexible payment with early settlement discount",
        actions: ["Monthly installments", "Early payment discount available"]
      }
    ],
    features: ["Multiple models", "Transparent markup", "Early payment discount", "Ethical repossession"],
    benefits: ["Car ownership", "Fixed installments", "Shariah compliant", "Fair pricing"]
  },
  {
    id: "takaful",
    title: "Takaful Insurance",
    subtitle: "Islamic Cooperative Insurance",
    description: "Mutual protection based on donation and shared responsibility",
    contractType: "Tabarru'",
    icon: "shield",
    color: "from-cyan-500 to-blue-600",
    steps: [
      {
        title: "Login & KYC",
        description: "Register and provide health/vehicle data",
        actions: ["ID verification", "Health or vehicle data collection"]
      },
      {
        title: "Policy Creation",
        description: "Contribute to mutual protection pool",
        actions: ["Tabarru' pool contribution", "Operator service fee"]
      },
      {
        title: "Underwriting",
        description: "Risk profiling and approval",
        actions: ["Risk assessment", "Policy approval"]
      },
      {
        title: "Contribution Payment",
        description: "Pay premium to protection pool",
        actions: ["Premium payment", "Pool ledger recording"]
      },
      {
        title: "Claim Request",
        description: "Submit and verify claims from pool",
        actions: ["Claim submission", "Verification process", "Payment from pool"]
      },
      {
        title: "Surplus Distribution",
        description: "Share in pool surplus",
        actions: ["Surplus calculated", "Distribution to participants"]
      }
    ],
    features: ["Mutual protection", "Surplus sharing", "No riba", "Transparent fees"],
    benefits: ["Shariah compliant", "Community support", "Fair claims", "Ethical insurance"]
  },
  {
    id: "zakat-waqf",
    title: "Zakat & Waqf",
    subtitle: "Islamic Charity Platform",
    description: "Calculate, donate, and track your Zakat and endowments",
    contractType: "Sadaqah / Waqf",
    icon: "heart-handshake",
    color: "from-green-500 to-emerald-600",
    steps: [
      {
        title: "Login (Optional)",
        description: "Donate anonymously or create account for tracking",
        actions: ["Anonymous donation option", "Account creation for history"]
      },
      {
        title: "Zakat Calculator",
        description: "Automated calculation based on assets",
        actions: ["Enter assets and liabilities", "Calculate due Zakat", "Review breakdown"]
      },
      {
        title: "Payment Gateway",
        description: "Secure donation processing",
        actions: ["Choose payment method", "Smart contract logging", "Receipt generation"]
      },
      {
        title: "Distribution Engine",
        description: "Allocate funds to verified beneficiaries",
        actions: ["Verify beneficiaries", "Distribute according to categories", "Track disbursement"]
      },
      {
        title: "Transparency Dashboard",
        description: "See the impact of your donation",
        actions: ["Track fund usage", "View beneficiary stories", "Impact reports"]
      }
    ],
    features: ["Auto calculator", "Verified recipients", "Blockchain tracking", "Impact reports"],
    benefits: ["Fulfill obligation", "Transparent giving", "Direct impact", "Tax benefits"]
  },
  {
    id: "sukuk-investment",
    title: "Digital Sukuk Platform",
    subtitle: "Islamic Bonds Investment",
    description: "Invest in Shariah-compliant bonds with fractional ownership and real-time tracking",
    contractType: "Sukuk",
    icon: "banknote",
    color: "from-indigo-500 to-purple-600",
    steps: [
      {
        title: "Account Setup",
        description: "Complete investor profile and risk assessment",
        actions: ["KYC verification", "Risk tolerance assessment", "Investment goals setup"]
      },
      {
        title: "Browse Sukuk",
        description: "Explore available Shariah-compliant bonds",
        actions: ["Filter by risk/return", "View project details", "Check Shariah certification"]
      },
      {
        title: "Investment",
        description: "Purchase sukuk with flexible amounts",
        actions: ["Fractional ownership from AED 100", "Automated diversification", "Instant confirmation"]
      },
      {
        title: "Portfolio Management",
        description: "Track your investments in real-time",
        actions: ["Live NAV updates", "Profit distribution tracking", "Secondary market trading"]
      },
      {
        title: "Redemption",
        description: "Maturity and early exit options",
        actions: ["Maturity notifications", "Early exit marketplace", "Profit settlement"]
      }
    ],
    features: ["Fractional ownership", "Shariah certified", "Secondary market", "Auto diversification"],
    benefits: ["Low entry barrier", "Fixed returns", "Asset-backed", "Liquidity options"]
  },
  {
    id: "islamic-robo-advisor",
    title: "Halal Robo-Advisor",
    subtitle: "AI-Powered Islamic Wealth Management",
    description: "Automated Shariah-compliant portfolio management using AI and machine learning",
    contractType: "Wakalah / Mudarabah",
    icon: "shield",
    color: "from-cyan-500 to-blue-600",
    steps: [
      {
        title: "Onboarding",
        description: "Define your financial goals and risk profile",
        actions: ["Financial goals questionnaire", "Risk assessment", "Shariah preference settings"]
      },
      {
        title: "Portfolio Creation",
        description: "AI generates personalized Shariah portfolio",
        actions: ["Halal stocks screening", "Sukuk allocation", "Real estate fund mix", "Islamic commodities"]
      },
      {
        title: "Investment",
        description: "Start with minimum amount",
        actions: ["Initial deposit from AED 500", "Recurring investment setup", "Auto-rebalancing enabled"]
      },
      {
        title: "Monitoring & Rebalancing",
        description: "AI continuously optimizes your portfolio",
        actions: ["Daily halal screening", "Automatic rebalancing", "Tax-loss harvesting (halal)"]
      },
      {
        title: "Reporting",
        description: "Comprehensive performance tracking",
        actions: ["Real-time performance", "Zakat reporting", "ESG impact metrics"]
      }
    ],
    features: ["AI-powered", "Halal screening", "Auto-rebalancing", "Low fees"],
    benefits: ["Professional management", "Shariah compliant", "Tax efficient", "Accessible"]
  },
  {
    id: "micro-finance",
    title: "Islamic Microfinance",
    subtitle: "Qard Hasan for Small Businesses",
    description: "Interest-free micro-loans for entrepreneurs and small businesses based on Qard Hasan",
    contractType: "Qard Hasan / Murabaha",
    icon: "heart-handshake",
    color: "from-amber-500 to-orange-600",
    steps: [
      {
        title: "Business Registration",
        description: "Register your small business or startup",
        actions: ["Business profile creation", "Upload business plan", "Financial statements"]
      },
      {
        title: "Loan Application",
        description: "Apply for interest-free financing",
        actions: ["Specify loan amount (AED 5K-50K)", "Select purpose", "Provide collateral alternative"]
      },
      {
        title: "Community Vetting",
        description: "Peer review and endorsement",
        actions: ["Community members vouch", "Business viability assessment", "Character references"]
      },
      {
        title: "Approval & Disbursement",
        description: "Quick approval with transparent terms",
        actions: ["Shariah board approval", "Interest-free loan agreement", "Funds disbursement"]
      },
      {
        title: "Repayment & Support",
        description: "Flexible repayment with mentorship",
        actions: ["Monthly installments", "Grace period options", "Business mentorship program"]
      }
    ],
    features: ["Zero interest", "Community backed", "Mentorship included", "Flexible terms"],
    benefits: ["Empower entrepreneurs", "Social impact", "Shariah compliant", "Build credit"]
  },
  {
    id: "green-sukuk",
    title: "Green Sukuk Platform",
    subtitle: "Sustainable Islamic Investment",
    description: "Invest in environmentally sustainable projects through Shariah-compliant green bonds",
    contractType: "Sukuk (Green)",
    icon: "shield",
    color: "from-green-600 to-teal-500",
    steps: [
      {
        title: "Impact Registration",
        description: "Set your sustainability preferences",
        actions: ["Environmental goals", "Impact categories", "ESG criteria selection"]
      },
      {
        title: "Project Discovery",
        description: "Browse certified green projects",
        actions: ["Renewable energy projects", "Sustainable infrastructure", "Green real estate", "Impact metrics"]
      },
      {
        title: "Investment",
        description: "Invest in sustainable future",
        actions: ["Minimum AED 1,000", "Direct project selection", "Shariah & sustainability certified"]
      },
      {
        title: "Impact Tracking",
        description: "Monitor environmental impact",
        actions: ["Carbon offset tracking", "Energy saved metrics", "Real-time project updates"]
      },
      {
        title: "Returns & Reporting",
        description: "Financial and impact returns",
        actions: ["Profit distributions", "Impact certificates", "Annual sustainability report"]
      }
    ],
    features: ["ESG certified", "Impact tracking", "Shariah compliant", "Transparent projects"],
    benefits: ["Environmental impact", "Ethical returns", "Future-focused", "Sustainable growth"]
  },
  {
    id: "peer-to-peer",
    title: "Islamic P2P Financing",
    subtitle: "Mudarabah-Based Lending",
    description: "Connect investors with borrowers through Shariah-compliant peer-to-peer financing",
    contractType: "Mudarabah / Musharakah",
    icon: "banknote",
    color: "from-rose-500 to-pink-600",
    steps: [
      {
        title: "Platform Registration",
        description: "Join as investor or borrower",
        actions: ["Account type selection", "KYC verification", "Profile completion"]
      },
      {
        title: "Listing/Browsing",
        description: "Create loan request or browse opportunities",
        actions: ["Borrower: Create proposal", "Investor: Browse listings", "Risk ratings displayed"]
      },
      {
        title: "Matching & Agreement",
        description: "AI-powered matching with Shariah contract",
        actions: ["Auto-matching algorithm", "Profit-sharing agreement", "Risk disclosure"]
      },
      {
        title: "Funding & Disbursement",
        description: "Secure fund transfer",
        actions: ["Escrow account", "Fund verification", "Instant disbursement"]
      },
      {
        title: "Profit Sharing",
        description: "Transparent profit distribution",
        actions: ["Monthly profit sharing", "Loss sharing mechanism", "Auto reinvestment option"]
      }
    ],
    features: ["Peer-to-peer", "AI matching", "Profit sharing", "Diversification"],
    benefits: ["Higher returns", "Direct impact", "Shariah compliant", "Transparent"]
  }
];
