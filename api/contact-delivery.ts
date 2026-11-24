import nodemailer from "nodemailer";
import { z } from "zod";

const input = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(6000),
});
const destination = "fasih31@gmail.com";
let windowStart = 0;
let count = 0;

export default async function handler(req:any,res:any) {
  const user = process.env.EMAIL_USER || destination;
  const password = process.env.EMAIL_PASSWORD;
  res.setHeader("Cache-Control","no-store");
  if(req.method === "GET") return res.json({mode:password ? "direct" : "compose"});
  if(req.method !== "POST") return res.status(405).json({message:"Use the contact form."});
  if(!password) return res.status(503).json({message:"Email delivery is unavailable. Continue in Gmail to send your message."});
  const data=input.safeParse(req.body);
  if(!data.success) return res.status(400).json({message:"Check your name, email and message."});
  if(Date.now()-windowStart>=60000){windowStart=Date.now();count=0;}
  if(count>=8) return res.status(429).json({message:"Please try again in a minute, or use Gmail."});
  count++;
  const mail=nodemailer.createTransport({service:"gmail",auth:{user,pass:password},connectionTimeout:6000,socketTimeout:9000});
  try{
    const result=await mail.sendMail({from:user,to:destination,replyTo:data.data.email,subject:"Portfolio enquiry",text:[data.data.name,data.data.email,"",data.data.message].join("\n")});
    if(!result.accepted.length) throw new Error("Recipient declined");
    return res.json({success:true,delivered:true});
  }catch{
    return res.status(502).json({message:"Gmail delivery could not be confirmed. Your message is still here."});
  }
}
