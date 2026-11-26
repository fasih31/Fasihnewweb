import { recruiterProfile } from "./recruiter-profile";
import { caseStudies, showcasePages } from "./portfolio-expansion";
import { innovationPages, labIndex } from "./innovation";
import { publications } from "./publications";
import { deliveryNotes } from "./delivery-notes";
import { roleDetails } from "./role-details";
import { studies } from "./work";
export interface Role {
  company: string; title: string; dates: string; domain: string; account: string;
}
export const roles: Role[] = [
  { company: "e& (Etisalat)", title: "Senior Project Manager", dates: "May 2024 – present", domain: "Enterprise telecom · UAE", account: "I coordinate enterprise product delivery across business, engineering and operations. For Device-as-a-Service, I map the journey from sign-in and device selection through quotation, acceptance and ordering. I bring customer verification, product reviews and approval dependencies into sprint planning and track decisions in Azure DevOps." },
  { company: "Tahakam", title: "Product Delivery Manager", dates: "July 2023 – May 2024", domain: "Enterprise ICT · Saudi Arabia", account: "I worked with leadership and clients to define the roadmap, wrote technical proposals and RFP responses, and translated customisation requests into delivery plans. I coordinated developers, designers, analysts and QA, balancing budget, delivery risk and customer feedback when priorities changed." },
  { company: "Greens Fin Innovations", title: "Product Manager", dates: "September 2021 – May 2023", domain: "Fintech and Islamic banking · Pakistan", account: "I contributed to customer journeys and requirements for Islamic digital finance products. I also designed white-label products around individual client requirements. My remit covered market research, roadmap choices, delivery planning and the KPIs used to evaluate the result." },
  { company: "IMarkplace", title: "Product Development Manager", dates: "November 2021 – May 2023", domain: "E-commerce · Pakistan", account: "I used customer research and usage data to shape the e-commerce roadmap. I coordinated requirements and design with the delivery team, while working with vendors and suppliers whose processes affected the shopping experience." },
  { company: "Usmani & Co.", title: "Project Manager", dates: "September 2018 – May 2023", domain: "Islamic finance consulting · Pakistan", account: "I planned consulting engagements with clients, consultants and Shariah advisors. I managed scope, budgets, dependencies and review points." },
  { company: "Centre for Islamic Economics", title: "Program Manager", dates: "August 2019 – April 2023", domain: "Islamic economics and professional education · Pakistan", account: "I researched Islamic finance and economics, designed training programmes and delivered instruction. I coordinated programme teams with financial institutions, government stakeholders and community organisations, adapting the material to the audience." },
  { company: "Green EdTech", title: "Product Manager", dates: "May 2019 – September 2022", domain: "Education technology · Pakistan", account: "I managed the product lifecycle from discovery through launch and subsequent releases. I researched learner requirements, maintained the roadmap, worked with designers and engineers on interface and technical specifications, and reviewed product metrics to prioritise improvements." },
  { company: "The Viable Squad", title: "Product Development Manager", dates: "May 2016 – September 2018", domain: "Digital product delivery · Remote", account: "I moved from building websites into managing delivery. I coordinated software teams, managed website operations, resolved content and release issues, and tracked project performance against timelines and budgets." },
  { company: "A.A. Joyland", title: "Assistant Company Secretary", dates: "September 2014 – September 2018", domain: "Corporate governance and operations · Pakistan", account: "I maintained confidential records, coordinated meetings and client communication, and supported compliance and operational reporting. Working with formal records gave me an early grounding in approvals, ownership and follow-through." },
  { company: "The Viable Squad", title: "Website Developer", dates: "May 2014 – April 2016", domain: "Web engineering and commerce · Pakistan", account: "I built and maintained websites with HTML, CSS, JavaScript, PHP and SQL. My work included WordPress, Shopify and Magento implementations, user testing, on-page SEO, troubleshooting and training people to maintain their content." },
];
export interface Chapter {
  path: string; title: string; label: string; intro: string; sections: [string,string][];
  links: [string,string][]; image?: string;
}
export const portrait = "/profile/fasih.webp";
const image = (name: string) => "/work/" + name + ".webp";
function chapter(path:string,title:string,label:string,intro:string,sections:[string,string][],links:[string,string][],art?:string): Chapter {
  return {path,title,label,intro,sections,links,image:art};
}
export const domains: Chapter[] = [
  chapter("/domains/telecom","Enterprise telecom and device services","e& (Etisalat) · UAE","At e&, I work on the steps a business customer and our delivery teams take between an enquiry and an order. Device-as-a-Service is one example of that work.",[
    ["From lead to order","I map sign-in, device selection, quotation and acceptance, then trace the handoff into fulfilment. A quote can be accepted before operations has everything it needs to proceed. Capturing that distinction makes the customer message and the next owner clearer."],
    ["Different business customers","I work through how the journey changes for SMB, enterprise and government customers and vertical teams. Verification, authority to accept and the parties involved in a quotation all affect how a requirement is written."],
    ["My delivery responsibilities","I bring these dependencies into Scrum planning, coordinate solution design and stakeholder reviews, and follow approvals in Azure DevOps. Progress reviews give business and technical teams a common record of open decisions."]],
    [["Career history","/career"],["Enterprise ICT in Saudi Arabia","/domains/enterprise-ict"]],image("device-order")),
  chapter("/domains/enterprise-ict","Enterprise ICT delivery","Tahakam · Saudi Arabia","My role at Tahakam connected client discovery and technical proposals with the teams responsible for delivery.",[
    ["Before the contract","I researched market needs, worked with stakeholders on requirements and helped write RFP responses. I had to make the proposed scope specific enough for delivery teams to estimate and for the customer to evaluate."],
    ["From proposal to roadmap","I prioritised requests against expected return, user feedback and strategic fit. I coordinated developers, designers, analysts and QA and tracked schedules, budgets, vendor dependencies and risks."],
    ["After release","I used engagement and adoption measures to examine how people used the product. Those reviews informed subsequent roadmap conversations with clients and leadership."]],[["My time at Tahakam","/career"],["Telecom delivery","/domains/telecom"]]),
  chapter("/domains/fintech","Fintech and Islamic banking","Greens Fin Innovations · Usmani & Co.","At Greens Fin Innovations I worked on requirements and customer journeys for Islamic digital finance. In consulting, I also saw how financial product decisions move through specialist review.",[
    ["Product design at Greens Fin","My portfolio included virtual credit cards, buy now pay later, retail and corporate financing, housing and SME financing, point-of-sale systems and online checkout. I shaped the roadmap and designed white-label products around client requirements. Customer feedback and market research informed the roadmap. I managed delivery plans and KPIs alongside the functional requirements."],
    ["Working with specialists","At Usmani & Co., I worked with consultants and Shariah advisors to plan reviews, track decisions and deliver against the client brief. Product design and specialist review were distinct responsibilities."],
    ["An example of my product thinking","In a Murabaha purchase flow, I would put cost, disclosed profit, total sale price and payment dates together before acceptance. The buyer should be able to explain the agreement from the review screen."]],[["Murabaha design note","/work/islamic-fintech"],["Islamic economics programmes","/domains/islamic-economics"]],image("murabaha")),
  chapter("/domains/islamic-economics","Islamic economics and advisory delivery","Centre for Islamic Economics · Usmani & Co.","My work in Islamic finance included research, professional training and consulting delivery as well as digital products.",[
    ["Designing programmes","At the Centre for Islamic Economics I researched financial concepts and turned that material into training for individuals and organisations. I coordinated contributions from banks, government and community organisations and managed programme governance and quality. I also coordinated the institute’s pending convocation."],
    ["Managing engagements","At Usmani & Co. I managed planning, budgets, risks and delivery for consulting projects, working alongside subject specialists and Shariah advisors. Twelve projects were delivered on schedule and within budget."],
    ["What I brought into product work","Training made me pay attention to what a customer can explain in their own words. Consulting taught me to identify which decision needs a specialist review before a delivery team commits to implementation."]],[["Fintech product experience","/domains/fintech"],["Education and credentials","/education"]],image("murabaha")),
  chapter("/domains/ecommerce","E-commerce and marketplaces","IMarkplace · The Viable Squad","I first worked on commerce as a website developer. At IMarkplace my responsibility expanded to how shoppers, vendors and product teams experienced the marketplace.",[
    ["Owning the product at IMarkplace","At IMarkplace I studied what halal-conscious shoppers needed to know before buying. I combined customer feedback with usage and competitor data, worked with designers on the buying experience, and reviewed conversion and repeat purchases after release. I maintained relationships with vendors and suppliers whose constraints shaped those decisions."],
    ["A technical foundation","At The Viable Squad I worked with Shopify, Magento and WordPress as well as PHP and SQL. Testing the customer journey before deployment gave me practical experience of the details that are easy to overlook in a requirements document."],
    ["Independent interests","Nova Cart and Terasita are commerce concepts in my portfolio. They reflect my interest in how product discovery and personalisation can help a shopper make a decision."]],[["My technical background","/domains/web-development"],["Marketplace design in YEESP","/work/yeesp"]]),
  chapter("/domains/edtech","Education technology and access to work","Green EdTech · YEESP","At Green EdTech I was responsible for an education product roadmap. Alongside that work, I established YEESP to connect low-cost learning with tutoring and freelance opportunities.",[
    ["Product ownership at Green EdTech","I researched user needs, developed interface and technical specifications with design and engineering, and managed releases from ideation through launch. Learner feedback helped shape two new features. After launch I reviewed satisfaction surveys, feature adoption, retention and support requests."],
    ["An independent project","YEESP brings learners, tutors, freelancers and recruiters into the same environment. I designed around the fact that someone can teach in one context and be a learner or contributor in another."],
    ["A practical design decision","For a freelance milestone, submitting work and accepting it are different actions. I design the reviewer’s view around the contract and deliverable, so the reviewer can make an informed decision."]],[["YEESP project","/work/yeesp"],["Education and training","/education"]],image("yeesp")),
  chapter("/domains/web-development","Web engineering and digital operations","The Viable Squad","I started building websites in 2014. My early roles taught me both how a website works technically and how people keep a digital operation running.",[
    ["Building for the people who maintain it","I developed sites in HTML, CSS, JavaScript, PHP and SQL, configured content management systems and trained users. My responsibilities included search optimisation, testing and troubleshooting before release."],
    ["Moving into delivery","As Product Development Manager at The Viable Squad I coordinated cross-functional software delivery and website operations, tracking timelines, budgets and performance indicators."],
    ["After release","I trained the people maintaining content, monitored site operations and resolved broken links and formatting issues. That continuity between development and operations influenced how I later approached product handovers."]],[["My career since 2014","/career"],["E-commerce experience","/domains/ecommerce"]]),
  chapter("/domains/governance","Corporate governance and administration","A.A. Joyland · Pakistan","Alongside my early web development work, I supported governance and administration as Assistant Company Secretary at A.A. Joyland.",[
    ["Records and compliance","I maintained confidential records and supported compliance with internal guidelines. I used Microsoft Office and Google Workspace to prepare and organise information colleagues needed for their work."],
    ["Meetings and client communication","I coordinated meetings, handled client correspondence and followed up on outstanding work. Trello, Asana and Slack helped me keep track of the people responsible for each action."]
  ],[["My career history","/career"]]),
  chapter("/domains/ai-ml","AI research and prototyping","Research · Independent work","My interest in AI spans two kinds of work: published research into its effects on people and independent experiments with memory and conversational software.",[
    ["Research questions","My co-authored work examines AI applications in healthcare, banking and transportation, including questions of privacy, accountability and bias. A separate fintech paper considers how financial services protect customer information."],
    ["Building VirtualIEC","I use VirtualIEC to explore how a prototype can distinguish the current conversation from information it should recall later. I’m interested in whether the source of a recalled observation can be inspected and corrected."],
    ["How I evaluate an idea","I look for a change in a user’s decision or outcome. For a memory experiment, I can revise one fact and test whether the next response uses the correction."]],[["Research publications","/research"],["VirtualIEC project","/work/virtualiec"]],image("virtualiec")),
  chapter("/domains/crypto-web3","Web3 and digital identity","Independent exploration · Labs360.io","My Web3 work sits alongside my professional career. I have explored digital identity, NFT marketplaces and blockchain development through VirtualIEC and worked on Web3 growth through Labs360.io.",[
    ["Exploring identity","My interest is in how individuals and organisations prove who they are and what authority they have in a digital transaction. This connects with a familiar enterprise question: who is allowed to take the next action?"],
    ["Prototype work","I have experimented with local blockchain development and marketplace concepts. I use these prototypes to examine identity, ownership and transaction flows before drawing conclusions about a production design."],
    ["Growth and communication","Labs360.io is part of my independent project history. It gave me another perspective on how a technical product explains its purpose and reaches a community."]],[["Independent projects","/projects"],["VirtualIEC","/work/virtualiec"]],image("virtualiec")),
];
export const home = chapter("/", "Fasih ur Rehman", "Senior Project Manager · e& (Etisalat), UAE", "Fasih ur Rehman is a PMP-certified Senior Project Manager at e& (Etisalat) in the UAE, working across B2B telecom, Islamic fintech and independent AI products. Explore his résumé, case studies and interactive demos.",[],[]);
export const career = chapter("/career","My career","Professional experience","I started as a website developer in 2014. These are the roles I’ve held since, including several overlapping appointments in Pakistan.",roles.map(r=>[r.title+" · "+r.company,r.dates+" — "+r.account]),[["Explore my domains","/expertise"]]);
export const expertise = chapter("/expertise","My work by domain","Experience","The organisations, decisions and responsibilities behind each part of my career. Open a domain to see what I worked on and where.",[],domains.map(d=>[d.title,d.path]));
export const education = chapter("/education","Education and credentials","Professional development","I studied computer science at ILMA University in Karachi, completing my BS in 2019. My later training has focused on product development, finance and delivery.",[
  ["Project management","I earned the Project Management Professional (PMP) credential from PMI in 2024. My training also includes Google Project Management, the University of Colorado Boulder’s Project Management Specialization and UC Irvine’s Project Management Principles and Practices."],
  ["Product management and fintech","I completed the University of Virginia’s Digital Product Management Specialization, a fintech diploma through TAIF Digital Institute, and Financial Technology Innovations through the University of Michigan."],
  ["Technical foundations","My training includes Cisco CCNA Routing and Switching, CCNP, Google IT Support and Google Analytics. It complements my early experience with web development and my later work with engineering teams."],
  ["My route into computer science","I completed Intermediate Pre-Engineering at Government National College in Karachi in 2014. I began building websites that same year and completed my BS in Computer Science at ILMA University in 2019 while working."],
  ["From analytics to programme delivery","My training progressed from Google Analytics in 2020 to IT support, Cisco networking and project management in 2022. In 2023 I studied digital product management, fintech product development and financial technology innovations. I earned my PMP the following year."]],[["Career history","/career"],["Research","/research"]]);
