import React from "react";
import { portrait } from "./profile";
import { careerOverview } from "./career-overview";

const features = [
  { image: "devices", company: "e& · UAE", title: "From quote to device order", caption: "How I map the decisions between choosing a device and getting it into a customer’s hands.", href: "/domains/telecom" },
  { image: "payments", company: "Greens Fin Innovations · Pakistan", title: "Rethinking how payments work", caption: "I helped adapt eight finance products for Islamic banking, from virtual cards to retail finance.", href: "/career/greens-fin" },
  { image: "learning", company: "Green EdTech · Pakistan", title: "Listening to learners", caption: "How learner feedback shaped two features on the product roadmap I managed.", href: "/career/green-edtech" },
];

export function HomeCover() {
  return <main className="folio home-cover">
    <div className="cover-width">
      <header className="cover-intro" id="about">
        <div className="cover-copy"><p className="cover-role">Senior Project Manager · e&</p>
          <h1>Fasih <span>ur Rehman</span></h1>
          <p className="cover-lead">I lead enterprise product delivery in the UAE. My path here took me through Saudi ICT, Islamic finance and education technology.</p>
          <nav className="cover-actions" aria-label="Introduction"><a href="#portfolio">Explore my work <span aria-hidden="true">↓</span></a><a href="/about">About me</a></nav>
        </div>
        <img className="cover-portrait" src={portrait} alt="Fasih ur Rehman" width="630" height="840" {...{fetchpriority:"high"}}/>
      </header>
      <section id="portfolio" className="cover-section">
        <div className="cover-heading"><h2>Selected work</h2><a href="/career">Career history ↗</a></div>
        <div className="cover-cards">{features.map(f=><a href={f.href} key={f.href}>
          <div className="cover-photo"><img src={'/work/cover-'+f.image+'.webp'} alt="" width="600" height="600" loading="lazy"/></div>
          <small>{f.company}</small><h3>{f.title}</h3><p>{f.caption}</p>
        </a>)}</div>
      </section>
      <section className="cover-section cover-index"><div className="cover-heading"><h2>Career by field</h2></div>
        <div className="cover-fields">{careerOverview.map(s=><div key={s.field}><h3>{s.field}</h3>{s.roles.map(([title,href])=><a key={href} href={href}>{title} ↗</a>)}</div>)}</div>
      </section>
      <nav className="cover-shelf" aria-label="More from Fasih"><a href="/notes">Delivery notebook ↗</a><a href="/research">Published research ↗</a><a href="/education">Education ↗</a><a href="/projects">Independent projects ↗</a></nav>
    </div>
  </main>;
}
