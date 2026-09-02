# HNS Harness Engineering Observatory — Product Design Specification

Date: 2026-09-02  
Status: Approved product, data, technical, and visual direction  
Repository target: `aserdargun/hns-aserdargun-com`  
Publication boundary for this delivery: public GitHub repository; no Azure deployment and no Vercel

## 1. Product thesis

HNS is a public, bilingual, source-backed observatory for Harness Engineering. It is not a static guide, a generic AI news dashboard, or a ranking of foundation models. Its permanent job is:

> Observe → Classify → Compare → Experiment → Track

The product explains how the execution environment around a model turns model capability into a reliable agent system. It follows harnesses, agent frameworks, runtimes, orchestration systems, sandboxes, verification systems, and observability systems as one evolving engineering field.

The two living core modules are **Solutions Radar** and **Weekly Intelligence**. Knowledge, patterns, comparisons, and history provide the context necessary to interpret the radar rather than becoming disconnected documentation sections.

## 2. Audience and jobs

Primary audiences:

- AI and software engineers evaluating agent-system architecture.
- Researchers tracking emerging Harness Engineering patterns.
- Technical leaders comparing maturity, governance, verification, and operational readiness.
- Builders who want a source trail and practical experiment ideas rather than vendor summaries.

Primary jobs:

1. Understand what changed this week and why it matters.
2. Inspect which engineering problems a solution actually covers.
3. Compare two or three solutions without collapsing them into one misleading score.
4. Trace every factual claim back to its sources and review date.
5. See how radar positions and interpretations changed over time.
6. Turn an observed development into a reproducible experiment candidate.

## 3. Goals and non-goals

### Goals

- Publish a trustworthy bilingual baseline that can be updated weekly through Git.
- Make freshness, evidence type, source provenance, and editorial synthesis visible.
- Separate Harness, Framework, Runtime, Orchestrator, Execution, Evaluation, and Observability categories.
- Preserve immutable weekly snapshots and explicit radar-movement rationales.
- Support efficient desktop research and compact mobile scanning without horizontal overflow.
- Produce a static artifact suitable for a later Azure Static Web Apps release.

### Non-goals for the first release

- No account system, CMS, database, comments, or multi-user editing.
- No automatic publication of machine-generated research.
- No universal “best harness” ranking or opaque aggregate quality score.
- No empty Harness Lab, benchmark, maturity-model, or reference-model screens.
- No Azure resource, DNS, custom-domain, or production-hosting changes.
- No Vercel configuration or deployment.

## 4. Information architecture and routes

English and Turkish use symmetric, stable paths:

| Route | Purpose |
|---|---|
| `/:locale` | Latest Weekly Intelligence and a live Radar preview |
| `/:locale/weekly/:week` | Immutable weekly snapshot |
| `/:locale/radar` | Full filterable Solutions Radar |
| `/:locale/compare?solutions=...` | Shareable comparison of two or three solutions |
| `/:locale/knowledge` | Foundations, Harness Anatomy, and conceptual boundaries |
| `/:locale/patterns` | Pattern catalog with evidence and known tradeoffs |
| `/:locale/timeline` | Historical milestones and radar movements |
| `/:locale/methodology` | Classification, evidence, freshness, and radar policies |

`locale` is `tr` or `en`. A language switch preserves the corresponding page and query state. The most recent explicit language choice is remembered locally; no account or cross-device tracking is introduced.

## 5. First-release surfaces

### 5.1 Weekly Intelligence

The homepage opens directly on the product rather than a marketing hero. Its first viewport contains:

- ISO week and review cutoff.
- One editorial synthesis headline.
- The most important development and its source trail.
- Solutions to watch.
- Pattern of the week.
- Research of the week.
- Experiment candidate.
- A narrow evidence/synthesis/watch-signal rail on desktop.
- The beginning of the Solutions Radar so the real tool is visible immediately.

Weekly snapshots contain the state as it was published that week. Corrections create an explicit correction note rather than silently rewriting history.

### 5.2 Solutions Radar

Desktop uses a dense, open table, not a card grid. Core columns are:

- Solution.
- Class.
- Harness-layer coverage.
- Maturity.
- Radar position.
- Last reviewed date.
- Evidence state.

