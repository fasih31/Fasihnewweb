import type { Chapter } from "./profile";

type Showcase = [string,string,string,string,string,string,string];
const showcases: Showcase[] = [
  ["/solutions/device-as-a-service","Device as a Service","Enterprise telecom","I map the journey from sign-in and device selection to quotation, acceptance and fulfillment at e&.","Quote acceptance creates an order handoff. A versioned quote, the accepting party and the verification status give operations the information needed to progress it.","device-order","/demo/device-order"],
  ["/expertise/enterprise-architecture","Enterprise product architecture","Enterprise systems","I translate business process maps into requirements, ownership boundaries and integration decisions.","Separate authentication, role checks and approval authority. Trace quote acceptance through order orchestration, provisioning and fulfillment with a shared reference.","device-order","/tools/role-access"],
  ["/expertise/islamic-fintech","Islamic digital financing ecosystem","Islamic finance case study","My work at Greens Fin included digital financing journeys. At Tahakam I contributed to adapting eight FinTech products for Islamic finance requirements.","The illustrative architecture connects merchant checkout, eligibility, acquisition evidence, contract acceptance and a repayment ledger. The customer sees the asset cost, agreed profit and total price before accepting. Contract and Shariah review apply to each implementation.","murabaha","/solutions/islamic-bnpl"],
  ["/expertise/artificial-intelligence","AI product design and automation","Independent work and research","My independent work spans AI-assisted business planning, conversational assistants and intention-based workflows.","Separate generated suggestions from approved actions. Record relevant context, the user's approval and the outcome so users can revisit a decision.","virtualiec","/products/virtualiec"],
  ["/solutions/murabaha","Murabaha financing","Illustrative financing architecture","An asset purchase, sale offer and installment plan need distinct records and customer disclosures.","Capture acquisition evidence before issuing the sale offer. Show the disclosed profit, total consideration and due dates, then retain the accepted offer version for servicing and review.","murabaha","/solutions/islamic-bnpl"],
  ["/solutions/digital-wallets","Digital wallets and payments","FinTech architecture","A wallet needs a clear transaction history for customers and a reliable reconciliation record for operations.","Track authorization, settlement and reversal as separate events. Match the merchant order, ledger entry and settlement reference before closing an exception.","cover-payments","/notes/merchant-checkout"],
  ["/solutions/financial-inclusion","Financial inclusion","Product design","Design for customers who may have intermittent connectivity, limited documentation or limited access to branches.","Use plain-language costs, clear eligibility and a recovery path for incomplete applications. Measure onboarding completion and investigate where eligible customers drop out.","cover-payments","/expertise/islamic-fintech"],
  ["/products/virtualec","VirtuAlec","Conversation prototype","VirtuAlec explored a unified conversation experience across model providers.","Keep conversation history independent of the provider adapter so a user can switch providers while preserving the thread.","virtualiec","/products/virtualiec"],
  ["/products/virtualiec-agi","VirtualIEC AGI research","Experimental prototype","I explored a cognitive architecture with perception, hierarchical memory, learning and reasoning modules.","Run repeatable tasks to inspect whether retrieving relevant past context improves a subsequent reasoning step.","virtualiec","/research"],
  ["/products/virtualiec-identity","VirtualIEC Identity","Research concept","I explored a decentralized identity model for issuers, holders and verifiers.","Store personal credential contents with the holder and design the verifier flow around issuer trust, credential validity and revocation.","virtualiec","/domains/crypto-web3"],
  ["/products/virtualiec-blockchain","VirtualIEC Blockchain","Research concept","I explored quantum-resistance, interoperability and AI-assisted consensus as design directions.","Treat cryptographic migration and consensus as separate design questions. Compare design assumptions before making security or performance claims.","virtualiec","/domains/crypto-web3"],
  ["/products/virtualiec-immersive","VirtualIEC Immersive","Independent concept","I explored virtual environments for learning, collaboration and training.","Start with a facilitator-led session and test whether participants can complete the exercise and find feedback.","cover-learning","/projects"],
  ["/products/bytereach","ByteReach","Automation concept","I explored packaging AI and robotic process automation as services.","Define the manual process, exception path and human review step before automating it. Measure handling time and the cost of exceptions.","virtualiec","/tools/business-plan-generator"],
  ["/products/novacart","NovaCart","Commerce concept","NovaCart explores personalized discovery in a digital marketplace.","Keep discovery separate from checkout. Evaluate whether recommendations help users find relevant products while preserving control over the purchase.","cover-payments","/domains/ecommerce"],
  ["/products/labs360","Labs360.io","Web3 venture","I co-founded Labs360.io as a Web3 growth initiative spanning acquisition, liquidity and partnerships.","Define the customer segment and desired behavior before choosing an acquisition channel or assessing a campaign.","virtualiec","/projects"],
  ["/products/yeesp","YEESP","Education and work platform","I designed YEESP around learning, tutoring and independent work, with separate responsibilities for contributors, reviewers and platform administration.","A marketplace contract moves from project and bid to milestone submission and acceptance. Define who can act at each stage and link escrow decisions to the accepted milestone.","yeesp","/work/yeesp"],
  ["/solutions/product-governance","Product governance and readiness","Enterprise delivery","At e& I coordinate product reviews, approvals and delivery dependencies with business and engineering teams.","Track each approval with an owner, evidence and a decision date. Check exception ownership before moving into operational handover.","device-order","/career"],
  ["/solutions/lead-to-delivery","Lead-to-Order and Order-to-Delivery","Enterprise case study","I map how enterprise sales and operations hand work across quotation, acceptance and fulfillment.","After acceptance, preserve the quote version and customer identity while separately tracking the provisioning and fulfillment states.","device-order","/demo/device-order"],
];
const caseEvidence: Record<string, Chapter["sections"]> = {
  "/solutions/device-as-a-service": [
    ["The delivery challenge", "Enterprise and SMB orders involve different verification and approval steps. After quote acceptance, operations needs to know what was agreed, what checks remain and who owns the next decision."],
    ["My role and deliverables", "I coordinate business, engineering and operations at e&. My work includes process maps, solution designs, user stories and acceptance criteria for lead-to-order and order-to-delivery."],
    ["What the demo demonstrates", "Use fictional devices to build a quote, approve it and follow the fulfillment handoff. The walkthrough illustrates the decision points with sample data."],
  ],
  "/expertise/islamic-fintech": [
    ["The product challenge", "A buyer needs to understand the price, terms and next step before accepting an offer. Operations needs an auditable record of acquisition, eligibility, agreement and servicing."],
    ["My role and deliverables", "At Greens Fin I contributed to product requirements and customer journeys. At Tahakam I supported delivery planning, white-label implementations and adaptation of eight fintech products to Islamic finance requirements."],
    ["What the demo demonstrates", "Change asset cost, disclosed profit and tenure. Review the total and installment schedule before committing in the illustrative scenario."],
  ],
  "/expertise/artificial-intelligence": [
    ["My work", "I launched Start Business Pro with AI and developed VirtualIEC as a local beta candidate. The portfolio includes an intention workflow and a separate business launch worksheet."],
    ["What I would evaluate", "Can users tell which context informed an action, correct it, and understand what will happen when they approve the action? Test the workflow with changed input and compare the resulting plan."],
  ],
};
export const showcasePages: Chapter[] = showcases.map(([path,title,label,intro,decision,image,related])=>({
  path,title,label,intro,image:"/work/"+image+".webp",
  sections:[...(caseEvidence[path] || []),["Design and operating model",decision]],
  links:[["Explore the related workflow",related],["Case studies","/case-studies"]],
}));
export const caseStudies: Chapter = {
  path:"/case-studies",title:"Case studies",label:"Fasih ur Rehman",
  intro:"Explore the product decisions behind enterprise delivery, Islamic finance, AI and marketplaces.",
  sections:[],links:showcasePages.map(page=>[page.title,page.path]),
};
