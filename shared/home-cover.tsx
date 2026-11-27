import React from "react";
import { careerOverview } from "./career-overview";

const features = [
  { image: "devices", company: "e& · UAE", title: "From quote to device order", caption: "See how I map quote acceptance, verification and fulfillment across business and operations teams.", href: "/solutions/device-as-a-service" },
  { image: "payments", company: "Greens Fin Innovations · Pakistan", title: "Islamic digital financing", caption: "Explore the design decisions behind a deferred purchase, from disclosed profit to the final installment.", href: "/expertise/islamic-fintech" },
  { image: "virtualiec", company: "VirtualIEC · Local beta candidate", title: "What should an AI remember?", caption: "Inside my intention workspace and the decision to separate working context from recalled experience.", href: "/products/virtualiec" },
];

export function HomeCover() {
  return <main className="folio home-cover" id="main-content">
    <div className="cover-width">
      <header className="cover-intro" id="about">
        <div className="cover-copy"><p className="cover-role">Enterprise product leadership · UAE</p>
          <h1>Fasih <span>ur Rehman</span></h1>
          <p className="cover-position">Product leader and solution architect</p>
          <p className="cover-lead">I lead enterprise device-ordering delivery at e& (Etisalat). My experience spans Islamic fintech product design, enterprise technology delivery, and independent AI products.</p>
          <nav className="cover-actions" aria-label="Introduction"><a href="/resume">Read my résumé</a><a href="#portfolio">See selected work</a><a href="/contact">Get in touch</a></nav>
        </div>
        <aside className="cover-companion" aria-label="Portfolio assistant">
          <h2>Ask Fasih</h2>
          <p>Explore my work at e&, independent products, and the principles behind Islamic banking.</p>
          <div className="cover-suggestions">
            <a href="/ask?question=What%20does%20Fasih%20do%20at%20e%26%3F">What do you do at e&amp;?</a>
            <a href="/ask?question=How%20does%20Murabaha%20work%3F">How does Murabaha work?</a>
          </div>
          <a href="/ask">Open the assistant</a>
        </aside>
      </header>
      <dl className="cover-credentials">
        <div><dt>Current role</dt><dd>Senior Project Manager at e& (Etisalat)</dd></div>
        <div><dt>Markets</dt><dd>UAE · Saudi Arabia · Pakistan</dd></div>
        <div><dt>Credential</dt><dd>Project Management Professional (PMP)</dd></div>
      </dl>
      <section id="portfolio" className="cover-section">
        <div className="cover-heading"><h2>Selected work</h2><a href="/career">Career history ↗</a></div>
        <div className="cover-cards">{features.map(f=><a href={f.href} key={f.href}>
          <div className="cover-photo"><img src={f.image==='virtualiec'?'/work/virtualiec.webp':'/work/cover-'+f.image+'.webp'} alt="" width="600" height="600" loading="lazy"/></div>
          <small>{f.company}</small><h3>{f.title}</h3><p>{f.caption}</p>
        </a>)}</div>
      </section>
      <section className="cover-section cover-index"><div className="cover-heading"><h2>Career by field</h2></div>
        <div className="cover-fields">{careerOverview.map(s=><div key={s.field}><h3>{s.field}</h3>{s.roles.map(([title,href])=><a key={href} href={href}>{title} ↗</a>)}</div>)}</div>
      </section>
      <section className="cover-section"><div className="cover-heading"><h2>Innovation Lab</h2></div><nav className="cover-actions" aria-label="Interactive portfolio"><a href="/innovation-lab">Explore products and tools</a><a href="/ask">Ask Fasih</a></nav></section>
      <nav className="cover-shelf" aria-label="More from Fasih"><a href="/notes">Delivery notebook ↗</a><a href="/research">Published research ↗</a><a href="/education">Education ↗</a><a href="/projects">Independent projects ↗</a></nav>
    </div>
  </main>;
}
