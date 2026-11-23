import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { NewsletterForm } from "@/components/newsletter-form";
import { OrderDemo } from "@/components/order-demo";
import { home, career, expertise, education, projectsPage, research, domains, roles, portrait, titleFor, schemaFor, type Chapter } from "@shared/profile";
import "./personal.css";

function Directory({items}: {items:Chapter[]}) {
  return <div className="personal-grid">{items.map(item=><a key={item.path} href={item.path}>
    <small>{item.label}</small><h3>{item.title} <span aria-hidden="true">↗</span></h3>
  </a>)}</div>;
}

export default function PersonalPage({chapter:c}:{chapter:Chapter}) {
  const isHome = c === home;
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
    {isHome && <section className="profile-band" id="about"><h2>Where I work today</h2><div><h3>e& (Etisalat) · UAE</h3><p>{roles[0].account}</p><a className="folio-link" href="/domains/telecom">My work in enterprise telecom ↗</a></div></section>}
    {(isHome || c===expertise) && <section id="portfolio" className="profile-section"><h2>{isHome?"My experience across domains":"Explore the domains"}</h2><Directory items={domains}/></section>}
    {c===career ? <div className="profile-timeline">{roles.map(r=><section className="profile-band" key={r.company+r.title}><div><small>{r.dates}</small><p>{r.domain}</p></div><div><h2>{r.title}</h2><h3>{r.company}</h3><p>{r.account}</p></div></section>)}</div> :
      c.sections.map(([heading,body])=><section className="profile-band" key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
    {c.path==="/domains/telecom" && <section className="profile-band"><div><h2>A device order, step by step</h2><p>An illustrative walkthrough of how responsibilities change after a quotation is accepted.</p></div><OrderDemo/></section>}
    {isHome && <section className="profile-section"><h2>Research, education and independent work</h2><Directory items={[research,education,projectsPage]}/></section>}
    {c!==expertise && c.links.length>0 && <nav className="personal-links" aria-label="Further reading">{c.links.map(([label,href])=><a href={href} key={href}>{label} ↗</a>)}</nav>}
    </div>{isHome && <><ContactSection/><div className="folio-width newsletter-wrap"><NewsletterForm/></div></>}</main><Footer/></>;
}
