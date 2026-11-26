import React from "react";
import { portrait } from "./profile";
import { careerOverview } from "./career-overview";

const features = [
  { image: "devices", company: "e& · UAE", title: "From quote to device order", caption: "How I map the decisions between choosing a device and getting it into a customer’s hands.", href: "/demo/device-order" },
  { image: "payments", company: "Greens Fin Innovations · Pakistan", title: "Designing a deferred purchase", caption: "Explore the design decisions behind a deferred purchase, from disclosed profit to the final installment.", href: "/solutions/islamic-bnpl" },
  { image: "virtualiec", company: "VirtualIEC · Local beta candidate", title: "What should an AI remember?", caption: "Inside my intention workspace and the decision to separate working context from recalled experience.", href: "/products/virtualiec" },
];

export function HomeCover() {
  return <main className="folio home-cover" id="main-content">
    <div className="cover-width">
      <header className="cover-intro" id="about">
        <div className="cover-copy"><p className="cover-role">Enterprise product leadership · UAE</p>
          <h1>Fasih <span>ur Rehman</span></h1>
          <p className="cover-position">Product leader and solution architect</p>
          <p className="cover-lead">At e& in the UAE, I lead delivery across the journey from a device quote to an enterprise order. I also design financial products and build independent platforms for AI, learning and work.</p>
          <nav className="cover-actions" aria-label="Introduction"><a href="/case-studies">Explore the case studies</a><a href="/innovation-lab">Try the innovation lab</a><a href="/career">Professional journey</a></nav>
        </div>
        <img className="cover-portrait" src={portrait} alt="Fasih ur Rehman" width="630" height="840" {...{fetchpriority:"high"}}/>
      </header>
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
      <section className="cover-section"><div className="cover-heading"><h2>Innovation Lab</h2></div><nav className="cover-actions" aria-label="Interactive portfolio"><a href="/innovation-lab">Explore products and tools</a><a href="/ask">Ask my portfolio guide ↗</a></nav></section>
      <nav className="cover-shelf" aria-label="More from Fasih"><a href="/notes">Delivery notebook ↗</a><a href="/research">Published research ↗</a><a href="/education">Education ↗</a><a href="/projects">Independent projects ↗</a></nav>
    </div>
  </main>;
}
