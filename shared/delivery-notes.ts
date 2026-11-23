import type { Chapter } from "./profile";

export const deliveryNotes: Chapter[] = [
  {
    path: "/notes/device-quotation", title: "What happens after a business accepts a device quote?",
    label: "Enterprise telecom · Delivery note", image: "/work/device-order.webp",
    intro: "At e&, I work across the steps between a business choosing devices and an operations team receiving an order it can fulfil. This example shows how I reason about one handoff.",
    sections: [
      ["The customer’s decision", "A buyer selects devices and receives a quotation. When I map the acceptance step, I ask which version the buyer saw, who has authority to accept it and what the customer expects to happen next. These questions shape the information the review screen needs to show."],
      ["The operations team’s decision", "Acceptance records the customer’s decision. Fulfilment also needs enough information to act. In an illustrative flow, an incomplete delivery detail would leave the quote accepted and the order awaiting information. Showing both states gives the support team a more precise answer than a single ‘processing’ label."],
      ["An acceptance criterion I would use", "Given an authorised buyer who has already accepted the current quotation, opening the confirmation again should show the same reference and next action. Reopening the page should never create a second order. I would review this scenario with the business owner, engineering and operations before sign-off."]
    ], links: [["Try the device-order walkthrough", "/domains/telecom"],["My role at e&", "/career/etisalat"]]
  },
  {
    path: "/notes/merchant-checkout", title: "Reading a payment from both sides of the checkout",
    label: "Fintech · Product note", image: "/work/murabaha.webp",
    intro: "At Greens Fin Innovations my portfolio included virtual cards, point-of-sale systems, online checkout and financing. A shopper and a merchant can experience the same transaction very differently.",
    sections: [
      ["Two people, one purchase", "The shopper wants to know whether payment succeeded and whether to try again. The merchant needs a reference it can use to match the payment to an order. When I review a journey, I read both views together and ask whether they tell a consistent story."],
      ["A delayed confirmation", "Consider a shopper who closes the browser while a confirmation is pending. I would design the return journey around the existing payment reference. A useful screen explains what is known, what is pending and how the shopper can check again."],
      ["Where financing changes the review", "For a financing journey, the customer also needs to understand the amount due and when it becomes payable. My work on Shariah-compliant product transformation involved coordinating product requirements and delivery. Specialist review forms a separate part of that process."]
    ], links: [["My Greens Fin portfolio", "/career/greens-fin"],["My Murabaha design note", "/work/islamic-fintech"]]
  },
  {
    path: "/notes/enterprise-backlog", title: "From an RFP requirement to a release decision",
    label: "Enterprise ICT · Delivery note", image: "/work/device-order.webp",
    intro: "At Tahakam I worked on both technical proposals and product delivery. A requirement written for procurement often needs another conversation before a team can estimate it.",
    sections: [
      ["Find the decision inside the request", "Take an illustrative request for ‘configurable approvals’. I would ask who submits, who reviews, what authority the reviewer needs and what happens when that person is unavailable. Those answers determine whether we are estimating a simple permission change or a new workflow."],
      ["Write the smallest reviewable change", "I would put one complete approval path into the first backlog item, alongside the exception the customer considers most important. I would record the unresolved cases and vendor dependencies separately so the estimate reflects what the team has actually agreed to deliver."],
      ["Decide what to measure after release", "In my role I used adoption and customer-effort measures alongside delivery milestones. For this example, I would review how many requests reach a decision and where reviewers ask for assistance. Those observations give the next roadmap discussion a concrete starting point."]
    ], links: [["My delivery responsibilities at Tahakam", "/career/tahakam"],["Enterprise ICT experience", "/domains/enterprise-ict"]]
  },
  {
    path: "/notes/learner-feedback", title: "What a learner’s support request can tell a product team",
    label: "EdTech · Product note", image: "/work/yeesp.webp",
    intro: "At Green EdTech, learner research informed two new features. I worked with design and engineering and used satisfaction surveys, retention and support requests to understand the experience after release.",
    sections: [
      ["Read the request in context", "Imagine a learner asking where to find the next lesson. Counting that as a navigation ticket is a start. I would also trace where the learner arrived from, what they had just completed and what the interface led them to expect."],
      ["Choose a change you can evaluate", "For that example, I would test a direct next-lesson link on the completion screen. A learner starting the next lesson independently gives a clearer signal than a click on the link alone."],
      ["Look beyond launch day", "I would review repeat use alongside support questions. If more learners start the next lesson but still ask how to resume it later, the first change addressed only part of the problem. That distinction helps the team decide what to investigate next."]
    ], links: [["My product role at Green EdTech", "/career/green-edtech"],["My independent education project", "/work/yeesp"]]
  }
];
