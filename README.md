# Boardroom Intelligence — JAS Year over Year

Standalone year-over-year dashboard comparing JAS 2025 and JAS 2026 across executive, growth, product, store, quality, and methodology views.

## Run and deploy

Open `index.html` locally, or publish the repository through **GitHub Settings → Pages → Deploy from a branch → main / root**.

## Validation

Run `npm test` with Node.js 18 or later.

## Data note

The comparison is an embedded static snapshot through 20 Sep 2026. JAS'26 is compared with the exact same 82 calendar dates in JAS'25; the available JAS'25 retail seasonal base through 27 Sep is retained for the exit projection. Both comparable-period labels and datasets must move together.

## Quality controls

- `dashboard-config.js` centralizes the current and comparable periods.
- `retail-metrics.js` standardizes shared percentage, growth, and reconciliation formulas.
- `METRIC_DICTIONARY.md` documents the approved KPI definitions.
- `npm test` validates both the HTML and formula contracts.
