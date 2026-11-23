import { useState } from "react";
import { roles, rolePages } from "@shared/profile";

const entries = roles.map((role, index) => {
  const page = rolePages[index];
  const words = [page.title, role.domain, role.dates, role.account, page.intro, ...page.sections.flat()].join(" ").toLowerCase();
  return { role, page, words };
});

export function CareerExplorer() {
  const [search, setSearch] = useState("");
  const terms = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = entries.filter(entry => terms.every(term => entry.words.includes(term)));
  return <section aria-label="Search career history">
    <div className="career-search">
      <label htmlFor="career-search">Find experience by employer, product or skill</label>
      <div><input id="career-search" type="search" placeholder="Try checkout, education or Tahakam" value={search} onChange={event=>setSearch(event.target.value)} />
        {search && <button type="button" onClick={()=>setSearch("")}>Clear</button>}</div>
      <p role="status">{matches.length} of {entries.length} roles</p>
    </div>
    <div className="profile-timeline">{matches.map(({role, page})=><section className="profile-band" key={page.path}>
      <div><small>{role.dates}</small><p>{role.domain}</p></div>
      <div><h2>{role.title}</h2><h3>{role.company}</h3><p>{role.account}</p>
        <a className="folio-link" href={page.path}>Read my role at {role.company} ↗</a></div>
    </section>)}</div>
    {matches.length===0 && <p>Try a broader term, such as finance, telecom or delivery.</p>}
  </section>;
}