export const research = chapter("/research","My research publications","Fasih ur Rehman · Co-authored papers","My work in financial products led me to questions about who holds customer data and how automated decisions affect people. These are the two papers I co-authored in 2023.",publications.map(p=>[p.title,p.text]),publications.map(p=>[p.title,p.url]));
export const projectsPage = chapter("/projects","My independent projects","Outside my employed roles","These projects let me explore product questions in my own time. My professional roles and employer work are documented separately in my career history.",[
  ["YEESP","I established the Youth Education and Employment Support Program around affordable learning and opportunities to earn. The initial programme ran from May 2019 to August 2022. My later platform design connects tutoring, course delivery and freelance work. A learner can also tutor or contribute to a freelance project, so I define permissions around each activity."],
  ["VirtualIEC","From August 2022 to March 2023 I worked on a metaverse platform for immersive business interactions in Pakistan. My more recent prototypes look at conversational interfaces, memory and digital identity."],
  ["Start Business Pro with AI and IT Help Desk as a Service","I launched a business planning and productivity initiative, including Speed Booster, and a service-management initiative. My lab includes separate sample workflows for both."],
  ["Orkiva / Aegis AI","My architecture blueprints explore tenant isolation, AI gateway policies and decision audits."],
  ["Labs360.io","I co-founded Labs360.io as a Web3 growth initiative. It is one part of my independent work alongside my interests in marketplaces and technical prototyping."],
  ["Nova Cart and Terasita","My commerce concepts explore two different shopping questions. With Nova Cart I am interested in personalised product discovery. With Terasita I am interested in where automation can simplify shopping while leaving the purchase decision with the customer."]],[["Explore the innovation lab","/innovation-lab"],["Browse all showcases","/case-studies"],["Inside YEESP","/work/yeesp"],["Inside VirtualIEC","/work/virtualiec"],["Web3 exploration","/domains/crypto-web3"]]);
