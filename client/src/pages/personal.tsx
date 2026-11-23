import { careerOverview } from "@shared/career-overview";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CareerExplorer } from "@/components/career-explorer";
import { deliveryNotes } from "@shared/delivery-notes";
import { ContactSection } from "@/components/contact-section";

import { OrderDemo } from "@/components/order-demo";
import { home, career, notebook, expertise, education, projectsPage, research, domains, portrait, titleFor, schemaFor, type Chapter } from "@shared/profile";
import "./personal.css";

function Directory({items, illustrated=false}: {items:Chapter[]; illustrated?:boolean}) {
  return <div className="personal-grid">{items.map(item=><a key={item.path} href={item.path}>
    {illustrated && item.image && <img className="note-thumbnail" src={item.image} alt="" loading="lazy" width="360" height="150"/>}
    <small>{item.label}</small><h3>{item.title} <span aria-hidden="true">↗</span></h3>
  </a>)}</div>;
}

export default function PersonalPage({chapter:c}:{chapter:Chapter}) {
  const isHome = c === home;
  useEffect(()=>{
    if(isHome && window.location.hash==="#contact") window.location.replace("/contact");
  },[isHome]);
  const photo = isHome ? portrait : c.image;
  const url = "https://iamfasih.com"+c.path;
  return <><Helmet><title>{titleFor(c)}</title><meta name="description" content={c.intro}/><link rel="canonical" href={url}/>
    <meta property="og:title" content={titleFor(c)}/><meta property="og:description" content={c.intro}/><meta property="og:url" content={url}/>
    <meta property="og:type" content={isHome?"profile":"website"}/><meta property="og:image" content={"https://iamfasih.com"+(photo||portrait)}/>
    <meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">{JSON.stringify(schemaFor(c))}</script></Helmet>
    <Navigation/><main className="folio personal"><div className="folio-width">
    <header className={'profile-intro'+(photo?' with-art':'')}><div>
      {!isHome && <a className="profile-back" href="/">Fasih ur Rehman / Portfolio</a>}
      <p className="eyebrow">{c.label}</p><h1>{c.title}</h1><p className="hero-bio">{c.intro}</p>
      {isHome && <div className="personal-links"><a href="/career">Read my career history ↗</a><a href="/about">About me ↗</a></div>}
    </div>{photo && <img className={photo===portrait?'portrait':'chapter-art'} src={photo} alt={photo===portrait?"Fasih ur Rehman":""} fetchPriority="high"/>}</header>
    {isHome && <section className="profile-section" id="portfolio">
      <h2>My work across industries</h2>
      <div className="experience-ledger">{careerOverview.map(segment=><article key={segment.field}>
        <div><small>{segment.employers}</small><h3>{segment.field}</h3></div>
        <div><p>{segment.contribution}</p><nav aria-label={segment.field+" roles"}>{segment.roles.map(([title,href])=><a key={href} href={href}>{title} ↗</a>)}</nav></div>
      </article>)}</div></section>}
    {c===expertise && <section className="profile-section"><h2>My professional experience</h2>
      {domains.filter(d=>!["/domains/ai-ml","/domains/crypto-web3"].includes(d.path)).map(d=><article className="profile-band" key={d.path}>
        <div><small>{d.label}</small><h3><a href={d.path}>{d.title}</a></h3></div><div><p>{d.intro}</p><a className="folio-link" href={d.path}>Read my experience ↗</a></div>
      </article>)}
      <h2>Research and independent interests</h2><Directory items={domains.filter(d=>["/domains/ai-ml","/domains/crypto-web3"].includes(d.path))}/></section>}
    {c===notebook && <section className="profile-section"><h2>Read the notes</h2><Directory illustrated items={deliveryNotes}/></section>}
    {c===career ? <CareerExplorer/> :
      c.sections.map(([heading,body])=><section className="profile-band" key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
    {c.path==="/domains/telecom" && <section className="profile-band"><div><h2>A device order, step by step</h2><p>An illustrative walkthrough of how responsibilities change after a quotation is accepted.</p></div><OrderDemo/></section>}
    {isHome && <section className="profile-section"><h2>Education and published work</h2><p className="hero-bio">I studied computer science at ILMA University and earned my PMP in 2024. I also co-authored two papers on fintech privacy and the impact of AI.</p><Directory items={[education,research]}/><nav className="personal-links"><a href={notebook.path}>My delivery notebook ↗</a><a href={projectsPage.path}>Independent projects ↗</a></nav></section>}
    {c!==expertise && c!==notebook && c!==career && c.links.length>0 && <nav className="personal-links" aria-label="Further reading">{c.links.map(([label,href])=><a href={href} key={href}>{label} ↗</a>)}</nav>}
    </div>{c.path==="/contact" && <ContactSection/>}</main><Footer/></>;
}
