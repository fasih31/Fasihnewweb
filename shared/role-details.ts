export interface RoleDetail {
  slug: string;
  headline: string;
  domain: string;
  sections: [string,string][];
}

export const roleDetails: Record<string,RoleDetail> = {
  "e& (Etisalat)": {
    slug:"etisalat", headline:"How a business customer gets from a quote to a device order", domain:"telecom",
    sections:[
      ["Mapping the order","For Device-as-a-Service, I follow a business customer from single sign-on to device selection, quotation and acceptance. I then work through what fulfilment needs to act on the order. A customer accepting a price and an operations team being ready to deliver are separate milestones."],
      ["Making decisions across teams","I work with business owners and technical teams on customer verification, approval responsibilities and solution design. I document how requirements differ for small businesses, enterprises and government customers, and take those differences into product reviews and sprint planning."],
      ["Keeping delivery visible","In Azure DevOps I track approvals and outstanding decisions. In progress reviews I bring together the business decision, its effect on the order journey, and the team responsible for the next step. I also work with support colleagues when a technical question affects implementation."]
    ]},
  "Tahakam": {
    slug:"tahakam", headline:"Turning enterprise proposals into a product backlog in Saudi Arabia", domain:"enterprise-ict",
    sections:[
      ["Before delivery began","I met clients and leadership to understand the intended outcome, researched user needs and regulatory requirements, and wrote technical proposals and RFP responses. Customisation requests needed enough detail for the delivery team to estimate them."],
      ["Choosing the next release","I maintained the backlog and weighed business value, user feedback and vendor dependencies. I worked through scope, schedule and budget with engineering, design, analysts and QA, then tracked the agreed increments through sprints."],
      ["Learning from adoption","I introduced measures of customer satisfaction and effort alongside sign-ups, engagement and adoption of premium features. I used support documentation and training to help customers use what the team had delivered."]
    ]},
  "Greens Fin Innovations": {
    slug:"greens-fin",headline:"Taking payments and financing products through Shariah-compliant redesign",domain:"fintech",
    sections:[
      ["The product portfolio","I worked on virtual credit cards, buy now pay later, retail and corporate finance, housing finance and SME financing. My payments work included point-of-sale systems and online checkouts. Those products served different users, from a merchant accepting payment to a business applying for financing."],
      ["Islamic finance product design","I contributed to customer journeys and requirements for Islamic digital finance products. My responsibilities covered product requirements, roadmap priorities, delivery plans and coordination across design, development, analytics and QA."],
      ["What I measured","I used customer feedback and expected return to prioritise improvements, then tracked adoption, retention and delivery performance. I also worked directly with fintech clients and B2B partners on implementation and new partnerships."]
    ]},
  "IMarkplace": {
    slug:"imarkplace",headline:"Building a marketplace around shoppers and suppliers",domain:"ecommerce",
    sections:[
      ["Understanding the purchase","I used shopper feedback, usage data and competitor research to decide what belonged on the roadmap. One part of the work was improving transparency and convenience for halal-conscious consumers."],
      ["Working on both sides of the marketplace","I worked with vendors and suppliers to expand the assortment. With designers and developers, I turned those commercial requirements into features and led the work from definition through release."],
      ["Following the result","I reviewed adoption, conversion, repeat purchases and churn to see what changed after release. I mentored the product team and used those findings to set the next development priorities."]
    ]},
  "Usmani & Co.": {
    slug:"usmani-and-co",headline:"Coordinating Islamic finance consulting for financial institutions",domain:"islamic-economics",
    sections:[
      ["The client brief","I supported consulting work for banks, fintechs and insurers on product development and conversion. I agreed scope and deliverables with clients and translated them into a timeline, budget and review schedule."],
      ["Specialist review","I coordinated consultants and Shariah advisors, kept senior management informed of milestones, and tracked issues that could affect delivery. The advisors provided specialist judgement. My responsibility was getting the right material and decisions to them on time."],
      ["Delivery record","I maintained the client relationship through status reviews, early escalation of risks and follow-through on agreed actions."]
    ]},
  "Centre for Islamic Economics": {
    slug:"centre-for-islamic-economics",headline:"Connecting Islamic finance research with professional education",domain:"islamic-economics",
    sections:[
      ["Research and teaching","I researched Islamic economics and finance, then designed and delivered training for individuals and organisations. Translating a financial principle into material a learner could apply was a different responsibility from developing software for it."],
      ["Institutional partnerships","I coordinated contributions from banks, other organisations and external participants. I worked with government, financial and community stakeholders and kept programme objectives consistent across teams."],
      ["Programme operations","I monitored progress and quality, resolved issues and coordinated the institute’s pending convocation. The work involved both programme design and the practical administration needed to deliver it."]
    ]},
  "Green EdTech": {
    slug:"green-edtech",headline:"Using learner feedback to shape an education product",domain:"edtech",
    sections:[
      ["From learner feedback to features","I researched learner needs and market trends, maintained the roadmap, and used feedback to develop two new features. I worked with design on interface changes and with engineering on the specifications for a release."],
      ["After launch","I tracked feature adoption and retention, reviewed post-launch satisfaction surveys and looked at support requests to identify usability issues. These measures helped me decide which changes deserved the next development cycle."],
      ["Taking the product outside the team","I demonstrated the product at industry conferences and wrote about trends in education technology. Those conversations gave me feedback beyond the people already using the platform."]
    ]},
  "Product Development Manager · The Viable Squad": {
    slug:"viable-squad-product",headline:"Moving from writing code to owning delivery",domain:"web-development",
    sections:[
      ["Defining the work","I gathered client requirements and developed the scope, project charter and delivery plan. I used my development experience to clarify technical constraints before the team committed to a date."],
      ["Running releases and operations","I coordinated software teams, monitored budgets and milestones, and reported risks to clients. I also managed website operations, including outdated content, broken links and formatting issues after a release."],
      ["Developing the team","I coached colleagues, tracked project performance indicators and worked through delivery issues with the people doing the work. The role broadened my responsibility from an individual implementation to the performance of a whole project."]
    ]},
  "A.A. Joyland": {
    slug:"aa-joyland",headline:"Learning governance through records, meetings and client communication",domain:"governance",
    sections:[
      ["Governance support","As Assistant Company Secretary, I maintained confidential records, supported compliance with internal guidelines and coordinated meetings. Accurate records mattered because other people relied on them for follow-up."],
      ["Daily operations","I handled client communication, prepared operational information and used Microsoft Office and Google Workspace for administrative work. I used Trello, Asana and Slack to coordinate tasks with colleagues."],
      ["What carried into later roles","This experience shaped how I document decisions in product delivery. Recording an approval is only part of the work. I also want the next person to know what was agreed and who is responsible for acting on it."]
    ]},
  "Website Developer · The Viable Squad": {
    slug:"viable-squad-web",headline:"Building websites that clients could maintain after release",domain:"web-development",
    sections:[
      ["Front end and back end","I built interfaces in HTML, CSS, JavaScript and jQuery and worked on back-end functionality in PHP and SQL. I also prepared graphics using Photoshop and Illustrator."],
      ["Publishing and commerce","I implemented sites with WordPress, HubSpot, Shopify and Magento, taking search visibility and content maintenance into account during development. I trained end users to update their own content."],
      ["Before handover","I tested and troubleshot sites, sampled the experience with users and corrected problems before deployment. Those early handovers taught me to consider both the person using a product and the person maintaining it."]
    ]}
};