Filters cover class, radar position, evidence state, organization, open-source status, and review freshness. Filters and sorting are represented in the URL where practical.

Mobile transforms the table into compact row records without hiding solution, class, radar position, reviewed date, evidence state, or selection. Detail expands inline; there is no primary horizontal-scroll workflow.

### 5.3 Compare

Users may select two or three solutions. Comparison keeps three dimensions separate:

1. Coverage across the seven harness layers.
2. Evidence confidence and freshness.
3. Maturity and radar interpretation.

Differences appear as aligned rows. Missing evidence is displayed as unknown, never as a negative score. The compare URL is shareable.

### 5.4 Knowledge and Patterns

Knowledge covers foundations, terminology, the distinction from Prompt/Context/Agent Engineering, and the seven-layer Harness Anatomy. Patterns are structured catalog entries with intent, mechanism, tradeoffs, evidence, examples, and experiment ideas.

### 5.5 Timeline and Methodology

Timeline combines historical milestones with dated radar movements. Methodology explains exactly how claims, evidence, maturity, freshness, and radar positions are produced.

## 6. Visual design specification

Accepted concept references:

- [Desktop primary screen](../../design/hns-primary-desktop.png)
- [Mobile primary workflow](../../design/hns-primary-mobile.png)

The concepts are the source of truth for composition, density, hierarchy, palette, table/list container model, and responsive behavior. Text inside the concept that describes a factual development or a solution is illustrative until it passes the content-validation workflow.

### Visual idea

The visual identity is **research newspaper × living systems radar**:

- True-white research-paper canvas.
- Midnight-navy primary typography.
- Cobalt blue for navigation, selection, and primary interaction.
- Restrained amber for Trial/Watch signals.
- Acid green only for meaningful evidence/healthy states.
- Fine one-pixel rules and open tables, rails, and lists.
- Square to slightly rounded geometry; no floating-card system.
- Subtle signal traces and harness-loop linework as the signature motif.

### Design tokens

Token values are locked as the implementation starting point and may be adjusted only to improve measured accessibility or match the accepted concept more faithfully:

| Token | Intended value |
|---|---|
| Canvas | `#FFFFFF` |
| Primary text | approximately `#07132D` |
| Secondary text | approximately `#46516A` |
| Accent | approximately `#0B4FEA` |
| Evidence | approximately `#22A93A` |
| Watch/Trial | approximately `#E99A00` |
| Rule | approximately `#D8DFEA` |
| Selected surface | approximately `#F4F7FF` |
| Radius | 4–8px where a control requires it |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64px |

Typography uses a disciplined open-source grotesk for application chrome and body copy, with a restrained editorial serif only for the primary weekly headline. The implementation should begin with IBM Plex Sans and Source Serif 4 or metrics-compatible equivalents, locally bundled through the build.

### Locked visible chrome

- Brand: `HNS` and `Harness Engineering Observatory`.
- Primary navigation: `Weekly`, `Radar`, `Compare`, `Knowledge`, `Timeline`, `Methodology` and their Turkish equivalents.
- Language control: `TR / EN`.
- Evidence vocabulary: `Evidence`, `Synthesis`, `Watch signal` and their Turkish equivalents.
- Primary radar action: `Compare selected` and its Turkish equivalent.

The editorial headline `The harness is becoming the system.` is permitted as the English baseline synthesis. The Turkish version must preserve its meaning rather than translate word-for-word awkwardly.

### Explicit exclusions

- No hero eyebrow, decorative badge, KPI cards, bento grid, glassmorphism, glow, neon grid, orb, stock image, marketing CTA, or sales copy.
- No cream, beige, or warmed replacement for the white canvas.
- No unapproved gradients or image tints.
- No generic substituted icons. Use one consistent outline family at approximately 1.75px stroke; create a custom SVG only where the concept’s metaphor cannot be matched.
- No mobile card-stack reinterpretation of the Radar.

## 7. Component architecture and interaction state

The React application is composed from focused modules:

