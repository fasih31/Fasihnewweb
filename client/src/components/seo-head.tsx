import { Helmet } from "react-helmet-async";
import { home, portrait } from "@shared/profile";

interface SEOHeadProps {
  title?:string; description?:string; keywords?:string; ogImage?:string; canonicalUrl?:string;
  article?:boolean; schema?:object|object[];
}
export function SEOHead({title="Fasih ur Rehman",description=home.intro,ogImage=portrait,canonicalUrl,article,schema}: SEOHeadProps) {
  const origin="https://iamfasih.com";
  const url=canonicalUrl||origin+window.location.pathname;
  return <Helmet><title>{title}</title><meta name="description" content={description}/>
    <link rel="canonical" href={url}/><meta property="og:url" content={url}/>
    <meta property="og:type" content={article?"article":"website"}/><meta property="og:title" content={title}/>
    <meta property="og:description" content={description}/><meta property="og:image" content={new URL(ogImage,origin).href}/>
    <meta name="twitter:card" content="summary_large_image"/>
    {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
  </Helmet>;
}
export const getWebPageSchema=(name:string,description:string)=>({"@context":"https://schema.org","@type":"WebPage",name,description});
export const getServiceSchema=()=>getWebPageSchema("Domain experience",home.intro);
export function getArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://iamfasih.com"
    },
    "publisher": {"@type":"Person","@id":"https://iamfasih.com/#fasih","name":"Fasih ur Rehman"},
    ...(article.image && {
      "image": {
        "@type": "ImageObject",
        "url": article.image
      }
    })
  };
}

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
