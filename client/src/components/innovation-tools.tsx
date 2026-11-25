import { useState, type FormEvent } from "react";
import { innovationPages } from "@shared/innovation";
import "./innovation-tools.css";

const money = (cents:number) => new Intl.NumberFormat("en-AE",{style:"currency",currency:"AED"}).format(cents/100);
type Field = [string,string,number?,number?,number?];
type Worksheet = {fields:Field[]; run:(v:string[])=>string[]};
const worksheets:Record<string,Worksheet> = {
  "/solutions/islamic-bnpl": {
    fields:[["Asset cost in AED","5000",0.01,100000000,0.01],["Fixed profit (%)","8",0,100,0.01],["Months","6",1,120,1]],
    run:([cost,rate,term])=>{
      const principal=Math.round(Number(cost)*100), profit=Math.round(principal*Number(rate)/100), total=principal+profit, months=Number(term);
      const base=Math.floor(total/months), extra=total%months;
      return ["Asset cost · "+money(principal),"Fixed profit · "+money(profit),"Total selling price · "+money(total),...Array.from({length:months},(_,i)=>"Month "+(i+1)+" · "+money(base+(i<extra?1:0)))];
    }
  },
  "/tools/car-ijara-calculator": {fields:[["Agreed monthly rent in AED","1850",0.01,1000000,0.01],["Lease term in months","12",1,120,1]],run:([rent,months])=>{
    const cents=Math.round(Number(rent)*100);
    return ["Total agreed rentals · "+money(cents*Number(months)),...Array.from({length:Number(months)},(_,i)=>"Month "+(i+1)+" · rent "+money(cents)+" · cumulative "+money(cents*(i+1)))];
  }},
  "/tools/rice": {fields:[["People reached per quarter","500",0,100000000,1],["Impact per person","2",0,3,0.1],["Confidence (%)","80",0,100,1],["Effort in person-months","4",0.01,10000,0.01]],run:([r,i,c,e])=>["Quarterly RICE score · "+(Number(r)*Number(i)*Number(c)/100/Number(e)).toFixed(2)]},
  "/tools/effort-capacity": {fields:[["Team members","5",1,1000,1],["Working days","10",1,365,1],["Total leave in person-days","4",0,365000,0.5],["Focus time (%)","80",0,100,1]],run:([team,days,leave,focus])=>{
    const gross=Number(team)*Number(days);
    return Number(leave)>gross?["Leave exceeds team capacity. Revise the estimate."]:["Gross capacity · "+gross+" person-days","Available for planned work · "+((gross-Number(leave))*Number(focus)/100).toFixed(1)+" person-days"];
  }},
  "/tools/user-story-generator": {fields:[["Actor","procurement manager"],["Action","review an enterprise device quote"],["Desired outcome","confirm the monthly cost before approval"]],run:([a,b,c])=>["Epic · Enable "+c,"Feature · "+b,"Story · As a "+a+", I want to "+b+" so I can "+c+".","Acceptance · Given an authorized "+a+" with a complete record, when they "+b+", then the result lets them "+c+".","Exception · Given missing authorization, the action is blocked and the original record is preserved."]},
  "/tools/prd-builder": {fields:[["Customer and problem","Buyers lose track of quote revisions"],["Proposed capability","Compare the latest quote with the accepted version"],["Success measure","Share of quotes approved without clarification"]],run:([a,b,c])=>["Customer problem · "+a,"First release · "+b,"Measure · "+c,"Validation · Observe a customer trying the first release, record the baseline and compare the same measure after the pilot."]},
  "/tools/business-plan-generator": {fields:[["First customer","Small retailers"],["Customer problem","Manual reconciliation takes hours"],["Pilot offer","A weekly reconciliation report"]],run:([a,b,c])=>["Customer hypothesis · "+a+" face this problem: "+b+".","Pilot offer · "+c,"Discovery · Ask three prospective customers to show their current process and its cost.","Launch test · Offer "+c+" to one pilot customer. Record adoption, delivery cost and willingness to pay before expanding."]},
};
function WorksheetView({sheet}:{sheet:Worksheet}){
  const [values,setValues]=useState(sheet.fields.map(f=>f[1]));
  const [rows,setRows]=useState<string[]>([]);
  function submit(e:FormEvent){e.preventDefault();setRows(sheet.run(values.map(v=>v.trim())))}
  return <section className="innovation-panel"><h2>Try the worksheet</h2><form onSubmit={submit}>{sheet.fields.map(([name,,min,max,step],i)=><label key={name}>{name}<input required type={min===undefined?"text":"number"} pattern={min===undefined?".*\\S.*":undefined} min={min} max={max} step={step} maxLength={240} value={values[i]} onChange={e=>{setValues(values.map((v,j)=>i===j?e.target.value:v));setRows([])}}/></label>)}<button>Generate result</button></form><div aria-live="polite">{rows.length>0&&<><h3>Result</h3><ul>{rows.map((r,i)=><li key={i}>{r}</li>)}</ul></>}</div></section>
}
type Flow={fields:string[][];actions:string[];describe:(v:string[],stage:number)=>string};
const flows:Record<string,Flow>={
  "/tools/service-desk":{fields:[["Ticket summary","Device enrollment is blocked"],["Classification","Access","Hardware","Connectivity"],["Assigned team","Service desk","Network operations","Endpoint support"],["Resolution","Restored access and verified with the requester"]],actions:["Create ticket","Classify incident","Assign ticket","Resolve incident"],describe:(v,i)=>["Ticket opened · "+v[0],"Classified · "+v[1]+" · sample response target 4 business hours","Assigned · "+v[2],"Resolved · "+v[3]][i]},
  "/products/virtualiec":{fields:[["Intention","Prepare a customer discovery interview"],["Context to retain","The buyer approves enterprise device quotes"],["Next action","Draft three questions about quote approval"],["Observed outcome","Identified the person who can approve a revised quote"]],actions:["Save intention","Attach context","Accept action","Record outcome"],describe:(v,i)=>["Intention · "+v[0],"Working context · "+v[1],"Accepted action · "+v[2],"Observed outcome · "+v[3]][i]},
  "/work/yeesp":{fields:[["Freelance milestone","Deliver the first lesson design"],["Evidence submitted","Lesson outline and assessment rubric"],["Reviewer decision","Approve","Request revision"]],actions:["Agree milestone","Submit work","Record review"],describe:(v,i)=>["Milestone agreed · "+v[0],"Contributor submitted · "+v[1],"Reviewer decision · "+v[2]][i]},
};
function FlowView({flow}:{flow:Flow}){
  const [values,setValues]=useState(flow.fields.map(f=>f[1])),[log,setLog]=useState<string[]>([]);
  const stage=log.length,f=flow.fields[stage];
  function edit(value:string){setValues(values.map((v,i)=>i===stage?value:v))}
  return <section className="innovation-panel"><h2>Run the sample workflow</h2><p>Illustrative session using fictional records.</p>{f&&<form onSubmit={e=>{e.preventDefault();setLog([...log,flow.describe(values,stage)])}}><label>{f[0]}{f.length>2?<select value={values[stage]} onChange={e=>edit(e.target.value)}>{f.slice(1).map(o=><option key={o}>{o}</option>)}</select>:<input required pattern=".*\S.*" maxLength={240} value={values[stage]} onChange={e=>edit(e.target.value)}/>}</label><button>{flow.actions[stage]}</button></form>}<ol aria-live="polite">{log.map((row,i)=><li key={i}>{row}</li>)}</ol>{log.length>0&&<button onClick={()=>{setLog([]);setValues(flow.fields.map(f=>f[1]))}}>Start over</button>}</section>
}
function Controls({card}:{card:boolean}){
  const [balance,setBalance]=useState<number|null>(null),[amount,setAmount]=useState("500"),[role,setRole]=useState("Contributor"),[action,setAction]=useState("Submit work"),[log,setLog]=useState<string[]>([]);
  function test(e:FormEvent){e.preventDefault();
    let entry:string;
    if(card){const cents=Math.round(Number(amount)*100);if(balance===null){setBalance(cents);setAmount("50");entry="Sample card issued · "+money(cents)}else if(cents<=balance){setBalance(balance-cents);entry="Approved · "+money(cents)}else entry="Declined · "+money(cents)+" exceeds available limit"}
    else {const rule:Record<string,string>={Contributor:"Submit work",Reviewer:"Approve work",Administrator:"Manage roles"};entry=role+" · "+action+" · "+(rule[role]===action?"Allowed":"Denied")}
    setLog([...log,entry]);
  }
  return <section className="innovation-panel"><h2>{card?"Test a sample card":"Test access"}</h2><form onSubmit={test}>{card?<label>{balance===null?"Issue limit (AED)":"Payment amount (AED)"}<input type="number" min=".01" max="1000000" step=".01" required value={amount} onChange={e=>setAmount(e.target.value)}/></label>:<><label>Role<select value={role} onChange={e=>setRole(e.target.value)}>{["Contributor","Reviewer","Administrator"].map(x=><option key={x}>{x}</option>)}</select></label><label>Requested action<select value={action} onChange={e=>setAction(e.target.value)}>{["Submit work","Approve work","Manage roles"].map(x=><option key={x}>{x}</option>)}</select></label></>}<button>{card?(balance===null?"Issue demo card":"Attempt payment"):"Check permission"}</button></form><div aria-live="polite">{balance!==null&&<p>Available limit · {money(balance)}</p>}<ol>{log.map((s,i)=><li key={i}>{s}</li>)}</ol></div></section>
}
export function InnovationTool({path}:{path:string}){
  if(worksheets[path])return <WorksheetView sheet={worksheets[path]}/>;
  if(flows[path])return <FlowView flow={flows[path]}/>;
  if(["/tools/card-controls","/tools/role-access"].includes(path))return <Controls card={path==="/tools/card-controls"}/>;
  return null;
}
const flagship = [
  { title: "Device as a Service", label: "Enterprise telecom", image: "device-order", path: "/demo/device-order", summary: "Configure devices, issue a quote and follow the order through approval and fulfillment." },
  { title: "Islamic BNPL simulator", label: "Islamic finance", image: "murabaha", path: "/solutions/islamic-bnpl", summary: "Set the asset cost, disclosed profit and term to generate an installment schedule." },
  { title: "VirtualIEC", label: "AI · Local beta candidate", image: "virtualiec", path: "/products/virtualiec", summary: "Build an action plan from an intention and see how the workflow tracks context and outcomes." },
  { title: "YEESP", label: "Learning and freelance marketplace", image: "yeesp", path: "/work/yeesp", summary: "Submit a sample milestone and see which decisions belong to the contributor and reviewer." },
];

