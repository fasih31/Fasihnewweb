import { Helmet } from "react-helmet-async";
import { artFor } from "@shared/chapter-heading";
import { home, portrait, titleFor, schemaFor, type Chapter } from "@shared/profile";

export function ChapterMeta({chapter:c}:{chapter:Chapter}) {
  const isHome=c===home;
  const photo = isHome ? portrait : artFor(c);
  const url = "https://iamfasih.com"+c.path;
  return <Helmet><title>{titleFor(c)}</title><meta name="description" content={c.intro}/><link rel="canonical" href={url}/>
    <meta property="og:title" content={titleFor(c)}/><meta property="og:description" content={c.intro}/><meta property="og:url" content={url}/>
    <meta property="og:type" content={isHome||c.path==="/about"?"profile":c.path.startsWith("/notes/")?"article":"website"}/><meta property="og:image" content={"https://iamfasih.com"+(photo||portrait)}/>
    <meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">{JSON.stringify(schemaFor(c))}</script></Helmet>;
}
