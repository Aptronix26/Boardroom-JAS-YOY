import { readFile } from "node:fs/promises";
import vm from "node:vm";

const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attributes]) => !/\bsrc\s*=|application\/json/i.test(attributes))
  .map((match) => match[2])
  .filter((source) => source.trim());
scripts.forEach((source, index) => new vm.Script(source, { filename: `index.html:inline-script-${index + 1}` }));
console.log(`Parsed ${scripts.length} inline script block(s)`);
