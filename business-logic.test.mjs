import assert from "node:assert/strict";
import "./retail-metrics.js";

const m = globalThis.RetailMetrics;
assert.equal(m.percentage(75, 100), 75);
assert.equal(m.growth(62.61, 44.47), 40.8);
assert.equal(m.remaining(100, 75), 25);
assert.equal(m.requiredRate(100, 75, 5), 5);
assert.equal(m.projectedExit(20, 20, 31), 31);
assert.equal(m.percentagePointChange(0.068, 0.063), 0.5);
assert.equal(m.reconcile([40, 35, 25], 100), true);
assert.equal(m.percentage(10, 0), null);
console.log("Business metric contract validated");
