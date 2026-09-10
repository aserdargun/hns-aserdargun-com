import { describe, expect, it } from 'vitest'
import { rawCatalog } from '../../src/content/catalog'
import { parseCatalog } from '../../src/content/schema'

describe('HNS content contract', () => {
  it('ships the W36 expanded radar with twenty-two verified solutions', () => {
    expect(parseCatalog(rawCatalog).solutions).toHaveLength(22)
  })

  it('rejects a claim with a missing source', () => {
    const broken = structuredClone(rawCatalog)
    broken.claims[0].sourceIds = ['missing-source']

    expect(() => parseCatalog(broken)).toThrow(/missing-source/)
  })

  it('requires both locales on every visible summary', () => {
    const broken = structuredClone(rawCatalog) as unknown as {
      solutions: Array<{ summary: { tr?: string; en: string } }>
    }
    delete broken.solutions[0].summary.tr

    expect(() => parseCatalog(broken)).toThrow(/tr/)
  })
})

describe('evidence validation regressions', () => {
  it.each(['2026-02-30', '2026-13-01'])('rejects impossible date %s', (date) => {
    const broken = structuredClone(rawCatalog)
    broken.sources[0].checkedAt = date
    expect(() => parseCatalog(broken)).toThrow()
  })
  it.each(['javascript:alert(1)', 'data:text/html,hello', 'http://example.com'])('rejects unsafe source URL %s', (url) => {
    const broken = structuredClone(rawCatalog)
    broken.sources[0].url = url
    expect(() => parseCatalog(broken)).toThrow(/HTTPS/)
  })
  it.each(['2026-W00', '2026-W54', '2025-W53'])('rejects invalid ISO week %s', (week) => {
    const broken = structuredClone(rawCatalog)
    broken.weekly[0].week = week
    expect(() => parseCatalog(broken)).toThrow()
  })
  it('rejects two snapshots for the same week', () => {
    const broken = structuredClone(rawCatalog)
    broken.weekly.push({ ...broken.weekly[0], id: 'duplicate-week' })
    expect(() => parseCatalog(broken)).toThrow(/Duplicate week/)
  })
  it('rejects layer evidence assigned to a different solution', () => {
    const broken = structuredClone(rawCatalog)
    const solution = broken.solutions[0]
    const unrelated = broken.claims.find((claim) => !claim.subjectIds.includes(solution.id))!
    solution.layers.execution.claimIds = [unrelated.id]
    expect(() => parseCatalog(broken)).toThrow(/layer execution claim/)
    solution.claimIds.push(unrelated.id)
    expect(() => parseCatalog(broken)).toThrow(/must reference its subject/)
  })
})
