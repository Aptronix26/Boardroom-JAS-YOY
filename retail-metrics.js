(function attachRetailMetrics(root) {
  const number = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
  const ratio = (numerator, denominator, fallback = null) => {
    const base = number(denominator);
    return base === 0 ? fallback : number(numerator) / base;
  };
  const round = (value, digits = 1) => {
    if (value === null || !Number.isFinite(Number(value))) return null;
    const factor = 10 ** digits;
    return Math.round(Number(value) * factor) / factor;
  };
  const api = {
    number,
    ratio,
    round,
    percentage: (numerator, denominator, digits = 1) => round(ratio(numerator, denominator), digits + 2) === null ? null : round(ratio(numerator, denominator) * 100, digits),
    growth: (current, previous, digits = 1) => ratio(number(current) - number(previous), previous) === null ? null : round(ratio(number(current) - number(previous), previous) * 100, digits),
    percentagePointChange: (currentRate, previousRate, digits = 1) => round((number(currentRate) - number(previousRate)) * 100, digits),
    remaining: (target, actual) => Math.max(0, number(target) - number(actual)),
    requiredRate: (target, actual, periodsRemaining) => {
      const periods = number(periodsRemaining);
      return periods > 0 ? Math.max(0, number(target) - number(actual)) / periods : Math.max(0, number(target) - number(actual));
    },
    projectedExit: (actual, elapsedPeriods, totalPeriods) => {
      const elapsed = number(elapsedPeriods);
      return elapsed > 0 ? number(actual) / elapsed * number(totalPeriods) : 0;
    },
    reconcile: (parts, expected, tolerance = 0.01) => Math.abs(parts.reduce((sum, value) => sum + number(value), 0) - number(expected)) <= tolerance
  };
  root.RetailMetrics = Object.freeze(api);
})(typeof window !== "undefined" ? window : globalThis);
