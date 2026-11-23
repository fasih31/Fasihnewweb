import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { portfolioHtml } from "../server/portfolio-html";
import { studies } from "../shared/work";

const output = "dist/public";
const template = await readFile(join(output, "index.html"), "utf8");
await writeFile(join(output, "app.html"), template);
await writeFile(join(output, "index.html"), portfolioHtml(template)!);
for (const study of studies) {
  await writeFile(join(output, "work", study.slug + ".html"), portfolioHtml(template, study.slug)!);
}
