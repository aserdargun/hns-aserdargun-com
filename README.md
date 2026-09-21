# HNS — Harness Engineering Observatory

HNS is a bilingual, source-backed public observatory for Harness Engineering. It combines weekly intelligence, a filterable solutions radar, shareable layer-by-layer comparison, a knowledge base, reusable patterns, a timeline, and an explicit research method.

HNS; Harness Engineering alanı için iki dilli, kaynak-temelli bir kamusal gözlemevidir. Haftalık araştırma, çözümler radarı, paylaşılabilir katman karşılaştırması, bilgi tabanı, desenler, zaman çizgisi ve açık metodolojiyi tek üründe birleştirir.

## Setup

Requires Node.js 22 and npm.

```bash
npm ci
```

## Run

Development mode:

```bash
npm run dev
```

Production-like, checkout-owned preview:

```bash
npm run build
npm run preview:start
npm run preview:status
```

The managed preview uses `http://127.0.0.1:4173` by default and records only project-scoped runtime state under `.codex/runtime/`.

## Validate

```bash
npm run validate:codex
```

This runs `npm run check` followed by `npm run test:e2e`.

Browser acceptance starts its own production preview on port 4188 and refuses to reuse an unrelated server. Set `PLAYWRIGHT_BASE_URL` only when intentionally testing an existing HNS instance.

`npm run check` validates the content registry, TypeScript, lint, component tests, and the production build. Content validation fails closed when references, bilingual text, or source links are invalid.

## Stop

```bash
npm run preview:stop
```

The stop command refuses to signal a PID unless its recorded and live working directory both match this checkout.

## Research content and weekly updates

- `content/sources.json`: official engineering publications, documentation, and repositories.
- `content/claims.json`: explicitly typed `evidence`, `synthesis`, and `watch-signal` claims.
- `content/solutions.json`: solution taxonomy, seven-layer coverage, maturity, and dated radar interpretation.
- `content/weekly/`: immutable ISO-week snapshots; corrections are appended as visible notes.
- `content/knowledge.json`, `patterns.json`, `timeline.json`: supporting research library.
- `content/ecosystem.json`: bilingual conceptual links to aserdargun.com research and educational applications, with simulation and target-architecture boundaries.

To publish a new week, add the official sources and claims first, update affected solutions, create the bilingual weekly snapshot, then run `npm run check`. Published weeks are not silently rewritten.

Weekly JSON files are discovered automatically by the renderer and validator. The archive preserves W36 and the latest local edition is W39, with a research cutoff of 2026-09-21. Source access dates, semantic claim review dates, and documented release dates have separate meanings. A source access check never certifies every product claim. Catalog schema v2 rejects weekly evidence after its cutoff and cutoffs outside the declared ISO week; links beneath archived editions explicitly lead to the current catalog. See [the content review](docs/content-review-2026-09-21.md) for corrections and verification scope.

Radar filters and up to three selected solutions are preserved in the URL across reloads and language changes. Review freshness uses UTC calendar days (30 days, 90 days, or older than 90 days). Layer evidence exposes the exact claims, confidence limits, and cited sources; mobile and desktop provide the same filters.

HNS does not calculate a universal “best harness” score. Coverage, evidence confidence, freshness, maturity, and radar interpretation remain separate dimensions. Unknown evidence stays unknown.

## Design

The accepted direction is “research newspaper × living systems radar”: true-white canvas, navy typography, cobalt interaction, restrained amber watch states, and green evidence states. The implementation references:

- [`docs/design/hns-primary-desktop.png`](docs/design/hns-primary-desktop.png)
- [`docs/design/hns-primary-mobile.png`](docs/design/hns-primary-mobile.png)
- [`docs/superpowers/specs/2026-09-02-hns-observatory-design.md`](docs/superpowers/specs/2026-09-02-hns-observatory-design.md)

## Delivery

Production uses Azure Static Web Apps Free in West Europe. The deployment workflow validates the complete application, builds the static `dist/` artifact, reruns browser acceptance, and uploads only that prebuilt artifact. GitHub CI remains validation-only, and no Vercel integration is used.

- Production URL: <https://hns.aserdargun.com>
- Azure subscription: `aserdargun subscription 2`
- Resource group: `rg-hns-aserdargun-com`
- Static Web App: `swa-hns-aserdargun-com`
- Production branch: `main`
- Workflow: `.github/workflows/deploy-swa-hns-aserdargun-com.yml`

## License

Code is released under the [MIT License](LICENSE). Research text and original design documentation are released under [CC BY 4.0](LICENSE-CONTENT).
