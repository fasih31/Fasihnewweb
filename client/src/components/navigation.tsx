import { useState } from "react";
import { Menu, X } from "lucide-react";

const resume = "/attached_assets/Fasih Ur Rehman Resume_1761533879218.pdf";

export function Navigation({ skipLink = false }: { skipLink?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="folio-header" data-testid="navigation-header">
      {skipLink && <a className="folio-skip" href="#main-content">Skip to content</a>}
      <div className="folio-bar">
        <a className="folio-brand" href="/"><i aria-hidden="true">FR</i>Fasih ur Rehman</a>
        <button className="folio-menu" aria-label={open ? "Close menu" : "Open menu"} aria-controls="folio-nav"
          aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav id="folio-nav" aria-label="Main navigation" data-open={open} onClick={() => setOpen(false)}
          onKeyDown={event => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".folio-menu")?.focus(); } }}>
          <a href="/career">Career</a><a href="/expertise">Expertise</a><a href="/case-studies">Case studies</a><a href="/innovation-lab">Innovation Lab</a><a href="/research">Research</a><a href="/about">About</a><a href="/contact">Contact</a>
          <a className="resume-link" href={resume}>Résumé ↗</a>
        </nav>
      </div>
    </header>
  );
}
