import { describe, expect, it } from 'vitest'
import { catalog, rawCatalog } from '../../src/content/catalog'
import { parseCatalog } from '../../src/content/schema'

describe('catalog integrity', () => {
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

  it('keeps every reviewed date at or before the baseline cutoff', () => {
    const cutoff = catalog.weekly[0].cutoffDate
    expect(catalog.solutions.every((solution) => solution.lastReviewedAt <= cutoff)).toBe(true)
    expect(catalog.claims.every((claim) => claim.reviewedAt <= cutoff)).toBe(true)
  })
})
