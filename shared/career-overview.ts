type CareerSegment = {
  field: string;
  employers: string;
  contribution: string;
  roles: [string,string][];
};

export const careerOverview: CareerSegment[] = [
  {
    field: "Enterprise telecom", employers: "e& (Etisalat) · UAE",
    contribution: "As Senior Project Manager, I coordinate enterprise product delivery. On Device-as-a-Service, I map how a business customer signs in, selects devices, receives a quotation and authorises an order. I work with business, engineering and operations on customer verification, approval rights and what fulfilment needs after acceptance.",
    roles: [["Senior Project Manager","/career/etisalat"]]
  },
  {
    field: "Enterprise ICT", employers: "Tahakam · Saudi Arabia",
    contribution: "I worked on both sides of a client proposal. Before an engagement, I helped define the scope and wrote technical responses to RFPs. During delivery, I prioritised customisation requests, coordinated vendors and ran sprints with designers, engineers, analysts and QA. After release, I reviewed adoption and customer effort.",
    roles: [["Product Delivery Manager","/career/tahakam"]]
  },
  {
    field: "Payments and Islamic banking", employers: "Greens Fin Innovations · Pakistan",
    contribution: "I helped transform eight fintech products into Shariah-compliant offerings and designed white-label products for clients. My portfolio covered virtual credit cards, buy now pay later, retail, corporate, housing and SME finance, as well as point-of-sale payments and online checkout. I owned roadmap priorities and worked with delivery teams on implementation.",
    roles: [["Product Manager","/career/greens-fin"]]
  },
  {
    field: "Financial advisory and professional education", employers: "Usmani & Co. and Centre for Islamic Economics · Pakistan",
    contribution: "At Usmani & Co., I managed twelve consulting projects delivered on schedule and within budget, coordinating clients, consultants and Shariah advisors. At the Centre for Islamic Economics, I researched Islamic finance, designed and taught training programmes, and coordinated contributions from banks and other institutions.",
    roles: [["Project Manager at Usmani & Co.","/career/usmani-and-co"],["Program Manager at the Centre","/career/centre-for-islamic-economics"]]
  },
  {
    field: "E-commerce", employers: "IMarkplace · Pakistan",
    contribution: "I managed product development for a marketplace serving halal-conscious shoppers. I combined customer research and shopping data with what vendors and suppliers could deliver, then worked with designers and engineers on releases. I followed conversion and repeat purchases to understand what changed for shoppers.",
    roles: [["Product Development Manager","/career/imarkplace"]]
  },
  {
    field: "Education technology", employers: "Green EdTech · Pakistan",
    contribution: "I owned the product roadmap from learner research through launch. Feedback informed two new features. I worked with designers on the interface and engineers on the requirements, then reviewed learner retention, satisfaction surveys and support questions after release.",
    roles: [["Product Manager","/career/green-edtech"]]
  },
  {
    field: "Web development and software delivery", employers: "The Viable Squad",
    contribution: "I began by building and maintaining websites with JavaScript, PHP and SQL, including WordPress, Shopify and Magento implementations. I tested releases and trained the people who would maintain the content. As Product Development Manager, I took responsibility for scoping client work, coordinating releases and managing website operations.",
    roles: [["Website Developer","/career/viable-squad-web"],["Product Development Manager","/career/viable-squad-product"]]
  },
  {
    field: "Corporate governance", employers: "A.A. Joyland · Pakistan",
    contribution: "As Assistant Company Secretary, I maintained confidential records, supported internal compliance, coordinated meetings and handled client correspondence. That experience still informs how I record an approval and make clear who owns the next action.",
    roles: [["Assistant Company Secretary","/career/aa-joyland"]]
  }
];
