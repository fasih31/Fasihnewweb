import { useEffect } from "react";
import { useLocation } from "wouter";

const id = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
let previous = "";
let tag: ((...args: unknown[])=>void) | undefined;
export function GoogleAnalytics() {
  const [path] = useLocation();
  useEffect(()=>{
    if (!/^G-[A-Z0-9]+$/.test(id) || /^G-X+$/.test(id) || !["iamfasih.com","www.iamfasih.com"].includes(location.hostname) || path.startsWith("/admin")) return;
    if (!tag) {
      const layer = ((window as Window & {dataLayer?:unknown[]}).dataLayer ??= []);
      tag = function(){layer.push(arguments);};
      tag("js",new Date());
      tag("config",id,{send_page_view:false});
      const script=document.createElement("script");
      script.async=true;
      script.src="https://www.googletagmanager.com/gtag/js?id="+id;
      document.head.append(script);
    }
    if (previous!==path) {
      tag("event","page_view",{page_location:location.origin+path,page_path:path});
      previous=path;
    }
  },[path]);
  return null;
}
