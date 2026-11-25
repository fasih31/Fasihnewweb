import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { portfolioHtml, publicPages, notebookFeed } from "../server/portfolio-html";

const output="dist/public";
const template=await readFile(join(output,"index.html"),"utf8");
await writeFile(join(output,"app.html"),template);
for (const page of publicPages) {
  const file=join(output,page.path==="/"?"index.html":page.path.slice(1)+".html");
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,portfolioHtml(template,page.path)!);
}
// Keep newly released static routes discoverable while the API serves its own release.
const interactive=publicPages.filter(page=>["/ask","/demo/device-order","/innovation-lab"].includes(page.path) || /^\/(tools|solutions|products)\//.test(page.path));
const interactiveSitemap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+interactive.map(page=>'<url><loc>https://iamfasih.com'+page.path+'</loc></url>').join('')+'</urlset>';
await writeFile(join(output,"interactive-sitemap.xml"),interactiveSitemap);
const robots=await readFile(join(output,"robots.txt"),"utf8");
await writeFile(join(output,"robots.txt"),robots+"\nSitemap: https://iamfasih.com/interactive-sitemap.xml\n");

await writeFile(join(output,"notebook.xml"),notebookFeed());