- `AppShell`, `GlobalHeader`, `PrimaryNavigation`, `LanguageSwitch`.
- `WeeklyLead`, `WeeklyIndex`, `WeeklyModule`, `IntelligenceRail`.
- `RadarToolbar`, `RadarTable`, `RadarRow`, `MobileRadarRow`.
- `EvidenceKind`, `MaturityState`, `RadarState`, `FreshnessState`.
- `ComparisonTray`, `ComparisonMatrix`.
- `SourceLink`, `SourceList`, `ClaimDisclosure`.
- `KnowledgeIndex`, `PatternEntry`, `TimelineEntry`, `MethodologySection`.

The application keeps only ephemeral UI state locally. Filter and comparison state is promoted to the URL when it must be shareable. Selection remains stable while filtering. A language change retains route, week, filters, and selected solutions whenever the target translation exists.

All controls have hover, focus-visible, active, selected, disabled, empty, and loading-safe states. Static data is bundled, so the main content does not rely on an application-level network loading spinner.

## 8. Content and data contract

Human-editable records live under `content/`. Bilingual strings are stored in the same logical record to prevent locale drift. Zod schemas validate all data during content checks, tests, and build.

### Core entities

#### Solution

- Stable ID, name, organization, canonical URL.
- Class and lifecycle status.
- License/open-source state and implementation languages.
- Model coupling and execution environment.
- Seven-layer coverage with evidence references.
- Maturity, radar position, radar rationale, and effective date.
- Last release date when verifiable.
- Last reviewed date and freshness state.

#### Source

- Stable ID, title, publisher, URL.
- Published date and last checked date.
- Source kind: official documentation, repository, release, paper, engineering publication, or independent analysis.
- Access state and optional supersession link.

#### Claim

- Stable ID and bilingual text.
- Kind: `evidence`, `synthesis`, or `watch-signal`.
- Supporting source IDs.
- Subject IDs and review date.
- Confidence explanation for synthesis/watch signals.

#### Weekly snapshot

- ISO week and cutoff date.
- Most important development.
- Solution watch list.
- Releases and architecture changes.
- Pattern and research highlights.
- Radar movements with before/after/reason.
- Experiment candidate.
- Correction notes.

#### Pattern and timeline entry

- Stable ID, bilingual title and explanation.
- Category, date, related solutions, evidence, known tradeoffs, and experiment ideas where relevant.

### Candidate baseline queue

The research plan identifies Codex, Symphony, Claude Code/Anthropic harness research, DeepSeek Harness, Microsoft Agent Framework Harness, Deep Agents, LangGraph, Google ADK, Google Agent Runtime, OpenHands, mini-SWE-agent, and PydanticAI as candidate baseline records. A candidate enters production only after current primary-source verification. The plan or concept image is not itself evidence.

## 9. Evidence, freshness, and editorial policy

Visible claims use three clearly distinct labels:

- **Evidence:** directly supported by cited sources.
- **Synthesis:** an HNS interpretation derived from named evidence.
- **Watch signal:** an early, incomplete signal that requires monitoring.

Primary and official sources are preferred for product capabilities, release status, and architecture. Secondary analysis can provide context but cannot silently replace primary evidence.

Records have explicit review dates. A stale record remains visible with “review required”; it does not retain a current-looking status. A temporarily inaccessible source is marked unavailable, and only dependent claims lose freshness. Other records remain publishable.

Radar positions are editorial decisions, not vendor facts. Every movement includes a dated rationale and supporting evidence.

## 10. Weekly publishing workflow

1. Create a new ISO-week record from a deterministic template.
2. Review candidate projects, official releases, engineering publications, papers, benchmarks, and prior watch signals.
3. Update source records and dependent claims.
4. Write the bilingual weekly synthesis and experiment candidate.
5. Run schema, translation, reference, source-policy, date, link, and content tests.
6. Run the production build and browser checks.
7. Review the generated diff.
8. Commit or merge the verified snapshot.

A future scheduled workflow may gather candidate links or open a draft pull request. It must not publish factual claims or radar movements without owner review.

## 11. Technical architecture

- React, Vite, and TypeScript.
- Static content compiled into the application bundle.
- Zod schemas for fail-closed content validation.
- Markdown for long-form knowledge, JSON for structured entities and snapshots.
- React Router or an equivalent static-host-compatible router.
- Vitest for schema, model, utility, and component behavior.
- Playwright for bilingual desktop/mobile workflows and accessibility checks.
- Static-host headers and fallback rules prepared for a later Azure Static Web Apps deployment.

