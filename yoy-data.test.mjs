import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
const marker = "const D=";
const start = html.indexOf(marker) + marker.length;
assert.ok(start >= marker.length, "embedded YoY model must be present");
const source = html.slice(start);
let depth = 0;
let quoted = false;
let escaped = false;
let end = -1;
for (let index = 0; index < source.length; index += 1) {
  const character = source[index];
  if (quoted) {
    if (escaped) escaped = false;
    else if (character === "\\") escaped = true;
    else if (character === '"') quoted = false;
  } else if (character === '"') quoted = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) { end = index + 1; break; }
}
const data = JSON.parse(source.slice(0, end));
const close = (left, right) => Math.abs(left - right) <= Math.max(1, Math.abs(right) * 1e-9);

test("YoY reporting window is complete through 20 Sep", () => {
  assert.equal(data.meta.actual_cutoff, "20 Sep 2026");
  assert.equal(data.meta.days_actual, 82);
  assert.equal(data.daily.length, 82);
  assert.match(data.meta.method, /every calendar date/);
  assert.match(data.meta.method, /through 27 Sep/);
  assert.ok(data.meta.schema_repairs.shifted_2026_rows > 0);
});

test("retail detail reconciles to overall comparable revenue", () => {
  assert.equal(data.stores.length, 76);
  assert.equal(new Set(data.stores.map(row => row.name)).size, 76);
  assert.ok(close(data.stores.reduce((sum, row) => sum + row.cy_lfl.rev, 0), data.overall.cy_lfl.rev));
  assert.ok(close(data.stores.reduce((sum, row) => sum + row.ly_lfl.rev, 0), data.overall.ly_lfl.rev));
  assert.ok(close(data.daily.reduce((sum, row) => sum + row.rev26, 0), data.overall.cy_lfl.rev));
  assert.ok(close(data.daily.reduce((sum, row) => sum + row.rev25, 0), data.overall.ly_lfl.rev));
});

test("growth, exit, and store breadth use the approved formulas", () => {
  const growth = (data.overall.cy_lfl.rev / data.overall.ly_lfl.rev - 1) * 100;
  assert.ok(close(data.overall.growth_pct, growth));
  assert.ok(close(data.overall.exit_rev, data.overall.ly_full.rev * (1 + growth / 100)));
  assert.equal(data.overall.stores_growing + data.overall.stores_declining, data.overall.retail_stores);
  assert.equal(data.storeCategory.length, data.stores.length * 5);
});

test("quality-of-sale metrics are source-backed", () => {
  assert.ok(data.overall.core_asp25 > 0);
  assert.ok(data.overall.core_asp26 > 0);
  assert.ok(data.overall.attach25.device_invoices > 0);
  assert.ok(data.overall.attach26.device_invoices > 0);
  assert.ok(data.appleAccessoryLob.length >= 5);
  assert.ok(data.thirdPartyAccessoryLob.length >= 5);
  assert.ok(Object.keys(data.overall.attach26.combo_counts).length > 0);
});
