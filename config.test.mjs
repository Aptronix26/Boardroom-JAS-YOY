import assert from "node:assert/strict";
import "./dashboard-config.js";

const config = globalThis.DASHBOARD_CONFIG;
assert.equal(typeof config.id, "string");
assert.ok(config.id.length > 0);
assert.equal(typeof config.title, "string");
assert.ok(config.reporting && typeof config.reporting.label === "string");
assert.equal(config.reporting.asOf, "2026-10-02");
assert.equal(config.reporting.currentPeriod, "OND 2027");
assert.equal(config.reporting.comparablePeriod, "OND 2026");
assert.equal(config.governance.expectedStores, 76);
if (Number.isFinite(config.reporting.totalPeriods)) {
  assert.equal(config.reporting.elapsedPeriods + config.reporting.remainingPeriods, config.reporting.totalPeriods);
}
console.log(`Reporting configuration validated: ${config.reporting.label}`);
