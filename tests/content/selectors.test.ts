import { describe, expect, it } from 'vitest'
import { catalog } from '../../src/content/catalog'
import { getLatestWeekly, getLocalizedText, getSolutionEvidence } from '../../src/content/selectors'

describe('content selectors', () => {
  it('selects the latest weekly snapshot by ISO week', () => {
    expect(getLatestWeekly(catalog).week).toBe('2026-W36')
  })

  it('projects bilingual text without fallback drift', () => {
    expect(getLocalizedText({ tr: 'Kanıt', en: 'Evidence' }, 'tr')).toBe('Kanıt')
    expect(getLocalizedText({ tr: 'Kanıt', en: 'Evidence' }, 'en')).toBe('Evidence')
  })

  it('returns resolved evidence for a known solution', () => {
    const claims = getSolutionEvidence(catalog, 'deepseek-harness')
    expect(claims.length).toBeGreaterThan(0)
    expect(claims.every((claim) => claim.sourceIds.length > 0)).toBe(true)
  })

  it('rejects an unknown solution lookup', () => {
    expect(() => getSolutionEvidence(catalog, 'missing')).toThrow('Unknown solution: missing')
  })
})
