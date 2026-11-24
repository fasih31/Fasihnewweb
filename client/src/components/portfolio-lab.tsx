import { useState, type FormEvent } from "react";
import { readings } from "@shared/portfolio-guide";
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
const prompts=["How does payment reconciliation work?","How would you review a Murabaha purchase?","How do I measure learner retention?","How do I manage a project dependency?","How should I prioritise a product roadmap?","How does blockchain verify a credential?","How do you evaluate an AI assistant?"];
export function PortfolioGuide(){
  const [q,setQ]=useState(""),[busy,loading]=useState(false),[reply,setReply]=useState<{answer?:string;sources:ReturnType<typeof readings>;question:string}|null>(null);
  async function ask(question:string){
    question=question.trim();if(!question||busy)return;setQ(question);loading(true);setReply(null);
    const local=readings(question);let answer:string|undefined;
    try{const response=await fetch("/guide/query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question}),signal:AbortSignal.timeout(15000)});
      if(response.ok){const data=await response.json();if(data.mode==="assistant"&&typeof data.answer==="string")answer=data.answer}
    }catch{}finally{setReply({question,answer,sources:local});loading(false)}
  }
  function submit(e:FormEvent){e.preventDefault();void ask(q)}
  return <section className="lab-panel"><h2>Ask the portfolio guide</h2><div className="lab-examples">{prompts.map(p=><button disabled={busy} key={p} onClick={()=>ask(p)}>{p}</button>)}</div>
    <form onSubmit={submit}><label>Your question<textarea maxLength={700} rows={3} value={q} onChange={e=>setQ(e.target.value)} required/></label><small>Questions may be processed by OpenAI. Use public examples.</small><button disabled={busy||!q.trim()}>{busy?"Finding an answer…":"Ask question"}</button></form>
    <div aria-live="polite">{reply && <><h3>{reply.question}</h3>{reply.answer?<p className="lab-answer">{reply.answer}</p>:<p>{reply.sources.length?"Relevant passages from the portfolio and teaching notes":"I couldn’t find a relevant passage. Try a specific product, role or delivery question."}</p>}
      {reply.sources.map((s,i)=><article key={s.path}><a href={s.path}>[{i+1}] {s.title} ↗</a>{!reply.answer&&<p>{s.text}</p>}</article>)}</>}</div>
  </section>;
}
