import { readings, portfolioQuery } from "../shared/portfolio-guide.js";

export default async function handler(req:any,res:any) {
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST")return res.status(405).json({error:"POST required"});
  const question=req.body?.question;
  if(typeof question!=="string"||!question.trim()||question.length>700)return res.status(400).json({error:"Enter a question of up to 700 characters."});
  const previous = typeof req.body?.previous === "string" ? req.body.previous.slice(0, 700) : "";
  const sources=readings(portfolioQuery(question, previous));
  return res.json({mode:"reading",sources});
}
