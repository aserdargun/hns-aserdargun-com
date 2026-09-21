# HNS content review — 2026-09-21

Research cutoff: **2026-09-21 (ISO 2026-W39)**. This is a local editorial update; no publication or runtime benchmark was performed.

## Inventory and scope

Reviewed the complete registry (22 solutions, initially 33 sources and 78 claims), all seven bilingual research surfaces, and HNS's entry in the root aserdargun.com portfolio. The updated registry contains **46 primary sources, 79 claims, 22 solutions, two weekly editions, four knowledge entries, five patterns, fourteen timeline entries, and nine conceptual portfolio links**.

Source access was checked separately from semantic claim review. All existing source URLs were requested; OpenAI HTTP 403 responses and transient GitHub 504 responses were resolved through the web reader. Google's old code-execution page returned HTTP 200 but only contained a redirect: its final documentation URL is now registered. Access checks do not establish that every product capability was independently tested. Unchanged claim review dates remain intact. Undated documentation is evidence observed at this cutoff, not proof of when a feature first shipped.

## Editorial corrections

- [Claude Code permissions](https://code.claude.com/docs/en/permissions) and [Cline Auto Approve](https://docs.cline.bot/features/auto-approve): removed unconditional human-approval guarantees. Approval, isolation, and result verification are distinct controls.
- [OpenCode agents](https://opencode.ai/docs/agents/): distinguished primary and subordinate roles; removed the stale Go-based implementation description.
- [Hermes](https://github.com/NousResearch/hermes-agent): distinguished reusable skills from FTS5 session recall; removed an unverified fixed tool count.
- [Codex state store](https://github.com/openai/codex/blob/main/codex-rs/state/src/lib.rs): described JSONL records and mirrored SQLite metadata separately. [Linux sandbox code](https://github.com/openai/codex/blob/main/codex-rs/linux-sandbox/src/lib.rs) and [sandbox presets](https://github.com/openai/codex/blob/main/sdk/python/src/openai_codex/_sandbox.py) replace an unsupported mode list and an overly broad platform claim.
- [Kiro specifications](https://kiro.dev/docs/specs/), [hooks](https://kiro.dev/docs/hooks/), and [models](https://kiro.dev/docs/models/): narrowed claims to their documented scope. The [general availability announcement](https://kiro.dev/blog/general-availability/) establishes 2025-11-17, correcting the previous 2026 date.
- [Goose custom distributions](https://goose-docs.ai/docs/guides/custom-distributions/): added direct feature evidence instead of using a foundation-governance announcement for extension capabilities.
- [Bionic 1.1.4](https://lmstudio.ai/changelog/bionic-v1.1.4) and [1.1.5](https://lmstudio.ai/changelog/bionic-v1.1.5): added dated release evidence. No announced speed or safety improvement is represented as measured by HNS.
- Removed unsupported dated milestones for OpenCode popularity, the Codex Rust transition, and the Hermes launch. Cleared `lastRelease` values lacking a version-specific release source; an article date is not automatically a latest-release date.
- Marked layer cells without direct evidence as unknown. In particular, permission modes do not prove observability or verification; provider selection does not prove governance; organizational governance does not prove runtime controls. These edits describe evidence coverage, not removal of upstream capabilities.
- Reframed the three-product comparison as an editorial sample, not market dominance. Qualified durable execution: persistence alone does not guarantee exactly-once external effects.

## Archive and rendering

W36's existing payload and correction notes are unchanged; one dated correction note was appended. W39 is a new file. Weekly files are automatically discovered by both validation and the renderer. Weekly signals come from the content registry; historical pages disclose that the embedded radar is the current catalog. The week navigation makes both editions accessible.

Content schema v2 enforces source chronology, valid ISO-week cutoffs, referenced signal claims, and rejects weekly evidence beyond the cutoff. No simulation, experiment, metric, or export runtime semantics changed.

## Portfolio relationship

The bilingual footer links LLM, CTX, SEC, EVL, ARL, DPL, CUL, AOS, and MEM. These are conceptual links; no shared service, model execution, desktop control, or cross-application data exchange is claimed. ARL/DPL/CUL are identified as educational simulations, AOS as a target-architecture website, and MEM as an independent lab under CTX. All nine public addresses and HNS returned HTTP 200 during this review.

The root `data/living-system.json` HNS entry now describes the seven layers and separate evidence/interpretation dimensions, records this research cutoff and registry counts, and generates the dependent TR/EN pages and `portfolio.json`. Its release fields retain the **existing live** commit `e1c880815f66b73bb5bfb89cd35424b176b79061` (2026-09-10), checked against the public HNS `release.json`. That is distinct from this unpublished content update. Concurrent non-HNS edits in the root checkout were preserved.

## Validation

Run `npm run validate:codex` in HNS. Coverage includes content integrity, typechecking, lint, unit/component tests, build, desktop/mobile flows, archive navigation, narrow-screen layout, and axe accessibility checks. Root validation uses `npm run validate:codex`, `npm run check:generated`, and `npm run test:server`. Review `git diff --check` in both checkouts before handoff.

Verified outcome: HNS `validate:codex` passed with **64 unit/content/component tests and 48 browser tests**. The root `validate:codex`, generated-file check, site validator, and **14 server tests** passed. TR mobile and EN desktop screenshots were visually inspected. Both checkouts passed `git diff --check`. Changes remain local and uncommitted.
