# HNS Harness Engineering Observatory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and publish the first bilingual, source-backed HNS Harness Engineering Observatory as a static React application in a public GitHub repository.

**Architecture:** A React + Vite + TypeScript SPA compiles human-editable bilingual JSON/Markdown content into a static artifact. Zod validates every entity and cross-reference fail-closed; URL state makes locale, radar filters, and comparisons shareable. The product surface follows the accepted research-newspaper × living-systems-radar design and requires no runtime API, account, database, secret, or vendor hosting service.

**Tech Stack:** Node.js 22, npm, React, TypeScript, Vite, React Router, Zod, Vitest, Testing Library, Playwright, axe-core, ESLint, CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-09-02-hns-observatory-design.md`

## Global Constraints

- Product identity is `HNS — Harness Engineering Observatory`.
- Product loop is `Observe → Classify → Compare → Experiment → Track`.
- UI and content are symmetric in Turkish and English at `/tr/...` and `/en/...`.
- Weekly Intelligence and Solutions Radar are the first-release core.
- Every factual production claim references live-checked official or primary sources.
- Evidence, synthesis, and watch signal remain visibly distinct.
- Coverage, evidence confidence, maturity, and radar interpretation remain separate; do not add an aggregate “best harness” score.
- The accepted concepts at `docs/design/hns-primary-desktop.png` and `docs/design/hns-primary-mobile.png` are the visual source of truth.
- Canvas stays true white; no cream/off-white substitution, card-grid reinterpretation, marketing hero, fake metrics, glow, glassmorphism, or Vercel dependency.
- Desktop reference is 1536×1024; mobile reference is 390×844 behavior represented by the 852×1846 concept.
- Minimum mobile touch target is 44×44px; WCAG 2.2 AA, keyboard use, 200% zoom, and reduced motion are acceptance requirements.
- Node.js 22 and npm are the local/runtime contract; commit `package-lock.json`.
- Stage 1 ends after verified public GitHub `main`; do not create or mutate Azure, DNS, custom-domain, GitHub Pages, or any other deployment.
- Vercel is excluded.

---

## File responsibility map

### Project and lifecycle

- `package.json`: lifecycle commands and dependency contract.
- `package-lock.json`: reproducible dependency graph.
- `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `tsconfig*.json`, `eslint.config.js`: build and test configuration.
- `scripts/validate-content.ts`: schema, locale, source, reference, date, and snapshot policy validation entrypoint.
- `scripts/preview-control.mjs`: project-scoped start/stop/status for the managed preview.
- `.github/workflows/ci.yml`: Node 22 install, checks, build, and browser tests; no deployment step.
- `public/staticwebapp.config.json`: later Azure-compatible SPA fallback and security headers only.

### Content system

- `src/content/schema.ts`: Zod schemas and inferred public types.
- `src/content/catalog.ts`: imports raw records, validates once, and exposes typed selectors.
- `src/content/selectors.ts`: locale projection, weekly lookup, filters, comparison, freshness, and source resolution.
- `content/sources.json`: primary/official source registry.
- `content/solutions.json`: 12 verified baseline solution records.
- `content/claims.json`: evidence, synthesis, and watch-signal records.
- `content/weekly/2026-W36.json`: first immutable weekly snapshot.
- `content/knowledge.json`, `content/patterns.json`, `content/timeline.json`: bilingual explanatory records.

### Application and UI

- `src/main.tsx`: application entrypoint.
- `src/app/App.tsx`: router provider and localized route tree.
- `src/app/routes.tsx`: route definitions, locale redirects, localized not-found behavior.
- `src/i18n/copy.ts`: interface chrome translations.
- `src/i18n/locale.ts`: locale parsing, path switching, local preference.
- `src/components/AppShell.tsx`, `GlobalHeader.tsx`, `LanguageSwitch.tsx`, `StatusMark.tsx`, `SourceLink.tsx`: shared UI.
- `src/features/weekly/WeeklyPage.tsx`, `WeeklyLead.tsx`, `WeeklyIndex.tsx`, `IntelligenceRail.tsx`: weekly experience.
- `src/features/radar/RadarPage.tsx`, `RadarToolbar.tsx`, `RadarTable.tsx`, `MobileRadarList.tsx`, `radar-state.ts`: filters, sorting, selection, and responsive presentation.
- `src/features/compare/ComparePage.tsx`, `ComparisonMatrix.tsx`: shareable two/three-solution comparison.
- `src/features/library/KnowledgePage.tsx`, `PatternsPage.tsx`, `TimelinePage.tsx`, `MethodologyPage.tsx`: supporting research surfaces.
- `src/styles/tokens.css`, `global.css`, `shell.css`, `weekly.css`, `radar.css`, `library.css`: extracted design system and feature layouts.

