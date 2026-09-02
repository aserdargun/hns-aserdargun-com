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
npm run check
npm run test:e2e
```

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

To publish a new week, add the official sources and claims first, update affected solutions, create the bilingual weekly snapshot, then run `npm run check`. Published weeks are not silently rewritten.

HNS does not calculate a universal “best harness” score. Coverage, evidence confidence, freshness, maturity, and radar interpretation remain separate dimensions. Unknown evidence stays unknown.

## Design

The accepted direction is “research newspaper × living systems radar”: true-white canvas, navy typography, cobalt interaction, restrained amber watch states, and green evidence states. The implementation references:

- [`docs/design/hns-primary-desktop.png`](docs/design/hns-primary-desktop.png)
- [`docs/design/hns-primary-mobile.png`](docs/design/hns-primary-mobile.png)
- [`docs/superpowers/specs/2026-09-02-hns-observatory-design.md`](docs/superpowers/specs/2026-09-02-hns-observatory-design.md)

## Delivery boundary

This repository prepares a static Vite artifact and a `staticwebapp.config.json` contract for a later, separately authorized Azure Static Web Apps stage. The current CI validates only; it does not deploy. No production URL is claimed here.

## License

Code is released under the [MIT License](LICENSE). Research text and original design documentation are released under [CC BY 4.0](LICENSE-CONTENT).
