import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { portfolioHtml, publicPages, notebookFeed, sitemap } from "../server/portfolio-html";

const output="dist/public";
const template=await readFile(join(output,"index.html"),"utf8");
await writeFile(join(output,"app.html"),template);
for (const page of publicPages) {
  const file=join(output,page.path==="/"?"index.html":page.path.slice(1)+".html");
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,portfolioHtml(template,page.path)!);
}
await writeFile(join(output,"sitemap.xml"),sitemap());

await writeFile(join(output,"notebook.xml"),notebookFeed());
