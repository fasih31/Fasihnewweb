import { useParams } from "wouter";
import { studies } from "@shared/work";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/seo-head";
import NotFound from "./not-found";

export default function WorkStory() {
  const { slug } = useParams();
  const study = studies.find(item => item.slug === slug);
  if (!study) return <NotFound />;
  return <><SEOHead title={study.title + " | Fasih ur Rehman"} description={study.context}
    canonicalUrl={"https://iamfasih.com/work/" + slug} ogImage={"/work/" + study.art + ".webp"} />
    <Navigation /><main className="folio story"><article className="folio-width">
      <a className="folio-link" href="/#portfolio">← Selected work</a>
      <div className="story-intro"><div><p className="eyebrow">{study.name}</p><h1>{study.title}</h1>
        <p>{study.context}</p></div><img src={"/work/" + study.art + ".webp"} alt="" /></div>
      <h2>{study.question}</h2><p>{study.decision}</p><h2>How I’d test it</h2><p>{study.check}</p>
      <a className="folio-link" href={study.href}>{study.link} ↗</a>
    </article></main><Footer /></>;
}
