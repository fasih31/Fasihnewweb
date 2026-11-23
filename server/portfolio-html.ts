import { studies } from "../shared/work";

const origin = "https://iamfasih.com";
const escapeText = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function portfolioHtml(template: string, slug?: string) {
  const study = studies.find(item => item.slug === slug);
  if (slug && !study) return undefined;
  const title = study ? study.title + " | Fasih ur Rehman" : "Fasih ur Rehman | Enterprise Product Management & Fintech, UAE";
  const description = study?.context ?? "Explore Fasih ur Rehman’s enterprise device-ordering demo, Islamic fintech work, YEESP marketplace decisions and VirtualIEC AI prototype.";
  const url = study ? origin + "/work/" + study.slug : origin + "/";
  const image = origin + "/work/" + (study?.art ?? "device-order") + ".webp";
  const head = `<title>${escapeText(title)}</title>
    <meta data-rh="true" name="description" content="${escapeText(description)}">
    <link data-rh="true" rel="canonical" href="${url}">
    <meta data-rh="true" property="og:title" content="${escapeText(title)}">
    <meta data-rh="true" property="og:description" content="${escapeText(description)}">
    <meta data-rh="true" property="og:url" content="${url}">
    <meta data-rh="true" property="og:image" content="${image}">
    <meta data-rh="true" name="twitter:card" content="summary_large_image">`;
  const workLinks = studies.map(item => `<li><a href="/work/${item.slug}">${item.name}: ${escapeText(item.title)}</a></li>`).join("");
  const body = study
    ? `<h1>${escapeText(study.title)}</h1><p>${escapeText(study.context)}</p><h2>${escapeText(study.question)}</h2><p>${escapeText(study.decision)}</p><h2>How I’d test it</h2><p>${escapeText(study.check)}</p><a href="${study.href}">${escapeText(study.link)}</a>`
    : `<h1>What happens after you click accept?</h1><p>I’m Fasih. At e&amp; (Etisalat), I work on how businesses choose, approve and order enterprise services.</p><h2>Selected work</h2><ul>${workLinks}</ul>`;
  return template.replace(/<title>.*?<\/title>/, head).replace('<div id="root"></div>',
    `<div id="root"><main class="folio story"><div class="folio-width"><a href="/">Fasih ur Rehman</a>${body}<p><a href="/blog">Notes</a> · <a href="/expertise">Expertise</a></p></div></main></div>`);
}
