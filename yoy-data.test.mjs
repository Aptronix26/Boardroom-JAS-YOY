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

test("YoY reporting window uses the aligned OND opening period", () => {
  assert.equal(data.meta.actual_cutoff, "04 Oct 2026");
  assert.equal(data.meta.days_actual, 8);
  assert.equal(data.daily.length, 8);
  assert.deepEqual(data.meta.periods.current, ["2026-09-27", "2026-10-04"]);
  assert.deepEqual(data.meta.periods.prior, ["2025-09-28", "2025-10-05"]);
  assert.equal(data.meta.periods.quarter_days, 91);
  assert.deepEqual(data.meta.missing_dates.current, []);
  assert.deepEqual(data.meta.missing_dates.prior, ["2025-09-29"]);
  assert.equal(data.meta.schema_repairs.shifted_2027_rows, 0);
});

test("retail detail reconciles to overall comparable revenue", () => {
  assert.equal(data.stores.length, 76);
  assert.equal(new Set(data.stores.map(row => row.name)).size, 76);
  assert.ok(close(data.stores.reduce((sum, row) => sum + row.cy_lfl.rev, 0), data.overall.cy_lfl.rev));
  assert.ok(close(data.stores.reduce((sum, row) => sum + row.ly_lfl.rev, 0), data.overall.ly_lfl.rev));
  assert.ok(close(data.daily.reduce((sum, row) => sum + row.rev26, 0), data.overall.cy_lfl.rev));
  assert.ok(close(data.daily.reduce((sum, row) => sum + row.rev25, 0), data.overall.ly_lfl.rev));
  assert.ok(close(data.overall.cy_lfl.rev, 648368794.1200551));
  assert.ok(close(data.overall.ly_lfl.rev, 1004664279.5700825));
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
  assert.equal(data.meta.quality_quarantine.prior_full_rows, 28);
  assert.ok(data.overall.ly_full.disc_pct < 20);
});
