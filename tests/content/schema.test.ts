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

  it('requires both locales on every visible summary', () => {
    const broken = structuredClone(rawCatalog) as unknown as {
      solutions: Array<{ summary: { tr?: string; en: string } }>
    }
    delete broken.solutions[0].summary.tr

    expect(() => parseCatalog(broken)).toThrow(/tr/)
  })
})
