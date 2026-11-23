import { deliveryNotes } from "../shared/delivery-notes";
import { careerOverview } from "../shared/career-overview";
import { chapters, resources, home, notebook, domains, career, projectsPage, education, research, titleFor, schemaFor, portrait } from "../shared/profile";

const origin = "https://iamfasih.com";
const esc = (s:string)=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
export const publicPages=[...chapters,...resources];
export function notebookFeed() {
  const items=deliveryNotes.map(note=>{
    const link=origin+note.path;
    return '<item><title>'+esc(note.title)+'</title><link>'+link+'</link><guid>'+link+'</guid><description>'+esc(note.intro)+'</description></item>';
  });
  return '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Fasih ur Rehman — Delivery notebook</title><link>'+origin+'/notes</link><description>Field notes on enterprise telecom, fintech, ICT and education products.</description><language>en</language>'+items.join('')+'</channel></rss>';
}
export function sitemap(extra:string[]=[]) {
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Array.from(new Set([...publicPages.map(c=>c.path),...extra])).map(p=>'<url><loc>'+esc(origin+p)+'</loc></url>').join('')+'</urlset>';
}
export function portfolioHtml(template:string,path="/") {
  const c=publicPages.find(c=>c.path===path);
  if (!c) return;
  const title=esc(titleFor(c)), desc=esc(c.intro), url=origin+c.path;
  const head = `<title>${title}</title><link rel="alternate" type="application/rss+xml" title="Delivery notebook" href="/notebook.xml">
    <meta data-rh="true" name="description" content="${desc}"><link data-rh="true" rel="canonical" href="${url}">
    <meta data-rh="true" property="og:title" content="${title}"><meta data-rh="true" property="og:description" content="${desc}">
    <meta data-rh="true" property="og:url" content="${url}"><meta data-rh="true" property="og:type" content="${c===home?"profile":"website"}">
    <meta data-rh="true" property="og:image" content="${origin+(c.image||portrait)}"><meta data-rh="true" name="twitter:card" content="summary_large_image">
    <script data-rh="true" type="application/ld+json">${JSON.stringify(schemaFor(c)).replaceAll("<","\\u003c")}</script>`;
  const links=c===home?[career,notebook,...domains,research,education,projectsPage].map(d=>[d.title,d.path]):c.links;
  const overview = c===home ? '<section id="portfolio"><h2>My work across industries</h2>'+careerOverview.map(segment=>
    '<article><small>'+esc(segment.employers)+'</small><h3>'+esc(segment.field)+'</h3><p>'+esc(segment.contribution)+'</p>'+
    segment.roles.map(([label,url])=>'<a href="'+esc(url)+'">'+esc(label)+'</a>').join(' · ')+'</article>').join('')+'</section>' : '';
  const body = `<main class="folio personal"><div class="folio-width"><header class="profile-intro"><p class="eyebrow">${esc(c.label)}</p><h1>${esc(c.title)}</h1><p class="hero-bio">${desc}</p></header>${overview}${c.sections.map(([heading,body])=>`<section class="profile-band"><h2>${esc(heading)}</h2><p>${esc(body)}</p></section>`).join("")}<nav>${links.map(([text,href])=>`<p><a href="${esc(href)}">${esc(text)}</a></p>`).join("")}</nav></div></main>`;
  return template.replace(/<title>.*?<\/title>/,head).replace('<div id="root"></div>','<div id="root">'+body+'</div>');
}
