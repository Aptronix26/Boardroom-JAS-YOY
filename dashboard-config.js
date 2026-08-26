globalThis.DASHBOARD_CONFIG = Object.freeze({
  id: "year-over-year",
  title: "Boardroom Intelligence — JAS Year over Year",
  reporting: Object.freeze({
    label: "JAS 2025 versus JAS 2026 · Actual through 25 Aug 2026",
    asOf: "2026-08-25",
    currentPeriod: "JAS 2026",
    comparablePeriod: "JAS 2025",
    periodUnit: "year-over-year comparable quarter"
  }),
  governance: Object.freeze({
    source: "JAS'25 & JAS'26 Dump.xlsx + validated snapshot through 13 Aug 2026",
    dataThrough: "25 Aug 2026",
    published: "26 Aug 2026",
    expectedStores: 76
  }),
  dataClassification: "Internal business reporting"
});
