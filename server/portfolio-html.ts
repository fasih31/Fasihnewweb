import { Navigation } from "../client/src/components/navigation";
import { deliveryNotes } from "../shared/delivery-notes";
import { ChapterHeading, artFor } from "../shared/chapter-heading";
import { HomeCover } from "../shared/home-cover";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { chapters, resources, home, titleFor, schemaFor, portrait } from "../shared/profile";

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
    <meta data-rh="true" property="og:url" content="${url}"><meta data-rh="true" property="og:type" content="${c===home||c.path==="/about"?"profile":c.path.startsWith("/notes/")?"article":"website"}">
    <meta data-rh="true" property="og:image" content="${origin+(artFor(c)||portrait)}"><meta data-rh="true" name="twitter:card" content="summary_large_image">
    <meta data-rh="true" name="twitter:title" content="${title}"><meta data-rh="true" name="twitter:description" content="${desc}">
    <script data-rh="true" type="application/ld+json">${JSON.stringify(schemaFor(c)).replaceAll("<","\\u003c")}</script>`;
  const body = c===home ? renderToStaticMarkup(createElement(HomeCover)) : `<main class="folio personal"><div class="folio-width">${renderToStaticMarkup(createElement(ChapterHeading,{chapter:c}))}${c.sections.map(([heading,body])=>`<section class="profile-band"><h2>${esc(heading)}</h2><p>${esc(body)}</p></section>`).join("")}<nav>${c.links.map(([text,href])=>`<p><a href="${esc(href)}">${esc(text)}</a></p>`).join("")}</nav></div></main>`;
  return template.replace(/<title>.*?<\/title>/,()=>head).replace('<div id="root"></div>',()=>'<div id="root">'+renderToStaticMarkup(createElement(Navigation,{skipLink:true}))+body+'</div>');
}


export function publishedArticleHtml(template:string, article:import("../shared/schema").Article) {
  if (!article.published) return;
  const url=origin+"/blog/"+encodeURIComponent(article.slug);
  const description=article.metaDescription || article.excerpt;
  const title=article.metaTitle || article.title+" | Fasih ur Rehman";
  const image=new URL(article.ogImage || article.featuredImage || portrait,origin).href;
  const graph={"@context":"https://schema.org","@type":"BlogPosting",headline:article.title,description,
    mainEntityOfPage:url,image,author:{"@type":"Person","@id":origin+"/#fasih",name:"Fasih ur Rehman",url:origin+"/about"},
    datePublished:article.publishedAt || article.createdAt,dateModified:article.updatedAt};
  const head=`<title>${esc(title)}</title><link data-rh="true" rel="canonical" href="${esc(url)}">
    <meta data-rh="true" name="description" content="${esc(description)}"><meta data-rh="true" property="og:type" content="article">
    <meta data-rh="true" property="og:title" content="${esc(title)}"><meta data-rh="true" property="og:description" content="${esc(description)}">
    <meta data-rh="true" property="og:url" content="${esc(url)}"><meta data-rh="true" property="og:image" content="${esc(image)}">
    <meta data-rh="true" name="twitter:card" content="summary_large_image"><script data-rh="true" type="application/ld+json">${JSON.stringify(graph).replaceAll("<","\\u003c")}</script>`;
  const summary=`<main class="folio personal"><article class="folio-width profile-intro"><a href="/blog">My writing</a><h1>${esc(article.title)}</h1><p class="hero-bio">${esc(article.excerpt)}</p></article></main>`;
  return template.replace(/<title>.*?<\/title>/,()=>head).replace('<div id="root"></div>',()=>'<div id="root">'+summary+'</div>');
}