### Tests

- `tests/content/schema.test.ts`, `integrity.test.ts`, `selectors.test.ts`: data policy.
- `tests/app/routes.test.tsx`, `locale.test.ts`: route and language behavior.
- `tests/features/weekly.test.tsx`, `radar.test.tsx`, `compare.test.tsx`, `library.test.tsx`: product workflows.
- `e2e/hns.desktop.spec.ts`, `hns.mobile.spec.ts`, `hns.accessibility.spec.ts`: rendered acceptance.

---

### Task 1: Establish the tested static application foundation

**Files:**
- Create: `package.json`, `package-lock.json`, `index.html`
- Create: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Create: `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`
- Create: `src/main.tsx`, `src/app/App.tsx`, `src/test/setup.ts`
- Create: `tests/app/smoke.test.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `App(): JSX.Element`; commands `dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`, `check`.
- Consumes: Node.js 22 and npm.

- [ ] **Step 1: Write the failing application smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import { App } from '../../src/app/App'

it('renders the HNS product identity', () => {
  render(<App />)
  expect(screen.getByText('Harness Engineering Observatory')).toBeVisible()
})
```

- [ ] **Step 2: Create package and test configuration, install dependencies, and confirm red**

Run:

```bash
npm install react react-dom react-router-dom zod
npm install -D typescript vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh playwright @playwright/test axe-core @axe-core/playwright tsx
npm test -- --run tests/app/smoke.test.tsx
```

Expected: FAIL because `src/app/App.tsx` does not exist.

- [ ] **Step 3: Implement the minimal accessible application entry**

```tsx
export function App() {
  return (
    <main>
      <h1>HNS</h1>
      <p>Harness Engineering Observatory</p>
    </main>
  )
}
```

`package.json` scripts must be exactly:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "typecheck": "tsc -b --pretty false",
    "lint": "eslint .",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "check": "npm run typecheck && npm run lint && npm run test:run && npm run build"
  }
}
```

- [ ] **Step 4: Run the foundation checks**

Run: `npm run typecheck && npm run lint && npm run test:run && npm run build`

Expected: all commands pass and `dist/index.html` exists.

- [ ] **Step 5: Commit the foundation**

```bash
git add package.json package-lock.json index.html tsconfig*.json vite.config.ts vitest.config.ts playwright.config.ts eslint.config.js src tests .gitignore
git commit -m "build: establish HNS application foundation"
```

---

### Task 2: Implement fail-closed bilingual content schemas and baseline evidence

**Files:**
- Modify: `package.json`, `package-lock.json`
- Create: `src/content/schema.ts`, `src/content/catalog.ts`, `src/content/selectors.ts`
- Create: `scripts/validate-content.ts`
- Create: `content/sources.json`, `content/solutions.json`, `content/claims.json`
- Create: `content/weekly/2026-W36.json`, `content/knowledge.json`, `content/patterns.json`, `content/timeline.json`
- Create: `tests/content/schema.test.ts`, `tests/content/integrity.test.ts`, `tests/content/selectors.test.ts`

**Interfaces:**
- Produces: `Catalog`, `Solution`, `Source`, `Claim`, `WeeklySnapshot`, `parseCatalog(raw): Catalog`, `getLocalizedText(text, locale)`, `getLatestWeekly(catalog)`, `getSolutionEvidence(catalog, solutionId)`.
- Consumes: Zod and raw JSON files under `content/`.

- [ ] **Step 1: Write red tests for schema and integrity policies**

```ts
import { describe, expect, it } from 'vitest'
import { rawCatalog } from '../../src/content/catalog'
import { parseCatalog } from '../../src/content/schema'

