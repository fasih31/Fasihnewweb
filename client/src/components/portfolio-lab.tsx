import { useState, type FormEvent } from "react";
import { readings, portfolioQuery } from "@shared/portfolio-guide";
import "./portfolio-lab.css";

const kits=[{name:"Business phone",price:95},{name:"Field tablet",price:145},{name:"Work laptop",price:215}];
const stages=["Configuration","Quotation","Approval","Fulfilment","Delivered"];
type Order={kit:number;quantity:number;stage:number;history:string[];ref:string};
const blank=():Order=>({kit:0,quantity:5,stage:0,history:[],ref:""});
const key="fasih-device-demo-v1";
function restore():Order {
  try{const o=JSON.parse(localStorage.getItem(key)||"null");
    if(o && Number.isInteger(o.kit)&&kits[o.kit]&&Number.isInteger(o.quantity)&&o.quantity>=1&&o.quantity<=100&&Number.isInteger(o.stage)&&stages[o.stage]&&Array.isArray(o.history)&&o.history.every((x:unknown)=>typeof x==="string")&&typeof o.ref==="string")return o;
  }catch{}return blank();
}
export function DeliveryLab(){
  const [o,set]=useState(restore);
  function save(n:Order){set(n);try{localStorage.setItem(key,JSON.stringify(n))}catch{}}
  const kit=kits[o.kit], monthly=kit.price*o.quantity;
  function progress(stage:number,event:string){save({...o,stage,ref:o.ref||"DEMO-"+Date.now().toString(36).toUpperCase(),history:[...o.history,event]})}
  const total=(n:number)=>new Intl.NumberFormat("en-AE",{style:"currency",currency:"AED",maximumFractionDigits:0}).format(n);
  return <section className="lab-panel"><ol className="lab-steps" aria-label="Order stages">{stages.map((s,i)=><li key={s} aria-current={i===o.stage?"step":undefined}>{s}</li>)}</ol>
    <h2>{stages[o.stage]}</h2><p>Illustrative device subscription · 12 months · sample prices</p>
    {o.stage===0 && <div className="lab-controls"><label>Equipment<select value={o.kit} onChange={e=>save({...o,kit:+e.target.value})}>{kits.map((k,i)=><option value={i} key={k.name}>{k.name}</option>)}</select></label><label>Units (1–100)<input type="number" min="1" max="100" value={o.quantity||""} onChange={e=>save({...o,quantity:Math.min(100,Math.max(0,Number.parseInt(e.target.value)||0))})}/></label></div>}
    <dl className="lab-totals"><div><dt>Equipment</dt><dd>{o.quantity} × {kit.name}</dd></div><div><dt>Monthly charge</dt><dd>{total(monthly)}</dd></div><div><dt>Contract total</dt><dd>{total(monthly*12)}</dd></div></dl>
    <div className="lab-controls">
    {o.stage===0 && <button disabled={!o.quantity} onClick={()=>progress(1,"Sales prepared the quotation.")}>Prepare quotation</button>}
    {o.stage===1 && <><button onClick={()=>progress(2,"Buyer accepted the quotation.")}>Accept as buyer</button><button onClick={()=>progress(0,"Buyer requested a revised quotation.")}>Revise quote</button></>}
    {o.stage===2 && <><button onClick={()=>progress(3,"Approver released the order to operations.")}>Approve order</button><button onClick={()=>progress(0,"Approver returned the order for revision.")}>Return for revision</button></>}
    {o.stage===3 && <button onClick={()=>progress(4,"Operations confirmed delivery and closed the order.")}>Confirm delivery</button>}
    {o.stage===4 && <a download={o.ref+".txt"} href={"data:text/plain;charset=utf-8,"+encodeURIComponent([o.ref,kit.name+" × "+o.quantity,total(monthly*12)+" over 12 months",...o.history].join("\n"))}>Download delivery record</a>}
    {o.stage===4 && <button onClick={()=>save(blank())}>Start a new order</button>}</div>
    {o.history.length>0 && <div aria-live="polite"><h3>Order record · {o.ref}</h3><ol>{o.history.map((h,i)=><li key={i}>{h}</li>)}</ol></div>}
  </section>;
}
const prompts = ["What does Fasih do at e&?", "How does Murabaha work?", "What is the difference between Ijara and Murabaha?", "What has Fasih built with AI?"];
type ConversationTurn = {question: string; answer?: string; sources: ReturnType<typeof readings>};

type LocalSession = {
  prompt(input: string, options: {signal: AbortSignal}): Promise<string>;
  destroy(): void;
};
type LocalLanguageModel = {
  availability(): Promise<string>;
  create(options: {signal: AbortSignal}): Promise<LocalSession>;
};

export function PortfolioGuide() {
  const [question, setQuestion] = useState(() => (new URLSearchParams(window.location.search).get("question") || "").slice(0, 700));
  const [pending, setPending] = useState("");
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);

  async function ask(value: string) {
    const clean = value.trim();
    if (!clean || pending) return;
    setQuestion("");
    setPending(clean);
    const previous = conversation.at(-1)?.question || "";
    const sources = readings(portfolioQuery(clean, previous));
    let answer: string | undefined;
    let session: LocalSession | undefined;
    try {
      const model = (window as Window & {LanguageModel?: LocalLanguageModel}).LanguageModel;
      if (model && sources.length && await model.availability() !== "unavailable") {
        const signal = AbortSignal.timeout(120000);
        session = await model.create({signal});
        answer = await session.prompt([
          "Answer the question using only the numbered portfolio references below. Cite claims with [1], [2] or [3]. If a fact is missing, say so. Distinguish demonstrations from achievements.",
          JSON.stringify({question: clean, previous, references: sources.map(({title,text}, i) => ({number: i+1,title,text}))})
        ].join("\n"), {signal});
      }
    } catch {
      // The curated references are available even when the model endpoint is unavailable.
    } finally {
      session?.destroy();
      setConversation(turns => [...turns, {question: clean, answer, sources}]);
      setPending("");
    }
  }

  return <section className="lab-panel ask-fasih" aria-label="Ask Fasih assistant">
    <div className="lab-examples">{prompts.map(prompt => <button disabled={!!pending} key={prompt} onClick={() => void ask(prompt)}>{prompt}</button>)}</div>
    <div className="ask-transcript" role="log" aria-label="Conversation">
      {conversation.map((turn,index) => <article className="ask-turn" key={index}>
        <p className="ask-question">{turn.question}</p>
        {turn.answer ? <p className="lab-answer">{turn.answer}</p> : !turn.sources.length && <p>I don’t have a source for that question. Try a specific role, project or banking term.</p>}
        {turn.sources.length>0 && <div className="ask-sources"><h3>{turn.answer ? "Sources" : "From the reference library"}</h3>
          {turn.sources.map((source,i) => <div key={source.title}><a href={source.path}>[{i+1}] {source.title}</a>{!turn.answer && <p>{source.text}</p>}</div>)}</div>}
      </article>)}
      {pending && <p role="status">Preparing your answer…</p>}
    </div>
    <form onSubmit={(event: FormEvent) => { event.preventDefault(); void ask(question); }}>
      <label>Your question<textarea maxLength={700} rows={2} value={question} onChange={event => setQuestion(event.target.value)} required/></label>
      <small>Ask Fasih uses your browser’s free on-device model when available. The first use may download the model. Other browsers show matching source excerpts.</small>
      <button disabled={!!pending || !question.trim()}>Send question</button>
      {conversation.length>0 && <button disabled={!!pending} type="button" onClick={() => setConversation([])}>Clear conversation</button>}
    </form>
  </section>;
}
