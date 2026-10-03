# Boardroom Intelligence — OND Year over Year

Standalone year-over-year dashboard comparing OND 2026 and OND 2027 across executive, growth, product, store, quality, and methodology views.

## Run and deploy

Open `index.html` locally, or publish the repository through **GitHub Settings → Pages → Deploy from a branch → main / root**.

## Validation

Run `npm test` with Node.js 18 or later.

## Data note

The comparison is an embedded static snapshot through 2 Oct 2026. OND'27 uses 6 aligned fiscal-quarter calendar days versus OND'26; the available OND'26 retail seasonal base through 27 Dec 2025 is retained for the exit projection. Both comparable-period labels and datasets must move together.

- The prior source has no rows for 29 Sep 2025; the aligned day is retained as zero activity.
- Aptronix Felix Plaza is outside the approved 76-store scope.
- Twenty-eight prior-base accessory rows with UPC-sized MRP and discount values are excluded from those quality fields while signed revenue remains unchanged.

## Quality controls

- `dashboard-config.js` centralizes the current and comparable periods.
- `retail-metrics.js` standardizes shared percentage, growth, and reconciliation formulas.
- `METRIC_DICTIONARY.md` documents the approved KPI definitions.
- `npm test` validates both the HTML and formula contracts.