describe('HNS content contract', () => {
  it('ships exactly twelve verified baseline solutions', () => {
    expect(parseCatalog(rawCatalog).solutions).toHaveLength(12)
  })

  it('rejects a claim with a missing source', () => {
    const broken = structuredClone(rawCatalog)
    broken.claims[0].sourceIds = ['missing-source']
    expect(() => parseCatalog(broken)).toThrow(/missing-source/)
  })

  it('requires both locales on every visible title', () => {
    const broken = structuredClone(rawCatalog)
    delete broken.solutions[0].summary.tr
    expect(() => parseCatalog(broken)).toThrow(/tr/)
  })
})
```

- [ ] **Step 2: Run the content tests to confirm red**

Run: `npm test -- --run tests/content/schema.test.ts tests/content/integrity.test.ts`

Expected: FAIL because the schemas and catalog do not exist.

- [ ] **Step 3: Define the exact core schemas**

```ts
const LocaleTextSchema = z.object({ tr: z.string().min(1), en: z.string().min(1) })
const LayerSchema = z.enum(['execution', 'tools', 'context', 'lifecycle', 'observability', 'verification', 'governance'])
const LayerStateSchema = z.enum(['supported', 'partial', 'unknown'])
const EvidenceKindSchema = z.enum(['evidence', 'synthesis', 'watch-signal'])
const RadarStateSchema = z.enum(['adopt', 'trial', 'assess', 'watch', 'hold', 'experiment'])
const SolutionClassSchema = z.enum(['coding-harness', 'agent-harness', 'managed-harness', 'general-harness', 'agent-framework', 'agent-runtime', 'agent-orchestrator', 'execution-runtime', 'software-agent-sdk', 'minimal-coding-harness'])
```

`SolutionSchema` must contain stable ID, name, organization, canonical URL, class, lifecycle, open-source status, languages, bilingual summary, seven layer states with claim IDs, maturity, radar state/rationale/effective date, last release when verifiable, last reviewed date, and source IDs.

`CatalogSchema.superRefine()` must fail on duplicate IDs, unresolved source/claim/solution references, missing locale fields, a claim without sources, an evidence claim backed only by another synthesis, weekly references to unknown records, and future review dates beyond the snapshot cutoff.

- [ ] **Step 4: Add the verified official-source registry**

Create records with `checkedAt: "2026-09-02"` for these exact primary URLs:

1. `https://openai.com/index/harness-engineering/`
2. `https://openai.com/index/open-source-codex-orchestration-symphony/`
3. `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents`
4. `https://www.anthropic.com/engineering/harness-design-long-running-apps`
5. `https://www.anthropic.com/engineering/managed-agents`
6. `https://github.com/deepseek-ai/deepseek-harness`
7. `https://devblogs.microsoft.com/agent-framework/the-microsoft-agent-framework-harness-is-now-released/`
8. `https://docs.langchain.com/oss/python/concepts/products`
9. `https://google.github.io/adk-docs/tools/google-cloud/code-exec-agent-engine/`
10. `https://google.github.io/adk-docs/integrations/restate/`
11. `https://docs.openhands.dev/sdk/index`
12. `https://github.com/SWE-agent/mini-swe-agent`
13. `https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/`

Source records must distinguish official engineering publication, official documentation, and official repository.

- [ ] **Step 5: Add twelve conservative baseline solution records**

IDs and classes are fixed:

```text
openai-codex                 coding-harness
openai-symphony              agent-orchestrator
anthropic-managed-agents     managed-harness
deepseek-harness             agent-harness
microsoft-agent-framework    general-harness
langchain-deep-agents        agent-harness
langgraph                    agent-runtime
google-adk                   agent-framework
google-agent-runtime         execution-runtime
openhands-sdk                software-agent-sdk
mini-swe-agent               minimal-coding-harness
pydantic-ai                  agent-framework
```

Use only claims directly supported by the listed primary sources. Set layer states to `unknown` when the source set does not justify `supported` or `partial`. Store radar positions as `synthesis` with bilingual rationale rather than vendor evidence.

- [ ] **Step 6: Add the first bilingual weekly snapshot and knowledge records**

`2026-W36` must include:

- Baseline cutoff `2026-09-02`.
- English synthesis headline `The harness is becoming the system.`.
- Turkish synthesis headline `Harness, sistemin kendisine dönüşüyor.`.
- Most important development: convergence toward explicit harness/runtime/orchestration layers, labeled synthesis.
- Solutions to watch: DeepSeek Harness, Microsoft Agent Framework Harness, Google ADK/Runtime.
- Pattern of the week: `Harness–Model Coevolution`.
- Research of the week: Anthropic’s March 2026 long-running harness design.
- Experiment candidate: compare a minimal linear harness and a structured planner/evaluator harness on the same bounded task.

