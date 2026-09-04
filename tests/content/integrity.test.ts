import { describe, expect, it } from 'vitest'
import { catalog, rawCatalog } from '../../src/content/catalog'
import { parseCatalog } from '../../src/content/schema'

describe('catalog integrity', () => {
  const localizedStrings = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.flatMap(localizedStrings)
    if (!value || typeof value !== 'object') return []
    const record = value as Record<string, unknown>
    if (typeof record.tr === 'string' && typeof record.en === 'string') return [record.tr]
    return Object.values(record).flatMap(localizedStrings)
  }

  it('resolves every solution claim and source', () => {
    for (const solution of catalog.solutions) {
      expect(solution.claimIds.every((id) => catalog.claimsById.has(id))).toBe(true)
      expect(solution.sourceIds.every((id) => catalog.sourcesById.has(id))).toBe(true)
    }
  })

  it('rejects a weekly snapshot that references an unknown solution', () => {
    const broken = structuredClone(rawCatalog)
    broken.weekly[0].solutionsToWatch.push('not-a-solution')

    expect(() => parseCatalog(broken)).toThrow(/not-a-solution/)
  })

  it('keeps every reviewed date at or before today', () => {
    const today = new Date().toISOString().slice(0, 10)
    expect(catalog.solutions.every((solution) => solution.lastReviewedAt <= today)).toBe(true)
    expect(catalog.claims.every((claim) => claim.reviewedAt <= today)).toBe(true)
  })

  it('uses live official Manus sources instead of the retired features page', () => {
    expect(catalog.sources.some((source) => source.url === 'https://manus.im/features')).toBe(false)
    expect(catalog.sourcesById.get('manus-features')?.url).toBe('https://manus.im/blog/manus-sandbox')
    expect(catalog.sourcesById.has('manus-wide-research-source')).toBe(true)
    expect(catalog.sourcesById.has('manus-browser-operator-source')).toBe(true)
  })

  it('keeps untranslated interface jargon out of Turkish catalog copy', () => {
    const copy = localizedStrings(rawCatalog)
      .join('\n')
      .replace(/`[^`]+`/g, '')
      .replace(/Microsoft Agent Framework Harness|Managed Agents|Deep Agents|Google Agent Runtime|Agent Runtime|Hermes Agent|mini-SWE-agent|Agentic AI Foundation|Browser Operator|MEMORY\.md|USER\.md/g, '')

    expect(copy).not.toMatch(/\b(repository|artifact|context|sandbox|framework|execution|runtime|plugin|planning|memory|approval|telemetry|baseline|coding|governance|subagent|worktree|permission|kernel|claim|workflow|environment|verifier|trajectory|marketplace|agnostic|atomic|gateway|skill)\b/i)
  })
})