export const about = chapter("/about","About me","Fasih ur Rehman · PMP","I’m Fasih ur Rehman, a Senior Project Manager at e& (Etisalat) in the UAE. I started my career building websites in Karachi. Today I work with business owners, engineers and operations teams on the steps an enterprise customer takes to buy a telecom service.",[
  ["Karachi","In Pakistan I worked across commerce, education and Islamic finance. As a developer I dealt with implementation details. Later I owned product roadmaps, coordinated with suppliers and advisors, and managed programmes for professional learners."],
  ["Saudi Arabia and the UAE","At Tahakam I worked between enterprise clients and delivery teams. Today at e& (Etisalat), I bring those experiences together in enterprise telecom, coordinating product journeys, solution design, reviews and delivery."],
  ["Why I write about AI and product work","On LinkedIn I wrote about a question I face in delivery: if a team can produce requirements or prototypes faster, what actually improves for the customer? For a business ordering devices, one measure I would look at is how often an accepted quotation reaches fulfilment without anyone having to ask for the same information again."],
  ["How I work","I trace a customer action through the people and systems behind it. At e&, that means following a quotation through acceptance, verification and fulfilment. In Islamic finance, it meant coordinating product requirements with specialist review. In both settings, the next person needs to know what decision was made and what they can act on."]],[["Full career history","/career"],["My LinkedIn profile","https://www.linkedin.com/in/fasihurrehman05/"],["Education and credentials","/education"],["My independent projects","/projects"]],portrait);
