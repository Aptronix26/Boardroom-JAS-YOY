# Boardroom Intelligence — JAS Year over Year

Standalone year-over-year dashboard comparing JAS 2025 and JAS 2026 across executive, growth, product, store, quality, and methodology views.

## Run and deploy

Open `index.html` locally, or publish the repository through **GitHub Settings → Pages → Deploy from a branch → main / root**.

## Validation

Run `npm test` with Node.js 18 or later.

## Data note

The comparison is an embedded static snapshot. Update both comparable-period datasets and the reporting-date labels together.

## Quality controls

- `dashboard-config.js` centralizes the current and comparable periods.
- `retail-metrics.js` standardizes shared percentage, growth, and reconciliation formulas.
- `METRIC_DICTIONARY.md` documents the approved KPI definitions.
- `npm test` validates both the HTML and formula contracts.
