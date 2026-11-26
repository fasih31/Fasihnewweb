import type { Chapter } from "./profile";

type Calculator = [string,string,string,[string,number,number,number][],(inputs:number[])=>string];
const percent = (value:number) => value.toFixed(2)+"%";
const number = (value:number) => value.toLocaleString("en-AE",{maximumFractionDigits:2});
const catalog: Calculator[] = [
  ["conversion-rate","Conversion rate","Product management",[["Conversions",80,0,100000000],["Eligible visitors",1200,1,100000000]],([a,b])=>a>b?"Conversions must fit within eligible visitors.":percent(a/b*100)],
  ["retention-rate","Cohort retention","Product management",[["Returning cohort members",38,0,100000000],["Original cohort size",100,1,100000000]],([a,b])=>a>b?"Returning members must fit within the original cohort.":percent(a/b*100)],
  ["weighted-priority","Weighted feature scoring","Product management",[["Value, from 1 to 10",8,1,10],["Urgency, from 1 to 10",6,1,10],["Effort, from 1 to 10",4,1,10]],([a,b,c])=>number((a+b)/c)+" priority points"],
  ["pert-estimator","PERT duration estimator","Project management",[["Optimistic days",4,0,10000],["Most likely days",8,0,10000],["Pessimistic days",15,0,10000]],([a,b,c])=>a>b||b>c?"Enter the durations in increasing order.":number((a+4*b+c)/6)+" expected days"],
  ["cost-variance","Project cost variance","Project management",[["Earned value",8000,0,100000000],["Actual cost",9000,0,100000000]],([a,b])=>number(a-b)+" cost variance (earned value minus actual cost)"],
  ["schedule-performance","Schedule performance index","Project management",[["Earned value",8000,0,100000000],["Planned value",10000,1,100000000]],([a,b])=>number(a/b)+" schedule performance index"],
  ["murabaha-profit","Disclosed profit calculator","Islamic finance",[["Acquisition cost",5000,0.01,100000000],["Agreed selling price",5400,0.01,100000000]],([a,b])=>b<a?"The selling price is below acquisition cost.":number(b-a)+" disclosed profit in AED"],
  ["automation-payback","Automation payback estimator","AI & business",[["Setup cost",12000,0,100000000],["Monthly gross savings",2500,0,100000000],["Monthly operating cost",500,0,100000000]],([a,b,c])=>b<=c?"No payback at the entered costs and savings.":number(a/(b-c))+" months"],
  ["model-cost","AI model usage cost","AI & business",[["Input tokens",50000,0,1000000000],["Output tokens",10000,0,1000000000],["Input cost per million tokens",2,0,10000],["Output cost per million tokens",8,0,10000]],([a,b,c,d])=>((a*c+b*d)/1000000).toFixed(4)+" in the pricing currency"],
  ["sla-availability","Service availability","Enterprise IT",[["Observation window in minutes",43200,1,1000000],["Downtime in minutes",45,0,1000000]],([a,b])=>b>a?"Downtime exceeds the observation window.":percent((a-b)/a*100)+" availability"],
  ["sla-attainment","SLA attainment","Enterprise IT",[["Tickets within target",91,0,1000000],["Measured tickets",100,1,1000000]],([a,b])=>a>b?"Tickets within target cannot exceed measured tickets.":percent(a/b*100)+" within target"],
  ["merchant-settlement","Merchant settlement estimate","Financial technology",[["Gross settled payments",10000,0,100000000],["Refunds and reversals",500,0,100000000],["Processing fees",210,0,100000000]],([a,b,c])=>number(a-b-c)+" net settlement in AED"],
  ["chargeback-rate","Chargeback rate","Financial technology",[["Chargeback count",12,0,1000000],["Settled transactions",4000,1,1000000]],([a,b])=>a>b?"Chargebacks exceed transactions in this sample.":percent(a/b*100)+" by transaction count"],
];
export const calculatorWorksheets = Object.fromEntries(catalog.map(([slug,, ,fields,calculate])=>[
  "/tools/"+slug,{fields:fields.map(([label,initial,min,max]):[string,string,number,number,number]=>[label,String(initial),min,max,initial%1===0 && !label.includes("cost") && !label.includes("price") && !label.includes("value") && !label.includes("payments") && !label.includes("fees") && !label.includes("reversals") && !label.includes("savings")?1:0.01]),run:(values:string[])=>[calculate(values.map(Number))]},
]));
export const calculatorPages: Chapter[] = catalog.map(([slug,title,label,fields])=>({
  path:"/tools/"+slug,title,label,intro:"Estimate "+title.toLowerCase()+" from "+fields.map(([name])=>name.toLowerCase()).join(", ")+".",
  sections:[],links:[["All professional tools","/innovation-lab"]],
}));