export const rolePages = roles.map(role => {
  const detail = roleDetails[role.title+" · "+role.company] ?? roleDetails[role.company];
  return chapter("/career/"+detail.slug,role.title+" at "+role.company,role.dates+" · "+role.domain,detail.headline+".",detail.sections,[
    ["Full career history","/career"],["Related domain","/domains/"+detail.domain]
  ]);
});
career.links = rolePages.map(page=>[page.title,page.path]);
for (const domain of domains) {
  const related = rolePages.filter(page=>page.links.some(([,href])=>href===domain.path));
  domain.links.push(...related.map((page):[string,string]=>[page.title,page.path]));
}
const contact = chapter("/contact","Get in touch","Fasih ur Rehman","For a question about a role, a paper I co-authored or a professional opportunity, you can reach me here.",[],[]);
const resourceIndex = chapter("/resources","Personal resources","From my portfolio","I keep a small collection of tools, reading material and experiments here. My professional experience is in the career section.",[],[
  ["Tools","/tools"],["Reading library","/library"],["Calculators","/calculators"],["Code editor","/ide"],["Visual archive","/marketing-assets"],["Markets","/stocks"],["News reader","/news"],["Islamic finance walkthroughs","/islamic-fintech"]
]);
export const notebook = chapter("/notes","My product and delivery notebook","Fasih ur Rehman · Field notes","Four decisions from fields I have worked in. I explain how I would investigate each one, write a requirement and check the result. The scenarios are illustrative.",[],deliveryNotes.map(note=>[note.title,note.path]));
for (const note of deliveryNotes) {
  const rolePage=rolePages.find(page=>note.links.some(([,path])=>page.path===path));
  rolePage?.links.push([note.title,note.path]);
  note.links.push(["All delivery notes",notebook.path]);
}
export const deliveryLab=chapter("/demo/device-order","From device quote to delivery","Interactive product demo","Try a business device subscription from the sales, buyer, approver and operations perspectives. Build a sample quote, send it back for revision or complete delivery and export the order record. Progress stays in this browser.",[],[["My enterprise telecom work","/domains/telecom"],["My delivery notes","/notes/device-quotation"]]);
export const assistantStudio = chapter("/assistant-studio","Assistant Studio","Knowledge-based assistants","Create and share a source-backed assistant for your own profile, team or subject area.",[],[["Ask Fasih","/ask"]]);
export const portfolioGuide = chapter("/ask","Ask Fasih","Portfolio assistant","Ask about my work, or explore Islamic banking and technology through linked public references.",[],[["Create your own assistant","/assistant-studio"],["Read the notebook","/notes"],["Browse my career","/career"]]);
projectsPage.links.push(["Try the device-order demo",deliveryLab.path]);
export const chapters = [labIndex,caseStudies,recruiterProfile,assistantStudio,...showcasePages,...innovationPages,deliveryLab,portfolioGuide,notebook,...deliveryNotes,home, career, expertise, about, research, education, projectsPage, contact, resourceIndex, ...rolePages, ...domains, ...studies.map(s=>chapter("/work/"+s.slug,s.title,s.name,s.context,[[s.question,s.decision],["How I would test it",s.check]],[[s.link,s.href]],image(s.art)))];
export const aliases: Record<string,string> = {
  "/solutions/daas": "/domains/telecom", "/solutions/edtech": "/domains/edtech",
  "/solutions/fintech": "/domains/fintech", "/solutions/ecommerce": "/domains/ecommerce",
  "/project/1": "/work/virtualiec", "/project/2": "/domains/crypto-web3",
  "/project/3": "/domains/ai-ml", "/project/4": "/domains/fintech",
  "/project/5": "/domains/edtech", "/project/6": "/domains/ecommerce",
};
export const titleFor = (c:Chapter) => c === home ? "Fasih ur Rehman | Enterprise Product Leadership, AI & Islamic FinTech" : c.title + " | Fasih ur Rehman";
export function parentOf(c:Chapter): [string,string] {
  if(showcasePages.includes(c)) return ["Case studies","/case-studies"];
  if(innovationPages.includes(c)) return ["Innovation lab","/innovation-lab"];
  if(c.path.startsWith("/career/")) return ["Career","/career"];
  if(c.path.startsWith("/domains/")) return ["Domains","/expertise"];
  if(c.path.startsWith("/notes/")) return ["Delivery notebook","/notes"];
  if(c.path.startsWith("/work/")) return ["Selected work",c.path.endsWith("/islamic-fintech")?"/domains/fintech":"/projects"];
  if(c.path.startsWith("/tools/")) return ["Toolkit","/tools"];
  if(resources.some(r=>r.path===c.path) && c.path!=="/blog") return ["Personal resources","/resources"];
  return ["Fasih ur Rehman","/"];
}
export function schemaFor(c:Chapter) {
  const origin = "https://iamfasih.com", url=origin+c.path;
  const person = {"@type":"Person","@id":origin+"/#fasih",name:home.title,jobTitle:"Senior Project Manager",worksFor:{"@type":"Organization",name:"e& (Etisalat)"},image:origin+portrait,url:origin+"/",sameAs:["https://www.linkedin.com/in/fasihurrehman05","https://github.com/fasih31"]};
  const profile=c===home||c===about||c===recruiterProfile;
  const papers=c===research?publications.map(p=>({"@type":"ScholarlyArticle","@id":p.url,url:p.url,headline:p.title,datePublished:p.year,author:p.authors.map(name=>({"@type":"Person",name})),isPartOf:{"@type":"Periodical",name:p.journal}})):[];
  const parent=parentOf(c);
  const trail=[["Home","/"],...(parent[1]!=="/"?[parent]:[]),[c.title,c.path]];
  const breadcrumb={"@type":"BreadcrumbList","@id":url+"#breadcrumbs",itemListElement:trail.map(([name,path],i)=>({"@type":"ListItem",position:i+1,name,item:origin+path}))};
  const website={"@type":"WebSite","@id":origin+"/#website",url:origin+"/",name:"Fasih ur Rehman",publisher:{"@id":person["@id"]},inLanguage:"en"};
  const note=c.path.startsWith("/notes/") ? {"@type":"Article","@id":url+"#article",headline:c.title,description:c.intro,author:{"@id":person["@id"]},mainEntityOfPage:{"@id":url},...(c.image?{image:origin+c.image}:{})} : undefined;
  const collection=[career,expertise,notebook,research,projectsPage,resourceIndex,caseStudies,labIndex].includes(c)||["/tools","/library","/blog"].includes(c.path);
  const page={"@type":profile?"ProfilePage":c.path==="/contact"?"ContactPage":collection?"CollectionPage":"WebPage",isPartOf:{"@id":website["@id"]},inLanguage:"en",...(note?{mainEntity:{"@id":note["@id"]}}:{}),"@id":url,url,name:titleFor(c),description:c.intro,author:{"@id":person["@id"]},...(profile?{mainEntity:{"@id":person["@id"]}}:{}),...(papers.length?{mentions:papers.map(p=>({"@id":p["@id"]}))}:{}),...(c!==home?{breadcrumb:{"@id":breadcrumb["@id"]}}:{})};
  return {"@context":"https://schema.org","@graph":[website,person,page,...(note?[note]:[]),...(c===home?[]:[breadcrumb]),...papers]};
}
export const resources: Chapter[] = [
  ["/blog","My writing","Articles on enterprise product delivery, fintech and emerging technology."],
  ["/tools","My toolkit","Utilities for product research, web development and everyday calculations."],
  ["/calculators","Calculators","Explore the calculators in my personal toolkit."],
  ["/islamic-fintech","Islamic finance product walkthroughs","Explore illustrative purchase and financing journeys from my fintech portfolio."],
  ["/marketing-assets","My visual archive","View the posters and illustrations from my portfolio tools."],
  ["/stocks","Stock market dashboard","Browse the market data dashboard in my toolkit."],
  ["/news","News feed","Explore the news reader in my personal resource library."],
  ["/ide","Code editor","Open the browser-based development environment."],
  ["/library","My library","Browse the reading resources in my portfolio."],
  ["/tools/seo-analyzer","SEO analyzer","Review a page’s search metadata and headings."],
  ["/tools/website-scanner","Website scanner","Inspect a website’s public technical configuration."],
  ["/tools/code-playground","Code playground","Try HTML, CSS and JavaScript together in a browser preview."],
  ["/tools/crypto-tracker","Crypto tracker","Look up digital asset prices and market movements."],
  ["/tools/currency-converter","Currency converter","Compare an amount across currencies."],
  ["/tools/qr-generator","QR generator","Turn a link or text into a QR code."],
  ["/tools/password-generator","Password generator","Choose the length and character options for a generated password."],
  ["/tools/json-formatter","JSON formatter","Format JSON so you can read its structure and inspect nested values."],
  ["/tools/lorem-ipsum","Lorem ipsum","Generate placeholder text for a layout or prototype."],
].map(([path,title,intro])=>chapter(path,title,"Resources",intro,[],[]));

for (const resource of resources) {
  resource.links = resource.path==="/tools"
    ? resources.filter(item=>item.path.startsWith("/tools/")).map(item=>[item.title,item.path])
    : resource.path.startsWith("/tools/") ? [["All tools","/tools"],["Personal resources","/resources"]]
    : [["Personal resources","/resources"],["Delivery notebook","/notes"]];
}
