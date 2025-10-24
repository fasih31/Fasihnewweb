
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer as a Product Manager?",
    answer: "I specialize in FinTech, AI/AGI, EdTech, and eCommerce product development. My services include product strategy, roadmap planning, Agile/Scrum implementation, stakeholder management, and end-to-end product delivery."
  },
  {
    question: "What is your experience with Islamic Finance?",
    answer: "I have extensive experience developing Shariah-compliant financial products including BNPL solutions, Islamic banking platforms, Murabaha contracts, Ijarah leasing, and Zakat management systems. All solutions are designed to meet strict Islamic finance principles."
  },
  {
    question: "Do you work with AI and Web3 technologies?",
    answer: "Yes! I integrate AI/AGI technologies including ChatGPT, machine learning, and automation into products. For Web3, I work with blockchain, smart contracts, DeFi, NFTs, and decentralized identity solutions."
  },
  {
    question: "What is your approach to product management?",
    answer: "I follow Agile/Scrum methodologies with a strong focus on user-centric design, data-driven decisions, and continuous iteration. I'm PMP certified and use tools like Azure DevOps, Jira, and modern CI/CD pipelines."
  },
  {
    question: "How can I hire you or collaborate on a project?",
    answer: "You can reach out through the contact form on this website, connect on LinkedIn, or email me directly at fasih31@gmail.com. I'm available for full-time roles, freelance projects, and strategic consulting."
  },
  {
    question: "What technologies do you work with?",
    answer: "I work with React, Flutter, Node.js, Python, Azure DevOps, Docker, and various cloud platforms. For databases, I use PostgreSQL, MongoDB, and blockchain-based solutions. I also integrate third-party APIs and payment gateways."
  }
];

export function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <MessageCircleQuestion className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Common questions about my services and expertise
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
