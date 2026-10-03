import { readFile } from "node:fs/promises";
const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
for (const token of ["<!doctype", "<title", "viewport", "YOY Exit Intelligence", "OND 2026", "OND 2027", "</html>"]) {
  if (!html.toLowerCase().includes(token.toLowerCase())) throw new Error(`Missing expected marker: ${token}`);
}
console.log(`Validated YoY dashboard (${html.length.toLocaleString()} characters)`);
