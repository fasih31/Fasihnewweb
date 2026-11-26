import React from "react";
import { parentOf, portrait, type Chapter } from "./profile";

const covers: Record<string,string> = {
  "/products/virtualiec": "/work/virtualiec.webp",
  "/solutions/islamic-bnpl": "/work/murabaha.webp",
  "/solutions/islamic-virtual-card": "/work/cover-payments.webp",
  "/demo/device-order": "/work/device-order.webp",
  "/career": portrait, "/contact": portrait, "/about": portrait,
  "/expertise": "/work/cover-devices.webp", "/notes": "/work/cover-learning.webp",
  "/projects": "/work/yeesp.webp", "/research": "/work/cover-learning.webp",
  "/education": "/work/cover-learning.webp", "/resources": "/work/cover-learning.webp",
  "/domains/telecom": "/work/cover-devices.webp", "/domains/enterprise-ict": "/work/cover-devices.webp",
  "/domains/fintech": "/work/cover-payments.webp", "/domains/islamic-economics": "/work/cover-payments.webp",
  "/domains/ecommerce": "/work/cover-payments.webp", "/domains/edtech": "/work/cover-learning.webp"
};
export function artFor(c:Chapter) {
  const domain=c.links.find(([,path])=>path.startsWith("/domains/"))?.[1];
  return c.image || covers[c.path] || (c.path.startsWith("/career/") && domain ? covers[domain] : undefined);
}
export function ChapterHeading({chapter}:{chapter:Chapter}) {
  const [label,path]=parentOf(chapter);
  const image=artFor(chapter);
  return <header className={'profile-intro'+(image?' with-art':'')}>
    <div><nav className="chapter-trail" aria-label="Breadcrumb"><a href="/">Home</a>{path!=="/" && <> / <a href={path}>{label}</a></>}</nav>
      <p className="eyebrow">{chapter.label}</p><h1>{chapter.title}</h1><p className="hero-bio">{chapter.intro}</p></div>
    {image && <img className={image===portrait?'portrait':image.includes('/cover-')?'editorial-photo':'chapter-art'} src={image} alt={image===portrait?'Fasih ur Rehman':''} {...{fetchpriority:"high"}}/>}
  </header>;
}
