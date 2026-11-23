import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { NewsletterForm } from "@/components/newsletter-form";
import { OrderDemo } from "@/components/order-demo";
import { SEOHead } from "@/components/seo-head";
import { studies } from "@shared/work";
import { solutions, projects } from "@/data/portfolio-data";

export default function Home() {
  return <><SEOHead title="Fasih ur Rehman | Enterprise Product Management & Fintech, UAE"
    description="Explore Fasih ur Rehman’s enterprise device-ordering demo, Islamic fintech work, YEESP marketplace decisions and VirtualIEC AI prototype."
    ogImage="/work/device-order.webp" canonicalUrl="https://iamfasih.com/" />
    <Navigation /><main className="folio">
      <div className="folio-width">
        <section id="hero" className="folio-hero"><div>
          <p className="eyebrow">Senior Project Manager · e& (Etisalat), UAE</p>
          <h1>What happens<br />after you<br /><em>click accept?</em></h1>
          <p className="hero-bio">I’m Fasih. At e& (Etisalat), I work on how businesses choose, approve and order enterprise services.</p>
          <a className="folio-link" href="#about">More about me ↗</a>
        </div><OrderDemo /></section>
        <section id="portfolio" className="work-section"><h2>Selected work</h2><div className="work-grid">
          {studies.map(study => <a href={"/work/" + study.slug} className={"work-tile " + study.art} key={study.slug}>
            <img src={"/work/" + study.art + ".webp"} alt="" width="248" height="250" />
            <div><h3>{study.name}</h3><p>{study.title}</p></div></a>)}
        </div></section>
        <section id="about" className="folio-about"><h2>About Fasih</h2><div>
          <p>I work with business and engineering teams to turn complex enterprise requirements into services people can use. My experience spans telecom in the UAE, enterprise ICT in Saudi Arabia and fintech in Pakistan.</p>
          <p>Outside work, I explore marketplace design through YEESP and AI memory through VirtualIEC.</p>
          <a className="folio-link" href="/expertise">Explore my expertise ↗</a>
        </div></section>
        <div className="folio-directory">
          <section id="services"><h2>Services</h2><a href="/expertise">Product and delivery expertise ↗</a><a href="/#contact">Discuss a project ↗</a></section>
          <section id="solutions"><h2>Solutions</h2>{solutions.map(item => <a key={item.id} href={"/solutions/" + item.id}>{item.title} ↗</a>)}</section>
          <section><h2>Project archive</h2>{projects.map(item => <a key={item.id} href={"/project/" + item.id}>{item.title} ↗</a>)}</section>
        </div>
      </div><ContactSection /><div className="folio-width newsletter-wrap"><NewsletterForm /></div>
    </main><Footer /></>;
}
