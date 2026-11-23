export const studies = [
  {
    slug: "islamic-fintech", name: "Islamic fintech", title: "Designing a Murabaha purchase", art: "murabaha",
    question: "What should a buyer see before agreeing to a purchase?",
    context: "A Murabaha purchase has several amounts that are easy to confuse on a small screen. The product challenge is to explain the purchase before asking for a commitment.",
    decision: "Show the original cost, the disclosed profit and the total sale price together. Put the payment schedule beside that total so the buyer can check what they will pay and when.",
    check: "Ask a buyer to identify the total and their next payment from the review screen. Their answer tells us whether the design communicates the agreement clearly.",
    href: "/islamic-fintech", link: "Explore the fintech tools",
  },
  {
    slug: "yeesp", name: "YEESP", title: "Who can approve a milestone?", art: "yeesp",
    question: "How should a learning and freelance marketplace handle approval?",
    context: "YEESP brings learners, tutors, freelancers and recruiters into one platform. A person can participate in more than one role, while each contract has its own owner and participants.",
    decision: "Separate submitting work from accepting it. The contributor supplies the evidence. The authorised reviewer sees the agreed deliverable and can approve it or request a revision.",
    check: "Walk through the same milestone as the contributor, the reviewer and an unrelated member. Each should see only the actions and information their relationship to the contract permits.",
    href: "/domains/edtech", link: "Explore education products",
  },
  {
    slug: "virtualiec", name: "VirtualIEC", title: "What should an AI remember?", art: "virtualiec",
    question: "Which information belongs in the next conversation?",
    context: "VirtualIEC is my independent AI prototype. One design question is how to distinguish information needed for the current task from experience that may be relevant later.",
    decision: "Treat working context and recalled experiences separately. A useful prototype should make it possible to inspect which past observation influenced a response.",
    check: "Repeat a task after changing a single relevant fact. Compare what the prototype recalls, whether it uses the correction and which irrelevant details it leaves out.",
    href: "/domains/ai-ml", link: "Explore AI and machine learning",
  },
] as const;
