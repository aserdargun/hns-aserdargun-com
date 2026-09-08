# HNS working contract

- Build HNS, the Harness Engineering Observatory — a bilingual, source-backed observatory for comparing the agent-system layers that turn model capability into reliable agent systems.
- Source of truth lives in `content/` (`sources.json`, `claims.json`, `solutions.json`, `weekly/`, `knowledge.json`, `patterns.json`, `timeline.json`); the site UI in `src/` is a read-only renderer that must not invent solutions, claims, or sources absent from the registry. `npm run check` (content validator + typecheck + lint + vitest + build) fails closed on missing references, broken bilingual parity, or invalid source links, and no universal "best harness" score is computed.
- HNS is an observatory, not a recommendation engine. Solutions, claims, weekly snapshots, and radar interpretations are observer outputs the public reads. Decision inputs are limited to the editor's authoritative content updates (new sources, new claims, updated solutions, published weekly snapshots). Unknown evidence stays unknown — coverage, evidence confidence, freshness, maturity, and radar interpretation remain separate dimensions and never collapse into a single ranking.
- Behavior, experiment, world, simulation, metric, and export schema versions are explicit. Update affected versions when semantics change.
- Every weekly snapshot is ISO-week stamped and immutable; corrections are appended as visible notes. Reject runs that drift past the documented research cutoff or rely on unverified upstream releases.
- Keep Turkish and English controls and explanations equivalent. Label model assumptions and simulation units.
- Verify `npm run validate:codex` and review `git diff --check` before handoff.
- Local work only unless the user authorizes external publication. Preserve unrelated work and processes.