export function InnovationDirectory() {
  const products = innovationPages.filter(page => !flagship.some(feature => feature.path === page.path) && !page.path.startsWith("/tools/"));
  const tools = innovationPages.filter(page => page.path.startsWith("/tools/"));
  return <div className="innovation-directory">
    <section aria-labelledby="lab-featured">
      <h2 id="lab-featured">Featured demos</h2>
      <div className="innovation-feature-grid">{flagship.map(feature =>
        <a className="innovation-feature" href={feature.path} key={feature.path}>
          <img src={"/work/" + feature.image + ".webp"} alt="" width="640" height="400" loading="lazy"/>
          <div><span>{feature.label}</span><h3>{feature.title}</h3><p>{feature.summary}</p><strong>Open walkthrough</strong></div>
        </a>
      )}</div>
    </section>
    <section aria-labelledby="lab-products">
      <h2 id="lab-products">Products and architecture</h2>
      <div className="innovation-list">{products.map(page =>
        <a href={page.path} key={page.path}><span>{page.label}</span><h3>{page.title}</h3><p>{page.intro}</p></a>
      )}</div>
    </section>
    <section aria-labelledby="lab-tools">
      <h2 id="lab-tools">Interactive tools</h2>
      <div className="innovation-list">{tools.map(page =>
        <a href={page.path} key={page.path}><span>{page.label}</span><h3>{page.title}</h3><p>{page.intro}</p></a>
      )}</div>
    </section>
  </div>;
}
