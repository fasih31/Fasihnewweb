import {InnovationDirectory, InnovationTool} from "@/components/innovation-tools";
import { PortfolioReading } from "@/components/portfolio-reading";
import { ChapterHeading, artFor } from "@shared/chapter-heading";
import { HomeCover } from "@shared/home-cover";
import "./home-cover.css";
import { useEffect } from "react";
import { ChapterMeta } from "@/components/chapter-meta";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CareerExplorer } from "@/components/career-explorer";
import { deliveryNotes } from "@shared/delivery-notes";
import { ContactSection } from "@/components/contact-section";

import { DeliveryLab, PortfolioGuide } from "@/components/portfolio-lab";
import { OrderDemo } from "@/components/order-demo";
import { home, career, notebook, expertise, research, domains, type Chapter } from "@shared/profile";
import "./personal.css";

function Directory({items, illustrated=false}: {items:Chapter[]; illustrated?:boolean}) {
  return <div className="personal-grid">{items.map(item=><a key={item.path} href={item.path}>
    {illustrated && artFor(item) && <img className="note-thumbnail" src={artFor(item)} alt="" loading="lazy" width="360" height="150"/>}
    <small>{item.label}</small><h3>{item.title} <span aria-hidden="true">↗</span></h3>
  </a>)}</div>;
}

export default function PersonalPage({chapter:c}:{chapter:Chapter}) {
  const isHome = c === home;
  useEffect(()=>{
    if(isHome && window.location.hash==="#contact") window.location.replace("/contact");
  },[isHome]);
  return <><ChapterMeta chapter={c}/>
    <Navigation/>{isHome ? <HomeCover/> : <main className="folio personal"><div className="folio-width">
    <ChapterHeading chapter={c}/>
    {c.path==="/innovation-lab" ? <InnovationDirectory/> : <InnovationTool key={c.path} path={c.path}/>}
    {c.path==="/demo/device-order" && <DeliveryLab/>}
    {c.path==="/ask" && <PortfolioGuide/>}
    {c===expertise && <section className="profile-section"><h2>My professional experience</h2>
      <Directory illustrated items={domains.filter(d=>!["/domains/ai-ml","/domains/crypto-web3"].includes(d.path))}/>
            <h2>Research and independent interests</h2><Directory items={domains.filter(d=>["/domains/ai-ml","/domains/crypto-web3"].includes(d.path))}/></section>}
    {c===notebook && <section className="profile-section"><h2>Read the notes</h2><Directory illustrated items={deliveryNotes}/><div className="personal-links"><a href="/notebook.xml">Subscribe in an RSS reader ↗</a></div></section>}
    {c===career ? <CareerExplorer/> : <PortfolioReading chapter={c}/>}
    {c.path==="/domains/telecom" && <section className="profile-band"><div><h2>A device order, step by step</h2><p>An illustrative walkthrough of how responsibilities change after a quotation is accepted.</p></div><OrderDemo/></section>}
    {c.path!=="/innovation-lab" && c!==expertise && c!==notebook && c!==research && c!==career && c.links.length>0 && <nav className="personal-links" aria-label="Further reading">{c.links.map(([label,href])=><a href={href} key={href}>{label} ↗</a>)}</nav>}
    </div>{c.path==="/contact" && <ContactSection/>}</main>}<Footer/></>;
}