Knowledge entries must define Harness Engineering and the seven layers. Pattern entries must include Harness–Model Coevolution, durable execution, fresh-context handoff, approval gate, and deterministic verification. Timeline entries must cite dated primary sources.

- [ ] **Step 7: Implement selectors and validation CLI**

```ts
export function getLatestWeekly(catalog: Catalog): WeeklySnapshot {
  return [...catalog.weekly].sort((a, b) => b.week.localeCompare(a.week))[0]
}

export function getSolutionEvidence(catalog: Catalog, solutionId: string) {
  const solution = catalog.solutions.find((item) => item.id === solutionId)
  if (!solution) throw new Error(`Unknown solution: ${solutionId}`)
  return solution.claimIds.map((id) => {
    const claim = catalog.claimsById.get(id)
    if (!claim) throw new Error(`Unknown claim: ${id}`)
    return claim
  })
}
```

`scripts/validate-content.ts` must print entity counts and exit nonzero on any parse or reference error. Add `"content:check": "tsx scripts/validate-content.ts"`; change `build` to `"npm run content:check && tsc -b && vite build"`; and change `check` to `"npm run content:check && npm run typecheck && npm run lint && npm run test:run && npm run build"`.

- [ ] **Step 8: Run content acceptance**

Run: `npm run content:check && npm test -- --run tests/content`

Expected: PASS; output reports 12 solutions, 13 primary sources, one weekly snapshot, and zero unresolved references.

- [ ] **Step 9: Commit content architecture**

```bash
git add content scripts/validate-content.ts src/content tests/content
git commit -m "feat: add source-backed HNS research catalog"
```

---

### Task 3: Build localized routing and the accepted app shell

**Files:**
- Modify: `src/app/App.tsx`
- Create: `src/app/routes.tsx`, `src/i18n/copy.ts`, `src/i18n/locale.ts`
- Create: `src/components/AppShell.tsx`, `src/components/GlobalHeader.tsx`, `src/components/LanguageSwitch.tsx`, `src/components/StatusMark.tsx`, `src/components/SourceLink.tsx`
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/shell.css`
- Create: `tests/app/routes.test.tsx`, `tests/app/locale.test.ts`

**Interfaces:**
- Produces: `Locale = 'tr' | 'en'`, `localizedPath(pathname, targetLocale)`, `AppShell`, `StatusMark`, `SourceLink`.
- Consumes: React Router and validated catalog selectors.

- [ ] **Step 1: Write failing locale and route tests**

```tsx
it('switches locale without losing the route and query', async () => {
  renderApp('/en/radar?state=trial')
  await user.click(screen.getByRole('link', { name: 'TR' }))
  expect(window.location.pathname + window.location.search).toBe('/tr/radar?state=trial')
})

it('redirects root to the remembered locale or English', () => {
  renderApp('/')
  expect(screen.getByRole('heading', { name: /Harness Engineering Observatory/i })).toBeVisible()
})
```

- [ ] **Step 2: Run route tests to confirm red**

Run: `npm test -- --run tests/app/routes.test.tsx tests/app/locale.test.ts`

Expected: FAIL because localized routes and shell do not exist.

- [ ] **Step 3: Implement route and locale behavior**

Routes must cover the exact spec table, preserve query parameters during locale changes, and render a localized 404 for unknown locale routes. `localStorage` key is `hns-locale`; invalid stored values are ignored.

The header must render brand, product name, primary navigation, and `TR / EN`. Desktop uses the accepted horizontal navigation; mobile uses one 44px menu control and an accessible disclosure panel.

- [ ] **Step 4: Extract design tokens and base typography**

```css
:root {
  --canvas: #ffffff;
  --ink: #07132d;
  --muted: #46516a;
  --accent: #0b4fea;
  --evidence: #22a93a;
  --watch: #e99a00;
  --rule: #d8dfea;
  --selected: #f4f7ff;
  --font-ui: "IBM Plex Sans", system-ui, sans-serif;
  --font-editorial: "Source Serif 4", Georgia, serif;
}
```

Install the locally bundled font packages with `npm install @fontsource/ibm-plex-sans @fontsource/source-serif-4`, import only the used 400/500/600/700 weights, and do not load Google Fonts at runtime.

- [ ] **Step 5: Run route, keyboard, type, and build checks**

Run: `npm test -- --run tests/app && npm run typecheck && npm run build`

Expected: PASS; `/en`, `/tr`, preserved locale switching, and localized 404 are covered.

- [ ] **Step 6: Commit the shell**

```bash
git add src/app src/i18n src/components src/styles tests/app package.json package-lock.json
git commit -m "feat: add bilingual HNS application shell"
```

---

### Task 4: Implement Weekly Intelligence and provenance disclosure

**Files:**
- Create: `src/features/weekly/WeeklyPage.tsx`, `WeeklyLead.tsx`, `WeeklyIndex.tsx`, `IntelligenceRail.tsx`
- Create: `src/styles/weekly.css`
- Create: `tests/features/weekly.test.tsx`

**Interfaces:**
- Produces: `WeeklyPage({ locale, week? })`, `WeeklyLead`, `IntelligenceRail`.
- Consumes: `getLatestWeekly`, localized catalog records, `StatusMark`, and `SourceLink`.

- [ ] **Step 1: Write failing weekly behavior tests**

```tsx
it('shows the latest weekly synthesis and all five intelligence modules', () => {
  renderWeekly('/en')
  expect(screen.getByRole('heading', { name: 'The harness is becoming the system.' })).toBeVisible()
  for (const name of ['Most important development', 'Solutions to watch', 'Pattern of the week', 'Research of the week', 'Experiment candidate']) {
    expect(screen.getByText(name)).toBeVisible()
  }
})

