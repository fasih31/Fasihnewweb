import { AuthButton } from "./auth-dialog";
import { ThemeToggle } from "./theme-toggle";

const destinations = [
  ["About me", "/about"], ["Career history", "/career"], ["Domain experience", "/expertise"],
  ["Education", "/education"], ["Research", "/research"], ["Independent projects", "/projects"],
  ["Delivery notebook", "/notes"], ["Writing", "/blog"], ["Personal resources", "/resources"], ["Contact", "/contact"],
  ["LinkedIn", "https://www.linkedin.com/in/fasihurrehman05"],
  ["GitHub", "https://github.com/fasih31"],
];
export function Footer() {
  return <footer className="folio-footer"><div className="folio-width">
    <p className="folio-brand">Fasih ur Rehman</p>
    <nav aria-label="Resources">{destinations.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <div className="footer-settings"><small>© {new Date().getFullYear()} Fasih ur Rehman</small><ThemeToggle /><AuthButton /></div>
  </div></footer>;
}
