import { describe, expect, it } from 'vitest'
import { catalog } from '../../src/content/catalog'
import { emptyRadarFilters, filterSolutions, parseRadarSearch } from '../../src/features/radar/radar-state'
import { parseComparedSolutions } from '../../src/features/compare/compare-state'

describe('research state regressions', () => {
  it('resolves every weekly watch link to its solution', () => {
    for (const week of catalog.weekly) for (const id of week.solutionsToWatch) {
      expect(filterSolutions(catalog.solutions, parseRadarSearch(`?query=${id}`)).map((solution) => solution.id)).toContain(id)
    }
  })

  it('preserves typed whitespace while ignoring it for matching', () => {
    const filters = parseRadarSearch('?query=LM+Studio+ ')
    expect(filters.query).toBe('LM Studio  ')
    expect(filterSolutions(catalog.solutions, filters).map((solution) => solution.id)).toContain('lmstudio-bionic')
  })

  it('matches Turkish uppercase and dotted letters', () => {
    const solution = { ...catalog.solutions[0], name: 'İZİN SINIRI' }
    expect(filterSolutions([solution], { ...emptyRadarFilters, query: 'izin siniri' })).toHaveLength(1)
  })

  it('filters dated reviews at the 30 and 90 day boundaries in UTC', () => {
    const now = new Date('2026-09-10T23:59:59Z')
    const solutions = [0, 30, 31, 90, 91].map((age) => ({ ...catalog.solutions[0], id: `${age}`, lastReviewedAt: new Date(Date.UTC(2026, 8, 10 - age)).toISOString().slice(0, 10) }))
    const ids = (freshness: string[]) => filterSolutions(solutions, { ...emptyRadarFilters, freshness }, now).map((solution) => solution.id)
    expect(ids(['30'])).toEqual(['0', '30'])
    expect(ids(['90'])).toEqual(['0', '30', '31', '90'])
    expect(ids(['stale'])).toEqual(['91'])
  })

  it('deduplicates comparison IDs before applying the three solution limit', () => {
    const { solutions, missingIds } = parseComparedSolutions('?solutions=missing,langgraph,langgraph,claude-code,deepseek-harness,aider', catalog)
    expect(solutions.map((solution) => solution.id)).toEqual(['langgraph', 'claude-code', 'deepseek-harness'])
    expect(missingIds).toEqual(['missing'])
  })
})
