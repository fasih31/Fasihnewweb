import { publications } from "@shared/publications";
import { education, projectsPage, research, rolePages, type Chapter } from "@shared/profile";
const resume="/attached_assets/Fasih%20Ur%20Rehman%20Resume_1761533879218.pdf";
const evidence:Record<string,[string,number]> = {
  "/career/greens-fin":["greens-fin",2], "/career/imarkplace":["imarkplace",2],
  "/career/usmani-and-co":["usmani-and-co",2], "/education":["education",3]
};
function PublicationList(){
  return <div className="paper-list">{publications.map(p=>{
    const citation = ["TY  - JOUR","TI  - "+p.title,...p.authors.map(author=>"AU  - "+author),"JO  - "+p.journal,"PY  - "+p.year,"VL  - "+p.volume,"IS  - "+p.issue,...(p.doi?["DO  - "+p.doi]:[]),"UR  - "+p.url,"ER  - "].join("\r\n");
    return <article key={p.url}><small>{p.journal} · {p.year} · Vol. {p.volume} ({p.issue})</small>
      <h2>{p.title}</h2><p className="byline">{p.authors.join(" · ")}</p><p>{p.text}</p>
      <div className="paper-actions"><a href={p.url}>Read the published paper ↗</a><a href={"data:application/x-research-info-systems;charset=utf-8,"+encodeURIComponent(citation)} download={"Fasih-Rehman-"+p.volume+".ris"}>Download citation (.ris) ↓</a></div>
    </article>})}</div>;
}

export function PortfolioReading({chapter:c}:{chapter:Chapter}){
  if(c===research)return <PublicationList/>;
  if(!c.sections.length)return null;
  const record=evidence[c.path];
  const index=rolePages.indexOf(c);
  const pdfPage=index<2?1:index<8?2:3;
  return <div className="folio-reading">
    <aside><nav aria-label="On this page"><h2>On this page</h2>{c.sections.map(([heading],i)=><a key={heading} href={"#section-"+(i+1)}>{heading}</a>)}</nav>
    {index>=0 && <a className="source-link" href={resume+"#page="+pdfPage}>View role in résumé ↗</a>}</aside>
    <div>{c.sections.map(([heading,body],i)=><section className="reading-section" key={heading} id={"section-"+(i+1)}>
      {c===projectsPage && i===0 && <img className="project-mark" src="/attached_assets/YEESP-Icon-PNG_1761509999482.png" alt="YEESP project emblem" width="72" height="72" loading="lazy"/>}
      <h2>{heading}</h2><p>{body}</p></section>)}
      {record && <figure className="document-extract"><a href={resume+"#page="+record[1]}><img loading="lazy" src={"/evidence/"+record[0]+".webp"} alt={c===education?"Excerpt listing my education and qualifications":"Original résumé entry for "+c.title}/></a><figcaption>From my résumé · <a href={resume+"#page="+record[1]}>Open page {record[1]} ↗</a></figcaption></figure>}
    </div></div>;
}
