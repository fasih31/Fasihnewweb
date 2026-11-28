import { islamicBankingSources } from "./islamic-banking-sources";
import { chapters } from "./profile";

type Reading = { title:string; text:string; path:string; terms:string };
const lessons: Reading[] = [
  {title:"Following a payment",terms:"fintech payments checkout authorization capture settlement reconciliation reversal merchant card",path:"/notes/merchant-checkout",text:"A payment authorization reserves funds. Capture asks for the charge to be settled. A merchant needs to reconcile its order reference, the provider’s payment reference and the amount received. If a customer retries after a timeout, reuse the original payment reference and check its status before initiating another charge."},
  {title:"Designing a Murabaha purchase",terms:"islamic fintech murabaha sharia shariah margin profit cost instalment financing islamic banking riba",path:"/work/islamic-fintech",text:"In a Murabaha sale, the seller discloses the acquisition cost and agreed profit. A product team should make the sequence of ownership, offer and acceptance explicit, then show the total sale price and payment schedule before confirmation. A qualified Shariah reviewer should assess a particular product structure."},
  {title:"Designing for learning",terms:"edtech education learner lms retention tutors engagement learning assessment adoption",path:"/career/green-edtech",text:"Start with what a learner should be able to do after a lesson. Define an assessment that demonstrates that skill, then design feedback and practice around the mistakes learners make. Look at assessment improvement and completion by cohort alongside usage counts."},
  {title:"Managing delivery dependencies",terms:"project management pmp risk dependency stakeholder scrum scope sprint schedule critical path delivery",path:"/career/tahakam",text:"Identify a deliverable, its acceptance criterion and the person who can accept it. Map the decisions or dependencies that could delay that acceptance. Record an owner and a due date for each one. Review changes against the schedule and escalate the decision that is blocking delivery."},
  {title:"Choosing a product experiment",terms:"product development roadmap discovery mvp prioritization prioritisation requirements prototype experiment backlog metric product management",path:"/notes/enterprise-backlog",text:"Describe the customer problem and the behavior you expect to change. Choose the smallest experiment that could disprove your assumption. Decide what evidence would justify building the feature before the trial starts, then use the result to update the roadmap."},
  {title:"Verifying a digital credential",terms:"blockchain distributed ledger web3 identity did credential decentralized consensus smart contract token",path:"/domains/crypto-web3",text:"For a digital credential, identify the issuer, holder and verifier first. A verifier needs a trustworthy issuer key and a way to check validity or revocation. A shared ledger can record public proofs when several organisations need a common record. Personal credential contents can stay off-chain."},
  {title:"Evaluating a grounded AI assistant",terms:"artificial intelligence ai machine learning llm rag model embeddings retrieval hallucination evaluation training neural",path:"/domains/ai-ml",text:"A retrieval-based assistant selects relevant passages before generating an answer. Test it with questions that have known answers and questions the material cannot answer. Evaluate whether its citations support its claims, whether it acknowledges missing evidence and whether answers remain consistent when a question is rephrased."},
];
const records=[...islamicBankingSources,...lessons,...chapters.filter(c=>["/education","/research","/projects","/resume"].includes(c.path)).flatMap(c=>c.sections.map(([title,text])=>({title,text,path:c.path,terms:c.title+" credentials certifications research ventures"}))),...chapters.filter(c=>/^\/(career|domains|notes|work|products|solutions|expertise)\//.test(c.path)).flatMap(c=>c.sections.map(([title,text])=>({title:c.title+" · "+title,text:c.intro+" "+text,path:c.path,terms:c.label+" "+c.title})))];
const stop=new Set("a an the is are be for to on at from of and or in can i how why what do does would with my me about explain you your fasih tell did as which by it that this his he".split(" "));
function tokens(text:string){return [...new Set(text.toLowerCase().match(/[a-z0-9]+/g)||[])].filter(w=>!stop.has(w));}
// Labeled example questions train a small multinomial Naive Bayes topic classifier.
// It ranks teaching notes locally; personal experience still comes from the published chapters.
const examples=[
  ["Why was my card charged twice after a retry?", "How do merchant payouts match transactions?", "Payment is authorized but the merchant has no funds", "What is the difference between capture and settlement?"],
  ["How is disclosed profit calculated in Murabaha?", "When does the bank own the asset?", "How do cost plus sales differ from conventional loans?", "What should a Shariah reviewer check?"],
  ["How do I know students actually learned?", "Learners stop taking lessons after week one", "How do you measure course completion?", "What makes learner feedback useful?"],
  ["The launch is late because a vendor missed a deadline", "Who owns a blocked dependency?", "How do I escalate a delivery risk?", "How would a project manager handle a scope change?"],
  ["Which feature should we build first?", "How should I validate an MVP?", "How do I choose roadmap priorities?", "How do product managers test a discovery hypothesis?"],
  ["How can a verifier trust an issuer?", "What should stay off chain?", "How do decentralized identifiers work?", "Can a university revoke a digital credential?"],
  ["What are embeddings for?", "Why does a chatbot invent facts?", "How do you evaluate retrieval augmented generation?", "How can I ground a language model in documents?"]
];
const vocabulary=new Set<string>();
const models=lessons.map((lesson,i)=>{
  const counts=new Map<string,number>();let total=0;
  for(const phrase of [...examples[i],lesson.terms]){
    for(const word of tokens(phrase)){counts.set(word,1+(counts.get(word)||0));vocabulary.add(word);total++;}
  }
  return {counts,total,path:lesson.path};
});
function topic(words:string[]) {
  const known=words.filter(w=>vocabulary.has(w));
  if(!known.length)return;
  const scores=models.map(m=>({path:m.path,score:known.reduce((n,w)=>n+Math.log((1+(m.counts.get(w)||0))/(m.total+vocabulary.size)),0)})).sort((a,b)=>b.score-a.score);
  return scores[0].score-scores[1].score>0.55?scores[0].path:undefined;
}
const indexed=records.map(r=>({r,terms:tokens(r.terms+" "+r.title),words:tokens(r.text)}));
const freq=new Map<string,number>();
for(const {terms,words} of indexed)for(const w of new Set([...terms,...words]))freq.set(w,(freq.get(w)||0)+1);
const biography: Reading = {
  title: "Fasih ur Rehman · Professional profile",
  path: "/resume",
  terms: "professional introduction biography background",
  text: "Fasih ur Rehman is a UAE-based product leader and solution architect. As a Senior Project Manager at e& (Etisalat), he helps enterprise customers move from a device quotation to a fulfilled order. His work also spans Islamic fintech at Greens Fin Innovations and independent AI projects such as VirtualIEC."
};

export function profileIntroduction(question: string) {
  const normalized = question.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9 ]/g, " ").trim().replace(/\s+/g, " ");
  const name = "(?:fasih(?: ur rehman)?|you|him)";
  const introduction = new RegExp("^(?:(?:please |can you |could you )*(?:who (?:is|are)|whos|tell me (?:more |a bit )?about|introduce|give me (?:a brief |an? )?(?:bio|overview) of) " + name + "|introduce yourself|your background|fasih(?: ur rehman)?(?: s)?(?: profile| bio| background)?)(?: please)?$");
  if (introduction.test(normalized)) return {answer: biography.text, sources: [biography]};
}

export function readings(question:string):Reading[]{
  const words=tokens(question);
  const label=topic(words);
  const subject = /murabaha|ijara|musharaka|mudaraba|riba|islamic (banking|finance|fintech)/i.test(question);
  const aboutFasih = /fasih|experience|portfolio|work at|his work|your work/i.test(question);
  const scored=indexed.map(({r,terms,words:body})=>({r,score:(subject && !aboutFasih && islamicBankingSources.includes(r) && words.some(word=>terms.includes(word))?14:0)+(lessons.includes(r)&&r.path===label?12:0)+words.reduce((n,w)=>n+(terms.includes(w)?3:body.includes(w)?1:0)*Math.log(1+indexed.length/(freq.get(w)||1)),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  const seen=new Set<string>();
  return scored.filter(({r})=>{if(seen.has(r.title))return false;seen.add(r.title);return true}).slice(0,3).map(x=>x.r);
}


export function portfolioQuery(question: string, previous = "") {
  const followUp = /\b(it|that|this|they|those|more|example|how so)\b/i.test(question);
  return previous && followUp ? previous.trim().slice(0, 700) + " " + question : question;
}
