import { useLocation } from "wouter";
import { resources } from "@shared/profile";
import { AuthButton } from "./auth-dialog";
import { ThemeToggle } from "./theme-toggle";

const destinations = [
  ["Device-order demo","/demo/device-order"], ["Portfolio guide","/ask"], ["About me", "/about"], ["Career history", "/career"], ["Domain experience", "/expertise"],
  ["Education", "/education"], ["Research", "/research"], ["Independent projects", "/projects"],
  ["Delivery notebook", "/notes"], ["Writing", "/blog"], ["Personal resources", "/resources"], ["Contact", "/contact"],
  ["LinkedIn", "https://www.linkedin.com/in/fasihurrehman05"],
  ["GitHub", "https://github.com/fasih31"],
];
export function Footer() {
  const [path]=useLocation();
  const resource=resources.find(item=>item.path===path);
  return <>{resource && <section className="resource-return" aria-label="Related portfolio pages"><div className="folio-width">
    <h2>Elsewhere in my portfolio</h2><nav aria-label="Related reading">
      <a href="/resources">Browse personal resources ↗</a>
      {path.startsWith("/tools/") ? <a href="/tools">All tools ↗</a> : <a href="/notes">Read my delivery notes ↗</a>}
      <a href="/career">Explore my career ↗</a>
    </nav></div></section>}<footer className="folio-footer"><div className="folio-width">
    <p className="folio-brand">Fasih ur Rehman</p>
    <nav aria-label="Resources">{destinations.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <div className="footer-settings"><small>© {new Date().getFullYear()} Fasih ur Rehman</small><ThemeToggle /><AuthButton /></div>
  </div></footer></>;
}
