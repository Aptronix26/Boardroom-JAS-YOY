import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const index = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");
const script = fs.readFileSync(new URL("./governance.js", import.meta.url), "utf8");
const styles = fs.readFileSync(new URL("./governance.css", import.meta.url), "utf8");
const configSource = fs.readFileSync(new URL("./dashboard-config.js", import.meta.url), "utf8");
const sandbox = { globalThis: {} };
vm.runInNewContext(configSource, sandbox);
const config = sandbox.globalThis.DASHBOARD_CONFIG;

assert.match(index, /governance\.css/);
assert.match(index, /governance\.js/);
assert.ok(index.indexOf("ui-refresh.js") < index.indexOf("governance.js"), "governance must load after the existing UI layer");
assert.ok(config.governance, "governance metadata is required");
assert.ok(config.governance.source, "source label is required");
assert.ok(config.governance.dataThrough, "data-through label is required");
assert.ok(config.governance.published, "published date is required");
assert.match(script, /DASHBOARD_GOVERNANCE/);
assert.match(script, /Automated reconciliation/);
for (const path of ["Retail-Sales-MTD", "Boardroom-JAS-Weekly", "Boardroom-JAS-QTD", "Boardroom-JAS-YOY", "Weekly-Trajectory-Intelligence"]) {
  assert.match(script, new RegExp(`aptronix26\\.github\\.io/${path}/`, "i"));
}
assert.match(styles, /governance-switcher/);
assert.match(styles, /governance-status--warning/);

console.log(`Governance layer validated for ${config.id}`);