it('identifies synthesis separately from evidence', () => {
  renderWeekly('/en')
  expect(screen.getAllByText('Synthesis').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Evidence').length).toBeGreaterThan(0)
})
```

- [ ] **Step 2: Run weekly tests to confirm red**

Run: `npm test -- --run tests/features/weekly.test.tsx`

Expected: FAIL because the weekly components do not exist.

- [ ] **Step 3: Implement the desktop weekly composition**

Match the accepted concept: date/locale header, serif synthesis lead, restrained signal-loop motif, horizontal weekly modules, and right-side intelligence rail. Every source link exposes publisher, title, published date when known, checked date, and external-link name.

- [ ] **Step 4: Implement the mobile weekly index**

At 390px, render five open list rows with 44px disclosure targets and fine separators. Expanded content appears inline. Do not convert the modules into floating cards.

- [ ] **Step 5: Run weekly tests and responsive component checks**

Run: `npm test -- --run tests/features/weekly.test.tsx && npm run build`

Expected: PASS; both locale projections render, source disclosures work, and no unvalidated raw HTML is used.

- [ ] **Step 6: Commit Weekly Intelligence**

```bash
git add src/features/weekly src/styles/weekly.css tests/features/weekly.test.tsx
git commit -m "feat: build weekly harness intelligence"
```

---

### Task 5: Implement the responsive Solutions Radar

**Files:**
- Create: `src/features/radar/RadarPage.tsx`, `RadarToolbar.tsx`, `RadarTable.tsx`, `MobileRadarList.tsx`, `radar-state.ts`
- Create: `src/styles/radar.css`
- Create: `tests/features/radar.test.tsx`

**Interfaces:**
- Produces: `RadarFilters`, `parseRadarSearch(search)`, `serializeRadarSearch(filters)`, `filterSolutions(solutions, filters)`, `RadarPage`.
- Consumes: localized solution and claim selectors.

- [ ] **Step 1: Write failing pure-state and UI tests**

```ts
it('round-trips radar filters through URL search', () => {
  const filters = { classes: ['agent-harness'], radar: ['trial'], evidence: ['evidence'], query: 'deep' }
  expect(parseRadarSearch(serializeRadarSearch(filters))).toEqual(filters)
})
```

```tsx
it('keeps selection when filters change and exposes compare count', async () => {
  renderRadar('/en/radar')
  await user.click(screen.getByRole('checkbox', { name: /DeepSeek Harness/ }))
  await user.selectOptions(screen.getByLabelText('Radar'), 'trial')
  expect(screen.getByRole('link', { name: 'Compare selected (1)' })).toBeVisible()
})
```

- [ ] **Step 2: Run radar tests to confirm red**

Run: `npm test -- --run tests/features/radar.test.tsx`

Expected: FAIL because radar state and components do not exist.

- [ ] **Step 3: Implement URL-backed filters, sort, search, and selection**

Filter class, radar, evidence, organization, open-source state, and freshness. Default ordering is radar state then solution name; explicit user sorting is stable. Selection permits at most three solutions, persists through filtering, and generates `/compare?solutions=id1,id2,id3`.

- [ ] **Step 4: Implement the desktop table faithfully**

Use semantic `<table>`, sortable headers, visible selected rows, layer coverage as seven named segments with an accessible text equivalent, maturity/radar/status text plus color, reviewed date, and evidence disclosure. Do not use radar circles as decoration unless they convey the exact state accessibly.

- [ ] **Step 5: Implement the mobile row model**

At mobile width each row retains name, class, radar, reviewed date, evidence type, checkbox, and inline disclosure. Use CSS grid that fits 390px without primary horizontal scroll.

- [ ] **Step 6: Run radar tests and layout assertions**

Run: `npm test -- --run tests/features/radar.test.tsx && npm run typecheck && npm run build`

Expected: PASS; empty filters offer a clear reset action; invalid URL values are ignored safely.

- [ ] **Step 7: Commit the Radar**

```bash
git add src/features/radar src/styles/radar.css tests/features/radar.test.tsx
git commit -m "feat: add source-backed solutions radar"
```

---

### Task 6: Implement shareable comparison

**Files:**
- Create: `src/features/compare/ComparePage.tsx`, `ComparisonMatrix.tsx`
- Create: `tests/features/compare.test.tsx`
- Modify: `src/styles/radar.css`

**Interfaces:**
- Produces: `parseComparedSolutions(search, catalog): { solutions: Solution[]; missingIds: string[] }`, `ComparisonMatrix`.
- Consumes: Radar compare URLs, seven-layer states, claim/source resolution.

- [ ] **Step 1: Write failing comparison tests**

```tsx
it('compares two solutions by layer without inventing a total score', () => {
  renderCompare('/en/compare?solutions=deepseek-harness,langgraph')
  expect(screen.getByRole('heading', { name: /DeepSeek Harness.*LangGraph/ })).toBeVisible()
  expect(screen.getByText('Execution')).toBeVisible()
  expect(screen.queryByText(/overall score/i)).not.toBeInTheDocument()
})

it('keeps valid IDs and reports an invalid ID', () => {
  renderCompare('/en/compare?solutions=langgraph,missing')
  expect(screen.getByText(/missing/i)).toBeVisible()
  expect(screen.getByText('LangGraph')).toBeVisible()
})
```

- [ ] **Step 2: Run compare tests to confirm red**

Run: `npm test -- --run tests/features/compare.test.tsx`

Expected: FAIL because compare components do not exist.

- [ ] **Step 3: Implement the comparison matrix**

Rows must cover class, lifecycle, open-source state, execution environment, seven layers, maturity, radar state/rationale, freshness, and sources. `unknown` is displayed literally and neutrally. Mobile uses one fixed row label followed by stacked solution values, not horizontally clipped columns.

- [ ] **Step 4: Run compare tests and build**

Run: `npm test -- --run tests/features/compare.test.tsx && npm run build`

Expected: PASS; zero/one selection routes users to the Radar with an explanation.

- [ ] **Step 5: Commit comparison**

```bash
git add src/features/compare src/styles/radar.css tests/features/compare.test.tsx
git commit -m "feat: add shareable harness comparison"
```

---

### Task 7: Implement Knowledge, Patterns, Timeline, and Methodology

**Files:**
- Create: `src/features/library/KnowledgePage.tsx`, `PatternsPage.tsx`, `TimelinePage.tsx`, `MethodologyPage.tsx`
- Create: `src/styles/library.css`
- Create: `tests/features/library.test.tsx`

**Interfaces:**
- Produces: four localized supporting routes and reusable evidence disclosure.
- Consumes: validated knowledge, pattern, timeline, claim, and source entities.

- [ ] **Step 1: Write failing library route tests**

```tsx
it.each([
  ['/en/knowledge', 'Harness Anatomy'],
  ['/en/patterns', 'Harness–Model Coevolution'],
  ['/en/timeline', 'Timeline'],
  ['/en/methodology', 'Evidence, synthesis, and watch signals'],
])('renders %s', (path, heading) => {
  renderApp(path)
  expect(screen.getByText(heading)).toBeVisible()
})
```

- [ ] **Step 2: Run library tests to confirm red**

Run: `npm test -- --run tests/features/library.test.tsx`

Expected: FAIL because the pages do not exist.

- [ ] **Step 3: Implement open editorial layouts**

Knowledge uses anchored long-form sections and the seven-layer model. Patterns use list/detail anatomy with intent, mechanism, tradeoffs, evidence, and experiment idea. Timeline uses a true chronological rail. Methodology exposes classification, freshness, source policy, radar interpretation, corrections, and an explicit “not a ranking” statement.

- [ ] **Step 4: Run both locale projections and build**

Run: `npm test -- --run tests/features/library.test.tsx && npm run build`

Expected: PASS; no empty first-release route, no raw HTML injection, and all source links resolve to the registry.

- [ ] **Step 5: Commit the research library**

```bash
git add src/features/library src/styles/library.css tests/features/library.test.tsx
git commit -m "feat: add HNS knowledge and methodology"
```

---

### Task 8: Add metadata, static-host contract, CI, and safe preview lifecycle

**Files:**
- Modify: `index.html`, `package.json`, `.gitignore`, `README.md`
- Create: `public/favicon.svg`, `public/robots.txt`, `public/staticwebapp.config.json`
- Create: `scripts/preview-control.mjs`
- Create: `.github/workflows/ci.yml`
- Create: `tests/app/static-contract.test.ts`

**Interfaces:**
- Produces: `npm run preview:start`, `preview:status`, `preview:stop`; Azure-ready static artifact without deploying it; GitHub CI.
- Consumes: Vite `dist/`, Node 22, project-scoped process ownership.

- [ ] **Step 1: Write failing static contract tests**

```ts
it('configures SPA fallback and security headers', async () => {
  const config = JSON.parse(await readFile('public/staticwebapp.config.json', 'utf8'))
  expect(config.navigationFallback.rewrite).toBe('/index.html')
  expect(config.globalHeaders['Content-Security-Policy']).toContain("default-src 'self'")
  expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff')
})
```

- [ ] **Step 2: Run the static contract test to confirm red**

Run: `npm test -- --run tests/app/static-contract.test.ts`

Expected: FAIL because static-host files do not exist.

- [ ] **Step 3: Implement metadata and static-host configuration**

Use title `HNS — Harness Engineering Observatory`, bilingual description, canonical root placeholder-free relative metadata, HNS text-mark favicon, `/robots.txt`, SPA fallback, no-store for HTML, immutable caching for fingerprinted assets, and security headers compatible with self-hosted fonts and no third-party scripts.

- [ ] **Step 4: Implement project-scoped preview control**

`preview-control.mjs` records PID, port, command, and cwd under `.codex/runtime/`; it may stop a process only when PID and cwd both match this checkout. Default preview port is 4173. Add `.codex/runtime/` to `.gitignore`.

- [ ] **Step 5: Add non-deploying GitHub CI**

CI steps are checkout, setup-node 22 with npm cache, `npm ci`, Playwright browser install, `npm run check`, `npm run test:e2e`. Do not include Azure, Pages, Vercel, secrets, or deployment actions.

- [ ] **Step 6: Write README Setup/Run/Validate/Stop/Update sections**

Document exact commands, content directories, weekly workflow, evidence policy, accepted design references, GitHub-only delivery boundary, and later Azure stage. Do not advertise a production URL before publication.

- [ ] **Step 7: Run static checks**

Run: `npm test -- --run tests/app/static-contract.test.ts && npm run check`

Expected: PASS; `dist/staticwebapp.config.json`, `dist/favicon.svg`, and `dist/robots.txt` exist.

- [ ] **Step 8: Commit lifecycle and CI**

```bash
git add index.html package.json package-lock.json public scripts/preview-control.mjs .github README.md .gitignore tests/app/static-contract.test.ts
git commit -m "chore: add HNS static delivery contract"
```

---

### Task 9: Complete rendered browser, accessibility, and visual fidelity QA

**Files:**
- Create: `e2e/hns.desktop.spec.ts`, `e2e/hns.mobile.spec.ts`, `e2e/hns.accessibility.spec.ts`
- Create: `docs/qa/fidelity-ledger.md`
- Modify: feature components and styles only where QA reveals a mismatch

**Interfaces:**
- Produces: deterministic rendered acceptance evidence and fidelity ledger.
- Consumes: managed preview, accepted concepts, Browser/IAB, Playwright.

- [ ] **Step 1: Write failing E2E workflows**

Desktop test must assert navigation, weekly headline, evidence labels, radar filters, selecting two solutions, compare URL, matrix layers, locale preservation, and no horizontal overflow at 1536×1024.

Mobile test must assert 390×844, menu access, weekly disclosure, 44px controls, radar filter, inline row disclosure, two-solution selection, compare route, and `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

Accessibility test must run axe against Weekly, Radar, Compare, Knowledge, Timeline, and Methodology in both locales and require zero serious/critical violations.

- [ ] **Step 2: Run E2E to establish current failures**

Run: `npm run preview:start && npm run test:e2e`

Expected: initial failures identify remaining interaction or fidelity gaps; the preview remains checkout-owned.

- [ ] **Step 3: Verify with Browser/IAB first**

Open the managed local URL in the built-in browser. Inspect desktop first viewport, scroll through Radar, filter, select two real solutions, compare them, switch locale, open evidence, then repeat the core path at a 390px viewport. Record console output and interaction results.

- [ ] **Step 4: Capture implementation screenshots at native comparison sizes**

Capture desktop at 1536×1024 and mobile at 390×844. Inspect accepted concept and rendered screenshot with `view_image` in the same QA pass.

- [ ] **Step 5: Write and close the fidelity ledger**

Ledger rows must cover at least:

1. Above-the-fold copy and order.
2. Header/nav/language composition.
3. Typography and editorial headline metrics.
4. True-white/cobalt/navy/amber/green palette.
5. Weekly grid/index container model.
6. Radar density, rules, selection, and evidence states.
7. Icon metaphors/stroke and focus states.
8. Mobile collapse and no-overflow behavior.

Each row records concept evidence, render evidence, mismatch, and fix. No material mismatch may remain without an explicit non-fixable reason.

- [ ] **Step 6: Run the full acceptance matrix**

Run:

```bash
npm run check
npm run test:e2e
git diff --check
npm run preview:stop
```

Also verify 1280×720, 768×1024, 390×844, 200% zoom, keyboard-only, and reduced motion in Browser/IAB. Expected: all checks pass, console is clean, preview stops safely, and no HNS-owned listener remains.

- [ ] **Step 7: Commit QA evidence and fixes**

```bash
git add e2e docs/qa src
git commit -m "test: verify HNS observatory experience"
```

---

### Task 10: Review, publish to public GitHub, and stop before Azure

**Files:**
- Modify only if review finds a concrete defect.
- No Azure, DNS, Pages, or Vercel files/actions may be added.

**Interfaces:**
- Produces: clean local `main`, public `aserdargun/hns-aserdargun-com`, matching remote `main`, successful CI.
- Consumes: all prior tasks and explicit user authorization already granted by “github üzerinde paylaşalım”.

- [ ] **Step 1: Run final repository review**

Inspect `git status`, `git diff`, `git log`, dependency audit output, source registry, static artifact, and full test evidence. Fix only validated defects; do not widen scope.

- [ ] **Step 2: Run final clean acceptance**

```bash
npm ci
npm run check
npm run test:e2e
git diff --check
git status --short
```

Expected: all pass and status is clean.

- [ ] **Step 3: Reconfirm remote absence and authenticated owner**

```bash
gh auth status
gh repo view aserdargun/hns-aserdargun-com
```

Expected: active owner is `aserdargun`; repository still does not exist. If it now exists, inspect its default branch and refs before any push and stop on unexpected history.

- [ ] **Step 4: Create the public GitHub repository and push main**

```bash
gh repo create aserdargun/hns-aserdargun-com --public --source=. --remote=origin --push --description "A bilingual, source-backed Harness Engineering observatory, solutions radar, and weekly intelligence archive."
```

Expected: public repository URL is `https://github.com/aserdargun/hns-aserdargun-com`, and remote `main` matches local HEAD.

- [ ] **Step 5: Verify GitHub repository and CI**

```bash
gh repo view aserdargun/hns-aserdargun-com --json nameWithOwner,isPrivate,url,defaultBranchRef
git ls-remote --heads origin main
gh run list --repo aserdargun/hns-aserdargun-com --branch main --limit 5
```

Wait for the matching-SHA CI run to complete successfully. Confirm the repository is public, the README and accepted design assets render, and no deployment workflow exists.

- [ ] **Step 6: Verify the hard stop**

Confirm no Azure CLI write, DNS write, custom-domain binding, GitHub Pages action, Vercel call, or deployment action occurred. Report the GitHub URL, HEAD SHA, CI run, test matrix, and clean Git state. Azure publication remains a separate future request.