The build pipeline is:

```text
content → schema/reference validation → locale projection → Vite build → static artifact
```

No runtime API, database, secret, or environment-specific vendor service is required for the first release.

## 12. Failure and empty states

- Missing translation: content validation fails.
- Missing or invalid source reference: content validation fails.
- Claim without the evidence required by its label: content validation fails.
- Invalid date ordering or snapshot mutation: content validation fails.
- Stale review: record remains visible with a clear review-required state.
- Temporarily unavailable URL: source is marked unavailable; dependent freshness changes without deleting history.
- Empty filter result: explain that no solution matches and offer to clear filters.
- Invalid compare URL: keep valid solutions, identify unavailable IDs, and never crash the page.
- Unknown route or week: localized 404 with links to the latest Weekly and Radar.

## 13. Accessibility and responsive behavior

- WCAG 2.2 AA contrast and keyboard behavior are acceptance requirements.
- Semantic headings, landmarks, tables, lists, and disclosure controls are preserved.
- Color is never the only carrier of evidence, maturity, or radar meaning.
- Focus-visible treatment uses cobalt with sufficient offset against selected rows.
- Minimum mobile touch target is 44×44px.
- Dense desktop tables retain accessible headers and row relationships.
- Mobile primary workflows have no horizontal overflow at 390px.
- Motion is subtle and disabled or reduced under `prefers-reduced-motion`.
- Browser zoom at 200% must preserve primary content and controls.

## 14. Privacy and security

- No authentication, analytics, tracking pixels, comments, or form submission in the first release.
- No cookies other than a non-sensitive local language preference if necessary; `localStorage` is preferred for that preference.
- External links use safe opener/referrer behavior.
- The later Azure static configuration will include a restrictive CSP, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, and clickjacking protection compatible with the static application.
- No untrusted HTML from content is rendered without sanitization.

## 15. Verification and acceptance

### Automated

- All structured content passes schemas.
- Every locale record is complete.
- IDs and references are unique and resolvable.
- Claim/source/evidence policies are enforced.
- Weekly snapshots are correctly ordered and immutable by convention/test.
- Production build succeeds with no broken internal routes or missing assets.
- Core filter, selection, compare, language, archive, and disclosure interactions pass.

### Rendered browser

- Desktop reference: 1440px-wide accepted concept composition.
- Mobile reference: 390×844 accepted concept composition.
- Additional checks: 1280×720, 768×1024, 390×844, 200% zoom, keyboard-only, and reduced motion.
- Above-the-fold copy, component order, typography, palette, table/list model, spacing, evidence states, icon treatment, and mobile collapse are compared directly to the accepted concepts.
- No console errors, horizontal overflow, clipped primary content, inert controls, or placeholder records.

### Content acceptance

- Every production solution and current-state claim has live-checked sources.
- The baseline date and latest review date are visible.
- No concept-image placeholder claim or name is promoted into production without verification.

## 16. Delivery stages

### Stage 1 — current delivery

- Implement and verify the first public static release.
- Commit to local `main`.
- Create public `aserdargun/hns-aserdargun-com` only after implementation verification.
- Push and verify the public GitHub repository and CI.
- Stop before Azure, DNS, custom domain, GitHub Pages, or any other deployment action.

### Stage 2 — separately authorized later

- Create/verify Azure Static Web Apps resources.
- Publish the exact verified GitHub revision.
- Configure `hns.aserdargun.com` through the established TXT-first/CNAME-second process.
- Verify Azure readiness, DNS, TLS, HTTPS, headers, assets, browser behavior, and clean Git state.

Vercel is excluded from both stages.

## 17. Approved design decisions

- Product identity: HNS — Harness Engineering Observatory.
- Product loop: Observe → Classify → Compare → Experiment → Track.
- Bilingual Turkish/English static-first architecture.
- Git-managed, source-backed weekly content.
- Solutions Radar and Weekly Intelligence as the first-release core.
- No backend/CMS or unreviewed automatic publishing.
- Separate coverage, evidence, maturity, and radar interpretation.
- Research-newspaper × living-systems-radar visual direction.
- Public GitHub as the current external delivery boundary.
- Azure later; Vercel never.

